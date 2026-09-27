import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {build} from 'esbuild';
import sharp from 'sharp';
import {publicHtml} from './release-prepare.mjs';
import {adaptEntry} from './visual-remaster-adapter.mjs';
// Preserve the released artifact/evidence by giving editorial candidates their
// own task, asset cache, Astro cache and output. No-argument behavior is unchanged.
const args=process.argv.slice(2);
assert(args.length===0||(args.length===2&&args[0]==='--candidate'&&/^[a-z][a-z0-9-]*$/.test(args[1])),'Usage: visual-remaster-build.mjs [--candidate name]');
const candidate=args[1];
assert(!candidate||!['visual-remaster-r1','production-remaster-r1','game005-web-v1'].includes(candidate),'Reserved release identity');
const task=candidate?`tinlumo-${candidate}`:'tinlumo-production-remaster-r1', out=candidate?`release-artifacts/tinlumo-${candidate}`:'release-artifacts/tinlumo-visual-remaster-r1', assets=candidate?`.cache/tinlumo-${candidate}-assets`:'.cache/tinlumo-visual-remaster-assets';
const defs=JSON.parse(fs.readFileSync('src/data/visual-release.json')).games;
const hash=b=>createHash('sha256').update(b).digest('hex');
const put=(p,b)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,b);};
const walk=(d,p='')=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{assert(!e.isSymbolicLink());return e.isDirectory()?walk(d+'/'+e.name,p+e.name+'/'):[p+e.name];});
const copy=(a,b)=>put(b,fs.readFileSync(a));
const provenance=[];
const accepted=JSON.parse(fs.readFileSync('docs/qa/game005-release-r1/distribution.json'));
for(const file of accepted.files)assert.equal(hash(fs.readFileSync(accepted.root+'/'+file.file)),file.sha256,'Current artifact changed: '+file.file);
for(const def of defs){
 const base=assets+'/games/'+def.id+'/'+def.version;
 if(def.id==='game005'){
  for(const f of accepted.files.filter(f=>f.file.startsWith('games/game005/'))){
   if(f.file.endsWith('/credits.txt')){
    const credits=fs.readFileSync(accepted.root+'/'+f.file,'utf8');
    const heading='島をつなぐ日 / An Island Connected — Tinlumo Studio. Web v1.';
    assert(credits.startsWith(heading),'Island credits source heading changed');
    put(assets+'/'+f.file,credits.replace(heading,'島をつなぐ日 / An Island Connected — Tinlumo Studio.'));
   }else copy(accepted.root+'/'+f.file,assets+'/'+f.file);
  }
  continue;
 }
 const entry=path.resolve(def.source+'/src/main.ts');
 const result=await build({entryPoints:[entry],bundle:true,format:'esm',target:'es2022',outfile:base+'/game.js',minify:true,sourcemap:false,metafile:true,plugins:[{name:'accepted-runtime-public-adapter',setup(b){
  b.onResolve({filter:/^three$/},()=>({path:path.resolve('game005-island/node_modules/three/build/three.module.js')}));
  b.onResolve({filter:/^three\/addons\//},a=>({path:path.resolve('game005-island/node_modules/three/examples/jsm/'+a.path.slice(13))}));
  b.onLoad({filter:/main\.ts$/},a=>{if(a.path!==entry)return;const original=fs.readFileSync(a.path,'utf8'),contents=adaptEntry(original,def.id);put(task+'/internal/adapted/'+def.id+'.ts',contents);return{contents,loader:'ts'};});
  b.onLoad({filter:/public-copy\.ts$/},a=>{if(def.id!=='project-magnet')return;const source=fs.readFileSync(a.path,'utf8');assert(source.includes('`/index.html?lang=${locale}`'));return{contents:source.replace('`/index.html?lang=${locale}`','`/${locale}/games/project-magnet/`'),loader:'ts'};});
  b.onLoad({filter:/music-audio\.ts$/},a=>{assert.equal(def.id,'tiny-delivery');const original=fs.readFileSync(a.path,'utf8'),pattern=/ let repeat=false;[^\n]+\n if\(!repeat\|\|condition==='C'\)[^\n]+/;assert(pattern.test(original));return{contents:original.replace(pattern," // Accepted Parcel Grove D1, with existing enabled and gain preferences.\n prefs={...prefs,direction:'D1'};").replace("'/bgm-audio/'","'/games/tiny-delivery/parcel-grove-r1/bgm-audio/'"),loader:'ts'};});
 }}]});
 put(task+'/internal/metafiles/'+def.id+'.json',JSON.stringify(result.metafile,null,2)+'\n');
 for(const file of Object.keys(result.metafile.inputs))provenance.push({game:def.id,file,sha256:hash(fs.readFileSync(file))});
 copy(def.source+'/public/'+def.entry,base+'/index.html');
 for(const file of ['game.css',...(def.id==='tiny-delivery'?['full.css']:[])])copy(def.source+'/public/'+file,base+'/'+file);
 copy('game005-island/node_modules/three/LICENSE',base+'/THREE-LICENSE.txt');
 if(def.id==='tiny-delivery')copy(def.source+'/public/bgm-audio/D1.wav',base+'/bgm-audio/D1.wav');
 put(base+'/credits.txt',`${def.title.en} — Tinlumo Studio. Original procedural artwork and sound. ${def.id==='tiny-delivery'?'Original synthesized music.':'No background music.'}\nThree.js — MIT, see THREE-LICENSE.txt.\n`);
}
for(const def of defs){
 const landscape=def.id==='tiny-delivery'?'hakorilo-u1-remaster-r1/public/evidence/cover-a.png':def.id==='game005'?'release-artifacts/game005-web-v1/covers/game005.png':`tinlumo-remaster-wave1/public/evidence/${def.cover}-cover-a.png`;
 const portrait=def.id==='tiny-delivery'?'hakorilo-u1-remaster-r1/public/evidence/cover-a-portrait.png':def.id==='game005'?landscape:`tinlumo-remaster-wave1/public/evidence/${def.cover}-cover-a-portrait.png`;
 const scene=def.id==='tiny-delivery'?'tinlumo-remaster-wave1/public/assets/hakorilo-scene.png':def.id==='game005'?landscape:`tinlumo-remaster-wave1/public/evidence/${def.cover}-scene-a.png`;
 for(const [source,target,width] of [[landscape,'covers/'+def.id+'-a.webp',1280],[portrait,'covers/'+def.id+'-a-portrait.webp',600],[scene,'scenes/'+def.id+'.webp',1280]]){
  const output=await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:92}).toBuffer();put(assets+'/'+target,output);provenance.push({game:def.id,file:source,sha256:hash(fs.readFileSync(source)),output:target,transform:'WebP quality 92; width bounded; no pixel crop or retouch'});
 }
}
copy('src/rc/favicon.svg',assets+'/favicon.svg');
copy('src/rc/analytics-consent.js',assets+'/assets/analytics-consent.js');
copy('src/rc/public-language.js',assets+'/assets/public-language.js');
copy('src/production/portal.js',assets+'/assets/visual-portal.js');
copy('src/production/island-copy.js',assets+'/assets/island-copy.js');
await build({entryPoints:['src/production/settings.ts'],bundle:true,format:'esm',target:'es2022',outfile:assets+'/assets/save-settings.js',minify:true,sourcemap:false});
copy('node_modules/astro/LICENSE',assets+'/licenses/ASTRO-LICENSE.txt');
fs.mkdirSync(task+'/internal/temp',{recursive:true});
const run=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build','--config','astro.visual-remaster.config.mjs'],{stdio:'inherit',windowsHide:true,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1',TINLUMO_BUILD_CANDIDATE:candidate??'',TEMP:path.resolve(task+'/internal/temp'),TMP:path.resolve(task+'/internal/temp')}});assert.equal(run.status,0,'Astro build');
const measurement=JSON.parse(fs.readFileSync('config/release-production/measurement.json'));
const ownership=fs.readFileSync(accepted.root+'/ja/index.html','utf8').match(/<meta name="google-adsense-account"[^>]*>/)?.[0];assert(ownership);
const routes=[];
for(const file of walk(out))if(file==='index.html'||/^(ja|en)\/.*index\.html$/.test(file)){
 const route='/'+file.replace(/index\.html$/,'');routes.push(route);let html=fs.readFileSync(out+'/'+file,'utf8');
 html=publicHtml(html,route,'https://tinlumo.com',/<section\b[^>]*data-analytics-consent/.test(html)?measurement.publicBeaconId:null,{indexable:true});
 put(out+'/'+file,html.replace('</head>',ownership+'</head>'));
}
// Raw game entry points remain noindex, and never contain a Portal/review dependency.
const {productionGameHtml}=await import('./visual-remaster-game-html.mjs');
for(const def of defs){const file=out+'/games/'+def.id+'/'+def.version+'/index.html';put(file,productionGameHtml(fs.readFileSync(file,'utf8'),{...def,buildPath:'/games/'+def.id+'/'+def.version+'/index.html',description:def.summary},'ja'));}
put(out+'/robots.txt','User-agent: *\nAllow: /\nSitemap: https://tinlumo.com/sitemap.xml\n');copy(accepted.root+'/_headers',out+'/_headers');
put(out+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>https://tinlumo.com${route}</loc></url>`).join('')}</urlset>`);
assert.equal(routes.length,1+2*(9+2*defs.length));
// Island engine, CSS and license remain byte-identical. Public HTML and the credits heading receive copy-only adaptation.
for(const f of accepted.files.filter(f=>f.file.startsWith('games/game005/')&&!f.file.endsWith('index.html')&&!f.file.endsWith('/credits.txt')))assert.equal(hash(fs.readFileSync(out+'/'+f.file)),f.sha256);
const files=walk(out).sort().map(file=>({file,bytes:fs.statSync(out+'/'+file).size,sha256:hash(fs.readFileSync(out+'/'+file))}));
put(task+'/internal/distribution.json',JSON.stringify({root:out,status:'LOCAL_RELEASE_CANDIDATE_HUMAN_RELEASE_GATE_PENDING',routes,files,acceptedIslandRuntimeExact:true,publicIslandCopyAdapter:true,islandCreditsCopyEdited:true,sourceProvenance:provenance},null,2)+'\n');
console.log(JSON.stringify({artifact:out,files:files.length,routes:routes.length,bytes:files.reduce((n,f)=>n+f.bytes,0)}));

