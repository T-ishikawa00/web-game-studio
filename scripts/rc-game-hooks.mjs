// Same asserted adoption hooks as the frozen builders. Byte equivalence is checked before RC adaptation.
import assert from 'node:assert/strict';
import path from 'node:path';
import {readFile} from 'node:fs/promises';
const hooks=[];
function exact(source,name,from,to){assert.equal(source.split(from).length-1,1,name);return source.replace(from,to);}
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

export const transformTwoWays=transform;
export function polishHooks(b){
 b.onLoad({filter:/[\\/]light-craft-motion\.ts$/},async args=>{let source=await readFile(args.path,'utf8');source=exact(source,'art for covers',"import {gateArt,flower} from './art';","import {flower} from './art';\nimport {gateArt} from './light-polish-art';\nimport {animateShutter,stageReceivers} from './light-object-motion';");source=exact(source,'shutter drawing',"animate(cover,[{opacity:1},{opacity:0}],timing.gateDuration,phase.at+timing.gate);","animateShutter(cover,animate,timing.gateDuration,phase.at+timing.gate);");source=exact(source,'receiver drawing lifecycle','const cleanup=()=>{clearTimeout(timer);','const clearReceivers=stageReceivers(svg,level,plan,animate);\n const cleanup=()=>{clearReceivers();clearTimeout(timer);');return {contents:source,loader:'ts',resolveDir:path.dirname(args.path)};});
 b.onLoad({filter:/[\\/]light-object-(view|motion)\.ts$/},async args=>{let source=await readFile(args.path,'utf8');source=exact(source,path.basename(args.path)+' art',"from './light-object-art'","from './light-polish-art'");if(args.path.endsWith('motion.ts')){source=exact(source,'shutter endpoint x','dataset.shutterX)*15','dataset.shutterX)*13');source=exact(source,'shutter endpoint y','dataset.shutterY)*15','dataset.shutterY)*13');source=exact(source,'shutter endpoint scale','scale(.23)','scale(.4)');}if(args.path.endsWith('view.ts')){source=exact(source,'polish board marker','garden object-garden','garden object-garden polish-garden');source=exact(source,'initial mirror cue','class="cell-control ','class="cell-control '+"${l.id==='L01'&&i===0&&!v.acted?'rotation-intro':''} ");}return {contents:source,loader:'ts',resolveDir:path.dirname(args.path)};});
}
