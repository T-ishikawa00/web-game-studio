import {build} from 'esbuild';
import {mkdir,cp,writeFile} from 'node:fs/promises';
import {projectRoot,projectPath} from './project-path.mjs';
const root=projectPath('.cache/bgm-pilot');await mkdir(root,{recursive:true});await cp('.tmp/bgm-before/prototype-dist',root,{recursive:true});
await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/music-pilot.ts'],outfile:projectPath('.cache/bgm-pilot/prototype-assets/music-pilot.js'),bundle:true,format:'esm',target:'es2022',minify:true});
await mkdir(projectPath('.cache/bgm-pilot/bgm-audio'),{recursive:true});for(const d of ['D1','D2'])await cp('docs/qa/tiny-bgm-pilot-01/audio/'+d+'.wav',projectPath('.cache/bgm-pilot/bgm-audio/'+d+'.wav'));
await writeFile(projectPath('.tmp/bgm-build.json'),JSON.stringify({at:new Date().toISOString(),base:'51ad2d0fe065f07876bd2bbf0410a578c3575a1f',gameSourceUnmodified:true,serverInjectsTinyOnly:true})+'\n');console.log('Isolated BGM pilot built; accepted build unchanged.');
