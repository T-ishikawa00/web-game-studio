import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {bindInput} from '../src/common/input.js';
import {createStore, defaults, KEY} from '../src/common/store.js';
import {createGame} from '../src/games/lens.js';

const appSource = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');
const serverSource = await readFile(new URL('../tools/server.mjs', import.meta.url), 'utf8');

class FakeCanvas {
  constructor() {
    this.listeners = new Map();
    this.capture = null;
  }
  addEventListener(type, handler, options = {}) {
    const entry = {handler, active: true};
    const entries = this.listeners.get(type) || [];
    entries.push(entry);
    this.listeners.set(type, entries);
    options.signal?.addEventListener('abort', () => { entry.active = false; }, {once: true});
  }
  getBoundingClientRect() { return {left: 10, top: 20, width: 720, height: 720}; }
  setPointerCapture(id) { this.capture = id; }
  focus() {}
  emit(type, event = {}) {
    const calls = [];
    for (const entry of this.listeners.get(type) || []) {
      if (entry.active) calls.push(entry.handler({preventDefault() {}, ...event}));
    }
    return calls;
  }
}

test('input and game cancel lifecycle ignores stale up and disposed gestures', () => {
  const canvas = new FakeCanvas();
  const reports = [];
  const game = createGame({
    ctx: null,
    audio: {play() {}},
    settings: () => ({}),
    lang: () => 'en',
    onReport: report => reports.push(report)
  });
  game.reset();
  const input = bindInput(canvas, {
    down: point => game.pointer('down', point),
    move: (point, held) => game.pointer('move', {...point, held}),
    up: point => game.pointer('up', point),
    cancel: () => game.cancel(),
    key: key => game.key(key)
  });

  canvas.emit('pointerdown', {pointerId: 7, button: 0, clientX: 370, clientY: 320});
  assert.equal(canvas.capture, 7);
  assert.equal(game.snapshot().holding, true);
  canvas.emit('pointermove', {pointerId: 8, clientX: 500, clientY: 400});
  assert.equal(game.snapshot().aim.x, 360, 'a second pointer must not move the tracked frame');

  canvas.emit('pointercancel');
  canvas.emit('pointerup', {pointerId: 7, clientX: 370, clientY: 320});
  assert.equal(game.snapshot().film, 14, 'a stale release after OS/browser cancellation must not spend film');
  assert.equal(game.snapshot().holding, false);

  canvas.emit('pointerdown', {pointerId: 9, button: 0, clientX: 400, clientY: 340});
  input.cancel(); // The application uses this path when pausing or changing slices.
  canvas.emit('pointerup', {pointerId: 9, clientX: 400, clientY: 340});
  assert.equal(game.snapshot().film, 14, 'pause cancellation must not trigger a delayed shot after resume');
  assert.equal(game.snapshot().holding, false);

  input.dispose();
  canvas.emit('pointerdown', {pointerId: 10, button: 0, clientX: 500, clientY: 400});
  assert.equal(game.snapshot().holding, false);
  assert.ok(reports.length > 0, 'the game remains connected to its ordinary reporting callback');
});

test('save write is confirmed by a fresh read; future bytes survive ordinary writes', () => {
  const memory = {
    raw: null,
    getItem() { return this.raw; },
    setItem(key, value) { assert.equal(key, KEY); this.raw = value; },
    removeItem(key) { assert.equal(key, KEY); this.raw = null; }
  };
  const writer = createStore(memory);
  assert.equal(writer.update({bests: {lens: 2}, completed: ['lens']}), true);
  const reader = createStore(memory);
  assert.equal(reader.status, 'ready');
  assert.deepEqual(reader.state.bests, {lens: 2});
  assert.deepEqual(reader.state.completed, ['lens']);

  const raw = JSON.stringify({...defaults(), version: 2, futureField: 'retain'});
  memory.raw = raw;
  const future = createStore(memory);
  assert.equal(future.status, 'corrupt-preserved');
  assert.equal(future.update({language: 'en'}), false);
  assert.equal(future.backup(), raw);
  assert.equal(memory.raw, raw, 'ordinary updates must not overwrite a future save');
  assert.equal(future.reset(), true, 'explicit reset is the only operation that removes preserved bytes');
  assert.deepEqual(JSON.parse(memory.raw).bests, {});
  assert.ok(JSON.parse(memory.raw).resetGeneration);
});

test('failed reset write stays detectable and preserves the bytes', () => {
  const raw = JSON.stringify({...defaults(), bests: {lens: 6}});
  const storage = {
    raw,
    getItem() { return this.raw; },
    setItem() { throw Error('storage denied'); },
    removeItem() { throw Error('storage denied'); }
  };
  const store = createStore(storage);
  assert.equal(store.reset(), false);
  assert.equal(store.status, 'write-failed');
  assert.equal(store.backup(), raw);
  assert.equal(storage.raw, raw, 'a failed deletion must not be represented as a successful reset');
});

test('recorder stop, setup failure and pagehide release resources without late saves', () => {
  const recorderIndex = appSource.indexOf("$('record').addEventListener('click'");
  const reviewIndex = appSource.indexOf('\nconst review', recorderIndex);
  const recorder = appSource.slice(recorderIndex, reviewIndex);
  const onstopIndex = recorder.indexOf('recorder.onstop=');
  const onstopEnd = recorder.indexOf('};\n  recorder.start()', onstopIndex);
  const onstop = recorder.slice(onstopIndex, onstopEnd);
  const exitGuard = onstop.indexOf('if(capture.discard||pageLeaving||capture.epoch!==recordEpoch)');
  assert.ok(exitGuard >= 0, 'asynchronous stop must re-check page-exit/discard state');
  assert.ok(exitGuard < onstop.indexOf('URL.createObjectURL'), 'a page exit must prevent a late blob URL');
  assert.ok(exitGuard < onstop.indexOf("fetch('/__review/"), 'a page exit must prevent a late review upload');
  assert.ok(onstop.includes('for(const track of capture.stream?.getTracks()||[])track.stop();'));
  assert.ok(recorder.includes('capture.timer=setTimeout(()=>stopCapture(capture),20000)'));
  assert.ok(recorder.includes('if(capture.timer!==null){clearTimeout(capture.timer);capture.timer=null;}'));
  const catchBody = recorder.slice(recorder.lastIndexOf('catch(e)'));
  assert.ok(catchBody.includes('for(const track of capture.stream?.getTracks()||[])track.stop();'), 'constructor/start failures must release tracks already created');
  assert.ok(catchBody.includes("if(capture.recorder?.state==='recording'){try{capture.recorder.stop();}catch{}}"), 'a partially started recorder must also be stopped on setup failure');

  const pagehide = appSource.slice(appSource.indexOf("window.addEventListener('pagehide'"), appSource.indexOf("window.addEventListener('pageshow'"));
  assert.ok(pagehide.indexOf('pageLeaving=true') < pagehide.indexOf('stopCapture(recording,true)'));
  assert.ok(pagehide.includes('for(const controller of recordUploads)controller.abort()'));
  assert.ok(pagehide.includes('URL.revokeObjectURL(recordUrl);recordUrl=null;'));
  assert.ok(pagehide.includes("$('record-download').hidden=true;"));
});

test('review captures are user-triggered, review-gated and loopback-only', () => {
  assert.ok(appSource.includes("if(review&&!pageLeaving){"), 'recording upload requires review mode and a live page');
  assert.ok(appSource.includes("if(review){const b=document.createElement('button')"), 'frame capture button is only created in review mode');
  assert.equal((appSource.match(/\/__review\//g) || []).length, 2);
  assert.ok(serverSource.includes("server.listen(port,'127.0.0.1'"));
  assert.ok(serverSource.includes('req.headers.origin!=='));
  assert.ok(serverSource.includes('req.headers.host!=='));
});

test('failed reset stays in the dialog and reports that bytes remain', () => {
  const handlerStart = appSource.indexOf("$('reset-confirm').addEventListener('click'");
  const handlerEnd = appSource.indexOf('\nfunction releaseCapture', handlerStart);
  const handler = appSource.slice(handlerStart, handlerEnd);
  const failedBranch = handler.indexOf('if(!store.reset())');
  const returnIndex = handler.indexOf('return;', failedBranch);
  const closeIndex = handler.indexOf("$('reset-dialog').close()");
  assert.ok(failedBranch >= 0 && returnIndex > failedBranch);
  assert.ok(closeIndex > returnIndex, 'dialog close/reset work must happen only after a successful storage removal');
  assert.ok(handler.includes('Reset failed. The save has not been removed.'));
});
