import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,tick,validate,startBuild,sell,cancelBuild,leisurePose,canBuild,NODES,EDGES,relocate} from '../game/src/core';
import {groundHeight,hillTerrainHeight,hillEdges,type Connection,type Outlook} from '../game/src/hill-layout';
import {cove,build,until} from './helpers';
for(const route of ['village-link','cove-link'] as Connection[])for(const view of ['sea-view','town-view'] as Outlook[])for(const plaza of ['sea','shade'] as const)for(const market of ['coast','village'] as const){
test(`${route}/${view}/${plaza}/${market}: real progress, height, old-new circulation, work return, roundtrip`,()=>{
 const s=cove('commons',plaza);if(market==='village')assert(relocate(s,market));build(s,'hillpath',route);assert.equal(s.hillpath,route);assert.equal(canBuild(s,'lookout'),'ok');
 while(s.coins<6){until(s,x=>x.wood>=4);assert(sell(s));until(s,x=>x.order===null);}
 assert(startBuild(s,'lookout',view));until(s,x=>!!x.project&&x.project.work>2);const saved=structuredClone(s);assert(validate(saved));
 for(let i=0;i<1600;i++){tick(s,.05);tick(saved,.05);assert(validate(s));assert.deepEqual(s,saved);}
 assert.equal(s.lookout,view);const visited=new Set<number>();let maxY=0;
 for(let i=0;i<12000;i++){tick(s,.05);assert(validate(s));for(const w of s.workers){maxY=Math.max(maxY,groundHeight(w.x,w.z));if(w.leisure&&w.phase==='work')visited.add(w.leisure.stops[w.leisure.index]);}}
 assert(maxY>1.4);assert(visited.has(view==='sea-view'?37:38));assert(visited.has(plaza==='sea'?21:23));assert(visited.has(0));assert(visited.has(market==='coast'?7:10));
 until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'&&groundHeight(w.x,w.z)>1));
 const pos=s.workers.map(w=>[w.x,w.z]);assert(sell(s));tick(s,.05);assert(s.workers.some(w=>w.job==='trade'));
 s.workers.forEach((w,i)=>assert(Math.hypot(w.x-pos[i][0],w.z-pos[i][1])<=.096));until(s,x=>x.order===null);until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'&&groundHeight(w.x,w.z)>1));
 assert.equal(s.workers.length,3);assert(validate(s));assert(Buffer.byteLength(JSON.stringify(s))<100000);
});}
test('hill choices and prerequisites reject invalid saves; cancellation refunds once',()=>{
 const f=fresh();assert.equal(canBuild(f,'hillpath'),'locked');assert.equal(startBuild(f,'hillpath','village-link'),false);assert.equal(validate({...f,hillpath:'cove-link'}),false);
 const s=cove();while(s.coins<6){assert(sell(s));until(s,x=>x.order===null);}const coins=s.coins;assert(startBuild(s,'hillpath','village-link'));assert(cancelBuild(s));assert.equal(s.coins,coins);assert.equal(cancelBuild(s),false);assert.equal(validate({...s,lookout:'sea-view'}),false);
 assert.notDeepEqual(hillEdges('village-link'),hillEdges('cove-link'));assert.equal(groundHeight(0,.85),.35);assert(groundHeight(3.7,-2.9)>1.5);
});
test('construction and cancellation use real approach edges before hillside unlock',()=>{
 for(const route of ['village-link','cove-link'] as Connection[]){const s=cove();s.coins=12;s.wood=24;assert(startBuild(s,'hillpath',route));tick(s,.05);for(let i=0;i<200;i++){tick(s,.05);for(const w of s.workers){const ids=[w.anchor,...w.route].map(p=>NODES.findIndex(n=>n[0]===p[0]&&n[1]===p[1]));assert(ids.every((n,j)=>!j||n===ids[j-1]||EDGES.some(e=>e.includes(n)&&e.includes(ids[j-1]))));}}assert(cancelBuild(s));for(let i=0;i<400;i++){tick(s,.05);assert(validate(s));}}
});
test('completed island never reserves the same physical seat twice; malformed routes and nonselected outlook are rejected',()=>{
 const s=cove();build(s,'hillpath','cove-link');build(s,'lookout','sea-view');
 for(let i=0;i<10000;i++){tick(s,.05);assert(validate(s));const seats=s.workers.flatMap(w=>w.leisure?.stops.filter(n=>[21,26,23,27,37,38].includes(n))||[]);assert.equal(seats.length,new Set(seats).size);}
 const bad=structuredClone(s),w=bad.workers[0];w.job='idle';w.phase='work';w.route=[];w.anchor=[...NODES[38]];[w.x,w.z]=w.anchor;w.leisure={stops:[38,0],index:0,dwell:0};assert.equal(validate(bad),false);
 w.phase='walk';w.leisure=null;w.anchor=[...NODES[0]];[w.x,w.z]=w.anchor;w.route=[[...NODES[41]]];assert.equal(validate(bad),false);
});
test('authored coastal bank supports the east descent at the shared walking height',()=>{
 for(let i=0;i<=60;i++){const t=i/60,x=4.8+.2*t,z=-2.8+1.75*t;assert(Math.abs(hillTerrainHeight(x,z,.16)-groundHeight(x,z))<.002);}
 assert.equal(hillTerrainHeight(-6,2,-.1),-.1);
});
