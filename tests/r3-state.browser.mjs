import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const dir=projectPath(path.join(projectRoot,'docs/qa/batch-01-r3'));await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}}),results=[],errors=[];
const base='http://127.0.0.1:4324',ids=['light-garden','two-ways-home','tiny-delivery'];
async function trial(name,fn,options={}){const c=await browser.newContext({viewport:{width:1440,height:1000},...options}),p=await c.newPage();p.setDefaultTimeout(5000);p.on('pageerror',e=>errors.push(e.message));const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`),state=()=>f.locator('body').evaluate(()=>window.__prototypeState()),open=async(id,query='')=>{await p.goto(`${base}/en/prototypes/play/${id}/?${query}`);await a('menu').waitFor();await p.locator('#prototype-loading').waitFor({state:'hidden'});},level=async(i)=>{await a('menu').click();await a(`level:${i}`).click();},layout=async value=>{await a('settings').click();await f.locator('#capture-layout').selectOption(value);await f.locator('#close-settings').click();};
try{const evidence=await fn({c,p,f,a,state,open,level,layout});results.push({name,status:'PASS',evidence});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}finally{await c.close();}}
const same=(a,b)=>{const strip=s=>{const {layout,...rest}=s;return rest;};assert.deepEqual(strip(a),strip(b));};
try{
for(const id of ids)await trial(`${id}: live mode cycle preserves every runtime field, raw save and event history`,async({p,f,a,state,open,level,layout})=>{
 await open(id);await a('close-guide').click();await level(id===ids[0]?4:id===ids[1]?3:2);
 if(id===ids[0])await a('mirror:0').click();else if(id===ids[1])await a('move:1').click();else{await a('wait').click();await a('go').click();await a('go').click();await a('step').click();}
 await a('hint').first().click();const before=await state(),src=await p.locator('iframe').getAttribute('src');await p.waitForTimeout(80);
 const raw=await p.evaluate(id=>localStorage.getItem('wgs:save:'+id),id),events=await p.evaluate(()=>window.__prototypeEvents());
 for(const mode of ['portrait','landscape','auto']){await layout(mode);const after=await state();same(before,after);assert.equal(after.layout,mode);assert.equal(await p.locator('iframe').getAttribute('src'),src);assert.equal(await p.evaluate(id=>localStorage.getItem('wgs:save:'+id),id),raw);assert.deepEqual(await p.evaluate(()=>window.__prototypeEvents()),events);assert.equal(await f.locator('[data-action="settings"]').evaluate(e=>document.activeElement===e),true);}
 if(id!==ids[2]){await a('undo').click();assert.equal((await state()).history.length,before.history.length-1);if(id===ids[0])assert.equal((await state()).progress.board.gate,false);}
 return {modes:3,historyBefore:before.history.length,hint:before.hint,iframeUnchanged:true,noSaveOrEvents:true};
});
await trial('unsaved progress survives display switching with storage writes denied',async({c,p,a,open,level,state,layout})=>{
 await c.addInitScript(()=>{Storage.prototype.setItem=function(){throw Error('test denied');};});await open(ids[1]);await level(3);await a('move:1').click();const before=await state();await layout('portrait');await layout('landscape');same(before,await state());assert.equal(await p.evaluate(()=>localStorage.getItem('wgs:save:two-ways-home')),null);assert.match(await p.locator('#prototype-save-status').innerText(),/Cannot save/);return {statePreservedWithoutSave:true};
});
await trial('running delivery pauses on layout, stays paused across modal/mock/pagehide overlap and resumes one fresh tick',async({p,f,a,open,level,state})=>{
 await open(ids[2]);await level(2);await a('wait').click();await a('go').click();await p.waitForTimeout(650);await a('settings').click();const before=await state();assert.equal(before.localPaused,true);await f.locator('#capture-layout').selectOption('landscape');same(before,await state());
 await p.waitForTimeout(1300);await p.evaluate(()=>{document.querySelector('.internal-qa').open=true;document.querySelector('#prototype-mock').click();});await p.locator('#prototype-ad-dialog').waitFor();
 await p.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await p.locator('#prototype-finish-ad').click();await p.waitForTimeout(750);assert.deepEqual((await state()).run,before.run);assert.equal((await state()).outerPaused,true);
 await p.evaluate(()=>window.dispatchEvent(new Event('pageshow')));await f.locator('#close-settings').click();await p.waitForTimeout(750);assert.deepEqual((await state()).run,before.run);assert.match(await a('go').innerText(),/Resume/);
 await a('step').click();assert.equal((await state()).run.tick,before.run.tick+1);await a('go').click();await p.waitForTimeout(150);assert.equal((await state()).run.tick,before.run.tick+1);await p.waitForTimeout(510);assert.equal((await state()).run.tick,before.run.tick+2);return {pausedTick:before.run.tick,noCatchup:true};
});
await trial('failure/clear guide and completion state survive modes; Step disabled during edit/run/terminal',async({f,a,open,level,state,layout})=>{
 await open(ids[2]);await level(2);assert.equal(await a('step').isDisabled(),true);await a('go').click();assert.equal(await a('step').isDisabled(),true);await a('go').click();await a('step').click();await a('step').click();const failed=await state();assert.equal(failed.run.status,'failed');assert.equal(await a('step').isDisabled(),true);assert.match(await a('retry').innerText(),/Edit route/);assert.match(await f.locator('.delivery-meta').innerText(),/Needs a change/);await layout('portrait');same(failed,await state());assert.equal(await f.locator('.failure-cell').count(),1);
 await a('retry').click();assert.deepEqual((await state()).progress.board,failed.progress.board);await a('wait').click();await a('go').click();await a('go').click();for(let i=0;i<5;i++)await a('step').click();const won=await state();assert.equal(won.won,true);assert.match(await f.locator('.delivery-meta').innerText(),/Delivered/);await layout('auto');same(won,await state());return {failureAndClearPreserved:true};
});
await trial('Restart cancel/Escape/accept and keyboard separation, native Enter/Space one action, repeated keydown blocked',async({p,f,a,open,level,state})=>{
 await open(ids[1]);await a('close-guide').click();await level(3);await a('move:1').focus();await p.keyboard.press('Enter');const first=await state();assert.equal(first.history.length,1);await p.keyboard.press('Space');assert.equal((await state()).history.length,2);
 const second=await state();await f.locator('body').evaluate(()=>{document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',repeat:true,bubbles:true,cancelable:true}));document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',repeat:true,bubbles:true,cancelable:true}));});same(second,await state());
 await a('retry').click();await f.locator('#cancel-restart').waitFor();await p.keyboard.press('ArrowLeft');same(second,await state());await p.keyboard.press('Escape');same(second,await state());assert.equal(await a('retry').evaluate(e=>e===document.activeElement),true);
 await a('settings').click();const before=await state();await f.locator('#capture-layout').focus();await p.keyboard.press('ArrowDown');same(before,await state());await p.keyboard.press('Escape');assert.equal(await a('settings').evaluate(e=>e===document.activeElement),true);
 await a('retry').click();await f.locator('#cancel-restart').click();same(second,await state());await a('retry').click();await f.locator('#accept-restart').click();assert.equal((await state()).history.length,0);assert.deepEqual((await state()).progress.cleared,second.progress.cleared);await a('retry').click();assert.equal(await f.locator('dialog[open]').count(),0);return {confirmCancelEscapeAccept:true,nativeActivation:true};
});
await trial('touch pointer hit remains aligned after mode switches; pointerup alone is not a second move',async({p,a,open,level,state,layout})=>{
 await open(ids[0]);await level(4);await layout('portrait');const b=await a('mirror:0').boundingBox();await p.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);assert.equal((await state()).history.length,1);const before=await state();await a('mirror:0').dispatchEvent('pointerup',{pointerType:'touch'});same(before,await state());await layout('landscape');await a('undo').click();assert.equal((await state()).history.length,0);return {cssCoordinatesAndUndo:true};
},{hasTouch:true});
await trial('enum-only query and session preference; language reload follows existing restore behavior',async({p,f,a,open,layout,state})=>{
 await open(ids[1],'layout=portrait');assert.equal((await state()).layout,'portrait');await layout('landscape');await p.reload();await a('menu').waitFor();assert.equal((await state()).layout,'portrait'); // explicit query takes precedence
 await open(ids[1],'layout=%3Csvg%20onload%3Dalert(1)%3E');assert.equal((await state()).layout,'landscape');assert.equal(await f.locator('svg[onload]').count(),0);await p.locator('[data-locale-link][lang=ja]').click();await a('menu').waitFor();assert.equal((await state()).layout,'landscape');return {enumValidated:true,queryOverridesSession:true};
});
}finally{await browser.close();await writeFile(projectPath(path.join(dir,'state-results.json')),JSON.stringify({results,errors},null,2));}
if(results.some(r=>r.status==='FAIL')||errors.length)process.exitCode=1;
