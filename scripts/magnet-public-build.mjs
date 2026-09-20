// Isolated packaging only. No Production registry, source, artifact or provider writes.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {build} from 'vite';
import {projectRoot,projectPath} from './project-path.mjs';
assert.equal(path.resolve(process.cwd()).toLowerCase(),projectRoot.toLowerCase());
const qa='docs/qa/game004-magnet-public-r1',out='.cache/game004-public-candidate',gameOut='.cache/game004-public-game',stage='.tmp/magnet-public-r1/source';
const sha=b=>createHash('sha256').update(b).digest('hex');
const write=async(f,b)=>{await fs.mkdir(path.dirname(f),{recursive:true});await fs.writeFile(f,b);};
const replace=(s,a,b)=>{assert.equal(s.split(a).length,2,'Exact transform mismatch: '+a);return s.replace(a,b);};
const catalog=JSON.parse(await fs.readFile('game004-public/catalog.json'));
// Remove only files from this task's previous generated manifest, never baselines.
try {
 const previous=JSON.parse(await fs.readFile(qa+'/distribution.json'));
 assert.equal(previous.root,out);
 assert.deepEqual((await walk(out)).sort(),previous.files.map(f=>f.file).sort(),'Unexpected output file; refuse redistribution');
 for(const f of previous.files){
  const target=path.resolve(out,f.file),boundary=path.resolve(out)+path.sep;
  assert.ok(target.startsWith(boundary));
  await fs.unlink(target).catch(e=>{if(e.code!=='ENOENT')throw e;});
 }
} catch(e) { if(e.code!=='ENOENT')throw e;const existing=await walk(out).catch(err=>{if(err.code==='ENOENT')return [];throw err;});assert.equal(existing.length,0,'Unowned output directory'); }
const frozen=JSON.parse(await fs.readFile('docs/qa/game004-magnet-full-baseline-r1/frozen-manifest.json'));
const transforms=[];
for(const a of frozen.artifacts.filter(a=>a.file.startsWith('game004-magnet-full/'))){
 const bytes=await fs.readFile(a.file);assert.equal(sha(Buffer.from(bytes.toString().replaceAll('\r\n','\n'))),a.canonicalSha256,'Frozen source changed');
 const name=a.file.split('/').at(-1);if(name==='review.html')continue;
 let s=bytes.toString().replaceAll('\r\n','\n');
 if(name==='main.ts'){
  s="import {publicCopy} from './public-adapter';\n"+s;
  s=replace(s,"new URLSearchParams(location.search).get('lang')??store.data.settings.locale","new URLSearchParams(location.search).get('lang')??(/^\\/(ja|en)\\/play\\//.exec(location.pathname)?.[1])??store.data.settings.locale");
  s=replace(s,"!=='en',choiceSignature='';","!=='en',choiceSignature='';store.data.settings.locale=ja?'ja':'en';");
  s=replace(s,"ja=store.data.settings.locale==='ja';","ja=(new URLSearchParams(location.search).get('lang')??(/^\\/(ja|en)\\/play\\//.exec(location.pathname)?.[1])??store.data.settings.locale)==='ja';store.data.settings.locale=ja?'ja':'en';");
  s=replace(s,"if(toastUntil&&world.time>toastUntil)","publicCopy(ja,muted,userPaused,world.reduced);if(toastUntil&&world.time>toastUntil)");
  s=replace(s,' WRECKS / '," ${tr('WRECKS','撃破')} / " );
  s=replace(s,' OF 6`',' / 6`');
  s=replace(s,"world.kills+' WRECKS'","world.kills+tr(' WRECKS',' 撃破')");
  for(const [en,ja] of [['FLANK THE SHIELD · OR CRACK ITS PLATE','盾の側面へ回り込むか、装甲を砕く'],['BAIT THE CHARGE · STRIKE THE OPEN CORE','突進を誘い、開いた中枢を狙う'],['FURNACE SHIFT / HOLD YOUR GROUND','炉心が切り替わる / 位置を保つ']])s=replace(s,`toast('${en}',`,`toast(tr('${en}','${ja}'),`);
  const lines=s.split('\n'),api=lines.filter(l=>l.startsWith("Object.defineProperty(window,'__magnet'"));assert.equal(api.length,1);s=lines.filter(l=>!l.startsWith("Object.defineProperty(window,'__magnet'")).join('\n');
 }
 if(name==='audio.ts')s=replace(s,'  captureStream(): MediaStream | null {\n    return this.disposed ? null : this.capture?.stream ?? null;\n  }','');
 if(name==='index.html'){
  s=replace(s,'MAGNET · Full Game · Local Review','PROJECT MAGNET | Tinlumo');
  s=replace(s,'href="/review/" aria-label="Open review pack"','href="/en/games/project-magnet/" aria-label="Return to Tinlumo"');
 }
 if(['main.ts','audio.ts','index.html'].includes(name))transforms.push({file:a.file,reason:name==='main.ts'?'Locale route/presentation adapter; remove readonly QA API':name==='audio.ts'?'Remove unreachable capture accessor':'Public title/return link'});
 await write(stage+'/'+name,s);
}
await write(stage+'/public-adapter.ts',await fs.readFile('game004-public/adapter.ts'));
const modules=new Set();
await build({configFile:false,root:projectPath(`${projectRoot}/${stage}`),base:'/games/project-magnet/full-r1/',publicDir:false,plugins:[{name:'record-public-inputs',generateBundle(_o,bundle){for(const chunk of Object.values(bundle))if(chunk.type==='chunk')for(const m of Object.keys(chunk.modules))modules.add(m.replaceAll('\\','/').replace(projectRoot.replaceAll('\\','/')+'/',''));}}],build:{modulePreload:false,outDir:projectPath(`${projectRoot}/${gameOut}`),emptyOutDir:true,rollupOptions:{input:projectPath(`${projectRoot}/${stage}/index.html`)}}});
await write(gameOut+'/licenses/vite.txt',await fs.readFile('node_modules/vite/LICENSE.md'));
await write(gameOut+'/credits.txt','PROJECT MAGNET — Tinlumo Studio\nOriginal AI-assisted Canvas artwork, code and synthesized Web Audio. No third-party media, samples, music or font files. System fonts only. No public source license is granted. Vite tool notice: licenses/vite.txt. Name/trademark and publication rights remain subject to Human Release Gate.\n');
const baseManifest=JSON.parse(await fs.readFile('docs/qa/mvp-portal-release-r1/distribution-manifest.json'));
const baseRoot=baseManifest.root,changed=[];
for(const item of baseManifest.files){
 let b=await fs.readFile(baseRoot+'/'+item.file);assert.equal(sha(b),item.sha256,'Accepted Portal distribution changed: '+item.file);
 if(item.file.endsWith('.html')){
  let s=b.toString().replaceAll('content="index, follow"','content="noindex, nofollow"');
  s=s.replaceAll('Three original browser puzzles. 日本語と英語で遊ぶ3つのパズル。','Original browser puzzles and magnetic action. 日本語と英語で遊ぶパズルと磁力アクション。').replaceAll('Three little adventures.','Four little adventures.').replaceAll('3つの、小さな冒険。','4つの、小さな冒険。').replaceAll('three small puzzle games','three small puzzle games and a magnetic action game').replaceAll('All three games','All four games').replaceAll('3つの小さなパズルゲームを集めた','3つの小さなパズルゲームと磁力アクションを集めた').replaceAll('provides three free browser games','provides four free browser games').replaceAll('3つの無料ブラウザゲーム','4つの無料ブラウザゲーム');
  // Local candidate explicitly disables analytics even if a stored consent exists.
  s=s.replaceAll('data-enabled="true"','data-enabled="false"');
  if(s.includes('data-analytics-consent'))s=replace(s,'</head>','<style>.analytics-consent,[data-open-analytics]{display:none!important}</style></head>');
  const ja=item.file.startsWith('ja/'),lang=ja?'ja':'en',desc=catalog.description[lang];
  if(/^(ja|en)\/(games\/)?index\.html$/.test(item.file)){
   const card=`<article class="game-card" data-magnet-card><a href="/${lang}/play/project-magnet/" aria-label="PROJECT MAGNET — ${ja?'遊ぶ':'Play'}"><div class="game-cover"><img src="/covers/project-magnet.png" width="1280" height="800" alt="${ja?'磁力で集めた金属を運搬機へ射出する実プレイ画面':'Gameplay: collected metal launched at the armored carrier'}" loading="lazy"></div></a><div class="card-body"><h3><a href="/${lang}/games/project-magnet/">PROJECT MAGNET</a></h3><p>${desc}</p><div class="card-bottom"><a class="text-link" href="/${lang}/games/project-magnet/">${ja?'遊び方':'Details'}</a><a class="button primary" href="/${lang}/play/project-magnet/">${ja?'遊ぶ':'Play'} →</a></div></div></article>`;
   s=replace(s,'<div class="card-grid rc-cards">','<div class="card-grid rc-cards">'+card);
   s=s.replaceAll('Three little adventures.','Four little adventures.').replaceAll('3つの、小さな冒険。','4つの、小さな冒険。').replaceAll('57 puzzles · Japanese / English','Puzzle & action · Japanese / English').replaceAll('全57問 · 日本語 / English','パズルとアクション · 日本語 / English');
  }
  if(/\/(privacy|terms)\/index\.html$/.test(item.file)){
   const extra=ja?'<h2>PROJECT MAGNETの保存</h2><p>作戦の解放、記録、言語・消音・動きの設定、区画開始時点の再開データを、このブラウザに保存します。作戦画面のデータ消去では、PROJECT MAGNETの設定も含めてすべて消去します。他の作品の保存は変更しません。保存できない場合は画面に表示し、そのタブ内でのみ続行します。</p>':'<h2>PROJECT MAGNET saves</h2><p>Mission unlocks, records, language, mute, motion preferences and a sector-start checkpoint are saved in this browser. Resetting PROJECT MAGNET deletes its settings as well as its progress. Other games are unaffected. If saving is unavailable, the game tells you and lets you continue in this tab only.</p>';
   s=replace(s,'</article></main>',extra+'</article></main>');
   if(item.file.includes('/privacy/'))s=s.replace(ja?'「この作品の進行を消去」は':'“Erase this game’s progress” removes',ja?'Hakorilo・ひかりの仕掛け庭・ふたりの帰り道の「この作品の進行を消去」は':'For Hakorilo, Lightwork Garden and Two Ways Home, “Erase this game’s progress” removes');
  }
  if(item.file.endsWith('/credits/index.html'))s=replace(s,'</article></main>',`<h2>PROJECT MAGNET</h2><p>${ja?'Tinlumo StudioによるAI支援制作。Canvas描画、コード、Web Audio合成効果音は同作品用のオリジナル。外部の画像・音源・フォントファイルは使用していません。カードは実プレイ画面です。':'AI-assisted development by Tinlumo Studio. Original Canvas artwork, code and synthesized Web Audio effects. No external media or font files. The card shows actual gameplay.'}</p><p><a href="/games/project-magnet/full-r1/credits.txt">${ja?'制作情報':'Game credits'}</a> · <a href="/games/project-magnet/full-r1/licenses/vite.txt">Vite (MIT / notices)</a></p></article></main>`);
  b=Buffer.from(s);
 }
 if(item.file==='sitemap.xml')b=Buffer.from(b.toString().replace('</urlset>',['ja','en'].flatMap(l=>['games','play'].map(t=>`<url><loc>https://tinlumo.com/${l}/${t}/project-magnet/</loc></url>`)).join('')+'</urlset>'));
 if(item.file==='robots.txt')b=Buffer.from('User-agent: *\nDisallow: /\n');
 if(item.file==='_headers')b=Buffer.from("/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: SAMEORIGIN\n  Cache-Control: no-cache\n  Referrer-Policy: no-referrer\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; connect-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'self'\n");
 if(sha(b)!==item.sha256)changed.push(item.file);
 await write(out+'/'+item.file,b);
}
await write(out+'/covers/project-magnet.png',await fs.readFile(catalog.coverSource));
const gameFiles=[];async function walk(dir,prefix=''){const files=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){assert.ok(!e.isSymbolicLink());const f=prefix+e.name;if(e.isDirectory())files.push(...await walk(dir+'/'+e.name,f+'/'));else files.push(f);}return files;}
for(const file of await walk(gameOut)){const b=await fs.readFile(gameOut+'/'+file);assert.ok(!/review|\.map$/.test(file));if(file.endsWith('.js'))assert.ok(!/__magnet|captureStream|localhost|127\.0\.0\.1|\/review\//.test(b.toString()));await write(out+'/games/project-magnet/full-r1/'+file,b);gameFiles.push({file,bytes:b.length,sha256:sha(b)});}
for(const lang of ['ja','en']){
 const ja=lang==='ja',desc=catalog.description[lang];let shell=await fs.readFile(out+'/'+lang+'/games/tiny-delivery/index.html','utf8');
 shell=shell.replaceAll('tiny-delivery','project-magnet').replaceAll('Hakorilo — ちいさな配送パズル','PROJECT MAGNET').replaceAll('Hakorilo','PROJECT MAGNET');
 shell=shell.replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${desc}">`).replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${desc}">`);
 const main=`<main id="main" class="wrap"><div class="breadcrumb"><a href="/${lang}/games/">← ${ja?'すべてのゲーム':'All games'}</a></div><section class="detail-hero"><img class="detail-cover" src="/covers/project-magnet.png" width="1280" height="800" alt="${ja?'PROJECT MAGNETの実プレイ画面':'PROJECT MAGNET gameplay'}"><div class="detail-copy"><span class="badge">${ja?'3作戦 · 18区画':'3 missions · 18 sectors'}</span><h1>PROJECT MAGNET</h1><p>${desc}</p><a class="button primary" href="/${lang}/play/project-magnet/">${ja?'遊ぶ':'Play'} →</a><dl class="game-facts"><div><dt>${ja?'操作':'Controls'}</dt><dd>${ja?'マウス・キーボード / 2本指タッチ':'Mouse + keyboard / two-finger touch'}</dd></div><div><dt>${ja?'進化':'Evolution'}</dt><dd>SWARM / LANCE → 4 ${ja?'最終形態':'final forms'}</dd></div></dl></div></section><section class="how-to"><h2>${ja?'まずは作戦Aから':'Start with Mission A'}</h2><p>${ja?'WASDまたは矢印で移動。金属の近くで押し続け、敵を狙って離すと一斉射出。タッチは左指で移動、右指で吸引・照準し、右指を離して射出します。':'Move with WASD or arrow keys. Hold near metal, aim at an enemy, then release to launch. On touch screens, move with your left thumb; gather and aim with your right thumb, then release it.'}</p><p>${ja?'壊した装甲を回収して設備へ送電。区画をクリアして進化を選び、作戦Aを完了するとB、Bを完了するとCが開きます。':'Gather broken armor to power the relays. Clear sectors and choose upgrades. Complete Mission A to unlock B, then B to unlock C.'}</p><p>${ja?'作戦・記録・設定は同じ端末とブラウザに保存。途中で離れても、作戦画面から区画のはじめに戻って再開できます。クラウド保存はありません。':'Missions, records and settings save on this device in this browser. Return to the mission screen to resume from the start of your saved sector. There is no cloud save.'}</p><p>${ja?'Ⅱで一時停止。音と動きの量は上部で切り替えられます。クリアや失敗の後は「もう一度」ですぐ再挑戦できます。保存失敗や破損は画面に表示し、元データを勝手に消しません。':'Use Ⅱ to pause, and the sound and motion buttons to adjust playback. Retry after a clear or defeat. Save failures and damaged saves are shown on screen; original data is kept until you choose to reset it.'}</p><p><a href="/${lang}/privacy/">${ja?'保存とデータについて':'About saves and data'}</a> · <a href="/${lang}/credits/">${ja?'クレジット':'Credits'}</a></p></section></main>`;
 shell=shell.replace(/<main[\s\S]*?<\/main>/,main);await write(out+'/'+lang+'/games/project-magnet/index.html',shell);
 const game=await fs.readFile(gameOut+'/index.html','utf8');await write(out+'/'+lang+'/play/project-magnet/index.html',game.replace('<html lang="ja">',`<html lang="${lang}">`));
}
const files=[];for(const file of await walk(out)){const b=await fs.readFile(out+'/'+file);files.push({file,bytes:b.length,sha256:sha(b)});}
const report={status:'LOCAL_CANDIDATE_BUILT',root:out,gameOnlyRoot:gameOut,baseRoot,baseFilesVerified:baseManifest.files.length,baseSourceManifest:'docs/qa/mvp-portal-release-r1/distribution-manifest.json',changedBaseFiles:changed,files,gameOnlyFiles:gameFiles,transforms,modules:[...modules],cover:{source:catalog.coverSource,sha256:sha(await fs.readFile(catalog.coverSource))},productionRegistryWrites:0,externalWrites:0,deploy:0};
await write(qa+'/distribution.json',JSON.stringify(report,null,2));console.log({files:files.length,gameFiles:gameFiles.length,bytes:files.reduce((s,f)=>s+f.bytes,0),baseVerified:baseManifest.files.length});
