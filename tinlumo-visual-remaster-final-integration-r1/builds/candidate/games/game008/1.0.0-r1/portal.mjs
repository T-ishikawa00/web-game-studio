import {growth} from '/assets/growth-client.js';
import {installCoilhopObserver} from './observe.mjs';
const iframe=document.getElementById('standalone-game');
let dispose=()=>{};
function connect(){
 dispose();try{
  const doc=iframe.contentDocument;
  dispose=installCoilhopObserver(doc,(name,detail)=>growth.emit(name,detail));
  const sync=()=>{const lang=doc.documentElement.lang==='en'?'en':'ja';doc.querySelector('.brand').href='/'+lang+'/games/';doc.querySelector('.brand').target='_top';};
  sync();doc.getElementById('languageButton')?.addEventListener('click',sync);
 }catch{/* Measurement and optional navigation sync never block play. */}
}
iframe.addEventListener('load',connect);
if(iframe.contentDocument?.getElementById('gameFrame'))connect();
addEventListener('pagehide',()=>dispose());
addEventListener('pageshow',e=>{if(e.persisted)connect();});
