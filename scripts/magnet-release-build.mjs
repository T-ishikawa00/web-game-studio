// One-shot production projection from the Human-accepted local artifact.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const qa='docs/qa/game004-magnet-release-r1',out='release-artifacts/game004-production-r1';
const hash=b=>createHash('sha256').update(b).digest('hex');
const json=async p=>JSON.parse(await fs.readFile(p));
const write=async(p,b)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p,b);};
const candidate=await json('docs/qa/game004-magnet-public-r1/distribution.json'),base=await json('docs/qa/mvp-portal-release-r1/distribution-manifest.json');
const entry=await json('src/data/game004-release.json'),catalog=await json('game004-public/catalog.json');
assert.equal(entry.state,'released');assert.equal(entry.version,catalog.version);assert.deepEqual(entry.description,catalog.description);assert.equal(entry.buildPath,'/games/project-magnet/full-r1/index.html');
assert.ok((await fs.readFile('src/data/games.ts','utf8')).includes('magnetRelease as Game'));
assert.equal(await fs.stat(out).then(()=>true,()=>false),false,'Refuse to overwrite an artifact');
const files=[],changed=[],retained=[];let consent=0,seo=0;
for(const f of base.files){assert.equal(hash(await fs.readFile(base.root+'/'+f.file)),f.sha256);if(/^(games\/|assets\/|covers\/|licenses\/|_astro\/)/.test(f.file)){assert.equal(hash(await fs.readFile(candidate.root+'/'+f.file)),f.sha256);retained.push(f.file);}}
for(const f of candidate.files){
 let bytes=await fs.readFile(candidate.root+'/'+f.file);assert.equal(hash(bytes),f.sha256,'Accepted candidate changed: '+f.file);
 if(f.file.endsWith('.html')&&!f.file.startsWith('games/')&&f.file!=='404.html'){
  let s=bytes.toString();if(/content="noindex,\s*nofollow"/.test(s)){s=s.replaceAll(/content="noindex,\s*nofollow"/g,'content="index, follow"');seo++;}
  const play=/^(ja|en)\/play\/project-magnet\/index.html$/.exec(f.file);
  if(play){const lang=play[1];assert.ok(!s.includes('rel="canonical"'));s=s.replace('</head>',`<link rel="canonical" href="https://tinlumo.com/${lang}/play/project-magnet/"><link rel="alternate" hreflang="ja" href="https://tinlumo.com/ja/play/project-magnet/"><link rel="alternate" hreflang="en" href="https://tinlumo.com/en/play/project-magnet/"></head>`);}
  if(s.includes('data-analytics-consent')){assert.ok(s.includes('data-enabled="false"'));s=s.replaceAll('data-enabled="false"','data-enabled="true"').replace('<style>.analytics-consent,[data-open-analytics]{display:none!important}</style>','');consent++;}
  bytes=Buffer.from(s);
 }
 if(['_headers','robots.txt'].includes(f.file))bytes=await fs.readFile(base.root+'/'+f.file);
 if(f.file==='games/project-magnet/full-r1/credits.txt')bytes=Buffer.from(bytes.toString().replace(' Name/trademark and publication rights remain subject to Human Release Gate.',''));
 if(hash(bytes)!==f.sha256)changed.push(f.file);
 await write(out+'/'+f.file,bytes);files.push({file:f.file,bytes:bytes.length,sha256:hash(bytes)});
}
assert.equal(consent,28);assert.equal(seo,31);assert.equal(files.length,62);assert.equal(retained.length,20);
for(const f of files.filter(f=>f.file.endsWith('.html')&&/^(ja|en)\//.test(f.file)))assert.ok(!/content="noindex,\s*nofollow"/.test(await fs.readFile(out+'/'+f.file,'utf8')));
const manifest={status:'HUMAN_RELEASE_APPROVED_PRODUCTION_ARTIFACT',version:'full-r1',root:out,candidateRoot:candidate.root,registry:'src/data/game004-release.json',files,projectionChanges:changed,consentPages:consent,indexedPages:seo,retainedPayloads:retained,acceptedCandidateFiles:62,models:['gpt-6-astra','gpt-5.6-sol'],rollback:{worker:'tinlumo-production',version:'f92b24da-946f-4c22-9464-fe7cf011ff50',deployment:'bdefa828-d1f4-4660-98e1-d5115f940d1c',artifact:base.root,manifest:'docs/qa/mvp-portal-release-r1/distribution-manifest.json'}};
await write(qa+'/distribution.json',JSON.stringify(manifest,null,2)+'\n');
console.log({files:files.length,consent,seo,retained:retained.length,changed:changed.length});
