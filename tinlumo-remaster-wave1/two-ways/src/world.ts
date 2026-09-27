import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {SSAOPass} from 'three/addons/postprocessing/SSAOPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import type {HomeLevel,HomeState} from '../../../src/prototypes/rules';
import type {TwPlan} from '../../../src/prototypes/twoways-craft-plan';

const clamp=(x:number,a:number,b:number)=>Math.max(a,Math.min(b,x));
const ease=(x:number)=>1-Math.pow(1-x,3);
const C={ink:0x263545,stone:0xdbd4be,edge:0xbbb4a1,brick:0x957061,roof:0xb57160,blue:0x576f86,glass:0xffcd80,iron:0x455461,leaf:0x697569};
type Actor={root:THREE.Group;body:THREE.Group;head:THREE.Group;legs:THREE.Mesh[];badge:THREE.Mesh;home:THREE.Group};

/** Presentation only. All routes, obstacles, targets and actor positions come from the canonical level/state. */
export class TownWorld {
 readonly renderer:THREE.WebGLRenderer;
 readonly scene=new THREE.Scene();
 readonly camera=new THREE.OrthographicCamera(-8,8,5,-5,.1,100);
 private readonly composer:EffectComposer;
 private readonly ssao:SSAOPass;
 private readonly key=new THREE.DirectionalLight(0xffd5ac,3.6);
 private readonly materialCache=new Map<string,THREE.MeshStandardMaterial>();
 private readonly geometryCache=new Map<string,THREE.BufferGeometry>();
 private readonly textures:THREE.Texture[]=[];
 private readonly stage=new THREE.Group();
 private bridge:THREE.Group|undefined;
 private readonly compositeScene=new THREE.Scene();
 private readonly compositeCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);
 private readonly compositeMaterial=new THREE.ShaderMaterial({uniforms:{tDiffuse:{value:null}},vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}',fragmentShader:'uniform sampler2D tDiffuse; varying vec2 vUv; void main(){gl_FragColor=texture2D(tDiffuse,vUv);}',depthTest:false,depthWrite:false});
 private readonly cities:THREE.Group[]=[];
 private readonly actors:Actor[]=[];
 private level!:HomeLevel;
 private state!:HomeState;
 private compact=false;
 private reduced=false;
 private plan:TwPlan|undefined;
 private origin=0;
 private raf=0;
 private dirty=true;
 private width=0;
 private height=0;
 private frames=0;
 private idleSkipped=0;
 private renderMs:number[]=[];
 private frameIntervals:number[]=[];
 private activeIntervals:number[]=[];
 private previousAnimating=false;
 private lastFrame=0;
 private blocked:[boolean,boolean]=[false,false];
 private active=true;
 private staticInstances=0;
 private texture:THREE.CanvasTexture;
 constructor(readonly container:HTMLElement){
  this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFShadowMap;this.renderer.shadowMap.autoUpdate=false;this.renderer.info.autoReset=false;
  this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.08;this.renderer.outputColorSpace=THREE.SRGBColorSpace;
  this.renderer.domElement.setAttribute('aria-hidden','true');container.append(this.renderer.domElement);
  this.scene.background=new THREE.Color(0xd9d5d3);
  this.scene.add(new THREE.HemisphereLight(0xc7d2ed,0x6f5268,1.55));
  this.key.position.set(-7,11,6);this.key.castShadow=true;this.key.shadow.mapSize.set(2048,2048);this.key.shadow.camera.left=-13;this.key.shadow.camera.right=13;this.key.shadow.camera.top=13;this.key.shadow.camera.bottom=-13;this.key.shadow.bias=-.00035;this.key.shadow.normalBias=.03;this.key.shadow.radius=3;this.scene.add(this.key);
  const fill=new THREE.DirectionalLight(0xb5c6ee,.65);fill.position.set(5,5,-5);this.scene.add(fill);
  this.texture=this.makeTexture();this.scene.add(this.stage);
  this.composer=new EffectComposer(this.renderer);this.composer.addPass(new RenderPass(this.scene,this.camera));
  this.ssao=new SSAOPass(this.scene,this.camera,800,500);this.ssao.kernelRadius=.65;this.ssao.minDistance=.002;this.ssao.maxDistance=.08;this.ssao.output=SSAOPass.OUTPUT.Default;this.composer.addPass(this.ssao);this.composer.addPass(new OutputPass());
  this.compositeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),this.compositeMaterial));
  this.camera.position.set(0,15,11);this.camera.lookAt(0,0,-.5);
  new ResizeObserver(()=>this.resize()).observe(container);
 }
 private makeTexture(){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d')!;c.fillStyle='#c8c4bd';c.fillRect(0,0,128,128);
  let seed=71;for(let i=0;i<6000;i++){seed=(seed*1664525+1013904223)>>>0;const x=seed%128;seed=(seed*1664525+1013904223)>>>0;const y=seed%128;c.fillStyle=`rgba(${i%2?255:80},${i%2?255:75},${i%2?250:70},.065)`;c.fillRect(x,y,1,1);}
  const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(2,2);texture.colorSpace=THREE.SRGBColorSpace;this.textures.push(texture);return texture;
 }
 private mat(color:number,roughness=.8,metalness=0,emissive=0,texture=false){const key=[color,roughness,metalness,emissive,texture].join('/');let m=this.materialCache.get(key);if(!m){m=new THREE.MeshStandardMaterial({color,roughness,metalness,emissive,emissiveIntensity:emissive?1.3:0,...texture?{map:this.texture}:{}});this.materialCache.set(key,m);}return m;}
 private geo(key:string,create:()=>THREE.BufferGeometry){let g=this.geometryCache.get(key);if(!g){g=create();this.geometryCache.set(key,g);}return g;}
 private mesh(parent:THREE.Object3D,geo:THREE.BufferGeometry,mat:THREE.Material,x:number,y:number,z:number,shadow=true){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=shadow;m.receiveShadow=true;parent.add(m);return m;}
 private box(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,color:number,r=.025){return this.mesh(parent,this.geo(`box/${w}/${h}/${d}/${r}`,()=>new RoundedBoxGeometry(w,h,d,2,r)),this.mat(color,.88,0,0,true),x,y,z);}
 private sphere(parent:THREE.Object3D,r:number,x:number,y:number,z:number,color:number,scale?:[number,number,number]){const m=this.mesh(parent,this.geo('sphere',()=>new THREE.SphereGeometry(1,12,8)),this.mat(color),x,y,z);m.scale.set(...(scale??[r,r,r]));return m;}
 private cyl(parent:THREE.Object3D,top:number,bottom:number,h:number,x:number,y:number,z:number,color:number,segments=10){return this.mesh(parent,this.geo(`cyl/${top}/${bottom}/${h}/${segments}`,()=>new THREE.CylinderGeometry(top,bottom,h,segments)),this.mat(color),x,y,z);}
 private torus(parent:THREE.Object3D,r:number,tube:number,x:number,y:number,z:number,color:number){return this.mesh(parent,this.geo(`ring/${r}/${tube}`,()=>new THREE.TorusGeometry(r,tube,7,28)),this.mat(color,.36,.15),x,y,z);}
 private foliage(parent:THREE.Object3D,x:number,y:number,z:number,r=.22,seed=0,flowers=false){
  for(let k=0;k<21;k++){const a=k*2.399+seed,rad=(.2+(k%7)/8)*r;const leaf=this.sphere(parent,.1,x+Math.cos(a)*rad,y+.05+(k%4)*r*.23,z+Math.sin(a)*rad,[0x355444,0x47664d,0x667651][k%3]!,[r*.43,r*.11,r*.22]);leaf.rotation.set(Math.sin(a)*.35,a,Math.cos(a)*.4);}
  for(let k=0;k<4;k++){const a=k*1.6+seed;this.cyl(parent,.007,.01,r*.65,x+Math.cos(a)*r*.4,y+r*.3,z+Math.sin(a)*r*.4,0x43573e,5);}
  if(flowers)for(let k=0;k<5;k++){const a=k*2.399+seed,px=x+Math.cos(a)*r*.6,pz=z+Math.sin(a)*r*.6,py=y+r*.9;this.sphere(parent,r*.12,px,py,pz,0xe7bd8c);for(let p=0;p<5;p++){const angle=p*Math.PI*.4;this.sphere(parent,r*.14,px+Math.cos(angle)*r*.13,py,pz+Math.sin(angle)*r*.13,k%2?0xc698ae:0xe0a391,[r*.14,r*.05,r*.13]);}}
 }
 private lamp(parent:THREE.Object3D,x:number,z:number,h=1.3){
  this.cyl(parent,.026,.043,h,x,h/2,z,C.iron);this.cyl(parent,.095,.09,.09,x,.045,z,C.iron);
  this.box(parent,.23,.035,.23,x,h+.01,z,C.iron,.012);
  this.mesh(parent,this.geo('lampglass',()=>new THREE.BoxGeometry(.125,.20,.125)),this.mat(0xffdaa0,.26,0,0xffb252),x,h+.13,z,false);
  this.cyl(parent,.015,.16,.13,x,h+.28,z,C.iron,4);this.sphere(parent,.034,x,h+.365,z,C.iron);
  for(const dx of[-.074,.074])for(const dz of[-.074,.074])this.box(parent,.014,.23,.014,x+dx,h+.13,z+dz,C.iron,.004);
  const disc=this.mesh(parent,this.geo('lamppool',()=>new THREE.CircleGeometry(.46,24)),new THREE.MeshBasicMaterial({color:0xffc587,transparent:true,opacity:.12,depthWrite:false}),x,.021,z,false);disc.rotation.x=-Math.PI/2;
 }
 private planter(parent:THREE.Object3D,x:number,z:number,size=.38,y=0,flowers=true){
  this.cyl(parent,size*.36,size*.27,size*.62,x,y+size*.31,z,0xb07a63,12);this.cyl(parent,size*.39,size*.39,size*.09,x,y+size*.60,z,0xc6987d,12);
  this.cyl(parent,size*.31,size*.31,.035,x,y+size*.61,z,0x534e48,12);
  this.foliage(parent,x,y+size*.67,z,size*.43,x+z,flowers);
 }
 private window(parent:THREE.Object3D,x:number,y:number,z:number,color:number,shutter=true){
  this.box(parent,.48,.66,.10,x,y,z,0xe3d9c3,.022);this.box(parent,.35,.52,.09,x,y,z+.055,0x564c4c,.014);
  this.mesh(parent,this.geo('windowglass',()=>new THREE.BoxGeometry(.28,.45,.025)),this.mat(0xeab877,.4,0,0xd6873d),x,y,z+.115,false);
  this.box(parent,.029,.48,.04,x,y,z+.135,0x705c50,.004);this.box(parent,.31,.028,.04,x,y+.02,z+.135,0x705c50,.004);this.box(parent,.58,.075,.21,x,y-.345,z+.075,0xe8decc,.014);
  if(shutter)for(const s of[-1,1]){this.box(parent,.13,.57,.07,x+s*.33,y,z+.03,color,.012);for(let k=0;k<5;k++)this.box(parent,.12,.014,.018,x+s*.33,y-.20+k*.1,z+.079,0x52626c,.002);}
 }
 private house(parent:THREE.Object3D,x:number,z:number,w:number,h:number,d:number,color:number,roof:number,seed:number){
  this.box(parent,w,h,d,x,h/2,z,color,.055);this.box(parent,w+.1,.17,d+.1,x,.085,z,0xbba797,.02);this.box(parent,w+.08,.08,d+.09,x,h-.15,z,0xe6d7c4,.01);
  const roofGroup=new THREE.Group();roofGroup.position.set(x,h,z);parent.add(roofGroup);
  const slope=.50,rise=d*.29;
  for(const side of[-1,1]){const panel=this.box(roofGroup,w+.22,.095,(d/2+.12)/Math.cos(slope),0,rise/2,side*(d/4+.02),roof,.025);panel.rotation.x=side*slope;
   const cols=Math.ceil(w/.16),rows=Math.ceil(d/.32);for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const zz=(j+.3)*d/rows/2;const tile=this.cyl(roofGroup,.046,.046,d/(2*rows)+.06,-w/2+(i+.5)*w/cols,rise-zz*Math.tan(slope)+.067,side*zz,(i+j)%5?roof:roof+0x080404,7);tile.rotation.x=Math.PI/2+side*slope;}}
  const ridge=this.cyl(roofGroup,.069,.069,w+.24,0,rise+.06,0,roof,10);ridge.rotation.z=Math.PI/2;
  this.box(parent,.23,.60,.25,x+w*.25,h+rise+.09,z-.12,0xc7ab99,.025);this.box(parent,.32,.095,.32,x+w*.25,h+rise+.41,z-.12,0xddc8b6,.014);
  const n=Math.max(1,Math.floor(w/.82));for(let floor=0;floor<Math.floor(h/.91);floor++)for(let k=0;k<n;k++)this.window(parent,x+(k-(n-1)/2)*.83,.61+floor*.88,z+d/2+.01,seed%2?0x647684:0x77675e);
  const doorX=x+(seed%2?.22:-.22);this.box(parent,.42,.71,.09,doorX,.365,z+d/2+.02,0x665e5c,.045);this.box(parent,.30,.61,.06,doorX,.345,z+d/2+.08,seed%2?0x526a78:0xa1705f,.035);this.sphere(parent,.024,doorX+.10,.33,z+d/2+.13,0xddb772);
  for(let step=0;step<2;step++)this.box(parent,.61+step*.14,.07,.26+step*.18,doorX,.10-step*.05,z+d/2+.16+step*.03,0xb8aa95,.012);
  for(let k=0;k<3;k++){this.box(parent,.30,.12,.12,x-w/2+.12,k*.43+.47,z+d/2+.035,0xd3bdab,.014);this.box(parent,.30,.12,.12,x+w/2-.12,k*.43+.24,z+d/2+.035,0xd3bdab,.014);}
  for(let k=0;k<n;k++){const wx=x+(k-(n-1)/2)*.83;this.box(parent,.48,.16,.24,wx,.23+Math.max(0,Math.floor(h/.91)-1)*.88,z+d/2+.18,0xa77f69,.02);for(let q=0;q<3;q++)this.foliage(parent,wx+(q-1)*.14,.32+Math.max(0,Math.floor(h/.91)-1)*.88,z+d/2+.20,.115,k+q,true);}
 }
 private rail(parent:THREE.Object3D,x:number,z:number,length:number,axis:'x'|'z'){
  const count=Math.max(2,Math.round(length/.6));for(let i=0;i<=count;i++){const t=-length/2+length*i/count,px=x+(axis==='x'?t:0),pz=z+(axis==='z'?t:0);this.cyl(parent,.022,.028,.40,px,.21,pz,C.iron);this.sphere(parent,.033,px,.43,pz,0xc5a57b);}
  this.box(parent,axis==='x'?length:.023,.023,axis==='z'?length:.023,x,.33,z,C.iron,.008);this.box(parent,axis==='x'?length:.025,.025,axis==='z'?length:.025,x,.12,z,C.iron,.008);
 }
 private canalBoat(parent:THREE.Object3D,x:number,z:number,blue:boolean){
  const group=new THREE.Group();group.position.set(x,-.51,z);group.rotation.y=blue?-.22:.34;parent.add(group);
  const shape=new THREE.Shape();shape.moveTo(-.75,0);shape.quadraticCurveTo(-.45,-.27,.30,-.23);shape.quadraticCurveTo(.75,-.20,.80,0);shape.quadraticCurveTo(.75,.20,.30,.23);shape.quadraticCurveTo(-.45,.27,-.75,0);
  const geo=this.geo('boat-hull',()=>{const g=new THREE.ExtrudeGeometry(shape,{depth:.14,bevelEnabled:true,bevelSize:.04,bevelThickness:.035,bevelSegments:2,steps:1});g.rotateX(-Math.PI/2);return g;});
  this.mesh(group,geo,this.mat(blue?0x506c81:0x6e534d),0,0,0);this.box(group,1.08,.035,.32,.05,.17,0,0x977765,.05);
  for(const px of[-.36,.09,.48])this.box(group,.085,.065,.42,px,.22,0,0xc2a184,.015);
  const oar=this.cyl(group,.016,.020,1.26,.03,.26,0,0xae8e73,8);oar.rotation.z=Math.PI/2;oar.rotation.y=.36;this.box(group,.28,.018,.06,.59,.275,-.19,0xd0b392,.017);
 }
 private canalBridge(){
  const group=new THREE.Group();this.stage.add(group);this.bridge=group;const z=-this.level.size/2-2.16;
  for(let k=0;k<11;k++){const x=-.65+k*.13,y=.12+Math.sin((k/10)*Math.PI)*.24;this.box(group,.139,.12,.81,x,y,z,0xb1a99b,.022);for(const dz of[-.36,.36])this.box(group,.14,.35,.10,x,y+.20,z+dz,0xc4b6a3,.016);}
  for(const x of[-.6,.6])for(const dz of[-.31,.31])this.box(group,.18,.54,.18,x,-.18,z+dz,0x958b83,.025);
 }
 private city(parent:THREE.Group,side:number){
  const n=this.level.size,half=n/2,walls=side?this.level.otherWalls:this.level.walls,stone=side?0xc4c9cd:0xddd1bd;
  this.box(parent,n+1.0,.68,n+1.00,0,-.37,0,0xa79e96,.075);this.box(parent,n+.98,.14,n+.96,0,-.05,0,0xbfb6a6,.025);
  for(let row=0;row<3;row++)for(let q=0;q<Math.ceil((n+1)/.5);q++){const xx=-half-.25+q*.50+(row%2?.20:0);if(xx>half+.43)continue;this.box(parent,.47,.17,.08,xx,-.20-row*.18,half+.505,row%2?0xaa9b8c:0xb8a897,.012);}
  for(let i=0;i<n*n;i++){const p=this.cell(i),blocked=walls.includes(i);this.box(parent,.952,.075,.952,p.x,.018,p.z,stone+(i%4)*0x010101,.035);
   if(blocked){this.box(parent,.91,.30,.91,p.x,.205,p.z,side?0x7f919c:0xb49279,.035);this.box(parent,.95,.075,.95,p.x,.39,p.z,side?0x9babb3:0xceae91,.023);
    for(let q=0;q<3;q++)this.box(parent,.27,.10,.025,p.x+(q-1)*.29,.23,p.z+.458,side?0x738692:0xa5816e,.009);
    this.box(parent,.72,.038,.72,p.x,.438,p.z,0x555d58,.02);
    this.foliage(parent,p.x-.14,.445,p.z-.05,.24,i,true);this.foliage(parent,p.x+.19,.445,p.z+.12,.20,i+2,false);}
  }
  // A physically separate, higher rear street carries scenery; no walkable cell is invented.
  this.box(parent,n+1.0,.35,1.45,0,-.11,-half-1.12,0xb7ac9e,.04);
  this.house(parent,-n*.30,-half-1.25,1.62,2.16,1.14,side?0xaca9b7:0xd1aa95,side?0x596c83:0xad7865,side);
  this.house(parent,n*.30,-half-1.36,1.43,2.76,1.16,side?0xc3beb7:0xd9c6a8,side?0x61798a:0x8b7980,side+1);
  // Lower houses behind the main façades form a continuous district rather than an isolated board surround.
  this.box(parent,n+1.0,.38,1.6,0,-.12,-half-2.56,0x9e9b97,.035);
  this.house(parent,-n*.38,-half-2.67,1.28,1.46,1.02,side?0x9caab2:0xc1b0a3,side?0x536779:0x9e7566,side+2);
  this.house(parent,n*.35,-half-2.70,1.32,1.72,1.03,side?0xb1b2ba:0xd0b59b,side?0x5f7487:0xb7856d,side+3);
  // A small arch joins the two rear street wings, entirely outside canonical movement cells.
  for(const dx of[-.43,.43])this.box(parent,.17,1.10,.32,dx,.56,-half-2.28,0xc5b5a2,.035);
  for(let k=0;k<9;k++){const a=Math.PI*k/8;const voussoir=this.box(parent,.18,.20,.34,Math.cos(a)*.44,1.06+Math.sin(a)*.42,-half-2.28,0xd9c4a9,.02);voussoir.rotation.z=a-Math.PI/2;}
  this.box(parent,1.05,.085,.38,0,1.57,-half-2.28,side?0x8fa0aa:0xbc9d86,.018);
  for(const x of[-half-.32,half+.32]){
   this.lamp(parent,x,half+.26,1.25);this.lamp(parent,x,-half-.26,1.10);this.rail(parent,x,0,n-.9,'z');
   this.planter(parent,x,-half-.72,.44,0, true);
  }
  this.rail(parent,0,half+.37,n-.8,'x');
  for(let q=0;q<Math.ceil((n+.8)/.24);q++){const xx=-half-.26+q*.24;this.box(parent,.22,.022,.27,xx,.063,half+.24,0xc4b8a5,.006);}
  const benchX=side?-half+.65:half-.65;this.box(parent,1.05,.10,.32,benchX,.24,-half-.39,0x886e62,.035);this.box(parent,1.05,.33,.08,benchX,.43,-half-.54,0x9e8270,.04);for(const dx of[-.37,.37])this.box(parent,.05,.22,.25,benchX+dx,.13,-half-.40,C.iron,.009);
  this.planter(parent,-benchX,-half-.43,.46,0,true);
 }
 private actor(parent:THREE.Group,side:number):Actor{
  const root=new THREE.Group(),body=new THREE.Group(),head=new THREE.Group();parent.add(root);root.add(body);body.add(head);const coat=side?0x426b91:0xc96e58;
  const legs=[-.11,.11].map(x=>{const foot=this.box(body,.14,.15,.25,x,.125,.05,0x423c3c,.05);return foot;});
  this.cyl(body,.17,.24,.38,0,.40,0,coat,16);this.sphere(body,.11,-.22,.43,0,coat,[.085,.19,.09]);this.sphere(body,.11,.22,.43,0,coat,[.085,.19,.09]);
  this.sphere(body,.06,-.23,.27,.016,0xebc1a0);this.sphere(body,.06,.23,.27,.016,0xebc1a0);
  head.position.y=.66;this.sphere(head,.202,0,0,.014,0xe9bda0,[.20,.205,.19]);this.sphere(head,.20,0,.075,-.025,side?0x3e3f4b:0x59443e,[.218,.168,.202]);
  this.sphere(head,.10,-.11,.016,-.015,side?0x3e3f4b:0x59443e,[.085,.14,.18]);
  for(const x of[-.072,.072]){this.sphere(head,.018,x,-.018,.193,0x373239,[.017,.028,.014]);this.sphere(head,.025,x*1.50,-.076,.17,0xd99787);}
  this.sphere(head,.033,0,-.065,.205,0xeac1a4,[.027,.018,.016]);
  const scarf=this.torus(body,.166,.044,0,.575,0,side?0xd4b888:0xefc989);scarf.rotation.x=Math.PI/2;this.box(body,.075,.21,.04,.10,.465,.188,side?0xd4b888:0xefc989,.016);
  const badge=side?this.box(body,.115,.115,.018,-.075,.42,.208,0xf8e5c8,.015):this.mesh(body,this.geo('roundbadge',()=>new THREE.TorusGeometry(.057,.015,6,16)),this.mat(0xf8e5c8),-.075,.42,.208,false);if(side)badge.rotation.z=Math.PI/4;
  const halo=this.mesh(root,this.geo('actorshadow',()=>new THREE.CircleGeometry(.28,24)),new THREE.MeshBasicMaterial({color:0x392f3c,transparent:true,opacity:.18,depthWrite:false}),0,.063,0,false);halo.rotation.x=-Math.PI/2;
  const home=this.threshold(parent,side);
  this.batch(head);this.batch(body,true,legs);this.batch(home);
  return{root,body,head,legs,badge,home};
 }
 private threshold(parent:THREE.Group,side:number){
  const group=new THREE.Group();parent.add(group);const color=side?0x527d9b:0xc78264;
  // Open posts stand at the rear edge of the target cell. Both the center and forward/back route stay visually open.
  for(const x of[-.355,.355])this.box(group,.075,.63,.095,x,.37,-.29,0xe1d5bc,.025);
  this.box(group,.81,.095,.15,0,.72,-.29,color,.025);this.box(group,.74,.045,.22,0,.785,-.29,0xe9dbc3,.014);
  const crest=side?this.box(group,.20,.20,.045,0,.90,-.275,color,.025):this.cyl(group,.13,.13,.04,0,.90,-.275,color,24);if(side)crest.rotation.z=Math.PI/4;else crest.rotation.x=Math.PI/2;
  const symbol=side?this.box(group,.092,.092,.035,0,.90,-.247,0xf4ddad,.012):this.torus(group,.066,.014,0,.90,-.247,0xf4ddad);if(side)symbol.rotation.z=Math.PI/4;
  const ring=this.torus(group,.32,.033,0,.071,0,color);ring.rotation.x=-Math.PI/2;
  if(side){ring.rotation.z=Math.PI/4;ring.scale.set(.95,.95,1);}
  for(const x of[-.29,.29])this.mesh(group,this.geo('goalglow',()=>new THREE.SphereGeometry(.045,10,7)),this.mat(0xffd59c,.3,0,0xffac53),x,.65,-.225,false);
  return group;
 }
 private batch(parent:THREE.Group,onlyDirect=false,exclude:THREE.Object3D[]=[]){
  parent.updateMatrixWorld(true);const rootInv=parent.matrixWorld.clone().invert();const batches=new Map<string,{mat:THREE.Material;list:THREE.Mesh[]}>();
  const collect=(o:THREE.Object3D)=>{if(o instanceof THREE.Mesh&&!exclude.includes(o)&&!Array.isArray(o.material)&&!o.material.transparent&&!o.userData.merged){const key=`${o.material.uuid}/${o.castShadow}`;let b=batches.get(key);if(!b){b={mat:o.material,list:[]};batches.set(key,b);}b.list.push(o);}};
  if(onlyDirect)parent.children.forEach(collect);else parent.traverse(collect);
  for(const b of batches.values()){
   if(b.list.length<2)continue;
   const geometries=b.list.map(mesh=>{const g=mesh.geometry.clone();g.applyMatrix4(rootInv.clone().multiply(mesh.matrixWorld));if(!g.index)g.setIndex(Array.from({length:g.getAttribute('position').count},(_,i)=>i));return g;});
   const geometry=mergeGeometries(geometries,false);if(!geometry)throw new Error('Static geometry merge failed');for(const g of geometries)g.dispose();
   const mesh=new THREE.Mesh(geometry,b.mat);mesh.castShadow=b.list[0]!.castShadow;mesh.receiveShadow=true;mesh.userData.merged=true;for(const old of b.list)old.removeFromParent();parent.add(mesh);this.staticInstances+=b.list.length;
  }
 }
 private disposeStage(){this.stage.traverse(o=>{if(o instanceof THREE.InstancedMesh)o.dispose();if(o instanceof THREE.Mesh){if(o.userData.merged)o.geometry.dispose();const ms=Array.isArray(o.material)?o.material:[o.material];for(const m of ms)if(![...this.materialCache.values()].includes(m as THREE.MeshStandardMaterial))m.dispose();}});this.stage.clear();this.cities.length=0;this.actors.length=0;this.staticInstances=0;}
 setLevel(level:HomeLevel,state:HomeState,reduced=false){this.level=level;this.state=structuredClone(state);this.reduced=reduced;this.plan=undefined;this.blocked=[false,false];this.build();}
 private build(){
  this.disposeStage();const n=this.level.size;
  const water=this.mesh(this.stage,this.geo('water',()=>new THREE.PlaneGeometry(50,50)),this.mat(0x7793a1,.28,.28),0,-.69,0,false);water.rotation.x=-Math.PI/2;
  const canal=new THREE.Group();this.stage.add(canal);
  for(let k=0;k<74;k++){const x=Math.sin(k*9.13)*12,z=Math.cos(k*7.11)*9,w=.20+(k%6)*.12;const ripple=this.box(canal,w,.012,.024,x,-.672,z,k%4?0x9faeb3:0xdac4a0,.006);ripple.castShadow=false;}
  this.canalBridge();
  for(let side=0;side<2;side++){const cx=(side-.5)*(n+1.8);this.canalBoat(canal,cx+(side?.5:-.5),n/2+1.16,!!side);for(const edge of[-1,1])for(let k=0;k<10;k++){const ripple=this.box(canal,.09+(k%4)*.055,.012,.026,cx+edge*(n/2+.32)+Math.sin(k*2.39)*.08,-.665,n/2+.54+k*.09,k%3?0xc5b395:0xddbd84,.007);ripple.castShadow=false;}}
  this.batch(canal);if(this.bridge)this.batch(this.bridge);
  for(let side=0;side<2;side++){const city=new THREE.Group(),scenery=new THREE.Group();this.cities.push(city);this.stage.add(city);city.add(scenery);this.city(scenery,side);this.batch(scenery);this.actors.push(this.actor(city,side));}
  this.layout();this.updateActors(1);this.resize();this.request();
 }
 private cell(p:number){return{x:p%this.level.size-(this.level.size-1)/2,z:Math.floor(p/this.level.size)-(this.level.size-1)/2};}
 private layout(){const n=this.level.size;for(let i=0;i<2;i++){this.cities[i]!.position.set(this.compact?0:(i-.5)*(n+1.8),0,0);}if(this.bridge)this.bridge.visible=!this.compact;this.key.position.set(this.compact?-6:-7,13,9);this.key.target.position.set(0,0,0);this.key.target.updateMatrixWorld();this.renderer.shadowMap.needsUpdate=true;}
 resize(){const rect=this.container.getBoundingClientRect();if(rect.width<1||rect.height<1)return;const compact=rect.width<740;if(compact!==this.compact){this.compact=compact;if(this.level)this.layout();}this.width=rect.width;this.height=rect.height;this.renderer.setSize(rect.width,rect.height,false);const viewportHeight=rect.height/(this.compact?2:1);this.composer.setSize(rect.width,viewportHeight);this.ssao.setSize(Math.round(rect.width*.75),Math.round(viewportHeight*.75));this.composer.renderToScreen=!this.compact;
  const n=this.level?.size??5,aspect=rect.width/viewportHeight;
  const worldWidth=this.compact?n+1.4:n*2+4.6,worldHeight=this.compact?n*.71+3.5:n*.67+3.9;const half=Math.max(worldHeight/2,worldWidth/(aspect*2));
  this.camera.left=-half*aspect;this.camera.right=half*aspect;this.camera.top=half;this.camera.bottom=-half;
  this.camera.position.set(0,this.compact?19:16,this.compact?16:19);this.camera.lookAt(0,0,-1.05);this.camera.updateProjectionMatrix();
  this.ssao.ssaoMaterial.defines.PERSPECTIVE_CAMERA=0;this.ssao.ssaoMaterial.uniforms.cameraNear!.value=this.camera.near;this.ssao.ssaoMaterial.uniforms.cameraFar!.value=this.camera.far;this.ssao.ssaoMaterial.uniforms.cameraProjectionMatrix!.value.copy(this.camera.projectionMatrix);this.ssao.ssaoMaterial.uniforms.cameraInverseProjectionMatrix!.value.copy(this.camera.projectionMatrixInverse);this.request();
 }
 transition(plan:TwPlan,reduced:boolean){this.state=structuredClone(plan.after);this.plan=plan;this.reduced=reduced;this.origin=performance.now();this.blocked=plan.blocked as [boolean,boolean];this.renderer.shadowMap.needsUpdate=true;this.request();}
 sync(state:HomeState,reduced=this.reduced){this.state=structuredClone(state);this.plan=undefined;this.reduced=reduced;this.blocked=[false,false];this.updateActors(1);this.renderer.shadowMap.needsUpdate=true;this.request();}
 setActive(active:boolean){this.active=active;if(active)this.request();else this.cancel();}
 cancel(){this.plan=undefined;this.previousAnimating=false;if(this.level)this.updateActors(1);if(this.raf)cancelAnimationFrame(this.raf);this.raf=0;this.dirty=true;}
 private updateActors(t:number){
  if(!this.level||!this.state)return;const q=this.reduced?1:ease(t);
  for(let i=0;i<2;i++){const a=this.actors[i]!,to=this.cell(this.state.positions[i]!),from=this.cell(this.plan?.before.positions[i]??this.state.positions[i]!);a.root.position.set(THREE.MathUtils.lerp(from.x,to.x,q),0,THREE.MathUtils.lerp(from.z,to.z,q));
   const moving=!!this.plan?.moved[i]&&t<1&&!this.reduced,rest=!!this.plan?.blocked[i]&&t<1&&!this.reduced;
   a.body.position.y=moving?Math.sin(t*Math.PI)*.065:0;a.body.rotation.z=rest?Math.sin(t*Math.PI*2)*.06:0;
   a.legs.forEach((leg,k)=>leg.rotation.x=moving?Math.sin(t*Math.PI*2+k*Math.PI)*.32:0);
   const goal=this.cell(this.level.homes[i]!);a.home.position.set(goal.x,0,goal.z);const arrived=this.state.positions[i]===this.level.homes[i];a.home.scale.y=1+(arrived&&this.plan?.arrived[i]&&!this.reduced?Math.sin(t*Math.PI)*.055:0);
   a.head.rotation.z=arrived?-.065:0;
  }
 }
 private request(){this.dirty=true;if(!this.raf&&this.active)this.raf=requestAnimationFrame(t=>this.frame(t));}
 private renderScene(){
  if(!this.compact){this.composer.render();return;}
  // Mobile composes two real camera views. Geometry, state, lights and AO remain the same; no scene bitmap is substituted.
  this.renderer.setScissorTest(false);this.renderer.setRenderTarget(null);this.renderer.setViewport(0,0,this.width,this.height);this.renderer.clear();
  for(let i=0;i<2;i++){
   this.cities.forEach((city,j)=>city.visible=i===j);this.renderer.setScissorTest(false);this.renderer.shadowMap.needsUpdate=true;this.composer.render();
   this.renderer.setRenderTarget(null);this.renderer.setViewport(0,i===0?this.height/2:0,this.width,this.height/2);this.renderer.setScissor(0,i===0?this.height/2:0,this.width,this.height/2);this.renderer.setScissorTest(true);this.compositeMaterial.uniforms.tDiffuse!.value=this.composer.readBuffer.texture;this.renderer.render(this.compositeScene,this.compositeCamera);
  }
  this.cities.forEach(city=>city.visible=true);this.renderer.setScissorTest(false);this.renderer.setViewport(0,0,this.width,this.height);
 }
 private frame(now:number){this.raf=0;if(!this.active)return;const t=this.plan&&!this.reduced?clamp((now-this.origin)/180,0,1):1;this.updateActors(t);const start=performance.now();this.renderer.info.reset();this.renderScene();this.frames++;this.renderMs.push(performance.now()-start);if(this.renderMs.length>600)this.renderMs.shift();if(this.lastFrame&&this.previousAnimating){const dt=now-this.lastFrame;this.activeIntervals.push(dt);if(dt<100)this.frameIntervals.push(dt);}if(this.activeIntervals.length>600)this.activeIntervals.shift();if(this.frameIntervals.length>600)this.frameIntervals.shift();this.lastFrame=now;this.previousAnimating=t<1;this.dirty=false;
  this.container.dispatchEvent(new CustomEvent('render-stats',{detail:this.snapshot()}));
  if(t<1){this.renderer.shadowMap.needsUpdate=true;this.raf=requestAnimationFrame(t=>this.frame(t));}else{this.plan=undefined;this.idleSkipped++;}
 }
 capture(){this.renderScene();return this.renderer.domElement.toDataURL('image/png');}
 snapshot(){const percentile=(a:number[],p:number)=>a.length?[...a].sort((a,b)=>a-b)[Math.floor((a.length-1)*p)]:null;const seen=new Set<THREE.BufferGeometry>();let geometryBytes=0;this.stage.traverse(o=>{if(o instanceof THREE.Mesh&&!seen.has(o.geometry)){seen.add(o.geometry);for(const a of Object.values(o.geometry.attributes) as THREE.BufferAttribute[])geometryBytes+=a.array.byteLength;if(o.geometry.index)geometryBytes+=o.geometry.index.array.byteLength;}});return{engine:'Three.js 0.186.0',levelId:this.level?.id,viewport:[this.width,this.height],compact:this.compact,frames:this.frames,idleRenderStops:this.idleSkipped,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometry:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,sourceMeshesBatched:this.staticInstances,batching:'Material-merged static geometry; positions/normals/colors preserved',geometryAttributeBytes:geometryBytes,geometryBytesScope:'Active scene attributes and indices, not total GPU memory',submitP95Ms:percentile(this.renderMs,.95),activeFrameIntervalP95Ms:percentile(this.activeIntervals,.95),activeFrameIntervalMaxMs:this.activeIntervals.length?Math.max(...this.activeIntervals):null,activeLongStalls:this.activeIntervals.filter(x=>x>=100).length,activeSamples:this.activeIntervals.length,filteredFrameIntervalP95Ms:percentile(this.frameIntervals,.95),frameIntervalScope:'Active animation intervals include all stalls; filtered interval reported separately excludes >=100 ms. Idle gaps intentionally excluded; not GPU timing.',shadowMap:2048,dpr:this.renderer.getPixelRatio(),positions:this.state?.positions,blocked:this.blocked};}
}
