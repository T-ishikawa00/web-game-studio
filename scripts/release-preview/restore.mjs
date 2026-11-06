/** Read-only source access. Writes only to a NEW isolated destination. No Git worktree/index/config writes. */
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {getPin, sha256, gitBlob, safeRelative, validateManifest} from './common.mjs';
const args = process.argv.slice(2);
function option(name, fallback) {const i=args.indexOf(name); if(i<0)return fallback; if(!args[i+1]||args[i+1].startsWith('--'))throw Error(`Missing ${name}`);return args[i+1];}
const PIN=getPin(option('--release','five'));
const previewPort=PIN.key==='final'?4388:4387;
const source = path.resolve(option('--source-repo', process.platform==='win32'?'C:\\projects\\Web Game Studio':'.'));
const destArg = option('--dest', null);
if (!destArg) {console.error('Required: node restore.mjs --source-repo "C:\\projects\\Web Game Studio" --dest "NEW_FOLDER" [--github]'); process.exit(2);}
const dest = path.resolve(destArg);
const github = args.includes('--github');
const env = {...process.env, GIT_OPTIONAL_LOCKS:'0', GIT_NO_LAZY_FETCH:'1', GIT_TERMINAL_PROMPT:'0', GH_PROMPT_DISABLED:'1', GH_NO_UPDATE_NOTIFIER:'1', GH_NO_EXTENSION_UPDATE_NOTIFIER:'1', NO_COLOR:'1'};
for (const name of ['GIT_DIR','GIT_WORK_TREE','GIT_INDEX_FILE','GH_DEBUG']) delete env[name];
// Suppress command diagnostics: credentials or provider redirects must not be copied into logs.
function command(bin, a) {
  try {return execFileSync(bin, a, {env, windowsHide:true, timeout:90000, maxBuffer:96*1024*1024, stdio:['ignore','pipe','pipe']});}
  catch {throw Error(`${bin} read failed. Check existing access locally. No authentication was initiated and stderr was not copied.`);}
}
function git(a){return command('git', ['--no-optional-locks','-C',source,...a]);}
function api(endpoint){return JSON.parse(command('gh',['api','--hostname','github.com','--method','GET',endpoint]).toString('utf8'));}
function localBlob(repoPath){return git(['cat-file','blob',`${PIN.releaseCommit}:${repoPath}`]);}
function remoteBlob(sha) {
  const r=api(`repos/${PIN.repository}/git/blobs/${sha}`);
  if(r.encoding!=='base64' || typeof r.content!=='string')throw Error('Unsupported blob format');
  const b=Buffer.from(r.content.replace(/\s/g,''),'base64');
  if(gitBlob(b)!==sha)throw Error('Git blob hash mismatch');
  return b;
}
function indexProof() {
  const head=git(['rev-parse','HEAD']).toString().trim();
  const indexPath=git(['rev-parse','--git-path','index']).toString().trim();
  const indexAbs=path.isAbsolute(indexPath)?indexPath:path.resolve(source,indexPath);
  return {head,indexSha256:fs.existsSync(indexAbs)?sha256(fs.readFileSync(indexAbs)):null};
}
try {
  if(github && PIN.key!=='five')throw Error('--github supports only --release five; use existing local Git objects for final Git preservation.');
  if (fs.existsSync(dest)) throw Error('Destination already exists. Choose a NEW empty path; nothing was overwritten.');
  // This repository permits temporary output only within its own ignored .tmp.
  // An explicit source makes the same command usable in a fresh checkout.
  const sr=fs.realpathSync(source), allowed=path.join(sr,'.tmp');
  const rel=path.relative(allowed,dest);
  if(!rel || rel==='..' || rel.startsWith('..'+path.sep) || path.isAbsolute(rel))throw Error('Use a NEW destination below SOURCE_REPO/.tmp.');
  let cursor=sr;
  for(const part of path.relative(sr,dest).split(path.sep)){
    cursor=path.join(cursor,part);
    if(fs.existsSync(cursor) && (fs.lstatSync(cursor).isSymbolicLink() || fs.realpathSync(cursor)!==cursor))throw Error('Linked destination path rejected.');
  }
  let before=null, raw, entries;
  if(github){
    const r=api(`repos/${PIN.repository}`);
    if(r.full_name!==PIN.repository || r.private!==true)throw Error('Repository identity/private state differs.');
    const commitTree=api(`repos/${PIN.repository}/git/trees/${PIN.releaseCommit}`);
    const ra=commitTree.tree.find(x=>x.path==='release-artifacts'&&x.type==='tree');
    if(!ra)throw Error('Missing release-artifacts');
    const parentTree=api(`repos/${PIN.repository}/git/trees/${ra.sha}`);
    const snap=parentTree.tree.find(x=>x.path==='tinlumo-copy-debt-r1'&&x.type==='tree');
    if(snap?.sha!==PIN.artifactTree)throw Error('Pinned release tree mismatch');
    const tree=api(`repos/${PIN.repository}/git/trees/${PIN.artifactTree}?recursive=1`);
    if(tree.truncated)throw Error('Incomplete GitHub tree');
    entries=tree.tree.filter(x=>x.type==='blob');
    if(entries.some(x=>x.mode!=='100644'))throw Error('Non-regular snapshot entry');
    raw=remoteBlob(PIN.manifestBlob);
  } else {
    before=indexProof();
    const tree=git(['rev-parse',`${PIN.releaseCommit}:${PIN.artifact}`]).toString().trim();
    if(tree!==PIN.artifactTree)throw Error('Pinned release tree mismatch');
    raw=localBlob(PIN.manifest);
    entries=git(['ls-tree','-r','-z',`${PIN.releaseCommit}:${PIN.artifact}`]).toString('utf8').split('\0').filter(Boolean).map(line=>{
      const m=/^(\d+) (\w+) ([a-f0-9]{40})\t(.+)$/.exec(line);
      if(!m||m[1]!=='100644'||m[2]!=='blob')throw Error('Non-regular snapshot entry');
      return {mode:m[1],type:m[2],sha:m[3],path:m[4]};
    });
  }
  if(gitBlob(raw)!==PIN.manifestBlob)throw Error('Pinned manifest blob mismatch');
  const here=path.dirname(fileURLToPath(import.meta.url));
  const recordedRaw=raw;
  if(PIN.key==='final'){
    raw=fs.readFileSync(path.join(here,'final-git-manifest.json'));
    if(gitBlob(raw)!==PIN.snapshotManifestBlob)throw Error('Git-preservation manifest differs');
    console.log('FINAL GIT PRESERVATION: historical manifest differs on 33 text files. This restores pinned Git bytes, not original deployed bytes.');
  }
  const m=validateManifest(JSON.parse(raw),true,PIN);
  const treeMap=new Map(entries.map(e=>[safeRelative(e.path),e]));
  if(treeMap.size!==PIN.files || entries.length!==PIN.files || m.files.some(e=>!treeMap.has(e.file)))throw Error('Tree and manifest paths differ');
  fs.mkdirSync(path.dirname(dest),{recursive:true}); fs.mkdirSync(dest,{recursive:false});
  fs.mkdirSync(path.join(dest,'public')); fs.mkdirSync(path.join(dest,'evidence'));
  fs.writeFileSync(path.join(dest,'evidence','distribution.original.json'),raw,{flag:'wx'});
  if(PIN.key==='final')fs.writeFileSync(path.join(dest,'evidence','distribution.recorded-historical.json'),recordedRaw,{flag:'wx'});
  const rows=[];
  for(const [i,e] of m.files.entries()){
    const te=treeMap.get(e.file);
    const b=github?remoteBlob(te.sha):localBlob(`${PIN.artifact}/${e.file}`);
    if(gitBlob(b)!==te.sha || b.length!==e.bytes || sha256(b)!==e.sha256)throw Error(`Byte validation failed: ${e.file}`);
    const out=path.join(dest,'public',...e.file.split('/'));
    fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,b,{flag:'wx'});
    rows.push({file:e.file,bytes:b.length,sha256:e.sha256,gitBlob:te.sha});
    console.log(`[${i+1}/${m.files.length}] verified ${e.file}`);
  }
  const after=github?null:indexProof();
  if(before && JSON.stringify(before)!==JSON.stringify(after))throw Error('Source HEAD/index changed concurrently; investigate before viewing.');
  for(const f of ['common.mjs','serve.mjs','verify.mjs'])fs.copyFileSync(path.join(here,f),path.join(dest,f),fs.constants.COPYFILE_EXCL);
  fs.writeFileSync(path.join(dest,'START_PREVIEW.cmd'),`@echo off\r\ncd /d "%~dp0"\r\nnode serve.mjs --root "%~dp0." --port ${previewPort}\r\npause\r\n`,{flag:'wx'});
  fs.writeFileSync(path.join(dest,'evidence','RESTORE_RESULT.json'),JSON.stringify({status:'BYTES_RESTORED_BROWSER_QA_PENDING',time:new Date().toISOString(),sourceMode:github?'existing-gh-auth-read-only-GET':'local-git-object-read-only',...PIN,before,after,totalBytes:rows.reduce((n,e)=>n+e.bytes,0),files:rows,windowsBrowserQA:'NOT_RUN',notes:['No checkout, reset, pull, merge, npm install, Git push or provider operations.','HEAD/index preservation is not a complete worktree-content audit.','No original file was rewritten.','Historical policy/content may not reflect current business state.']},null,2),{flag:'wx'});
  console.log(`\nRESTORED: ${dest}\nNext: node "${path.join(dest,'serve.mjs')}" --root "${dest}" --port ${previewPort}\nJA http://127.0.0.1:${previewPort}/ja/\nEN http://127.0.0.1:${previewPort}/en/\nStop with Ctrl+C in that server terminal. Browser QA remains pending.`);
} catch(e) {
  console.error('RESTORE STOPPED: '+e.message);
  console.error('No existing workspace or remote data was changed. A partial NEW destination, if created, was retained; it is not a completed restore.');
  process.exitCode=1;
}
