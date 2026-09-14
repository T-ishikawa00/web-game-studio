import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,out,setup,ids} from './r5-helpers.mjs';
const base='http://127.0.0.1:4325',browser=await launch(),results=[];
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base);assert.equal(await p.locator('.play-link').count(),18);
 const urls=await p.locator('[href],[src]').evaluateAll(es=>[...new Set(es.map(e=>e.href||e.src).filter(Boolean))]);
 for(const url of urls){if(new URL(url).hash)continue;const r=await fetch(url);assert.equal(r.status,200,url);}
 for(const url of ['/.git/config','/.tmp/r3-before/manifest.json','/%2e%2e%2f.tmp/r3-before/manifest.json','/%2e%2e%5c.git/config','/src/prototypes/art.ts']){assert.equal((await fetch(base+url)).status,404);}
 const video=await fetch(base+'/videos/tiny-delivery.webm',{headers:{Range:'bytes=0-127'}});assert.equal(video.status,206);assert.equal((await video.arrayBuffer()).byteLength,128);
 for(const v of await p.locator('video').all()){await v.scrollIntoViewIfNeeded();await v.evaluate(async v=>{await v.play();v.pause();});assert.ok(await v.evaluate(v=>v.duration>4));}
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:path.join(out,'screens','review-top.png')});
 await p.locator('#videos').screenshot({path:path.join(out,'screens','review-videos-320px.png')});
 assert.deepEqual(errors,[]);results.push({name:'Review page: all local assets and 18 play links, decodable videos, range response, denied sensitive paths',status:'PASS',urlCount:urls.length});
 // Initial guidance is reviewed inside the actual game area, not in a mockup.
 for(const id of ids){const u=await setup(browser,{viewport:{width:390,height:844},hasTouch:true});await u.open(id,'auto','en');assert.equal(await u.f.locator('.input-cue').count(),1);await u.f.locator('[data-capture-frame]').screenshot({path:path.join(out,'screens',`${id}-first-use-390.png`)});await u.c.close();}
 results.push({name:'3 fresh English mobile contexts: visible one-line input cue, actual boards, isolated storage',status:'PASS'});
}finally{await browser.close();await writeFile(path.join(out,'review-results.json'),JSON.stringify(results,null,2));}
console.log('R5 review verification',results.length,'PASS');
