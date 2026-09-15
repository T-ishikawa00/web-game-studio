import {character,house} from './art';
import type {HomeLevel} from './rules';
import type {TwPlan} from './twoways-craft-plan';

// Final rule/save state already exists. These covers are presentation only.
export function showTwCraft(root:HTMLElement,level:HomeLevel,plan:TwPlan,reduced:boolean,origin:number){
 if(reduced)return ()=>{};
 const animations:Animation[]=[],covers:Element[]=[],hidden:SVGElement[]=[];
 const animate=(e:Element,frames:Keyframe[])=>{const a=e.animate(frames,{duration:plan.duration,fill:'both',easing:'cubic-bezier(.22,.75,.25,1)'});a.startTime=origin;animations.push(a);};
 for(const [i,board]of [...root.querySelectorAll<HTMLElement>('[data-swipe-board]')].entries()){
  const svg=board.querySelector('svg')!,original=svg.querySelector<SVGElement>('.character')!,p=plan.after.positions[i]!,old=plan.before.positions[i]!,home=level.homes[i]!;
  const group=document.createElementNS(svg.namespaceURI,'g');group.setAttribute('class','tw-craft-actor');group.setAttribute('aria-hidden','true');group.setAttribute('pointer-events','none');
  group.innerHTML=character(p%level.size*60+30,Math.floor(p/level.size)*60+30,i===1,old===home,plan.blocked[i]!);svg.append(group);covers.push(group);original.style.visibility='hidden';hidden.push(original);
  const dx=(old%level.size-p%level.size)*60,dy=(Math.floor(old/level.size)-Math.floor(p/level.size))*60,node=group.querySelector('.actor-face')!;
  animate(node,plan.moved[i]?[{transform:`translate(${dx}px,${dy}px)`},{transform:'translate(0px,0px)'}]:[{transform:'scale(1)'},{transform:'scale(.96)',offset:.38},{transform:'scale(1)'}]);
  if(plan.arrived[i]||plan.departed[i]){const originalHouse=svg.querySelector<SVGElement>('.house')!;originalHouse.style.visibility='hidden';hidden.push(originalHouse);const h=document.createElementNS(svg.namespaceURI,'g');h.setAttribute('class','tw-house-cover');h.innerHTML=house(home%level.size*60+30,Math.floor(home/level.size)*60+30,i===1,old===home);svg.insertBefore(h,group);covers.push(h);}
  const cue=document.createElement('span');cue.className='move-response tw-craft-cue';cue.setAttribute('aria-hidden','true');cue.textContent=['↑','→','↓','←'][plan.direction]!;board.append(cue);covers.push(cue);animate(cue,[{opacity:.75},{opacity:.75,offset:.65},{opacity:0}]);
 }
 const cleanup=()=>{clearTimeout(timer);for(const a of animations)a.cancel();for(const c of covers)c.remove();for(const h of hidden)h.style.removeProperty('visibility');};
 const timer=setTimeout(cleanup,Math.max(0,plan.duration-(performance.now()-origin)));return cleanup;
}
