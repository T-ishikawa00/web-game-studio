export type Vec = {x:number;y:number};
export type Scrap = Vec & {id:number;vx:number;vy:number;angle:number;spin:number;kind:number;mode:'loose'|'orbit'|'shot';age:number;reward:boolean;salvaged:boolean;returnAt:number;orbit:number;hit:number[]};
export type Enemy = Vec & {id:number;home:Vec;vx:number;vy:number;hp:number;max:number;heavy:boolean;r:number;angle:number;flash:number;recoil:number;charge:number;cool:number;dead:boolean;deathAt:number};
export type Particle=Vec & {vx:number;vy:number;life:number;max:number;size:number;color:string;kind:'spark'|'smoke'|'ring'|'chip';angle:number;spin:number};
export type GameEvent={kind:string;t:number;x:number;y:number;value:number};
export const TUNE={step:1/120,pullRadius:320,anticipation:.065,shotSpeed:1260,hitStop:.045,breakStop:.065,returnDelay:.25,upgradeArmor:6,maxParticles:220,maxScraps:70};
export const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
export function segmentDistance(p:Vec,a:Vec,b:Vec){const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);}
export class MagnetWorld {
 width:number;height:number;time=0;seed=814;serial=0;player={x:0,y:0,vx:0,vy:0,angle:-.5,kick:0,upgrade:0,transform:0,bump:0};
 scraps:Scrap[]=[];enemies:Enemy[]=[];particles:Particle[]=[];events:GameEvent[]=[];holding=false;holdTime=0;releaseIn=0;shotAngle=0;freeze=0;shake=0;camera={x:0,y:0};armor=0;kills=0;shots=0;won=false;winTime=0;started=false;reduced=false;paused=false;move={x:0,y:0};aim={x:0,y:0};
 onEvent:((e:GameEvent)=>void)|null=null;
 constructor(width=960,height=640){this.width=width;this.height=height;this.reset();}
 random(){this.seed=(Math.imul(1664525,this.seed)+1013904223)>>>0;return this.seed/4294967296;}
 emit(kind:string,x=this.player.x,y=this.player.y,value=1){const e={kind,t:this.time,x,y,value};this.events.push(e);if(this.events.length>180)this.events.shift();this.onEvent?.(e);}
 reset(){this.time=0;this.seed=814;this.serial=0;this.scraps=[];this.enemies=[];this.particles=[];this.events=[];this.holding=false;this.holdTime=0;this.releaseIn=0;this.freeze=0;this.shake=0;this.camera={x:0,y:0};this.armor=0;this.kills=0;this.shots=0;this.won=false;this.winTime=0;this.started=false;this.move={x:0,y:0};
 const portrait=this.height>this.width;
 this.player={x:this.width*(portrait?.43:.34),y:this.height*(portrait?.65:.59),vx:0,vy:0,angle:-.55,kick:0,upgrade:0,transform:0,bump:0};
 const spots=portrait?[[.53,.42],[.27,.25],[.77,.47],[.73,.20]]:[[.59,.43],[.72,.66],[.43,.25],[.82,.26]];
 for(let i=0;i<spots.length;i++){const [x,y]=spots[i]!,heavy=i===3;this.enemies.push({id:i,x:x*this.width,y:y*this.height,home:{x:x*this.width,y:y*this.height},vx:0,vy:0,hp:heavy?14:4,max:heavy?14:4,heavy,r:heavy?36:25,angle:2.3,flash:0,recoil:0,charge:0,cool:4+i*1.4,dead:false,deathAt:0});}
 this.aim={x:this.enemies[0]!.x,y:this.enemies[0]!.y};
 for(let i=0;i<11;i++){const a=i*2.399,d=72+(i%4)*20;this.addScrap(this.player.x+Math.cos(a)*d,this.player.y+Math.sin(a)*d,i%3);}
 }
 addScrap(x:number,y:number,kind:number,reward=false,vx=0,vy=0){if(this.scraps.length>=TUNE.maxScraps)return;this.scraps.push({id:this.serial++,x,y,vx,vy,kind,angle:this.random()*6.28,spin:(this.random()-.5)*8,mode:'loose',age:0,reward,salvaged:reward,returnAt:reward?this.time+TUNE.returnDelay:Infinity,orbit:0,hit:[]});}
 startHold(){if(this.paused||this.won||this.releaseIn>0)return;this.started=true;this.holding=true;this.holdTime=0;this.emit('pull');}
 release(){if(!this.holding)return;this.holding=false;this.holdTime=0;if(this.scraps.some(s=>s.mode==='orbit')){this.releaseIn=TUNE.anticipation;this.shotAngle=this.player.angle;this.emit('anticipation');}else this.emit('empty');}
 cancel(){this.holding=false;this.holdTime=0;this.releaseIn=0;this.move={x:0,y:0};}
 launch(){const p=this.player,loaded=this.scraps.filter(s=>s.mode==='orbit');if(!loaded.length)return;
 this.shots++;this.emit('launch',p.x,p.y,loaded.length);p.kick=1;
 loaded.forEach((s,i)=>{const spread=(i-(loaded.length-1)/2)*.017,angle=this.shotAngle+spread,offset=(i%3-1)*8;s.mode='shot';s.age=0;s.x=p.x+Math.cos(angle)*38-Math.sin(angle)*offset;s.y=p.y+Math.sin(angle)*38+Math.cos(angle)*offset;s.vx=Math.cos(angle)*(TUNE.shotSpeed+i*13);s.vy=Math.sin(angle)*(TUNE.shotSpeed+i*13);s.hit=[];s.reward=false;});
 p.vx-=Math.cos(this.shotAngle)*95;p.vy-=Math.sin(this.shotAngle)*95;this.burst(p.x+Math.cos(p.angle)*40,p.y+Math.sin(p.angle)*40,14,'#b4ffe4',p.angle);
 }
 burst(x:number,y:number,n:number,color:string,dir?:number){for(let i=0;i<n;i++){const a=dir===undefined?this.random()*6.28:dir+(this.random()-.5)*2.8,speed=70+this.random()*330,life=.16+this.random()*.35;this.particles.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life,max:life,size:1+this.random()*3,color,kind:'spark',angle:a,spin:0});}if(this.particles.length>TUNE.maxParticles)this.particles.splice(0,this.particles.length-TUNE.maxParticles);}
 hit(e:Enemy,s:Scrap){if(e.dead||s.hit.includes(e.id))return;s.hit.push(e.id);const a=Math.atan2(s.vy,s.vx),damage=this.player.upgrade?2:1;e.hp-=damage;e.flash=.11;e.recoil=1;e.vx+=Math.cos(a)*(e.heavy?75:160);e.vy+=Math.sin(a)*(e.heavy?75:160);this.freeze=Math.max(this.freeze,TUNE.hitStop);this.shake=Math.max(this.shake,this.reduced?0:4);this.camera.x=-Math.cos(a)*4;this.camera.y=-Math.sin(a)*4;this.emit('hit',e.x,e.y,damage);this.burst(s.x,s.y,8,'#ffc16c',a);s.mode='loose';s.age=0;s.vx=-s.vx*.13;s.vy=-s.vy*.13;s.returnAt=Infinity;
 if(e.hp<=0){e.dead=true;e.deathAt=this.time;this.kills++;this.freeze=TUNE.breakStop;this.shake=this.reduced?0:7;this.emit('break',e.x,e.y,e.heavy?2:1);this.burst(e.x,e.y,e.heavy?42:25,'#ffd9a0',a);const count=e.heavy?10:5;for(let i=0;i<count;i++){const ang=i/count*Math.PI*2,speed=100+this.random()*90;this.addScrap(e.x+Math.cos(ang)*15,e.y+Math.sin(ang)*15,i%3,true,Math.cos(ang)*speed,Math.sin(ang)*speed);}
 this.particles.push({x:e.x,y:e.y,vx:0,vy:0,life:.35,max:.35,size:15,color:'#f4d19b',kind:'ring',angle:0,spin:0});
 for(let i=0;i<5;i++)this.particles.push({x:e.x+(this.random()-.5)*20,y:e.y+(this.random()-.5)*20,vx:(this.random()-.5)*35,vy:-10-this.random()*20,life:.65,max:.65,size:14+this.random()*12,color:'#78817b',kind:'smoke',angle:0,spin:0});
 }
 }
 update(dt:number){if(this.paused)return;this.time+=dt;this.player.transform=Math.max(0,this.player.transform-dt);this.player.bump=Math.max(0,this.player.bump-dt);this.shake=Math.max(0,this.shake-dt*40);this.camera.x*=Math.exp(-dt*22);this.camera.y*=Math.exp(-dt*22);
 for(const q of this.particles){q.life-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=Math.exp(-dt*4);q.vy*=Math.exp(-dt*4);q.angle+=q.spin*dt;}this.particles=this.particles.filter(q=>q.life>0);
 if(this.freeze>0){this.freeze-=dt;return;}
 if(this.holding)this.holdTime+=dt;
 if(this.releaseIn>0){this.releaseIn-=dt;if(this.releaseIn<=0)this.launch();}
 const p=this.player,dx=this.aim.x-p.x,dy=this.aim.y-p.y;if(dx*dx+dy*dy>25)p.angle=Math.atan2(dy,dx);p.kick=Math.max(0,p.kick-dt*7);
 const mag=Math.hypot(this.move.x,this.move.y),speed=this.holding?175:230;const mx=mag>1?this.move.x/mag:this.move.x,my=mag>1?this.move.y/mag:this.move.y;
 p.vx+=(mx*speed-p.vx)*Math.min(1,dt*16);p.vy+=(my*speed-p.vy)*Math.min(1,dt*16);p.x=clamp(p.x+p.vx*dt,52,this.width-52);p.y=clamp(p.y+p.vy*dt,85,this.height-70);
 const orbitList=this.scraps.filter(s=>s.mode==='orbit');let orbitCount=orbitList.length;
 for(const s of this.scraps){s.age+=dt;s.angle+=s.spin*dt;
  if(s.mode==='orbit'){const list=orbitList,i=list.indexOf(s),a=this.time*(this.holding?2.6:1.3)+i/Math.max(1,list.length)*Math.PI*2;const r=(p.upgrade?59:51)+(i%2)*7-(this.holding?Math.min(this.holdTime,1)*7:0);s.orbit=a;const tx=p.x+Math.cos(a)*r,ty=p.y+Math.sin(a)*r;s.x+=(tx-s.x)*Math.min(1,dt*20);s.y+=(ty-s.y)*Math.min(1,dt*20);s.angle=a+.7;continue;}
  const ox=s.x,oy=s.y;
  if(s.mode==='shot'){s.x+=s.vx*dt;s.y+=s.vy*dt;for(const e of this.enemies)if(!e.dead&&segmentDistance(e,{x:ox,y:oy},s)<e.r+5){this.hit(e,s);break;}if(s.age>.8||s.x<42||s.x>this.width-42||s.y<70||s.y>this.height-48){s.mode='loose';s.vx*=-.2;s.vy*=-.2;s.returnAt=Infinity;s.x=clamp(s.x,45,this.width-45);s.y=clamp(s.y,75,this.height-50);}continue;}
  const distance=Math.hypot(p.x-s.x,p.y-s.y),auto=s.returnAt<=this.time,pulling=(this.holding&&distance<TUNE.pullRadius)||auto;
  if(pulling&&orbitCount<(p.upgrade?16:11)){const accel=700+200000/(distance+70),nx=(p.x-s.x)/(distance||1),ny=(p.y-s.y)/(distance||1);s.vx+=nx*accel*dt;s.vy+=ny*accel*dt;s.spin+=dt*4;
   if(distance<65){s.mode='orbit';s.vx=s.vy=0;orbitCount++;this.emit('snap',s.x,s.y,s.reward?2:1);if(s.reward){this.armor++;s.reward=false;if(this.armor>=TUNE.upgradeArmor&&!p.upgrade){p.upgrade=1;p.transform=1.2;this.emit('upgrade');this.burst(p.x,p.y,32,'#b6ffe4');}}continue;}
  }
  const friction=pulling?2.1:4;s.vx*=Math.exp(-dt*friction);s.vy*=Math.exp(-dt*friction);s.x+=s.vx*dt;s.y+=s.vy*dt;
  if(s.x<40||s.x>this.width-40)s.vx*=-.45;if(s.y<65||s.y>this.height-45)s.vy*=-.45;s.x=clamp(s.x,40,this.width-40);s.y=clamp(s.y,65,this.height-45);
 }
 for(const e of this.enemies){e.flash=Math.max(0,e.flash-dt);e.recoil=Math.max(0,e.recoil-dt*7);if(e.dead)continue;const ddx=p.x-e.x,ddy=p.y-e.y,d=Math.hypot(ddx,ddy);e.angle=Math.atan2(ddy,ddx);e.cool-=this.started?dt:0;
  if(e.charge>0){e.charge-=dt;if(e.charge<=0){e.vx+=Math.cos(e.angle)*(e.heavy?280:340);e.vy+=Math.sin(e.angle)*(e.heavy?280:340);e.cool=e.heavy?5.5:4.4;}}
  else if(e.cool<=0&&this.started&&d<460){e.charge=.65;this.emit('enemy-windup',e.x,e.y);}
  e.x=clamp(e.x+e.vx*dt,60,this.width-60);e.y=clamp(e.y+e.vy*dt,100,this.height-65);e.vx*=Math.exp(-dt*4);e.vy*=Math.exp(-dt*4);
  if(d<e.r+24&&p.bump<=0){p.bump=.6;p.vx+=Math.cos(e.angle)*320;p.vy+=Math.sin(e.angle)*320;this.emit('bump');this.burst(p.x,p.y,8,'#e8e6cb');}
 }
 if(this.kills===this.enemies.length&&!this.won){this.won=true;this.winTime=this.time;this.holding=false;this.emit('complete');}
 }
 snapshot(){return {time:this.time,player:{...this.player},holding:this.holding,paused:this.paused,releaseIn:this.releaseIn,armor:this.armor,kills:this.kills,shots:this.shots,won:this.won,scraps:this.scraps.map(s=>({...s})),enemies:this.enemies.map(e=>({...e})),events:[...this.events],particles:this.particles.length};}
}
