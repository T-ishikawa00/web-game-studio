function installRecordLifecycle(win){
 const keys=['rimbloom.full-r1.local-records.v1','rimbloom.complete-r2.records.v2'];
 const read=()=>{try{return keys.map(key=>win.localStorage.getItem(key)).join('\u0000');}catch{return undefined;}};let parked=read();
 win.addEventListener('pagehide',()=>{parked=read();});
 win.addEventListener('pageshow',event=>{if(event.persisted&&read()!==parked)win.location.reload();});
 win.addEventListener('storage',event=>{if((keys.includes(event.key)&&event.oldValue!==event.newValue)||event.key===null)win.location.reload();});
}
installRecordLifecycle(window);
const sync=()=>{const ja=document.documentElement.lang==='ja',lang=ja?'ja':'en';for(const a of document.querySelectorAll('[data-rimbloom-home]')){a.href='/'+lang+'/';a.setAttribute('aria-label',ja?'Tinlumo ホームへ':'Back to Tinlumo home');}for(const a of document.querySelectorAll('[data-rimbloom-detail]')){a.href='/'+lang+'/games/rimbloom/';a.textContent=ja?'遊び方・保存について':'How to play & saves';}for(const a of document.querySelectorAll('[data-rimbloom-locale]')){a.href='/'+(ja?'en':'ja')+'/play/rimbloom/';a.lang=ja?'en':'ja';a.textContent=ja?'English page':'日本語のページ';}for(const a of document.querySelectorAll('[data-rimbloom-settings]')){a.href='/'+lang+'/settings/#rimbloom-save';a.textContent=ja?'記録・計測の設定':'Records & analytics settings';}};document.addEventListener('click',event=>{if(event.target.closest('#language'))sync();});sync();
