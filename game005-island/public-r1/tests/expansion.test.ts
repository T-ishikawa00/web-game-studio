import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,tick,validate,startBuild,cancelBuild,sell,moveCommons,leisurePose,BALANCE,STOCK_TARGET,NODES,type Build} from '../game/src/core';
import * as accepted from '../../r2/src/core';
import {mvp,cove,until,build} from './helpers';

test('original economic and worker behavior remains identical through accepted bridge completion',()=>{
 const a=accepted.fresh(),b=fresh();
 const parity=()=>{const {schemaVersion,cove,commons,promenade,hillpath,lookout,...candidate}=b;const {schemaVersion:old,...baseline}=a;assert.deepEqual({...candidate,workers:b.workers.map(({leisure,visits,...w})=>w)},baseline);};
 const run=(f:()=>boolean)=>{for(let i=0;i<12000&&!f();i++){accepted.tick(a,.05);tick(b,.05);parity();assert(validate(b));}assert(f());};
 for(const kind of ['dock','lumber','market','house','expansion'] as const){while(a.coins<BALANCE[kind].coins){run(()=>a.wood>=4);assert(accepted.sell(a));assert(sell(b));run(()=>a.order===null);}assert(accepted.startBuild(a,kind));assert(startBuild(b,kind));run(()=>!a.project&&!a.plan);}
 assert(a.expanded&&b.expanded);assert.equal(b.workers.length,3);
});
for(const order of ['commons','promenade'] as const)for(const plot of ['sea','shade'] as const){
 test(`real simulation ${order} first / ${plot}: distinct visits, no extra coins, serializable life`,()=>{
  const s=mvp();build(s,'cove');build(s,order,order==='commons'?plot:'coast');
  until(s,x=>x.workers.some(w=>leisurePose(w)!==null));
  assert(s.workers.some(w=>w.leisure));
  if(order==='commons')until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'));
  else assert(s.workers.every(w=>leisurePose(w)!=='sit'));
  build(s,order==='commons'?'promenade':'commons',order==='commons'?'coast':plot);
  until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'));
  const destinations=new Set(s.workers.flatMap(w=>w.leisure?.stops||[]));
  assert(plot==='sea'?(destinations.has(21)||destinations.has(26)):(destinations.has(23)||destinations.has(27)));
  const clone=JSON.parse(JSON.stringify(s)),coins=s.coins;
  for(let i=0;i<1200;i++){tick(s,.05);tick(clone,.05);assert(validate(s));assert.deepEqual(s,clone);}
  assert.equal(s.coins,coins);assert.equal(s.workers.length,3);assert(s.wood<=STOCK_TARGET+2);
 });
}
test('idle walk and seated residents accept work automatically without teleport or stale pose',()=>{
 for(const phase of ['walk','sit'] as const){const s=cove('commons','sea');until(s,x=>x.workers.some(w=>phase==='walk'?!!w.leisure&&w.phase==='walk':leisurePose(w)==='sit'));
  const old=s.workers.map(w=>({x:w.x,z:w.z}));assert(sell(s));tick(s,.05);
  assert(s.workers.some(w=>w.job==='trade'));for(const w of s.workers){assert(Math.hypot(w.x-old[w.id].x,w.z-old[w.id].z)<=.096);if(w.job!=='idle')assert.equal(w.leisure,null);}
  const coins=s.coins;until(s,x=>x.order===null);assert.equal(s.coins,coins+8);until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'));assert(validate(s));
 }
});
test('construction from leisure, mid-work reload and cancellation preserve funds once',()=>{
 const s=mvp();build(s,'cove');build(s,'commons','shade');until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'));
 while(s.coins<8){assert(sell(s));until(s,x=>x.order===null);}
 const coins=s.coins;assert(startBuild(s,'promenade'));until(s,x=>!!x.project&&x.project.work>4);const clone=JSON.parse(JSON.stringify(s));assert(validate(clone));
 const before=s.wood;assert(cancelBuild(s));assert.equal(s.coins,coins);assert.equal(s.wood,before+8);assert.equal(cancelBuild(s),false);
 until(clone,x=>x.promenade);assert.equal(clone.coins,coins-8);assert(validate(clone));
});
test('placement relocation preserves economy and residents return from real positions',()=>{
 const s=cove('commons','sea');until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'));const poses=s.workers.map(w=>[w.x,w.z]),money=[s.wood,s.coins];assert(moveCommons(s,'shade'));assert.deepEqual(s.workers.map(w=>[w.x,w.z]),poses);assert.deepEqual([s.wood,s.coins],money);assert(s.workers.every(w=>!w.leisure));assert(validate(s));until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'));assert(s.workers.some(w=>w.leisure?.stops.includes(23)||w.leisure?.stops.includes(27)));
});
test('invalid expansion states and leisure payloads are rejected, raw schema2 is not silently loaded',()=>{
 const s=cove();for(const bad of [{...s,schemaVersion:2},{...s,commons:'village'},{...s,cove:false},{...fresh(),promenade:true},{...s,project:{kind:'commons',plot:'coast',work:0}}])assert.equal(validate(bad),false);
 const a=structuredClone(s);a.workers[0].job='idle';a.workers[0].leisure={stops:[999,0],index:0,dwell:0};assert.equal(validate(a),false);
 const b=structuredClone(s);b.workers[0].job='idle';b.workers[0].leisure={stops:[21,0],index:0,dwell:NaN};assert.equal(validate(b),false);
});

test('fabricated idle poses cannot sit away from their saved target',()=>{const s=cove();until(s,x=>x.workers.some(w=>leisurePose(w)==='sit'));const w=s.workers.find(w=>leisurePose(w)==='sit')!;w.x=0;w.z=.85;w.anchor=[0,.85];assert.equal(validate(s),false);});

test('promenade-only and sea routes never use the unbuilt shade spur',()=>{for(const finished of [false,true]){const s=finished?cove('promenade','sea'):mvp();if(!finished){build(s,'cove');build(s,'promenade');}for(let i=0;i<2000;i++){tick(s,.05);assert(validate(s));for(const w of s.workers){const ids=[w.anchor,...w.route].map(p=>NODES.findIndex(n=>n[0]===p[0]&&n[1]===p[1]));for(let j=1;j<ids.length;j++)assert(!(ids[j-1]===19&&ids[j]===28||ids[j-1]===28&&ids[j]===19));}}}});
