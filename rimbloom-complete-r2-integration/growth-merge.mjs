import assert from 'node:assert/strict';
import {replaceOnce} from './adapter.mjs';

// Only ready-state is retained while the already-published consent client loads.
// Trial/input/result activity is never queued or replayed before client readiness.
export function createGrowthBridge(load){
 let target=null,ready=false,reported=false;
 const send=(name,detail)=>{try{target?.emit(name,detail);}catch{}};
 const reportReady=()=>{if(ready&&target&&!reported){reported=true;send('game_ready');}};
 Promise.resolve().then(load).then(value=>{target=value;reportReady();}).catch(()=>{});
 return {emit:send,ready(){ready=true;reportReady();},firstInput(kind){send('first_meaningful_input',{input_mode:kind==='keyboard'?'keyboard':kind==='touch'?'touch':'pointer'});},result(mode,status){send('game_result',{result_type:status==='won'?(mode==='quick'?'time_up':'stage_clear'):'failure'});}};
}
export function integrateGrowth(source){
 let s=replaceOnce(source,"const $=id=>document.getElementById(id)",`const growth=(${createGrowthBridge.toString()})(()=>import('/assets/growth-client.js').then(m=>m.growth));\nconst $=id=>document.getElementById(id)`);
 s=replaceOnce(s,"launch:(dx,dy)=>{if(!engine().launch(g,dx,dy))return false;sound.unlock();", "launch:(dx,dy,kind)=>{if(!engine().launch(g,dx,dy))return false;growth.firstInput(kind);sound.unlock();");
 s=replaceOnce(s,"g.status='playing';finished=false;paused=false;", "g.status='playing';growth.emit('trial_start',{retry_kind:newSeed?'new':'same'});finished=false;paused=false;");
 s=replaceOnce(s,"function endRun(){if(finished)return;finished=true;controls.clear();", "function endRun(){if(finished)return;finished=true;growth.result(mode,g.status);controls.clear();");
 return replaceOnce(s,"document.querySelector('.playfield').setAttribute('aria-busy','false');requestAnimationFrame(frame);", "document.querySelector('.playfield').setAttribute('aria-busy','false');growth.ready();requestAnimationFrame(frame);");
}
export function retainGrowthMarkup(result,prior){
 if(!prior.includes('data-growth-consent')){assert(!prior.includes('/assets/growth-client.js'));return result;}
 const panels=prior.match(/<section\b[^>]*\bdata-growth-consent[\s\S]*?<\/section>/g)??[],scripts=prior.match(/<script\b[^>]*src="\/assets\/growth-client\.js"[^>]*><\/script>/g)??[];assert.equal(panels.length,1);assert.equal(scripts.length,1);assert(!result.includes('data-growth-consent'));assert(!result.includes('/assets/growth-client.js'));
 return replaceOnce(result,'</body>',panels[0]+scripts[0]+'</body>');
}
