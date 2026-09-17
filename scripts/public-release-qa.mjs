import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root='.cache/tinlumo-public-candidate',dir='docs/qa/public-release-final-r1';
const manifest=JSON.parse(await readFile(dir+'/candidate-manifest.json'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const htmls=manifest.files.filter(f=>f.file.endsWith('.html'));
let pages=0,frames=0;
for(const f of manifest.files)assert.equal(hash(await readFile(root+'/'+f.file)),f.sha256);
for(const f of htmls){const html=await readFile(root+'/'+f.file,'utf8');
 assert.match(html,/noindex/);assert.ok(!/static\.cloudflareinsights|beacon\.min\.js/.test(html));
 if(f.file.startsWith('games/')){frames++;assert.ok(!html.includes('public-language.js'));assert.ok(!html.includes('analytics-consent'));continue;}
 if(f.file==='404.html')continue;
 pages++;assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert.match(html,/hreflang="ja" href="https:\/\/tinlumo\.com\/ja\//);assert.match(html,/hreflang="en" href="https:\/\/tinlumo\.com\/en\//);
 assert.ok(!/data-public-unresolved|Undecided|未確定|Pre-publication review/.test(html),'Unresolved public text: '+f.file);
 if(f.file!=='index.html'){
  assert.equal((html.match(/src="\/assets\/analytics-consent.js"/g)||[]).length,1);
  assert.ok(manifest.analyticsIncluded?/data-enabled="true" data-beacon-id="[a-f0-9]{32}"/.test(html):html.includes('data-enabled="false" data-beacon-id=""'));
  assert.ok(html.includes('data-analytics-choice="allow"')&&html.includes('data-analytics-choice="deny"'));
 }
 assert.ok(!/Local release candidate|ローカル公開候補|Unpublished|未公開/.test(html));
 if(f.file.includes('/contact/')){assert.match(html,/support@tinlumo\.com/);assert.ok(html.includes('mailto:support@tinlumo.com'));}
 if(/\/(privacy|terms|about|contact|credits)\//.test(f.file)){
  const emails=html.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)||[];
  assert.ok(emails.every(e=>e==='support@tinlumo.com'),'Only public support address may appear in operations pages');
 }
 for(const m of html.matchAll(/(?:href|src)="(\/(?!\/)[^"?#]*)[^"]*"/g)){
  const url=m[1];assert.ok(!/^\/(docs|src|\.tmp|design-preview|prototype)/.test(url));
  const file=url.endsWith('/')?url.slice(1)+'index.html':url.slice(1);assert.ok(manifest.files.some(x=>x.file===file),'Broken local reference: '+url);
 }
}
assert.equal(pages,27);assert.equal(frames,3);
const sitemap=await readFile(root+'/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,27);assert.ok(!/\/games\/[^<]+\/rc-r1|404|preview\.tinlumo/.test(sitemap));
const original=JSON.parse(await readFile('docs/qa/soft-launch-rc-r1/checkpoint-r1/distribution-manifest.json'));for(const f of original.files)assert.equal(hash(await readFile('.cache/rc-dist/'+f.file)),f.sha256);
const before=JSON.parse(await readFile(dir+'/preserved-existing.json'));for(const f of before.files)assert.equal(hash(await readFile(f.file)),f.sha256,'Existing work changed: '+f.file);
const requests=[];for(const url of ['/','/ja/','/en/','/ja/contact/','/en/privacy/','/games/tiny-delivery/rc-r1/','/missing/','/docs/qa/production-deploy-r1/POSTFLIGHT.md','/src/rc/site.json','/.tmp/physical-mobile-r2/tls/server.key','/config/release-production/measurement.json','/games/tiny-delivery/rc-r1/D2.wav']){
 const r=await fetch('http://127.0.0.1:4352'+url);const denied=['/missing/','/docs/','/src/','/.tmp/','/config/'].some(x=>url.startsWith(x))||url.endsWith('D2.wav');
 assert.equal(r.status,denied?404:200);assert.match(r.headers.get('x-robots-tag'),/noindex/);requests.push({path:url,status:r.status,noindex:true});await r.arrayBuffer();
}
const protectedPaths=['/ja/','/en/','/assets/portal.js','/covers/tiny-delivery.png','/games/tiny-delivery/rc-r1/','/games/tiny-delivery/rc-r1/music.wav'];
const preview=[];for(const url of protectedPaths){const r=await fetch('https://preview.tinlumo.com'+url,{redirect:'manual'});const loc=r.headers.get('location');assert.ok([302,303].includes(r.status));assert.ok(loc&&new URL(loc).hostname.endsWith('.cloudflareaccess.com'));preview.push({path:url,status:r.status,accessRedirect:true});await r.body?.cancel();}
const report={at:new Date().toISOString(),status:'LOCAL_TECHNICAL_PASS',manifestFilesVerified:manifest.files.length,portalPages:pages,gameFrames:frames,acceptedRcFilesUnchanged:48,preservedExistingFiles:before.files.length,localHttp:requests,protectedPreviewAnonymous:preview,analyticsRequestsTriggered:false,physicalDevices:'NOT TESTED',productionSmoke:'NOT TESTED',productionConnection:false};
await writeFile(dir+'/technical-qa.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,files:manifest.files.length,pages,frames,localRequests:requests.length,protectedPreviewChecks:preview.length}));
