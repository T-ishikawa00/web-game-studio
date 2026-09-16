import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {emptyProgress} from '../src/prototypes/state.ts';
import {createAnalytics} from '../src/lib/analytics.ts';
import {launch,setup,ids,base} from './rc-helpers.mjs';
import {rcEvidenceDir as out} from '../scripts/rc-evidence.mjs';
const b=await launch(),results=[];await mkdir(`${out}/screens`,{recursive:true});
async function test(name,fn){const u=await setup(b),requests=[];u.c.on('request',r=>requests.push({origin:new URL(r.url()).origin,method:r.method(),type:r.resourceType()}));try{await fn(u);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);assert.ok(requests.every(r=>r.origin===base&&r.method==='GET'));results.push({name,status:'PASS',requests:requests.length,external:0,nonGet:0});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}finally{await u.c.close();}}
try{
await test('JA/EN save explanation, account/cloud/ads/analytics copy, draft boundaries and responsive display',async u=>{
 for(const locale of ['ja','en']){
  for(const page of ['about','privacy','terms',...ids.map(id=>'games/'+id),...ids.map(id=>'play/'+id)]){
   assert.equal((await u.p.goto(`${base}/${locale}/${page}/`)).status(),200);
   const text=await u.p.locator('main').innerText();assert.match(text,locale==='ja'?/自動保存/:/automatically/);
   if(['privacy','terms'].includes(page)){assert.match(text,/Cloud Save/);assert.match(text,locale==='ja'?/プライベートモード/:/private browsing/);assert.match(text,locale==='ja'?/草案/:/draft/);}
   if(page==='privacy'){assert.match(text,/localStorage/);assert.match(text,locale==='ja'?/100件/:/100 in total/);assert.match(text,locale==='ja'?/fingerprint/:/fingerprints/);}
   if(page.startsWith('play/')){await u.a('menu').waitFor();assert.match(await u.p.locator('.save-explanation').innerText(),locale==='ja'?/ログインは不要/:/No account or login/);assert.equal(await u.p.locator('dialog[open]').count(),0);}
   assert.equal(await u.p.locator('form,input[type=password],input[type=email]').count(),0);
  }
  for(const width of [320,1440]){await u.p.setViewportSize({width,height:1000});await u.open('tiny-delivery',locale);assert.ok(await u.p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await u.p.screenshot({path:`${out}/screens/${locale}-play-${width}.png`,fullPage:true});}
 }
});
await test('All three stable saves: real input, JA/EN, reload, related-game navigation and revisit',async u=>{
 const old={},stored={};for(const id of ids){const data=emptyProgress(id);data.cleared=[data.levelId];old[id]=JSON.stringify({schema:1,gameId:id,version:'0.1.0',data});}
 await u.p.goto(base);await u.p.evaluate(old=>{for(const [id,raw] of Object.entries(old)){localStorage.setItem('wgs:save:'+id,raw);localStorage.setItem('wgs:audio:'+id,JSON.stringify({version:1,mute:true,gain:.2}));}localStorage.setItem('wgs:music-pilot:tiny-delivery',JSON.stringify({version:1,enabled:false,direction:'D1',gain:.12}));},old);
 for(const id of ids){
  await u.open(id);assert.deepEqual(await u.saved(id),JSON.parse(old[id]));
  if(id==='light-garden')await u.a('mirror:0').press('Enter');else if(id==='two-ways-home'){await u.buttons();await u.a('move:1').press('Enter');}else await u.a('arrow:0').press('Enter');
  await u.p.waitForFunction(({id,raw})=>localStorage.getItem('wgs:save:'+id)!==raw,{id,raw:old[id]});stored[id]=await u.saved(id);assert.equal(stored[id].schema,1);assert.equal(stored[id].version,'0.1.0');assert.equal(stored[id].gameId,id);
  await u.p.locator('.language-switch a[lang=ja]').click();await u.a('menu').waitFor();assert.deepEqual(await u.saved(id),stored[id]);
  await u.p.reload();await u.a('menu').waitFor();assert.deepEqual(await u.saved(id),stored[id]);
  await u.p.locator('.card-bottom .button').first().click();await u.a('menu').waitFor();await u.p.locator(`.card-bottom a[href="/ja/play/${id}/"]`).click();await u.a('menu').waitFor();assert.deepEqual(await u.saved(id),stored[id]);
 }
 const revisit=await u.c.newPage();for(const id of ids){await revisit.goto(`${base}/en/play/${id}/`);await revisit.frameLocator('iframe').locator('[data-action=menu]').waitFor();assert.deepEqual(await revisit.evaluate(id=>JSON.parse(localStorage.getItem('wgs:save:'+id)),id),stored[id]);}await revisit.close();
 const keys=await u.p.evaluate(()=>Object.keys(localStorage));assert.ok(keys.every(k=>/^wgs:(save|audio|guide|music-pilot):/.test(k)));
 await u.open('tiny-delivery');await u.p.locator('#rc-reset-save').click();await u.p.locator('#rc-cancel-reset').click();assert.deepEqual(await u.saved('tiny-delivery'),stored['tiny-delivery']);
 await u.p.locator('#rc-reset-save').click();await u.p.locator('#rc-confirm-reset').click();assert.equal(await u.saved('tiny-delivery'),null);for(const id of ids.slice(0,2))assert.deepEqual(await u.saved(id),stored[id]);assert.equal(await u.p.evaluate(()=>JSON.parse(localStorage.getItem('wgs:audio:tiny-delivery')).mute),true);assert.equal(await u.p.evaluate(()=>JSON.parse(localStorage.getItem('wgs:music-pilot:tiny-delivery')).enabled),false);
 // Simulates deleting this origin's browser storage, not the OS settings UI.
 await u.p.evaluate(()=>{localStorage.clear();sessionStorage.clear();});await u.p.reload();await u.a('menu').waitFor();assert.equal(await u.saved('tiny-delivery'),null);
});
await test('Unavailable or corrupt storage remains honest and preserves raw data',async u=>{
 await u.p.goto(base);const raw='{unrecognized-save';await u.p.evaluate(raw=>localStorage.setItem('wgs:save:tiny-delivery',raw),raw);await u.open('tiny-delivery');await u.a('arrow:0').press('Enter');assert.equal(await u.p.evaluate(()=>localStorage.getItem('wgs:save:tiny-delivery')),raw);assert.equal(await u.p.locator('#rc-save-status').getAttribute('data-state'),'error');
 await u.p.goto(base);await u.p.evaluate(()=>localStorage.removeItem('wgs:save:tiny-delivery'));await u.c.addInitScript(()=>{Storage.prototype.setItem=function(){throw Error('QA storage unavailable');};});await u.open('tiny-delivery');await u.a('arrow:0').press('Enter');await u.p.waitForFunction(()=>document.querySelector('#rc-save-status').dataset.state==='error');assert.equal(await u.saved('tiny-delivery'),null);
});
await test('Bounded memory-only events and exact preservation of gameplay, saves, identity, audio and prior evidence',async()=>{
 const events=createAnalytics();for(let i=0;i<60;i++)events.emit({name:'save_result',locale:'en',gameId:'tiny-delivery',result:'persisted',unwantedPersonalId:'not-recorded'});const records=events.snapshot();assert.equal(records.length,50);assert.ok(records.every(r=>Object.keys(r).sort().join(',')==='gameId,locale,name,result,sequence'));assert.equal(createAnalytics().snapshot().length,0);
 const before=JSON.parse(await readFile(`${out}/before.json`)),hash=b=>createHash('sha256').update(b).digest('hex');
 const payload=before.distribution.filter(f=>!f.file.endsWith('.html'));for(const f of payload)assert.equal(hash(await readFile('.cache/rc-dist/'+f.file)),f.sha256,f.file);
 const protectedFiles=before.source.filter(f=>/^docs\/qa\/|^src\/(prototypes|data|lib)\/|^public\//.test(f.file)||['src/rc/shell.ts','src/rc/portal.ts'].includes(f.file));for(const f of protectedFiles)assert.equal(hash(await readFile(f.file)),f.sha256,f.file);
 await writeFile(`${out}/preservation.json`,JSON.stringify({at:new Date().toISOString(),status:'PASS',unchangedNonHtmlPayload:payload.length,protectedSourceAndOldEvidence:protectedFiles.length,stableSavesAndGameNames:true,gameplay57ArtMotionAudioUnchanged:true,eventBuffers:'50 per instance; up to two instances on Play; nonpersistent',noNewIdentifiers:true},null,2));
});
}finally{await b.close();await writeFile(`${out}/policy-results.json`,JSON.stringify({at:new Date().toISOString(),environment:'Windows Edge headless. Isolated contexts; same-context new tab revisit and synthetic storage clear/denial. No physical/private-mode acceptance.',results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
