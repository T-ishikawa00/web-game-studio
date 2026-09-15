// Only this dedicated entry is transformed. Canonical game/Tiny sources stay exact.
import {build} from 'esbuild';
import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {projectRoot,projectPath} from './project-path.mjs';
export function transformLightwork(source){
 const hooks=[];const replace=(name,from,to)=>{assert.equal(source.split(from).length-1,1,'Exact hook: '+name);source=source.replace(from,to);hooks.push(name);};
 replace('import',"import {showLightCause} from './light-feedback';","import {createLightCraft} from './light-craft-runtime';");
 replace('runtime',"const guideKey=`wgs:guide:${gameId}`","const light=gameId==='light-garden'?createLightCraft(root,en,reduced,()=>!!progress&&!paused()):undefined;\nconst guideKey=`wgs:guide:${gameId}`");
 replace('lifecycle','function stopCraft(suspend=false){','function stopCraft(suspend=false){light?.cancel(suspend);');
 replace('render','if(!progress)return;cancelLight();craft?.cancel();input.cancel();','if(!progress)return;light?.cancel();cancelLight();craft?.cancel();input.cancel();');
 replace('settings',"const guide=settingsDialog.querySelector<HTMLInputElement>('#composition-guide')!;","light?.settings(settingsDialog);\n const guide=settingsDialog.querySelector<HTMLInputElement>('#composition-guide')!;");
 replace('accepted snapshot',"cueReplay=false;const previousBoard=structuredClone(progress.board);", "const hadHistory=history.length>0,clearedBefore=progress.cleared.length;\n cueReplay=false;const previousBoard=structuredClone(progress.board);");
 replace('mirror valid guard',"if(name==='mirror'&&level.kind==='light'){history.push", "if(name==='mirror'&&level.kind==='light'&&(!Number.isInteger(i)||i<0||i>=level.mirrors.length))return;\n if(name==='mirror'&&level.kind==='light'){history.push");
 replace('presentation',"if(name==='mirror'&&level.kind==='light')cancelLight=showLightCause(root,level,previousBoard as LightState,progress.board as LightState,en,progress.settings.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches);","if(name==='mirror'&&level.kind==='light')light?.turn(level,previousBoard as LightState,progress.board as LightState,clearedBefore<levels.length&&progress.cleared.length===levels.length,i);\n if(name==='undo'&&hadHistory)light?.undo();");
 replace('mirror motion owner',"name==='mirror'?root.querySelectorAll('[data-action=\"mirror:'+i+'\"] .mirror')", "name==='mirror'&&light?.mode==='LG-A'?root.querySelectorAll('[data-action=\"mirror:'+i+'\"] .mirror')");
 return {source,hooks};
}
if(process.argv[1]&&path.resolve(process.argv[1])===projectPath('scripts/lightwork-build.mjs')){
 const out=projectPath('.cache/lightwork-craft');await mkdir(out,{recursive:true});await cp(projectPath('.cache/prototype-dist'),out,{recursive:true});
 let record;
 await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/game-r2.ts'],outfile:projectPath(out+'/prototype-assets/lightwork.js'),bundle:true,format:'esm',target:'es2022',minify:true,plugins:[{name:'lightwork-exact-hooks',setup(b){b.onLoad({filter:/[\\/]game-r2\.ts$/},async args=>{const original=await readFile(args.path,'utf8'),result=transformLightwork(original);record={hooks:result.hooks,originalHash:createHash('sha256').update(original).digest('hex')};await mkdir(projectPath('.tmp/lightwork-build'),{recursive:true});await writeFile(projectPath('.tmp/lightwork-build/game-r2.ts'),result.source);return {contents:result.source,loader:'ts',resolveDir:path.dirname(args.path)};});}}]});
 const output=await readFile(out+'/prototype-assets/lightwork.js');await writeFile(projectPath('.tmp/lightwork-build/receipt.json'),JSON.stringify({...record,outputBytes:output.length,outputHash:createHash('sha256').update(output).digest('hex')},null,2));console.log('Lightwork dedicated build:',record.hooks.length,'asserted hooks;',output.length,'bytes');
}
