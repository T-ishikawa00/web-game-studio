import assert from 'node:assert/strict';

const replaceOnce = (text, before, after) => {
  assert.equal(text.split(before).length, 2, 'Adapter source anchor changed');
  return text.replace(before, after);
};

// Integration-only changes. Core, input, rendering, audio and record modules are copied unchanged.
export function adaptGame(source) {
  let result = replaceOnce(source, "const reviewMode=new URLSearchParams(location.search).get('review')==='1';", 'const reviewMode=false;');
  result = replaceOnce(result, "let lang=navigator.language.startsWith('ja')?'ja':'en'", "let lang=document.documentElement.lang==='ja'?'ja':'en'");
  result = replaceOnce(result, ";$('reset-records').textContent=text().clear;overlay();", ';overlay();');
  result = replaceOnce(result, 'function applyText(){', `function applyText(){
  const saveStatus=document.getElementById('rimbloom-save-status');
  saveStatus.textContent=records.available?'':records.blockedReason==='corrupt'?(lang==='ja'?'保存記録が読み込めません。元データを保持して、このページ内だけで記録します。消去はサイトの設定で確認できます。':'Saved records could not be read. Original data is retained; new records last only for this page. Review deletion in site Settings.'):(lang==='ja'?'保存を利用できません。記録はこのページ内だけに保持します。':'Storage is unavailable. Records last only for this page.');`);
  result = replaceOnce(result, "$('reset-records').addEventListener('click',()=>{if(g.status==='playing')pause(true);records.reset();previousScore=null;applyText();});\n", '');
  const recorder = result.indexOf('async function startRecord(){');
  const finish = result.lastIndexOf('applyText();requestAnimationFrame(frame);');
  assert(recorder > 0 && finish > recorder, 'Recorder removal anchors changed');
  result = result.slice(0, recorder) + result.slice(finish);
  assert(!result.includes('/__qa') && !result.includes('/__record') && !result.includes('MediaRecorder'));
  return result;
}

export function gameHtml(source, locale) {
  assert(['ja', 'en'].includes(locale));
  const base = '/games/game007/1.0.0-r1/';
  let html = replaceOnce(source, '<html lang="ja">', `<html lang="${locale}">`);
  html = replaceOnce(html, 'href="/src/style.css"', `href="${base}src/style.css"`);
  html = replaceOnce(html, 'src="/src/game.mjs"', `src="${base}src/game.mjs"`);
  html = replaceOnce(html, '<title>RIMBLOOM — Tinlumo Game 007</title>', '<title>RIMBLOOM | Tinlumo</title>');
  html = html.replace(/<section id="capture-panel"[\s\S]*?<\/section>/, '');
  assert(!html.includes('capture-panel'));
  const t = (ja, en) => locale === 'ja' ? ja : en;
  const description = t('壁を味方に、連鎖を狙え。60秒の反射アクション。', 'Aim, rebound, and make one hit bloom. A fast 60-second score attack.');
  html = html.replace('</head>', `<meta name="robots" content="noindex,nofollow"><meta name="description" content="${description}"><meta property="og:title" content="RIMBLOOM | Tinlumo"><meta property="og:description" content="${description}"><meta property="og:image" content="/covers/game007-a.webp"><link rel="stylesheet" href="${base}portal.css"><script type="module" src="${base}portal.mjs"></script></head>`);
  // Keep the first nav as the accepted game settings nav (applyText owns its aria-label).
  html = html.replace('<span class="brand">TINLUMO <b>007</b></span>', `<a class="brand portal-back" data-rimbloom-home href="/${locale}/" aria-label="${t('Tinlumo ホームへ', 'Back to Tinlumo home')}">← TINLUMO <b>007</b></a>`);
  html = html.replace('</main>', `</main><p id="rimbloom-save-status" role="status"></p><footer class="rimbloom-links"><a data-rimbloom-detail href="/${locale}/games/rimbloom/">${t('遊び方・保存について', 'How to play & saves')}</a><a data-rimbloom-locale href="/${locale === 'ja' ? 'en' : 'ja'}/play/rimbloom/" lang="${locale === 'ja' ? 'en' : 'ja'}">${t('English page', '日本語のページ')}</a><a data-rimbloom-settings href="/${locale}/settings/#rimbloom-save">${t('記録・計測の設定', 'Records & analytics settings')}</a></footer><noscript><p>${t('遊ぶにはJavaScriptとCanvasに対応したブラウザーが必要です。', 'JavaScript and Canvas are required to play.')} <a href="/${locale}/games/rimbloom/">${t('遊び方へ戻る', 'Back to details')}</a></p></noscript>`);
  return html;
}

export function installRecordLifecycle(win){
 const key='rimbloom.full-r1.local-records.v1';
 const read=()=>{try{return win.localStorage.getItem(key);}catch{return undefined;}};
 let parked=read();
 win.addEventListener('pagehide',()=>{parked=read();});
 win.addEventListener('pageshow',event=>{if(event.persisted&&read()!==parked)win.location.reload();});
 win.addEventListener('storage',event=>{if((event.key===key&&event.oldValue!==event.newValue)||event.key===null)win.location.reload();});
}
export const portalJs = `${installRecordLifecycle.toString()}\ninstallRecordLifecycle(window);\nconst sync=()=>{const ja=document.documentElement.lang==='ja',lang=ja?'ja':'en';for(const a of document.querySelectorAll('[data-rimbloom-home]')){a.href='/'+lang+'/';a.setAttribute('aria-label',ja?'Tinlumo ホームへ':'Back to Tinlumo home');}for(const a of document.querySelectorAll('[data-rimbloom-detail]')){a.href='/'+lang+'/games/rimbloom/';a.textContent=ja?'遊び方・保存について':'How to play & saves';}for(const a of document.querySelectorAll('[data-rimbloom-locale]')){a.href='/'+(ja?'en':'ja')+'/play/rimbloom/';a.lang=ja?'en':'ja';a.textContent=ja?'English page':'日本語のページ';}for(const a of document.querySelectorAll('[data-rimbloom-settings]')){a.href='/'+lang+'/settings/#rimbloom-save';a.textContent=ja?'記録・計測の設定':'Records & analytics settings';}};document.getElementById('language')?.addEventListener('click',sync);sync();\n`;

// Additional links live below the accepted playfield. Its dimensions and toolbar height stay unchanged.
export const portalCss = `.portal-back{color:inherit;text-decoration:none;min-height:44px;display:flex;align-items:center;flex-wrap:wrap}.portal-back:focus-visible,.rimbloom-links a:focus-visible{outline:3px solid #f3ca80;outline-offset:3px}.rimbloom-links{display:flex;justify-content:center;align-items:center;gap:8px 18px;flex-wrap:wrap;padding:0 12px 12px;font-size:12px}.rimbloom-links a{color:#bfd7e6;display:flex;min-height:44px;align-items:center}#rimbloom-save-status{max-width:700px;margin:0 auto;font-size:12px;padding:0 12px;color:#e7bc7b}#rimbloom-save-status:empty{display:none}body>noscript{display:block;text-align:center;padding:16px}body>noscript a{color:#bfd7e6}\n`;
