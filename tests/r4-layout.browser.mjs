import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,out,ids} from './r4-helpers.mjs';
await mkdir(path.join(out,'screens'),{recursive:true});const browser=await launch(),results=[],errors=[],before=JSON.parse(await readFile(path.join(out,'comparison-before.json'),'utf8'));
try{for(const id of ids)for(const mode of ['auto','portrait','landscape'])for(const lang of ['ja','en']){
 const u=await setup(browser);try{await u.open(id,mode,lang);if(await u.a('close-guide').count())await u.a('close-guide').click();
 for(const stage of [0,11,17]){if(stage)await u.level(stage);if(await u.a('close-guide').count())await u.a('close-guide').click();
 const frame=u.f.locator('[data-capture-frame]'),name=`${id}-${mode}-${lang}-${stage+1}`;
 const m=await frame.evaluate(el=>{const r=el.getBoundingClientRect();return {w:r.width,h:r.height,boxes:[...el.querySelectorAll('button,.board,.feedback,.outcome')].map(e=>{const b=e.getBoundingClientRect();return {action:e.dataset.action,cls:e.className,x:b.x-r.x,y:b.y-r.y,w:b.width,h:b.height};}).filter(b=>b.w&&b.h)};});
 const overflow=m.boxes.filter(b=>b.x<-.5||b.y<-.5||b.x+b.w>m.w+.5||b.y+b.h>m.h+.5),targets=m.boxes.filter(b=>b.action&&(b.w<43.5||b.h<43.5));
 await frame.screenshot({path:path.join(out,'screens',name+'.png')});
 let comparison;if(!stage&&lang==='ja'){const old=before.find(r=>r.id===id&&r.mode===mode),state=await u.state();assert.deepEqual(state.progress.board,old.state.progress.board);assert.equal(state.progress.levelId,old.state.progress.levelId);assert.equal(state.won,old.state.won);if(mode!=='auto'){assert.ok(Math.abs(m.w-old.box.width)<1);assert.ok(Math.abs(m.h-old.box.height)<1);}comparison={sameBoard:true,sameLevel:true,r3:{w:old.box.width,h:old.box.height},r4:{w:m.w,h:m.h}};}
 results.push({name,...m,overflow,targets,comparison,status:overflow.length||targets.length?'FAIL':'PASS'});
 }
 }catch(e){results.push({name:`${id} ${mode} ${lang}`,status:'FAIL',error:e.message});}finally{errors.push(...u.errors,...u.external);await u.c.close();}
}}finally{await browser.close();await writeFile(path.join(out,'layout-results.json'),JSON.stringify({results,errors},null,2));}
for(const r of results.filter(r=>r.status==='FAIL'))console.log('FAIL',r.name,JSON.stringify({overflow:r.overflow,targets:r.targets,error:r.error}));console.log('layouts',results.length,'fail',results.filter(r=>r.status==='FAIL').length,'errors',errors.length);if(results.some(r=>r.status==='FAIL')||errors.length)process.exitCode=1;
