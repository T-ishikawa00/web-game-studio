import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
  KILN_PHASES,KILN_RUN_SECONDS,KILN_QUALITY_GOAL,createKilnState,
  kilnPhaseAt,setKilnVent,stokeKiln,stepKilnState,createGame,meta
} from '../src/games/kiln.js';

const advance=(state,seconds,input)=>{for(let i=0;i<Math.round(seconds*10);i++)stepKilnState(state,.1,input);return state;};

test('the firing schedule moves through four deliberate glaze bands',()=>{
  assert.equal(KILN_PHASES.length,4);
  assert.deepEqual([0,17,38,58,78].map(kilnPhaseAt),[0,1,2,3,3]);
  assert.equal(KILN_RUN_SECONDS,78);
  assert.ok(KILN_QUALITY_GOAL>0);
  assert.ok(KILN_PHASES[3].low>KILN_PHASES[2].high);
});

test('stoking adds stored heat and temperature responds with inertia',()=>{
  const state=createKilnState(9),initial=state.temperature;
  stokeKiln(state,.28);
  assert.equal(state.temperature,initial);
  assert.ok(state.ember>.3);
  stepKilnState(state,.1,{vent:.12});
  const firstChange=state.temperature-initial;
  assert.ok(firstChange>0&&firstChange<5,'one input should not teleport the kiln temperature');
  advance(state,2.5,{vent:.12});
  assert.ok(state.temperature>initial+firstChange,'stored ember should keep warming after the tap');
});

test('vent position creates a measurable heating-versus-cooling decision',()=>{
  const closed=createKilnState(9),open=createKilnState(9);
  for(const s of [closed,open]){s.temperature=430;s.ember=0;}
  setKilnVent(closed,.05);setKilnVent(open,.95);
  advance(closed,8,{vent:closed.vent});advance(open,8,{vent:open.vent});
  assert.ok(closed.temperature>open.temperature+50);
  assert.equal(setKilnVent(open,4),open);
  assert.equal(open.vent,1);
});

test('rapid thermal shock and overfire each end a run with a visible failure reason',()=>{
  const shock=createKilnState(9);shock.temperature=310;shock.ember=1;shock.vent=0;
  advance(shock,8,{stoking:true,vent:0});
  assert.equal(shock.status,'lost');
  assert.equal(shock.reason,'thermal-shock');

  const burn=createKilnState(9);burn.temperature=880;burn.ember=.9;burn.vent=.2;
  advance(burn,5,{stoking:true,vent:.2});
  assert.equal(burn.status,'lost');
  assert.equal(burn.reason,'overfire');
});

test('a measured control policy can finish a stable firing instead of waiting through a simulator',()=>{
  const state=createKilnState(9);
  while(state.elapsed<KILN_RUN_SECONDS&&state.status==='running'){
    const phase=KILN_PHASES[kilnPhaseAt(state.elapsed)];
    const center=(phase.low+phase.high)/2;
    const error=center-state.temperature;
    const vent=error < -18 ? .88 : error > 26 ? .1 : .22;
    const stoking=error>20&&state.ember<.62;
    stepKilnState(state,.1,{vent,stoking});
  }
  assert.equal(state.status,'won','expected a controllable winning trajectory; reason='+state.reason+' at '+Math.round(state.temperature)+' degrees with quality '+state.quality);
  assert.ok(state.quality>=KILN_QUALITY_GOAL);
});

test('only reset starts play; pointer and keyboard provide equivalent control',()=>{
  const reports=[];
  const game=createGame({ctx:null,settings:()=>({}),lang:()=> 'en',onReport:r=>reports.push(r)});
  game.step(4);
  assert.equal(game.snapshot().elapsed,0);
  assert.equal(game.snapshot().started,false);
  game.reset(9);
  const startVent=game.snapshot().vent;
  game.pointer('down',{x:500,y:639});
  game.pointer('move',{x:650,y:639});
  game.pointer('up',{x:650,y:639});
  assert.ok(game.snapshot().vent>startVent);
  game.key('ArrowLeft');
  const beforeStoke=game.snapshot().ember;
  game.pointer('down',{x:150,y:630});
  game.step(.1);
  game.pointer('up',{x:150,y:630});
  assert.ok(game.snapshot().ember>beforeStoke);
  game.key('Enter');
  assert.ok(game.snapshot().ember>beforeStoke);
  game.cancel();
  assert.equal(meta.id,'kiln');
  assert.ok(reports.some(r=>r.status==='running'));
});

test('preview ignores all inputs; held pointer and Space controls match and both release cleanly',()=>{
  const pointerGame=createGame({ctx:null}),keyGame=createGame({ctx:null});
  const preview=pointerGame.snapshot();
  pointerGame.pointer('down',{x:150,y:630});
  pointerGame.key('Space');
  pointerGame.key('ArrowUp');
  pointerGame.step(.1);
  assert.equal(pointerGame.snapshot().started,false);
  assert.equal(pointerGame.snapshot().elapsed,0);
  assert.equal(pointerGame.snapshot().ember,preview.ember);
  assert.equal(pointerGame.snapshot().vent,preview.vent);

  pointerGame.reset(9);keyGame.reset(9);
  pointerGame.pointer('down',{x:150,y:630});
  keyGame.key('Space');
  pointerGame.step(.1);keyGame.step(.1);
  assert.equal(pointerGame.snapshot().ember,keyGame.snapshot().ember);
  assert.equal(pointerGame.snapshot().temperature,keyGame.snapshot().temperature);

  pointerGame.pointer('cancel');
  keyGame.keyUp('Space');
  pointerGame.step(.1);keyGame.step(.1);
  assert.equal(pointerGame.snapshot().ember,keyGame.snapshot().ember,'pointer cancel and Space keyup must stop the held fuel');
  assert.equal(pointerGame.snapshot().temperature,keyGame.snapshot().temperature);
  assert.equal(pointerGame.snapshot().status,'running');
});

test('a dragged vent and one arrow-key adjustment produce the same vent setting',()=>{
  const pointerGame=createGame({ctx:null}),keyGame=createGame({ctx:null});
  pointerGame.reset(9);keyGame.reset(9);
  pointerGame.pointer('down',{x:450,y:639});
  pointerGame.pointer('move',{x:470,y:639});
  pointerGame.pointer('up',{x:470,y:639});
  keyGame.key('ArrowRight');
  assert.ok(Math.abs(pointerGame.snapshot().vent-keyGame.snapshot().vent)<.001);
  pointerGame.cancel();keyGame.cancel();
});

