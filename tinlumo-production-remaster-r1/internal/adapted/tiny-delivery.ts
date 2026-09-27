import {deliveryLevelsR2} from '../../src/prototypes/delivery-levels-r2';
import {startDelivery,tickDelivery,deliveryWaitCells,type DeliveryLevel,type DeliveryEdit,type DeliveryRun} from '../../src/prototypes/delivery-r2';
import {initialBoard,createPrototypeSave,type Progress} from '../../src/prototypes/state';
import {directInput} from '../../src/prototypes/direct-input';
import {createCraftAudio} from '../../src/prototypes/craft-audio';
import {createMusicAudio} from '../../src/prototypes/music-audio';
import {GroveWorld} from './world';
import {renderJourney,nextDelivery} from './journey';

type Language='ja'|'en';type Screen='title'|'levels'|'play';
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
const params=new URLSearchParams(location.search);if(!params.has('lang'))params.set('lang',/^\/en\//.test(location.pathname)?'en':/^\/ja\//.test(location.pathname)?'ja':document.documentElement.lang);let lang:Language=params.get('lang')==='en'?'en':'ja';
let screen:Screen='title',level=deliveryLevelsR2.find(l=>l.id==='D03')!,edit=initialBoard(level) as DeliveryEdit,run:DeliveryRun|undefined,paused=false,timer:ReturnType<typeof setInterval>|undefined,epoch=0,hint=0;
const save=createPrototypeSave('tiny-delivery',()=>localStorage),loaded=save.load();let progress:Progress=loaded.data,hasProgress=loaded.status==='ok',saveProblem=loaded.status==='invalid'||loaded.status==='unavailable';
const sfx=createCraftAudio();const music=createMusicAudio('D1',()=>screen==='play'&&!paused&&!document.hidden&&!sfx.preferences.mute&&(!$<HTMLDialogElement>('settings').open)&&(!run||run.status==='running'));
const text=(ja:string,en:string)=>lang==='ja'?ja:en;
let world:GroveWorld,journeyCompletedNow=false;
try{world=new GroveWorld($('world'),false);}catch(error){$('unsupported').hidden=false;$('unsupported').textContent='3D描画を開始できませんでした。WebGL 2が使えるブラウザーで開いてください。 / WebGL 2 could not start. Please use a compatible browser.';throw error;}
world.setReducedMotion(progress.settings.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches);world.setLevel(level,edit);world.setScreen(screen);
const input=directInput($('controls'),()=>screen==='play'&&!run&&!$<HTMLDialogElement>('settings').open,()=>{});
function persist(captureBoard=true){if(captureBoard){progress={...progress,levelId:level.id,levelVersion:level.version,board:structuredClone(edit)};hasProgress=true;}saveProblem=!save.write(progress);updateSave();}
function updateSave(){$('title-save').textContent=saveProblem?text('この訪問中のプレイです。保存は利用できません。','Playing for this visit. Saving is unavailable.'):hasProgress?text(`このブラウザーに保存済み · ${progress.levelId}`,`Saved in this browser · ${progress.levelId}`):text('このブラウザーに自動保存します。','Your journey saves in this browser.');$('title-progress').textContent=text(`${progress.cleared.length} / 18 の配達を完了`,`${progress.cleared.length} / 18 deliveries complete`);$('save-warning').hidden=!saveProblem;$('save-warning').textContent=text('この環境では保存できません。現在のプレイは続けられます。元の保存データは保持します。','Saving is unavailable here. You can keep playing; existing save data is preserved.');}
function stop(){epoch++;clearInterval(timer);timer=undefined;input.cancel();sfx.cancel();music.halt(true);world.cancelMotion();if(run&&run.status!=='running'){$('result').dataset.interruptedPending=String(!$('result').classList.contains('visible'));$('result').classList.add('visible');}}
function suspend(){if(run?.status==='running')paused=true;stop();renderHud();}
function makeControls(){
 $('controls').replaceChildren();world.anchors.forEach(a=>{const b=document.createElement('button');b.type='button';b.className='cell-control '+a.kind;b.dataset.kind=a.kind;b.dataset.index=String(a.index);b.dataset.cell=String(a.cell);b.addEventListener('click',e=>{if(!input.acceptClick(e,b)||run)return;sfx.unlock(e);void music.start(e);if(a.kind==='arrow'){const dirs=level.allowedDirections?.[a.index]??[0,1,2,3];edit.arrows[a.index]=dirs[(dirs.indexOf(edit.arrows[a.index]!)+1)%dirs.length]!;sfx.play('arrow');}else{if(level.waitCells)edit.waits![a.index]=(edit.waits![a.index]!+1)%((level.maxWait??2)+1);else edit.wait=((edit.wait+1)%3) as 0|1|2;sfx.play('wait');}world.setEdit(edit);persist();renderControls();b.classList.remove('changed');requestAnimationFrame(()=>b.classList.add('changed'));});$('controls').append(b);});
 world.onProject(anchors=>{for(const a of anchors){const b=$('controls').querySelector<HTMLElement>(`[data-kind="${a.kind}"][data-index="${a.index}"]`)!;if(b){b.style.left=a.x+'px';b.style.top=a.y+'px';}}});renderControls();input.refresh();
}
function renderControls(){for(const b of $('controls').querySelectorAll<HTMLButtonElement>('button')){const index=+b.dataset.index!,cell=+b.dataset.cell!;b.disabled=!!run;const loc=text(`${Math.floor(cell/level.size)+1}行${cell%level.size+1}列`,`row ${Math.floor(cell/level.size)+1}, column ${cell%level.size+1}`);if(b.dataset.kind==='wait'){const value=edit.waits?.[index]??edit.wait;b.textContent=String(value);b.setAttribute('aria-label',text(`待機 ${index+1}：${value}拍。${loc}。タップで変更`,`Wait ${index+1}: ${value} beats. ${loc}. Tap to change`));b.dataset.value=String(value);}else{const d=edit.arrows[index]!;b.textContent='';b.setAttribute('aria-label',text(`矢印 ${index+1}：${['北','東','南','西'][d]}。${loc}。タップで変更`,`Arrow ${index+1}: ${['North','East','South','West'][d]}. ${loc}. Tap to turn`));b.dataset.direction=String(d);}}}
function select(id:string,event?:Event){stop();level=deliveryLevelsR2.find(l=>l.id===id)!;if(!level)throw Error('Unknown canonical stage');edit=progress.levelId===id?structuredClone(progress.board) as DeliveryEdit:initialBoard(level) as DeliveryEdit;run=undefined;paused=false;hint=0;journeyCompletedNow=false;$('game').dataset.settled='false';world.setLevel(level,edit);world.setReducedMotion(progress.settings.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches);makeControls();setScreen('play');persist();if(event){sfx.unlock(event);void music.start(event);}}
function updateJourney(){
 $('progress-count').textContent=text(`${progress.cleared.length} / 18 面 お届け完了`,`${progress.cleared.length} / 18 deliveries complete`);
 $('journey-progress').style.setProperty('--complete',String(progress.cleared.length/18));
 $('journey-resume').textContent=text('つづきから · '+progress.levelId,'Continue · '+progress.levelId);
 $('journey-resume').hidden=!hasProgress;
 renderJourney($('journey'),progress,lang,select);
}
function setScreen(next:Screen){screen=next;document.body.dataset.screen=screen;world.setScreen(screen);$('title').hidden=screen!=='title';$('levels').hidden=screen!=='levels';$('play-ui').hidden=screen!=='play';$('controls').hidden=screen!=='play';$('game').dataset.screen=screen;$('continue').hidden=!hasProgress;renderHud();if(screen==='levels')updateJourney();}

function resetRun(event?:Event){stop();run=undefined;paused=false;journeyCompletedNow=false;world.setRun();renderControls();renderHud();if(event){sfx.unlock(event);sfx.play('undo');void music.start(event);}}
function tick(){if(!run||run.status!=='running')return;const before=run;run=tickDelivery(level,edit,run);world.setRun(run);renderHud();const token=epoch;const arrivals=run.bots.filter((b,i)=>b.delivered&&!before.bots[i]!.delivered).length;
 if(run.status!=='running'){clearInterval(timer);timer=undefined;music.halt();if(run.status==='won'){const previousCount=progress.cleared.length;if(!progress.cleared.includes(level.id))progress.cleared.push(level.id);journeyCompletedNow=previousCount<18&&progress.cleared.length===18;persist();renderHud();}setTimeout(()=>{if(epoch!==token)return;sfx.play(run?.status==='won'?(journeyCompletedNow?'complete':'clear'):'collision');$('result').classList.add('visible');},progress.settings.reducedMotion||media.matches?0:180);}else if(arrivals)setTimeout(()=>{if(epoch===token){sfx.play('arrive');music.duck();}},progress.settings.reducedMotion||media.matches?0:180);
}
function dispatch(event:Event){sfx.unlock(event);if(!run){input.cancel();run=startDelivery(level);world.setRun(run);paused=false;sfx.play('start');}else if(run.status!=='running')return;else if(!paused){suspend();return;}else paused=false;void music.start(event);clearInterval(timer);timer=setInterval(tick,600);renderControls();renderHud();}
function renderHud(){
 $('game').dataset.stage=level.id;$('game').dataset.run=run?.status??'editing';$('game').dataset.tick=String(run?.tick??0);$('game').dataset.paused=String(paused);
 $('stage-id').textContent=`${level.id} / 18`;$('stage-name').textContent=level.title[lang];$('lesson').textContent=level.lesson[lang];
 $('status').textContent=run?run.status==='won'?text('お届け完了','Delivered'):run.status==='failed'?text('道を見直そう','Let’s try another route'):paused?text('一時停止','Paused'):text('配達中','Delivering'):text('矢印と時計をタップして、出発。','Set the arrows and clocks. Then go.');
 $('tick').textContent=run?text(`${run.tick} 拍`,`${run.tick} beats`):text('ルートを準備','Plan your route');
 $('delivery-count').innerHTML=level.robots.map((r,i)=>`<span class="parcel ${i?'teal':'coral'} ${run?.bots[i]?.delivered?'delivered':''}">${r.id}<small>${run?.bots[i]?.delivered?'✓':'◇'}</small></span>`).join('');
 const go=$<HTMLButtonElement>('go');go.textContent=run?.status==='running'?(paused?text('▶ 続ける','▶ Resume'):text('Ⅱ 一時停止','Ⅱ Pause')):text('▶ 出発','▶ Go');go.disabled=!!run&&run.status!=='running';
 $('step').hidden=!run||run.status!=='running'||!paused;$('edit-route').hidden=!run;$('reset').hidden=!!run;
 $('result').hidden=!run||run.status==='running';if(!run||run.status==='running')$('result').classList.remove('visible');
 if(run?.status==='failed'){
  const reasons:Record<string,[string,string]>={wall:['道のない場所へ進もうとしました。','A courier tried to leave the road.'],boundary:['道の外へ進もうとしました。','A courier tried to leave the island.'],'wrong-goal':['別の受取口へ向かっています。','That depot belongs to the other courier.'],collision:['同じマスに、ふたりが来てしまいました。','Both couriers need the same cell.'],swap:['同じ道ですれ違うことはできません。','The couriers cannot swap places on one beat.'],loop:['同じ道を回っています。','The route keeps repeating.'],limit:['道が長く続きすぎています。','The route is taking too long.']};
  const titles:Record<string,[string,string]>={wall:['道をつなぎ直そう','Keep to the path'],boundary:['道をつなぎ直そう','Keep to the path'],'wrong-goal':['受取口を確かめよう','Check the delivery address'],swap:['すれ違う道を見直そう','Make room to pass'],loop:['別の道を探そう','Find another way'],limit:['道を短くつなごう','Try a shorter route'],collision:['ここで道が重なりました','Let’s check the route']};
  $('result-kicker').textContent=text('もう一度、ゆっくり考えよう','A little rethink');$('result-title').textContent=titles[run.reason??'collision']![lang==='ja'?0:1];$('result-copy').textContent=reasons[run.reason??'collision']![lang==='ja'?0:1];$('next').hidden=true;
 }else if(run?.status==='won'){$('result-kicker').textContent='SPECIAL DELIVERY';$('result-title').textContent=journeyCompletedNow?text('18の配達、ありがとう。','Every parcel has found a home.'):level.robots.length===1?text('荷物が、届いた！','A little parcel. Delivered!'):text('ふたりとも、届いた！','Two little parcels. Delivered!');$('result-copy').textContent=text('ひとつ譲って、ひとつ進む。いい配達でした。','A little patience. A lovely delivery.');$('next').hidden=false;$('next').textContent=level.id!=='D18'?text('次の配達へ →','Next delivery →'):text('配達を選ぶ →','Choose a delivery →');}
 $('accessible-state').textContent=(run?.bots??startDelivery(level).bots).map(b=>`${b.id}: ${text('マス','cell')} ${b.p}, ${b.delivered?text('到着','delivered'):b.remaining?text(`あと${b.remaining}拍待機`,`waiting ${b.remaining} beats`):text('走行可能','ready')}`).join(' / ');
 $('hint-copy').textContent=hint?(level.hints?.[hint-1]?.[lang]??''):'';updateSave();
}
function localize(){document.documentElement.lang=lang;document.querySelectorAll<HTMLElement>('[data-ja]').forEach(e=>e.textContent=e.dataset[lang]??'');$('language').textContent=lang==='ja'?'EN':'JA';$('language').setAttribute('aria-label',lang==='ja'?'Switch to English':'日本語に切替');if(true){const cover=['a','b','c'].includes(params.get('cover')??'')?params.get('cover')!:'a';for(const a of document.querySelectorAll<HTMLAnchorElement>('a[href="/"],a[data-portal-back],.brand')){a.href=`/${lang}/games/tiny-delivery/`;a.dataset.portalBack='true';a.setAttribute('aria-label','Tinlumo');if(a.closest('.game-footer'))a.textContent=text('Tinlumoへ','Back to Tinlumo');}}renderControls();renderHud();if(screen==='levels')updateJourney();}
document.addEventListener('keydown',e=>{if(e.repeat&&['Enter',' '].includes(e.key))e.preventDefault();if(e.key==='Escape'&&screen==='play'&&!$<HTMLDialogElement>('settings').open)suspend();});
$('start').addEventListener('click',e=>{stop();setScreen('levels');sfx.unlock(e);});
$('continue').hidden=!hasProgress;$('continue').addEventListener('click',e=>select(progress.levelId,e));
$('journey-resume').addEventListener('click',e=>select(progress.levelId,e));$('journey-next').addEventListener('click',e=>select(nextDelivery(progress),e));
$('back-title').addEventListener('click',()=>{stop();setScreen('title');});$('back').addEventListener('click',()=>{stop();setScreen('levels');});
$('go').addEventListener('click',dispatch);$('step').addEventListener('click',e=>{if(run?.status==='running'&&paused){sfx.unlock(e);tick();}});
$('edit-route').addEventListener('click',resetRun);$('retry').addEventListener('click',resetRun);
$('next').addEventListener('click',e=>{const next=deliveryLevelsR2[deliveryLevelsR2.indexOf(level)+1];if(next)select(next.id,e);else{stop();setScreen('levels');}});$('result-levels').addEventListener('click',()=>{stop();setScreen('levels');});
$('hint').addEventListener('click',()=>{hint=hint%2+1;renderHud();});
$('reset').addEventListener('click',()=>{suspend();$<HTMLDialogElement>('confirm-reset').showModal();});$('cancel-reset').addEventListener('click',()=>$<HTMLDialogElement>('confirm-reset').close());$('confirm-initial').addEventListener('click',e=>{$<HTMLDialogElement>('confirm-reset').close();edit=initialBoard(level) as DeliveryEdit;world.setEdit(edit);persist();resetRun(e);});
function openSettings(){suspend();$<HTMLInputElement>('mute').checked=sfx.preferences.mute;$<HTMLInputElement>('sfx-gain').value=String(sfx.preferences.gain);$<HTMLInputElement>('music-enabled').checked=music.preferences.enabled;$<HTMLInputElement>('music-gain').value=String(music.preferences.gain);$<HTMLInputElement>('reduce').checked=progress.settings.reducedMotion;$<HTMLDialogElement>('settings').showModal();}
$('settings-button').addEventListener('click',openSettings);$('title-settings').addEventListener('click',openSettings);
$('close-settings').addEventListener('click',()=>$<HTMLDialogElement>('settings').close());
$('mute').addEventListener('change',e=>{sfx.set({mute:$<HTMLInputElement>('mute').checked,gain:sfx.preferences.gain});music.halt(true);if(!sfx.preferences.mute)sfx.unlock(e);});
$('sfx-gain').addEventListener('input',()=>sfx.set({mute:sfx.preferences.mute,gain:+$<HTMLInputElement>('sfx-gain').value}));
$('music-enabled').addEventListener('change',()=>music.set({...music.preferences,enabled:$<HTMLInputElement>('music-enabled').checked,direction:'D1'}));
$('music-gain').addEventListener('input',()=>music.set({...music.preferences,gain:+$<HTMLInputElement>('music-gain').value,direction:'D1'}));
$('reduce').addEventListener('change',()=>{progress.settings.reducedMotion=$<HTMLInputElement>('reduce').checked;world.setReducedMotion(progress.settings.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches);persist(false);});
$('language').addEventListener('click',()=>{lang=lang==='ja'?'en':'ja';const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);localize();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();});window.addEventListener('pagehide',suspend);window.addEventListener('blur',suspend);
window.addEventListener('pageshow',event=>{document.body.dataset.restored=event.persisted?'bfcache':'navigation';});
let dimensions=innerWidth+':'+innerHeight;window.addEventListener('resize',()=>{const d=innerWidth+':'+innerHeight;if(d!==dimensions){dimensions=d;suspend();}});
const media=matchMedia('(prefers-reduced-motion: reduce)');media.addEventListener('change',()=>{suspend();world.setReducedMotion(progress.settings.reducedMotion||media.matches);});
makeControls();localize();setScreen('title');document.body.dataset.reduce=String(progress.settings.reducedMotion||media.matches);
const waits=document.createElement('div');waits.className='wait-feedback';waits.setAttribute('aria-hidden','true');$('game').append(waits);const badges:HTMLElement[]=[];
world.onCourierState(states=>{if(badges.length!==states.length){waits.replaceChildren();badges.length=0;for(const v of states){const b=document.createElement('span');waits.append(b);badges.push(b);}}states.forEach((v,i)=>{const b=badges[i]!;b.hidden=screen!=='play'||!v.waiting;if(b.hidden)return;const value=`${v.id} · ◷ ${v.remaining}`;if(b.textContent!==value)b.textContent=value;const left=v.x+'px',top=v.y+'px';if(b.style.left!==left)b.style.left=left;if(b.style.top!==top)b.style.top=top;});});
const audioNotice=document.createElement('p');audioNotice.className='settings-note';$('settings').append(audioNotice);setInterval(()=>{audioNotice.hidden=!sfx.storageFailed&&!music.storageFailed;audioNotice.textContent=text('音設定を保存できません。この画面内の変更は有効です。','Sound settings could not be saved. Changes still apply to this visit.');},1000);
document.addEventListener('pointerdown',e=>{if(screen==='play')sfx.unlock(e);},true);
document.addEventListener('keydown',e=>{if(screen==='play'&&!e.repeat)sfx.unlock(e);},true);
$('reduce').addEventListener('change',()=>{document.body.dataset.reduce=String(progress.settings.reducedMotion||media.matches);});media.addEventListener('change',()=>{document.body.dataset.reduce=String(progress.settings.reducedMotion||media.matches);});
if(false){
 const bar=document.createElement('aside');bar.className='capture-bar';const button=document.createElement('button');button.textContent='Record scene';bar.append(button);document.body.append(bar);
 const exportButton=document.createElement('button');exportButton.textContent='Export actual scene';bar.append(exportButton);const sceneData=document.createElement('output');sceneData.id='scene-data';sceneData.hidden=true;document.body.append(sceneData);exportButton.addEventListener('click',()=>{sceneData.textContent=world.renderer.domElement.toDataURL('image/png');});
 let recorder:MediaRecorder|undefined;const chunks:Blob[]=[];const output=document.createElement('output');output.id='recording-data';output.hidden=true;document.body.append(output);
 button.addEventListener('click',()=>{if(recorder?.state==='recording'){recorder.stop();button.textContent='Encoding…';return;}chunks.length=0;output.textContent='';const stream=world.renderer.domElement.captureStream(30);recorder=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:4500000});recorder.ondataavailable=e=>chunks.push(e.data);recorder.onstop=()=>{stream.getTracks().forEach(t=>t.stop());const reader=new FileReader();reader.onload=()=>{output.textContent=String(reader.result);button.textContent='Recorded · scene only';};reader.readAsDataURL(new Blob(chunks,{type:'video/webm'}));};recorder.start();button.textContent='Stop recording';});
}

requestAnimationFrame(()=>{ $('loading').hidden=true;document.body.dataset.ready='true'; });

// Restore from the current save when returning to a cached document after an explicit reset.
let parkedSave:string|null|undefined;window.addEventListener('pagehide',()=>{try{parkedSave=localStorage.getItem('wgs:save:tiny-delivery');}catch{parkedSave=undefined;}});window.addEventListener('pageshow',event=>{if(event.persisted&&parkedSave!==undefined){try{if(localStorage.getItem('wgs:save:tiny-delivery')!==parkedSave)location.reload();}catch{location.reload();}}});window.addEventListener('storage',event=>{if((event.key==='wgs:save:tiny-delivery'&&event.newValue===null)||event.key===null)location.reload();});

const recover=document.createElement('a');recover.href='/'+lang+'/settings/#hakorilo-save';recover.textContent=text('保存の設定・進行の消去','Save settings / erase progress');recover.style.cssText='display:inline-flex;min-height:44px;align-items:center;text-decoration:underline;font-size:12px';$('settings').append(recover);$('language').addEventListener('click',()=>{recover.href='/'+lang+'/settings/#hakorilo-save';recover.textContent=text('保存の設定・進行の消去','Save settings / erase progress');});
