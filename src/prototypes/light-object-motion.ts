import {receiverArt} from './light-object-art';
import type {LightLevel} from './light-r2';
import type {LightCraftPlan} from './light-craft-plan';
type Animate=(node:Element,frames:Keyframe[],duration:number,at?:number)=>void;

export function animateShutter(cover:SVGElement,animate:Animate,duration:number,at:number){
 for(const leaf of cover.querySelectorAll<SVGElement>('.shutter-leaf')){const x=Number(leaf.dataset.shutterX)*15,y=Number(leaf.dataset.shutterY)*15;animate(leaf,[{transform:'translate(0px,0px) scale(1)'},{transform:`translate(${x}px,${y}px) scale(.23)`}],duration,at);}
 animate(cover,[{opacity:1},{opacity:0}],duration,at);
}

// Receiver has two independent states. Present them at the same cause offsets
// already used by accepted LG-C; never alter the engine, save or sound plan.
export function stageReceivers(svg:SVGSVGElement,level:LightLevel,plan:LightCraftPlan,animate:Animate){
 const originals=[...svg.querySelectorAll<SVGElement>(':scope > .receiver')],layer=document.createElementNS(svg.namespaceURI,'g');
 layer.setAttribute('class','receiver-cause');layer.setAttribute('aria-hidden','true');layer.setAttribute('pointer-events','none');svg.append(layer);
 const opened=new Set(plan.phases.flatMap(p=>p.opened)),duration=plan.duration;
 for(const [i,gate]of plan.cause.gates.entries()){
  const original=originals[i];if(!original)continue;original.style.visibility='hidden';
  let active=original.dataset.activated==='true'&&!opened.has(i);
  const states=[{at:0,active,lit:plan.cause.previousPaths.some(p=>p.includes(gate.switch))}];
  for(const phase of plan.phases){active ||= phase.opened.includes(i);states.push({at:phase.at+215,active,lit:phase.paths.some(p=>p.includes(gate.switch))});}
  for(const [j,state]of states.entries()){
   const next=states[j+1]?.at??duration+1,group=document.createElementNS(svg.namespaceURI,'g');group.setAttribute('data-receiver-phase',String(j));group.innerHTML=receiverArt(gate.switch%level.size*60+30,Math.floor(gate.switch/level.size)*60+30,gate.id,state.lit,state.active);layer.append(group);
   const frames:Keyframe[]=[{opacity:state.at===0?1:0,offset:0}];
   if(state.at>0)frames.push({opacity:0,offset:(state.at-1)/duration},{opacity:1,offset:state.at/duration});
   if(next<=duration)frames.push({opacity:1,offset:(next-1)/duration},{opacity:0,offset:next/duration});
   frames.push({opacity:next>duration?1:0,offset:1});animate(group,frames,duration);
  }
 }
 return ()=>{layer.remove();for(const node of originals)node.style.removeProperty('visibility');};
}
