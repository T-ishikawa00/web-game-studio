export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function rng(seed){let n=seed>>>0;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
export function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y;const t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t);}
export function rounded(ctx,x,y,w,h,r=12){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
export function circle(ctx,x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
export function text(ctx,value,x,y,size=20,color='#fff',align='left'){const small=(ctx.canvas?.clientWidth||720)<450;const scale=small?(size<16?1.9:1.3):1;ctx.font=`600 ${size*scale}px system-ui,sans-serif`;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(value,x,y);}
