import {test} from 'node:test';
import assert from 'node:assert/strict';
import {productionAdsenseHtml, adsenseHeadScript} from '../scripts/production-adsense-head.mjs';

test('One head script; existing Consent, analytics and body bytes survive', () => {
  const before = '<!doctype html><html lang="ja"><head><title>Tinlumo</title></head><body><section data-analytics-consent hidden></section><script src="/assets/analytics-consent.js"></script></body></html>';
  const after = productionAdsenseHtml(before);
  assert.equal(after.split(adsenseHeadScript).length - 1, 1);
  assert.equal(after.replace(adsenseHeadScript, ''), before);
  assert(after.indexOf(adsenseHeadScript) < after.indexOf('</head>'));
});
test('Repeated packaging never duplicates the loader', () => {
  const once = productionAdsenseHtml('<html><head></head><body></body></html>');
  assert.equal(productionAdsenseHtml(once), once);
});
test('Conflicting clients, body loaders and duplicates fail instead of publishing', () => {
  assert.throws(() => productionAdsenseHtml(`<head>${adsenseHeadScript.replace('2960465104451668', '0000000000000000')}</head>`));
  assert.throws(() => productionAdsenseHtml(`<head></head><body>${adsenseHeadScript}</body>`));
  assert.throws(() => productionAdsenseHtml(`<head>${adsenseHeadScript}${adsenseHeadScript}</head>`));
});
test('Missing or multiple document heads fail closed', () => {
  for (const html of ['<body></body>', '<head></head><head></head>']) assert.throws(() => productionAdsenseHtml(html));
});
