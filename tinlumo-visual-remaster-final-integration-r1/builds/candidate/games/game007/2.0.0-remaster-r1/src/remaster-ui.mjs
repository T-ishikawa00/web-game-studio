// The portal route is the initial locale authority, including browsers that
// rewrite html.lang before the deferred game module initializes.
const routeLanguage=location.pathname.match(/^\/(ja|en)\//)?.[1];
if(routeLanguage)document.documentElement.lang=routeLanguage;
// Existing controls and their listeners are retained; this only groups mobile settings.
const nav=document.querySelector('.toolbar nav'),button=document.createElement('button'),panel=document.createElement('div');
button.type='button';button.id='remaster-settings';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','remaster-settings-panel');
panel.id='remaster-settings-panel';panel.className='remaster-settings-panel';
for(const id of ['sound','motion','contrast'])panel.append(document.getElementById(id));
document.getElementById('language').after(button,panel);
const close=()=>{panel.classList.remove('open');button.setAttribute('aria-expanded','false');};
button.addEventListener('click',()=>{const open=!panel.classList.contains('open');panel.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));});
document.addEventListener('pointerdown',e=>{if(!panel.contains(e.target)&&e.target!==button)close();});
nav.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open')){close();button.focus();}});
const label=()=>button.textContent=document.documentElement.lang==='ja'?'設定':'Settings';label();
new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
// The game's JA/EN switch owns these strings; avoid browser auto-translation.
document.documentElement.setAttribute('translate','no');
