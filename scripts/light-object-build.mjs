import {build} from 'esbuild';
import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import {projectRoot,projectPath} from './project-path.mjs';
import {transformLightwork} from './lightwork-build.mjs';

const out=projectPath('.cache/lightwork-object'),hooks=[];
function exact(source,name,from,to){assert.equal(source.split(from).length-1,1,name);hooks.push(name);return source.replace(from,to);}
await mkdir(out,{recursive:true});await cp(projectPath('.cache/lightwork-craft'),out,{recursive:true});
await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/game-r2.ts'],outfile:path.join(out,'prototype-assets/light-object.js'),bundle:true,format:'esm',target:'es2022',minify:true,plugins:[{name:'isolated-object-view',setup(b){
 b.onLoad({filter:/[\\/]game-r2\.ts$/},async args=>{let source=transformLightwork(await readFile(args.path,'utf8')).source;source=exact(source,'board renderer',"from './board-view'","from './light-object-view'");source="import './light-object.css';\n"+source;return {contents:source,loader:'ts',resolveDir:path.dirname(args.path)};});
 b.onLoad({filter:/[\\/]light-craft-motion\.ts$/},async args=>{let source=await readFile(args.path,'utf8');source=exact(source,'art for covers',"import {gateArt,flower} from './art';","import {flower} from './art';\nimport {gateArt} from './light-object-art';\nimport {animateShutter,stageReceivers} from './light-object-motion';");source=exact(source,'shutter drawing',"animate(cover,[{opacity:1},{opacity:0}],timing.gateDuration,phase.at+timing.gate);","animateShutter(cover,animate,timing.gateDuration,phase.at+timing.gate);");source=exact(source,'receiver drawing lifecycle','const cleanup=()=>{clearTimeout(timer);','const clearReceivers=stageReceivers(svg,level,plan,animate);\n const cleanup=()=>{clearReceivers();clearTimeout(timer);');return {contents:source,loader:'ts',resolveDir:path.dirname(args.path)};});
 }}]});
await mkdir(projectPath('.tmp/lightwork-object'),{recursive:true});await writeFile(projectPath('.tmp/lightwork-object/build.json'),JSON.stringify({hooks,canonicalSourcesEdited:false,output:'.cache/lightwork-object',acceptedLightworkHooks:9},null,2));console.log('Lightwork Object build:',hooks.length,'drawing hooks; original LG-C hooks retained');
