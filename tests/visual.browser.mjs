import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const modulePath = process.env.QA_PLAYWRIGHT_MODULE;
const {chromium} = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const base = process.env.QA_DESIGN_URL ?? 'http://127.0.0.1:4323';
const dir = 'docs/qa/visual-r1';
await mkdir(`${dir}/screens`,{recursive:true});
const browser = await chromium.launch({channel:'msedge',headless:true,env:{...process.env,TEMP:process.cwd()+'/.tmp',TMP:process.cwd()+'/.tmp'}});
const results=[];const layout=[];const errors=[];const external=[];
const ctx=await browser.newContext({viewport:{width:1672,height:941}});
await ctx.route('**/*', route=>{const u=new URL(route.request().url());if(u.protocol.startsWith('http')&&u.origin!==base){external.push(u.origin);return route.abort();}return route.continue();});
const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
async function run(name, fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}}
async function go(url){await p.goto(base+url);}
async function ready(){await p.locator('#game-stage[aria-busy="false"]').waitFor();await p.frameLocator('iframe').locator('button:not([disabled])').first().waitFor();}
async function count(n){await p.waitForFunction(n=>document.querySelectorAll('.game-card:not([hidden])').length===n,n);}
const visible=()=>p.locator('.game-card:visible');
await run('Search JA/EN names, description, category conjunction, empty and clear',async()=>{
 await go('/en/design-preview/');await count(10);await p.locator('#game-search').fill('幼体');await count(1);
 await p.locator('[data-filter="quick"]').click();await count(0);assert.ok(await p.locator('#catalog-empty').isVisible());
 await p.locator('#clear-search').click();await count(10);await p.locator('#game-search').fill('reflection');await count(1);
 await p.locator('#clear-search').click();await p.locator('[data-filter="growth"]').click();await count(2);
 await p.locator('#game-search').fill('larva');await count(1);await visible().first().click();assert.match(p.url(),/design-preview\/play\/larva/);
 assert.equal(await p.locator('iframe').count(),0);await p.locator('[data-catalog-return]').first().click();await count(1);assert.equal(await p.locator('#game-search').inputValue(),'larva');
 await p.locator('[data-locale-link][lang="ja"]').click();await count(1);assert.equal(await p.locator('#game-search').inputValue(),'larva');
 await p.locator('#clear-search').click();await count(10);await p.locator('#game-search').fill('ケーブル');await count(1);
 await p.goBack();await count(1);
});
await run('10 / 2 / 0 samples and mixed artwork reset',async()=>{
 await go('/en/design-preview/');await p.locator('.design-controls summary').click();await p.locator('#sample-count').selectOption('2');await count(2);await p.locator('#sample-count').selectOption('0');await count(0);assert.ok(await p.locator('#catalog-empty').isVisible());
 await p.locator('#sample-count').selectOption('10');await p.locator('#mixed-art').check();await count(10);assert.equal(await p.locator('img[src*="mixed-"]').count(),3);
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:`${dir}/screens/home-en-mixed.png`,fullPage:true});await p.locator('.design-controls a').click();await count(10);assert.equal(await p.locator('img[src*="mixed-"]').count(),0);
});
await run('Native new-tab card navigation and safe return URLs',async()=>{
 await go('/en/design-preview/?q=cable');await count(1);const url=await visible().first().getAttribute('href');const other=await ctx.newPage();await other.goto(new URL(url,base).href);assert.match(other.url(),/\/en\/design-preview\/play\/cable-path\//);await other.close();
 await go('/en/design-preview/play/cable-path/?return=https://example.invalid/&q=cable');const href=await p.locator('[data-catalog-return]').first().getAttribute('href');assert.equal(new URL(href,base).origin,base);assert.equal(new URL(href,base).searchParams.has('return'),false);
});
await run('Real fixture Play/detail/catalog return keeps safe filter state',async()=>{
 await go('/en/play/connection-lab/?q=connection&category=puzzle');await ready();await p.locator('[data-catalog-state-link]').first().click();assert.equal(new URL(p.url()).searchParams.get('q'),'connection');await p.locator('[data-catalog-state-link]').first().click();await ready();assert.equal(new URL(p.url()).searchParams.get('category'),'puzzle');await p.locator('[data-catalog-state-link]').first().click();await p.locator('[data-catalog-return]').first().click();assert.equal(new URL(p.url()).searchParams.get('q'),'connection');assert.equal(await p.locator('#game-search').inputValue(),'connection');
});
await run('JA/EN routes at six widths, images and horizontal overflow',async()=>{
 for(const locale of ['en','ja'])for(const route of ['design-preview/','design-preview/games/clockwork-repair-workshop/','design-preview/play/larva-evolution-lab/','', 'games/','games/connection-lab/','play/connection-lab/','about/','privacy/','terms/','contact/'])for(const width of [320,390,768,1024,1440,1672]){
  await p.setViewportSize({width,height:941});await go(`/${locale}/${route}`);
  const state=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,bad:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),h1:document.querySelectorAll('h1').length}));
  layout.push({locale,route,width,...state});assert.equal(state.overflow,false,`${locale}/${route} ${width}`);assert.deepEqual(state.bad,[]);assert.equal(state.h1,1);
 }
});
await run('200% layout and 200% text reflow',async()=>{
 for(const route of ['/en/design-preview/','/ja/play/connection-lab/','/en/about/']){
  await p.setViewportSize({width:720,height:470});await go(route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.setViewportSize({width:390,height:844});await p.addStyleTag({content:'html {font-size:200% !important}'});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route);
 }
});
await run('Reference screenshots, desktop/mobile Home and Play, JA/EN',async()=>{
 for(const [name,url,width,height] of [
 ['home-en-1672','/en/design-preview/',1672,941],['home-ja-1440','/ja/design-preview/',1440,1000],['home-ja-390','/ja/design-preview/',390,844],['home-en-390','/en/design-preview/',390,844],
 ['play-en-1440','/en/design-preview/play/larva-evolution-lab/',1440,1000],['play-ja-390','/ja/design-preview/play/larva-evolution-lab/',390,844],['detail-en-1440','/en/design-preview/games/clockwork-repair-workshop/',1440,1000],
 ['fixture-en-1440','/en/play/connection-lab/',1440,1000],['fixture-ja-390','/ja/play/connection-lab/',390,844],['home-normal-ja-1440','/ja/',1440,900]]){
  await p.setViewportSize({width,height});await go(url);if(url.includes('/play/connection-lab'))await ready();await p.screenshot({path:`${dir}/screens/${name}.png`,fullPage:true});
 }
});
await run('Fixture pointer, keyboard, save reload, language, reset cancel/confirm',async()=>{
 await p.setViewportSize({width:1440,height:900});await go('/en/play/connection-lab/');await p.evaluate(()=>{localStorage.clear();sessionStorage.clear();});await p.reload();await ready();
 const buttons=p.frameLocator('iframe').locator('button');await buttons.nth(0).click();await buttons.nth(1).focus();await p.keyboard.press('Enter');await buttons.nth(2).focus();await p.keyboard.press('Space');
 await p.waitForFunction(()=>JSON.parse(localStorage.getItem('wgs:save:internal-connection-lab') ?? 'null')?.data.active.length===3);await p.reload();await ready();assert.equal(await p.frameLocator('iframe').locator('[aria-pressed=true]').count(),3);
 await p.locator('[data-locale-link][lang=ja]').click();await ready();assert.equal(await p.frameLocator('iframe').locator('[aria-pressed=true]').count(),3);
 await p.locator('#reset-save').click();await p.keyboard.press('Escape');assert.equal(await p.frameLocator('iframe').locator('[aria-pressed=true]').count(),3);assert.equal(await p.evaluate(()=>document.activeElement.id),'reset-save');
 await p.evaluate(()=>localStorage.setItem('wgs:save:other-test','keep'));await p.locator('#reset-save').click();await p.locator('#confirm-reset').click();assert.equal(await p.evaluate(()=>localStorage.getItem('wgs:save:other-test')),'keep');await p.reload();await ready();assert.equal(await p.frameLocator('iframe').locator('[aria-pressed=true]').count(),0);
});
await run('Load failure, retry and actual ready timeout recovery',async()=>{
 await go('/en/play/connection-lab/');await ready();await p.locator('#simulate-error').click();assert.equal(await p.locator('iframe').count(),0);assert.ok(await p.locator('#error-state').isVisible());assert.ok(await p.locator('#reset-save').isDisabled());await p.locator('#reload-game').click();await ready();
 await p.route('**/fixture.js',r=>r.fulfill({status:200,contentType:'text/javascript',body:'/* deliberately no ready event */'}));await p.reload();await p.locator('#error-state').waitFor({state:'visible',timeout:11000});assert.equal(await p.locator('iframe').count(),0);await p.unroute('**/fixture.js');await p.locator('#reload-game').click();await ready();
});
await run('Mock pause, Escape focus restore, skip, reward once, disabled and cross-locale cooldown',async()=>{
 await go('/en/play/connection-lab/');await p.evaluate(()=>sessionStorage.clear());await p.reload();await ready();
 await p.locator('#mock-interstitial').focus();await p.keyboard.press('Enter');await p.locator('#ad-dialog').waitFor({state:'visible'});await p.frameLocator('iframe').locator('button[disabled]').first().waitFor();await p.keyboard.press('Escape');await ready();assert.equal(await p.evaluate(()=>document.activeElement.id),'mock-interstitial');
 await p.locator('[data-locale-link][lang=ja]').click();await ready();await p.locator('#mock-interstitial').click();assert.equal(await p.locator('#ad-dialog').isVisible(),false);assert.match(await p.locator('#ad-status').textContent(),/間隔/);
 await p.locator('#disabled-ad').click();assert.match(await p.locator('#ad-status').textContent(),/利用できません/);
 await p.evaluate(()=>sessionStorage.clear());await p.reload();await ready();await p.locator('#mock-rewarded').click();await p.locator('#finish-ad').click();await ready();assert.match(await p.frameLocator('iframe').locator('#rewards').textContent(),/1/);
 await p.locator('#finish-ad').evaluate(b=>b.click());assert.match(await p.frameLocator('iframe').locator('#rewards').textContent(),/1/);
 await p.evaluate(()=>sessionStorage.clear());await p.reload();await ready();await p.locator('#mock-rewarded').click();await p.locator('#skip-ad').click();await ready();assert.equal(await p.frameLocator('iframe').locator('#rewards').textContent(),'');
});
await run('Malformed and unknown-version saves preserve original data and show failure honestly',async()=>{
 for(const raw of ['{bad',JSON.stringify({schema:99,gameId:'internal-connection-lab',version:'99',data:{active:[1]}})]){
  await go('/en/play/connection-lab/');await p.evaluate(raw=>localStorage.setItem('wgs:save:internal-connection-lab',raw),raw);await p.reload();await ready();assert.equal(await p.locator('#save-status').getAttribute('data-state'),'error');await p.frameLocator('iframe').locator('button').first().click();assert.equal(await p.evaluate(()=>localStorage.getItem('wgs:save:internal-connection-lab')),raw);
 }
});
await run('Browser-injected storage denial reports save failure and allows continued input',async()=>{
 const c=await browser.newContext();await c.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError')}}));const q=await c.newPage();await q.goto(base+'/en/play/connection-lab/');await q.locator('#game-stage[aria-busy=false]').waitFor();await q.frameLocator('iframe').locator('button:not([disabled])').first().click();assert.equal(await q.locator('#save-status').getAttribute('data-state'),'error');assert.match(await q.locator('#save-status').textContent(),/Could not save/);await c.close();
});
await run('Touch emulation, orientation resize and iframe keyboard exit',async()=>{
 const c=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const q=await c.newPage();await q.goto(base+'/en/play/connection-lab/');const f=q.frameLocator('iframe');await f.locator('button:not([disabled])').first().tap();await q.waitForFunction(()=>JSON.parse(localStorage.getItem('wgs:save:internal-connection-lab') ?? 'null')?.data.active.length===1);await q.setViewportSize({width:844,height:390});assert.equal(await f.locator('[aria-pressed=true]').count(),1);await f.locator('button').last().focus();await q.keyboard.press('Tab');assert.notEqual(await q.evaluate(()=>document.activeElement.tagName),'IFRAME');await c.close();
});
await run('No-JS cards and broken artwork fallback',async()=>{
 const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const q=await c.newPage();await q.goto(base+'/en/design-preview/');assert.equal(await q.locator('.game-card').count(),10);assert.equal(await q.locator('#game-search').isVisible(),false);await q.locator('.game-card').first().click();assert.match(q.url(),/play\/larva/);await q.screenshot({path:`${dir}/screens/no-js-play.png`,fullPage:true});await c.close();
 await p.route('**/card-1.webp',r=>r.abort());await go('/en/design-preview/');await p.locator('.image-failed').waitFor();assert.ok(await p.locator('.game-card').first().getByText('Larva Evolution Lab').isVisible());await p.screenshot({path:`${dir}/screens/artwork-failure.png`,fullPage:true});await p.unroute('**/card-1.webp');
});
await run('Color contrast tokens, reduced motion, primary touch targets',async()=>{
 const lum=c=>{const v=c.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722};
 for(const [a,b] of [['121b2d','ffffff'],['56647a','ffffff'],['15341e','d4ff69'],['56647a','f0f3f7']]){const v=[lum(a),lum(b)].sort((a,b)=>b-a);assert.ok((v[0]+.05)/(v[1]+.05)>=4.5);}
 await p.emulateMedia({reducedMotion:'reduce'});await go('/en/design-preview/');assert.equal(await p.locator('.game-card').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');for(const el of await p.locator('.filter, .language-switch a').all()){const r=await el.boundingBox();assert.ok(r.height>=44 && r.width>=44);}await p.emulateMedia({reducedMotion:'no-preference'});
});
await run('Console and external network',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(external,[]);});
await writeFile(`${dir}/browser-results.json`,JSON.stringify({date:new Date().toISOString(),browser:await browser.version(),base,results,layout,consoleErrors:errors,externalOrigins:external},null,2)+'\n');
await browser.close();if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
