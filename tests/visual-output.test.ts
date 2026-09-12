import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
async function files(dir: string): Promise<string[]> {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(e => e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]))).flat();
}
test('normal output excludes design routes, sample metadata and temporary artwork', async () => {
  const output = await files('dist');
  assert.ok(output.length > 10);
  assert.equal(output.some(p => /design-preview|design-art|PORTAL_VISUAL_REFERENCE/.test(p)), false);
  for (const file of output.filter(p => /\.(html|js|json)$/.test(p))) {
    assert.doesNotMatch(await readFile(file, 'utf8'), /design-larva-evolution-lab|Hidden Number Archive|Clockwork Repair Workshop|card-10\.webp/, file);
  }
});
test('explicit design build has 10 separate samples per locale, with no fabricated runtime', async () => {
  for (const locale of ['ja', 'en']) {
    const home = await readFile(`.cache/visual-dist/${locale}/design-preview/index.html`, 'utf8');
    assert.equal((home.match(/class="game-card"/g) ?? []).length, 10);
    assert.match(home, /Design preview/); assert.doesNotMatch(home, /5 min|10 min/);
    const play = await readFile(`.cache/visual-dist/${locale}/design-preview/play/larva-evolution-lab/index.html`, 'utf8');
    assert.doesNotMatch(play, /<iframe|id="play-shell"/); assert.match(play, /game not built|ゲーム未制作/);
  }
  assert.ok((await stat('.cache/visual-dist/design-art/card-10.webp')).size < 50_000);
});
