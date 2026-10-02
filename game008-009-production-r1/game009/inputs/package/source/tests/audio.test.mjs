import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AudioBank } from '../src/common/audio.js';

class Param {
  constructor(value = 0) { this.value = value; this.events = []; }
  setValueAtTime(value, time) { this.value = value; this.events.push(['set', value, time]); }
  setTargetAtTime(value, time, constant) { this.value = value; this.events.push(['target', value, time, constant]); }
  linearRampToValueAtTime(value, time) { this.events.push(['linear', value, time]); }
  exponentialRampToValueAtTime(value, time) { this.events.push(['exponential', value, time]); }
}

class Node {
  constructor() { this.connections = []; this.disconnectCalls = 0; }
  connect(node) { this.connections.push(node); return node; }
  disconnect() { this.disconnectCalls++; this.connections = []; }
}

class FakeContext {
  static latest;
  constructor() {
    FakeContext.latest = this;
    this.state = 'suspended';
    this.currentTime = 0;
    this.destination = new Node();
    this.created = [];
    this.tracks = [{ stopped: false, stop() { this.stopped = true; } }];
  }
  createGain() { const node = new Node(); node.gain = new Param(); this.created.push(node); return node; }
  createDynamicsCompressor() {
    const node = new Node();
    for (const name of ['threshold', 'knee', 'ratio', 'attack', 'release']) node[name] = new Param();
    this.compressor = node;
    return node;
  }
  createMediaStreamDestination() {
    const node = new Node();
    node.stream = { getTracks: () => this.tracks };
    this.streamDestination = node;
    return node;
  }
  createOscillator() {
    const node = new Node();
    node.frequency = new Param();
    node.start = (time) => { node.startTime = time; };
    node.stop = (time) => { node.stopTime = time; };
    this.created.push(node);
    return node;
  }
  resume() { this.state = 'running'; return Promise.resolve(); }
  suspend() { this.state = 'suspended'; return Promise.resolve(); }
  close() { this.state = 'closed'; this.closeCalls = (this.closeCalls || 0) + 1; return Promise.resolve(); }
}

function withAudioContext(callback) {
  const previous = globalThis.AudioContext;
  globalThis.AudioContext = FakeContext;
  try { return callback(); }
  finally {
    if (previous === undefined) delete globalThis.AudioContext;
    else globalThis.AudioContext = previous;
  }
}

test('AudioContext starts only after unlock, and mute suppresses scheduled cues', async () => withAudioContext(async () => {
  const bank = new AudioBank();
  bank.play('tap');
  assert.equal(FakeContext.latest, undefined);
  assert.equal(await bank.unlock(), true);
  const ctx = bank.ctx;
  assert.equal(ctx.state, 'running');
  assert.equal(ctx.created.filter((node) => node.frequency).length, 0);
  bank.settings(true, 0.45);
  bank.play('tap');
  assert.equal(ctx.created.filter((node) => node.frequency).length, 0);
  bank.settings(false, 0.45);
  bank.play('tap');
  assert.equal(ctx.created.filter((node) => node.frequency).length, 1);
  bank.dispose();
}));

test('settings clamp finite values and send the raised default through a compressor to both outputs', async () => withAudioContext(async () => {
  const bank = new AudioBank();
  bank.settings(false, 0.45);
  assert.equal(await bank.unlock(), true);
  const ctx = bank.ctx;
  assert.equal(bank.volume, 0.45);
  assert.equal(bank.master.gain.value, 0.45 * 0.65);
  assert.deepEqual(bank.master.connections, [ctx.compressor]);
  assert.deepEqual(ctx.compressor.connections, [ctx.destination, ctx.streamDestination]);
  assert.equal(ctx.compressor.threshold.value, -8);
  assert.equal(ctx.compressor.ratio.value, 20);
  bank.settings(false, Number.NaN);
  assert.equal(bank.volume, 0.45);
  bank.settings(false, -3);
  assert.equal(bank.volume, 0);
  bank.settings(false, 4);
  assert.equal(bank.volume, 1);
  bank.settings(true, 0.45);
  assert.equal(bank.master.gain.value, 0);
  bank.dispose();
}));

test('seven original event profiles remain procedural and transient nodes disconnect on ended', async () => withAudioContext(async () => {
  const bank = new AudioBank();
  await bank.unlock();
  const ctx = bank.ctx;
  const cases = [
    ['tap', 'sine', 360, 520, 0.09],
    ['impact', 'triangle', 170, 55, 0.17],
    ['success', 'sine', 660, 990, 0.27],
    ['fail', 'triangle', 180, 85, 0.4],
    ['step', 'sine', 420, 630, 0.14],
    ['finale', 'sine', 440, 880, 0.8],
    ['swish', 'triangle', 190, 370, 0.11]
  ];
  for (const [index, [kind, type, from, to, duration]] of cases.entries()) {
    ctx.currentTime = index * 0.1;
    bank.play(kind);
    const source = ctx.created.filter((node) => node.frequency).findLast((node) =>
      node.startTime === ctx.currentTime && node.frequency.events[1]?.[1] === to
    );
    assert.ok(source, `${kind} source scheduled`);
    assert.equal(source.type, type);
    assert.equal(source.frequency.events[0][1], from);
    assert.equal(source.frequency.events[1][1], to);
    assert.equal(source.stopTime, ctx.currentTime + duration + 0.01);
    const envelope = source.connections[0];
    source.onended();
    assert.equal(source.disconnectCalls, 1);
    assert.equal(envelope.disconnectCalls, 1);
  }
  assert.equal(ctx.created.filter((node) => node.frequency).length, 11);
  bank.dispose();
}));

test('constructor or resume failures disable sound without escaping into gameplay', async () => {
  const previous = globalThis.AudioContext;
  try {
    globalThis.AudioContext = class { constructor() { throw new Error('blocked'); } };
    const unavailable = new AudioBank();
    assert.equal(await unavailable.unlock(), false);
    assert.doesNotThrow(() => unavailable.play('tap'));
    globalThis.AudioContext = class extends FakeContext { resume() { return Promise.reject(new Error('gesture required')); } };
    const blocked = new AudioBank();
    assert.equal(await blocked.unlock(), false);
    assert.equal(blocked.active, false);
    assert.doesNotThrow(() => blocked.play('tap'));
    blocked.dispose();
  } finally {
    if (previous === undefined) delete globalThis.AudioContext;
    else globalThis.AudioContext = previous;
  }
});

test('older audio contexts without compression or stream capture keep local playback available', async () => {
  const previous = globalThis.AudioContext;
  class BasicContext extends FakeContext {
    createDynamicsCompressor() { throw new Error('not implemented'); }
    createMediaStreamDestination() { throw new Error('not implemented'); }
  }
  try {
    globalThis.AudioContext = BasicContext;
    const bank = new AudioBank();
    assert.equal(await bank.unlock(), true);
    assert.equal(bank.limiter, null);
    assert.equal(bank.stream, null);
    assert.deepEqual(bank.master.connections, [bank.ctx.destination]);
    bank.play('tap');
    assert.equal(bank.ctx.created.filter((node) => node.frequency).length, 1);
    bank.dispose();
  } finally {
    if (previous === undefined) delete globalThis.AudioContext;
    else globalThis.AudioContext = previous;
  }
});

test('dispose during resume cannot reactivate the bank and releases destination tracks and graph nodes', async () => {
  const previous = globalThis.AudioContext;
  let releaseResume;
  class DeferredContext extends FakeContext {
    resume() {
      return new Promise((resolve) => {
        releaseResume = () => {
          if (this.state !== 'closed') this.state = 'running';
          resolve();
        };
      });
    }
  }
  try {
    globalThis.AudioContext = DeferredContext;
    const bank = new AudioBank();
    const unlocking = bank.unlock();
    const ctx = bank.ctx;
    bank.dispose();
    releaseResume();
    assert.equal(await unlocking, false);
    assert.equal(bank.active, false);
    assert.equal(bank.disposed, true);
    assert.equal(ctx.state, 'closed');
    assert.equal(ctx.closeCalls, 1);
    assert.ok(ctx.tracks.every((track) => track.stopped));
    assert.ok(bank.master.disconnectCalls > 0);
    assert.ok(ctx.compressor.disconnectCalls > 0);
    assert.ok(ctx.streamDestination.disconnectCalls > 0);
    assert.doesNotThrow(() => bank.play('success'));
    assert.doesNotThrow(() => bank.settings(false, 0.9));
  } finally {
    if (previous === undefined) delete globalThis.AudioContext;
    else globalThis.AudioContext = previous;
  }
});

test('pause invalidates an unlock that is still pending', async () => {
  const previous = globalThis.AudioContext;
  let releaseResume;
  class DeferredContext extends FakeContext {
    resume() { return new Promise((resolve) => { releaseResume = () => { this.state = 'running'; resolve(); }; }); }
  }
  try {
    globalThis.AudioContext = DeferredContext;
    const bank = new AudioBank();
    const unlocking = bank.unlock();
    bank.pause();
    releaseResume();
    assert.equal(await unlocking, false);
    assert.equal(bank.active, false);
    assert.equal(bank.ctx.state, 'suspended');
    bank.dispose();
  } finally {
    if (previous === undefined) delete globalThis.AudioContext;
    else globalThis.AudioContext = previous;
  }
});
