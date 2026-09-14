import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.QA_PLAYWRIGHT_MODULE?pathToFileURL(process.env.QA_PLAYWRIGHT_MODULE).href:'playwright');
const browser=await chromium.launch({channel:'msedge',headless:true,env:{...process.env,TEMP:process.cwd()+'/.tmp',TMP:process.cwd()+'/.tmp'}});
const results=[];const base='http://127.0.0.1:4324';
async function test(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}}
const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();const f=()=>p.frameLocator('iframe');const a=(s)=>f().locator(`[data-action="${s}"]`);
async function go(id){await p.goto(`${base}/ja/prototypes/play/${id}/`);await a('level:0').waitFor();}
try{
await test('touch all three games, primary target dimensions and completed Home keyboard lock',async()=>{
  await go('light-garden');await a('mirror:0').tap();assert.match(await f().locator('.outcome').innerText(),/できた/);
  await go('two-ways-home');await a('move:1').tap();await a('move:1').tap();assert.match(await f().locator('.outcome').innerText(),/できた/);const before=await f().locator('.character').evaluateAll(els=>els.map(e=>e.getAttribute('transform')));
  await f().locator('body').evaluate(()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));document.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));});assert.deepEqual(await f().locator('.character').evaluateAll(els=>els.map(e=>e.getAttribute('transform'))),before);assert.match(await f().locator('.outcome').innerText(),/できた/);
  await go('tiny-delivery');await a('arrow:0').tap();assert.match(await a('arrow:0').innerText(),/↓/);await a('arrow:0').focus();await p.keyboard.press('Space');assert.match(await a('arrow:0').innerText(),/←/);await a('arrow:0').focus();await p.keyboard.press('Enter');assert.match(await a('arrow:0').innerText(),/↑/);
  for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});await a('level:4').tap();const sizes=await f().locator('button').evaluateAll(els=>els.filter(e=>!e.disabled).map(e=>({action:e.dataset.action,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));for(const s of sizes)assert.ok(s.w>=43.9&&s.h>=43.9,JSON.stringify({width,...s}));}
});
await test('runtime error during reset closes dialog, recovery and stale removed iframe rejection',async()=>{
  await go('light-garden');await a('level:1').tap();await p.waitForFunction(()=>JSON.parse(localStorage.getItem('wgs:save:light-garden'))?.data.levelId==='L02');
  await p.evaluate(()=>{const frame=document.querySelector('iframe');window.oldFrame=frame.contentWindow;window.oldGeneration=new URL(frame.src).searchParams.get('generation');});
  await p.locator('#prototype-reset-save').tap();await p.locator('#prototype-reset-dialog').waitFor();await f().locator('body').evaluate(()=>window.dispatchEvent(new Event('error')));await p.locator('#prototype-error').waitFor();assert.equal(await p.locator('#prototype-reset-dialog').isVisible(),false);await p.locator('#prototype-reload').tap();await a('level:0').waitFor();
  const before=await p.evaluate(()=>localStorage.getItem('wgs:save:light-garden'));
  await p.evaluate(()=>{const gen=new URL(document.querySelector('iframe').src).searchParams.get('generation');for(const generation of [window.oldGeneration,gen])window.dispatchEvent(new MessageEvent('message',{origin:location.origin,source:window.oldFrame,data:{protocol:'wgs-prototype-v1',gameId:'light-garden',generation,type:'checkpoint',data:{levelId:'L01',levelVersion:1,cleared:[],settings:{reducedMotion:false},board:{mirrors:[true],gate:false}}}}));});await p.waitForTimeout(100);assert.equal(await p.evaluate(()=>localStorage.getItem('wgs:save:light-garden')),before);
});
}finally{await ctx.close();await browser.close();await writeFile('docs/qa/prototype-batch-01/extra-browser-results.json',JSON.stringify(results,null,2)+'\n');}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
