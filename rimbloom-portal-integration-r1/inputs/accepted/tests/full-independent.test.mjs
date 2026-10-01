import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import * as full from '../src/core.mjs';
import * as accepted from '../../game007-accepted-prototype-r1/src/core.mjs';
import { FORMATIONS, formation } from '../src/content.mjs';

// Independent counterexamples use explicit engine fixtures. These are unit QA,
// never evidence of normal pointer/touch gameplay or Human craft acceptance.
const { B, W, H, ROUND, FEEL, RULES, ENEMY_CAP, FX_CAP, create, spawn, launch, step, reflectedPath } = full;
const TOL = 1e-8;

function fixture(engine = full, seed = 907, x = 200, y = 300) {
  const g = engine.create(seed);
  g.status = 'playing';
  g.enemies = [];
  g.spawnAt = Infinity;
  g.p.x = x;
  g.p.y = y;
  return g;
}
function enemy(g, type, x, y, engine = full) {
  engine.spawn(g, type, x, y);
  return g.enemies.at(-1);
}
function advance(g, seconds, hz = 120, engine = full) {
  const count = Math.floor(seconds * hz + 1e-8);
  for (let i = 0; i < count; i++) engine.step(g, 1 / hz);
  const left = seconds - count / hz;
  if (left > 1e-10) engine.step(g, left);
}
function near(actual, expected, label, tolerance = TOL) {
  assert.ok(Number.isFinite(actual), label + ' is not finite');
  assert.ok(Math.abs(actual - expected) <= tolerance,
    label + ': ' + actual + ' vs ' + expected);
}
function sameMotion(a, b, label) {
  for (const key of ['x', 'y', 'vx', 'vy', 'dash', 'cool', 'inv', 'angle']) {
    near(a.p[key], b.p[key], label + ' p.' + key);
  }
  assert.equal(a.p.charge, b.p.charge, label + ' charge');
  assert.equal(a.banks, b.banks, label + ' banks');
  assert.equal(a.life, b.life, label + ' life');
  near(a.t, b.t, label + ' elapsed');
}
function relayBaseScore() {
  const g = fixture();
  enemy(g, 'relay', 240, 300);
  assert.equal(launch(g, 1, 0), true);
  step(g, .025);
  assert.equal(g.kills, 1);
  assert.ok(g.score > 0 && Number.isInteger(g.score));
  return g.score;
}

test('accepted engine bytes remain identical to the recorded Human baseline', async () => {
  const manifest = JSON.parse(await readFile(new URL('../qa/ACCEPTED_BASELINE.json', import.meta.url), 'utf8'));
  const entry = manifest.files.find(item => item.file.replaceAll('\\', '/') === 'src/core.mjs');
  assert.ok(entry, 'accepted core hash is recorded');
  for (const relative of ['../../game007/src/core.mjs', '../../game007-accepted-prototype-r1/src/core.mjs']) {
    const bytes = await readFile(new URL(relative, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256, relative);
    assert.equal(bytes.byteLength, entry.bytes);
  }
});

test('Full opening preserves accepted board, initial four targets, life and first-input parameters', () => {
  const a = create(7007), b = accepted.create(7007);
  assert.equal(W, accepted.W);
  assert.equal(H, accepted.H);
  assert.equal(ROUND, 60);
  assert.deepEqual(B, accepted.B);
  assert.deepEqual(a.enemies.map(e => ({ type: e.type, x: e.x, y: e.y, r: e.r })),
    b.enemies.map(e => ({ type: e.type, x: e.x, y: e.y, r: e.r })));
  assert.equal(a.life, 3);
  assert.equal(a.p.r, 11);
  assert.equal(a.spawnAt, b.spawnAt);
  assert.equal(a.score, 0);
  assert.equal(a.shots, 0);
  sameMotion(a, b, 'opening');
});

test('published Full limits match the unchanged feel and bounded content contract', () => {
  assert.deepEqual(FEEL, { speed: 1450, dash: .62, recovery: .23, range: 899, radius: 11 });
  assert.equal(ENEMY_CAP, 26);
  assert.equal(FX_CAP, 72);
  assert.equal(RULES.softPulse, 82);
  assert.equal(RULES.relayPulse, 125);
  assert.equal(RULES.multiplierCap, 5);
});

test('unobstructed motion is equivalent to accepted physics across rim, corner and oblique inputs', () => {
  const starts = [[200, 300], [B.l + 11, 350], [B.r - 11, 350],
    [270, B.t + 11], [270, B.b - 11], [B.l + 11, B.t + 11], [B.r - 11, B.b - 11]];
  const directions = [[1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [.3, -1], [-.82, .31]];
  for (const [x, y] of starts) for (const [dx, dy] of directions) {
    const a = fixture(full, 907, x, y), b = fixture(accepted, 907, x, y);
    assert.equal(launch(a, dx, dy), accepted.launch(b, dx, dy));
    for (let frame = 0; frame < 108; frame++) {
      step(a, 1 / 120);
      accepted.step(b, 1 / 120);
      sameMotion(a, b, 'start ' + x + ',' + y + ' direction ' + dx + ',' + dy + ' frame ' + frame);
    }
  }
});

test('launch starts at 1450 immediately with .62 dash and no acceleration ramp', () => {
  const g = fixture();
  assert.equal(launch(g, 1, 0), true);
  near(Math.hypot(g.p.vx, g.p.vy), 1450, 'launch speed');
  near(g.p.dash, .62, 'dash duration');
  step(g, 1 / 120);
  near(g.p.x, 200 + 1450 / 120, 'first-frame displacement');
  near(Math.hypot(g.p.vx, g.p.vy), 1450, 'first-frame speed');
});

test('899px preview and accepted preview retain the same completed empty-arena landing', () => {
  for (const [x, y, dx, dy] of [[200, 300, .3, -1], [41, 123, -1, -1], [499, 350, 1, 0], [200, 300, 1, -.3]]) {
    const path = reflectedPath(x, y, dx, dy);
    assert.deepEqual(path, accepted.reflectedPath(x, y, dx, dy));
    const g = fixture(full, 907, x, y);
    launch(g, dx, dy);
    advance(g, .9);
    const landing = path.at(-1);
    near(g.p.x, landing[0], 'landing x');
    near(g.p.y, landing[1], 'landing y');
    assert.equal(g.p.dash, 0);
  }
});

test('full dash and .23 recovery keep the accepted launch cadence at several update rates', () => {
  for (const hz of [30, 45, 60, 120]) {
    const a = fixture(), b = fixture(accepted);
    launch(a, .3, -1);
    accepted.launch(b, .3, -1);
    let firstAllowed = null;
    for (let frame = 1; frame <= hz * 2; frame++) {
      step(a, 1 / hz);
      accepted.step(b, 1 / hz);
      const acceptedLaunch = accepted.launch(b, 1, 0);
      const fullLaunch = launch(a, 1, 0);
      assert.equal(fullLaunch, acceptedLaunch, hz + ' Hz at frame ' + frame);
      if (fullLaunch) { firstAllowed = frame / hz; break; }
    }
    assert.ok(firstAllowed !== null && firstAllowed >= .84 && firstAllowed <= .91,
      hz + ' Hz first accepted launch ' + firstAllowed);
    assert.equal(a.shots, 2);
  }
});

test('armor stop position, guard timing and away-facing escape preserve accepted motion', () => {
  const a = fixture(), b = fixture(accepted);
  enemy(a, 'armor', 244, 300);
  enemy(b, 'armor', 244, 300, accepted);
  launch(a, 1, 0);
  accepted.launch(b, 1, 0);
  step(a, .025);
  accepted.step(b, .025);
  sameMotion(a, b, 'blocked');
  assert.equal(a.kills, 0);
  assert.equal(a.p.dash, 0);
  advance(a, .25);
  advance(b, .25, 120, accepted);
  assert.equal(launch(a, -1, 0), true);
  assert.equal(accepted.launch(b, -1, 0), true);
  step(a, .025);
  accepted.step(b, .025);
  sameMotion(a, b, 'escaped');
});

test('nonfinite, nonnumeric and overflowing direction inputs cannot mutate or corrupt play', () => {
  const invalid = [[NaN, 1], [1, NaN], [Infinity, 0], [-Infinity, 1], [0, -Infinity],
    [undefined, 1], [null, 1], ['1', 1], [1, {}], [Number.MAX_VALUE, Number.MAX_VALUE], [0, 0], [.99, 0]];
  for (const direction of invalid) {
    const g = fixture();
    const before = JSON.stringify(g);
    assert.equal(launch(g, ...direction), false, 'reject direction ' + String(direction));
    assert.equal(JSON.stringify(g), before, 'rejected input must not change state');
  }
});

test('invalid timestep leaves score, relay state, FX and counters unchanged', () => {
  const g = fixture();
  enemy(g, 'relay', 240, 300);
  launch(g, 1, 0);
  const before = JSON.stringify(g);
  for (const dt of [0, -.1, NaN, Infinity, -Infinity, undefined]) {
    step(g, dt);
    assert.equal(JSON.stringify(g), before, 'dt ' + dt);
  }
});

test('a direct relay creates a 125px soft/relay chain without activating nearby armor', () => {
  const g = fixture();
  enemy(g, 'relay', 240, 300);
  enemy(g, 'soft', 240, 400);
  enemy(g, 'relay', 350, 330);
  enemy(g, 'soft', 445, 400);
  const armor = enemy(g, 'armor', 350, 400);
  const far = enemy(g, 'soft', 460, 575);
  launch(g, 1, 0);
  step(g, .025);
  assert.equal(g.kills, 4);
  assert.equal(g.p.chain, 4);
  assert.equal(g.bestChain, 4);
  assert.equal(g.p.charge, false);
  assert.deepEqual(g.enemies.map(e => e.id).sort((a, b) => a - b), [armor.id, far.id]);
  assert.equal(g.events.filter(e => e.type === 'hit').length, 4);
  advance(g, .1);
  assert.equal(g.kills, 4, 'visited chain targets must not be counted twice');
});

test('relay reach includes a target beyond the old 82px pulse but excludes one beyond 125px', () => {
  const g = fixture();
  enemy(g, 'relay', 240, 300);
  enemy(g, 'soft', 240, 423);
  const outside = enemy(g, 'soft', 240, 427);
  launch(g, 1, 0);
  step(g, .025);
  assert.equal(g.kills, 2);
  assert.equal(g.enemies.length, 1);
  assert.equal(g.enemies[0].id, outside.id);
});

test('soft targets reached by relay do not recursively turn into relay emitters', () => {
  const g = fixture();
  enemy(g, 'relay', 240, 300);
  enemy(g, 'soft', 340, 300);
  const far = enemy(g, 'soft', 440, 300);
  launch(g, 1, 0);
  step(g, .025);
  assert.equal(g.kills, 2);
  assert.equal(g.enemies.length, 1);
  assert.equal(g.enemies[0].id, far.id);
});

test('26 mutually overlapping relays terminate, score each target once and cap the multiplier at five', () => {
  const base = relayBaseScore();
  const g = fixture();
  for (let i = 0; i < 26; i++) enemy(g, 'relay', 240 + i % 3, 300 + i % 4);
  launch(g, 1, 0);
  assert.doesNotThrow(() => step(g, .025));
  assert.equal(g.kills, 26);
  assert.equal(g.p.chain, 26);
  assert.equal(g.bestChain, 26);
  assert.equal(g.enemies.length, 0);
  assert.equal(g.score, base * (1 + 2 + 3 + 4 + 5 * 22));
  assert.deepEqual(g.events.filter(e => e.type === 'hit').map(e => e.chain).sort((a, b) => a - b),
    Array.from({ length: 26 }, (_, i) => i + 1));
  advance(g, .1);
  assert.equal(g.kills, 26);
  assert.ok(Number.isFinite(g.score));
  assert.equal(g.milestone, 18);
  assert.ok(g.p.dash > 0, 'chain feedback must not stop the active dash');
  near(Math.hypot(g.p.vx, g.p.vy), 1450, 'chain speed');
});

test('ordinary uncharged kills retain the original soft score and fivefold cap', () => {
  const g = fixture();
  for (let i = 0; i < 8; i++) enemy(g, 'soft', 230 + 20 * i, 300);
  launch(g, 1, 0);
  step(g, .15);
  assert.equal(g.banks, 0);
  assert.equal(g.kills, 8);
  assert.equal(g.score, 60 * (1 + 2 + 3 + 4 + 5 + 5 + 5 + 5));
});

test('the skill bonus rewards a kill after several banks, with no extra speed or collision change', () => {
  const a = fixture(), b = fixture(accepted);
  enemy(a, 'soft', 150, 144);
  enemy(b, 'soft', 150, 144, accepted);
  launch(a, 1, -.3);
  accepted.launch(b, 1, -.3);
  advance(a, .5);
  advance(b, .5, 120, accepted);
  assert.equal(a.kills, 1);
  assert.equal(b.kills, 1);
  assert.ok(a.banks >= 2);
  sameMotion(a, b, 'multi-bank reward');
  assert.ok(a.score > b.score, 'Full score ' + a.score + ' must reward more than accepted ' + b.score);
});

test('banking without hitting a target creates no score or chain reward', () => {
  const g = fixture();
  for (let i = 0; i < 1800; i++) {
    launch(g, i % 2 ? -1 : 1, .15);
    step(g, 1 / 120);
  }
  assert.ok(g.banks >= 10, 'fixture must actually exercise repeated banks');
  assert.ok(g.shots >= 10);
  assert.equal(g.score, 0);
  assert.equal(g.kills, 0);
  assert.equal(g.p.chain, 0);
  assert.equal(g.bestChain, 0);
});

test('multi-bank skill state cannot leak into a fresh direct dash', () => {
  const g = fixture();
  enemy(g, 'soft', 150, 144);
  launch(g, 1, -.3);
  advance(g, 1);
  const dx = g.p.x < 270 ? 1 : -1;
  enemy(g, 'soft', g.p.x + dx * 45, g.p.y);
  const scoreBefore = g.score;
  assert.equal(launch(g, dx, 0), true);
  step(g, .025);
  assert.equal(g.p.chain, 1);
  assert.equal(g.score - scoreBefore, 60);
  assert.equal(g.p.charge, false);
});

test('a charged soft can activate an in-range relay, whose chain still excludes armor', () => {
  const g = fixture(full, 907, 490, 300);
  enemy(g, 'soft', 460, 300);
  enemy(g, 'relay', 460, 370);
  enemy(g, 'soft', 360, 420);
  const armor = enemy(g, 'armor', 460, 405);
  launch(g, 1, 0);
  step(g, .04);
  assert.equal(g.kills, 3);
  assert.equal(g.relayKills, 1);
  assert.equal(g.armorsBroken, 0);
  assert.deepEqual(g.enemies.map(e => e.id), [armor.id]);
});

test('safe landing after a kill awards once without extending the accepted dash or recovery', () => {
  const a = fixture(), b = fixture(accepted);
  enemy(a, 'soft', 240, 300);
  enemy(b, 'soft', 240, 300, accepted);
  launch(a, 1, 0);
  accepted.launch(b, 1, 0);
  advance(a, .65);
  advance(b, .65, 120, accepted);
  sameMotion(a, b, 'safe landing');
  assert.equal(a.safeLandings, 1);
  assert.equal(a.score - b.score, 25);
  assert.equal(a.skillBonus, 25);
  const score = a.score;
  advance(a, .4);
  assert.equal(a.safeLandings, 1);
  assert.equal(a.score, score, 'resting is not a repeated landing event');
});

test('a surviving off-path target near the landing prevents the safe-landing bonus', () => {
  const g = fixture();
  const path = reflectedPath(g.p.x, g.p.y, 1, 0);
  const landing = path.at(-1);
  enemy(g, 'soft', 240, 300);
  enemy(g, 'armor', landing[0], landing[1] + 65);
  launch(g, 1, 0);
  advance(g, .65);
  assert.equal(g.kills, 1);
  assert.equal(g.armorsBroken, 0);
  assert.equal(g.safeLandings, 0);
  assert.equal(g.skillBonus, 0);
  assert.equal(g.score, 60);
});

test('the same seed and same inputs reproduce expanded content, score and relay counters', () => {
  function replay(seed) {
    const g = create(seed);
    g.status = 'playing';
    g.p.inv = 100;
    for (let i = 0; i < 7200; i++) {
      if (i % 108 === 0) {
        const phase = (i / 108) % 8;
        launch(g, Math.cos(phase * Math.PI / 4), Math.sin(phase * Math.PI / 4));
      }
      step(g, 1 / 120);
    }
    return JSON.stringify(g);
  }
  assert.equal(replay(77013), replay(77013));
  assert.notEqual(replay(77013), replay(77014));
});

test('0/20/40 pressure bands do not insert an intermission or stop the 60-second active clock', () => {
  const g = create(7013);
  g.status = 'playing';
  g.p.inv = 100;
  const waves = [];
  for (let i = 0; i < 7200; i++) {
    step(g, 1 / 120);
    if (g.events.some(e => e.type === 'wave')) waves.push({ t: g.t, band: g.band });
    if (i < 7199) assert.equal(g.status, 'playing', 'unexpected intermission/end at ' + g.t);
  }
  assert.equal(g.status, 'won');
  assert.equal(g.t, 60);
  assert.deepEqual(waves.map(w => w.band), [1, 2]);
  near(waves[0].t, 20, 'middle wave', 1 / 120 + 1e-7);
  near(waves[1].t, 40, 'late wave', 1 / 120 + 1e-7);
});

test('automatic expanded formations remain finite and bounded for many deterministic seeds', () => {
  const allTypes = new Set();
  for (const seed of [1, 2, 3, 7, 19, 29, 77, 7007, 7013, 77013]) {
    const g = create(seed);
    g.status = 'playing';
    g.p.inv = 100;
    for (let i = 0; i < 3600; i++) {
      step(g, 1 / 60);
      assert.ok(g.enemies.length <= ENEMY_CAP, 'enemy cap seed ' + seed);
      for (const e of g.enemies) {
        assert.ok(['soft', 'armor', 'relay'].includes(e.type), 'unreviewed type ' + e.type);
        allTypes.add(e.type);
        assert.ok(Number.isFinite(e.x) && Number.isFinite(e.y) && Number.isFinite(e.r));
        assert.ok(e.x >= B.l + e.r - 1e-8 && e.x <= B.r - e.r + 1e-8, 'formation x ' + e.x);
        assert.ok(e.y >= B.t + e.r - 1e-8 && e.y <= B.b - e.r + 1e-8, 'formation y ' + e.y);
      }
    }
    assert.equal(g.status, 'won');
  }
  // A no-kill fixture may fill the cap before an armored pattern is selected.
  // Every passive seed is not promised to spawn every type. Coverage is pooled.
  assert.deepEqual([...allTypes].sort(), ['armor', 'relay', 'soft']);
});

test('all five named formations are reachable and have different structural geometry', () => {
  assert.equal(FORMATIONS.length, 5);
  assert.equal(new Set(FORMATIONS).size, 5);
  const names = new Set(), shapes = new Set();
  for (let index = 0; index < 5; index++) {
    const g = fixture();
    g.t = 24;
    g.band = 1;
    let calls = 0;
    g.rng = () => calls++ === 0 ? (index + .1) / 5 : .5;
    const packet = formation(g);
    names.add(packet.name);
    assert.equal(packet.targets.length, 4);
    assert.ok(packet.targets.some(e => e.type === 'relay'));
    const distances = [];
    for (let i = 0; i < packet.targets.length; i++) {
      for (let j = i + 1; j < packet.targets.length; j++) {
        distances.push(Math.round(Math.hypot(packet.targets[i].x - packet.targets[j].x,
          packet.targets[i].y - packet.targets[j].y) * 1000));
      }
    }
    shapes.add(JSON.stringify(distances.sort((a, b) => a - b)));
  }
  assert.deepEqual([...names].sort(), [...FORMATIONS].sort());
  assert.equal(shapes.size, 5, 'rotated/translated copies of one layout are insufficient');
});

test('explicit content bands introduce relay, then armor choices, then denser late chains', () => {
  const middleTypes = new Set(), lateTypes = new Set();
  for (let index = 0; index < 5; index++) {
    const packets = [];
    for (const [t, band] of [[12, 0], [24, 1], [44, 2]]) {
      const g = fixture();
      g.t = t;
      g.band = band;
      let calls = 0;
      g.rng = () => calls++ === 0 ? (index + .1) / 5 : .5;
      packets.push(formation(g));
    }
    const [early, middle, late] = packets;
    assert.ok(early.targets.some(e => e.type === 'relay'));
    assert.ok(early.targets.every(e => e.type !== 'armor'));
    assert.ok(middle.targets.some(e => e.type === 'relay'));
    assert.ok(late.targets.some(e => e.type === 'relay'));
    assert.ok(late.targets.length > middle.targets.length, 'late band must add chain opportunities');
    middle.targets.forEach(e => middleTypes.add(e.type));
    late.targets.forEach(e => lateTypes.add(e.type));
  }
  assert.deepEqual([...middleTypes].sort(), ['armor', 'relay', 'soft']);
  assert.deepEqual([...lateTypes].sort(), ['armor', 'relay', 'soft']);
});

test('sustained adversarial relay bursts cannot grow live FX without a fixed cap', () => {
  const g = fixture();
  g.p.inv = 100;
  let peak = 0;
  for (let i = 0; i < 300; i++) {
    launch(g, 1, .05);
    g.enemies = [];
    if (g.p.dash > 0) {
      const x = Math.max(B.l + 25, Math.min(B.r - 25, g.p.x + Math.sign(g.p.vx) * 10));
      const y = Math.max(B.t + 25, Math.min(B.b - 25, g.p.y + Math.sign(g.p.vy) * 10));
      for (let j = 0; j < 26; j++) enemy(g, 'relay', x, y);
    }
    step(g, 1 / 120);
    peak = Math.max(peak, g.fx.length);
    assert.ok(g.fx.length <= FX_CAP, 'FX grew to ' + g.fx.length + ' at tick ' + i);
    assert.ok(g.fx.every(f => Number.isFinite(f.life) && f.life > 0));
  }
  assert.ok(g.kills > 100, 'stress fixture must cause repeated bursts');
  assert.ok(peak > 0);
});

test('expanded relay score, FX and counters freeze in every nonplaying state', () => {
  for (const status of ['ready', 'paused', 'won', 'lost']) {
    const g = fixture();
    enemy(g, 'relay', 240, 300);
    enemy(g, 'relay', 340, 300);
    launch(g, 1, 0);
    step(g, .025);
    g.status = status;
    const before = JSON.stringify(g);
    step(g, .25);
    assert.equal(launch(g, 1, 0), false);
    assert.equal(JSON.stringify(g), before, status);
  }
});
