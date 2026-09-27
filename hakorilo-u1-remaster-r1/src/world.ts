import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {SSAOPass} from 'three/addons/postprocessing/SSAOPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {deliveryWaitCells, type DeliveryLevel, type DeliveryEdit, type DeliveryRun} from '../../src/prototypes/delivery-r2';

import {planStage,fitHitTargets} from './stage-art';

type Anchor={kind:'arrow'|'wait';index:number;cell:number;position:T.Vector3};
const palette={cream:0xffedcd,stone:0xe4c9a0,rock:0xa89582,grass:0x789c42,leaf:0x3f6837,coral:0xe98267,teal:0x459c9a,ink:0x233d49,gold:0xeabf6a};
const up=new T.Vector3(0,1,0);
const ease=(x:number)=>1-(1-x)**3;
const yaw=(dir:number)=>(2-dir)*Math.PI/2;
const smoothAngle=(a:number,b:number,t:number)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
function rng(seed:number){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
const sphere=new T.SphereGeometry(1,12,8);
const round=new RoundedBoxGeometry(1,1,1,3,.11);
const cube=new T.BoxGeometry(1,1,1);
const cylinder=new T.CylinderGeometry(1,1,1,24);
const mat=(c:number,roughness=.8,metalness=0)=>new T.MeshStandardMaterial({color:c,roughness,metalness});
const mats={cream:mat(palette.cream,.68),stone:mat(palette.stone),rock:mat(palette.rock),grass:mat(palette.grass),leaf:mat(palette.leaf),leafLight:mat(0x91aa51),wood:mat(0xa27644),coral:mat(palette.coral,.52),teal:mat(palette.teal,.45),ink:mat(palette.ink,.38),gold:mat(palette.gold,.4,.35),white:mat(0xfffcdf,.7),parcel:mat(0xb98b53),dark:mat(0x64524a),flower:mat(0xf5ca84),water:mat(0x89cbd0,.22,.1),light:new T.MeshStandardMaterial({color:0xffd994,emissive:0xffb641,emissiveIntensity:.7,roughness:.45})};
function grain(seed:number){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d')!,r=rng(seed);ctx.fillStyle='#ede9d9';ctx.fillRect(0,0,256,256);for(let i=0;i<14000;i++){const v=190+Math.floor(r()*65);ctx.fillStyle=`rgba(${v},${v},${v},.22)`;ctx.fillRect(r()*256,r()*256,1+r()*2,1+r()*2);}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;return t;}
const stoneGrain=grain(31);mats.stone.map=stoneGrain;mats.rock.map=stoneGrain;mats.cream.map=grain(33);mats.wood.map=grain(87);mats.grass.map=grain(112);
const contactMaterial=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d')!,gr=q.createRadialGradient(32,32,4,32,32,32);gr.addColorStop(0,'rgba(38,45,21,.36)');gr.addColorStop(.45,'rgba(38,45,21,.20)');gr.addColorStop(1,'rgba(38,45,21,0)');q.fillStyle=gr;q.fillRect(0,0,64,64);return new T.MeshBasicMaterial({map:new T.CanvasTexture(c),transparent:true,depthWrite:false});})();
function contact(parent:T.Object3D,x:number,y:number,z:number,sx:number,sz:number){const o=mesh(parent,new T.PlaneGeometry(1,1),contactMaterial,x,y,z,sx,sz,1,false);o.rotation.x=-Math.PI/2;return o;}
function mesh(parent:T.Object3D,g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,sx=1,sy=1,sz=1,shadow=true){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=shadow;o.receiveShadow=true;parent.add(o);return o;}
function box(parent:T.Object3D,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){return mesh(parent,round,m,x,y,z,sx,sy,sz);}
function ball(parent:T.Object3D,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){return mesh(parent,sphere,m,x,y,z,sx,sy,sz);}
function rod(parent:T.Object3D,m:T.Material,a:T.Vector3,b:T.Vector3,r:number){const o=mesh(parent,cylinder,m,0,0,0,r,a.distanceTo(b),r);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(up,b.clone().sub(a).normalize());return o;}
function label(text:string,color:string,background='transparent'){const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d')!;if(background!=='transparent'){q.fillStyle=background;q.fillRect(0,0,128,128);}q.fillStyle=color;q.font='bold 84px Arial';q.textAlign='center';q.textBaseline='middle';q.fillText(text,64,69);const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;return new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false});}
const labels={A:label('A','#fff9e6'),B:label('B','#fff9e6')};
function badge(parent:T.Object3D,id:string,x:number,y:number,z:number,size=.22){const o=mesh(parent,new T.PlaneGeometry(1,1),labels[id as 'A'|'B'],x,y,z,size,size,1,false);return o;}
function arrowGeometry(){const shape=new T.Shape();shape.moveTo(-.09,-.27);shape.lineTo(.09,-.27);shape.lineTo(.09,.03);shape.lineTo(.25,.03);shape.lineTo(0,.29);shape.lineTo(-.25,.03);shape.lineTo(-.09,.03);shape.closePath();const g=new T.ExtrudeGeometry(shape,{depth:.035,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.018,bevelThickness:.015});g.rotateX(Math.PI/2);return g;}
const arrowGeo=arrowGeometry();

export class GroveWorld{
 readonly renderer:T.WebGLRenderer;readonly scene=new T.Scene();readonly camera=new T.OrthographicCamera();
 private composer:EffectComposer;private ao:SSAOPass;
 readonly anchors:Anchor[]=[];
 private content=new T.Group();private movers:T.Group[]=[];private arrows:T.Group[]=[];private clockHands:T.Object3D[]=[];private effects=new T.Group();private level!:DeliveryLevel;
 private run?:DeliveryRun;private before?:DeliveryRun;private moveTime=0;private enterTime=0;private lastTime=0;private screen='title';private reduce=false;private frame=0;private samples:number[]=[];private waitBadges:T.Group[]=[];
 private waterMeshes:T.Object3D[]=[];private projectFn:((anchors:{kind:string;index:number;cell:number;x:number;y:number}[])=>void)|undefined;
 private observer:ResizeObserver; private target=new T.Vector3();private mobile=false;private disposed=false;private materials:T.Material[]=[];
 private courierState:((v:{id:string;x:number;y:number;remaining:number;waiting:boolean}[])=>void)|undefined;
 private dirty=true;private renderedFrames=0;private skippedFrames=0;private cpuSamples:number[]=[];private geometryBytes=0;
 constructor(readonly container:HTMLElement,readonly capture=false){
  this.renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance',preserveDrawingBuffer:capture});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.03;
  this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.autoUpdate=false;this.renderer.shadowMap.type=T.PCFShadowMap;this.renderer.setClearColor(0x000000,0);this.renderer.domElement.setAttribute('aria-hidden','true');container.append(this.renderer.domElement);
  const sky=document.createElement('canvas');sky.width=2;sky.height=256;const skyContext=sky.getContext('2d')!,skyGradient=skyContext.createLinearGradient(0,0,0,256);skyGradient.addColorStop(0,'#e3f0ed');skyGradient.addColorStop(.6,'#eef1df');skyGradient.addColorStop(1,'#f4ecd5');skyContext.fillStyle=skyGradient;skyContext.fillRect(0,0,2,256);const skyTexture=new T.CanvasTexture(sky);skyTexture.colorSpace=T.SRGBColorSpace;this.scene.background=skyTexture;
  const hemi=new T.HemisphereLight(0xe6f4ff,0x927b57,1.35);this.scene.add(hemi);
  const key=new T.DirectionalLight(0xffe5b9,3.0);key.position.set(-5,10,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:1,far:30});key.shadow.bias=-.0003;key.shadow.normalBias=.025;key.shadow.radius=3;this.scene.add(key);
  const fill=new T.DirectionalLight(0xb3def6,1.1);fill.position.set(6,5,-7);this.scene.add(fill);
  const pmrem=new T.PMREMGenerator(this.renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.08);this.scene.environment=env.texture;this.scene.environmentIntensity=.23;room.dispose();pmrem.dispose();
  const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,samples:4});this.composer=new EffectComposer(this.renderer,target);this.composer.addPass(new RenderPass(this.scene,this.camera));this.ao=new SSAOPass(this.scene,this.camera,512,512,16);this.ao.kernelRadius=.48;this.ao.minDistance=.0003;this.ao.maxDistance=.045;this.composer.addPass(this.ao);this.composer.addPass(new OutputPass());this.renderer.info.autoReset=false;
  this.scene.add(this.content);this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(container);this.frame=requestAnimationFrame(t=>this.animate(t));
 }
 onProject(fn:typeof this.projectFn){this.projectFn=fn;this.project();}
 onCourierState(fn:typeof this.courierState){this.courierState=fn;}
 point(cell:number){const size=this.level.size;return new T.Vector3(cell%size-(size-1)/2,.13,Math.floor(cell/size)-(size-1)/2);}
 setScreen(screen:string){this.screen=screen;this.resize();}
 setReducedMotion(reduce:boolean){this.reduce=reduce;this.dirty=true;}
 setLevel(level:DeliveryLevel,edit:DeliveryEdit){
  const oldGeometries=new Set<T.BufferGeometry>();this.content.traverse(o=>{if(o instanceof T.InstancedMesh)o.dispose();if(o instanceof T.Mesh&&![round,sphere,cylinder,cube,arrowGeo].includes(o.geometry))oldGeometries.add(o.geometry);});oldGeometries.forEach(g=>g.dispose());
  this.materials.forEach(m=>m.dispose());this.materials=[];
  this.scene.remove(this.content);this.content=new T.Group();this.scene.add(this.content);this.level=level;this.run=undefined;this.before=undefined;this.movers=[];this.arrows=[];this.anchors.length=0;this.clockHands=[];this.waitBadges=[];this.waterMeshes=[];this.effects=new T.Group();
  const plan=planStage(level),rand=rng(plan.profile.seed),staticRoot=new T.Group();this.content.add(staticRoot);
  mats.grass.color.setHex(plan.profile.grass);mats.leaf.color.setHex(plan.profile.leaf);mats.leafLight.color.setHex(plan.profile.light);mats.flower.color.setHex(plan.profile.flower);
  const n=level.size,is18=n===7,rx=plan.rx,rz=plan.rz;
  const contour=new T.Shape();for(let i=0;i<=80;i++){const t=i/80*Math.PI*2,r=plan.radius(t);const x=Math.cos(t)*rx*r,z=Math.sin(t)*rz*r;if(i===0)contour.moveTo(x,z);else contour.lineTo(x,z);}contour.closePath();
  const land=new T.ExtrudeGeometry(contour,{depth:.92,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.18,bevelThickness:.2});land.rotateX(-Math.PI/2);land.translate(0,-1.24,0);mesh(staticRoot,land,mats.rock,0,0,0);
  const cap=new T.ExtrudeGeometry(contour,{depth:.08,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.13,bevelThickness:.08});cap.rotateX(-Math.PI/2);cap.translate(0,-.08,0);mesh(staticRoot,cap,mats.grass,0,0,0);
  // The cliff has its own layered stone volumes; it never introduces a traversable tile.
  for(let i=0;i<66;i++){const t=i/66*Math.PI*2,r=plan.radius(t);const h=.55+rand()*.55;const rock=box(staticRoot,i%3?mats.rock:mats.stone,Math.cos(t)*rx*r,-.53,Math.sin(t)*rz*r,.42+rand()*.32,h,.38);rock.rotation.y=-t;rock.rotation.z=(rand()-.5)*.22;ball(staticRoot,i%2?mats.grass:mats.leafLight,Math.cos(t)*rx*r,-.05,Math.sin(t)*rz*r,.3,.18,.26);}
  const roads=Array.from({length:n*n},(_,i)=>i).filter(i=>!level.walls.includes(i));
  roads.forEach(cell=>{
   const p=this.point(cell);box(staticRoot,mats.stone,p.x,.005,p.z,.992,.18,.992);box(staticRoot,mats.cream,p.x,.088,p.z,.972,.055,.972);
   // Inlaid seams retain exact grid boundaries without turning the scene into a board frame.
   for(let j=0;j<3;j++)box(staticRoot,j===1?mats.stone:mats.cream,p.x-.315+j*.315,.127,p.z,.305,.018,.9);
   const ns=[[0,-1],[1,0],[0,1],[-1,0]];
   ns.forEach(([dx,dz])=>{const xx=cell%n+dx!,zz=Math.floor(cell/n)+dz!;if(xx>=0&&xx<n&&zz>=0&&zz<n&&!level.walls.includes(zz*n+xx))return;box(staticRoot,mats.stone,p.x+dx!*.52,.08,p.z+dz!*.52,dx?.08:.99,.17,dx?.99:.08);});
  });
  // Low meadow detail cannot hide a road. Tall trees live on the far perimeter only.
  for(let i=0;i<450;i++){
   const x=(rand()*2-1)*rx,z=(rand()*2-1)*rz;if((x/rx)**2+(z/rz)**2>.94)continue;
   const roadNear=roads.some(cell=>{const p=this.point(cell);return Math.abs(p.x-x)<.61&&Math.abs(p.z-z)<.61;});if(roadNear)continue;
   const r=.055+rand()*.10;ball(staticRoot,i%4===0?mats.leafLight:mats.leaf,x,.06,z,r,.085+rand()*.08,r);
   if(i%3===0){const c=i%9===0?mats.coral:mats.white;ball(staticRoot,c,x,.19,z,.046,.025,.046);ball(staticRoot,mats.flower,x+.026,.195,z,.014,.018,.014);}
  }
  const trees=plan.trees;
  for(const [x,z,s] of trees)this.tree(staticRoot,x!,z!,s!,rand);
  const rocks=is18?[[-1.05,-1.95],[-1.2,.0],[1.05,-2.1],[2.0,1.15],[2.65,2.2],[-3.0,1.4]]:[[-1.4,-1.45],[1.4,-1.25],[-1.5,1.7],[1.4,1.7]];
  for(const [x,z,s] of trees)ball(staticRoot,mats.grass,x!,.02,z!,.68*s!,.24*s!,.65*s!);
  rocks.forEach(([x,z],i)=>{if(roads.some(cell=>{const p=this.point(cell);return Math.abs(p.x-x!)<.78&&Math.abs(p.z-z!)<.78;}))return;const r=box(staticRoot,i%2?mats.rock:mats.stone,x!,.16,z!,.5,.4,.4);r.rotation.y=.4+i;r.rotation.z=.12;});
  // Small resting places are outside the exact drivable cells.
  const bench={x:is18?1.5:-1.55,z:is18?2.5:2.6};if(plan.profile.gold||!roads.some(c=>{const q=this.point(c);return Math.abs(q.x-bench.x)<.9&&Math.abs(q.z-bench.z)<.8;}))this.bench(staticRoot,bench.x,bench.z);
  for(const {a,b} of plan.fences){box(staticRoot,mats.wood,a.x,.19,a.z,.075,.42,.075);ball(staticRoot,mats.gold,a.x,.43,a.z,.07,.045,.07);rod(staticRoot,mats.wood,new T.Vector3(a.x,.3,a.z),new T.Vector3(b.x,.3,b.z),.022);}
  // Water falls down the cliff only, never across a puzzle road or shared junction.
  const water=box(staticRoot,mats.water,-rx*.53,-.69,rz*.89,.48,1.28,.12);water.rotation.y=-.35;
  for(let i=0;i<5;i++){const w=box(staticRoot,mats.white,-rx*.53-.17+i*.08,-.63,rz*.89+.08,.015,.78+rand()*.35,.018);w.rotation.y=-.35;}
  // Distant floating land and clouds are geometry with deliberately quiet silhouettes.
  // Atmosphere is supplied by the unobtrusive sky gradient; no opaque cloud bars cross the board.
  const farStone=mat(0xc9c8b8),farGrass=mat(0xbdcda4);this.materials.push(farStone,farGrass);
  for(const [x,z,s] of [[-6.3,-4.4,.85],[6.2,-3.7,.65],[3.4,-6.2,.46]]){const island=new T.Group();island.position.set(x!,-1.2,z!);island.scale.setScalar(s!);mesh(island,new T.ConeGeometry(.8,1.5,7),farStone,0,-.65,0,1,-1,1,false);mesh(island,cylinder,farGrass,0,.05,0,.78,.14,.65,false);ball(island,farGrass,-.2,.3,-.1,.27,.26,.24);ball(island,farGrass,.25,.4,0,.3,.36,.25);staticRoot.add(island);}
  level.robots.forEach((robot,i)=>{
   const p=this.point(robot.goal),house=new T.Group();house.position.copy(p);house.position.y=0;
   const placement=plan.houses[i]!;house.position.x=placement.x;house.position.z=placement.z;house.rotation.y=placement.rotation;
   this.depot(house,robot.id);staticRoot.add(house);
   const start=this.point(robot.start);const disc=mesh(staticRoot,cylinder,i?mats.teal:mats.coral,start.x,.145,start.z,.34,.028,.34);disc.castShadow=false;
   const courier=this.courier(robot.id);courier.position.copy(start);courier.position.y=.15;courier.rotation.y=yaw(robot.direction);this.content.add(courier);this.movers.push(courier);
  });
  Object.entries(level.fixedArrows??{}).forEach(([cell,dir])=>{const p=this.point(+cell),a=mesh(staticRoot,arrowGeo,mats.wood,p.x,.16,p.z);a.rotation.y=yaw(dir);});
  level.sockets.forEach((cell,index)=>{
   const p=this.point(cell),group=new T.Group();group.position.copy(p);const disc=mesh(group,cylinder,mats.wood,0,.025,0,.35,.055,.35);disc.castShadow=false;
   mesh(group,cylinder,mats.cream,0,.062,0,.31,.03,.31);const arrow=mesh(group,arrowGeo,mats.ink,0,.115,0);group.userData.arrow=arrow;
   this.content.add(group);this.arrows.push(group);this.anchors.push({kind:'arrow',index,cell,position:p.clone().setY(.24)});
  });
  deliveryWaitCells(level).forEach((cell,index)=>{
   const p=this.point(cell),clock=new T.Group();const placement=plan.clocks[index]!;const q=new T.Vector3(placement.x,p.y,placement.z);
   rod(staticRoot,mats.gold,new T.Vector3(p.x,.17,p.z),new T.Vector3(q.x,.17,q.z),.017);
   // A thin wait ring remains on the actual wait cell; the linked clock is the touch target.
   const ring=mesh(staticRoot,new T.TorusGeometry(.41,.018,6,32),mats.gold,p.x,.155,p.z);ring.rotation.x=-Math.PI/2;ring.castShadow=false;
   clock.position.copy(q).setY(.1);mesh(clock,cylinder,mats.gold,0,.08,0,.30,.16,.30);mesh(clock,cylinder,mats.cream,0,.18,0,.25,.065,.25);
   const hand=box(clock,mats.ink,.015,.223,-.04,.032,.026,.18);this.clockHands.push(hand);this.content.add(clock);this.waitBadges.push(clock);this.anchors.push({kind:'wait',index,cell,position:q.clone().setY(.33)});
  });
  this.mergeStatic(staticRoot,true);this.content.add(this.effects);this.setEdit(edit);this.enterTime=performance.now();this.dirty=true;this.resize();this.measureGeometry();
 }
 private tree(parent:T.Group,x:number,z:number,s:number,rand:()=>number){const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(s);contact(g,0,.09,0,1.8,1.5);rod(g,mats.wood,new T.Vector3(0,0,0),new T.Vector3(.1,1.25,0),.12);for(let i=0;i<5;i++){const t=i*1.25;rod(g,mats.wood,new T.Vector3(.03,.65,0),new T.Vector3(Math.cos(t)*.45,1.22,Math.sin(t)*.4),.055);}for(let i=0;i<18;i++){const t=i*2.39,r=Math.sqrt(rand())*.65;ball(g,mats.leaf,Math.cos(t)*r,1.2+rand()*.5,Math.sin(t)*r,.25,.20,.24);}for(let i=0;i<260;i++){const t=i*2.399,r=Math.sqrt(rand())*.79;const o=ball(g,i%5?mats.leaf:mats.leafLight,Math.cos(t)*r,1.33+Math.sqrt(1-(r/.85)**2)*.35+(rand()-.5)*.35,Math.sin(t)*r,.085,.035,.13);o.rotation.set(rand()*.9,rand()*6.28,rand()*.8);}parent.add(g);}
 private bench(parent:T.Group,x:number,z:number){for(let i=0;i<3;i++)box(parent,mats.wood,x,.22,z+i*.065, .72,.05,.06);for(let i=0;i<2;i++){box(parent,mats.dark,x+(i?1:-1)*.26,.10,z+.08,.05,.2,.21);box(parent,mats.wood,x,.38+i*.08,z+.22,.72,.05,.05);}}
 private depot(parent:T.Group,id:string){const color=id==='A'?mats.coral:mats.teal;
  contact(parent,0,.09,.1,1.4,1.3);
  box(parent,mats.stone,0,.075,.0,1.03,.15,.86);box(parent,mats.cream,0,.50,-.06,.87,.83,.64);
  box(parent,mats.wood,0,.37,.28,.44,.59,.045);box(parent,mats.dark,0,.37,.31,.035,.52,.03);
  box(parent,mats.wood,0,.48,-.397,.35,.39,.028);box(parent,mats.light,0,.48,-.414,.27,.30,.015);box(parent,mats.cream,0,.48,-.427,.025,.32,.018);box(parent,mats.cream,0,.48,-.427,.30,.025,.018);
  for(let side=0;side<2;side++)for(let j=0;j<3;j++){const x=side?-.443:.443;box(parent,mats.stone,x,.24+j*.23,-.10+(j%2)*.06,.022,.018,.52);}
  for(const x of [-.2,.2])box(parent,mats.gold,x,.32,.32,.026,.06,.025);
  box(parent,color,0,.145,.51,.59,.05,.36);
  // Barrel roof with individually glazed courses, rather than a stock cube roof.
  for(let i=0;i<9;i++){const x=(i-4)*.115,y=.91+Math.cos((i-4)/4*Math.PI/2)*.20;for(let j=0;j<4;j++){const r=box(parent,color,x,y,-.37+j*.21,.128,.09,.225);r.rotation.z=-(i-4)*.12;}}
  const roofID=badge(parent,id,0,1.165,-.08,.42);roofID.rotation.x=-Math.PI/2;
  mesh(parent,cylinder,color,0,.78,.3,.165,.055,.165).rotation.x=Math.PI/2;badge(parent,id,0,.79,.336,.19);
  for(const x of [-.44,.44]){box(parent,mats.wood,x,.56,.32,.08,.28,.09);box(parent,mats.light,x,.56,.373,.046,.17,.035);box(parent,mats.gold,x,.715,.32,.13,.035,.14);}
  box(parent,mats.wood,.36,1.28,-.2,.035,.64,.035);ball(parent,mats.gold,.36,1.62,-.2,.05,.05,.05);box(parent,color,.51,1.49,-.2,.3,.22,.025);badge(parent,id,.51,1.49,-.18,.14);
  for(let i=0;i<3;i++){box(parent,mats.parcel,-.59+(i%2)*.18,.16+Math.floor(i/2)*.24,.07,.23,.24,.23);box(parent,mats.cream,-.59+(i%2)*.18,.285+Math.floor(i/2)*.24,.07,.04,.01,.24);}
 }
 private courier(id:string){const g=new T.Group(),c=id==='A'?mats.coral:mats.teal;
  contact(g,0,.004,0,.9,.9);
  box(g,c,0,.22,0,.55,.23,.61);box(g,mats.cream,0,.46,.08,.57,.47,.52);box(g,mats.ink,0,.48,.347,.38,.25,.024);
  for(const x of [-.10,.10])ball(g,mats.light,x,.49,.368,.035,.065,.018);
  box(g,c,0,.245,.369,.45,.07,.043);box(g,mats.gold,0,.709,.035,.12,.033,.16);
  for(const x of [-.29,.29])for(const z of [-.21,.21]){const w=mesh(g,cylinder,mats.dark,x,.14,z,.12,.085,.12);w.rotation.z=Math.PI/2;const hub=mesh(g,cylinder,mats.gold,x+(x>0?.047:-.047),.14,z,.048,.015,.048);hub.rotation.z=Math.PI/2;}
  box(g,mats.parcel,0,.415,-.31,.46,.36,.28);box(g,mats.cream,0,.601,-.31,.065,.012,.295);box(g,mats.cream,0,.42,-.454,.065,.36,.012);
  for(const x of [-.3,.3]){box(g,c,x,.47,.055,.018,.2,.22);const b=badge(g,id,x+(x>0?.013:-.013),.47,.058,.17);b.rotation.y=x>0?Math.PI/2:-Math.PI/2;}
  const top=badge(g,id,0,.735,.04,.27);top.rotation.x=-Math.PI/2;
  const antenna=rod(g,mats.dark,new T.Vector3(.14,.70,.0),new T.Vector3(.14,.8,0),.012);ball(g,c,.14,.81,0,.042,.035,.042);this.mergeStatic(g,false);return g;
 }
 private mergeStatic(group:T.Group,instanced=false){
  group.updateMatrixWorld(true);
  const buckets=new Map<string,{material:T.Material;shadow:boolean;geometry:T.BufferGeometry;matrices:T.Matrix4[];parts:T.BufferGeometry[]}>();
  group.traverse(o=>{if(!(o instanceof T.Mesh))return;const material=o.material as T.Material;const key=material.uuid+String(o.castShadow)+(instanced?o.geometry.uuid:'');let b=buckets.get(key);if(!b){b={material,shadow:o.castShadow,geometry:o.geometry,matrices:[],parts:[]};buckets.set(key,b);}if(instanced)b.matrices.push(o.matrixWorld.clone());else b.parts.push((o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrixWorld));});
  group.clear();for(const b of buckets.values()){if(instanced){if(b.matrices.length===1||b.matrices.some(m=>m.determinant()<0)){for(const matrix of b.matrices){const mesh=new T.Mesh(b.geometry,b.material);mesh.matrix.copy(matrix);mesh.matrixAutoUpdate=false;mesh.castShadow=b.shadow;mesh.receiveShadow=true;group.add(mesh);}}else{const mesh=new T.InstancedMesh(b.geometry,b.material,b.matrices.length);b.matrices.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.instanceMatrix.needsUpdate=true;mesh.castShadow=b.shadow;mesh.receiveShadow=true;mesh.computeBoundingSphere();group.add(mesh);}}else{const g=mergeGeometries(b.parts,false);b.parts.forEach(p=>p.dispose());if(g){const mesh=new T.Mesh(g,b.material);mesh.castShadow=b.shadow;mesh.receiveShadow=true;group.add(mesh);}}}
 }
 private measureGeometry(){const seen=new Set<T.BufferGeometry>();let bytes=0;this.content.traverse(o=>{if(o instanceof T.Mesh&&!seen.has(o.geometry)){seen.add(o.geometry);for(const a of Object.values(o.geometry.attributes) as T.BufferAttribute[])bytes+=a.array.byteLength;if(o.geometry.index)bytes+=o.geometry.index.array.byteLength;}if(o instanceof T.InstancedMesh)bytes+=o.instanceMatrix.array.byteLength;});this.geometryBytes=bytes;}

 setEdit(edit:DeliveryEdit){this.dirty=true;this.arrows.forEach((g,i)=>{(g.userData.arrow as T.Mesh).rotation.y=yaw(edit.arrows[i]!);});this.clockHands.forEach((o,i)=>{const n=edit.waits?.[i]??edit.wait;o.rotation.y=n*Math.PI/2;});}
 setRun(run?:DeliveryRun){this.dirty=true;this.before=this.run??{...run!,bots:this.level.robots.map(r=>({id:r.id,p:r.start,d:r.direction,remaining:0,delivered:false})),tick:0,status:'running',seen:[]};this.run=run;this.moveTime=performance.now();this.effects.traverse(o=>{if(o instanceof T.Mesh&&o.geometry!==sphere)o.geometry.dispose();});this.effects.clear();if(run?.status==='failed')for(const cell of run.failureCells??[]){const p=this.point(cell),r=mesh(this.effects,new T.TorusGeometry(.4,.042,8,32),mats.coral,p.x,.18,p.z);r.rotation.x=-Math.PI/2;r.userData.failure=true;}
  if(run?.status==='won'){for(let i=0;i<24;i++){const robot=this.level.robots[i%this.level.robots.length]!,p=this.point(robot.goal);const b=ball(this.effects,i%2?mats.gold:mats.white,p.x,.5,p.z,.04,.07,.04);b.userData={spark:i,base:p};}}
 }
 cancelMotion(){this.dirty=true;this.before=this.run;this.moveTime=-1000;}
 private resize(){this.dirty=true;const w=this.container.clientWidth,h=this.container.clientHeight;if(!w||!h||!this.level)return;this.mobile=w<700;this.renderer.setSize(w,h,false);const n=this.level.size;
  const isPlay=this.screen==='play';this.target.set(0,-.12,0);const elev=this.mobile?1.95:1.35;this.camera.position.set(this.mobile?-.15:-4,11*elev,13);this.camera.lookAt(this.target);
  this.composer.setSize(w,h);this.ao.setSize(Math.round(w*.7),Math.round(h*.7));
  let width=this.mobile?(n===7?8.5:n===6?7.6:6.95):(n===7?10.3:n===6?9.8:9.35);if(!isPlay&&!this.mobile)width*=1.25;
  const minHeight=this.mobile?6.95:(isPlay?7.7:7.0);const height=Math.max(minHeight,width*h/w);width=height*w/h;
  this.camera.left=-width/2;this.camera.right=width/2;this.camera.top=height/2;this.camera.bottom=-height/2;this.camera.near=.1;this.camera.far=120;
  if(!isPlay&&!this.mobile){const offset=width*.18;this.camera.position.x-=offset;this.target.x-=offset;this.camera.lookAt(this.target);}
  this.camera.updateProjectionMatrix();this.ao.ssaoMaterial.defines.PERSPECTIVE_CAMERA=0;this.ao.ssaoMaterial.uniforms.cameraNear!.value=this.camera.near;this.ao.ssaoMaterial.uniforms.cameraFar!.value=this.camera.far;this.ao.ssaoMaterial.uniforms.cameraProjectionMatrix!.value.copy(this.camera.projectionMatrix);this.ao.ssaoMaterial.uniforms.cameraInverseProjectionMatrix!.value.copy(this.camera.projectionMatrixInverse);this.project();
 }
 private project(){const w=this.container.clientWidth,h=this.container.clientHeight;this.camera.updateMatrixWorld();const points=this.anchors.map(a=>{const p=a.position.clone().project(this.camera);return{kind:a.kind,index:a.index,cell:a.cell,x:(p.x+1)*w/2,y:(1-p.y)*h/2};});this.projectFn?.(fitHitTargets(points,w,h,this.mobile?44:46));}
 private animate(time:number){if(this.disposed)return;this.frame=requestAnimationFrame(t=>this.animate(t));if(document.hidden){this.lastTime=0;return;}if(this.lastTime&&time-this.lastTime<16)return;const moving=time-this.moveTime<900||time-this.enterTime<260;const waiting=this.run?.status==='running'&&this.run.bots.some(b=>b.remaining>0);const failure=this.run?.status==='failed';const active=!this.reduce&&(moving||waiting||failure);if(!this.capture&&!this.dirty&&!active){this.skippedFrames++;return;}if(this.lastTime){const dt=time-this.lastTime;if(dt<100){this.samples.push(dt);if(this.samples.length>1800)this.samples.shift();}}this.lastTime=time;
  if(this.level){const t=this.reduce?1:Math.min(1,Math.max(0,(time-this.moveTime)/180)),e=ease(t);const run=this.run;this.movers.forEach((g,i)=>{const b=run?.bots[i]??{...this.level.robots[i]!,p:this.level.robots[i]!.start,d:this.level.robots[i]!.direction,remaining:0,delivered:false};const old=this.before?.bots[i]??b;const p=this.point(b.p),prev=this.point(old.p);g.position.copy(prev).lerp(p,e);g.position.y=.15;g.rotation.y=smoothAngle(yaw(old.d),yaw(b.d),Math.min(1,t*2));g.rotation.z=0;g.rotation.x=0;
   if(!this.reduce){if(b.p!==old.p&&t<1){g.position.y+=Math.sin(t*Math.PI)*.035;g.rotation.x=Math.sin(t*Math.PI)*.055;}else if(b.remaining>0&&run?.status==='running'){g.rotation.z=Math.sin(time/180)*.025;}if(b.delivered&&time-this.moveTime<420){g.position.y+=Math.sin(Math.min(1,(time-this.moveTime)/420)*Math.PI)*.10;}if(run?.status==='failed'&&time-this.moveTime<300)g.rotation.z=Math.sin((time-this.moveTime)/28)*.035*(1-(time-this.moveTime)/300);}
  });
  this.courierState?.(this.movers.map((g,i)=>{const b=run?.bots[i],old=this.before?.bots[i];const p=g.position.clone().add(new T.Vector3(0,1.05,0)).project(this.camera);return{id:this.level.robots[i]!.id,x:(p.x+1)*this.container.clientWidth/2,y:(1-p.y)*this.container.clientHeight/2,remaining:b?.remaining??0,waiting:!!b&&run?.status==='running'&&(b.remaining>0||!!old&&old.remaining>0&&old.p===b.p)};}));
  this.effects.children.forEach(o=>{if(o.userData.failure)o.scale.setScalar(this.reduce?1:1+Math.sin(time/120)*.035);if(o.userData.spark!==undefined){const dt=(time-this.moveTime)/850,i=o.userData.spark as number;const p=o.userData.base as T.Vector3;o.visible=dt<1&&!this.reduce;o.position.set(p.x+Math.cos(i*2.4)*dt*.55,.5+Math.sin(dt*Math.PI)*.85,p.z+Math.sin(i*2.4)*dt*.55);o.rotation.set(dt*3,i,dt*2);o.scale.setScalar(.8*(1-dt));}});
  this.content.position.y=this.reduce?0:Math.max(0,1-(time-this.enterTime)/240)*-.13;
  }
  const began=performance.now();this.renderer.info.reset();this.renderer.shadowMap.needsUpdate=this.dirty||active;this.composer.render();this.dirty=false;this.renderedFrames++;this.cpuSamples.push(performance.now()-began);if(this.cpuSamples.length>600)this.cpuSamples.shift();
 }
 stats(){const sorted=[...this.samples].sort((a,b)=>a-b);return{settled:performance.now()-this.enterTime>300,width:this.container.clientWidth,height:this.container.clientHeight,mobileCamera:this.mobile,frames:sorted.length,renderedFrames:this.renderedFrames,skippedIdleFrames:this.skippedFrames,geometryAttributeBytes:this.geometryBytes,cpuSubmissionMsP95:[...this.cpuSamples].sort((a,b)=>a-b)[Math.floor(this.cpuSamples.length*.95)]??0,qualityTier:'Gold geometry / 2048 shadow / 70% AO',captureMode:this.capture,frameMsMedian:sorted[Math.floor(sorted.length*.5)]??0,frameMsP95:sorted[Math.floor(sorted.length*.95)]??0,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,pixelRatio:this.renderer.getPixelRatio(),webgl:this.renderer.getContext().getParameter(this.renderer.getContext().VERSION)};}
 dispose(){this.disposed=true;cancelAnimationFrame(this.frame);this.observer.disconnect();this.ao.dispose();this.composer.dispose();this.renderer.dispose();}
}
