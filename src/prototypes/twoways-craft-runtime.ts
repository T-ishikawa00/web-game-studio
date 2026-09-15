import {createTwAudio} from './twoways-craft-audio';
import {twCraftPlan,type TwPlan} from './twoways-craft-plan';
import {showTwCraft} from './twoways-craft-motion';
import type {HomeLevel,HomeState,Dir} from './rules';
export type TwMode='TW-A'|'TW-B'|'TW-C';
const validMode=(v:unknown):v is TwMode=>v==='TW-A'||v==='TW-B'||v==='TW-C';
export function createTwCraft(root:HTMLElement,en:boolean,reduced:()=>boolean,canInput:()=>boolean){
 const audio=createTwAudio();let mode:TwMode='TW-C',cleanup=()=>{},transition=0,plan:TwPlan|undefined;
 try{const requested=new URL(parent.location.href).searchParams.get('tw')??sessionStorage.getItem('wgs:tw-craft-mode');if(validMode(requested))mode=requested;}catch{}
 const cancel=(suspend=false)=>{transition++;cleanup();cleanup=()=>{};audio.cancel(suspend);};
 const eligible=(e:Event)=>{if(mode!=='TW-C'||!canInput()||!(e.target instanceof Element)||e.target.closest('dialog,input,select,textarea,[contenteditable=true]'))return false;const b=e.target.closest<HTMLButtonElement>('button[data-action]');return !!(b&&!b.disabled&&/^(move:|undo$)/.test(b.dataset.action??''))||!!e.target.closest('[data-swipe-board]');};
 document.addEventListener('pointerdown',e=>{if(eligible(e))audio.unlock(e);},{capture:true});
 document.addEventListener('keydown',e=>{if(e.repeat||e.altKey||e.ctrlKey||e.metaKey)return;if((['Enter',' '].includes(e.key)&&eligible(e))||(/^(Arrow(Up|Right|Down|Left)|[wasdWASD])$/.test(e.key)&&mode==='TW-C'&&canInput()&&root.contains(document.activeElement)&&!(e.target instanceof Element&&e.target.closest('dialog,input,select,textarea,button:not(.direction)'))))audio.unlock(e);},{capture:true});
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>cancel());
 function turn(level:HomeLevel,before:HomeState,after:HomeState,direction:Dir,complete:boolean){cancel();plan=twCraftPlan(level,before,after,direction,complete);const origin=performance.now();if(mode!=='TW-A')cleanup=showTwCraft(root,level,plan,reduced(),origin);if(mode==='TW-C')audio.schedule(plan.sounds,origin);}
 function undo(){if(mode==='TW-C')audio.schedule([{id:'undo',at:0,targets:[]}],performance.now());}
 function settings(dialog:HTMLDialogElement){
  const old=dialog.querySelector('small')?.previousElementSibling;if(!old)return;
  old.outerHTML=`<fieldset style="display:grid;gap:8px"><legend>${en?'Two Ways sound effects':'ふたりの効果音'}</legend><label><input type="checkbox" id="tw-mute"> ${en?'Mute':'消音'}</label><label for="tw-gain">${en?'Volume':'音量'} <output id="tw-value"></output></label><input type="range" id="tw-gain" min="0" max="100" step="5" style="width:100%;min-height:32px"><p id="tw-status" role="status"></p><label for="tw-mode">${en?'Craft comparison':'Craft比較'}</label><select id="tw-mode"><option value="TW-A">TW-A · ${en?'Original / silent':'開始時・無音'}</option><option value="TW-B">TW-B · Motion / ${en?'silent':'無音'}</option><option value="TW-C">TW-C · Motion + SFX</option></select></fieldset>`;
  const mute=dialog.querySelector<HTMLInputElement>('#tw-mute')!,gain=dialog.querySelector<HTMLInputElement>('#tw-gain')!,select=dialog.querySelector<HTMLSelectElement>('#tw-mode')!;mute.checked=audio.preferences.mute;gain.value=String(audio.preferences.gain*100);select.value=mode;
  const status=()=>{dialog.querySelector('#tw-value')!.textContent=gain.value+'%';dialog.querySelector('#tw-status')!.textContent=audio.storageFailed?(en?'Sound settings cannot be saved; this visit only.':'音設定は保存できません。この回だけ反映します。'):!audio.available?(en?'Sound unavailable. You can keep playing.':'音を再生できません。ゲームは続けられます。'):mode==='TW-C'?(en?'Sound starts with movement or Undo. No music.':'移動・Undoの操作で音が始まります。BGMなし。'):(en?'Silent comparison.':'無音の比較です。');};
  mute.onchange=gain.oninput=()=>{audio.set({mute:mute.checked,gain:Number(gain.value)/100});status();};select.onchange=()=>{if(validMode(select.value)){cancel(true);mode=select.value;try{sessionStorage.setItem('wgs:tw-craft-mode',mode);}catch{}}status();};status();
 }
 Object.defineProperty(window,'__twCraftState',{value:()=>({mode,transition,plan:plan?structuredClone(plan):null,audio:audio.snapshot()})});return {cancel,turn,undo,settings,get mode(){return mode;}};
}
