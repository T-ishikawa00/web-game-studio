import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.QA_PLAYWRIGHT_MODULE?pathToFileURL(process.env.QA_PLAYWRIGHT_MODULE).href:'playwright');
const base=process.env.QA_PROTOTYPE_URL??'http://127.0.0.1:4324',dir='docs/qa/prototype-batch-01';
await mkdir(`${dir}/screens`,{recursive:true});
const answers=JSON.parse(await readFile('src/prototypes/level-answers.json','utf8'));
const browser=await chromium.launch({channel:'msedge',headless:true,env:{...process.env,TEMP:process.cwd()+'/.tmp',TMP:process.cwd()+'/.tmp'}});
const results=[],errors=[],external=[],layouts=[];
const context=await browser.newContext({viewport:{width:1440,height:1000}});
await context.route('**/*',route=>{const u=new URL(route.request().url());if(u.protocol.startsWith('http')&&u.origin!==base){external.push(u.origin);return route.abort();}return route.continue();});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(8000);
const ids=['light-garden','two-ways-home','tiny-delivery'];
const frame=()=>page.frameLocator('#prototype-stage iframe');
const action=(a)=>frame().locator(`[data-action="${a}"]`);
async function go(id,locale='ja'){await page.goto(`${base}/${locale}/prototypes/play/${id}/`);await action('level:0').waitFor();await page.locator('#prototype-loading').waitFor({state:'hidden'});}
async function saved(id){return page.evaluate(id=>JSON.parse(localStorage.getItem(`wgs:save:${id}`)),id);}
async function until(fn){for(let i=0;i<40;i++){if(await fn())return;await page.waitForTimeout(50);}assert.fail('Expected state not reached');}
async function run(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}}
async function plan(answer,initial){for(let i=0;i<answer.arrows.length;i++)for(let j=0;j<(answer.arrows[i]-initial[i]+4)%4;j++)await action(`arrow:${i}`).click();for(let i=0;i<answer.wait;i++)await action('wait').click();}
const initials=[[1,0],[1,0,1],[1,2],[2,1],[1,0]];
try{
for(const id of ids)await run(`${id}: all 5 stages solved through real UI, next and retry`,async()=>{
  await go(id);await page.evaluate(()=>localStorage.clear());await go(id);
  const subset=answers.filter(a=>a.gameId===id);
  for(const [index,a]of subset.entries()){
    await action(`level:${index}`).click();
    if(id==='light-garden')for(const m of a.solution)await action(`mirror:${m}`).click();
    else if(id==='two-ways-home')for(const d of a.solution)await action(`move:${d}`).click();
    else{await plan(a.solution,initials[index]);for(let tick=0;tick<a.intermediate.length;tick++)await action('step').click();}
    assert.match(await frame().locator('.outcome').innerText(),/できた/);
    await until(async()=>((await saved(id))?.data.cleared??[]).includes(a.id));
    if(index<4){await action('next').click();assert.equal(await frame().locator('.levels [aria-current=step]').getAttribute('data-action'),`level:${index+1}`);}
  }
  assert.equal((await saved(id)).data.cleared.length,5);
  await action('retry').click();assert.equal(await action('next').isDisabled(),true);
});
await run('light: gate latch, undo, clear remains recorded, stable resume and keyboard',async()=>{
  await go(ids[0]);await action('level:4').click();await action('mirror:0').focus();await page.keyboard.press('Enter');
  await until(async()=>(await saved(ids[0])).data.board.gate);assert.equal(await frame().locator('.gate.open').count(),1);
  await action('undo').click();await until(async()=>!(await saved(ids[0])).data.board.gate);
  await action('mirror:0').click();await action('mirror:0').click();assert.equal(await action('mirror:0').isDisabled(),true);
  await action('undo').click();assert.ok((await saved(ids[0])).data.cleared.includes('L05'));
  await page.reload();await action('level:0').waitFor();assert.equal(await action('undo').isDisabled(),true);assert.equal(await frame().locator('.gate.open').count(),1);
  await page.locator('[data-locale-link][lang=en]').click();await action('level:0').waitFor();assert.equal(await frame().locator('html').getAttribute('lang'),'en');assert.equal((await saved(ids[0])).data.levelId,'L05');
});
await run('home: keyboard/pointer equivalent, repeat suppressed, paired undo, outside keys untouched',async()=>{
  await go(ids[1]);await action('level:3').click();await action('move:1').focus();await page.keyboard.press('ArrowRight');await until(async()=>(await saved(ids[1])).data.board.positions[0]===13);
  const one=(await saved(ids[1])).data.board;assert.deepEqual(one.positions,[13,15]);
  await frame().locator('body').evaluate(el=>el.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',repeat:true,bubbles:true})));assert.deepEqual((await saved(ids[1])).data.board,one);
  await page.keyboard.press('w');await until(async()=>(await saved(ids[1])).data.board.positions[0]===9);await action('undo').click();await until(async()=>JSON.stringify((await saved(ids[1])).data.board)===JSON.stringify(one));
  await action('retry').click();await action('move:1').click();assert.deepEqual((await saved(ids[1])).data.board,one);
  await page.locator('.player-toolbar a').focus();assert.equal(await page.evaluate(()=>{const e=new KeyboardEvent('keydown',{key:'ArrowDown',cancelable:true,bubbles:true});document.dispatchEvent(e);return e.defaultPrevented;}),false);
});
await run('delivery: intermediate ticks, editing lock, pause/step/play parity, reset keeps plan',async()=>{
  await go(ids[2]);await action('level:2').click();await action('wait').click();const before=(await saved(ids[2])).data.board;
  await action('step').click();assert.equal(await frame().locator('#tick').innerText(),'1');assert.equal(await action('arrow:0').isDisabled(),true);
  await action('step').click();assert.equal(await frame().locator('#tick').innerText(),'2');await page.waitForTimeout(800);assert.equal(await frame().locator('#tick').innerText(),'2');
  await action('go').click();await until(async()=>(await frame().locator('.outcome').innerText()).includes('できた'));
  await action('retry').click();assert.deepEqual((await saved(ids[2])).data.board,before);await action('go').click();await until(async()=>(await frame().locator('#tick').innerText())==='1');await action('go').click();const tick=await frame().locator('#tick').innerText();await page.waitForTimeout(800);assert.equal(await frame().locator('#tick').innerText(),tick);
  await page.reload();await action('level:0').waitFor();assert.equal(await frame().locator('#tick').innerText(),'0');assert.deepEqual((await saved(ids[2])).data.board,before);
  await action('restore').click();await until(async()=>(await saved(ids[2])).data.board.wait===0);
});
await run('save separation and JA/EN persistence for all three games',async()=>{
  const snapshots={};for(const id of ids){await go(id);await action('level:1').click();await until(async()=>(await saved(id))?.data.levelId===answers.filter(a=>a.gameId===id)[1].id);snapshots[id]=(await saved(id)).data;}
  for(const id of ids){await go(id,'en');assert.deepEqual((await saved(id)).data,snapshots[id]);assert.equal(await frame().locator('.levels [aria-current=step]').getAttribute('data-action'),'level:1');}
});
await run('malformed, unknown version and invalid level preserved; explicit reset recovers',async()=>{
  for(const id of ids)for(const bad of ['{broken',JSON.stringify({schema:99}),JSON.stringify({schema:1,version:'0.1.0',gameId:id,data:{levelId:'invalid'}})]){
    await go(id);await page.evaluate(({id,bad})=>localStorage.setItem(`wgs:save:${id}`,bad),{id,bad});await go(id);assert.match(await page.locator('#prototype-save-status').innerText(),/元データ/);await action('level:1').click();assert.equal(await page.evaluate(id=>localStorage.getItem(`wgs:save:${id}`),id),bad);
  }
  await page.locator('#prototype-reset-save').click();await page.locator('#prototype-cancel-reset').click();assert.match(await page.locator('#prototype-save-status').innerText(),/一時モード/);
  await page.locator('#prototype-reset-save').click();await page.locator('#prototype-confirm-reset').click();await action('level:1').click();await until(async()=>(await saved(ids[2]))?.schema===1);
});
await run('storage write denial displayed, gameplay continues without crashing',async()=>{
  await go(ids[0]);await page.evaluate(()=>localStorage.removeItem('wgs:save:light-garden'));
  await page.addInitScript(()=>{const old=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wgs:save:'))throw new DOMException('QA quota','QuotaExceededError');return old.call(this,k,v);};});
  await go(ids[0]);await action('mirror:0').click();assert.match(await frame().locator('.outcome').innerText(),/できた/);await until(async()=>(await page.locator('#prototype-save-status').innerText()).includes('保存できません'));
});
// A new page has a clean native Storage prototype (the init script above belongs to the old page).
await page.close();
}finally{await context.close();}
const ctx=await browser.newContext({viewport:{width:1440,height:1000}});
const q=await ctx.newPage();q.on('pageerror',e=>errors.push(e.message));q.setDefaultTimeout(8000);
await ctx.route('**/*',route=>{const u=new URL(route.request().url());if(u.protocol.startsWith('http')&&u.origin!==base){external.push(u.origin);return route.abort();}return route.continue();});
const f=()=>q.frameLocator('#prototype-stage iframe'),a=(name)=>f().locator(`[data-action="${name}"]`);
async function open(id,locale='ja'){await q.goto(`${base}/${locale}/prototypes/play/${id}/`);await a('level:0').waitFor();}
async function trial(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}}
try{
await trial('bridge rejects stale generation, wrong game/protocol/schema/source/origin in actual browser',async()=>{
  await open(ids[0]);await a('level:1').click();await q.waitForFunction(()=>JSON.parse(localStorage.getItem('wgs:save:light-garden'))?.data.levelId==='L02');const before=await q.evaluate(()=>localStorage.getItem('wgs:save:light-garden'));
  await f().locator('body').evaluate(()=>{const p=new URLSearchParams(location.search),data={protocol:'wgs-prototype-v1',gameId:'light-garden',generation:p.get('generation'),type:'checkpoint',data:{levelId:'L01',levelVersion:1,cleared:[],settings:{reducedMotion:false},board:{mirrors:[true],gate:false}}};for(const extra of [{generation:'stale'},{gameId:'tiny-delivery'},{protocol:'wrong'},{data:{active:[1]}}])parent.postMessage({...data,...extra},location.origin);});
  await q.evaluate(()=>{const el=document.querySelector('iframe'),p=new URL(el.src).searchParams,m={protocol:'wgs-prototype-v1',gameId:'light-garden',generation:p.get('generation'),type:'checkpoint',data:{levelId:'L01',levelVersion:1,cleared:[],settings:{reducedMotion:false},board:{mirrors:[true],gate:false}}};window.dispatchEvent(new MessageEvent('message',{data:m,origin:'https://example.invalid',source:el.contentWindow}));window.dispatchEvent(new MessageEvent('message',{data:m,origin:location.origin,source:window}));});
  await q.waitForTimeout(100);assert.equal(await q.evaluate(()=>localStorage.getItem('wgs:save:light-garden')),before);
});
await trial('mock pause halts three games; delivery resumes without catch-up; portal pressure shared',async()=>{
  for(const id of ids){await open(id);await q.locator('.internal-qa summary').click();await q.evaluate(()=>sessionStorage.removeItem('wgs:ad-pressure:v1'));
    if(id===ids[2]){await a('level:2').click();await a('wait').click();await a('go').click();await q.waitForTimeout(1250);}else await q.waitForTimeout(1250);
    await q.locator('#prototype-mock').click();await q.locator('#prototype-ad-dialog').waitFor();await f().locator('.paused-veil').waitFor();const tick=id===ids[2]?await f().locator('#tick').innerText():null;
    assert.equal(await a('level:0').isDisabled(),true);await q.waitForTimeout(900);if(tick!==null)assert.equal(await f().locator('#tick').innerText(),tick);
    await q.locator('#prototype-finish-ad').click();await f().locator('.paused-veil').waitFor({state:'hidden'});if(tick!==null)assert.equal(await f().locator('#tick').innerText(),tick);
  }
  await open(ids[0]);await q.locator('.internal-qa summary').click();await q.locator('#prototype-mock').click();assert.equal(await q.locator('#prototype-ad-dialog').isVisible(),false);assert.match(await q.locator('#prototype-ad-status').innerText(),/cooldown/);
});
await trial('simulated visibility pause stops ticks and resumes with fresh delay',async()=>{
  await open(ids[2]);await a('level:2').click();await a('wait').click();await a('go').click();
  await q.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await f().locator('.paused-veil').waitFor();const tick=await f().locator('#tick').innerText();await q.waitForTimeout(1000);assert.equal(await f().locator('#tick').innerText(),tick);
  await q.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await f().locator('.paused-veil').waitFor({state:'hidden'});assert.equal(await f().locator('#tick').innerText(),tick);
});
await trial('loading timeout and retry; runtime error during mock closes modal and recovers',async()=>{
  await q.route('**/prototype-assets/game.js',route=>route.abort());await q.goto(`${base}/ja/prototypes/play/light-garden/`);await q.locator('#prototype-error').waitFor({timeout:11000});await q.unroute('**/prototype-assets/game.js');await q.locator('#prototype-reload').click();await a('level:0').waitFor();
  await q.locator('.internal-qa summary').click();await q.evaluate(()=>sessionStorage.removeItem('wgs:ad-pressure:v1'));await q.locator('#prototype-mock').click();await q.locator('#prototype-ad-dialog').waitFor();
  await f().locator('body').evaluate(()=>window.dispatchEvent(new Event('error')));await q.locator('#prototype-error').waitFor();assert.equal(await q.locator('#prototype-ad-dialog').isVisible(),false);await q.locator('#prototype-reload').click();await a('level:0').waitFor();
});
await trial('JA/EN responsive layout at 320/390/768/1440 incl largest boards, navigation and screenshots',async()=>{
  for(const width of [320,390,768,1440])for(const locale of ['ja','en'])for(const id of ids){
    await q.setViewportSize({width,height:1000});await open(id,locale);await a('level:4').click();
    const outer=await q.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));const inner=await f().locator('body').evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,height:document.documentElement.scrollHeight,viewHeight:innerHeight}));
    assert.ok(outer.scroll<=outer.width+1,JSON.stringify({id,width,outer}));assert.ok(inner.scroll<=inner.width+1,JSON.stringify({id,width,inner}));assert.ok(inner.height<=inner.viewHeight+1,JSON.stringify({id,width,inner}));layouts.push({id,locale,width,outer,inner});
  }
  for(const width of [1440,390])for(const id of ids){await q.setViewportSize({width,height:1000});await open(id);await a(id===ids[0]?'level:4':id===ids[1]?'level:3':'level:3').click();
    if(id===ids[0])await a('mirror:0').click();if(id===ids[1])await a('move:1').click();if(id===ids[2]){for(let i=0;i<3;i++){await a('arrow:0').click();await a('arrow:1').click();}await a('wait').click();await a('step').click();await a('step').click();await a('step').click();}
    await q.mouse.move(0,0);await q.screenshot({path:`${dir}/screens/${id}-${width}.png`,fullPage:true});
  }
  await q.setViewportSize({width:1440,height:1000});await q.goto(`${base}/ja/prototypes/`);assert.equal(await q.locator('.prototype-card').count(),3);await q.screenshot({path:`${dir}/screens/collection-1440.png`,fullPage:true});
  await q.locator('.prototype-card').first().click();await a('level:0').waitFor();await q.locator('.player-toolbar a').click();assert.equal(await q.locator('.prototype-card').count(),3);await q.goBack();await a('level:0').waitFor();
});
await trial('touch input and resize retain stable board',async()=>{
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await mobile.newPage();await p.goto(`${base}/ja/prototypes/play/light-garden/`);const fr=p.frameLocator('iframe');await fr.locator('[data-action="mirror:0"]').tap();assert.match(await fr.locator('.outcome').innerText(),/できた/);await p.setViewportSize({width:844,height:390});assert.match(await fr.locator('.outcome').innerText(),/できた/);await mobile.close();
});
await trial('console and external network',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(external,[]);});
}finally{await ctx.close();await browser.close();await writeFile(`${dir}/browser-results.json`,JSON.stringify({browser:'Edge Chromium',results,layouts,errors,external},null,2)+'\n');}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
