import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,out} from './r4-helpers.mjs';
const browser=await launch(),p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
try{await p.goto('http://127.0.0.1:4325/');await p.locator('h1').waitFor();const refs=await p.locator('[src],a[href]').evaluateAll(nodes=>[...new Set(nodes.map(e=>e.getAttribute('src')??e.getAttribute('href')).filter(Boolean))]);
 const broken=[];for(const ref of refs){const url=new URL(ref,p.url());assert.ok(['http://127.0.0.1:4324','http://127.0.0.1:4325'].includes(url.origin));const r=await fetch(url,{method:'HEAD'});if(!r.ok)broken.push({path:url.pathname,status:r.status});}assert.deepEqual(broken,[]);assert.equal(await p.locator('a[href^="http://127.0.0.1:4324"]').count(),18);
 await p.screenshot({path:path.join(out,'screens','review-top.png')});await p.locator('video').first().evaluate(e=>e.play());await p.waitForTimeout(500);assert.ok(await p.locator('video').first().evaluate(e=>e.currentTime)>0);assert.deepEqual(errors,[]);await writeFile(path.join(out,'review-results.json'),JSON.stringify({status:'PASS',url:p.url(),checkedLinksAndAssets:refs.length,playLinks:18,videoPlayback:true,errors},null,2));console.log('PASS review',refs.length,'links/assets, 18 play URLs, video playback');}finally{await browser.close();}
