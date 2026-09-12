import assert from 'node:assert/strict';
import test from 'node:test';
import { createSaveAdapter, saveKey, type StoragePort } from '../../src/lib/save';
import { AD_GAP_MS, PRESSURE_KEY, createAdAdapter } from '../../src/lib/ads';
import { createAnalytics } from '../../src/lib/analytics';
import { games, relatedGames } from '../../src/data/games';

function memoryStorage(): StoragePort {
  const values = new Map<string, string>();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: key => { values.delete(key); } };
}
test('save persists across instances and reset affects only its game', () => {
  const storage = memoryStorage();
  const a = createSaveAdapter('a', () => storage);
  const b = createSaveAdapter('b', () => storage);
  assert.equal(a.load().status, 'empty');
  assert.equal(a.write({ active: [0, 4] }), true);
  assert.equal(b.write({ active: [8] }), true);
  assert.deepEqual(createSaveAdapter('a', () => storage).load().data.active, [0, 4]);
  assert.equal(a.reset(), true);
  assert.equal(createSaveAdapter('a', () => storage).load().status, 'empty');
  assert.deepEqual(b.load().data.active, [8]);
});
test('malformed, foreign and future saves stay intact until an explicit reset', () => {
  for (const raw of ['{bad', JSON.stringify({ schema: 9, gameId: 'a', version: '9', data: { active: [] } }), JSON.stringify({ schema: 1, gameId: 'b', version: '1', data: { active: [0] } }), JSON.stringify({ schema: 1, gameId: 'a', version: '1', data: { active: [0, 0] } })]) {
    const storage = memoryStorage(); storage.setItem(saveKey('a'), raw);
    const adapter = createSaveAdapter('a', () => storage);
    assert.equal(adapter.load().status, 'invalid');
    assert.equal(adapter.write({ active: [1] }), false);
    assert.equal(storage.getItem(saveKey('a')), raw);
    assert.equal(adapter.reset(), true);
    assert.equal(adapter.write({ active: [1] }), true);
  }
});
test('legacy schema migrates and can be reopened', () => {
  const storage = memoryStorage();
  storage.setItem(saveKey('a'), JSON.stringify({ schema: 0, gameId: 'a', panels: [1, 3] }));
  const adapter = createSaveAdapter('a', () => storage);
  assert.equal(adapter.load().status, 'migrated');
  assert.deepEqual(createSaveAdapter('a', () => storage).load(), { status: 'ok', data: { active: [1, 3] } });
});
test('storage getter denial, quota error and silent write loss never report saved', () => {
  const blocked = createSaveAdapter('a', () => { throw new Error('denied'); });
  assert.equal(blocked.load().status, 'unavailable'); assert.equal(blocked.write({ active: [] }), false); assert.equal(blocked.reset(), false);
  for (const setItem of [() => { throw new Error('quota'); }, () => {}]) {
    const storage = { ...memoryStorage(), setItem };
    const adapter = createSaveAdapter('a', () => storage);
    assert.equal(adapter.write({ active: [2] }), false);
  }
});
test('reset failure preserves data and migration failure is not success', () => {
  const storage = memoryStorage();
  storage.setItem(saveKey('a'), JSON.stringify({ schema: 0, gameId: 'a', panels: [1] }));
  const adapter = createSaveAdapter('a', () => ({ ...storage, setItem: () => { throw new Error('quota'); }, removeItem: () => {} }));
  assert.equal(adapter.load().status, 'unavailable');
  assert.equal(adapter.reset(), false);
  assert.ok(storage.getItem(saveKey('a')));
});
test('ad pressure survives a new game adapter and a full-page equivalent reconstruction', () => {
  const storage = memoryStorage(); let clock = 100_000;
  const gameA = createAdAdapter(() => storage, () => clock);
  assert.equal(gameA.request('mock', clock), 'cooldown');
  assert.equal(gameA.request('mock', 0), 'show-mock');
  assert.equal(gameA.request('mock', 0), 'busy');
  assert.deepEqual(gameA.complete('interstitial', true), { reward: false });
  const gameB = createAdAdapter(() => storage, () => clock);
  assert.equal(gameB.request('mock', 0), 'cooldown');
  clock += AD_GAP_MS;
  assert.equal(gameB.request('mock', 0), 'show-mock');
  assert.deepEqual(gameB.complete('rewarded', false), { reward: false });
  clock += AD_GAP_MS;
  assert.equal(gameB.request('mock', 0), 'show-mock');
  assert.deepEqual(gameB.complete('rewarded', true), { reward: true });
  assert.deepEqual(gameB.complete('rewarded', true), { reward: false });
});
test('disabled, blocked or corrupt ad storage skips without interrupting play', () => {
  const storage = memoryStorage();
  const adapter = createAdAdapter(() => storage, () => 100_000);
  assert.equal(adapter.request('disabled', 0), 'unavailable');
  assert.equal(storage.getItem(PRESSURE_KEY), null);
  storage.setItem(PRESSURE_KEY, 'invalid');
  assert.equal(adapter.request('mock', 0), 'unavailable');
  assert.equal(createAdAdapter(() => { throw new Error('denied'); }).request('mock', 0), 'unavailable');
});
test('event buffer is bounded and snapshot cannot mutate the stored record', () => {
  const analytics = createAnalytics();
  for (let index = 0; index < 80; index++) analytics.emit({ name: 'first_input', locale: 'en' });
  const snapshot = analytics.snapshot();
  assert.equal(snapshot.length, 50); assert.equal(snapshot[0]?.sequence, 31);
  snapshot[0]!.name = 'retry';
  assert.equal(analytics.snapshot()[0]?.name, 'first_input');
});
test('registry has one internal fixture, no released titles, unique identities and local versioned assets', () => {
  assert.equal(games.length, 1); assert.equal(games.filter(game => game.state === 'internal').length, 1);
  assert.equal(games.filter(game => game.state === 'released').length, 0);
  assert.equal(new Set(games.map(game => game.id)).size, games.length);
  for (const game of games) {
    assert.ok(game.title.ja && game.title.en && game.description.ja && game.description.en);
    assert.ok(game.buildPath.includes(`/v${game.version}/`)); assert.ok(game.cover.startsWith('/'));
    assert.ok(game.legal.evidence && game.save.schema); assert.equal(game.ads.mode, 'mock');
  }
});
test('related resolver excludes missing, self, draft and internal; admits a released own title', () => {
  const fixture = games[0]!;
  const released = { ...fixture, id: 'synthetic-released', state: 'released' as const };
  const draft = { ...fixture, id: 'synthetic-draft', state: 'draft' as const };
  const source = { ...fixture, related: [fixture.id, 'missing', draft.id, released.id] };
  assert.deepEqual(relatedGames(source, [fixture, draft, released]).map(game => game.id), [released.id]);
});
