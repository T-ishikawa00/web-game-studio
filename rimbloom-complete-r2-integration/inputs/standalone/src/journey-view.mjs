import {W,H,B,ROUND,RULES} from './journey-core.mjs';
import {STAGES,thornPhase} from './journey-content.mjs';
const circle=(ctx,x,y,r,fill,stroke)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}};
function polygon(ctx,x,y,r,n,rot=0){ctx.beginPath();for(let i=0;i<n;i++){const a=rot+i*Math.PI*2/n,xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}ctx.closePath();}
function bloom(ctx,e,clock){
  const armor=e.type==='armor',relay=e.type==='relay',pulse=1+Math.sin(clock*2.8+e.phase)*.035;
  ctx.save();ctx.translate(e.x,e.y);ctx.scale(pulse,pulse);ctx.shadowBlur=armor?15:9;ctx.shadowColor=armor?'#ffbc7970':relay?'#9debd570':'#f0889850';ctx.lineWidth=1.5;
  const fill=ctx.createRadialGradient(-5,-7,2,0,0,e.r+12);fill.addColorStop(0,e.flash>0?'#eadaff':armor?'#e8ae74':relay?'#cff1d5':'#dd96b8');fill.addColorStop(.5,armor?'#b97650':relay?'#66bbac':'#b86199');fill.addColorStop(1,armor?'#593544':relay?'#354d67':'#522e69');
  if(armor){
    polygon(ctx,0,0,e.r+4,6,Math.PI/6);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle='#f2c594';ctx.stroke();polygon(ctx,0,0,e.r-4,6,Math.PI/6);ctx.strokeStyle='#ffd6b555';ctx.stroke();
    for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*10,Math.sin(a)*10);ctx.lineTo(Math.cos(a)*(e.r-2),Math.sin(a)*(e.r-2));ctx.stroke();}
  }else{
    const count=relay?3:5;for(let i=0;i<count;i++){const a=i*Math.PI*2/count+e.phase*.08;ctx.save();ctx.rotate(a);ctx.beginPath();ctx.ellipse(0,-e.r*.58,relay?11:9,e.r*.69,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=relay?'#b4fce2ad':'#edb6d86b';ctx.stroke();ctx.restore();}
    ctx.shadowBlur=0;if(relay){ctx.setLineDash([3,5]);circle(ctx,0,0,31+Math.sin(clock*4)*2,null,'#a8f1d56b');ctx.setLineDash([]);for(let i=0;i<3;i++){const a=i*Math.PI*2/3;circle(ctx,Math.cos(a)*29,Math.sin(a)*29,2,'#fae1a5');}}
    else for(let i=0;i<3;i++){const a=e.phase+i*2.1;ctx.beginPath();ctx.moveTo(Math.cos(a)*15,Math.sin(a)*15);ctx.quadraticCurveTo(Math.cos(a+.4)*30,Math.sin(a+.4)*30,Math.cos(a)*27,Math.sin(a)*27);ctx.strokeStyle='#da8cbc55';ctx.lineWidth=1;ctx.stroke();}
  }
  ctx.shadowBlur=0;circle(ctx,0,0,armor?11:8,'#302738','#f5dbdf75');circle(ctx,-2.5,-2,2.2,'#ffe9d6');circle(ctx,3,-2,1.4,'#f4c7b3');ctx.restore();
}
function dart(ctx,p){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.shadowColor=p.charge?'#ffd18b':'#9aeacb';ctx.shadowBlur=p.dash>0?22:12;const grad=ctx.createLinearGradient(-14,0,24,0);grad.addColorStop(0,'#63bbbe');grad.addColorStop(.7,'#d5ffea');grad.addColorStop(1,'#fffce7');ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(-14,-12);ctx.lineTo(-7,0);ctx.lineTo(-14,12);ctx.closePath();ctx.fillStyle=grad;ctx.fill();ctx.lineWidth=1;ctx.strokeStyle='#eeffeb';ctx.stroke();ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(-1,-3);ctx.lineTo(13,0);ctx.lineTo(-1,3);ctx.fillStyle='#d5f7ff';ctx.fill();ctx.restore();}
export function render(ctx,g,v){
  const {clock,reduced,text,lang}=v;ctx.clearRect(0,0,W,H);const bg=ctx.createRadialGradient(270,380,35,270,400,480);bg.addColorStop(0,'#283457');bg.addColorStop(.55,'#19233e');bg.addColorStop(1,'#10172d');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.save();const shake=reduced?0:g.shake;ctx.translate(Math.sin(clock*83)*shake,Math.cos(clock*67)*shake*.6);
  ctx.save();ctx.beginPath();ctx.roundRect(B.l-5,B.t-7,490,602,35);ctx.clip();for(let i=0;i<5;i++){ctx.lineWidth=1;ctx.strokeStyle=`rgba(110,160,185,${.06-i*.008})`;ctx.beginPath();ctx.ellipse(270,415,105+i*82,152+i*89,0,0,Math.PI*2);ctx.stroke();}for(let i=0;i<36;i++){circle(ctx,B.l+((i*103.13)%480),B.t+((i*67.17)%580),i%7===0?2:1,`rgba(163,197,216,${.08+.06*Math.sin(clock*.7+i)})`);}ctx.restore();
  ctx.lineWidth=6;ctx.strokeStyle='#071426';ctx.beginPath();ctx.roundRect(B.l-6,B.t-8,492,608,36);ctx.stroke();ctx.lineWidth=2;ctx.strokeStyle='#8097c062';ctx.stroke();ctx.lineWidth=1;ctx.strokeStyle='#bddde04d';ctx.beginPath();ctx.roundRect(B.l-3,B.t-5,486,602,33);ctx.stroke();
  for(let i=0;i<24;i++){const x=i<12?B.l:B.r,y=B.t+24+(i%12)*49;ctx.strokeStyle=i%3===0?'#a6ead66a':'#829ac43b';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-3,y-6);ctx.lineTo(x-3,y+6);ctx.stroke();}
  // Hazard previews are behind targets and aim; timing is simulation time.
  for(const h of g.hazards){const phase=thornPhase(g,h),warn=phase<1.5,active=phase>=1.5&&phase<3.5;
    ctx.lineWidth=active?2.5:1.5;ctx.strokeStyle=active?'#ff997e':warn?'#f3c990':'#879bb544';ctx.setLineDash(active?[]:[4,6]);circle(ctx,h.x,h.y,h.r,null,ctx.strokeStyle);ctx.setLineDash([]);
    if(active){circle(ctx,h.x,h.y,h.r,'#d35a6630');for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.moveTo(h.x+Math.cos(a)*(h.r-8),h.y+Math.sin(a)*(h.r-8));ctx.lineTo(h.x+Math.cos(a)*(h.r+5),h.y+Math.sin(a)*(h.r+5));ctx.stroke();}}
    if(warn){ctx.beginPath();ctx.arc(h.x,h.y,h.r+5,-Math.PI/2,-Math.PI/2+phase/1.5*Math.PI*2);ctx.strokeStyle='#ffdfab';ctx.stroke();}
  }
  for(const m of g.mirrors){ctx.fillStyle='#ddc28e30';ctx.strokeStyle='#f2d294';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(m.x,m.y,m.w,m.h,3);ctx.fill();ctx.stroke();}
  if(g.stage===6){ctx.strokeStyle='#eec78e32';ctx.lineWidth=1;circle(ctx,270,404,106,null,ctx.strokeStyle);ctx.setLineDash([4,9]);circle(ctx,270,404,124,null,ctx.strokeStyle);ctx.setLineDash([]);ctx.font='10px "Segoe UI",sans-serif';ctx.fillStyle='#eec78e77';ctx.textAlign='center';ctx.fillText(lang==='ja'?'冠':'C R O W N',270,407);}
  for(const e of g.enemies){if(e.type==='relay'&&!reduced){const linked=g.enemies.filter(o=>o!==e&&o.type!=='armor'&&Math.hypot(o.x-e.x,o.y-e.y)<RULES.relayPulse).slice(0,3);ctx.lineWidth=1;ctx.strokeStyle='#96e3c527';ctx.setLineDash([2,7]);for(const o of linked){ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(o.x,o.y);ctx.stroke();}ctx.setLineDash([]);}circle(ctx,e.x+4,e.y+7,e.r,'#070c1c48');bloom(ctx,e,clock);
    if(e.type==='skater'){ctx.strokeStyle='#ebbadb';ctx.lineWidth=2;for(const shift of [-5,5]){ctx.beginPath();ctx.moveTo(e.x-9,e.y+shift);ctx.lineTo(e.x+9,e.y+shift);ctx.stroke();}}
    if(e.seal){ctx.strokeStyle='#ffe1a3';ctx.lineWidth=2;circle(ctx,e.x,e.y,e.r+9,null,'#ffe1a3');ctx.fillStyle='#fff0cc';ctx.font='bold 12px "Segoe UI",sans-serif';ctx.textAlign='center';ctx.fillText('◆',e.x,e.y+4);}
  }
  const p=g.p,trail=v.trail;if(p.dash>0){trail.push({x:p.x,y:p.y,charge:p.charge});if(trail.length>(reduced?4:17))trail.shift();}else if(trail.length)trail.shift();
  if(trail.length>1){ctx.beginPath();trail.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.lineWidth=reduced?4:13;ctx.lineCap='round';ctx.strokeStyle=p.charge?'#f9c37d65':'#9ef3d953';ctx.stroke();ctx.lineWidth=3;ctx.strokeStyle=p.charge?'#ffe4b1':'#c6ffeb';ctx.stroke();}
  if(v.path){ctx.setLineDash([6,9]);ctx.lineWidth=1.7;for(let i=1;i<v.path.length;i++){ctx.strokeStyle=i===1?'#befff0b0':'#ffdf97c0';ctx.beginPath();ctx.moveTo(...v.path[i-1]);ctx.lineTo(...v.path[i]);ctx.stroke();}ctx.setLineDash([]);const end=v.path.at(-1);circle(ctx,...end,14,null,'#e3f3dadd');circle(ctx,...end,3,'#d2ffe5');if(v.path.length>2)circle(ctx,...v.path[1],8,'#fdd29b33','#f9d0a6');if(v.aim)circle(ctx,v.aim.x,v.aim.y,16,null,'#b4ede575');}
  dart(ctx,p);if(p.inv>0){ctx.lineWidth=2;circle(ctx,p.x,p.y,27+Math.sin(clock*5)*2,null,'#aeead695');}if(p.cool>0){ctx.strokeStyle='#94e7cf';ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,24,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-p.cool/.23));ctx.stroke();}
  for(const f of g.fx){
    const u=1-f.life/f.total;ctx.globalAlpha=1-u;
    if(f.type==='rim'){circle(ctx,f.x,f.y,10+u*56,null,'#ffe1a3');circle(ctx,f.x,f.y,5+u*30,null,'#fff7d0');}
    else if(f.type==='pulse'){ctx.lineWidth=reduced?1:2;circle(ctx,f.x,f.y,12+u*(f.radius-12),null,'#adf3d9');}
    else if(f.type==='setup'){circle(ctx,f.x,f.y,18+u*20,null,'#b3f6d980');ctx.fillStyle='#c7f7e7';ctx.font='12px "Segoe UI",sans-serif';ctx.textAlign='center';ctx.fillText('+25',f.x,f.y-30-u*15);}
    else{
      const color=f.armor?'#f4c797':f.relay?'#baf4da':'#e8a4cf';ctx.lineWidth=1.5;circle(ctx,f.x,f.y,10+u*(f.chain>=5?64:55),null,color+'88');const count=reduced?4:f.chain>=5?14:10;
      for(let i=0;i<count;i++){const a=i*Math.PI*2/count+f.x*.2,r=8+u*(28+i%3*18);ctx.save();ctx.translate(f.x+Math.cos(a)*r,f.y+Math.sin(a)*r+u*u*10);ctx.rotate(a+u*2);ctx.beginPath();ctx.moveTo(-4,-3);ctx.lineTo(5,0);ctx.lineTo(-2,6);ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.restore();}
      ctx.fillStyle='#fff0da';ctx.font='bold 15px "Segoe UI",sans-serif';ctx.textAlign='center';ctx.fillText('+'+f.points,f.x,f.y-28-u*30);
    }ctx.globalAlpha=1;
  }ctx.restore();
  // HUD and guide stay outside the busiest impact area.
  ctx.textAlign='left';ctx.fillStyle='#a8b7d1';ctx.font='10px "Segoe UI",sans-serif';ctx.fillText(lang==='ja'?'得点':'SCORE',30,30);ctx.fillStyle='#ecf5ff';ctx.font='700 30px "Segoe UI",sans-serif';ctx.fillText(g.score.toLocaleString(lang==='ja'?'ja-JP':'en-US'),30,63);
  ctx.textAlign='center';ctx.font='600 11px "Segoe UI",sans-serif';ctx.fillStyle='#b1bcd5';ctx.fillText('R I M B L O O M',270,28);ctx.font='10px "Segoe UI",sans-serif';ctx.fillStyle='#8da1ba';ctx.fillText(`${text.stage} ${g.stage+1}/7 · ${STAGES[g.stage][lang]}`,270,47);
  const readChain=Math.max(p.chain,v.readChain||0);if(readChain>=2){ctx.font=`700 ${g.milestoneTime>0?20:17}px "Segoe UI",sans-serif`;ctx.fillStyle=readChain>=5?'#ffe0a4':'#c4f6df';ctx.fillText(`${readChain} ${lang==='ja'?'連鎖':'CHAIN'}  ×${Math.min(5,readChain)}`,270,75);}
  ctx.textAlign='right';ctx.fillStyle='#edf7ea';ctx.font='700 24px "Segoe UI",sans-serif';ctx.fillText(Math.ceil(Math.max(0,STAGES[g.stage].seconds-(g.t-g.stageAt))).toString().padStart(2,'0'),508,54);ctx.font='9px "Segoe UI",sans-serif';ctx.fillStyle='#a4b5cb';ctx.fillText(text.time,509,30);
  for(let i=0;i<3;i++){ctx.save();ctx.translate(445+i*25,81);polygon(ctx,0,0,7,4);ctx.fillStyle=i<g.life?'#eeb4cd':'#29324c';ctx.fill();ctx.strokeStyle=i<g.life?'#fbd1df':'#56617b';ctx.stroke();ctx.restore();}
  ctx.lineWidth=3;ctx.strokeStyle='#2f3e5e';ctx.beginPath();ctx.moveTo(32,92);ctx.lineTo(405,92);ctx.stroke();ctx.strokeStyle='#8cdbc6';ctx.beginPath();ctx.moveTo(32,92);ctx.lineTo(32+373*(1-Math.min(1,(g.t-g.stageAt)/STAGES[g.stage].seconds)),92);ctx.stroke();
  ctx.textAlign='center';ctx.font='12px "Segoe UI","Yu Gothic UI",sans-serif';ctx.fillStyle=g.messageTime>0?'#eed7b7':'#aabfd3';ctx.fillText(g.messageTime>0?text[g.lastMessage]||'':g.t<8?text.ready:text.bank,270,730);
  // Subtle chapter readback occupies the safe bottom margin, never stops input.
  if(g.stage===6){ctx.font='bold 12px "Segoe UI",sans-serif';ctx.fillStyle='#ffe1a3';ctx.fillText(text.seal+' '+g.seals+'/12',270,753);}
  else if(g.stageBanner>0){ctx.fillStyle='#c8f6e5';ctx.font='bold 12px "Segoe UI",sans-serif';ctx.fillText(String(g.stage+1).padStart(2,'0')+' · '+STAGES[g.stage][lang],270,753);}
  if(g.status==='won'){ctx.save();ctx.lineWidth=2;ctx.strokeStyle='#e8cf97';for(let i=0;i<7;i++){const a=i*Math.PI*2/7;ctx.beginPath();ctx.ellipse(270+Math.cos(a)*43,400+Math.sin(a)*43,18,37,a+Math.PI/2,0,Math.PI*2);ctx.stroke();}circle(ctx,270,400,32,'#ceffe220','#d7ffe5');ctx.restore();}
  // Touch-only lens reveals the finger-covered area without moving the actual aim.
  if(v.aim?.kind==='touch'&&v.path){const a=v.aim,lx=Math.max(76,Math.min(464,a.x+(a.x>270?-75:75))),ly=Math.max(158,Math.min(647,a.y-102));ctx.save();ctx.beginPath();ctx.arc(lx,ly,36,0,Math.PI*2);ctx.clip();ctx.fillStyle='#15243eee';ctx.fillRect(lx-36,ly-36,72,72);ctx.translate(lx-a.x*1.65,ly-a.y*1.65);ctx.scale(1.65,1.65);ctx.lineWidth=2;ctx.strokeStyle='#b4dcdba0';ctx.strokeRect(B.l,B.t,B.r-B.l,B.b-B.t);for(const e of g.enemies)if(Math.hypot(e.x-a.x,e.y-a.y)<55)bloom(ctx,e,clock);ctx.setLineDash([4,6]);ctx.lineWidth=1;ctx.strokeStyle='#ffe6adb0';ctx.beginPath();v.path.forEach((q,i)=>i?ctx.lineTo(...q):ctx.moveTo(...q));ctx.stroke();ctx.setLineDash([]);circle(ctx,...v.path.at(-1),14,null,'#d2ffe5');if(Math.hypot(p.x-a.x,p.y-a.y)<55)dart(ctx,p);ctx.restore();ctx.lineWidth=1.5;circle(ctx,lx,ly,36,null,'#bdf6df');circle(ctx,lx,ly,5,null,'#d4ffed');ctx.beginPath();ctx.moveTo(lx,ly+36);ctx.lineTo(a.x,a.y-22);ctx.strokeStyle='#a5ecd65a';ctx.stroke();}
}
