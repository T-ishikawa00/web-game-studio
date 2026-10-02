// Growth R1 production preparation. UI and receiver must both be explicitly enabled.
const consentKey='tinlumo:growth-consent:production-r1';
const campaigns=new Set(['hakorilo_pmg_en_01','hakorilo_x_c01_en_01','hakorilo_x_c02_en_01','rimbloom_direct_01']);
export function installGrowth(win,doc){
 const route=win.location.pathname,game=/\/play\/tiny-delivery\/$/.test(route)?'tiny-delivery':/\/play\/rimbloom\/$/.test(route)?'rimbloom':/\/play\/coilhop\/$/.test(route)?'coilhop':null;
 const loopback=win.location.hostname==='127.0.0.1'||(win.location.hostname==='tinlumo.com'&&win.location.protocol==='https:');
 if(!loopback||win!==win.top)return {emit(){}};
 const panel=doc.querySelector('[data-growth-consent]');if(!panel||panel.dataset.growthEnabled!=='true')return {emit(){}};
 let choice=false,ready=false,readyReported=false,reached=false,first=false,ordinal=0,active=0,ended=0,seq=0,token='',started=0,queue=[],sending=false,controller=null,epoch=0,timeout=null;
 const status=panel.querySelector('[data-growth-status]');
 const lang=()=>doc.documentElement.lang==='ja'?'ja':'en';
 const read=()=>{try{return win.localStorage.getItem(consentKey)==='allow';}catch{return false;}};
 const campaign=new URLSearchParams(win.location.search).get('campaign');
 const attribution=campaigns.has(campaign)&&((game==='tiny-delivery'&&lang()==='en'&&campaign.startsWith('hakorilo_'))||(game==='rimbloom'&&campaign==='rimbloom_direct_01'))?campaign:'direct';
 const show=()=>{status.textContent=choice?(lang()==='ja'?'ゲーム計測を許可しています':'Game measurement allowed'):(lang()==='ja'?'ゲーム計測はOFFです':'Game measurement is OFF');};
 function stop(){choice=false;epoch++;queue=[];controller?.abort();controller=null;clearTimeout(timeout);timeout=null;active=0;ended=0;show();}
 async function drain(){
  if(sending||!choice||!queue.length)return;sending=true;const batchEpoch=epoch,item=queue[0];
  try{
   for(let attempt=0;attempt<2&&choice&&epoch===batchEpoch;attempt++){
    controller=new win.AbortController();const timer=win.setTimeout(()=>controller?.abort(),2500);
    try{const response=await win.fetch('/__growth/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(item),credentials:'omit',referrerPolicy:'no-referrer',signal:controller.signal});if(response.ok)break;if(response.status<500)break;}
    catch{/* One bounded retry. A failed collector never blocks the game. */}
    finally{win.clearTimeout(timer);}
   }
  }finally{if(epoch===batchEpoch)queue.shift();sending=false;controller=null;if(choice&&queue.length)void drain();}
 }
 function send(event_name,detail={}){
  if(!choice||!game||!read())return;
  if(Date.now()-started>=30*60*1000||seq>=1000){stop();return;}
  if(queue.length>=32)return;
  const payload={schema:1,event_id:token+':'+(++seq),document_id:token,seq,game_id:game,release_version:'growth-r1-production-r1',language:lang(),input_mode:detail.input_mode??'none',campaign:lang()==='ja'&&attribution.startsWith('hakorilo_')?'direct':attribution,event_name,run_ordinal:active,stage:detail.stage??'none',result_type:detail.result_type??'none',retry_kind:detail.retry_kind??'none'};
  queue.push(payload);void drain();
 }
 function allow(){
  stop();if(!game){choice=read();show();return;}
  if(!read()||!win.crypto?.randomUUID)return;
  if(token&&Date.now()-started>=30*60*1000)return;
  choice=true;if(!token){token=win.crypto.randomUUID();started=Date.now();}show();if(!reached){send('game_reach');reached=true;}
  timeout=win.setTimeout(stop,Math.max(1,30*60*1000-(Date.now()-started)));
 }
 function select(value){
  if(value==='allow'&&choice&&read())return;
  stop();try{win.localStorage.setItem(consentKey,value);if(win.localStorage.getItem(consentKey)!==value)return;}catch{return;}
  if(value==='allow')allow();
 }
 for(const b of panel.querySelectorAll('[data-growth-choice]'))b.addEventListener('click',()=>select(b.dataset.growthChoice));
 win.addEventListener('storage',e=>{if(e.key===consentKey||e.key===null){if(!read())stop();}});
 win.addEventListener('pagehide',stop);
 win.addEventListener('pageshow',e=>{if(e.persisted){stop();if(read())allow();}});
 try{if(read()){win.localStorage.setItem(consentKey,'allow');if(read())allow();}}catch{stop();}show();
 return {emit(name,detail={}){
  if(name==='game_ready'){if(ready)return;ready=true;if(choice&&!readyReported){send(name);readyReported=true;}return;}
  if(!choice)return;
  if(name==='trial_start'){
   const previous=ended;ordinal++;active=ordinal;ended=0;send(name,detail);
   if(previous&&['same','new'].includes(detail.retry_kind))send('retry',detail);return;
  }
  if(name==='first_meaningful_input'){if(first)return;first=true;send(name,detail);return;}
  if(name==='game_result'){if(!active||ended===active)return;ended=active;send(name,detail);return;}
  if(name==='game_load_error')send(name,detail);
 }};
}
export const growth=typeof window==='undefined'?{emit(){}}:installGrowth(window,document);
