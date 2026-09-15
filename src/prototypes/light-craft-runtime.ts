import {showLightCause} from './light-feedback';
import {lightCraftPlan} from './light-craft-plan';
import {showLightCraft} from './light-craft-motion';
import {createLightAudio} from './light-craft-audio';
import type {LightLevel,LightState} from './light-r2';
export type LightMode='LG-A'|'LG-B'|'LG-C';
const validMode=(v:unknown):v is LightMode=>v==='LG-A'||v==='LG-B'||v==='LG-C';
export function createLightCraft(root:HTMLElement,en:boolean,reduced:()=>boolean,canInput:()=>boolean){
 const audio=createLightAudio();let mode:LightMode='LG-C',cleanup=()=>{},transition=0,lastPlan:ReturnType<typeof lightCraftPlan>|undefined;
 try{const requested=new URL(parent.location.href).searchParams.get('lg')??sessionStorage.getItem('wgs:light-craft-mode');if(validMode(requested))mode=requested;}catch{}
 const cancel=(suspend=false)=>{transition++;cleanup();cleanup=()=>{};audio.cancel(suspend);};
 const unlock=(e:Event)=>{const target=e.target instanceof Element?e.target.closest<HTMLButtonElement>('button[data-action]'):null;if(mode==='LG-C'&&canInput()&&target&&!target.disabled&&/^(mirror:|undo$)/.test(target.dataset.action??''))audio.unlock(e);};
 document.addEventListener('pointerdown',unlock,{capture:true});document.addEventListener('keydown',e=>{if(!e.repeat&&(e.key==='Enter'||e.key===' '))unlock(e);},{capture:true});
 const media=matchMedia('(prefers-reduced-motion: reduce)');media.addEventListener('change',()=>cancel());
 function setMode(value:unknown){if(!validMode(value))return;cancel();mode=value;try{sessionStorage.setItem('wgs:light-craft-mode',mode);}catch{}}
 function turn(level:LightLevel,before:LightState,after:LightState,complete:boolean,index:number){
  cancel();const origin=performance.now(),plan=lightCraftPlan(level,before,after,complete);lastPlan=plan;
  if(mode==='LG-A')cleanup=showLightCause(root,level,before,after,en,reduced());
  else{const clear=showLightCraft(root,level,plan,en,reduced(),origin),node=root.querySelector('[data-action="mirror:'+index+'"] .mirror'),motion=!reduced()?node?.animate([{opacity:.5},{opacity:1}],{duration:150}):undefined;cleanup=()=>{clear();motion?.cancel();};}
  if(mode==='LG-C')audio.schedule(plan.sounds,origin);
 }
 function undo(){if(mode==='LG-C')audio.schedule([{id:'undo',at:0,targets:[]}],performance.now());}
 function settings(dialog:HTMLDialogElement){
  const old=dialog.querySelector('small')?.previousElementSibling;if(!old)return;
  old.outerHTML=`<fieldset class="light-audio-settings" style="display:grid;gap:8px"><legend>${en?'Lightwork sound effects':'ひかりの効果音'}</legend><label><input type="checkbox" id="lg-mute"> ${en?'Mute':'消音'}</label><label for="lg-gain">${en?'Volume':'音量'} <output id="lg-value"></output></label><input type="range" id="lg-gain" min="0" max="100" step="5" style="width:100%;min-height:32px"><p id="lg-status" role="status"></p><label for="lg-mode">${en?'Craft comparison':'Craft比較'}</label><select id="lg-mode"><option value="LG-A">LG-A · ${en?'Current / silent':'現行・無音'}</option><option value="LG-B">LG-B · ${en?'Motion / silent':'Motion・無音'}</option><option value="LG-C">LG-C · Motion + SFX</option></select></fieldset>`;
  const mute=dialog.querySelector<HTMLInputElement>('#lg-mute')!,gain=dialog.querySelector<HTMLInputElement>('#lg-gain')!,select=dialog.querySelector<HTMLSelectElement>('#lg-mode')!;mute.checked=audio.preferences.mute;gain.value=String(audio.preferences.gain*100);select.value=mode;
  const status=()=>{dialog.querySelector('#lg-value')!.textContent=gain.value+'%';dialog.querySelector('#lg-status')!.textContent=audio.storageFailed?(en?'Sound settings cannot be saved; this visit only.':'音設定は保存できません。この回だけ反映します。'):!audio.available?(en?'Sound unavailable. You can keep playing.':'音を再生できません。ゲームは続けられます。'):mode==='LG-C'?(en?'Sound starts with a mirror or Undo input. No music.':'鏡・Undoの操作で音が始まります。BGMなし。'):(en?'Silent comparison.':'無音の比較です。');};
  mute.onchange=gain.oninput=()=>{audio.set({mute:mute.checked,gain:Number(gain.value)/100});status();};select.onchange=()=>{setMode(select.value);status();};status();
 }
 Object.defineProperty(window,'__lightCraftState',{value:()=>({mode,transition,plan:lastPlan?structuredClone(lastPlan):null,audio:audio.snapshot()})});
 return {cancel,turn,undo,settings,get mode(){return mode;}};
}
