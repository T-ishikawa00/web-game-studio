import assert from 'node:assert/strict';
export const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function once(s,before,after){assert.equal(s.split(before).length,2,'HTML anchor must be unique: '+before.slice(0,80));return s.replace(before,after);}
export function head(template,g,l,type){
 const c=g[l],route='/'+l+'/'+type+'/'+g.slug+'/';
 let h=template.slice(0,template.indexOf('</head>')+7);
 h=h.replace(/<title>[\s\S]*?<\/title>/,'<title>'+esc(c.title)+' | Tinlumo</title>');
 h=h.replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*(")/g,'$1'+esc(c.description)+'$2');
 h=h.replace(/(<meta property="og:title" content=")[^"]*(")/g,'$1'+esc(c.title)+' | Tinlumo$2');
 h=h.replaceAll('/games/rimbloom/','/games/'+g.slug+'/').replaceAll('/play/rimbloom/','/play/'+g.slug+'/').replaceAll('/covers/game007-a.webp',g.cover);
 assert(h.includes('href="https://tinlumo.com'+route+'"'));
 return h;
}
export function card(g,l){const c=g[l],t=(ja,en)=>l==='ja'?ja:en;return `<article class="game-card" data-game="${g.id}"><a class="cover-link" href="/${l}/games/${g.slug}/" aria-label="${esc(c.title)} · ${t('詳しく見る','View details')}"><img src="${g.thumbnail}" width="600" height="750" alt="${esc(c.title)}" loading="lazy" decoding="async"></a><div class="card-copy"><span class="eyebrow">${esc(c.category)}</span><h3><a href="/${l}/games/${g.slug}/">${esc(c.title)}</a></h3><p>${esc(c.short)}</p><a class="button primary game-play" href="/${l}/play/${g.slug}/" aria-label="${esc(c.title)} · ${t('遊ぶ','Play')}"><span aria-hidden="true">▶</span>${t('遊ぶ','Play')}</a><a class="details-link" href="/${l}/games/${g.slug}/">${t('遊び方・詳細','How to play / details')} <span aria-hidden="true">↗</span></a></div></article>`;}
export function detail(template,g,l){
 const c=g[l],t=(ja,en)=>l==='ja'?ja:en;
 const related=template.match(/<section class="games-section related"[\s\S]*?<\/section>/)?.[0]??'';
 const main=`<main id="main" class="wrap"><nav class="breadcrumb" aria-label="${t('現在地','Breadcrumb')}"><a href="/${l}/games/">← ${t('すべてのゲーム','All games')}</a><span aria-hidden="true">/</span><span>${esc(c.title)}</span></nav><section class="detail-hero" data-game="${g.id}"><div class="detail-art"><img src="${g.cover}" width="1280" height="720" alt="${esc(c.title)}" fetchpriority="high"></div><div class="detail-copy"><p class="eyebrow">${esc(c.category)}</p><h1>${esc(c.title)}</h1><p class="detail-summary">${esc(c.short)}</p><p>${esc(c.description)}</p><a class="button primary" href="/${l}/play/${g.slug}/"><span aria-hidden="true">▶</span>${t('今すぐ遊ぶ','Play now')}</a><dl class="game-facts"><div><dt>${t('内容','Experience')}</dt><dd>${esc(c.duration)}</dd></div><div><dt>${t('操作','Controls')}</dt><dd>${t('マウス・タッチ / キーボード','Mouse / touch / keyboard')}</dd></div><div><dt>${t('言語','Language')}</dt><dd>日本語 / English</dd></div></dl></div></section><section class="detail-story"><div><p class="eyebrow">A LITTLE WORLD TO EXPLORE</p><h2>${t('ここでは、こんな遊びを。','A little world to play.')}</h2><p>${esc(c.controls)}</p><p>${esc(c.settings)}</p></div><img src="/scenes/${g.id}.webp" alt="${esc(c.title)} · ${t('実際のゲーム画面','Actual game screen')}" width="1280" height="720" loading="lazy" decoding="async"></section><details class="save-details"><summary>${t('保存・ブラウザー・クレジット','Saves, browser and credits')}</summary><p>${esc(c.save)}</p><p>${t('同じ端末・ブラウザー・サイトで保存します。別端末への同期はありません。保存を利用できない場合もゲームを続けられます。','Saves stay in the same browser, device and site. No cross-device sync. You can continue playing when storage is unavailable.')}</p><p>${esc(c.credits)}</p><a href="/${l}/credits/">${t('制作情報・ライセンス','Credits and licenses')} →</a></details>${related}</main>`;
 let body=template.slice(template.indexOf('<body>')).replace(/<main\b[\s\S]*?<\/main>/,main);
 body=body.replaceAll('/games/rimbloom/','/games/'+g.slug+'/');
 return head(template,g,l,'games')+body;
}
export function growthPanel(template,g,l){
 let panel=template.match(/<section\b[^>]*data-growth-consent[\s\S]*?<\/section>/)?.[0];assert(panel);
 const from=l==='ja'?'HakoriloとRIMBLOOM':'Hakorilo and RIMBLOOM';
 const to=l==='ja'?'Hakorilo、RIMBLOOM、COILHOP':'Hakorilo, RIMBLOOM and COILHOP';
 return panel.replaceAll(from,to);
}
export function play(template,g,l){
 const c=g[l],t=(ja,en)=>l==='ja'?ja:en;
 let h=head(template,g,l,'play');
 h=once(h,'</head>',`<style>html,body{margin:0;padding:0}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}.integration-nav{min-height:48px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:4px 12px;background:#fbfdff;color:#201955;font:14px/1.5 system-ui}.integration-nav a{color:inherit;min-height:44px;display:inline-flex;align-items:center}.integration-nav strong{margin-right:auto}#standalone-game{border:0;width:100%;height:calc(100dvh - 56px);min-height:580px;display:block}body{overflow-x:hidden}</style></head>`);
 const consent=template.match(/<section class="analytics-consent"[\s\S]*?<\/section>/)?.[0]??'';
 return h+`<body><nav class="integration-nav" aria-label="${t('ゲームナビゲーション','Game navigation')}"><a href="/${l}/games/">← Tinlumo</a><strong>${esc(c.title)}</strong><a href="/${l}/games/${g.slug}/">${t('遊び方','How to play')}</a><a lang="${l==='ja'?'en':'ja'}" href="/${l==='ja'?'en':'ja'}/play/${g.slug}/">${l==='ja'?'EN':'JA'}</a></nav><main id="main"><iframe id="standalone-game" title="${esc(c.title)}" src="${g.runtime}?portal=1&amp;lang=${l}" allow="autoplay"></iframe><noscript><p>${t('このゲームにはJavaScriptが必要です。','This game requires JavaScript.')}</p></noscript></main>${growthPanel(template,g,l)}${consent}<script type="module" src="/assets/analytics-consent.js"></script><script type="module" src="/assets/growth-client.js"></script><script type="module" src="/games/${g.id}/${g.version}/portal.mjs"></script></body></html>`;
}
