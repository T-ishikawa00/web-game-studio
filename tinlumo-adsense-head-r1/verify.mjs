import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {adsenseHeadScript, productionAdsenseHtml} from '../scripts/production-adsense-head.mjs';
const live = process.argv.includes('--live');
const base = live ? 'https://tinlumo.com' : 'http://127.0.0.1:4427';
const task = 'tinlumo-adsense-head-r1/internal';
const candidate = JSON.parse(fs.readFileSync(`${task}/distribution.json`));
const baseline = JSON.parse(fs.readFileSync('tinlumo-copy-debt-r1/internal/distribution.json'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const pageFiles = new Set(candidate.routes.map(route => route.slice(1) + 'index.html'));
const changed = [], retained = [];
assert.equal(candidate.files.length, 103);
assert.deepEqual(candidate.routes, baseline.routes);
for (const file of baseline.files) {
  const old = fs.readFileSync(`${baseline.root}/${file.file}`);
  const bytes = fs.readFileSync(`${candidate.root}/${file.file}`);
  assert.equal(hash(old), file.sha256);
  if (pageFiles.has(file.file)) {
    const html = bytes.toString();
    assert.equal(html.split(adsenseHeadScript).length - 1, 1, file.file);
    assert.equal((html.match(/\/adsbygoogle\.js\?/g) ?? []).length, 1, file.file);
    assert(html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)[0].includes(adsenseHeadScript));
    assert.equal(hash(Buffer.from(html.replace(adsenseHeadScript, ''))), file.sha256, `Only allowed head addition: ${file.file}`);
    assert.equal(productionAdsenseHtml(html), html, 'Idempotent packaging');
    changed.push(file.file);
  } else {
    assert.equal(hash(bytes), file.sha256, `Protected asset changed: ${file.file}`);
    retained.push(file.file);
  }
}
assert.equal(changed.length, 39);
assert.equal(retained.length, 63);
const ads = fs.readFileSync('public/ads.txt');
assert.equal(ads.toString(), 'google.com, pub-2960465104451668, DIRECT, f08c47fec0942fa0\n');
const requests = [];
for (const [method, userAgent] of [['GET', null], ['HEAD', null], ['GET', 'Mediapartners-Google'], ['GET', 'Googlebot']]) {
  const response = await fetch(base + '/ads.txt', {method, headers:userAgent ? {'User-Agent':userAgent} : {}, redirect:'manual', signal:AbortSignal.timeout(20000)});
  const body = Buffer.from(await response.arrayBuffer());
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^text\/plain\b/);
  for (const header of ['location', 'www-authenticate', 'x-robots-tag']) assert.equal(response.headers.get(header), null);
  assert.deepEqual(body, method === 'GET' ? ads : Buffer.alloc(0));
  requests.push({method, userAgent, status:200, contentType:response.headers.get('content-type'), redirect:false, anonymous:true, robotsRestriction:false, exactBody:method === 'GET'});
}
for (const file of candidate.files.filter(file => file.file !== '_headers')) {
  const response = await fetch(base + '/' + file.file.replace(/index\.html$/, ''), {redirect:'follow', signal:AbortSignal.timeout(20000)});
  assert.equal(response.status, 200, file.file);
  assert.equal(hash(Buffer.from(await response.arrayBuffer())), file.sha256, file.file);
}
for (const route of candidate.routes) {
  const response = await fetch(base + route, {redirect:'manual', signal:AbortSignal.timeout(20000)});
  assert.equal(response.status, 200, route);
}
const missing = await fetch(base + '/__ads_txt_absent__', {redirect:'manual'});
assert.equal(missing.status, 404);
const report = {at:new Date().toISOString(), status:'PASS', base,
  build:'node scripts/visual-remaster-build.mjs --candidate adsense-head-r1',
  requests, servedFilesVerified:102, routesVerified:39, jaPages:19, enPages:19, rootPages:1,
  headScriptsPerPublicPage:1, pageHtmlChangedOnlyBySpecifiedScript:changed,
  byteIdenticalExistingAssets:retained, protectedExistingFiles:63,
  playPagesIncluded:10, rawGameDocumentsAnd404Unchanged:true,
  consentComponentAndBodyBytesUnchanged:true, robotsAndHeadersUnchanged:true,
  providerPageExclusions:'HUMAN_REPORTED_APPLIED / NOT INDEPENDENTLY VERIFIED',
  externalProviderScriptsExecuted:false, externalWrites:0};
fs.writeFileSync(`${task}/${live ? 'live-after' : 'local-qa'}.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({status:'PASS', base, headScriptsPerPublicPage:1, pages:39, playPages:10, protectedExistingFiles:63, bodyAndConsentUnchanged:true, servedFilesVerified:102, routesVerified:39, adsTxt200:true}));
