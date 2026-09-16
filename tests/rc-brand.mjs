import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {launch,setup,base,ids} from './rc-helpers.mjs';
import {emptyProgress} from '../src/prototypes/state.ts';
import {rcEvidenceDir as out} from '../scripts/rc-evidence.mjs';
const before=JSON.parse(await readFile(`${out}/before.json`)),hash=b=>createHash('sha256').update(b).digest('hex');
const site=JSON.parse(await readFile('src/rc/site.json'));assert.equal(site.officialSiteName,'Tinlumo');assert.equal(site.pronunciation.ja,'ティンルモ');assert.equal(site.creatorBrand,'Tinlumo Studio');assert.equal(site.domain,null);assert.equal(site.domainCandidate,null);assert.equal(site.approvals.namesAndRights,false);
const changed=[];for(const f of before.source)if(hash(await readFile(f.file))!==f.sha256)changed.push(f.file);
assert.deepEqual(changed.sort(),['src/rc/site.json','scripts/rc-manifest.mjs','scripts/rc-evidence.mjs','tests/rc-naming.mjs','docs/games/PRODUCTION_CURRENT.md','docs/records/ASSET_REGISTER_R1.md','docs/planning/NOLIPPA_HAKORILO_NAMING_R1.md'].sort());
const payload=before.distribution.filter(f=>!f.file.endsWith('.html'));
for(const f of payload)assert.equal(hash(await readFile('.cache/rc-dist/'+f.file)),f.sha256,f.file);
const b=await launch(),u=await setup(b),routes=[];
try{
 for(const f of before.distribution.filter(f=>f.file.endsWith('.html'))){const url=base+'/'+f.file,r=await u.p.request.get(url);assert.equal(r.status(),200,url);const html=await r.text();assert.doesNotMatch(html,/Nolippa|ノリッパ|nolippa\.com|tinlumo\.com|rel="canonical"|mailto:/i);if(!f.file.startsWith('games/'))assert.match(html,/<title>[^<]*Tinlumo/);routes.push(f.file);}
 for(const locale of ['ja','en'])for(const width of [320,1440]){
  await u.p.setViewportSize({width,height:1000});await u.p.goto(`${base}/${locale}/`);
  assert.equal(await u.p.locator('.brand span').innerText(),'Tinlumo');assert.equal(await u.p.locator('.footer-brand').innerText(),'Tinlumo');assert.match(await u.p.locator('.site-footer').innerText(),/Tinlumo Studio/);
  assert.equal(await u.p.locator('.brand').getAttribute('aria-label'),locale==='ja'?'Tinlumo（ティンルモ）':'Tinlumo');assert.ok(await u.p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  for(const href of await u.p.locator('a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href'))))assert.equal((await u.p.request.get(base+href)).status(),200,href);
  if(width===320&&locale==='ja'){await mkdir(`${out}/screens`,{recursive:true});await u.p.screenshot({path:`${out}/screens/home-ja-320.png`,fullPage:true});}
 }
 const seed={};for(const id of ids){const data=emptyProgress(id);data.cleared=[data.levelId];seed['wgs:save:'+id]=JSON.stringify({schema:1,gameId:id,version:'0.1.0',data});seed['wgs:audio:'+id]=JSON.stringify({version:1,mute:true,gain:.2});}seed['wgs:music-pilot:tiny-delivery']=JSON.stringify({version:1,enabled:false,direction:'D1',gain:.12});
 await u.p.evaluate(seed=>{for(const [k,v] of Object.entries(seed))localStorage.setItem(k,v);},seed);
 for(const id of ids){await u.open(id);assert.deepEqual(await u.saved(id),JSON.parse(seed['wgs:save:'+id]));}
 await u.open('tiny-delivery');assert.equal(await u.p.locator('h1').innerText(),'Hakorilo');await u.a('arrow:0').press('Enter');await u.p.waitForFunction(raw=>localStorage.getItem('wgs:save:tiny-delivery')!==raw,seed['wgs:save:tiny-delivery']);const saved=await u.saved('tiny-delivery');
 await u.p.reload();await u.a('menu').waitFor();assert.deepEqual(await u.saved('tiny-delivery'),saved);await u.p.locator('.language-switch a[lang="ja"]').click();await u.a('menu').waitFor();assert.equal(await u.p.locator('h1').innerText(),'Hakorilo — ちいさな配送パズル');assert.deepEqual(await u.saved('tiny-delivery'),saved);
 const storage=await u.p.evaluate(()=>({...localStorage}));for(const [k,v] of Object.entries(seed))if(k!=='wgs:save:tiny-delivery')assert.equal(storage[k],v);assert.ok(!Object.keys(storage).some(k=>/tinlumo|nolippa|hakorilo/i.test(k)));
 assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);
}finally{await b.close();}
assert.equal(execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),before.head);assert.equal(execFileSync('git',['diff','--cached','--name-only'],{encoding:'utf8'}).trim(),'');execFileSync('git',['diff','--check'],{stdio:'pipe'});
await writeFile(`${out}/brand-results.json`,JSON.stringify({at:new Date().toISOString(),status:'PASS',htmlRoutes:routes.length,widths:[320,1440],locales:['ja','en'],startups:3,saves:'prior-format seeds; three loads; Hakorilo input/save/reload/JA switch; other saves and audio/music keys preserved',unchangedNonHtmlPayload:payload.length,unchangedSourceFiles:before.source.length-changed.length,changedSourceFiles:changed,allPriorQaEvidenceUnchanged:true,headUnchanged:true,indexChanges:0,diffCheck:'PASS',externalRequests:0,pageErrors:0,environment:'Windows Edge headless; not Human/physical acceptance',model:'gpt-6-astra'},null,2));console.log('PASS brand display, routes, save regression, byte preservation, Git invariants');
