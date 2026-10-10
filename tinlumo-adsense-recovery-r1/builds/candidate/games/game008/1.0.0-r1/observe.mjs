// Observe only the accepted game's rendered state and trusted input kind.
// No coordinates, score, save value or historical action is recorded.
export function installCoilhopObserver(doc,emit,Observer=MutationObserver){
 const frame=doc.getElementById('gameFrame'),canvas=doc.getElementById('gameCanvas');
 if(!frame||!canvas||!frame.dataset.course)return ()=>{};
 let previous=frame.dataset.state,pad=frame.dataset.pad,course=frame.dataset.course,armed=null,restartIntent=false;
 const status=doc.getElementById('gameStatus');
 const mode=e=>{if(e.isTrusted&&e.code==='Escape'){armed=null;return;}if(!e.isTrusted||!e.defaultPrevented||armed||status?.dataset.state!=='charging'||e.type==='keydown'&&(e.code!=='Space'||e.repeat||![canvas,frame].includes(e.target)))return;armed={kind:e.type==='keydown'?'keyboard':e.pointerType==='touch'?'touch':'pointer',pointerId:e.type==='pointerdown'?e.pointerId:null};};
 const release=e=>{if(!e.isTrusted||!armed||e.type==='keyup'&&e.code!=='Space'||e.type==='pointerup'&&e.pointerId!==armed.pointerId||status?.dataset.state!=='flying')return;const origin=armed;armed=null;emit('first_meaningful_input',{input_mode:origin.kind});};
 const cancel=e=>{if(armed&&e.pointerId===armed.pointerId&&status?.dataset.state!=='flying')armed=null;};
 const clear=()=>{armed=null;};
 const intent=e=>{if(!e.isTrusted)return;if(e.target.closest?.('#pauseButton,#mapButton,#resetButton'))clear();if(e.target.closest?.('#courseList [data-course]:not(:disabled)'))restartIntent=true;};
 doc.addEventListener('visibilitychange',clear);doc.defaultView?.addEventListener('blur',clear);
 doc.addEventListener('click',intent,true);
 canvas.addEventListener('pointerdown',mode);doc.addEventListener('keydown',mode);canvas.addEventListener('pointerup',release);doc.addEventListener('keyup',release);canvas.addEventListener('pointercancel',cancel);canvas.addEventListener('lostpointercapture',cancel);
 const observer=new Observer(()=>{
  const state=frame.dataset.state,nextPad=frame.dataset.pad,nextCourse=frame.dataset.course;
  if(['paused','menu','failed','external-reset'].includes(state))armed=null;
  if(state===previous&&nextPad===pad&&nextCourse===course&&!restartIntent)return;
  if(state==='ready'&&(restartIntent||['menu','failed','course-clear','finale','external-reset'].includes(previous)||nextCourse!==course)){emit('trial_start',{retry_kind:['menu','external-reset'].includes(previous)||nextCourse!==course?'new':'same'});restartIntent=false;}
  if(['course-clear','finale'].includes(state)&&state!==previous)emit('game_result',{result_type:'stage_clear'});
  if(state==='failed'&&previous!=='failed')emit('game_result',{result_type:'failure'});
  previous=state;pad=nextPad;course=nextCourse;
 });
 observer.observe(frame,{attributes:true,attributeFilter:['data-state','data-pad','data-course']});
 emit('game_ready');
 return ()=>{observer.disconnect();canvas.removeEventListener('pointerdown',mode);doc.removeEventListener('keydown',mode);canvas.removeEventListener('pointerup',release);doc.removeEventListener('keyup',release);canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('lostpointercapture',cancel);doc.removeEventListener('click',intent,true);doc.removeEventListener('visibilitychange',clear);doc.defaultView?.removeEventListener('blur',clear);};
}
