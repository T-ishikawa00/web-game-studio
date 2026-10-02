import assert from 'node:assert/strict';
import test from 'node:test';
import { gameIds, levelsByGame, type GameId } from '../../src/prototypes/levels';
import { initialBoard, validBoard, validProgress, createPrototypeSave, type Board, type Progress } from '../../src/prototypes/state';
import { PROTOCOL, trustedEnvelope, validGameMessage } from '../../src/prototypes/protocol';
import type { Level } from '../../src/prototypes/rules';

function memory() {
  const values = new Map<string,string>();
  return {values,getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>{values.set(key,value);},removeItem:(key:string)=>{values.delete(key);}};
}
function progress(id:GameId,level:Level):Progress {
  return {levelId:level.id,levelVersion:level.version,cleared:levelsByGame[id].filter(l=>Number(l.id.slice(1))<=5).map(l=>l.id),settings:{reducedMotion:true},board:initialBoard(level)};
}
function message(id:GameId,data:unknown) {
  return structuredClone({protocol:PROTOCOL,gameId:id,generation:'current-r2-frame',type:'checkpoint',data});
}
const source={} as Window;
function accepts(id:GameId,data:unknown) {
  const checkpoint=message(id,data),origin='http://127.0.0.1:4324';
  assert.equal(trustedEnvelope({source,origin,data:checkpoint},source,origin,id,'current-r2-frame'),true);
  return validGameMessage(id,checkpoint);
}

const sparseCases: {id:GameId;levelId:string;field:string}[] = [
  {id:'light-garden',levelId:'L18',field:'mirrors'},
  {id:'light-garden',levelId:'L18',field:'gates'},
  {id:'two-ways-home',levelId:'T18',field:'positions'},
  {id:'tiny-delivery',levelId:'D18',field:'arrows'},
  {id:'tiny-delivery',levelId:'D18',field:'waits'},
];
for(const {id,levelId,field} of sparseCases) test(`R2 checkpoint rejects structured-clone sparse ${levelId}.${field}`,()=>{
  const l=levelsByGame[id].find(l=>l.id===levelId)!,p=progress(id,l),board=p.board as unknown as Record<string,unknown[]>;
  assert.ok(board[field]!.length>0);assert.equal(accepts(id,p),true);
  const oneHole=[...board[field]!];delete oneHole[0];
  for(const invalid of [new Array(board[field]!.length),oneHole]) {
    const candidate={...p,board:{...board,[field]:invalid}},cloned=message(id,candidate).data as typeof candidate;
    assert.equal(Object.hasOwn((cloned.board as Record<string,unknown[]>)[field]!,0),false,'structuredClone must preserve the actual hole');
    assert.equal(validBoard(l,cloned.board),false);
    assert.equal(validProgress(id,cloned),false);
    assert.equal(accepts(id,candidate),false);
    const storage=memory(),save=createPrototypeSave(id,()=>storage);
    assert.equal(save.write(candidate as unknown as Progress),false);
    assert.equal(storage.values.size,0,'Rejected checkpoint must not become JSON nulls in a save');
  }
});
for(const id of gameIds) test(`R2 checkpoint rejects sparse and invalid ${id} completion IDs`,()=>{
  const p=progress(id,levelsByGame[id].at(-1)!);
  const hole=[p.cleared[0]!];delete hole[0];
  for(const cleared of [new Array(1),hole,[undefined],[null],['unknown-level'],[p.cleared[0],p.cleared[0]]]) {
    assert.equal(accepts(id,{...p,cleared}),false);
  }
  assert.equal(accepts(id,p),true);
});

test('R2 light extended gates require exact dense booleans; legacy gate fields cannot grant new gates',()=>{
  const id='light-garden',l=levelsByGame[id].find(l=>l.id==='L18')!,p=progress(id,l),b=p.board as unknown as Record<string,unknown>;
  assert.ok('gates' in b);
  for(const gates of [[],[true],['true',false],[1,false],[null,false],[undefined,false],{},null]) assert.equal(accepts(id,{...p,board:{...b,gates}}),false);
  const {gates:omitted,...legacyShape}=b;
  assert.equal(accepts(id,{...p,board:legacyShape}),false);
  assert.equal(accepts(id,{...p,board:{...b,gate:true}}),false,'Legacy scalar cannot open extended gates');
  assert.equal(accepts(id,{...p,board:{...b,extra:1}}),false);
  assert.equal(accepts(id,{...p,board:{...b,gates:[true,false]}}),true);
});
test('R2 delivery checkpoint enforces allowed directions and wait range, shape and numeric type',()=>{
  const id='tiny-delivery',l=levelsByGame[id].find(l=>l.id==='D18')!,p=progress(id,l);
  assert.equal(l.kind,'delivery');
  if(l.kind!=='delivery')throw Error('Expected delivery fixture');
  const b=p.board as unknown as {arrows:number[];wait:number;waits:number[]};
  for(const [index,allowed] of l.allowedDirections!.entries()) {
    const forbidden=[0,1,2,3].find(d=>!allowed.includes(d as 0|1|2|3))!;
    const arrows=[...b.arrows];arrows[index]=forbidden;
    assert.equal(accepts(id,{...p,board:{...b,arrows}}),false,`Socket ${index} must reject a valid direction outside its allowed set`);
  }
  for(const value of [-1,0.5,NaN,Infinity,(l.maxWait??2)+1,'1',true,null,undefined]) {
    const waits:unknown[]=[...b.waits];waits[0]=value;
    assert.equal(accepts(id,{...p,board:{...b,waits}}),false);
  }
  for(const waits of [[],[0],[0,0,0],null,{}]) assert.equal(accepts(id,{...p,board:{...b,waits}}),false);
  const {waits:omitted,...legacyShape}=b;
  assert.equal(accepts(id,{...p,board:legacyShape}),false);
  assert.equal(accepts(id,{...p,board:{...b,wait:1}}),false,'Unused legacy wait must remain zero');
  assert.equal(accepts(id,{...p,board:{...b,waits:[2,1]}}),true);
});

// Exact initial board literals read from the preserved pre-R2 MVP during review.
// They are deliberately inline: this test does not depend on ignored backup files.
const legacyBoards:Record<GameId,{levelId:string;board:Board}[]>={
  'light-garden':[
    {levelId:'L01',board:{mirrors:[false],gate:false}},
    {levelId:'L02',board:{mirrors:[false,false],gate:false}},
    {levelId:'L03',board:{mirrors:[false,false,true,false],gate:false}},
    {levelId:'L04',board:{mirrors:[false],gate:false}},
    {levelId:'L05',board:{mirrors:[true],gate:false}},
  ],
  'two-ways-home':[
    {levelId:'T01',board:{positions:[12,12]}},
    {levelId:'T02',board:{positions:[12,13]}},
    {levelId:'T03',board:{positions:[12,15]}},
    {levelId:'T04',board:{positions:[12,14]}},
    {levelId:'T05',board:{positions:[12,3]}},
  ],
  'tiny-delivery':[
    {levelId:'D01',board:{arrows:[1,0],wait:0}},
    {levelId:'D02',board:{arrows:[1,0,1],wait:0}},
    {levelId:'D03',board:{arrows:[1,2],wait:0}},
    {levelId:'D04',board:{arrows:[2,1],wait:0}},
    {levelId:'D05',board:{arrows:[1,0],wait:0}},
  ],
};
for(const id of gameIds) test(`R2 loads all five original ${id} save envelopes without changing board or completion IDs`,()=>{
  for(const {levelId,board} of legacyBoards[id]) {
    const storage=memory(),key=`wgs:save:${id}`;
    const data={levelId,levelVersion:1,cleared:legacyBoards[id].map(x=>x.levelId),settings:{reducedMotion:false},board};
    const raw=JSON.stringify({schema:1,gameId:id,version:'0.1.0',data});storage.setItem(key,raw);
    const save=createPrototypeSave(id,()=>storage),loaded=save.load();
    assert.equal(loaded.status,'ok');assert.deepEqual(loaded.data,data);
    assert.equal(storage.getItem(key),raw,'Loading must not silently rewrite a legacy save');
    assert.equal(save.write(loaded.data),true);
    assert.deepEqual(JSON.parse(storage.getItem(key)!).data,data);
    assert.equal(accepts(id,loaded.data),true);
  }
});

for(const id of gameIds) test(`R2 ${id} extended save and locale-independent reload roundtrip`,()=>{
  const storage=memory(),level=levelsByGame[id].at(-1)!,data=progress(id,level);
  if(level.kind==='light')data.board={mirrors:level.initial.map(v=>!v),gate:false,gates:[true,false]};
  if(level.kind==='home')data.board={positions:[...level.homes]};
  if(level.kind==='delivery')data.board={arrows:level.allowedDirections!.map(ds=>ds.at(-1)!),wait:0,waits:[2,1]};
  // /ja and /en adapters share one same-origin StoragePort. No browser or locale
  // navigation is simulated here; this verifies the locale-free storage contract.
  const jaAdapter=createPrototypeSave(id,()=>storage);
  assert.equal(jaAdapter.load().status,'empty');assert.equal(jaAdapter.write(data),true);
  const enAdapter=createPrototypeSave(id,()=>storage),englishReload=enAdapter.load();
  assert.equal(englishReload.status,'ok');assert.deepEqual(englishReload.data,data);
  const updated={...englishReload.data,settings:{reducedMotion:false}};
  assert.equal(enAdapter.write(updated),true);
  assert.deepEqual(createPrototypeSave(id,()=>storage).load().data,updated);
  assert.deepEqual(new Set(storage.values.keys()),new Set([`wgs:save:${id}`,...updated.cleared.map(l=>`wgs:save:${id}:completed:legacy:${l}`)]));
  assert.equal(accepts(id,updated),true);
  assert.deepEqual(updated.cleared,legacyBoards[id].map(l=>l.levelId),'New board, hints and locale do not invent completed levels');
});

for(const id of gameIds) test(`R2 invalid ${id} saves preserve raw data and reject writes until explicit reset`,()=>{
  const p=progress(id,levelsByGame[id].at(-1)!),valid={schema:1,gameId:id,version:'0.1.0',data:p};
  const malformed=[
    '{broken-json',
    JSON.stringify({...valid,schema:99}),
    JSON.stringify({...valid,version:'9.0.0'}),
    JSON.stringify({...valid,gameId:'wrong-game'}),
    JSON.stringify({...valid,data:{...p,levelId:'unknown-level'}}),
    JSON.stringify({...valid,data:{...p,levelVersion:p.levelVersion+1}}),
    JSON.stringify({...valid,data:{...p,board:{not:'a-board'}}}),
  ];
  for(const raw of malformed) {
    const storage=memory(),key=`wgs:save:${id}`;storage.setItem(key,raw);
    const save=createPrototypeSave(id,()=>storage);
    assert.equal(save.load().status,'invalid');
    assert.equal(save.write(p),false);assert.equal(storage.getItem(key),raw);
    const reload=createPrototypeSave(id,()=>storage);
    assert.equal(reload.load().status,'invalid');assert.equal(reload.write(p),false);
    assert.equal(storage.getItem(key),raw,'A fresh adapter cannot overwrite rejected source after loading it');
  }
});
test('R2 saves and reset are isolated across all three games and the internal fixture',()=>{
  const storage=memory(),fixtureKey='wgs:save:internal-connection-lab';storage.setItem(fixtureKey,'fixture-save-sentinel');
  for(const id of gameIds)assert.equal(createPrototypeSave(id,()=>storage).write(progress(id,levelsByGame[id].at(-1)!)),true);
  for(const id of gameIds) {
    const previous=new Map(storage.values),save=createPrototypeSave(id,()=>storage),data=save.load().data;
    assert.equal(save.write({...data,settings:{reducedMotion:!data.settings.reducedMotion}}),true);
    for(const [key,value] of previous)if(key!==`wgs:save:${id}`)assert.equal(storage.getItem(key),value);
    assert.equal(save.reset(),true);assert.equal(storage.getItem(`wgs:save:${id}`),null);
    for(const [key,value] of previous)if(!key.startsWith(`wgs:save:${id}`))assert.equal(storage.getItem(key),value);
    assert.equal(save.write(data),false,'A snapshot read before reset cannot resurrect its clears');
    const fresh=createPrototypeSave(id,()=>storage);assert.equal(fresh.write(fresh.load().data),true);
  }
  assert.equal(storage.getItem(fixtureKey),'fixture-save-sentinel');
  for(const id of gameIds)assert.deepEqual(createPrototypeSave(id,()=>storage).load().data.cleared,[]);
});
