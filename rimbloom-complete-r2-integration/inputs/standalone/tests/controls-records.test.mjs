import test from 'node:test';
import assert from 'node:assert/strict';
import { Controls } from '../src/input.mjs';
import { Records } from '../src/records.mjs';
import { W, H } from '../src/core.mjs';

// EventTarget/capture/storage mocks exercise the production modules directly.
// They are unit QA, not browser/touch-device or recorded gameplay evidence.
const OWN_KEY = 'rimbloom.full-r1.local-records.v1';
const BLANK = { version: 1, best: 0, bestChain: 0, lastScore: 0, runs: 0 };

function event(target, type, fields = {}) {
  const e = new Event(type, { cancelable: true });
  Object.assign(e, fields);
  target.dispatchEvent(e);
  return e;
}
function globals(t, windowValue, documentValue) {
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'window', { configurable: true, writable: true, value: windowValue });
  Object.defineProperty(globalThis, 'document', { configurable: true, writable: true, value: documentValue });
  t.after(() => {
    if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow); else delete globalThis.window;
    if (oldDocument) Object.defineProperty(globalThis, 'document', oldDocument); else delete globalThis.document;
  });
}
class Canvas extends EventTarget {
  constructor(doc) {
    super();
    this.doc = doc;
    this.captures = new Set();
    this.captureCalls = [];
    this.focusCalls = [];
    this.rect = { left: 100, top: 50, width: 270, height: 380 };
  }
  getBoundingClientRect() { return { ...this.rect }; }
  focus(options) { this.doc.activeElement = this; this.focusCalls.push(options); }
  setPointerCapture(id) { this.captures.add(id); this.captureCalls.push(['set', id]); }
  hasPointerCapture(id) { return this.captures.has(id); }
  releasePointerCapture(id) {
    this.captures.delete(id);
    this.captureCalls.push(['release', id]);
    // Synchronous loss is an intentionally strong ordering counterexample.
    event(this, 'lostpointercapture', { pointerId: id });
  }
}
function controlsFixture(t) {
  const win = new EventTarget(), doc = new EventTarget();
  doc.hidden = false;
  doc.activeElement = null;
  globals(t, win, doc);
  const canvas = new Canvas(doc);
  const state = { active: true, canAim: true, cooldown: 0, player: { x: 270, y: 550 },
    unlocks: 0, hidden: 0, pauses: 0, attempts: [], accepted: [] };
  const hooks = {
    active: () => state.active,
    activeOrPaused: () => true,
    canAim: () => state.canAim,
    cooldown: () => state.cooldown,
    player: () => state.player,
    unlock: () => { state.unlocks++; },
    hidden: () => { state.hidden++; state.active = false; },
    pause: () => { state.pauses++; state.active = false; },
    launch: (dx, dy, kind, lag) => {
      const shot = { dx, dy, kind, lag };
      state.attempts.push(shot);
      if (!state.active || !state.canAim || state.cooldown > 0) return false;
      state.accepted.push(shot);
      state.canAim = false;
      return true;
    }
  };
  const controls = new Controls(canvas, hooks);
  const pointer = (type, x, y, fields = {}) => event(canvas, type, {
    pointerId: 11, pointerType: 'touch', isPrimary: true, button: 0,
    clientX: canvas.rect.left + x / W * canvas.rect.width,
    clientY: canvas.rect.top + y / H * canvas.rect.height,
    ...fields
  });
  const key = (value, repeat = false) => event(win, 'keydown', { key: value, repeat });
  const keyup = value => event(win, 'keyup', { key: value });
  return { controls, state, canvas, win, doc, pointer, key, keyup };
}
function queue(f) {
  f.state.cooldown = .23;
  f.pointer('pointerdown', 200, 300);
  f.pointer('pointerup', 360, 300);
  assert.ok(f.controls.pending);
  assert.equal(f.state.accepted.length, 0);
}
function near(value, expected) { assert.ok(Math.abs(value - expected) < 1e-10, value + ' vs ' + expected); }
function storage(entries = {}) {
  const map = new Map(Object.entries(entries)), calls = [];
  return {
    map, calls,
    getItem(key) { calls.push(['get', key]); return map.get(key) ?? null; },
    setItem(key, value) { calls.push(['set', key, value]); map.set(key, String(value)); },
    removeItem(key) { calls.push(['remove', key]); map.delete(key); },
    clear() { calls.push(['clear']); throw new Error('Global storage clear is forbidden by this fixture'); }
  };
}

test('pointer aim belongs to one primary pointer; secondary move/up cannot steal or fire it', t => {
  const f = controlsFixture(t);
  f.pointer('pointerdown', 200, 300, { isPrimary: false, pointerId: 22 });
  assert.equal(f.controls.aim, null);
  const down = f.pointer('pointerdown', 200, 300);
  assert.equal(down.defaultPrevented, true);
  assert.equal(f.controls.aim.id, 11);
  f.pointer('pointerdown', 420, 420, { pointerId: 22 });
  f.pointer('pointermove', 420, 420, { pointerId: 22 });
  f.pointer('pointerup', 420, 420, { pointerId: 22 });
  assert.equal(f.controls.aim.id, 11);
  near(f.controls.aim.x, 200);
  near(f.controls.aim.y, 300);
  assert.equal(f.state.accepted.length, 0);
  assert.equal(f.state.unlocks, 1);
  assert.deepEqual(f.canvas.captureCalls, [['set', 11]]);
});

test('inactive, active-dash, outside-arena and non-left mouse downs do not capture or unlock', t => {
  const f = controlsFixture(t);
  f.state.active = false;
  f.pointer('pointerdown', 200, 300);
  f.state.active = true;
  f.state.canAim = false;
  f.pointer('pointerdown', 200, 300);
  f.state.canAim = true;
  f.pointer('pointerdown', 29, 300);
  f.pointer('pointerdown', 200, 111);
  f.pointer('pointerdown', 511, 300);
  f.pointer('pointerdown', 200, 701);
  f.pointer('pointerdown', 200, 300, { pointerType: 'mouse', button: 2 });
  assert.equal(f.controls.aim, null);
  assert.equal(f.state.unlocks, 0);
  assert.equal(f.canvas.focusCalls.length, 0);
  assert.equal(f.canvas.captureCalls.length, 0);
});

test('pointerup uses its final coordinate and normal lost capture cannot erase the released shot', t => {
  const f = controlsFixture(t);
  f.pointer('pointerdown', 200, 300, { pointerType: 'mouse' });
  f.pointer('pointermove', 240, 400, { pointerType: 'mouse' });
  f.pointer('pointerup', 360, 300, { pointerType: 'mouse' });
  assert.equal(f.state.accepted.length, 1);
  near(f.state.accepted[0].dx, 90);
  near(f.state.accepted[0].dy, -250);
  assert.equal(f.state.accepted[0].kind, 'mouse');
  assert.equal(f.controls.aim, null);
  assert.equal(f.controls.pending, null);
  assert.equal(f.canvas.hasPointerCapture(11), false);
  f.pointer('pointerup', 480, 150, { pointerType: 'mouse' });
  assert.equal(f.state.accepted.length, 1, 'duplicate pointerup cannot launch again');
});

test('pointer cancel or unexpected capture loss before release cancels without firing', t => {
  const f = controlsFixture(t);
  for (const type of ['pointercancel', 'lostpointercapture']) {
    f.pointer('pointerdown', 200, 300);
    event(f.canvas, type, { pointerId: 22 });
    assert.ok(f.controls.aim, 'another pointer cancellation is ignored');
    event(f.canvas, type, { pointerId: 11 });
    assert.equal(f.controls.aim, null);
    f.pointer('pointerup', 360, 300);
  }
  assert.equal(f.state.attempts.length, 0);
  assert.equal(f.state.accepted.length, 0);
  assert.equal(f.controls.pending, null);
});

test('cooldown release queues exactly one shot and normal late lost capture preserves it', t => {
  const f = controlsFixture(t);
  queue(f);
  const pending = f.controls.pending;
  event(f.canvas, 'lostpointercapture', { pointerId: 11 });
  assert.equal(f.controls.pending, pending);
  f.pointer('pointerdown', 420, 500, { pointerId: 22 });
  assert.equal(f.controls.aim, null, 'a second pointer gesture cannot overwrite the queued shot');
  f.controls.update();
  f.state.cooldown = .1;
  f.controls.update();
  assert.equal(f.state.attempts.length, 1);
  f.state.cooldown = 0;
  f.state.canAim = false;
  f.controls.update();
  assert.equal(f.state.accepted.length, 0);
  f.state.canAim = true;
  f.controls.update();
  assert.equal(f.state.accepted.length, 1);
  near(f.state.accepted[0].dx, 90);
  near(f.state.accepted[0].dy, -250);
  assert.equal(f.state.accepted[0].kind, 'touch');
  assert.ok(f.state.accepted[0].lag >= 0);
  f.controls.update();
  f.controls.update();
  assert.equal(f.state.accepted.length, 1);
  assert.equal(f.state.attempts.length, 2);
  assert.equal(f.controls.pending, null);
});

test('pending pointer intent suppresses keyboard guide/fire and consumes scrolling keys', t => {
  const f = controlsFixture(t);
  queue(f);
  const pending = f.controls.pending;
  for (const key of ['d', 'ArrowUp', ' ', 'Enter']) {
    const e = f.key(key);
    assert.equal(e.defaultPrevented, true, 'queued game key must not scroll the page: ' + key);
    assert.equal(f.controls.pending, pending, 'keyboard cannot overwrite pending release');
    assert.equal(f.controls.visibleAim(), null, 'guide must agree with the existing queued direction');
  }
  assert.equal(f.controls.keys.size, 0);
  assert.equal(f.state.attempts.length, 1);
  f.state.cooldown = 0;
  f.controls.update();
  assert.equal(f.state.accepted.length, 1);
  near(f.state.accepted[0].dx, 90);
  near(f.state.accepted[0].dy, -250);
  assert.equal(f.state.accepted[0].kind, 'touch');
});

for (const cancellation of ['clear', 'blur', 'hidden', 'escape']) {
  test('queued shot cannot survive ' + cancellation + ' into a later resumed/restarted run', t => {
    const f = controlsFixture(t);
    queue(f);
    f.controls.keys.add('d');
    if (cancellation === 'clear') f.controls.clear();
    if (cancellation === 'blur') event(f.win, 'blur');
    if (cancellation === 'hidden') { f.doc.hidden = true; event(f.doc, 'visibilitychange'); }
    if (cancellation === 'escape') f.key('Escape');
    assert.equal(f.controls.pending, null);
    assert.equal(f.controls.aim, null);
    assert.equal(f.controls.keys.size, 0);
    if (cancellation === 'blur' || cancellation === 'hidden') assert.equal(f.state.hidden, 1);
    if (cancellation === 'escape') assert.equal(f.state.pauses, 1);
    f.state.active = true;
    f.state.canAim = true;
    f.state.cooldown = 0;
    f.controls.update();
    assert.equal(f.state.accepted.length, 0);
  });
}

test('inactive update discards queued intent but a visible-only event preserves it', t => {
  const f = controlsFixture(t);
  queue(f);
  const before = f.controls.pending;
  event(f.doc, 'visibilitychange');
  assert.equal(f.controls.pending, before);
  assert.equal(f.state.hidden, 0);
  f.state.active = false;
  f.controls.update();
  assert.equal(f.controls.pending, null);
  f.state.active = true;
  f.state.cooldown = 0;
  f.controls.update();
  assert.equal(f.state.accepted.length, 0);
});

test('clear releases active capture safely even when release synchronously emits capture loss', t => {
  const f = controlsFixture(t);
  f.pointer('pointerdown', 200, 300);
  f.controls.keys.add('w');
  f.controls.clear();
  assert.deepEqual(f.canvas.captureCalls, [['set', 11], ['release', 11]]);
  assert.equal(f.controls.aim, null);
  assert.equal(f.controls.keys.size, 0);
  assert.equal(f.canvas.captures.size, 0);
  assert.equal(f.state.accepted.length, 0);
});

test('Space launches the default upward direction once; repeat Space and Enter do not fire', t => {
  const f = controlsFixture(t);
  f.canvas.focus({ preventScroll: true });
  f.key(' ', true);
  f.key('Enter', true);
  assert.equal(f.state.accepted.length, 0);
  const e = f.key(' ');
  assert.equal(e.defaultPrevented, true);
  assert.equal(f.state.accepted.length, 1);
  near(f.state.accepted[0].dx, 0);
  near(f.state.accepted[0].dy, -1);
  assert.equal(f.state.accepted[0].kind, 'keyboard');
  f.state.canAim = true;
  f.key(' ', true);
  f.key('Enter', true);
  assert.equal(f.state.accepted.length, 1);
});

test('all eight keyboard directions launch and normalized diagonal aim is visible without moving the player', t => {
  const f = controlsFixture(t);
  f.canvas.focus({ preventScroll: true });
  const samples = [
    [['ArrowUp'], 0, -1], [['d'], 1, 0], [['ArrowDown'], 0, 1], [['A'], -1, 0],
    [['w', 'd'], 1, -1], [['d', 's'], 1, 1], [['s', 'a'], -1, 1], [['a', 'w'], -1, -1]
  ];
  for (const [keys, dx, dy] of samples) {
    f.controls.clear();
    f.state.canAim = true;
    keys.forEach(k => f.key(k));
    const aim = f.controls.visibleAim(), length = Math.hypot(dx, dy);
    near(aim.x, f.state.player.x + dx / length * 240);
    near(aim.y, f.state.player.y + dy / length * 240);
    assert.deepEqual(f.state.player, { x: 270, y: 550 });
    keys.forEach(k => f.keyup(k));
    assert.equal(f.controls.keys.size, 0);
    const count = f.state.accepted.length;
    f.key('Enter');
    assert.equal(f.state.accepted.length, count + 1, 'direction ' + keys.join('+'));
    near(f.state.accepted.at(-1).dx, dx / length);
    near(f.state.accepted.at(-1).dy, dy / length);
  }
});

test('keyboard does not hijack pointer aim or an unrelated focused element', t => {
  const f = controlsFixture(t);
  f.doc.activeElement = { id: 'settings-button' };
  f.key('d');
  f.key(' ');
  assert.equal(f.controls.aim, null);
  assert.equal(f.state.accepted.length, 0);
  f.pointer('pointerdown', 200, 300);
  f.key('w');
  f.key(' ');
  assert.equal(f.controls.aim.id, 11);
  assert.equal(f.state.accepted.length, 0);
});

test('zero/invalid release and a busy dash cannot create a pending shot', t => {
  const f = controlsFixture(t);
  for (const [dx, dy] of [[0, 0], [NaN, 1], [1, Infinity], [.99, 0]]) {
    assert.equal(f.controls.release(dx, dy, 'touch'), false);
  }
  f.state.canAim = false;
  assert.equal(f.controls.release(90, -250, 'touch'), false);
  assert.equal(f.controls.pending, null);
  assert.equal(f.state.attempts.length, 0);
});

test('blank Records only reads and writes its own isolated versioned key', () => {
  const s = storage({ unrelated: 'keep' });
  const r = new Records(s);
  assert.deepEqual(r.data, BLANK);
  assert.equal(r.available, true);
  assert.deepEqual(s.calls, [['get', OWN_KEY]]);
  r.result(450, 4);
  assert.deepEqual(JSON.parse(s.map.get(OWN_KEY)), { version: 1, best: 450, bestChain: 4, lastScore: 450, runs: 1 });
  assert.equal(s.map.get('unrelated'), 'keep');
  assert.ok(s.calls.every(call => call[1] === OWN_KEY));
});

test('valid saved Records whitelist fields and cannot copy prototype or extra data', () => {
  const text = '{"version":1,"best":600,"bestChain":5,"lastScore":420,"runs":7,"__proto__":{"polluted":true},"extra":"discard"}';
  const s = storage({ [OWN_KEY]: text });
  const r = new Records(s);
  assert.deepEqual(r.data, { version: 1, best: 600, bestChain: 5, lastScore: 420, runs: 7 });
  assert.equal(Object.getPrototypeOf(r.data), Object.prototype);
  assert.equal(r.data.extra, undefined);
  assert.equal({}.polluted, undefined);
  assert.equal(s.calls.length, 1, 'valid data is not rewritten on constructor');
});

test('corrupt, wrong-version, missing, fractional, negative and excessive Records fall back to blank', () => {
  const valid = { version: 1, best: 450, bestChain: 4, lastScore: 420, runs: 2 };
  const objects = [null, true, [], { ...valid, version: 2 }, { ...valid, version: '1' },
    { ...valid, best: -1 }, { ...valid, best: .5 }, { ...valid, best: '450' },
    { ...valid, lastScore: -1 }, { ...valid, lastScore: 1e9 + 1 },
    { ...valid, best: Number.MAX_SAFE_INTEGER + 1 }, { ...valid, best: 1e9 + 1 },
    { ...valid, bestChain: -1 }, { ...valid, bestChain: 27 }, { ...valid, bestChain: 1.5 },
    { ...valid, runs: -1 }, { ...valid, runs: 1e6 + 1 }, { ...valid, runs: '2' },
    { version: 1, best: 450, bestChain: 4, runs: 2 }];
  for (const text of ['{broken-json', 'null', '"not-a-record"', ...objects.map(o => JSON.stringify(o))]) {
    const s = storage({ [OWN_KEY]: text }), r = new Records(s);
    assert.deepEqual(r.data, BLANK, 'bad stored value ' + text);
    assert.equal(s.calls.length, 1, 'invalid storage read must not write/delete unrelated state');
  }
});

test('contradictory saved best below last score cannot produce a false best display', () => {
  const s = storage({ [OWN_KEY]: JSON.stringify({ version: 1, best: 10, bestChain: 4, lastScore: 450, runs: 2 }) });
  assert.deepEqual(new Records(s).data, BLANK);
});

test('Records enforce the small text boundary at 399/400 characters', () => {
  const value = { version: 1, best: 450, bestChain: 4, lastScore: 420, runs: 2 };
  const text = JSON.stringify(value);
  assert.deepEqual(new Records(storage({ [OWN_KEY]: text.padEnd(399) })).data, value);
  assert.deepEqual(new Records(storage({ [OWN_KEY]: text.padEnd(400) })).data, BLANK);
});

test('invalid result inputs do not count runs or modify stored and in-memory records', () => {
  const s = storage(), r = new Records(s);
  const before = JSON.stringify(r.data);
  for (const [score, chain] of [[-1, 0], [.5, 1], [NaN, 1], [Infinity, 1], ['100', 1], [100, '1'],
    [1e9 + 1, 1], [100, -1], [100, 27], [100, .5], [100, undefined]]) {
    r.result(score, chain);
    assert.equal(JSON.stringify(r.data), before);
  }
  assert.equal(s.calls.filter(call => call[0] === 'set').length, 0);
});

test('zero scores count valid runs, best/chain remain monotonic and roundtrip is exact', () => {
  const s = storage(), r = new Records(s);
  r.result(450, 5);
  r.result(180, 2);
  r.result(0, 0);
  assert.deepEqual(r.data, { version: 1, best: 450, bestChain: 5, lastScore: 0, runs: 3 });
  assert.deepEqual(new Records(s).data, r.data);
});

test('run counter saturates while later best score and chain still improve', () => {
  const s = storage({ [OWN_KEY]: JSON.stringify({ version: 1, best: 450, bestChain: 5, lastScore: 420, runs: 1e6 }) });
  const r = new Records(s);
  r.result(1e9, 26);
  r.result(550, 3);
  assert.deepEqual(r.data, { version: 1, best: 1e9, bestChain: 26, lastScore: 550, runs: 1e6 });
});

test('quota errors preserve session records, mark fallback and never escape result()', () => {
  const s = storage();
  s.setItem = (key, value) => { s.calls.push(['set-denied', key, value]); throw new Error('QuotaExceededError'); };
  const r = new Records(s);
  assert.equal(r.available, true);
  assert.doesNotThrow(() => r.result(450, 4));
  assert.equal(r.available, false);
  assert.deepEqual(r.data, { version: 1, best: 450, bestChain: 4, lastScore: 450, runs: 1 });
  assert.doesNotThrow(() => r.result(180, 2));
  assert.deepEqual(r.data, { version: 1, best: 450, bestChain: 4, lastScore: 180, runs: 2 });
  assert.ok(s.calls.every(call => call[1] === OWN_KEY));
});

test('denied storage getter or read uses memory records without throwing', t => {
  const win = {};
  Object.defineProperty(win, 'localStorage', { get() { throw new Error('SecurityError'); } });
  globals(t, win, {});
  const denied = new Records();
  assert.equal(denied.available, false);
  assert.doesNotThrow(() => denied.result(450, 4));
  assert.equal(denied.data.best, 450);
  const readDenied = new Records({ getItem() { throw new Error('read denied'); } });
  assert.equal(readDenied.available, false);
  assert.doesNotThrow(() => readDenied.result(180, 2));
  assert.equal(readDenied.data.best, 180);
});

test('explicit memory-only records support scoring and own-data reset', () => {
  const r = new Records(null);
  assert.equal(r.available, false);
  r.result(450, 4);
  assert.equal(r.data.runs, 1);
  r.reset();
  assert.deepEqual(r.data, BLANK);
});

test('reset removes only the owned key, preserving all unrelated storage values', () => {
  const s = storage({ unrelated: 'keep', 'another-origin-example': 'keep-too' });
  const r = new Records(s);
  r.result(450, 4);
  r.reset();
  assert.deepEqual(r.data, BLANK);
  assert.equal(s.map.has(OWN_KEY), false);
  assert.equal(s.map.get('unrelated'), 'keep');
  assert.equal(s.map.get('another-origin-example'), 'keep-too');
  assert.equal(s.calls.filter(call => call[0] === 'remove').length, 1);
  assert.equal(s.calls.some(call => call[0] === 'clear'), false);
  assert.ok(s.calls.every(call => call[1] === OWN_KEY));
});

test('denied reset clears session data and reports unavailable persistence without global clear', () => {
  const s = storage({ unrelated: 'keep' });
  s.removeItem = key => { s.calls.push(['remove-denied', key]); throw new Error('remove denied'); };
  const r = new Records(s);
  r.result(450, 4);
  assert.doesNotThrow(() => r.reset());
  assert.deepEqual(r.data, BLANK);
  assert.equal(r.available, false);
  assert.equal(s.map.get('unrelated'), 'keep');
  assert.equal(s.calls.some(call => call[0] === 'clear'), false);
});
