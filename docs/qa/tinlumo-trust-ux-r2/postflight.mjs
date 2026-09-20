import fs from 'node:fs/promises';
import {execFileSync,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const qa='docs/qa/tinlumo-trust-ux-r2';
const before=JSON.parse(await fs.readFile(qa+'/preflight.json'));
const manifest=JSON.parse(await fs.readFile(qa+'/distribution.json'));
const git=(...a)=>execFileSync('git',a,{encoding:'utf8',windowsHide:true}).trim();
const sha=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
const allowed=new Set(['docs/games/PRODUCTION_CURRENT.md','astro.public.config.mjs','scripts/public-release-build.mjs','scripts/magnet-public-build.mjs','scripts/magnet-release-build.mjs','src/rc/site.json','src/rc/Layout.astro','src/rc/Play.astro','src/rc/PublicOperations.astro','src/rc/pages/index.astro','src/rc/pages/[locale]/[...path].astro']);
const newAllowed=new Set(['astro.trust.config.mjs','scripts/retired-public-build.mjs','scripts/trust-ux-build.mjs','src/rc/public-catalog.ts','src/rc/public-documents.ts','src/rc/DocumentRevision.astro','src/rc/GameCards.astro','src/rc/MagnetPlay.astro','src/rc/trust-ux.css','tests/trust-ux-r2.test.ts']);
const changed=[];for(const f of before.files){const hash=await sha(f.file);if(hash!==f.sha256){assert.ok(allowed.has(f.file),'Out of scope change: '+f.file);changed.push({file:f.file,before:f.sha256,after:hash});}}
for(const f of before.distribution.files)assert.equal(await sha(before.distribution.root+'/'+f.file),f.sha256,'Previous production artifact changed');
for(const f of manifest.files)assert.equal(await sha(manifest.root+'/'+f.file),f.sha256);
for(const f of manifest.sources)assert.equal(await sha(f.file),f.sha256,'Candidate sources changed since build: '+f.file);
const original=new Set(before.files.map(f=>f.file));
const newFiles=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(Boolean).filter(f=>!original.has(f));
for(const file of newFiles)assert.ok(file.startsWith(qa+'/')||newAllowed.has(file),'Unexpected new path: '+file);
assert.equal(git('rev-parse','HEAD'),before.head);assert.equal(git('rev-parse','@{u}'),before.upstream);assert.equal(git('ls-files','--stage'),before.index);
for(const script of ['scripts/public-release-build.mjs','scripts/magnet-public-build.mjs','scripts/magnet-release-build.mjs','astro.public.config.mjs']){
 const run=spawnSync(process.execPath,[script],{encoding:'utf8',windowsHide:true});assert.equal(run.status,1);assert.ok(run.stderr.includes('Legacy public build retired.'));
}
const report={at:new Date().toISOString(),status:'PRESERVED_WITH_SCOPED_CHANGES',head:before.head,indexUnchanged:true,upstreamUnchanged:true,baselineExistingFiles:before.files.length,existingChanged:changed,newFiles,productionArtifactPreserved:before.distribution.files.length,newCandidateFilesVerified:manifest.files.length,sourceFilesVerified:manifest.sources.length,legacyBuildEntrypointsFailClosed:4,externalOperations:0,models:['gpt-6-astra']};
await fs.writeFile(qa+'/postflight.json',JSON.stringify(report,null,2)+'\n');console.log({existingChanged:changed.length,newFiles:newFiles.length,productionPreserved:before.distribution.files.length,indexUnchanged:true});
