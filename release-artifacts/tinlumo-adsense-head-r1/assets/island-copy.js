// Public accessible names only. Stable plot keys and the accepted Island
// engine/save payload remain unchanged. Used by both Play and raw game pages.
const names = {
  ja: {coast: '海岸沿い', village: '村の広場'},
  en: {coast: 'Coast', village: 'Village'},
};

function connect() {
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
