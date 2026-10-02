import {createStore} from './common/store.js';
import {AudioBank} from './common/audio.js';
import {bindInput} from './common/input.js';
import {clamp} from './common/math.js';
import {unlockThenStart} from './common/async-start.js';
import {createGame,meta,CAMPAIGN_ID} from './product/kiln-game.js';
const $=id=>document.getElementById(id),canvas=$('board'),ctx=canvas.getContext('2d',{alpha:false}),overlay=$('overlay');
let storage;try{storage=localStorage;}catch{storage={getItem(){throw Error('denied');}};}
const store=createStore(storage),audio=new AudioBank();
const lang=()=>store.state.language,settings=()=>store.state,l=(ja,en)=>lang()==='ja'?ja:en,localized=x=>x?.[lang()]||'';
let started=false,paused=false,result=false,interlude=false,last=0,elapsed=0,raf=0,report={status:'idle'},startGeneration=0,startPending=false,action='new',runId='',lastAnnouncement='';
const current='ember-glaze';
/* LOCAL_CAPTURE_ONLY_BEGIN */
let recording=null,recordUrl=null,recordEpoch=0,pageLeaving=false,recordUploads=new Set();
/* LOCAL_CAPTURE_ONLY_END */
function saveNotice(){const labels={
 'external-reset':l('別のタブで保存が消去されました。再読み込みすると新しい記録で始めます。','The save was reset in another tab. Reload to use the new save.'),
 'checkpoint-conflict':l('別のタブの制作が進んでいます。このプレイで保存を上書きしていません。','Another tab has a different commission. This play has not overwritten it.'),
 ready:l('このブラウザーに、器の区切りで保存します。','Progress saves in this browser between vessels.'),saved:l('記録を保存しました。中断すると今の器は初めから再開します。','Progress saved. An interrupted vessel restarts from its beginning.'),
 'corrupt-preserved':l('保存データを読み込めません。元のデータは保全し、今回のプレイは保存しません。設定から書き出せます。','The existing save is unreadable and preserved. This play is not saved. Export the original in settings.'),
 unavailable:l('保存を利用できません。このセッションだけ遊べます。','Storage is unavailable. You can play this session.'),
 'write-failed':l('保存に失敗しました。この画面の進捗はまだ保存されていません。','Save failed. Progress on this screen has not been stored.')};$('save-status').textContent=labels[store.status]||labels['write-failed'];}
function patch(p){store.update(p);audio.settings(store.state.muted,store.state.volume);document.body.classList.toggle('reduce',store.state.reducedMotion);document.body.classList.toggle('contrast',store.state.highContrast);saveNotice();}
function checkpointAvailable(){return store.state.resume?.mode===CAMPAIGN_ID;}
function present(kind,eyebrow,title,tagline,detail,button,nextAction){overlay.dataset.kind=kind;overlay.hidden=false;$('eyebrow').textContent=eyebrow;$('title').textContent=title;$('tagline').textContent=tagline;$('overlay-detail').textContent=detail;$('start').textContent=button;$('secondary').hidden=true;action=nextAction;}
function showIntro(){const cp=checkpointAvailable()?store.state.resume:null,best=store.state.bests[CAMPAIGN_ID];present('intro','EMBER & GLAZE',localized(meta.name),localized(meta.hook),l('「くべる」を長押し。離しても余熱は続きます。\n通気を右へ動かすほど冷えます。\n次の温度帯を先読みし、仕上げ可能で仕上げ。\n三つの器、約6〜8分。','Hold STOKE to feed the fire.\nEmbers heat after you release.\nSlide VENT right to cool more.\nRead the next band. FINISH when ready.\nThree vessels · 6–8 minutes.')+(cp?'\n'+l(`${cp.stage+1}個目の器の初めから再開します。`,`Resume at the beginning of vessel ${cp.stage+1}.`):'')+(best?'\n'+l(`自己ベスト ${best} / 300`,`Best ${best} / 300`):''),cp?l('制作をつづける','Continue commission'):l('窯に火を入れる','Light the kiln'),cp?'saved':'new');if(cp){$('secondary').hidden=false;$('secondary').textContent=l('三つとも初めから作る','Start a new commission');}}
function showPause(){present('pause','PAUSED',l('火も、時間もひと休み。','Let the fire rest.'),l('入力・時間・効果音は停止しています。','Input, time and sound are paused.'),'',l('つづける','Resume'),'resume');}
function showInterlude(){const q=report.qualities.at(-1);present('interlude',l('焼き上がり','FIRED'),report.profileName,l(`仕上がり ${q} / 100`,`Finish ${q} / 100`),l('棚に一つ。次の器は、次の温度帯を早めに見てみましょう。','One on the shelf. Look ahead to the next band on your next vessel.'),l('次の器へ','Next vessel'),'advance');}
function showResult(){if(report.status==='won'){const score=report.value,challenge=score<255?l('255点で、光をまとう仕上がりへ。','Reach 255 for a luminous finish.'):l('次は三つの品質を、さらに磨く。','Refine each of the three finishes.');present('result',l('三つの器、完成','COMMISSION COMPLETE'),l('あなたの火、あなたの釉。','Your fire. Your finish.'),l(`${score} / 300 · ${score>=255?'光をまとう仕上がり':score>=225?'艶やかな仕上がり':'温かみのある仕上がり'}`,`${score} / 300 · ${score>=255?'Luminous finish':score>=225?'Glossy finish':'Warm finish'}`),l('三つの品質 ','Three finishes ')+report.qualities.join(' / ')+'\n'+challenge,l('もう一窯、磨いてみる','Fire another commission'),'new');}else present('lost',l('焼き直し','TRY AGAIN'),l('火の加減を、もう一度。','Try a different fire.'),report.reason,l('完成した器は棚に残っています。今の器だけ焼き直します。','Finished vessels stay on the shelf. Retry this vessel.'),l('この器を焼き直す','Retry this vessel'),'retry');}
function translate(){document.documentElement.lang=lang();document.title=localized(meta.name)+' | Tinlumo';$('language').textContent=lang()==='ja'?'EN':'日本語';$('pause').textContent=paused?l('つづける','Resume'):l('一時停止','Pause');$('settings-open').ariaLabel=l('設定','Settings');$('settings-title').textContent=l('設定','Settings');$('settings-close').ariaLabel=l('閉じる','Close');$('control-label').textContent=l('操作','CONTROLS');$('goal-label').textContent=l('目標','OBJECTIVE');$('sound-label').textContent=l('効果音を消す','Mute sound');$('volume-label').textContent=l('音量','Volume');$('motion-label').textContent=l('動きを控える','Reduced motion');$('contrast-label').textContent=l('高コントラスト','High contrast');$('backup-save').textContent=l('保存データを書き出す','Export save');$('reset-open').textContent=l('保存を消去','Reset save');$('reset-title').textContent=l('保存データを消去しますか？','Reset this game’s save?');$('reset-description').textContent=l('このゲームの記録と設定を消去します。先に書き出して保管できます。','This removes this game’s progress and settings. Export a backup first.');$('reset-cancel').textContent=l('戻る','Cancel');$('reset-confirm').textContent=l('消去する','Reset');$('storage-description').textContent=l('器の区切り・自己ベスト・設定をブラウザーに保存します。中断した器は初めから再開します。アカウントは不要です。','Chapter checkpoints, bests and settings stay in this browser. An interrupted vessel restarts. No account needed.');$('footer-copy').textContent=l('オリジナルゲーム · アカウント不要 · ブラウザー内保存','Original game · No account · Local save');$('side-title').textContent=localized(meta.name);$('side-hook').textContent=localized(meta.hook);$('controls').textContent=localized(meta.controls);$('goal').textContent=localized(meta.goal);$('hint').textContent=localized(meta.hint);$('role').textContent=localized(meta.role);canvas.ariaLabel=localized(meta.name)+' '+localized(meta.controls);canvas.setAttribute('aria-describedby','goal hud-detail');
 /* LOCAL_CAPTURE_ONLY_BEGIN */ $('record').textContent=recording?l('録画を止める','Stop recording'):l('20秒を録画','Record 20 seconds');$('record-download').textContent=l('録画を保存','Save recording'); /* LOCAL_CAPTURE_ONLY_END */
 if(!started)showIntro();else if(paused)showPause();else if(interlude)showInterlude();else if(result)showResult();saveNotice();}
function onReport(next){report=next;if(next.status==='idle'){lastAnnouncement='';$('pause').disabled=true;$('announcer').textContent=next.profileName+' · '+next.phaseName;}else if(next.status==='running'){const notice=lang()+'-'+next.stage+'-'+next.phaseId+'-'+next.finishReady;if(notice!==lastAnnouncement){lastAnnouncement=notice;$('announcer').textContent=next.finishReady?l('仕上げられます。仕上げを押してください。','Ready to finish. Press FINISH.'):next.profileName+' · '+next.phaseName;}}$('chapter').textContent=l(`器 ${next.stage+1} / 3 · ${next.profileName}`,`VESSEL ${next.stage+1} / 3 · ${next.profileName}`);$('hud-label').textContent=next.status==='won'?l('合計','TOTAL'):l('仕上がり','FINISH');$('hud-value').textContent=String(next.value??0);$('hud-detail').textContent=next.detail||'';$('progress-fill').style.width=clamp((next.progress?.value??0)/3,0,1)*100+'%';
 if(next.status==='interlude'&&!interlude){interlude=true;input.cancel();$('pause').disabled=true;store.checkpointCampaign({...next.checkpoint,stage:next.stage+1,qualities:next.qualities});saveNotice();showInterlude();$('announcer').textContent=next.profileName+' '+next.reason;$('start').focus({preventScroll:true});}
 if(['won','lost'].includes(next.status)&&!result){result=true;input.cancel();$('pause').disabled=true;if(next.status==='won'){store.completeCampaign({runId,score:next.value});saveNotice();}showResult();$('announcer').textContent=next.reason;$('start').focus({preventScroll:true});}}
const game=createGame({ctx,audio,settings,lang,onReport});
async function start(){const token=++startGeneration,intent=action;startPending=true;await unlockThenStart(audio,{isCurrent:()=>token===startGeneration,onBlocked:()=>{if(token!==startGeneration)return;startPending=false;saveNotice();},start:()=>{startPending=false;input.cancel();paused=false;result=false;interlude=false;started=true;last=0;overlay.hidden=true;$('pause').disabled=false;$('pause').textContent=l('一時停止','Pause');
 if(intent==='resume'){}else if(intent==='advance'){game.advance();}else if(intent==='retry'){game.retry();}else if(intent==='saved'&&checkpointAvailable()){const cp=store.state.resume;runId=cp.runId;elapsed=0;game.reset(cp);}else{runId=globalThis.crypto?.randomUUID?.()||`run-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;const cp={mode:CAMPAIGN_ID,campaignVersion:1,stage:0,seed:9,runId,qualities:[]};store.startCampaign({seed:9,runId});saveNotice();elapsed=0;game.reset(cp);}canvas.focus({preventScroll:true});}});}
function pause(){input.cancel();if(startPending){startGeneration++;startPending=false;audio.pause();return;}if(!started||result||interlude||paused)return;paused=true;audio.pause();showPause();$('pause').textContent=l('つづける','Resume');}
const playable=()=>started&&!paused&&!result&&!interlude;
const input=bindInput(canvas,{down:p=>{if(playable())game.pointer('down',p);},move:(p,held)=>{if(playable())game.pointer('move',{...p,held});},up:p=>{if(playable())game.pointer('up',p);},cancel:()=>game.cancel(),key:k=>{if(k==='Escape'){pause();return;}if(playable())game.key(k);},keyUp:k=>{if(playable())game.keyUp(k);}});
function frame(time){if(!last)last=time;const dt=Math.min(.05,Math.max(0,(time-last)/1000));last=time;if(playable()){elapsed+=dt;game.step(dt);}game.render(settings().reducedMotion?elapsed:time/1000);raf=requestAnimationFrame(frame);}
$('start').addEventListener('click',start);$('secondary').addEventListener('click',()=>{action='new';start();});$('pause').addEventListener('click',()=>paused?start():pause());$('language').addEventListener('click',()=>{patch({language:lang()==='ja'?'en':'ja'});$('announcer').textContent=l('日本語に切り替えました。','Switched to English.');game.refresh();translate();});
$('settings-open').addEventListener('click',()=>{pause();$('muted').checked=store.state.muted;$('volume').value=store.state.volume*100;$('reduced').checked=store.state.reducedMotion;$('contrast').checked=store.state.highContrast;$('settings').showModal();});
for(const [id,key,convert]of [['muted','muted',e=>e.checked],['volume','volume',e=>Number(e.value)/100],['reduced','reducedMotion',e=>e.checked],['contrast','highContrast',e=>e.checked]])$(id).addEventListener('input',()=>patch({[key]:convert($(id))}));
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
$('backup-save').addEventListener('click',()=>{const raw=store.backup();if(raw!==null)download(new Blob([raw],{type:'application/json'}),'game009-save-backup.json');});
$('reset-open').addEventListener('click',()=>$('reset-dialog').showModal());$('reset-cancel').addEventListener('click',()=>$('reset-dialog').close());$('reset-confirm').addEventListener('click',()=>{if(!store.reset()){saveNotice();$('reset-description').textContent=l('保存の消去に失敗しました。データを消去したとは表示しません。','Reset failed. The save has not been removed.');return;}startGeneration++;startPending=false;input.cancel();audio.pause();audio.settings(store.state.muted,store.state.volume);$('reset-dialog').close();$('settings').close();started=false;paused=false;result=false;interlude=false;game.dispose();game.preview({});translate();});
/* LOCAL_CAPTURE_ONLY_BEGIN */
function releaseCapture(capture){
 if(capture.timer!==null){clearTimeout(capture.timer);capture.timer=null;}
 capture.uploadController?.abort();
 for(const track of capture.stream?.getTracks()||[])track.stop();
 if(recording===capture)recording=null;
}
function stopCapture(capture,discard=false){
 if(!capture)return;
 if(discard)capture.discard=true;
 if(capture.discard)capture.uploadController?.abort();
 if(capture.timer!==null){clearTimeout(capture.timer);capture.timer=null;}
 if(capture.recorder?.state==='recording'){
  try{capture.recorder.stop();}catch{capture.discard=true;releaseCapture(capture);translate();}
 }else if(!capture.recorder){releaseCapture(capture);translate();}
}
/* LOCAL_CAPTURE_ONLY_END */
document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();/* LOCAL_CAPTURE_ONLY_BEGIN */if(recording)stopCapture(recording);/* LOCAL_CAPTURE_ONLY_END */}});
window.addEventListener('blur',()=>{pause();});

window.addEventListener('pagehide',event=>{
 /* LOCAL_CAPTURE_ONLY_BEGIN */
 pageLeaving=true;
 /* LOCAL_CAPTURE_ONLY_END */
 pause();cancelAnimationFrame(raf);
 /* LOCAL_CAPTURE_ONLY_BEGIN */
 if(recording)stopCapture(recording,true);
 for(const controller of recordUploads)controller.abort();
 if(recordUrl){URL.revokeObjectURL(recordUrl);recordUrl=null;}
 $('record-download').hidden=true;$('record-download').removeAttribute('href');
 /* LOCAL_CAPTURE_ONLY_END */
 if(!event.persisted){input.dispose();audio.dispose();}
});
window.addEventListener('pageshow',event=>{if(event.persisted){/* LOCAL_CAPTURE_ONLY_BEGIN */pageLeaving=false;/* LOCAL_CAPTURE_ONLY_END */last=0;raf=requestAnimationFrame(frame);}});
/* LOCAL_CAPTURE_ONLY_BEGIN */
$('record').addEventListener('click',async()=>{
 if(recording){stopCapture(recording);return;}
 if(!globalThis.MediaRecorder||!canvas.captureStream){$('announcer').textContent=l('この環境では録画できません。','Recording is unavailable in this browser.');return;}
 const capture={epoch:++recordEpoch,discard:false,stream:null,recorder:null,chunks:[],timer:null,uploadController:null};
 recording=capture;translate();
 try{
  await audio.unlock();
  if(capture.discard||pageLeaving||recording!==capture)return;
  capture.stream=canvas.captureStream(30);
  for(const track of audio.stream?.stream.getAudioTracks()||[])capture.stream.addTrack(track.clone());
  const types=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];
  const type=types.find(x=>MediaRecorder.isTypeSupported(x));
  capture.recorder=new MediaRecorder(capture.stream,type?{mimeType:type,videoBitsPerSecond:3500000}:{});
  const recorder=capture.recorder;
  recorder.ondataavailable=e=>{if(e.data.size)capture.chunks.push(e.data);};
  recorder.onstop=async()=>{
   if(capture.timer!==null){clearTimeout(capture.timer);capture.timer=null;}
   for(const track of capture.stream?.getTracks()||[])track.stop();
   if(recording===capture)recording=null;
   if(capture.discard||pageLeaving||capture.epoch!==recordEpoch){translate();return;}
   if(recordUrl)URL.revokeObjectURL(recordUrl);
   recordUrl=URL.createObjectURL(new Blob(capture.chunks,{type:recorder.mimeType}));
   $('record-download').href=recordUrl;
   $('record-download').download='game009-'+current+'-'+Date.now()+'.webm';
   $('record-download').hidden=false;
   if(review&&!pageLeaving){
    const controller=new AbortController();capture.uploadController=controller;recordUploads.add(controller);
    try{
     const blob=new Blob(capture.chunks,{type:recorder.mimeType});
     const response=await fetch('/__review/'+current+'-clip-'+Date.now()+'.webm',{method:'POST',body:blob,signal:controller.signal});
     if(!response.ok)throw Error('capture');
    }catch(e){if(!controller.signal.aborted)console.error('Review recording save failed');}
    finally{recordUploads.delete(controller);if(capture.uploadController===controller)capture.uploadController=null;}
   }
   translate();
  };
  recorder.start();
  capture.timer=setTimeout(()=>stopCapture(capture),20000);
  translate();
 }catch(e){
  capture.discard=true;
  if(capture.timer!==null){clearTimeout(capture.timer);capture.timer=null;}
  capture.uploadController?.abort();
  if(capture.recorder?.state==='recording'){try{capture.recorder.stop();}catch{}}
  for(const track of capture.stream?.getTracks()||[])track.stop();
  if(recording===capture)recording=null;
  $('announcer').textContent=l('録画を開始できませんでした。','Recording could not start.');
  translate();console.error('Recording failed',e);
 }
});
/* LOCAL_CAPTURE_ONLY_END */
/* LOCAL_CAPTURE_ONLY_BEGIN */
const review=new URLSearchParams(location.search).has('review');$('research-link').hidden=!review;document.querySelector('.review-tools').hidden=!review;
if(review){const b=document.createElement('button');b.type='button';b.textContent='Save frame';b.addEventListener('click',()=>{canvas.toBlob(async blob=>{if(!blob)return;try{const name=`${current}-frame-${Date.now()}.png`;const r=await fetch(`/__review/${name}`,{method:'POST',body:blob});if(!r.ok)throw Error('capture');b.textContent='Frame saved';}catch{b.textContent='Frame save failed';}},'image/png');});document.querySelector('.review-tools').append(b);}
/* LOCAL_CAPTURE_ONLY_END */
patch({});game.preview(checkpointAvailable()?store.state.resume:{});translate();game.render(0);raf=requestAnimationFrame(frame);









