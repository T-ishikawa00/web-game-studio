import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
import {levelsByGame} from '../src/prototypes/levels.ts';
const out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r3')),screens=projectPath(path.join(out,'screens'));
await mkdir(screens,{recursive:true});
const ids=Object.keys(levelsByGame),answers=Object.fromEntries(await Promise.all(['light','home','delivery'].map(async(name,i)=>[ids[i],JSON.parse(await readFile(`src/prototypes/${name}-answers-r2.json`,'utf8'))])));
const browser=await chromium.launch({channel:'msedge',headless:true,env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}});
const results=[],errors=[],external=[],layouts=[];const base='http://127.0.0.1:4324';
async function context(width=1440,height=900){const c=await browser.newContext({viewport:{width,height}});await c.route('**/*',r=>{const u=new URL(r.request().url());if(u.protocol.startsWith('http')&&u.origin!==base){external.push(u.origin);return r.abort();}return r.continue();});return c;}
function ui(page){const f=page.frameLocator('iframe'),a=key=>f.locator(`[data-action="${key}"]`);return {f,a};}
async function open(page,id,lang='ja'){await page.goto(`${base}/${lang}/prototypes/play/${id}/`);await ui(page).a('menu').first().waitFor();await page.locator('#prototype-loading').waitFor({state:'hidden'});}
async function level(page,i){const {a}=ui(page);if(!await a(`level:${i}`).count())await a('menu').first().click();await a(`level:${i}`).click();}
async function shot(page,file){
 // Capture the full game at the tested width. Temporarily extend height to avoid
 // Chromium's offscreen fixed-layer artefact in tall element screenshots.
 // Layout/target checks always run after restoring the specified test viewport.
 const viewport=page.viewportSize(),box=await page.locator('#prototype-stage').boundingBox();
 await page.setViewportSize({width:viewport.width,height:Math.max(viewport.height,Math.ceil(box.height)+600)});
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await page.locator('#prototype-stage').screenshot({path:projectPath(path.join(screens,file))});
 await page.setViewportSize(viewport);
}
async function save(page,id){return page.evaluate(id=>JSON.parse(localStorage.getItem(`wgs:save:${id}`))?.data,id);}
async function until(fn){for(let i=0;i<50;i++){if(await fn())return;await new Promise(r=>setTimeout(r,30));}throw Error('Expected state not reached');}
try{
 for(const id of ids){const c=await context(),p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await open(p,id);const {f,a}=ui(p);let passed=0;
  try{
   await shot(p,`${id}-after-guide.png`);
   await a('close-guide').click();await shot(p,`${id}-after.png`);await a('guide').click();
   for(const [i,l] of levelsByGame[id].entries()){
    const answer=answers[id].find(x=>x.id===l.id);assert.ok(answer,`${l.id} witness`);
    if(i>0)await a('next').click();
    await until(async()=>i===0||((await save(p,id))?.levelId===l.id));
    if([0,11,17].includes(i))await shot(p,`${id}-${i===0?'intro':i===11?'middle':'final'}-initial.png`);
    if(l.kind==='light')for(const [j,m]of answer.solution.entries()){await a(`mirror:${m}`).click();await until(async()=>JSON.stringify((await save(p,id))?.board)===JSON.stringify(answer.intermediate[j].state));if(i===0&&j===0)await shot(p,`${id}-interaction-2.png`);}
    else if(l.kind==='home')for(const [j,d]of answer.solution.entries()){await a(`move:${d}`).click();await until(async()=>JSON.stringify((await save(p,id))?.board)===JSON.stringify(answer.intermediate[j].state));if(i===0&&j===0)await shot(p,`${id}-interaction-2.png`);}
    else{
     for(let j=0;j<l.sockets.length;j++){const choices=l.allowedDirections?.[j]??[0,1,2,3],from=choices.indexOf(l.initial[j]),to=choices.indexOf(answer.solution.arrows[j]);for(let n=0;n<(to-from+choices.length)%choices.length;n++)await a(`arrow:${j}`).click();}
     if(l.waitCells)for(let j=0;j<l.waitCells.length;j++)for(let n=0;n<answer.solution.waits[j];n++)await a(`wait:${j}`).click();
     else for(let n=0;n<answer.solution.wait;n++)await a('wait').click();
     if(i===0)await shot(p,`${id}-interaction-2.png`);
     await a('go').click();await a('go').click();
     for(const expected of answer.intermediate){await a('step').click();assert.equal(Number(await f.locator('#tick').innerText()),expected.after);const actual=await f.locator('.robot').evaluateAll(nodes=>nodes.map(n=>({id:n.classList.contains('bot-A')?'A':'B',transform:n.getAttribute('transform')})));assert.deepEqual(actual,expected.bots.filter(b=>!b.delivered).map(b=>({id:b.id,transform:`translate(${b.p%l.size*60+30} ${Math.floor(b.p/l.size)*60+30})`})));}
    }
    assert.equal(await f.locator('.success').count(),1,`${l.id} visible success`);await until(async()=>(await save(p,id))?.cleared.includes(l.id));passed++;
    if([0,11,17].includes(i))await shot(p,`${id}-${i===0?'intro':i===11?'middle':'final'}-solved.png`);
    if(i===0){await shot(p,`${id}-interaction-3.png`);if(await a('close-guide').count())await a('close-guide').click();}
   }
   assert.equal((await save(p,id)).cleared.length,18);assert.match(await f.locator('.outcome').innerText(),/全編クリア/);await p.reload();await a('menu').first().waitFor();assert.equal((await save(p,id)).cleared.length,18);
   results.push({name:`${id}: sequential full18 UI solutions, witness states, chapters, ending and reload`,status:'PASS',stages:passed});
  }catch(e){results.push({name:`${id}: full-run`,status:'FAIL',stages:passed,error:e.message});}
  await c.close();
 }
 for(const width of [1440,768,390,360,320])for(const lang of ['ja','en'])for(const id of ids){
  const c=await context(width,width===1440?900:width===390?844:800),p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
  try{await open(p,id,lang);const {f,a}=ui(p);
   for(const i of [0,11,17]){if(i)await level(p,i);if(i===0&&width===390&&lang==='ja')await shot(p,`${id}-mobile-guide.png`);
    const measure=await f.locator('body').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,height:el.scrollHeight,targets:[...el.querySelectorAll('button:not(:disabled)')].filter(b=>b.getBoundingClientRect().width>0).map(b=>({action:b.dataset.action,w:b.getBoundingClientRect().width,h:b.getBoundingClientRect().height}))}));
    const outer=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
    if(i===0&&width<=390){
     const selector=id==='light-garden'?'[data-action="mirror:0"]':id==='two-ways-home'?'.dpad':'[data-action="go"]';
     const primaryBottom=await f.locator(selector).evaluate(e=>e.getBoundingClientRect().bottom);
     assert.ok(primaryBottom<=p.viewportSize().height,`initial action below game viewport: ${id} ${lang} ${width}: ${primaryBottom}`);
     await a('guide-detail').click();assert.ok((await f.locator('.guide-short').innerText()).length>0);await a('guide-detail').click();
    }
    const bad=measure.targets.filter(b=>b.w<43.5||b.h<43.5);layouts.push({id,lang,width,stage:i+1,body:measure.width,scroll:measure.scroll,outer,bad});
    if(measure.scroll>measure.width+1||outer.scroll>outer.width+1||bad.length)throw Error(`layout ${width} ${lang} stage${i+1}: ${JSON.stringify({measure:{width:measure.width,scroll:measure.scroll},outer,bad})}`);
    if(width===390&&lang==='ja'&&i===17)await shot(p,`${id}-mobile-final.png`);
    if(i===0){if(await a('close-guide').count())await a('close-guide').click();await a('guide').click();assert.equal(await f.locator('.guide').count(),1);await a('close-guide').click();await a('hint').first().click();assert.equal(await f.locator('.hint').count(),1);await a('hint').last().click();assert.match(await f.locator('.hint').innerText(),/2\/2/);await a('hint').last().click();assert.equal(await f.locator('.hint').count(),0);if(width===390&&lang==='ja')await shot(p,`${id}-mobile.png`);}
   }results.push({name:`${id} ${lang} ${width}: initial/middle/final layout, guide and two hints`,status:'PASS'});
  }catch(e){results.push({name:`${id} ${lang} ${width}: layout/guide`,status:'FAIL',error:e.message});}
  await c.close();
 }
}finally{await browser.close();await writeFile(projectPath(path.join(out,'full-run-browser-results.json')),JSON.stringify({results,layouts,errors,external},null,2)+'\n');}
for(const r of results)console.log(r.status,r.name,r.error??'');console.log('pageerror',errors.length,'external',external.length);if(results.some(r=>r.status==='FAIL')||errors.length||external.length)process.exitCode=1;
