import {build} from 'esbuild';
import {writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {projectPath,projectRoot} from './project-path.mjs';
import path from 'node:path';
export async function createPrototypeCovers(assets){
 const module=projectPath(path.join(projectRoot,'.cache/r2-art.mjs'));
 await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/art.ts'],outfile:module,bundle:true,format:'esm',platform:'node'});
 const a=await import(pathToFileURL(module).href);
 const mirror='<g transform="translate(220 165)"><circle r="25" fill="#4EBCF5" stroke="#172533" stroke-width="4"/><path d="m-15 15 30-30" stroke="#F9FCFF" stroke-width="6"/></g>';
 const worlds={
 'light-garden':`<rect x="43" y="25" width="314" height="180" rx="3" fill="#F9FCFF" stroke="#335A6F" stroke-width="6"/><path d="M68 165H220V58" stroke="#f1cc75" stroke-width="9" fill="none"/>${a.lamp(72,165)}${mirror}${a.flower(220,62,true)}<g transform="translate(273 108) scale(.7)">${a.floor(2,[0,3],'garden')}</g>`,
 'two-ways-home':`<rect x="26" y="34" width="348" height="164" rx="12" fill="#FFFFFF" stroke="#465675" stroke-width="4"/><path d="M200 40v151" stroke="#465675" stroke-width="5"/><path d="M65 160H154V82M244 160H334V82" fill="none" stroke="#D0DCE9" stroke-width="26"/>${a.house(154,77,false,true)}${a.house(334,77,true,true)}${a.character(95,148,false,false,false)}${a.character(274,148,true,false,false)}`,
 'tiny-delivery':`<rect x="35" y="23" width="330" height="188" rx="3" fill="#3A4D66"/><path d="M59 151H337M190 48V187" stroke="#F8FCFF" stroke-width="42"/><path d="M240 142l15 9-15 9" stroke="#172533" stroke-width="4" fill="none"/>${a.depot(327,150,'A',false)}${a.depot(190,188,'B',false)}${a.robot(91,150,'A','→',0)}${a.robot(190,56,'B','↓',0)}<circle cx="140" cy="151" r="17" fill="#FFCC4D" stroke="#172533"/><path d="M140 140v11l8 5" stroke="#172533" fill="none" stroke-width="2"/>`
 };
 for(const [id,svg]of Object.entries(worlds))await writeFile(projectPath(new URL(`${id}.svg`,assets)),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 230">${a.artDefs}<rect width="400" height="230" rx="3" fill="#E8F3F8"/>${svg}</svg>`);
}
