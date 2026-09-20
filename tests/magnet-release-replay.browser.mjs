import {createHash as releaseHash} from 'node:crypto';
import {readFile as releaseRead} from 'node:fs/promises';
const artifactSha256=releaseHash('sha256').update(await releaseRead('docs/qa/game004-magnet-release-r1/distribution.json')).digest('hex');
// Replays trusted input recorded against the frozen deterministic baseline.
// No runtime inspection API, save fixture or gameplay mutation is used here.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {launch} from './r5-helpers.mjs';
const live=process.argv.includes('--live'),base=live?'https://tinlumo.com':'http://127.0.0.1:4373',out='docs/qa/game004-magnet-release-r1',key='tinlumo.game004.magnet.full.v1';
const ops=JSON.parse(await fs.readFile('docs/qa/game004-magnet-release-r1/trusted-input.json'));
const browser=await launch(),c=await browser.newContext({viewport:{width:1280,height:800}}),p=await c.newPage(),errors=[],external=[],milestones=[];
p.on('pageerror',e=>errors.push(e.message));await c.route('**/*',r=>{if(new URL(r.request().url()).origin!==base){external.push(new URL(r.request().url()).origin);return r.abort();}return r.continue();});
try{
 await p.clock.install();await p.clock.pauseAt(Date.now()+100);await p.goto(base+'/en/play/project-magnet/');
 assert.equal(await p.evaluate(()=>('__magnet' in window)),false);assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),null);
 for(const [i,o] of ops.entries()){
  if(o.group==='locator'){
   if(o.selector==='#mission-select'){
    const saved=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);milestones.push({records:saved.records,unlocked:saved.unlocked,run:saved.run});
    assert.equal(saved.run,null);assert.ok(Object.keys(saved.records).length===milestones.length);
    await p.screenshot({path:out+`/${live?'live':'local'}-clear-${milestones.length}.png`});
   }
   await p.locator(o.selector).first()[o.name](...o.args);
  }else await p[o.group][o.name](...o.args);
  if(i%800===0)console.log({input:i,total:ops.length});
 }
 const saved=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 for(const m of ['A','B','C'])assert.equal(saved.records[m].clears,1);
 assert.deepEqual(saved.unlocked,['A','B','C']);assert.equal(saved.run,null);assert.ok((await p.locator('#mission-hub').textContent()).includes('NORMAL END'));
 await p.reload();await p.clock.runFor(100);assert.deepEqual(await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key),saved);
 assert.equal(errors.length,0);assert.equal(external.length,0);
 await fs.writeFile(out+`/${live?'live':'local'}-earned-flow.json`,JSON.stringify({status:'PASS',artifactSha256,base,inputOperations:ops.length,method:'Fresh storage; trusted keyboard/mouse replay; accelerated clock; no state injection or QA API',milestones,saved,errors,external},null,2)+'\n');
 console.log({status:'PASS',missions:Object.keys(saved.records),inputOperations:ops.length});
}finally{await browser.close();}
