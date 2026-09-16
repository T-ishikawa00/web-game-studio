import {createAnalytics} from '../lib/analytics';
const events=createAnalytics(),locale=document.documentElement.lang==='ja'?'ja':'en';
try{if(!sessionStorage.getItem('wgs:session:v1')){events.emit({name:'portal_session_start',locale});sessionStorage.setItem('wgs:session:v1','started');}}catch{events.emit({name:'portal_session_start',locale,result:'storage-unavailable'});}
document.addEventListener('click',e=>{const a=e.target instanceof Element?e.target.closest<HTMLAnchorElement>('a[data-event]'):null;const name=a?.dataset.event;if(name==='language_change'||name==='game_card_open'||name==='related_game_open')events.emit({name,locale,gameId:a?.dataset.game});});
