import {crest} from './visual-language';

// Original editable 60-unit Lightwork masters. Fixed devices have corner feet;
// only the mirror has a circular turntable. No game state is owned here.
const ink='#172533', metal='#335A6F', paper='#F9FCFF', glass='#A9E1F5', light='#FFCC4D';
const feet='<path d="M-24-15v-9h9M15-24h9v9M24 15v9h-9M-15 24h-9v-9" fill="none" stroke="#335A6F" stroke-width="3"/>';
const latch=(on:boolean)=>`<g class="activation-latch" data-latched="${on}" transform="translate(18 18)"><rect x="-6" y="-6" width="12" height="12" rx="2" fill="${on?light:paper}" stroke="${ink}" stroke-width="2"/>${on?`<path d="m-3 0 2 2 4-5" fill="none" stroke="${ink}" stroke-width="2"/>`:`<path d="M-2 0h4" stroke="${metal}" stroke-width="2"/>`}</g>`;

export function mirrorArt(slash:boolean,receiving:boolean){
 return `<span class="mirror object-mirror ${slash?'slash':''}"><svg viewBox="-30 -30 60 60" aria-hidden="true"><circle r="23" fill="none" stroke="${ink}" stroke-width="3"/><path d="M-19-14A24 24 0 0 1-5-23M19 14A24 24 0 0 1 5 23" fill="none" stroke="#4EBCF5" stroke-width="4"/><path d="m-8-27 5 4-5 3M8 27l-5-4 5-3" fill="none" stroke="${ink}" stroke-width="2.5"/><g transform="rotate(${slash?-45:45})"><path d="M-20 0H20" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><path d="M-19 0H19" stroke="${paper}" stroke-width="3.5" stroke-linecap="round"/><path d="M-15-3H15M-15 3H15" stroke="#4EBCF5" stroke-width="1"/></g>${receiving?`<circle class="mirror-contact" r="3" fill="${light}" stroke="#7B4900" stroke-width="1"/>`:''}</svg></span>`;
}

export function receiverArt(x:number,y:number,id:string,receiving:boolean,activated:boolean){
 return `<g class="switch receiver ${receiving?'receiving':''}" data-receiving="${receiving}" data-activated="${activated}" transform="translate(${x} ${y})">${feet}<path d="M-17-6a18 18 0 0 1 34 0v15l-7 9h-20l-7-9Z" fill="${metal}" stroke="${ink}" stroke-width="2.5"/><circle r="12" fill="${receiving?light:glass}" stroke="${ink}" stroke-width="2.5"/><circle r="6" fill="${receiving?'#FFF5BE':'#4A8197'}"/>${receiving?`<path d="M-26 0h9M17 0h9M0-26v9M0 17v9" stroke="${light}" stroke-width="3"/>`:'<path d="M-25 0h7M18 0h7M0-25v7M0 18v7" stroke="#6D96A8" stroke-width="2"/>'}<g transform="translate(-18 -18)"><rect x="-7" y="-7" width="14" height="14" rx="2" fill="${paper}" stroke="${ink}" stroke-width="2"/>${crest(id,0,0,4.5)}</g>${latch(activated)}</g>`;
}

export function gateArt(x:number,y:number,open:boolean,id:string){
 // Four leaves retract towards the corners: clear passage along BOTH axes.
 const leaves=[[-1,-1],[1,-1],[-1,1],[1,1]].map(([dx,dy])=>`<g class="shutter-leaf" data-shutter-x="${dx}" data-shutter-y="${dy}" transform="${open?`translate(${dx!*15} ${dy!*15}) scale(.23)`:'translate(0 0)'}"><path d="M0 0H${dx!*18}V${dy!*18}H0Z" fill="${metal}" stroke="${ink}" stroke-width="2"/><path d="M${dx!*5} ${dy!*5}H${dx!*13}V${dy!*13}" fill="none" stroke="#7398AC" stroke-width="2"/></g>`).join('');
 return `<g class="gate object-gate ${open?'open':''}" data-open="${open}" transform="translate(${x} ${y})">${feet}${leaves}<g transform="translate(-18 -18)"><rect x="-7" y="-7" width="14" height="14" rx="2" fill="${paper}" stroke="${ink}" stroke-width="2"/>${crest(id,0,0,4.5)}</g>${latch(open)}</g>`;
}

export function lamp(x:number,y:number,d:number){return `<g class="lamp object-source" transform="translate(${x} ${y}) rotate(${d*90})"><path d="M-16 21h32V-9l-5-8h-22l-5 8Z" fill="${metal}" stroke="${ink}" stroke-width="3"/><rect x="-10" y="-20" width="20" height="10" rx="3" fill="${light}" stroke="${ink}" stroke-width="2"/><path d="M-8-25H8M0-20V-29" stroke="${light}" stroke-width="3"/><circle cy="5" r="9" fill="${light}" stroke="${ink}" stroke-width="2"/><path d="M0 10V0m-4 4 4-4 4 4" fill="none" stroke="${ink}" stroke-width="2.5"/><path d="M-22 21h44" stroke="${ink}" stroke-width="3"/></g>`;}

export function splitter(x:number,y:number,input:number,outputs:number[]){
 const inlet=(input+2)%4,port=(d:number,enter:boolean)=>`<g transform="rotate(${d*90})"><path d="M-7-25h14v12H-7Z" fill="${enter?light:glass}" stroke="${ink}" stroke-width="2"/><path d="${enter?'M0-29v17m-4-5 4 5 4-5':'M0-12v-17m-4 5 4-5 4 5'}" fill="none" stroke="${ink}" stroke-width="2"/></g>`;
 return `<g class="splitter object-splitter" data-inlet="${inlet}" transform="translate(${x} ${y})">${feet}<path d="M-13-13H13V13H-13Z" fill="${glass}" stroke="${ink}" stroke-width="3"/>${outputs.map(d=>port(d,false)).join('')}${port(inlet,true)}<path d="M-8 6 0-8 8 6Z" fill="${paper}" stroke="${ink}" stroke-width="2"/></g>`;
}
