const key='rimbloom.full-r1.local-records.v1';
const open=document.querySelector('[data-reset-rimbloom]'),dialog=document.querySelector('#rimbloom-reset'),confirm=document.querySelector('[data-confirm-rimbloom-reset]'),output=document.querySelector('#rimbloom-reset-result');
if(open&&dialog&&confirm&&output){
 open.addEventListener('click',()=>dialog.showModal());
 confirm.addEventListener('click',()=>{const ja=document.documentElement.lang==='ja';let success=false;try{localStorage.removeItem(key);success=localStorage.getItem(key)===null;}catch{}output.textContent=success?(ja?'RIMBLOOMの記録を消去しました。ほかの作品と計測設定はそのままです。':'RIMBLOOM records were erased. Other games and analytics settings remain unchanged.'):(ja?'消去の完了を確認できません。保存機能を利用できる状態で、もう一度確認してください。':'Deletion could not be confirmed. Try again when browser storage is available.');if(success){dialog.close();open.focus();}});
}
