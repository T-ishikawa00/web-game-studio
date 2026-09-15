import type {DeliveryLevel,DeliveryRun} from './delivery-r2';
import {robot} from './art';
// Display only. Rule coordinates, waits and the 600 ms tick remain authoritative.
export function createCraftMotion(root:HTMLElement,reduced:()=>boolean){
 const animations=new Set<Animation>(),ghosts=new Set<Element>();
 function cancel(){for(const a of animations)a.cancel();animations.clear();for(const g of ghosts)g.remove();ghosts.clear();}
 function animate(node:Element|null,frames:Keyframe[],duration=180,delay=0){
  if(!node||reduced())return;
  const a=node.animate(frames,{duration,delay,easing:'cubic-bezier(.2,.7,.25,1)'});animations.add(a);a.onfinish=()=>{animations.delete(a);};
 }
 function feedback(action:'arrow'|'wait'|'start'|'undo',index=0){
  if(reduced())return;
  const nodes=action==='start'?root.querySelectorAll('.robot .actor-face'):action==='undo'?root.querySelectorAll('.board'):root.querySelectorAll(`[data-action="${action==='wait'?'clock':'arrow'}:${index}"] ${action==='wait'?'.clock-value':'.socket'}`);
  for(const node of nodes)animate(node,action==='undo'?[{opacity:.72},{opacity:1}]:[{transform:'scale(.92)'},{transform:'scale(1.025)',offset:.65},{transform:'scale(1)'}],140);
 }
 function transition(level:DeliveryLevel,before:DeliveryRun,after:DeliveryRun){
  if(reduced())return;
  if(after.status==='failed'){for(const cell of root.querySelectorAll('.failure-cell'))animate(cell,[{opacity:.3},{opacity:1}],180);return;}
  for(const bot of after.bots){
   const old=before.bots.find(b=>b.id===bot.id);if(!old||old.delivered)continue;
   const dx=(old.p%level.size-bot.p%level.size)*60,dy=(Math.floor(old.p/level.size)-Math.floor(bot.p/level.size))*60;
   let node=root.querySelector('.bot-'+bot.id+' .actor-face');
   if(bot.delivered){
    const svg=root.querySelector('.town>svg');if(!svg)continue;
    const ghost=document.createElementNS('http://www.w3.org/2000/svg','g');ghost.setAttribute('class','craft-ghost');ghost.setAttribute('aria-hidden','true');ghost.style.pointerEvents='none';
    ghost.innerHTML=robot(bot.p%level.size*60+30,Math.floor(bot.p/level.size)*60+30,bot.id,['↑','→','↓','←'][bot.d]!,0);svg.append(ghost);ghosts.add(ghost);node=ghost.querySelector('.actor-face');
    animate(node,[{transform:`translate(${dx}px,${dy}px)`,opacity:1},{transform:'translate(0,0)',opacity:1,offset:.75},{transform:'scale(.82)',opacity:0}],240);
    // The existing depot/check remains the authoritative final position.
    const cleanup=node?.getAnimations()[0];if(cleanup)cleanup.onfinish=()=>{animations.delete(cleanup);ghost.remove();ghosts.delete(ghost);};
   }else if(dx||dy)animate(node,[{transform:`translate(${dx}px,${dy}px)`},{transform:'translate(0,0)'}],180);
   else if(old.remaining!==bot.remaining)animate(root.querySelector('.bot-'+bot.id+' .wait-bubble'),[{opacity:.5},{opacity:1}],120);
  }
  if(after.status==='won')animate(root.querySelector('.outcome strong'),[{opacity:.5,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],200,180);
 }
 return {cancel,feedback,transition,snapshot:()=>({animations:animations.size,ghosts:ghosts.size})};
}
