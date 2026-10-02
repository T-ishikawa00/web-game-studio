import assert from 'node:assert/strict';
export const version='2.0.0-r2',base='/games/game007/'+version+'/';
export function replaceOnce(text,before,after){assert.equal(text.split(before).length,2,'Source anchor changed: '+before.slice(0,70));return text.replace(before,after);}
export function installRecordLifecycle(win){
 const keys=['rimbloom.full-r1.local-records.v1','rimbloom.complete-r2.records.v2'];
 const read=()=>{try{return keys.map(key=>win.localStorage.getItem(key)).join('\u0000');}catch{return undefined;}};let parked=read();
 win.addEventListener('pagehide',()=>{parked=read();});
 win.addEventListener('pageshow',event=>{if(event.persisted&&read()!==parked)win.location.reload();});
 win.addEventListener('storage',event=>{if((keys.includes(event.key)&&event.oldValue!==event.newValue)||event.key===null)win.location.reload();});
}
export function eraseRimbloomRecords(storage){
 const keys=['rimbloom.full-r1.local-records.v1','rimbloom.complete-r2.records.v2'];
 try{for(const key of keys)storage.removeItem(key);return keys.every(key=>storage.getItem(key)===null);}catch{return false;}
}
export const resetJs=`${eraseRimbloomRecords.toString()}\nconst open=document.querySelector('[data-reset-rimbloom]'),dialog=document.querySelector('#rimbloom-reset'),confirm=document.querySelector('[data-confirm-rimbloom-reset]'),output=document.querySelector('#rimbloom-reset-result');if(open&&dialog&&confirm&&output){open.addEventListener('click',()=>dialog.showModal());confirm.addEventListener('click',()=>{const ja=document.documentElement.lang==='ja';let success=false;try{success=eraseRimbloomRecords(localStorage);}catch{}output.textContent=success?(ja?'JourneyとQuick Runの記録を消去しました。ゲーム設定、ほかの作品、計測設定は保持します。':'Journey and Quick Run records were erased. Game preferences, other games and analytics settings are retained.'):(ja?'消去の完了を確認できません。保存機能を利用できる状態で、もう一度確認してください。':'Deletion could not be confirmed. Try again when browser storage is available.');if(success){dialog.close();open.focus();}});}\n`;
export const portalJs=`${installRecordLifecycle.toString()}\ninstallRecordLifecycle(window);\nconst sync=()=>{const ja=document.documentElement.lang==='ja',lang=ja?'ja':'en';for(const a of document.querySelectorAll('[data-rimbloom-home]')){a.href='/'+lang+'/';a.setAttribute('aria-label',ja?'Tinlumo ホームへ':'Back to Tinlumo home');}for(const a of document.querySelectorAll('[data-rimbloom-detail]')){a.href='/'+lang+'/games/rimbloom/';a.textContent=ja?'遊び方・保存について':'How to play & saves';}for(const a of document.querySelectorAll('[data-rimbloom-locale]')){a.href='/'+(ja?'en':'ja')+'/play/rimbloom/';a.lang=ja?'en':'ja';a.textContent=ja?'English page':'日本語のページ';}for(const a of document.querySelectorAll('[data-rimbloom-settings]')){a.href='/'+lang+'/settings/#rimbloom-save';a.textContent=ja?'記録・計測の設定':'Records & analytics settings';}};document.getElementById('language')?.addEventListener('click',sync);sync();\n`;
export const portalCss=`.portal-back{color:inherit;text-decoration:none;min-height:44px;display:flex;align-items:center;flex-wrap:wrap}.portal-back:focus-visible,.rimbloom-links a:focus-visible{outline:3px solid #f3ca80;outline-offset:3px}.rimbloom-links{display:flex;justify-content:center;align-items:center;gap:8px 18px;flex-wrap:wrap;padding:0 12px 12px;font-size:12px}.rimbloom-links a{color:#bfd7e6;display:flex;min-height:44px;align-items:center}#rimbloom-save-status{max-width:700px;margin:0 auto;font-size:12px;padding:0 12px;color:#e7bc7b}#rimbloom-save-status:empty{display:none}body>noscript{display:block;text-align:center;padding:16px}body>noscript a{color:#bfd7e6}\n`;
export function adaptGame(source){
 let s=replaceOnce(source,"lang=settings.data.lang||(navigator.language.startsWith('ja')?'ja':'en')","lang=document.documentElement.lang==='ja'?'ja':'en'");
 s=replaceOnce(s,'function applyText(){',`function applyText(){
 const store=mode==='quick'?records:journeyRecords,notice=document.getElementById('rimbloom-save-status');
 notice.textContent=store.available?'':store.blockedReason==='corrupt'?(lang==='ja'?'保存記録が読み込めません。元データを保持して、このページ内だけで記録します。消去はサイト設定で確認できます。':'Saved records could not be read. Original data is retained; new records last only for this page. Review deletion in site Settings.'):(lang==='ja'?'保存を利用できません。記録はこのページ内だけに保持します。':'Storage is unavailable. Records last only for this page.');`);
 return s;
}
export function gameHtml(source,locale,prior){
 const t=(ja,en)=>locale==='ja'?ja:en;let html=replaceOnce(source,'<html lang="ja">',`<html lang="${locale}">`);
 html=html.replaceAll('./src/',base+'src/');
 html=replaceOnce(html,'<span class="brand">TINLUMO <b>007</b></span>',`<a class="brand portal-back" data-rimbloom-home href="/${locale}/" aria-label="${t('Tinlumo ホームへ','Back to Tinlumo home')}">← TINLUMO <b>007</b></a>`);
 const retainedHead=prior.slice(prior.indexOf('<meta name="robots"'),prior.indexOf('</head>')).replaceAll('/games/game007/1.0.0-r1/',base).replace(/<meta name="description"[^>]+>/,'').replace(/<meta property="og:description"[^>]+>/,'').replace(/<meta property="og:title"[^>]+>/,`<meta property="og:title" content="RIMBLOOM Complete Edition | Tinlumo">`);
 html=replaceOnce(html,'</head>',retainedHead+'</head>');
 html=replaceOnce(html,'</main>',`</main><p id="rimbloom-save-status" role="status"></p><nav class="rimbloom-links" aria-label="${t('サイトへのリンク','Site links')}"><a data-rimbloom-detail href="/${locale}/games/rimbloom/">${t('遊び方・保存について','How to play &amp; saves')}</a><a data-rimbloom-locale href="/${locale==='ja'?'en':'ja'}/play/rimbloom/" lang="${locale==='ja'?'en':'ja'}">${t('English page','日本語のページ')}</a><a data-rimbloom-settings href="/${locale}/settings/#rimbloom-save">${t('記録・計測の設定','Records &amp; analytics settings')}</a></nav>`);
 return html;
}
