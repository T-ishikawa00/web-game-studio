// Public accessible names only. Stable plot keys and the accepted Island
// engine/save payload remain unchanged. Used by both Play and raw game pages.
const names = {
  ja: {coast: '海岸沿い', village: '村の広場'},
  en: {coast: 'Coast', village: 'Village'},
};

function connect() {
  if(connectFailureReturn())return true;
  const labels = document.getElementById('labels');
  if (!labels) return false;
  const update = () => {
    const locale = document.documentElement.lang === 'ja' ? 'ja' : 'en';
    for (const marker of labels.querySelectorAll('[data-plot="coast"], [data-plot="village"]')) {
      marker.setAttribute('aria-label', names[locale][marker.getAttribute('data-plot')]);
    }
  };
  update();
  new MutationObserver(update).observe(labels, {childList: true});
  new MutationObserver(update).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  return true;
}

if (!connect()) {
  const app = document.getElementById('app');
  if (app) {
    const ready = new MutationObserver(() => {if (connect()) ready.disconnect();});
    ready.observe(app, {childList: true});
  }
}

function connectFailureReturn(){
 const fallback=document.querySelector('#app .fallback');
 if(!fallback)return false;
 document.body.dataset.ready='false';
 const nav=document.createElement('nav'),details=document.createElement('a'),home=document.createElement('a');
 nav.dataset.islandBootReturn='true';nav.style.cssText='display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px';
 for(const link of [details,home])link.style.cssText='display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 16px;border:1px solid #b7c9bc;border-radius:12px;background:#fff9ed;color:#294d40;text-decoration:underline;font-size:15px';
 details.dataset.islandDetails='true';home.dataset.islandHome='true';
 const update=()=>{const ja=document.documentElement.lang==='ja',locale=ja?'ja':'en';nav.setAttribute('aria-label',ja?'起動できないときの戻り先':'Return links when the game cannot start');details.href='/'+locale+'/games/island-connections/';details.textContent=ja?'遊び方・詳細へ戻る':'Back to game details';home.href='/'+locale+'/';home.textContent=ja?'Tinlumo ホームへ':'Tinlumo home';};
 nav.append(details,home);fallback.append(nav);update();
 new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 return true;
}
