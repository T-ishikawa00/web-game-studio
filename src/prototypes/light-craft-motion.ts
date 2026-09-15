import {gateArt,flower} from './art';
import {lightCauseTiming as timing} from './light-cause';
import type {LightLevel} from './light-r2';
import type {LightCraftPlan} from './light-craft-plan';

export function showLightCraft(root:HTMLElement,level:LightLevel,plan:LightCraftPlan,en:boolean,reduced:boolean,origin:number){
 const svg=root.querySelector<SVGSVGElement>('.garden>svg');if(!svg)return ()=>{};
 if(reduced)return ()=>{}; // Final state, gate marks, counts and accessible feedback already exist.
 const ns='http://www.w3.org/2000/svg',overlay=document.createElementNS(ns,'g'),animations:Animation[]=[],hidden:SVGElement[]=[];
 overlay.classList.add('light-cause');overlay.setAttribute('aria-hidden','true');overlay.style.pointerEvents='none';svg.append(overlay);
 const xy=(p:number)=>[p%level.size*60+30,Math.floor(p/level.size)*60+30] as const;
 const add=(tag:string,attrs:Record<string,string|number>)=>{const e=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,String(v));overlay.append(e);return e;};
 const animate=(node:Element,frames:Keyframe[],duration:number,at=0)=>{const a=node.animate(frames,{fill:'both',duration,delay:at});a.startTime=origin;animations.push(a);};
 for(const e of svg.querySelectorAll<SVGElement>('.beam,.beam-halo')){e.style.visibility='hidden';hidden.push(e);}
 for(const p of plan.cause.previousPaths){const e=add('polyline',{points:p.map(p=>xy(p).join(',')).join(' '),fill:'none',stroke:'#7B4900','stroke-width':4,'stroke-dasharray':'4 5'});animate(e,[{opacity:.55},{opacity:0}],110);}
 for(const [index,phase]of plan.phases.entries()){
  for(const ray of phase.rays)for(const [color,width]of [['#7B4900',8],['#FFCC4D',4]] as const){const e=add('polyline',{points:ray.path.map(p=>xy(p).join(',')).join(' '),fill:'none',stroke:color,'stroke-width':width,'stroke-linejoin':'round','data-ray-phase':index});const length=(e as SVGGeometryElement).getTotalLength();e.style.strokeDasharray=String(length);animate(e,[{opacity:0,strokeDashoffset:String(length)},{opacity:1,strokeDashoffset:String(length),offset:.01},{opacity:1,strokeDashoffset:'0',offset:.82},{opacity:1,strokeDashoffset:'0'}],timing.ray,ray.at);}
  for(const i of phase.opened){const gate=plan.cause.gates[i]!,[x,y]=xy(gate.gate),cover=add('g',{'data-gate-opening':i});cover.innerHTML=gateArt(x,y,false,gate.id);const settled=svg.querySelectorAll<SVGElement>(':scope > .gate')[i];if(settled)animate(settled,[{opacity:0},{opacity:1}],timing.gateDuration,phase.at+timing.gate);animate(cover,[{opacity:1},{opacity:0}],timing.gateDuration,phase.at+timing.gate);const [sx,sy]=xy(gate.switch),ring=add('circle',{cx:sx,cy:sy,r:25,fill:'none',stroke:'#7B4900','stroke-width':4,'data-switch-response':i});animate(ring,[{opacity:0},{opacity:1,offset:.25},{opacity:0}],180,phase.at+timing.switchArrival);}
 }
 for(const f of plan.flowers){const [x,y]=xy(f.cell),cover=add('g',{'data-flower-response':f.cell});cover.innerHTML=flower(x,y,false);const settled=svg.querySelectorAll<SVGElement>(':scope > .flower')[level.flowers.indexOf(f.cell)];if(settled)animate(settled,[{opacity:0},{opacity:1}],60,f.at);animate(cover,[{opacity:1},{opacity:0}],60,f.at);}
 const caption=document.createElement('span');caption.className='cause-caption';caption.textContent=en?'✓ Stays open':'✓ 開いたまま';if(plan.cause.retained.length)root.querySelector('.scene-status')?.append(caption);
 for(const i of plan.cause.retained){const [x,y]=xy(plan.cause.gates[i]!.gate),ring=add('circle',{cx:x,cy:y,r:26,fill:'none',stroke:'#7B4900','stroke-width':4,'data-latch-response':i});animate(ring,[{opacity:1},{opacity:1,offset:.6},{opacity:0}],650);}
 const cleanup=()=>{clearTimeout(timer);for(const a of animations)a.cancel();overlay.remove();caption.remove();for(const e of hidden)e.style.removeProperty('visibility');};
 const timer=setTimeout(cleanup,Math.max(0,plan.duration-(performance.now()-origin)));return cleanup;
}
