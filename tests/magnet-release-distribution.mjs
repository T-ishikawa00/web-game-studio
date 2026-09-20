import {createHash as releaseHash} from 'node:crypto';
import {readFile as releaseRead} from 'node:fs/promises';
const artifactSha256=releaseHash('sha256').update(await releaseRead('docs/qa/game004-magnet-release-r1/distribution.json')).digest('hex');
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const live=process.argv.includes('--live'),base=live?'https://tinlumo.com':'http://127.0.0.1:4373',qa='docs/qa/game004-magnet-release-r1';
const m=JSON.parse(await fs.readFile(qa+'/distribution.json')),checks=[],hash=b=>createHash('sha256').update(b).digest('hex');
for(const f of m.files){
 if(f.file==='_headers')continue;
 const route=f.file.endsWith('index.html')?'/'+f.file.slice(0,-10):'/'+f.file,r=await fetch(base+route),b=Buffer.from(await r.arrayBuffer());
 assert.equal(r.status,200,route);assert.equal(hash(b),f.sha256,'Served artifact differs: '+route);assert.equal(r.headers.get('x-content-type-options'),'nosniff');assert.equal(r.headers.get('x-frame-options'),'SAMEORIGIN');
 if(route.startsWith('/games/'))assert.match(r.headers.get('x-robots-tag'),/noindex/);
 if(f.file.endsWith('.html')&&/^(ja|en)\//.test(f.file)){
  assert.doesNotMatch(b.toString(),/content="noindex,\s*nofollow"/);assert.match(b.toString(),/rel="canonical"/);assert.match(b.toString(),/hreflang="ja"/);assert.match(b.toString(),/hreflang="en"/);
 }
 checks.push(route);
}
for(const route of ['/review/','/.git/config','/.env','/game004-magnet-full/main.ts','/game004-public/adapter.ts','/docs/qa/game004-magnet-release-r1/ACCEPTANCE.md'])assert.equal((await fetch(base+route)).status,404,route);
const sitemap=await (await fetch(base+'/sitemap.xml')).text();for(const l of ['ja','en'])for(const t of ['games','play'])assert.ok(sitemap.includes(`/${l}/${t}/project-magnet/`));
assert.equal((await fetch(base+'/en/',{method:'POST'})).status,405);
await fs.writeFile(qa+`/${live?'live':'local'}-distribution.json`,JSON.stringify({status:'PASS',artifactSha256,base,servedExactHashFiles:checks.length,checks,privateRoutes404:true,newSitemapRoutes:4,post405:true},null,2)+'\n');console.log({status:'PASS',servedExactHashFiles:checks.length});
