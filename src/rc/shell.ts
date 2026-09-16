import {isGameId} from '../prototypes/levels';
import {isCaptureLayout} from '../prototypes/controls';
import {createPrototypeSave,emptyProgress,type Progress} from '../prototypes/state';
import {trustedEnvelope,validGameMessage,PROTOCOL} from '../prototypes/protocol';
import {createAnalytics,type EventName} from '../lib/analytics';
const shell=document.querySelector<HTMLElement>('#rc-shell');
if(shell&&isGameId(shell.dataset.game)){
 const id=shell.dataset.game,locale=shell.dataset.locale==='en'?'en':'ja',t=(ja:string,en:string)=>locale==='ja'?ja:en;
 const get=<T extends HTMLElement>(id:string)=>document.getElementById(id) as T;
 const stage=get('rc-stage'),status=get('rc-save-status'),loading=get('rc-loading'),error=get('rc-error'),reset=get<HTMLDialogElement>('rc-reset-dialog');
 const saves=createPrototypeSave(id,()=>localStorage),events=createAnalytics();
 let frame:HTMLIFrameElement|undefined,generation='',data:Progress=emptyProgress(id),ready=false,first=false,hidden=document.hidden,timeout:ReturnType<typeof setTimeout>;
 const emit=(name:EventName,result?:string)=>events.emit({name,gameId:id,locale,result});
 const paused=()=>hidden||reset.open;
 function send(type:string,extra:Record<string,unknown>={}){frame?.contentWindow?.postMessage({protocol:PROTOCOL,gameId:id,generation,type,...extra},location.origin);}
 function syncPause(){send('pause',{paused:paused()});}
 function saveStatus(ok:boolean,invalid=false){status.dataset.state=ok?'ok':'error';status.textContent=ok?t('このブラウザに保存済み','Saved in this browser'):invalid?t('保存データを読み込めません。一時モードです。元データは保持しています。','Save not recognized. Temporary mode; original data is preserved.'):t('保存できません。一時モードで遊べます。','Cannot save. You can keep playing in temporary mode.');}
 function fail(){clearTimeout(timeout);if(reset.open)reset.close();send('pause',{paused:true});ready=false;frame?.remove();frame=undefined;loading.hidden=true;error.hidden=false;emit('game_load_error','load-failed');}
 function load(){
  clearTimeout(timeout);send('pause',{paused:true});frame?.remove();ready=false;first=false;generation=crypto.randomUUID();
  const loaded=saves.load();data=loaded.data;if(loaded.status==='empty'){status.dataset.state='ok';status.textContent=t('進行はこのブラウザに保存します','Progress saves in this browser');}else saveStatus(loaded.status==='ok',loaded.status==='invalid');
  loading.hidden=false;error.hidden=true;emit('game_load_start');
  const url=new URL(shell!.dataset.build!,location.origin);url.searchParams.set('generation',generation);url.searchParams.set('lang',locale);const layout=new URLSearchParams(location.search).get('layout');if(isCaptureLayout(layout))url.searchParams.set('layout',layout);
  frame=document.createElement('iframe');frame.title=shell!.dataset.title!;frame.src=url.href;frame.referrerPolicy='no-referrer';frame.addEventListener('error',fail,{once:true});stage.append(frame);timeout=setTimeout(fail,8000);
 }
 window.addEventListener('message',event=>{
  if(!trustedEnvelope(event,frame?.contentWindow??null,location.origin,id,generation)||!validGameMessage(id,event.data))return;
  const m=event.data;if(m.type==='ready'&&!ready){clearTimeout(timeout);ready=true;loading.hidden=true;send('init',{data,paused:paused()});emit('game_load_success');return;}if(!ready)return;
  if(m.type==='error'){fail();return;}if(m.type==='resize'){if(frame)frame.style.height=`${m.height}px`;return;}if(paused())return;
  if(m.type==='first-input'){if(!first){first=true;emit('first_input');}return;}
  if(m.type==='checkpoint'){const next=m.data as Progress;for(const level of next.cleared)if(!data.cleared.includes(level)){emit('stage_complete',level);emit('meaningful_progress',level);}if(next.cleared.length>data.cleared.length&&next.cleared.length===Number(shell!.dataset.count))emit('run_complete');data=next;const ok=saves.write(data);saveStatus(ok);emit('save_result',ok?'persisted':'failed');}
 });
 get('rc-reload').addEventListener('click',load);
 get('rc-reset-save').addEventListener('click',()=>{if(ready){reset.showModal();syncPause();}});
 function closeReset(){reset.close();syncPause();}
 get('rc-cancel-reset').addEventListener('click',closeReset);reset.addEventListener('cancel',e=>{e.preventDefault();closeReset();});
 get('rc-confirm-reset').addEventListener('click',()=>{const ok=saves.reset();if(ok){data=emptyProgress(id);send('init',{data,paused:true});}saveStatus(ok);closeReset();});
 document.addEventListener('visibilitychange',()=>{hidden=document.hidden;syncPause();});
 window.addEventListener('pagehide',()=>{hidden=true;clearTimeout(timeout);syncPause();});
 window.addEventListener('pageshow',()=>{hidden=document.hidden;syncPause();if(!ready)load();});
 load();
}
