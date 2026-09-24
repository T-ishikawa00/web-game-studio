import * as T from 'three';
import {Artisan,pot,flower} from './art';
import {COVE_NODES,PLAZA,type CovePlot,type Point} from './layout';

const stone=new T.IcosahedronGeometry(1,1),wood='#b99464',dark='#755540',edge='#d4bd90';
function walk(a:Artisan,points:Point[],width=.44,board=false){
 for(let i=1;i<points.length;i++){
  const [x,z]=points[i-1],[xx,zz]=points[i],length=Math.hypot(xx-x,zz-z),angle=Math.atan2(xx-x,zz-z);
  a.box(board?'#846b50':'#c3b48d',[(x+xx)/2,.352,(z+zz)/2],[width+.08,.025,length+.08],[0,angle,0]);
  const n=Math.ceil(length/.16);
  for(let j=0;j<n;j++){const t=(j+.5)/n,px=x+(xx-x)*t,pz=z+(zz-z)*t;
   if(board)a.box(j%3?wood:edge,[px,.386,pz],[width,.045,length/n-.017],[0,angle,0]);
   else if(j%2===0)a.add(stone,j%3?'#cfc19b':'#b8ae91',[px,.376,pz],[width*.37,.019,.10],[0,angle+j*.14,0]);
  }
 }
}
function bench(a:Artisan,p:Point,angle:number){
 const local=(x:number,y:number,z:number)=>[p[0]+Math.cos(angle)*x+Math.sin(angle)*z,y,p[1]-Math.sin(angle)*x+Math.cos(angle)*z];
 for(const x of [-.43,.43]){a.box(dark,local(x,.48,0),[.065,.29,.27],[0,angle,0]);a.box(edge,local(x,.35,.04),[.16,.06,.35],[0,angle,0]);}
 for(let j=0;j<3;j++)a.box(j%2?edge:wood,local(0,.64,-.12+j*.10),[1.10,.048,.087],[0,angle,0]);
 for(const x of [-.50,.50])a.box(dark,local(x,.79,-.17),[.048,.34,.048],[0,angle,0]);
 for(let j=0;j<2;j++)a.box(wood,local(0,.79+j*.09,-.18),[1.11,.065,.043],[0,angle,0]);
 for(const x of [-.49,.49])a.box(edge,local(x,.79,.02),[.05,.045,.3],[0,angle,0]);
}
function light(a:Artisan,x:number,z:number){
 a.cyl(dark,[x,.71,z],.022,.71);a.box(dark,[x,1.085,z],[.14,.018,.14]);
 a.box('#e9cc83',[x,1.025,z],[.10,.11,.10]);a.box('#8f7857',[x,.957,z],[.14,.02,.14]);
}
function border(a:Artisan,cx:number,cz:number,rad:number,start=0,end=6.28){
 for(let i=0;i<20;i++){const t=start+(end-start)*i/19;a.add(stone,i%3?'#c8bd9d':'#a8a58b',[cx+Math.cos(t)*rad,.37,cz+Math.sin(t)*rad],[.085,.042,.065],[0,t,0]);}
}
function garden(a:Artisan,x:number,z:number){
 pot(a,x,.35,z,.14);for(let i=0;i<4;i++)flower(a,x+(i-1.5)*.075,.66,z+.015,i%2?'#edc48c':'#f4e6bc');
}
function disk(a:Artisan,x:number,z:number,r:number){a.cyl('#c9b990',[x,.346,z],r,.024);a.cyl('#d6c5a0',[x,.361,z],r*.92,.013);}

export function threshold(){
 const floor=new Artisan(),details=new Artisan();walk(floor,[COVE_NODES[0],COVE_NODES[1],COVE_NODES[2]],.55,true);
 for(const [x,z] of [[8.05,-1.78],[8.5,-2.04]]){details.cyl(dark,[x,.49,z],.042,.38);details.cyl(edge,[x,.69,z],.052,.032);}
 garden(details,8.05,-2.48);garden(details,8.45,-2.70);light(details,8.16,-1.78);
 // Timber joins and small sandy apron ground the bridge in the new shore.
 floor.box('#b8a884',[7.96,.348,-2.02],[.53,.04,.72],[0,.35,0]);
 return [floor.finish(),details.finish()];
}
export function commons(plot:CovePlot){
 const p=PLAZA[plot],floor=new Artisan(),furniture=new Artisan(),plants=new Artisan();
 disk(floor,p[0]+.15,p[1]-.05,.73);border(floor,p[0]+.15,p[1]-.05,.75,.18,5.4);
 const seats=plot==='sea'?[COVE_NODES[4],COVE_NODES[9]]:[COVE_NODES[6],COVE_NODES[10]],angle=plot==='sea'?.15:-2.5;
 bench(furniture,[(seats[0][0]+seats[1][0])/2,(seats[0][1]+seats[1][1])/2],angle);
 if(plot==='sea'){
  walk(floor,[COVE_NODES[2],COVE_NODES[3],COVE_NODES[4]],.45);
  for(let j=0;j<13;j++)floor.box(j%3?wood:edge,[9.23+j*.075,.389,-1.04],[.066,.048,.84]);
  garden(plants,9.0,-1.18);garden(plants,10.14,-1.35);light(plants,10.08,-1.52);
  furniture.box('#8b7152',[9.17,.55,-1.16],[.20,.16,.19]);furniture.cyl('#eee0b3',[9.17,.65,-1.16],.06,.05);
 }else{
  walk(floor,[COVE_NODES[2],COVE_NODES[11],COVE_NODES[12]],.46);
  garden(plants,10.23,-2.91);garden(plants,9.45,-3.56);light(plants,10.38,-3.36);
  // A light slatted canopy in the trees; open sides keep inhabitants visible.
  for(const x of [9.55,10.60])for(const z of [-3.59,-2.95])plants.box(dark,[x,1.12,z],[.048,1.5,.048]);
  for(let j=0;j<8;j++)plants.box(j%2?edge:wood,[9.48+j*.16,1.89,-3.28],[.058,.07,.87]);
  plants.beam(edge,[9.50,1.80,-3.60],[10.62,1.80,-3.60],.021);
  plants.beam(edge,[9.50,1.80,-2.96],[10.62,1.80,-2.96],.021);
  furniture.box(wood,[9.50,.61,-3.02],[.24,.09,.24]);furniture.cyl('#b77958',[9.5,.72,-3.02],.06,.12);
 }
 return [floor.finish(),furniture.finish(),plants.finish()];
}
export function promenade(){
 const sections=[new Artisan(),new Artisan(),new Artisan()];
 walk(sections[0],[COVE_NODES[1],COVE_NODES[8],COVE_NODES[7]],.44);
 walk(sections[1],[COVE_NODES[7],COVE_NODES[11],COVE_NODES[13],COVE_NODES[5],COVE_NODES[3],COVE_NODES[2]],.43);
 for(const [x,z] of [[8.33,-3.44],[9.32,-4.01],[10.52,-2.63]]){
  sections[2].cyl(dark,[x,.52,z],.027,.34);sections[2].cyl(edge,[x,.70,z],.036,.033);
 }
 garden(sections[2],8.61,-3.52);garden(sections[2],10.22,-2.25);light(sections[2],9.5,-3.90);
 // A lookout edge and a planted rest in the loop, without adding management.
 sections[2].beam(edge,[10.47,.69,-2.36],[10.47,.69,-2.92],.025);
 return sections.map(a=>a.finish());
}
export class CoveArt{
 group=new T.Group();entry=threshold();sea=commons('sea');shade=commons('shade');loop=promenade();
 work=new T.Group();ghost=new T.Group();
 constructor(){
  this.group.add(...this.entry,...this.sea,...this.shade,...this.loop,this.work,this.ghost);
  const a=new Artisan();for(const [x,z] of [[-.48,-.45],[.48,-.45],[-.48,.45],[.48,.45]]){a.cyl('#b49b75',[x,.66,z],.025,.60);}a.beam('#dbc696',[-.48,.88,-.45],[.48,.88,-.45],.01);
  for(let i=0;i<5;i++)a.box(wood,[-.34+i*.16,.40,0],[.11,.085,.59],[0,.07,0]);
  this.work.add(a.finish());this.work.visible=false;
  this.ghost.visible=false;
 }
 preview(plot:CovePlot|null){
  this.ghost.visible=!!plot;if(!plot)return;
  // Rebuild only on placement change, never per frame.
  if(this.ghost.userData.plot===plot)return;
  this.ghost.traverse(o=>{if(o instanceof T.Mesh)(o.material as T.Material).dispose();});
  this.ghost.clear();for(const part of (plot==='sea'?this.sea:this.shade)){
   const clone=part.clone(true);clone.visible=true;clone.traverse(o=>{if(o instanceof T.Mesh){o.material=new T.MeshBasicMaterial({color:'#f3dda7',transparent:true,opacity:.4,depthWrite:false});o.castShadow=false;}});this.ghost.add(clone);
  }this.ghost.userData.plot=plot;
 }
 render(s:{cove:boolean,commons:CovePlot|null,promenade:boolean,construction?:{id:string,plot:string,progress:number}}){
  const c=s.construction;
  const show=(parts:T.Group[],built:boolean,id:string,plot?:string)=>parts.forEach((g,i)=>{g.visible=built||c?.id===id&&(!plot||c.plot===plot)&&c.progress>i/parts.length;});
  show(this.entry,s.cove,'cove');show(this.sea,s.commons==='sea','commons','sea');show(this.shade,s.commons==='shade','commons','shade');show(this.loop,s.promenade,'promenade');
  this.work.visible=!!c&&['cove','commons','promenade'].includes(c.id);
  if(this.work.visible){const p=c!.id==='commons'?PLAZA[c!.plot as CovePlot]:c!.id==='cove'?COVE_NODES[1]:COVE_NODES[2];this.work.position.set(p[0],0,p[1]);}
 }
}
