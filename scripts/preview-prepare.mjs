import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, copyFile, writeFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { releaseBlockers } from '../src/rc/readiness.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const base='docs/qa/soft-launch-rc-r1/checkpoint-r1/distribution-manifest.json';
const output='.cache/tinlumo-protected-preview-r1';
const evidence='docs/qa/production-deploy-r1';
const hash=b=>createHash('sha256').update(b).digest('hex');
const path=p=>resolve(root,p);
async function walk(dir,prefix='') {
  const files=[];
  for(const e of await readdir(dir,{withFileTypes:true})) {
    assert.ok(!e.isSymbolicLink(),'Symlink forbidden');
    const p=prefix+e.name;
    if(e.isDirectory())files.push(...await walk(resolve(dir,e.name),p+'/'));
    else {assert.ok(e.isFile()); files.push(p);}
  }
  return files.sort();
}

// A packaging check cannot establish Access protection or authorize upload.
// All source bytes and public-release decisions remain unchanged.
const previous=JSON.parse(await readFile(path(base),'utf8'));
const gitManifest=JSON.parse(execFileSync('git',['show','14cb803243eceba9138f35dd4d6b7c46bd46c490:'+base],{cwd:root,encoding:'utf8',windowsHide:true}));
assert.deepEqual(previous,gitManifest,'Source manifest differs from accepted Git checkpoint');
assert.equal(previous.files.length,48);
assert.deepEqual(await walk(path('.cache/rc-dist')),previous.files.map(f=>f.file).sort());
const site=JSON.parse(await readFile(path('src/rc/site.json'),'utf8'));
assert.equal(site.analyticsProvider,'disabled');
assert.equal(site.legalDraft,true);
const publicBlockers=releaseBlockers(site);
assert.ok(publicBlockers.length>0,'Public release must remain BLOCKED');
for(const item of previous.files) {
  const bytes=await readFile(path('.cache/rc-dist/'+item.file));
  assert.equal(bytes.length,item.bytes,item.file);
  assert.equal(hash(bytes),item.sha256,item.file);
  if(item.file.endsWith('.html'))assert.match(bytes.toString(),/noindex/);
}
const config=JSON.parse(await readFile(path('config/release-preview/wrangler.json'),'utf8'));
assert.equal(config.name,'tinlumo-preview');
assert.equal(config.account_id,'9f15cb18966fea37828c2a1982ab950b');
assert.equal(config.workers_dev,false);assert.equal(config.preview_urls,false);
assert.equal(config.main,undefined);assert.equal(config.routes,undefined);
assert.equal(resolve(path('config/release-preview'),config.assets.directory),path(output));
assert.equal(config.assets.not_found_handling,'404-page');
assert.equal(config.assets.html_handling,'auto-trailing-slash');
const headers=await readFile(path('config/release-preview/_headers'));
assert.match(headers.toString(),/X-Frame-Options: SAMEORIGIN/);
assert.match(headers.toString(),/X-Robots-Tag: noindex/);
const expected=[...previous.files.map(({file,sha256,bytes})=>({file,sha256,bytes})),{file:'_headers',sha256:hash(headers),bytes:headers.length}].sort((a,b)=>a.file.localeCompare(b.file));
let exists=false;
try {assert.ok((await stat(path(output))).isDirectory());exists=true;}catch(e){if(e.code!=='ENOENT')throw e;}
if(!exists) {
  await mkdir(path(output));
  for(const item of previous.files) {
    const dest=path(output+'/'+item.file);await mkdir(dirname(dest),{recursive:true});
    await copyFile(path('.cache/rc-dist/'+item.file),dest);
  }
  await writeFile(path(output+'/_headers'),headers,{flag:'wx'});
}
assert.deepEqual(await walk(path(output)),expected.map(f=>f.file).sort());
for(const item of expected)assert.equal(hash(await readFile(path(output+'/'+item.file))),item.sha256,item.file);
await mkdir(path(evidence),{recursive:true});
const manifest={profile:'PROTECTED_PREVIEW_ONLY',sourceCheckpoint:'14cb803243eceba9138f35dd4d6b7c46bd46c490',sourceManifest:base,sourceManifestSha256:hash(await readFile(path(base))),assetRoot:output,files:expected,totalFiles:expected.length,rcFilesByteIdentical:48,addedFiles:['_headers'],analytics:'disabled',noindex:true,publicRelease:'BLOCKED',externalAccessProtection:'NOT ESTABLISHED BY LOCAL PACKAGING',deploymentCheckpoint:'The Git commit containing this manifest; record exact SHA in postflight after commit.'};
await writeFile(path(evidence+'/distribution-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
await writeFile(path(evidence+'/local-preflight.json'),JSON.stringify({at:new Date().toISOString(),status:'LOCAL_PACKAGE_VERIFIED',sourceCheckpoint:manifest.sourceCheckpoint,files:49,rcFilesByteIdentical:48,frames:'SAMEORIGIN; frame-ancestors self',publicRelease:'BLOCKED',publicBlockers,gameSourceChanges:0,externalWritesByThisScript:0,liveAccessGate:'See separate preflight-status and anonymous check receipts'},null,2)+'\n');
console.log('PASS: 48 RC files byte-identical, 49-file protected-preview package. Public release BLOCKED. Access must be verified before any RC upload.');
