const clamp=(value,min,max)=>Math.max(min,Math.min(max,Number.isFinite(Number(value))?Number(value):min));
const lerp=(a,b,t)=>a+(b-a)*t;
const roundRect=(ctx,x,y,w,h,r,fill,stroke,lineWidth=1)=>{
  const radius=Math.min(r,w/2,h/2);
  ctx.beginPath();
  if(ctx.roundRect)ctx.roundRect(x,y,w,h,radius);
  else{
    ctx.moveTo(x+radius,y);ctx.arcTo(x+w,y,x+w,y+h,radius);ctx.arcTo(x+w,y+h,x,y+h,radius);
    ctx.arcTo(x,y+h,x,y,radius);ctx.arcTo(x,y,x+w,y,radius);
  }
  if(fill){ctx.fillStyle=fill;ctx.fill();}
  if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.stroke();}
};

export const CONTROLS={
  stoke:{x:42,y:584,w:196,h:110},
  finish:{x:252,y:584,w:198,h:110},
  vent:{x:465,y:584,w:214,h:110}
};

const PALETTES={
  regular:{
    bg:'#211b19',wall:'#302521',wall2:'#44332b',panel:'#302623',panel2:'#3c302b',line:'#755846',
    ink:'#f4e5d0',muted:'#c3aa93',faint:'#927b68',gold:'#e7b46d',copper:'#c87449',
    fire:'#ec793e',fireDeep:'#943e2c',track:'#59473e',good:'#cf9a62',next:'#7f6a58',
    disabled:'#716359',black:'#211a18'
  },
  contrast:{
    bg:'#080a0d',wall:'#15191d',wall2:'#232a30',panel:'#13181c',panel2:'#1d252b',line:'#f3f6f7',
    ink:'#ffffff',muted:'#f0f3f4',faint:'#d4dde1',gold:'#ffe047',copper:'#ff8b4f',
    fire:'#ff6b35',fireDeep:'#b52c12',track:'#7c8991',good:'#ffe047',next:'#d4dde1',
    disabled:'#414b52',black:'#000000'
  }
};

const selectText=(lang,ja,en)=>lang==='ja'?ja:en;
const selectLabel=(lang,value,fallback='')=>{
  if(value&&typeof value==='object')return value[lang]||value.en||value.ja||fallback;
  return typeof value==='string'&&value?value:fallback;
};
const canvasSmall=ctx=>(ctx.canvas?.clientWidth||720)<450;
function drawText(ctx,value,x,y,size,color,{align='left',weight=650,maxWidth,smallScale=1.85}={}){
  const scale=canvasSmall(ctx)?smallScale:1;
  ctx.font=`${weight} ${Math.round(size*scale)}px system-ui, "Noto Sans JP", sans-serif`;
  ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='alphabetic';
  const text=String(value??'');
  if(Number.isFinite(maxWidth))ctx.fillText(text,x,y,maxWidth);else ctx.fillText(text,x,y);
}
function drawFitText(ctx,value,x,y,size,color,maxWidth,options={}){
  const str=String(value??'');
  let actual=size;
  const scale=canvasSmall(ctx)?1.85:1;
  const minSize=options.minSize??(canvasSmall(ctx)?12:10);
  while(actual>minSize){
    ctx.font=`${options.weight||650} ${Math.round(actual*scale)}px system-ui, "Noto Sans JP", sans-serif`;
    if(ctx.measureText(str).width<=maxWidth)break;
    actual-=1;
  }
  ctx.font=`${options.weight||650} ${Math.round(actual*scale)}px system-ui, "Noto Sans JP", sans-serif`;
  ctx.fillStyle=color;ctx.textAlign=options.align||'left';ctx.textBaseline='alphabetic';
  ctx.fillText(str,x,y,maxWidth);
}
function hexRgb(value,fallback=[190,120,74]){
  if(typeof value!=='string')return fallback;
  const v=value.trim();
  const short=/^#([\da-f])([\da-f])([\da-f])$/i.exec(v);
  if(short)return short.slice(1).map(ch=>parseInt(ch+ch,16));
  const full=/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(v);
  if(full)return full.slice(1).map(ch=>parseInt(ch,16));
  return fallback;
}
const rgb=(arr,a=1)=>`rgba(${arr[0]},${arr[1]},${arr[2]},${clamp(a,0,1)})`;

function phaseAt(profile,index){
  const phases=Array.isArray(profile?.phases)?profile.phases:[];
  const safe=Math.max(0,Math.min(phases.length-1,Math.floor(Number(index)||0)));
  return phases[safe]||{};
}
function targetLabel(phase,lang){
  if(!phase)return selectText(lang,'仕上げの温度帯を確認','Read the finishing band');
  const name=selectLabel(lang,phase.name||phase.label,'');
  const low=Number.isFinite(Number(phase.low))?Math.round(phase.low):null;
  const high=Number.isFinite(Number(phase.high))?Math.round(phase.high):null;
  if(low!==null&&high!==null)return `${low}–${high}°`;
  return name||selectText(lang,'温度帯','WORK BAND');
}
function seconds(value){return Math.max(0,Math.ceil(Number(value)||0));}

function drawWorkshop(ctx,palette,now,reducedMotion){
  const wall=ctx.createLinearGradient(0,0,720,720);
  wall.addColorStop(0,palette.wall);wall.addColorStop(.55,palette.bg);wall.addColorStop(1,palette.black);
  ctx.fillStyle=wall;ctx.fillRect(0,0,720,720);
  const warmth=ctx.createRadialGradient(360,344,30,360,344,420);
  warmth.addColorStop(0,palette===PALETTES.contrast?'rgba(255,224,71,.09)':'rgba(191,99,52,.19)');
  warmth.addColorStop(1,'rgba(10,9,9,0)');ctx.fillStyle=warmth;ctx.fillRect(0,0,720,580);
  // Quiet workshop cues: plaster seams, dark kiln arch, and the work shelf.
  ctx.globalAlpha=palette===PALETTES.contrast ? .55 : .34;
  ctx.strokeStyle=palette.line;ctx.lineWidth=2;
  for(const x of [22,698]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,555);ctx.stroke();}
  ctx.strokeStyle=palette===PALETTES.contrast?'#5b6268':'#513b31';ctx.lineWidth=1;
  for(let y=126;y<560;y+=106){ctx.beginPath();ctx.moveTo(24,y);ctx.lineTo(696,y);ctx.stroke();}
  ctx.globalAlpha=1;
  const arch=ctx.createLinearGradient(250,150,470,520);
  arch.addColorStop(0,palette.wall2);arch.addColorStop(.5,palette.panel);arch.addColorStop(1,palette.black);
  ctx.fillStyle=arch;ctx.beginPath();ctx.moveTo(233,519);ctx.lineTo(233,330);ctx.arc(360,330,127,Math.PI,0);ctx.lineTo(487,519);ctx.closePath();ctx.fill();
  ctx.strokeStyle=palette===PALETTES.contrast?'#aeb8be':'#86624c';ctx.lineWidth=4;ctx.beginPath();ctx.arc(360,331,128,Math.PI,0);ctx.stroke();
  // Light falls from the kiln mouth; animation is deliberately subtle and removable.
  const flicker=reducedMotion?0:.025*(.5+.5*Math.sin((Number(now)||0)*2.1));
  const mouth=ctx.createRadialGradient(360,452,18,360,452,155);
  mouth.addColorStop(0,palette===PALETTES.contrast?`rgba(255,224,71,${.09+flicker})`:`rgba(207,91,44,${.17+flicker})`);
  mouth.addColorStop(1,'rgba(24,17,15,0)');ctx.fillStyle=mouth;ctx.fillRect(200,320,320,240);
  ctx.fillStyle=palette===PALETTES.contrast?'#252a2e':'#171313';ctx.fillRect(28,526,664,58);
  ctx.fillStyle=palette===PALETTES.contrast?'#aeb8be':'#82604b';ctx.fillRect(28,526,664,4);
  ctx.fillStyle=palette===PALETTES.contrast?'#15191d':'#3a2923';ctx.fillRect(28,532,664,6);
}

function vesselPath(ctx,shape){
  ctx.beginPath();
  if(shape==='vase'){
    ctx.moveTo(-39,-105);ctx.quadraticCurveTo(-32,-85,-43,-58);
    ctx.bezierCurveTo(-54,-33,-88,-25,-90,8);ctx.bezierCurveTo(-96,55,-72,94,-58,102);
    ctx.quadraticCurveTo(0,115,58,102);ctx.bezierCurveTo(73,92,96,54,89,10);
    ctx.bezierCurveTo(84,-25,52,-34,43,-59);ctx.quadraticCurveTo(32,-84,39,-105);
    ctx.quadraticCurveTo(0,-112,-39,-105);ctx.closePath();
  }else if(shape==='pitcher'){
    ctx.moveTo(-44,-93);ctx.quadraticCurveTo(-12,-105,34,-94);
    ctx.lineTo(39,-65);ctx.bezierCurveTo(63,-38,91,-25,91,17);
    ctx.bezierCurveTo(91,65,64,98,39,106);ctx.quadraticCurveTo(-13,120,-62,102);
    ctx.bezierCurveTo(-84,89,-93,57,-89,20);ctx.bezierCurveTo(-85,-18,-60,-43,-46,-66);
    ctx.closePath();
  }else{
    ctx.moveTo(-91,-43);ctx.quadraticCurveTo(-4,-52,91,-42);
    ctx.bezierCurveTo(83,3,58,73,30,96);ctx.quadraticCurveTo(0,108,-30,96);
    ctx.bezierCurveTo(-59,73,-83,3,-91,-43);ctx.closePath();
  }
}
function vesselOuterPath(ctx,shape){
  vesselPath(ctx,shape);ctx.fill();
}
function drawVesselHandle(ctx,shape,palette,bodyRgb){
  if(shape!=='pitcher')return;
  ctx.save();ctx.strokeStyle=rgb([Math.max(0,bodyRgb[0]-37),Math.max(0,bodyRgb[1]-31),Math.max(0,bodyRgb[2]-27)],1);ctx.lineWidth=14;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(66,-49);ctx.bezierCurveTo(130,-66,146,-35,144,10);ctx.bezierCurveTo(142,53,121,70,79,57);ctx.stroke();
  ctx.strokeStyle=palette===PALETTES.contrast?'#ffffff':'rgba(255,220,175,.62)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(71,-47);ctx.bezierCurveTo(119,-57,132,-31,131,7);ctx.bezierCurveTo(130,37,115,52,83,46);ctx.stroke();ctx.restore();
}
function drawVesselRim(ctx,shape,palette,bodyRgb){
  const width=shape==='vase'?42:shape==='pitcher'?49:91;
  const rimY=shape==='vase'?-104:shape==='pitcher'?-96:-43;
  ctx.save();ctx.lineWidth=8;ctx.strokeStyle=rgb([Math.min(255,bodyRgb[0]+45),Math.min(255,bodyRgb[1]+37),Math.min(255,bodyRgb[2]+25)],1);
  ctx.beginPath();ctx.ellipse(0,rimY,width,8,0,0,Math.PI*2);ctx.stroke();
  ctx.lineWidth=3;ctx.strokeStyle=palette===PALETTES.contrast?'#ffffff':'rgba(255,239,209,.75)';
  ctx.beginPath();ctx.ellipse(0,rimY-1,width-3,4,0,Math.PI,Math.PI*2);ctx.stroke();ctx.restore();
}
function drawGlaze(ctx,shape,bodyRgb,quality,heat,now,reducedMotion,contrast){
  const q=clamp(quality,0,100)/100;
  const warmth=clamp(heat,0,1);
  const glaze=ctx.createLinearGradient(-30,-72,40,92);
  const glazeColor=alpha=>contrast?`rgba(255,224,71,${alpha})`:rgb(bodyRgb,alpha);
  glaze.addColorStop(0,glazeColor(contrast?.13:.14+q*.22));
  glaze.addColorStop(.38,glazeColor(contrast?.2:.22+q*.26));
  glaze.addColorStop(1,glazeColor(contrast?.07:.08+q*.2));
  ctx.save();vesselPath(ctx,shape);ctx.clip();ctx.fillStyle=glaze;ctx.fillRect(-112,-78,224,184);
  const bandTop=lerp(-4,-40,q),bandBottom=lerp(69,51,q);
  ctx.fillStyle=contrast?'rgba(255,224,71,.22)':rgb(bodyRgb,.16+q*.29);
  ctx.beginPath();ctx.moveTo(-116,bandTop+8);ctx.quadraticCurveTo(-47,bandTop-5,0,bandTop+2);ctx.quadraticCurveTo(66,bandTop+10,116,bandTop-1);ctx.lineTo(116,bandBottom);ctx.quadraticCurveTo(68,bandBottom+6,24,bandBottom-2);ctx.quadraticCurveTo(-45,bandBottom-7,-116,bandBottom+1);ctx.closePath();ctx.fill();
  // Low grades visibly carry an uneven edge; higher grades become a continuous coat.
  if(q<.62){
    ctx.globalAlpha=(.15+(.62-q)*.3);
    ctx.fillStyle=contrast?'#111820':'#36231d';
    const marks=[[ -57,12,19,31],[27,-4,14,25],[48,42,24,20],[-12,68,22,18]];
    for(const [x,y,rx,ry] of marks){ctx.beginPath();ctx.ellipse(x,y,rx*(1.15-q*.2),ry,0,.1,Math.PI*2);ctx.fill();}
    ctx.globalAlpha=1;
  }
  const sheen=clamp(.15+q*.62+(warmth*.12),.12,.9);
  ctx.globalAlpha=sheen;
  ctx.strokeStyle=contrast?'#ffffff':'#fff1d1';ctx.lineCap='round';
  ctx.lineWidth=q>.8?5:3;
  const sweep=shape==='bowl'?[-63,-18,50,22]:shape==='vase'?[-25,-62,23,29]:[-36,-48,42,31];
  ctx.beginPath();ctx.moveTo(sweep[0],sweep[1]);ctx.bezierCurveTo(sweep[0]-6,sweep[1]+48,sweep[2]-6,sweep[3]-30,sweep[2],sweep[3]);ctx.stroke();
  if(q>.73){ctx.lineWidth=1.5;ctx.globalAlpha=.62;ctx.beginPath();ctx.moveTo(sweep[0]+15,sweep[1]+13);ctx.bezierCurveTo(sweep[0]+14,sweep[1]+48,sweep[2]+6,sweep[3]-27,sweep[2]+12,sweep[3]-4);ctx.stroke();}
  if(heat>.01&&!reducedMotion){
    const shimmer=.25+.12*(.5+.5*Math.sin((Number(now)||0)*1.6));ctx.globalAlpha=shimmer*warmth;
    ctx.fillStyle=contrast?'#ffffff':'#ffe4aa';
    for(const [x,y,r] of [[38,-18,2.4],[-38,39,1.7],[11,61,1.5]]){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  }
  ctx.restore();
}

function drawFiringDamage(ctx,shape,{burn=0,shock=0,reasonCode='',contrast=false}={}){
  const scorched=reasonCode==='overfire'||Number(burn)>0;
  const cracked=['thermal-shock','cold-crack'].includes(reasonCode)||Number(shock)>=9;
  if(!scorched&&!cracked)return;
  ctx.save();vesselPath(ctx,shape);ctx.clip();
  if(scorched){
    const alpha=reasonCode==='overfire'?Math.max(.35,clamp(burn,0,100)/120):clamp(burn,0,100)/150;
    ctx.fillStyle=contrast?`rgba(0,0,0,${Math.max(.55,alpha)})`:`rgba(38,20,17,${alpha})`;
    ctx.beginPath();ctx.moveTo(-95,-15);ctx.quadraticCurveTo(-47,-42,-14,-12);ctx.quadraticCurveTo(30,18,97,-21);ctx.lineTo(103,26);ctx.quadraticCurveTo(49,51,11,29);ctx.quadraticCurveTo(-31,2,-88,37);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.ellipse(30,66,34,10,-.17,0,Math.PI*2);ctx.fill();
  }
  if(cracked){
    const cracks=[[-48,-61,[[-8,17],[8,14],[-4,18],[8,17]]],[47,-34,[[9,15],[-9,13],[7,20],[-8,16]]],[-19,26,[[-9,14],[8,11],[-8,18],[11,12]]]];
    ctx.lineCap='round';
    for(const [x,y,points] of cracks){
      ctx.strokeStyle=contrast?'#000000':'rgba(32,19,18,.95)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,y);for(const [dx,dy] of points)ctx.lineTo(x+dx,y+dy);ctx.stroke();
      ctx.strokeStyle=contrast?'#ffffff':'rgba(255,229,198,.9)';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x-1,y);for(const [dx,dy] of points)ctx.lineTo(x+dx-1,y+dy);ctx.stroke();
    }
  }
  ctx.restore();
}

export function drawVessel(ctx,{x=360,y=348,scale=1,shape='bowl',color='#bd8056',quality=0,heat=0,burn=0,shock=0,reasonCode='',contrast=false,reducedMotion=false,now=0}={}){
  if(!ctx)return;
  const validShape=['bowl','vase','pitcher'].includes(shape)?shape:'bowl';
  const bodyRgb=hexRgb(color);
  const q=clamp(quality,0,100);
  const temp=Number(heat)||0;
  const hot=temp>1?clamp((temp-280)/570,0,1):clamp(temp,0,1);
  ctx.save();ctx.translate(Number(x)||0,Number(y)||0);ctx.scale(clamp(scale,.35,2.1),clamp(scale,.35,2.1));
  drawVesselHandle(ctx,validShape,contrast?PALETTES.contrast:PALETTES.regular,bodyRgb);
  const clay=ctx.createLinearGradient(-100,-34,100,30);
  clay.addColorStop(0,contrast?'#4b5359':`rgb(${Math.round(bodyRgb[0]*.52)},${Math.round(bodyRgb[1]*.46)},${Math.round(bodyRgb[2]*.43)})`);
  clay.addColorStop(.22,contrast?'#adb7bd':`rgb(${Math.min(255,Math.round(bodyRgb[0]*.95+30))},${Math.min(255,Math.round(bodyRgb[1]*.9+21))},${Math.min(255,Math.round(bodyRgb[2]*.8+15))})`);
  clay.addColorStop(.53,contrast?'#e4e8ea':`rgb(${Math.min(255,Math.round(bodyRgb[0]*1.1+40))},${Math.min(255,Math.round(bodyRgb[1]*1.08+32))},${Math.min(255,Math.round(bodyRgb[2]*.95+25))})`);
  clay.addColorStop(.78,contrast?'#9ca6ac':`rgb(${Math.round(bodyRgb[0]*.9)},${Math.round(bodyRgb[1]*.72)},${Math.round(bodyRgb[2]*.6)})`);
  clay.addColorStop(1,contrast?'#3b4247':`rgb(${Math.round(bodyRgb[0]*.45)},${Math.round(bodyRgb[1]*.4)},${Math.round(bodyRgb[2]*.38)})`);
  ctx.save();ctx.shadowColor=contrast?'rgba(255,224,71,.25)':`rgba(255,104,48,${.12+hot*.2})`;ctx.shadowBlur=reducedMotion?0:8+hot*18;
  ctx.fillStyle=clay;vesselOuterPath(ctx,validShape);ctx.restore();
  drawGlaze(ctx,validShape,bodyRgb,q,hot,now,reducedMotion,contrast);
  drawFiringDamage(ctx,validShape,{burn,shock,reasonCode,contrast});
  ctx.save();vesselPath(ctx,validShape);ctx.strokeStyle=contrast?'#ffffff':'rgba(63,37,27,.9)';ctx.lineWidth=3;ctx.stroke();ctx.restore();
  drawVesselRim(ctx,validShape,contrast?PALETTES.contrast:PALETTES.regular,bodyRgb);
  // Foot ring and a hand-thrown turning line give the silhouette a grounded material read.
  if(validShape!=='vase'){
    ctx.strokeStyle=contrast?'#ffffff':'rgba(255,221,184,.44)';ctx.lineWidth=2;ctx.beginPath();
    if(validShape==='bowl')ctx.ellipse(0,91,28,6,0,0,Math.PI*2);else ctx.ellipse(-4,94,45,8,0,0,Math.PI*2);ctx.stroke();
  }
  ctx.restore();
}

function drawBandCard(ctx,palette,{x,y,w,h,title,value,detail,kind='current',direction='',lang}){
  const accent=kind==='current'?palette.gold:palette.next;
  roundRect(ctx,x,y,w,h,16,palette.panel,palette.line,1.5);
  ctx.fillStyle=accent;roundRect(ctx,x+1,y+1,5,h-2,3,accent);
  drawText(ctx,title,x+18,y+22,11,palette.muted,{weight:760,smallScale:1.7});
  const valueRoom=direction?w-60:w-34;
  const compactValue=canvasSmall(ctx)&&!/[0-9]/.test(String(value));
  drawFitText(ctx,value,x+18,y+51,compactValue?16:22,palette.ink,valueRoom,{weight:800,minSize:compactValue?14:16});
  if(direction==='down'){
    ctx.save();ctx.strokeStyle=palette.copper;ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
    const ax=x+w-24,ay=y+39;ctx.beginPath();ctx.moveTo(ax,ay-10);ctx.lineTo(ax,ay+10);ctx.moveTo(ax-8,ay+3);ctx.lineTo(ax,ay+11);ctx.lineTo(ax+8,ay+3);ctx.stroke();ctx.restore();
  }
  drawFitText(ctx,detail,x+18,y+77,16,kind==='current'?palette.gold:palette.muted,w-32,{weight:720,minSize:15});
}
function drawFuel(ctx,palette,state,lang){
  const fuelMax=Math.max(.0001,Number(state?.fuelMax)||1),fuel=clamp(state?.fuel,0,fuelMax),ember=clamp(state?.ember,0,1);
  const pct=fuel/fuelMax;
  const x=38,y=465,w=192;
  roundRect(ctx,x-10,442,w+20,112,12,palette.panel);
  drawText(ctx,selectText(lang,'薪と火種','FUEL & EMBERS'),x,y,10,palette.muted,{weight:750,smallScale:1.7});
  drawFitText(ctx,`${Math.round(pct*100)}%`,x,y+28,18,palette.ink,188,{weight:820,minSize:16});
  roundRect(ctx,x,y+35,188,8,4,palette.track);
  roundRect(ctx,x,y+35,188*pct,8,4,pct<.23?palette.copper:palette.gold);
  drawFitText(ctx,`${selectText(lang,'火種','EMBER')} ${Math.round(ember*100)}%`,x,y+71,15,palette.muted,188,{weight:760,minSize:13});
  roundRect(ctx,x,y+77,188,6,3,palette.track);roundRect(ctx,x,y+77,188*ember,6,3,palette.fire);
}
function drawQuality(ctx,palette,state,qualities,profile,lang,mode){
  const q=clamp(state?.quality,0,100),x=490,y=465,w=192;
  roundRect(ctx,x-10,442,w+20,112,12,palette.panel);
  drawText(ctx,selectText(lang,'釉の仕上がり','GLAZE QUALITY'),x,y,10,palette.muted,{weight:750,smallScale:1.7});
  drawFitText(ctx,`${Math.round(q)}%`,x,y+30,18,q>=70?palette.gold:palette.ink,188,{weight:850,minSize:17});
  const goal=clamp(profile?.qualityGoal,0,100);
  roundRect(ctx,x,y+37,188,8,4,palette.track);roundRect(ctx,x,y+37,188*q/100,8,4,palette.gold);
  if(goal>0)drawFitText(ctx,selectText(lang,`目標 ${Math.round(goal)}%`,`GOAL ${Math.round(goal)}%`),x,y+71,13,palette.muted,188,{weight:720,minSize:12});
}
function drawVent(ctx,palette,state,lang,mode){
  const box=CONTROLS.vent,v=clamp(state?.vent,0,1),ready=mode==='running'&&state?.status==='running';
  roundRect(ctx,box.x,box.y,box.w,box.h,18,ready?palette.panel2:palette.panel,ready?palette.gold:palette.line,2);
  drawFitText(ctx,selectText(lang,'通気','VENT'),box.x+15,box.y+25,15,palette.ink,62,{weight:800});
  drawFitText(ctx,`${Math.round(v*100)}%`,box.x+box.w-15,box.y+25,18,palette.gold,62,{weight:850,align:'right',minSize:15});
  const left=box.x+20,right=box.x+box.w-20,yy=box.y+60;
  ctx.strokeStyle=palette.track;ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(right,yy);ctx.stroke();
  const vx=left+(right-left)*v;ctx.strokeStyle=palette.copper;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(vx,yy);ctx.stroke();
  for(let i=0;i<=4;i++){const x=left+(right-left)*i/4;ctx.strokeStyle=palette.muted;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,yy-8);ctx.lineTo(x,yy+8);ctx.stroke();}
  ctx.fillStyle=palette.gold;ctx.beginPath();ctx.arc(vx,yy,13,0,Math.PI*2);ctx.fill();ctx.strokeStyle=palette.ink;ctx.lineWidth=2;ctx.stroke();
  drawText(ctx,selectText(lang,'閉','CLOSE'),left,box.y+88,8,palette.muted,{weight:700,smallScale:1.65});
  drawText(ctx,selectText(lang,'開','OPEN'),right,box.y+88,8,palette.muted,{weight:700,align:'right',smallScale:1.65});
}
function drawStoke(ctx,palette,state,lang,mode,{stokeHeld=false,stokePulseSeconds=0}={},reducedMotion=false){
  const box=CONTROLS.stoke,ready=mode==='running'&&state?.status==='running';
  const pressed=ready&&(stokeHeld||Number(stokePulseSeconds)>0);
  ctx.save();
  if(pressed&&!reducedMotion)ctx.translate(0,2);
  roundRect(ctx,box.x,box.y,box.w,box.h,18,ready?(pressed?palette.fire:palette.fireDeep):palette.disabled,ready?(pressed?palette.gold:palette.copper):palette.line,pressed?3:2);
  const x=box.x+box.w/2;
  ctx.fillStyle=ready?(pressed?palette.gold:palette.fire):palette.disabled;
  ctx.shadowColor=pressed?palette.gold:'transparent';ctx.shadowBlur=pressed&&!reducedMotion?14:0;
  ctx.beginPath();ctx.arc(x,box.y+52,31,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.strokeStyle=pressed?palette.ink:palette.gold;ctx.lineWidth=pressed?3:2;ctx.beginPath();ctx.arc(x,box.y+52,31,0,Math.PI*2);ctx.stroke();
  // Three hand-drawn flame tongues remain still when reduced motion is enabled.
  ctx.fillStyle=pressed?palette.black:palette.ink;ctx.beginPath();ctx.moveTo(x,box.y+32);ctx.bezierCurveTo(x+18,box.y+48,x+10,box.y+59,x+8,box.y+65);ctx.quadraticCurveTo(x-1,box.y+72,x-7,box.y+62);ctx.bezierCurveTo(x-20,box.y+53,x-7,box.y+43,x,box.y+32);ctx.fill();
  drawFitText(ctx,selectText(lang,'くべる','STOKE'),x,box.y+99,14,palette.ink,box.w-18,{weight:850,align:'center'});
  ctx.restore();
}
function drawFinish(ctx,palette,state,description,lang,mode){
  const box=CONTROLS.finish;
  const ready=mode==='running'&&state?.status==='running'&&!!description?.finishReady;
  const done=mode==='interlude'||mode==='result'||state?.status==='won';
  const fill=ready?palette.gold:done?palette.panel2:palette.panel;
  const label=done?selectText(lang,'焼き上がり','FIRED'):ready?selectText(lang,'仕上げる','FINISH'):selectText(lang,'仕上げ待ち','WHEN READY');
  roundRect(ctx,box.x,box.y,box.w,box.h,18,fill,ready?palette.ink:palette.line,ready?2.5:1.5);
  ctx.strokeStyle=ready?palette.black:palette.muted;ctx.lineWidth=3;ctx.lineCap='round';
  if(done){
    ctx.beginPath();ctx.moveTo(box.x+box.w/2-16,box.y+46);ctx.lineTo(box.x+box.w/2-4,box.y+60);ctx.lineTo(box.x+box.w/2+20,box.y+31);ctx.stroke();
  }else if(ready){
    ctx.beginPath();ctx.moveTo(box.x+box.w/2,box.y+60);ctx.lineTo(box.x+box.w/2,box.y+29);ctx.moveTo(box.x+box.w/2-12,box.y+41);ctx.lineTo(box.x+box.w/2,box.y+29);ctx.lineTo(box.x+box.w/2+12,box.y+41);ctx.stroke();
  }else{
    ctx.beginPath();ctx.arc(box.x+box.w/2,box.y+43,13,Math.PI,Math.PI*2);ctx.stroke();
    roundRect(ctx,box.x+box.w/2-18,box.y+42,36,22,5,palette.disabled,palette.muted,2);
    ctx.fillStyle=palette.ink;ctx.beginPath();ctx.arc(box.x+box.w/2,box.y+51,2.5,0,Math.PI*2);ctx.fill();ctx.fillRect(box.x+box.w/2-1.2,box.y+51,2.4,6);
  }
  drawFitText(ctx,label,box.x+box.w/2,box.y+99,14,ready?palette.black:palette.ink,box.w-16,{weight:820,align:'center'});
}

export function drawKiln(ctx,{state={},profile={},description={},stageIndex=0,qualities=[],lang='en',settings={},now=0,mode='preview',message='',inputFeedback={}}={}){
  if(!ctx)return;
  const contrast=!!(settings?.highContrast||settings?.contrast),reducedMotion=!!(settings?.reducedMotion||settings?.reduceMotion);
  const palette=contrast?PALETTES.contrast:PALETTES.regular;
  const currentMode=['preview','running','interlude','result'].includes(mode)?mode:'preview';
  const phases=Array.isArray(profile?.phases)?profile.phases:[];
  const phaseIndex=clamp(state?.phaseIndex,0,Math.max(0,phases.length-1));
  const current=phaseAt(profile,phaseIndex);
  const next=phaseAt(profile,phaseIndex+1);
  const hasNext=phases.length>0&&phaseIndex+1<phases.length;
  const phaseName=selectLabel(lang,current?.name||current?.label,selectText(lang,'火を整える','TEND THE FIRE'));
  const vesselName=selectLabel(lang,profile?.name,selectText(lang,'器を焼く','FIRE THE VESSEL'));
  const elapsed=clamp(state?.elapsed,0,Number(profile?.totalDuration)||99999);
  const total=Number(profile?.totalDuration)||Number(description?.secondsRemaining)+elapsed||0;
  const left=Number.isFinite(Number(description?.secondsRemaining))?seconds(description.secondsRemaining):seconds(total-elapsed);
  const toNext=Number.isFinite(Number(description?.secondsToNext))?seconds(description.secondsToNext):seconds(Number(current?.duration)||0);
  drawWorkshop(ctx,palette,now,reducedMotion);

  if(currentMode==='interlude'){
    const grade=clamp(state?.quality,0,100);
    drawFitText(ctx,selectText(lang,`${stageIndex+1}個目の器が焼き上がりました`,`VESSEL ${stageIndex+1} FIRED`),360,73,16,palette.gold,610,{weight:820,align:'center'});
    drawFitText(ctx,vesselName,360,101,13,palette.ink,520,{weight:700,align:'center'});
    drawVessel(ctx,{x:360,y:215,scale:profile?.shape==='vase' ? .78 : .9,shape:profile?.shape||'bowl',color:profile?.color||'#bd8056',quality:grade,heat:Number(state?.temperature)||.5,burn:state?.burn,shock:state?.shock,reasonCode:state?.reasonCode,contrast,reducedMotion,now});
    ctx.fillStyle=palette.line;roundRect(ctx,218,303,284,6,3,palette.line);
    roundRect(ctx,296,319,128,44,13,palette.panel,palette.gold,2);
    drawFitText(ctx,`${Math.round(grade)}%`,360,349,22,palette.gold,108,{weight:850,align:'center'});
    return;
  }

  if(currentMode==='result'){
    const grades=Array.isArray(qualities)?qualities.slice(0,3):[];
    if(grades.length<3&&Number.isFinite(Number(state?.quality)))grades[stageIndex]=Number(state.quality);
    while(grades.length<3)grades.push(0);
    const complete=state?.status!=='lost'&&stageIndex>=2;
    if(complete){
      drawFitText(ctx,selectText(lang,'三つの器が焼き上がりました','THREE VESSELS, FIRED TOGETHER'),360,76,16,palette.gold,630,{weight:820,align:'center'});
      const objects=[
        {x:249,shape:'bowl',color:'#d98c64',scale:.54,name:selectText(lang,'椀','BOWL')},
        {x:360,shape:'vase',color:'#9caf77',scale:.54,name:selectText(lang,'花瓶','VASE')},
        {x:471,shape:'pitcher',color:'#638f9a',scale:.51,name:selectText(lang,'水差し','PITCHER')}
      ];
      objects.forEach((item,index)=>{
        drawVessel(ctx,{x:item.x,y:207,scale:item.scale,shape:item.shape,color:item.color,quality:grades[index],heat:.55,contrast,reducedMotion,now});
        drawFitText(ctx,`${Math.round(clamp(grades[index],0,100))}%`,item.x,291,17,palette.gold,78,{weight:850,align:'center'});
        drawFitText(ctx,item.name,item.x,337,12,palette.muted,104,{weight:740,align:'center',minSize:10});
      });
      ctx.fillStyle=palette.line;roundRect(ctx,174,310,372,5,3,palette.line);
    }else{
      drawFitText(ctx,state?.status==='lost'?selectText(lang,'もう一度、窯を整える','RESET THE FIRING'):selectText(lang,'仕上げた器','FINISHED VESSEL'),360,76,16,state?.status==='lost'?palette.copper:palette.gold,610,{weight:820,align:'center'});
      drawVessel(ctx,{x:360,y:214,scale:profile?.shape==='vase' ? .78 : .9,shape:profile?.shape||'bowl',color:profile?.color||'#bd8056',quality:state?.quality,heat:Number(state?.temperature)||.5,burn:state?.burn,shock:state?.shock,reasonCode:state?.reasonCode,contrast,reducedMotion,now});
      roundRect(ctx,296,317,128,45,13,palette.panel,state?.status==='lost'?palette.copper:palette.gold,2);
      drawFitText(ctx,`${Math.round(clamp(state?.quality,0,100))}%`,360,347,21,state?.status==='lost'?palette.copper:palette.gold,110,{weight:850,align:'center'});
    }
    return;
  }

  const progressLabel=selectText(lang,`仕立て ${Math.min(3,Math.max(1,Number(stageIndex)+1))} / 3`,`COMMISSION ${Math.min(3,Math.max(1,Number(stageIndex)+1))} / 3`);
  drawFitText(ctx,progressLabel,682,37,13,palette.muted,190,{weight:750,align:'right'});
  drawFitText(ctx,vesselName,38,66,24,palette.ink,440,{weight:820});
  drawFitText(ctx,phaseName,38,96,14,palette.muted,490,{weight:700});
  const clockText=currentMode==='preview'?selectText(lang,'準備','READY'):currentMode==='interlude'?selectText(lang,'焼成完了','DONE'):currentMode==='result'?selectText(lang,'三つの器','THE SET'):`${left}${lang==='ja'?'秒':'s'}`;
  roundRect(ctx,580,52,102,42,14,palette.panel,palette.line,1.5);
  drawFitText(ctx,clockText,631,79,16,palette.gold,84,{weight:850,align:'center'});
  const progress=currentMode==='running'&&total>0?clamp(elapsed/total,0,1):currentMode==='preview'?0:1;
  roundRect(ctx,38,115,644,5,2.5,palette.track);
  roundRect(ctx,38,115,644*progress,5,2.5,palette.gold);

  const curValue=phases.length?targetLabel(current,lang):selectText(lang,'火種を保つ','KEEP THE EMBER');
  const temperature=Number(state?.temperature)||0;
  const curDetail=currentMode==='running'
    ?selectText(lang,`温度 ${Math.round(temperature)}°`,`TEMP ${Math.round(temperature)}°`)
    :selectText(lang,'いまの焼成目標','CURRENT TARGET');
  const nextValue=hasNext?targetLabel(next,lang):selectText(lang,'仕上げ','FINISH');
  const nextName=hasNext?selectLabel(lang,next?.name||next?.label,selectText(lang,'次の温度帯','NEXT WORK BAND')):selectText(lang,'焼き止めの判断','FINISHING DECISION');
  const nextDetail=hasNext
    ?selectText(lang,`あと ${toNext} 秒`,`IN ${toNext}s`)
    :selectText(lang,'条件が整ったら','WHEN READY');
  drawBandCard(ctx,palette,{x:38,y:133,w:196,h:88,title:selectText(lang,'現在の帯','CURRENT BAND'),value:curValue,detail:curDetail,kind:'current',lang});
  drawBandCard(ctx,palette,{x:486,y:133,w:196,h:88,title:selectText(lang,'次の目標','NEXT TARGET'),value:nextValue,detail:nextDetail,kind:'next',direction:hasNext&&next?.kind==='cool'?'down':'',lang});

  const displayQuality=currentMode==='preview'?0:Number(state?.quality)||0;
  const heat=Number(state?.temperature)||0;
  const vesselY=currentMode==='preview'?348:356;
  const vesselScale=profile?.shape==='vase' ? 1.16 : profile?.shape==='pitcher' ? 1.08 : 1.17;
  drawVessel(ctx,{x:360,y:vesselY,scale:vesselScale,shape:profile?.shape||'bowl',color:profile?.color||'#bd8056',quality:displayQuality,heat,burn:state?.burn,shock:state?.shock,reasonCode:state?.reasonCode,contrast,reducedMotion,now});
  // A glazed maker's mark quietly identifies the object without competing with the work.
  ctx.save();ctx.fillStyle=palette.gold;ctx.globalAlpha=contrast ? .95 : .85;
  ctx.beginPath();ctx.arc(360,484,4,0,Math.PI*2);ctx.fill();ctx.fillRect(356,490,8,2);ctx.restore();

  drawFuel(ctx,palette,state,lang);
  drawQuality(ctx,palette,{...state,quality:displayQuality},qualities,profile,lang,currentMode);
  // Visible message remains concise; facts above are always available independently.
  if(message){
    const messageText=String(message).replace(/\s+/g,' ').trim();
    drawFitText(ctx,messageText,360,568,10,palette.ink,430,{weight:680,align:'center'});
  }else if(currentMode==='running'){
    drawFitText(ctx,selectText(lang,'火種は止めても余熱を生みます','EMBERS KEEP ADDING HEAT AFTER YOU STOP'),360,568,9,palette.muted,440,{weight:650,align:'center'});
  }

  const controlMode=currentMode==='running'?'running':currentMode;
  drawStoke(ctx,palette,state,lang,controlMode,inputFeedback,reducedMotion);
  drawFinish(ctx,palette,state,description,lang,controlMode);
  drawVent(ctx,palette,state,lang,controlMode);
}


