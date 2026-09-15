import {createMusicAudio,type Direction} from './music-audio';
// This entry is injected only by the isolated pilot server, never the accepted build.
const query=new URLSearchParams(parent.location.search),condition=query.get('music');
if(new URLSearchParams(location.search).get('game')==='tiny-delivery'&&['C','D1','D2'].includes(condition??'')){
 type State={progress?:{levelId:string};run?:{status:string};outerPaused:boolean;localPaused:boolean;layout:string};
 const qa=window as unknown as {__prototypeState:()=>State;__craftState:()=>{audio:{preferences:{mute:boolean;gain:number};counts:{byEvent:Record<string,number>}}}};
 const en=document.documentElement.lang==='en',t=(ja:string,eng:string)=>en?eng:ja;let inactive=false,lastLevel='',lastLayout='',lastRun='',arrivals=0,queued=false;
 const blocked=()=>{const s=qa.__prototypeState?.();return !s?.progress||inactive||document.hidden||s.outerPaused||s.localPaused||!!document.querySelector('dialog[open]')||s.run?.status==='won'||s.run?.status==='failed'||qa.__craftState().audio.preferences.mute;};
 const music=createMusicAudio(condition as Direction,()=>!blocked());
 Object.defineProperty(window,'__musicState',{value:()=>({...music.snapshot(),condition,blocked:blocked(),visibilityVerification:'Actual browser state unless explicitly overridden by QA'})});
 function settings(){
  const host=document.querySelector('.audio-settings');if(!host||host.parentElement?.querySelector('#music-settings'))return;
  const field=document.createElement('fieldset');field.id='music-settings';field.style.cssText='display:grid;gap:8px';field.innerHTML=`<legend>${t('音楽 — 比較候補','Music — comparison candidate')}</legend><label class="check-setting"><input id="music-enabled" type="checkbox">${t('BGMを使う','Music on')}</label><label for="music-direction">${t('曲の方向','Direction')}</label><select id="music-direction"><option value="D1">D1 · Toy Electronic</option><option value="D2">D2 · Calm Workshop</option></select><label for="music-gain">${t('BGM音量','Music volume')} <output id="music-value"></output></label><input id="music-gain" type="range" min="0" max="50" step="1" style="width:100%;min-height:32px"><small>${t('上の消音は効果音とBGMの両方に適用。効果音の音量は独立です。','Mute above applies to SFX and music. SFX volume is independent.')}</small><p id="music-status" role="status"></p>`;host.after(field);
  const on=field.querySelector<HTMLInputElement>('#music-enabled')!,track=field.querySelector<HTMLSelectElement>('#music-direction')!,gain=field.querySelector<HTMLInputElement>('#music-gain')!,status=field.querySelector('#music-status')!,value=field.querySelector('output')!;
  const pref=music.preferences;on.checked=pref.enabled;track.value=pref.direction;gain.value=String(Math.round(pref.gain*100));
  const show=()=>{value.textContent=gain.value+'%';status.textContent=[music.storageFailed?t('音楽設定はこの回だけ反映します。保存できません。','Music preferences apply this visit; saving is unavailable.'):'',music.snapshot().available?t('閉じて盤面を操作すると再生します。','Close settings and interact with the board to play.'):t('BGMを再生できません。ゲームは続けられます。次の盤面操作で再試行します。','Music is unavailable. You can keep playing; the next board interaction retries.')].filter(Boolean).join(' ');};
  on.onchange=track.onchange=gain.oninput=()=>{music.set({version:1,enabled:on.checked,direction:track.value as 'D1'|'D2',gain:Number(gain.value)/100});show();};show();
  if(condition==='C'){on.disabled=true;track.disabled=true;gain.disabled=true;status.textContent=t('CはBGMなしの比較基準です。音楽はReviewのD1/D2から試せます。','C is the fixed no-music reference. Select D1/D2 in the Review to try music.');}
 }
 function sync(event?:Event){
  const s=qa.__prototypeState?.();if(!s?.progress)return;settings();
  const changed=(lastLevel&&lastLevel!==s.progress.levelId)||(lastLayout&&lastLayout!==s.layout)||(lastRun&&lastRun!==(s.run?.status??'')&&!s.run);
  lastLevel=s.progress.levelId;lastLayout=s.layout;lastRun=s.run?.status??'';
  const count=qa.__craftState().audio.counts.byEvent.arrive??0;if(count>arrivals)music.duck();arrivals=count;
  const state=music.snapshot();if(changed||blocked()){if(state.playing||state.pending)music.halt(document.hidden||inactive||s.outerPaused);return;}
  const button=event?.target instanceof Element?event.target.closest<HTMLButtonElement>('button'):null;
  if(event?.isTrusted&&button&&!button.disabled&&(['arrow','go','step','retry','restore','undo'].includes(button.dataset.action?.split(':')[0]??'')||button.dataset.waitValue!==undefined))void music.start(event);
 }
 new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(()=>{queued=false;sync();});}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open','data-layout']});
 for(const type of ['click','input','change','keydown'])document.addEventListener(type,e=>{if(type==='keydown'&&(e as KeyboardEvent).repeat)return;queueMicrotask(()=>sync(e));});
 document.addEventListener('visibilitychange',()=>{music.halt(document.hidden);sync();});
 window.addEventListener('pagehide',()=>{inactive=true;music.halt(true);});window.addEventListener('pageshow',()=>{inactive=false;sync();});
 window.addEventListener('blur',()=>music.halt(true));
 window.addEventListener('message',()=>queueMicrotask(()=>sync()));sync();
}
