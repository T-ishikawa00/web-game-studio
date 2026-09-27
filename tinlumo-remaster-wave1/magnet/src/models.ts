import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

export const S=.02;
export const materials={
 ivory:new THREE.MeshStandardMaterial({color:0xf3eedf,roughness:.43,metalness:.15}),
 pale:new THREE.MeshStandardMaterial({color:0xb5c7ca,roughness:.5,metalness:.35}),
 teal:new THREE.MeshStandardMaterial({color:0x126878,roughness:.33,metalness:.42}),
 dark:new THREE.MeshStandardMaterial({color:0x263e49,roughness:.48,metalness:.62}),
 rubber:new THREE.MeshStandardMaterial({color:0x192b32,roughness:.9,metalness:.04}),
 steel:new THREE.MeshStandardMaterial({color:0xa8b4b4,roughness:.31,metalness:.78}),
 orange:new THREE.MeshStandardMaterial({color:0xdf861d,roughness:.44,metalness:.28}),
 red:new THREE.MeshStandardMaterial({color:0xc6553d,roughness:.4,metalness:.32}),
 copper:new THREE.MeshStandardMaterial({color:0xa86f47,roughness:.34,metalness:.68}),
 floor:new THREE.MeshStandardMaterial({color:0xb8bbb0,roughness:.83,metalness:.08}),
 floor2:new THREE.MeshStandardMaterial({color:0x9caca8,roughness:.78,metalness:.12}),
 cyan:new THREE.MeshStandardMaterial({color:0x84e4ee,emissive:0x47c4d6,emissiveIntensity:1.5,roughness:.28,metalness:.25}),
 amber:new THREE.MeshStandardMaterial({color:0xffd278,emissive:0xf7b347,emissiveIntensity:1.15,roughness:.25,metalness:.22}),
 eye:new THREE.MeshStandardMaterial({color:0xff9171,emissive:0xff4936,emissiveIntensity:1.1,roughness:.28}),
 mint:new THREE.MeshStandardMaterial({color:0xa8efd5,emissive:0x67dba2,emissiveIntensity:.7,roughness:.3}),
 white:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.6}),
 distant:new THREE.MeshStandardMaterial({color:0x9ebac5,roughness:1}),
};
export type MaterialName=keyof typeof materials;
// Original procedural micro-surface data. This is a material, never a scene image.
const surface=new Uint8Array(128*128*4);let noiseSeed=74;for(let i=0;i<128*128;i++){noiseSeed=(Math.imul(noiseSeed,1664525)+1013904223)>>>0;const n=157+(noiseSeed%36);surface[i*4]=surface[i*4+1]=surface[i*4+2]=n;surface[i*4+3]=255;}
const grain=new THREE.DataTexture(surface,128,128,THREE.RGBAFormat);grain.wrapS=grain.wrapT=THREE.RepeatWrapping;grain.repeat.set(6,6);grain.needsUpdate=true;materials.floor.bumpMap=grain;materials.floor.bumpScale=.026;materials.floor2.bumpMap=grain;materials.floor2.bumpScale=.025;materials.steel.roughnessMap=grain;

/** One draw per material, with true chamfered geometry and no raster scenery. */
export class Parts{
 buckets=new Map<THREE.Material,THREE.BufferGeometry[]>();
 add(g:THREE.BufferGeometry,m:THREE.Material|MaterialName,x=0,y=0,z=0,rx=0,ry=0,rz=0){
  const mat=typeof m==='string'?materials[m]:m;
  const geometry=g.index?g.toNonIndexed():g;
  geometry.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(1,1,1)));
  if(geometry!==g)g.dispose();const bucket=this.buckets.get(mat)??[];bucket.push(geometry);this.buckets.set(mat,bucket);
 }
 box(w:number,h:number,d:number,m:MaterialName|THREE.Material,x=0,y=0,z=0,r=.04,ry=0){this.add(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w*.24,h*.24,d*.24)),m,x,y,z,0,ry);}
 cyl(r:number,h:number,m:MaterialName|THREE.Material,x=0,y=0,z=0,rx=0,rz=0,n=16){this.add(new THREE.CylinderGeometry(r,r,h,n,1),m,x,y,z,rx,0,rz);}
 cone(r:number,h:number,m:MaterialName,x=0,y=0,z=0){this.add(new THREE.CylinderGeometry(r*.7,r,h,12),m,x,y,z);}
 torus(r:number,t:number,m:MaterialName,x=0,y=0,z=0,rx=Math.PI/2,ry=0){this.add(new THREE.TorusGeometry(r,t,6,32),m,x,y,z,rx,ry);}
 rod(a:THREE.Vector3,b:THREE.Vector3,r:number,m:MaterialName){const delta=b.clone().sub(a),g=new THREE.CylinderGeometry(r,r,delta.length(),8);g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize())));const mid=a.clone().add(b).multiplyScalar(.5);this.add(g,m,mid.x,mid.y,mid.z);}
 finish(){const g=new THREE.Group();for(const [mat,geoms]of this.buckets){const merged=mergeGeometries(geoms,false);for(const geo of geoms)geo.dispose();if(!merged)throw Error('Geometry merge failed');const mesh=new THREE.Mesh(merged,mat);mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);}this.buckets.clear();return g;}
}

function wheel(p:Parts,x:number,z:number,r=.24){p.cyl(r,.19,'rubber',x,r,z,Math.PI/2);p.cyl(r*.77,.21,'pale',x,r,z,Math.PI/2);p.cyl(r*.58,.22,'dark',x,r,z,Math.PI/2);p.cyl(r*.30,.24,'teal',x,r,z,Math.PI/2);p.cyl(r*.11,.26,'steel',x,r,z,Math.PI/2);for(let i=0;i<8;i++){const a=i/8*Math.PI*2;p.box(.06,.065,.21,'rubber',x+Math.cos(a)*r,r+Math.sin(a)*r,z,.008);}for(let i=0;i<4;i++){const a=i*Math.PI/2;p.cyl(.022,.24,'steel',x+Math.cos(a)*r*.48,r+Math.sin(a)*r*.48,z,Math.PI/2,0,6);}}
function sensor(p:Parts,x:number,y:number,z:number,r=.17,enemy=false){p.cyl(r+.08,.10,'dark',x,y,z,0,Math.PI/2);p.cyl(r,.13,enemy?'eye':'amber',x+.018,y,z,0,Math.PI/2);}

export function makePlayer(){
 const p=new Parts();
 for(const x of[-.39,.39])for(const z of[-.51,.51]){wheel(p,x,z,.30);p.box(.55,.19,.28,'teal',x,.58,z,.055);p.rod(new THREE.Vector3(x-.12,.40,z),new THREE.Vector3(x+.08,.70,z*.70),.04,'steel');}
 p.box(1.17,.23,.82,'dark',0,.42,0,.08);p.box(.78,.62,.72,'ivory',-.05,.84,0,.12);
 p.box(.33,.5,.76,'teal',-.38,.76,0,.08);p.box(.58,.20,.57,'ivory',.03,1.15,0,.08);
 p.box(.1,.34,.43,'dark',.40,.84,0,.03);sensor(p,.48,.87,0,.19);
 for(const z of[-.68,.68]){
  p.cyl(.17,.23,'dark',-.02,.82,z,Math.PI/2);p.cyl(.11,.25,'steel',-.02,.82,z,Math.PI/2);p.cyl(.055,.26,'orange',-.02,.82,z,Math.PI/2);p.box(.64,.18,.18,'dark',.26,.78,z,.055);p.rod(new THREE.Vector3(.02,.89,z),new THREE.Vector3(.56,.80,z),.035,'steel');
  p.box(.18,.46,.36,'teal',.65,.77,z,.04);p.box(.44,.16,.12,'ivory',.82,.93,z-.12,.025);p.box(.44,.16,.12,'ivory',.82,.61,z+.12,.025);
  p.box(.07,.15,.13,'cyan',1.05,.93,z-.12,.015);p.box(.07,.15,.13,'cyan',1.05,.61,z+.12,.015);
 }
 for(const z of[-.25,.25])p.box(.18,.08,.08,'cyan',-.38,1.1,z,.02);
 for(let i=0;i<5;i++)p.box(.08,.36,.045,'steel',-.50,.86,(i-2)*.115,.01);
 p.box(.5,.07,.60,'dark',-.12,1.23,0,.025);p.box(.28,.09,.43,'ivory',-.03,1.29,0,.04);p.box(.08,.04,.28,'orange',-.02,1.36,0,.01);
 for(const z of[-.40,.40]){p.cyl(.05,.16,'copper',-.19,1.13,z);p.box(.23,.16,.04,'teal',.05,.91,z,.025);}
 const root=p.finish();root.name='player';
 const evolution=new Parts();for(const z of[-.6,.6]){evolution.box(.6,.15,.22,'ivory',-.2,1.25,z,.05);evolution.cyl(.13,.14,'cyan',-.2,1.38,z);}
 const evo=evolution.finish();evo.name='evolution';evo.visible=false;root.add(evo);
 const attachment=(name:string,parts:Parts)=>{const g=parts.finish();g.name='kit-'+name;g.visible=false;root.add(g);};
 const swarm=new Parts();for(const z of[-.9,.9]){swarm.box(.34,.12,.52,'ivory',-.12,1.02,z,.04);swarm.torus(.24,.065,'copper',-.12,1.13,z);swarm.cyl(.14,.09,'cyan',-.12,1.13,z);}attachment('swarm',swarm);
 const lance=new Parts();for(const z of[-.35,.35]){lance.box(1.12,.17,.17,'dark',.71,1.03,z,.035);lance.box(.94,.07,.19,'ivory',.72,1.17,z,.022);lance.box(.76,.045,.06,'cyan',.80,1.10,z,.012);lance.cyl(.10,.16,'copper',.27,1.08,z,0,Math.PI/2);}attachment('lance',lance);
 const satellite=new Parts();for(const z of[-1.05,1.05]){satellite.rod(new THREE.Vector3(-.2,.85,z*.6),new THREE.Vector3(-.5,1.1,z),.055,'steel');satellite.box(.62,.24,.23,'ivory',-.48,1.13,z,.055);satellite.box(.37,.10,.25,'cyan',-.48,1.23,z,.022);}attachment('satellite',satellite);
 const cyclone=new Parts();cyclone.cyl(.22,.20,'dark',-.2,1.48,0);cyclone.torus(.61,.075,'teal',-.2,1.58,0);cyclone.torus(.51,.027,'cyan',-.2,1.6,0);for(let i=0;i<4;i++){const a=i*Math.PI/2;cyclone.box(.25,.11,.13,'ivory',-.2+Math.cos(a)*.60,1.59,Math.sin(a)*.60,.025,a);}attachment('cyclone',cyclone);
 const foundry=new Parts();for(const z of[-.57,.57]){foundry.cyl(.19,.59,'dark',-.5,1.26,z);foundry.cyl(.14,.43,'amber',-.5,1.31,z);for(const y of[1.08,1.24,1.40])foundry.torus(.19,.025,'copper',-.5,y,z);foundry.box(.52,.23,.16,'orange',.56,.78,z,.055);}attachment('foundry',foundry);
 const returning=new Parts();for(const z of[-.71,.71]){returning.torus(.30,.07,'ivory',.19,1.16,z,0,Math.PI/2);returning.torus(.23,.035,'cyan',.20,1.16,z,0,Math.PI/2);returning.box(.62,.08,.08,'copper',.43,1.32,z,.015);}attachment('return',returning);
 return root;
}

export function makeEnemy(role:string){
 const p=new Parts();
 if(role==='carrier'){
  for(const z of[-.72,.72]){p.box(2.25,.52,.42,'rubber',0,.36,z,.15);for(const x of[-.8,-.4,0,.4,.8])wheel(p,x,z,.26);p.box(2.2,.18,.56,'red',0,.75,z,.07);}
  p.box(2.15,.72,1.1,'dark',0,.82,0,.14);p.box(1.24,.58,1.03,'red',.53,1.28,0,.12);p.box(.7,.65,1.05,'orange',-.55,1.27,0,.09);
  p.box(.14,.66,1.3,'ivory',1.1,1.0,0,.06);sensor(p,1.2,1.2,0,.20);
  for(const z of[-.31,.31]){p.box(.62,.77,.25,'dark',-.53,1.86,z,.06);p.box(.35,.60,.12,'cyan',-.54,1.92,z+Math.sign(z)*.16,.04);}
  for(const x of[-.6,-.25,.1])p.cyl(.19,.7,'copper',x,1.70,0,Math.PI/2);
 }else if(role==='controller'||role==='elite'){
  p.cyl(role==='elite'?.95:1.16,.3,'dark',0,.25,0);p.cyl(.64,.7,'ivory',0,.72,0);p.cyl(.46,.82,'copper',0,.90,0);
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2,x=Math.cos(a)*.83,z=Math.sin(a)*.83;p.box(.38,1.35,.36,'ivory',x,1.05,z,.07,a);p.box(.12,.90,.12,'cyan',x*1.08,1.12,z*1.08,.02);p.cyl(.19,.18,'orange',x,1.83,z);}
  for(const y of[.6,.83,1.06,1.29])p.torus(.48,.04,'copper',0,y,0);p.cyl(.35,.8,'cyan',0,1.21,0);p.torus(.95,.065,'dark',0,1.63,0);
 }else if(role==='support'){
  for(const z of[-.38,.38])wheel(p,0,z,.23);p.box(.64,.48,.6,'ivory',0,.54,0,.12);p.cyl(.13,.66,'steel',0,1.06,0);p.box(.75,.25,.32,'teal',0,1.41,0,.06);p.box(.23,.7,.32,'teal',0,1.41,0,.06);p.box(.60,.1,.34,'mint',0,1.42,0,.03);p.box(.11,.57,.34,'mint',0,1.42,0,.03);sensor(p,.38,.64,0,.12,true);
 }else{
  const heavy=role==='heavy'||role==='shield',scale=heavy?1.2:1;
  for(const z of[-.43,.43]){p.box(.78,.23,.32,'dark',-.03,.21,z,.08);p.box(.3,.12,.35,'red',.26,.30,z,.05);p.cyl(.18,.35,'steel',-.10,.49,z,Math.PI/2);p.cyl(.08,.37,'dark',-.10,.49,z,Math.PI/2);p.box(.25,.39,.22,'red',-.12,.66,z,.065);p.rod(new THREE.Vector3(-.23,.4,z),new THREE.Vector3(.16,.82,z*.82),.045,'steel');}
  p.box(.81,.53,.64,'red',.01,.94,0,.10);p.box(.45,.12,.56,'ivory',-.05,1.25,0,.04);p.box(.27,.40,.70,'dark',-.32,.91,0,.04);sensor(p,.46,.98,0,.19,true);p.box(.58,.10,.64,'dark',0,.62,0,.035);for(let i=0;i<4;i++)p.box(.06,.27,.07,'copper',-.49,.92,(i-1.5)*.14,.01);for(const z of[-.32,.32])p.cyl(.045,.05,'steel',.11,1.26,z);
  if(role==='gunner'){for(const z of[-.3,.3]){p.box(.95,.16,.15,'dark',.58,1.05,z,.03);p.box(.8,.05,.17,'orange',.57,1.16,z,.02);p.cyl(.06,.1,'eye',1.11,1.05,z,0,Math.PI/2);}}
  if(role==='charger'){p.box(.93,.18,.53,'orange',.1,1.22,0,.05);for(const z of[-.27,.27])p.box(.45,.26,.13,'dark',.65,.66,z,.03);}
  const root=p.finish();root.scale.setScalar(scale);
  const q=new Parts();q.box(.16,.97,1.13,'red',.67,.77,0,.08);q.box(.08,.73,.8,'orange',.78,.80,0,.04);q.box(.1,.60,.08,'amber',.84,.84,0,.02);
  const shield=q.finish();shield.name='shield';shield.visible=role==='shield';root.add(shield);return root;
 }
 const root=p.finish();
 if(role==='controller'||role==='elite'){
  const shutterParts=new Parts();for(let i=0;i<6;i++){const a=i/6*Math.PI*2,x=Math.cos(a)*.68,z=Math.sin(a)*.68;shutterParts.box(.47,1.15,.18,'ivory',x,1.04,z,.045,-a+Math.PI/2);shutterParts.box(.37,.15,.20,'orange',x,.60,z,.025,-a+Math.PI/2);}
  const shutters=shutterParts.finish();shutters.name='boss-shutters';root.add(shutters);
 }
 return root;
}

export function makeRelay(){const p=new Parts();p.cyl(.56,.18,'dark',0,.13,0);p.cyl(.37,.9,'copper',0,.61,0);for(const y of[.36,.54,.72,.90])p.torus(.4,.025,'steel',0,y,0);for(const z of[-.3,.3])p.box(.42,.95,.13,'ivory',0,.63,z,.04);p.box(.17,.76,.14,'cyan',0,.65,.40,.03);p.box(.17,.76,.14,'cyan',0,.65,-.40,.03);p.cyl(.38,.16,'teal',0,1.18,0);return p.finish();}

export function makeScrapGeometry(kind:number){const p=new Parts();if(kind===0){p.box(.35,.08,.27,'steel',0,0,0,.035);for(const x of[-.12,.12])for(const z of[-.08,.08])p.cyl(.022,.04,'steel',x,.06,z,0,0,6);}else if(kind===1){p.box(.09,.20,.48,'steel',0,0,0,.012);p.box(.26,.06,.48,'steel',0,.11,0,.012);p.box(.26,.06,.48,'steel',0,-.11,0,.012);}else{p.box(.31,.065,.31,'steel',0,-.07,0,.02);for(const x of[-.12,.12])p.box(.07,.22,.31,'steel',x,.025,0,.02);p.cyl(.05,.06,'steel',0,-.01,0,0,0,8);}return(p.finish().children[0] as THREE.Mesh).geometry;}

export function makeEnvironment(width:number,height:number,mission:string,stage:number){
 const w=width*S,h=height*S,p=new Parts();
 p.box(w+1.3,1.50,h+1.3,'dark',0,-.82,0,.13);p.box(w+1.12,.21,h+1.1,'pale',0,-.02,0,.06);
 for(const z of[-h/2-.68,h/2+.68]){p.box(w+1.3,.18,.15,'orange',0,-.72,z,.03);p.box(w+1.3,.18,.18,'steel',0,-1.48,z,.025);for(let x=-w/2;x<w/2;x+=1.25){p.box(.72,.73,.1,'teal',x,-.78,z,.04);for(let j=0;j<4;j++)p.box(.53,.06,.13,'dark',x,-.55-j*.14,z,.01);p.cyl(.035,.08,'steel',x-.36,-.36,z,Math.PI/2);}}
 for(const x of[-w/2-.63,w/2+.63]){p.box(.14,1.15,h,'teal',x,-.81,0,.03);for(let z=-h/2;z<h/2;z+=1.8){p.box(.18,1.43,.2,'orange',x,-.88,z,.025);p.rod(new THREE.Vector3(x,-.20,z),new THREE.Vector3(x,-1.50,z+1.55),.085,'steel');}}
 const nx=Math.ceil(w/2.4),nz=Math.ceil(h/2.4),tw=w/nx,tz=h/nz;
 for(let x=0;x<nx;x++)for(let z=0;z<nz;z++)p.box(tw-.025,.11,tz-.025,(x+z+stage)%5===0?'floor2':'floor',(x+.5)*tw-w/2,.15,(z+.5)*tz-h/2,.018);
 for(const z of[-h/2-.16,h/2+.16]){p.box(w,.05,.15,'dark',0,.25,z,.01);p.box(w,.015,.04,'orange',0,.282,z-.13,.005);}
 for(const x of[-w/2-.16,w/2+.16]){p.box(.15,.05,h,'dark',x,.25,0,.01);p.box(.04,.015,h,'orange',x-.13,.282,0,.005);}
 // Perimeter service modules never enter the collision or playable surface.
 for(let x=-w/2+.7;x<w/2;x+=1.7){for(const z of[-h/2-.50,h/2+.50]){p.box(.55,.5,.32,'pale',x,-.53,z,.025);p.box(.26,.22,.36,'dark',x,-.50,z,.02);}if(x%2<1)p.box(.22,.014,.58,'orange',x,.22,h/2-.34,.008,-.5);}
 for(const x of[-w/2+.3,w/2-.3])for(let z=-h/2+.5;z<h/2;z+=.6){p.box(.16,.02,.04,'steel',x,.235,z,.005);}
 const rear=-h/2-1.4;
 for(const x of[-w/2-.5,w/2+.5]){p.box(.55,1.1,h+1.1,'dark',x,-.55,0,.10);for(let z=-h/2;z<h/2;z+=1.8){p.box(.22,.75,.22,'teal',x,.10,z,.02);p.box(.1,.1,1.82,'orange',x,.45,z+.85,.02);}}
 for(const x of[-w/2+1.2,w/2-1.2]){
  p.box(1.30,.38,1.5,'dark',x,.06,rear,.06);p.box(.70,3.55,.72,mission==='C'?'ivory':'orange',x,1.78,rear,.09);p.box(.78,.18,.83,'dark',x,1.2,rear,.025);p.box(.78,.18,.83,'dark',x,2.5,rear,.025);
  if(mission==='C'){for(let y=.7;y<3.2;y+=.3)p.torus(.42,.055,'copper',x,y,rear);p.box(.1,2.2,.13,'cyan',x,1.8,rear+.43,.02);}else{p.box(.28,2.30,.06,'dark',x,1.75,rear+.38,.02);}
 }
 if(mission!=='C'){
  p.box(w-1.2,.66,.9,'orange',0,3.72,rear,.08);p.box(w-1.6,.20,1.01,'dark',0,3.60,rear,.04);const trolley=-w*.12+stage*.4;p.box(1.4,.48,1.08,'teal',trolley,3.1,rear,.08);p.cyl(.032,1.2,'dark',trolley,2.35,rear);p.torus(.17,.055,'steel',trolley,1.68,rear,0);
 }
 const silo=(x:number,z:number,height:number)=>{p.cyl(.83,height,'ivory',x,height/2,z);p.cyl(.88,.25,'orange',x,height*.75,z);p.cyl(.88,.22,'teal',x,height*.2,z);p.cone(.88,.3,'pale',x,height+.1,z);for(const xx of[-.45,.45])p.box(.10,height,.10,'dark',x+xx,height/2,z+.82,.025);};
 silo(-w/2-1.9,rear+.85,3.5);silo(w/2+1.7,rear+1.8,2.9);
 for(let i=0;i<4;i++){const x=(i-1.5)*1.6,z=rear-.08;const hh=.65+(i%2)*.35;p.box(1.25,hh,.80,i%2?'teal':'ivory',x,hh/2,z,.055);for(const sx of[-.50,.50])p.box(.06,hh+.06,.88,'dark',x+sx,hh/2,z,.01);}
 for(const x of[-w/2-1.2,w/2+1.25])for(let i=0;i<3;i++){const z=(i-1)*2.3;p.box(.65,.7,.9,'teal',x,.35,z,.08);for(let j=0;j<4;j++)p.box(.7,.04,.07,'dark',x,.3+j*.1,z+.47,.01);}
 // Sunlit lower infrastructure gives the dock a grounded, inhabited scale.
 for(let i=0;i<8;i++){const x=(i%4-1.5)*(w*.7),z=-h-7-Math.floor(i/4)*6,ht=3+(i*7%5);p.box(2.5,ht,2.7,'distant',x,ht/2-4,z,.15);p.cyl(.35,ht+1,'distant',x+.9,ht/2-3,z+.7);}
 for(const x of[-w/2,w/2]){p.box(.95,6,1.1,'dark',x,-4.0,h/2-.4,.10);p.box(1.15,.35,1.35,'orange',x,-2.4,h/2-.4,.05);p.rod(new THREE.Vector3(x,-1.4,h/2-.4),new THREE.Vector3(x>0?x-2.6:x+2.6,-4.4,h/2-.4),.2,'teal');}
 for(let i=0;i<5;i++){const x=(i-2)*3.3,z=-h/2-4.5;p.box(1.6,.16,2.3,'distant',x,-1,z,.02);p.cyl(.32,2.2,'distant',x,-.2,z);p.box(.15,.15,3.8,'distant',x,-.9,z+1.8,.02);}
 const root=p.finish();root.name='environment';return root;
}
