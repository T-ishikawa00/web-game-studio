import {build} from 'esbuild';
import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import {projectRoot,projectPath} from './project-path.mjs';
const out=projectPath('.cache/twoways-craft'),hooks=[];
function transform(source){const replace=(name,from,to)=>{assert.equal(source.split(from).length-1,1,name);source=source.replace(from,to);hooks.push(name);};
 source="import {createTwCraft} from './twoways-craft-runtime';\n"+source;
 replace('runtime',"const guideKey=`wgs:guide:${gameId}`","const tw=gameId==='two-ways-home'?createTwCraft(root,en,reduced,()=>!!progress&&!paused()):undefined;\nconst guideKey=`wgs:guide:${gameId}`");
 replace('lifecycle','function stopCraft(suspend=false){','function stopCraft(suspend=false){tw?.cancel(suspend);');
 replace('render','if(!progress)return;cancelLight();craft?.cancel();input.cancel();','if(!progress)return;tw?.cancel();cancelLight();craft?.cancel();input.cancel();');
 replace('settings',"const guide=settingsDialog.querySelector<HTMLInputElement>('#composition-guide')!;","tw?.settings(settingsDialog);\n const guide=settingsDialog.querySelector<HTMLInputElement>('#composition-guide')!;");
 replace('snapshot','cueReplay=false;const previousBoard=structuredClone(progress.board);','const hadHistory=history.length>0,clearedBefore=progress.cleared.length;\n cueReplay=false;const previousBoard=structuredClone(progress.board);');
 replace('direction guard',"if(name==='move'&&level.kind==='home'){const r=moveHome","if(name==='move'&&level.kind==='home'&&(!Number.isInteger(i)||i<0||i>3))return;\n if(name==='move'&&level.kind==='home'){const r=moveHome");
 replace('presentation','const response=name===\'move\'?','if(name===\'move\'&&level.kind===\'home\')tw?.turn(level,previousBoard as HomeState,progress.board as HomeState,i as Dir,clearedBefore<levels.length&&progress.cleared.length===levels.length);\n if(name===\'undo\'&&hadHistory)tw?.undo();\n const response=name===\'move\'&&tw?.mode===\'TW-A\'?');
 replace('legacy direction cue',"if(name==='move'&&level.kind==='home')for(const board", "if(name==='move'&&level.kind==='home'&&tw?.mode==='TW-A')for(const board");return source;}
await mkdir(out,{recursive:true});await cp(projectPath('.cache/prototype-dist'),out,{recursive:true});
await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/game-r2.ts'],outfile:path.join(out,'prototype-assets/twoways.js'),bundle:true,format:'esm',target:'es2022',minify:true,plugins:[{name:'isolated-twoways',setup(b){b.onLoad({filter:/[\\/]game-r2\.ts$/},async args=>({contents:transform(await readFile(args.path,'utf8')),loader:'ts',resolveDir:path.dirname(args.path)}));}}]});
await mkdir(projectPath('.tmp/twoways-pilot'),{recursive:true});await writeFile(projectPath('.tmp/twoways-pilot/build.json'),JSON.stringify({hooks,output:'.cache/twoways-craft',canonicalSourcesEdited:false},null,2));console.log('Two Ways build:',hooks.length,'asserted hooks');
