import {deliveryWaitCells,type DeliveryLevel} from '../../src/prototypes/delivery-r2';
export type Point={x:number;z:number};
export const GOLD_IDS=new Set(['D03','D18']);
export const districts=[
 {ja:'木漏れ日の小道',en:'Sunlit Lanes',noteJa:'はじめの一歩。少しずつ、道がつながる。',noteEn:'Small beginnings. Lovely ways through.',grass:0x789c42,leaf:0x3f6837,light:0x91aa51,flower:0xf5ca84},
 {ja:'果樹園のまがり角',en:'Orchard Bends',noteJa:'遠回りにも、いい発見がある。',noteEn:'There is something good around the bend.',grass:0x829b48,leaf:0x4d7043,light:0xa3b35e,flower:0xf0b7a0},
 {ja:'丘の上への配達',en:'The Way Home',noteJa:'ふたつの道を、ひとつの計画で。',noteEn:'Two little routes. One thoughtful plan.',grass:0x73954b,leaf:0x386a49,light:0x98ac64,flower:0xf1d09a},
] as const;
export function profile(level:DeliveryLevel){const order=Number(level.id.slice(1)),gold=GOLD_IDS.has(level.id),district=Math.floor((order-1)/6);return{order,gold,district,seed:gold?level.size*149:level.size*149+order*971,...(gold?districts[0]:districts[district]!),name:districts[district]!};}
export function cellPoint(level:DeliveryLevel,cell:number):Point{return{x:cell%level.size-(level.size-1)/2,z:Math.floor(cell/level.size)-(level.size-1)/2};}
const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.z-b.z);
export function segmentDistance(q:Point,a:Point,b:Point){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((q.x-a.x)*dx+(q.z-a.z)*dz)/(dx*dx+dz*dz||1)));return distance(q,{x:a.x+t*dx,z:a.z+t*dz});}
export function planStage(level:DeliveryLevel){
 const p=profile(level),n=level.size,roads=Array.from({length:n*n},(_,i)=>i).filter(i=>!level.walls.includes(i)),points=roads.map(c=>cellPoint(level,c));
 const rx=n===7?4.12:n===6?3.65:3.33,rz=n===6?3.65:3.35;
 const houses=level.robots.map(robot=>{const q=cellPoint(level,robot.goal);if(p.gold){if(robot.goal%n===n-1)return{x:q.x+(n===7?.2:.44),z:q.z,rotation:-Math.PI/2};if(Math.floor(robot.goal/n)===n-1)return{x:q.x,z:q.z+.5,rotation:Math.PI};return{x:q.x,z:q.z-.48,rotation:0};}
  const candidates=[{dx:0,dz:-1,rotation:0},{dx:1,dz:0,rotation:-Math.PI/2},{dx:0,dz:1,rotation:Math.PI},{dx:-1,dz:0,rotation:Math.PI/2}];
  const score=(c:typeof candidates[number])=>{const center={x:q.x+c.dx*.72,z:q.z+c.dz*.72};return points.reduce((s,r,i)=>s+(roads[i]===robot.goal?0:Math.max(0,1.02-distance(center,r))*12),0)+Math.max(0,Math.abs(center.x)-rx)*2+Math.max(0,Math.abs(center.z)-rz)*2;};
  const best=candidates.sort((a,b)=>score(a)-score(b))[0]!;return{x:q.x+best.dx*.62,z:q.z+best.dz*.62,rotation:best.rotation};
 });
 const clocks:Point[]=[];for(const [index,cell] of deliveryWaitCells(level).entries()){const q=cellPoint(level,cell);if(p.gold){clocks.push(level.id==='D03'?{x:q.x,z:q.z+1.07}:index===0?{x:q.x,z:q.z-.94}:{x:q.x-1.04,z:q.z});continue;}
  const candidates=[{x:0,z:1.07},{x:-1.07,z:0},{x:1.07,z:0},{x:0,z:-1.07},{x:-.82,z:.82},{x:.82,z:.82},{x:-.82,z:-.82},{x:.82,z:-.82},{x:-1.28,z:0},{x:1.28,z:0}].map(d=>({x:q.x+d.x,z:q.z+d.z}));
  const score=(c:Point)=>points.reduce((s,r)=>s+Math.max(0,.82-distance(c,r))*15,0)+houses.reduce((s,h)=>s+Math.max(0,1.05-distance(c,h))*16,0)+clocks.reduce((s,k)=>s+Math.max(0,1.05-distance(c,k))*25,0)+Math.max(0,Math.abs(c.x)-rx+.22)*8+Math.max(0,Math.abs(c.z)-rz+.22)*8;
  clocks.push(candidates.sort((a,b)=>score(a)-score(b))[0]!);
 }
 const goldTrees=n===7?[[-3,-2.8,.8],[2.9,-2.9,.72],[-2.85,2.65,.5]]:[[-2.45,-1.8,.9],[1.2,-2.65,.85],[-2.7,1.6,.62]];
 const candidates=[[-rx+.45,-rz+.35,.78],[rx-.5,-rz+.3,.73],[-.6,-rz-.15,.72],[rx-.18,-1.5,.59],[-rx+.12,-1.2,.58],[.8,-rz-.22,.64]];
 const trees=p.gold?goldTrees:candidates.filter(([x,z])=>!points.some(r=>distance(r,{x:x!,z:z!})<1.18)&&!houses.some(h=>distance(h,{x:x!,z:z!})<1.24)&&!clocks.some(k=>distance(k,{x:x!,z:z!})<.9)).slice(0,3);
 // A continuous soft perimeter expands under road corners and meaningful buildings.
 const supports=p.gold?[]:[...points.flatMap(q=>[-.64,.64].flatMap(dx=>[-.64,.64].map(dz=>({x:q.x+dx,z:q.z+dz})))),...houses.flatMap(q=>[-.68,.68].flatMap(dx=>[-.68,.68].map(dz=>({x:q.x+dx,z:q.z+dz})))),...clocks,...trees.map(([x,z])=>({x:x!,z:z!}))];
 function radius(t:number){let r=1+.035*Math.sin(t*5)+.035*Math.cos(t*3);if(p.gold)return r;for(const q of supports){const a=Math.atan2(q.z/rz,q.x/rx),delta=Math.atan2(Math.sin(t-a),Math.cos(t-a));const length=Math.hypot(q.x/rx,q.z/rz);r=Math.max(r,1+(length-1+.055)*Math.exp(-((delta/.25)**2)));}return r;}
 const fences=[];for(let i=0;i<10;i++){const t=.17+i*.21,t2=t+.17,r=p.gold?1:radius(t),r2=p.gold?1:radius(t2),a={x:Math.cos(t)*rx*.97*r,z:Math.sin(t)*rz*.97*r},b={x:Math.cos(t2)*rx*.97*r2,z:Math.sin(t2)*rz*.97*r2};if(Math.abs(a.x)<.8||Math.abs(a.z)<.6)continue;if(!p.gold&&(points.some(q=>segmentDistance(q,a,b)<.83)||houses.some(q=>segmentDistance(q,a,b)<1)||clocks.some(q=>segmentDistance(q,a,b)<.6)))continue;fences.push({a,b});}
 return{profile:p,roads,rx,rz,houses,clocks,trees,radius,fences};
}

export type HitPoint={kind:string;index:number;cell:number;x:number;y:number};
/** Keep 44px rectangles disjoint without changing a puzzle cell or hiding its object. */
export function fitHitTargets(source:HitPoint[],width:number,height:number,min=44){
 const points=source.map(p=>({...p})),limit=17;
 for(let pass=0;pass<36;pass++){let changed=false;for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i]!,b=points[j]!,dx=b.x-a.x,dy=b.y-a.y,ox=min+.4-Math.abs(dx),oy=min+.4-Math.abs(dy);if(ox<=0||oy<=0)continue;changed=true;const axis=ox<oy?'x':'y',delta=(axis==='x'?dx:dy)>=0?1:-1,overlap=(axis==='x'?ox:oy)/2;a[axis]-=delta*overlap;b[axis]+=delta*overlap;}
  points.forEach((p,i)=>{const s=source[i]!;p.x=Math.max(min/2,Math.min(width-min/2,Math.max(s.x-limit,Math.min(s.x+limit,p.x))));p.y=Math.max(min/2,Math.min(height-min/2,Math.max(s.y-limit,Math.min(s.y+limit,p.y))));});if(!changed)break;
 }
 return points;
}
