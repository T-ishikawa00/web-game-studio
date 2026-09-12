import assert from 'node:assert/strict';
import test from 'node:test';
import { catalogEntry, searchText } from '../../src/lib/catalog';
import { games, relatedGames } from '../../src/data/games';
test('catalog adapter keeps real identity and searches both languages without creating releases', () => {
  const card = catalogEntry(games[0]!);
  assert.equal(card.id, 'internal-connection-lab'); assert.equal(card.state, 'internal');
  const text = searchText(card);
  assert.ok(text.includes('コネクション')); assert.ok(text.includes('connection lab')); assert.ok(text.includes('fixture'));
});
test('related games are distinct released games, with at most four entries', () => {
  const entries = Array.from({ length: 6 }, (_, i) => ({ ...games[0]!, id: `test-${i}`, state: 'released' as const }));
  const source = { ...games[0]!, related: ['missing', entries[0]!.id, entries[0]!.id, ...entries.map(e => e.id), games[0]!.id] };
  assert.deepEqual(relatedGames(source, [...games, ...entries]).map(e => e.id), ['test-0', 'test-1', 'test-2', 'test-3']);
});
