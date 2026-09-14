import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {projectPath} from '../scripts/project-path.mjs';
const modulePath=process.env.QA_PLAYWRIGHT_MODULE??'C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const {chromium}=await import(pathToFileURL(modulePath).href);
const base='http://127.0.0.1:4324',ids=['light-garden','two-ways-home','tiny-delivery'];
const outputDir=projectPath(process.env.QA_R5_OUTPUT_DIR??new URL('../docs/qa/batch-01-r5',import.meta.url));
const output=projectPath(outputDir+'/regression-results.json');
let priorRuns=[];
try{const previous=JSON.parse(await readFile(output,'utf8'));priorRuns=[...(previous.priorRuns??[]),{startedAt:previous.startedAt,finishedAt:previous.finishedAt,buildBefore:previous.buildBefore,buildAfter:previous.buildAfter,results:previous.results}];}catch(e){if(e.code!=='ENOENT')throw e;}
await mkdir(outputDir,{recursive:true});
const temp=projectPath(new URL('../.tmp',import.meta.url));
const results=[],errors=[],external=[];const startedAt=new Date().toISOString();
const digest=async()=>{const r=await fetch(base+'/prototype-assets/game.js');assert.equal(r.status,200);return createHash('sha256').update(await r.text()).digest('hex');};
const buildBefore=await digest();
const browser=await chromium.launch({channel:'msedge',headless:true,env:{...process.env,TEMP:temp,TMP:temp}});
async function trial(name,fn,options={}){
 const t=performance.now(),context=await browser.newContext({viewport:{width:1440,height:900},...options});
 const localErrors=[];
 await context.route('**/*',route=>{const u=new URL(route.request().url());if(/^https?:$/.test(u.protocol)&&u.origin!==base){external.push({name,url:u.origin});return route.abort();}return route.continue();});
 const p=await context.newPage();p.setDefaultTimeout(7000);p.on('pageerror',e=>{errors.push({name,message:e.message});localErrors.push(e.message);});
 const f=()=>p.frameLocator('#prototype-stage iframe'),a=(s)=>f().locator(`[data-action="${s}"]`);
 const ready=async()=>{await a('menu').waitFor();await p.locator('#prototype-loading').waitFor({state:'hidden'});};
 const go=async(id,locale='ja')=>{await p.goto(`${base}/${locale}/prototypes/play/${id}/`);await ready();};
 const menu=async action=>{await a('menu').click();await f().locator(`.menu-dialog [data-action="${action}"]`).click();};
 const stage=async i=>{await menu('levels');await a(`level:${i}`).click();if(await f().locator('[data-swipe-board]').count()&&!await a('move:1').count()){await menu('dpad');await a('close-menu').click();}};
 const save=async id=>p.evaluate(id=>{const raw=localStorage.getItem(`wgs:save:${id}`);return raw===null?null:JSON.parse(raw);},id);
 const raw=async id=>p.evaluate(id=>localStorage.getItem(`wgs:save:${id}`),id);
 const until=async fn=>{for(let i=0;i<80;i++){if(await fn())return;await p.waitForTimeout(30);}assert.fail('Expected state not reached');};
 const qa=async()=>{if(await p.locator('details.internal-qa').getAttribute('open')===null)await p.locator('details.internal-qa summary').click();};
 const tick=async()=>Number(await f().locator('#tick').innerText());
 const tools={p,f,a,ready,go,stage,save,raw,until,qa,tick,context,menu};
 try{const evidence=await fn(tools);assert.deepEqual(localErrors,[]);results.push({name,status:'PASS',attempt:1,durationMs:Math.round(performance.now()-t),evidence:evidence??null});console.log('PASS',name);}
 catch(e){results.push({name,status:'FAIL',attempt:1,durationMs:Math.round(performance.now()-t),error:e.message});console.log('FAIL',name,e.message);}
 finally{await context.close();}
}
try{
await trial('bridge: wrong origin/source/protocol/game/generation/payload rejected independently',async({p,f,go,stage,save,raw,until})=>{
 await go(ids[0]);await stage(1);await until(async()=>(await save(ids[0]))?.data.levelId==='L02');const before=await raw(ids[0]);
 for(const variant of ['protocol','gameId','generation','payload','extra-key','origin','source']){
  await f().locator('body').evaluate((_,variant)=>{
   const gen=new URLSearchParams(location.search).get('generation');
   const m={protocol:'wgs-prototype-v1',gameId:'light-garden',generation:gen,type:'checkpoint',data:{levelId:'L01',levelVersion:1,cleared:[],settings:{reducedMotion:false},board:{mirrors:[true],gate:false}}};
   if(variant==='protocol')m.protocol='wgs-fixture-v1';if(variant==='gameId')m.gameId='tiny-delivery';if(variant==='generation')m.generation='stale';if(variant==='payload')m.data.board={mirrors:[false,false],gate:false};if(variant==='extra-key')m.command='reset';
   if(variant==='origin'||variant==='source')parent.dispatchEvent(new MessageEvent('message',{data:m,origin:variant==='origin'?'https://example.invalid':location.origin,source:variant==='source'?parent:window}));else parent.postMessage(m,location.origin);
  },variant);
  await p.waitForTimeout(80);assert.equal(await raw(ids[0]),before,variant);
 }
 // Reverse direction: hostile initialization cannot replace the live board.
 for(const variant of ['protocol','gameId','generation','payload','origin','source']){
  await f().locator('body').evaluate((_,variant)=>{
   const gen=new URLSearchParams(location.search).get('generation'),m={protocol:'wgs-prototype-v1',gameId:'light-garden',generation:gen,type:'init',paused:false,data:{levelId:'L01',levelVersion:1,cleared:[],settings:{reducedMotion:false},board:{mirrors:[false],gate:false}}};
   if(variant==='protocol')m.protocol='wrong';if(variant==='gameId')m.gameId='tiny-delivery';if(variant==='generation')m.generation='stale';if(variant==='payload')m.data.levelVersion=99;
   window.dispatchEvent(new MessageEvent('message',{data:m,origin:variant==='origin'?'https://example.invalid':location.origin,source:variant==='source'?window:parent}));
  },variant);
  assert.match(await f().locator('.stage-number').innerText(),/2 \/ 18/);assert.equal(await raw(ids[0]),before,variant);
 }
 return {outboundRejected:7,inboundRejected:6};
});
await trial('removed iframe rejected with both old and current generations; error closes reset',async({p,f,go,stage,raw,save,until,qa,ready})=>{
 await go(ids[0]);await stage(1);await until(async()=>(await save(ids[0]))?.data.levelId==='L02');const before=await raw(ids[0]);
 await p.evaluate(()=>{const el=document.querySelector('#prototype-stage iframe');window.qaOldSource=el.contentWindow;window.qaOldGeneration=new URL(el.src).searchParams.get('generation');});
 await qa();await p.locator('#prototype-reset-save').click();await p.locator('#prototype-reset-dialog').waitFor();
 await f().locator('body').evaluate(()=>window.dispatchEvent(new Event('error')));await p.locator('#prototype-error').waitFor();assert.equal(await p.locator('#prototype-reset-dialog').isVisible(),false);
 await p.locator('#prototype-reload').click();await ready();
 await p.evaluate(()=>{const gen=new URL(document.querySelector('#prototype-stage iframe').src).searchParams.get('generation');for(const generation of [window.qaOldGeneration,gen])window.dispatchEvent(new MessageEvent('message',{origin:location.origin,source:window.qaOldSource,data:{protocol:'wgs-prototype-v1',gameId:'light-garden',generation,type:'checkpoint',data:{levelId:'L01',levelVersion:1,cleared:[],settings:{reducedMotion:false},board:{mirrors:[true],gate:false}}}}));});
 await p.waitForTimeout(120);assert.equal(await raw(ids[0]),before);return {oldAndCurrentGenerationRejected:true};
});
await trial('keyboard focus scope, repeat suppression, pointer parity and undo',async({p,f,a,go,stage,save,until,menu})=>{
 await go(ids[1]);await stage(3);await a('move:1').focus();await p.keyboard.press('ArrowRight');await until(async()=>(await save(ids[1]))?.data.board.positions[0]===13);
 const one=(await save(ids[1])).data.board;assert.deepEqual(one.positions,[13,15]);
 await f().locator('body').evaluate(()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',repeat:true,bubbles:true,cancelable:true})));await p.waitForTimeout(80);assert.deepEqual((await save(ids[1])).data.board,one);
 await a('move:0').focus();await p.keyboard.press('w');await until(async()=>(await save(ids[1])).data.board.positions[0]===9);await a('undo').click();await until(async()=>JSON.stringify((await save(ids[1])).data.board)===JSON.stringify(one));
 await menu('retry');await f().locator('#accept-restart').click();await a('move:1').click();await until(async()=>JSON.stringify((await save(ids[1])).data.board)===JSON.stringify(one));
 await f().locator('body').evaluate(()=>{document.activeElement?.blur();});const prevented=await f().locator('body').evaluate(()=>{const e=new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true,cancelable:true});document.dispatchEvent(e);return e.defaultPrevented;});assert.equal(prevented,false);assert.deepEqual((await save(ids[1])).data.board,one);
 await p.locator('.player-toolbar a').first().focus();assert.equal(await p.evaluate(()=>{const e=new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true});document.dispatchEvent(e);return e.defaultPrevented;}),false);
 await stage(0);await a('move:1').click();await a('move:1').click();await until(async()=>(await save(ids[1])).data.cleared.includes('T01'));const complete=(await save(ids[1])).data.board;await f().locator('body').evaluate(()=>{document.getElementById('game').focus();document.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));});await p.waitForTimeout(80);assert.deepEqual((await save(ids[1])).data.board,complete);
});
await trial('delivery: step/play/pause parity, failure locations, retry preserves plan and reload editing only',async({p,f,a,go,stage,save,until,tick,ready,menu})=>{
 await go(ids[2]);await stage(2);await a('clock:0').click();await f().locator('[data-wait-value="1"]').click();await a('go').click();await a('go').click();const plan=(await save(ids[2])).data.board;
 for(let i=1;i<=5;i++){await a('step').click();assert.equal(await tick(),i);}assert.match(await f().locator('.outcome').innerText(),/お届け、できました/);await until(async()=>(await save(ids[2])).data.cleared.includes('D03'));
 await menu('retry');assert.deepEqual((await save(ids[2])).data.board,plan);await a('go').click();await until(async()=>await tick()===1);await a('go').click();const stopped=await tick();await p.waitForTimeout(850);assert.equal(await tick(),stopped);assert.equal(await a('arrow:0').isDisabled(),true);
 await a('go').click();await until(async()=>(await f().locator('.outcome').innerText()).includes('お届け、できました'));
 await menu('retry');await a('go').click();await a('go').click();await a('step').click();await p.reload();await ready();assert.equal(await tick(),0);assert.deepEqual((await save(ids[2])).data.board,plan);
 await menu('settings');await f().locator('#reset-layout').click();await f().locator('#accept-restart').click();await until(async()=>(await save(ids[2])).data.board.wait===0);await a('go').click();await a('go').click();await a('step').click();await a('step').click();assert.match(await f().locator('.feedback.failure').innerText(),/同じマス/);assert.equal(await tick(),2);assert.equal(await f().locator('.failure-cell').count(),1);assert.deepEqual(await f().locator('.failure-cell').evaluate(e=>{const b=e.getBBox(),m=e.parentElement.transform.baseVal.consolidate().matrix;return {centerX:b.x+b.width/2+m.e,centerY:b.y+b.height/2+m.f};}),{centerX:150,centerY:150});
 await a('retry').click();assert.equal(await tick(),0);assert.equal(await a('arrow:0').isDisabled(),false);return {stepClearBeat:5,reloadBeat:0,failureBeat:2};
});
await trial('mock pause halts all games; delivery resumes with fresh delay; pressure survives game navigation',async({p,f,a,go,stage,qa,tick})=>{
 const ticks=[];
 for(const id of ids){await go(id);await qa();await p.evaluate(()=>sessionStorage.removeItem('wgs:ad-pressure:v1'));if(id===ids[2]){await stage(2);await a('clock:0').click();await f().locator('[data-wait-value="1"]').click();await a('go').click();}await p.waitForTimeout(1300);await p.locator('#prototype-mock').click();await p.locator('#prototype-ad-dialog').waitFor();await f().locator('.paused-veil').waitFor();assert.equal(await a('menu').isDisabled(),true);const n=id===ids[2]?await tick():null;await p.waitForTimeout(900);if(n!==null)assert.equal(await tick(),n);await p.locator('#prototype-finish-ad').click();await f().locator('.paused-veil').waitFor({state:'hidden'});if(n!==null){await p.waitForTimeout(160);assert.equal(await tick(),n);ticks.push(n);}}
 await go(ids[0]);await qa();await p.locator('#prototype-mock').click();assert.equal(await p.locator('#prototype-ad-dialog').isVisible(),false);assert.match(await p.locator('#prototype-ad-status').innerText(),/cooldown/);return {pausedDeliveryTicks:ticks};
});
await trial('injected parent and iframe visibility pause: no hidden ticks or catch-up',async({p,f,a,go,stage,tick,until})=>{
 await go(ids[2]);await stage(2);await a('clock:0').click();await f().locator('[data-wait-value="1"]').click();await a('go').click();await until(async()=>await tick()===1);
 for(const surface of ['parent','iframe']){
  const target=surface==='parent'?p:f().locator('body');
  await target.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await f().locator('.paused-veil').waitFor();const before=await tick();await p.waitForTimeout(1050);assert.equal(await tick(),before);
  await target.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await f().locator('.paused-veil').waitFor({state:'hidden'});await p.waitForTimeout(180);assert.equal(await tick(),before);await until(async()=>await tick()===before+1);
 }
 return {injectionOnly:true,hiddenDurationMsPerSurface:1050,postResumeNoAdvanceMs:180};
});
await trial('load timeout retry and runtime error during mock recover cleanly',async({p,f,a,ready,qa})=>{
 await p.route('**/prototype-assets/game.js',route=>route.abort());await p.goto(base+'/ja/prototypes/play/light-garden/');await p.locator('#prototype-error').waitFor({timeout:11000});await p.unroute('**/prototype-assets/game.js');await p.locator('#prototype-reload').click();await ready();
 await qa();await p.locator('#prototype-mock').click();await p.locator('#prototype-ad-dialog').waitFor();await f().locator('body').evaluate(()=>window.dispatchEvent(new Event('error')));await p.locator('#prototype-error').waitFor();assert.equal(await p.locator('#prototype-ad-dialog').isVisible(),false);await p.locator('#prototype-reload').click();await ready();await a('mirror:0').click();assert.match(await f().locator('.outcome').innerText(),/花がひらきました/);return {intentionalAbortedAsset:'prototype-assets/game.js',timeoutObserved:true};
});
await trial('all games JA/EN progress and guide separation; old save completion retained',async({p,f,a,go,stage,save,until,menu})=>{
 const snapshots={};
 for(const id of ids){await go(id);await a('close-guide').click();await stage(1);await until(async()=>(await save(id))?.data.levelId.endsWith('02'));snapshots[id]=(await save(id)).data;}
 for(const id of ids){await go(id,'en');assert.deepEqual((await save(id)).data,snapshots[id]);await stage(0);assert.equal(await f().locator('.input-cue').count(),0);await menu('guide');assert.equal(await f().locator('.menu-dialog .guide-diagram').count(),1);await a('close-menu').click();}
 const guideKeys=await p.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('wgs:guide:')).sort());assert.deepEqual(guideKeys,ids.map(id=>'wgs:guide:'+id).sort());
 const legacy=[{id:ids[0],level:'L05',cleared:['L01','L02','L03','L04','L05'],board:{mirrors:[true],gate:true}},{id:ids[1],level:'T05',cleared:['T01','T02','T03','T04','T05'],board:{positions:[12,3]}},{id:ids[2],level:'D05',cleared:['D01','D02','D03','D04','D05'],board:{arrows:[0,1],wait:1}}];
 for(const old of legacy){await p.evaluate(old=>localStorage.setItem('wgs:save:'+old.id,JSON.stringify({schema:1,gameId:old.id,version:'0.1.0',data:{levelId:old.level,levelVersion:1,cleared:old.cleared,settings:{reducedMotion:false},board:old.board}})),old);await go(old.id);assert.deepEqual((await save(old.id)).data.cleared,old.cleared);assert.equal((await save(old.id)).data.levelId,old.level);assert.equal(await p.locator('#prototype-save-status').getAttribute('data-state'),'ok');if(old.id===ids[2])assert.equal(await f().locator('#tick').innerText(),'0');}
 return {oldSaves:3,sharedOriginLocales:true,guideKeys};
});
await trial('malformed/future/invalid-level saves preserved; reset cancel and confirm scoped to one game',async({p,go,stage,raw,save,qa,until})=>{
 for(const id of ids)for(const bad of ['{broken',JSON.stringify({schema:99}),JSON.stringify({schema:1,gameId:id,version:'0.1.0',data:{levelId:'invalid'}})]){await go(id);await p.evaluate(({id,bad})=>localStorage.setItem('wgs:save:'+id,bad),{id,bad});await go(id);assert.match(await p.locator('#prototype-save-status').innerText(),/元データ/);await stage(1);assert.equal(await raw(id),bad);}
 const other=await raw(ids[0]);await qa();await p.locator('#prototype-reset-save').click();await p.locator('#prototype-cancel-reset').click();assert.match(await p.locator('#prototype-save-status').innerText(),/一時モード/);await p.locator('#prototype-reset-save').click();await p.locator('#prototype-confirm-reset').click();await stage(1);await until(async()=>(await save(ids[2]))?.schema===1);assert.equal(await raw(ids[0]),other);return {invalidCases:9};
});
for(const mode of ['write-denied','silent-write','read-denied','guide-corrupt'])await trial(`storage ${mode}: honest status and usable game`,async({p,f,a,go,context})=>{
 if(mode==='guide-corrupt'){await go(ids[0]);await p.evaluate(()=>localStorage.setItem('wgs:guide:light-garden','{broken'));await go(ids[0]);await a('close-guide').click();assert.match(await f().locator('.guide-save-status').innerText(),/元データ/);assert.equal(await p.evaluate(()=>localStorage.getItem('wgs:guide:light-garden')),'{broken');}
 else{await context.addInitScript(mode=>{const set=Storage.prototype.setItem,get=Storage.prototype.getItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wgs:save:')){if(mode==='write-denied')throw new DOMException('QA quota','QuotaExceededError');if(mode==='silent-write')return;}return set.call(this,k,v);};Storage.prototype.getItem=function(k){if(k.startsWith('wgs:save:')&&mode==='read-denied')throw new DOMException('QA denied','SecurityError');return get.call(this,k);};},mode);await go(ids[0]);}
 await a('mirror:0').click();assert.match(await f().locator('.outcome').innerText(),/花がひらきました/);if(mode!=='guide-corrupt'){await p.waitForFunction(()=>document.querySelector('#prototype-save-status').textContent.includes('保存できません'));assert.equal(await p.locator('#prototype-save-status').getAttribute('data-state'),'error');}
});
await trial('untouched Connection Lab: pointer, save, locale reload, error retry, prototype isolation',async({p,go,a,until})=>{
 await go(ids[0]);await a('mirror:0').click();const gameSave=await p.evaluate(()=>localStorage.getItem('wgs:save:light-garden'));
 await p.goto(base+'/ja/play/connection-lab/');const f=()=>p.frameLocator('#game-stage iframe');await f().locator('#board button').first().waitFor();await f().locator('#board button').first().click();await until(async()=>await f().locator('#board button').first().getAttribute('aria-pressed')==='true');assert.equal(await p.locator('#save-status').getAttribute('data-state'),'ok');
 await p.goto(base+'/en/play/connection-lab/');await f().locator('#board button').first().waitFor();await until(async()=>await f().locator('#board button').first().getAttribute('aria-pressed')==='true');assert.equal(await f().locator('html').getAttribute('lang'),'en');
 await p.locator('#internal-qa > summary').click();await p.locator('#simulate-error').click();await p.locator('#error-state').waitFor();await p.locator('#reload-game').click();await f().locator('#board button').first().waitFor();await until(async()=>await f().locator('#board button').first().getAttribute('aria-pressed')==='true');assert.equal(await p.evaluate(()=>localStorage.getItem('wgs:save:light-garden')),gameSave);
 return {fixtureProtocol:'wgs-fixture-v1',prototypeSaveUnchanged:true};
});
}finally{
 const buildAfter=await digest().catch(e=>'UNAVAILABLE: '+e.message);if(buildBefore!==buildAfter)results.push({name:'served build remained stable across this run',status:'FAIL',error:'Build hash changed during regression; rerun required'});
 results.push({name:'unexpected JavaScript errors and external requests',status:errors.length||external.length?'FAIL':'PASS',errors,external});
 await browser.close();
 await writeFile(output,JSON.stringify({startedAt,finishedAt:new Date().toISOString(),browser:'Headless Edge Chromium; fresh isolated contexts',base,scope:'Behavioral regression only; no Human UX or physical-device acceptance',attemptPolicy:'R4 adaptation of R3 regression; existing state assertions retained, menu/clock/D-pad selectors follow approved R4 UI. No automatic retries; prior R4 attempts retained.',buildBefore,buildAfter,results,errors,external,priorRuns},null,2)+'\n');
}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
