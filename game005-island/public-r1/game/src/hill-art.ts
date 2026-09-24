import * as T from 'three';
import {Artisan,pot,flower} from './art';
import {HILL_NODES,HILL_SITES,groundHeight,hillEdges,type Connection,type Outlook,type Point} from './hill-layout';
const nodes:Record<number,Point>={0:[0,.85],16:[5,-1.05],...Object.fromEntries(HILL_NODES.map((p,i)=>[i+33,p]))};
const rock=new T.IcosahedronGeometry(1,1),wood='#b99464',dark='#755540',edge='#d4bd90';
function pathPart(a:Artisan,from:Point,to:Point,width=.53){
 const [x,z]=from,[xx,zz]=to,d=Math.hypot(xx-x,zz-z),ang=Math.atan2(xx-x,zz-z),count=Math.ceil(d/.14);
 for(let i=0;i<count;i++){
  const t=(i+.5)/count,px=x+(xx-x)*t,pz=z+(zz-z)*t,y=groundHeight(px,pz),sloped=Math.abs(groundHeight(x,z)-groundHeight(xx,zz))>.15;
  a.box(i%3?'#c3b48d':'#d4c5a2',[px,y+.012,pz],[width,.04,d/count+.006],[0,ang,0]);
  for(const side of [-1,1]){
   const sx=px+Math.cos(ang)*(width/2+.055)*side,sz=pz-Math.sin(ang)*(width/2+.055)*side;
   a.add(rock,i%3?'#b8ae91':'#cfc19b',[sx,groundHeight(sx,sz)+.03,sz],[.065,.045,.095],[0,ang+i*.12,0]);
  }
  if(sloped&&i%3===0)a.box('#a99777',[px,y+.035,pz],[width,.045,.035],[0,ang,0]);
  if(sloped&&i%6===0){const sx=px+Math.cos(ang)*.41,sz=pz-Math.sin(ang)*.41,sy=groundHeight(sx,sz);a.cyl(dark,[sx,sy+.23,sz],.034,.48);a.cyl(edge,[sx,sy+.48,sz],.045,.035);}
 }
}
export function hillRoad(connection:Connection){
 const chunks=[new Artisan(),new Artisan(),new Artisan()];
 hillEdges(connection).filter(e=>![37,38].includes(e[1])).forEach((e,i)=>pathPart(chunks[Math.min(2,Math.floor(i/3))],nodes[e[0]],nodes[e[1]],connection==='village-link'?.57:.49));
 // Arrival stones and timber rails follow the slope, not a flat decorative plane.
 const p=connection==='village-link'?nodes[33]:nodes[40];
 for(const s of [-1,1]){const x=p[0]+s*.42,z=p[1],y=groundHeight(x,z);chunks[0].cyl(dark,[x,y+.24,z],.052,.48);chunks[0].cyl(edge,[x,y+.5,z],.063,.04);}
 return chunks.map(a=>a.finish());
}
export function hillLookout(view:Outlook){
 const id=view==='sea-view'?37:38,p=nodes[id],a=new Artisan(),b=new Artisan(),c=new Artisan(),ang=view==='sea-view'?.05:-1.35,y=groundHeight(...p);
 pathPart(a,nodes[36],p,.46);
 const local=(x:number,yy:number,z:number)=>[p[0]+Math.cos(ang)*x+Math.sin(ang)*z,yy,p[1]-Math.sin(ang)*x+Math.cos(ang)*z];
 // A thin timber terrace on individually grounded piers, with a stone retaining lip.
 for(let i=0;i<13;i++)a.box(i%3?wood:edge,local(-.67+i*.11,y+.027,0),[.1,.055,.72],[0,ang,0]);
 for(const x of [-.62,.62])for(const z of [-.28,.28]){const q=local(x,0,z),g=groundHeight(q[0],q[2]);a.box(dark,[q[0],(g+y)/2-.01,q[2]],[.1,Math.max(.08,y-g+.08),.1],[0,ang,0]);}
 for(const x of [-.53,.53]){b.box(dark,local(x,y+.22,-.13),[.065,.39,.25],[0,ang,0]);b.box(edge,local(x,y+.05,-.13),[.15,.07,.3],[0,ang,0]);}
 for(let i=0;i<3;i++)b.box(i%2?edge:wood,local(0,y+.29,-.1+i*.095),[1.22,.05,.083],[0,ang,0]);
 for(const x of [-.63,.63])b.box(dark,local(x,y+.43,-.26),[.05,.68,.05],[0,ang,0]);
 for(const yy of [.5,.61])b.box(wood,local(0,y+yy,-.26),[1.32,.06,.05],[0,ang,0]);
 for(const x of [-.78,.78]){const q=local(x,0,-.04);pot(c,q[0],groundHeight(q[0],q[2])+.02,q[2],.13);for(let i=0;i<3;i++)flower(c,q[0]+(i-1)*.055,groundHeight(q[0],q[2])+.30,q[2],i%2?'#e1b57b':'#f0e1ad');}
 // The sea-facing edge is broad and open; the town-facing terrace frames the roofs.
 if(view==='town-view'){for(const x of [-.76,.76]){b.box(dark,local(x,y+.78,-.36),[.055,1.5,.055],[0,ang,0]);}for(let i=0;i<8;i++)b.box(i%2?edge:wood,local(-.77+i*.22,y+1.55,-.28),[.06,.075,.58],[0,ang,0]);}
 return [a.finish(),b.finish(),c.finish()];
}
export class HillArt{
 group=new T.Group();village=hillRoad('village-link');cove=hillRoad('cove-link');sea=hillLookout('sea-view');town=hillLookout('town-view');work=new T.Group();ghost=new T.Group();
 constructor(){this.group.add(...this.village,...this.cove,...this.sea,...this.town,this.work,this.ghost);const a=new Artisan();for(const x of [-.45,.45])a.box(dark,[x,.45,0],[.035,.9,.035]);a.beam(edge,[-.45,.85,0],[.45,.85,0],.01);for(let i=0;i<5;i++)a.box(wood,[-.35+i*.16,.10,.13],[.12,.12,.45],[0,.13,0]);this.work.add(a.finish());this.ghost.visible=false;}
 preview(plot:string|null){this.ghost.visible=!!plot&&plot in HILL_SITES&&plot!=='hillpath'&&plot!=='lookout';if(!this.ghost.visible||this.ghost.userData.plot===plot)return;
  this.ghost.traverse(o=>{if(o instanceof T.Mesh)(o.material as T.Material).dispose();});this.ghost.clear();
  const source=plot==='village-link'?this.village:plot==='cove-link'?this.cove:plot==='sea-view'?this.sea:this.town;
  for(const part of source){const clone=part.clone(true);clone.visible=true;clone.traverse(o=>{if(o instanceof T.Mesh){o.material=new T.MeshBasicMaterial({color:'#f3dda7',transparent:true,opacity:.38,depthWrite:false});o.castShadow=false;}});this.ghost.add(clone);}this.ghost.userData.plot=plot;
 }
 render(s:{hillpath:Connection|null,lookout:Outlook|null,construction?:{id:string,plot:string,progress:number}}){
  const c=s.construction,show=(parts:T.Group[],id:string,plot:string,built:boolean)=>parts.forEach((g,i)=>g.visible=built||c?.id===id&&c.plot===plot&&c.progress>i/parts.length);
  show(this.village,'hillpath','village-link',s.hillpath==='village-link');show(this.cove,'hillpath','cove-link',s.hillpath==='cove-link');show(this.sea,'lookout','sea-view',s.lookout==='sea-view');show(this.town,'lookout','town-view',s.lookout==='town-view');
  this.work.visible=!!c&&['hillpath','lookout'].includes(c.id);if(this.work.visible){const p=HILL_SITES[c!.plot];this.work.position.set(p[0],groundHeight(...p),p[1]);}
 }
}
