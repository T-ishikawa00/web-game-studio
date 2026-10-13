import {getLayout,layoutPoint,ventValue} from './remaster-layout.js';
import {PROFILES,createFiring,feedFiring,setVent,stepFiring,finishFiring,describeFiring} from './kiln-model.js';
import {drawKiln} from './kiln-render.js';
import {clamp} from '../common/math.js';

export const CAMPAIGN_ID='ember-glaze-campaign-v1';
export const meta={
 name:{ja:'火種と釉',en:'EMBER & GLAZE'},
 hook:{ja:'火を足す。余熱を読む。三つの器に、あなたの仕上がりを。',en:'Feed the fire. Read the embers. Give three vessels your own finish.'},
 controls:{ja:'「くべる」を長押しで加熱。通気を右へ動かして冷却。仕上げ可能になったら「仕上げる」。キーボード：Space / Enterで火、← →で通気、Fで仕上げ。',en:'Hold STOKE to heat. Slide VENT right to cool. FINISH when ready. Keyboard: Space / Enter stoke, ← → vent, F finish.'},
 goal:{ja:'次の温度帯を先読みして、朝の椀・苔色の花瓶・宵の水差しを焼き上げる。約6〜8分。',en:'Anticipate the next temperature band and fire a bowl, vase and pitcher. About 6–8 minutes.'},
 hint:{ja:'火を止めても、火種はしばらく熱を出します。温度が上がりすぎる前に火を減らし、次の工程へ備えましょう。',en:'Embers keep heating after you stop stoking. Ease off before the temperature rises too far, and prepare for the next phase.'},
 role:{ja:'余熱を読む、三つの器の手仕事',en:'THREE VESSELS · ONE CAREFUL FIRING'},accent:'#efb976'
};
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const reasons={
 'overfire':{ja:'火を足しすぎて、窯が熱くなりすぎました。余熱を見て火を止めましょう。',en:'The kiln overheated. Watch the retained heat and stop stoking earlier.'},
 'cold-crack':{ja:'窯が冷えすぎました。通気を閉じ、早めに火を足しましょう。',en:'The kiln cooled too far. Close the vent and feed the fire earlier.'},
 'thermal-shock':{ja:'急な温度変化で器が傷みました。通気を少しずつ調整しましょう。',en:'A sudden temperature change damaged the vessel. Adjust the vent gradually.'},
 'underfired':{ja:'最後の温度が足りませんでした。次の帯へ早めに火を備えましょう。',en:'The final temperature was too low. Prepare the fire for the next band earlier.'},
 'overfired':{ja:'最後の温度が高すぎました。余熱が強いうちに通気を開いてみましょう。',en:'The final temperature was too high. Open the vent while the embers are still strong.'},
 'uneven-glaze':{ja:'温度帯から外れる時間が長く、釉が整いませんでした。次の帯を先読みしましょう。',en:'Too long outside the target band left the glaze uneven. Anticipate the next band.'},
 'missed-finish':{ja:'仕上げの時機を逃しました。仕上げ可能の表示を見て、仕上げを押しましょう。',en:'The finish window passed. Watch for FINISH READY and press FINISH.'},
 fuel:{ja:'燃料を使い切りました。余熱を使い、火を足す量を抑えてみましょう。',en:'Fuel ran out. Use the retained heat and feed smaller amounts.'},
 burn:{ja:'熱が強すぎました。火を早めに止め、通気を開いてみましょう。',en:'Too much heat. Stop feeding earlier and open the vent.'},
 shock:{ja:'急な冷却で仕上がりが傷みました。通気を少しずつ調整しましょう。',en:'Cooling damaged the finish. Adjust the vent in smaller steps.'},
 quality:{ja:'温度帯から外れる時間が長くなりました。次の帯を先読みしてみましょう。',en:'Too long outside the target band. Anticipate the next band.'},
 timeout:{ja:'仕上げの時機を逃しました。冷却の表示を見て、仕上げを押しましょう。',en:'The finish window passed. Watch cooling and press FINISH.'}
};

export function createGame({ctx,audio,settings,lang,onReport}){
 let state=createFiring(0,9),stageIndex=0,qualities=[],seed=9,runId='',mode='preview',stoking=false,activePointer=null,stokeTapFeedback=0,lastPhase=-1,lastReady=false,message='',reportClock=0,done=false;
 const heldKeys=new Set();
 const l=(ja,en)=>lang()==='ja'?ja:en;
 function cancel(){stoking=false;activePointer=null;stokeTapFeedback=0;heldKeys.clear();}
 function checkpoint(){const stage=mode==='interlude'?stageIndex+1:stageIndex;return {mode:CAMPAIGN_ID,campaignVersion:1,stage,seed,runId,qualities:qualities.slice(0,stage)};}
 function publish(force=false){
  if(!force&&reportClock<.12)return;reportClock=0;
  const d=describeFiring(state),phase=d.phase,profile=PROFILES[stageIndex];
  const next=d.nextPhase?l(`次 ${d.nextPhase.low}–${d.nextPhase.high}°まで${Math.ceil(d.secondsToNext)}秒`,`Next ${d.nextPhase.low}–${d.nextPhase.high}° in ${Math.ceil(d.secondsToNext)}s`):l('最終工程','Final phase');
  const detail=`${Math.round(state.temperature)}° / ${phase.low}–${phase.high}° · ${l('火種','Ember')} ${Math.round(state.ember*100)}% · ${l('通気','Vent')} ${Math.round(state.vent*100)}% · ${l('燃料','Fuel')} ${Math.round(state.fuel/state.fuelMax*100)}% · ${next} · ${l('残り','Left')} ${Math.ceil(d.secondsRemaining)}${l('秒','s')}${d.finishReady?' · '+l('仕上げ可能','FINISH READY'):''}`;
  const status=mode==='interlude'?'interlude':mode==='result'?(state.status==='won'?'won':'lost'):mode==='preview'?'idle':'running';
  const reason=state.status==='lost'?(reasons[state.reasonCode]?.[lang()]||l('仕上がりが届きませんでした。火と通気の配分を変えて再挑戦。','The finish fell short. Try a different balance of fire and vent.')):message;
  onReport({status,value:status==='won'?qualities.reduce((a,b)=>a+b,0):Math.round(state.quality),goal:100,detail,reason,stage:stageIndex,qualities:[...qualities],profileName:profile.name[lang()],checkpoint:checkpoint(),phaseId:phase.id,phaseName:phase.name[lang()],finishReady:d.finishReady,progress:{value:stageIndex+clamp(state.elapsed/profile.totalDuration,0,1),goal:3}});
 }
 function reset(cp={},preview=false){
  cancel();seed=Number.isSafeInteger(cp.seed)?cp.seed:9;runId=cp.runId||'';stageIndex=cp.stage??0;qualities=[...(cp.qualities||[])];state=createFiring(stageIndex,seed);mode=preview?'preview':'running';done=false;lastPhase=-1;lastReady=false;message='';reportClock=0;publish(true);
 }
 function advance(){if(mode!=='interlude')return;stageIndex++;state=createFiring(stageIndex,seed);mode='running';done=false;cancel();lastPhase=-1;lastReady=false;message='';publish(true);}
 function retry(){state=createFiring(stageIndex,seed);mode='running';done=false;cancel();lastPhase=-1;lastReady=false;message='';publish(true);}
 function resolve(){
  if(done||state.status==='running')return;done=true;cancel();
  if(state.status==='won'){
   const grade=Math.round(state.quality);qualities.push(grade);mode=stageIndex<2?'interlude':'result';message=l(`焼き上がり ${grade} / 100。`,`Fired: ${grade} / 100.`);audio.play(stageIndex<2?'success':'finale');
  }else{mode='result';audio.play('fail');}
  publish(true);
 }
 function finish(){if(mode!=='running')return;const before=state.status;finishFiring(state);if(before!==state.status)resolve();else if(!describeFiring(state).finishReady){message=l('まだ仕上げ前です。仕上げ可能の表示を待ちましょう。','Not ready yet. Watch for FINISH READY.');publish(true);}}
 function pointer(type,p){
  const layout=getLayout(ctx.canvas),CONTROLS=layout.controls;p=layoutPoint(p,ctx.canvas);
  if(mode!=='running')return;
  if(type==='down'){
   if(inside(p,CONTROLS.stoke)){activePointer='stoke';stoking=true;stokeTapFeedback=.16;feedFiring(state);audio.play('tap');}
   else if(inside(p,CONTROLS.vent)){activePointer='vent';setVent(state,ventValue(p,layout));audio.play('swish');}
   else if(inside(p,CONTROLS.finish)){finish();}
  }else if(type==='move'&&p.held&&activePointer==='vent')setVent(state,ventValue(p,layout));
  else if(type==='up'){activePointer=null;stoking=heldKeys.size>0;}
 }
 function key(k){if(mode!=='running')return;k=k.toLowerCase();if([' ','enter','space'].includes(k)){heldKeys.add(k);stoking=true;stokeTapFeedback=.16;feedFiring(state);audio.play('tap');}else if(['arrowleft','arrowright','arrowup','arrowdown'].includes(k)){setVent(state,state.vent+(['arrowright','arrowup'].includes(k)?.07:-.07));audio.play('swish');}else if(k==='f')finish();}
 function keyUp(k){heldKeys.delete(k.toLowerCase());stoking=activePointer==='stoke'||heldKeys.size>0;}
 function step(dt){if(mode!=='running')return;stokeTapFeedback=Math.max(0,stokeTapFeedback-Math.max(0,Number(dt)||0));stepFiring(state,dt,{stoking});reportClock+=dt;const d=describeFiring(state);if(state.phaseIndex!==lastPhase){lastPhase=state.phaseIndex;audio.play('step');message=d.phase.name[lang()];}if(d.finishReady&&!lastReady){lastReady=true;audio.play('success');message=l('仕上げられます。温度を見て、仕上げを押しましょう。','Ready to finish. Check the temperature and press FINISH.');}resolve();if(!done)publish();}
 function refresh(){
  const d=describeFiring(state);
  if(state.status==='won')message=l(`焼き上がり ${Math.round(state.quality)} / 100。`,`Fired: ${Math.round(state.quality)} / 100.`);
  else if(mode==='running')message=d.finishReady?l('仕上げられます。温度を見て、仕上げを押しましょう。','Ready to finish. Check the temperature and press FINISH.'):d.phase.name[lang()];
  publish(true);
 }
 return {reset,preview:cp=>reset(cp,true),advance,retry,cancel,pointer,key,keyUp,step,refresh,render(now){drawKiln(ctx,{state,profile:PROFILES[stageIndex],description:describeFiring(state),stageIndex,qualities,lang:lang(),settings:settings(),now,mode,message,inputFeedback:{stokeHeld:stoking,stokePulseSeconds:stokeTapFeedback}});},dispose:cancel};
}






