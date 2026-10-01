import {W,H,ROUND,create,step,launch,reflectedPath} from './core.mjs';
import {Sound} from './audio.mjs';
import {Controls} from './input.mjs';
import {Records} from './records.mjs';
import {render} from './view.mjs';

const $=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d'),sound=new Sound(),records=new Records();
const reviewMode=new URLSearchParams(location.search).get('review')==='1';
let lang=navigator.language.startsWith('ja')?'ja':'en',g=create(),paused=false,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let seed=7007,previousScore=records.data.runs?records.data.lastScore:null,last=performance.now(),acc=0,lastDraw=0,frameCount=0,trail=[],inputs=[],rawInputs=[],lastChain=0,chainReadUntil=0,finished=false;
let recording=null,recordStart=0,recordFrames=0,recordInputs=[],sourceAtCapture=null,captureLabel='core-b1';
const perf={update:[],draw:[],raf:[]};
const copy={
  ja:{tag:'壁を使え。<br>一撃を、連鎖に。',rule:'狙って、離す。<br>壁で反射すると装甲も砕ける。<br>リングの花で、連鎖をつなげ。',instructions:'ドラッグ → 離す ／ 矢印・WASD → Space ／ Escで停止',soundOn:'♪ ON',soundOff:'♪ OFF',soundLabel:'ゲーム音の切り替え',motionOn:'FX 少',motionOff:'FX 通常',motionLabel:'動きを少なめにする',pause:'停止',resume:'再開',first:'壁を、味方に。',start:'60秒、遊ぶ ↗',retry:'もう一回 ↗',new:'違う配置で遊ぶ',won:'60秒、生き抜いた。',lost:'次は、もっとつなげる。',paused:'ひと息、つこう。',pausedCopy:'時間も敵も停止中。準備ができたら再開。',time:'残り',armor:'六角は、壁で反射して砕く',hurt:'止まる場所にも気をつけて',pressure:'第二波 · 角度を選ぼう',surge:'最終波 · 大きな連鎖を',relay:'リングの花は、周囲も巻き込む',ready:'狙って、離す',bank:'反射 → 装甲を割る → 連鎖',best:'BEST',max:'MAX CHAIN',previous:'前回',challenge:n=>`次は ${n} CHAIN を狙おう`,canvas:'狙って離すと突進。壁反射で六角装甲、リングの花で周囲を連鎖。矢印またはWASDで方向、SpaceまたはEnterで突進、Escapeで一時停止。',recording:'実際の画面とゲームSEを等速録画中',local:'ローカル記録',clear:'QA記録をクリア'},
  en:{tag:'Use the rim.<br>Make one hit bloom.',rule:'Aim. Release. Rebound.<br>Crack the hex armor with a bank.<br>Ring blooms carry the chain.',instructions:'Drag → release / Arrows or WASD → Space / Esc to pause',soundOn:'♪ ON',soundOff:'♪ OFF',soundLabel:'Toggle game sound',motionOn:'FX Low',motionOff:'FX Full',motionLabel:'Use less motion',pause:'Pause',resume:'Resume',first:'Make the rim your ally.',start:'Play 60 seconds ↗',retry:'One more run ↗',new:'Play a new tide',won:'You held the tide.',lost:'One more clean rebound.',paused:'Take a breath.',pausedCopy:'Time and enemies are stopped. Resume when ready.',time:'LEFT',armor:'Hex armor needs a rim rebound',hurt:'Choose a safer landing',pressure:'WAVE TWO · CHOOSE YOUR ANGLE',surge:'FINAL WAVE · BUILD A BIG CHAIN',relay:'Ring blooms carry nearby petals',ready:'Aim, then release',bank:'Rebound. Crack armor. Chain.',best:'BEST',max:'MAX CHAIN',previous:'PREVIOUS',challenge:n=>`Try for ${n} CHAIN next`,canvas:'Aim and release to dash. Bank to break hex armor; ring blooms chain nearby petals. Arrows or WASD aim, Space or Enter dash, Escape pauses.',recording:'Recording actual canvas and game SE at 1×',local:'Local records',clear:'Clear QA records'}
};
const text=()=>copy[lang];const format=n=>n.toLocaleString(lang==='ja'?'ja-JP':'en-US');
const controls=new Controls(canvas,{
  active:()=>g.status==='playing'&&!paused,activeOrPaused:()=>g.status==='playing',canAim:()=>g.p.dash<=0,cooldown:()=>g.p.cool,player:()=>g.p,
  unlock:()=>sound.unlock(),hidden:()=>{if(g.status==='playing')pause(true);sound.stop();},pause:()=>pause(),
  trace:entry=>{if(reviewMode){rawInputs.push({...entry,gameSec:+g.t.toFixed(3)});if(rawInputs.length>300)rawInputs.shift();}},
  launch:(dx,dy,kind,lag)=>{if(!launch(g,dx,dy))return false;sound.unlock();sound.play('dash');const entry={wallMs:Math.round(performance.now()),seed:g.seed,gameSec:+g.t.toFixed(3),kind,dx:+dx.toFixed(2),dy:+dy.toFixed(2),queueLagMs:+lag.toFixed(2)};inputs.push(entry);if(recording?.state==='recording')recordInputs.push(entry);return true;}
});
function applyText(){
  document.querySelector('nav').setAttribute('aria-label',lang==='ja'?'ゲーム設定':'Game settings');
  document.documentElement.lang=lang;$('language').textContent=lang==='ja'?'EN':'日本語';$('tagline').innerHTML=text().tag;$('rule').innerHTML=text().rule;$('instructions').textContent=text().instructions;
  $('sound').textContent=sound.muted?text().soundOff:text().soundOn;$('sound').setAttribute('aria-label',text().soundLabel);$('sound').setAttribute('aria-pressed',String(sound.muted));
  $('motion').textContent=reduced?text().motionOn:text().motionOff;$('motion').setAttribute('aria-label',text().motionLabel);$('motion').setAttribute('aria-pressed',String(reduced));
  $('pause').textContent=paused?text().resume:text().pause;$('pause').disabled=g.status!=='playing';$('new-run').textContent=text().new;canvas.setAttribute('aria-label',text().canvas);$('reset-records').textContent=text().clear;overlay();
}
function overlay(){
  const show=g.status!=='playing'||paused;$('overlay').hidden=!show;$('overlay').dataset.mode=paused?'paused':g.status;if(!show)return;
  const ended=g.status==='won'||g.status==='lost';$('new-run').hidden=!ended;$('result-stats').hidden=!ended;$('overlay-copy').hidden=ended||g.status==='ready';
  $('overlay-label').textContent=paused?'PAUSED':g.status==='ready'?'RIMBLOOM':`TIDE ${g.seed}`;$('overlay-title').textContent=paused?text().paused:g.status==='ready'?text().first:g.status==='won'?text().won:text().lost;
  $('overlay-copy').textContent=text().pausedCopy;$('start').textContent=paused?text().resume:ended?text().retry:text().start;
  if(ended){$('result-score').textContent=format(g.score);$('result-best').textContent=format(records.data.best);$('result-chain').textContent=g.bestChain;$('result-previous').textContent=previousScore===null?'—':format(previousScore);$('best-label').textContent=text().best;$('chain-label').textContent=text().max;$('previous-label').textContent=text().previous;$('challenge').textContent=g.bestChain<26?text().challenge(Math.max(3,g.bestChain+1)):(lang==='ja'?'次は、自己ベストへ。':'Go for a new best.');}
}
function begin(newSeed=false){
  sound.unlock();if(paused){pause(false);return;}controls.clear();if(newSeed)seed=(seed+7919)>>>0;
  previousScore=records.data.runs?records.data.lastScore:null;g=create(seed);g.status='playing';trail=[];inputs=[];rawInputs=[];lastChain=0;chainReadUntil=0;finished=false;controls.keyboardAngle=-Math.PI/2;paused=false;last=performance.now();acc=0;$('live').textContent='';applyText();canvas.focus({preventScroll:true});
}
function pause(value=!paused){if(g.status!=='playing')return;paused=value;controls.clear();sound.stop();last=performance.now();acc=0;applyText();if(!paused)canvas.focus({preventScroll:true});}
function endRun(){
  if(finished)return;finished=true;controls.clear();records.result(g.score,g.bestChain);$('live').textContent=(g.status==='won'?text().won:text().lost)+` SCORE ${format(g.score)} / MAX CHAIN ${g.bestChain}`;applyText();
  if(recording?.state==='recording')setTimeout(()=>{if(recording?.state==='recording')recording.stop();},700);
}
$('start').addEventListener('click',()=>begin());$('new-run').addEventListener('click',()=>begin(true));$('pause').addEventListener('click',()=>pause());
canvas.addEventListener('keydown',e=>{if((g.status==='won'||g.status==='lost')&&e.key==='Enter'&&!e.repeat){e.preventDefault();begin();}});
$('language').addEventListener('click',()=>{lang=lang==='ja'?'en':'ja';applyText();});$('sound').addEventListener('click',()=>{sound.unlock();sound.mute(!sound.muted);applyText();});$('motion').addEventListener('click',()=>{reduced=!reduced;applyText();});
$('reset-records').addEventListener('click',()=>{if(g.status==='playing')pause(true);records.reset();previousScore=null;applyText();});
function sample(arr,n){arr.push(+n.toFixed(3));if(arr.length>4000)arr.shift();}
function frame(now){
  const delta=Math.max(0,Math.min(.1,(now-last)/1000));last=now;frameCount++;sample(perf.raf,delta*1000);
  const updateStart=performance.now();
  if(g.status==='playing'&&!paused){
    controls.update();acc+=delta;
    while(acc>=1/120){const previous=g.status;step(g,1/120);for(const e of g.events){sound.play(e.type==='hit'&&e.armor?'armor':e.type,e.chain);if(e.type==='hit'&&e.chain>=2){lastChain=e.chain;chainReadUntil=now+850;}}acc-=1/120;if(g.status!==previous){endRun();break;}controls.update();}
  }sample(perf.update,performance.now()-updateStart);
  if(now-lastDraw>=1000/60-1){
    const aim=controls.visibleAim(),path=aim&&g.status==='playing'&&!paused&&g.p.dash===0?reflectedPath(g.p.x,g.p.y,aim.x-g.p.x,aim.y-g.p.y):null;
    const drawStart=performance.now();render(ctx,g,{clock:reduced?0:now/1000,reduced,text:text(),lang,aim,path,trail,readChain:now<chainReadUntil?lastChain:0});sample(perf.draw,performance.now()-drawStart);lastDraw=now;if(recording)recordFrames++;
  }
  if(reviewMode&&frameCount%30===0)$('metrics').textContent=`state=${g.status}; paused=${paused}; time=${g.t.toFixed(2)}; score=${g.score}; shots=${g.shots}; chain=${g.bestChain}; life=${g.life}; armor=${g.armorsBroken}; relay=${g.relayKills}; safe=${g.safeLandings}; enemies=${g.enemies.length}; fx=${g.fx.length}; pending=${Boolean(controls.pending)}; aimKind=${controls.aim?.kind||'none'}; audio=${sound.ctx?.state||'not-started'}; viewport=${canvas.clientWidth}×${canvas.clientHeight}; lastPointer=${JSON.stringify(rawInputs.at(-1)||null)}`;
  requestAnimationFrame(frame);
}
async function startRecord(){
  if(recording)return;await sound.unlock();if(!canvas.captureStream||!window.MediaRecorder){$('capture-status').textContent='Recording unsupported';return;}
  try{sourceAtCapture=await(await fetch('/__qa/source')).json();}catch{sourceAtCapture={status:'NOT AVAILABLE'};}
  captureLabel=$('take-label').value;const stream=canvas.captureStream(30);if(sound.capture)for(const track of sound.capture.stream.getAudioTracks())stream.addTrack(track);
  const mime=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'].find(m=>MediaRecorder.isTypeSupported(m)),chunks=[],rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:4000000}),take='take-'+Date.now();
  recordStart=performance.now();recordFrames=0;recordInputs=[];const startedUTC=new Date().toISOString();perf.update=[];perf.draw=[];perf.raf=[];
  rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
  rec.onstop=async()=>{
    if(!chunks.some(chunk=>chunk.size)){stream.getVideoTracks().forEach(t=>t.stop());recording=null;$('capture-status').textContent='No video frames captured. Start a fresh take.';return;}
    const blob=new Blob(chunks,{type:'video/webm'}),meta={take,label:captureLabel,version:'1.0.0-r1',startedUTC,width:W,height:H,captureRate:30,wallSeconds:(performance.now()-recordStart)/1000,renderFrames:recordFrames,renderCap:60,audioTracks:stream.getAudioTracks().length,audioContext:sound.ctx?.state,sourceAtCapture,normalInputs:recordInputs.slice(),rawInputs:rawInputs.slice(),game:{seed:g.seed,status:g.status,time:g.t,score:g.score,shots:g.shots,banks:g.banks,bestChain:g.bestChain,life:g.life,armor:g.armorsBroken,relay:g.relayKills,safe:g.safeLandings,skillBonus:g.skillBonus,formations:g.formations},performanceMs:{simulation:perf.update.slice(),draw:perf.draw.slice(),rafInterval:perf.raf.slice()},edited:false,speed:1,stateInjection:false};
    try{const a=await fetch(`/__record/${take}/video`,{method:'POST',headers:{'Content-Type':'video/webm'},body:blob});const b=await fetch(`/__record/${take}/metadata`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(meta)});if(!a.ok||!b.ok)throw Error('Local save rejected');$('capture-status').textContent=`Saved ${take}: ${blob.size} bytes / ${meta.wallSeconds.toFixed(1)}s / ${meta.audioTracks} audio track / ${meta.label}`;}catch(error){$('capture-status').textContent=`Recording save failed: ${error.message}`;}
    stream.getVideoTracks().forEach(t=>t.stop());recording=null;
  };recording=rec;rec.start(500);$('capture-status').textContent=text().recording;
}
if(reviewMode){$('capture-panel').hidden=false;$('record').addEventListener('click',startRecord);$('stop-record').addEventListener('click',()=>{if(recording?.state==='recording'){recording.stop();$('capture-status').textContent='Saving…';}});}
applyText();requestAnimationFrame(frame);
