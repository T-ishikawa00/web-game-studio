import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import {launch} from './r5-helpers.mjs';
const base='http://127.0.0.1:4385',qa='docs/qa/tinlumo-consent-r1-release';
const manifest=JSON.parse(await fs.readFile('docs/qa/tinlumo-trust-ux-r2-release/distribution.json'));
const available=new Set(manifest.files.map(f=>f.file));
const browser=await launch(),checks=[],errors=[],external=[];
const key='tinlumo:analytics-consent:v1';
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
async function context(options={}){
 const c=await browser.newContext(options);
 await c.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin!==base){external.push(u.origin+u.pathname);return route.abort();}let file=u.pathname.slice(1);if(!file||file.endsWith('/'))file+='index.html';if(!available.has(file))return route.fulfill({status:404,body:''});const ext=path.extname(file),type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain'}[ext]||'application/octet-stream';return route.fulfill({status:200,contentType:type,body:await fs.readFile(manifest.root+'/'+file)});});
 const p=await c.newPage();p.setDefaultTimeout(8000);p.on('pageerror',e=>errors.push(e.message));return {c,p};
}
try{
 for(const lang of ['ja','en'])for(const width of [390,1440]){
  const {c,p}=await context({viewport:{width,height:900},hasTouch:width===390});
  assert.equal((await p.goto(base+`/${lang}/`)).status(),200);await p.waitForLoadState('networkidle');
  check(`${lang}/${width} fresh panel hidden`,await p.locator('[data-analytics-consent]').isHidden());
  check(`${lang}/${width} no choice written`,await p.evaluate(k=>localStorage.getItem(k),key)===null);
  check(`${lang}/${width} no overflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  const open=p.locator('[data-open-analytics]').first();await open.focus();await p.keyboard.press('Enter');
  check(`${lang}/${width} keyboard open`,await p.locator('[data-analytics-consent]').isVisible());
  check(`${lang}/${width} focused allow`,await p.locator('[data-analytics-choice=allow]').evaluate(e=>e===document.activeElement));
  if(lang==='ja'&&width===390)await p.screenshot({path:qa+'/settings-mobile.png'});
  await p.keyboard.press('Escape');
  check(`${lang}/${width} escape closes without consent`,await p.locator('[data-analytics-consent]').isHidden()&&await p.evaluate(k=>localStorage.getItem(k),key)===null);
  check(`${lang}/${width} focus restored`,await open.evaluate(e=>e===document.activeElement));
  await open.click();await p.locator('[data-close-analytics]').click();check(`${lang}/${width} close works`,await p.locator('[data-analytics-consent]').isHidden());
  await open.click();await p.locator('[data-analytics-choice=allow]').click();
  check(`${lang}/${width} allow saves`,await p.evaluate(k=>localStorage.getItem(k),key)==='allow');
  await p.reload();await p.waitForLoadState('networkidle');
  check(`${lang}/${width} old allow no prompt and local no beacon`,await p.locator('[data-analytics-consent]').isHidden()&&await p.locator('script[data-cf-beacon]').count()===0);
  await open.click();await p.locator('[data-analytics-choice=deny]').click();await p.reload();
  check(`${lang}/${width} deny retained`,await p.evaluate(k=>localStorage.getItem(k),key)==='deny');
  await p.goto(base+`/${lang}/privacy/`);
  check(`${lang}/${width} accepted privacy and no prompt`,(await p.locator('main').innerText()).includes(lang==='ja'?'案内は自動表示しません':'do not automatically show an analytics prompt')&&await p.locator('[data-analytics-consent]').isHidden());
  await p.locator('main [data-open-analytics]').click();await p.locator('[data-close-analytics]').click();
  check(`${lang}/${width} privacy settings functional`,await p.locator('[data-analytics-consent]').isHidden());
  await c.close();
 }
 const {c,p}=await context();
 for(const lang of ['ja','en'])for(const id of ['tiny-delivery','light-garden','two-ways-home']){
  await p.goto(base+`/${lang}/play/${id}/`);await p.locator('#rc-loading').waitFor({state:'hidden'});
  const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`);await a('menu').waitFor();
  check(lang+id+' starts no consent prompt',await p.locator('[data-analytics-consent]').isHidden());
  if(lang==='en'){
   const saveKey='wgs:save:'+id;const prior=await p.evaluate(k=>localStorage.getItem(k),saveKey);
   if(id==='two-ways-home'){if(!await a('move:0').count()){await a('menu').click();await f.locator('.menu-dialog [data-action=dpad]').click();await a('close-menu').click();}await a('move:1').press('Enter');}
   else await a(id==='light-garden'?'mirror:0':'arrow:0').press('Enter');
   await p.waitForFunction(({k,v})=>localStorage.getItem(k)!==v,{k:saveKey,v:prior});
   const saved=await p.evaluate(k=>localStorage.getItem(k),saveKey);await p.reload();await p.locator('#rc-loading').waitFor({state:'hidden'});
   check(id+' input save reload',saved===await p.evaluate(k=>localStorage.getItem(k),saveKey));
  }
 }
 for(const lang of ['ja','en']){
  await p.goto(base+`/${lang}/play/project-magnet/`);await p.locator('[data-mission=A]').first().waitFor();
  if(await p.locator('#continue-run').isVisible())await p.locator('#continue-run').click();else await p.locator('[data-mission=A]').first().click();
  await p.locator('#mission-hub').waitFor({state:'hidden'});
  await p.locator('canvas').waitFor();await p.locator('#pause').click();await p.locator('#resume').waitFor();await p.locator('#resume').click();
  check(lang+' magnet startup pause resume',await p.locator('canvas').isVisible()&&await p.locator('[data-analytics-consent]').count()===0);
 }
 await c.close();
 const blocked=await context();await blocked.c.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});
 await blocked.p.goto(base+'/ja/');await blocked.p.waitForLoadState('networkidle');check('blocked storage no prompt',await blocked.p.locator('[data-analytics-consent]').isHidden());
 await blocked.p.locator('[data-open-analytics]').click();await blocked.p.locator('[data-analytics-choice=deny]').click();await blocked.p.waitForLoadState('networkidle');check('blocked decline fallback',blocked.p.url().endsWith('#analytics-off'));await blocked.c.close();
 const cross=await context();await cross.p.goto(base+'/en/');const q=await cross.c.newPage();await q.goto(base+'/en/');await cross.p.locator('[data-open-analytics]').click();await cross.p.locator('[data-analytics-choice=deny]').click();await q.waitForFunction(k=>localStorage.getItem(k)==='deny',key);check('other tab no unsolicited prompt',await q.locator('[data-analytics-consent]').isHidden());await cross.c.close();
 check('no external requests',external.length===0);check('no browser errors',errors.length===0);
 await fs.writeFile(qa+'/browser.json',JSON.stringify({status:'PASS',checks,external,errors,physicalDevices:'NOT TESTED',realCMP:'NOT TESTED',realBeacon:'NOT TESTED',screenshots:1},null,2)+'\n');
 console.log(JSON.stringify({status:'PASS',checks:checks.length,external:external.length,errors}));
}finally{await browser.close();}
