import {crest} from './visual-language';

// 60-unit Object Design masters: one material family, no owned game state.
const ink='#172533', silver='#E5EDF1', shade='#A9BFCC', white='#F9FCFF', blue='#4F8BA5', glass='#B5E4F3', amber='#FFCC4D';
const emblem=(id:string)=>`<g class="device-crest" transform="translate(-18 -18)"><path d="M-7-7H7V3L3 7H-7Z" fill="${silver}" stroke="${ink}" stroke-width="2"/>${crest(id,0,0,4.5)}</g>`;
// A hooked bar bridges the lower housing when shut, swings off it when released.
// Its position, not a check icon or colour, carries the persistent state.
const clasp=(on:boolean)=>`<g class="activation-latch device-clasp" data-latched="${on}"><path d="M16 15h9v10h-9Z" fill="${shade}" stroke="${ink}" stroke-width="2"/><path class="clasp-arm" d="M7 16v5h13" transform="rotate(${on?68:0} 20 21)" fill="none" stroke="${ink}" stroke-width="6" stroke-linejoin="round"/><path d="M7 16v5h13" transform="rotate(${on?68:0} 20 21)" fill="none" stroke="${amber}" stroke-width="3" stroke-linejoin="round"/></g>`;

export function mirrorArt(slash:boolean,receiving:boolean){
 return `<span class="mirror object-mirror ${slash?'slash':''}"><svg viewBox="-30 -30 60 60" aria-hidden="true"><circle r="22" fill="none" stroke="${ink}" stroke-width="6"/><circle r="22" fill="none" stroke="${silver}" stroke-width="3"/><path d="M-21-6A22 22 0 0 1-6-21" fill="none" stroke="${white}" stroke-width="2"/><circle r="6" fill="${blue}" stroke="${ink}" stroke-width="2"/><g class="rotation-cue" fill="none" stroke="${ink}" stroke-width="2.5"><path d="M-20-16A26 26 0 0 1-5-26m-5-3 5 3-4 4M20 16A26 26 0 0 1 5 26m5 3-5-3 4-4"/></g><g transform="rotate(${slash?-45:45})"><path d="M-20 0H20" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><path d="M-19 0H19" stroke="${white}" stroke-width="4" stroke-linecap="round"/><path d="M-15-2H15M-15 2H15" stroke="${glass}" stroke-width="1"/></g>${receiving?`<circle class="mirror-contact" r="3" fill="${amber}" stroke="#7B4900" stroke-width="1"/>`:''}</svg></span>`;
}

export function receiverArt(x:number,y:number,id:string,receiving:boolean,activated:boolean){
 return `<g class="switch receiver ${receiving?'receiving':''}" data-receiving="${receiving}" data-activated="${activated}" transform="translate(${x} ${y})"><path d="M-18-12-12-21H12L21-12V12L12 21H-12L-21 12V-12Z" fill="${silver}" stroke="${ink}" stroke-width="2.5"/><path d="M-17 12-10 18H10L18 10" fill="none" stroke="${shade}" stroke-width="4"/><path d="M-17-10-10-18H10" fill="none" stroke="${white}" stroke-width="2"/><circle class="receiver-lens" r="13" fill="${receiving?amber:blue}" stroke="${ink}" stroke-width="2.5"/>${receiving?`<path class="lens-live" d="M-12 0-4-3 0-12 3-4 12 0 4 3 0 12-3 4Z" fill="#FFF9DD"/>`:`<path class="lens-rest" d="M-8-3a9 9 0 0 1 11-5" fill="none" stroke="${glass}" stroke-width="3"/>`}<path d="M-25 0h10M15 0h10M0-25v10M0 15v10" stroke="${receiving?amber:blue}" stroke-width="${receiving?3:2}"/>${emblem(id)}${clasp(activated)}</g>`;
}

export function gateArt(x:number,y:number,open:boolean,id:string){
 // Four sliding leaves; larger retained plates stay clear of both light axes.
 // The dedicated drawing adapter uses these same endpoints, at LG-C's timing.
 const corners=[[-1,-1],[1,-1],[-1,1],[1,1]];
 const housing=corners.map(([dx,dy])=>`<path d="M${dx!*14} ${dy!*25}H${dx!*25}V${dy!*14}H${dx!*21}V${dy!*21}H${dx!*14}Z" fill="${silver}" stroke="${ink}" stroke-width="2"/>`).join('');
 const leaves=corners.map(([dx,dy])=>`<g class="shutter-leaf" data-shutter-x="${dx}" data-shutter-y="${dy}" transform="${open?`translate(${dx!*13} ${dy!*13}) scale(.4)`:'translate(0 0)'}"><path d="M0 0H${dx!*18}V${dy!*18}H0Z" fill="${dx===dy?silver:shade}" stroke="${ink}" stroke-width="2"/><path d="M${dx!*3} ${dy!*15}V${dy!*3}H${dx!*15}" fill="none" stroke="${white}" stroke-width="2"/></g>`).join('');
 return `<g class="gate object-gate ${open?'open':''}" data-open="${open}" transform="translate(${x} ${y})">${housing}${leaves}${emblem(id)}${clasp(open)}</g>`;
}

export function lamp(x:number,y:number,d:number){
 return `<g class="lamp object-source" transform="translate(${x} ${y}) rotate(${d*90})"><path d="M-15 22H15L19 16V-5L12-15H-12L-19-5V16Z" fill="${silver}" stroke="${ink}" stroke-width="2.5"/><path d="M-13 18H12L15 14V0" fill="none" stroke="${shade}" stroke-width="4"/><path d="M-15 8V-4L-10-11" fill="none" stroke="${white}" stroke-width="2"/><path d="M-10-10-13-22H13L10-10Z" fill="${blue}" stroke="${ink}" stroke-width="2.5"/><path class="source-aperture" d="M-10-22H10" stroke="${amber}" stroke-width="4"/><path d="M0-23V-30" stroke="${amber}" stroke-width="3"/><path d="M-7 9V0H7V9Z" fill="${glass}" stroke="${ink}" stroke-width="2"/></g>`;
}

export function splitter(x:number,y:number,input:number,outputs:number[]){
 const inlet=(input+2)%4;
 const port=(d:number,enter:boolean)=>`<g class="optical-port" data-enter="${enter}" transform="rotate(${d*90})"><path d="${enter?'M-11-26H11L6-12H-6Z':'M-8-12H8L5-26H-5Z'}" fill="${blue}" stroke="${ink}" stroke-width="2"/><path d="M${enter?-9:-4}-26H${enter?9:4}" stroke="${glass}" stroke-width="3"/><path d="${enter?'M0-26v12m-3-4 3 4 3-4':'M0-12v-14m-3 4 3-4 3 4'}" fill="none" stroke="${white}" stroke-width="2"/></g>`;
 return `<g class="splitter object-splitter" data-inlet="${inlet}" transform="translate(${x} ${y})"><path d="M-17-11-11-17H11L17-11V11L11 17H-11L-17 11Z" fill="${silver}" stroke="${ink}" stroke-width="2.5"/>${outputs.map(d=>port(d,false)).join('')}${port(inlet,true)}<path d="M-9 8 0-9 9 8Z" fill="${glass}" stroke="${ink}" stroke-width="2"/><path d="M-5 5 0-4" stroke="${white}" stroke-width="2"/></g>`;
}
