import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {homeLevels,lightLevels} from '../../src/prototypes/levels';
import {homePrimers,homeLearningOrder} from '../../src/prototypes/home-levels-learning';
import {homeLevelsR2} from '../../src/prototypes/home-levels-r2';
import {moveHome,homeWon,turnMirror,traceLight,type HomeLevel,type LightState} from '../../src/prototypes/rules';
import {lightCause,lightCauseTiming as timing} from '../../src/prototypes/light-cause';
import {createPrototypeSave,emptyProgress,validProgress,type Progress} from '../../src/prototypes/state';
const witnesses=JSON.parse(readFileSync('src/prototypes/home-answers-learning.json','utf8'));
const old=JSON.parse(readFileSync('src/prototypes/home-answers-r2.json','utf8'));
// Independent row/column oracle; does not call moveHome or neighbor.
function step(l:HomeLevel,p:number[],d:number){return p.map((cell,i)=>{let x=cell%l.size,y=Math.floor(cell/l.size);if(d===0)y--;if(d===1)x++;if(d===2)y++;if(d===3)x--;const n=y*l.size+x;return x<0||y<0||x>=l.size||y>=l.size||(i?l.otherWalls:l.walls).includes(n)?cell:n;});}
function search(l:HomeLevel,noAdjust=false,noDeparture=false){
 const queue=[{p:[...l.starts],depth:0}],seen=new Set([l.starts.join(',')]);
 for(const {p,depth} of queue){if(p.every((v,i)=>v===l.homes[i]))return depth;for(let d=0;d<4;d++){const next=step(l,p,d),stops=next.map((v,i)=>v===p[i]);if(noAdjust&&stops[0]!==stops[1]||noDeparture&&p.some((v,i)=>v===l.homes[i]&&next[i]!==v))continue;const key=next.join(',');if(!seen.has(key)){seen.add(key);queue.push({p:next,depth:depth+1});}}assert.ok(seen.size<=l.size**4);}
 return null;
}
for(const l of homePrimers)test(`${l.id}: authored witness, independent shortest/branch/adjustment/arrival checks`,()=>{
 const a=witnesses.find((a:{id:string})=>a.id===l.id);assert.equal(a.key,l.answerKey);assert.equal(a.version,l.version);let p=[...l.starts],state={positions:l.starts};
 for(const [i,d]of a.solution.entries()){p=step(l,p,d);const r=moveHome(l,state,d);assert.deepEqual(r.state.positions,p);assert.deepEqual({after:i+1,state:r.state,blocked:r.blocked,won:r.won},a.intermediate[i]);state=r.state;}
 assert.ok(homeWon(l,state));assert.equal(search(l),a.solution.length);assert.equal(search(l,false,true),a.solution.length,'No required departure from an early home');
 assert.equal(search(l,true),l.id==='T19'?1:null,'Wall primers genuinely require a one-sided stop');
 const choices=[0,1,2,3].filter(d=>step(l,l.starts,d).some((p,i)=>p!==l.starts[i]));assert.equal(choices.length,1,'A single effective first direction; not a multi-wall guessing task');
 for(const t of [l.title,l.lesson,...l.hints!])assert.ok(t.ja&&t.en);
});
test('Learning order isolates initial shared input, practice, wall, transfer before compound legacy content',()=>{
 assert.deepEqual(homeLevels.slice(0,5).map(l=>l.id),['T19','T01','T20','T21','T02']);assert.equal(homeLevels.length,new Set(homeLearningOrder).size);
 for(const l of homeLevelsR2)assert.deepEqual(homeLevels.find(n=>n.id===l.id),l,'No old content version or geometry changed');
 for(const id of ['T03','T04','T05'])assert.ok(homeLevels.findIndex(l=>l.id===id)>=9);
 assert.equal(emptyProgress('two-ways-home').levelId,'T19');
});
test('Every old home witness resumes by stable ID without rewriting or clearing the old completion record',()=>{
 for(const l of homeLevelsR2)for(const witness of old.find((a:{id:string})=>a.id===l.id).intermediate){
  const data:Progress={levelId:l.id,levelVersion:l.version,board:witness.state,cleared:homeLevelsR2.map(l=>l.id),settings:{reducedMotion:false}};
  const raw=JSON.stringify({schema:1,gameId:'two-ways-home',version:'0.1.0',data}),key='wgs:save:two-ways-home',stored=new Map([[key,raw]]);
  const save=createPrototypeSave('two-ways-home',()=>({getItem:k=>stored.get(k)??null,setItem:(k,v)=>{stored.set(k,v);},removeItem:k=>{stored.delete(k);}}));
  const loaded=save.load();assert.equal(loaded.status,'ok');assert.deepEqual(loaded.data,data);assert.equal(stored.get(key),raw);assert.equal(save.write(loaded.data),true);assert.equal(JSON.parse(stored.get(key)!).data.cleared.length,18);
  assert.equal(validProgress('two-ways-home',{...data,levelVersion:2}),false,'A future content version must never silently reuse this board');
 }
});
test('Light explanation reconstructs actual switch-before-gate phases without mutating either saved state',()=>{
 const l=lightLevels.find(l=>l.id==='L05')!,before:LightState={mirrors:[...l.initial],gate:false};const after=turnMirror(l,before,0).state,copy=structuredClone({before,after});
 const p=lightCause(l,before,after);assert.deepEqual(p.phases.map(p=>p.opened),[[0],[]]);assert.equal(traceLight(l,{...after,gate:false}).switched,true);assert.deepEqual({before,after},copy);
 const off=turnMirror(l,after,0).state,retained=lightCause(l,after,off);assert.deepEqual(retained.retained,[0]);assert.equal(off.gate,true);assert.equal(retained.phases.length,1);
});
test('All light answers have bounded causal phases ending in the engine trace, including both splitter exits',()=>{
 const answers=JSON.parse(readFileSync('src/prototypes/light-answers-r2.json','utf8'));
 for(const l of lightLevels){let state:LightState={mirrors:[...l.initial],gate:false,...(l.gates?{gates:l.gates.map(()=>false)}:{})};for(const m of answers.find((a:{id:string})=>a.id===l.id).solution){const result=turnMirror(l,state,m);const p=lightCause(l,state,result.state);assert.deepEqual(p.phases.at(-1)!.paths,result.paths);assert.ok(p.phases.length<=(l.gates?.length??(l.gate===undefined?0:1))+1);state=result.state;}}
 const l=lightLevels.find(l=>l.id==='L09')!,a=answers.find((a:{id:string})=>a.id==='L09');let state:LightState={mirrors:[...l.initial],gate:false};for(const m of a.solution)state=turnMirror(l,state,m).state;assert.ok(traceLight(l,state).paths.length>=3);
});

test('Causal schedule: inlet finishes before branches; switches before gate; gate before next phase',()=>{assert.ok(timing.branchDelay>=timing.ray);assert.ok(timing.switchArrival>=timing.branchDelay+timing.ray);assert.ok(timing.gate>timing.switchArrival);assert.ok(timing.phase>=timing.gate+timing.gateDuration);});
