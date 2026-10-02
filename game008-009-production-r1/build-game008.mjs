import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {root,read,sha,git,put,json,walk,unchanged,verifyManifest,ensureRoot} from './common.mjs';
import {once,card,detail,play,esc} from './html.mjs';
ensureRoot();const run=process.argv[2],reproduce=process.argv.includes('--reproduce');assert(/^[a-z0-9-]+$/.test(run));
const task=root+'/game008',out=root+'/builds/'+run;assert(!fs.existsSync(out),'Use a fresh build name');
const pkg=read(task+'/inputs/PACKAGE_MANIFEST.json'),g=read(task+'/catalog.json');
const entry=reproduce?read(task+'/inputs/PRODUCTION_BASIS.json'):read(root+'/internal/entry.json');
if(!reproduce){assert.equal(git('rev-parse','HEAD'),entry.head);unchanged(fs.existsSync(root+'/internal/preservation-current.json')?read(root+'/internal/preservation-current.json').files:entry.dirty);}
for(const e of pkg.files)assert.equal(sha(fs.readFileSync(task+'/inputs/'+e.file)),e.sha256,e.file);
const basis=task+'/inputs/published-current';
if(!reproduce){const original=read(entry.manifestFile);verifyManifest(original);assert.equal(sha(fs.readFileSync(entry.manifestFile)),entry.manifestSha256);if(!fs.existsSync(basis)){for(const e of original.files)put(basis+'/'+e.file,fs.readFileSync(original.root+'/'+e.file));json(task+'/inputs/PRODUCTION_BASIS.json',{head:entry.head,production:entry.production,files:original.files,routes:entry.routes});}}
const pinned=read(task+'/inputs/PRODUCTION_BASIS.json');assert.equal(pinned.head,entry.head);
for(const e of pinned.files){const b=fs.readFileSync(basis+'/'+e.file);assert.equal(sha(b),e.sha256);put(out+'/'+e.file,b);}
const runtime=out+'/games/game008/1.0.0-r1';
for(const e of read(task+'/inputs/package/build/manifest.json').files){
 if(e.path==='shared/capture.js'||e.path==='index.html')continue;
 let b=fs.readFileSync(task+'/inputs/package/build/'+e.path);
 if(e.path==='coilhop/game.js'){
  let s=b.toString();s=once(s,"import { attachCapture } from '../shared/capture.js';\n",'');s=once(s,'resize(); attachCapture(canvas, synth); requestAnimationFrame(loop);','resize(); requestAnimationFrame(loop);');b=Buffer.from(s);
 }
 if(e.path==='coilhop/style.css')b=Buffer.from(b.toString().replace(/\/\* The optional local capture tools[^]*$/,'')+'\n/* Portal embedding preserves the standalone 320px content width. */\nhtml{scrollbar-width:none}html::-webkit-scrollbar{display:none}\n');
 put(runtime+'/'+e.path,b);
}
for(const name of ['portal.mjs','observe.mjs'])put(runtime+'/'+name,fs.readFileSync(task+'/'+name));
for(const name of ['worker.mjs','limits.mjs','event-schema.mjs']){
 let s=fs.readFileSync(root+'/inputs/backend/'+name,'utf8');
 if(name==='event-schema.mjs'){
  s=once(s,"['tiny-delivery','rimbloom'].includes(p.game_id)","['tiny-delivery','rimbloom','coilhop'].includes(p.game_id)");
  s=once(s,"if(p.campaign.startsWith('hakorilo_')", "if(p.game_id==='coilhop'&&p.campaign!=='direct')return false;\n if(p.campaign.startsWith('hakorilo_')");
 }
 put(task+'/runtime/'+name,s);
}
let client=fs.readFileSync(basis+'/assets/growth-client.js','utf8');
client=once(client,"/\\/play\\/rimbloom\\/$/.test(route)?'rimbloom':null", "/\\/play\\/rimbloom\\/$/.test(route)?'rimbloom':/\\/play\\/coilhop\\/$/.test(route)?'coilhop':null");put(out+'/assets/growth-client.js',client);
for(const l of ['ja','en']){
 for(const p of ['index.html','games/index.html']){
  const f=l+'/'+p;let h=fs.readFileSync(basis+'/'+f,'utf8');const cards=[...h.matchAll(/<article class="game-card"[\s\S]*?<\/article>/g)];assert.equal(cards.length,6);const last=cards.at(-1)[0];h=once(h,last,last+card(g,l));put(out+'/'+f,h);
 }
 put(out+'/'+l+'/games/'+g.slug+'/index.html',detail(fs.readFileSync(basis+'/'+l+'/games/rimbloom/index.html','utf8'),g,l));
 put(out+'/'+l+'/play/'+g.slug+'/index.html',play(fs.readFileSync(basis+'/'+l+'/play/rimbloom/index.html','utf8'),g,l));
 const credit=l+'/credits/index.html';let h=fs.readFileSync(basis+'/'+credit,'utf8');h=once(h,'</main>',`<section class="prose"><h2>${esc(g[l].title)}</h2><p>${esc(g[l].credits)}</p></section></main>`);put(out+'/'+credit,h);
 const settings=l+'/settings/index.html';h=fs.readFileSync(basis+'/'+settings,'utf8');h=once(h,'</main>',`<section class="operations"><h2>COILHOP</h2><p>${esc(g[l].save)}</p><a href="/${l}/play/coilhop/">${l==='ja'?'ゲーム内で記録をリセット':'Reset records in the game'} →</a></section></main>`);put(out+'/'+settings,h);
 const privacy=l+'/privacy/index.html';h=fs.readFileSync(basis+'/'+privacy,'utf8');h=once(h,'</main>',`<section class="prose"><h2>COILHOP</h2><p>${esc(g[l].save)}</p></section></main>`);put(out+'/'+privacy,h);
}
// Existing consent timing, TTL, withdrawal and Consent C/CMP separation survive.
for(const f of walk(out).filter(f=>f.endsWith('.html'))){let h=fs.readFileSync(out+'/'+f,'utf8');h=h.replaceAll('HakoriloとRIMBLOOM','Hakorilo、RIMBLOOM、COILHOP').replaceAll('Hakorilo and RIMBLOOM','Hakorilo, RIMBLOOM and COILHOP');put(out+'/'+f,h);}
await sharp(task+'/inputs/package/marketing/cover-wide.png').resize(1280,720).webp({quality:92}).toFile(out+g.cover);
await sharp(task+'/inputs/package/marketing/cover-square.png').resize(600,600).extend({top:75,bottom:75,left:0,right:0,background:'#183c43'}).webp({quality:92}).toFile(out+g.thumbnail);
await sharp(task+'/inputs/package/marketing/clips/frames/preview-first-four-hops.png').webp({quality:90}).toFile(out+'/scenes/game008.webp');
const headers=fs.readFileSync(out+'/_headers','utf8');put(out+'/_headers',headers+"\n/games/game008/*\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; media-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'none'\n");
const files=walk(out).map(file=>{const b=fs.readFileSync(out+'/'+file);return {file,bytes:b.length,sha256:sha(b)};});
const changed=files.filter(e=>fs.existsSync(basis+'/'+e.file)&&sha(fs.readFileSync(basis+'/'+e.file))!==e.sha256).map(e=>e.file),added=files.filter(e=>!fs.existsSync(basis+'/'+e.file)).map(e=>e.file);
assert(changed.every(f=>f==='_headers'||f==='assets/growth-client.js'||/^(ja|en)\/(index\.html|games\/index\.html|credits\/index\.html|settings\/index\.html|privacy\/index\.html|play\/(tiny-delivery|rimbloom)\/index\.html)$/.test(f)), 'Unexpected existing change '+changed);
assert(pinned.files.every(e=>fs.existsSync(out+'/'+e.file)));
const routes=[...pinned.routes,...['ja','en'].flatMap(l=>['games','play'].map(type=>'/'+l+'/'+type+'/coilhop/'))].sort();
const manifest={at:new Date().toISOString(),game:'game008',sourceHead:entry.head,productionBefore:entry.production,root:out,routes,files,changed,added,preserved:pinned.files.length-changed.length,standaloneRuntimeBaseline:pkg.acceptedRuntimeBaseline,gameplayCoreByteExact:['coilhop/courses.js','coilhop/physics.js','coilhop/render.js','shared/save.js','shared/audio.js'],shellOnlyChanges:['capture import/call and unused capture CSS removed','same-origin outer growth/navigation adapter'],growth:'EXISTING_SCHEMA_NEW_GAME_ID_ONLY_STAGE_NONE_DIRECT_CAMPAIGN',publicGames:7};
json(task+'/RELEASE_MANIFEST.json',manifest);
const config=read(root+'/inputs/production-config.json');config.main='runtime/worker.mjs';config.assets.directory=path.relative(task,out).replaceAll('\\','/');json(task+'/wrangler.production.json',config);
json(root+'/internal/game008-build-'+run+'.json',{status:'PASS',...manifest});console.log(JSON.stringify({status:'PASS',game:manifest.game,files:files.length,routes:routes.length,changed:changed.length,added:added.length,preserved:manifest.preserved}));
