export type Vec = {x:number;y:number};
export type Scrap = Vec & {id:number;vx:number;vy:number;angle:number;spin:number;kind:number;mode:'loose'|'orbit'|'shot';age:number;reward:boolean;salvaged:boolean;returnAt:number;orbit:number;hit:number[];pickupAfter?:number;earnedStage?:number};
export type EnemyKind='basic'|'heavy'|'shield'|'charger'|'elite';
export type Enemy = Vec & {id:number;home:Vec;vx:number;vy:number;hp:number;max:number;heavy:boolean;r:number;angle:number;flash:number;recoil:number;charge:number;cool:number;dead:boolean;deathAt:number;kind:EnemyKind;shield:number;facing:number;windup:number;dash:number;recover:number;spawnIn:number;guardStress:number;locked:number;shellGate?:number};
export type Particle=Vec & {vx:number;vy:number;life:number;max:number;size:number;color:string;kind:'spark'|'smoke'|'ring'|'chip';angle:number;spin:number};
export type GameEvent={kind:string;t:number;x:number;y:number;value:number};
export const TUNE={step:1/120,pullRadius:320,anticipation:.065,shotSpeed:1260,hitStop:.045,breakStop:.065,returnDelay:.25,upgradeArmor:6,maxParticles:220,maxScraps:70};
export const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
export function segmentDistance(p:Vec,a:Vec,b:Vec){const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);}
export type Relay=Vec&{id:number;charge:number;max:number;done:boolean;flash:number};
export class MagnetWorld {
 clearElapsed=0;quietSince=-1;links:{x:number;y:number;tx:number;ty:number;life:number}[]=[];
 stage=0;encounter='combat';choice=0;build:'base'|'swarm'|'lance'='base';evolution=0;module='';relays:Relay[]=[];activeRelay=0;bossLocked=false;encounterStart=0;encounterSpawns=0;transition=0;lane:{axis:'x'|'y';position:number;width:number;telegraph:number;active:number}|null=null;laneCycle=-1;laneSuppressedUntil=0;choices:{stage:number;id:string;t:number}[]=[];stageTimes:number[]=[];
 get pullRadius(){return this.build==='swarm'?460:this.build==='lance'?340:TUNE.pullRadius;}
 get capacity(){const base=this.build==='swarm'?(this.evolution===2?30:24):this.build==='lance'?12:this.player.upgrade?16:11;return base+(this.module==='rack'?3:0);}
 get optionIds(){return this.choice===1?['recycler','rack','guard']:this.choice===2?['swarm','lance']:this.build==='swarm'?['cyclone','lance']:['return','swarm'];}

 width:number;height:number;time=0;seed=814;serial=0;player={x:0,y:0,vx:0,vy:0,angle:-.5,kick:0,upgrade:0,transform:0,bump:0,hp:6,maxHp:6};
 runTime=0;phase=0;over=false;hurt=0;runEndedAt=0;nextArrival=0;wave=0;enemySerial=4;eliteSpawned=false;eliteDefeated=false;upgrades:number[]=[];milestones:{kind:string;t:number}[]=[];counters:Record<string,number>={};peak={scraps:0,particles:0,enemies:0};recycled=0;repairKills=0;resultDelay=0;
 scraps:Scrap[]=[];enemies:Enemy[]=[];particles:Particle[]=[];events:GameEvent[]=[];holding=false;holdTime=0;releaseIn=0;shotAngle=0;freeze=0;shake=0;camera={x:0,y:0};armor=0;kills=0;shots=0;won=false;winTime=0;started=false;reduced=false;paused=false;move={x:0,y:0};aim={x:0,y:0};
 onEvent:((e:GameEvent)=>void)|null=null;
 constructor(width=960,height=640){this.width=width;this.height=height;this.reset();}
 random(){this.seed=(Math.imul(1664525,this.seed)+1013904223)>>>0;return this.seed/4294967296;}
 emit(kind:string,x=this.player.x,y=this.player.y,value=1){const e={kind,t:this.time,x,y,value};this.events.push(e);if(this.events.length>180)this.events.shift();this.counters[kind]=(this.counters[kind]??0)+1;this.onEvent?.(e);}
 reset(){this.clearElapsed=0;this.quietSince=-1;this.links=[];this.time=0;this.seed=814;this.serial=0;this.scraps=[];this.enemies=[];this.particles=[];this.events=[];this.holding=false;this.holdTime=0;this.releaseIn=0;this.freeze=0;this.shake=0;this.camera={x:0,y:0};this.armor=0;this.kills=0;this.shots=0;this.won=false;this.winTime=0;this.started=false;this.move={x:0,y:0};
 this.runTime=0;this.phase=0;this.over=false;this.hurt=0;this.runEndedAt=0;this.nextArrival=0;this.wave=0;this.enemySerial=4;this.eliteSpawned=false;this.eliteDefeated=false;this.upgrades=[];this.milestones=[];this.counters={};this.peak={scraps:11,particles:0,enemies:4};this.recycled=0;this.repairKills=0;this.resultDelay=0;
 this.stage=0;this.encounter='combat';this.choice=0;this.build='base';this.evolution=0;this.module='';this.relays=[];this.activeRelay=0;this.bossLocked=false;this.encounterStart=0;this.encounterSpawns=0;this.transition=0;this.lane=null;this.laneCycle=-1;this.laneSuppressedUntil=0;this.choices=[];this.stageTimes=[];this.setupRelays();
 const portrait=this.height>this.width;
 this.player={x:this.width*(portrait?.43:.34),y:this.height*(portrait?.65:.59),vx:0,vy:0,angle:-.55,kick:0,upgrade:0,transform:0,bump:0,hp:6,maxHp:6};
 const spots:[number,number][]=portrait?[[.53,.42],[.27,.25],[.77,.47],[.73,.20]]:[[.59,.43],[.72,.66],[.43,.25],[.82,.26]];
 for(let i=0;i<spots.length;i++){const [x,y]=spots[i]!,heavy=i===3;this.enemies.push({id:i,x:x*this.width,y:y*this.height,home:{x:x*this.width,y:y*this.height},vx:0,vy:0,hp:heavy?14:4,max:heavy?14:4,heavy,r:heavy?36:25,angle:2.3,flash:0,recoil:0,charge:0,cool:4+i*1.4,dead:false,deathAt:0,kind:heavy?'heavy':'basic',shield:0,facing:2.3,windup:0,dash:0,recover:0,spawnIn:0,guardStress:0,locked:0});}
 this.aim={x:this.enemies[0]!.x,y:this.enemies[0]!.y};
 for(let i=0;i<11;i++){const a=i*2.399,d=72+(i%4)*20;this.addScrap(this.player.x+Math.cos(a)*d,this.player.y+Math.sin(a)*d,i%3);}
 }
 addScrap(x:number,y:number,kind:number,reward=false,vx=0,vy=0){if(this.scraps.length>=TUNE.maxScraps){const candidates=this.scraps.filter(s=>s.mode==='loose'&&!s.reward).sort((a,b)=>b.age-a.age);const old=candidates[0]??this.scraps.find(s=>!s.reward)??this.scraps[0];if(!old)return;if(old.reward){this.armor++;this.emit('overflow-reclaim',old.x,old.y);this.burst(old.x,old.y,3,'#b6ffe4');}this.scraps.splice(this.scraps.indexOf(old),1);this.recycled++;}this.scraps.push({id:this.serial++,x,y,vx,vy,kind,angle:this.random()*6.28,spin:(this.random()-.5)*8,mode:'loose',age:0,reward,salvaged:reward,...(reward?{earnedStage:this.stage}:{}),returnAt:reward?this.time+TUNE.returnDelay:Infinity,orbit:0,hit:[]});}
 startHold(){if(this.paused||this.over||this.won||this.encounter!=='combat'||this.releaseIn>0)return;this.started=true;this.holding=true;this.holdTime=0;this.emit('pull');}
 release(){if(!this.holding)return;this.holding=false;this.holdTime=0;if(this.scraps.some(s=>s.mode==='orbit')){this.releaseIn=TUNE.anticipation;this.shotAngle=this.player.angle;this.emit('anticipation');}else this.emit('empty');}
 cancel(){this.holding=false;this.holdTime=0;this.releaseIn=0;this.move={x:0,y:0};}
 launch(){const p=this.player,loaded=this.scraps.filter(s=>s.mode==='orbit');if(!loaded.length)return;
 this.shots++;this.emit('launch',p.x,p.y,loaded.length);p.kick=1;
 loaded.forEach((s,i)=>{const spread=(i-(loaded.length-1)/2)*(this.build==='swarm'?.034:this.build==='lance'?.004:.017),angle=this.shotAngle+spread,offset=(i%3-1)*8;s.mode='shot';s.age=0;s.x=p.x+Math.cos(angle)*38-Math.sin(angle)*offset;s.y=p.y+Math.sin(angle)*38+Math.cos(angle)*offset;s.vx=Math.cos(angle)*(TUNE.shotSpeed*(this.build==='lance'?1.45:1)+i*13);s.vy=Math.sin(angle)*(TUNE.shotSpeed*(this.build==='lance'?1.45:1)+i*13);s.hit=[];s.reward=false;});
 if(this.build==='swarm'&&this.evolution===2){this.emit('cyclone');this.burst(p.x,p.y,32,'#b6ffe4');for(const e of this.enemies)if(!e.dead&&Math.hypot(e.x-p.x,e.y-p.y)<165){const a=Math.atan2(e.y-p.y,e.x-p.x);e.vx+=Math.cos(a)*300;e.vy+=Math.sin(a)*300;if(e.kind!=='elite'){e.shield=0;e.recover=1.8;}}}
 p.vx-=Math.cos(this.shotAngle)*95;p.vy-=Math.sin(this.shotAngle)*95;this.burst(p.x+Math.cos(p.angle)*40,p.y+Math.sin(p.angle)*40,14,'#b4ffe4',p.angle);
 }
 burst(x:number,y:number,n:number,color:string,dir?:number){for(let i=0;i<n;i++){const a=dir===undefined?this.random()*6.28:dir+(this.random()-.5)*2.8,speed=70+this.random()*330,life=.16+this.random()*.35;this.particles.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life,max:life,size:1+this.random()*3,color,kind:'spark',angle:a,spin:0});}if(this.particles.length>TUNE.maxParticles)this.particles.splice(0,this.particles.length-TUNE.maxParticles);}
 hit(e:Enemy,s:Scrap){if(e.dead||e.spawnIn>0||s.hit.includes(e.id))return;if(this.block(e,s))return;const incoming={x:s.vx,y:s.vy};s.hit.push(e.id);const a=Math.atan2(s.vy,s.vx),damage=this.player.upgrade?2:1;const beforeHp=e.hp;e.hp-=damage;if(e.kind==='elite'&&((beforeHp>16&&e.hp<=16)||(beforeHp>8&&e.hp<=8))){e.hp=beforeHp>16?16:8;this.counterCharge(e);if(this.stage===5){this.bossLocked=true;this.activeRelay++;this.mark('reactor-lock');for(let j=0;j<10;j++)this.addScrap(e.x+Math.cos(j)*55,e.y+Math.sin(j)*55,j%3,true);}} e.flash=.11;e.recoil=1;e.vx+=Math.cos(a)*(e.heavy?75:160);e.vy+=Math.sin(a)*(e.heavy?75:160);this.freeze=Math.max(this.freeze,TUNE.hitStop);this.shake=Math.max(this.shake,this.reduced?0:4);this.camera.x=-Math.cos(a)*4;this.camera.y=-Math.sin(a)*4;this.emit('hit',e.x,e.y,damage);this.burst(s.x,s.y,8,'#ffc16c',a);s.mode='loose';s.age=0;s.vx=-s.vx*.13;s.vy=-s.vy*.13;s.returnAt=this.module==='recycler'||(this.build==='lance'&&this.evolution===2)?this.time+.7:Infinity;
 if(e.hp<=0){e.dead=true;e.deathAt=this.time;this.kills++;this.freeze=TUNE.breakStop;this.shake=this.reduced?0:7;this.emit('break',e.x,e.y,e.heavy?2:1);this.burst(e.x,e.y,e.heavy?42:25,'#ffd9a0',a);const count=e.heavy?10:5;for(let i=0;i<count;i++){const ang=i/count*Math.PI*2,speed=100+this.random()*90;this.addScrap(e.x+Math.cos(ang)*15,e.y+Math.sin(ang)*15,i%3,true,Math.cos(ang)*speed,Math.sin(ang)*speed);}
 if(e.kind==='elite'&&this.stage===5)this.eliteDefeated=true;this.repairKills++;if(this.runTime>30&&this.repairKills>=8){this.repairKills=0;this.player.hp=Math.min(this.player.maxHp,this.player.hp+1);this.emit('repair');}this.particles.push({x:e.x,y:e.y,vx:0,vy:0,life:.35,max:.35,size:15,color:'#f4d19b',kind:'ring',angle:0,spin:0});
 for(let i=0;i<5;i++)this.particles.push({x:e.x+(this.random()-.5)*20,y:e.y+(this.random()-.5)*20,vx:(this.random()-.5)*35,vy:-10-this.random()*20,life:.65,max:.65,size:14+this.random()*12,color:'#78817b',kind:'smoke',angle:0,spin:0});
 }
 if(this.build==='lance'&&s.hit.length<(this.evolution===2?4:3)){s.mode='shot';s.vx=incoming.x*.9;s.vy=incoming.y*.9;}
 }
 update(dt:number){if(this.paused||this.encounter==='choice')return;if(this.encounter==='settle'||this.encounter==='equip'){this.settle(dt);return;}if(this.over){this.time+=dt;return;}this.time+=dt;for(const l of this.links)l.life-=dt;this.links=this.links.filter(l=>l.life>0);if(this.started&&!this.won)this.runTime+=dt;this.hurt=Math.max(0,this.hurt-dt);this.director(dt);if(this.over||this.encounter!=='combat')return;this.player.transform=Math.max(0,this.player.transform-dt);this.player.bump=Math.max(0,this.player.bump-dt);this.shake=Math.max(0,this.shake-dt*40);this.camera.x*=Math.exp(-dt*22);this.camera.y*=Math.exp(-dt*22);
 for(const q of this.particles){q.life-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=Math.exp(-dt*4);q.vy*=Math.exp(-dt*4);q.angle+=q.spin*dt;}this.particles=this.particles.filter(q=>q.life>0);
 if(this.freeze>0){this.freeze-=dt;return;}
 if(this.holding)this.holdTime+=dt;
 if(this.releaseIn>0){this.releaseIn-=dt;if(this.releaseIn<=0)this.launch();}
 const p=this.player,dx=this.aim.x-p.x,dy=this.aim.y-p.y;if(dx*dx+dy*dy>25)p.angle=Math.atan2(dy,dx);p.kick=Math.max(0,p.kick-dt*7);
 const mag=Math.hypot(this.move.x,this.move.y),speed=this.holding?175:230;const mx=mag>1?this.move.x/mag:this.move.x,my=mag>1?this.move.y/mag:this.move.y;
 p.vx+=(mx*speed-p.vx)*Math.min(1,dt*16);p.vy+=(my*speed-p.vy)*Math.min(1,dt*16);p.x=clamp(p.x+p.vx*dt,52,this.width-52);p.y=clamp(p.y+p.vy*dt,85,this.height-70);
 // Charged armor must not be starved by returning empty casings. Make room before
 // attraction; expelled blanks cool briefly so they cannot immediately refill it.
 const incoming=this.scraps.filter(s=>s.mode==='loose'&&(s.salvaged||s.reward)&&(this.holding||s.returnAt<=this.time)&&Math.hypot(s.x-p.x,s.y-p.y)<this.pullRadius);
 const carried=this.scraps.filter(s=>s.mode==='orbit'),spare=Math.max(0,this.capacity-carried.length),blanks=carried.filter(s=>!s.salvaged);
 for(let i=0;i<Math.min(blanks.length,Math.max(0,incoming.length-spare));i++){const s=blanks[i]!,a=Math.atan2(s.y-p.y,s.x-p.x);s.mode='loose';s.vx=Math.cos(a)*170;s.vy=Math.sin(a)*170;s.returnAt=Infinity;s.pickupAfter=this.time+1.2;}
 const orbitList=this.scraps.filter(s=>s.mode==='orbit');let orbitCount=orbitList.length;
 for(const s of this.scraps){s.age+=dt;s.angle+=s.spin*dt;
  if(s.mode==='orbit'){const list=orbitList,i=list.indexOf(s),a=this.time*(this.holding?2.6:1.3)+i/Math.max(1,list.length)*Math.PI*2;const r=(p.upgrade?59:51)+(i%2)*7-(this.holding?Math.min(this.holdTime,1)*7:0);s.orbit=a;const tx=p.x+Math.cos(a)*r,ty=p.y+Math.sin(a)*r;s.x+=(tx-s.x)*Math.min(1,dt*20);s.y+=(ty-s.y)*Math.min(1,dt*20);s.angle=a+.7;continue;}
  const ox=s.x,oy=s.y;
  if(s.mode==='shot'){s.x+=s.vx*dt;s.y+=s.vy*dt;for(const e of this.enemies)if(!e.dead&&!s.hit.includes(e.id)&&segmentDistance(e,{x:ox,y:oy},s)<e.r+5){this.hit(e,s);break;}if(s.mode==='shot')for(const r of this.relays)if(r.id===this.activeRelay&&!r.done&&segmentDistance(r,{x:ox,y:oy},s)<38){this.feedRelay(r,s);break;}if(s.age>.8||s.x<42||s.x>this.width-42||s.y<70||s.y>this.height-48){s.mode='loose';s.vx*=-.2;s.vy*=-.2;s.returnAt=this.module==='recycler'||(this.build==='lance'&&this.evolution===2)?this.time+.7:Infinity;s.x=clamp(s.x,45,this.width-45);s.y=clamp(s.y,75,this.height-50);}continue;}
  const distance=Math.hypot(p.x-s.x,p.y-s.y),auto=s.returnAt<=this.time,pulling=((this.holding&&distance<this.pullRadius)||auto)&&(s.pickupAfter??0)<=this.time;
  if(pulling&&orbitCount<this.capacity){const accel=700+200000/(distance+70),nx=(p.x-s.x)/(distance||1),ny=(p.y-s.y)/(distance||1);s.vx+=nx*accel*dt;s.vy+=ny*accel*dt;s.spin+=dt*4;
   if(distance<65){s.mode='orbit';s.vx=s.vy=0;orbitCount++;this.emit('snap',s.x,s.y,s.reward?2:1);if(s.reward){this.armor++;s.reward=false;if(this.armor>=TUNE.upgradeArmor&&!p.upgrade){p.upgrade=1;p.transform=1.2;this.upgrades.push(this.runTime);this.emit('upgrade',p.x,p.y,1);this.burst(p.x,p.y,32,'#b6ffe4');}}continue;}
  }
  const friction=pulling?2.1:4;s.vx*=Math.exp(-dt*friction);s.vy*=Math.exp(-dt*friction);s.x+=s.vx*dt;s.y+=s.vy*dt;
  if(s.x<40||s.x>this.width-40)s.vx*=-.45;if(s.y<65||s.y>this.height-45)s.vy*=-.45;s.x=clamp(s.x,40,this.width-40);s.y=clamp(s.y,65,this.height-45);
 }
 for(const e of this.enemies){if(this.won)continue;if(e.spawnIn>0){e.spawnIn=Math.max(0,e.spawnIn-dt);continue;}if(['shield','charger','elite'].includes(e.kind)){this.updateSpecial(e,dt);continue;}e.flash=Math.max(0,e.flash-dt);e.recoil=Math.max(0,e.recoil-dt*7);if(e.dead)continue;const ddx=p.x-e.x,ddy=p.y-e.y,d=Math.hypot(ddx,ddy);e.angle=Math.atan2(ddy,ddx);e.cool-=this.started?dt:0;
  if(e.charge>0){e.charge-=dt;if(e.charge<=0){e.vx+=Math.cos(e.angle)*(e.heavy?280:340);e.vy+=Math.sin(e.angle)*(e.heavy?280:340);e.cool=e.heavy?5.5:4.4;}}
  else if(e.cool<=0&&this.started&&d<460){e.charge=.65;this.emit('enemy-windup',e.x,e.y);}
  e.x=clamp(e.x+e.vx*dt,60,this.width-60);e.y=clamp(e.y+e.vy*dt,100,this.height-65);e.vx*=Math.exp(-dt*4);e.vy*=Math.exp(-dt*4);
  if(d<e.r+24&&p.bump<=0){p.bump=.6;p.vx+=Math.cos(e.angle)*320;p.vy+=Math.sin(e.angle)*320;this.damage();this.emit('bump');this.burst(p.x,p.y,8,'#e8e6cb');}
 }
 this.finishStep();
 }
 neutralizeShots(){for(const s of this.scraps)if(s.mode==='shot'){s.mode='loose';s.vx*=.12;s.vy*=.12;s.returnAt=this.time+TUNE.returnDelay;s.hit=[];}this.releaseIn=0;}
 autoFeed(){if(this.stage===5||this.enemies.some(e=>!e.dead)||this.encounter!=='combat'||this.over||this.won)return;
  // Only this sector's one-use energy. Keep the physical projectile, pickup XP,
  // old carried charge, and every surplus charge; never invent or borrow energy.
  for(const s of this.scraps){const r=this.relays[this.activeRelay];if(!r||r.done)break;if(!s.salvaged||s.earnedStage!==this.stage)continue;
   s.salvaged=false;this.links.push({x:s.x,y:s.y,tx:r.x,ty:r.y,life:.45});this.chargeRelay(r);this.emit('auto-charge',r.x,r.y);
  }
 }
 settle(dt:number){this.time+=dt;this.clearElapsed+=dt;this.transition-=dt;this.freeze=0;this.shake=Math.max(0,this.shake-dt*40);this.camera.x*=Math.exp(-dt*22);this.camera.y*=Math.exp(-dt*22);this.player.transform=Math.max(0,this.player.transform-dt);
  for(const r of this.relays)r.flash=Math.max(0,r.flash-dt);
  for(const q of this.particles){q.life-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=Math.exp(-dt*4);q.vy*=Math.exp(-dt*4);}this.particles=this.particles.filter(q=>q.life>0);
  for(const l of this.links)l.life-=dt;this.links=this.links.filter(l=>l.life>0);
  // Harmless recovery continues underneath the clear punctuation, with no hits.
  for(const s of this.scraps)if(s.mode==='loose'&&s.returnAt<=this.time){const dx=this.player.x-s.x,dy=this.player.y-s.y;s.x+=dx*Math.min(1,dt*8);s.y+=dy*Math.min(1,dt*8);if(Math.hypot(dx,dy)<65&&this.scraps.filter(q=>q.mode==='orbit').length<this.capacity){s.mode='orbit';s.vx=s.vy=0;if(s.reward){this.armor++;s.reward=false;if(this.armor>=TUNE.upgradeArmor&&!this.player.upgrade){this.player.upgrade=1;this.player.transform=1.2;this.upgrades.push(this.runTime);this.emit('upgrade',this.player.x,this.player.y,1);this.burst(this.player.x,this.player.y,32,'#b6ffe4');}}}}
  if(this.encounter==='settle'&&this.clearElapsed-dt<.16&&this.clearElapsed>=.16)this.emit('circuit-secured');
  if(this.transition>1e-8)return;
  if(this.encounter==='settle'&&this.choice){this.encounter='choice';this.mark('choice-open-'+this.choice);}else this.enterStage(this.stage+1);
 }
 mark(kind:string){this.milestones.push({kind,t:this.runTime});this.emit(kind);}
 director(dt:number){if(!this.started||this.won||this.over||this.encounter!=='combat')return;
 for(const r of this.relays)r.flash=Math.max(0,r.flash-dt);
 const alive=this.enemies.filter(e=>!e.dead).length;
 if(alive===0&&this.stage<5){if(this.quietSince<0)this.quietSince=this.time;if(this.time-this.quietSince>=TUNE.returnDelay)this.autoFeed();}else this.quietSince=-1;
 const all=this.relays.every(r=>r.done);
 if(this.stage<5&&all&&alive===0){this.stageTimes.push(this.runTime);this.cancel();this.lane=null;this.encounter='settle';this.clearElapsed=0;this.transition=.65;this.choice=[0,1,4].includes(this.stage)?(this.stage===0?1:this.stage===1?2:3):0;this.neutralizeShots();this.mark('stage-clear-'+this.stage);return;}
 if(this.stage>=3){const elapsed=this.runTime-this.encounterStart,cycle=Math.floor(elapsed/10);if(cycle>this.laneCycle&&this.runTime>=this.laneSuppressedUntil){this.laneCycle=cycle;const axis=this.stage===4?'y':'x';this.lane={axis,position:axis==='x'?this.width*(cycle%2?.7:.3):this.height*(cycle%2?.65:.38),width:28,telegraph:1.6,active:1.0};this.emit('enemy-windup');}const l=this.lane;if(l){if(l.telegraph>0)l.telegraph-=dt;else if(l.active>0){l.active-=dt;if(Math.abs(this.player[l.axis]-l.position)<l.width/2)this.damage();}else this.lane=null;}}
 if(all||this.stage===5||alive>=4)return;
 if(alive===0)this.nextArrival=Math.min(this.nextArrival,this.runTime+2.2);
 if(this.runTime<this.nextArrival)return;
 this.encounterSpawns++;const k:EnemyKind=this.stage===0?'basic':this.stage===1?(this.encounterSpawns%2?'shield':'basic'):this.stage===2?(this.encounterSpawns%2?'charger':'basic'):this.encounterSpawns%3===0?'shield':this.encounterSpawns%2?'charger':'basic';
 const a=this.encounterSpawns*2.4;this.spawn(k,.5+Math.cos(a)*.29,.48+Math.sin(a)*.25);this.nextArrival=this.runTime+9;
 }
 setupRelays(){const quota=[14,18,22,24,26,10];const layouts=[[[.72,.55]],[[.24,.37],[.78,.67]],[[.72,.28],[.29,.69]],[[.27,.3],[.75,.65],[.46,.47]],[[.26,.66],[.73,.29],[.7,.68]],[[.25,.36],[.76,.48],[.46,.72]]];this.relays=layouts[this.stage]!.map((p,id)=>({id,x:p[0]!*this.width,y:p[1]!*this.height,charge:0,max:quota[this.stage]!,done:false,flash:0}));this.activeRelay=0;}
 feedRelay(r:Relay,s:Scrap){if(r.id!==this.activeRelay||r.done||this.encounter!=='combat'||this.over||this.won)return;if(this.stage===5&&!this.bossLocked)return;s.mode='loose';s.age=0;s.vx*=-.16;s.vy*=-.16;s.returnAt=this.time+.45;if(!s.salvaged){this.emit('relay-empty',r.x,r.y);return;}s.salvaged=false;s.reward=false;this.chargeRelay(r);
 }
 chargeRelay(r:Relay){r.charge=Math.min(r.max,r.charge+1);r.flash=.13;this.emit('relay-hit',r.x,r.y);this.burst(r.x,r.y,3,'#a4edcf');if(r.charge>=r.max){r.done=true;this.mark('relay-'+this.stage+'-'+r.id);this.burst(r.x,r.y,32,'#b6ffe4');this.emit('relay-complete',r.x,r.y);if(this.stage===5){this.bossLocked=false;const boss=this.enemies.find(e=>e.kind==='elite'&&!e.dead);if(boss){this.counterCharge(boss);this.mark('reactor-counter');}}
 else{this.activeRelay++;this.lane=null;this.laneSuppressedUntil=this.runTime+7;for(const e of this.enemies)if(!e.dead){e.windup=0;e.dash=0;e.shellGate=0;e.shield=0;e.recover=3;e.cool=3;e.vx*=.1;e.vy*=.1;this.burst(e.x,e.y,8,'#b6ffe4');}this.mark('power-window');}}
 }
 choose(id:string){if(this.encounter!=='choice'||!this.optionIds.includes(id))return false;this.choices.push({stage:this.stage,id,t:this.runTime});this.mark('choose-'+id);if(this.choice===1){this.module=id;if(id==='guard'){this.player.maxHp=7;this.player.hp=7;}}
 else {if(id==='swarm'||id==='cyclone')this.build='swarm';else this.build='lance';this.evolution=this.choice===2?1:2;this.upgrade(this.evolution+1);}
 const carried=this.scraps.filter(s=>s.mode==='orbit').sort((a,b)=>Number(b.salvaged)-Number(a.salvaged));for(const s of carried.slice(this.capacity)){s.mode='loose';s.returnAt=Infinity;s.pickupAfter=this.time+1.2;}
 this.choice=0;this.encounter='equip';this.transition=.18;this.clearElapsed=0;this.player.transform=Math.max(this.player.transform,.35);this.emit('equip');return true;}
 enterStage(stage:number){this.quietSince=-1;this.links=[];this.neutralizeShots();this.stage=stage;this.phase=stage;this.encounter='combat';this.encounterStart=this.runTime;this.encounterSpawns=0;this.nextArrival=this.runTime+8;this.laneCycle=-1;this.lane=null;this.enemies=[];this.cancel();this.player.hp=Math.min(this.player.maxHp,this.player.hp+1);this.setupRelays();this.mark('stage-start-'+stage);
 const patterns:EnemyKind[][]=[[],['shield','basic','basic'],['charger','charger','basic'],['shield','charger','basic'],['elite','charger','shield'],['elite']];
 patterns[stage]!.forEach((kind,i)=>this.spawn(kind,[.26,.75,.65][i]!,[.25,.32,.67][i]!));this.eliteDefeated=false;this.bossLocked=stage===5;this.eliteSpawned=stage===5;if(this.stage===5){this.mark('elite-arrival');for(let j=0;j<12;j++)this.addScrap(this.width*.5+Math.cos(j)*75,this.height*.55+Math.sin(j)*75,j%3,true);}
 }
 spawn(kind:EnemyKind,nx:number,ny:number){let x=this.width*nx,y=this.height*ny;
  if(Math.hypot(x-this.player.x,y-this.player.y)<160){x=this.width-x;y=this.height-y;}
  const hp=kind==='elite'?24:kind==='shield'?10:kind==='charger'?8:4;
  const angle=Math.atan2(this.player.y-y,this.player.x-x),shield=kind==='shield'||kind==='elite';
  this.enemies.push({id:this.enemySerial++,x,y,home:{x,y},vx:0,vy:0,hp,max:hp,heavy:kind==='elite',r:kind==='elite'?43:kind==='shield'?29:25,angle,flash:0,recoil:0,charge:0,cool:1.6,dead:false,deathAt:0,kind,shield:shield?1:0,facing:angle,windup:0,dash:0,recover:0,spawnIn:1.1,guardStress:0,locked:angle});
  this.counters['spawn-'+kind]=(this.counters['spawn-'+kind]??0)+1;
 }
 upgrade(tier:number){const p=this.player;p.upgrade=tier;p.transform=1.2;p.hp=Math.min(p.maxHp,p.hp+2);this.upgrades.push(this.runTime);this.nextArrival=Math.max(this.nextArrival,this.runTime+4);this.emit('upgrade',p.x,p.y,tier);this.burst(p.x,p.y,32,'#b6ffe4');}
 damage(){if(this.encounter!=='combat'||this.runTime<30||this.hurt>0||this.over||this.won)return;this.hurt=1.8;this.player.hp--;this.emit('damage');if(this.player.hp<=0){this.over=true;this.runEndedAt=this.runTime;this.cancel();this.mark('failed');}}
 block(e:Enemy,s:Scrap){if((this.stage===5&&e.kind==='elite'&&this.bossLocked)||(e.shellGate??0)>0){s.hit.push(e.id);s.mode='loose';s.age=0;s.returnAt=Infinity;s.vx*=-.25;s.vy*=-.25;this.burst(s.x,s.y,4,'#ffc16c');this.emit('block',e.x,e.y);return true;}if(e.shield<=0||e.recover>0)return false;const from=Math.atan2(-s.vy,-s.vx),delta=Math.atan2(Math.sin(from-e.facing),Math.cos(from-e.facing));if(Math.abs(delta)>1.05)return false;
  s.hit.push(e.id);e.guardStress++;e.flash=.07;e.recoil=.5;s.mode='loose';s.age=0;s.returnAt=Infinity;s.vx*=-.32;s.vy*=-.32;this.emit('block',e.x,e.y);this.burst(s.x,s.y,4,'#92c8c7');
  if(e.guardStress>=8){if(e.kind==='elite'){this.counterCharge(e);return true;}e.guardStress=0;e.shield=0;e.recover=1.8;e.windup=0;e.dash=0;this.emit('shield-open',e.x,e.y);this.burst(e.x,e.y,14,'#ffc16c');}return true;
 }
 counterCharge(e:Enemy){e.guardStress=0;e.shield=1;e.recover=0;e.dash=0;e.windup=.95;e.shellGate=1.45;e.locked=Math.atan2(this.player.y-e.y,this.player.x-e.x);e.facing=e.locked;e.angle=e.locked;this.emit('shell-counter',e.x,e.y);this.emit('enemy-windup',e.x,e.y);this.burst(e.x,e.y,14,'#d6b26c');}
 updateSpecial(e:Enemy,dt:number){e.shellGate=Math.max(0,(e.shellGate??0)-dt);e.flash=Math.max(0,e.flash-dt);e.recoil=Math.max(0,e.recoil-dt*7);if(e.dead)return;
  const p=this.player,dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy),target=Math.atan2(dy,dx),guard=e.kind==='shield'||e.kind==='elite';
  if(e.recover>0){e.recover=Math.max(0,e.recover-dt);e.shield=0;e.vx*=Math.exp(-dt*7);e.vy*=Math.exp(-dt*7);if(e.recover===0){e.shield=guard?1:0;e.cool=1.3;e.guardStress=0;}}
  else if(e.dash>0){e.dash-=dt;if(e.dash<=0){e.recover=e.kind==='elite'?1.8:1.3;e.shield=0;this.emit('exposed',e.x,e.y);}}
  else if(e.windup>0){e.windup-=dt;e.vx*=Math.exp(-dt*12);e.vy*=Math.exp(-dt*12);if(e.windup<=0){e.dash=guard?.48:.55;const speed=e.kind==='elite'?460:e.kind==='shield'?260:490;e.vx=Math.cos(e.locked)*speed;e.vy=Math.sin(e.locked)*speed;this.emit('dash',e.x,e.y);}}
  else {const delta=Math.atan2(Math.sin(target-e.facing),Math.cos(target-e.facing));e.facing+=clamp(delta,-dt*(guard?1.0:3),dt*(guard?1.0:3));e.angle=e.facing;e.cool-=dt;const speed=guard?34:65;if(d>170){e.vx+=(Math.cos(e.facing)*speed-e.vx)*dt*4;e.vy+=(Math.sin(e.facing)*speed-e.vy)*dt*4;}else{e.vx*=Math.exp(-dt*4);e.vy*=Math.exp(-dt*4);}if(e.cool<=0){e.locked=e.facing;e.windup=e.kind==='elite'?.95:.8;e.cool=3.5;this.emit('enemy-windup',e.x,e.y);}}
  e.x=clamp(e.x+e.vx*dt,60,this.width-60);e.y=clamp(e.y+e.vy*dt,100,this.height-65);
  if((e.x<=60||e.x>=this.width-60||e.y<=100||e.y>=this.height-65)&&e.dash>0){e.dash=0;e.recover=1.3;e.shield=0;}
  if(d<e.r+24&&p.bump<=0){p.bump=.6;p.vx+=Math.cos(target)*320;p.vy+=Math.sin(target)*320;this.damage();this.emit('bump');this.burst(p.x,p.y,8,'#e8e6cb');}
 }
 finishStep(){this.enemies=this.enemies.filter(e=>!e.dead||this.time-e.deathAt<.8);if(this.particles.length>TUNE.maxParticles)this.particles.splice(0,this.particles.length-TUNE.maxParticles);
  this.peak.scraps=Math.max(this.peak.scraps,this.scraps.length);this.peak.particles=Math.max(this.peak.particles,this.particles.length);this.peak.enemies=Math.max(this.peak.enemies,this.enemies.filter(e=>!e.dead).length);
  if(this.eliteDefeated&&!this.won){this.won=true;this.winTime=this.time;this.runEndedAt=this.runTime;this.cancel();this.mark('complete');}
  if(this.won){this.resultDelay=this.time-this.winTime;if(this.resultDelay>2)this.over=true;}
 }
 snapshot(){return {clearElapsed:this.clearElapsed,transition:this.transition,links:this.links.map(l=>({...l})),stage:this.stage,encounter:this.encounter,choice:this.choice,optionIds:this.optionIds,build:this.build,evolution:this.evolution,module:this.module,relays:this.relays.map(r=>({...r})),activeRelay:this.activeRelay,bossLocked:this.bossLocked,lane:this.lane?{...this.lane}:null,choices:[...this.choices],stageTimes:[...this.stageTimes],capacity:this.capacity,pullRadius:this.pullRadius,runTime:this.runTime,phase:this.phase,over:this.over,hurt:this.hurt,upgrades:[...this.upgrades],milestones:[...this.milestones],counters:{...this.counters},peak:{...this.peak},recycled:this.recycled,runEndedAt:this.runEndedAt,time:this.time,player:{...this.player},holding:this.holding,paused:this.paused,releaseIn:this.releaseIn,armor:this.armor,kills:this.kills,shots:this.shots,won:this.won,scraps:this.scraps.map(s=>({...s})),enemies:this.enemies.map(e=>({...e})),events:[...this.events],particles:this.particles.length};}
}

