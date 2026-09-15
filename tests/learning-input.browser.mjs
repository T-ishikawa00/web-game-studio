import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,out,ids} from './learning-helpers.mjs';
import {moveHome} from '../src/prototypes/rules.ts';
import {levelsByGame as currentLevels} from '../src/prototypes/levels.ts';
import {homeLevelsR2} from '../src/prototypes/home-levels-r2.ts';
const levelsByGame={...currentLevels,'two-ways-home':homeLevelsR2};
const browser=await launch(),results=[],errors=[];
const boardState=s=>({board:s.progress.board,history:s.history,cleared:s.progress.cleared,run:s.run,acted:s.acted,hint:s.hint});
async function trial(name,fn,options={}){const u=await setup(browser,options);try{await fn(u);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}finally{errors.push(...u.errors);await u.c.close();}}
try{
await trial('mirror mouse click, Enter/Space and touch tap each rotate once; implicit capture click survives',async u=>{
 await u.open(ids[0]);await u.level(17);const a=u.a('mirror:0');await a.click();assert.equal((await u.state()).history.length,1);await a.focus();await u.p.keyboard.press('Enter');assert.equal((await u.state()).history.length,2);await u.p.keyboard.press('Space');assert.equal((await u.state()).history.length,3);await a.tap();assert.equal((await u.state()).history.length,4);
 const s=await u.state();await a.dispatchEvent('pointerup',{pointerType:'touch'});assert.deepEqual(boardState(await u.state()),boardState(s));
},{hasTouch:true});
await trial('mirror drag-off, drift-return, cancel, non-target click and multiple pointers do not edit',async u=>{
 await u.open(ids[0]);await u.level(4);const a=u.a('mirror:0');let before=boardState(await u.state());const b=await a.boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2;
 await u.p.mouse.move(x,y);await u.p.mouse.down();await u.p.mouse.move(x+100,y);await u.p.mouse.up();assert.deepEqual(boardState(await u.state()),before);
 await u.p.mouse.move(x,y);await u.p.mouse.down();await u.p.mouse.move(x+20,y);await u.p.mouse.move(x,y);await u.p.mouse.up();assert.deepEqual(boardState(await u.state()),before);
 await u.p.mouse.move(x,y);await u.p.mouse.down();await a.dispatchEvent('pointercancel',{pointerId:1});await u.p.mouse.up();assert.deepEqual(boardState(await u.state()),before);
 await u.f.locator('.board').click({position:{x:8,y:8}});assert.deepEqual(boardState(await u.state()),before);
 await a.dispatchEvent('pointerdown',{pointerId:11,isPrimary:true,button:0,clientX:2,clientY:2});await a.dispatchEvent('pointerdown',{pointerId:12,isPrimary:false,button:0});await a.dispatchEvent('pointercancel',{pointerId:11});await a.dispatchEvent('pointercancel',{pointerId:12});assert.deepEqual(boardState(await u.state()),before);
});
await trial('mirror gate latch and Undo preserved through every display mode',async u=>{
 await u.open(ids[0]);await u.level(4);await u.a('mirror:0').click();const before=boardState(await u.state());assert.equal(before.board.gate,true);
 for(const m of ['portrait','landscape','auto']){await u.layout(m);assert.deepEqual(boardState(await u.state()),before);}
 await u.a('undo').click();assert.equal((await u.state()).progress.board.gate,false);
});
await trial('swipe both boards, four directions, long/slow release max one move; pointerup click no duplicate',async u=>{
 await u.open(ids[1]);await u.level(3);
 for(const [dx,dy,which]of [[50,0,0],[0,-50,1],[-50,0,0],[0,50,1],[95,0,1]]){const old=await u.state(),dir=dx>0?1:dx<0?3:dy>0?2:0,level=levelsByGame[ids[1]].find(l=>l.id===old.progress.levelId),expected=moveHome(level,old.progress.board,dir);await u.swipe(dx,dy,which,12);const now=await u.state();assert.deepEqual(now.progress.board,expected.state);assert.deepEqual(now.blocked,expected.blocked);assert.equal(now.history.length,old.history.length+(expected.changed?1:0));assert.ok(now.notice.startsWith(['↑','→','↓','←'][dir]));}
 const old=await u.state();const b=await u.f.locator('[data-swipe-board="0"]').boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2;await u.p.mouse.move(x,y);await u.p.mouse.down();await u.p.waitForTimeout(500);await u.p.mouse.move(x+50,y,{steps:20});await u.p.waitForTimeout(500);await u.p.mouse.up();assert.ok((await u.state()).history.length<=old.history.length+1);
});
await trial('touch swipe commits once, multi-touch cancels; browser pinch zoom remains allowed',async u=>{
 await u.open(ids[1]);const b=await u.f.locator('[data-swipe-board="1"]').boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2,cdp=await u.c.newCDPSession(u.p);
 const touch=(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(([x,y,id=1])=>({x,y,id}))});
 await touch('touchStart',[[x,y]]);await touch('touchMove',[[x+45,y]]);await touch('touchEnd',[]);assert.equal((await u.state()).history.length,1);
 const before=boardState(await u.state());await touch('touchStart',[[x,y]]);await touch('touchMove',[[x+30,y],[x-30,y,2]]);await touch('touchEnd',[]);assert.deepEqual(boardState(await u.state()),before);
 const actions=await u.f.locator('[data-swipe-board="0"]').evaluate(el=>{const a=[];for(let e=el;e;e=e.parentElement)a.push(getComputedStyle(e).touchAction);return a;});assert.equal(actions[0],'pinch-zoom');assert.ok(actions.every(v=>v!=='none'));await cdp.detach();
},{hasTouch:true,isMobile:true,viewport:{width:390,height:844}});
await trial('tap, tremor, diagonal, return, outside release, cancel/lost capture/Escape/resize/mode/pagehide reject pending swipes',async u=>{
 await u.open(ids[1]);await u.level(3);const before=boardState(await u.state());
 for(const [dx,dy]of [[0,0],[8,4],[45,45],[500,0]]){await u.swipe(dx,dy);assert.deepEqual(boardState(await u.state()),before);}
 const begin=async()=>{const b=await u.f.locator('[data-swipe-board="0"]').boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2;await u.p.mouse.move(x,y);await u.p.mouse.down();await u.p.mouse.move(x+45,y);return {x,y};};
 const pt=await begin();await u.p.mouse.move(pt.x,pt.y);await u.p.mouse.up();assert.deepEqual(boardState(await u.state()),before);
 for(const ev of ['pointercancel','lostpointercapture']){await begin();await u.f.locator('[data-swipe-board="0"]').dispatchEvent(ev,{pointerId:1});await u.p.mouse.up();assert.deepEqual(boardState(await u.state()),before);}
 await begin();await u.p.keyboard.press('Escape');await u.p.mouse.up();assert.deepEqual(boardState(await u.state()),before);
 await begin();await u.p.setViewportSize({width:1280,height:1600});await u.p.mouse.up();assert.deepEqual(boardState(await u.state()),before);
 await begin();await u.a('menu').evaluate(e=>e.click());await u.p.mouse.up();await u.a('settings').click();await u.f.locator('#capture-layout').selectOption('portrait');await u.f.locator('#close-settings').click();assert.deepEqual(boardState(await u.state()),before);
 await begin();await u.p.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await u.p.mouse.up();await u.p.evaluate(()=>window.dispatchEvent(new Event('pageshow')));assert.deepEqual(boardState(await u.state()),before);
});
await trial('D-pad click-only alternative discoverable, retained across modes; hidden controls absent and focus restored',async u=>{
 await u.open(ids[1]);await u.menu('guide');await u.a('show-cue').click();assert.equal(await u.a('move:1').count(),0);await u.a('dpad').click();assert.equal(await u.a('move:1').count(),1);await u.a('move:1').click();assert.equal((await u.state()).history.length,1);const before=boardState(await u.state());
 for(const m of ['portrait','landscape','auto']){await u.layout(m);assert.equal((await u.state()).dpad,true);assert.deepEqual(boardState(await u.state()),before);}
 await u.menu('dpad');assert.equal(await u.a('move:1').count(),0);assert.equal(await u.f.locator('.menu-dialog [data-action="dpad"]').evaluate(e=>e===document.activeElement),true);await u.a('close-menu').click();
 if(await u.a('close-guide').count())await u.a('close-guide').click();await u.menu('dpad');await u.a('close-menu').click();assert.equal(await u.a('move:1').count(),1);
});
await trial('both-wall, one-wall, one-home and both-home input parity from real pointer sequences',async u=>{
 await u.open(ids[1]);const seen=new Set();
 for(const stage of [0,1,3]){await u.level(stage);for(const dir of [3,3,0,0,0,1,1,1,2,2,2,3,3,3,1,1,0,0,2,2,1,1]){const old=await u.state();if(old.won)break;const l=levelsByGame[ids[1]][stage],expected=moveHome(l,old.progress.board,dir);await u.swipe([0,45,0,-45][dir],[-45,0,45,0][dir],dir%2);const now=await u.state();assert.deepEqual(now.progress.board,expected.state);assert.equal(now.history.length,old.history.length+(expected.changed?1:0));if(expected.blocked.every(Boolean))seen.add('both-wall');else if(expected.blocked.some(Boolean))seen.add('one-wall');const home=now.progress.board.positions.filter((p,i)=>p===l.homes[i]).length;if(home===1)seen.add('one-home');if(home===2)seen.add('both-home');}}
 await u.level(0);await u.swipe(45,0);await u.swipe(45,0);assert.equal((await u.state()).won,true);seen.add('both-home');assert.ok(seen.has('both-wall'));assert.ok(seen.has('one-wall'));assert.ok(seen.has('one-home'));await u.a('undo').click();assert.equal((await u.state()).won,false);
});
await trial('keyboard board entry and repeat suppression; menu/help/form keys do not move game',async u=>{
 await u.open(ids[1]);const b=u.f.locator('[data-swipe-board="0"]');assert.equal(await b.getAttribute('tabindex'),'0');await b.focus();await u.p.keyboard.press('ArrowRight');assert.equal((await u.state()).history.length,1);
 const old=boardState(await u.state());await u.f.locator('#game').dispatchEvent('keydown',{key:'ArrowRight',repeat:true});assert.deepEqual(boardState(await u.state()),old);
 await u.menu();await u.p.keyboard.press('ArrowRight');await u.a('guide').click();await u.p.keyboard.press('d');assert.deepEqual(boardState(await u.state()),old);await u.p.keyboard.press('Escape');assert.equal(await u.a('menu').evaluate(e=>e===document.activeElement),true);
 await u.menu('settings');await u.f.locator('#capture-layout').focus();await u.p.keyboard.press('ArrowDown');assert.deepEqual(boardState(await u.state()),old);await u.p.keyboard.press('Escape');
 await u.buttons();await u.a('move:1').focus();await u.p.keyboard.press('Enter');assert.equal((await u.state()).history.length,2);assert.equal((await u.state()).won,true);assert.equal(await u.a('next').count(),1);await u.a('next').click();assert.equal((await u.state()).progress.levelId,'T20');
});
await trial('delivery clocks allowed values, unchanged no fake tutorial, outside/Escape close, resize modal, no click-through',async u=>{
 await u.open(ids[2]);await u.level(2);assert.equal(await u.a('clock:0').count(),1);const before=boardState(await u.state());await u.wait(0,0);assert.deepEqual(boardState(await u.state()),before);
 await u.a('clock:0').click();assert.equal(await u.f.locator('[data-wait-value]').count(),3);await u.p.keyboard.press('Escape');assert.deepEqual(boardState(await u.state()),before);
 await u.a('clock:0').click();const box=await u.f.locator('.clock-dialog').boundingBox();await u.p.mouse.click(box.x-6,box.y+10);assert.equal(await u.f.locator('.clock-dialog').evaluate(e=>e.open),false);assert.deepEqual(boardState(await u.state()),before);
 await u.a('clock:0').click();await u.p.setViewportSize({width:390,height:844});await u.f.locator('[data-wait-value="1"]').click();assert.equal((await u.state()).progress.board.wait,1);assert.equal((await u.state()).run,undefined);
},{hasTouch:true});
await trial('delivery shared arrow/clock cells both operable; edit route keeps settings; phase-specific Go/Pause/Resume/Step',async u=>{
 await u.open(ids[2]);await u.level(7);const before=await u.state();await u.a('arrow:0').click();assert.notDeepEqual((await u.state()).progress.board,before.progress.board);await u.wait(0,1);const edit=(await u.state()).progress.board;
 assert.equal(await u.a('step').count(),0);await u.a('go').click();assert.equal(await u.a('step').count(),0);assert.equal(await u.a('arrow:0').isDisabled(),true);assert.equal(await u.a('clock:0').isDisabled(),true);await u.a('go').click();assert.match(await u.a('go').innerText(),/Resume/);assert.equal(await u.a('step').count(),1);await u.a('step').click();assert.equal((await u.state()).run.tick,1);await u.a('retry').click();assert.equal((await u.state()).run,undefined);assert.deepEqual((await u.state()).progress.board,edit);
});
await trial('delivery live mode/menu pause, mock/pagehide overlap, explicit Resume and no timer catch-up',async u=>{
 await u.open(ids[2]);await u.level(2);await u.wait(0,1);await u.a('go').click();await u.p.waitForTimeout(650);await u.menu('settings');const before=await u.state();assert.equal(before.localPaused,true);await u.f.locator('#capture-layout').selectOption('landscape');assert.deepEqual((await u.state()).run,before.run);
 await u.p.waitForTimeout(1300);await u.p.evaluate(()=>{document.querySelector('.internal-qa').open=true;document.querySelector('#prototype-mock').click();});await u.p.locator('#prototype-ad-dialog').waitFor();await u.p.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await u.p.locator('#prototype-finish-ad').click();await u.p.waitForTimeout(700);assert.equal((await u.state()).outerPaused,true);assert.deepEqual((await u.state()).run,before.run);
 await u.p.evaluate(()=>window.dispatchEvent(new Event('pageshow')));await u.f.locator('#close-settings').click();await u.p.waitForTimeout(650);assert.deepEqual((await u.state()).run,before.run);await u.a('step').click();assert.equal((await u.state()).run.tick,before.run.tick+1);await u.a('go').click();await u.p.waitForTimeout(100);assert.equal((await u.state()).run.tick,before.run.tick+1);
});
await trial('Restart confirmation cancel/Escape/accept keeps completed history and restores menu focus',async u=>{
 await u.open(ids[0]);await u.a('mirror:0').click();const s=boardState(await u.state());await u.menu('retry');await u.f.locator('#cancel-restart').click();assert.deepEqual(boardState(await u.state()),s);assert.equal(await u.a('menu').evaluate(e=>e===document.activeElement),true);await u.menu('retry');await u.p.keyboard.press('Escape');assert.deepEqual(boardState(await u.state()),s);await u.menu('retry');await u.f.locator('#accept-restart').click();assert.equal((await u.state()).history.length,0);assert.deepEqual((await u.state()).progress.cleared,s.cleared);
});
await trial('storage rejection leaves input and D-pad modes playable, save failure visible, game progress independent',async u=>{
 await u.c.addInitScript(()=>{Storage.prototype.setItem=function(){throw Error('test denied');};});await u.open(ids[1]);await u.buttons();await u.a('move:1').click();const before=boardState(await u.state());await u.layout('portrait');await u.layout('landscape');assert.deepEqual(boardState(await u.state()),before);assert.equal((await u.state()).dpad,true);assert.match(await u.p.locator('#prototype-save-status').innerText(),/Cannot save/);
});
}finally{await browser.close();await writeFile(path.join(out,'input-results.json'),JSON.stringify({results,errors},null,2));}
if(results.some(r=>r.status==='FAIL')||errors.length)process.exitCode=1;
