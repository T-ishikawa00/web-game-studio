import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,out,ids} from './r5-helpers.mjs';
import {homeLevels} from '../src/prototypes/levels.ts';
import {homeLevelsR2} from '../src/prototypes/home-levels-r2.ts';
const old=JSON.parse(await readFile('src/prototypes/home-answers-r2.json','utf8'));
await mkdir(path.join(out,'screens'),{recursive:true});const browser=await launch(),results=[];
const select=async(u,id)=>{await u.menu('levels');await u.a('level:'+id).click();};
async function trial(name,fn,opts={}){if(process.env.QA_CASE&&!name.includes(process.env.QA_CASE))return;const u=await setup(browser,opts);try{await fn(u);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.stack});console.log('FAIL',name,e.message);}finally{await u.c.close();}}
try{
for(const method of ['mouse','touch','keyboard','dpad'])await trial(`Fresh ${method}: one actual shared input; next puzzle is independent practice`,async u=>{
 await u.open(ids[1],'auto','ja');assert.equal((await u.state()).progress.levelId,'T19');assert.equal(await u.f.locator('.shared-input-diagram').count(),1);
 if(method==='mouse')await u.swipe(55,0);
 if(method==='touch'){const r=await u.f.locator('[data-swipe-board="1"]').boundingBox(),x=r.x+r.width/2,y=r.y+r.height/2,cdp=await u.c.newCDPSession(u.p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+55,y,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 if(method==='keyboard'){await u.f.locator('[data-swipe-board="0"]').focus();await u.p.keyboard.press('ArrowRight');}
 if(method==='dpad'){await u.a('dpad').click();await u.a('move:1').click();}
 assert.deepEqual((await u.state()).progress.board.positions,[10,10]);assert.equal((await u.state()).history.length,1);assert.equal((await u.state()).won,true);assert.equal(await u.f.locator('.shared-input-diagram').count(),0);
 await u.a('next').click();assert.equal((await u.state()).progress.levelId,'T01');assert.equal(await u.f.locator('.input-cue').count(),0);
 await u.f.locator('[data-swipe-board="0"]').focus();await u.p.keyboard.press('ArrowRight');await u.p.keyboard.press('ArrowRight');assert.equal((await u.state()).won,true);
 await u.a('next').click();assert.equal((await u.state()).progress.levelId,'T20');await u.swipe(55,0);await u.swipe(55,0);assert.deepEqual((await u.state()).blocked,[false,true]);await u.swipe(0,-55);assert.equal((await u.state()).won,true);
 await u.a('next').click();assert.equal((await u.state()).progress.levelId,'T21');assert.equal(await u.f.locator('.input-cue').count(),0);await u.swipe(0,55);await u.swipe(0,55);await u.swipe(-55,0);assert.equal((await u.state()).won,true);await u.a('undo').click();assert.deepEqual((await u.state()).progress.board.positions,[10,10]);
},{hasTouch:true});
for(const lang of ['ja','en'])for(const mode of ['auto','portrait','landscape'])await trial(`New primers ${lang}/${mode}: IDs, displayed numbers, initial diagram and bounded layout`,async u=>{
 await u.open(ids[1],mode,lang);for(const id of ['T19','T20','T21']){if(id!=='T19')await select(u,id);assert.match(await u.f.locator('.stage-number').innerText(),new RegExp('^0'+(homeLevels.findIndex(l=>l.id===id)+1)));assert.equal((await u.state()).progress.levelId,id);
  const frame=u.f.locator('[data-capture-frame]'),r=await frame.boundingBox();if(mode!=='auto'){assert.equal(Math.round(r.width),mode==='portrait'?432:960);assert.equal(Math.round(r.height),mode==='portrait'?768:540);}
  const overflow=await frame.evaluate(el=>{const a=el.getBoundingClientRect();return [...el.querySelectorAll('button,.board,.input-cue,.shared-input-diagram')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&b.height&&(b.x<a.x-.5||b.y<a.y-.5||b.right>a.right+.5||b.bottom>a.bottom+.5);}).map(e=>e.className);});assert.deepEqual(overflow,[]);
  await frame.screenshot({path:path.join(out,'screens',`${id}-${lang}-${mode}.png`)});
 }
});
await trial('320px new-player diagram and optional D-pad stay usable',async u=>{
 await u.open(ids[1],'auto','en');await u.a('dpad').click();const a=await u.a('move:1').boundingBox();assert.ok(a.width>=44&&a.height>=44);assert.equal(await u.p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await u.f.locator('[data-capture-frame]').screenshot({path:path.join(out,'screens','T19-en-320-dpad.png')});
},{viewport:{width:320,height:800},hasTouch:true,deviceScaleFactor:2});
for(const l of homeLevelsR2)await trial(`Legacy ${l.id}@1: exact mid-board and all 18 clears survive resume, language and mode changes`,async u=>{
 const data={levelId:l.id,levelVersion:1,board:old.find(a=>a.id===l.id).intermediate[0].state,cleared:homeLevelsR2.map(l=>l.id),settings:{reducedMotion:false}},raw=JSON.stringify({schema:1,gameId:ids[1],version:'0.1.0',data});
 await u.c.addInitScript(raw=>{if(!localStorage.getItem('wgs:save:two-ways-home'))localStorage.setItem('wgs:save:two-ways-home',raw);},raw);
 for(const lang of ['ja','en']){await u.open(ids[1],'auto',lang);assert.deepEqual((await u.state()).progress,data);assert.equal((await u.state()).history.length,0);assert.equal(await u.p.evaluate(()=>localStorage.getItem('wgs:save:two-ways-home')),raw);assert.match(await u.f.locator('.stage-number').innerText(),new RegExp('^'+String(homeLevels.findIndex(n=>n.id===l.id)+1).padStart(2,'0')));}
 await u.layout('portrait');await u.layout('landscape');assert.deepEqual((await u.state()).progress,data);
});
await trial('Light cause: switch then gate; immediate Undo, mode, resize and menu remove every old overlay',async u=>{
 await u.open(ids[0]);await select(u,'L05');await u.a('mirror:0').click();assert.equal((await u.state()).progress.board.gate,true);assert.equal(await u.f.locator('[data-gate-opening="0"]').count(),1);assert.equal(await u.f.locator('[data-switch-response="0"]').count(),1);
 await u.a('undo').click();assert.equal((await u.state()).progress.board.gate,false);assert.equal(await u.f.locator('.light-cause').count(),0);await u.p.waitForTimeout(750);assert.equal((await u.state()).progress.board.gate,false);
 await u.a('mirror:0').click();await u.layout('portrait');assert.equal(await u.f.locator('.light-cause').count(),0);assert.equal((await u.state()).progress.board.gate,true);
 await u.a('mirror:0').click();assert.equal((await u.state()).progress.board.gate,true);assert.equal(await u.f.locator('[data-latch-response]').count(),1);assert.match(await u.f.locator('.cause-caption').innerText(),/Stays open/);await u.p.waitForTimeout(750);assert.equal(await u.f.locator('.cause-caption,.light-cause').count(),0);
 await u.a('undo').click();await u.a('undo').click();await u.a('mirror:0').click();await u.p.setViewportSize({width:1300,height:1500});await u.f.locator('.light-cause').waitFor({state:'detached'});assert.equal(await u.f.locator('.light-cause').count(),0);await u.a('undo').click();await u.a('mirror:0').click();await u.menu();assert.equal(await u.f.locator('.light-cause').count(),0);
});
await trial('Continuous mirror input has no queue; reduced motion and pagehide cancel display work',async u=>{
 await u.open(ids[0]);await select(u,'L18');for(let n=0;n<6;n++){await u.a('mirror:0').click();assert.equal((await u.state()).history.length,n+1);assert.ok(await u.f.locator('.light-cause').count()<=1);}const before=(await u.state()).progress;await u.p.waitForTimeout(750);assert.deepEqual((await u.state()).progress,before);assert.equal(await u.f.locator('.light-cause').count(),0);
 await u.menu('settings');await u.f.locator('#motion-setting').check();await u.f.locator('#close-settings').click();await u.a('mirror:0').click();assert.equal(await u.f.locator('.light-cause').count(),0);
 await u.menu('settings');await u.f.locator('#motion-setting').uncheck();await u.f.locator('#close-settings').click();await u.a('mirror:0').click();await u.f.locator('body').evaluate(()=>window.dispatchEvent(new Event('pagehide')));assert.equal(await u.f.locator('.light-cause').count(),0);
});
await trial('Splitter evidence includes inlet and both actual output rays',async u=>{
 await u.open(ids[0]);await select(u,'L09');const answers=JSON.parse(await readFile('src/prototypes/light-answers-r2.json','utf8'));for(const m of answers.find(a=>a.id==='L09').solution)await u.a('mirror:'+m).click();assert.equal((await u.state()).won,true);assert.ok(await u.f.locator('[data-ray-phase]').count()>=6);await u.p.waitForTimeout(350);assert.equal(await u.f.locator('.light-cause').count(),0);assert.equal(await u.f.locator('.garden>svg .beam').count(),3);
});
}finally{await browser.close();await writeFile(path.join(out,'learning-cause-results.json'),JSON.stringify({results,humanPlayedState:'UNKNOWN',firstTimeHumanUnderstanding:'PENDING'},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
