import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {launch} from './r5-helpers.mjs';
const browser=await launch(),base='http://127.0.0.1:4369',checks=[],errors=[];
try{
 const c=await browser.newContext({viewport:{width:960,height:640}});await c.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 await c.addInitScript(()=>{window.AudioContext=class{constructor(){throw Error('Audio unavailable fixture')}}});
 const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await p.clock.install({time:new Date('2026-09-19T00:00:00Z')});await p.goto(base+'?lang=en');await p.clock.pauseAt(new Date('2026-09-19T00:01:00Z'));
 const state=()=>p.evaluate(()=>window.__magnet.snapshot());await p.clock.runFor(20000);assert.equal((await state()).runTime,0);checks.push('No-input run remains at zero');
 await p.mouse.move(650,200);await p.mouse.down();await p.clock.runFor(1200);await p.mouse.up();await p.clock.runFor(34000);assert.ok((await state()).runTime>=30);await p.keyboard.press('Escape');const stopped=(await state()).runTime;await p.clock.runFor(10000);assert.equal((await state()).runTime,stopped);await p.locator('#resume').click();checks.push('Pause after phase boundary stops actual simulation');
 const old=await state();await p.setViewportSize({width:390,height:844});await p.clock.runFor(100);assert.equal((await state()).player.upgrade,old.player.upgrade);assert.equal((await state()).kills,old.kills);checks.push('Mid-run orientation retains progression');
 for(let i=0;i<16&&!(await state()).over;i++)await p.clock.runFor(15000);
 const end=await state();assert.equal(end.over,true);assert.equal(end.won,false);await p.locator('#result').waitFor({state:'visible'});assert.match(await p.locator('#result-title').innerText(),/ARMOR/);
 await p.locator('#retry').click();await p.clock.runFor(50);const retry=await state();assert.equal(retry.over,false);assert.equal(retry.runTime,0);assert.equal(retry.player.hp,6);assert.equal(retry.scraps.length,11);assert.equal(retry.holding,false);assert.equal(await p.locator('#result').isVisible(),false);checks.push('Actual failure panel immediate Retry resets run and hides result');
 assert.deepEqual(errors,[]);const result={status:'PASS',checks,errors,method:'Browser clock simulation for edge cases; not performance evidence or the real-time full-run capture'};await writeFile('docs/qa/game004-magnet-tempo-r2-1/terminal-qa.json',JSON.stringify(result,null,2));console.log(result);
}finally{await browser.close();}

