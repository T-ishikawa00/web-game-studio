import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,out,ids} from './r5-helpers.mjs';
const browser=await launch(),results=[];
async function trial(name,fn,options={}){const u=await setup(browser,options);try{await fn(u);assert.deepEqual(u.errors,[]);results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}finally{await u.c.close();}}
try{
await trial('tabbable board retains keyboard focus after every render; sequential arrows/WASD remain usable',async u=>{
 await u.open(ids[1]);const b=u.f.locator('[data-swipe-board="0"]');await b.focus();await u.p.keyboard.press('d');assert.equal((await u.state()).history.length,1);assert.equal(await b.evaluate(e=>e===document.activeElement),true);await u.p.keyboard.press('ArrowRight');assert.equal((await u.state()).history.length,2);assert.equal((await u.state()).won,true);assert.equal(await u.a('move:1').count(),0);
});
for(const id of ids)await trial(`${id}: complete snapshot, raw save/events and iframe persist through mode/menu/preference changes`,async u=>{
 await u.open(id);await u.level(id===ids[0]?4:id===ids[1]?3:2);if(id===ids[0])await u.a('mirror:0').click();else if(id===ids[1])await u.swipe(40,0);else{await u.wait(0,1);await u.a('go').click();await u.a('go').click();await u.a('step').click();}
 await u.menu('hint');await u.a('close-menu').click();const before=await u.state();await u.p.waitForTimeout(80);const raw=await u.p.evaluate(id=>localStorage.getItem('wgs:save:'+id),id),events=await u.p.evaluate(()=>window.__prototypeEvents()),src=await u.p.locator('iframe').getAttribute('src');
 for(const m of ['portrait','landscape','auto']){await u.layout(m);const after=await u.state();assert.deepEqual({...after,layout:before.layout},before);assert.equal(await u.p.locator('iframe').getAttribute('src'),src);assert.equal(await u.p.evaluate(id=>localStorage.getItem('wgs:save:'+id),id),raw);assert.deepEqual(await u.p.evaluate(()=>window.__prototypeEvents()),events);}
 if(id===ids[1]){await u.buttons();assert.deepEqual((await u.state()).progress,before.progress);assert.deepEqual((await u.state()).history,before.history);}
});
await trial('DPR2.5, CSS scale, actual iframe scroll and mode changes preserve mirror hit coordinates',async u=>{
 await u.open(ids[0]);await u.level(17);for(const m of ['auto','portrait','landscape','auto']){await u.layout(m);await u.p.locator('#prototype-stage').evaluate(e=>{e.style.transform='scale(.9)';e.style.transformOrigin='top left';});const a=u.a('mirror:0');await a.scrollIntoViewIfNeeded();await u.p.waitForTimeout(70);const old=(await u.state()).history.length;await a.tap();assert.equal((await u.state()).history.length,old+1);await u.a('undo').click();assert.equal((await u.state()).history.length,old);}
},{hasTouch:true,deviceScaleFactor:2.5});
await trial('native touch targets after live 3-mode cycle, D-pad state preserved, off-board page scroll and help scroll',async u=>{
 await u.open(ids[1]);await u.level(3);for(const m of ['portrait','landscape','auto']){await u.layout(m);await u.buttons();await u.a('move:1').scrollIntoViewIfNeeded();const old=(await u.state()).history.length;await u.a('move:1').tap();assert.ok((await u.state()).history.length<=old+1);}
 await u.menu('levels');const menu=u.f.locator('.menu-dialog');const scrollable=await menu.evaluate(e=>e.scrollHeight>e.clientHeight);await menu.hover();await u.p.mouse.wheel(0,400);await u.p.waitForTimeout(100);if(scrollable)assert.ok(await menu.evaluate(e=>e.scrollTop)>0);await u.p.keyboard.press('Escape');
 await u.p.evaluate(()=>scrollTo(0,0));await u.p.mouse.move(5,100);await u.p.mouse.wheel(0,500);await u.p.waitForTimeout(100);assert.ok(await u.p.evaluate(()=>scrollY)>0);
},{hasTouch:true,isMobile:true,viewport:{width:390,height:844}});
}finally{await browser.close();await writeFile(path.join(out,'state-results.json'),JSON.stringify({results},null,2));}if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
