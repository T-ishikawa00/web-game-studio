import assert from 'node:assert/strict';
export function adaptEntry(source,id){
 let s=source;
 const replace=(a,b)=>{assert(s.includes(a),'Adapter anchor missing: '+id+' / '+a.slice(0,50));s=s.replace(a,b);};
 if(id!=='project-magnet'){
  replace('const params=new URLSearchParams(location.search);',"const params=new URLSearchParams(location.search);if(!params.has('lang'))params.set('lang',/^\\/en\\//.test(location.pathname)?'en':/^\\/ja\\//.test(location.pathname)?'ja':document.documentElement.lang);");
  s=s.replaceAll("params.has('capture')",'false');
  s+=`\n// Restore from the current save when returning to a cached document after an explicit reset.\nlet parkedSave:string|null|undefined;window.addEventListener('pagehide',()=>{try{parkedSave=localStorage.getItem('wgs:save:${id}');}catch{parkedSave=undefined;}});window.addEventListener('pageshow',event=>{if(event.persisted&&parkedSave!==undefined){try{if(localStorage.getItem('wgs:save:${id}')!==parkedSave)location.reload();}catch{location.reload();}}});window.addEventListener('storage',event=>{if((event.key==='wgs:save:${id}'&&event.newValue===null)||event.key===null)location.reload();});\n`;
 }
 if(id==='tiny-delivery'){
  const start=s.indexOf('// Read-only, bounded diagnostics for local review.');const end=s.indexOf('const waits=',start);assert(start>=0&&end>start);s=s.slice(0,start)+s.slice(end);
  replace("if(params.get('entry')==='portal'){","if(true){");
  replace('`portal.html?view=home&lang=${lang}&cover=${cover}`','`/${lang}/games/tiny-delivery/`');
  replace('a[href="/"],a[data-portal-back]','a[href="/"],a[data-portal-back],.brand');
  s+=`\nconst recover=document.createElement('a');recover.href='/'+lang+'/settings/#hakorilo-save';recover.textContent=text('保存の設定・進行の消去','Save settings / erase progress');recover.style.cssText='display:inline-flex;min-height:44px;align-items:center;text-decoration:underline;font-size:12px';$('settings').append(recover);$('language').addEventListener('click',()=>{recover.href='/'+lang+'/settings/#hakorilo-save';recover.textContent=text('保存の設定・進行の消去','Save settings / erase progress');});\n`;
 }
 if(id==='light-garden'){
  replace("'/portal.html?lang='+lang","'/'+lang+'/'");replace("'/index.html?game=lightwork&lang='+lang","'/'+lang+'/games/light-garden/'");
  s+=`\ndocument.querySelector('.review-link')!.textContent=t('遊び方','How to play');$('language').addEventListener('click',()=>{document.querySelector('.review-link')!.textContent=t('遊び方','How to play');});\n`;
 }
 if(id==='two-ways-home'){
  replace('`../portal.html?lang=${lang}`','`/${lang}/`');replace('`../index.html?game=two-ways&lang=${lang}`','`/${lang}/games/two-ways-home/`');replace("t('Reviewへ','Review')","t('遊び方','How to play')");
  for(const action of ['capture','record','stop-record'])replace(`if(action==='${action}')`,`if(false&&action==='${action}')`);
 }
 if(id==='project-magnet'){
  replace('function localize(){',`function localize(){const back=document.querySelector<HTMLAnchorElement>('.wordmark')!;back.href='/'+(ja?'ja':'en')+'/games/project-magnet/';back.setAttribute('aria-label',ja?'遊び方へ':'How to play');`);
  replace("new URLSearchParams(location.search).get('lang')??store.data.settings.locale","new URLSearchParams(location.search).get('lang')??location.pathname.match(/^\\/(ja|en)\\/play\\//)?.[1]??store.data.settings.locale");
  const capture=s.indexOf('const captureMode=');assert(capture>0);s=s.slice(0,capture);
  const perfStart=s.indexOf(' const perf=art.metrics();'),perfEnd=s.indexOf('\n}',perfStart);assert(perfStart>0&&perfEnd>perfStart);s=s.slice(0,perfStart)+s.slice(perfEnd);
 }
 return s;
}
