import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {prototypes} from '../src/prototypes/catalog';
import {games} from '../src/data/games';
async function files(dir:string):Promise<string[]>{return(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();}
test('normal and design outputs contain no prototype routes, code, artwork or solutions',async()=>{
  for(const dir of ['dist','.cache/visual-dist'])for(const file of await files(dir)){
    assert.doesNotMatch(file,/prototype|light-garden|two-ways-home|tiny-delivery/);
    if(/\.(html|js|json|svg)$/.test(file))assert.doesNotMatch(await readFile(file,'utf8'),/wgs-prototype-v1|light-garden|two-ways-home|tiny-delivery|Lightwork Garden|Tiny Delivery/);
  }
  assert.equal(games.filter(g=>g.state==='released').length,0);assert.equal(games.length,1);assert.equal(prototypes.length,3);assert.ok(prototypes.every(g=>g.state==='draft'&&g.ads.mode==='disabled'));
});
test('prototype output contains 8 localized routes, runtime and art; no answer dataset or design sample assets',async()=>{
  const dir='.cache/prototype-dist';
  for(const locale of ['ja','en'])for(const suffix of ['',...prototypes.map(g=>`play/${g.slug}/`)]){
    const html=await readFile(`${dir}/${locale}/prototypes/${suffix}index.html`,'utf8');assert.match(html,/PROTOTYPE/);assert.match(html,new RegExp(`lang="${locale}"`));assert.match(html,/noindex/);
    const res=await fetch(`http://127.0.0.1:4324/${locale}/prototypes/${suffix}`);assert.equal(res.status,200);
  }
  for(const name of ['game.js','shell.js','game.html','game.css',...prototypes.map(g=>`${g.id}.svg`)])assert.ok((await stat(`${dir}/prototype-assets/${name}`)).size>100);
  for(const file of await files(dir)){
    assert.doesNotMatch(file,/design-art|design-preview|level-answers|solutions/);
    if(/\.(html|js|json)$/.test(file))assert.doesNotMatch(await readFile(file,'utf8'),/"intermediate"|"solution"|"after"\s*:/);
  }
});
