import {readFile,writeFile,stat,readdir} from 'node:fs/promises';
import {spawnSync,execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
const qa='docs/qa/game004-magnet-release-r1',m=JSON.parse(await readFile(qa+'/distribution.json'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const git=(...a)=>execFileSync('git',a,{windowsHide:true,maxBuffer:32*1024*1024,stdio:['pipe','pipe','pipe']});
const textGit=(...a)=>git(...a).toString().trim();
assert.equal(path.resolve(process.cwd()).toLowerCase(),'c:\\projects\\web game studio');
assert.equal(m.root,'release-artifacts/game004-production-r1');assert.equal(m.files.length,62);
async function walk(dir,prefix=''){const found=[];for(const e of await readdir(dir,{withFileTypes:true})){assert.ok(!e.isSymbolicLink(),'Symlink in distribution');const name=prefix+e.name;if(e.isDirectory())found.push(...await walk(dir+'/'+e.name,name+'/'));else found.push(name);}return found;}
assert.deepEqual((await walk(m.root)).sort(),m.files.map(f=>f.file).sort(),'Unexpected distribution file');
for(const f of m.files)assert.equal(hash(await readFile(m.root+'/'+f.file)),f.sha256);
const cfg=JSON.parse(await readFile('config/release-production/wrangler.json'));
assert.equal(cfg.name,'tinlumo-production');assert.equal(cfg.workers_dev,false);assert.equal(cfg.preview_urls,false);assert.equal(cfg.main,undefined);assert.equal(cfg.observability.enabled,false);
const deploy=process.argv.includes('--deploy'),rollback=process.argv.includes('--rollback');assert.ok(!(deploy&&rollback));
const checkpoint=textGit('rev-parse','HEAD');
if(deploy){
 assert.notEqual(checkpoint,'8589025926c2ca34d87548521e28d7277e668f66');assert.equal(textGit('branch','--show-current'),'main');
 assert.equal(textGit('rev-parse','origin/main'),checkpoint);assert.equal(textGit('ls-remote','origin','refs/heads/main').split(/\s/)[0],checkpoint);
 assert.equal(textGit('diff','--name-only'),'');assert.equal(textGit('diff','--cached','--name-only'),'');
 assert.equal(textGit('show',checkpoint+':'+qa+'/distribution.json'),(await readFile(qa+'/distribution.json','utf8')).replaceAll('\r\n','\n').trim());
 for(const f of m.files)assert.equal(hash(git('show',checkpoint+':'+m.root+'/'+f.file)),f.sha256,'Committed release bytes differ');
 for(const mode of ['staged','history'])assert.equal(JSON.parse(await readFile('.tmp/security-r1/'+mode+'.summary.json')).status,'PASS');
 assert.equal(JSON.parse(await readFile(qa+'/security.json')).newCandidates,0);
 for(const file of ['local-browser.json','local-earned-flow.json','local-distribution.json','local-consent.json']){
  const result=JSON.parse(await readFile(qa+'/'+file));assert.equal(result.status,'PASS');assert.equal(result.artifactSha256,hash(await readFile(qa+'/distribution.json')),'QA is for another artifact');
 }
 try{await stat(qa+'/deploy.json');throw Error('Deployment already attempted; inspect live state before any retry');}catch(e){if(e.code!=='ENOENT')throw e;}
}
const args=['.cache/tools/wrangler-r1/node_modules/wrangler/bin/wrangler.js'];
if(rollback){
 const previous=JSON.parse(await readFile(qa+'/deploy.json'));assert.equal(previous.worker,'tinlumo-production');assert.ok(previous.version);
 args.push('rollback',m.rollback.version,'--config','config/release-production/wrangler.json','--message','Game004 smoke failed; restore prior accepted Portal');
}else{args.push('deploy','--config','config/release-production/wrangler.json','--assets',path.resolve(m.root),'--keep-vars','--message','Game004 Human Release Gate PASS; full-r1');if(!deploy)args.push('--dry-run','--outdir','.tmp/magnet-release-r1/dry-run');}
const r=spawnSync(process.execPath,args,{encoding:'utf8',windowsHide:true,maxBuffer:8*1024*1024,input:rollback?'y\n':undefined,env:{...process.env,CLOUDFLARE_ACCOUNT_ID:'9f15cb18966fea37828c2a1982ab950b',WRANGLER_SEND_METRICS:'false',WRANGLER_WRITE_LOGS:'false',WRANGLER_LOG_SANITIZE:'true',CI:'true',TEMP:path.resolve('.tmp'),TMP:path.resolve('.tmp')}});
const output=(r.stdout??'')+'\n'+(r.stderr??''),version=output.match(/Current Version ID:\s*([a-f0-9-]{36})/i)?.[1]??null;
const result={at:new Date().toISOString(),mode:rollback?'ROLLBACK':deploy?'PRODUCTION_DEPLOY':'DRY_RUN',exitCode:r.status,worker:'tinlumo-production',version,checkpoint,assetRoot:m.root,onlyStaticAssets:true,workersDev:false,versionPreview:false,rawOutputRetained:false,errorCodes:[...output.matchAll(/\[code:\s*(\d+)\]/g)].map(x=>x[1]),authenticationActionNeeded:/not logged in|authentication failed|expired.*token|OAuth.*failed/i.test(output)};
await writeFile(qa+(rollback?'/rollback.json':deploy?'/deploy.json':'/dry-run.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));assert.equal(r.status,0,'Wrangler failed; inspect sanitized diagnostics');
