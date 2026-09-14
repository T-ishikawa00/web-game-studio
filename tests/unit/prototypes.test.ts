import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { gameIds, levelsByGame, lightLevels, homeLevels, deliveryLevels, type GameId } from '../../src/prototypes/levels';
import { reflect, settleLight, traceLight, turnMirror, homeWon, moveHome, startDelivery, tickDelivery, directions, type Dir, type LightLevel, type DeliveryLevel, type DeliveryEdit, type DeliveryRun } from '../../src/prototypes/rules';
import { initialBoard, validProgress, emptyProgress, createPrototypeSave } from '../../src/prototypes/state';
import { PROTOCOL, trustedEnvelope, validGameMessage } from '../../src/prototypes/protocol';
const solutions=JSON.parse(readFileSync('docs/qa/prototype-batch-01/solutions.json','utf8')) as {id:string;solution:number[]|DeliveryEdit}[];
const answers=JSON.parse(readFileSync('src/prototypes/level-answers.json','utf8')) as {key:string;id:string;version:number;solution:number[]|DeliveryEdit;intermediate:Record<string,unknown>[]}[];
function simulate(l:DeliveryLevel,edit:DeliveryEdit){let r=startDelivery(l);while(r.status==='running')r=tickDelivery(l,edit,r);return r;}
// Retained R1 witnesses verify the original five per title unchanged. Full R2
// witnesses and independent oracles live in light/home/delivery-r2.test.ts.
for(const id of gameIds)for(const l of levelsByGame[id].slice(0,5))test(`${l.id}: valid level, initial unsolved, authored answer clears actual rules`,()=>{
  assert.equal(l.version,1);assert.ok(l.title.ja&&l.title.en&&l.lesson.ja&&l.lesson.en);
  assert.ok(validProgress(id,{...emptyProgress(id),levelId:l.id,board:initialBoard(l)}));
  const points=l.kind==='light'?[l.source,...l.mirrors,...l.flowers,...(l.gate===undefined?[]:[l.gate,l.switch!])]:l.kind==='home'?[]:[...l.sockets,...l.robots.flatMap(r=>[r.start,r.goal]),...(l.waitCell===undefined?[]:[l.waitCell])];
  for(const p of [...l.walls,...points])assert.ok(Number.isInteger(p)&&p>=0&&p<l.size**2,`${l.id} coordinate ${p}`);
  points.forEach(p=>assert.ok(!l.walls.includes(p),`${l.id} occupied wall ${p}`));
  assert.equal(new Set(l.walls).size,l.walls.length);
  if(l.kind==='light')assert.equal(new Set(points).size,points.length,'Light components must occupy distinct cells');
  if(l.kind==='home')for(const [i,p]of l.homes.entries()){assert.ok(Number.isInteger(p)&&p>=0&&p<l.size**2);assert.ok(!(i===0?l.walls:l.otherWalls).includes(p));}
  if(l.kind==='delivery'){assert.equal(new Set(l.sockets).size,l.sockets.length);assert.equal(new Set(l.robots.map(r=>r.id)).size,l.robots.length);}
  const answer=solutions.find(s=>s.id===l.id)!.solution;assert.ok(answer);
  const authored=answers.find(a=>a.key===l.answerKey)!;assert.ok(authored);assert.equal(authored.version,l.version);assert.deepEqual(authored.solution,answer);
  if(l.kind==='light'){
    let s={mirrors:l.initial,gate:false};assert.equal(settleLight(l,s).won,false);
    for(const [index,i] of (answer as number[]).entries()){const r=turnMirror(l,s,i);s=r.state;assert.deepEqual({after:index+1,state:s,lit:r.lit,won:r.won},authored.intermediate[index]);}
    assert.equal(settleLight(l,s).won,true);
  }else if(l.kind==='home'){
    let s={positions:l.starts};assert.equal(homeWon(l,s),false);
    let adjusts=0;for(const [index,d] of (answer as Dir[]).entries()){const r=moveHome(l,s,d);if(r.blocked[0]!==r.blocked[1])adjusts++;s=r.state;assert.deepEqual({after:index+1,state:s,blocked:r.blocked,won:r.won},authored.intermediate[index]);}
    assert.equal(homeWon(l,s),true);if(l.id!=='T01')assert.ok(adjusts>0);
    // Independent bounded BFS over all position pairs.
    const queue=[{positions:l.starts}],seen=new Set<string>();let found=false;
    for(let i=0;i<queue.length&&i<4096;i++){const s=queue[i]!,key=JSON.stringify(s);if(seen.has(key))continue;seen.add(key);if(homeWon(l,s)){found=true;break;}for(const d of directions)queue.push(moveHome(l,s,d).state);}
    assert.ok(found);assert.ok(seen.size<=l.size**4);
  }else{
    assert.notEqual(simulate(l,{arrows:l.initial,wait:0}).status,'won');
    assert.equal(simulate(l,answer as DeliveryEdit).status,'won');
    let run=startDelivery(l);for(const expected of authored.intermediate){run=tickDelivery(l,answer as DeliveryEdit,run);assert.deepEqual({after:run.tick,bots:run.bots,status:run.status},expected);}
    if(l.waitCell!==undefined)assert.notEqual(simulate(l,{...(answer as DeliveryEdit),wait:0}).status,'won');
  }
});
test('light: all eight reflections, pass-through sensors, wall and border stops',()=>{
  assert.deepEqual(directions.map(d=>reflect(d,true)),[1,0,3,2]);assert.deepEqual(directions.map(d=>reflect(d,false)),[3,2,1,0]);
  const l:LightLevel={...lightLevels[0]!,source:10,mirrors:[],initial:[],flowers:[11,13],walls:[]};
  const s={mirrors:[],gate:false};assert.deepEqual(traceLight(l,s).lit,[11,13]);assert.deepEqual(traceLight(l,s).path,[10,11,12,13,14]);
  assert.equal(traceLight({...l,walls:[12]},s).won,false);assert.deepEqual(traceLight({...l,walls:[12]},s).lit,[11]);
});
test('light: loop terminates by position + direction',()=>{
  const l:LightLevel={...lightLevels[0]!,source:6,direction:1,mirrors:[8,18,16,6],initial:[false,true,false,true],flowers:[0],walls:[]};
  const r=traceLight(l,{mirrors:l.initial,gate:false});assert.equal(r.loop,true);assert.ok(r.path.length<101);assert.equal(r.won,false);
});
test('L04/L05: stable gate reopening, temporal solution, undo snapshot and retry',()=>{
  const l4=lightLevels[3]!,l5=lightLevels[4]!;
  const before={mirrors:[...l5.initial],gate:false};assert.equal(settleLight(l5,before).won,false);
  const opened=turnMirror(l5,before,0);assert.equal(opened.state.gate,true);assert.equal(opened.won,false);assert.deepEqual(opened.lit,[]);
  const final=turnMirror(l5,opened.state,0);assert.deepEqual(final.state.mirrors,before.mirrors);assert.equal(final.state.gate,true);assert.equal(final.won,true);
  assert.equal(settleLight(l5,before).state.gate,false);assert.equal(settleLight(l5,initialBoard(l5) as typeof before).won,false);
  assert.equal(turnMirror(l4,{mirrors:l4.initial,gate:false},0).won,true);
});
test('home: both move, one stops, both stop, no-op and simultaneous goal only',()=>{
  const l=homeLevels[0]!;assert.deepEqual(moveHome(l,{positions:[12,12]},1).state.positions,[13,13]);
  assert.deepEqual(moveHome(l,{positions:[12,13]},3).state.positions,[12,12]);
  const noOp=moveHome(l,{positions:[12,12]},2);assert.equal(noOp.changed,false);assert.deepEqual(noOp.blocked,[true,true]);
  assert.equal(homeWon(l,{positions:[14,13]}),false);assert.equal(homeWon(l,{positions:[14,14]}),true);
  assert.deepEqual(moveHome(l,{positions:[14,14]},3).state.positions,[13,13]);
});
test('T04: forced first step reaches one home, then leaves it before joint completion',()=>{
  const l=homeLevels[3]!,s={positions:l.starts};for(const d of [0,2,3] as Dir[])assert.equal(moveHome(l,s,d).changed,false);
  const one=moveHome(l,s,1);assert.deepEqual(one.state.positions,[13,15]);assert.equal(one.won,false);
  const leave=moveHome(l,one.state,0);assert.deepEqual(leave.state.positions,[9,11]);assert.equal(leave.won,false);
});
const testTown=(robots:DeliveryLevel['robots']):DeliveryLevel=>({...deliveryLevels[0]!,walls:[],sockets:[],initial:[],robots});
const edit:DeliveryEdit={arrows:[],wait:0};
test('delivery: collisions include same cell, stationary occupant, head-on swaps; follow allowed',()=>{
  let l=testTown([{id:'A',start:10,direction:1,goal:4},{id:'B',start:12,direction:3,goal:24}]);
  assert.equal(tickDelivery(l,edit,startDelivery(l)).reason,'collision');
  l=testTown([{id:'A',start:10,direction:1,goal:4},{id:'B',start:11,direction:3,goal:24}]);
  assert.equal(tickDelivery(l,edit,startDelivery(l)).reason,'swap');
  const r=startDelivery(l);r.bots[1]!.remaining=1;assert.equal(tickDelivery(l,edit,r).reason,'collision');
  l=testTown([{id:'A',start:11,direction:1,goal:4},{id:'B',start:10,direction:1,goal:24}]);
  const follow=tickDelivery(l,edit,startDelivery(l));assert.equal(follow.status,'running');assert.deepEqual(follow.bots.map(b=>b.p),[12,11]);
});
test('delivery: collision before removal; own/wrong depot; board and wall failures',()=>{
  const l=testTown([{id:'A',start:10,direction:1,goal:11},{id:'B',start:12,direction:3,goal:24}]);
  const r=tickDelivery(l,edit,startDelivery(l));assert.equal(r.status,'failed');assert.equal(r.bots[0]!.delivered,false);
  const solo=testTown([{id:'A',start:10,direction:1,goal:11}]);assert.equal(tickDelivery(solo,edit,startDelivery(solo)).status,'won');
  assert.equal(r.reason,'wrong-goal');assert.equal(tickDelivery({...solo,walls:[11]},edit,startDelivery(solo)).reason,'wall');
  const out=testTown([{id:'A',start:10,direction:3,goal:11}]);assert.equal(tickDelivery(out,edit,startDelivery(out)).reason,'boundary');
});
test('delivery: wait 0/1/2 arrival timing, reentry, loop and cap never succeed',()=>{
  const l={...testTown([{id:'A',start:10,direction:1,goal:14}]),waitCell:11};
  for(const wait of [0,1,2] as const){const e={...edit,wait};let r=tickDelivery(l,e,startDelivery(l));assert.equal(r.bots[0]!.p,11);assert.equal(r.bots[0]!.remaining,wait);for(let i=0;i<wait;i++){r=tickDelivery(l,e,r);assert.equal(r.bots[0]!.p,11);}r=tickDelivery(l,e,r);assert.equal(r.bots[0]!.p,12);assert.equal(r.bots[0]!.remaining,0);}
  const reentry:DeliveryRun={...startDelivery(l),bots:[{id:'A',p:12,d:3,remaining:0,delivered:false}]};
  const r=tickDelivery(l,{...edit,wait:2},reentry);assert.equal(r.bots[0]!.remaining,2);
  const loop:DeliveryLevel={...l,waitCell:undefined,sockets:[11,12,17,16],initial:[1,2,3,0],robots:[{id:'A',start:11,direction:1,goal:0}]};
  const result=simulate(loop,{arrows:loop.initial,wait:0});assert.equal(result.reason,'loop');assert.equal(result.status,'failed');
  const cap=tickDelivery(l,edit,{...startDelivery(l),tick:99});assert.equal(cap.reason,'limit');
});
test('D03 independent intermediate ticks and deterministic reversed robot order',()=>{
  const l=deliveryLevels[2]!,e={arrows:l.initial,wait:1} as const;
  let r=startDelivery(l);const expected=[[11,7],[11,12],[12,17],[13,22],[14,22]];
  for(const positions of expected){r=tickDelivery(l,e,r);assert.deepEqual(r.bots.map(b=>b.p),positions);}
  assert.equal(r.status,'won');
  const reversed={...l,robots:[...l.robots].reverse()};assert.deepEqual(simulate(reversed,e).bots.reverse(),r.bots);
});
test('D04: waiting zero or two fails; one succeeds after second crossing',()=>{
  const l=deliveryLevels[3]!,arrows=[1,0] as Dir[];
  assert.equal(simulate(l,{arrows,wait:0}).reason,'collision');assert.equal(simulate(l,{arrows,wait:2}).reason,'collision');assert.equal(simulate(l,{arrows,wait:1}).status,'won');
});
function memory(){const map=new Map<string,string>();return {map,getItem:(k:string)=>map.get(k)??null,setItem:(k:string,v:string)=>{map.set(k,v);},removeItem:(k:string)=>{map.delete(k);}};}
test('prototype saves: namespaces, roundtrip, malformed/future data preserved until explicit reset',()=>{
  const storage=memory();storage.setItem('wgs:save:internal-connection-lab','fixture sentinel');
  for(const id of gameIds){const save=createPrototypeSave(id,()=>storage);assert.equal(save.load().status,'empty');assert.equal(save.write(emptyProgress(id)),true);assert.equal(save.load().status,'ok');}
  assert.equal(storage.map.size,4);
  for(const raw of ['{broken',JSON.stringify({schema:99}),JSON.stringify({schema:1,gameId:'light-garden',version:'0.1.0',data:{...emptyProgress('light-garden'),levelId:'L99'}})]){
    const key='wgs:save:light-garden';storage.setItem(key,raw);const save=createPrototypeSave('light-garden',()=>storage);assert.equal(save.load().status,'invalid');assert.equal(save.write(emptyProgress('light-garden')),false);assert.equal(storage.getItem(key),raw);assert.equal(save.reset(),true);assert.equal(save.write(emptyProgress('light-garden')),true);
  }
  assert.equal(storage.getItem('wgs:save:internal-connection-lab'),'fixture sentinel');
});
test('prototype state validators reject wrong game board, invalid level version/range/settings',()=>{
  for(const id of gameIds){const p=emptyProgress(id);assert.equal(validProgress(id,{...p,levelVersion:2}),false);assert.equal(validProgress(id,{...p,cleared:['bogus']}),false);assert.equal(validProgress(id,{...p,settings:{reducedMotion:'false'}}),false);}
  assert.equal(validProgress('light-garden',{...emptyProgress('light-garden'),board:{mirrors:[true,true],gate:false}}),false);
  assert.equal(validProgress('two-ways-home',{...emptyProgress('two-ways-home'),board:{positions:[-1,12]}}),false);
  assert.equal(validProgress('tiny-delivery',{...emptyProgress('tiny-delivery'),board:{arrows:[4,1],wait:0}}),false);
});
test('save denied, silent write loss and reset failure never claim success',()=>{
  const denied=()=>{throw new Error('denied');};const save=createPrototypeSave('light-garden',denied);assert.equal(save.load().status,'unavailable');assert.equal(save.write(emptyProgress('light-garden')),false);assert.equal(save.reset(),false);
  const silent={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};assert.equal(createPrototypeSave('tiny-delivery',()=>silent).write(emptyProgress('tiny-delivery')),false);
});
test('bridge requires source, origin, protocol, game, generation and strict checkpoint schema',()=>{
  const source={} as Window,other={} as Window,id:GameId='light-garden',origin='http://127.0.0.1:4324',generation='fresh';
  const data={protocol:PROTOCOL,gameId:id,generation,type:'checkpoint',data:emptyProgress(id)};
  const e={source,origin,data};assert.equal(trustedEnvelope(e,source,origin,id,generation),true);assert.equal(validGameMessage(id,data),true);
  for(const bad of [{...e,source:other},{...e,origin:'https://example.invalid'},{...e,data:{...data,protocol:'wgs-fixture-v1'}},{...e,data:{...data,gameId:'tiny-delivery'}},{...e,data:{...data,generation:'stale'}}])assert.equal(trustedEnvelope(bad,source,origin,id,generation),false);
  assert.equal(validGameMessage(id,{...data,data:{active:[1]}}),false);assert.equal(validGameMessage(id,{type:'checkpoint',data:{...data.data,levelVersion:9}}),false);
  assert.equal(validGameMessage(id,{...data,type:'ready',command:'reset'}),false);
  const resize={protocol:PROTOCOL,gameId:id,generation,type:'resize',height:800};assert.equal(validGameMessage(id,resize),true);
  for(const height of [0,1601,NaN,'800',800.5])assert.equal(validGameMessage(id,{...resize,height}),false);
});
