import {launch} from '../src/game';
launch();
const identity=document.querySelector('.identity');if(identity){const a=document.createElement('a');a.className='portal-return';a.href='/'+document.documentElement.lang+'/games/island-connections/';a.setAttribute('aria-label','Tinlumo · 遊び方・ほかの作品 / Details & other games');a.innerHTML=identity.innerHTML;identity.replaceChildren(a);new MutationObserver(()=>{a.href='/'+document.documentElement.lang+'/games/island-connections/';}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
