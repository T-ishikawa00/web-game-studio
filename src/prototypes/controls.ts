import {button} from './board-view';
import type {DeliveryRun} from './rules';
export type CaptureLayout='auto'|'portrait'|'landscape';
export const isCaptureLayout=(v:unknown):v is CaptureLayout=>v==='auto'||v==='portrait'||v==='landscape';
const paths:Record<string,string>={undo:'M9 5 4 10l5 5M4 10h10a6 6 0 0 1 0 12',retry:'M19 8a8 8 0 1 0 1 8M19 3v5h-5',go:'m8 4 12 8-12 8Z',pause:'M8 5v14M16 5v14',next:'M4 12h15m-6-6 6 6-6 6',step:'m5 5 10 7-10 7ZM19 5v14',edit:'m4 16 11-11 4 4L8 20H4ZM13 7l4 4',menu:'M5 6h14M5 12h14M5 18h14'};
export function control(action:string,label:string,disabled=false,primary=false,icon=action){return button(action,`<span class="control-face"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[icon]??paths.retry}"/></svg><span>${label}</span></span>`,disabled,`control ${primary?'primary':'utility'}`);}
export function controlBar(v:{delivery:boolean;run?:DeliveryRun;localPaused:boolean;paused:boolean;won:boolean;last:boolean;history:number;en:boolean}){
 const t=(ja:string,en:string)=>v.en?en:ja;
 const next=v.won?control(v.last?'finish-levels':'next',v.last?t('面一覧','Levels'):t('次へ','Next'),v.paused,true,v.last?'menu':'next'):'';
 const menu=control('menu',t('メニュー','Menu'),v.paused,false,'menu');
 if(!v.delivery)return `<div class="utility-group">${control('undo',t('1手戻す','Undo'),v.paused||!v.history)}${menu}</div><div class="action-group progression-action">${next}</div>`;
 const running=v.run?.status==='running',failed=v.run?.status==='failed';
 const primary=v.won?next:failed?control('retry',t('調整に戻る','Edit route'),v.paused,true,'edit'):control('go',!v.run?t('出発','Go'):v.localPaused?t('再開','Resume'):t('一時停止','Pause'),v.paused,true,running&&!v.localPaused?'pause':'go');
 return `<div class="action-group">${primary}</div><div class="utility-group">${menu}</div>${running&&v.localPaused?`<div class="run-tools">${control('step',t('1コマ','Step'),v.paused)}${control('retry',t('調整に戻る','Edit route'),v.paused,false,'edit')}</div>`:''}`;
}
