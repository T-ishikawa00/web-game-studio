import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
import path from 'node:path';
const out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r3')),screens=projectPath(path.join(out,'screens'));await mkdir(screens,{recursive:true});
const browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}});
const results=[],errors=[],external=[];
try{for(const id of ['light-garden','two-ways-home','tiny-delivery'])for(const mode of ['auto','portrait','landscape'])for(const lang of ['ja','en']){
 const c=await browser.newContext({viewport:{width:1440,height:1600}});await c.route('**/*',r=>{if(new URL(r.request().url()).origin!=='http://127.0.0.1:4324'){external.push(r.request().url());return r.abort();}return r.continue();});const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto(`http://127.0.0.1:4324/${lang}/prototypes/play/${id}/?layout=${mode}`);const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`);await a('close-guide').click();
 for(const stage of [0,11,17]){if(stage){await a('menu').click();await a(`level:${stage}`).click();if(await a('close-guide').count())await a('close-guide').click();}
 const measure=await f.locator('[data-capture-frame]').evaluate(el=>{const r=el.getBoundingClientRect(),visible=e=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0},box=e=>{const b=e.getBoundingClientRect();return {tag:e.tagName,cls:e.className,action:e.dataset.action,x:b.x-r.x,y:b.y-r.y,w:b.width,h:b.height}};return {w:r.width,h:r.height,overflow:[...el.querySelectorAll('button,.board,.feedback,.outcome,.wait-control')].filter(visible).map(box).filter(b=>b.x<-.5||b.y<-.5||b.x+b.w>r.width+.5||b.y+b.h>r.height+.5),targets:[...el.querySelectorAll('button:not(:disabled)')].filter(visible).map(box).filter(b=>b.w<43.5||b.h<43.5),boards:[...el.querySelectorAll('.board')].map(box)};});
 const name=`${id}-${mode}-${lang}-${stage+1}`;await f.locator('[data-capture-frame]').screenshot({path:projectPath(path.join(screens,name+'.png'))});
 results.push({name,mode,stage:stage+1,...measure,status:measure.overflow.length||measure.targets.length?'FAIL':'PASS'});
 }await c.close();
}}finally{await browser.close();await writeFile(projectPath(path.join(out,'layout-results.json')),JSON.stringify({results,errors,external},null,2));}
for(const r of results)if(r.status==='FAIL')console.log(r.name,JSON.stringify({w:r.w,h:r.h,overflow:r.overflow,targets:r.targets}));console.log('Layouts',results.length,'FAIL',results.filter(r=>r.status==='FAIL').length,'errors',errors.length,'external',external.length);
if(results.some(r=>r.status==='FAIL')||errors.length||external.length)process.exitCode=1;
