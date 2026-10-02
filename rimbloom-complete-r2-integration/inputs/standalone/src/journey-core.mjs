import {STAGES,DURATION,packet,rails,thorns,thornPhase,crownLayout} from './journey-content.mjs';

export const W=540,H=760,B={l:30,r:510,t:112,b:700},ROUND=DURATION;
export const FEEL=Object.freeze({speed:1450,dash:.62,recovery:.23,range:899,radius:11});
export const ENEMY_CAP=26,FX_CAP=72;
export const RULES=Object.freeze({softPulse:82,relayPulse:125,multiplierCap:5,multiBankBonus:25,safeLandingBonus:25,safeLandingRadius:70});

export function random(seed){let x=seed>>>0||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};}
export function swept(ax,ay,bx,by,cx,cy,r){const dx=bx-ax,dy=by-ay,d=dx*dx+dy*dy,t=d?Math.max(0,Math.min(1,((cx-ax)*dx+(cy-ay)*dy)/d)):0;return(ax+dx*t-cx)**2+(ay+dy*t-cy)**2<=r*r;}
function contact(ax,ay,bx,by,e,r){
  const dx=bx-ax,dy=by-ay,fx=ax-e.x,fy=ay-e.y,a=dx*dx+dy*dy,c=fx*fx+fy*fy-r*r;
  if(c<=0)return fx*dx+fy*dy>=0?null:0;if(a===0)return null;
  const b=2*(fx*dx+fy*dy),d=b*b-4*a*c;if(d<0)return null;
  const t=(-b-Math.sqrt(d))/(2*a);return t>=0&&t<=1?t:null;
}
export function reflectedPath(x,y,dx,dy,length=FEEL.range,mirrors=[]){
  const n=Math.hypot(dx,dy);if(!Number.isFinite(n)||n<1e-9)return[[x,y]];dx/=n;dy/=n;
  const points=[[x,y]];let left=length;
  for(let i=0;i<10&&left>1e-7;i++){
    const tx=dx>0?(B.r-FEEL.radius-x)/dx:dx<0?(B.l+FEEL.radius-x)/dx:Infinity;
    const ty=dy>0?(B.b-FEEL.radius-y)/dy:dy<0?(B.t+FEEL.radius-y)/dy:Infinity;
    const hit=mirrorContact(x,y,dx,dy,mirrors),mx=hit?.distance??Infinity;
    const distance=Math.max(0,Math.min(left,tx,ty,mx));x+=dx*distance;y+=dy*distance;points.push([x,y]);left-=distance;
    if(Math.min(tx,ty,mx)<=distance+1e-7){
      if(mx<Math.min(tx,ty)+1e-7){if(hit.axis==='x')dx=-dx;else dy=-dy;}
      else{if(tx<=ty+1e-7)dx=-dx;if(ty<=tx+1e-7)dy=-dy;}
    }else break;
  }return points;
}
export function create(seed=7007,route='normal'){
  const g={seed:seed>>>0,rng:random(seed),status:'ready',t:0,
    p:{x:270,y:550,vx:0,vy:0,r:FEEL.radius,dash:0,cool:0,inv:0,angle:-Math.PI/2,charge:false,chain:0,dashBanks:0},
    life:3,score:0,kills:0,banks:0,bestChain:0,shots:0,enemies:[],fx:[],events:[],nextId:1,spawnAt:4,band:0,shake:0,lastMessage:'',messageTime:0,
    armorsBroken:0,relayKills:0,multiBankKills:0,safeLandings:0,skillBonus:0,formationCount:0,formations:{},milestone:0,milestoneTime:0,
    mode:'journey',route:['normal','wild','assist'].includes(route)?route:'normal',stage:0,stageAt:0,stageBanner:3,stageKills:0,stageLog:[],mirrors:[],hazards:[],circuit:0,seals:0,circuitAt:null,heals:0,damage:0};
  [[170,310],[230,280],[300,295],[345,340]].forEach(([x,y])=>spawn(g,'soft',x,y));return g;
}
export function spawn(g,type,x,y){
  if(g.enemies.length>=ENEMY_CAP)return null;
  const r=type==='armor'?24:type==='relay'?21:19,side=Math.floor(g.rng()*4);
  if(x===undefined){x=side<2?(side===0?B.l+38:B.r-38):B.l+40+g.rng()*(B.r-B.l-80);y=side>=2?(side===2?B.t+42:B.b-42):B.t+50+g.rng()*(B.b-B.t-100);if(Math.hypot(x-g.p.x,y-g.p.y)<115){x=B.l+B.r-g.p.x;y=B.t+B.b-g.p.y;}}
  if(!Number.isFinite(x)||!Number.isFinite(y))return null;
  const e={id:g.nextId++,type,x,y,r,phase:g.rng()*6.28,born:g.t,flash:0};g.enemies.push(e);return e;
}
export function launch(g,dx,dy){
  const n=Math.hypot(dx,dy);if(g.status!=='playing'||g.p.dash>0||g.p.cool>0||!Number.isFinite(dx)||!Number.isFinite(dy)||!Number.isFinite(n)||n<1)return false;
  const p=g.p;p.vx=dx/n*FEEL.speed;p.vy=dy/n*FEEL.speed;p.angle=Math.atan2(dy,dx);p.dash=FEEL.dash;p.charge=false;p.chain=0;p.dashBanks=0;g.shots++;g.events.push({type:'dash',x:p.x,y:p.y});return true;
}
function addFX(g,f){g.fx.push(f);if(g.fx.length>FX_CAP)g.fx.splice(0,g.fx.length-FX_CAP);}
function burst(g,e,charged){
  g.kills++;g.p.chain++;g.bestChain=Math.max(g.bestChain,g.p.chain);if(e.seal){g.seals++;g.events.push({type:'seal',count:g.seals});}
  const skill=g.p.dashBanks>=2?RULES.multiBankBonus:0;
  const points=(e.type==='armor'?120:e.type==='relay'?80:60)*Math.min(RULES.multiplierCap,g.p.chain)+(charged?40:0)+skill;
  g.score+=points;g.skillBonus+=skill;if(skill)g.multiBankKills++;if(e.type==='armor')g.armorsBroken++;if(e.type==='relay')g.relayKills++;
  addFX(g,{type:'burst',x:e.x,y:e.y,life:.7,total:.7,armor:e.type==='armor',relay:e.type==='relay',points,chain:g.p.chain});
  g.events.push({type:'hit',x:e.x,y:e.y,chain:g.p.chain,armor:e.type==='armor',relay:e.type==='relay'});g.shake=Math.min(4,g.shake+1.8);
  if([3,5,8,12,18].includes(g.p.chain)){g.milestone=g.p.chain;g.milestoneTime=.65;g.events.push({type:'chain',chain:g.p.chain});}
  const radius=e.type==='relay'?RULES.relayPulse:charged?RULES.softPulse:0;
  if(radius){
    if(e.type==='relay')addFX(g,{type:'pulse',x:e.x,y:e.y,life:.35,total:.35,radius});
    for(const other of g.enemies){if(other!==e&&other.type!=='armor'&&!other.dead&&Math.hypot(other.x-e.x,other.y-e.y)<radius){other.dead=true;burst(g,other,false);}}
  }
}
export function step(g,dt){
  if(g.status!=='playing'||!Number.isFinite(dt)||dt<=0)return;
  let remaining=Math.min(.25,dt);const events=[];
  while(remaining>1e-9&&g.status==='playing'){
    const deadline=g.stage===6?Math.min(ROUND,g.stageAt+STAGES[6].seconds):ROUND;
    const slice=Math.min(1/120,remaining,deadline-g.t);if(slice<=1e-9){g.t=deadline;g.status='lost';g.lastMessage='timeout';events.push({type:'end'});break;}
    tick(g,slice);events.push(...g.events);remaining-=slice;
  }g.events=events;
}
function tick(g,dt){
  g.t+=dt;const p=g.p;g.events=[];g.shake=Math.max(0,g.shake-dt*15);g.messageTime=Math.max(0,g.messageTime-dt);g.milestoneTime=Math.max(0,g.milestoneTime-dt);p.cool=Math.max(0,p.cool-dt);p.inv=Math.max(0,p.inv-dt);g.fx.forEach(f=>f.life-=dt);g.fx=g.fx.filter(f=>f.life>0);
  journeyTick(g,dt);
  if(p.dash>0){
    let left=Math.min(dt,p.dash);p.dash=Math.max(0,p.dash-dt);let blocked=false;
    for(let segment=0;segment<5&&left>1e-9&&!blocked;segment++){
      const tx=p.vx>0?(B.r-p.r-p.x)/p.vx:p.vx<0?(B.l+p.r-p.x)/p.vx:Infinity;
      const ty=p.vy>0?(B.b-p.r-p.y)/p.vy:p.vy<0?(B.t+p.r-p.y)/p.vy:Infinity;
      const mirror=mirrorContact(p.x,p.y,p.vx,p.vy,g.mirrors),mt=mirror?.distance??Infinity;
      const travel=Math.max(0,Math.min(left,tx,ty,mt)),ax=p.x,ay=p.y,bx=ax+p.vx*travel,by=ay+p.vy*travel;
      const hits=g.enemies.filter(e=>!e.dead).map(e=>({e,t:contact(ax,ay,bx,by,e,e.r+p.r-3)})).filter(h=>h.t!==null).sort((a,b)=>a.t-b.t);
      for(const h of hits){
        const e=h.e;if(e.dead)continue;
        if(e.type==='armor'&&!p.charge){p.x=ax+(bx-ax)*h.t;p.y=ay+(by-ay)*h.t;e.flash=.22;p.dash=0;p.inv=Math.max(p.inv,.35);g.lastMessage='armor';g.messageTime=1.5;g.events.push({type:'shield',x:e.x,y:e.y});blocked=true;break;}
        e.dead=true;burst(g,e,p.charge);
      }
      if(blocked)break;p.x=bx;p.y=by;left-=travel;
      if(Math.min(tx,ty,mt)<=travel+1e-9){
        if(mt<Math.min(tx,ty)+1e-9){if(mirror.axis==='x')p.vx=-p.vx;else p.vy=-p.vy;}
        else{if(tx<=ty+1e-9)p.vx=-p.vx;if(ty<=tx+1e-9)p.vy=-p.vy;}
        p.charge=true;p.dashBanks++;g.banks++;addFX(g,{type:'rim',x:p.x,y:p.y,life:.36,total:.36});g.events.push({type:'bank',x:p.x,y:p.y});
      }
    }
    p.angle=Math.atan2(p.vy,p.vx);
    if(p.dash===0){
      p.cool=FEEL.recovery;p.inv=Math.max(p.inv,.2);p.vx=p.vy=0;
      const safe=p.chain>0&&g.enemies.every(e=>e.dead||Math.hypot(e.x-p.x,e.y-p.y)>RULES.safeLandingRadius)&&g.hazards.every(h=>thornPhase(g,h)<1.5||thornPhase(g,h)>3.5||Math.hypot(p.x-h.x,p.y-h.y)>h.r+p.r);
      if(safe){g.safeLandings++;g.score+=RULES.safeLandingBonus;g.skillBonus+=RULES.safeLandingBonus;addFX(g,{type:'setup',x:p.x,y:p.y,life:.35,total:.35,points:RULES.safeLandingBonus});}
    }
  }
  for(const e of g.enemies){
    e.flash=Math.max(0,e.flash-dt);const dx=p.x-e.x,dy=p.y-e.y,n=Math.hypot(dx,dy)||1;
    const factor=g.route==='assist'?.7:g.route==='wild'?1.25:1;
    if(e.seal){e.x=e.homeX+Math.sin((g.t-g.stageAt)*.7+e.phase)*7;e.y=e.homeY+Math.cos((g.t-g.stageAt)*.7+e.phase)*7;}
    else if(e.type==='skater'){const turn=Math.sin(g.t*.9+e.phase)*1.6,speed=44*factor;e.x+=(dx/n*Math.cos(turn)-dy/n*Math.sin(turn))*speed*dt;e.y+=(dy/n*Math.cos(turn)+dx/n*Math.sin(turn))*speed*dt;}
    else{const speed=(e.type==='armor'?17+g.band*4:21+g.band*5)*factor;e.x+=dx/n*speed*dt;e.y+=dy/n*speed*dt;}
    e.x=Math.max(58,Math.min(482,e.x));e.y=Math.max(140,Math.min(672,e.y));
    if(!e.dead&&g.t-e.born>.9&&p.dash===0&&p.inv===0&&Math.hypot(p.x-e.x,p.y-e.y)<p.r+e.r-3){hurt(g);e.x-=dx/n*65;e.y-=dy/n*65;}
  }
  g.enemies=g.enemies.filter(e=>!e.dead);p.x=Math.max(B.l+p.r,Math.min(B.r-p.r,p.x));p.y=Math.max(B.t+p.r,Math.min(B.b-p.r,p.y));
  if(g.stage===6&&g.seals>=12&&g.status==='playing'){g.status='won';g.stageLog.push({stage:6,time:g.t-g.stageAt,kills:g.kills-g.stageKills});g.events.push({type:'clear'},{type:'end'});}
  const deadline=g.stage===6?Math.min(ROUND,g.stageAt+STAGES[6].seconds):ROUND;
  if(g.t>=deadline-1e-9&&g.status==='playing'){g.t=deadline;g.status='lost';g.lastMessage='timeout';g.events.push({type:'end'});}
}

function hurt(g){
  g.life--;g.damage++;g.p.inv=g.route==='assist'?2.5:1.7;g.shake=5;g.events.push({type:'hurt'});g.lastMessage='hurt';g.messageTime=1.4;
  if(g.life<=0){g.status='lost';g.events.push({type:'end'});}
}
function mirrorContact(x,y,dx,dy,mirrors){
  let result=null;
  for(const m of mirrors){
    const l=m.x-FEEL.radius,r=m.x+m.w+FEEL.radius,t=m.y-FEEL.radius,b=m.y+m.h+FEEL.radius;
    const entryX=dx>0?(l-x)/dx:dx<0?(r-x)/dx:-Infinity,exitX=dx>0?(r-x)/dx:dx<0?(l-x)/dx:Infinity;
    const entryY=dy>0?(t-y)/dy:dy<0?(b-y)/dy:-Infinity,exitY=dy>0?(b-y)/dy:dy<0?(t-y)/dy:Infinity;
    if(dx===0&&(x<l||x>r)||dy===0&&(y<t||y>b))continue;
    const distance=Math.max(entryX,entryY),exit=Math.min(exitX,exitY);
    if(distance>=-1e-9&&exit>=distance&&(!result||distance<result.distance))result={distance:Math.max(0,distance),axis:entryX>entryY?'x':'y'};
  }return result;
}
function safeSpawn(g,target){
  let {x,y}=target;
  if(Math.hypot(x-g.p.x,y-g.p.y)<100){x=B.l+B.r-x;y=B.t+B.b-y;}
  if(Math.hypot(x-g.p.x,y-g.p.y)<100)return null;
  for(const m of g.mirrors)if(x>m.x-36&&x<m.x+m.w+36&&y>m.y-36&&y<m.y+m.h+36)x=x<270?m.x-40:m.x+m.w+40;
  const e=spawn(g,target.type,x,y);if(e&&target.seal)Object.assign(e,{seal:true,homeX:x,homeY:y});return e;
}
function enterStage(g){
  const stage=STAGES[g.stage];g.stageAt=g.t;g.stageKills=g.kills;g.band=stage.band;g.enemies=[];g.fx=[];g.spawnAt=g.t+1.5;g.stageBanner=3;g.lastMessage=stage.hint;g.messageTime=4;
  g.mirrors=rails(g.stage,g.seed%2);g.hazards=thorns(g.stage,g.seed%2);
  // A new rail cannot form through the settled player.
  for(const m of g.mirrors)if(g.p.x>m.x-16&&g.p.x<m.x+m.w+16&&g.p.y>m.y-16&&g.p.y<m.y+m.h+16){g.p.x=m.x-20;}
  if(g.route!=='wild'&&g.life<3){g.life++;g.heals++;g.events.push({type:'heal'});}
  g.p.inv=Math.max(1.5,g.p.inv);g.events.push({type:g.stage===6?'finale':'wave'});
  if(g.stage===6){g.circuitAt=g.t;spawnCrown(g);}
}
function spawnCrown(g){
  // Guaranteed seal availability: non-seals are cleared and only four seals enter.
  g.enemies=[];
  for(const target of crownLayout(g)){
    let {x,y}=target;if(Math.hypot(x-g.p.x,y-g.p.y)<80){x=x<270?65:475;y=y<400?160:650;}
    const e=spawn(g,'armor',x,y);Object.assign(e,{seal:true,homeX:x,homeY:y});
    safeSpawn(g,{type:'relay',x:Math.max(66,Math.min(474,x+(x<270?62:-62))),y});
  }
  g.events.push({type:'circuit',circuit:g.circuit});g.lastMessage='crown';g.messageTime=4;
}
function journeyTick(g,dt){
  g.stageBanner=Math.max(0,g.stageBanner-dt);
  const stageRule=STAGES[g.stage],mastered=g.kills-g.stageKills>=stageRule.quota&&g.t-g.stageAt>=stageRule.seconds*.86;
  if(g.stage<6&&(g.t-g.stageAt>=stageRule.seconds||mastered)&&g.p.dash<=0){
    g.stageLog.push({stage:g.stage,time:g.t-g.stageAt,kills:g.kills-g.stageKills});g.stage++;enterStage(g);
  }
  if(g.stage===6&&g.seals===(g.circuit+1)*4&&g.circuit<2&&g.p.dash<=0){
    if(g.circuitAt===null)g.circuitAt=g.t;
    if(g.t-g.circuitAt>1.4){g.circuit++;g.circuitAt=g.t;g.p.inv=Math.max(1.2,g.p.inv);spawnCrown(g);}
  }else if(g.stage===6&&g.seals<(g.circuit+1)*4)g.circuitAt=null;
  const elapsed=g.t-g.stageAt,stage=STAGES[g.stage],breath=g.stage<6&&elapsed%24>19;
  if(g.t>=g.spawnAt){
    if(!breath&&g.enemies.length<(g.route==='assist'?15:23)){
      const set=packet(g);g.formationCount++;g.formations[set.name]=(g.formations[set.name]||0)+1;
      for(const target of set.targets)safeSpawn(g,target);
    }
    g.spawnAt=g.t+stage.pace*(g.route==='assist'?1.25:g.route==='wild'?.85:1);
  }
  for(const h of g.hazards){const phase=thornPhase(g,h);if(phase>=1.5&&phase<3.5&&g.p.dash===0&&g.p.inv===0&&Math.hypot(g.p.x-h.x,g.p.y-h.y)<h.r+g.p.r)hurt(g);}
}
