import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {launch} from './r5-helpers.mjs';
const live=process.argv.includes('--live'),qa='docs/qa/tinlumo-consent-r1-release',base='https://tinlumo.com';
const manifestBytes=await fs.readFile('docs/qa/tinlumo-trust-ux-r2-release/distribution.json');
const manifest=JSON.parse(manifestBytes),available=new Set(manifest.files.map(f=>f.file));
const browser=await launch(),c=await browser.newContext(),p=await c.newPage(),requests=[],errors=[];
p.on('pageerror',e=>errors.push(e.message));
c.on('request',r=>{const u=new URL(r.url());if(u.origin!==base)requests.push({origin:u.origin,path:u.pathname});});
if(!live)await c.route('**/*',async r=>{
 const u=new URL(r.request().url());
 if(u.origin===base){let file=u.pathname.slice(1);if(!file||file.endsWith('/'))file+='index.html';if(!available.has(file))return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:{'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'}[path.extname(file)]||'text/plain',body:await fs.readFile(manifest.root+'/'+file)});}
 if(u.hostname==='static.cloudflareinsights.com')return r.fulfill({status:200,contentType:'text/javascript',body:'/* Local provider stub; not evidence of live delivery. */'});
 return r.abort();
});
try{
 await p.goto(base+'/en/');await p.waitForLoadState('networkidle');
 assert.equal(await p.locator('[data-analytics-consent]').isHidden(),true);assert.equal(requests.length,0);
 await p.locator('[data-open-analytics]').first().click();await p.locator('[data-close-analytics]').click();assert.equal(requests.length,0);
 assert.equal(await p.evaluate(()=>localStorage.getItem('tinlumo:analytics-consent:v1')),null);
 await p.locator('[data-open-analytics]').first().click();await p.locator('[data-analytics-choice=deny]').click();await p.reload();await p.waitForLoadState('networkidle');assert.equal(requests.length,0);
 await p.locator('[data-open-analytics]').first().click();await p.locator('[data-analytics-choice=allow]').click();await p.waitForFunction(()=>document.querySelectorAll('script[data-cf-beacon]').length===1);await p.waitForTimeout(1600);
 assert.equal(requests.filter(r=>r.origin==='https://static.cloudflareinsights.com').length,1);
 const allowed=requests.slice();assert.ok(allowed.every(r=>['https://static.cloudflareinsights.com','https://cloudflareinsights.com'].includes(r.origin)));
 assert.equal(await p.locator('[data-analytics-consent]').isHidden(),true);
 await p.locator('[data-open-analytics]').first().click();await Promise.all([p.waitForNavigation(),p.locator('[data-analytics-choice=deny]').click()]);await p.waitForTimeout(700);const revokedCount=requests.length;
 assert.equal(await p.locator('script[data-cf-beacon]').count(),0);await p.reload();await p.waitForTimeout(700);assert.equal(requests.length,revokedCount);
 for(const lang of ['ja','en']){
  await p.goto(`${base}/${lang}/privacy/`);assert.equal(await p.locator('[data-analytics-consent]').isHidden(),true);assert.ok((await p.locator('main').innerText()).includes(lang==='ja'?'案内は自動表示しません':'do not automatically show an analytics prompt'));
  for(const game of ['tiny-delivery','light-garden','two-ways-home']){await p.goto(`${base}/${lang}/play/${game}/`);await p.locator('#rc-loading').waitFor({state:'hidden'});await p.frameLocator('iframe').locator('[data-action=menu]').waitFor();assert.equal(await p.locator('[data-analytics-consent]').isHidden(),true);}
  await p.goto(`${base}/${lang}/play/project-magnet/`);await p.locator('[data-mission=A]').first().waitFor();assert.equal(await p.locator('script[data-cf-beacon]').count(),0);
 }
 assert.equal(errors.length,0);assert.equal(requests.length,revokedCount);
 const result={status:'PASS',artifactSha256:createHash('sha256').update(manifestBytes).digest('hex'),mode:live?'Production smoke: existing Cloudflare analytics explicit opt-in; no provider configuration changes':'Exact production artifact at mapped origin; provider stubbed',defaultAndDenyRequests:0,allowedRequests:allowed,revokeReloadStopsNewRequests:true,privacyJAEN:true,fourGamesJAEN:true,noGoogleRequests:true,errors};
 await fs.writeFile(qa+`/${live?'live':'local'}-network.json`,JSON.stringify(result,null,2)+'\n');console.log(result);
}finally{await browser.close();}
