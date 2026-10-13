import {getLayout,layoutPoint} from './product/remaster-layout.js';
// Local shell seam only. No save, score, temperature, seed, trail or persistent ID.
export function createKilnRelay(doc,canvas){
 let status='idle',previous='idle',stage=-1,inputKind='none';
 const emit=(event_name,detail={})=>{try{doc.dispatchEvent(new doc.defaultView.CustomEvent('tinlumo:game009:funnel',{detail:{event_name,...detail}}));}catch{/* Optional telemetry never interrupts the kiln. */}};
 canvas.addEventListener('pointerdown',e=>{inputKind=e.isTrusted?(e.pointerType==='touch'?'touch':'pointer'):'none';},true);
 canvas.addEventListener('keydown',e=>{inputKind=e.isTrusted?'keyboard':'none';},true);
 const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 return {
  report(next,nextStage){status=next;if(next!==previous||nextStage!==stage){if(['interlude','won'].includes(next))emit('game_result',{result_type:'stage_clear'});if(next==='lost')emit('game_result',{result_type:'failure'});previous=next;stage=nextStage;}doc.documentElement.dataset.game009Ready='true';},
  start(intent){if(intent!=='resume'&&status==='running')emit('trial_start',{retry_kind:intent==='retry'?'same':'new'});},
  pointer(p){const CONTROLS=getLayout(canvas).controls;p=layoutPoint(p,canvas);if(status==='running'&&inputKind!=='none'&&[CONTROLS.stoke,CONTROLS.vent,CONTROLS.finish].some(r=>inside(p,r)))emit('first_meaningful_input',{input_mode:inputKind});},
  key(k){if(status==='running'&&inputKind==='keyboard'&&[' ','space','spacebar','enter','arrowleft','arrowright','arrowup','arrowdown','f'].includes(k.toLowerCase()))emit('first_meaningful_input',{input_mode:'keyboard'});}
 };
}
