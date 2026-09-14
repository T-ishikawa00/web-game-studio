import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { deliveryLevelsR2 } from '../../src/prototypes/delivery-levels-r2';
import { startDelivery, tickDelivery, type DeliveryLevel, type DeliveryEdit, type DeliveryRun } from '../../src/prototypes/delivery-r2';
import type { Dir } from '../../src/prototypes/rules';
const answers = JSON.parse(readFileSync('src/prototypes/delivery-answers-r2.json','utf8')) as {id:string;solution:DeliveryEdit;intermediate:{after:number;bots:DeliveryRun['bots'];status:string}[];enumeration:{attempts:number;winningSettings:number};counterexamples:{edit:DeliveryEdit;reason:string;after:number;failureCells:number[]}[]}[];
const level=(id:string)=>deliveryLevelsR2.find(l=>l.id===id)!;
function play(l:DeliveryLevel,e:DeliveryEdit){let run=startDelivery(l);const frames:DeliveryRun[]=[];while(run.status==='running'){run=tickDelivery(l,e,run);frames.push(run);}return {run,frames};}
function product<T>(choices:T[][]):T[][] {return choices.reduce<T[][]>((acc,c)=>acc.flatMap(p=>c.map(v=>[...p,v])),[[]]);}
function settings(l:DeliveryLevel):DeliveryEdit[]{return product(l.allowedDirections??l.sockets.map(()=>[0,1,2,3] as Dir[])).flatMap(arrows=>product((l.waitCells??(l.waitCell===undefined?[]:[l.waitCell])).map(()=>Array.from({length:(l.maxWait??2)+1},(_,i)=>i))).map(waits=>({arrows,wait:l.waitCells?0:(waits[0]??0) as 0|1|2,...(l.waitCells?{waits}:{})})));}

for(const l of deliveryLevelsR2)test(`${l.id} R2: data, independent authored answer, counterexample and complete bounded enumeration`,()=>{
  const answer=answers.find(a=>a.id===l.id)!;assert.ok(answer);assert.equal(l.version,1);assert.ok(l.hints?.every(h=>h.ja&&h.en));
  assert.ok(l.robots.length>=1&&l.robots.length<=2);assert.ok(l.sockets.length<=5);assert.ok((l.waitCells?.length??0)<=2);
  assert.equal(l.initial.length,l.sockets.length);if(l.allowedDirections)assert.equal(l.allowedDirections.length,l.sockets.length);
  const cells=[...l.sockets,...l.robots.flatMap(r=>[r.start,r.goal]),...(l.waitCells??[]),...Object.keys(l.fixedArrows??{}).map(Number)];
  for(const p of [...cells,...l.walls])assert.ok(Number.isInteger(p)&&p>=0&&p<l.size*l.size,`${l.id}: ${p}`);
  cells.forEach(p=>assert.ok(!l.walls.includes(p)));assert.equal(new Set(l.walls).size,l.walls.length);
  l.allowedDirections?.forEach((ds,i)=>{assert.ok(ds.length>=2&&ds.length<=4);assert.ok(ds.includes(l.initial[i]!));assert.equal(ds.length,new Set(ds).size);});
  const result=play(l,answer.solution);assert.equal(result.run.status,'won');
  assert.deepEqual(result.frames.map(r=>({after:r.tick,bots:r.bots,status:r.status})),answer.intermediate);
  assert.ok(result.run.tick<=12,'Trials stay short');
  for(const bad of answer.counterexamples){const r=play(l,bad.edit).run;assert.equal(r.status,'failed');assert.equal(r.reason,bad.reason);assert.equal(r.tick,bad.after);assert.deepEqual(r.failureCells,bad.failureCells);}
  const all=settings(l);assert.ok(all.length<=256,'Enumeration is bounded by content, not a timeout');
  const wins=all.filter(e=>play(l,e).run.status==='won');assert.equal(all.length,answer.enumeration.attempts);assert.equal(wins.length,answer.enumeration.winningSettings);assert.ok(wins.length>0&&wins.length<all.length);
});

test('R2 keeps the original five gameplay boards, IDs, version and legacy edit layout',()=>{
  const expected=[
    {id:'D01',size:5,sockets:[12,2],initial:[1,0],road:[10,11,12,7,2,3,4],robots:[['A',10,1,4]]},
    {id:'D02',size:5,sockets:[22,7,9],initial:[1,0,1],road:[20,21,22,17,12,7,8,9,14,19,24],robots:[['A',20,1,24]]},
    {id:'D03',size:5,sockets:[11,7],initial:[1,2],road:[10,11,12,13,14,2,7,17,22],robots:[['A',10,1,14],['B',2,2,22]],waitCell:11},
    {id:'D04',size:6,sockets:[26,27],initial:[2,1],road:[18,19,20,21,22,23,8,14,26,27,15],robots:[['A',18,1,23],['B',8,2,15]],waitCell:19},
    {id:'D05',size:6,sockets:[15,3],initial:[1,0],road:[12,13,14,15,9,3,4,5,2,8,20,26,32],robots:[['A',12,1,5],['B',2,2,32]],waitCell:13},
  ];
  for(const e of expected){const l=level(e.id);assert.equal(l.version,1);assert.equal(l.answerKey,`${e.id}@1`);assert.equal(l.size,e.size);assert.deepEqual(l.sockets,e.sockets);assert.deepEqual(l.initial,e.initial);assert.equal(l.waitCell,e.waitCell);assert.equal(l.waitCells,undefined);assert.equal(l.fixedArrows,undefined);assert.deepEqual(l.robots.map(r=>[r.id,r.start,r.direction,r.goal]),e.robots);assert.deepEqual(l.walls,Array.from({length:e.size**2},(_,i)=>i).filter(i=>!e.road.includes(i)));}
});

test('D18 independent beat-by-beat positions and both crossing orders for every winning setting',()=>{
  const l=level('D18'),e=answers.find(a=>a.id==='D18')!.solution;
  const expected=[[16,22],[23,22],[30,22],[37,23],[38,24],[39,25],[32,26],[25,27],[18,27]];
  const {frames}=play(l,e);assert.deepEqual(frames.map(r=>r.bots.map(b=>b.p)),expected);
  assert.deepEqual(frames.slice(0,3).map(r=>r.bots[1]!.remaining),[2,1,0]);
  assert.deepEqual(frames.map(r=>r.bots.map(b=>b.delivered)),Array.from({length:9},(_,i)=>[i===8,i>=7]));
  for(const candidate of settings(l)){
    const result=play(l,candidate);if(result.run.status!=='won')continue;
    const first=(bot:number,cell:number)=>result.frames.find(r=>r.bots[bot]!.p===cell)!.tick;
    assert.ok(first(0,23)<first(1,23),'First shared point: A before B');
    assert.ok(first(1,25)<first(0,25),'Second shared point: B before A');
    assert.ok(candidate.waits![0]!>0,'Waiting at the correct location is necessary');
  }
  // A real route choice changes the safe timing, rather than adding an arbitrary delay rule.
  const short={...e,arrows:[2,1,0,1] as Dir[]};assert.equal(play(l,short).run.reason,'collision');
  assert.equal(play(l,{...short,waits:[1,0]}).run.status,'won');
  assert.equal(play(l,{...e,waits:[0,2]}).run.reason,'collision','Waiting on A after the crossing cannot repair the first collision');
});

test('D07 detour, D10 vacated cell, D11 head-on swap, D15 excess wait have independent expectations',()=>{
  let l=level('D07'),e=structuredClone(answers.find(a=>a.id===l.id)!.solution);e.arrows[0]=1;let r=play(l,e).run;assert.equal(r.tick,3);assert.equal(r.reason,'collision');assert.deepEqual(r.failureCells,[15]);
  l=level('D10');r=tickDelivery(l,answers.find(a=>a.id===l.id)!.solution,startDelivery(l));assert.deepEqual(r.bots.map(b=>b.p),[10,17]);assert.equal(r.status,'running');
  l=level('D11');e=structuredClone(answers.find(a=>a.id===l.id)!.solution);e.arrows[0]=1;e.arrows[3]=1;r=play(l,e).run;assert.equal(r.tick,4);assert.equal(r.reason,'swap');assert.deepEqual(r.failureCells,[15,16]);assert.deepEqual(r.bots.map(b=>b.p),[15,16]);
  l=level('D15');e=structuredClone(answers.find(a=>a.id===l.id)!.solution);e.waits=[2,0];r=play(l,e).run;assert.equal(r.tick,5);assert.equal(r.reason,'collision');assert.deepEqual(r.failureCells,[21]);
});

test('two wait points consume exactly 0–3 full stationary beats and rearm only on reentry',()=>{
  const l:DeliveryLevel={...level('D10'),size:5,walls:[],sockets:[],initial:[],fixedArrows:{},robots:[{id:'A',start:10,direction:1,goal:14}],waitCells:[11,13],maxWait:3};
  for(const n of [0,1,2,3]){const e:DeliveryEdit={arrows:[],wait:0,waits:[n,n]};const result=play(l,e);assert.equal(result.run.tick,4+2*n);assert.equal(result.frames.filter(r=>r.bots[0]!.p===11).length,1+n);assert.equal(result.frames.filter(r=>r.bots[0]!.p===13).length,1+n);assert.equal(result.run.status,'won');}
  const run={...startDelivery(l),bots:[{id:'A',p:12,d:3 as Dir,remaining:0,delivered:false}]};assert.equal(tickDelivery(l,{arrows:[],wait:0,waits:[3,0]},run).bots[0]!.remaining,3);
});

test('painted arrows, failure cells and stationary collision retain deterministic priority',()=>{
  const l:DeliveryLevel={...level('D10'),size:5,walls:[],sockets:[],initial:[],waitCells:[],fixedArrows:{10:0},robots:[{id:'A',start:10,direction:1,goal:0}]};
  const e:DeliveryEdit={arrows:[],wait:0,waits:[]};assert.deepEqual(tickDelivery(l,e,startDelivery(l)).bots.map(b=>[b.p,b.d]),[[5,0]]);
  const pair={...l,fixedArrows:{},robots:[{id:'A',start:10,direction:1 as Dir,goal:4},{id:'B',start:11,direction:2 as Dir,goal:24}]};const r=startDelivery(pair);r.bots[1]!.remaining=1;
  const failed=tickDelivery(pair,e,r);assert.equal(failed.reason,'collision');assert.deepEqual(failed.failureCells,[11]);assert.deepEqual(failed.bots,r.bots);
  const backwards={...pair,robots:[...pair.robots].reverse()},rr=startDelivery(backwards);rr.bots[0]!.remaining=1;assert.deepEqual(tickDelivery(backwards,e,rr).failureCells,[11]);
});

test('fixed-arrow circuits, safety cap, terminal runs and input edits remain deterministic',()=>{
  const l:DeliveryLevel={...level('D10'),size:5,walls:[],sockets:[],initial:[],waitCells:[7,11],fixedArrows:{6:1,7:2,12:3,11:0},robots:[{id:'A',start:6,direction:1,goal:0}]};
  const e:DeliveryEdit={arrows:[],wait:0,waits:[1,2]},copy=structuredClone(e),result=play(l,e);
  assert.equal(result.run.reason,'loop');assert.equal(result.run.status,'failed');assert.ok(result.run.tick<100);assert.deepEqual(e,copy);
  assert.equal(tickDelivery(l,e,result.run),result.run,'A terminal run cannot advance');
  const capped=tickDelivery(l,e,{...startDelivery(l),tick:99});assert.equal(capped.reason,'limit');assert.equal(capped.status,'failed');
  const reversed={...level('D18'),robots:[...level('D18').robots].reverse()},answer=answers.find(a=>a.id==='D18')!.solution;
  const normal=play(level('D18'),answer),reverse=play(reversed,answer);assert.deepEqual(reverse.frames.map(r=>[...r.bots].reverse()),normal.frames.map(r=>r.bots));
});
