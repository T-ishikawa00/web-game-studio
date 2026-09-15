import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import {launch,setup} from './r5-helpers.mjs';
const out='.tmp/lightwork-polish',shots='docs/qa/lightwork-art-polish-01/screens';
await mkdir(out,{recursive:true});await mkdir(shots,{recursive:true});
const browser=await launch(),results=[];
async function trial(name,fn,options={}){const u=await setup(browser,options);try{await u.c.addInitScript(()=>sessionStorage.setItem('wgs:light-craft-mode','LG-C'));await u.open('light-garden');await fn(u);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.stack});console.log('FAIL',name,e.message);}finally{await u.c.close();}}
const opacity=async u=>u.a('mirror:0').locator('.rotation-cue').evaluate(e=>getComputedStyle(e).opacity);
const receiver=async u=>u.f.locator('.garden>svg>.receiver').evaluate(e=>({live:e.dataset.receiving,latched:e.dataset.activated,lens:e.querySelector('.receiver-lens').getAttribute('fill'),arm:e.querySelector('.clasp-arm').getAttribute('transform'),glint:!!e.querySelector('.lens-live')}));
try{
 await trial('Touch initial cue survives dismissed text; no sticky arrow after input',async u=>{await u.level('L01');if(await u.a('close-guide').count())await u.a('close-guide').tap();assert.equal(await opacity(u),'1');await u.a('mirror:0').tap();assert.equal(await opacity(u),'0');await u.level('L16');await u.a('mirror:0').tap();assert.equal(await opacity(u),'0');},{hasTouch:true,isMobile:true,viewport:{width:390,height:844}});
 await trial('Mouse hover and keyboard focus reveal arrows without changing board',async u=>{await u.level('L16');await u.p.mouse.move(0,0);assert.equal(await opacity(u),'0');const state=await u.state();await u.a('mirror:0').hover();assert.equal(await opacity(u),'1');await u.p.mouse.move(0,0);assert.equal(await opacity(u),'0');await u.a('mirror:0').focus();await u.a('mirror:0').press('Shift');assert.equal(await opacity(u),'1');assert.deepEqual((await u.state()).progress,state.progress);await u.a('mirror:0').press('Enter');assert.equal((await u.state()).history.length,state.history.length+1);});
 for(const width of [320,390])await trial('Silent reduced motion '+width+': lens, clasp, gate, Undo and crests',async u=>{
  await u.level('L05');await u.menu('settings');await u.f.locator('#lg-mute').check();await u.f.locator('#motion-setting').check();await u.f.locator('#close-settings').click();const closed=await receiver(u);assert.equal(closed.live,'false');assert.equal(closed.latched,'false');
  await u.f.locator('[data-capture-frame]').screenshot({path:shots+'/silent-'+width+'-closed.png'});
  await u.a('mirror:0').tap();const live=await receiver(u);assert.equal(live.live,'true');assert.equal(live.latched,'true');assert.notEqual(live.arm,closed.arm);assert.equal(live.glint,true);
  await u.f.locator('[data-capture-frame]').screenshot({path:shots+'/silent-'+width+'-live.png'});
  await u.a('mirror:0').tap();const retained=await receiver(u);assert.equal(retained.live,'false');assert.equal(retained.latched,'true');assert.equal(retained.arm,live.arm);assert.equal(retained.lens,closed.lens);assert.equal(retained.glint,false);assert.equal(await u.f.locator('.object-gate.open').count(),1);assert.equal(await u.f.locator('.light-cause,.receiver-cause').count(),0);
  await u.f.locator('[data-capture-frame]').screenshot({path:shots+'/silent-'+width+'-retained.png'});
  const crests=await u.f.locator('.garden>svg>.receiver .device-crest,.garden>svg>.object-gate .device-crest').evaluateAll(es=>es.map(e=>e.innerHTML));assert.equal(crests[0],crests[1]);
  await u.a('undo').tap();assert.equal((await receiver(u)).live,'true');await u.a('undo').tap();assert.deepEqual(await receiver(u),closed);
  await u.level('L16');const b=await u.a('mirror:0').boundingBox();assert.ok(b.width>=30&&b.height>=30);await u.a('mirror:0').tap();await u.a('undo').tap();assert.equal((await u.state()).history.length,0);const pairs=await u.f.locator('.garden>svg>.device-crest').count();assert.equal(pairs,0); // Crests belong to their devices, not detached board annotations.
  await u.f.locator('[data-capture-frame]').screenshot({path:shots+'/silent-'+width+'-L16.png'});
  await u.menu('settings');assert.equal(await u.f.locator('#lg-mute').isChecked(),true);assert.equal(await u.f.locator('#motion-setting').isChecked(),true);
 },{hasTouch:true,isMobile:true,viewport:{width,height:740},reducedMotion:'reduce'});
 await trial('Shutter animation endpoint matches static retained plates',async u=>{await u.level('L05');await u.a('mirror:0').click();const ends=await u.f.locator('body').evaluate(()=>document.getAnimations().filter(a=>a.effect?.target?.matches?.('.shutter-leaf')).map(a=>({end:a.effect.getKeyframes().at(-1).transform,duration:a.effect.getTiming().duration,delay:a.effect.getTiming().delay})));assert.equal(ends.length,4);for(const e of ends){assert.match(e.end,/translate\(-?13px,\s*-?13px\) scale\(0?\.4\)/);assert.equal(e.duration,45);assert.equal(e.delay,245);}await u.p.waitForTimeout(1050);const final=await u.f.locator('.object-gate.open .shutter-leaf').evaluateAll(es=>es.map(e=>e.getAttribute('transform')));for(const t of final)assert.match(t,/translate\(-?13 -?13\) scale\(\.4\)/);});
}finally{await browser.close();await writeFile(out+'/polish-results.json',JSON.stringify({results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
