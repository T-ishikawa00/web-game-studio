import * as quick from './core.mjs';
import * as journey from './journey-core.mjs';
import {STAGES} from './journey-content.mjs';
import {render as quickRender} from './view.mjs';
import {render as journeyRender} from './journey-view.mjs';
import {CompleteSound as Sound} from './audio-cues.mjs';
import {Controls} from './input.mjs';
import {Records} from './records.mjs';
import {JourneyRecords,Settings,rank} from './save.mjs';
import {copy} from './copy.mjs';
Object.assign(copy.ja,{first:'七つの庭。その先に、満開。',start:'旅をはじめる ↗',won:'冠が咲いた。庭を抜けた。',timeout:'冠まで、あと少し。',opening:'反射・連鎖・着地点を磨いて、最後の冠へ。',route:'コース',normal:'Garden · 標準',wild:'Wild · 高難度',assist:'Assist · ゆったり',normalNote:'5〜8分 · 7つの庭 · 各庭でライフを1回復',wildNote:'5〜8分 · 敵の圧力が高く、庭での回復なし',assistNote:'5〜8分 · 敵の動きと出現をゆっくりに',quickNote:'60秒で挑む、すぐ遊べるモード',menu:'モード選択へ',contrast:'輪郭',contrastLabel:'高コントラストの輪郭',skater:'二本線の花は、左右に流れる',thorn:'棘は点線で予告。赤くなる前に離れる',mirror:'金色のレールも反射。着地点まで見よう',crown:'冠の六角を砕こう · 3巡 × 4つ',credits:'クレジット・保存について',creditsCopy:'RIMBLOOM / Tinlumo。ゲーム・描画・効果音は本プロジェクトのオリジナル。外部の画像・音源・フォントは使用していません。効果音は端末内で合成。',save:'記録と設定はこのブラウザに保存。進行中の旅はページを閉じると終了します。',noSave:'このブラウザでは記録を保存できません。プレイは続けられます。',progress:'連鎖を磨いて、冠を咲かせよう。',seal:'冠',stage:'庭',clearGoal:'12の冠を砕いて、旅を完走',wildGoal:'Wildで別の角度を試そう'});
Object.assign(copy.en,{first:'Seven gardens. One final bloom.',start:'Begin the journey ↗',won:'The crown blooms. Journey complete.',timeout:'The crown was within reach.',opening:'Master rebounds, chains and landings. Reach the crown.',route:'Route',normal:'Garden · Standard',wild:'Wild · Hard',assist:'Assist · Gentle',normalNote:'5–8 min · 7 gardens · Recover one life per garden',wildNote:'5–8 min · Higher pressure · No garden healing',assistNote:'5–8 min · Slower enemies and lighter pressure',quickNote:'A fast, self-contained 60-second run',menu:'Choose a mode',contrast:'Outline',contrastLabel:'High contrast outlines',skater:'Twin-marked petals drift across your aim',thorn:'Dotted thorns warn. Move before they turn red',mirror:'Gold rails also rebound. Check your landing',crown:'Crack the crown hexes · 3 circuits × 4 seals',credits:'Credits and local saving',creditsCopy:'RIMBLOOM / Tinlumo. Original game, procedural artwork and synthesized sound. No external image, audio or font assets. Sound is generated on your device.',save:'Records and settings are saved in this browser. Closing the page ends an active journey.',noSave:'This browser cannot save records. You can still play.',progress:'Build your chain. Make the crown bloom.',seal:'SEALS',stage:'GARDEN',clearGoal:'Break all 12 seals to complete the journey',wildGoal:'Try new angles on the Wild route'});
const growth=(function createGrowthBridge(load){
 let target=null,ready=false,reported=false;
 const send=(name,detail)=>{try{target?.emit(name,detail);}catch{}};
 const reportReady=()=>{if(ready&&target&&!reported){reported=true;send('game_ready');}};
 Promise.resolve().then(load).then(value=>{target=value;reportReady();}).catch(()=>{});
 return {emit:send,ready(){ready=true;reportReady();},firstInput(kind){send('first_meaningful_input',{input_mode:kind==='keyboard'?'keyboard':kind==='touch'?'touch':'pointer'});},result(mode,status){send('game_result',{result_type:status==='won'?(mode==='quick'?'time_up':'stage_clear'):'failure'});}};
})(()=>import('/assets/growth-client.js').then(m=>m.growth));
const $=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d'),sound=new Sound(),settings=new Settings(),records=new Records(),journeyRecords=new JourneyRecords();
let lang=document.documentElement.lang==='ja'?'ja':'en',reduced=settings.data.reduced??matchMedia('(prefers-reduced-motion: reduce)').matches,contrast=settings.data.contrast;
sound.mute(settings.data.muted);
let mode='journey',route='normal',seed=7007,g=journey.create(seed),paused=false,finished=false,last=performance.now(),acc=0,lastDraw=0,trail=[],lastChain=0,chainReadUntil=0,lastStage=0,previousScore=0;
const engine=()=>mode==='quick'?quick:journey,text=()=>copy[lang],format=n=>n.toLocaleString(lang==='ja'?'ja-JP':'en-US'),activeRecords=()=>mode==='quick'?records.data:journeyRecords.data[route];
function failureAdvice(){
 if(g.stage===6)return lang==='ja'?'壁で反射してから、印のついた六角へ。3巡すべて砕こう。':'Rebound first, then hit the marked hexes. Break all three circuits.';
 if(g.stage>=3)return lang==='ja'?'着地点の赤い棘と花を避けよう。点線のうちに、次の一撃へ。':'Land clear of red thorns and petals. Move while the warning is dotted.';
 if(g.stage===1)return lang==='ja'?'金色の装甲には、壁反射から入ろう。リングの花が連鎖の起点。':'Rebound before gold armor. Ringed petals start the chain.';
 return lang==='ja'?'短く狙って、次の一撃へ。ゆっくり練習するならモード選択からAssist。':'Aim briefly, then keep moving. Choose Assist in the mode menu for gentler practice.';
}
const controls=new Controls(canvas,{
 active:()=>g.status==='playing'&&!paused,activeOrPaused:()=>g.status==='playing',canAim:()=>g.p.dash<=0,cooldown:()=>g.p.cool,player:()=>g.p,
 unlock:()=>sound.unlock(),hidden:()=>{if(g.status==='playing')pause(true);sound.stop();},pause:()=>pause(),
 launch:(dx,dy,kind)=>{if(!engine().launch(g,dx,dy))return false;growth.firstInput(kind);sound.unlock();sound.play('dash');return true;}
});
function applyText(){
 const store=mode==='quick'?records:journeyRecords,notice=document.getElementById('rimbloom-save-status');
 notice.textContent=store.available?'':store.blockedReason==='corrupt'?(lang==='ja'?'保存記録が読み込めません。元データを保持して、このページ内だけで記録します。消去はサイト設定で確認できます。':'Saved records could not be read. Original data is retained; new records last only for this page. Review deletion in site Settings.'):(lang==='ja'?'保存を利用できません。記録はこのページ内だけに保持します。':'Storage is unavailable. Records last only for this page.');
 document.documentElement.lang=lang;document.body.classList.toggle('high-contrast',contrast);$('language').textContent=lang==='ja'?'EN':'日本語';$('tagline').innerHTML=text().tag;$('rule').innerHTML=text().rule;$('instructions').textContent=lang==='ja'?'ドラッグ → 離す ／ 矢印・WASDで方向を決めてSpace ／ Escで停止':'Drag → release / Set direction with Arrows or WASD, then Space / Esc to pause';
 document.querySelector('nav').setAttribute('aria-label',lang==='ja'?'ゲーム設定':'Game settings');
 for(const [id,on,label] of [['sound',sound.muted,text().soundLabel],['motion',reduced,text().motionLabel],['contrast',contrast,text().contrastLabel]]){$(id).setAttribute('aria-pressed',String(on));$(id).setAttribute('aria-label',label);}
 $('sound').textContent=sound.muted?text().soundOff:text().soundOn;$('motion').textContent=reduced?text().motionOn:text().motionOff;$('contrast').textContent=text().contrast;$('pause').textContent=paused?text().resume:text().pause;$('pause').disabled=g.status!=='playing';
 $('journey').setAttribute('aria-pressed',String(mode==='journey'));$('quick').setAttribute('aria-pressed',String(mode==='quick'));$('journey').textContent=lang==='ja'?'旅を通して遊ぶ':'GARDEN JOURNEY';$('quick').textContent=lang==='ja'?'クイックラン · 60秒':'QUICK RUN · 60s';$('mode-picker').setAttribute('aria-label',lang==='ja'?'ゲームモード':'Game mode');$('route-title').textContent=text().route;
 for(const k of ['normal','wild','assist'])$('route').querySelector(`[value=${k}]`).textContent=text()[k];$('route').value=route;
 canvas.setAttribute('aria-label',text().canvas);$('credits-label').textContent=text().credits;$('credits-copy').textContent=text().creditsCopy;$('save-note').textContent=(mode==='quick'?records.available:journeyRecords.available)&&settings.available?text().save:text().noSave;$('run-save').textContent=lang==='ja'?'途中で休むときは停止して、このページを開いたままに。':'Pause for a break and keep this page open.';$('orientation-note').textContent=lang==='ja'?'縦向きにすると、庭全体が見やすくなります。':'Turn your phone upright for a clear view of the whole garden.';
 $('journey-note').textContent=mode==='journey'?text().progress:text().quickNote;updateMap();overlay();
}
function updateMap(){
 $('map').replaceChildren();STAGES.forEach((s,i)=>{const li=document.createElement('li');li.textContent=`${String(i+1).padStart(2,'0')} ${s[lang]}`;if(mode==='journey'){li.className=i<g.stage||g.status==='won'?'done':i===g.stage?'current':'';if(i===g.stage)li.setAttribute('aria-current','step');}$('map').append(li);});document.querySelector('.journey-map').hidden=mode==='quick';
}
function overlay(){
 const ended=['won','lost'].includes(g.status),ready=g.status==='ready';$('overlay').hidden=g.status==='playing'&&!paused;if($('overlay').hidden)return;
 $('overlay').dataset.mode=paused?'paused':g.status;$('mode-picker').hidden=!ready;$('route-label').hidden=!ready||mode==='quick';$('mode-note').hidden=!ready;$('mode-note').textContent=mode==='quick'?text().quickNote:text()[route+'Note'];$('run-save').hidden=!ready||mode==='quick';
 $('new-run').hidden=!ended;$('new-run').textContent=text().new;$('menu').hidden=!ended;$('menu').textContent=text().menu;$('result-stats').hidden=!ended;
 $('overlay-label').textContent=paused?'PAUSED':ready?mode==='quick'?'QUICK RUN · 60s':'GARDEN JOURNEY':mode==='quick'?`QUICK RUN · TIDE ${g.seed}`:`${text()[route]} · ${g.stage+1}/7`;
 $('overlay-title').textContent=paused?text().paused:ready?mode==='quick'?(lang==='ja'?'壁を、味方に。':'Make the rim your ally.'):text().first:g.status==='won'?mode==='quick'?(lang==='ja'?'60秒、生き抜いた。':'You held the tide.'):text().won:g.lastMessage==='timeout'?text().timeout:text().lost;
 $('overlay-copy').hidden=ended||ready&&mode==='quick';$('overlay-copy').textContent=paused?text().pausedCopy:text().opening;$('start').textContent=paused?text().resume:ended?text().retry:mode==='quick'?(lang==='ja'?'60秒、遊ぶ ↗':'Play 60 seconds ↗'):text().start;
 if(ended){const d=activeRecords();$('result-score').textContent=format(g.score);$('result-best').textContent=format(d.best);$('result-chain').textContent=g.bestChain;$('best-label').textContent=text().best;$('chain-label').textContent=text().max;$('third-label').textContent=mode==='quick'?text().previous:'RANK';$('result-third').textContent=mode==='quick'?format(previousScore):rank(g);
  $('result-detail').textContent=mode==='quick'?`${g.armorsBroken} ${lang==='ja'?'装甲':'ARMOR'} · ${g.safeLandings} ${lang==='ja'?'安全着地':'SAFE LANDINGS'}`:`${text().stage} ${g.stage+1}/7 · ${Math.floor(g.t/60)}:${String(Math.floor(g.t%60)).padStart(2,'0')} · ${text().seal} ${g.seals}/12 · ${g.armorsBroken} ${lang==='ja'?'装甲':'ARMOR'} · ${g.safeLandings} ${lang==='ja'?'安全着地':'SAFE'}`;
  $('challenge').textContent=mode==='journey'&&g.status!=='won'?failureAdvice():mode==='journey'&&rank(g)!=='S'?(lang==='ja'?'Sを狙うなら 100,000点 ＋ 12 CHAIN':'Aim for S: 100,000 points + 12 CHAIN'):g.bestChain<26?text().challenge(Math.max(3,g.bestChain+1)):mode==='journey'?text().wildGoal:lang==='ja'?'次は、自己ベストへ。':'Go for a new best.';
 }
}
function begin(newSeed=false){if(paused){sound.unlock();pause(false);return;}sound.stop();sound.unlock();controls.clear();if(newSeed)seed=(seed+7919)>>>0;previousScore=mode==='quick'?records.data.lastScore:journeyRecords.data[route].last;g=mode==='quick'?quick.create(seed):journey.create(seed,route);g.status='playing';growth.emit('trial_start',{retry_kind:newSeed?'new':'same'});finished=false;paused=false;trail=[];lastChain=0;chainReadUntil=0;lastStage=0;controls.keyboardAngle=-Math.PI/2;last=performance.now();acc=0;$('live').textContent='';applyText();canvas.focus({preventScroll:true});}
function pause(value=!paused){if(g.status!=='playing')return;paused=value;controls.clear();sound.stop();last=performance.now();acc=0;applyText();if(!paused)canvas.focus({preventScroll:true});}
function choose(next){if(g.status!=='ready')return;mode=next;g=mode==='quick'?quick.create(seed):journey.create(seed,route);applyText();}
function menu(){controls.clear();sound.stop();paused=false;g=mode==='quick'?quick.create(seed):journey.create(seed,route);finished=false;trail=[];applyText();$('start').focus();}
function endRun(){if(finished)return;finished=true;growth.result(mode,g.status);controls.clear();if(mode==='quick')records.result(g.score,g.bestChain);else journeyRecords.result(g);$('live').textContent=(g.status==='won'?mode==='quick'?(lang==='ja'?'60秒、生き抜いた。':'You held the tide.'):text().won:text().lost)+` SCORE ${format(g.score)} / MAX CHAIN ${g.bestChain}`;applyText();$('start').focus({preventScroll:true});if(matchMedia('(max-height:500px) and (orientation:landscape)').matches)$('overlay').scrollIntoView({block:'center',behavior:'instant'});}
function saveSettings(){settings.write({lang,muted:sound.muted,reduced,contrast});}
$('start').addEventListener('click',()=>begin());$('new-run').addEventListener('click',()=>begin(true));$('pause').addEventListener('click',()=>pause());$('menu').addEventListener('click',menu);$('journey').addEventListener('click',()=>choose('journey'));$('quick').addEventListener('click',()=>choose('quick'));
$('route').addEventListener('change',()=>{route=$('route').value;g=journey.create(seed,route);applyText();});canvas.addEventListener('keydown',e=>{if(['won','lost'].includes(g.status)&&e.key==='Enter'&&!e.repeat){e.preventDefault();begin();}});
$('language').addEventListener('click',()=>{lang=lang==='ja'?'en':'ja';saveSettings();applyText();});$('sound').addEventListener('click',()=>{sound.unlock();sound.mute(!sound.muted);saveSettings();applyText();});$('motion').addEventListener('click',()=>{reduced=!reduced;saveSettings();applyText();});$('contrast').addEventListener('click',()=>{contrast=!contrast;saveSettings();applyText();});
function frame(now){
 const delta=Math.max(0,Math.min(.1,(now-last)/1000));last=now;
 if(g.status==='playing'&&!paused){controls.update();acc+=delta;while(acc>=1/120){engine().step(g,1/120);for(const e of g.events){const cue=e.type==='hit'&&e.armor?'armor':e.type==='heal'?'wave':e.type==='seal'?'armor':e.type==='circuit'?'chain':e.type;
  if(['hit','armor','bank','shield','hurt','wave','chain','finale','clear','end'].includes(cue)&&!(e.type==='end'&&g.status==='won'&&mode==='journey'))sound.play(cue,e.chain||g.circuit+5);
  if(e.type==='hit'&&e.chain>=2){lastChain=e.chain;chainReadUntil=now+850;}
 }acc-=1/120;if(mode==='journey'&&g.stage!==lastStage){lastStage=g.stage;updateMap();$('live').textContent=STAGES[g.stage][lang]+'. '+text()[STAGES[g.stage].hint];}if(g.status!=='playing'){endRun();break;}controls.update();}}
 if(now-lastDraw>=1000/60-1){const aim=controls.visibleAim(),path=aim&&g.status==='playing'&&!paused&&g.p.dash===0?engine().reflectedPath(g.p.x,g.p.y,aim.x-g.p.x,aim.y-g.p.y,quick.FEEL.range,g.mirrors||[]):null;
  (mode==='quick'?quickRender:journeyRender)(ctx,g,{clock:reduced?0:now/1000,reduced,contrast,text:text(),lang,aim,path,trail,readChain:now<chainReadUntil?lastChain:0});
  if(contrast){ctx.lineWidth=2;for(const e of g.enemies){ctx.strokeStyle=e.type==='armor'?'#ffe1a3':e.type==='relay'?'#c4ffed':'#fff0f5';ctx.beginPath();ctx.arc(e.x,e.y,e.r+6,0,Math.PI*2);ctx.stroke();}}lastDraw=now;
 }requestAnimationFrame(frame);
}
applyText();for(const id of ['start','journey','quick','route','language','sound','motion','contrast'])$(id).disabled=false;document.querySelector('.playfield').setAttribute('aria-busy','false');growth.ready();requestAnimationFrame(frame);
