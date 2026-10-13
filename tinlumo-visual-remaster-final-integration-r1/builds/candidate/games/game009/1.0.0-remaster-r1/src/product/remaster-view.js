import {drawVessel as legacyVessel} from './kiln-render-legacy.js';
import {getLayout,ventTrack} from './remaster-layout.js';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,Number(v)||0));
const images={};
for(const name of ['kiln-empty','bowl-states','vase-states','pitcher-states']){
 if(typeof Image!=='undefined'){const im=new Image();im.src=new URL('../../art/'+name+'.webp',import.meta.url);images[name]=im;}
}
const rects={bowl:[[27,223,397,281],[458,222,402,283],[887,222,403,283],[1312,222,409,283],[1750,222,396,282]],vase:[[15,145,358,539],[414,145,359,539],[812,145,358,539],[1209,145,361,539],[1609,145,360,539]],pitcher:[[31,232,364,386],[427,232,363,386],[822,233,364,386],[1213,232,370,388],[1609,229,361,389]]};
// Temperature is deliberately absent: heat is not glaze quality or damage.
export function materialState({quality=0,burn=0,shock=0,reasonCode='',status='running'}={}){
 if(['cold-crack','thermal-shock','shock'].includes(reasonCode)||shock>=9)return {a:4,b:4,mix:0,label:'cracked'};
 if(['overfire','burn'].includes(reasonCode)||burn>0)return {a:3,b:3,mix:0,label:'scorched'};
 const q=status==='lost'?Math.min(35,clamp(quality,0,100)):clamp(quality,0,100);
 return q<50?{a:0,b:1,mix:q/50,label:q===0?'matte':'partial'}:{a:1,b:2,mix:(q-50)/50,label:q===100?'glazed':'partial'};
}
function round(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke();}}
function text(ctx,s,x,y,size=16,color='#fff3d5',max=660,align='left',weight=600){ctx.font=`${weight} ${size}px system-ui,"Noto Sans JP",sans-serif`;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillStyle=color;ctx.fillText(String(s),x,y,max);}
const label=(v,lang)=>typeof v==='object'?v?.[lang]||v?.en||'':v||'';
const caches=new Map();
function background(ctx,layout,contrast){
 const im=images['kiln-empty'],key=layout.height+':'+contrast;
 if(im?.complete&&im.naturalWidth){
  if(!caches.has(key)){const c=document.createElement('canvas');c.width=1440;c.height=layout.height*2;const g=c.getContext('2d');g.scale(2,2);g.fillStyle='#281e16';g.fillRect(0,0,720,layout.height);
   const size=layout.mobile?1090:1044,x=(720-size)/2,y=layout.mobile?66:(720-size)*.42;g.drawImage(im,x,y,size,size);
   if(contrast){g.fillStyle='#0009';g.fillRect(0,0,720,layout.height);}caches.set(key,c);
  }ctx.drawImage(caches.get(key),0,0,720,layout.height);
 }else{ctx.fillStyle='#281e16';ctx.fillRect(0,0,720,layout.height);}
}
export function drawVessel(ctx,options={}){
 const {x=360,y=360,scale=1,shape='bowl'}=options,kind=rects[shape]?shape:'bowl',im=images[kind+'-states'];
 if(!im?.complete||!im.naturalWidth){legacyVessel(ctx,options);return;}
 const state=materialState(options),w=(kind==='bowl'?178:kind==='vase'?127:162)*scale,h=(kind==='bowl'?102:kind==='vase'?185:170)*scale;
 ctx.save();ctx.fillStyle='#130b08a0';ctx.beginPath();ctx.ellipse(x,y-2,w*.45,8*scale,0,0,Math.PI*2);ctx.fill();
 const draw=(idx,a)=>{const r=rects[kind][idx];ctx.globalAlpha=a;ctx.drawImage(im,...r,x-w/2,y-h,w,h);};draw(state.a,1);if(state.b!==state.a&&state.mix>0)draw(state.b,state.mix);ctx.restore();
}
export function drawKiln(ctx,{state={},profile={},description={},stageIndex=0,qualities=[],lang='en',settings={},now=0,mode='preview',message='',inputFeedback={}}={}){
 if(!ctx)return;const layout=getLayout(ctx.canvas),m=layout.mobile,H=layout.height;
 if(ctx.canvas&&(ctx.canvas.width!==1440||ctx.canvas.height!==H*2)){ctx.canvas.width=1440;ctx.canvas.height=H*2;}
 const stage=ctx.canvas?.parentElement;if(stage?.id==='stage'&&stage.dataset.remasterLayout!==(m?'portrait':'square'))stage.dataset.remasterLayout=m?'portrait':'square';
 ctx.save();ctx.setTransform(2,0,0,2,0,0);
 const contrast=!!(settings.highContrast||settings.contrast),reduced=!!(settings.reducedMotion||settings.reduceMotion),t=(ja,en)=>lang==='ja'?ja:en;
 background(ctx,layout,contrast);
 const panel=contrast?'#100e0d':'#211c17f5',edge=contrast?'#fff4d9':'#a18b65',muted=contrast?'#fff3d5':'#e0c7a5',gold='#ffdd91';
 const font=m?2:1,phase=profile.phases?.[state.phaseIndex||0]||{},next=profile.phases?.[(state.phaseIndex||0)+1],phaseName=label(phase.name,lang),name=label(profile.name,lang);
 const vesselBase=m?590:365;
 if(mode==='result'||mode==='interlude'){
  const lost=state.status==='lost',set=mode==='result'&&!lost&&stageIndex>=2;
  text(ctx,lost?t('焼成をやり直す','FIRING DID NOT FINISH'):set?t('三つの器が焼き上がりました','THREE VESSELS, FIRED'):t('器が焼き上がりました','VESSEL FIRED'),360,m?83:58,18*font,lost?'#ffc58c':gold,660,'center');
  if(set){['bowl','vase','pitcher'].forEach((shape,i)=>{drawVessel(ctx,{x:200+i*160,y:m?550:315,scale:m?1:.75,shape,quality:qualities[i]||0,status:'won'});text(ctx,`${Math.round(qualities[i]||0)}%`,200+i*160,m?615:358,20*font,gold,140,'center');});}
  else{drawVessel(ctx,{x:360,y:m?570:312,scale:m?1.4:1.22,shape:profile.shape,...state});text(ctx,lost?t('未完成 · 再挑戦','UNFINISHED · RETRY'):Math.round(state.quality||0)+'%',360,m?640:358,20*font,lost?'#ffc58c':gold,620,'center');}
  ctx.restore();return;
 }
 text(ctx,name,28,m?64:39,17*font,'#fff3d5',440);
 text(ctx,`${phaseName} · ${t('器','VESSEL')} ${stageIndex+1} / 3`,28,m?105:63,11*font,gold,460);
 const left=Math.ceil(description.secondsRemaining??Math.max(0,(profile.totalDuration||0)-(state.elapsed||0)));
 text(ctx,mode==='preview'?t('準備','READY'):t(`残り ${left}秒`,`${left}s LEFT`),692,m?64:39,16*font,'#fff3d5',230,'right');
 const py=m?140:86,ph=m?198:105,pw=mode==='preview'?338:338;
 const warn=Number(state.temperature)>Number(phase.high),currentText=warn?t('▲ 目標帯を超過','▲ ABOVE TARGET'):phaseName;
 round(ctx,28,py,pw,ph,10,warn?'#4a251ff5':panel,warn?'#ffc58c':edge);round(ctx,378,py,314,ph,10,panel,edge);
 text(ctx,t(`現在の帯 ${phase.low??'—'}–${phase.high??'—'}°`,`CURRENT ${phase.low??'—'}–${phase.high??'—'}°`),43,py+25*font,12*font,muted,pw-30);
 text(ctx,`${Math.round(state.temperature||0)}°`,43,py+59*font,26*font,'#fff3d5',pw-30);
 text(ctx,currentText,43,py+87*font,14*font,gold,pw-30);
 text(ctx,t('次の目標','NEXT TARGET'),393,py+25*font,12*font,muted,280);
 text(ctx,next?`${next.low}–${next.high}°`:t('仕上げ','FINISH'),393,py+59*font,22*font,'#e4d6b7',280);
 text(ctx,next?t(`あと ${Math.ceil(description.secondsToNext||0)} 秒`,`IN ${Math.ceil(description.secondsToNext||0)}s`):t('条件が整ったら','WHEN READY'),393,py+87*font,14*font,gold,280);
 const heat=clamp((Number(state.temperature)-150)/800),ember=clamp(state.ember),flicker=reduced?1:1+.07*Math.sin(now*3.2);
 if(heat>.05){const g=ctx.createRadialGradient(360,vesselBase-10,20,360,vesselBase-10,200);g.addColorStop(0,`rgba(255,137,37,${.18*heat*flicker})`);g.addColorStop(1,'#ff882000');ctx.fillStyle=g;ctx.fillRect(140,vesselBase-200,440,240);}
 if(ember>.18){ctx.save();ctx.globalAlpha=clamp(.15+ember*.35);ctx.strokeStyle='#ffd994';ctx.lineWidth=2;for(let i=0;i<6;i++){const x=155+i*82,y=vesselBase+32-(reduced?i*5:((now*18+i*29)%58));ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+2,y-4);ctx.stroke();}ctx.restore();}
 drawVessel(ctx,{x:360,y:vesselBase,shape:profile.shape,scale:1,...state});
 const iy=m?648:431,ih=m?214:107,iw=m?300:192;
 round(ctx,28,iy,iw,ih,10,panel,edge);round(ctx,692-iw,iy,iw,ih,10,panel,edge);
 const fuel=clamp(state.fuel/Math.max(.001,state.fuelMax||1));
 for(const [x,title,value,bar,detail] of [[42,t('薪と火種','FUEL & EMBERS'),Math.round(fuel*100),fuel,t(`火種 ${Math.round(ember*100)}%`,`EMBER ${Math.round(ember*100)}%`)],[706-iw,t('釉の仕上がり','GLAZE QUALITY'),Math.round(state.quality||0),clamp(state.quality/100),t(`目標 ${profile.qualityGoal||0}%`,`GOAL ${profile.qualityGoal||0}%`)]] ){
  text(ctx,title,x,iy+26*font,12*font,muted,iw-28);text(ctx,value+'%',x,iy+58*font,23*font,'#fff3d5',iw-28);round(ctx,x,iy+68*font,iw-28,5*font,2,'#504330');if(bar>0)round(ctx,x,iy+68*font,(iw-28)*bar,5*font,2,gold);text(ctx,detail,x,iy+94*font,11*font,muted,iw-28);
 }
 const ready=mode==='running'&&state.status==='running',finishReady=ready&&description.finishReady;
 for(const [id,box] of Object.entries(layout.controls)){
  if(id==='vent')continue;const held=id==='stoke'&&ready&&(inputFeedback.stokeHeld||inputFeedback.stokePulseSeconds>0),fill=id==='stoke'?(ready?(held?'#c26b3d':'#954426'):'#563d2a'):(finishReady?'#ffda93':'#2d271ff5');
  round(ctx,box.x,box.y,box.w,box.h,12,fill,held?'#fff4b3':edge);
  const cx=box.x+box.w/2,c=id==='finish'&&finishReady?'#302214':'#fff2ce';text(ctx,id==='stoke'?'♨':finishReady?'◇':'◇',cx,box.y+(m?51:39),29*font,c,box.w-20,'center');
  text(ctx,id==='stoke'?t('くべる','STOKE'):finishReady?t('仕上げる','FINISH'):t('仕上げ待ち','WHEN READY'),cx,box.y+(m?98:73),16*font,c,box.w-24,'center');
  text(ctx,id==='stoke'?t('長押しで加熱','HOLD TO HEAT'):t('仕上げ','FINISH'),cx,box.y+(m?131:96),10*font,c,box.w-24,'center',400);
 }
 const v=layout.controls.vent,track=ventTrack(layout),vent=clamp(state.vent);round(ctx,v.x,v.y,v.w,v.h,12,'#342a21f5',edge);
 if(m){text(ctx,t('通気','VENT'),v.x+26,v.y+88,16*font,'#fff2ce',105);text(ctx,Math.round(vent*100)+'%',v.x+v.w-24,v.y+88,16*font,gold,106,'right');}
 else{text(ctx,t('通気','VENT'),v.x+v.w/2,v.y+25,16,'#fff2ce',180,'center');text(ctx,Math.round(vent*100)+'%',v.x+v.w/2,v.y+94,17,gold,180,'center');}
 ctx.lineCap='round';ctx.lineWidth=m?9:5;ctx.strokeStyle='#bfa576';ctx.beginPath();ctx.moveTo(track.left,track.y);ctx.lineTo(track.left+track.width,track.y);ctx.stroke();ctx.fillStyle=gold;ctx.beginPath();ctx.arc(track.left+track.width*vent,track.y,m?26:12,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#fff2ce';ctx.lineWidth=2;ctx.stroke();
 text(ctx,t('閉','CLOSE'),track.left,v.y+(m?131:108),m?20:9,muted,100);text(ctx,t('開','OPEN'),track.left+track.width,v.y+(m?131:108),m?20:9,muted,100,'right');
 ctx.restore();
}
