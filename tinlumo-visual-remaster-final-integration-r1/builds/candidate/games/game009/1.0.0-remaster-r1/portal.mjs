import {growth} from '/assets/growth-client.js';
const iframe=document.getElementById('standalone-game');let dispose=()=>{};
function connect(){dispose();try{const doc=iframe.contentDocument;if(doc?.documentElement.dataset.game009Ready!=='true')return;
 const forward=e=>{const p=e.detail;if(!p||!['trial_start','first_meaningful_input','game_result'].includes(p.event_name))return;const detail={};if(['same','new'].includes(p.retry_kind))detail.retry_kind=p.retry_kind;if(['pointer','touch','keyboard'].includes(p.input_mode))detail.input_mode=p.input_mode;if(['stage_clear','failure'].includes(p.result_type))detail.result_type=p.result_type;try{growth.emit(p.event_name,detail);}catch{}};
 doc.addEventListener('tinlumo:game009:funnel',forward);
 const sync=()=>{const l=doc.documentElement.lang==='en'?'en':'ja';doc.querySelector('.brand').href='/'+l+'/games/';doc.querySelector('.brand').target='_top';};sync();doc.getElementById('language')?.addEventListener('click',sync);
 dispose=()=>{doc.removeEventListener('tinlumo:game009:funnel',forward);doc.getElementById('language')?.removeEventListener('click',sync);};try{growth.emit('game_ready');}catch{}
 }catch{/* Optional parent layer is isolated from gameplay. */}}
iframe.addEventListener('load',connect);if(iframe.contentDocument?.documentElement.dataset.game009Ready==='true')connect();addEventListener('pagehide',()=>dispose());addEventListener('pageshow',e=>{if(e.persisted)connect();});
