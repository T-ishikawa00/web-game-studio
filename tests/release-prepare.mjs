import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {publicHtml,prepare,localPackagingBlockers} from '../scripts/release-prepare.mjs';
import {releaseBlockers,requiredFields,requiredApprovals,requiredDecisionFields} from '../src/rc/readiness.mjs';
const publicId='0'.repeat(32); // synthetic public beacon identifier; never transmitted
test('Production projection changes outer SEO only and creates paired absolute language links',async()=>{
 for(const locale of ['ja','en']){const html=await readFile(`.cache/rc-dist/${locale}/play/tiny-delivery/index.html`,'utf8');const out=publicHtml(html,`/${locale}/play/tiny-delivery/`,'https://release.invalid',publicId);
  assert.match(out,/hreflang="ja" href="https:\/\/release\.invalid\/ja\/play\/tiny-delivery\/"/);assert.match(out,/hreflang="en" href="https:\/\/release\.invalid\/en\/play\/tiny-delivery\/"/);
  assert.equal((out.match(/beacon\.min\.js/g)||[]).length,1);assert.equal((out.match(/rel="canonical"/g)||[]).length,1);assert.ok(!out.includes('noindex'));assert.equal(out.match(/<iframe[^>]*>/)?.[0],html.match(/<iframe[^>]*>/)?.[0]);
 }
 assert.throws(()=>publicHtml('<html></html>','/','http://release.invalid',publicId));
 assert.throws(()=>publicHtml('<html></html>','/','https://release.invalid','invalid'));
});
test('Current unresolved configuration blocks even explicit local preparation without output',async()=>{
 const siteBefore=await readFile('src/rc/site.json');
 assert.equal(await prepare({write:true}),false);
 await assert.rejects(access('.cache/tinlumo-approved-dist'));
 assert.deepEqual(await readFile('src/rc/site.json'),siteBefore);
});
test('Local packaging precedes publication permission without weakening the release gate',()=>{
 const reviewed={...Object.fromEntries(requiredFields.map(k=>[k,'Human-approved value'])),releaseDecisions:Object.fromEntries(requiredDecisionFields.map(k=>[k,'Human-approved decision'])),legalDraft:false,unresolvedRights:[],approvals:{...Object.fromEntries(requiredApprovals.map(k=>[k,true])),release:false,deployedUrlSmoke:false}};
 assert.deepEqual(localPackagingBlockers(reviewed),[]);
 assert.deepEqual(releaseBlockers(reviewed).map(b=>b.code),['release','deployedUrlSmoke']);
 assert.ok(localPackagingBlockers({...reviewed,domain:null}).some(b=>b.code==='domain'));
});
