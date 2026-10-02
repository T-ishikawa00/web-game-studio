const RUN_SECONDS=78;
const MIN_TEMP=80;
const MAX_TEMP=920;
const QUALITY_GOAL=54;
const PHASES=[
  {key:'warm',start:0,end:17,low:205,high:290,ja:'素地を温める',en:'Warm the clay',glaze:'#b67a53'},
  {key:'soften',start:17,end:38,low:385,high:475,ja:'釉をやわらげる',en:'Soften the glaze',glaze:'#d18a4d'},
  {key:'copper',start:38,end:58,low:565,high:655,ja:'銅色を起こす',en:'Wake the copper',glaze:'#c86e45'},
  {key:'soak',start:58,end:RUN_SECONDS,low:690,high:775,ja:'艶を定着させる',en:'Set the sheen',glaze:'#eca963'}
];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const materialBand=temp=>temp<320?0:temp<520?1:temp<685?2:3;
const roundRect=(c,x,y,w,h,r,fill,stroke)=>{
  c.beginPath();
  if(c.roundRect)c.roundRect(x,y,w,h,r);
  else{c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);}
  if(fill){c.fillStyle=fill;c.fill();}
  if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}
};
const text=(c,s,x,y,size,color,align='left',weight=600,maxWidth)=>{
  const small=(c.canvas?.clientWidth||720)<450;const scale=small?(size<16?1.9:1.3):1;c.font=weight+' '+(size*scale)+'px system-ui, sans-serif';c.fillStyle=color;c.textAlign=align;c.textBaseline='alphabetic';if(Number.isFinite(maxWidth))c.fillText(String(s),x,y,maxWidth);else c.fillText(String(s),x,y);
};
const bilingual=(lang,ja,en)=>lang==='ja'?ja:en;

export const KILN_RUN_SECONDS=RUN_SECONDS;
export const KILN_QUALITY_GOAL=QUALITY_GOAL;
export const KILN_PHASES=PHASES.map(p=>({...p}));

export function kilnPhaseAt(seconds){
  const t=Math.max(0,Number(seconds)||0);
  const found=PHASES.findIndex(p=>t<p.end);
  return found<0?PHASES.length-1:found;
}

export function createKilnState(seed=9){
  const s=Number(seed)>>>0;
  return {
    seed:s,elapsed:0,temperature:132,ember:.095,vent:.34,status:'running',reason:'',
    phaseIndex:0,goodSeconds:PHASES.map(()=>0),nearSeconds:PHASES.map(()=>0),
    quality:0,thermalShock:0,history:[132],historyClock:0,glazeSet:0,strokes:0
  };
}

export function stokeKiln(state,amount=.14){
  if(!state||state.status!=='running')return state;
  state.ember=clamp(state.ember+clamp(Number(amount)||0,0,.35),0,1);
  state.strokes++;
  return state;
}

export function setKilnVent(state,value){
  if(!state||state.status!=='running')return state;
  state.vent=clamp(Number(value)||0,0,1);
  return state;
}

export function kilnQuality(state){
  const scores=PHASES.map((p,i)=>{
    const duration=p.end-p.start;
    return clamp((state.goodSeconds[i]+state.nearSeconds[i]*.24)/duration,0,1);
  });
  return Math.round(scores.reduce((a,b)=>a+b,0)/scores.length*100);
}

function endKiln(state,status,reason){
  if(state.status!=='running')return state;
  state.status=status;state.reason=reason;
  state.quality=kilnQuality(state);
  return state;
}

export function stepKilnState(state,dt,input={}){
  if(!state||state.status!=='running')return state;
  const elapsed=Math.min(.1,Math.max(0,Number(dt)||0));
  if(elapsed===0)return state;
  if(Number.isFinite(input.vent))setKilnVent(state,input.vent);
  const phaseIndex=kilnPhaseAt(state.elapsed);
  const phase=PHASES[phaseIndex];
  state.phaseIndex=phaseIndex;
  state.ember=clamp(state.ember+(input.stoking ? .29 : -.105)*elapsed,0,1);
  const rate=1.25+state.ember*35-state.vent*(4.2+state.temperature*.0072);
  state.temperature=clamp(state.temperature+rate*elapsed,0,1000);
  if(Math.abs(rate)>22)state.thermalShock+=Math.max(0,Math.abs(rate)-22)*elapsed*.2;
  else state.thermalShock=Math.max(0,state.thermalShock-elapsed*1.4);
  if(state.temperature<MIN_TEMP&&state.elapsed>2)endKiln(state,'lost','cold-crack');
  else if(state.temperature>=MAX_TEMP)endKiln(state,'lost','overfire');
  else if(state.thermalShock>=8)endKiln(state,'lost','thermal-shock');
  if(state.status!=='running')return state;

  const margin=48;
  if(state.temperature>=phase.low&&state.temperature<=phase.high)state.goodSeconds[phaseIndex]+=elapsed;
  else if(state.temperature>=phase.low-margin&&state.temperature<=phase.high+margin)state.nearSeconds[phaseIndex]+=elapsed;
  const closeness=clamp((Math.min(state.temperature-phase.low,phase.high-state.temperature)+margin)/margin,0,1);
  state.glazeSet=clamp(state.glazeSet+elapsed*(state.temperature>=phase.low&&state.temperature<=phase.high?1:.14*closeness)/RUN_SECONDS,0,1);
  state.elapsed=Math.min(RUN_SECONDS,state.elapsed+elapsed);
  state.quality=kilnQuality(state);
  state.historyClock+=elapsed;
  if(state.historyClock>=.34){
    state.historyClock-=.34;state.history.push(state.temperature);
    if(state.history.length>64)state.history.shift();
  }
  state.phaseIndex=kilnPhaseAt(state.elapsed);
  if(state.elapsed>=RUN_SECONDS){
    if(state.temperature<640)endKiln(state,'lost','underfired');
    else if(state.temperature>825)endKiln(state,'lost','overfired');
    else if(state.quality<QUALITY_GOAL)endKiln(state,'lost','uneven-glaze');
    else endKiln(state,'won','glaze-set');
  }
  return state;
}

export const meta={
  id:'kiln',
  name:{ja:'窯守 — KILNKEEPER',en:'Kilnkeeper'},
  hook:{ja:'燃料をくべ、通気を調え、釉の温度帯を焼き分ける。',en:'Feed the fire, tune the vent, and hold each glaze band.'},
  controls:{ja:'「くべる」を押すか長押し。通気つまみはドラッグ。矢印キーで調整。Space / Enter は押している間くべます。',en:'Tap or hold STOKE. Drag the vent dial. Arrow keys adjust the vent; hold Space or Enter to stoke.'},
  goal:{ja:'素地を割らず、釉を焦がさず、最後の艶帯に78秒かけて熱を運ぶ。',en:'Carry heat through four glaze bands in 78 seconds without cracking the clay or burning the glaze.'},
  hint:{ja:'火種にも熱の余韻が残る。くべるのを止めても窯はすぐには冷めない。',en:'Heat has memory. Stop stoking early and the kiln will keep climbing for a while.'},
  accent:'#d97950',
  role:{ja:'通気と火種を読み、陶器の艶を仕上げる短時間の熱制御。',en:'A short thermal-control craft about reading embers and finishing ceramic glaze.'}
};

export function createGame({ctx,audio,settings=()=>({}),lang=()=> 'en',onReport=()=>{}}){
  let state=createKilnState(9),started=false,dragVent=false,pointerStoking=false,lastReportPhase=-1,lastReportedStatus='idle',lastHudSecond=-1;
  const heldStokeKeys=new Set();
  const isStoking=()=>pointerStoking||heldStokeKeys.size>0;
  let lastMaterialBand=materialBand(state.temperature);
  const getLang=()=>{try{return typeof lang==='function'?lang():lang;}catch{return'en';}};
  const getSettings=()=>{try{return typeof settings==='function'?settings()||{}:settings||{};}catch{return{};}};
  const emit=(status,detail,reason)=>{
    const value=status==='running'?kilnQuality(state):state.quality;
    onReport({status,value,goal:QUALITY_GOAL,detail,reason:['lost','won'].includes(status)?detail:reason});
    lastReportedStatus=status;
  };
  const detailFor=(status,reason)=>{
    const ja=getLang()==='ja';
    if(status==='won')return ja?'釉の艶が定着。銅色が窯の中で深まりました。':'The glaze has set. Copper deepens inside the kiln.';
    if(status==='lost'){
      const jaReasons={'cold-crack':'急冷で素地にひびが入りました。','overfire':'熱が上がりすぎて釉が焦げました。','thermal-shock':'温度を急に動かしすぎました。','underfired':'最後の艶帯まで熱が届きませんでした。','overfired':'最後の帯を越えて焼きすぎました。','uneven-glaze':'釉の温度帯にいる時間が足りません。'};
      const enReasons={'cold-crack':'The clay cracked as the kiln cooled too far.','overfire':'The glaze burned above its safe limit.','thermal-shock':'The temperature changed too sharply.','underfired':'The final glaze band never got hot enough.','overfired':'The firing passed the final band.','uneven-glaze':'The glaze needs more steady time in its target bands.'};
      return ja?jaReasons[reason]||'焼成が安定しませんでした。':enReasons[reason]||'The firing did not settle safely.';
    }
    if(status==='running')return ja?'火種は残熱を生みます。帯に近づいたら、くべる手を早めに止めて。':'Embers keep releasing heat. Stop feeding the kiln before the needle reaches the band.';
    return '';
  };
  const maybeReport=()=>{
    if(!started)return;
    if(state.status!=='running'){
      if(lastReportedStatus!==state.status){
        audio?.play?.(state.status==='won'?'finale':'fail');
        emit(state.status,detailFor(state.status,state.reason),state.reason);
      }
      return;
    }
    if(state.phaseIndex!==lastReportPhase){
      lastReportPhase=state.phaseIndex;
      if(lastReportPhase>0)audio?.play?.('step');
      const p=PHASES[state.phaseIndex];
      emit('running',bilingual(getLang(),p.ja+'。目標 '+p.low+'–'+p.high+'°',p.en+'. Target '+p.low+'–'+p.high+'°'));
    }
    const second=Math.floor(state.elapsed);
    if(second!==lastHudSecond){
      lastHudSecond=second;
      const p=PHASES[state.phaseIndex];
      emit('running',bilingual(getLang(),Math.round(state.temperature)+'° / '+p.low+'–'+p.high+'° · 火種 '+Math.round(state.ember*100)+'% · 通気 '+Math.round(state.vent*100)+'% · '+Math.ceil(RUN_SECONDS-state.elapsed)+'秒',Math.round(state.temperature)+'° / '+p.low+'–'+p.high+'° · EMBERS '+Math.round(state.ember*100)+'% · VENT '+Math.round(state.vent*100)+'% · '+Math.ceil(RUN_SECONDS-state.elapsed)+'s'));
    }
  };
  const reset=(seed=9,options={})=>{
    state=createKilnState(seed);started=true;dragVent=false;pointerStoking=false;heldStokeKeys.clear();lastReportPhase=-1;lastReportedStatus='idle';lastHudSecond=-1;
    lastMaterialBand=materialBand(state.temperature);
    if(Number.isFinite(options.vent))setKilnVent(state,options.vent);
    audio?.play?.('tap');
    maybeReport();
    return snapshot();
  };
  const snapshot=()=>({...state,history:[...state.history],goodSeconds:[...state.goodSeconds],nearSeconds:[...state.nearSeconds],started});
  const step=dt=>{
    if(!started||state.status!=='running')return;
    const wasPhase=state.phaseIndex,wasStatus=state.status,wasTemp=state.temperature;
    stepKilnState(state,dt,{stoking:isStoking(),vent:state.vent});
    const nextMaterialBand=materialBand(state.temperature);
    if(nextMaterialBand!==lastMaterialBand){
      if(nextMaterialBand>lastMaterialBand)audio?.play?.('impact',.8+state.temperature/1600);
      lastMaterialBand=nextMaterialBand;
    }
    maybeReport();
  };
  const stokeButton={x:62,y:572,w:194,h:126};
  const ventBox={x:328,y:572,w:334,h:126};
  const updateVent=p=>setKilnVent(state,(p.x-(ventBox.x+28))/(ventBox.w-56));
  const pointer=(kind,p={x:0,y:0})=>{
    const k=kind==='pointerdown'?'down':kind==='pointermove'?'move':kind==='pointerup'?'up':kind;
    if(k==='cancel'){dragVent=false;pointerStoking=false;return;}
    if(!started||state.status!=='running')return;
    if(k==='down'){
      if(p.x>=stokeButton.x&&p.x<=stokeButton.x+stokeButton.w&&p.y>=stokeButton.y&&p.y<=stokeButton.y+stokeButton.h){
        pointerStoking=true;stokeKiln(state,.12);audio?.play?.('tap');
      }else if(p.x>=ventBox.x&&p.x<=ventBox.x+ventBox.w&&p.y>=ventBox.y&&p.y<=ventBox.y+ventBox.h){
        dragVent=true;updateVent(p);audio?.play?.('swish');
      }
    }else if(k==='move'){
      if(dragVent)updateVent(p);
      if(pointerStoking&&!(p.x>=stokeButton.x-12&&p.x<=stokeButton.x+stokeButton.w+12&&p.y>=stokeButton.y-12&&p.y<=stokeButton.y+stokeButton.h+12))pointerStoking=false;
    }else if(k==='up'){dragVent=false;pointerStoking=false;}
  };
  const key=k=>{
    if(!started||state.status!=='running')return;
    const value=String(k).toLowerCase();
    if(value==='arrowleft'||value==='arrowdown'){setKilnVent(state,state.vent-.07);audio?.play?.('swish');}
    else if(value==='arrowright'||value==='arrowup'){setKilnVent(state,state.vent+.07);audio?.play?.('swish');}
    else if(value===' '||value==='space'||value==='spacebar'||value==='enter'){
      const token=value==='enter'?'enter':'space';
      if(!heldStokeKeys.has(token)){
        heldStokeKeys.add(token);
        stokeKiln(state,.12);
        audio?.play?.('tap');
      }
    }
  };
  const keyUp=k=>{
    const value=String(k).toLowerCase();
    if(value===' '||value==='space'||value==='spacebar')heldStokeKeys.delete('space');
    else if(value==='enter')heldStokeKeys.delete('enter');
  };
  const cancel=()=>{dragVent=false;pointerStoking=false;heldStokeKeys.clear();};

  const drawVessel=(c,t)=>{
    const heat=state.temperature,hot=clamp((heat-340)/390,0,1),melt=clamp((heat-495)/250,0,1);
    const clay=c.createLinearGradient(278,0,445,0);
    clay.addColorStop(0,'#7b4938');clay.addColorStop(.2,'#bd7954');clay.addColorStop(.51,'#e1b27d');clay.addColorStop(.76,'#ad6448');clay.addColorStop(1,'#58382f');
    c.save();c.shadowColor='rgba(255,112,58,'+(.12+hot*.27)+')';c.shadowBlur=getSettings().reducedMotion?10:14+hot*22;
    c.beginPath();c.moveTo(306,273);c.quadraticCurveTo(354,287,412,273);c.lineTo(405,300);c.bezierCurveTo(397,328,407,355,428,399);c.bezierCurveTo(451,447,438,502,412,525);c.quadraticCurveTo(362,546,310,525);c.bezierCurveTo(284,501,271,451,294,399);c.bezierCurveTo(316,355,325,328,315,300);c.closePath();
    c.fillStyle=clay;c.fill();c.shadowBlur=0;
    c.save();c.clip();
    const glazeAlpha=.14+hot*.42+melt*.22;
    c.fillStyle='rgba(190,91,54,'+glazeAlpha+')';c.fillRect(278,350,170,190);
    const phase=PHASES[state.phaseIndex]||PHASES[0];
    const flow=state.elapsed>58?clamp((state.elapsed-58)/20,0,1):0;
    c.fillStyle='rgba(218,'+(110+Math.round(flow*55))+','+(63+Math.round(flow*19))+','+(.1+hot*.35)+')';
    c.beginPath();c.moveTo(280,421);c.quadraticCurveTo(355,414+Math.sin(t*1.3)*2,445,425);c.lineTo(445,481+flow*24);c.quadraticCurveTo(420,489,410,475);c.quadraticCurveTo(395,466,385,499);c.quadraticCurveTo(375,520,362,489);c.quadraticCurveTo(346,457,328,486);c.quadraticCurveTo(307,497,280,480);c.closePath();c.fill();
    c.fillStyle=phase.glaze+'55';c.fillRect(280,330,165,30);
    c.globalAlpha=.48;
    c.strokeStyle='#fff1d6';c.lineWidth=3;c.beginPath();c.moveTo(310,319);c.quadraticCurveTo(294,367,301,412);c.stroke();
    c.globalAlpha=1;
    for(const [x,y,r] of [[331,376,2],[388,359,1.5],[342,447,2],[403,448,1.2],[323,480,1.5],[385,507,1.3]]){c.fillStyle='rgba(255,228,182,'+(.15+melt*.55)+')';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
    if(state.reason==='overfire'||state.reason==='overfired'){
      c.fillStyle='rgba(42,22,20,.72)';c.beginPath();c.moveTo(286,369);c.quadraticCurveTo(330,357,352,373);c.quadraticCurveTo(381,392,430,374);c.lineTo(450,425);c.quadraticCurveTo(411,447,382,420);c.quadraticCurveTo(339,392,292,430);c.closePath();c.fill();
      c.fillStyle='rgba(30,20,19,.58)';c.beginPath();c.ellipse(382,487,33,15,-.2,0,Math.PI*2);c.fill();
    }
    if(state.reason==='thermal-shock'||state.reason==='cold-crack'){
      const crack=(x,y,points)=>{
        c.strokeStyle='rgba(35,22,20,.9)';c.lineWidth=5;c.beginPath();c.moveTo(x,y);points.forEach(([dx,dy])=>c.lineTo(x+dx,y+dy));c.stroke();
        c.strokeStyle='rgba(255,222,190,.92)';c.lineWidth=1.5;c.beginPath();c.moveTo(x-1,y);points.forEach(([dx,dy])=>c.lineTo(x+dx-1,y+dy));c.stroke();
      };
      crack(309,374,[[13,17],[7,11],[18,25],[11,15],[20,20]]);
      crack(413,414,[[-13,17],[-8,14],[-17,26],[-7,15],[-18,23]]);
    }
    c.restore();
    c.strokeStyle='#f2c89c';c.lineWidth=3;c.beginPath();c.ellipse(359,274,54,9,.02,0,Math.PI*2);c.stroke();
    c.strokeStyle='rgba(72,37,29,.8)';c.lineWidth=2;c.beginPath();c.ellipse(359,275,40,5,0,0,Math.PI*2);c.stroke();
    c.restore();
  };
  const paintGauge=(c,palette)=>{
    const cx=148,cy=267,r=102,start=Math.PI*.77,end=Math.PI*2.23;
    const angle=v=>start+clamp((v-100)/800,0,1)*(end-start);
    const p=PHASES[state.phaseIndex]||PHASES[0];
    c.save();c.lineCap='round';c.lineWidth=12;c.strokeStyle=palette.track;c.beginPath();c.arc(cx,cy,r,start,end);c.stroke();
    c.lineWidth=15;c.strokeStyle=palette.zone;c.beginPath();c.arc(cx,cy,r,angle(p.low),angle(p.high));c.stroke();
    c.lineCap='butt';c.lineWidth=2;c.strokeStyle=palette.ticks;
    for(let i=0;i<=8;i++){const q=start+(end-start)*i/8,x1=cx+Math.cos(q)*(r-13),y1=cy+Math.sin(q)*(r-13),x2=cx+Math.cos(q)*(r-4),y2=cy+Math.sin(q)*(r-4);c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();}
    const needle=angle(state.temperature);
    c.strokeStyle=palette.needle;c.lineWidth=4;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(needle)*(r-18),cy+Math.sin(needle)*(r-18));c.stroke();
    c.fillStyle=palette.needle;c.beginPath();c.arc(cx,cy,7,0,Math.PI*2);c.fill();
    text(c,getLang()==='ja'?'窯温':'KILN',cx,cy-19,12,palette.muted,'center',700);
    text(c,Math.round(state.temperature)+'°',cx,cy+31,30,palette.text,'center',750);
    text(c,getLang()==='ja'?'目標帯':'WORK BAND',cx,cy+55,10,palette.muted,'center',700);
    text(c,p.low+' — '+p.high+'°',cx,cy+73,13,palette.text,'center',650);
    c.restore();
  };
  const drawTrace=(c,palette)=>{
    const x=505,y=211,w=167,h=95,low=PHASES[state.phaseIndex].low,high=PHASES[state.phaseIndex].high;
    roundRect(c,x,y,w,h,14,palette.panel,palette.border);
    text(c,getLang()==='ja'?'熱の記録':'THERMAL TRACE',x+12,y+20,10,palette.muted,'left',700);
    const top=y+31,bottom=y+h-13,chartH=bottom-top;
    c.fillStyle=palette.zone+'44';
    const yHi=bottom-(high/900)*chartH,yLo=bottom-(low/900)*chartH;
    c.fillRect(x+8,yHi,w-16,yLo-yHi);
    c.strokeStyle=palette.grid;c.lineWidth=1;c.beginPath();c.moveTo(x+8,bottom);c.lineTo(x+w-8,bottom);c.stroke();
    c.strokeStyle=palette.needle;c.lineWidth=2;c.beginPath();
    const hist=state.history;
    hist.forEach((v,i)=>{const px=x+8+(w-16)*i/Math.max(hist.length-1,1),py=bottom-clamp(v/900,0,1)*chartH;i?c.lineTo(px,py):c.moveTo(px,py);});
    c.stroke();
    c.fillStyle=palette.needle;c.beginPath();c.arc(x+w-8,bottom-clamp(state.temperature/900,0,1)*chartH,3,0,Math.PI*2);c.fill();
  };
  const drawControls=(c,palette)=>{
    const stoke=stokeButton,vent=ventBox;
    roundRect(c,44,553,632,157,24,palette.panel,palette.border);
    const stoking=isStoking();
    c.save();c.shadowColor=palette.fire;c.shadowBlur=stoking&&!getSettings().reducedMotion?25:8;
    c.fillStyle=stoking?palette.fire:palette.fireDark;c.beginPath();c.arc(stoke.x+stoke.w/2,stoke.y+stoke.h/2,47,0,Math.PI*2);c.fill();c.restore();
    c.strokeStyle='#ffd49a';c.lineWidth=2;c.beginPath();c.arc(stoke.x+stoke.w/2,stoke.y+stoke.h/2,47,0,Math.PI*2);c.stroke();
    text(c,getLang()==='ja'?'くべる':'STOKE',stoke.x+stoke.w/2,stoke.y+stoke.h/2+7,18,'#fff2dc','center',800);
    text(c,getLang()==='ja'?'押す / 長押し':'TAP / HOLD',stoke.x+stoke.w/2,stoke.y+stoke.h/2+28,9,'#ffe0bf','center',650);
    text(c,getLang()==='ja'?'通気':'VENT',vent.x+8,vent.y+28,12,palette.muted,'left',700);
    const left=vent.x+20,right=vent.x+vent.w-20,yy=vent.y+67;
    c.strokeStyle=palette.track;c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(left,yy);c.lineTo(right,yy);c.stroke();
    c.strokeStyle=palette.zone;c.lineWidth=5;c.beginPath();c.moveTo(left,yy);c.lineTo(left+(right-left)*state.vent,yy);c.stroke();
    for(let i=0;i<=4;i++){const xx=left+(right-left)*i/4;c.strokeStyle=palette.ticks;c.lineWidth=2;c.beginPath();c.moveTo(xx,yy-9);c.lineTo(xx,yy+9);c.stroke();}
    const vx=left+(right-left)*state.vent;
    c.fillStyle=palette.handle;c.beginPath();c.arc(vx,yy,16,0,Math.PI*2);c.fill();c.strokeStyle=palette.text;c.lineWidth=2;c.stroke();
    text(c,getLang()==='ja'?'閉じる':'CLOSED',left,yy+29,9,palette.muted,'left',600);
    text(c,getLang()==='ja'?'開く':'OPEN',right,yy+29,9,palette.muted,'right',600);
    text(c,Math.round(state.vent*100)+'%',right,vent.y+27,12,palette.text,'right',700);
    if((c.canvas?.clientWidth||720)<450){
      text(c,getLang()==='ja'?'←/↓ 閉 · ↑/→ 開':'←/↓ CLOSE · ↑/→ OPEN',vent.x+11,vent.y+105,8,palette.muted,'left',600);
      text(c,getLang()==='ja'?'Space / Enter 長押し':'HOLD SPACE / ENTER',vent.x+11,vent.y+123,8,palette.muted,'left',600);
    }else{
      text(c,getLang()==='ja'?'← / ↓ 弱める　↑ / → 開く　Space / Enter 押してくべる':'← / ↓ close · ↑ / → open · hold Space / Enter to stoke',vent.x+11,vent.y+117,10,palette.muted,'left',600);
    }
    c.restore();
  };
  const render=(t=0)=>{
    if(!ctx)return;
    const hc=!!getSettings().highContrast,rm=!!getSettings().reducedMotion;
    const palette=hc
      ?{bg:'#05070a',panel:'#111820',border:'#ffffff',text:'#ffffff',muted:'#e7edf1',track:'#697783',ticks:'#e7edf1',grid:'#52616d',zone:'#ffd34d',needle:'#ff764f',handle:'#ffd34d',fire:'#ff532b',fireDark:'#ad2f19'}
      :{bg:'#151216',panel:'#211a1a',border:'#5d443b',text:'#f4e8d6',muted:'#b5a294',track:'#403333',ticks:'#ac9481',grid:'#493833',zone:'#dc9564',needle:'#f3bb73',handle:'#ead5bd',fire:'#f06d3c',fireDark:'#9f432f'};
    ctx.save();ctx.clearRect(0,0,720,720);ctx.fillStyle=palette.bg;ctx.fillRect(0,0,720,720);
    const glow=ctx.createRadialGradient(357,352,35,357,352,385);glow.addColorStop(0,'rgba(154,70,44,'+(.17+clamp((state.temperature-240)/900,0,.12))+')');glow.addColorStop(1,'rgba(21,18,22,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,720,720);
    text(ctx,'FIELD NOTE  04   /   CERAMIC FIRING',48,38,10,palette.muted,'left',700);
    text(ctx,bilingual(getLang(),PHASES[state.phaseIndex].ja,PHASES[state.phaseIndex].en),48,78,27,palette.text,'left',700);
    text(ctx,Math.max(0,Math.ceil(RUN_SECONDS-state.elapsed))+'s',670,48,19,palette.text,'right',700);
    const progress=clamp(state.elapsed/RUN_SECONDS,0,1),px=48,py=98,pw=624;
    roundRect(ctx,px,py,pw,6,3,palette.track);
    roundRect(ctx,px,py,pw*progress,6,3,palette.zone);
    PHASES.forEach((p,i)=>{const x=px+pw*p.end/RUN_SECONDS;ctx.fillStyle=i<=state.phaseIndex?palette.zone:palette.track;ctx.beginPath();ctx.arc(Math.min(x,px+pw),py+3,4,0,Math.PI*2);ctx.fill();});
    const oven=ctx.createLinearGradient(0,158,0,552);oven.addColorStop(0,'#392a29');oven.addColorStop(.55,'#251d1d');oven.addColorStop(1,'#171316');
    roundRect(ctx,245,154,235,397,82,oven,'#745346');
    ctx.strokeStyle='#b37150';ctx.lineWidth=2;ctx.beginPath();ctx.arc(362,332,160,Math.PI,Math.PI*2);ctx.stroke();
    ctx.fillStyle='#171316';ctx.beginPath();ctx.ellipse(362,520,122,27,0,0,Math.PI*2);ctx.fill();
    if(state.temperature>310){
      const fireA=rm ? .10 :(.09+.1*(.5+.5*Math.sin((Number(t)||0)*5)));
      ctx.fillStyle='rgba(238,103,52,'+(fireA+clamp((state.temperature-500)/1800,0,.18))+')';ctx.beginPath();ctx.ellipse(362,477,100,40,0,Math.PI,Math.PI*2);ctx.fill();
    }
    drawVessel(ctx,rm?0:(Number(t)||0));
    paintGauge(ctx,palette);
    drawTrace(ctx,palette);
    text(ctx,(ctx.canvas?.clientWidth||720)<450?bilingual(getLang(),'釉の変化','GLAZE SHIFT'):bilingual(getLang(),'釉の変化','GLAZE TRANSFORMATION'),510,344,10,palette.muted,'left',700);
    const heat=state.temperature;
    const failureLabel=state.reason==='thermal-shock'||state.reason==='cold-crack'
      ?bilingual(getLang(),'素地にひび','BODY CRACKED')
      :state.reason==='overfire'||state.reason==='overfired'
        ?bilingual(getLang(),'釉が焦げた','GLAZE SCORCHED')
        :state.reason==='underfired'
          ?bilingual(getLang(),'艶が未定着','GLAZE UNDERFIRED')
          :null;
    const materialLabel=failureLabel||(heat<320?bilingual(getLang(),'石肌 — 乾いた素地','STONE — DRY'):heat<520?bilingual(getLang(),'釉がほどける','GLAZE SOFTENS'):heat<685?bilingual(getLang(),'酸化銅が立つ','COPPER BLOOMS'):bilingual(getLang(),'艶が定着する','SHEEN SETS'));
    text(ctx,materialLabel,510,367,12,palette.text,'left',650);
    text(ctx,getLang()==='ja'?'火種':'EMBER',510,408,10,palette.muted,'left',700);
    roundRect(ctx,510,421,150,8,4,palette.track);
    roundRect(ctx,510,421,150*state.ember,4,2,palette.fire);
    text(ctx,getLang()==='ja'?'残熱が続く':'HEAT CARRIES',510,448,9,palette.muted,'left',600);
    text(ctx,getLang()==='ja'?'釉の記録':'GLAZE RECORD',510,483,10,palette.muted,'left',700);
    text(ctx,state.quality+'%',510,514,23,palette.text,'left',700);
    text(ctx,bilingual(getLang(),'帯の滞在＝均一な艶','IN-BAND TIME = EVEN GLAZE'),510,535,8,palette.muted,'left',550,160);
    drawControls(ctx,palette);
    if(!started){
      roundRect(ctx,246,182,230,32,16,'#201817','#8e5b46');
      text(ctx,bilingual(getLang(),'焼成前 / READY TO FIRE','READY TO FIRE'),361,203,10,palette.text,'center',700);
      text(ctx,getLang()==='ja'?'くべると温度が遅れて上がる':'Fuel warms the kiln after a delay.',360,548,10,palette.muted,'center',600);
    }else if(state.status!=='running'){
      ctx.fillStyle='rgba(12,10,13,.72)';ctx.fillRect(70,190,580,322);
      roundRect(ctx,136,250,448,190,24,palette.panel,palette.border);
      text(ctx,state.status==='won'?bilingual(getLang(),'艶が定着した','GLAZE SET'):bilingual(getLang(),'焼成をやり直す','FIRING LOST'),360,300,25,palette.text,'center',750);
      const outcome=state.status==='won'
        ?bilingual(getLang(),'銅の釉に艶が定着。','COPPER GLAZE SET EVENLY.')
        :({
          'cold-crack':bilingual(getLang(),'急冷で素地にひびが入りました。','THE CLAY CRACKED IN THE COLD.'),
          'overfire':bilingual(getLang(),'熱が上がりすぎて釉が焦げました。','EXCESS HEAT BURNED THE GLAZE.'),
          'thermal-shock':bilingual(getLang(),'温度が急に動き、素地にひびが入りました。','A SHARP HEAT SHIFT CRACKED THE CLAY.'),
          'underfired':bilingual(getLang(),'最後の艶帯まで熱が届きませんでした。','THE FINAL GLAZE BAND STAYED TOO COOL.'),
          'overfired':bilingual(getLang(),'最後の帯を越えて焼きすぎました。','THE KILN PASSED THE FINAL BAND.'),
          'uneven-glaze':bilingual(getLang(),'釉の温度帯にいる時間が足りません。','MORE STEADY TIME IS NEEDED IN THE BANDS.')
        }[state.reason]||bilingual(getLang(),'焼成が安定しませんでした。','THE FIRING DID NOT SETTLE SAFELY.'));
      text(ctx,outcome,360,340,13,palette.text,'center',600,390);
      text(ctx,state.quality+'%',360,391,34,palette.zone,'center',750);
      text(ctx,bilingual(getLang(),'もう一度、火種と通気を合わせる','Reset to tune the ember and vent again.'),360,420,11,palette.muted,'center',600);
    }
    ctx.restore();
  };
  return {reset,step,render,pointer,key,keyUp,cancel,snapshot};
}
