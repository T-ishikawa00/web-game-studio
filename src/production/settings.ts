import {createPrototypeSave} from '../prototypes/state';
const open=document.querySelector<HTMLButtonElement>('[data-reset-hakorilo]');
const dialog=document.querySelector<HTMLDialogElement>('#hakorilo-reset');
const confirm=document.querySelector<HTMLButtonElement>('[data-confirm-reset]');
const output=document.querySelector<HTMLElement>('#reset-result');
if(open&&dialog&&confirm&&output){
 open.addEventListener('click',()=>dialog.showModal());
 confirm.addEventListener('click',()=>{const save=createPrototypeSave('tiny-delivery',()=>localStorage);const success=save.reset();const ja=document.documentElement.lang==='ja';output.textContent=success?(ja?'Hakoriloの進行を消去しました。音の設定と、ほかの作品の保存はそのままです。':'Hakorilo progress was erased. Sound settings and other games remain unchanged.'):(ja?'消去の完了を確認できません。保存機能を利用できる状態で、もう一度確認してください。':'Deletion could not be confirmed. Check again when browser storage is available.');if(success){dialog.close();open.focus();}});
}

