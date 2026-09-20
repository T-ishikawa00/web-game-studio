import {createHash as releaseHash} from 'node:crypto';
import {readFile as releaseRead} from 'node:fs/promises';
const artifactSha256=releaseHash('sha256').update(await releaseRead('docs/qa/game004-magnet-release-r1/distribution.json')).digest('hex');
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {launch} from './r5-helpers.mjs';
const live=process.argv.includes('--live'),qa='docs/qa/game004-magnet-release-r1',base='https://tinlumo.com',browser=await launch(),c=await browser.newContext(),p=await c.newPage(),requests=[],errors=[];
p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{const u=new URL(r.url());if(u.origin!==base)requests.push({origin:u.origin,path:u.pathname});});
if(!live)await c.route('**/*',async r=>{const u=new URL(r.request().url());if(u.origin===base){const response=await fetch('http://127.0.0.1:4373'+u.pathname);return r.fulfill({status:response.status,headers:Object.fromEntries(response.headers),body:Buffer.from(await response.arrayBuffer())});}if(u.hostname==='static.cloudflareinsights.com')return r.fulfill({status:200,contentType:'text/javascript',body:'/* Provider response deliberately stubbed in local consent test. */'});return r.abort();});
try{
 await p.goto(base+'/en/');await p.locator('[data-analytics-choice=deny]').waitFor();await p.waitForTimeout(800);assert.equal(requests.length,0);
 await p.locator('[data-analytics-choice=deny]').click();await p.reload();await p.waitForTimeout(500);assert.equal(requests.length,0);
 assert.equal(await p.evaluate(()=>localStorage.getItem('tinlumo:analytics-consent:v1')),'deny');
 await p.locator('[data-open-analytics]').first().click();await p.locator('[data-analytics-choice=allow]').click();await p.waitForFunction(()=>document.querySelectorAll('script[data-cf-beacon]').length===1);await p.waitForTimeout(1400);
 assert.equal(requests.filter(r=>r.origin==='https://static.cloudflareinsights.com').length,1);assert.equal(await p.evaluate(()=>localStorage.getItem('tinlumo:analytics-consent:v1')),'allow');
 const allowed=requests.slice();assert.ok(allowed.every(r=>['https://static.cloudflareinsights.com','https://cloudflareinsights.com'].includes(r.origin)));
 await p.locator('[data-open-analytics]').first().click();await Promise.all([p.waitForNavigation(),p.locator('[data-analytics-choice=deny]').click()]);await p.waitForTimeout(700);const revokedCount=requests.length;
 assert.equal(await p.locator('script[data-cf-beacon]').count(),0);await p.reload();await p.waitForTimeout(700);assert.equal(requests.length,revokedCount);
 for(const lang of ['ja','en'])for(const route of ['privacy','terms']){const r=await p.goto(`${base}/${lang}/${route}/`);assert.equal(r.status(),200);assert.equal(await p.locator('html').getAttribute('lang'),lang);assert.ok((await p.locator('main').innerText()).length>200);}
 await p.goto(base+'/en/play/project-magnet/');assert.equal(await p.locator('script[data-cf-beacon]').count(),0);
 assert.equal(errors.length,0);await fs.writeFile(qa+`/${live?'live':'local'}-consent.json`,JSON.stringify({status:'PASS',artifactSha256,mode:live?'Live consented Cloudflare script; no setting changes':'Local artifact at mapped production origin; provider response stubbed',defaultAndDenyRequests:0,allowedRequests:allowed,revokeReloadStopsNewRequests:true,privacyTermsJAEN:true,noAnalyticsInGame004:true,errors},null,2)+'\n');console.log({status:'PASS',mode:live?'live':'local',allowedRequests:allowed.length});
}finally{await browser.close();}
