import {fresh,validate,type State} from './core';
import {SAVE_KEY,SAVE_VERSION} from './save-key';
export type SaveMode='saved'|'temporary'|'corrupt'|'conflict';
export class VillageSave {
 mode:SaveMode='saved'; last:string|null=null; change:()=>void=()=>{};
 constructor(){window.addEventListener('storage',e=>{if((e.key===SAVE_KEY&&e.newValue!==this.last)||(e.key===null&&this.last!==null)){this.mode='conflict';this.change();}});}
 load(){try{this.last=localStorage.getItem(SAVE_KEY);if(this.last===null)return fresh();const envelope=JSON.parse(this.last);if(envelope.version!==SAVE_VERSION||!validate(envelope.state)){this.mode='corrupt';return fresh();}return envelope.state as State;}catch{this.mode=this.last===null?'temporary':'corrupt';return fresh();}}
 write(state:State){if(this.mode!=='saved')return false;if(!validate(state)){this.mode='temporary';this.change();return false;}try{if(localStorage.getItem(SAVE_KEY)!==this.last){this.mode='conflict';this.change();return false;}const raw=JSON.stringify({version:SAVE_VERSION,revision:crypto.randomUUID(),state});localStorage.setItem(SAVE_KEY,raw);this.last=raw;return true;}catch{this.mode='temporary';this.change();return false;}}
 reset(){try{if(this.mode==='conflict'||localStorage.getItem(SAVE_KEY)!==this.last){this.mode='conflict';this.change();return false;}localStorage.removeItem(SAVE_KEY);this.last=null;this.mode='saved';return true;}catch{this.mode='temporary';this.change();return false;}}
}
