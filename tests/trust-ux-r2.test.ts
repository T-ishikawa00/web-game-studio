import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {publicGames} from '../src/rc/public-catalog';
const production=process.env.TINLUMO_TRUST_RELEASE==='1';
const qa=production?'docs/qa/tinlumo-trust-ux-r2-release':'docs/qa/tinlumo-trust-ux-r2';
const manifest=JSON.parse(await fs.readFile(qa+'/distribution.json','utf8'));
const files=new Set<string>(manifest.files.map((f:{file:string})=>f.file));
const root=manifest.root;
const html=(file:string)=>fs.readFile(root+'/'+file,'utf8');
const sha=(b:Buffer)=>createHash('sha256').update(b).digest('hex');

test('Public distribution contains only selected games and complete JA/EN routes, references and anchors',async()=>{
 const expected=['index.html','404.html'];
 for(const locale of ['ja','en']){
  for(const page of ['','games/','about/','privacy/','terms/','contact/','credits/','video-policy/'])expected.push(`${locale}/${page}index.html`);
  for(const game of publicGames)for(const kind of ['games','play'])expected.push(`${locale}/${kind}/${game.slug}/index.html`);
 }
 assert.deepEqual([...files].filter(f=>f.endsWith('.html')&&!f.startsWith('games/')).sort(),expected.sort());
 for(const file of files){
  assert.ok(!/design-preview|connection-lab|prototype|\.map$|\.key$|\.env|review|source\//i.test(file),file);
  if(!file.endsWith('.html')||file.startsWith('games/'))continue;
  const content=await html(file);
  for(const match of content.matchAll(/(?:src|href)="([^"#][^"]*)"/g)){
   const url=new URL(match[1]!.replaceAll('&amp;','&'),'https://tinlumo.com/'+file);
   if(url.origin!=='https://tinlumo.com')continue;
   let target=url.pathname.slice(1);if(target===''||target.endsWith('/'))target+='index.html';
   assert.ok(files.has(target),`${file} -> ${target}`);
   if(url.hash)assert.ok((await html(target)).includes(`id="${url.hash.slice(1)}"`),`${file}: broken anchor ${url.hash}`);
  }
  assert.match(content,production&&file!=='404.html'?/content="index, follow"/:/noindex,\s*nofollow/);
 }
});
test('Home primary links and all cross-game recommendations agree with the public selection',async()=>{
 for(const locale of ['ja','en']){
  for(const suffix of ['', 'games/']){
   const content=await html(`${locale}/${suffix}index.html`);
   assert.equal((content.match(/class="card-play-link"/g)||[]).length,publicGames.length);
   assert.equal((content.match(/class="card-details text-link"/g)||[]).length,publicGames.length);
  }
  for(const game of publicGames)for(const kind of ['games','play']){
   const content=await html(`${locale}/${kind}/${game.slug}/index.html`);
   if(game.id==='project-magnet'&&kind==='play'){
    assert.ok(content.includes(`href="/${locale}/games/${game.slug}/#related-games"`));continue;
   }
   const related=content.slice(content.indexOf('id="related-games"'));
   assert.equal((related.match(/class="card-play-link"/g)||[]).length,publicGames.length-1);
   for(const other of publicGames.filter(g=>g.id!==game.id))assert.ok(related.includes(`href="/${locale}/play/${other.slug}/"`));
   assert.ok(!related.includes(`href="/${locale}/play/${game.slug}/"`));
  }
 }
});
test('Accepted game payloads and save adapters retain baseline bytes; consent matches approved production source',async()=>{
 for(const f of manifest.retained)assert.equal(sha(await fs.readFile(root+'/'+f.file)),f.sha256,f.file);
 const baseline=JSON.parse(await fs.readFile('docs/qa/tinlumo-trust-ux-r2/preflight.json','utf8'));
 for(const file of ['src/prototypes/state.ts','src/rc/shell.ts','config/release-production/measurement.json','config/release-production/wrangler.json']){
  assert.equal(sha(await fs.readFile(file)),baseline.files.find((f:{file:string})=>f.file===file).sha256,file);
 }
 assert.equal(sha(await fs.readFile(root+'/assets/analytics-consent.js')),sha(await fs.readFile('src/rc/analytics-consent.js')));
 assert.equal(manifest.retained.length,25);
 for(const locale of ['ja','en'])for(const page of ['','privacy/','terms/','contact/','video-policy/']){
  const content=await html(`${locale}/${page}index.html`);
  assert.ok(content.includes('data-enabled="true"'));
  assert.ok(!content.includes('beacon.min.js'));
  assert.ok(content.includes('data-close-analytics'));
 }
});
test('Public copy has consistent counts, separated inquiry types, rights exceptions and explicit editorial dates',async()=>{
 for(const locale of ['ja','en']){
  for(const page of ['','about/','terms/']){
   const content=await html(`${locale}/${page}index.html`);
   assert.ok(content.includes(String(publicGames.length)));
   assert.ok(!/Three little|three free|All three|3つの無料|3つの、小さな/.test(content));
  }
  const contact=await html(`${locale}/contact/index.html`);
  assert.ok(contact.indexOf('id="general"')<contact.indexOf('id="operator"'));
  assert.ok(contact.indexOf('id="operator"')<contact.indexOf('id="data-requests"'));
  assert.match(contact,locale==='ja'?/本人確認書類の提出は原則として求めません/:/do not normally ask for identity documents/);
  for(const page of ['privacy','terms','video-policy']){
   const content=await html(`${locale}/${page}/index.html`);
   if(production){
    assert.ok(!content.includes('data-public-unresolved'));
    assert.equal((content.match(/<time>2026-09-21<\/time>/g)||[]).length,2);
    assert.ok(!/未適用|Not yet effective/.test(content));
   }else{
    assert.ok(content.includes('data-public-unresolved'));
    assert.match(content,locale==='ja'?/未適用/:/Not yet effective/);
   }
  }
  const terms=await html(`${locale}/terms/index.html`);
  assert.match(terms,locale==='ja'?/動画利用方針、適用法令/:/permitted by our video policy, law/);
  if(production){
   const policy=await html(`${locale}/video-policy/index.html`);
   assert.match(policy,/Shorts/);assert.match(policy,/TikTok/);
   assert.match(policy,locale==='ja'?/クリエイター向け収益化/:/creator monetization/);
  }
 }
});
