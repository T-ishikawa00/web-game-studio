import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { games, locales } from '../src/data/games';

const base = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4322';
const routes = locales.flatMap(locale => ['', 'games/', 'about/', 'privacy/', 'terms/', 'contact/', ...games.flatMap(game => [`games/${game.slug}/`, `play/${game.slug}/`])].map(suffix => `/${locale}/${suffix}`));
test('production HTML: 16 locale routes, metadata and every local link/asset resolves', async () => {
  const targets = new Set<string>();
  for (const route of routes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(response.headers.get('content-type') ?? '', /text\/html/);
    assert.match(html, new RegExp(`lang="${route.split('/')[1]}"`));
    assert.match(html, /<title>[^<]+/); assert.match(html, /name="description" content="[^"]+/);
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.match(html, /hreflang="ja"/); assert.match(html, /hreflang="en"/);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, route);
    for (const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
      const value = match[1]!;
      assert.ok(!/^https?:|^\/\//.test(value), `unexpected external asset/link ${value}`);
      const url = new URL(value.replaceAll('&amp;', '&'), `${base}${route}`);
      targets.add(url.pathname);
    }
  }
  for (const target of targets) assert.equal((await fetch(`${base}${target}`)).status, 200, target);
});
test('root, unknown path, legal drafts and fixture assets', async () => {
  const root = await fetch(base); assert.equal(root.status, 200);
  assert.match(await root.text(), /url=\/ja\//);
  assert.equal((await fetch(`${base}/en/games/nonexistent/`)).status, 404);
  assert.match(await (await fetch(`${base}/en/privacy/`)).text(), /NOT LEGALLY REVIEWED/);
  for (const game of games) {
    assert.equal((await fetch(`${base}${game.buildPath}`)).status, 200);
    const folder = game.buildPath.slice(0, game.buildPath.lastIndexOf('/') + 1);
    for (const file of ['fixture.css', 'fixture.js']) assert.equal((await fetch(`${base}${folder}${file}`)).status, 200);
  }
});
test('runtime source includes no external service transport and fixture assets stay small', async () => {
  const files = ['src/lib/analytics.ts', 'src/lib/ads.ts', 'src/scripts/play-shell.ts', 'public/games/connection-lab/v0.1.0/fixture.js'];
  for (const file of files) assert.doesNotMatch(await readFile(file, 'utf8'), /\bfetch\s*\(|XMLHttpRequest|sendBeacon|new WebSocket|https?:\/\//, file);
  for (const file of ['fixture.js', 'fixture.css', 'index.html']) assert.ok((await stat(path.join('dist/games/connection-lab/v0.1.0', file))).size < 20_000);
});
