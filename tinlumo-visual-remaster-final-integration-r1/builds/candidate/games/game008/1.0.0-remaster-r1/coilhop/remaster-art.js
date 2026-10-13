// 008-A: depth is decorative. Every top edge uses the unmodified pad position/width.
const sky=new Image();sky.src=new URL('./art/cloud-garden.png',import.meta.url);let skyCache;
sky.onload=()=>skyCache=null;
const path=(c,points)=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();};
export function drawGardenSky(c,w,h){
 if(!skyCache||skyCache.width!==Math.ceil(w)||skyCache.height!==Math.ceil(h)){skyCache=document.createElement('canvas');skyCache.width=Math.ceil(w);skyCache.height=Math.ceil(h);const x=skyCache.getContext('2d');x.fillStyle='#b2dfec';x.fillRect(0,0,w,h);if(sky.complete&&sky.naturalWidth){const scale=Math.max(w/sky.naturalWidth,h/sky.naturalHeight),sw=sky.naturalWidth*scale,sh=sky.naturalHeight*scale;x.drawImage(sky,(w-sw)/2,(h-sh)/2,sw,sh);}}
 c.drawImage(skyCache,0,0,w,h);
}
export function drawGardenPad(c,item,p,s,scene,theme,w,h,beacon,bell){
 const pad=item.pad??item,id=pad.id??item.id,pw=pad.width*s,x=p.x,y=p.y;
 if(x+pw<0||x-pw>w||y<-85||y>h+85)return;
 const target=(scene.targetIds||[]).includes(id)&&['ready','charging','flying','flight','falling'].includes(scene.mode),current=id===scene.currentId;
 c.save();c.shadowColor='#0e424640';c.shadowBlur=12*s;c.shadowOffsetY=10*s;
 const rock=c.createLinearGradient(x-pw/2,y,x+pw/3,y+72*s);rock.addColorStop(0,'#58846d');rock.addColorStop(.4,'#346550');rock.addColorStop(1,'#1b3938');c.fillStyle=rock;path(c,[[x-pw/2,y+6*s],[x-pw*.34,y+44*s],[x-pw*.12,y+60*s],[x+pw*.07,y+71*s],[x+pw*.35,y+42*s],[x+pw/2,y+7*s]]);c.fill();c.shadowBlur=c.shadowOffsetY=0;
 c.strokeStyle='#a7ad8355';c.lineWidth=2*s;path(c,[[x-pw*.3,y+12*s],[x-pw*.12,y+59*s],[x+pw*.04,y+22*s]]);c.stroke();
 const stone=c.createLinearGradient(0,y,0,y+12*s);stone.addColorStop(0,'#faf0c3');stone.addColorStop(.3,'#d5c796');stone.addColorStop(1,'#8f8a65');c.fillStyle=stone;c.strokeStyle='#336458';c.lineWidth=1.5;c.beginPath();c.roundRect(x-pw/2,y,pw,12*s,3*s);c.fill();c.stroke();
 c.strokeStyle=target?'#fffce1':current?'#e3f7b8':'#c5ddad';c.lineWidth=target?4:3;c.beginPath();c.moveTo(x-pw/2,y);c.lineTo(x+pw/2,y);c.stroke();
 c.strokeStyle='#80a871';c.lineWidth=5*s;c.beginPath();c.moveTo(x-pw/2+3,y+14*s);c.bezierCurveTo(x-pw*.2,y+26*s,x-pw*.25,y+15*s,x,y+16*s);c.stroke();
 for(let i=0;i<5;i++){const xx=x-pw/2+13*s+i*pw/6;c.strokeStyle='#7b9b69';c.lineWidth=2*s;c.beginPath();c.moveTo(xx,y+15*s);c.quadraticCurveTo(xx+(-2+i%2*5)*s,y+(29+i%3*6)*s,xx,y+(35+i%3*8)*s);c.stroke();}
 if(pad.beacon||pad.checkpoint)beacon(c,x+pw*.30,y,current||id===scene.checkpointId,s,theme,scene);
 if(pad.bell||pad.final||pad.summit||id===scene.finalId)bell(c,x,y,s,theme,scene.mode==='finale',scene.time||0);
 if(target){const text=scene.targetLabel||(scene.lang==='ja'?(pad.ampX||pad.ampY?'動く踏み台':'つぎの踏み台'):(pad.ampX||pad.ampY?'MOVING LEDGE':'NEXT LEDGE'));c.font=`650 ${w<550?12:15}px system-ui,sans-serif`;const tw=Math.min(w-24,Math.max(132,c.measureText(text+' →').width+30)),tx=Math.max(tw/2+8,Math.min(w-tw/2-8,x));c.fillStyle='#173f3cf2';c.beginPath();c.roundRect(tx-tw/2,y-57*s,tw,31,16);c.fill();c.fillStyle='#fff3c5';c.textAlign='center';c.textBaseline='middle';c.fillText(text+' →',tx,y-57*s+15.5,tw-16);}
 c.restore();
}
export function drawBrassSpring(c,player,scale,scene){
 if(!player)return;const power=Math.max(0,Math.min(1,player.power||0)),charging=scene.mode==='charging',flying=['flying','flight','falling'].includes(scene.mode),compression=charging?power:0,h=58-24*compression,squash=Math.max(-.35,Math.min(.5,player.squash||0));
 c.save();c.translate(player.x||0,player.y||0);c.scale(scale*(1+squash*.35),scale*(1-squash*.35));c.rotate(Math.max(-.35,Math.min(.35,player.rotation||0)));
 c.fillStyle='#123f3e44';c.beginPath();c.ellipse(0,1,17,4,0,0,Math.PI*2);c.fill();
 const brass=c.createLinearGradient(-16,0,16,0);[[0,'#77542d'],[.3,'#f2d196'],[.55,'#bd8747'],[.8,'#fff0b0'],[1,'#8f5c30']].forEach(([s,v])=>brass.addColorStop(s,v));
 c.fillStyle='#74502a';c.strokeStyle='#fff1bd';path(c,[[-14,-5],[0,-10],[14,-5],[13,-1],[-13,-1]]);c.fill();c.stroke();
 for(let i=0;i<5;i++){const yy=-8-i*(h-17)/4;c.beginPath();c.ellipse(0,yy,13,2.8,0,0,Math.PI*2);c.strokeStyle='#4d3d24';c.lineWidth=5;c.stroke();c.beginPath();c.ellipse(0,yy-.8,13,2.8,0,0,Math.PI*2);c.strokeStyle=brass;c.lineWidth=3.7;c.stroke();c.beginPath();c.moveTo(-9,yy-2);c.quadraticCurveTo(0,yy-4,9,yy-2);c.lineWidth=1.2;c.strokeStyle='#ffe9af';c.stroke();}
 c.fillStyle=brass;c.strokeStyle='#e2c181';c.lineWidth=1;c.beginPath();c.roundRect(-16,-h-18,32,28,10);c.fill();c.stroke();c.fillStyle='#508170';c.strokeStyle='#d3d99e';c.beginPath();c.ellipse(0,-h-15,17,7,0,0,Math.PI*2);c.fill();c.stroke();
 for(const x of [-5,5]){c.fillStyle='#463119';c.beginPath();c.arc(x,-h-3,2,0,Math.PI*2);c.fill();}c.beginPath();c.moveTo(-3,-h+2);c.quadraticCurveTo(0,-h+5,4,-h+2);c.strokeStyle='#583a21';c.lineWidth=1.5;c.stroke();c.fillStyle='#c46543';const side=flying&&player.vx>0?-1:1;path(c,[[13*side,-h+5],[29*side,-h+9],[17*side,-h+15]]);c.fill();c.restore();
}
