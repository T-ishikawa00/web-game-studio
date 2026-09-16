import {build} from 'esbuild';
import {readFile,writeFile,mkdir,copyFile,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
import {tsImport} from 'tsx/esm/api';
import {rcEvidenceDir} from './rc-evidence.mjs';
import {projectRoot,projectPath} from './project-path.mjs';
import {transformLightwork} from './lightwork-build.mjs';
import {transformTwoWays,polishHooks} from './rc-game-hooks.mjs';
const out=projectPath('.cache/rc-public'),receipt=[];
const {registry}=await tsImport('../src/data/games.ts',import.meta.url);
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
const hash=b=>createHash('sha256').update(b).digest('hex');
function exact(s,from,to){assert.equal(s.split(from).length-1,1,'RC hook '+from.slice(0,60));return s.replace(from,to);}
function accepted(s,id){if(id==='two-ways-home')return transformTwoWays(s);if(id==='light-garden')return "import './light-polish.css';\n"+exact(transformLightwork(s).source,"from './board-view'","from './light-object-view'");return s;}
function privatePorts(s){return s.replace(/Object\.defineProperty\(window,'(__\w+)',\{value:([^\n]+?)\}\);/g,(_,name,getter)=>`runtimePort.${name}=${getter.replace(/,configurable:true$/,'')};`);}
function fixedCraft(s,prefix){
 s=s.replace(/ try\{const requested=[^\n]+\n/,'');
 s=s.replace(/ function setMode\(value:unknown\)[^\n]+\n/,'');
 s=s.replace(new RegExp(`<label for="${prefix}-mode">[\\s\\S]*?<\\/select>`),'');
 s=s.replace(new RegExp(`,select=dialog.querySelector<HTMLSelectElement>\\('#${prefix}-mode'\\)!`),'').replace('select.value=mode;','');
 s=s.replace(/select\.onchange=\(\)=>\{.*?\};status\(\);/,'status();');
 s=privatePorts(s);s="import {runtimePort} from '../rc/runtime-port';\n"+s;
 return s;
}
const css=(await Promise.all([2,3,4,5].map(n=>readFile(`src/prototypes/game-r${n}.css`,'utf8')))).join('\n');
for(const [id,frozen,file] of [['tiny-delivery','tiny-craft-r2-checkpoint','prototype-assets/game.js'],['light-garden','lightwork-craft-baseline-r1','prototype-assets/light-polish.js'],['two-ways-home','twoways-craft-baseline-r1','prototype-assets/twoways.js']]){
 const dir=path.join(out,'games',id,'rc-r1');await mkdir(dir,{recursive:true});
 // First prove the adopted entry matches the original, minified frozen game bundle.
 const same=await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/game-r2.ts'],outfile:path.join(dir,'game.js'),write:false,bundle:true,format:'esm',target:'es2022',minify:true,plugins:[{name:'adoption-parity',setup(b){if(id==='light-garden')polishHooks(b);b.onLoad({filter:/[\\/]game-r2\.ts$/},async a=>({contents:accepted(await readFile(a.path,'utf8'),id),loader:'ts',resolveDir:path.dirname(a.path)}));}}]});
 const manifest=JSON.parse(await readFile(`docs/qa/${frozen}/frozen-runtime.json`));const expected=manifest.files.find(f=>f.file===file);assert.ok(expected);assert.equal(hash(same.outputFiles.find(f=>f.path.endsWith('.js')).contents),expected.hash,'Adopted game entry byte equivalence: '+id);
 const result=await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/game-r2.ts'],outfile:path.join(dir,'game.js'),bundle:true,format:'esm',target:'es2022',minify:true,metafile:true,legalComments:'external',plugins:[{name:'rc-fixed-profile',setup(b){
  if(id==='light-garden')polishHooks(b);
  b.onLoad({filter:/[\\/]game-r2\.ts$/},async a=>{let s=accepted(await readFile(a.path,'utf8'),id);s=exact(s,"id=params.get('game')",`id='${id}'`);s=s.replace(/let soundVariant=0;try\{[^\n]+/,'const soundVariant=0;');s=privatePorts(s);s="import {runtimePort} from '../rc/runtime-port';\n"+s;if(id==='tiny-delivery')s+="\nimport './music-pilot';\n";return {contents:s,loader:'ts',resolveDir:path.dirname(a.path)};});
  b.onLoad({filter:/[\\/](light|twoways)-craft-runtime\.ts$/},async a=>({contents:fixedCraft(await readFile(a.path,'utf8'),a.path.includes('twoways')?'tw':'lg'),loader:'ts',resolveDir:path.dirname(a.path)}));
  b.onLoad({filter:/[\\/]music-pilot\.ts$/},async a=>{let s=await readFile(a.path,'utf8');s=exact(s,"const query=new URLSearchParams(parent.location.search),condition=query.get('music');","const condition='D1';");s=exact(s,"if(new URLSearchParams(location.search).get('game')==='tiny-delivery'&&['C','D1','D2'].includes(condition??'')){","{");s=s.replace("en=document.documentElement.lang==='en'","en=new URLSearchParams(location.search).get('lang')==='en'");s=s.replace(/ const qa=window[^\n]+/,' const qa=runtimePort;');s=s.replace(/ Object\.defineProperty\(window,'__musicState'[^\n]+/,'');s=s.replace(/<label for="music-direction">[\s\S]*?<\/select>/,'');s=s.replace(/,track=field.querySelector<HTMLSelectElement>\('#music-direction'\)!/,'').replace('track.value=pref.direction;','').replace('on.onchange=track.onchange=gain.oninput','on.onchange=gain.oninput').replace("direction:track.value as 'D1'|'D2'","direction:'D1'");s=s.replace(/  if\(condition==='C'\)[^\n]+/,'').replace('音楽 — 比較候補','音楽').replace('Music — comparison candidate','Music');return {contents:"import {runtimePort} from '../rc/runtime-port';\n"+s,loader:'ts',resolveDir:path.dirname(a.path)};});
  b.onLoad({filter:/[\\/]music-audio\.ts$/},async a=>{let s=await readFile(a.path,'utf8');s=s.replace(/ let repeat=false;[^\n]+\n if\(!repeat[^\n]+/ ," prefs={...prefs,direction:'D1'};");s=s.replace("fetch('/bgm-audio/'+direction+'.wav')","fetch('./music.wav')");return {contents:s,loader:'ts',resolveDir:path.dirname(a.path)};});
 }}]});
 await writeFile(path.join(dir,'base.css'),css);
 const gameTitle=registry.find(g=>g.id===id).title.en.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 await writeFile(path.join(dir,'index.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${gameTitle}</title><link rel="stylesheet" href="./base.css">${id==='light-garden'?'<link rel="stylesheet" href="./game.css">':''}</head><body><main id="game"></main><script type="module" src="./game.js"></script></body></html>`);
 if(id==='tiny-delivery'){await copyFile('docs/qa/tiny-d1-rhythm-01/audio/B.wav',path.join(dir,'music.wav'));assert.equal(hash(await readFile(path.join(dir,'music.wav'))),hash(await readFile('docs/qa/tiny-d1-rhythm-01/audio/B.wav')));}
 receipt.push({id,acceptedOriginalByteEquivalent:true,originalBundle:expected.hash,inputs:Object.keys(result.metafile.inputs),adaptations:['fixed accepted entry','comparison UI and storage removed','private music lifecycle port','fixed asset URL','no window QA API']});
}
await mkdir(path.join(out,'assets'),{recursive:true});
await build({absWorkingDir:projectRoot,entryPoints:['src/rc/shell.ts','src/rc/portal.ts'],outdir:path.join(out,'assets'),bundle:true,format:'esm',target:'es2022',minify:true,legalComments:'external',metafile:true}).then(r=>receipt.push({entry:'shell/portal',inputs:Object.keys(r.metafile.inputs)}));
await copyFile('src/rc/favicon.svg',path.join(out,'favicon.svg'));await writeFile(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
await mkdir(path.join(out,'licenses'),{recursive:true});await copyFile('node_modules/astro/LICENSE',path.join(out,'licenses/astro.txt'));
await mkdir(path.join(out,'covers'),{recursive:true});
// Covers are captured from the actual accepted RC UI, stored in the internal review pack.
for(const id of ['tiny-delivery','light-garden','two-ways-home']){await copyFile(`docs/qa/soft-launch-rc-r1/covers/${id}.png`,path.join(out,'covers',id+'.png'));}
await mkdir(rcEvidenceDir,{recursive:true});
await writeFile(`${rcEvidenceDir}/adoption-equivalence.json`,JSON.stringify(receipt,null,2));
console.log('RC assets: three frozen-equivalent adoption entries, fixed accepted profiles');
