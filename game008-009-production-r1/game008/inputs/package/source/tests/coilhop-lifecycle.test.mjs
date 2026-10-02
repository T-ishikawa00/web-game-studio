import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { COURSES } from '../public/coilhop/courses.js';
import {
  GRAVITY, MAX_CHARGE_SECONDS, FOOT_RADIUS, chargePower, launchVelocity,
  advanceBallistic, landingCrossing, padAt,
} from '../public/coilhop/physics.js';
import { createStore } from '../public/shared/save.js';

const SAVE_KEY = 'tinlumo:game008:coilhop:v1';
const gameSource = await readFile(new URL('../public/coilhop/game.js', import.meta.url), 'utf8');

class MemoryStorage {
  data = new Map();
  failSet = null;

  getItem(key) { return this.data.has(key) ? this.data.get(key) : null; }
  setItem(key, value) {
    this.failSet?.(key, value);
    this.data.set(String(key), String(value));
  }
  removeItem(key) { this.data.delete(key); }
  clear() { this.data.clear(); }
}

class FakeElement {
  constructor(id, document, tagName = 'div') {
    this.id = id;
    this.ownerDocument = document;
    this.tagName = tagName.toUpperCase();
    this.dataset = {};
    this.style = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.children = [];
    this.textContent = '';
    this.hidden = false;
    this.disabled = false;
    this.tabIndex = -1;
    this.className = '';
  }
  addEventListener(type, callback) {
    const list = this.listeners.get(type) ?? [];
    list.push(callback);
    this.listeners.set(type, list);
  }
  dispatch(type, event = {}) {
    const fullEvent = {
      type,
      target: this,
      currentTarget: this,
      preventDefault() { this.defaultPrevented = true; },
      ...event,
    };
    for (const listener of this.listeners.get(type) ?? []) listener(fullEvent);
    return fullEvent;
  }
  focus() {
    const intrinsicallyFocusable = ['BUTTON', 'A', 'INPUT', 'SELECT'].includes(this.tagName);
    if (this.tabIndex >= 0 || intrinsicallyFocusable) this.ownerDocument.activeElement = this;
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  closest(selector) {
    const selectors = selector.split(',').map((value) => value.trim().toUpperCase());
    return selectors.includes(this.tagName) ? this : null;
  }
  getContext() { return { canvas: this }; }
  getBoundingClientRect() { return { width: 800, height: 520 }; }
  setPointerCapture(id) { this.capturedPointers ??= new Set(); this.capturedPointers.add(id); }
  hasPointerCapture(id) { return this.capturedPointers?.has(id) ?? false; }
  releasePointerCapture(id) { this.capturedPointers?.delete(id); }
  replaceChildren(...children) { this.children = [...children]; }
  append(child) { this.children.push(child); }
  querySelectorAll(selector) {
    if (selector === 'button:not(:disabled)') return this.children.filter((child) => child.tagName === 'BUTTON' && !child.disabled);
    return [];
  }
  contains(element) { return element === this || this.children.includes(element); }
}

class FakeDocument {
  constructor() {
    this.listeners = new Map();
    this.elements = new Map();
    this.activeElement = null;
    this.hidden = false;
    this.documentElement = new FakeElement('documentElement', this);
    this.body = new FakeElement('body', this);
    for (const id of [
      'gameCanvas', 'gameFrame', 'saveNote', 'gameStatus', 'chargeFill', 'courseMap', 'courseList',
      'mapClose', 'overlay', 'overlayTitle', 'overlayCopy', 'overlayAction', 'overlaySecondary',
      'overlayFootnote', 'pauseButton', 'languageButton', 'soundButton', 'motionButton', 'resetButton',
      'mapButton', 'homeLink', 'courseName', 'hopLabel', 'beaconLabel', 'chargeValue', 'chargeHint',
      'chargeAccessible', 'tagline', 'overlayEyebrow', 'mapKicker', 'mapTitle', 'mapCopy', 'mapFootnote',
      'footerText', 'footerDetail',
    ]) this.elements.set(id, new FakeElement(id, this, id === 'gameCanvas' ? 'canvas' : 'div'));
    for (const id of ['overlayAction', 'overlaySecondary', 'pauseButton', 'languageButton', 'soundButton', 'motionButton', 'resetButton', 'mapButton', 'mapClose']) {
      this.elements.get(id).tagName = 'BUTTON';
    }
    this.elements.get('homeLink').tagName = 'A';
  }
  getElementById(id) {
    if (!this.elements.has(id)) this.elements.set(id, new FakeElement(id, this));
    return this.elements.get(id);
  }
  addEventListener(type, callback) {
    const list = this.listeners.get(type) ?? [];
    list.push(callback);
    this.listeners.set(type, list);
  }
  dispatch(type, event = {}) {
    const fullEvent = { type, target: this, currentTarget: this, preventDefault() { this.defaultPrevented = true; }, ...event };
    for (const listener of this.listeners.get(type) ?? []) listener(fullEvent);
    return fullEvent;
  }
  querySelector(selector) {
    if (selector.startsWith('.')) {
      if (!this.elements.has(selector)) this.elements.set(selector, new FakeElement(selector, this));
      return this.elements.get(selector);
    }
    return null;
  }
  createElement(tagName) { return new FakeElement('', this, tagName); }
}

function makeHarness({ storage = new MemoryStorage(), search = '' } = {}) {
  const document = new FakeDocument();
  const windowListeners = new Map();
  const window = {
    addEventListener(type, callback) {
      const list = windowListeners.get(type) ?? [];
      list.push(callback);
      windowListeners.set(type, list);
    },
    dispatch(type, event = {}) {
      for (const listener of windowListeners.get(type) ?? []) listener({ type, ...event });
    },
  };
  const location = { search, href: 'https://local.invalid/coilhop/' };
  let now = 1000;
  let nextFrame;
  const context = vm.createContext({
    console,
    document,
    window,
    location,
    localStorage: storage,
    URL,
    URLSearchParams,
    Math,
    Number,
    Object,
    Array,
    Set,
    Map,
    String,
    Boolean,
    Date,
    Error,
    TypeError,
    DOMException,
    structuredClone,
    performance: { now: () => now },
    matchMedia: () => ({ matches: false }),
    devicePixelRatio: 1,
    requestAnimationFrame(callback) { nextFrame = callback; return 1; },
    ResizeObserver: class { observe() {} },
    COURSES,
    GRAVITY,
    MAX_CHARGE_SECONDS,
    FOOT_RADIUS,
    chargePower,
    launchVelocity,
    advanceBallistic,
    landingCrossing,
    padAt,
    // Bridge game-realm literals into the real store's realm while retaining its behavior.
    createStore: (key, defaults, options) => {
      const actual = createStore(key, JSON.parse(JSON.stringify(defaults)), options ?? { storage });
      return {
        read: () => actual.read(),
        reset: () => actual.reset(),
        write: (patch) => actual.write(JSON.parse(JSON.stringify(patch))),
      };
    },
    render() {},
    createSynth() { return { unlock() {}, tone() {}, stop() {}, stream() { return null; } }; },
    attachCapture() {},
  });
  const executable = gameSource
    .replace(/^import .*;\r?\n/gm, '')
    + '\n globalThis.__gameTest = { primaryAction, secondaryAction, clearCourse, startCourse, landTo(id) { if (!targetIds.includes(id)) throw new Error(`Pad ${id} is not a current route target.`); const pad = padById(id), position = positionOf(pad); land(pad, position, { x: position.x, fraction: 0 }); }, get state() { return { mode, pausedMode, courseIndex, currentId, checkpointId, hops, falls, time, runSeconds, generation, storageReason, record: structuredClone(record) }; } };';
  new vm.Script(executable, { filename: 'public/coilhop/game.js' }).runInContext(context);

  const $ = (id) => document.getElementById(id);
  function frame(seconds = 0.04) {
    now += seconds * 1000;
    const callback = nextFrame;
    assert.equal(typeof callback, 'function', 'game loop should have scheduled a frame');
    nextFrame = null;
    callback(now);
  }
  function frames(count, seconds = 0.04) { for (let index = 0; index < count; index += 1) frame(seconds); }
  function start() { $('overlayAction').onclick(); }
  function key(code, type, target = $('gameCanvas'), extra = {}) {
    return document.dispatch(type, { code, key: code === 'Space' ? ' ' : code, target, repeat: false, ...extra });
  }
  return { storage, document, window, $, frame, frames, start, key, game: context.__gameTest };
}

function pointer(canvas, type, pointerId) {
  return canvas.dispatch(type, { pointerId, isPrimary: true, button: 0 });
}

test('actual game source charges, releases, and reaches its authored first landing by pointer', () => {
  const app = makeHarness();
  app.start();
  assert.equal(app.game.state.mode, 'ready');
  pointer(app.$('gameCanvas'), 'pointerdown', 7);
  assert.equal(app.game.state.mode, 'charging');
  app.frames(14); // 0.56 s, close to course 1 authored 0.46 * MAX_CHARGE_SECONDS.
  pointer(app.$('gameCanvas'), 'pointerup', 7);
  assert.equal(app.game.state.mode, 'flying');
  for (let count = 0; count < 120 && app.game.state.currentId === 0; count += 1) app.frame();
  assert.equal(app.game.state.currentId, 1, 'actual simulation should land on course 1 pad 1');
  assert.equal(app.game.state.mode, 'ready');
});

test('pausing a held pointer cancels it; stale up is ignored and a fresh pointer can charge', () => {
  const app = makeHarness();
  app.start();
  pointer(app.$('gameCanvas'), 'pointerdown', 11);
  assert.equal(app.game.state.mode, 'charging');
  app.$('pauseButton').onclick();
  assert.equal(app.game.state.mode, 'paused');
  pointer(app.$('gameCanvas'), 'pointerup', 11);
  assert.equal(app.game.state.mode, 'paused');
  app.$('pauseButton').onclick();
  assert.equal(app.game.state.mode, 'ready');
  pointer(app.$('gameCanvas'), 'pointerdown', 12);
  assert.equal(app.game.state.mode, 'charging');
  pointer(app.$('gameCanvas'), 'pointerup', 12);
  assert.equal(app.game.state.mode, 'flying');
});

for (const cancelEvent of ['pointercancel', 'lostpointercapture']) {
  test(`${cancelEvent} clears a held charge and ignores the subsequent pointer-up`, () => {
    const app = makeHarness();
    app.start();
    const canvas = app.$('gameCanvas');
    pointer(canvas, 'pointerdown', 21);
    assert.equal(app.game.state.mode, 'charging');
    pointer(canvas, cancelEvent, 21);
    assert.equal(app.game.state.mode, 'ready');
    pointer(canvas, 'pointerup', 21);
    assert.equal(app.game.state.mode, 'ready');
    pointer(canvas, 'pointerdown', 22);
    assert.equal(app.game.state.mode, 'charging');
  });
}

test('settings makes the canvas focusable and Space down/up follows the keyboard flight path', () => {
  const app = makeHarness();
  app.start();
  const canvas = app.$('gameCanvas');
  assert.equal(canvas.tabIndex, 0);
  assert.equal(app.document.activeElement, canvas);
  const down = app.key('Space', 'keydown', canvas);
  assert.equal(down.defaultPrevented, true);
  assert.equal(app.game.state.mode, 'charging');
  app.frames(14);
  const up = app.key('Space', 'keyup', canvas);
  assert.equal(up.defaultPrevented, true);
  assert.equal(app.game.state.mode, 'flying');
});

test('quota failure allows session-only completion/unlock and later writes retain the full in-memory maps', () => {
  const storage = new MemoryStorage();
  storage.failSet = (key) => { if (key === SAVE_KEY) throw new DOMException('full', 'QuotaExceededError'); };
  const app = makeHarness({ storage });
  app.start();
  app.game.clearCourse(); // Exercise the actual completion/save path without making a live-play claim.
  assert.equal(app.game.state.record.completed['course-01'], true);
  app.game.startCourse(1);
  assert.equal(app.game.state.courseIndex, 1, 'in-memory completion should unlock the next authored course');
  storage.failSet = null;
  app.$('languageButton').onclick();
  assert.equal(app.game.state.record.completed['course-01'], true);
  assert.equal(JSON.parse(storage.getItem(SAVE_KEY)).completed['course-01'], true);
});

test('corrupt save remains byte-for-byte while source completion unlocks the next course in memory', () => {
  const storage = new MemoryStorage();
  const raw = '{"version":';
  storage.setItem(SAVE_KEY, raw);
  const app = makeHarness({ storage });
  app.start();
  app.game.clearCourse();
  assert.equal(storage.getItem(SAVE_KEY), raw);
  assert.equal(app.$('saveNote').hidden, false);
  app.game.startCourse(1);
  assert.equal(app.game.state.courseIndex, 1);
  assert.equal(storage.getItem(SAVE_KEY), raw);
});

test('both authored course-05 route choices record separate completion keys at the source landing boundary', () => {
  const course = COURSES[4];
  const fork = course.pads.find((pad) => pad.next.length === 2);
  assert.ok(fork);
  for (const selected of fork.next) {
    const storage = new MemoryStorage();
    storage.setItem(SAVE_KEY, JSON.stringify({
      version: 1,
      generation: 0,
      completed: { 'course-01': true, 'course-02': true, 'course-03': true, 'course-04': true },
      best: {},
      settings: { lang: 'en', sound: true, reducedMotion: false, course: 4 },
    }));
    const app = makeHarness({ storage });
    app.start();
    assert.equal(app.game.state.courseIndex, 4);

    let current = 0;
    while (current !== fork.id) {
      const next = course.pads.find((pad) => pad.id === current).next[0];
      app.game.landTo(next);
      current = next;
    }
    app.game.landTo(selected);
    current = selected;
    while (!course.pads.find((pad) => pad.id === current).final) {
      const next = course.pads.find((pad) => pad.id === current).next[0];
      app.game.landTo(next);
      current = next;
    }

    const completed = JSON.parse(storage.getItem(SAVE_KEY)).completed;
    assert.equal(completed['course-05'], true);
    assert.equal(completed[`course-05:path:${fork.id}:${selected}`], true);
    assert.equal(completed[`course-05:path:${fork.id}:${fork.next.find((id) => id !== selected)}`], undefined);
  }
});

test('the eighth-course final landing records summit completion and the best zero-fall medal', () => {
  const storage = new MemoryStorage();
  const completed = Object.fromEntries(Array.from({ length: 7 }, (_, index) => [`course-${String(index + 1).padStart(2, '0')}`, true]));
  storage.setItem(SAVE_KEY, JSON.stringify({
    version: 1,
    generation: 0,
    completed,
    best: {},
    settings: { lang: 'en', sound: true, reducedMotion: false, course: 7 },
  }));
  const app = makeHarness({ storage });
  app.start();
  assert.equal(app.game.state.courseIndex, 7);
  let current = 0;
  while (!COURSES[7].pads.find((pad) => pad.id === current).final) {
    const next = COURSES[7].pads.find((pad) => pad.id === current).next[0];
    app.game.landTo(next);
    current = next;
  }
  const saved = JSON.parse(storage.getItem(SAVE_KEY));
  assert.equal(app.game.state.mode, 'finale');
  assert.equal(saved.completed['course-08'], true);
  assert.equal(saved.best['medal:course-08'], 3);
});

test('explicit reset advances generation and rejects a stale store writer', () => {
  const storage = new MemoryStorage();
  const staleTab = createStore(SAVE_KEY, {}, { storage });
  const app = makeHarness({ storage });
  app.start();
  pointer(app.$('gameCanvas'), 'pointerdown', 40);
  app.frames(3);
  pointer(app.$('gameCanvas'), 'pointerup', 40);
  app.frame();
  assert.equal(app.game.state.hops, 1);
  assert.ok(app.game.state.runSeconds > 0);
  app.$('resetButton').onclick();
  assert.equal(app.game.state.mode, 'reset');
  app.$('overlayAction').onclick();
  assert.equal(app.game.state.mode, 'menu');
  assert.equal(app.game.state.generation, 1);
  assert.equal(app.game.state.courseIndex, 0);
  assert.equal(app.game.state.currentId, 0);
  assert.equal(app.game.state.checkpointId, 0);
  assert.equal(app.game.state.hops, 0);
  assert.equal(app.game.state.falls, 0);
  assert.equal(app.game.state.time, 0);
  assert.equal(app.game.state.runSeconds, 0);
  assert.deepEqual(staleTab.write({ completed: { stale: true } }), { ok: false, reason: 'stale-generation' });
  assert.deepEqual(JSON.parse(storage.getItem(SAVE_KEY)).completed, {});
});

test('storage.clear at generation zero aborts the active charge and stale input cannot resume it', () => {
  const storage = new MemoryStorage();
  const app = makeHarness({ storage });
  app.start();
  pointer(app.$('gameCanvas'), 'pointerdown', 31);
  assert.equal(app.game.state.generation, 0);
  storage.clear();
  app.window.dispatch('storage', { key: null, newValue: null, oldValue: null });
  assert.equal(app.game.state.mode, 'external-reset');
  pointer(app.$('gameCanvas'), 'pointerup', 31);
  assert.equal(app.game.state.mode, 'external-reset');
  assert.equal(app.game.state.record.completed['course-01'], undefined);
  assert.equal(storage.getItem(SAVE_KEY), null, 'clear handling should not recreate a save from the stale active attempt');
});
