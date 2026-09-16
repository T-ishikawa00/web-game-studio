import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import site from '../src/rc/site.json' with {type:'json'};
import {candidateGames} from '../src/rc/profile.ts';
import {emptyProgress} from '../src/prototypes/state.ts';
import {launch,setup,ids,base} from './rc-helpers.mjs';
import {rcEvidenceDir as out} from '../scripts/rc-evidence.mjs';
const browser=await launch(),results=[];
await mkdir(`${out}/screens`,{recursive:true});
async function test(name,fn){const u=await setup(browser);try{await fn(u);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}finally{await u.c.close();}}
try{
await test('JA/EN naming, accessible links, metadata, all existing RC routes and local links',async u=>{
 assert.equal(candidateGames.find(g=>g.id==='tiny-delivery').title.en,'Hakorilo');
 assert.equal(candidateGames.find(g=>g.id==='tiny-delivery').title.ja,'Hakorilo — ちいさな配送パズル');
 const old=JSON.parse(await readFile(`${out}/before.json`));
 const links=new Set();
 for(const locale of ['ja','en'])for(const route of ['','games/','about/','terms/','privacy/','contact/','credits/',...ids.flatMap(id=>[`games/${id}/`,`play/${id}/`])]){
  assert.equal((await u.p.goto(`${base}/${locale}/${route}`)).status(),200);
  assert.ok((await u.p.title()).endsWith(site.officialSiteName));
  assert.equal(await u.p.locator('.brand span').innerText(),site.officialSiteName);
  assert.equal(await u.p.locator('.footer-brand').innerText(),site.officialSiteName);
  assert.ok((await u.p.locator('.site-footer').innerText()).includes(site.creatorBrand));
  assert.equal(await u.p.locator('.brand').getAttribute('aria-label'),locale==='ja'?`${site.officialSiteName}（${site.pronunciation.ja}）`:site.officialSiteName);
  assert.doesNotMatch(await u.p.locator('body').innerText(),/Web Game Studio|Tiny Delivery|Tiny uses|Tinyの/);
  assert.doesNotMatch(await u.p.content(),/nolippa\.com|rel="canonical"|mailto:/);
  assert.ok((await u.p.locator('meta[name="description"]').getAttribute('content')).includes(site.officialSiteName));
  for(const href of await u.p.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')))){
   assert.ok(href.startsWith('/')||href.startsWith('#'),href);if(href.startsWith('/'))links.add(href);
  }
  for(const card of await u.p.locator('.game-card').all()){
   const title=await card.locator('h3').innerText();
   assert.ok((await card.locator('a').first().getAttribute('aria-label')).includes(title));
   assert.ok((await card.locator('.button').getAttribute('aria-label')).includes(title));
  }
  const game=candidateGames.find(g=>route.endsWith(`/${g.slug}/`));
  if(game){assert.equal(await u.p.locator('h1').innerText(),game.title[locale]);assert.match(await u.p.locator('meta[name="description"]').getAttribute('content'),new RegExp(game.title.en==='Hakorilo'?'Hakorilo':game.title[locale]));}
  if(route.startsWith('play/')){await u.a('menu').waitFor();assert.equal(await u.p.locator('iframe').getAttribute('title'),game.title[locale]);assert.equal(await u.p.locator('#rc-shell').getAttribute('data-game'),game.id);}
 }
 for(const href of links)assert.equal((await u.p.request.get(base+href)).status(),200,href);
 for(const f of old.distribution.filter(f=>f.file.endsWith('.html')))assert.equal((await u.p.request.get(base+'/'+f.file)).status(),200,'old RC link '+f.file);
 await u.p.goto(base);assert.equal(await u.p.locator('h1').innerText(),site.officialSiteName);assert.ok((await u.p.locator('body').innerText()).includes(site.pronunciation.ja));
 await u.p.goto(base+'/ja/games/tiny-delivery/');assert.match(await u.p.locator('.detail-copy').innerText(),/ハコリロ/);
 await u.p.goto(base+'/missing-naming-qa/');assert.ok((await u.p.title()).includes(site.officialSiteName));
});
await test('Existing save envelopes and sound preferences survive renamed UI, input, reload and locale switch',async u=>{
 const seed={};for(const id of ids){const data=emptyProgress(id);data.cleared=[data.levelId];seed['wgs:save:'+id]=JSON.stringify({schema:1,gameId:id,version:'0.1.0',data});seed['wgs:audio:'+id]=JSON.stringify({version:1,mute:true,gain:.2});}
 seed['wgs:music-pilot:tiny-delivery']=JSON.stringify({version:1,enabled:false,direction:'D1',gain:.12});
 await u.p.goto(base);await u.p.evaluate(seed=>{for(const [key,raw] of Object.entries(seed))localStorage.setItem(key,raw);},seed);
 for(const id of ids){await u.open(id);assert.deepEqual(await u.saved(id),JSON.parse(seed['wgs:save:'+id]));}
 await u.open('tiny-delivery');await u.a('arrow:0').press('Enter');await u.p.waitForFunction(raw=>localStorage.getItem('wgs:save:tiny-delivery')!==raw,seed['wgs:save:tiny-delivery']);
 const changed=await u.saved('tiny-delivery');assert.equal(changed.gameId,'tiny-delivery');assert.equal(changed.version,'0.1.0');assert.deepEqual(changed.data.cleared,JSON.parse(seed['wgs:save:tiny-delivery']).data.cleared);
 await u.p.reload();await u.a('menu').waitFor();assert.deepEqual(await u.saved('tiny-delivery'),changed);
 await u.p.locator('.language-switch a[lang="ja"]').click();await u.a('menu').waitFor();assert.deepEqual(await u.saved('tiny-delivery'),changed);
 await u.menu('settings');assert.equal(await u.f.locator('#audio-mute').isChecked(),true);assert.equal(await u.f.locator('#music-enabled').isChecked(),false);assert.equal(await u.f.locator('#music-gain').inputValue(),'12');
 const actual=await u.p.evaluate(()=>({...localStorage}));for(const [key,raw] of Object.entries(seed))if(key!=='wgs:save:tiny-delivery')assert.equal(actual[key],raw,key);
 assert.ok(!Object.keys(actual).some(k=>/hakorilo|nolippa|tinlumo/i.test(k)));
 await u.p.goto(base);const corrupt='{previous-invalid-save';await u.p.evaluate(raw=>localStorage.setItem('wgs:save:tiny-delivery',raw),corrupt);await u.open('tiny-delivery');await u.a('arrow:0').press('Enter');assert.equal(await u.p.evaluate(()=>localStorage.getItem('wgs:save:tiny-delivery')),corrupt);assert.equal(await u.p.locator('#rc-save-status').getAttribute('data-state'),'error');
});
await test('Name widths at 320 / 390 / 1440 px; JA/EN catalog, details and all three game startups',async u=>{
 for(const width of [320,390,1440])for(const locale of ['ja','en']){
  await u.p.setViewportSize({width,height:1000});
  for(const route of ['','games/tiny-delivery/',...ids.map(id=>`play/${id}/`)]){
   await u.p.goto(`${base}/${locale}/${route}`);if(route.startsWith('play/'))await u.a('menu').waitFor();
   assert.ok(await u.p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} ${locale} ${route}`);
   assert.ok(await u.p.locator('h1,.brand,.footer-brand,.game-card h3').evaluateAll(es=>es.every(e=>{const b=e.getBoundingClientRect();return b.left>=-1&&b.right<=innerWidth+1&&e.scrollWidth<=e.clientWidth+1;})),`name bounds ${width} ${locale} ${route}`);
   if(route===''||(route==='play/tiny-delivery/'&&locale==='ja'))await u.p.screenshot({path:`${out}/screens/${locale}-${route?'play':'home'}-${width}.png`,fullPage:true});
  }
 }
});
await test('All 57 puzzles, fixed profiles, runtime / art / audio / prior evidence remain byte-identical',async()=>{
 const hash=b=>createHash('sha256').update(b).digest('hex');const before=JSON.parse(await readFile(`${out}/before.json`));
 const unchangedDistribution=before.distribution.filter(f=>f.file.startsWith('covers/')||f.file.startsWith('assets/')||f.file.startsWith('_astro/')||f.file.startsWith('games/')&&!f.file.endsWith('index.html'));
 for(const f of unchangedDistribution)assert.equal(hash(await readFile('.cache/rc-dist/'+f.file)),f.sha256,f.file);
 const protectedSource=before.source.filter(f=>/^src\/prototypes\/|^docs\/qa\/|^public\//.test(f.file));
 for(const f of protectedSource)assert.equal(hash(await readFile(f.file)),f.sha256,f.file);
 const {levelsByGame}=await import('../src/prototypes/levels.ts');assert.deepEqual(ids.map(id=>levelsByGame[id].length),[18,21,18]);
 await writeFile(`${out}/preservation.json`,JSON.stringify({at:new Date().toISOString(),status:'PASS',unchangedDistribution:unchangedDistribution.map(f=>f.file),protectedSourceFiles:protectedSource.length,allOldQaReportsScreensClipsUnchanged:true,originalPublicAssetsUnchanged:true,levels:57,sourceGameMetadataFrozen:true},null,2));
});
}finally{await browser.close();await writeFile(`${out}/naming-results.json`,JSON.stringify({at:new Date().toISOString(),environment:'Windows / Edge headless / Playwright; synthetic prior-format saves; viewport emulation, not physical or Human acceptance',results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
