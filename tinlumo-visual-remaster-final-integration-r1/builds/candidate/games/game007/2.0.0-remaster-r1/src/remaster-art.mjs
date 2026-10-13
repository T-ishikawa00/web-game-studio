// Accepted 007-A. Cached artwork changes pixels only; collision geometry stays in core.
let board;
const sprites=new Map();
function disc(c,x,y,r,fill,stroke){c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
export function drawBoard(ctx){
 if(!board){board=document.createElement('canvas');board.width=1080;board.height=1520;const c=board.getContext('2d');c.scale(2,2);
 c.fillStyle='#0b222e';c.fillRect(0,0,540,760);
 const rail=c.createLinearGradient(18,100,522,708);[[0,'#e8cc90'],[.25,'#718773'],[.5,'#fcdfa2'],[1,'#46676c']].forEach(([s,v])=>rail.addColorStop(s,v));
 c.fillStyle='#041721';c.strokeStyle=rail;c.lineWidth=6;c.beginPath();c.roundRect(18,98,504,615,37);c.fill();c.stroke();
 const fill=c.createLinearGradient(0,112,0,700);fill.addColorStop(0,'#173640');fill.addColorStop(1,'#0c202f');c.fillStyle=fill;c.strokeStyle='#a7d6c9';c.lineWidth=2;c.beginPath();c.roundRect(30,112,480,588,27);c.fill();c.stroke();
 c.save();c.clip();c.strokeStyle='#7ab7ae13';c.lineWidth=.6;for(let x=45;x<510;x+=45){c.beginPath();c.moveTo(x,112);c.lineTo(x,700);c.stroke();}for(let y=135;y<700;y+=45){c.beginPath();c.moveTo(30,y);c.lineTo(510,y);c.stroke();}
 c.strokeStyle='#92caba12';for(const [rx,ry] of [[190,225],[140,170]]){c.beginPath();c.ellipse(270,410,rx,ry,0,0,Math.PI*2);c.stroke();}c.restore();
 for(let i=0;i<12;i++)for(const x of [23,517]){c.strokeStyle=i%3?'#8bad9f':'#f2d38d';c.lineWidth=2;c.beginPath();c.moveTo(x,139+i*48);c.lineTo(x,152+i*48);c.stroke();}}
 ctx.drawImage(board,0,0,540,760);
}
function makeBloom(type,r,flash){
 const c=document.createElement('canvas');c.width=c.height=192;const x=c.getContext('2d');x.scale(2,2);x.translate(48,48);x.scale(r/23,r/23);
 const armor=type==='armor',relay=type==='relay';x.shadowColor='#00151fb0';x.shadowBlur=8;x.shadowOffsetY=5;x.lineWidth=1;
 if(armor){const g=x.createLinearGradient(-22,-25,22,27);[[0,'#fff3c5'],[.3,'#dca951'],[.7,'#85662f'],[1,'#cbb989']].forEach(([s,v])=>g.addColorStop(s,v));const p=new Path2D();for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6; i?p.lineTo(Math.cos(a)*27,Math.sin(a)*27):p.moveTo(Math.cos(a)*27,Math.sin(a)*27);}p.closePath();x.fillStyle=g;x.strokeStyle='#ffe2a4';x.lineWidth=1.5;x.fill(p);x.stroke(p);x.shadowBlur=0;x.shadowOffsetY=0;x.save();x.scale(.73,.73);x.strokeStyle='#513f2a';x.lineWidth=2;x.stroke(p);x.restore();x.strokeStyle='#fff2c5aa';x.beginPath();x.moveTo(-14,-16);x.lineTo(0,0);x.lineTo(19,12);x.moveTo(0,0);x.lineTo(2,-24);x.stroke();}
 else{const n=relay?3:5,p=new Path2D('M0 3C-26 -8 -13 -32 0 -29C15 -26 24 -5 0 3Z');for(let i=0;i<n;i++){x.save();x.rotate(i*2*Math.PI/n);const g=x.createRadialGradient(-6,-20,1,0,-13,24);[[0,'#fff7e9'],[.22,relay?'#effff4':'#ffd1c2'],[.65,relay?'#56b5a0':'#d47d92'],[1,relay?'#205663':'#794258']].forEach(([s,v])=>g.addColorStop(s,v));x.fillStyle=g;x.strokeStyle=relay?'#d1ffe5':'#ffe1d0';x.fill(p);x.stroke(p);x.shadowBlur=0;x.shadowOffsetY=0;x.beginPath();x.moveTo(0,-23);x.quadraticCurveTo(-9,-13,0,2);x.strokeStyle='#fffbe999';x.stroke();x.restore();}}
 x.shadowBlur=0;x.shadowOffsetY=0;disc(x,0,0,7,'#163c3d','#e9f1cf');disc(x,-2,-2,2,'#ffffdd');if(flash){x.globalAlpha=.45;x.fillStyle='#fff4da';disc(x,0,0,23,'#fff4da');}return c;
}
export function drawGlassBloom(ctx,e,clock){
 const radius=Math.round(e.r*100)/100,key=`${e.type}:${radius}:${e.flash>0}`;if(!sprites.has(key))sprites.set(key,makeBloom(e.type,radius,e.flash>0));const pulse=1+Math.sin(clock*2.8+e.phase)*.035;
 ctx.save();ctx.translate(e.x,e.y);ctx.scale(pulse,pulse);ctx.drawImage(sprites.get(key),-48,-48,96,96);
 if(e.type==='relay'){ctx.setLineDash([4,5]);ctx.lineWidth=1.6;disc(ctx,0,0,e.r+9,null,'#bffbdc');ctx.setLineDash([]);}ctx.restore();
}
