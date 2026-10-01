import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync,execFileSync} from 'node:child_process';
import sharp from 'sharp';
import {publicHtml} from '../scripts/release-prepare.mjs';
import {productionAdsenseHtml} from '../scripts/production-adsense-head.mjs';
import {adaptGame,gameHtml,portalJs,portalCss} from './adapter.mjs';
const task='rimbloom-portal-integration-r1',cache='.cache/'+task,out='release-artifacts/'+task;
const sha=b=>createHash('sha256').update(b).digest('hex');
const json=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const put=(p,b)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,b);};
const copy=(a,b)=>put(b,fs.readFileSync(a));
const walk=(dir,prefix='')=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{assert(!e.isSymbolicLink());return e.isDirectory()?walk(dir+'/'+e.name,prefix+e.name+'/'):[prefix+e.name];});
const replace=(text,a,b)=>{assert.equal(text.split(a).length,2,'Overlay anchor changed');return text.replace(a,b);};
assert.equal(path.resolve('.').toLowerCase(),'c:\\projects\\web game studio');
const integrationBase='a7e7bf417f437ee23d6b2dcbb70bc914defef4e0';
execFileSync('git',['merge-base','--is-ancestor',integrationBase,'HEAD'],{windowsHide:true});
assert.equal(execFileSync('git',['diff','--name-only',integrationBase,'HEAD','--','src','scripts/release-prepare.mjs','scripts/production-adsense-head.mjs','scripts/visual-remaster-game-html.mjs','config/release-production/measurement.json','package.json','package-lock.json'],{encoding:'utf8',windowsHide:true}).trim(),'','Consumed shared inputs changed since accepted integration base');
assert.equal(execFileSync('git',['status','--porcelain','--untracked-files=all','--','src','scripts/release-prepare.mjs','scripts/production-adsense-head.mjs','scripts/visual-remaster-game-html.mjs','config/release-production/measurement.json','package.json','package-lock.json'],{encoding:'utf8',windowsHide:true}).trim(),'','Consumed shared build inputs changed');
const old=json('tinlumo-adsense-legal-final-r1/internal/distribution.json');
assert.equal(old.root,'release-artifacts/tinlumo-adsense-legal-final-r1');
assert.equal(sha(fs.readFileSync('tinlumo-adsense-legal-final-r1/internal/distribution.json')),'5f7df100d29600267de69e17067f9a5b4a443d04028d4c2fce67d13a12379506','Named production manifest changed');
const production=json('tinlumo-adsense-legal-final-r1/release/postflight.json');
assert.equal(production.version,'b5ff0484-ae7d-4df9-ab46-a8aa1eb1db06');assert.equal(production.deploymentId,'d1e09100-b5ea-410c-9dac-89d4ee546689');
const baseline=json(task+'/inputs/RELEASE_BASELINE.json');
assert.equal(baseline.releaseBaselineSha256,'b25d2a4ac01c3d073bff24a80d8d6bc80b33c8ad93d9c45055be892c3959c0e6');
assert.equal(sha(fs.readFileSync(task+'/inputs/RUNTIME_SHA256.tsv')),baseline.releaseBaselineSha256);
for(const entry of json(task+'/inputs/PROVENANCE.json').files)assert.equal(sha(fs.readFileSync(task+'/'+entry.target)),entry.sha256);
for(const entry of old.files)assert.equal(sha(fs.readFileSync(old.root+'/'+entry.file)),entry.sha256,'Released input changed');
const acceptedStates=json(task+'/inputs/HUMAN_ACCEPTANCE.json').statuses;
assert(acceptedStates.includes('FULL_GAME_PRODUCT_ACCEPTED'));
fs.mkdirSync(task+'/internal',{recursive:true});
// The overlay is materialized into an owned cache. Shared source and prior output are read only.
// Resolve the exact task cache before deleting only this task's previous generated cache.
const ownedCache=path.resolve(cache),allowedCache=path.join(path.resolve('.'),'.cache',task);
assert.equal(ownedCache,allowedCache);assert(ownedCache.startsWith(path.join(path.resolve('.'),'.cache')+path.sep));
if(fs.existsSync(ownedCache)){assert(fs.readdirSync(ownedCache).every(name=>['source','assets','temp','astro'].includes(name)));fs.rmSync(ownedCache,{recursive:true,force:true});}
fs.cpSync('src',cache+'/source/src',{recursive:true});
copy('scripts/visual-remaster-game-html.mjs',cache+'/source/scripts/visual-remaster-game-html.mjs');
copy(task+'/adapter.mjs',cache+'/source/scripts/rimbloom-adapter.mjs');
for(const f of ['catalog.ts','copy.ts']){copy('src/production/'+f,cache+'/source/src/production/legacy-'+f);copy(task+'/overlays/'+f,cache+'/source/src/production/'+f);}
copy(task+'/inputs/catalog/ja-en.json',cache+'/source/src/production/rimbloom-catalog.json');
let gp=fs.readFileSync('src/production/GamePage.astro','utf8');
gp=replace(gp,"import fs from 'node:fs';","import fs from 'node:fs';\nimport {gameHtml} from '../../scripts/rimbloom-adapter.mjs';");
gp=replace(gp,"const assets=candidate?`.cache/tinlumo-${candidate}-assets`:'.cache/tinlumo-visual-remaster-assets';",`const assets='${cache}/assets';`);
gp=replace(gp,'const candidate=process.env.TINLUMO_BUILD_CANDIDATE;\n','');
gp=replace(gp,"const html=productionGameHtml(fs.readFileSync(assets+game.buildPath,'utf8'),game,locale);",`const html=game.id==='game007'?gameHtml(fs.readFileSync('${task}/inputs/accepted/index.html','utf8'),locale):productionGameHtml(fs.readFileSync(assets+game.buildPath,'utf8'),game,locale);`);
gp=replace(gp,"game.id!=='project-magnet'&&<AnalyticsConsent", "game.id!=='project-magnet'&&game.id!=='game007'&&<AnalyticsConsent");
put(cache+'/source/src/production/GamePage.astro',gp);
let detail=fs.readFileSync('src/production/Detail.astro','utf8');
detail=replace(detail,'<h1>{game.title[locale]}</h1>','<h1>{game.id===\'game007\'&&locale===\'ja\'?<Fragment>RIMBLOOM<br/><span style="font-size:.5em;white-space:nowrap">（リムブルーム）</span></Fragment>:game.title[locale]}</h1>');
const webgl="<p>{t('WebGL 2に対応し、3D描画を利用できるブラウザーが必要です。','A browser with WebGL 2 and 3D graphics enabled is required.')}</p>";
detail=replace(detail,webgl,"<p>{game.id==='game007'?t('JavaScript、Canvas 2D、ES Modules、Pointer Eventsに対応したブラウザーが必要です。音を利用できない場合も遊べます。縦持ちを推奨します。','Requires JavaScript, Canvas 2D, ES Modules and Pointer Events. Play continues without audio. Portrait orientation is recommended.'):t('WebGL 2に対応し、3D描画を利用できるブラウザーが必要です。','A browser with WebGL 2 and 3D graphics enabled is required.')}</p>");
put(cache+'/source/src/production/Detail.astro',detail);
let cards=fs.readFileSync('src/production/Cards.astro','utf8');
cards+=`\n{!related&&games.length===6&&<style is:global>@media(min-width:951px){.games-section:not(.related) .game-card{width:calc((100% - 32px)/3)}}@media(max-width:375px){.feature-controls{flex-wrap:wrap;top:145px;gap:5px 10px}}</style>}\n`;
put(cache+'/source/src/production/Cards.astro',cards);
let credits=fs.readFileSync('src/production/Credits.astro','utf8');
credits=replace(credits,'ゲーム内の世界・建物・植物・機体は、作品ごとに設計したコードによる3D形状です。カバーは実際のゲーム描画から作成しています。','従来の5作品の世界・建物・植物・機体は、作品ごとに設計したコードによる3D形状で、カバーは実際のゲーム描画から作成しています。RIMBLOOMの制作情報は下記をご覧ください。');
credits=replace(credits,'Worlds, buildings, plants and machines use 3D geometry designed in code for each game. Covers come from real game renders.','The original five games use 3D geometry designed in code for their worlds, buildings, plants and machines, with covers from real game renders. RIMBLOOM credits are listed below.');
credits=replace(credits,'{games.map(game=>','{games.filter(game=>game.id!==\'game007\').map(game=>');
credits=replace(credits,"<h2>{t('サイトと書体','Site & typography')}</h2>",`<section><h2>RIMBLOOM</h2><p>{t('Canvas 2Dで描くオリジナルの形状と、Web Audioによる合成効果音。BGM、外部画像・音源、Three.jsは使用していません。Portalのカバーはコードで制作したlisting画像、詳細ページの場面画像はAcceptedゲームの実描画です。','Original Canvas 2D shapes and synthesized Web Audio effects. No background music, external game imagery or audio, or Three.js. Portal covers are code-created listing artwork; the detail scene comes from an accepted gameplay render.')}</p><a href="/games/game007/1.0.0-r1/credits.txt">{t('作品の制作情報','Game credits')}</a></section><h2>{t('サイトと書体','Site & typography')}</h2>`);
put(cache+'/source/src/production/Credits.astro',credits);
let routes=fs.readFileSync('src/production/pages/[locale]/[...path].astro','utf8');
routes=replace(routes,'games.filter(g=>g.id!==game.id):games','games.filter(g=>g.id!==game.id).slice(0,4):games');
routes=replace(routes,"</Layout>}",`{path==='settings'&&<section class="prose" id="rimbloom-save"><h2>{t('RIMBLOOMの記録を消去','Erase RIMBLOOM records')}</h2><p>{t('ベストスコア・最大連鎖・前回スコア・プレイ回数だけを消去します。ほかのゲームと計測の設定は保持します。','Erase only best score, best chain, previous score and run count. Other games and analytics preferences are preserved.')}</p><button class="button secondary" type="button" data-reset-rimbloom>{t('消去の確認へ','Review deletion')}</button><p id="rimbloom-reset-result" role="status"></p><dialog id="rimbloom-reset"><h2>{t('RIMBLOOMの記録を消去しますか？','Erase RIMBLOOM records?')}</h2><p>{t('元の記録・破損データを消去します。この操作は取り消せません。','This removes the original records, including unreadable data. This cannot be undone.')}</p><div class="actions"><form method="dialog"><button class="button secondary">{t('やめる','Cancel')}</button></form><button class="button coral" type="button" data-confirm-rimbloom-reset>{t('記録を消去','Erase records')}</button></div></dialog></section>}
</Layout>}`);
routes+=`\n{path==='settings'&&<script is:inline type="module" src="/assets/rimbloom-reset.mjs"></script>}\n`;
put(cache+'/source/src/production/pages/[locale]/[...path].astro',routes);
for(const entry of old.files){if(entry.file==='index.html'||entry.file==='404.html'||/^(ja|en)\//.test(entry.file))continue;copy(old.root+'/'+entry.file,cache+'/assets/'+entry.file);}
const base=cache+'/assets/games/game007/1.0.0-r1';
for(const entry of baseline.runtimeFiles)copy(task+'/inputs/accepted/'+entry.file,base+'/'+entry.file);
put(base+'/src/game.mjs',adaptGame(fs.readFileSync(task+'/inputs/accepted/src/game.mjs','utf8')));
copy(task+'/records.mjs',base+'/src/records.mjs');
put(base+'/index.html',gameHtml(fs.readFileSync(task+'/inputs/accepted/index.html','utf8'),'ja'));
put(base+'/portal.mjs',portalJs);put(base+'/portal.css',portalCss);
put(base+'/credits.txt','RIMBLOOM — Tinlumo Studio. Original code-native Canvas 2D visuals and synthesized Web Audio sound effects. No background music. No third-party runtime or external game assets. Human Accepted version 1.0.0-r1; Portal Integration Candidate R1.\n');
copy(task+'/reset.mjs',cache+'/assets/assets/rimbloom-reset.mjs');
await sharp(task+'/inputs/assets/cover-wide-1280x720.png').webp({quality:92}).toFile(cache+'/assets/covers/game007-a.webp');
await sharp(task+'/inputs/assets/thumbnail-square-800x800.png').resize(600,600).extend({top:75,bottom:75,left:0,right:0,background:'#10142b'}).webp({quality:92}).toFile(cache+'/assets/covers/game007-a-portrait.webp');
await sharp(task+'/inputs/evidence/media/chain-hero.png').resize({width:1280,withoutEnlargement:true}).webp({quality:92}).toFile(cache+'/assets/scenes/game007.webp');
fs.mkdirSync(cache+'/temp',{recursive:true});
const run=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build','--config',task+'/astro.config.mjs'],{windowsHide:true,stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1',TEMP:path.resolve(cache+'/temp'),TMP:path.resolve(cache+'/temp')}});
assert.equal(run.status,0,'Candidate Astro build failed');
const measurement=json('config/release-production/measurement.json');
const ownership=fs.readFileSync(old.root+'/ja/index.html','utf8').match(/<meta name="google-adsense-account"[^>]*>/)?.[0];assert(ownership);
const changedRoutes=new Set(['/ja/','/en/',...['ja','en'].flatMap(l=>['games','credits','settings','games/rimbloom','play/rimbloom'].map(p=>'/'+l+'/'+p+'/'))]);
const newRoutes=[...old.routes,'/ja/games/rimbloom/','/en/games/rimbloom/','/ja/play/rimbloom/','/en/play/rimbloom/'].sort();
for(const route of changedRoutes){const file=out+'/'+route.slice(1)+'index.html';let html=fs.readFileSync(file,'utf8');html=publicHtml(html,route,'https://tinlumo.com',/<section\b[^>]*data-analytics-consent/.test(html)?measurement.publicBeaconId:null,{indexable:true});put(file,productionAdsenseHtml(html.replace('</head>',ownership+'</head>')));}
// Preserve every other route byte for byte, including all five games, legal four pages and prior metadata.
for(const entry of old.files){const route=entry.file==='index.html'?'/':entry.file.endsWith('/index.html')?'/'+entry.file.slice(0,-10):null;if(route&&changedRoutes.has(route)||['sitemap.xml','_headers'].includes(entry.file))continue;copy(old.root+'/'+entry.file,out+'/'+entry.file);}
const siteMap=fs.readFileSync(old.root+'/sitemap.xml','utf8').replace('</urlset>',['ja','en'].flatMap(l=>['games','play'].map(p=>`<url><loc>https://tinlumo.com/${l}/${p}/rimbloom/</loc></url>`)).join('')+'</urlset>');put(out+'/sitemap.xml',siteMap);
const csp="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; media-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'";
put(out+'/_headers',fs.readFileSync(old.root+'/_headers','utf8')+'\n/games/game007/*\n  Content-Security-Policy: '+csp+'\n');
const files=walk(out).sort().map(file=>({file,bytes:fs.statSync(out+'/'+file).size,sha256:sha(fs.readFileSync(out+'/'+file))}));
const unchanged=[],changed=[],added=[];for(const entry of files){const before=old.files.find(f=>f.file===entry.file);(before?(before.sha256===entry.sha256?unchanged:changed):added).push(entry.file);}
assert.equal(newRoutes.length,43);assert(added.every(f=>f.includes('game007')||f.includes('rimbloom')));
assert.equal(new Set(newRoutes).size,newRoutes.length);
assert.deepEqual(changed,['_headers','en/credits/index.html','en/games/index.html','en/index.html','en/settings/index.html','ja/credits/index.html','ja/games/index.html','ja/index.html','ja/settings/index.html','sitemap.xml']);
assert(old.files.every(f=>files.some(next=>next.file===f.file)),'Prior payload missing');
const expectedAdded=[...['ja','en'].flatMap(l=>['games','play'].map(p=>`${l}/${p}/rimbloom/index.html`)),...['a.webp','a-portrait.webp'].map(f=>'covers/game007-'+f),'scenes/game007.webp','assets/rimbloom-reset.mjs',...baseline.runtimeFiles.map(f=>'games/game007/1.0.0-r1/'+f.file),...['portal.mjs','portal.css','credits.txt'].map(f=>'games/game007/1.0.0-r1/'+f)].sort();
assert.deepEqual(added,expectedAdded,'Unexpected public payload');
for(const f of old.files.filter(f=>f.file.startsWith('games/')||/^(ja|en)\/(play|privacy|terms)\//.test(f.file)))assert(unchanged.includes(f.file),'Protected release bytes changed');
for(const route of newRoutes){const html=fs.readFileSync(out+'/'+(route==='/'?'index.html':route.slice(1)+'index.html'),'utf8');assert.equal((html.match(/adsbygoogle\.js\?client=/g)||[]).length,1,'Shared AdSense loader contract');}
const runtimeDelta=baseline.runtimeFiles.map(entry=>({file:entry.file,acceptedSha256:entry.sha256,candidateSha256:sha(fs.readFileSync(out+'/games/game007/1.0.0-r1/'+entry.file)),unchanged:entry.sha256===sha(fs.readFileSync(out+'/games/game007/1.0.0-r1/'+entry.file))}));
assert.deepEqual(runtimeDelta.filter(f=>!f.unchanged).map(f=>f.file),['index.html','src/game.mjs','src/records.mjs']);
put(task+'/internal/distribution.json',JSON.stringify({root:out,status:'LOCAL_RELEASE_CANDIDATE_HUMAN_REVIEW_PENDING',routes:newRoutes,files,productionBase:{head:production.commit,version:production.version,deploymentId:production.deploymentId,manifestSha256:'5f7df100d29600267de69e17067f9a5b4a443d04028d4c2fce67d13a12379506'},acceptedBaselineSha256:baseline.releaseBaselineSha256,runtimeDelta,unchangedExistingFiles:unchanged,changedExistingFiles:changed,addedFiles:added,liveProductionChanged:false,physicalDeviceQA:'NOT TESTED',humanIntegrationAcceptance:'PENDING',publicRelease:'NOT AUTHORIZED',releaseBlockers:[{id:'PHYSICAL_SMARTPHONE',status:'NOT TESTED'},{id:'IOS_SAFARI',status:'NOT TESTED'},{id:'LOW_PERFORMANCE_DEVICE',status:'NOT TESTED'},{id:'HUMAN_PORTAL_INTEGRATION_ACCEPTANCE',status:'PENDING'},{id:'ADSENSE_NEW_PLAY_URL_PROVIDER_EXCLUSION',status:'PENDING'},{id:'PUBLIC_DEPLOY_AUTHORIZATION',status:'NOT AUTHORIZED'}],adsense:{siteWideHead:'REUSED_CURRENT_APPROVED_LOADER_CONTRACT',inGameFormats:'DISABLED',providerOperationsPerformed:false,newPlayUrls:['/ja/play/rimbloom/','/en/play/rimbloom/'],providerExclusionVerification:'PENDING'},sourceProvenance:json(task+'/inputs/PROVENANCE.json')},null,2)+'\n');
console.log(JSON.stringify({artifact:out,routes:43,files:files.length,unchanged:unchanged.length,changed,added:added.length,acceptedUnchangedRuntimeModules:6}));
