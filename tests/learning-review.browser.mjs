import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,out} from './r5-helpers.mjs';
const base='http://127.0.0.1:4326',browser=await launch(),results=[];
try{
 const c=await browser.newContext({viewport:{width:1440,height:1000}}),errors=[],external=[];
 await c.route('**/*',r=>{if(!['http://127.0.0.1:4324',base].includes(new URL(r.request().url()).origin)){external.push(r.request().url());return r.abort();}return r.continue();});
 const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base);
 assert.equal(await p.locator('.play-link').count(),12);
 const urls=await p.locator('[href],[src],[poster]').evaluateAll(es=>[...new Set(es.flatMap(e=>[e.href,e.src,e.poster]).filter(Boolean))]);
 for(const url of urls){assert.ok(['http://127.0.0.1:4324',base].includes(new URL(url).origin));assert.equal((await fetch(url)).status,200,url);}
 for(const url of ['/.git/config','/.tmp/r3-before/manifest.json','/%2e%2e%2f.tmp/r3-before/manifest.json','/%2e%2e%5c.git/config','/src/prototypes/art.ts'])assert.equal((await fetch(base+url)).status,404);
 const range=await fetch(base+'/videos/switch-latch-undo.webm',{headers:{Range:'bytes=0-127'}});assert.equal(range.status,206);assert.equal((await range.arrayBuffer()).byteLength,128);
 const durations=[];
 for(const v of await p.locator('video').all()){
  await v.scrollIntoViewIfNeeded();await v.evaluate(async v=>{await v.play();v.pause();v.currentTime=1.2;await new Promise(resolve=>v.addEventListener('seeked',resolve,{once:true}));});
  const data=await v.evaluate(v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight,time:v.currentTime,error:v.error}));
  assert.ok(data.duration>3&&data.duration<7);assert.equal(data.width,432);assert.equal(data.height,768);assert.equal(data.error,null);durations.push(data);
 }
 for(const width of [1440,390]){await p.setViewportSize({width,height:1000});await p.evaluate(()=>scrollTo(0,0));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:path.join(out,'screens',`review-${width}.png`)});}
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 results.push({name:'12 local play links, all assets, four decoded/seekable videos, mobile/desktop layout, range and denied sensitive paths',status:'PASS',urlCount:urls.length,durations,errors,external});
}catch(error){results.push({status:'FAIL',error:String(error)});throw error;}
finally{await browser.close();await writeFile(path.join(out,'review-results.json'),JSON.stringify(results,null,2)+'\n');}
console.log('Learning Review Pack PASS');
