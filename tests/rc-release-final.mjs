import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {launch,setup,base,ids} from './rc-helpers.mjs';
import {rcEvidenceDir as out} from '../scripts/rc-evidence.mjs';
const b=await launch(),results=[];
async function test(name,fn){const u=await setup(b);try{const detail=await fn(u);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);results.push({name,status:'PASS',...detail});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}finally{await u.c.close();}}
try{
 await test('JA/EN normal navigation, separate saves, pause/resume, central draft copy',async u=>{
  for(const lang of ['ja','en']){
   for(const id of ids){await u.p.goto(`${base}/${lang}/`);await u.p.locator(`a[href="/${lang}/games/${id}/"]`).first().click();await u.p.locator(`a[href="/${lang}/play/${id}/"]`).first().click();await u.a('menu').waitFor();await u.p.locator('#rc-loading').waitFor({state:'hidden'});
    if(lang==='en')await u.level(id==='light-garden'?'L12':id==='two-ways-home'?'T12':'D12');const previous=JSON.stringify(await u.saved(id));if(id==='two-ways-home')await u.buttons();await u.a(id==='light-garden'?'mirror:0':id==='two-ways-home'?'move:1':'arrow:0').press('Enter');await u.p.waitForFunction(({id,previous})=>JSON.stringify(JSON.parse(localStorage.getItem('wgs:save:'+id)))!==previous,{id,previous});const saved=await u.saved(id);assert.equal(saved.gameId,id);assert.equal(saved.version,'0.1.0');
    await u.p.locator('#rc-reset-save').click();await u.f.locator('.paused-veil').waitFor();await u.p.locator('#rc-cancel-reset').click();await u.f.locator('.paused-veil').waitFor({state:'hidden'});await u.p.reload();await u.a('menu').waitFor();assert.deepEqual(await u.saved(id),saved);
   }
   for(const page of ['about','contact','privacy','terms']){await u.p.goto(`${base}/${lang}/${page}/`);const content=await u.p.locator('main').innerText();assert.match(content,lang==='ja'?/未確定（公開前に決定）/:/Undecided \(required before publication\)/);assert.equal(await u.p.locator('form').count(),0);for(const width of [320,1440]){await u.p.setViewportSize({width,height:1000});assert.ok(await u.p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}}
  }return {games:3,locales:2,externalRequests:0,screenshotCount:0};
 });
 for(const mode of (process.argv.includes('--navigation-only')?[]:['slow','abort']))await test(`Hakorilo BGM ${mode}: first input and save remain usable`,async u=>{
  const requests=[],finished=[],failed=[];u.p.on('request',r=>{if(r.url().endsWith('/music.wav'))requests.push(r.url());});u.p.on('requestfinished',r=>{if(r.url().endsWith('/music.wav'))finished.push(r.url());});u.p.on('requestfailed',r=>{if(r.url().endsWith('/music.wav'))failed.push(r.failure()?.errorText);});
  const cdp=await u.c.newCDPSession(u.p);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:125000,uploadThroughput:62500,connectionType:'cellular3g'});
  if(mode==='abort')await u.c.route('**/music.wav',r=>r.abort('failed'));
  u.p.setDefaultTimeout(15000);const start=performance.now();await u.open('tiny-delivery');const playableMs=Math.round(performance.now()-start);assert.equal(requests.length,0,'No BGM request before first user action');
  const inputStart=performance.now();await u.a('arrow:0').press('Enter');await u.p.waitForFunction(()=>!!localStorage.getItem('wgs:save:tiny-delivery'));const firstInputAndSaveMs=Math.round(performance.now()-inputStart);await u.p.waitForTimeout(600);assert.ok(requests.length>=1);
  if(mode==='slow')assert.equal(finished.length,0,'Large BGM remains in flight');else assert.ok(failed.length>=1);
  const first=JSON.stringify(await u.saved('tiny-delivery'));await u.a('arrow:0').press('Enter');await u.p.waitForFunction(raw=>localStorage.getItem('wgs:save:tiny-delivery')!==raw,first);assert.equal(await u.p.locator('#rc-save-status').getAttribute('data-state'),'ok');
  const initialScene=await u.f.locator('.scene-status').innerText();await u.a('go').click();await u.p.waitForFunction(()=>document.querySelector('iframe').contentDocument.querySelector('.scene-status').innerText!==undefined);await u.p.waitForTimeout(700);const scene=await u.f.locator('.scene-status').innerText();assert.notEqual(scene,initialScene,'Simulation runs while BGM pending or unavailable');
  return {network:'CDP simulation; 1 Mbps down / 0.5 Mbps up / 150 ms latency; cold cache; no CPU throttle',playableMs,firstInputAndSaveMs,bgmRequests:requests.length,bgmCompleted:finished.length,bgmFailed:failed.length,observedThroughInputMs:Math.round(performance.now()-inputStart),continuedPlayAndSave:true,physicalNetwork:'NOT TESTED',fullBgmDownloadWaited:false};
 });
}finally{await b.close();await writeFile(`${out}/browser-results.json`,JSON.stringify({at:new Date().toISOString(),environment:'Windows Edge headless, loopback; network simulation only; isolated browser contexts',results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
