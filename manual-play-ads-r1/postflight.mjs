import fs from 'node:fs';
import assert from 'node:assert/strict';
import {read,sha,json,git,state} from '../game008-009-production-r1/common.mjs';
const root='manual-play-ads-r1',p=read(root+'/internal/PREFLIGHT.json'),basis=read(p.basis.manifestFile);
assert.equal(git('rev-parse','HEAD'),p.head);assert.equal(git('ls-remote','origin','refs/heads/main').split(/\s/)[0],p.remote);assert.equal(git('diff','--cached','--name-only'),'');
const production=state('game008-009-production-r1/game009/wrangler.production.json');assert.deepEqual(production,p.production);
const checked=[];
const paths=[...basis.routes.map(r=>r.slice(1)+'index.html'),'ads.txt'];
for(let i=0;i<paths.length;i+=8)await Promise.all(paths.slice(i,i+8).map(async file=>{
 const route=file==='ads.txt'?'/ads.txt':file==='index.html'?'/':'/'+file.replace(/index.html$/,'');
 const response=await fetch('https://tinlumo.com'+route,{signal:AbortSignal.timeout(15000)});assert.equal(response.status,200);
 const content=Buffer.from(await response.arrayBuffer()),expected=basis.files.find(e=>e.file===file);assert.equal(sha(content),expected.sha256,'Live basis changed '+route);
 if(route.includes('/play/')){const h=content.toString();assert(!h.includes('data-ad-slot='));assert.equal((h.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/g)||[]).length,1);}
 checked.push({route,sha256:expected.sha256});
}));
function gitPath(file) {
 if(!file.startsWith('"'))return file;
 const raw=file.slice(1,-1),bytes=[];
 for(let i=0;i<raw.length;i++){
  if(raw[i]==='\\'){
   const octal=raw.slice(i+1,i+4);if(/^[0-7]{3}$/.test(octal)){bytes.push(parseInt(octal,8));i+=3;continue;}
   const escapes={n:10,t:9,r:13,b:8,f:12,v:11,'"':34,'\\':92};i++;assert(raw[i] in escapes);bytes.push(escapes[raw[i]]);
  }else bytes.push(...Buffer.from(raw[i]));
 }
 return Buffer.from(bytes).toString('utf8');
}
const missing=p.untracked.map(gitPath).filter(f=>!fs.existsSync(f));assert.equal(missing.length,0,'An initial untracked file disappeared');
json(root+'/internal/POSTFLIGHT.json',{at:new Date().toISOString(),status:'PASS',head:p.head,remote:p.remote,production,liveBasisChecked:checked.sort((a,b)=>a.route.localeCompare(b.route)),initialUntrackedPreserved:p.untracked.length,indexEmpty:true,stage:false,commit:false,push:false,deploy:false});
console.log(JSON.stringify({status:'PASS',head:p.head,production,liveBasisFiles:checked.length,initialUntrackedPreserved:p.untracked.length,indexEmpty:true,externalWrites:0}));
