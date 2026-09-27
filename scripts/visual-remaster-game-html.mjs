// Only public entry adaptation. The game remains the sole save owner.
export function productionGameHtml(html,game,locale){
 const base=game.buildPath.slice(0,game.buildPath.lastIndexOf('/')+1);
 html=html.replace(/<html\b[^>]*>/,`<html lang="${locale}">`);
 html=html.replace(/\b(href|src)="(?:\.\/)?(game\.css|full\.css|game\.js)"/g,(_,attr,file)=>`${attr}="${base}${file}"`);
 html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${game.title[locale]} | Tinlumo</title>`);
 if(!/name="robots"/.test(html))html=html.replace('</head>','<meta name="robots" content="noindex,nofollow"></head>');
 if(!/name="description"/.test(html))html=html.replace('</head>',`<meta name="description" content="${game.description[locale].replaceAll('"','&quot;')}"></head>`);
 html=html.replace(/<details id="capture-panel"[\s\S]*?<\/details>/,'').replace(/<aside id="capture-controls"[\s\S]*?<\/aside>/,'');
 if(game.id==='tiny-delivery')html=html.replace(/href="\/"/g,`data-portal-back href="/${locale}/"`).replace('aria-label="Tinlumo Review"','aria-label="Tinlumo"').replace('data-ja="Reviewへ" data-en="Back to review"','data-ja="遊び方へ" data-en="How to play"');
 if(game.id==='light-garden')html=html.replace('href="/portal.html"',`href="/${locale}/"`).replace('href="/index.html"',`href="/${locale}/games/light-garden/"`).replace('>Review</a>',`>${locale==='ja'?'遊び方':'How to play'}</a>`).replace('</head>','<style>body{min-width:0}@media(max-width:680px){.title-copy h1 br{display:block}.title-copy h1 em{margin-left:0}}</style></head>');
 if(game.id==='two-ways-home')html=html.replace('href="../portal.html"',`href="/${locale}/"`).replace('href="../index.html"',`href="/${locale}/games/two-ways-home/"`).replace('>Reviewへ</a>',`>${locale==='ja'?'遊び方':'How to play'}</a>`);
 if(game.id==='light-garden'){
  const copy={'title-kicker':['ひかりを育てる、小さな温室','A LITTLE CONSERVATORY OF LIGHT'],'title-jp':['ひかりの仕掛け庭',''],'title-description':['鏡をひとつ回す。光がめぐり、花がひらく。心をほどく、18の小さなパズル。','Turn a mirror. Let the light wander. Bring a little garden into bloom.'],'continue':['はじめる →','Begin growing →'],'title-levels':['温室を選ぶ','Explore gardens'],'title-note':['ゆっくり、ひとすじずつ。 • ダウンロード不要','One little ray at a time. • Play in your browser'],'footer-copy':['小さなゲーム。少し明るい一日。','Little games. A brighter day.'],'language':['EN','日本語']};
  for(const [id,values]of Object.entries(copy))html=html.replace(new RegExp('(id="'+id+'"[^>]*>)[^<]*'),'$1'+values[locale==='ja'?0:1]);
 }
 if(game.id==='project-magnet')html=html.replace(/href="(?:\/index\.html|\.\.\/index\.html)[^"]*"/g,`href="/${locale}/games/project-magnet/"`).replace('aria-label="Open review pack"',`aria-label="${locale==='ja'?'遊び方へ':'How to play'}"`);
 html=html.replace('</body>',`<noscript><p>${locale==='ja'?'遊ぶにはJavaScriptを有効にしてください。':'Enable JavaScript to play.'} <a href="/${locale}/games/${game.slug}/">${locale==='ja'?'遊び方へ戻る':'Back to details'}</a></p></noscript></body>`);
 return html;
}

