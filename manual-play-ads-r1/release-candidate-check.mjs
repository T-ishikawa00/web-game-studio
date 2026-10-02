import fs from 'node:fs';
import assert from 'node:assert/strict';
import {read,sha,json,verifyManifest} from '../game008-009-production-r1/common.mjs';
const root='manual-play-ads-r1',out=root+'/internal/release-r1',old=read(out+'/approved/CANDIDATE_MANIFEST.json'),m=read(root+'/CANDIDATE_MANIFEST.json');
verifyManifest(m);const changed=[];
for(const file of old.files){
 const next=m.files.find(f=>f.file===file.file);assert(next);if(next.sha256===file.sha256)continue;
 assert(old.changed.includes(file.file));const route='/'+file.file.replace(/index.html$/,''),policy=m.policies.find(p=>p.route===route),before=fs.readFileSync(out+'/approved/candidate/'+file.file,'utf8'),after=fs.readFileSync(m.root+'/'+file.file,'utf8');
 const removed=[];const expected=before.replace(/<aside class="manual-play-ad [^"]+"[\s\S]*?<\/aside>/g,block=>{
  const unit=block.match(/data-manual-ad="([^"]+)"/)[1];if((unit==='bottom'&&policy.bottom==='hold')||(unit!=='bottom'&&!policy.width)){removed.push(unit);return '';}return block;
 });assert.equal(after,expected,'Release candidate has a delta beyond HOLD markup removal');
 changed.push({route,removedUnits:removed});
}
assert.equal(changed.length,10);assert.equal(m.files.length,old.files.length);assert.equal(sha(fs.readFileSync(root+'/play-ads.js')),old.files.find(f=>f.file==='assets/manual-play-ads-r1.js').sha256);
const receipt={at:new Date().toISOString(),status:'PASS',approvedManifestSha256:sha(fs.readFileSync(out+'/approved/CANDIDATE_MANIFEST.json')),releaseManifestSha256:sha(fs.readFileSync(root+'/CANDIDATE_MANIFEST.json')),delta:'ONLY_HOLD_UNIT_MARKUP_REMOVAL',changed,visibleUnitMarkupExact:true,allExistingCssAndJsExact:true,acceptedGameRuntimeExact:true,slotPolicy:m.policies.map(p=>({route:p.route,slots:[...(p.width?['6898213660','4699511455']:[]),...(p.bottom==='safe'?['9760266447']:[])]})),priorQaEvidence:'approved/QA_RESULTS.json',freshQaEvidence:'browser-qa.json'};
json(out+'/candidate-delta.json',receipt);console.log(JSON.stringify({status:'PASS',delta:receipt.delta,changedRoutes:changed.length,releaseManifestSha256:receipt.releaseManifestSha256}));
