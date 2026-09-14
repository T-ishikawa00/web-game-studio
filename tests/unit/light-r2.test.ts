import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {lightLevelsR2} from '../../src/prototypes/light-levels-r2';
import {settleLight,traceLight,turnMirror,type LightLevel,type LightState} from '../../src/prototypes/light-r2';

interface Answer {key:string;id:string;version:number;solution:number[];intermediate:{after:number;state:LightState;lit:number[];won:boolean}[];counterexamples:{solution:number[];won:boolean}[]}
const answers=JSON.parse(readFileSync(new URL('../../src/prototypes/light-answers-r2.json',import.meta.url),'utf8')) as Answer[];
const start=(l:LightLevel):LightState=>({mirrors:[...l.initial],gate:false,...(l.gates?{gates:l.gates.map(()=>false)}:{})});
const sorted=(a:number[])=>[...a].sort((a,b)=>a-b);

/** Independent coordinate/vector oracle: does not call runtime neighbor, reflect or tracing. */
function oracle(l:LightLevel,input:LightState,settle:boolean){
 const state:LightState=structuredClone(input);
 const switches=l.gates??(l.gate===undefined?[]:[{gate:l.gate,switch:l.switch!,id:'A' as const}]);
 let flags=l.gates?[...(state.gates??l.gates.map(()=>false))]:[state.gate];
 let lit:number[]=[];
 for(let pass=0;pass<=switches.length;pass++){
  const hit=new Set<number>(),newFlags=[...flags],pending:[number,number,number,number][]=[[l.source%l.size,Math.floor(l.source/l.size),[0,1,0,-1][l.direction]!,[-1,0,1,0][l.direction]!]];
  const seen=new Set<string>();
  while(pending.length){
   const [x,y,dx,dy]=pending.pop()!;const tag=[x,y,dx,dy].join(',');if(seen.has(tag))continue;seen.add(tag);
   const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=l.size||yy>=l.size)continue;
   const p=yy*l.size+xx,gate=switches.findIndex(g=>g.gate===p);
   if(l.walls.includes(p)||(gate>=0&&!flags[gate]))continue;
   if(l.flowers.includes(p))hit.add(p);
   switches.forEach((g,i)=>{if(p===g.switch)newFlags[i]=true;});
   if(p===l.splitter?.cell){
    const heading=dx===1?1:dx===-1?3:dy===1?2:0;
    if(heading===l.splitter.input)for(const d of l.splitter.outputs)pending.push([xx,yy,[0,1,0,-1][d]!,[-1,0,1,0][d]!]);
   }else{
    const m=l.mirrors.indexOf(p);
    // A slash reflects (dx,dy) to (-dy,-dx); backslash to (dy,dx).
    pending.push(m<0?[xx,yy,dx,dy]:state.mirrors[m]?[xx,yy,-dy,-dx]:[xx,yy,dy,dx]);
   }
  }
  lit=sorted([...hit]);
  if(!settle||JSON.stringify(flags)===JSON.stringify(newFlags))break;
  flags=newFlags;
 }
 if(l.gates)state.gates=flags;else state.gate=flags[0]??false;
 return {state,lit,won:l.flowers.every(p=>lit.includes(p))};
}

for(const l of lightLevelsR2){
 test(`${l.id} R2: authored actions, intermediate assertions and counterexamples`,()=>{
  const answer=answers.find(a=>a.key===l.answerKey)!;assert.ok(answer);assert.equal(answer.version,l.version);
  assert.equal(l.hints?.length,2);assert.ok(l.hints?.every(h=>h.ja.length>0&&h.en.length>0));
  const pieces=[l.source,...l.mirrors,...l.flowers,...(l.gates?.flatMap(g=>[g.gate,g.switch])??[]),...(l.gate===undefined?[]:[l.gate,l.switch!]),...(l.splitter?[l.splitter.cell]:[])];
  assert.equal(new Set(pieces).size,pieces.length,'Components do not overlap');
  for(const p of [...pieces,...l.walls])assert.ok(Number.isInteger(p)&&p>=0&&p<l.size*l.size);
  for(const p of pieces)assert.ok(!l.walls.includes(p),`No component is a wall: ${p}`);
  assert.ok(l.mirrors.length<=6);assert.ok(l.flowers.length<=3);assert.ok((l.gates?.length??0)<=2);
  let state=start(l);assert.equal(settleLight(l,state).won,false);
  for(const [i,m]of answer.solution.entries()){
   const actual=turnMirror(l,state,m);const expected=answer.intermediate[i]!;
   assert.deepEqual(actual.state,expected.state);assert.deepEqual(actual.lit,expected.lit);assert.equal(actual.won,expected.won);
   const independent=oracle(l,actual.state,true);assert.deepEqual(sorted(actual.lit),independent.lit);assert.equal(actual.won,independent.won);
   assert.equal(expected.after,i+1);state=actual.state;
  }
  assert.equal(settleLight(l,state).won,true);
  for(const counter of answer.counterexamples){let s=start(l);for(const m of counter.solution)s=turnMirror(l,s,m).state;assert.equal(settleLight(l,s).won,counter.won);}
 });
 test(`${l.id} R2: exhaustive orientation/gate parity against independent vector oracle`,()=>{
  const count=l.gates?.length??(l.gate===undefined?0:1);
  for(let mask=0;mask<2**l.mirrors.length;mask++)for(let opened=0;opened<2**count;opened++){
   const s:LightState={mirrors:l.mirrors.map((_,i)=>Boolean(mask&(1<<i))),gate:l.gates?false:Boolean(opened&1),...(l.gates?{gates:l.gates.map((_,i)=>Boolean(opened&(1<<i)))}:{})};
   for(const stable of [false,true]){const r=stable?settleLight(l,s):traceLight(l,s);const expected=oracle(l,s,stable);assert.deepEqual(sorted(r.lit),expected.lit);assert.equal(r.won,expected.won);if('state'in r)assert.deepEqual(r.state,expected.state);}
  }
 });
}

test('L01–L05: persisted board shape and legacy answers stay byte-for-byte equivalent in meaning',()=>{
 const old=JSON.parse(readFileSync(new URL('../../docs/qa/prototype-batch-01/solutions.json',import.meta.url),'utf8')) as {id:string;solution:number[]}[];
 const legacy=JSON.parse(readFileSync(new URL('../../src/prototypes/level-answers.json',import.meta.url),'utf8')) as Answer[];
 const boards=[
  {size:5,source:15,direction:1,mirrors:[17],initial:[false],flowers:[2],walls:[6,8,21,23]},
  {size:5,source:20,direction:1,mirrors:[22,7],initial:[false,false],flowers:[9],walls:[11,13,16,18]},
  {size:6,source:30,direction:1,mirrors:[32,14,16,28],initial:[false,false,true,false],flowers:[22,27],walls:[33,21,8]},
  {size:5,source:15,direction:1,mirrors:[17],initial:[false],flowers:[2],walls:[6,8,21,23],gate:7,switch:12},
  {size:5,source:10,direction:1,mirrors:[12],initial:[true],flowers:[2],walls:[6,8,16,18],gate:7,switch:22},
 ];
 for(const [index,l] of lightLevelsR2.slice(0,5).entries()){
  assert.equal(l.version,1);assert.equal(l.gates,undefined);assert.equal(l.splitter,undefined);
  const {size,source,direction,mirrors,initial,flowers,walls}=l;
  assert.deepEqual({size,source,direction,mirrors,initial,flowers,walls,...(l.gate===undefined?{}:{gate:l.gate,switch:l.switch})},boards[index]);
  assert.deepEqual(Object.keys(settleLight(l,start(l)).state).sort(),['gate','mirrors']);
  const answer=answers.find(a=>a.id===l.id)!;assert.deepEqual(answer.solution,old.find(a=>a.id===l.id)!.solution);
  assert.deepEqual(answer.intermediate,legacy.find(a=>a.id===l.id)!.intermediate);
 }
});

test('L08/L18: exhaustive reachable graph cannot bypass sequential gates or win with final mirrors alone',()=>{
 for(const id of ['L08','L18']){
  const l=lightLevelsR2.find(l=>l.id===id)!;const queue=[start(l)],seen=new Set<string>();let wins=0;
  while(queue.length){const s=queue.shift()!;const key=JSON.stringify(s);if(seen.has(key))continue;seen.add(key);
   assert.ok(!s.gates![1]||s.gates![0],'B cannot be opened before A');
   const r=settleLight(l,s);if(r.won){wins++;assert.deepEqual(r.state.gates,[true,true]);if(id==='L18'){assert.equal(r.paths.length,3);assert.equal(r.lit.length,3);}continue;}
   for(let i=0;i<l.mirrors.length;i++)queue.push(turnMirror(l,s,i).state);
  }
  assert.ok(wins>0);assert.ok(seen.size<=2**(l.mirrors.length+2));
  for(let mask=0;mask<2**l.mirrors.length;mask++)assert.equal(settleLight(l,{...start(l),mirrors:l.mirrors.map((_,i)=>Boolean(mask&(1<<i)))}).won,false,'Preparing mirror orientation alone cannot replace gate history');
 }
});

test('splitter entrance, branches, wrong-side stop and segment continuity',()=>{
 const l=lightLevelsR2[8]!;const r=settleLight(l,{...start(l),mirrors:[true]});
 assert.deepEqual(r.paths,[[30,31,32,26,20,14],[14,13,12],[14,15,16,17]]);
 assert.deepEqual(r.segments,[[30,31],[31,32],[32,26],[26,20],[20,14],[14,13],[13,12],[14,15],[15,16],[16,17]]);
 const wrong={...l,source:12,direction:1 as const,mirrors:[],initial:[],flowers:[17],walls:[]};
 assert.deepEqual(traceLight(wrong,{mirrors:[],gate:false}).path,[12,13,14]);assert.equal(traceLight(wrong,{mirrors:[],gate:false}).won,false);
});

test('gate fixed-point opens A then B in one stable evaluation; transient flowers do not accumulate',()=>{
 const l:LightLevel={kind:'light',id:'synthetic',version:1,size:6,title:{ja:'試験',en:'Test'},lesson:{ja:'試験',en:'Test'},source:0,direction:1,mirrors:[],initial:[],walls:[],flowers:[5],gates:[{id:'A',switch:1,gate:2},{id:'B',switch:3,gate:4}]};
 const r=settleLight(l,start(l));assert.deepEqual(r.state.gates,[true,true]);assert.deepEqual(r.lit,[5]);assert.equal(r.won,true);
 const real=lightLevelsR2[12]!;const a=turnMirror(real,start(real),0),b=turnMirror(real,a.state,1);
 assert.deepEqual(a.lit,[13,24]);assert.deepEqual(b.lit,[13,17]);assert.equal(b.won,false,'Past light on 24 must not count now');
});

test('multi-gate snapshots are immutable; undo/retry closes only the restored historical state',()=>{
 const l=lightLevelsR2[17]!,initial=start(l),snapshot=structuredClone(initial);
 const a=turnMirror(l,initial,0),b=turnMirror(l,turnMirror(l,a.state,1).state,2);
 assert.deepEqual(initial,snapshot);assert.deepEqual(a.state.gates,[true,false]);assert.deepEqual(b.state.gates,[true,true]);
 assert.deepEqual(settleLight(l,a.state).state.gates,[true,false]);assert.deepEqual(settleLight(l,initial).state.gates,[false,false]);
 assert.notEqual(a.state.mirrors,initial.mirrors);assert.notEqual(a.state.gates,initial.gates);
});

test('splitter feedback is bounded; wrong-side return stops without a false cycle',()=>{
 const base:LightLevel={kind:'light',id:'cycle',version:1,size:5,title:{ja:'試験',en:'Test'},lesson:{ja:'試験',en:'Test'},source:10,direction:1,mirrors:[14,24,22],initial:[false,true,false],walls:[],flowers:[0],splitter:{cell:12,input:1,outputs:[1,2]}};
 // East branch turns down, left, up and re-enters from the wrong side, where it stops.
 const r=traceLight(base,start(base));assert.equal(r.loop,false);assert.ok(r.segments.length<40);assert.equal(r.won,false);
 const cycle:LightLevel={...base,source:6,mirrors:[8,18,16,6],initial:[false,true,false,true],splitter:undefined};
 assert.equal(traceLight(cycle,start(cycle)).loop,true);
 const feedback:LightLevel={...base,mirrors:[14,24,20,10],initial:[false,true,false,true]};
 const branchLoop=traceLight(feedback,start(feedback));assert.equal(branchLoop.loop,true);assert.ok(branchLoop.segments.length<40);assert.equal(branchLoop.won,false);
});
