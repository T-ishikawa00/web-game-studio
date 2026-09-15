import {lightCause,lightCauseTiming as timing} from './light-cause';
import {gateArt,flower} from './art';
import type {LightLevel,LightState} from './light-r2';

export function showLightCause(root:HTMLElement,level:LightLevel,before:LightState,after:LightState,en:boolean,reduced:boolean){
 const svg=root.querySelector<SVGSVGElement>('.garden>svg');
 if(!svg||reduced)return ()=>{};
 const plan=lightCause(level,before,after),ns='http://www.w3.org/2000/svg';
 const overlay=document.createElementNS(ns,'g'),animations:Animation[]=[],hidden:SVGElement[]=[];
 overlay.classList.add('light-cause');overlay.setAttribute('aria-hidden','true');overlay.style.pointerEvents='none';svg.append(overlay);
 const xy=(p:number)=>[p%level.size*60+30,Math.floor(p/level.size)*60+30] as const;
 const add=(tag:string,attrs:Record<string,string|number>)=>{const e=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,String(v));overlay.append(e);return e;};
 const animate=(node:SVGElement,frames:Keyframe[],options:KeyframeAnimationOptions)=>animations.push(node.animate(frames,{fill:'both',...options}));
 for(const e of svg.querySelectorAll<SVGElement>('.beam,.beam-halo')){e.style.visibility='hidden';hidden.push(e);}
 // Previous route fades as the newly reflected ray travels. No queued gameplay.
 for(const p of plan.previousPaths){const e=add('polyline',{points:p.map(p=>xy(p).join(',')).join(' '),fill:'none',stroke:'#7B4900','stroke-width':4,'stroke-dasharray':'4 5'});animate(e,[{opacity:.55},{opacity:0}],{duration:110});}
 plan.phases.forEach((phase,i)=>{
  phase.paths.forEach((p,j)=>{for(const [color,width] of [['#7B4900',8],['#FFCC4D',4]] as const){
   const e=add('polyline',{points:p.map(p=>xy(p).join(',')).join(' '),fill:'none',stroke:color,'stroke-width':width,'stroke-linejoin':'round','data-ray-phase':i});
   const length=(e as SVGGeometryElement).getTotalLength();e.style.strokeDasharray=String(length);e.style.strokeDashoffset=String(length);
   animate(e,[{opacity:0,strokeDashoffset:String(length)},{opacity:1,strokeDashoffset:String(length),offset:.01},{opacity:1,strokeDashoffset:'0',offset:.82},{opacity:1,strokeDashoffset:'0'}],{duration:timing.ray,delay:i*timing.phase+(j?timing.branchDelay:0)});
  }});
  for(const g of phase.opened){
   const gate=plan.gates[g]!,[x,y]=xy(gate.gate),cover=add('g',{'data-gate-opening':g});cover.innerHTML=gateArt(x,y,false,gate.id);
   const settled=svg.querySelectorAll<SVGElement>(':scope > .gate')[g];if(settled)animate(settled,[{opacity:0},{opacity:1}],{duration:timing.gateDuration,delay:i*timing.phase+timing.gate});
   animate(cover,[{opacity:1},{opacity:0}],{duration:timing.gateDuration,delay:i*timing.phase+timing.gate});
   const [sx,sy]=xy(gate.switch),ring=add('circle',{cx:sx,cy:sy,r:25,fill:'none',stroke:'#7B4900','stroke-width':4,'data-switch-response':g});
   animate(ring,[{opacity:0},{opacity:1,offset:.25},{opacity:0}],{duration:180,delay:i*timing.phase+timing.switchArrival});
  }
 });
 for(const p of plan.newFlowers){const [x,y]=xy(p),cover=add('g',{'data-flower-response':p});cover.innerHTML=flower(x,y,false);const settled=svg.querySelectorAll<SVGElement>(':scope > .flower')[level.flowers.indexOf(p)],delay=(plan.phases.length-1)*timing.phase+215;if(settled)animate(settled,[{opacity:0},{opacity:1}],{duration:60,delay});animate(cover,[{opacity:1},{opacity:0}],{duration:60,delay});}
 const caption=document.createElement('span');caption.className='cause-caption';caption.textContent=en?'✓ Stays open':'✓ 開いたまま';if(plan.retained.length)root.querySelector('.scene-status')?.append(caption);
 for(const i of plan.retained){const [x,y]=xy(plan.gates[i]!.gate),ring=add('circle',{cx:x,cy:y,r:26,fill:'none',stroke:'#7B4900','stroke-width':4,'data-latch-response':i});animate(ring,[{opacity:1},{opacity:1,offset:.6},{opacity:0}],{duration:650});}
 const cleanup=()=>{clearTimeout(timeout);for(const a of animations)a.cancel();overlay.remove();caption.remove();for(const e of hidden)e.style.removeProperty('visibility');};
 const timeout=setTimeout(cleanup,Math.max((plan.phases.length-1)*timing.phase+290,plan.retained.length?650:0));
 return cleanup;
}
