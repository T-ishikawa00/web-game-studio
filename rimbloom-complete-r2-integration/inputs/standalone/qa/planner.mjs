// Offline adversarial player / browser input planning only. Never production.
import {reflectedPath,FEEL,swept} from '../src/journey-core.mjs';
export function chooseShot(g,style='normal'){
 let best=null,bestValue=-Infinity;
 const candidates=[];
 for(let i=0;i<180;i++)candidates.push(i*Math.PI*2/180);
 for(const e of g.enemies){candidates.push(Math.atan2(e.y-g.p.y,e.x-g.p.x));for(const [x,y] of [[82-e.x,e.y],[998-e.x,e.y],[e.x,246-e.y],[e.x,1378-e.y]])candidates.push(Math.atan2(y-g.p.y,x-g.p.x));}
 for(const a of candidates){const dx=Math.cos(a),dy=Math.sin(a),points=reflectedPath(g.p.x,g.p.y,dx,dy,FEEL.range,g.mirrors||[]);let value=0,charge=false,seen=new Set(),stop=false,end=points.at(-1);
  for(let i=1;i<points.length;i++){const [ax,ay]=points[i-1],[bx,by]=points[i],hits=g.enemies.filter(e=>!seen.has(e.id)&&swept(ax,ay,bx,by,e.x,e.y,e.r+FEEL.radius-7)).sort((a,b)=>Math.hypot(a.x-ax,a.y-ay)-Math.hypot(b.x-ax,b.y-ay));
   for(const e of hits){if(e.type==='armor'&&!charge){stop=true;end=[e.x,e.y];value-=20;break;}seen.add(e.id);value+=e.seal?65:e.type==='relay'?15:e.type==='armor'?8:5;
    if(e.type==='relay'||charge)for(const o of g.enemies)if(o.type!=='armor'&&!seen.has(o.id)&&Math.hypot(o.x-e.x,o.y-e.y)<(e.type==='relay'?115:72)){seen.add(o.id);value+=o.type==='relay'?15:5;}
   }if(stop)break;charge=true;
  }
  const nearest=Math.min(...g.enemies.filter(e=>!seen.has(e.id)).map(e=>Math.hypot(e.x-end[0],e.y-end[1])),180);value+=Math.min(120,nearest)*.09;
  for(const h of g.hazards||[]){const phase=((g.t-(g.stageAt||0)+.85+h.offset)%8);if(phase<3.5&&Math.hypot(h.x-end[0],h.y-end[1])<h.r+30)value-=30;}
  if(style==='beginner'){value=seen.size*2-Math.abs(Math.atan2(Math.sin(a+Math.PI/2),Math.cos(a+Math.PI/2)))*3;}
  if(value>bestValue){bestValue=value;best={dx,dy,value,path:points,targets:[...seen]};}
 }return best||{dx:0,dy:-1,value:0};
}
