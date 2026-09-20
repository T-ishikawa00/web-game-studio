import './style.css';
import {stages,options} from './progression';
import {MagnetWorld,TUNE,clamp} from './core';
import {MagnetArt} from './art';
import {MagnetAudio} from './audio';
const canvas=document.querySelector<HTMLCanvasElement>('#arena')!,portrait=innerHeight>innerWidth;
const world=new MagnetWorld(portrait?540:960,portrait?820:640),art=new MagnetArt(canvas,world),audio=new MagnetAudio();
const $=(id:string)=>document.getElementById(id)!;
let muted=false,userPaused=false,hidden=false,toastUntil=0,emptyTipAt=-10,last=0,acc=0,frameTimes:number[]=[];
let ja=new URLSearchParams(location.search).get('lang')!=='en',choiceSignature='';
const tr=(en:string,jp:string)=>ja?jp:en;
function localize(){document.documentElement.lang=ja?'ja':'en';$('language').textContent=ja?'EN':'日本語';document.querySelector('.hint-desktop')!.innerHTML=ja?'<kbd>W A S D</kbd> 移動 · 押して吸引 → 狙って離す':'<kbd>W A S D</kbd> move · hold to gather → release to launch';document.querySelector('.hint-touch')!.textContent=tr('Left thumb moves · Right thumb gathers & aims','左指で移動 · 右指で吸引・照準 → 離して射出');$('retry').textContent=tr('ANOTHER RUN ↗','もう一度 ↗');}
localize();
const keys=new Set<string>();
let movePointer:number|null=null,aimPointer:number|null=null,moveOrigin={x:0,y:0},aimOrigin={x:0,y:0};
let stickMove={x:0,y:0};
world.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function resetInput(){keys.clear();movePointer=null;aimPointer=null;stickMove={x:0,y:0};world.cancel();audio.pull(false,0);$('aim-stick').classList.remove('active');for(const id of ['move-stick','aim-stick'])($(id).querySelector('i') as HTMLElement).style.transform='';}
function pause(){world.paused=userPaused||hidden;audio.setPaused(world.paused||world.encounter==='choice');if(world.paused)resetInput();$('pause-overlay').hidden=!userPaused;$('pause').textContent=userPaused?'▶':'Ⅱ';$('pause').setAttribute('aria-label',userPaused?'Resume':'Pause');}
function restart(){choiceSignature='';resetInput();audio.setPaused(true);world.reset();userPaused=false;pause();$('toast').classList.remove('show');toastUntil=0;$('result').hidden=true;$('hint').style.opacity='1';acc=0;}
function toast(text:string,duration=1.5){$('toast').textContent=text;toastUntil=world.time+duration;$('toast').classList.add('show');}
world.onEvent=e=>{
 audio.setExtended(world.runTime>=30);
 if(['snap','launch','hit','break','upgrade','bump'].includes(e.kind))audio.event(e.kind as 'snap',e.value);
 if(world.runTime>=30&&['block','damage','complete'].includes(e.kind))audio.event(e.kind as 'block',e.value);
 if(world.runTime>=30&&e.kind==='enemy-windup')audio.event('warning',e.value);
 if(e.kind==='upgrade')toast(e.value===1?tr('RECLAIMED / MAGNET II','装甲回収 / MAGNET II'):world.build.toUpperCase()+' / EVOLUTION '+world.evolution,2);
 if(e.kind==='relay-empty'&&world.time>emptyTipAt+5){emptyTipAt=world.time;toast(tr('RECOVER ENEMY ARMOR / EMPTY METAL HAS NO CHARGE','敵の装甲を回収しよう / 空の金属は送電できない'),2);}
 if(e.kind==='power-window')toast(tr('POWER SURGE / GUARDS OPEN · FLOOR SAFE','送電成功 / 敵の盾を開放・床の電流停止'),2);
 if(e.kind==='relay-hit')audio.event('snap',1);if(e.kind==='relay-complete')audio.event('upgrade',1);
 if(e.kind.startsWith('stage-start'))toast(stages[world.stage]![ja?1:0]!,2);
 if(e.kind.startsWith('stage-clear')){resetInput();$('toast').classList.remove('show');toastUntil=0;}
 if(e.kind==='circuit-secured')audio.event('complete',.7);
 if(e.kind==='equip'&&world.evolution===0)audio.event('upgrade',.6);
 if(e.kind.startsWith('choice-open')){resetInput();audio.setPaused(true);}
 if(e.kind==='reactor-lock')toast(tr('NEXT RELAY / BREAK THE LOCK','次の設備へ送電 / 装甲を解除'),2); 
 if(e.kind==='phase-1')toast('FLANK THE SHIELD · OR CRACK ITS PLATE',3);
 if(e.kind==='phase-2')toast('BAIT THE CHARGE · STRIKE THE OPEN CORE',3);
 if(e.kind==='phase-3')toast('FURNACE SHIFT / HOLD YOUR GROUND',2);
 if(e.kind==='elite-arrival')toast('THE FOREMAN / BREAK THE CORE',2.5);
 if(e.kind==='empty')toast('HOLD NEAR METAL',1);
 if(e.kind==='launch')$('hint').style.opacity='0';
};
const movement=()=>{world.move={x:stickMove.x+(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0),y:stickMove.y+(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0)};};
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('pointerdown',e=>{
 if(e.button!==0||world.paused||world.over||world.won||world.encounter!=='combat')return;e.preventDefault();void audio.unlock();canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);
 const touch=e.pointerType!=='mouse',b=canvas.getBoundingClientRect();
 if(touch&&e.clientX-b.left<b.width*.43&&movePointer===null){movePointer=e.pointerId;moveOrigin={x:e.clientX,y:e.clientY};}
 else if(aimPointer===null){aimPointer=e.pointerId;aimOrigin={x:e.clientX,y:e.clientY};if(!touch)world.aim=art.point(e.clientX,e.clientY);else{const nearest=world.enemies.filter(x=>!x.dead).sort((a,b)=>Math.hypot(a.x-world.player.x,a.y-world.player.y)-Math.hypot(b.x-world.player.x,b.y-world.player.y))[0];if(nearest)world.aim={x:nearest.x,y:nearest.y};}world.startHold();$('aim-stick').classList.add('active');}
});
canvas.addEventListener('pointermove',e=>{
 if(e.pointerType==='mouse'){world.aim=art.point(e.clientX,e.clientY);return;}
 if(e.pointerId===movePointer){const dx=e.clientX-moveOrigin.x,dy=e.clientY-moveOrigin.y,mag=Math.hypot(dx,dy),scale=Math.min(1,mag/38)/(mag||1);stickMove={x:dx*scale,y:dy*scale};movement();($('move-stick').querySelector('i') as HTMLElement).style.transform=`translate(${stickMove.x*23}px,${stickMove.y*23}px)`;}
 if(e.pointerId===aimPointer){const dx=e.clientX-aimOrigin.x,dy=e.clientY-aimOrigin.y,len=Math.hypot(dx,dy);if(len>7){world.aim={x:world.player.x+dx/len*260,y:world.player.y+dy/len*260};($('aim-stick').querySelector('i') as HTMLElement).style.transform=`translate(${dx/len*23}px,${dy/len*23}px)`;}}
});
function endPointer(e:PointerEvent,cancelled:boolean){if(e.pointerId===movePointer){movePointer=null;stickMove={x:0,y:0};movement();($('move-stick').querySelector('i') as HTMLElement).style.transform='';}if(e.pointerId===aimPointer){aimPointer=null;cancelled?world.cancel():world.release();movement();audio.pull(false,0);$('aim-stick').classList.remove('active');($('aim-stick').querySelector('i') as HTMLElement).style.transform='';}if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}
canvas.addEventListener('pointerup',e=>endPointer(e,false));canvas.addEventListener('pointercancel',e=>endPointer(e,true));canvas.addEventListener('lostpointercapture',e=>endPointer(e,true));
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLAnchorElement)return;const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)){e.preventDefault();if(world.paused||world.encounter!=='combat')return;void audio.unlock();keys.add(k);movement();if(k===' '&&!e.repeat)world.startHold();}if(k==='r'&&!e.repeat)restart();if(k==='escape'&&!e.repeat){userPaused=!userPaused;pause();}});
window.addEventListener('keyup',e=>{const k=e.key.toLowerCase();keys.delete(k);movement();if(k===' '){world.release();audio.pull(false,0);}});
window.addEventListener('blur',()=>{resetInput();hidden=true;pause();});window.addEventListener('focus',()=>{hidden=document.hidden;pause();});document.addEventListener('visibilitychange',()=>{hidden=document.hidden;pause();last=0;acc=0;});
$('retry').addEventListener('click',()=>{void audio.unlock();restart();canvas.focus();});
$('sound').addEventListener('click',()=>{void audio.unlock();muted=!muted;audio.setMuted(muted);$('sound').textContent=muted?'SOUND OFF':'SOUND ON';$('sound').setAttribute('aria-label',muted?'Enable sound':'Mute sound');$('sound').setAttribute('aria-pressed',String(muted));});
$('motion').addEventListener('click',()=>{world.reduced=!world.reduced;$('motion').setAttribute('aria-pressed',String(world.reduced));$('motion').textContent=world.reduced?'CALM':'MOTION';});
$('pause').addEventListener('click',()=>{userPaused=!userPaused;pause();});$('resume').addEventListener('click',()=>{void audio.unlock();userPaused=false;pause();canvas.focus();});$('restart').addEventListener('click',()=>{void audio.unlock();restart();canvas.focus();});
addEventListener('resize',()=>{resetInput();const portrait=innerHeight>innerWidth,nextW=portrait?540:960,nextH=portrait?820:640;if(nextW!==world.width){const sx=nextW/world.width,sy=nextH/world.height;for(const item of [world.player,world.aim,...world.scraps,...world.enemies,...world.particles,...world.relays]){item.x*=sx;item.y*=sy;}if(world.lane)world.lane.position*=world.lane.axis==='x'?sx:sy;world.width=nextW;world.height=nextH;art.makeFloor();}art.resize();});
$('language').addEventListener('click',()=>{ja=!ja;choiceSignature='';localize();});
function optionDetail(id:string){return world.choice===3&&(id==='swarm'||id==='lance')?tr('Switch + final: ','機体変更＋最終進化：')+(id==='swarm'?options.cyclone![ja?3:2]:options.return![ja?3:2]):options[id]![ja?3:2]!;}
function syncChoice(){const open=world.encounter==='choice';$('choice').hidden=!open;if(!open){choiceSignature='';return;}const sig=world.choice+world.build+ja;if(sig===choiceSignature)return;choiceSignature=sig;resetInput();audio.setPaused(true);$('choice-title').textContent=world.choice===1?tr('SALVAGE MODULE','回収モジュールを選ぶ'):world.choice===2?tr('CHOOSE YOUR EVOLUTION','進化の方向を選ぶ'):tr('FINAL EVOLUTION','最終進化');$('choice-summary').textContent=tr('Equipment restored. Take your time to choose.','設備が復旧しました。時間制限なしで選べます。');const list=$('choice-list');list.replaceChildren();for(const id of world.optionIds){const o=options[id]!;const b=document.createElement('button');b.dataset.choice=id;const name=document.createElement('strong'),detail=document.createElement('span');name.textContent=o[ja?1:0]!;detail.textContent=optionDetail(id);b.append(name,detail);let armed=false;b.addEventListener('pointerdown',e=>{armed=e.isTrusted&&e.button===0&&!world.paused&&world.encounter==='choice';});b.addEventListener('pointercancel',()=>{armed=false;});b.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.repeat)armed=e.isTrusted&&!world.paused;});b.addEventListener('blur',()=>{armed=false;});b.addEventListener('click',e=>{if(!e.isTrusted||!armed||world.paused)return;armed=false;resetInput();audio.setPaused(userPaused||hidden);void audio.unlock();world.choose(id);choiceSignature='';canvas.focus();});list.append(b);}}
function paintProgress(){const c=art.c,w=art.cssW,h=art.cssH,compact=w<620,left=compact?17:30;c.save();c.setTransform(art.dpr,0,0,art.dpr,0,0);const y=h<470?73:108;c.fillStyle='#102025e8';c.beginPath();c.roundRect(left-8,y-15,Math.min(w-left*2+16,600),68,7);c.fill();c.fillStyle='#d8e2b9';c.font='bold '+(compact?11:13)+'px Arial';c.fillText(String(world.stage+1).padStart(2,'0')+' / 06   '+stages[world.stage]![ja?1:0],left,y);c.font=(compact?9:11)+'px Arial';c.fillStyle='#b8c9bd';c.fillText(stages[world.stage]![ja?3:2]!,left,y+18);const rr=world.relays[world.activeRelay],status=world.encounter!=='combat'?tr('CIRCUIT RESTORED','設備復旧'):world.stage===5&&!world.bossLocked?(world.enemies.some(e=>e.kind==='elite'&&!e.dead&&((e.shellGate??0)>0||e.windup>0||e.dash>0))?tr('COUNTERCHARGE · DODGE','反撃 / 予告線から回避'):tr('CORE EXPOSED · ATTACK','炉心が露出 / 攻撃')):rr?tr('RELAY ','設備 ')+(world.activeRelay+1)+' / '+world.relays.length+'   '+Math.floor(rr.charge)+' / '+rr.max:tr('CLEAR THE REMAINING GUARDS','残った敵を撃破');c.fillStyle='#e5c887';c.fillText(status+'   ·   '+tr('CHARGED ','装甲 ')+world.scraps.filter(s=>s.mode==='orbit'&&s.salvaged).length+'   ·   '+world.build.toUpperCase()+' '+(world.evolution||''),left,y+36);for(let i=0;i<6;i++){c.fillStyle=i<world.stage||world.won?'#b4e0b4':i===world.stage?'#dcc486':'#445859';c.fillRect(w-left-76+i*12,y-8,8,4);}
 for(const l of world.links){const x=(w-world.width*art.scale)/2,y0=(h-world.height*art.scale)/2;c.strokeStyle='#b6ffe4';c.globalAlpha=Math.min(1,l.life*3);c.lineWidth=world.reduced?1:2;c.beginPath();c.moveTo(x+l.x*art.scale,y0+l.y*art.scale);c.lineTo(x+l.tx*art.scale,y0+l.ty*art.scale);c.stroke();}c.globalAlpha=1;
 if(world.encounter==='settle'||world.encounter==='equip'){const ready=world.encounter==='equip'||world.clearElapsed>=.16;c.textAlign='center';c.fillStyle='#081619df';c.beginPath();c.roundRect(w*.12,h*.66,w*.76,76,8);c.fill();c.fillStyle='#d5edb9';c.font='bold '+(compact?20:24)+'px Arial';c.fillText(world.encounter==='equip'?tr('MODULE FITTED','装着完了'):ready?tr('CIRCUIT RESTORED','設備復旧'):tr('AREA SECURED','敵を排除'),w/2,h*.66+31);c.font=(compact?11:13)+'px Arial';c.fillStyle='#e5c887';c.fillText(world.encounter==='equip'?world.build.toUpperCase():ready?(world.choice?tr('UPGRADE READY','強化を選べます'):tr('NEXT SECTOR','次の区画へ')):tr('RECOVERING ENERGY','回収した電力を接続'),w/2,h*.66+55);}
 // The recorded canvas mirrors the live choice text; DOM buttons remain accessible.
 if(world.encounter==='choice'){c.fillStyle='#081619ed';c.fillRect(w*.08,h*.20,w*.84,h*.59);c.textAlign='center';c.fillStyle='#d7e7c5';c.font='bold 22px Arial';c.fillText(world.choice===1?tr('SALVAGE MODULE','回収モジュール'):tr('EVOLUTION','進化を選ぶ'),w/2,h*.27);c.font='12px Arial';c.fillText(tr('Circuit secured / choose a route','送電完了 / 次の区画へ'),w/2,h*.27+28);world.optionIds.forEach((id,i)=>{const o=options[id]!,yy=h*.38+i*78;c.fillStyle='#263e3d';c.fillRect(w*.15,yy,w*.7,65);c.fillStyle='#e6d19c';c.font='bold 16px Arial';c.fillText(o[ja?1:0]!,w/2,yy+25);c.fillStyle='#b8d1c1';c.font=(compact?10:12)+'px Arial';c.fillText(optionDetail(id),w/2,yy+47);});}
 if(world.over){c.fillStyle='#081418dd';c.fillRect(0,0,w,h);c.textAlign='center';c.fillStyle='#e2e8b9';c.font='bold 32px Arial';c.fillText(world.won?'RUN CLEAR':tr('ARMOR DEPLETED','装甲が尽きた'),w/2,h*.44);c.font='15px Arial';c.fillText(world.build.toUpperCase()+' / '+Math.floor(world.runEndedAt/60)+':'+String(Math.floor(world.runEndedAt%60)).padStart(2,'0')+' / '+world.kills+' WRECKS',w/2,h*.51);c.font='12px Arial';c.fillText(world.build==='swarm'?tr('Next run: LANCE / a precise firing line','次は LANCE / 高速貫通の射線を作る'):tr('Next run: SWARM / wide collection','次は SWARM / 広域回収と一斉射出'),w/2,h*.59);}
 c.restore();}
function frame(now:number){if(last&&now-last<16){requestAnimationFrame(frame);return;}const raw=last?(now-last)/1000:0,dt=Math.min(.05,raw);last=now;if(raw>0&&!world.paused){frameTimes.push(raw*1000);if(frameTimes.length>6000)frameTimes.shift();}acc+=dt;let count=0;while(acc>=TUNE.step&&count++<7){world.update(TUNE.step);acc-=TUNE.step;}art.render();paintProgress();syncChoice();
 const loaded=world.scraps.filter(s=>s.mode==='orbit').length;
 audio.pull(world.holding&&!world.paused&&!world.over,clamp(loaded/11,0,1));
 $('charge-label').textContent=world.won?tr('↻ ANOTHER ROUND','↻ もう一度'):world.holding?loaded+tr(' PIECES / RELEASE TO FIRE',' 個 / 離して射出'):loaded?tr('HOLD / AIM → RELEASE','押して照準 → 離す'):tr('HOLD → GATHER','押して吸引');
 $('progress').textContent='▰'.repeat(Math.max(0,world.player.hp))+'▱'.repeat(world.player.maxHp-Math.max(0,world.player.hp));
 $('clock').textContent=new Date((world.over?world.runEndedAt:world.runTime)*1000).toISOString().slice(14,19);
 $('phase').textContent=stages[world.stage]![ja?1:0]!;
 if(world.over){$('result').hidden=false;$('result').querySelector('small')!.textContent=world.won?tr('CIRCUIT RESTORED / SHIFT COMPLETE','全設備が復旧 / 作業完了'):tr('CIRCUIT INCOMPLETE / TRY ANOTHER APPROACH','送電未完了 / 別の方法で再挑戦');$('result-title').textContent=world.won?'RUN CLEAR':tr('ARMOR DEPLETED','装甲が尽きた');$('result-detail').textContent=`${Math.floor(world.runEndedAt/60)}:${String(Math.floor(world.runEndedAt%60)).padStart(2,'0')} / ${world.kills} WRECKS / ${world.build.toUpperCase()} ${world.evolution} / ${world.won?'6':world.stage} OF 6`; $('retry-note').textContent=world.build==='lance'?tr('Next run: SWARM · wide collection, crowd control','次は SWARM：広域回収と周囲の盾崩し'):tr('Next run: LANCE · pierce a precise firing line','次は LANCE：射線を作って高速貫通');}
 if(toastUntil&&world.time>toastUntil)$('toast').classList.remove('show');requestAnimationFrame(frame);}
requestAnimationFrame(frame);
// Read-only inspection surface for isolated QA. No mutation, telemetry or persistence.
Object.defineProperty(window,'__magnet',{value:{snapshot:()=>world.snapshot(),metrics:()=>{const sorted=[...frameTimes].sort((a,b)=>a-b);return{frames:sorted.length,medianMs:sorted[Math.floor(sorted.length*.5)]??null,p95Ms:sorted[Math.floor(sorted.length*.95)]??null,audio:audio.metrics(),width:world.width,height:world.height,scale:art.scale,reduced:world.reduced};},captureStream:()=>{const stream=canvas.captureStream(60);for(const t of audio.captureStream()?.getAudioTracks()??[])stream.addTrack(t.clone());return stream;}},writable:false});

