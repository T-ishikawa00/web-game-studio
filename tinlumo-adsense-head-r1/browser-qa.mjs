import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const repo = await fs.realpath('.');
assert.equal(repo.replaceAll('\\', '/').toLowerCase(), 'c:/projects/web game studio');
const temp = path.join(repo, '.tmp');
await fs.mkdir(temp, {recursive:true});
const owned = await fs.mkdtemp(path.join(temp, 'tinlumo-adsense-browser-'));
process.env.TEMP = owned;
process.env.TMP = owned;
const key = 'tinlumo:analytics-consent:v1';
const evidence = {at:new Date().toISOString(), status:'RUNNING',
  productionOriginMappedToLocalAssets:true, googleScriptExecuted:false,
  analyticsProviderStubbed:true, externalNetworkAllowed:false, checks:[],
  freshDisposableProfile:true, profilePathRecorded:false};
let context;
try {
  context = await chromium.launchPersistentContext(path.join(owned, 'profile'), {
    channel:'msedge', headless:true, env:{...process.env},
    proxy:{server:'http://127.0.0.1:9', bypass:'127.0.0.1,localhost'},
    args:['--disable-background-networking', '--disable-component-update', '--disable-sync', '--no-first-run'],
  });
  let google = 0, analytics = 0, others = 0;
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.hostname === 'tinlumo.com') {
      const response = await fetch('http://127.0.0.1:4427' + url.pathname + url.search, {redirect:'manual'});
      const headers = Object.fromEntries(response.headers);
      for (const header of ['content-encoding', 'transfer-encoding', 'content-length']) delete headers[header];
      await route.fulfill({status:response.status, headers, body:Buffer.from(await response.arrayBuffer())});
    } else if (url.hostname === 'pagead2.googlesyndication.com') {
      google++;
      await route.abort();
    } else if (url.hostname === 'static.cloudflareinsights.com') {
      analytics++;
      await route.fulfill({status:200, contentType:'text/javascript', headers:{'access-control-allow-origin':'*'}, body:'/* local analytics stub */'});
    } else {
      others++;
      await route.abort();
    }
  });
  const page = await context.newPage();
  const appErrors = [];
  page.on('pageerror', error => appErrors.push(error.name));
  for (const locale of ['ja', 'en']) {
    await page.setViewportSize(locale === 'ja' ? {width:1440, height:900} : {width:375, height:812});
    await page.goto(`https://tinlumo.com/${locale}/`, {waitUntil:'networkidle'});
    await page.evaluate(() => localStorage.clear());
    const initialGoogle = google, initialAnalytics = analytics;
    await page.reload({waitUntil:'networkidle'});
    assert.equal(google - initialGoogle, 1);
    assert.equal(analytics - initialAnalytics, 0);
    assert.equal(await page.locator('head script[src*="/adsbygoogle.js?"]').count(), 1);
    assert.equal(await page.locator('script[data-cf-beacon]').count(), 0);
    assert.equal(await page.locator('[data-analytics-consent]').isVisible(), false);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), key), null);
    await page.locator('[data-open-analytics]').last().click();
    await page.locator('[data-analytics-choice="allow"]').click();
    await page.waitForFunction(() => document.querySelectorAll('script[data-cf-beacon]').length === 1);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), key), 'allow');
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.locator('script[data-cf-beacon]').count(), 1);
    const timeOrigin = await page.evaluate(() => performance.timeOrigin);
    await page.locator('[data-open-analytics]').last().click();
    await page.locator('[data-analytics-choice="deny"]').click();
    await page.waitForFunction(before => performance.timeOrigin !== before, timeOrigin);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.evaluate(key => localStorage.getItem(key), key), 'deny');
    assert.equal(await page.locator('script[data-cf-beacon]').count(), 0);
    assert.equal(await page.locator('head script[src*="/adsbygoogle.js?"]').count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    evidence.checks.push({locale, analyticsDefaultOff:true, explicitAllowOnce:true,
      allowPersists:true, withdrawalPersists:true, googleFailureDoesNotBreakSettings:true,
      scriptCount:1, overflow:false});
  }
  const manifest = JSON.parse(await fs.readFile('tinlumo-adsense-head-r1/internal/distribution.json'));
  for (const route of manifest.routes.filter(route => /^\/(ja|en)\/play\//.test(route))) {
    await page.goto('https://tinlumo.com' + route, {waitUntil:'networkidle'});
    assert.equal(await page.locator('head script[src*="/adsbygoogle.js?"]').count(), 1);
    assert.equal(await page.locator('script[data-cf-beacon]').count(), 0);
    assert.equal(await page.locator('canvas').count() > 0, true, route);
    evidence.checks.push({route, scriptCount:1, googleLoaderFailure:true, gameCanvasPresent:true, analyticsDenied:true});
  }
  assert.equal(appErrors.length, 0, 'Unexpected application exceptions');
  evidence.status = 'PASS';
  evidence.appExceptions = appErrors.length;
  evidence.googleRequestsBlocked = google;
  evidence.analyticsRequestsStubbed = analytics;
  evidence.otherExternalRequestsBlocked = others;
} finally {
  if (context) await context.close();
  const actual = await fs.realpath(owned);
  assert.equal(path.dirname(actual), temp);
  assert(path.basename(actual).startsWith('tinlumo-adsense-browser-'));
  // Only the newly created owned profile/temp directory is removed.
  await fs.rm(actual, {recursive:true, force:false, maxRetries:5, retryDelay:300});
  evidence.temporaryProfileRemoved = true;
  await fs.writeFile('tinlumo-adsense-head-r1/internal/browser-qa.json', JSON.stringify(evidence, null, 2) + '\n');
}
console.log(JSON.stringify(evidence));
