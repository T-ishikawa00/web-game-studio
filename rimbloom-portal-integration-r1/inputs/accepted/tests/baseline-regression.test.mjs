import test from 'node:test';
import assert from 'node:assert/strict';
import { B, ROUND, create, spawn, launch, step, swept, random, reflectedPath } from '../src/core.mjs';

// These fixtures isolate a documented encounter; they do not implement the engine.
function encounter(seed = 77, x = 200, y = 300) {
  const g = create(seed);
  g.status = 'playing';
  g.enemies = [];
  g.spawnAt = Infinity;
  g.p.x = x;
  g.p.y = y;
  return g;
}
function enemy(g, type, x, y) {
  spawn(g, type, x, y);
  return g.enemies.at(-1);
}
function advance(g, seconds, hz = 60) {
  for (let i = 0; i < Math.round(seconds * hz); i++) step(g, 1 / hz);
}
function inside(g) {
  assert.ok(Number.isFinite(g.p.x) && Number.isFinite(g.p.y));
  assert.ok(g.p.x >= B.l + g.p.r - 1e-8 && g.p.x <= B.r - g.p.r + 1e-8);
  assert.ok(g.p.y >= B.t + g.p.r - 1e-8 && g.p.y <= B.b - g.p.r + 1e-8);
}

test('sweep catches a fast crossing and tangent without accepting a nearby miss', () => {
  assert.equal(swept(0, 0, 1000, 0, 500, 20, 21), true);
  assert.equal(swept(0, 0, 1000, 0, 500, 21, 21), true);
  assert.equal(swept(0, 0, 1000, 0, 500, 22, 21), false);
  assert.equal(swept(0, 0, 1000, 0, 1030, 0, 21), false);
});

test('stationary sweep handles its circle and does not divide by zero', () => {
  assert.equal(swept(12, 15, 12, 15, 12, 15, 1), true);
  assert.equal(swept(12, 15, 12, 15, 14, 15, 1), false);
});

test('ready, paused, lost and won do not advance any simulation state', () => {
  for (const status of ['ready', 'paused', 'lost', 'won']) {
    const g = encounter();
    g.status = status;
    g.p.dash = .3;
    g.p.vx = 1000;
    g.p.cool = .2;
    g.p.inv = .5;
    g.fx.push({ life: .4, total: .4 });
    const before = JSON.stringify(g);
    step(g, .5);
    assert.equal(JSON.stringify(g), before, status);
    assert.equal(launch(g, 1, 0), false, status);
  }
});

test('the same explicit seed produces the same random stream', () => {
  const a = random(7007), b = random(7007), c = random(7008);
  const aa = Array.from({ length: 20 }, () => a());
  const bb = Array.from({ length: 20 }, () => b());
  const cc = Array.from({ length: 20 }, () => c());
  assert.deepEqual(aa, bb);
  assert.notDeepEqual(aa, cc);
  assert.ok(aa.every(n => n >= 0 && n < 1));
});

test('identical seed, inputs and elapsed steps reproduce an entire encounter', () => {
  function replay() {
    const g = create(19081);
    g.status = 'playing';
    for (let i = 0; i < 480; i++) {
      if (i === 0) launch(g, -1, -1);
      if (i === 120) launch(g, 1, 1);
      if (i === 240) launch(g, 1, -.3);
      step(g, 1 / 60);
    }
    return JSON.stringify(g);
  }
  assert.equal(replay(), replay());
});

test('outward and diagonal dashes from each rim keep the whole dart inside', () => {
  for (const [x, y, dx, dy] of [
    [B.l + 11, 350, -1, 0], [B.r - 11, 350, 1, 0],
    [270, B.t + 11, 0, -1], [270, B.b - 11, 0, 1],
    [B.l + 11, B.t + 11, -1, -1], [B.r - 11, B.b - 11, 1, 1],
  ]) {
    const g = encounter(77, x, y);
    assert.equal(launch(g, dx, dy), true);
    for (let i = 0; i < 100; i++) { step(g, 1 / 60); inside(g); }
    assert.equal(g.p.dash, 0);
    assert.ok(g.banks >= 1);
  }
});

test('a corner strike reflects both velocity components inward', () => {
  const g = encounter(77, B.l + 11, B.t + 11);
  launch(g, -1, -1);
  step(g, .01);
  assert.ok(g.p.vx > 0 && g.p.vy > 0);
  assert.equal(g.p.charge, true);
  inside(g);
});

test('direct armor contact stops the dart without breaking armor or hurting life', () => {
  const g = encounter();
  enemy(g, 'armor', 244, 300);
  launch(g, 1, 0);
  step(g, .025);
  assert.equal(g.kills, 0);
  assert.equal(g.enemies.length, 1);
  assert.equal(g.p.dash, 0);
  assert.equal(g.p.charge, false);
  assert.ok(g.p.cool > 0 && g.p.inv > 0);
  assert.equal(g.life, 3);
  assert.ok(g.events.some(e => e.type === 'shield'));
});

test('armor stopping cannot leave the dart embedded at the enemy center', () => {
  const g = encounter();
  const armor = enemy(g, 'armor', 236.25, 300);
  launch(g, 1, 0);
  step(g, .025);
  assert.equal(g.kills, 0);
  assert.equal(g.p.dash, 0);
  // Allow the enemy's small approach during this frame, but require real separation.
  assert.ok(Math.hypot(g.p.x - armor.x, g.p.y - armor.y) >= .9 * (g.p.r + armor.r - 3));
});

test('after armor recovery an away-facing dash can escape instead of being trapped forever', () => {
  const g = encounter();
  enemy(g, 'armor', 244, 300);
  launch(g, 1, 0);
  step(g, .025);
  advance(g, .25);
  assert.equal(g.p.cool, 0);
  const before = g.p.x;
  assert.equal(launch(g, -1, 0), true);
  step(g, .025);
  assert.ok(g.p.x < before - 1, `away dash remained at ${g.p.x} from ${before}`);
});

test('armor reached before a wall must stop an uncharged dash even in a banking frame', () => {
  const g = encounter(77, 465, 300);
  enemy(g, 'armor', 480, 330);
  launch(g, 1, 0);
  step(g, .025);
  // The line y=300 first touches the 32-radius collision circle at x≈468.86,
  // before the right-hand rim at x=499.
  assert.equal(g.kills, 0);
  assert.equal(g.banks, 0);
  assert.equal(g.p.charge, false);
  assert.equal(g.p.dash, 0);
  assert.ok(g.events.some(e => e.type === 'shield'));
});

test('a bank reached first enables the later armored collision', () => {
  const g = encounter(77, 490, 300);
  enemy(g, 'armor', 440, 300);
  launch(g, 1, 0);
  step(g, .01);
  assert.ok(g.banks >= 1);
  assert.equal(g.kills, 0);
  assert.equal(g.p.charge, true);
  step(g, .025);
  assert.equal(g.kills, 1);
  assert.equal(g.enemies.length, 0);
  assert.ok(g.events.some(e => e.type === 'hit' && e.armor));
});

test('an armor in front of a soft bloom blocks it regardless of storage order', () => {
  for (const reverse of [false, true]) {
    const g = encounter();
    const behind = enemy(g, 'soft', 260, 300);
    enemy(g, 'armor', 244, 300);
    if (reverse) g.enemies.reverse();
    launch(g, 1, 0);
    step(g, .025);
    assert.equal(g.kills, 0, `reverse=${reverse}`);
    assert.ok(g.enemies.some(e => e.id === behind.id), `reverse=${reverse}`);
  }
});

test('a soft hit before the bank does not retroactively gain a chain pulse', () => {
  const g = encounter(77, 465, 300);
  enemy(g, 'soft', 480, 324);
  const neighbor = enemy(g, 'soft', 420, 340);
  launch(g, 1, 0);
  step(g, .025);
  // First contact is x≈467.63; the neighboring bloom is off the dash path.
  assert.equal(g.kills, 1);
  assert.ok(g.enemies.some(e => e.id === neighbor.id));
  assert.ok(g.banks >= 1);
});

test('an energized hit pulses to a nearby soft bloom, not distant soft or nearby armor', () => {
  const g = encounter(77, 490, 300);
  enemy(g, 'soft', 460, 300);
  enemy(g, 'soft', 440, 350);
  const far = enemy(g, 'soft', 350, 350);
  const armor = enemy(g, 'armor', 450, 350);
  launch(g, 1, 0);
  step(g, .025);
  assert.equal(g.kills, 2);
  assert.equal(g.p.chain, 2);
  assert.equal(g.bestChain, 2);
  assert.ok(g.enemies.some(e => e.id === far.id));
  assert.ok(g.enemies.some(e => e.id === armor.id));
  advance(g, .1);
  assert.equal(g.kills, 2, 'dead pulse targets cannot be counted twice');
});

test('a direct soft hit has no off-path chain pulse', () => {
  const g = encounter();
  enemy(g, 'soft', 230, 300);
  const neighbor = enemy(g, 'soft', 245, 350);
  launch(g, 1, 0);
  step(g, .025);
  assert.equal(g.kills, 1);
  assert.ok(g.enemies.some(e => e.id === neighbor.id));
  assert.equal(g.life, 3);
});

test('launch recovery blocks repeated shots and the next dash resets charge and chain', () => {
  const g = encounter(77, 490, 300);
  launch(g, 1, 0);
  step(g, .01);
  assert.equal(g.p.charge, true);
  assert.equal(launch(g, -1, 0), false);
  advance(g, .7);
  assert.equal(g.p.dash, 0);
  assert.ok(g.p.cool > 0);
  assert.equal(launch(g, -1, 0), false);
  advance(g, .3);
  g.p.chain = 3;
  assert.equal(launch(g, -1, 0), true);
  assert.equal(g.p.charge, false);
  assert.equal(g.p.chain, 0);
  assert.equal(g.shots, 2);
});

test('resting contact removes one life and its recovery window prevents stacking damage', () => {
  const g = encounter();
  g.t = 2;
  for (let i = 0; i < 3; i++) enemy(g, 'armor', g.p.x, g.p.y).born = 0;
  step(g, .01);
  assert.equal(g.life, 2);
  assert.ok(g.p.inv > 0);
  advance(g, .5);
  assert.equal(g.life, 2);
});

test('zero life ends the round once and freezes all later steps', () => {
  const g = encounter();
  g.t = 2;
  g.life = 1;
  enemy(g, 'armor', g.p.x, g.p.y).born = 0;
  step(g, .01);
  assert.equal(g.life, 0);
  assert.equal(g.status, 'lost');
  assert.equal(g.events.filter(e => e.type === 'end').length, 1);
  const before = JSON.stringify(g);
  step(g, .025);
  assert.equal(JSON.stringify(g), before);
});

test('surviving to 60 seconds succeeds once and freezes later simulation', () => {
  const g = encounter();
  g.t = ROUND - .01;
  step(g, .02);
  assert.equal(g.t, ROUND);
  assert.equal(g.status, 'won');
  assert.equal(g.life, 3);
  assert.equal(g.events.filter(e => e.type === 'end').length, 1);
  const before = JSON.stringify(g);
  step(g, .025);
  assert.equal(JSON.stringify(g), before);
});

test('damage after the 60-second boundary cannot turn an already survived round into loss', () => {
  const g = encounter();
  g.t = ROUND - .01;
  g.life = 1;
  g.p.inv = .02; // protection remains for .01s at the exact round boundary
  enemy(g, 'armor', g.p.x, g.p.y).born = 0;
  step(g, .025);
  assert.equal(g.status, 'won');
  assert.equal(g.life, 1);
  assert.equal(g.t, ROUND);
});

test('even a partial final simulation slice stops exactly at the round boundary', () => {
  const g = encounter();
  g.t = ROUND - .001;
  g.life = 1;
  g.p.inv = .002; // still protected by .001s when the round ends
  enemy(g, 'armor', g.p.x, g.p.y).born = 0;
  step(g, .025);
  assert.equal(g.status, 'won');
  assert.equal(g.life, 1);
  assert.equal(g.t, ROUND);
});

test('30, 60 and 120 Hz update sequences preserve the same elapsed round clock', () => {
  for (const hz of [30, 60, 120]) {
    const g = encounter();
    advance(g, 6, hz);
    assert.ok(Math.abs(g.t - 6) < 1e-8, `${hz} Hz produced t=${g.t}`);
  }
});

test('30, 45, 60 and 120 Hz preserve a completed dash landing position', () => {
  const results = [30, 45, 60, 120].map(hz => {
    const g = encounter(77, 200, 300);
    launch(g, .3, -1);
    advance(g, 1.2, hz);
    return { x: g.p.x, y: g.p.y, banks: g.banks, dash: g.p.dash, t: g.t };
  });
  for (const result of results) {
    assert.equal(result.dash, 0);
    assert.equal(result.banks, results[0].banks);
    assert.ok(Math.abs(result.x - results[0].x) < 1e-7);
    assert.ok(Math.abs(result.y - results[0].y) < 1e-7);
    assert.ok(Math.abs(result.t - 1.2) < 1e-8);
  }
});

test('aim preview at the left rim never predicts a wall behind an outward launch', () => {
  const g = encounter(77, B.l + 11, 350);
  const path = reflectedPath(g.p.x, g.p.y, -1, 0, 100);
  assert.equal(path.length, 3);
  assert.ok(Math.abs(path[1][0] - g.p.x) < 1e-8);
  assert.ok(Math.abs(path[1][1] - g.p.y) < 1e-8);
  assert.ok(path[2][0] > path[1][0]);
});

test('aim preview and real physics both turn inward on an exact corner bank', () => {
  const path = reflectedPath(100, 182, -1, -1, 100);
  assert.equal(path.length, 3);
  assert.ok(path[2][0] > path[1][0], 'corner bank must turn the horizontal direction inward');
  assert.ok(path[2][1] > path[1][1], 'corner bank must turn the vertical direction inward');
});

test('enemy cap holds under explicit spawns and automatic pressure waves', () => {
  const g = encounter();
  for (let i = 0; i < 100; i++) enemy(g, i % 2 ? 'armor' : 'soft', 80, 150);
  assert.ok(g.enemies.length <= 26);
  g.spawnAt = 0;
  g.t = 40;
  for (let i = 0; i < 360; i++) {
    step(g, 1 / 60);
    assert.ok(g.enemies.length <= 26);
    inside(g);
  }
});
