import {MagnetWorld, type Scrap, type Enemy} from './core';
type C=CanvasRenderingContext2D;
type VerticalEnemy=Enemy&{kind?:'basic'|'heavy'|'shield'|'charger'|'elite';shield?:number;facing?:number;windup?:number;dash?:number;recover?:number;spawnIn?:number};
type VerticalWorld=MagnetWorld&{phase?:number;runTime?:number;over?:boolean;runEndedAt?:number;hurt?:number;player:MagnetWorld['player']&{hp?:number;maxHp?:number}};
type Relay={id:number;x:number;y:number;charge:number;max:number;done:boolean;flash:number};
type ProgressionWorld=VerticalWorld&{stage?:number;build?:'base'|'swarm'|'lance';evolution?:number;relays?:Relay[];activeRelay?:number;bossLocked?:boolean;pullRadius?:number;lane?:{axis:'x'|'y';position:number;width:number;telegraph:number;active:number}|null};
const TAU=Math.PI*2;
function poly(c:C,points:number[][],fill:string,stroke?:string,width=1){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x!,y!):c.moveTo(x!,y!));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function rect(c:C,x:number,y:number,w:number,h:number,color:string,r=0){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function circle(c:C,x:number,y:number,r:number,color:string){c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
function line(c:C,x:number,y:number,xx:number,yy:number,color:string,w=1){c.strokeStyle=color;c.lineWidth=w;c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke();}
function bolt(c:C,x:number,y:number,r=2){circle(c,x,y,r+1,'#1a2426');circle(c,x-.4,y-.6,r,'#adb7ac');line(c,x-r/2,y,x+r/2,y,'#434e4d');}
function shadow(c:C,x:number,y:number,w:number,h:number){c.fillStyle='#050c0c88';c.beginPath();c.ellipse(x+4,y+9,w,h,0,0,TAU);c.fill();}
function metal(c:C,x:number,y:number,w:number,h:number,base:string,top='#c5cbc0'){rect(c,x,y+4,w,h,'#111c1e',3);rect(c,x,y,w,h,base,3);line(c,x+3,y+1,x+w-3,y+1,top,2);line(c,x+w-1,y+3,x+w-1,y+h-2,'#1c2a2c',2);}
export class MagnetArt {
 c:C;canvas:HTMLCanvasElement;floor:HTMLCanvasElement;world:MagnetWorld;dpr=1;scale=1;ox=0;oy=0;cssW=0;cssH=0;
 constructor(canvas:HTMLCanvasElement,world:MagnetWorld){this.canvas=canvas;this.c=canvas.getContext('2d',{alpha:false})!;this.world=world;this.floor=document.createElement('canvas');this.makeFloor();this.resize();}
 resize(){const r=this.canvas.getBoundingClientRect();this.cssW=r.width;this.cssH=r.height;this.dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=Math.round(r.width*this.dpr);this.canvas.height=Math.round(r.height*this.dpr);this.scale=Math.min(r.width/this.world.width,r.height/this.world.height);this.ox=(r.width-this.world.width*this.scale)/2;this.oy=(r.height-this.world.height*this.scale)/2;}
 point(x:number,y:number){const b=this.canvas.getBoundingClientRect();return{x:(x-b.left-this.ox)/this.scale,y:(y-b.top-this.oy)/this.scale};}
 makeFloor(){const w=this.world.width,h=this.world.height;this.floor.width=w;this.floor.height=h;const c=this.floor.getContext('2d')!;
 const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#253436');g.addColorStop(.55,'#1d2b2d');g.addColorStop(1,'#121f23');c.fillStyle=g;c.fillRect(0,0,w,h);
 // Original etched steel tiles, restrained wear, inset rails and workshop details.
 for(let y=44;y<h;y+=78)for(let x=24;x<w;x+=92){rect(c,x+1,y+1,88,74,((x+y)%5)?'#ffffff03':'#c2c5a308',2);line(c,x,y,x+88,y,'#84948c14');line(c,x,y,x,y+72,'#030d1340');circle(c,x+5,y+5,1.2,'#93a59b29');}
 let seed=552;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<1300;i++){const x=rnd()*w,y=rnd()*h;line(c,x,y,x+rnd()*6,y-1,rnd()>.5?'#b1c7b40a':'#02080925',rnd()+.3);}
 for(const [x,y,r] of [[w*.29,h*.34,49],[w*.73,h*.64,61],[w*.57,h*.27,30]]){const g=c.createRadialGradient(x!,y!,0,x!,y!,r!);g.addColorStop(0,'#0c161a65');g.addColorStop(1,'#0c161a00');c.fillStyle=g;c.fillRect(x!-r!,y!-r!,r!*2,r!*2);}
 rect(c,16,46,w-32,15,'#0f1b20',3);rect(c,16,h-38,w-32,19,'#0c181d',3);rect(c,16,55,17,h-82,'#102023',3);rect(c,w-33,55,17,h-82,'#102023',3);
 line(c,34,64,w-34,64,'#7c918147',2);line(c,34,h-40,w-34,h-40,'#637a7140',2);
 for(let x=40;x<w-40;x+=35){poly(c,[[x,48],[x+12,48],[x+5,59],[x-7,59]],'#cbb76a44');bolt(c,x,h-28,1.5);}
 for(const x of [25,w-25])for(let y=75;y<h-50;y+=65)bolt(c,x,y,2);
 c.save();c.translate(w*.52,h*.59);c.rotate(-.08);c.strokeStyle='#bdc4a516';c.lineWidth=2;c.setLineDash([12,10]);c.strokeRect(-w*.25,-h*.27,w*.5,h*.5);c.restore();
 c.save();c.translate(w*.13,h*.43);c.rotate(-Math.PI/2);c.font='700 13px monospace';c.fillStyle='#b4bdae25';c.fillText('FERROUS MATERIAL ONLY',0,0);c.restore();
 c.font='bold 72px sans-serif';c.fillStyle='#c5cab509';c.fillText('04',w-170,h-72);
 // Salvage stacks stay out of the active central floor.
 for(const [x,y,rot] of [[80,100,-.08],[w-83,h-95,.14],[w*.52,90,.03]]){c.save();c.translate(x!,y!);c.rotate(rot!);shadow(c,0,2,38,18);metal(c,-28,-15,62,26,'#43504a','#748175');for(let j=0;j<4;j++)line(c,-22,-10+j*5,29,-10+j*5,'#1f302e',2);rect(c,-9,-19,9,38,'#88764b',1);bolt(c,-5,-13);c.restore();}
 // Corner vent with individually shaded slats.
 rect(c,w-119,78,65,31,'#0b171c',3);for(let i=0;i<8;i++)metal(c,w-115+i*7,81,4,21,'#334748','#5b6c62');
 for(const [x,y] of [[49,h-55],[w-51,68],[w-51,h-53]]){circle(c,x!,y!,4,'#c9a869');circle(c,x!,y!,2,'#f4e1a4');}
 }
 scrap(s:Scrap){const c=this.c;c.save();c.translate(s.x,s.y);const floating=s.mode==='orbit';shadow(c,0,floating?8:0,8,4);c.translate(0,floating?-4:0);c.rotate(s.angle);
 if(s.reward){c.shadowBlur=8;c.shadowColor='#e9c680';}if(s.salvaged&&s.kind===0)c.scale(1.45,1.45);
 if(s.kind===0){poly(c,[[-9,-5],[5,-7],[10,-2],[7,6],[-7,7]],s.salvaged?'#bb7357':'#82928a',s.salvaged?'#e2ac7e':'#b1bfb0',1);poly(c,[[-7,-4],[4,-5],[1,-1],[-7,1]],s.salvaged?'#e0a57d':'#bbc4ac');line(c,-4,3,5,2,'#394b4a',2);bolt(c,5,-2,1.4);}
 else if(s.kind===1){rect(c,-8,-5,17,10,'#9b7654',2);rect(c,-8,-5,17,3,'#d0aa72',1);for(let i=-4;i<7;i+=4)line(c,i,-1,i,5,'#4b4638',2);bolt(c,-6,-1,1);}
 else {poly(c,[[-8,-5],[-2,-9],[6,-7],[9,1],[3,8],[-5,7],[-9,1]],'#506a6a','#9dac97',1.5);circle(c,0,0,3.6,'#15272c');line(c,-5,-5,1,-7,'#ccd0b4',2);}
 c.restore();}
 robot(){const c=this.c,w=this.world,p=w.player;c.save();c.translate(p.x,p.y);shadow(c,0,4,p.upgrade?35:29,21);c.rotate(p.angle+Math.PI/2);const kick=p.kick; c.translate(0,kick*6);const moving=Math.hypot(p.vx,p.vy)>30;
 for(const x of [-23,14]){metal(c,x,-17,11,39,'#243537','#61706b');for(let j=0;j<6;j++){const yy=-14+(j*6+(moving?w.time*45:0))%32;line(c,x+1,yy,x+9,yy,'#7d89794d',2);}rect(c,x+3,-10,5,17,'#131f24',1);}
 // Deep chassis, inset ceramic plate, bolts and a living lens.
 poly(c,[[-19,-17],[-12,-25],[12,-25],[19,-16],[18,20],[9,25],[-10,25],[-19,17]],'#12282c');
 poly(c,[[-17,-18],[-10,-24],[10,-24],[17,-16],[16,17],[8,22],[-9,22],[-17,14]],'#d7d9bb','#eef1ce',1.5);
 poly(c,[[-17,2],[-10,8],[-10,21],[-17,14]],'#849689');poly(c,[[9,8],[17,1],[16,17],[8,22]],'#7b9185');
 metal(c,-12,-13,24,18,'#304d4c','#788e78');rect(c,-9,-9,18,6,'#101e25',2);c.shadowBlur=10;c.shadowColor='#a2f5ce';rect(c,-7,-8,14,3,'#c0ffdf',2);c.shadowBlur=0;
 for(const x of [-12,12])bolt(c,x,13,1.4);rect(c,-5,10,10,9,'#50685e',2);line(c,-3,12,3,12,'#9fbe9a');
 // Axle bridges make the magnet arms read as attached mechanical parts.
 metal(c,-32,0,64,7,'#526b5c','#a4b494');
 // Later tiers add onto the accepted body; upgrade 0/1 never enter these branches.
 if(p.upgrade>=2){c.save();c.globalAlpha=.92;for(const side of [-1,1]){c.beginPath();c.strokeStyle=side<0?'#86d5ae':'#d6bd72';c.lineWidth=4;c.arc(0,1,30+side*2,side<0?Math.PI*.55:-Math.PI*.45,side<0?Math.PI*1.45:Math.PI*.45);c.stroke();}for(const x of [-27,27]){circle(c,x,5,4,'#17282a');circle(c,x,5,2.2,'#b7e8b8');}c.restore();}
 if(p.upgrade>=3){metal(c,-10,18,20,27,'#5f694d','#d9c67b');poly(c,[[-8,42],[0,49],[8,42],[6,24],[-6,24]],'#334e48','#9ce8b8',1.5);rect(c,-4,29,8,13,'#b8e6a3',2);line(c,-2,31,-2,40,'#f2d27e',2);line(c,2,31,2,40,'#83e8ba',2);}
 // Horse-shoe arm geometry communicates magnetism without a tutorial icon.
 for(const side of [-1,1]){const x=side*(p.upgrade?34:28),spread=p.transform>0?Math.sin(p.transform*7)*4:0;c.save();c.translate(x+side*spread,-12);c.rotate(side*(w.holding?-.07:.06));metal(c,-6,-15,12,30,p.upgrade?'#acc6a3':'#a69b76','#eee9c3');rect(c,-7,-20,14,10,'#557c6d',2);rect(c,-6,-20,12,4,'#b8f6ce',1);if(w.holding){c.shadowBlur=16;c.shadowColor='#94ffc9';rect(c,-5,-23,10,3,'#caffde');c.shadowBlur=0;}if(p.upgrade){metal(c,-8,8,16,10,'#dcbe76');bolt(c,0,12);}c.restore();}
 if(p.upgrade){poly(c,[[-14,23],[-10,31],[10,31],[14,23]],'#a5b88c','#e4d7a0',1.5);rect(c,-6,24,12,3,'#dbedb0');}
 const progression=w as ProgressionWorld,evolution=progression.evolution??0,build=progression.build??'base';
 if(evolution>0&&build==='swarm'){
  // Outboard return drums and paired coils make SWARM read wider without replacing the accepted chassis.
  for(const side of [-1,1]){c.save();c.translate(side*43,5);metal(c,-7,-13,14,27,'#41645d','#9bd5b3');for(let y=-8;y<10;y+=5)line(c,-5,y,5,y,'#c7f3c3',2);circle(c,0,-17,5,'#162d2e');circle(c,0,-17,2.5,'#8ff0bd');if(evolution>1){metal(c,side<0?-9:-5,12,14,19,'#786647','#e1c97f');bolt(c,side*2,21,1.2);}c.restore();}
  if(evolution>1){c.strokeStyle='#a9efc1';c.lineWidth=2;c.beginPath();c.arc(0,2,49,-Math.PI*.2,Math.PI*1.2);c.stroke();}
 }
 if(evolution>0&&build==='lance'){
  // A centered insulated rail projects beyond the nose; evolution two adds a second energized spine.
  metal(c,-8,-48,16,35,'#58644f','#d8c87d');poly(c,[[-7,-49],[0,-62],[7,-49],[5,-39],[-5,-39]],'#263f3d','#9ce4b5',1.5);rect(c,-4,-49,8,22,'#d6e9a0',2);
  if(evolution>1){for(const side of [-1,1]){line(c,side*8,-43,side*13,-17,'#e4c974',3);circle(c,side*13,-14,3,'#9af0bc');}line(c,0,-60,0,-27,'#f3d982',2);}
 }
 c.restore();
 if(p.transform>0){const q=1-p.transform/1.2;c.save();c.globalAlpha=1-q;c.strokeStyle='#dfffa6';c.lineWidth=2;c.beginPath();c.arc(p.x,p.y,35+q*100,0,TAU);c.stroke();c.restore();}
 const hurt=(w as VerticalWorld).hurt??0;if(hurt>0&&!w.reduced){c.save();c.globalAlpha=Math.min(.6,hurt*2.2);c.strokeStyle='#fff2d3';c.lineWidth=2;c.beginPath();c.arc(p.x,p.y,39+Math.sin(w.time*30)*2,0,TAU);c.stroke();c.restore();}
 }
 circuit(){const c=this.c,w=this.world as ProgressionWorld,relays=w.relays??[];if(!relays.length)return;
  c.save();c.lineCap='round';
  for(let i=1;i<relays.length;i++){const a=relays[i-1]!,b=relays[i]!,live=a.done;c.strokeStyle=live?'#7fd4ad70':'#080f1288';c.lineWidth=live?5:7;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.strokeStyle=live?'#c8efae66':'#5e6b6240';c.lineWidth=1.5;c.setLineDash([7,9]);c.stroke();c.setLineDash([]);}
  const lane=w.lane;if(lane){const strength=Math.max(lane.telegraph,lane.active),active=lane.telegraph<=0&&lane.active>0;c.globalAlpha=(active ? .25 : .09)+Math.min(.18,strength*.12);c.fillStyle=active?'#d95e45':'#d8a35b';if(lane.axis==='x')c.fillRect(lane.position-lane.width/2,0,lane.width,this.world.height);else c.fillRect(0,lane.position-lane.width/2,this.world.width,lane.width);c.globalAlpha=.55;c.strokeStyle=active?'#f2a16f':'#b98e58';c.lineWidth=2;c.setLineDash([12,9]);c.beginPath();if(lane.axis==='x'){c.moveTo(lane.position,0);c.lineTo(lane.position,this.world.height);}else{c.moveTo(0,lane.position);c.lineTo(this.world.width,lane.position);}c.stroke();c.setLineDash([]);}
  c.restore();
 }
 relay(r:Relay,index:number){const c=this.c,w=this.world as ProgressionWorld,active=index===(w.activeRelay??-1)&&!r.done,ratio=Math.max(0,Math.min(1,r.charge/Math.max(1,r.max)));
  c.save();c.translate(r.x,r.y);shadow(c,0,7,27,13);metal(c,-25,-14,50,27,r.done?'#355e51':active?'#806944':'#303d3b',r.done?'#a8e5b5':active?'#e3c77c':'#68736b');
  // Feet, transformer core and cable ports keep the objective grounded as machinery.
  for(const side of [-1,1]){metal(c,side*19-5,10,10,11,'#252f30','#68756c');circle(c,side*18,0,5,'#152326');circle(c,side*18,0,2,active?'#e8ce83':r.done?'#9fe6b9':'#59645e');}
  circle(c,0,0,16,'#172529');circle(c,0,0,12,r.done?'#77c69c':active?'#b49353':'#384541');circle(c,0,0,6,r.done?'#c8f5bd':active?'#f2d88d':'#182426');
  for(let i=0;i<6;i++){const lit=r.done||i<Math.ceil(ratio*6),a=i*TAU/6;c.strokeStyle=lit?(r.done?'#9fe6b5':'#e6c777'):'#59625c';c.lineWidth=3;c.beginPath();c.arc(0,0,20,a+.08,a+TAU/6-.08);c.stroke();}
  if(r.flash>0){c.globalAlpha=Math.min(.75,r.flash*5);c.strokeStyle='#fff1b1';c.lineWidth=3;c.beginPath();c.arc(0,0,25+r.flash*8,0,TAU);c.stroke();}
  if(active){c.strokeStyle='#f1d58a';c.lineWidth=1.5;c.setLineDash([4,5]);c.beginPath();c.arc(0,0,31,0,TAU);c.stroke();c.setLineDash([]);for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5])line(c,Math.cos(a)*27,Math.sin(a)*27,Math.cos(a)*35,Math.sin(a)*35,'#f1d58a',2);}
  c.font='700 8px monospace';c.textAlign='center';c.fillStyle=r.done?'#b8e9bd':active?'#efd58e':'#67766e';c.fillText(`R-${String(r.id+1).padStart(2,'0')}`,0,34);c.restore();
 }
 specialEnemy(e:VerticalEnemy){const c=this.c,w=this.world,kind=e.kind??'shield',elite=kind==='elite',charger=kind==='charger';if(e.dead&&w.time-e.deathAt>.13)return;if((e.spawnIn??0)>0)return;
 c.save();if(e.dead)c.globalAlpha=Math.max(0,1-(w.time-e.deathAt)/.13);c.translate(e.x,e.y);shadow(c,0,5,e.r+5,e.r*.68);c.rotate((e.facing??e.angle)+Math.PI/2);c.scale(1+e.recoil*.13,1-e.recoil*.12);if(elite)c.scale(1.28,1.28);
 const flash=e.flash>0&&!w.reduced,open=(e.recover??0)>0,body=flash?'#fff3d1':elite?'#8e6755':charger?'#985746':'#80675a',edge=flash?'#fffce9':open?'#e7b66d':'#c89673';
 // Tracks and chassis share the accepted material language, while widths stay type-specific.
 for(const side of [-1,1]){metal(c,side*27-6,-15,12,39,charger?'#352f31':'#293436','#788077');for(let i=0;i<5;i++)line(c,side*27-4,-11+i*7,side*27+4,-11+i*7,'#697067',2);}
 poly(c,[[-25,-18],[-15,-29],[15,-29],[25,-18],[22,20],[11,28],[-12,28],[-23,17]],'#30292a');
 poly(c,[[-22,-18],[-12,-26],[12,-26],[22,-17],[19,17],[9,24],[-10,24],[-20,15]],body,edge,1.5);
 metal(c,-12,-14,24,16,'#222d2f',edge);rect(c,-9,-10,18,4,'#151419',2);rect(c,-7,-9,14,2,open?'#bff3bf':(e.windup??0)>0?'#ffe1a1':'#e8996d',1);
 // Shield reads as a separate frontal plate. Damage removes segments rather than hiding the bearing.
 if(kind==='shield'||elite){const shield=Math.max(0,Math.min(1,e.shield??0));c.save();c.translate(0,-28);if(open&&shield>0){for(const side of [-1,1]){c.save();c.translate(side*11,5);c.rotate(side*.34);poly(c,[[side*-2,8],[side*-3,-9],[side*8,-15],[side*16,-7],[side*18,9],[side*8,13]],'#8b8067','#e8cf91',2);bolt(c,side*9,0,1.3);c.restore();}line(c,-7,8,7,8,'#dff0a4',2);}else{poly(c,[[-25,7],[-20,-7],[-9,-15],[9,-15],[20,-7],[25,7],[15,13],[-15,13]],shield>0?'#8b8067':'#403b38',shield>0?'#e0c68b':'#7d7464',2);for(const x of [-13,0,13]){const intact=shield>(x+19)/45;rect(c,x-5,-8,10,14,intact?'#b29a68':'#4b4540',2);if(intact)bolt(c,x,0,1.3);}}if(shield<=0){line(c,-17,-7,-4,5,'#d5a36e',2);line(c,-3,-10,8,6,'#d5a36e',2);line(c,7,-8,17,2,'#d5a36e',2);}c.restore();}
 if(charger||elite){for(const side of [-1,1])poly(c,[[side*18,-18],[side*31,-10],[side*28,10],[side*17,18]],open?'#aa805b':'#6f4037',open?'#e4ba77':'#bd735d',1.5);poly(c,[[-8,-26],[0,-35],[8,-26],[5,-18],[-5,-18]],'#d2a064','#f1cb83',1.5);}
 // Recovery exposes a bright rear service plate, readable after the committed dash.
 if(open){c.shadowBlur=8;c.shadowColor='#d8ee9b';poly(c,[[-13,20],[0,29],[13,20],[8,12],[-8,12]],'#b69b5f','#edf0a4',2);c.shadowBlur=0;}
 if(e.hp<e.max){line(c,-10,1,-2,-6,'#2b2020',2);line(c,-2,-6,8,0,'#2b2020',2);}
 c.restore();
 // Compact cells avoid a boss bar while keeping the 24 HP elite legible.
 if(e.hp<e.max){const cells=Math.min(6,Math.ceil(e.max/4)),filled=Math.ceil(e.hp/e.max*cells);for(let i=0;i<cells;i++)rect(c,e.x-cells*4+i*8,e.y-e.r-(elite?23:18),6,3,i<filled?'#e4a16d':'#253638',1);}
 }
 enemy(e:Enemy){const v=e as VerticalEnemy,kind=v.kind??(e.heavy?'heavy':'basic');if(kind!=='basic'&&kind!=='heavy'){this.specialEnemy(v);return;}const c=this.c;if(e.dead&&this.world.time-e.deathAt>.13)return;c.save();if(e.dead)c.globalAlpha=Math.max(0,1-(this.world.time-e.deathAt)/.13);c.translate(e.x,e.y);shadow(c,0,4,e.r+3,e.r*.64);c.rotate(e.angle+Math.PI/2);c.scale(1+e.recoil*.14,1-e.recoil*.13);const size=e.heavy?1.35:1;c.scale(size,size);
 const flash=e.flash>0&&!this.world.reduced,base=flash?'#fff4d4':e.heavy?'#a88266':'#ba6550',light=flash?'#fffce8':'#e69b76';
 for(const s of [-1,1]){metal(c,s*25-6,-13,12,35,'#2a3234','#788076');for(let i=0;i<4;i++)line(c,s*25-4,-9+i*8,s*25+4,-9+i*8,'#596158',2);}
 poly(c,[[-23,-16],[-15,-27],[14,-27],[23,-15],[20,18],[10,25],[-12,25],[-22,15]],'#332a29');
 poly(c,[[-21,-18],[-13,-27],[13,-27],[22,-17],[18,17],[10,22],[-11,22],[-20,15]],base,light,1.5);
 poly(c,[[-20,-15],[-11,-21],[-11,9],[-17,16]],flash?'#fff':'#874b41');poly(c,[[20,-14],[11,-21],[11,9],[17,16]],flash?'#fff':'#713e37');
 metal(c,-12,-16,24,17,'#242d2f','#b8856d');rect(c,-10,-12,20,5,'#120f14',2);rect(c,-8,-11,16,3,e.charge>0?'#fff0c0':'#ffad6d',1);
 poly(c,[[-9,8],[0,1],[9,8],[0,17]],'#372d2a','#d79b6e');line(c,-5,8,5,8,'#f0bf83',2);bolt(c,-15,15);bolt(c,15,15);
 if(e.heavy){metal(c,-30,-10,13,29,'#7c7967','#b8aa7c');metal(c,17,-10,13,29,'#7c7967','#b8aa7c');for(const x of [-25,22]){line(c,x,0,x+3,5,'#e4bc6d',3);line(c,x,8,x+3,13,'#e4bc6d',3);}poly(c,[[-16,-26],[-10,-34],[10,-34],[16,-26]],'#d1b376','#e9d19c',1.5);}
 if(e.hp<e.max){line(c,-11,4,-1,-3,'#251c1c',2);line(c,-1,-3,8,0,'#251c1c',2);line(c,8,0,12,-6,'#251c1c',2);}
 c.restore();if(e.hp<e.max){const n=Math.ceil(e.max/2);for(let i=0;i<n;i++)rect(c,e.x-n*3+i*6,e.y-e.r-18,4,3,i<Math.ceil(e.hp/2)?'#e8a46c':'#263839',1);}
 if(e.charge>0){c.save();c.globalAlpha=.6;c.strokeStyle='#ef9474';c.lineWidth=2;c.setLineDash([4,7]);c.beginPath();c.arc(e.x,e.y,e.r+8,0,TAU*(1-e.charge/.65));c.stroke();c.restore();}
 }
 telegraph(e:Enemy){const c=this.c,v=e as VerticalEnemy;if(e.dead)return;const kind=v.kind??(e.heavy?'heavy':'basic'),spawn=v.spawnIn??0;if(spawn>0){const q=Math.max(0,Math.min(1,1-spawn));c.save();c.globalAlpha=.28+q*.35;c.strokeStyle=kind==='elite'?'#e5bb73':'#d78969';c.lineWidth=2;c.setLineDash([5,7]);c.beginPath();c.arc(e.x,e.y,e.r+15-q*7,0,TAU);c.stroke();c.setLineDash([]);for(let i=0;i<3;i++){const a=i*TAU/3+this.world.time*.7;circle(c,e.x+Math.cos(a)*(e.r+9),e.y+Math.sin(a)*(e.r+9),2,'#efc280');}c.restore();return;}
 if((kind==='charger'||kind==='elite')&&(v.windup??0)>0){const a=v.facing??e.angle,length=kind==='elite'?390:330,width=kind==='elite'?36:27,x2=e.x+Math.cos(a)*length,y2=e.y+Math.sin(a)*length,nx=-Math.sin(a)*width,ny=Math.cos(a)*width;c.save();c.globalAlpha=.18+Math.sin(this.world.time*24)*.04;poly(c,[[e.x+nx,e.y+ny],[x2+nx,y2+ny],[x2-nx,y2-ny],[e.x-nx,e.y-ny]],'#d7664b');c.globalAlpha=.72;c.strokeStyle='#f2a16f';c.lineWidth=2;c.setLineDash([13,9]);c.beginPath();c.moveTo(e.x,e.y);c.lineTo(x2,y2);c.stroke();c.restore();}
 }
 render(){const c=this.c,w=this.world,p=w.player,pw=w as ProgressionWorld;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#111c20';c.fillRect(0,0,this.cssW,this.cssH);c.translate(this.ox,this.oy);c.scale(this.scale,this.scale);c.save();if(!w.reduced){c.translate(w.camera.x+Math.sin(w.time*113)*w.shake*.42,w.camera.y+Math.cos(w.time*97)*w.shake*.32);}c.drawImage(this.floor,0,0);this.circuit();for(const [i,r] of (pw.relays??[]).entries())this.relay(r,i);
 // Quiet amber pools behind metal, local force lines only while pulling.
 if(w.holding){const fallback=200+Math.min(1,w.holdTime)*75+(p.upgrade>=2?34:0),r=Math.max(80,pw.pullRadius??fallback),g=c.createRadialGradient(p.x,p.y,25,p.x,p.y,r);g.addColorStop(0,'#83efb318');g.addColorStop(1,'#83efb300');c.fillStyle=g;c.fillRect(p.x-r,p.y-r,r*2,r*2);c.save();c.strokeStyle='#a9ebc13f';c.lineWidth=1;for(let i=0;i<3;i++){const rr=55+(((w.time*-.65+i/3)%1+1)%1)*Math.max(30,r-55);c.globalAlpha=(1-(rr-55)/Math.max(30,r-55))*.7;c.beginPath();c.ellipse(p.x,p.y,rr,rr*.94,p.angle,0,TAU);c.stroke();}c.restore();
 for(const s of w.scraps)if(s.mode==='loose'&&Math.hypot(s.x-p.x,s.y-p.y)<320){c.save();c.globalAlpha=.23;c.strokeStyle='#b5f5c9';c.beginPath();c.moveTo(s.x,s.y);c.quadraticCurveTo((s.x+p.x)/2+Math.sin(w.time*14+s.id)*12,(s.y+p.y)/2,p.x,p.y);c.stroke();c.restore();}}
 if(w.holding||w.releaseIn>0){const a=p.angle;c.save();c.translate(p.x,p.y);c.rotate(a);c.globalAlpha=.65;c.strokeStyle='#d1ecb1';c.lineWidth=1;c.setLineDash([5,10]);c.beginPath();c.moveTo(65,0);c.lineTo(210,0);c.stroke();c.setLineDash([]);poly(c,[[218,0],[207,-5],[207,5]],'#e5edbd');c.restore();}
 for(const s of w.scraps)if(s.mode==='shot'){const a=Math.atan2(s.vy,s.vx),evolution=pw.evolution??0,build=pw.build??'base',trail=build==='lance'&&evolution?105:build==='swarm'&&evolution?52:65;c.save();c.globalAlpha=.6;const g=c.createLinearGradient(s.x-Math.cos(a)*trail,s.y-Math.sin(a)*trail,s.x,s.y);g.addColorStop(0,'#ffd79300');g.addColorStop(1,build==='swarm'&&evolution?'#aef2c2':'#ffe8a1');c.strokeStyle=g;c.lineWidth=build==='lance'&&evolution?5:build==='swarm'&&evolution?2.5:4;c.lineCap='round';c.beginPath();c.moveTo(s.x-Math.cos(a)*trail,s.y-Math.sin(a)*trail);c.lineTo(s.x,s.y);c.stroke();if(build==='swarm'&&evolution>1){c.globalAlpha=.5;for(const side of [-1,1])line(c,s.x-Math.cos(a)*35-Math.sin(a)*side*4,s.y-Math.sin(a)*35+Math.cos(a)*side*4,s.x,s.y,'#8debb8',1);}if((p.upgrade>=3&&build==='base')||(build==='lance'&&evolution)){c.globalAlpha=.72;c.strokeStyle=build==='lance'?'#f0d17b':'#9ff0bd';c.lineWidth=1.5;for(const side of [-1,1]){c.beginPath();c.moveTo(s.x-Math.cos(a)*(trail+13)-Math.sin(a)*side*3,s.y-Math.sin(a)*(trail+13)+Math.cos(a)*side*3);c.lineTo(s.x-Math.sin(a)*side*3,s.y+Math.cos(a)*side*3);c.stroke();}}c.restore();}
 for(const e of w.enemies){this.telegraph(e);if(!e.dead&&(e.shellGate??0)>0){c.save();c.strokeStyle='#dbc58c';c.lineWidth=5;for(let i=0;i<6;i++){c.beginPath();c.arc(e.x,e.y,e.r+7,i*TAU/6+.06,(i+1)*TAU/6-.06);c.stroke();}c.restore();}}
 if((pw.stage??0)===5&&pw.bossLocked){for(const e of w.enemies)if(!e.dead&&(e.kind==='elite')){c.save();c.strokeStyle='#9b8154';c.lineWidth=7;for(let i=0;i<4;i++){c.beginPath();c.arc(e.x,e.y,e.r+15,i*TAU/4+.11,(i+1)*TAU/4-.11);c.stroke();}c.strokeStyle='#e8ce82';c.lineWidth=2;c.setLineDash([5,6]);c.beginPath();c.arc(e.x,e.y,e.r+21,0,TAU);c.stroke();c.setLineDash([]);c.restore();}}
 for(const s of w.scraps)if(s.mode!=='orbit')this.scrap(s);for(const e of w.enemies)this.enemy(e);this.robot();for(const s of w.scraps)if(s.mode==='orbit')this.scrap(s);
 for(const q of w.particles){c.save();const fade=q.life/q.max;c.globalAlpha=fade;if(q.kind==='spark'){c.lineCap='round';line(c,q.x,q.y,q.x-Math.cos(q.angle)*q.size*4,q.y-Math.sin(q.angle)*q.size*4,q.color,q.size*.7);circle(c,q.x,q.y,q.size*.7,'#fff4ce');}else if(q.kind==='ring'){c.strokeStyle=q.color;c.lineWidth=3*fade;c.beginPath();c.arc(q.x,q.y,15+(1-fade)*73,0,TAU);c.stroke();}else if(q.kind==='smoke'){c.globalAlpha=fade*.15;circle(c,q.x,q.y,q.size*(2-fade),q.color);}else if(q.kind==='chip'){c.translate(q.x,q.y);c.rotate(q.angle);rect(c,-q.size,-q.size*.4,q.size*2,q.size*.8,q.color,1);}c.restore();}
 c.restore();
 }
}
