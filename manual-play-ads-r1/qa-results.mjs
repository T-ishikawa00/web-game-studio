import fs from 'node:fs';
import assert from 'node:assert/strict';
import {read,json,sha} from '../game008-009-production-r1/common.mjs';
const root='manual-play-ads-r1';
const desktop=read(root+'/internal/browser-layout.json'),mobile=read(root+'/internal/mobile-engine-layout.json');
const delta=[];
for(const row of [...desktop,...mobile]) {
 assert.equal(row.baseline.regions.length,row.candidate.regions.length);
 for(let i=0;i<row.baseline.regions.length;i++)for(const key of ['x','y','width','height']) {
  const b=row.baseline.regions[i],c=row.candidate.regions[i];assert.equal(b.selector,c.selector);
  if(Math.abs(b.rect[key]-c.rect[key])>.5)delta.push({slug:row.slug,lang:row.lang,viewport:row.viewport,selector:b.selector,key,before:b.rect[key],after:c.rect[key]});
 }
 assert(row.candidate.scroll[0]<=row.candidate.inner[0]);
 if(row.viewport[0]<=1920)assert(row.candidate.ads.filter(a=>a.unit!=='bottom').every(a=>a.hidden));
 for(const ad of row.candidate.ads)assert(!ad.push||ad.push==='1');
}
assert.equal(delta.length,0);
const flow=read(root+'/internal/flow-states.json');
for(const row of flow)for(let i=0;i<row.baseline.regions.length;i++)for(const key of ['x','y','width','height'])assert(Math.abs(row.baseline.regions[i].rect[key]-row.candidate.regions[i].rect[key])<=.5,'Active game geometry changed');
const boundaries=read(root+'/internal/breakpoints.json');
for(const r of boundaries)for(const a of r.ads.filter(a=>!a.hidden)){assert(a.distance>=150);assert.equal(a.push,'1');}
const scroll=read(root+'/internal/mobile-scroll-engine.json');
for(const r of scroll){assert(r.scroll[0]<=r.inner[0]);for(const a of r.ads.filter(a=>!a.hidden)){assert(a.distance>=150);assert.equal(a.push,'1');assert.equal(a.unit,'bottom');}}
for(const r of scroll.filter(r=>['island-connections','project-magnet','tiny-delivery'].includes(r.slug)))assert(r.ads.every(a=>a.hidden&&!a.push));
const behavior=read(root+'/internal/ad-behavior.json');
for(const r of behavior.filter(r=>r.mode!=='filled'))assert(r.ads.every(a=>a.hidden));
const pending=read(root+'/internal/ad-pending.json');assert(pending.ads.filter(a=>a.unit!=='bottom').every(a=>a.hidden&&a.state==='held-no-response'&&a.push==='1'));
const lifecycle=read(root+'/internal/ad-lifecycle.json');for(const r of lifecycle)for(const a of r.ads)assert(!a.push||a.push==='1');
const events=read(root+'/internal/local-events.json').map(e=>({game:e.game_id,event:e.event_name,input:e.input_mode,stage:e.stage}));
assert(events.some(e=>e.event==='first_meaningful_input'&&e.input==='keyboard'));
const result={at:new Date().toISOString(),manifestSha256:sha(fs.readFileSync(root+'/CANDIDATE_MANIFEST.json')),status:'LAYOUT_AND_MOCK_AD_QA_PASS_WITH_EXPLICIT_LIMITS',layoutPairs:desktop.length+mobile.length,activeGameStatePairs:flow.length,desktopAndClassicScrollbarPairs:desktop.length,mobileEnginePairs:mobile.length,protectedGeometryDelta:delta,horizontalOverflow:0,boundaryCases:boundaries.length,mobileScrollCases:scroll.length,minimumSideGap:150,minimumObservedMobileControlGap:Math.min(...scroll.flatMap(r=>r.ads.filter(a=>!a.hidden).map(a=>a.distance))),mockModes:['filled','unfilled','throw','pending'],perUnitPushMaximum:1,navigation:'fresh document, one push per slot',bfCache:'NOT_EXERCISED_BY_IAB',autoAdsExclusion:'HUMAN_CONFIRMED_UNCHANGED',realAdsRequests:0,realAdsClicks:0,gameAssets:'EXACT_BYTES_REUSED',growthRegression:'10_TESTS_PASS',localGrowthObserved:events,gameplay:{mouse:'Light Garden L01 clear; Two Ways retry/menu; five games started via ordinary UI',keyboard:'RIMBLOOM dash/pause; Two Ways first level clear; COILHOP jump/failure/retry; EMBER meaningful input recorded',pause:'RIMBLOOM, Light Garden, Two Ways, COILHOP, EMBER',retry:'Light Garden confirmation/reset; Two Ways reset; COILHOP retry',saveReload:'Light Garden continuation and Two Ways 1/21 completion preserved',audio:'RIMBLOOM and COILHOP setting toggles; audio assets/code exact bytes; listening NOT_TESTED',touchEmulation:'ATTEMPTED_NOT_VERIFIED - IAB input dispatch timed out; normal input recovered after disabling emulation and reload',physicalDevice:'NOT_TESTED',mobileOverscroll:'CSS unchanged; physical elastic overscroll NOT_TESTED',orientation:'portrait and landscape layouts measured; unsafe spacing is held'},mobileHolds:{always:['island-connections','project-magnet','tiny-delivery'],conditional:'RIMBLOOM/flow screens with classic scrollbar shrink, any viewport with <150px control separation, SDK error/no response'},providerFill:'NOT_VERIFIED',googleCMP:'IMPLEMENTATION_PRESERVED; live CMP NOT_VERIFIED',humanAcceptance:'PENDING'};
json(root+'/QA_RESULTS.json',result);console.log(JSON.stringify({...result,localGrowthObserved:undefined,gameplay:undefined}));
