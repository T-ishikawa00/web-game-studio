import {homeLevels} from '../../../src/prototypes/home-levels-learning';
import {moveHome,homeWon,type HomeState,type HomeLevel,type Dir} from '../../../src/prototypes/rules';
import {createPrototypeSave,initialBoard,type Progress} from '../../../src/prototypes/state';
import {createTwAudio} from '../../../src/prototypes/twoways-craft-audio';
import {twCraftPlan} from '../../../src/prototypes/twoways-craft-plan';
import {directInput} from '../../../src/prototypes/direct-input';
import {TownWorld} from './world';
import {ArrivalPresentation} from './arrival';

type Lang='ja'|'en';type View='title'|'select'|'play';
const root=document.querySelector<HTMLElement>('#app')!,canvasHost=document.querySelector<HTMLElement>('#world')!,hud=document.querySelector<HTMLElement>('#hud')!,menu=document.querySelector<HTMLElement>('#menu')!,dialog=document.querySelector<HTMLDialogElement>('#dialog')!;
const params=new URLSearchParams(location.search);let lang:Lang=params.get('lang')==='en'?'en':'ja';
const save=createPrototypeSave('two-ways-home',()=>localStorage),loaded=save.load();let progress=loaded.data,saveStatus:string=loaded.status;
let level:HomeLevel=homeLevels.find(l=>l.id===progress.levelId)!,state=structuredClone(progress.board) as HomeState,view:View='title',undo:HomeState[]=[],moves=0,paused=false,hint=0,blocked=[false,false],lastMessage='';
const arrival=new ArrivalPresentation(()=>{if(view==='play')render();});
const audio=createTwAudio(),motionMedia=matchMedia('(prefers-reduced-motion: reduce)');const reduced=()=>motionMedia.matches||progress.settings.reducedMotion;
let world:TownWorld;
let recorder:MediaRecorder|undefined,recorded:BlobPart[]=[];
let lastRenderStats:unknown={};
try{world=new TownWorld(canvasHost);}catch{canvasHost.innerHTML='<p class="render-error">3D表示を開始できませんでした。WebGL対応のブラウザで再読込してください。<br>Unable to start 3D. Reload in a WebGL-capable browser.</p>';throw new Error('WebGL renderer unavailable');}
const en=()=>lang==='en',t=(ja:string,enText:string)=>en()?enText:ja;
const escape=(text:string)=>text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const displayCopy=(text:string)=>text.replaceAll('□','◇');
const feedback=()=>{
 const messages:Record<string,[string,string]>={
  won:['ふたりが同時に帰宅しました。','Both friends are home together.'],
  blocked:['ふたりとも壁でひとやすみ。別の方向を試そう。','Both friends wait at a wall. Try another direction.'],
  circle:['○が待つあいだに、◇が一歩。','Circle waits while diamond takes a step.'],
  diamond:['◇が待つあいだに、○が一歩。','Diamond waits while circle takes a step.'],
  step:['同じ合図で、ふたりが一歩。','One shared signal moves both friends.'],
  undo:['ふたりで、一歩もどりました。','Both friends take one step back.'],
  retry:['もう一度、ふたりの帰り道を。','A fresh start for both friends.'],
 };
 return lastMessage?messages[lastMessage]![en()?1:0]:level.lesson[lang];
};
const scrollTop=()=>window.scrollTo({top:0,left:0,behavior:'instant'});
const number=()=>homeLevels.indexOf(level)+1,chapter=()=>Math.min(2,Math.floor((number()-1)/7));
const district=()=>[['運河のほとり','Canal Promenade'],['夕暮れの小路','Evening Lanes'],['灯りの待つ家','The Lights of Home']][chapter()]![en()?1:0];
const won=()=>homeWon(level,state),canMove=()=>view==='play'&&!paused&&!dialog.open&&!won();
const statusText=()=>saveStatus==='invalid'?t('保存データを保護しています。この回は保存しません。','Your original save is protected. This visit is not saved.'):saveStatus==='unavailable'||saveStatus==='failed'?t('保存できません。この回だけ遊べます。','Saving is unavailable. You can play for this visit.'):t('このブラウザに保存','Saved in this browser');
function syncMetrics(detail=lastRenderStats){lastRenderStats=detail;const output=document.querySelector('#render-metrics');if(output)output.textContent=JSON.stringify({view,levelId:level.id,levelNumber:number(),positions:[...state.positions],won:won(),moves,undoCount:undo.length,blocked:[...blocked],paused,lang,saveStatus,cleared:[...progress.cleared],clearedCount:progress.cleared.length,reducedMotion:reduced(),audio:audio.snapshot(),render:detail},null,2);}
function persist(){progress={...progress,levelId:level.id,levelVersion:level.version,board:structuredClone(state)};if(save.write(progress))saveStatus='ok';else if(saveStatus!=='invalid'&&saveStatus!=='unavailable')saveStatus='failed';}
function cancel(suspend=true){const reveal=arrival.cancelPending();audio.cancel(suspend);world.cancel();input?.cancel();if(reveal&&view==='play'){renderPlay();input?.refresh();}}
function updateLanguage(){document.documentElement.lang=lang;document.title='Two Ways Home · Tinlumo';root.dataset.lang=lang;document.querySelector('#brand-link')!.setAttribute('aria-label',t('Tinlumoの5作品へ','Tinlumo five-game preview'));document.querySelector('#brand-link')!.setAttribute('href',`../portal.html?lang=${lang}`);document.querySelector('#review-link')!.textContent=t('Reviewへ','Review');document.querySelector('#review-link')!.setAttribute('href',`../index.html?game=two-ways&lang=${lang}`);document.querySelector('#language')!.textContent=en()?'日本語':'English';document.querySelector('#language')!.setAttribute('aria-label',t('Englishに切替','日本語に切替'));}
function button(action:string,text:string,extra=''){return `<button type="button" data-action="${action}" ${extra}>${text}</button>`;}
function updateShell(){updateLanguage();root.dataset.view=view;root.dataset.level=level.id;root.dataset.state=won()?'success':paused?'paused':'playing';root.dataset.positions=state.positions.join(',');root.dataset.moves=String(moves);
 document.querySelector('#page-title')!.textContent=view==='play'?level.title[lang]:'Two Ways Home';
 document.querySelector('#page-kicker')!.textContent=view==='play'?`${district()} · ${String(number()).padStart(2,'0')} / 21`:t('ふたりの帰り道','A shared journey home');
 const tools=document.querySelector<HTMLElement>('#top-tools')!;tools.innerHTML=`${view==='play'?button('levels',t('帰り道','Journeys')):''}${button('settings',t('設定','Settings'))}`;
}
function render(){updateShell();hud.innerHTML='';menu.innerHTML='';document.querySelector('#status-text')!.textContent=statusText();
 if(view==='title')renderTitle();else if(view==='select')renderSelect();else renderPlay();
 input.refresh();world.setActive(!paused);world.resize();syncMetrics();
}
function renderTitle(){menu.innerHTML=`<section class="title-card"><span class="eyebrow">TINLUMO ORIGINAL</span><h1>Two Ways<br><em>Home</em></h1><p class="title-ja">${t('ふたりの帰り道','Different paths. One shared journey.')}</p><p>${t('違う道を歩くふたりに、ひとつの合図。<br>同じ夕暮れに、いっしょに帰ろう。','One direction. Two little lives.<br>Find your way home, together.')}</p><div class="title-actions">${button('continue',t('帰り道をつづける','Continue the journey'),'class="primary"')}${button('levels',t('21の帰り道','Choose a journey'))}</div><div class="title-foot">${t('矢印・スワイプで、ふたりが一歩。','Arrow keys or a swipe move both friends.')}<br><span>${progress.cleared.length} / 21 ${t('帰宅済み','journeys completed')}</span></div></section>`;
}
function renderSelect(){menu.innerHTML=`<section class="journey-sheet"><div class="sheet-head"><div><span class="eyebrow">${t('帰り道のアルバム','THE JOURNEY ALBUM')}</span><h2>${t('21の小さな待ち合わせ','Twenty-one ways home')}</h2></div>${button('title',t('タイトル','Title'))}</div><p class="muted">${t('どの帰り道からでも遊べます。○と◇、同じ合図で一歩ずつ。','Every journey is open. Circle and diamond, one shared step at a time.')}</p>${[0,1,2].map(ch=>`<div class="chapter"><h3><span>0${ch+1}</span>${[['運河のほとり','Canal Promenade'],['夕暮れの小路','Evening Lanes'],['灯りの待つ家','The Lights of Home']][ch]![en()?1:0]}</h3><div class="level-grid">${homeLevels.slice(ch*7,ch*7+7).map((l,i)=>`<button data-action="level:${l.id}" class="level-card ${progress.cleared.includes(l.id)?'completed':''}" aria-label="${l.id} · ${escape(l.title[lang])}"><span class="level-number">${String(ch*7+i+1).padStart(2,'0')}</span><span>${escape(l.title[lang])}</span><small>${progress.cleared.includes(l.id)?t('帰宅済み ✓','Home ✓'):l.id===progress.levelId?t('つづきから','In progress'):t('出かける','Begin')}</small></button>`).join('')}</div></div>`).join('')}</section>`;
}
function renderPlay(){
 root.dataset.result=won()&&arrival.visible?'visible':'hidden';
 const a=state.positions[0]===level.homes[0],b=state.positions[1]===level.homes[1];
 hud.innerHTML=`<div class="journey-hud"><span class="friend-status coral ${a?'at-home':''}"><b>○</b>${a?t('おかえり','Home'):blocked[0]?t('ここで待つ','Waiting'):t('帰り道','On the way')}</span><span class="shared-step">${t('ひとつの合図、ふたりの一歩','One signal. Two steps.')}<small>${moves} ${t('歩',moves===1?'step':'steps')}</small></span><span class="friend-status blue ${b?'at-home':''}"><b>◇</b>${b?t('おかえり','Home'):blocked[1]?t('ここで待つ','Waiting'):t('帰り道','On the way')}</span></div>
 <div class="board-access"><div class="board swipe-left" data-swipe-board="0" role="group" aria-label="${t('○の庭。スワイプでふたりが移動','Circle courtyard. Swipe to move both friends')}"></div><div class="board swipe-right" data-swipe-board="1" role="group" aria-label="${t('◇の庭。スワイプでふたりが移動','Diamond courtyard. Swipe to move both friends')}"></div></div>
 <div class="play-bottom"><div class="play-note"><p id="feedback" role="status" aria-live="polite">${escape(displayCopy(feedback()))}</p>${hint?`<p class="hint-text">${escape(displayCopy(level.hints?.[hint-1]?.[lang]??''))}</p>`:''}</div><div class="controls"><div class="small-controls">${button('undo',`↶ <span>${t('もどす','Undo')}</span>`,undo.length?'':'disabled')}${button('retry',`↻ <span>${t('出直す','Retry')}</span>`)}${button('hint',`? <span>${t('ヒント','Hint')}</span>`)}</div><div class="dpad" role="group" aria-label="${t('ふたりの移動','Move both friends')}">${[0,3,2,1].map(d=>button(`move:${d}`,['↑','→','↓','←'][d]!,`class="direction d${d}" aria-label="${[t('上','Up'),t('右','Right'),t('下','Down'),t('左','Left')][d]}" ${won()?'disabled':''}`)).join('')}</div><div class="side-controls">${button('pause',`Ⅱ <span>${t('一時停止','Pause')}</span>`)}</div></div></div>`;
 if(won()&&arrival.visible){menu.innerHTML=`<section class="result-card" role="status"><span class="result-mark">○<span>⌂</span>◇</span><span class="eyebrow">${progress.cleared.length===21?t('21の帰り道を完了','ALL TWENTY-ONE JOURNEYS'):t('ふたり、いっしょに','TOGETHER, AT LAST')}</span><h2>${t('おかえり。','Welcome home.')}</h2><p>${t('違う道から、同じあたたかさへ。','Different paths. The same warm welcome.')}</p><div class="result-actions">${number()<21?button('next',t('次の帰り道','Next journey'),'class="primary"'):button('levels',t('帰り道のアルバム','Journey album'),'class="primary"')}${button('view-world',t('景色を眺める','Enjoy the view'))}${button('undo',t('一歩もどす','Undo one step'),undo.length?'':'disabled')}</div></section>`;}
}
function enter(next:HomeLevel,resume=false){cancel();level=next;state=resume?structuredClone(progress.board) as HomeState:initialBoard(level) as HomeState;undo=[];moves=0;hint=0;paused=false;blocked=[false,false];lastMessage='';arrival.reset();view='play';world.setLevel(level,state,reduced());if(!resume)persist();render();scrollTop();root.focus({preventScroll:true});}
function move(d:Dir,event?:Event){if(!canMove())return;if(event)audio.unlock(event);const before=structuredClone(state),res=moveHome(level,state,d);cancel(false);state=res.state;blocked=res.blocked;
 if(res.changed){undo.push(before);moves++;}const firstComplete=!progress.cleared.includes(level.id)&&progress.cleared.length===20;
 if(res.won&&!progress.cleared.includes(level.id))progress={...progress,cleared:[...progress.cleared,level.id]};
 lastMessage=res.won?'won':res.blocked.every(Boolean)?'blocked':res.blocked[0]?'circle':res.blocked[1]?'diamond':'step';
 const plan=twCraftPlan(level,before,state,d,firstComplete);persist();world.transition(plan,reduced());audio.schedule(plan.sounds,performance.now());
 // Result appearance is presentation only; state/save are committed immediately and new input never waits for animation.
 if(res.won)arrival.start(reduced()?0:210);
 render();root.focus({preventScroll:true});
}
function openSettings(){cancel();paused=true;world.setActive(false);dialog.innerHTML=`<form method="dialog"><div class="dialog-title"><h2>${t('ふたりの設定','Your settings')}</h2><button aria-label="${t('閉じる','Close')}">×</button></div><label class="check"><input id="reduce" type="checkbox" ${progress.settings.reducedMotion?'checked':''}> ${t('動きを控えめにする','Reduce motion')}</label><label class="check"><input id="mute" type="checkbox" ${audio.preferences.mute?'checked':''}> ${t('効果音を消音','Mute sound effects')}</label><label for="volume">${t('効果音の音量','Effects volume')} <output id="volume-value">${Math.round(audio.preferences.gain*100)}%</output></label><input id="volume" type="range" min="0" max="100" step="5" value="${Math.round(audio.preferences.gain*100)}"><p class="muted">${t('Two Ways専用SFX。BGMなし。','Two Ways sound effects. No music.')}</p><p id="audio-status" role="status">${audio.storageFailed?t('音設定はこの回だけ反映します。','Sound settings apply only to this visit.'):audio.available?t('音は操作後に始まります。','Sound starts after an input.'):t('音声を利用できません。プレイは続けられます。','Audio is unavailable. You can keep playing.')}</p><p class="save-detail">${escape(statusText())}</p><details><summary>${t('保存を管理','Manage save')}</summary><p>${t('この作品の進行だけを消去します。消去前に確認します。','Only this game’s progress is removed, after confirmation.')}</p>${button('reset-request',t('進行を消去…','Reset progress…'),'class="danger"')}</details><button class="primary close-settings">${t('ゲームへ戻る','Back to the game')}</button></form>`;dialog.showModal();
 dialog.querySelector<HTMLInputElement>('#reduce')!.onchange=e=>{progress.settings.reducedMotion=(e.target as HTMLInputElement).checked;persist();world.sync(state,reduced());};
 const setAudio=()=>{audio.set({mute:dialog.querySelector<HTMLInputElement>('#mute')!.checked,gain:Number(dialog.querySelector<HTMLInputElement>('#volume')!.value)/100});dialog.querySelector('#volume-value')!.textContent=`${Math.round(audio.preferences.gain*100)}%`;dialog.querySelector('#audio-status')!.textContent=audio.storageFailed?t('音設定はこの回だけ反映します。','Sound settings apply only to this visit.'):t('設定を保存しました。','Settings saved.');};dialog.querySelector<HTMLInputElement>('#mute')!.onchange=setAudio;dialog.querySelector<HTMLInputElement>('#volume')!.oninput=setAudio;
}
function pause(){if(view!=='play')return;cancel();paused=true;world.setActive(false);dialog.innerHTML=`<form method="dialog"><span class="eyebrow">${t('ひとやすみ','A LITTLE PAUSE')}</span><h2>${t('帰り道は、ここから。','Your journey waits here.')}</h2><p>${t('ふたりの位置をそのまま保っています。','Both friends are right where you left them.')}</p><button class="primary">${t('つづける','Continue')}</button>${button('levels',t('帰り道を選ぶ','Choose a journey'))}</form>`;dialog.showModal();}
function action(action:string,event?:Event){
 if(action.startsWith('move:'))return move(Number(action.slice(5)) as Dir,event);
 if(action.startsWith('level:'))return enter(homeLevels.find(l=>l.id===action.slice(6))!);
 if(action==='settings')return openSettings();
 if(action==='pause')return pause();
 if(action==='continue')return enter(homeLevels.find(l=>l.id===progress.levelId)!,true);
 if(action==='next'){const next=homeLevels[number()];if(next)enter(next);return;}
 if(action==='view-world'){arrival.dismiss();render();return;}
 if(action==='undo'){if(view!=='play'||!undo.length)return;if(event)audio.unlock(event);cancel(false);state=undo.pop()!;moves=Math.max(0,moves-1);arrival.reset();blocked=[false,false];lastMessage='undo';persist();world.sync(state,reduced());audio.schedule([{id:'undo',at:0,targets:[]}],performance.now());render();root.focus({preventScroll:true});return;}
 if(action==='retry'){if(view!=='play')return;cancel();state=initialBoard(level) as HomeState;undo=[];moves=0;arrival.reset();blocked=[false,false];lastMessage='retry';persist();world.sync(state,reduced());render();root.focus({preventScroll:true});return;}
 if(action==='hint'){hint=hint>=2?0:hint+1;render();return;}
 if(action==='levels'||action==='title'){cancel();if(dialog.open)dialog.close();paused=false;view=action==='levels'?'select':'title';render();scrollTop();return;}
 if(action==='reset-request'){dialog.innerHTML=`<form method="dialog"><h2>${t('進行を消去しますか？','Reset this journey?')}</h2><p>${t('Two Ways Homeの全クリア記録と途中の位置を消去します。他作品と音設定は残ります。','All Two Ways Home completion and saved positions will be removed. Other games and sound settings remain.')}</p><button>${t('やめる','Cancel')}</button>${button('reset-confirm',t('進行を消去する','Reset progress'),'class="danger"')}</form>`;return;}
 if(action==='reset-confirm'){if(save.reset()){const fresh=save.load();progress=fresh.data;level=homeLevels[0]!;state=progress.board as HomeState;saveStatus='empty';undo=[];moves=0;view='title';world.setLevel(level,state,reduced());dialog.close();render();}else{dialog.querySelector('p')!.textContent=t('消去できませんでした。元の保存はそのままです。','Reset failed. The original save remains.');}return;}
 if(action==='capture'){const output=document.querySelector<HTMLElement>('#capture-result')!;output.innerHTML='';const image=new Image();image.alt='Actual game canvas, current state';image.src=world.capture();output.append(image);return;}
 if(action==='record'){
  if(recorder?.state==='recording')return;if(!('MediaRecorder' in window)){document.querySelector('#record-status')!.textContent='Recording unavailable in this browser';return;}const stream=world.renderer.domElement.captureStream(60);recorded=[];const mime=MediaRecorder.isTypeSupported('video/webm;codecs=vp9')?'video/webm;codecs=vp9':'video/webm';recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:6500000});recorder.ondataavailable=e=>{if(e.data.size)recorded.push(e.data);};recorder.onstop=()=>{const reader=new FileReader();reader.onload=()=>{const video=document.createElement('video');video.controls=true;video.src=String(reader.result);video.id='recorded-video';const out=document.querySelector('#record-result')!;out.replaceChildren(video);document.querySelector('#record-status')!.textContent='Ready: real canvas recording / no audio track';};reader.readAsDataURL(new Blob(recorded,{type:mime}));stream.getTracks().forEach(t=>t.stop());};recorder.start(200);document.querySelector('#record-status')!.textContent='Recording real canvas / no audio track';return;
 }
 if(action==='stop-record'){if(recorder?.state==='recording')recorder.stop();document.querySelector('#record-status')!.textContent='Recording stopped';return;}
}
let input:ReturnType<typeof directInput>;
input=directInput(root,canMove,d=>move(d as Dir));
root.addEventListener('click',event=>{const target=(event.target as Element).closest<HTMLButtonElement>('button[data-action]');if(target&&!target.disabled)action(target.dataset.action!,event);});
dialog.addEventListener('click',event=>{const target=(event.target as Element).closest<HTMLButtonElement>('button[data-action]');if(target){event.preventDefault();action(target.dataset.action!,event);}});
dialog.addEventListener('close',()=>{paused=false;world.setActive(true);world.sync(state,reduced());render();root.focus({preventScroll:true});});
new MutationObserver(()=>syncMetrics()).observe(dialog,{attributes:true,attributeFilter:['open']});
dialog.addEventListener('input',()=>syncMetrics());dialog.addEventListener('change',()=>syncMetrics());
document.querySelector('#language')!.addEventListener('click',()=>{cancel();lang=lang==='ja'?'en':'ja';const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);render();});
root.addEventListener('pointerdown',e=>{if(canMove())audio.unlock(e);},{capture:true});
root.addEventListener('keydown',e=>{if(e.repeat||e.altKey||e.ctrlKey||e.metaKey||dialog.open||e.target instanceof HTMLInputElement)return;const dirs:Record<string,Dir>={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3,w:0,d:1,s:2,a:3,W:0,D:1,S:2,A:3};if(e.key in dirs&&canMove()){e.preventDefault();move(dirs[e.key]!,e);}else if(e.key==='Escape'&&view==='play'){e.preventDefault();pause();}else if((e.key==='z'||e.key==='Z')&&view==='play'){e.preventDefault();action('undo',e);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancel();world.setActive(false);if(view==='play'&&!dialog.open)pause();}else if(!paused)world.setActive(true);});
window.addEventListener('pagehide',()=>{cancel();world.setActive(false);});
window.addEventListener('resize',()=>{cancel(false);world.sync(state,reduced());});
motionMedia.addEventListener('change',()=>{cancel(false);world.sync(state,reduced());});
if(params.has('capture')){const capture=document.createElement('section');capture.id='capture-tools';capture.innerHTML=`<button data-action="capture">Capture actual canvas</button><button data-action="record">Record real play</button><button data-action="stop-record">Stop recording</button><span id="record-status"></span><div id="capture-result"></div><div id="record-result"></div><details><summary>Local diagnostic readings</summary><pre id="render-metrics"></pre></details>`;root.append(capture);canvasHost.addEventListener('render-stats',event=>syncMetrics((event as CustomEvent).detail));}
world.setLevel(level,state,reduced());render();
