import fs from 'node:fs';
import assert from 'node:assert/strict';
import {read,sha,json,walk,git,ensureRoot,verifyManifest} from '../game008-009-production-r1/common.mjs';
import {preserved} from './preservation.mjs';
ensureRoot();
const root='manual-play-ads-r1',p=read(root+'/internal/PREFLIGHT.json'),m=read(root+'/CANDIDATE_MANIFEST.json'),old=read(m.basisManifest.manifestFile);
preserved(p.tracked);verifyManifest(m);verifyManifest(old);
assert.equal(git('rev-parse','HEAD'),p.head);assert.equal(git('diff','--cached','--name-only'),'');
const base=new Map(old.files.map(e=>[e.file,e])),changed=m.files.filter(e=>base.has(e.file)&&base.get(e.file).sha256!==e.sha256),added=m.files.filter(e=>!base.has(e.file));
assert.deepEqual(changed.map(e=>e.file).sort(),m.changed.slice().sort());assert.deepEqual(added.map(e=>e.file).sort(),m.added.slice().sort());
const currentFile='docs/games/PRODUCTION_CURRENT.md',current=fs.readFileSync(currentFile),before=fs.readFileSync(root+'/internal/current-before.md');
assert(current.subarray(current.length-before.length).equals(before));
const postflight=read(root+'/internal/POSTFLIGHT.json');assert.equal(postflight.status,'PASS');assert.equal(postflight.initialUntrackedPreserved,p.untracked.length);
const sources=walk(root).filter(f=>!f.startsWith('internal/')&&!f.startsWith('builds/')&&!f.startsWith('manual-play-ads-r1/')&&!['FINAL_DIFF.json','SECURITY_RESULTS.json'].includes(f));
json(root+'/FINAL_DIFF.json',{
 at:new Date().toISOString(),status:'PASS',head:p.head,manifestSha256:sha(fs.readFileSync(root+'/CANDIDATE_MANIFEST.json')),
 indexEmpty:true,stage:false,commit:false,push:false,deploy:false,
 candidate:{root:m.root,changed:changed.map(e=>({file:e.file,beforeSha256:base.get(e.file).sha256,afterSha256:e.sha256,bytes:e.bytes})),added,unchangedFiles:m.files.length-changed.length-added.length,deleted:old.files.filter(e=>!m.files.some(n=>n.file===e.file)).map(e=>e.file)},
 source:sources.map(file=>({file:root+'/'+file,bytes:fs.statSync(root+'/'+file).size,sha256:sha(fs.readFileSync(root+'/'+file))})),
 currentHandoff:{file:currentFile,mode:'PREPEND_ONLY',previousBodyExact:true,addedBytes:current.length-before.length,beforeSha256:sha(before),afterSha256:sha(current)},
 preservation:{otherDirtyTrackedFiles:p.tracked.filter(e=>e.file!==currentFile).length,otherDirtyTrackedExact:true,initialUntrackedPaths:p.untracked.length,initialUntrackedMissing:p.untracked.length-postflight.initialUntrackedPreserved},
 receiptsExcludedFromSourceHashes:['FINAL_DIFF.json','SECURITY_RESULTS.json'],
 existingWorkerExact:true,providerConfigurationExact:true,productionUnchanged:true,productionEvidence:'internal/POSTFLIGHT.json',humanReleaseReview:'PENDING'
});
console.log(JSON.stringify({status:'PASS',changed:changed.length,added:added.length,sourceFiles:sources.length,current:'PREPEND_ONLY',indexEmpty:true}));
