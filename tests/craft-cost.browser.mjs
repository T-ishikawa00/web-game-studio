import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup} from './r5-helpers.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const old=projectPath(path.join(projectRoot,'.tmp/craft-before/build')),now=projectPath(path.join(projectRoot,'.cache/prototype-dist')),browser=await launch(),runs=[];
try{for(const [cycle,order]of [['A','B','C'],['C','A','B'],['B','C','A']].entries())for(const mode of order){
 const u=await setup(browser),requests=[];u.p.on('request',r=>requests.push(new URL(r.url()).pathname));
 await u.c.addInitScript(mode=>localStorage.setItem('wgs:audio:tiny-delivery',JSON.stringify({version:1,mute:mode==='B',gain:.35})),mode);
 if(mode==='A')await u.c.route('**/*',async route=>{const url=new URL(route.request().url());assert.equal(url.origin,'http://127.0.0.1:4324');const relative=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname,file=projectPath(path.join(old,relative));assert.ok(file.startsWith(old+path.sep));try{const body=await readFile(file);await route.fulfill({body,contentType:({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'})[path.extname(file)]??'application/octet-stream'});}catch{await route.fulfill({status:404,body:''});}});
 await u.open('tiny-delivery');const cdp=await u.c.newCDPSession(u.p);await cdp.send('Performance.enable');
 const metrics=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value])),before=await metrics(),started=performance.now();
 for(let n=0;n<3;n++)await u.a('arrow:0').click(); // D01 initial right -> down -> left -> up.
 await u.a('arrow:1').click();
 await u.a('go').click();await u.p.waitForTimeout(4050);assert.equal((await u.state()).won,true);const after=await metrics();
 runs.push({cycle,mode,wallMs:performance.now()-started,rendererTaskMs:(after.TaskDuration-before.TaskDuration)*1000,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000,layoutMs:(after.LayoutDuration-before.LayoutDuration)*1000,requestCount:requests.length,requestedPaths:requests,networkAudioRequests:requests.filter(x=>/\.(wav|mp3|ogg|opus|m4a)$/.test(x)).length});await u.c.close();console.log('cost',cycle,mode);
}}finally{await browser.close();}
const sizes=[];for(const name of ['game.js','game.css','shell.js']){const before=(await stat(path.join(old,'prototype-assets',name))).size,after=(await stat(path.join(now,'prototype-assets',name))).size;sizes.push({file:name,beforeBytes:before,afterBytes:after,addedBytes:after-before});}
const median=a=>a.sort((x,y)=>x-y)[Math.floor(a.length/2)];
await writeFile('docs/qa/tiny-craft-pilot-01/cost-results.json',JSON.stringify({runs,sizes,summary:['A','B','C'].map(mode=>({mode,medianRendererTaskMs:median(runs.filter(r=>r.mode===mode).map(r=>r.rendererTaskMs)),medianScriptMs:median(runs.filter(r=>r.mode===mode).map(r=>r.scriptMs))})),method:'Three isolated Edge contexts per A/B/C, rotated order; D01, same 4 arrow edits, 600ms tick and 4050ms observation. A uses byte-preserved baseline served by local Playwright route fulfillment. B/C use loopback HTTP. Renderer CDP task/script durations after load; this is a small noisy desktop measurement, not mobile CPU, power, load-time or FPS certification. No audio asset fetch; synthesis data remains in prototype JS.'},null,2)+'\n');
