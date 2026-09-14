// R5 semantic roles. Geometry is in a 60-unit cell; engine owns every position.
export const palettes={
 garden:{background:'#E4F4FF',floor:'#F9FCFF',wall:'#335A6F',actor:'#4EBCF5',accent:'#FFCC4D',ink:'#172533'},
 home:{background:'#E8EEFB',floor:'#FFFFFF',wall:'#465675',actor:'#FF963F',accent:'#46C9D5',ink:'#253145'},
 delivery:{background:'#E8F3F8',floor:'#F8FCFF',wall:'#3A4D66',actor:'#F9B53D',accent:'#678EFA',ink:'#172533'},
};
export const crestText=(id:string)=>id==='A'?'○':'◇';
// Authored English articles are not IDs. Keep the translation source unchanged.
export function visualText(text:string){return text.replace(/(?<![a-zA-Z])A(?![a-zA-Z]| (?:switch|flower|friend|closed|one-beat|separate)\b)/g,'○').replace(/(?<![a-zA-Z])B(?![a-zA-Z])/g,'◇').replaceAll('□','◇');}
export function crest(id:string,x=0,y=0,r=7,color='#172533'){
 return id==='A'?`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="3"/>`:`<path d="M${x} ${y-r-1}l${r+1} ${r+1}-${r+1} ${r+1}-${r+1}-${r+1}Z" fill="none" stroke="${color}" stroke-width="3"/>`;
}
export function arrowArt(d:number,x=0,y=0,scale=1){return `<g transform="translate(${x} ${y}) rotate(${d*90}) scale(${scale})"><path d="M0 14V-13m-10 10L0-13 10-3" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="square"/></g>`;}
export function icon(kind:'flower'|'parcel'|'home'|'tap'|'swipe'){
 const p={flower:'M12 7C2-3-1 13 7 13c-7 10 10 13 10 3 12 2 10-13 0-9C18-2 5-2 12 7Z',parcel:'M3 6h18v15H3ZM3 6l5-4h8l5 4M12 6v6',home:'m2 11 10-9 10 9M5 9v13h14V9',tap:'M10 18V6a2 2 0 0 1 4 0v6l5 1v7l-3 3H9l-5-7 2-2 4 4M4 5 2 3m16 1 2-2',swipe:'M2 12h20m-5-5 5 5-5 5M7 7l-5 5 5 5'}[kind];
 return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="${p}"/></svg>`;
}
