import test from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../public/shared/save.js';

class SharedStorage {
  #data = new Map();
  denyReads = false;
  dropWrites = false;
  failSet = null;

  getItem(key) {
    if (this.denyReads) throw new DOMException('Storage access denied.', 'SecurityError');
    return this.#data.has(key) ? this.#data.get(key) : null;
  }

  setItem(key, value) {
    if (this.failSet) this.failSet(key, value);
    if (!this.dropWrites) this.#data.set(String(key), String(value));
  }

  removeItem(key) {
    this.#data.delete(key);
  }
}

test('stale tabs merge independent progress monotonically and settings by last update', () => {
  const storage = new SharedStorage();
  const firstTab = createStore('game008:slice-a', { settings: { music: 1 } }, { storage });
  const secondTab = createStore('game008:slice-a', { settings: { music: 1 } }, { storage });

  assert.equal(firstTab.write({
    completed: { intro: true },
    best: { score: 12 },
    settings: { music: 0.25 },
  }).ok, true);
  assert.equal(secondTab.write({
    completed: { finale: true },
    best: { score: 8, clears: 4 },
    settings: { music: 0.8 },
  }).ok, true);

  const merged = secondTab.read();
  assert.equal(merged.ok, true);
  assert.deepEqual(merged.value.completed, { intro: true, finale: true });
  assert.deepEqual(merged.value.best, { score: 12, clears: 4 });
  assert.deepEqual(merged.value.settings, { music: 0.8 });

  assert.equal(firstTab.write({
    completed: { bonus: true },
    best: { score: 14 },
    settings: { language: 'ja' },
  }).ok, true);
  const latest = firstTab.read();
  assert.deepEqual(latest.value.completed, { intro: true, finale: true, bonus: true });
  assert.deepEqual(latest.value.best, { score: 14, clears: 4 });
  assert.deepEqual(latest.value.settings, { music: 0.8, language: 'ja' });
});

test('reset advances a generation and blocks writes from tabs that have not refreshed', () => {
  const storage = new SharedStorage();
  const oldTab = createStore('game008:primary', { settings: { sound: true } }, { storage });
  const resetTab = createStore('game008:primary', { settings: { sound: true } }, { storage });

  assert.equal(oldTab.write({ completed: { stage1: true }, best: { score: 7 } }).ok, true);
  const reset = resetTab.reset();
  assert.equal(reset.ok, true);
  assert.equal(reset.value.generation, 1);
  assert.deepEqual(reset.value.completed, {});
  assert.deepEqual(reset.value.best, {});
  assert.deepEqual(reset.value.settings, { sound: true });

  assert.deepEqual(oldTab.write({ completed: { stale: true } }), {
    ok: false,
    reason: 'stale-generation',
  });
  assert.deepEqual(oldTab.read().value.completed, {});
  assert.equal(oldTab.write({ completed: { fresh: true } }).ok, true);
  assert.deepEqual(resetTab.read().value.completed, { fresh: true });
});

for (const [label, raw, reason] of [
  ['malformed JSON', '{"version":', 'malformed-data'],
  ['unknown version', '{"version":99,"future":{"data":1}}', 'unknown-version'],
  ['malformed version-1 record', '{"version":1,"generation":0,"completed":{},"best":{"score":"9"},"settings":{}}', 'malformed-data'],
]) {
  test(`${label} stays byte-for-byte until explicit reset, which keeps a backup`, () => {
    const key = `game008:corrupt:${label}`;
    const storage = new SharedStorage();
    storage.setItem(key, raw);
    const store = createStore(key, { settings: { mode: 'normal' } }, { storage });

    assert.deepEqual(store.read(), { ok: false, reason, locked: true, raw });
    assert.deepEqual(store.write({ completed: { stage1: true } }), {
      ok: false,
      reason,
      locked: true,
      raw,
    });
    assert.equal(storage.getItem(key), raw);

    const reset = store.reset();
    assert.equal(reset.ok, true);
    assert.equal(reset.backupKey.startsWith(`${key}::corrupt-backup::`), true);
    assert.equal(storage.getItem(reset.backupKey), raw);
    assert.equal(JSON.parse(storage.getItem(key)).generation, 1);
    assert.deepEqual(store.read().value.settings, { mode: 'normal' });
  });
}

test('quota failure preserves the prior save without pretending it persisted', () => {
  const key = 'game008:quota';
  const storage = new SharedStorage();
  const store = createStore(key, {}, { storage });
  assert.equal(store.write({ best: { score: 10 } }).ok, true);
  const before = storage.getItem(key);
  storage.failSet = () => { throw new DOMException('Storage is full.', 'QuotaExceededError'); };

  assert.deepEqual(store.write({ best: { score: 20 } }), {
    ok: false,
    reason: 'quota-exceeded',
  });
  assert.equal(storage.getItem(key), before);
  assert.deepEqual(store.read().value.best, { score: 10 });
});

test('reset does not replace corrupt primary data if its backup cannot be saved', () => {
  const key = 'game008:backup-quota';
  const raw = 'unreadable save bytes';
  const storage = new SharedStorage();
  storage.setItem(key, raw);
  storage.failSet = (writeKey) => {
    if (writeKey.startsWith(`${key}::corrupt-backup::`)) {
      throw new DOMException('Storage is full.', 'QuotaExceededError');
    }
  };
  const store = createStore(key, {}, { storage });

  assert.deepEqual(store.reset(), {
    ok: false,
    reason: 'quota-exceeded',
    raw,
    backupKey: undefined,
  });
  assert.equal(storage.getItem(key), raw);
});

test('storage denial is reported, and a silent non-persistent write fails verification', () => {
  const deniedStorage = new SharedStorage();
  deniedStorage.denyReads = true;
  const deniedStore = createStore('game008:denied', {}, { storage: deniedStorage });
  assert.deepEqual(deniedStore.read(), { ok: false, reason: 'storage-denied' });
  assert.deepEqual(deniedStore.write({ completed: { stage1: true } }), {
    ok: false,
    reason: 'storage-denied',
  });

  const silentStorage = new SharedStorage();
  silentStorage.dropWrites = true;
  const silentStore = createStore('game008:silent', {}, { storage: silentStorage });
  assert.deepEqual(silentStore.write({ completed: { stage1: true } }), {
    ok: false,
    reason: 'persistence-failed',
  });
  assert.equal(silentStorage.getItem('game008:silent'), null);
});
