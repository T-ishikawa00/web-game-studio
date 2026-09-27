import './style.css';
import {options} from './expansion-progression';
import {stages as acceptedStages} from './accepted-progression';
import {missions,type MissionId} from './missions';
import {SaveStore} from './save';
import {createHub} from './hub';
import {MagnetWorld,TUNE,clamp} from './core';
import {MagnetArt} from './world';
import {MagnetAudio} from './audio';
import {publicCopy} from './public-copy';
const canvas=document.querySelector<HTMLCanvasElement>('#arena')!,portrait=innerHeight>innerWidth;
const world=new MagnetWorld(portrait?540:960,portrait?820:640),art=new MagnetArt(canvas,world),audio=new MagnetAudio();
const store=new SaveStore((()=>{try{return localStorage;}catch{return null;}})());
let hubOpen=true,runActive=false,completionHandled=false;
let hub:ReturnType<typeof createHub>;
const $=(id:string)=>document.getElementById(id)!;
let muted=false,userPaused=false,hidden=false,toastUntil=0,emptyTipAt=-10,last=0,acc=0,frameTimes:number[]=[];
let ja=(new URLSearchParams(location.search).get('lang')??store.data.settings.locale)!=='en',choiceSignature='';
muted=store.data.settings.muted;audio.setMuted(muted);
const tr=(en:string,jp:string)=>ja?jp:en;
function localize(){document.documentElement.lang=ja?'ja':'en';$('language').textContent=ja?'EN':'日本語';document.querySelector('.hint-desktop')!.innerHTML=ja?'<kbd>W A S D</kbd> 移動 · 押して吸引 → 狙って離す':'<kbd>W A S D</kbd> move · hold to gather → release to launch';document.querySelector('.hint-touch')!.textContent=tr('Left thumb moves · Right thumb gathers & aims','左指で移動 · 右指で吸引・照準 → 離して射出');$('retry').textContent=tr('RETRY ↗','もう一度 ↗');$('missions').textContent=tr('MISSIONS','作戦');$('mission-select').textContent=tr('MISSION SELECT ↗','作戦選択 ↗');}
localize();
const keys=new Set<string>();
let movePointer:number|null=null,aimPointer:number|null=null,moveOrigin={x:0,y:0},aimOrigin={x:0,y:0};
let stickMove={x:0,y:0};
world.reduced=store.hasSave?store.data.settings.reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches;
function resetInput(){keys.clear();movePointer=null;aimPointer=null;stickMove={x:0,y:0};world.cancel();audio.pull(false,0);$('aim-stick').classList.remove('active');for(const id of ['move-stick','aim-stick'])($(id).querySelector('i') as HTMLElement).style.transform='';}
function pause(){world.paused=userPaused||hidden||hubOpen;audio.setPaused(world.paused||world.encounter==='choice');if(world.paused)resetInput();$('pause-overlay').hidden=!userPaused;$('pause').textContent=userPaused?'▶':'Ⅱ';$('pause').setAttribute('aria-label',userPaused?'Resume':'Pause');}
function stageCopy(){if(world.mission==='A'){if(world.stage===0&&world.kills===0)return ['BOOT THE CRANE','クレーンを再起動','Hold near metal · aim at a guard · release to launch','金属の近くで押し続け、敵を狙って離す'];if(world.stage===0&&world.armor===0)return ['RECLAIM THE ARMOR','装甲を回収','Gather the glowing armor · charged scrap powers relays','敵が落とす光る装甲を吸引。装甲の電力で設備を復旧'];return acceptedStages[world.stage]!;}const d=missions[world.mission][world.stage]!;return [...d.title,...d.hint];}
function saveMessage(){return store.status==='saved'&&!store.hasSave?tr('Progress will save on this device · resume at sector start','進行をこの端末に保存します / 区画のはじめから再開'):store.status==='saved'?tr('Saved on this device · resume from the start of the sector','この端末に保存済み / 区画のはじめから再開'):store.status==='corrupt'?tr('Save is damaged or from another version. Original kept; this session is not saved.','保存が破損または別バージョンです。原文を保持し、今回は保存しません。'):store.status==='conflict'?tr('Another tab changed the save. Original kept; reload before saving again.','別タブで保存が更新されました。上書きを止めています。再読込してください。'):tr('Save unavailable. Progress stays in this tab; reloading may restore an older checkpoint.','保存できません。このタブ内のみ進行できます。再読込で古い区画へ戻る場合があります。');}
function saveSettings(){store.change(d=>{d.settings={locale:ja?'ja':'en',muted,reducedMotion:world.reduced};});$('save-note').textContent=saveMessage();if(hubOpen)showHub();}
function persistCheckpoint(){if(!world.checkpointPending||!runActive||world.over)return;world.checkpointPending=false;store.checkpoint(world.checkpoint());$('save-note').textContent=saveMessage();}
function enterMission(mission:MissionId,resume=false){resetInput();audio.setPaused(true);const cp=store.data.run;world.startMission(mission);if(resume&&cp)world.restore(cp);runActive=true;hubOpen=false;completionHandled=false;userPaused=false;hub.hide();pause();choiceSignature='';$('toast').classList.remove('show');toastUntil=0;$('result').hidden=true;$('hint').style.opacity='1';acc=0;persistCheckpoint();$('save-note').textContent=saveMessage();canvas.focus();}
function restart(){if(hubOpen){showHub();return;}enterMission(world.mission);}
function showHub(){hubOpen=true;resetInput();pause();$('choice').hidden=true;$('result').hidden=true;hub.show({locale:ja?'ja':'en',unlocked:store.data.unlocked,records:store.data.records,resume:store.data.run?{mission:store.data.run.mission,zone:store.data.run.zone}:null,saveStatus:saveMessage(),completed:!!store.data.records.C});}function toast(text:string,duration=1.5){$('toast').textContent=text;toastUntil=world.time+duration;$('toast').classList.add('show');}
world.onEvent=e=>{
 if(['rail-fire','carrier-charge','support-break','repair-link','satellite-block','foundry','armor-impact','shock','magnet-pulse','core-open'].includes(e.kind))audio.expansionEvent(e.kind);
 audio.setExtended(true);
 if(['snap','launch','hit','break','upgrade','bump'].includes(e.kind))audio.event(e.kind as 'snap',e.value);
 if(['block','damage','complete'].includes(e.kind))audio.event(e.kind as 'block',e.value);
 if(e.kind==='enemy-windup')audio.event('warning',e.value);
 if(e.kind==='upgrade')toast(e.value===1?tr('RECLAIMED / MAGNET II','装甲回収 / MAGNET II'):world.build.toUpperCase()+' / EVOLUTION '+world.evolution,2);
 if(e.kind==='relay-empty'&&world.time>emptyTipAt+5){emptyTipAt=world.time;toast(tr('RECOVER ENEMY ARMOR / EMPTY METAL HAS NO CHARGE','敵の装甲を回収しよう / 空の金属は送電できない'),2);}
 if(e.kind==='power-window')toast(tr('POWER SURGE / GUARDS OPEN · FLOOR SAFE','送電成功 / 敵の盾を開放・床の電流停止'),2);
 if(e.kind==='relay-hit')audio.event('snap',1);if(e.kind==='relay-complete')audio.event('upgrade',1);
 if(e.kind.startsWith('stage-start'))toast(stageCopy()[ja?1:0]!,2);
 if(e.kind.startsWith('stage-clear')){resetInput();$('toast').classList.remove('show');toastUntil=0;}
 if(e.kind==='circuit-secured')audio.event('complete',.7);
 if(e.kind==='equip'&&world.evolution===0)audio.event('upgrade',.6);
 if(e.kind.startsWith('choice-open')){resetInput();audio.setPaused(true);}
 if(e.kind==='reactor-lock')toast(tr('NEXT RELAY / BREAK THE LOCK','次の設備へ送電 / 装甲を解除'),2); 
 if(e.kind==='phase-1')toast('FLANK THE SHIELD · OR CRACK ITS PLATE',3);
 if(e.kind==='phase-2')toast('BAIT THE CHARGE · STRIKE THE OPEN CORE',3);
 if(e.kind==='phase-3')toast('FURNACE SHIFT / HOLD YOUR GROUND',2);
 if(e.kind==='elite-arrival')toast(tr('REACTOR / POWER THE RELAY','炉心 / 設備へ送電'),2.5);
 if(e.kind==='empty')toast(tr('HOLD NEAR METAL','金属の近くで押して吸引'),1);
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
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLAnchorElement)return;const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)){e.preventDefault();if(world.paused||world.encounter!=='combat')return;void audio.unlock();keys.add(k);movement();if(k===' '&&!e.repeat)world.startHold();}if(k==='r'&&!e.repeat&&!hubOpen)restart();if(k==='escape'&&!e.repeat&&!hubOpen){userPaused=!userPaused;pause();}});
window.addEventListener('keyup',e=>{const k=e.key.toLowerCase();keys.delete(k);movement();if(k===' '){world.release();audio.pull(false,0);}});
window.addEventListener('blur',()=>{resetInput();hidden=true;pause();});window.addEventListener('focus',()=>{hidden=document.hidden;pause();});document.addEventListener('visibilitychange',()=>{hidden=document.hidden;pause();last=0;acc=0;});
$('retry').addEventListener('click',()=>{void audio.unlock();restart();canvas.focus();});
$('sound').addEventListener('click',()=>{void audio.unlock();muted=!muted;audio.setMuted(muted);$('sound').textContent=muted?'SOUND OFF':'SOUND ON';$('sound').setAttribute('aria-label',muted?'Enable sound':'Mute sound');$('sound').setAttribute('aria-pressed',String(muted));saveSettings();});
$('motion').addEventListener('click',()=>{world.reduced=!world.reduced;$('motion').setAttribute('aria-pressed',String(world.reduced));$('motion').textContent=world.reduced?'CALM':'MOTION';saveSettings();});
$('pause').addEventListener('click',()=>{userPaused=!userPaused;pause();});$('resume').addEventListener('click',()=>{void audio.unlock();userPaused=false;pause();canvas.focus();});$('restart').addEventListener('click',()=>{void audio.unlock();restart();canvas.focus();});
addEventListener('resize',()=>{resetInput();const portrait=innerHeight>innerWidth,nextW=portrait?540:960,nextH=portrait?820:640;if(nextW!==world.width){const sx=nextW/world.width,sy=nextH/world.height;for(const item of [world.player,world.aim,...world.scraps,...world.enemies,...world.particles,...world.relays]){item.x*=sx;item.y*=sy;}if(world.lane)world.lane.position*=world.lane.axis==='x'?sx:sy;world.width=nextW;world.height=nextH;art.makeFloor();}art.resize();});
$('language').addEventListener('click',()=>{ja=!ja;choiceSignature='';localize();saveSettings();});
function optionDetail(id:string){return world.choice===3&&(id==='swarm'||id==='lance')?tr('Switch + final: ','機体変更＋最終進化：')+(id==='swarm'?options.cyclone![ja?3:2]:options.return![ja?3:2]):options[id]![ja?3:2]!;}
function syncChoice(){const open=world.encounter==='choice'&&!hubOpen;$('choice').hidden=!open;if(!open){choiceSignature='';return;}const sig=world.choice+world.build+world.stage+ja;if(sig===choiceSignature)return;choiceSignature=sig;resetInput();audio.setPaused(true);$('choice-title').textContent=world.choice===1?tr('SALVAGE MODULE','回収モジュールを選ぶ'):world.choice===2?tr('CHOOSE YOUR EVOLUTION','進化の方向を選ぶ'):tr('FINAL EVOLUTION','最終進化');$('choice-summary').textContent=tr('Choose a different way to fight · no time limit','戦い方を選ぶ / 時間制限なし');const list=$('choice-list');list.replaceChildren();for(const id of world.optionIds){const o=options[id]!;const b=document.createElement('button');b.dataset.choice=id;const name=document.createElement('strong'),detail=document.createElement('span');name.textContent=o[ja?1:0]!;detail.textContent=optionDetail(id);b.append(name,detail);let armed=false;b.addEventListener('pointerdown',e=>{armed=e.isTrusted&&e.button===0&&!world.paused&&world.encounter==='choice';});b.addEventListener('pointercancel',()=>{armed=false;});b.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.repeat)armed=e.isTrusted&&!world.paused;});b.addEventListener('blur',()=>{armed=false;});b.addEventListener('click',e=>{if(!e.isTrusted||!armed||world.paused)return;armed=false;resetInput();audio.setPaused(userPaused||hidden);void audio.unlock();world.choose(id);choiceSignature='';canvas.focus();});list.append(b);}}
let lastHudPaint=0;
function paintProgress(){
 art.presentation=hubOpen;art.syncLabels(ja);
 if(performance.now()-lastHudPaint<90)return;lastHudPaint=performance.now();
 publicCopy(ja,muted,userPaused,world.reduced);
 const rr=world.relays[world.activeRelay];
 $('sector-code').textContent=world.mission+' / '+String(world.stage+1).padStart(2,'0')+' — 06';
 $('sector-title').textContent=stageCopy()[ja?1:0]!;
 $('sector-hint').textContent=stageCopy()[ja?3:2]!;
 const status=world.encounter!=='combat'?tr('CIRCUIT RESTORED','設備復旧'):world.mission==='A'&&world.stage===5&&!world.bossLocked?(world.enemies.some(e=>e.kind==='elite'&&!e.dead&&((e.shellGate??0)>0||e.windup>0||e.dash>0))?tr('COUNTERCHARGE · DODGE','反撃 / 予告線から回避'):tr('CORE EXPOSED · ATTACK','炉心が露出 / 攻撃')):rr?tr('RELAY ','設備 ')+(world.activeRelay+1)+' / '+world.relays.length+' · '+Math.floor(rr.charge)+' / '+rr.max:tr('CLEAR THE REMAINING GUARDS','残った敵を撃破');
 $('sector-status').textContent=status;
 $('build-label').textContent=(world.build==='base'?'MAGNET I':world.build.toUpperCase())+(world.form?' / '+world.form.toUpperCase():'');
 $('module-label').textContent=world.modules.map(m=>m.toUpperCase()).join(' + ');
 $('armor-label').textContent=tr('CHARGED ','装甲 ')+world.scraps.filter(s=>s.mode==='orbit'&&s.salvaged).length;
 if(!$('sector-pips').children.length)$('sector-pips').replaceChildren(...Array.from({length:6},()=>document.createElement('i')));
 [...$('sector-pips').children].forEach((s,i)=>s.className=i<world.stage||world.won?'done':i===world.stage?'current':'');
 $('transition').hidden=!['settle','equip'].includes(world.encounter)||hubOpen;
 $('transition').textContent=world.encounter==='equip'?tr('MODULE FITTED','装着完了'):world.clearElapsed>=.16?tr('CIRCUIT RESTORED','設備復旧'):tr('AREA SECURED','敵を排除');
 document.querySelector('#game')!.classList.toggle('is-hub',hubOpen);
 document.querySelector('#game')!.classList.toggle('is-choice',world.encounter==='choice');
 document.querySelector('#game')!.classList.toggle('is-over',world.over);
 document.querySelector('#game')!.classList.toggle('is-reduced',world.reduced);
 $('motion').setAttribute('aria-pressed',String(world.reduced));
 $('sound').setAttribute('aria-pressed',String(muted));
 const perf=art.metrics();
 const ft=[...frameTimes].sort((a,b)=>a-b),frame95=ft[Math.floor((ft.length-1)*.95)]??0,max=ft.at(-1)??0;
 $('performance').textContent='draw '+perf.drawCalls+' · triangles '+perf.triangles+' · CPU p95 '+perf.cpuP95Ms.toFixed(2)+' ms · interval p95 '+frame95.toFixed(1)+' ms · max '+max.toFixed(1)+' ms · >50ms '+ft.filter(x=>x>50).length+' / '+ft.length+' · geometry '+perf.geometries+' · textures '+perf.textures;
 $('performance').dataset.metrics=JSON.stringify({...perf,frameIntervalP95Ms:frame95,frameIntervalMaxMs:max,longFramesOver50:ft.filter(x=>x>50).length,samples:ft.length,scope:'last 6000 active combat loop intervals; no long-interval filtering; CPU submission not GPU elapsed time'});
}
function frame(now:number){if(last&&now-last<16){requestAnimationFrame(frame);return;}const raw=last?(now-last)/1000:0,dt=Math.min(.05,raw);last=now;if(raw>0&&!world.paused&&world.encounter==='combat'&&!world.over&&world.started){frameTimes.push(raw*1000);if(frameTimes.length>6000)frameTimes.shift();}acc+=dt;let count=0;while(acc>=TUNE.step&&count++<7){world.update(TUNE.step);persistCheckpoint();acc-=TUNE.step;}if(runActive&&!completionHandled&&(world.won||world.over)){completionHandled=true;if(world.won)store.clear(world.mission,world.runEndedAt,world.form);else store.endRun();$('save-note').textContent=saveMessage();}
art.render();paintProgress();syncChoice();
 const loaded=world.scraps.filter(s=>s.mode==='orbit').length,fireable=world.form==='satellite'?Math.max(0,loaded-4):loaded;
 audio.pull(world.holding&&!world.paused&&!world.over,clamp(loaded/11,0,1));
 $('charge-label').textContent=world.won?tr('↻ ANOTHER ROUND','↻ もう一度'):world.holding?(world.form==='satellite'?fireable+tr(' TO FIRE / 4 RESERVED',' 射出 / 4片を防御へ'):loaded+tr(' PIECES / RELEASE TO FIRE',' 個 / 離して射出')):loaded?tr('HOLD / AIM → RELEASE','押して照準 → 離す'):tr('HOLD → GATHER','押して吸引');
 $('progress').textContent='▰'.repeat(Math.max(0,world.player.hp))+'▱'.repeat(world.player.maxHp-Math.max(0,world.player.hp));
 $('clock').textContent=new Date((world.over?world.runEndedAt:world.runTime)*1000).toISOString().slice(14,19);
 $('phase').textContent=stageCopy()[ja?1:0]!;
 if(world.over&&!hubOpen){$('result').hidden=false;$('result').querySelector('small')!.textContent=world.won?tr('CIRCUIT RESTORED / SHIFT COMPLETE','全設備が復旧 / 作業完了'):tr('CIRCUIT INCOMPLETE / TRY ANOTHER APPROACH','送電未完了 / 別の方法で再挑戦');$('result-title').textContent=world.won?tr('MISSION '+world.mission+' CLEAR','作戦 '+world.mission+' 完了'):tr('ARMOR DEPLETED','装甲が尽きた');$('result-detail').textContent=`${Math.floor(world.runEndedAt/60)}:${String(Math.floor(world.runEndedAt%60)).padStart(2,'0')} / ${world.kills} WRECKS / ${world.build.toUpperCase()} ${world.evolution} / ${world.won?'6':world.stage+1} OF 6`; $('retry-note').textContent=world.build==='lance'?tr('Next run: SWARM · wide collection, crowd control','次は SWARM：広域回収と周囲の盾崩し'):tr('Next run: LANCE · pierce a precise firing line','次は LANCE：射線を作って高速貫通');}
 if(toastUntil&&world.time>toastUntil)$('toast').classList.remove('show');requestAnimationFrame(frame);}
hub=createHub({start:m=>enterMission(m),resume:()=>{const cp=store.data.run;if(cp)enterMission(cp.mission,true);},reset:()=>{if(store.reset()){runActive=false;completionHandled=false;userPaused=false;world.startMission('A');ja=store.data.settings.locale==='ja';muted=store.data.settings.muted;world.reduced=store.data.settings.reducedMotion;audio.setMuted(muted);$('sound').textContent=muted?'SOUND OFF':'SOUND ON';$('motion').textContent=world.reduced?'CALM':'MOTION';localize();}showHub();},cancel:()=>{if(runActive){hubOpen=false;hub.hide();pause();canvas.focus({preventScroll:true});}else showHub();}});
$('missions').addEventListener('click',showHub);$('mission-select').addEventListener('click',showHub);
$('save-note').textContent=saveMessage();$('sound').textContent=muted?'SOUND OFF':'SOUND ON';$('motion').textContent=world.reduced?'CALM':'MOTION';showHub();requestAnimationFrame(frame);

const captureMode=new URLSearchParams(location.search).get('capture')==='1';
 $('capture-controls').hidden=!captureMode;
 $('capture-frame').addEventListener('click',()=>{art.render(true);const img=$('capture-result') as HTMLImageElement;img.src=canvas.toDataURL('image/png');img.hidden=false;});
 let recorder:MediaRecorder|null=null,recordChunks:Blob[]=[];
 $('record-frame').addEventListener('click',async()=>{
  if(recorder?.state==='recording'){recorder.stop();return;}
  const button=$('record-frame') as HTMLButtonElement;button.disabled=true;
  let stream:MediaStream|null=null;
  try{
   await audio.unlock();
   stream=canvas.captureStream(60);
   for(const t of audio.captureStream()?.getAudioTracks()??[])stream.addTrack(t.clone());
   recordChunks=[];recorder=new MediaRecorder(stream,{mimeType:'video/webm'});
   recorder.ondataavailable=e=>{if(e.data.size)recordChunks.push(e.data);};
   recorder.onstop=()=>{
    const link=$('record-result') as HTMLAnchorElement,blob=new Blob(recordChunks,{type:'video/webm'}),reader=new FileReader();
    reader.onload=()=>{link.href=String(reader.result);link.hidden=false;};reader.readAsDataURL(blob);
    link.download='magnet-real-gameplay.webm';link.textContent=tr('Save recorded gameplay','録画を保存');
    button.textContent=tr('Record','録画');for(const t of stream?.getTracks()??[])t.stop();
   };
   recorder.start();button.textContent=tr('Stop recording','録画終了');
  }catch{for(const t of stream?.getTracks()??[])t.stop();button.textContent=tr('Recording unavailable','録画できません');}
  finally{button.disabled=false;}
 });
