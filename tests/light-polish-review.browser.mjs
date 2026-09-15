import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {launch} from './r5-helpers.mjs';
import http from 'node:http';
const base='http://127.0.0.1:4342',results=[],browser=await launch();
try{
 const context=await browser.newContext({viewport:{width:1280,height:1000}}),page=await context.newPage(),external=[],errors=[];
 await context.route('**/*',r=>{if(new URL(r.request().url()).origin!==base){external.push(r.request().url());return r.abort();}return r.continue();});page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
 const urls=await page.locator('[href],[src],[poster]').evaluateAll(nodes=>nodes.flatMap(n=>['href','src','poster'].map(k=>n.getAttribute(k)).filter(Boolean)));
 for(const url of new Set(urls)){const r=await fetch(new URL(url,base));assert.equal(r.status,200,url);}results.push({name:'Review links/assets',status:'PASS',count:new Set(urls).size});
 for(const video of await page.locator('video').all()){await video.evaluate(v=>{v.muted=true;return v.play();});await page.waitForTimeout(350);const state=await video.evaluate(v=>({width:v.videoWidth,height:v.videoHeight,time:v.currentTime,duration:v.duration,error:v.error?.message??null}));assert.deepEqual([state.width,state.height],[432,768]);assert.ok(state.time>0);assert.ok(state.duration>1&&state.duration<15);assert.equal(state.error,null);await video.evaluate(v=>v.pause());results.push({name:await video.getAttribute('src'),status:'PASS',...state});}
 for(const width of [320,390,1280]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}results.push({name:'Review responsive320/390/1280',status:'PASS'});
 for(const url of ['/.git/config','/.tmp/physical-mobile-r2/tls/server.key','/review/../../.tmp/physical-mobile-r2/tls/server.key','/src/prototypes/light-polish-art.ts'])assert.equal((await fetch(base+url)).status,404);
 assert.equal((await fetch(base,{method:'POST'})).status,405);const hostStatus=await new Promise((resolve,reject)=>http.get(base,{headers:{host:'untrusted.invalid'}},res=>{res.resume();resolve(res.statusCode);}).on('error',reject));assert.equal(hostStatus,403);assert.equal((await fetch(base+'/review/videos/after-L01.webm',{headers:{Range:'bytes=0-20'}})).status,206);results.push({name:'Forbidden paths / method / Host / range',status:'PASS'});
 assert.deepEqual(external,[]);assert.deepEqual(errors,[]);await context.close();
 const media=JSON.parse(await readFile('docs/qa/lightwork-art-polish-01/media.json','utf8'));for(const level of ['L01','L05','L16']){const [a,b]=media.records.filter(r=>r.level===level);assert.deepEqual(a.plan,b.plan);assert.deepEqual(a.finalBoard,b.finalBoard);assert.deepEqual(a.actions.map(x=>x.action),b.actions.map(x=>x.action));}results.push({name:'Before/After matching plans/state/actions',status:'PASS'});
}finally{await browser.close();await writeFile('.tmp/lightwork-polish/review-results.json',JSON.stringify({results},null,2));}console.log('Review PASS',results.length);
