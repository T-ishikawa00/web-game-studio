import {showLightCause} from './light-feedback';
import {createCraftAudio} from './craft-audio';
import {createCraftMotion} from './craft-motion';
import type {SoundId} from './craft-sound';
import {homeInputDiagram} from './guides';
import {icon,visualText} from './visual-language';
import {isGameId,levelsByGame} from './levels';
import {initialBoard,validProgress,record,type Progress,type Board} from './state';
import {PROTOCOL,trustedEnvelope} from './protocol';
import {settleLight,turnMirror,moveHome,homeWon,startDelivery,tickDelivery,type Dir,type Level,type LightState,type HomeState,type DeliveryEdit,type DeliveryRun} from './rules';
import {boardView,statusView,button,arrows} from './board-view';
import {guideContent,introductionLevels} from './guides';
import {directInput} from './direct-input';
import {controlBar,isCaptureLayout,type CaptureLayout} from './controls';
const params=new URLSearchParams(location.search),id=params.get('game'),generation=params.get('generation')??'';
if(!isGameId(id))throw new Error('Unknown game');
const gameId=id,en=params.get('lang')==='en',locale=en?'en':'ja',t=(ja:string,eng:string)=>en?eng:ja;
document.documentElement.lang=locale;document.body.dataset.game=gameId;
const root=document.getElementById('game')!,levels=levelsByGame[gameId];root.tabIndex=-1;
let progress:Progress|undefined,level:Level=levels[0]!,history:Board[]=[],outerPaused=true,localPaused=false,run:DeliveryRun|undefined,notice='',won=false;
let timer:ReturnType<typeof setTimeout>|undefined,guideOpen=false,guideDetailed=false,acted=false,hint=0,menuOpen=false,settingsOpen=false,inspectOpen=false,blocked=[false,false];
const audio=gameId==='tiny-delivery'?createCraftAudio():undefined;
const reduced=()=>!!progress?.settings.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
const craft=audio?createCraftMotion(root,reduced):undefined;
let soundVariant=0;try{soundVariant=sessionStorage.getItem('wgs:craft-review-variant')==='1'?1:0;}catch{}
const sound=(event:SoundId,delay=0)=>audio?.play(event,['arrow','arrive','clear'].includes(event)?soundVariant:0,delay);
function stopCraft(suspend=false){audio?.cancel(suspend);craft?.cancel();}
if(audio){
 const unlock=(e:Event)=>{const target=e.target instanceof Element?e.target.closest<HTMLButtonElement>('button'):null;if(target&&!target.disabled&&((!paused()&&['arrow','go','step','retry','restore'].includes(target.dataset.action?.split(':')[0]??''))||(clockDialog.open&&target.dataset.waitValue!==undefined)))audio.unlock(e);};
 document.addEventListener('pointerdown',unlock,{capture:true});
 document.addEventListener('keydown',e=>{if(!e.repeat&&(e.key==='Enter'||e.key===' '))unlock(e);},{capture:true});
 Object.defineProperty(window,'__craftState',{value:()=>({audio:audio.snapshot(),motion:craft!.snapshot()})});
}
const guideKey=`wgs:guide:${gameId}`,dismissed=new Set<string>();let guideWritable=true,guideSaveFailed=false;
try{const raw=localStorage.getItem(guideKey);if(raw){const v:unknown=JSON.parse(raw);if(!record(v)||v.version!==1||!Array.isArray(v.dismissed)||Array.from(v.dismissed).some(id=>typeof id!=='string'||!levels.some(l=>l.id===id)))guideWritable=false;else for(const id of v.dismissed)dismissed.add(id);}}catch{guideWritable=false;}
function rememberGuide(){dismissed.add(level.id);if(!guideWritable){guideSaveFailed=true;return;}try{localStorage.setItem(guideKey,JSON.stringify({version:1,dismissed:[...dismissed]}));}catch{guideSaveFailed=true;}}
const send=(type:string,extra:Record<string,unknown>={})=>parent.postMessage({protocol:PROTOCOL,gameId,generation,type,...extra},location.origin);
let layout:CaptureLayout='auto',compositionGuide=false,dpad=false;
const dpadKey='wgs:input:two-ways-home';
try{dpad=sessionStorage.getItem(dpadKey)==='buttons';}catch{}
let cueReplay=false;
let cancelLight=()=>{};
let causeWidth=innerWidth;
window.addEventListener('resize',()=>{if(innerWidth!==causeWidth){cancelLight();stopCraft();}causeWidth=innerWidth;});
parent.addEventListener('resize',()=>{cancelLight();stopCraft();});
let clockIndex:number|undefined,menuView:'main'|'help'|'levels'='main';
const layoutKey='wgs:capture-layout';
try{const remembered=sessionStorage.getItem(layoutKey);if(isCaptureLayout(remembered))layout=remembered;}catch{/* Display preferences are optional. */}
if(isCaptureLayout(params.get('layout')))layout=params.get('layout') as CaptureLayout;
const settingsDialog=document.createElement('dialog'),confirmDialog=document.createElement('dialog');
settingsDialog.className='control-dialog';confirmDialog.className='control-dialog';
settingsDialog.setAttribute('aria-label',t('設定','Settings'));confirmDialog.setAttribute('aria-label',t('この面をやり直しますか？','Restart this puzzle?'));
const menuDialog=document.createElement('dialog'),clockDialog=document.createElement('dialog');
menuDialog.className='control-dialog menu-dialog';clockDialog.className='control-dialog clock-dialog';
menuDialog.setAttribute('aria-label',t('メニュー','Menu'));clockDialog.setAttribute('aria-label',t('待つ時間','Waiting time'));
document.body.append(settingsDialog,confirmDialog,menuDialog,clockDialog);
// Native dialogs live inside the tall game iframe. Fit them to its visible portion.
function fitDialog(dialog:HTMLDialogElement){
 const bounds=window.frameElement?.getBoundingClientRect(),top=bounds?Math.max(0,-bounds.top):0;
 const available=bounds?Math.max(120,Math.min(innerHeight-top,parent.innerHeight-Math.max(0,bounds.top))):innerHeight;
 dialog.style.top=`${top+8}px`;dialog.style.maxHeight=`${available-16}px`;
}
function fitDialogs(){for(const dialog of [settingsDialog,confirmDialog,menuDialog,clockDialog])if(dialog.open)fitDialog(dialog);}
parent.addEventListener('scroll',fitDialogs,{passive:true});parent.addEventListener('resize',fitDialogs);
window.addEventListener('resize',fitDialogs);
const paused=()=>outerPaused||document.hidden||settingsOpen||confirmDialog.open||menuOpen||clockDialog.open;
function pauseRun(){stopCraft();if(run?.status==='running'){localPaused=true;clearTimeout(timer);}}
const input=directInput(root,()=>!!progress&&!paused()&&!won,direction=>act(`move:${direction}`));
function applyLayout(){root.dataset.layout=layout;root.dataset.dpad=String(dpad);root.dataset.compositionGuide=String(compositionGuide);}
function setLayout(value:unknown){if(!isCaptureLayout(value))return;pauseRun();layout=value;try{sessionStorage.setItem(layoutKey,layout);}catch{}render();}
function focusAction(action:string){root.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)?.focus({preventScroll:true});}
function closeSettings(){settingsOpen=false;settingsDialog.close();render();focusAction('menu');schedule();}
function openSettings(){
 input.cancel();pauseRun();settingsOpen=true;render();
 settingsDialog.innerHTML=`<h2>${t('設定','Settings')}</h2><label for="capture-layout">${t('撮影用レイアウト','Capture layout')}</label><select id="capture-layout"><option value="auto">${t('通常','Normal')}</option><option value="portrait">${t('縦撮影 9:16','Portrait 9:16')}</option><option value="landscape">${t('横撮影 16:9','Landscape 16:9')}</option></select><p>${t('走行中の切替は、その場で一時停止します。','Switching pauses a moving delivery in place.')}</p><label class="check-setting"><input type="checkbox" id="composition-guide">${t('構図ガイド（投稿先の公式余白ではありません）','Composition guide (not a platform safe zone)')}</label><label class="check-setting"><input type="checkbox" id="motion-setting">${t('動きを控える','Reduce motion')}</label><p>${t('音声なし。いつでも静かに遊べます。','No audio. Always quiet to play.')}</p><small>${t('戻せるのは、この再開後の操作です。','Undo covers moves since this resume.')}</small>${level.kind==='delivery'?'<button type="button" id="reset-layout">'+t('初期配置に戻す','Reset layout')+'</button>':''}<button type="button" id="close-settings" autofocus>${t('閉じる','Close')}</button>`;
 const select=settingsDialog.querySelector<HTMLSelectElement>('select')!;select.value=layout;select.onchange=()=>setLayout(select.value);
 if(audio){
  const old=settingsDialog.querySelector('small')!.previousElementSibling!;
  old.outerHTML=`<fieldset class="audio-settings" style="display:grid;gap:8px"><legend>${t('効果音','Sound effects')}</legend><label class="check-setting"><input id="audio-mute" type="checkbox"> ${t('消音','Mute')}</label><label for="audio-gain">${t('音量','Volume')} <output id="audio-value"></output></label><input id="audio-gain" type="range" min="0" max="100" step="5" style="width:100%;min-height:32px"><p id="audio-status" role="status"></p></fieldset>`;
  const mute=settingsDialog.querySelector<HTMLInputElement>('#audio-mute')!,gain=settingsDialog.querySelector<HTMLInputElement>('#audio-gain')!;
  mute.checked=audio.preferences.mute;gain.value=String(Math.round(audio.preferences.gain*100));
  const status=()=>{settingsDialog.querySelector('output')!.textContent=gain.value+'%';settingsDialog.querySelector('#audio-status')!.textContent=audio.storageFailed?t('音設定はこの回だけ反映します。保存できません。','Sound settings apply to this visit; saving is unavailable.'):audio.available?'':t('音を再生できません。ゲームは続けられます。','Sound is unavailable. You can keep playing.');};
  mute.onchange=gain.oninput=()=>{audio.set({mute:mute.checked,gain:Number(gain.value)/100});status();};status();
 }
 const guide=settingsDialog.querySelector<HTMLInputElement>('#composition-guide')!;guide.checked=compositionGuide;guide.onchange=()=>{compositionGuide=guide.checked;applyLayout();};
 const motion=settingsDialog.querySelector<HTMLInputElement>('#motion-setting')!;motion.checked=!!progress?.settings.reducedMotion;motion.onchange=()=>{if(progress){progress.settings.reducedMotion=motion.checked;checkpoint();render();}};
 settingsDialog.querySelector('#close-settings')!.addEventListener('click',closeSettings);
 settingsDialog.querySelector('#reset-layout')?.addEventListener('click',()=>{closeSettings();requestRestart('restore');});
 fitDialog(settingsDialog);settingsDialog.showModal();fitDialog(settingsDialog);select.focus({preventScroll:true});
}
settingsDialog.addEventListener('cancel',e=>{e.preventDefault();closeSettings();});
function toggleDpad(){
 input.cancel();dpad=!dpad;try{sessionStorage.setItem(dpadKey,dpad?'buttons':'swipe');}catch{}
 render();if(menuOpen)drawMenu();else focusAction('dpad');
}
function closeMenu(focus=true){menuOpen=false;menuDialog.close();menuDialog.replaceChildren();render();if(focus)focusAction('menu');}
function drawMenu(){
 const index=levels.findIndex(l=>l.id===level.id),guide=guideContent(level,en,acted);
 menuDialog.innerHTML=menuView==='levels'?'<h2>'+t('面一覧','Levels')+'</h2><nav class="levels">'+levels.map((l,i)=>button('level:'+l.id,String(i+1).padStart(2,'0')+' '+l.title[locale]+(progress?.cleared.includes(l.id)?' ✓':''),false,l.id===level.id?'current':'')).join('')+'</nav>':menuView==='help'?'<h2>'+guide.title+'</h2>'+guide.diagram+'<p>'+guide.body+'</p><p>'+shortGuide()+'</p><p>'+t('盤面の外ではページをスクロールできます。','Scroll the page outside the boards.')+'</p>'+button('show-cue',t('盤面の案内を再表示','Show board tips')):'<h2>'+t('メニュー','Menu')+'</h2><p>'+level.title[locale]+' · '+(index+1)+' / '+levels.length+'</p>'+button('guide',t('遊び方','How to play'))+button('levels',t('面一覧','Levels'))+button('settings',t('設定・表示切替','Settings & layout'))+button(level.kind==='delivery'?'restore':'retry',t('この面をやり直す','Restart this puzzle'))+(run?button('retry',t('調整に戻る','Edit route')):'');
 if(menuView!=='levels')menuDialog.innerHTML+=button('hint',t('ヒント','Hint')+(hint?' '+hint+'/2':''))+(hint?'<div class="hint"><b>'+t('初期盤面からのヒント','Hint from the initial board')+' '+hint+'/2</b><p>'+visualText(level.hints?.[hint-1]?.[locale]??level.lesson[locale])+'</p></div>':'')+(level.kind==='home'?button('dpad',dpad?t('方向ボタンを隠す','Hide direction buttons'):t('方向ボタンで操作','Use direction buttons')):'');
 menuDialog.innerHTML+=(menuView!=='main'?button('menu-back',t('戻る','Back')):'')+button('close-menu',t('閉じる','Close'));
 fitDialog(menuDialog);
}
function openMenu(view:'main'|'help'|'levels'='main'){input.cancel();pauseRun();menuOpen=true;menuView=view;render();drawMenu();menuDialog.showModal();fitDialog(menuDialog);menuDialog.querySelector<HTMLButtonElement>('button')?.focus({preventScroll:true});}
menuDialog.addEventListener('cancel',e=>{e.preventDefault();closeMenu();});
menuDialog.addEventListener('click',e=>{
 const b=e.target instanceof Element?e.target.closest<HTMLButtonElement>('button[data-action]'):null;if(!b)return;
 const action=b.dataset.action!;
 if(action==='close-menu'){closeMenu();return;}
 if(action==='dpad'){toggleDpad();menuDialog.querySelector<HTMLButtonElement>('[data-action="dpad"]')?.focus();return;}
 if(action==='hint'){hint=(hint+1)%3;drawMenu();menuDialog.querySelector<HTMLButtonElement>('[data-action="hint"]')?.focus();return;}
 if(['guide','levels','menu-back'].includes(action)){menuView=action==='guide'?'help':action==='levels'?'levels':'main';drawMenu();menuDialog.querySelector<HTMLButtonElement>('button')?.focus();return;}
 closeMenu(false);if(action==='show-cue'){cueReplay=true;guideOpen=true;render();root.focus({preventScroll:true});}else act(action);
});
function closeClock(focus=true){const i=clockIndex;clockIndex=undefined;clockDialog.close();render();if(focus&&i!==undefined)focusAction('clock:'+i);}
function openClock(i:number){
 if(!progress||level.kind!=='delivery'||run||paused())return;
 const cells=level.waitCells??(level.waitCell===undefined?[]:[level.waitCell]);if(!cells[i]){if(cells[i]!==0)return;}
 input.cancel();clockIndex=i;const edit=progress.board as DeliveryEdit,value=level.waitCells?edit.waits?.[i]??0:edit.wait;
 clockDialog.innerHTML='<h2>'+t('時計','Clock')+' '+(i+1)+'</h2><p>'+t('到着後に待つ拍数','Beats to wait after arrival')+'</p><div class="clock-choices">'+Array.from({length:(level.maxWait??2)+1},(_,n)=>'<button type="button" data-wait-value="'+n+'" aria-pressed="'+(n===value)+'">'+n+' '+t('拍','beats')+'</button>').join('')+'</div><button type="button" id="close-clock">'+t('閉じる','Close')+'</button>';
 clockDialog.showModal();render();fitDialog(clockDialog);
 const target=root.querySelector<HTMLElement>('[data-action="clock:'+i+'"]');if(target){const r=target.getBoundingClientRect(),h=clockDialog.getBoundingClientRect().height,frame=window.frameElement?.getBoundingClientRect(),bottom=frame?Math.min(innerHeight,parent.innerHeight-frame.top):innerHeight;clockDialog.style.top=Math.max(parseFloat(clockDialog.style.top),Math.min(r.bottom+8,bottom-h-8))+'px';}
 clockDialog.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus({preventScroll:true});
}
clockDialog.addEventListener('cancel',e=>{e.preventDefault();closeClock();});
clockDialog.addEventListener('click',e=>{
 const target=e.target instanceof Element?e.target.closest<HTMLButtonElement>('button'):null;
 if(target?.id==='close-clock'){closeClock();return;}
 const raw=target?.dataset.waitValue;if(raw!==undefined&&clockIndex!==undefined&&progress&&level.kind==='delivery'&&!run&&!outerPaused&&!document.hidden){const n=Number(raw);if(Number.isInteger(n)&&n>=0&&n<=(level.maxWait??2)){const edit=progress.board as DeliveryEdit;const previous=level.waitCells?edit.waits?.[clockIndex]??0:edit.wait;if(previous===n){closeClock();return;}const changedClock=clockIndex;if(level.waitCells){edit.waits??=level.waitCells.map(()=>0);edit.waits[clockIndex]=n;}else edit.wait=n as 0|1|2;acted=true;checkpoint();closeClock();sound('wait');craft?.feedback('wait',changedClock);}}
});
let clockBackdrop=false;
clockDialog.addEventListener('pointerdown',e=>{const r=clockDialog.getBoundingClientRect();clockBackdrop=e.target===clockDialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom);});
clockDialog.addEventListener('pointerup',e=>{const r=clockDialog.getBoundingClientRect();if(clockBackdrop&&e.target===clockDialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeClock();clockBackdrop=false;});
function requestRestart(action:'retry'|'restore'){
 input.cancel();
 if(!progress)return;
 if((level.kind==='delivery'&&action==='retry')||JSON.stringify(progress.board)===JSON.stringify(initialBoard(level))){act(action,true);return;}
 pauseRun();confirmDialog.innerHTML=`<h2>${t('この面をやり直しますか？','Restart this puzzle?')}</h2><p>${t('今の配置は初期状態に戻ります。クリア記録は残ります。','The current plan returns to its initial state. Completed puzzles stay recorded.')}</p><div class="confirm-actions"><button type="button" id="cancel-restart" autofocus>${t('キャンセル','Cancel')}</button><button type="button" id="accept-restart">${t('やり直す','Restart')}</button></div>`;
 const close=()=>{confirmDialog.close();render();focusAction('menu');};
 confirmDialog.oncancel=e=>{e.preventDefault();close();};
 confirmDialog.querySelector('#cancel-restart')!.addEventListener('click',close);
 confirmDialog.querySelector('#accept-restart')!.addEventListener('click',()=>{confirmDialog.close();act(action,true);focusAction('menu');});
 fitDialog(confirmDialog);confirmDialog.showModal();render();fitDialog(confirmDialog);
}
// Read-only, on-demand local QA snapshot; no per-frame logging or external send.
Object.defineProperty(window,'__prototypeState',{value:()=>structuredClone({progress,history,run,localPaused,outerPaused,guideOpen,guideDetailed,acted,hint,menuOpen,notice,won,blocked,layout,dpad}),configurable:true});
function checkpoint(){send('checkpoint',{data:progress});}
function evaluate(){if(!progress)return;if(level.kind==='light'){const r=settleLight(level,progress.board as LightState);progress.board=r.state;won=r.won;}else if(level.kind==='home')won=homeWon(level,progress.board as HomeState);else won=run?.status==='won';if(won&&!progress.cleared.includes(level.id))progress.cleared.push(level.id);}
function resetGuide(){cueReplay=false;acted=false;hint=0;guideOpen=introductionLevels.has(level.id)&&!dismissed.has(level.id);blocked=[false,false];}
function shortGuide(){
 if(level.kind==='light')return level.id==='L01'?t('金属の鏡をタップ。光を曲げて花へ。','Tap the metal mirror. Bend the light toward the flower.'):level.id==='L09'?t('分光器の入口から、2方向へ。分光器は固定です。','Use the splitter’s inlet to make two rays. It stays fixed.'):t('同じ記号のスイッチを照らすと、門は開いたまま。','Light the matching switch; its gate stays open.');
 if(level.kind==='home')return level.id==='T20'?t('壁に当たる子だけ停止。もう一人は一歩。','Only the friend facing a wall stops. The other takes a step.'):level.id==='T04'?t('家からも動けます。二人そろって帰宅しよう。','You can leave home too. Bring both friends home together.'):dpad?t('方向ボタンで、ふたりを一歩ずつ。','Direction buttons move both friends one step.'):t('どちらの庭をスワイプしても、ふたりが動く。PCは方向ドラッグ・矢印キー／WASD。','Swipe either garden to move both friends. Or drag, use arrows / WASD.');
 return level.id==='D01'?t('矢印を変えて「出発」。','Turn arrows, then press Go.'):level.id==='D11'?t('同じ道を向かい合って交換すると衝突します。','Swapping the same edge head-on causes a collision.'):level.id==='D10'?t('直前に空いたマスへ続くことはできます。','Following into a square that just became empty is allowed.'):t('時計の数だけ到着後に待ち、次の拍で進みます。','After arrival, wait for the clock’s beats, then move.');
}
function changeLevel(levelId:string){const target=levels.find(l=>l.id===levelId);if(!progress||!target)return;stopCraft();level=target;progress.levelId=level.id;progress.levelVersion=level.version;progress.board=initialBoard(level);history=[];run=undefined;localPaused=false;notice='';won=false;clearTimeout(timer);resetGuide();menuOpen=false;evaluate();checkpoint();render();}
function schedule(){clearTimeout(timer);if(level.kind==='delivery'&&run?.status==='running'&&!paused()&&!localPaused)timer=setTimeout(()=>{advance();schedule();},600);}
function advance(){
 if(!progress||level.kind!=='delivery'||paused())return;
 const before=run??startDelivery(level),clearedBefore=progress.cleared.length;run=tickDelivery(level,progress.board as DeliveryEdit,before);evaluate();if(won)checkpoint();render();
 craft?.transition(level,before,run);
 if(before.status==='running'){
  if(run.status==='failed'){stopCraft();craft?.transition(level,before,run);sound('collision');}
  else if(run.status==='won')sound(clearedBefore<levels.length&&progress.cleared.length===levels.length?'complete':'clear',reduced()?0:.18);
  else if(run.bots.some(bot=>bot.delivered&&!before.bots.find(b=>b.id===bot.id)?.delivered))sound('arrive',reduced()?0:.18);
 }
}
function render(){
 if(!progress)return;cancelLight();craft?.cancel();input.cancel();
 const focused=document.activeElement instanceof HTMLElement?document.activeElement.dataset.action:undefined,focusedBoard=document.activeElement instanceof HTMLElement?document.activeElement.dataset.swipeBoard:undefined,index=levels.findIndex(l=>l.id===level.id),last=index===levels.length-1;
 const view={level,progress,run,paused:paused(),won,en,guideOpen,acted,localPaused,inspectOpen,notice,blocked,dpad};
 const cue=level.kind==='light'?(level.id==='L01'?t('鏡をタップ','Tap the mirror'):level.splitter?t('入口から、ふたつの出口へ','One inlet, two exits'):t('同じ印の門は開いたまま','Matching gates stay open')):level.kind==='home'?(level.id==='T19'?t('庭を右へスワイプ・ドラッグ／右キー','Swipe or drag right in a garden / right arrow'):level.id==='T20'?t('壁の前では、その子だけ停止','Walls stop only that friend'):level.id==='T04'?t('家からも動ける。ふたり同時に','You can leave home too'):t('スワイプで、ふたり一緒に','Swipe to move both')):level.id==='D01'?t('矢印を変えて、出発','Turn arrows, then Go'):level.id==='D10'?t('空いたマスへ、同じ拍で','Follow into the vacated square'):level.id==='D11'?t('向かい合う交換は衝突','Head-on swaps collide'):t('時計の数だけ待つ','Wait for the clock’s count');
 document.body.classList.toggle('reduce-motion',progress.settings.reducedMotion);applyLayout();
 root.innerHTML=`<div class="game-wrap ${won?'success':''}"><div class="capture-frame" data-capture-frame><header class="game-header"><span class="stage-number" aria-label="${t('面','Level')}">${String(index+1).padStart(2,'0')}<small> / ${levels.length}</small></span><div class="scene-status">${statusView(view)}</div></header><div class="play-layout"><div class="play-area">${boardView(view)}</div></div><div class="outcome" role="status">${won?`<strong>${last?progress.cleared.length===levels.length?t('全'+levels.length+'問クリア','All '+levels.length+' puzzles complete'):t('最後の問題をクリア','Final puzzle complete'):level.kind==='light'?t('花がひらきました','The garden is glowing'):level.kind==='home'?t('ふたりそろって、おかえり','Welcome home, both of you'):t('お届け、できました','Every parcel delivered')}</strong>`:''}</div><footer class="game-controls control-deck" aria-label="${t('ゲーム操作','Game controls')}">${controlBar({delivery:level.kind==='delivery',run,localPaused,paused:paused(),won,last,history:history.length,en})}</footer></div><div class="production-tools">${guideOpen&&(!acted||cueReplay)&&!won?`<aside class="input-cue" aria-label="${t('操作の案内','Input tips')}">${level.id==='T19'?homeInputDiagram(en):''}<p>${icon(level.kind==='home'?'swipe':'tap')}${cue}</p><div>${level.kind==='home'?button('dpad',dpad?t('方向ボタンを隠す','Hide direction buttons'):t('方向ボタンで操作','Use direction buttons'),paused(),'quiet'):''}${button('close-guide',t('案内を閉じる','Dismiss tips'),paused(),'quiet')}</div></aside>`:''}<div class="capture-tools" ${layout==='auto'?'hidden':''}><span>${layout==='portrait'?'9:16':'16:9'}</span>${button('auto-layout',t('通常へ戻る','Back to Normal'),outerPaused,'quiet')}</div><p class="capture-size-note">${t('この幅では通常表示が遊びやすくなります。撮影枠の大きさは維持しています。','Normal is easier to play at this width. The capture frame keeps its dimensions.')}</p></div>${guideSaveFailed?`<p class="guide-save-status">${t('案内の表示設定は保存できません。元データを保持し、この回だけ反映します。','Guide preference could not be saved. Original data is retained; this visit still works.')}</p>`:''}${outerPaused||document.hidden?`<div class="paused-veil" role="status">Ⅱ ${t('一時停止中','Paused')}</div>`:''}</div>`;
 if(focused&&!settingsOpen&&!confirmDialog.open&&!menuOpen&&!clockDialog.open){const target=root.querySelector<HTMLButtonElement>(`[data-action="${focused}"]`);if(target&&!target.disabled)target.focus({preventScroll:true});else root.focus({preventScroll:true});}
 const cueElement=root.querySelector('.input-cue');if(cueElement)root.querySelector('.capture-frame')!.append(cueElement);
 if(focusedBoard!==undefined&&!paused())root.querySelector<HTMLElement>(`[data-swipe-board="${focusedBoard}"]`)?.focus({preventScroll:true});
 input.refresh();
}

function act(action:string,confirmed=false){
 if(!progress||paused())return;
 if(action==='auto-layout'){setLayout('auto');return;}
 if(action==='settings'){openSettings();return;}
 if(action==='menu'){openMenu();return;}
 if(action==='guide'){openMenu('help');return;}
 if(action==='finish-levels'){openMenu('levels');return;}
 if(action==='dpad'){toggleDpad();return;}
 if(action.startsWith('clock:')){openClock(Number(action.split(':')[1]));return;}
 if((action==='retry'||action==='restore')&&!confirmed){requestRestart(action);return;}
 if(action==='step'&&(level.kind!=='delivery'||run?.status!=='running'||!localPaused))return;
 if(action==='go'&&run&&run.status!=='running')return;
 cueReplay=false;const previousBoard=structuredClone(progress.board);send('first-input');const [name,arg]=action.split(':'),i=Number(arg);
 if(name==='guide-detail'){guideDetailed=!guideDetailed;render();return;}if(name==='menu'){menuOpen=!menuOpen;render();return;}if(name==='guide'){guideOpen=!guideOpen;render();return;}if(name==='close-guide'){guideOpen=false;rememberGuide();render();return;}if(name==='hint'){hint=(hint+1)%3;render();return;}if(name==='inspect'){inspectOpen=!inspectOpen;render();return;}
 if(won&&(name==='mirror'||name==='move'))return;
 if(name==='finish-levels'){menuOpen=true;render();return;}if(name==='level'){changeLevel(arg!);return;}if(name==='next'){const index=levels.findIndex(l=>l.id===level.id);if(won&&index<levels.length-1)changeLevel(levels[index+1]!.id);return;}if(name==='motion')progress.settings.reducedMotion=!progress.settings.reducedMotion;
 if(name==='mirror'&&level.kind==='light'){history.push(structuredClone(progress.board));progress.board=turnMirror(level,progress.board as LightState,i).state;acted=true;const s=progress.board as LightState;if(s.gate||s.gates?.some(Boolean))notice=t('門は開いたまま。光を花への道へ配り直せます。','The gate stays open. You can reroute the light toward the flowers.');}
 if(name==='move'&&level.kind==='home'){const r=moveHome(level,progress.board as HomeState,i as Dir);blocked=r.blocked;if(r.changed){history.push(structuredClone(progress.board));progress.board=r.state;acted=true;}notice=`${arrows[i]} ${r.blocked.every(Boolean)?t('ふたりとも壁で止まりました','Both stopped at a wall'):r.blocked[0]?t('○は止まり、□が一歩','○ stopped; □ took a step'):r.blocked[1]?t('□は止まり、○が一歩','□ stopped; ○ took a step'):t('ふたりで一歩','One step together')}`;}
 if(name==='undo'&&history.length){stopCraft();progress.board=history.pop()!;notice='';blocked=[false,false];acted=history.length>0;}
 if(name==='retry'||name==='restore'){stopCraft();if(level.kind!=='delivery'||name==='restore')progress.board=initialBoard(level);history=[];run=undefined;localPaused=false;notice='';acted=false;blocked=[false,false];clearTimeout(timer);}
 if(level.kind==='delivery'){
  const edit=progress.board as DeliveryEdit;
  if(name==='arrow'&&!run){const choices=level.allowedDirections?.[i]??[0,1,2,3];edit.arrows[i]=choices[(choices.indexOf(edit.arrows[i]!)+1)%choices.length]! as Dir;acted=true;}

  if(name==='go'){if(!run){run=startDelivery(level);localPaused=false;sound('start');}else{localPaused=!localPaused;if(localPaused)stopCraft();}schedule();}if(name==='step'){localPaused=true;clearTimeout(timer);advance();return;}
 }
 evaluate();checkpoint();render();
 if(level.kind==='delivery'){
  if(name==='arrow'&&!run&&JSON.stringify(previousBoard)!==JSON.stringify(progress.board)){sound('arrow');craft?.feedback('arrow',i);}
  if(name==='retry'||name==='restore'){sound('undo');craft?.feedback('undo');}
  if(name==='go'&&run?.tick===0&&!localPaused)craft?.feedback('start');
 }
 if(name==='mirror'&&level.kind==='light')cancelLight=showLightCause(root,level,previousBoard as LightState,progress.board as LightState,en,progress.settings.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches);
 const response=name==='move'?root.querySelectorAll('.board .character .actor-face'):name==='mirror'?root.querySelectorAll('[data-action="mirror:'+i+'"] .mirror'):name==='undo'?root.querySelectorAll('.board'):[];
 if(!progress.settings.reducedMotion&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  for(const [n,node] of Array.from(response).entries()){
   if(name==='move'&&level.kind==='home'){
    const old=(previousBoard as HomeState).positions[n]!,now=(progress.board as HomeState).positions[n]!;
    const dx=(old%level.size-now%level.size)*60,dy=(Math.floor(old/level.size)-Math.floor(now/level.size))*60;
    node.animate(dx||dy?[{transform:'translate('+dx+'px,'+dy+'px)'},{transform:'translate(0,0)'}]:[{transform:'scaleX(.92)'},{transform:'scaleX(1)'}],{duration:150});
   }else node.animate([{opacity:.5},{opacity:1}],{duration:150});
  }
 }
 if(name==='move'&&level.kind==='home')for(const board of root.querySelectorAll('.board')){
  const cue=document.createElement('span');cue.className='move-response';cue.setAttribute('aria-hidden','true');cue.textContent=arrows[i]!;board.append(cue);setTimeout(()=>cue.remove(),350);
 }
}
root.addEventListener('click',event=>{const b=event.target instanceof Element?event.target.closest<HTMLButtonElement>('button[data-action]'):null;if(b&&!b.disabled&&input.acceptClick(event,b))act(b.dataset.action!);});
document.addEventListener('keydown',event=>{if(event.repeat&&(event.key==='Enter'||event.key===' ')&&event.target instanceof Element&&!!event.target.closest('button[data-action]')){event.preventDefault();return;}if(event.target instanceof Element&&event.target.closest('input,select,textarea,[contenteditable=true],dialog'))return;if(event.target instanceof Element&&event.target.closest('.production-tools,.guide,.hint,button:not(.direction)'))return;if(level.kind!=='home'||paused()||event.altKey||event.ctrlKey||event.metaKey||!root.contains(document.activeElement))return;const d=({ArrowUp:0,w:0,W:0,ArrowRight:1,d:1,D:1,ArrowDown:2,s:2,S:2,ArrowLeft:3,a:3,A:3} as Record<string,Dir>)[event.key];if(d!==undefined){event.preventDefault();if(!event.repeat)act(`move:${d}`);}});
window.addEventListener('message',event=>{if(!trustedEnvelope(event,parent,location.origin,gameId,generation))return;const m:unknown=event.data;if(!record(m))return;if(m.type==='init'&&validProgress(gameId,m.data)&&typeof m.paused==='boolean'){stopCraft(true);progress=structuredClone(m.data);level=levels.find(l=>l.id===progress!.levelId)!;outerPaused=m.paused;history=[];run=undefined;localPaused=false;notice='';clearTimeout(timer);resetGuide();evaluate();render();}if(m.type==='pause'&&typeof m.paused==='boolean'){if(m.paused)stopCraft(true);outerPaused=m.paused;render();schedule();}});
document.addEventListener('visibilitychange',()=>{stopCraft(document.hidden);render();schedule();});window.addEventListener('pageshow',()=>{schedule();});window.addEventListener('pagehide',()=>{stopCraft(true);cancelLight();input.cancel();clearTimeout(timer);outerPaused=true;});window.addEventListener('error',()=>send('error',{code:'runtime-error'}));
new ResizeObserver(()=>{if(progress)send('resize',{height:Math.max(400,Math.min(1600,Math.ceil(root.getBoundingClientRect().height)+2))});}).observe(root);send('ready');
