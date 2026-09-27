// Presentation-only adapter. Frozen gameplay and persistence remain unchanged.
export function publicCopy(ja:boolean, muted:boolean, paused:boolean, reduced:boolean) {
  const locale=ja?'ja':'en', url=new URL(location.href);
  const play=/^\/(ja|en)\/play\/project-magnet\/$/.test(url.pathname);
  if(play && url.pathname!==`/${locale}/play/project-magnet/`) url.pathname=`/${locale}/play/project-magnet/`;
  if(url.searchParams.has('lang') && url.searchParams.get('lang')!==locale)url.searchParams.set('lang',locale);
  if(!play && !url.searchParams.has('lang'))url.searchParams.set('lang',locale);
  if(url.href!==location.href)history.replaceState(null,'',url);
  const text = (id:string, value:string) => { const el=document.getElementById(id); if(el && el.textContent!==value) el.textContent=value; };
  const label = (id:string, value:string) => { const el=document.getElementById(id); if(el && el.getAttribute('aria-label')!==value){el.setAttribute('aria-label',value);el.setAttribute('title',value);} };
  const link=document.querySelector<HTMLAnchorElement>('.wordmark');
  if(link){link.href=`/index.html?lang=${locale}`;link.setAttribute('aria-label',ja?'Tinlumoの作品紹介に戻る':'Return to Tinlumo game details');}
  document.getElementById('sound')?.setAttribute('aria-pressed',String(muted));
  document.getElementById('motion')?.setAttribute('aria-pressed',String(reduced));
  for(const [selector,value] of [['#move-stick span',ja?'移動':'MOVE'],['#aim-stick span',ja?'吸引 / 照準':'HOLD / AIM'],['#aim-stick small',ja?'離して射出':'RELEASE TO FIRE'],['#run-hud small',ja?'全3作戦':'FULL GAME / 3 OPERATIONS']] as const) { const el=document.querySelector(selector);if(el && el.textContent!==value)el.textContent=value; }
  text('resume',ja?'再開':'RESUME');
  text('sound',ja?`音 ${muted?'OFF':'ON'}`:`SOUND ${muted?'OFF':'ON'}`);
  text('motion',ja?(reduced?'動き 控えめ':'動き 通常'):(reduced?'CALM':'MOTION'));
  label('sound',ja?(muted?'音を出す':'消音'):(muted?'Unmute sound':'Mute sound'));
  label('motion',ja?(reduced?'通常の動きにする':'動きを控える'):(reduced?'Use full motion':'Reduce motion'));
  label('pause',ja?(paused?'再開':'一時停止'):(paused?'Resume':'Pause'));
  label('restart',ja?'作戦を最初からやり直す (R)':'Retry this mission (R)');
  label('language',ja?'Switch to English':'日本語に切り替える');
  label('arena',ja?'WASDまたは矢印で移動。金属の近くで押し続け、狙って離す。タッチは左指で移動、右指で吸引と照準。':'Move with WASD or arrows. Hold near metal, aim, then release. Touch: left thumb moves, right thumb gathers and aims.');
  document.querySelector('header nav')?.setAttribute('aria-label',ja?'ゲーム操作':'Game controls');
  document.getElementById('game')?.setAttribute('aria-label',ja?'PROJECT MAGNET 磁力アクション':'PROJECT MAGNET action arena');
  document.getElementById('choice')?.setAttribute('aria-label',ja?'進化を選ぶ':'Choose an evolution');
  document.getElementById('result')?.setAttribute('aria-label',ja?'作戦の結果':'Mission result');
  const choice=document.querySelector('#choice > small');if(choice)choice.textContent=ja?'区画クリア':'CIRCUIT SECURED';
}
