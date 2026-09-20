import test from 'node:test';
import assert from 'node:assert/strict';
import { MagnetWorld as GoldWorld, TUNE as GOLD_TUNE } from '../game004-magnet/core.ts';
import {
  MagnetWorld,
  TUNE,
  type Enemy,
  type Scrap,
} from '../game004-magnet-tempo/core.ts';

function step(world: { update(dt: number): void }, seconds: number, dt = TUNE.step) {
  for (let elapsed = 0; elapsed < seconds - 1e-9; elapsed += dt) {
    world.update(Math.min(dt, seconds - elapsed));
  }
}

function shot(world: MagnetWorld, vx = 900, vy = 0, salvaged = false): Scrap {
  world.addScrap(world.player.x, world.player.y, 0, salvaged);
  const scrap = world.scraps.at(-1)!;
  scrap.mode = 'shot';
  scrap.vx = vx;
  scrap.vy = vy;
  scrap.hit = [];
  return scrap;
}

function powerRelay(world: MagnetWorld, relayIndex = world.activeRelay) {
  const relay = world.relays[relayIndex]!;
  let guard = 0;
  while (!relay.done && guard++ < relay.max + 1) world.feedRelay(relay, shot(world, 900, 0, true));
  assert.equal(relay.done, true, `relay ${relayIndex} should reach its quota`);
}

function powerRelayFromSalvage(world: MagnetWorld, relayIndex = world.activeRelay) {
  const relay = world.relays[relayIndex]!;
  for (const supply of world.scraps.filter(scrap => scrap.salvaged)) {
    supply.mode = 'shot';
    world.feedRelay(relay, supply);
    if (relay.done) break;
  }
  assert.equal(relay.done, true, `relay ${relayIndex} should have enough salvaged supply`);
}

function clearEnemies(world: MagnetWorld) {
  for (const enemy of world.enemies) enemy.dead = true;
}

function chooseAt(world: MagnetWorld, choice: number, id: string) {
  world.encounter = 'choice';
  world.choice = choice;
  assert.equal(world.choose(id), true);
  step(world,.18);
}

function basicTargets(world: MagnetWorld, count: number): Enemy[] {
  world.enemies = [];
  for (let i = 0; i < count; i++) world.spawn('basic', 0.55 + i * 0.03, 0.45);
  for (const enemy of world.enemies) enemy.spawnIn = 0;
  return world.enemies;
}

test('progression preserves the Gold opening layout and first volley', () => {
  const gold = new GoldWorld(960, 640);
  const progression = new MagnetWorld(960, 640);

  assert.deepEqual(TUNE, GOLD_TUNE);
  assert.deepEqual(
    (({ hp: _hp, maxHp: _maxHp, ...player }) => player)(progression.player),
    gold.player,
  );
  assert.deepEqual(
    progression.enemies.map(({ kind: _kind, shield: _shield, facing: _facing, windup: _windup, dash: _dash, recover: _recover, spawnIn: _spawnIn, guardStress: _guardStress, locked: _locked, shellGate: _shellGate, ...enemy }) => enemy),
    gold.enemies,
  );
  assert.deepEqual(progression.scraps, gold.scraps);

  gold.startHold();
  progression.startHold();
  step(gold, 1.5);
  step(progression, 1.5);
  gold.aim = progression.aim = { x: 80, y: 90 };
  step(gold, 0.1);
  step(progression, 0.1);
  gold.release();
  progression.release();
  step(gold, 0.08);
  step(progression, 0.08);

  assert.equal(progression.shots, gold.shots);
  assert.equal(progression.releaseIn, gold.releaseIn);
  assert.deepEqual(
    progression.scraps.map(({ id, x, y, vx, vy, mode, age, reward, salvaged, hit }) => ({ id, x, y, vx, vy, mode, age, reward, salvaged, hit })),
    gold.scraps.map(({ id, x, y, vx, vy, mode, age, reward, salvaged, hit }) => ({ id, x, y, vx, vy, mode, age, reward, salvaged, hit })),
  );
});

test('relays progress in order and choices pause safely until a valid selection', () => {
  const world = new MagnetWorld();
  world.started = true;
  clearEnemies(world);
  powerRelay(world);
  world.director(0);
  assert.equal(world.encounter,'settle');step(world,.65);

  assert.equal(world.encounter, 'choice');
  assert.equal(world.choice, 1);
  const pausedAt = { time: world.time, runTime: world.runTime, choices: world.choices.length };
  step(world, 10);
  assert.deepEqual(
    { time: world.time, runTime: world.runTime, choices: world.choices.length },
    pausedAt,
  );
  assert.equal(world.choose('swarm'), false);
  assert.equal(world.choice, 1);
  assert.equal(world.encounter, 'choice');
  assert.equal(world.choose('rack'), true);step(world,.18);
  assert.equal(world.stage, 1);
  assert.equal(world.module, 'rack');

  const inactive = world.relays[1]!;
  const inactiveCharge = inactive.charge;
  world.feedRelay(inactive, shot(world, 900, 0, true));
  assert.equal(inactive.charge, inactiveCharge, 'an inactive relay must reject charge');

  const active = world.relays[0]!;
  const blank = shot(world);
  world.feedRelay(active, blank);
  assert.equal(active.charge, 0, 'ordinary reusable scrap cannot power a relay');
  assert.equal(world.counters['relay-empty'], 1);
  const charged = shot(world, 900, 0, true);
  world.feedRelay(active, charged);
  assert.equal(active.charge, 1);
  assert.equal(charged.salvaged, false, 'salvaged charge is consumed exactly once');
  charged.mode = 'shot';
  world.feedRelay(active, charged);
  assert.equal(active.charge, 1, 'the same plating cannot charge a relay twice');
  assert.equal(world.counters['relay-empty'], 2);

  clearEnemies(world);
  powerRelay(world, 0);
  assert.equal(world.activeRelay, 1);
  assert.equal(world.laneSuppressedUntil, world.runTime + 7);
  powerRelay(world, 1);
  world.director(0);step(world,.65);
  assert.equal(world.encounter, 'choice');
  assert.equal(world.choice, 2);
});

test('choice branches change radius, capacity, pierce count, and evolution tier', () => {
  const swarm = new MagnetWorld();
  chooseAt(swarm, 1, 'rack');
  assert.equal(swarm.capacity, 14);
  chooseAt(swarm, 2, 'swarm');
  assert.equal(swarm.build, 'swarm');
  assert.equal(swarm.evolution, 1);
  assert.equal(swarm.player.upgrade, 2);
  assert.equal(swarm.pullRadius, 460);
  assert.equal(swarm.capacity, 27);
  swarm.stage = 4;
  chooseAt(swarm, 3, 'cyclone');
  assert.equal(swarm.build, 'swarm');
  assert.equal(swarm.evolution, 2);
  assert.equal(swarm.player.upgrade, 3);
  assert.equal(swarm.capacity, 33);
  swarm.scraps[0]!.mode = 'orbit';
  swarm.shotAngle = 0;
  swarm.launch();
  assert.equal(swarm.counters.cyclone, 1);

  const lance = new MagnetWorld();
  chooseAt(lance, 1, 'recycler');
  chooseAt(lance, 2, 'lance');
  assert.equal(lance.build, 'lance');
  assert.equal(lance.evolution, 1);
  assert.equal(lance.pullRadius, 340);
  assert.equal(lance.capacity, 12);
  let targets = basicTargets(lance, 3);
  let projectile = shot(lance);
  lance.hit(targets[0]!, projectile);
  assert.equal(projectile.mode, 'shot');
  lance.hit(targets[1]!, projectile);
  assert.equal(projectile.mode, 'shot');
  lance.hit(targets[2]!, projectile);
  assert.equal(projectile.mode, 'loose', 'evolution 1 pierces exactly three targets');

  lance.stage = 4;
  chooseAt(lance, 3, 'return');
  assert.equal(lance.build, 'lance');
  assert.equal(lance.evolution, 2);
  assert.equal(lance.player.upgrade, 3);
  targets = basicTargets(lance, 4);
  projectile = shot(lance);
  for (let i = 0; i < 3; i++) {
    lance.hit(targets[i]!, projectile);
    assert.equal(projectile.mode, 'shot');
  }
  lance.hit(targets[3]!, projectile);
  assert.equal(projectile.mode, 'loose', 'evolution 2 pierces exactly four targets');
});

test('cleared combat stages confirm immediately and present clear without padding combat time', () => {
  const world = new MagnetWorld();
  world.enterStage(2);
  world.started = true;
  world.runTime = 12.5;
  clearEnemies(world);
  for (const relay of world.relays) relay.done = true;

  world.director(0);
  assert.equal(world.encounter, 'settle');
  assert.equal(world.transition, .65);
  const clearedAt = world.runTime;
  world.update(.65);
  assert.equal(world.stage, 3);
  assert.equal(world.encounter, 'combat');
  assert.equal(world.runTime, clearedAt, 'transition presentation must not pad run time');

  clearEnemies(world);
  for (const relay of world.relays) relay.done = true;
  world.director(0);
  assert.equal(world.encounter, 'settle', 'the next clear also has no minimum-time gate');
});

test('lane hazards use the rendered half-width edge and respect invulnerability', () => {
  const world = new MagnetWorld();
  world.enterStage(3);
  world.started = true;
  world.runTime = 31;
  world.encounterStart = 31;
  world.encounterSpawns = 7;
  world.laneCycle = 0;
  const center = world.player.x;
  world.lane = { axis: 'x', position: center, width: 28, telegraph: 0, active: 1 };

  const initialHp = world.player.hp;
  world.player.x = center + 13.9;
  world.director(0.1);
  assert.equal(world.player.hp, initialHp - 1);
  assert.equal(world.hurt, 1.8);
  world.player.x = center - 13.9;
  world.director(0.1);
  assert.equal(world.player.hp, initialHp - 1, 'active frames cannot bypass invulnerability');
  world.hurt = 0;
  world.player.x = center + 14;
  world.director(0.1);
  assert.equal(world.player.hp, initialHp - 1, 'the exact rendered edge is outside the lane');
  world.player.x = center - 13.9;
  world.director(0.1);
  assert.equal(world.player.hp, initialHp - 2, 'either side just inside the edge damages');
});

test('reactor locks split the final elite into three exposed damage cycles', () => {
  const world = new MagnetWorld();
  world.enterStage(5);
  world.started = true;
  world.build = 'lance';
  world.evolution = 2;
  world.player.upgrade = 3;
  const boss = world.enemies.find(enemy => enemy.kind === 'elite')!;
  boss.spawnIn = 0;
  assert.equal(world.scraps.filter(scrap => scrap.salvaged).length, 12);

  const blocked = shot(world);
  world.hit(boss, blocked);
  assert.equal(boss.hp, 24);
  assert.equal(world.bossLocked, true);

  powerRelayFromSalvage(world, 0);
  assert.equal(world.bossLocked, false);
  {const beforeCounterHp=boss.hp;world.hit(boss,shot(world));assert.equal(boss.hp,beforeCounterHp,'counter windup rejects damage');}for(let time=0;time<1.6;time+=TUNE.step)world.updateSpecial(boss,TUNE.step);assert.ok(boss.recover>0);
  for (let i = 0; i < 5; i++) world.hit(boss, shot(world));
  assert.equal(boss.hp, 16);
  assert.equal(world.bossLocked, true);
  assert.equal(world.activeRelay, 1);
  assert.ok(world.scraps.filter(scrap => scrap.salvaged).length >= world.relays[1]!.max);

  powerRelayFromSalvage(world, 1);
  assert.equal(world.bossLocked, false);
  assert.ok(boss.windup>0);
  for(let time=0;time<1.6;time+=TUNE.step)world.updateSpecial(boss,TUNE.step);
  assert.ok(boss.recover>0);
  for (let i = 0; i < 5; i++) world.hit(boss, shot(world));
  assert.equal(boss.hp, 8);
  assert.equal(world.bossLocked, true);
  assert.equal(world.activeRelay, 2);
  assert.ok(world.scraps.filter(scrap => scrap.salvaged).length >= world.relays[2]!.max);

  powerRelayFromSalvage(world, 2);
  assert.equal(world.bossLocked, false);
  assert.ok(boss.windup>0);
  for(let time=0;time<1.6;time+=TUNE.step)world.updateSpecial(boss,TUNE.step);
  assert.ok(boss.recover>0);
  for (let i = 0; i < 4; i++) world.hit(boss, shot(world));
  assert.equal(boss.dead, true);
  world.finishStep();
  assert.equal(world.won, true);
  assert.equal(world.counters['reactor-lock'], 2);
  assert.deepEqual(world.relays.map(relay => relay.done), [true, true, true]);
});

test('failure and reset clear run progression without leaking build or encounter state', () => {
  const world = new MagnetWorld();
  chooseAt(world, 1, 'guard');
  chooseAt(world, 2, 'swarm');
  world.stage = 4;
  chooseAt(world, 3, 'cyclone');
  world.runTime = 42;
  while (!world.over) {
    world.hurt = 0;
    world.damage();
  }
  assert.equal(world.runEndedAt, 42);
  assert.equal(world.startHold(), undefined);
  assert.equal(world.holding, false);

  world.reset();
  assert.deepEqual(
    {
      stage: world.stage,
      encounter: world.encounter,
      choice: world.choice,
      build: world.build,
      evolution: world.evolution,
      module: world.module,
      activeRelay: world.activeRelay,
      bossLocked: world.bossLocked,
      lane: world.lane,
      choices: world.choices,
      stageTimes: world.stageTimes,
      milestones: world.milestones,
      upgrades: world.upgrades,
      counters: world.counters,
      over: world.over,
      won: world.won,
      runTime: world.runTime,
      runEndedAt: world.runEndedAt,
      hp: world.player.hp,
      maxHp: world.player.maxHp,
      upgrade: world.player.upgrade,
      relays: world.relays.length,
      enemies: world.enemies.length,
      scraps: world.scraps.length,
    },
    {
      stage: 0,
      encounter: 'combat',
      choice: 0,
      build: 'base',
      evolution: 0,
      module: '',
      activeRelay: 0,
      bossLocked: false,
      lane: null,
      choices: [],
      stageTimes: [],
      milestones: [],
      upgrades: [],
      counters: {},
      over: false,
      won: false,
      runTime: 0,
      runEndedAt: 0,
      hp: 6,
      maxHp: 6,
      upgrade: 0,
      relays: 1,
      enemies: 4,
      scraps: 11,
    },
  );
});

test('LANCE expels blank orbit scrap so nearby salvaged plating cannot be capacity-starved', () => {
  const world = new MagnetWorld();
  world.build = 'lance';
  world.evolution = 1;
  world.player.upgrade = 2;
  world.nextArrival = Infinity;
  world.scraps = [];

  const blanks: Scrap[] = [];
  for (let i = 0; i < world.capacity; i++) {
    world.addScrap(world.player.x, world.player.y, i % 3);
    const blank = world.scraps.at(-1)!;
    blank.mode = 'orbit';
    blank.salvaged = false;
    blank.reward = false;
    blanks.push(blank);
  }
  world.addScrap(world.player.x + 40, world.player.y, 0, true);
  const incoming = world.scraps.at(-1)!;
  world.startHold();

  world.update(TUNE.step);
  const expelled = blanks.filter(scrap => scrap.mode === 'loose');
  assert.equal(expelled.length, 1, 'one blank orbit slot is yielded to charged plating');
  assert.ok((expelled[0]!.pickupAfter ?? 0) > world.time, 'expelled blank receives a pickup cooldown');

  for (let i = 0; incoming.mode !== 'orbit' && i < 120; i++) world.update(TUNE.step);
  assert.equal(incoming.mode, 'orbit');
  assert.equal(incoming.salvaged, true);
  assert.equal(world.scraps.filter(scrap => scrap.mode === 'orbit').length, world.capacity);

  step(world, 1.3);
  assert.equal(expelled[0]!.mode, 'loose', 'the expelled blank cannot immediately reclaim the full slot');
  assert.ok(world.scraps.filter(scrap => scrap.mode === 'orbit').length <= world.capacity);
});

test('an eight-minute active run has no artificial cutoff and preserves object caps', () => {
  const world = new MagnetWorld();
  world.started = true;
  world.player.hp = 999;
  world.player.maxHp = 999;
  step(world, 8 * 60);

  assert.ok(Math.abs(world.runTime - 480) < 1e-6);
  assert.equal(world.stage, 0);
  assert.equal(world.won, false);
  assert.equal(world.over, false);

  for (let i = 0; i < TUNE.maxScraps * 3; i++) world.addScrap(100 + i, 200, i % 3);
  world.burst(200, 200, TUNE.maxParticles * 3, '#fff');
  world.finishStep();
  assert.equal(world.scraps.length, TUNE.maxScraps);
  assert.equal(world.particles.length, TUNE.maxParticles);
  assert.ok(world.recycled > 0);
  assert.ok(world.peak.scraps <= TUNE.maxScraps);
  assert.ok(world.peak.particles <= TUNE.maxParticles);
});

test('clearing guards accelerates replenishment instead of imposing nine seconds of idle time',()=>{const w=new MagnetWorld();w.started=true;w.enemies=[];w.runTime=50;w.nextArrival=100;w.director(0);assert.ok(w.nextArrival<=52.2);step(w,2.3);assert.ok(w.enemies.some(e=>!e.dead));});

test('switching a loaded SWARM to final LANCE releases excess metal instead of exceeding the new rack',()=>{const w=new MagnetWorld();w.build='swarm';w.evolution=1;w.stage=4;while(w.scraps.length<24)w.addScrap(w.player.x,w.player.y,0);for(const s of w.scraps)s.mode='orbit';w.encounter='choice';w.choice=3;assert.equal(w.choose('lance'),true);assert.equal(w.build,'lance');assert.equal(w.evolution,2);assert.equal(w.scraps.filter(s=>s.mode==='orbit').length,12);assert.ok(w.scraps.filter(s=>s.pickupAfter&&s.mode==='loose').length>=12);});

test('fatal current ends the step before a queued projectile can turn failure into a clear',()=>{const w=new MagnetWorld();w.enterStage(5);w.started=true;w.runTime=40;w.player.hp=1;w.player.upgrade=3;w.bossLocked=false;w.laneCycle=4;w.lane={axis:'x',position:w.player.x,width:28,telegraph:0,active:1};const boss=w.enemies[0]!;boss.hp=2;boss.spawnIn=0;boss.shield=0;boss.recover=1;const s=shot(w,0,0);s.x=boss.x;s.y=boss.y;w.update(TUNE.step);assert.equal(w.over,true);assert.equal(w.won,false);assert.equal(boss.hp,2);});

