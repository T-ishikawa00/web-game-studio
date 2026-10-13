// One projection for drawing, pointer controls and the existing local funnel relay.
export const CONTROLS={stoke:{x:42,y:584,w:196,h:110},finish:{x:252,y:584,w:198,h:110},vent:{x:465,y:584,w:214,h:110}};
export function getLayout(canvas){
 const mobile=(canvas?.clientWidth||720)<540;
 return mobile?{mobile:true,height:1260,controls:{stoke:{x:26,y:888,w:322,h:152},finish:{x:372,y:888,w:322,h:152},vent:{x:26,y:1064,w:668,h:154}}}:{mobile:false,height:720,controls:CONTROLS};
}
export const layoutPoint=(p,canvas)=>({...p,y:p.y*getLayout(canvas).height/720});
export function ventTrack(layout){const box=layout.controls.vent;return layout.mobile?{left:box.x+150,width:box.w-278,y:box.y+77}:{left:box.x+20,width:box.w-40,y:box.y+60};}
export function ventValue(p,layout){const t=ventTrack(layout);return (p.x-t.left)/t.width;}
