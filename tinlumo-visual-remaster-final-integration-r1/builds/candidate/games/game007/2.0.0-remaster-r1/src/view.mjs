import {drawBoard,drawGlassBloom} from './remaster-art.mjs';
import {W,H,B,ROUND,RULES} from './core.mjs';
const circle=(ctx,x,y,r,fill,stroke)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}};
function polygon(ctx,x,y,r,n,rot=0){ctx.beginPath();for(let i=0;i<n;i++){const a=rot+i*Math.PI*2/n,xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}ctx.closePath();}
const bloom=drawGlassBloom;
function dart(ctx,p){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.shadowColor=p.charge?'#ffd18b':'#9aeacb';ctx.shadowBlur=p.dash>0?22:12;const grad=ctx.createLinearGradient(-14,0,24,0);grad.addColorStop(0,'#63bbbe');grad.addColorStop(.7,'#d5ffea');grad.addColorStop(1,'#fffce7');ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(-14,-12);ctx.lineTo(-7,0);ctx.lineTo(-14,12);ctx.closePath();ctx.fillStyle=grad;ctx.fill();ctx.lineWidth=1;ctx.strokeStyle='#eeffeb';ctx.stroke();ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(-1,-3);ctx.lineTo(13,0);ctx.lineTo(-1,3);ctx.fillStyle='#d5f7ff';ctx.fill();ctx.restore();}
export function render(ctx,g,v){
  const {clock,reduced,text,lang}=v;ctx.clearRect(0,0,W,H);drawBoard(ctx);
  ctx.save();const shake=reduced?0:g.shake;ctx.translate(Math.sin(clock*83)*shake,Math.cos(clock*67)*shake*.6);
  for(const e of g.enemies){if(e.type==='relay'&&!reduced){const linked=g.enemies.filter(o=>o!==e&&o.type!=='armor'&&Math.hypot(o.x-e.x,o.y-e.y)<RULES.relayPulse).slice(0,3);ctx.lineWidth=1;ctx.strokeStyle='#96e3c527';ctx.setLineDash([2,7]);for(const o of linked){ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(o.x,o.y);ctx.stroke();}ctx.setLineDash([]);}circle(ctx,e.x+4,e.y+7,e.r,'#070c1c48');bloom(ctx,e,clock);}
  const p=g.p,trail=v.trail;if(p.dash>0){trail.push({x:p.x,y:p.y,charge:p.charge});if(trail.length>(reduced?4:17))trail.shift();}else if(trail.length)trail.shift();
  if(trail.length>1){ctx.beginPath();trail.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.lineWidth=reduced?4:13;ctx.lineCap='round';ctx.strokeStyle=p.charge?'#f9c37d65':'#9ef3d953';ctx.stroke();ctx.lineWidth=3;ctx.strokeStyle=p.charge?'#ffe4b1':'#c6ffeb';ctx.stroke();}
  if(v.path){ctx.setLineDash([6,9]);ctx.lineWidth=2.4;for(let i=1;i<v.path.length;i++){ctx.strokeStyle=i===1?'#befff0b0':'#ffdf97c0';ctx.beginPath();ctx.moveTo(...v.path[i-1]);ctx.lineTo(...v.path[i]);ctx.stroke();}ctx.setLineDash([]);const end=v.path.at(-1);circle(ctx,...end,14,null,'#e3f3dadd');circle(ctx,...end,3,'#d2ffe5');if(v.path.length>2)circle(ctx,...v.path[1],8,'#fdd29b33','#f9d0a6');if(v.aim)circle(ctx,v.aim.x,v.aim.y,16,null,'#b4ede575');}
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
  ctx.textAlign='left';ctx.fillStyle='#a8b7d1';ctx.font='16px "Segoe UI",sans-serif';ctx.fillText('SCORE',30,30);ctx.fillStyle='#ecf5ff';ctx.font='700 30px "Segoe UI",sans-serif';ctx.fillText(g.score.toLocaleString(lang==='ja'?'ja-JP':'en-US'),30,63);
  ctx.textAlign='center';ctx.font='600 16px "Segoe UI",sans-serif';ctx.fillStyle='#b1bcd5';ctx.fillText('R I M B L O O M',270,28);ctx.font='16px "Segoe UI",sans-serif';ctx.fillStyle='#8da1ba';ctx.fillText(`TIDE ${g.seed}`,270,47);
  const readChain=Math.max(p.chain,v.readChain||0);if(readChain>=2){ctx.font=`700 ${g.milestoneTime>0?20:17}px "Segoe UI",sans-serif`;ctx.fillStyle=readChain>=5?'#ffe0a4':'#c4f6df';ctx.fillText(`${readChain} CHAIN  ×${Math.min(5,readChain)}`,270,75);}
  ctx.textAlign='right';ctx.fillStyle='#edf7ea';ctx.font='700 24px "Segoe UI",sans-serif';ctx.fillText(Math.ceil(ROUND-g.t).toString().padStart(2,'0'),508,54);ctx.font='16px "Segoe UI",sans-serif';ctx.fillStyle='#a4b5cb';ctx.fillText(text.time,509,30);
  for(let i=0;i<3;i++){ctx.save();ctx.translate(445+i*25,81);polygon(ctx,0,0,7,4);ctx.fillStyle=i<g.life?'#eeb4cd':'#29324c';ctx.fill();ctx.strokeStyle=i<g.life?'#fbd1df':'#56617b';ctx.stroke();ctx.restore();}
  ctx.lineWidth=3;ctx.strokeStyle='#2f3e5e';ctx.beginPath();ctx.moveTo(32,92);ctx.lineTo(405,92);ctx.stroke();ctx.strokeStyle='#8cdbc6';ctx.beginPath();ctx.moveTo(32,92);ctx.lineTo(32+373*(1-g.t/ROUND),92);ctx.stroke();
  ctx.textAlign='center';ctx.font='18px "Segoe UI","Yu Gothic UI",sans-serif';ctx.fillStyle=g.messageTime>0?'#eed7b7':'#aabfd3';ctx.fillText(g.messageTime>0?text[g.lastMessage]||'':g.t<8?text.ready:text.bank,270,730);
  // Touch-only lens reveals the finger-covered area without moving the actual aim.
  if(v.aim?.kind==='touch'&&v.path){const a=v.aim,lx=Math.max(76,Math.min(464,a.x+(a.x>270?-75:75))),ly=Math.max(158,Math.min(647,a.y-102));ctx.save();ctx.beginPath();ctx.arc(lx,ly,36,0,Math.PI*2);ctx.clip();ctx.fillStyle='#15243eee';ctx.fillRect(lx-36,ly-36,72,72);ctx.translate(lx-a.x*1.65,ly-a.y*1.65);ctx.scale(1.65,1.65);ctx.lineWidth=2;ctx.strokeStyle='#b4dcdba0';ctx.strokeRect(B.l,B.t,B.r-B.l,B.b-B.t);for(const e of g.enemies)if(Math.hypot(e.x-a.x,e.y-a.y)<55)bloom(ctx,e,clock);ctx.setLineDash([4,6]);ctx.lineWidth=1;ctx.strokeStyle='#ffe6adb0';ctx.beginPath();v.path.forEach((q,i)=>i?ctx.lineTo(...q):ctx.moveTo(...q));ctx.stroke();ctx.setLineDash([]);circle(ctx,...v.path.at(-1),14,null,'#d2ffe5');if(Math.hypot(p.x-a.x,p.y-a.y)<55)dart(ctx,p);ctx.restore();ctx.lineWidth=1.5;circle(ctx,lx,ly,36,null,'#bdf6df');circle(ctx,lx,ly,5,null,'#d4ffed');ctx.beginPath();ctx.moveTo(lx,ly+36);ctx.lineTo(a.x,a.y-22);ctx.strokeStyle='#a5ecd65a';ctx.stroke();}
}
