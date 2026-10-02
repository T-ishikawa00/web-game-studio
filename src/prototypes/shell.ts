import {isCaptureLayout} from './controls';
import { isGameId } from './levels';
import { createPrototypeSave, emptyProgress, type Progress } from './state';
import { trustedEnvelope, validGameMessage, PROTOCOL } from './protocol';
import { createAdAdapter } from '../lib/ads';
import { createAnalytics, type EventName } from '../lib/analytics';
const shell=document.querySelector<HTMLElement>('#prototype-shell');
if(shell && isGameId(shell.dataset.game)) {
  const id=shell.dataset.game, en=shell.dataset.locale==='en', locale=en?'en':'ja';
  const text=(ja:string,enText:string)=>en?enText:ja;
  const get=<T extends HTMLElement>(id:string)=>document.getElementById(id) as T;
  const stage=get('prototype-stage'), status=get('prototype-save-status'), loading=get('prototype-loading'), error=get('prototype-error');
  const reset=get<HTMLDialogElement>('prototype-reset-dialog'), ad=get<HTMLDialogElement>('prototype-ad-dialog');
  let saves=createPrototypeSave(id,()=>localStorage);const ads=createAdAdapter(()=>sessionStorage), analytics=createAnalytics();
  let frame:HTMLIFrameElement|undefined, generation='', data:Progress=emptyProgress(id), ready=false, lastInput=0, first=false;
  let timeout:ReturnType<typeof setTimeout>, hidden=document.hidden;
  const emit=(name:EventName,result?:string)=>analytics.emit({name,gameId:id,locale,result});
  const paused=()=>hidden||ad.open||reset.open;
  function send(type:string,extra:Record<string,unknown>={}) {frame?.contentWindow?.postMessage({protocol:PROTOCOL,gameId:id,generation,type,...extra},location.origin);}
  function syncPause(){send('pause',{paused:paused()});}
  function saveStatus(ok:boolean, invalid=false) {status.dataset.state=ok?'ok':'error';status.textContent=ok?text('このブラウザに保存済み','Saved in this browser'):invalid?text('保存データを読み込めません。一時モードです。元データは保持しています。','Save not recognized. Temporary mode; original data is preserved.'):text('保存できません。一時モードで遊べます。','Cannot save. You can keep playing in temporary mode.');}
  function fail(){clearTimeout(timeout);if(ad.open){ads.complete('interstitial',false);ad.close();}if(reset.open)reset.close();ready=false;frame?.remove();frame=undefined;loading.hidden=true;error.hidden=false;emit('game_load_error','load-failed');}
  function load(){
    clearTimeout(timeout);frame?.remove();ready=false;first=false;generation=crypto.randomUUID();
    const loaded=saves.load();data=loaded.data;
    if(loaded.status==='empty'){status.dataset.state='ok';status.textContent=text('進行はこのブラウザに保存します','Progress saves in this browser');}else saveStatus(loaded.status==='ok',loaded.status==='invalid');
    loading.hidden=false;error.hidden=true;emit('game_load_start');
    const url=new URL(shell!.dataset.build!,location.origin);url.searchParams.set('generation',generation);url.searchParams.set('lang',locale);const requestedLayout=new URLSearchParams(location.search).get('layout');if(isCaptureLayout(requestedLayout))url.searchParams.set('layout',requestedLayout);
    frame=document.createElement('iframe');frame.title=shell!.dataset.title!;frame.src=url.href;frame.referrerPolicy='no-referrer';
    frame.addEventListener('error',fail,{once:true});stage.append(frame);timeout=setTimeout(fail,8000);
  }
  window.addEventListener('message',event=>{
    if(!trustedEnvelope(event,frame?.contentWindow??null,location.origin,id,generation)||!validGameMessage(id,event.data))return;
    const m=event.data;
    if(m.type==='ready'&&!ready){clearTimeout(timeout);ready=true;loading.hidden=true;send('init',{data,paused:paused()});emit('game_load_success');return;}
    if(!ready)return;
    if(m.type==='error'){fail();return;}
    if(m.type==='resize'){if(frame)frame.style.height=`${m.height}px`;return;}
    if(paused())return;
    if(m.type==='first-input'){lastInput=Date.now();if(!first){first=true;emit('first_input');}return;}
    if(m.type==='checkpoint'){
      const next=m.data as Progress;
      for(const level of next.cleared)if(!data.cleared.includes(level)){emit('stage_complete',level);emit('meaningful_progress',level);}
      data=next;lastInput=Date.now();const ok=saves.write(data);saveStatus(ok);emit('save_result',ok?'persisted':'failed');
    }
  });
  get('prototype-reload').addEventListener('click',load);
  get('prototype-reset-save').addEventListener('click',()=>{if(ready){reset.showModal();syncPause();}});
  function closeReset(){reset.close();syncPause();}
  get('prototype-cancel-reset').addEventListener('click',closeReset);
  reset.addEventListener('cancel',event=>{event.preventDefault();closeReset();});
  get('prototype-confirm-reset').addEventListener('click',()=>{const ok=saves.reset();if(ok){saves=createPrototypeSave(id,()=>localStorage);load();}saveStatus(ok);closeReset();});
  get('prototype-mock').addEventListener('click',()=>{if(!ready)return;const decision=ads.request('mock',lastInput);get('prototype-ad-status').textContent=decision;if(decision==='show-mock'){ad.showModal();syncPause();}});
  function finishAd(){ads.complete('interstitial',false);ad.close();syncPause();emit('ad_resume','no-reward');}
  get('prototype-finish-ad').addEventListener('click',finishAd);ad.addEventListener('cancel',e=>{e.preventDefault();finishAd();});
  get('prototype-fail').addEventListener('click',fail);
  document.addEventListener('visibilitychange',()=>{hidden=document.hidden;syncPause();});
  window.addEventListener('pagehide',()=>{hidden=true;clearTimeout(timeout);syncPause();});
  window.addEventListener('pageshow',()=>{hidden=document.hidden;syncPause();});
  Object.defineProperty(window,'__prototypeEvents',{value:()=>analytics.snapshot(),configurable:true});
  load();
}
