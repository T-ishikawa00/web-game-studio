import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,ids} from './r4-helpers.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const phase=process.argv[2];if(!['before','after'].includes(phase))throw Error('before / after required');
const out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r5'));await mkdir(path.join(out,'screens'),{recursive:true});
const browser=await launch(),records=[];
try{for(const id of ids)for(const mode of ['auto','portrait','landscape'])for(const n of [0,17]){
 const u=await setup(browser);await u.open(id,mode,'ja');if(n)await u.level(n);if(await u.a('close-guide').count())await u.a('close-guide').click();
 const frame=u.f.locator('[data-capture-frame]');await frame.screenshot({path:path.join(out,'screens',`${id}-${mode}-${n+1}-${phase}.png`)});
 const perf=await u.f.locator('body').evaluate(async()=>{const intervals=[];let prev=performance.now();for(let i=0;i<60;i++)await new Promise(resolve=>requestAnimationFrame(now=>{intervals.push(now-prev);prev=now;resolve();}));return {resources:performance.getEntriesByType('resource').map(r=>({name:new URL(r.name).pathname,bytes:r.decodedBodySize})),images:document.images.length,rafMedianMs:intervals.sort((a,b)=>a-b)[30],dpr:devicePixelRatio};});
 records.push({id,mode,level:n+1,viewport:{width:1440,height:1600},box:await frame.boundingBox(),state:await u.state(),perf,errors:u.errors,external:u.external});await u.c.close();console.log(phase,id,mode,n+1);
}}finally{await browser.close();await writeFile(path.join(out,`comparison-${phase}.json`),JSON.stringify(records,null,2));}
