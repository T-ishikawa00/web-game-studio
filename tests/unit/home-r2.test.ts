import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { homeLevelsR2 } from '../../src/prototypes/home-levels-r2';
import { homeWon, moveHome, directions, type HomeLevel, type HomeState, type Dir } from '../../src/prototypes/rules';

type Witness = { key: string; id: string; version: number; chapter: number; solution: Dir[];
  intermediate: {after: number; state: HomeState; blocked: boolean[]; won: boolean}[];
  proof: {shortest: number; minimumUnilateralAdjustments: number; pairStateBound: number; requiresDeparture: boolean; requiresHorizontalAdjustment: boolean; requiresVerticalAdjustment: boolean; finalBothMove: boolean};
  counterexamples: {kind: string; solution: Dir[]; positions: number[]; won: boolean}[] };
// The frozen position witnesses were calculated with a separate row/column oracle,
// without importing moveHome/neighbor. These tests replay them in the actual rules.
const answers = JSON.parse(readFileSync('src/prototypes/home-answers-r2.json', 'utf8')) as Witness[];
type Constraint = 'none' | 'stay-home' | 'no-horizontal-adjustment' | 'no-vertical-adjustment';
function search(level: HomeLevel, constraint: Constraint = 'none') {
  const queue = [{state: {positions: level.starts}, depth: 0}], seen = new Set([level.starts.join(',')]);
  for (let i = 0; i < queue.length; i++) {
    const {state, depth} = queue[i]!;
    if (homeWon(level, state)) return depth;
    for (const direction of directions) {
      const result = moveHome(level, state, direction);
      if (constraint === 'stay-home' && state.positions.some((p, j) => p === level.homes[j] && result.state.positions[j] !== p)) continue;
      const adjust = result.blocked[0] !== result.blocked[1];
      if (constraint === 'no-horizontal-adjustment' && direction % 2 === 1 && adjust) continue;
      if (constraint === 'no-vertical-adjustment' && direction % 2 === 0 && adjust) continue;
      const key = result.state.positions.join(',');
      if (!seen.has(key)) { seen.add(key); queue.push({state: result.state, depth: depth + 1}); }
    }
    assert.ok(seen.size <= level.size ** 4, 'Exhaustive position-pair bound, not a timeout');
  }
  return null;
}
function minimumAdjustments(level: HomeLevel) {
  const queue: HomeState[] = [{positions: level.starts}], costs = new Map([[level.starts.join(','), 0]]), settled = new Set<string>();
  while (queue.length) {
    queue.sort((a,b) => costs.get(a.positions.join(','))! - costs.get(b.positions.join(','))!);
    const state = queue.shift()!, key = state.positions.join(',');
    if (settled.has(key)) continue;
    settled.add(key);
    const cost = costs.get(key)!;
    if (homeWon(level,state)) return cost;
    for (const d of directions) {
      const r = moveHome(level,state,d), k = r.state.positions.join(','), next = cost + Number(r.blocked[0] !== r.blocked[1]);
      if (next < (costs.get(k) ?? Infinity)) { costs.set(k,next); queue.push(r.state); }
    }
    assert.ok(settled.size <= level.size ** 4);
  }
  return null;
}
for (const level of homeLevelsR2) {
  test(`${level.id} R2: bilingual content, bounded board and independent step witnesses`, () => {
    const answer = answers.find(a => a.key === level.answerKey)!;
    assert.ok(answer); assert.equal(answer.version,level.version);
    assert.equal(answer.chapter,Math.ceil(Number(level.id.slice(1))/6));
    assert.ok([4,5].includes(level.size));
    for (const t of [level.title,level.lesson,...level.hints!]) assert.ok(t.ja.length && t.en.length);
    assert.equal(level.hints!.length,2);
    for (const [i,walls] of [level.walls,level.otherWalls].entries()) {
      assert.equal(walls.length,new Set(walls).size);
      for (const p of [...walls,level.starts[i]!,level.homes[i]!]) assert.ok(Number.isInteger(p) && p>=0 && p<level.size**2);
      assert.ok(!walls.includes(level.starts[i]!)); assert.ok(!walls.includes(level.homes[i]!));
    }
    let state: HomeState = {positions:[...level.starts]};
    assert.equal(homeWon(level,state),false);
    for (const [i,d] of answer.solution.entries()) {
      const before = structuredClone(state), result = moveHome(level,state,d);
      assert.deepEqual(state,before,'Rules must not mutate an undo snapshot');
      assert.deepEqual({after:i+1,state:result.state,blocked:result.blocked,won:result.won},answer.intermediate[i]);
      assert.equal(result.changed,true,'Authored answer must not pad with both-blocked actions');
      assert.equal(result.won,i===answer.solution.length-1,'No earlier success hidden inside a long answer');
      state=result.state;
    }
    assert.equal(homeWon(level,state),true);
    for (const example of answer.counterexamples) {
      let s: HomeState = {positions:level.starts};
      for (const d of example.solution) s=moveHome(level,s,d).state;
      assert.deepEqual(s.positions,example.positions); assert.equal(homeWon(level,s),example.won);
    }
    assert.equal(answer.counterexamples[0]!.won,false);
    if(Number(level.id.slice(1))>=7) assert.equal(answer.counterexamples[1]!.won,false,'Nearest-total-distance greedy does not solve middle/end content');
  });
  test(`${level.id} R2: exhaustive shortest and constrained reachability exclude claimed bypasses`, () => {
    const a=answers.find(a=>a.id===level.id)!;
    assert.equal(search(level),a.proof.shortest);
    assert.equal(minimumAdjustments(level),a.proof.minimumUnilateralAdjustments);
    assert.equal(search(level,'stay-home')===null,a.proof.requiresDeparture);
    assert.equal(search(level,'no-horizontal-adjustment')===null,a.proof.requiresHorizontalAdjustment);
    assert.equal(search(level,'no-vertical-adjustment')===null,a.proof.requiresVerticalAdjustment);
    assert.equal(a.proof.pairStateBound,level.size**4);
    assert.equal(a.intermediate.at(-1)!.blocked.every(b=>!b),a.proof.finalBothMove);
  });
}
test('R2 home: existing five content IDs, versions and board coordinates are unchanged',()=>{
  const expected=[
    {id:'T01',size:4,starts:[12,12],homes:[14,14],walls:[0,1,5,7],otherWalls:[0,2,5,7]},
    {id:'T02',size:4,starts:[12,13],homes:[6,6],walls:[3,7,11],otherWalls:[0,4,8]},
    {id:'T03',size:4,starts:[12,15],homes:[3,0],walls:[5,6,10],otherWalls:[5,9,10]},
    {id:'T04',size:4,starts:[12,14],homes:[13,2],walls:[8,5,6,7],otherWalls:[10,13,4,5,9]},
    {id:'T05',size:4,starts:[12,3],homes:[3,13],walls:[5,6],otherWalls:[6,10]},
  ];
  homeLevelsR2.slice(0,5).forEach((l,i)=>{
    const {id,size,starts,homes,walls,otherWalls}=l;
    assert.deepEqual({id,size,starts,homes,walls,otherWalls},expected[i]);
    assert.equal(l.version,1);assert.equal(l.answerKey,`${l.id}@1`);
  });
  assert.equal(homeLevelsR2.length,18);assert.equal(new Set(homeLevelsR2.map(l=>l.id)).size,18);
});
test('R2 home: horizontal and vertical exercises have different necessary adjustments',()=>{
  const horizontal=answers.find(a=>a.id==='T07')!.proof,vertical=answers.find(a=>a.id==='T08')!.proof;
  assert.equal(horizontal.requiresHorizontalAdjustment,true);assert.equal(horizontal.requiresVerticalAdjustment,false);
  assert.equal(vertical.requiresVerticalAdjustment,true);assert.equal(vertical.requiresHorizontalAdjustment,false);
});
test('T18: mandatory home departure, repeated two-axis adjustment and a shared final arrival',()=>{
  const a=answers.find(a=>a.id==='T18')!,l=homeLevelsR2.at(-1)!;
  assert.equal(a.proof.requiresDeparture,true);assert.equal(a.proof.requiresHorizontalAdjustment,true);assert.equal(a.proof.requiresVerticalAdjustment,true);
  assert.equal(a.proof.minimumUnilateralAdjustments,8);assert.equal(a.proof.shortest,14);
  assert.ok(a.intermediate.some((s,i)=>s.state.positions.some((p,j)=>p===l.homes[j]&&a.intermediate[i+1]?.state.positions[j]!==p)&&!s.won));
  assert.deepEqual(a.intermediate.at(-2)!.state.positions,[0,22]);
  assert.deepEqual(a.intermediate.at(-1)!.state.positions,[1,23]);
  assert.deepEqual(a.intermediate.at(-1)!.blocked,[false,false]);
});
