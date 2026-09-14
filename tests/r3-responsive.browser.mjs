import assert from 'node:assert/strict';
import {writeFile,mkdir,readFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const dir=projectPath(path.join(projectRoot,'docs/qa/batch-01-r3')),screens=projectPath(path.join(dir,'screens'));await mkdir(screens,{recursive:true});
const browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}}),results=[];
try{for(const id of ['light-garden','two-ways-home','tiny-delivery'])for(const lang of ['ja','en'])for(const mode of ['auto','portrait','landscape'])for(const width of mode==='auto'?[320,360,390,768,1280]:mode==='portrait'?[390,1440]:[390,1440]){
 if(process.env.QA_WIDTH&&width!==Number(process.env.QA_WIDTH))continue;
 const p=await browser.newPage({viewport:{width,height:width===1280?600:width===390?844:900}});p.setDefaultTimeout(4000);
 try{await p.goto(`http://127.0.0.1:4324/${lang}/prototypes/play/${id}/?layout=${mode}`);const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`);await a('close-guide').click();await a('menu').click();await a('level:17').click();
 if(await a('close-guide').count())await a('close-guide').click();
 const measure=async()=>f.locator('[data-capture-frame]').evaluate(el=>{const r=el.getBoundingClientRect();const boxes=[...el.querySelectorAll('.board,button,.feedback,.outcome')].map(e=>{const b=e.getBoundingClientRect();return {action:e.dataset.action,cls:typeof e.className==='string'?e.className:'',x:b.x-r.x,y:b.y-r.y,w:b.width,h:b.height,disabled:e.disabled}}).filter(b=>b.w>0&&b.h>0);return {w:r.width,h:r.height,overflow:boxes.filter(b=>b.x<-.5||b.y<-.5||b.x+b.w>r.width+.5||b.y+b.h>r.height+.5),badTargets:boxes.filter(b=>b.action&&!b.disabled&&(b.w<43.5||b.h<43.5)),boxes,outerOverflow:document.body.scrollWidth>document.body.clientWidth+1};});
 const initial=await measure();assert.deepEqual(initial.overflow,[]);assert.deepEqual(initial.badTargets,[]);if(mode==='auto')assert.equal(initial.outerOverflow,false);else assert.ok(Math.abs(initial.w/initial.h-(mode==='portrait'?9/16:16/9))<.001,'aspect ratio');
 if(mode!=='auto'&&width===390){assert.equal(await f.locator('.capture-size-note').isVisible(),true);await a('auto-layout').click();assert.equal(await f.locator('#game').getAttribute('data-layout'),'auto');await a('settings').click();await f.locator('#capture-layout').selectOption(mode);await f.locator('#close-settings').click();}
 // Replay final witness to expose long completion copy and final Levels CTA.
 const kind=id==='light-garden'?'light':id==='two-ways-home'?'home':'delivery';const answers=JSON.parse(await readFile(`src/prototypes/${kind}-answers-r2.json`,'utf8')),answer=answers.at(-1);
 if(kind!=='delivery')for(const n of answer.solution)await a(`${kind==='light'?'mirror':'move'}:${n}`).click();
 // Delivery final clear is covered by the full-run and dedicated state suite; inspect its narrow editing controls here.
 const final=await measure();assert.deepEqual(final.overflow,[]);assert.deepEqual(final.badTargets,[]);
 if(kind!=='delivery'){const overlap=await f.locator('[data-capture-frame]').evaluate(el=>{const text=el.querySelector('.outcome strong').getBoundingClientRect(),cta=el.querySelector('[data-action="finish-levels"]').getBoundingClientRect();return Math.max(0,Math.min(text.right,cta.right)-Math.max(text.left,cta.left))*Math.max(0,Math.min(text.bottom,cta.bottom)-Math.max(text.top,cta.top));});assert.equal(overlap,0,'result text and CTA must not overlap');}
 if(kind!=='delivery'){assert.equal(await a('next').count(),0);assert.equal(await a('finish-levels').count(),1);const oldBoard=initial.boxes.filter(b=>b.cls==='board'||b.cls.startsWith('board ')),newBoard=final.boxes.filter(b=>b.cls==='board'||b.cls.startsWith('board '));assert.deepEqual(newBoard,oldBoard,'clear must not move boards');const oldUndo=initial.boxes.find(b=>b.action==='undo'),newUndo=final.boxes.find(b=>b.action==='undo');assert.equal(newUndo.x,oldUndo.x,'Undo x stable');assert.equal(newUndo.y,oldUndo.y,'Undo y stable');}
 await a('guide').click();await a('close-guide').waitFor();await a('close-guide').click();await a('settings').click();await f.locator('#composition-guide').check();await f.locator('#close-settings').click();assert.equal(await f.locator('#game').getAttribute('data-composition-guide'),'true');
 if(width===320||width===390||width===1280){await p.setViewportSize({width,height:1600});await f.locator('[data-capture-frame]').screenshot({path:projectPath(path.join(screens,`${id}-${mode}-${lang}-${width}-final.png`))});}
 results.push({id,lang,mode,width,status:'PASS',initial:{w:initial.w,h:initial.h},final:{w:final.w,h:final.h}});
 }catch(e){results.push({id,lang,mode,width,status:'FAIL',error:e.message});console.log('FAIL',id,lang,mode,width,e.message);}await p.close();
}}finally{await browser.close();await writeFile(projectPath(path.join(dir,'responsive-results.json')),JSON.stringify({results},null,2));}
console.log('Responsive',results.length,'FAIL',results.filter(r=>r.status==='FAIL').length);if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
