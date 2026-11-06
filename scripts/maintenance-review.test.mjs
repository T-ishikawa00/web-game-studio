import test from 'node:test';import assert from 'node:assert/strict';import {once} from 'node:events';import http from 'node:http';import {createReviewServer} from './maintenance-review.mjs';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const server=createReviewServer();server.listen(0,'127.0.0.1');await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;
test('audit report and screenshot are readable',async()=>{const r=await fetch(base);assert.equal(r.status,200);assert.match(await r.text(),/TINLUMO/);assert.match(r.headers.get('x-robots-tag'),/noindex/);assert.equal((await fetch(base+'/screens/island.jpg')).status,200);});
test('repository and secret paths are not exposed',async()=>{for(const p of ['/.git/config','/.env','/scripts/security-scan.mjs','/../README.md','/docs/../../.git/config'])assert.equal((await fetch(base+p)).status,404);});
test('request mutation and cross-site request are blocked',async()=>{assert.equal((await fetch(base,{method:'POST'})).status,405);assert.equal((await fetch(base,{headers:{'Sec-Fetch-Site':'cross-site'}})).status,403);});
test('Host rebinding is blocked',async()=>{const status=await new Promise((resolve,reject)=>http.get(base,{headers:{Host:'untrusted.invalid'}},r=>{r.resume();r.on('end',()=>resolve(r.statusCode));}).on('error',reject));assert.equal(status,403);});
test('receipt cannot claim completion without matching refs and preservation',async()=>{
 const parent=fileURLToPath(new URL('../.tmp/',import.meta.url));fs.mkdirSync(parent,{recursive:true});const dir=fs.mkdtempSync(path.join(parent,'receipt-test-'));fs.mkdirSync(path.join(dir,'.tmp'));
 const owned=createReviewServer(dir);owned.listen(0,'127.0.0.1');await once(owned,'listening');
 const valid={status:'REMOTE_READBACK_COMPLETE',private:true,rootPreserved:true,commit:'1'.repeat(40),remoteMain:'1'.repeat(40),archive:'ab91ae39c767b5cb0ff2f8ce10a10e9bab93dfad'};
 try{for(const [change,expected] of [[{private:false},false],[{rootPreserved:false},false],[{remoteMain:'2'.repeat(40)},false],[{archive:'3'.repeat(40)},false],[{},true]]){fs.writeFileSync(path.join(dir,'.tmp/professionalization-delivery.json'),JSON.stringify({...valid,...change}));const r=await (await fetch('http://127.0.0.1:'+owned.address().port+'/__delivery.json')).json();assert.equal(r.status==='REMOTE_READBACK_COMPLETE',expected);}}
 finally{owned.close();owned.closeAllConnections();assert(fs.realpathSync(dir).startsWith(fs.realpathSync(parent)+path.sep));fs.rmSync(dir,{recursive:true});}
});
test.after(()=>{server.close();server.closeAllConnections();});
