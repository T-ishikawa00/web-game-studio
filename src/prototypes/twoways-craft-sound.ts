/** Original soft wooden toy resonators. No Tiny/Lightwork samples or recipes. */
export const TW_SOUND_IDS=['step_round','step_mimi','step_pair','rest','home_round','home_mimi','clear','complete','undo'] as const;
export type TwSoundId=typeof TW_SOUND_IDS[number];
export const TW_SOUND_SPECS={
 step_round:{durationMs:110,gain:.34},step_mimi:{durationMs:110,gain:.32},step_pair:{durationMs:120,gain:.30},
 rest:{durationMs:75,gain:.14},home_round:{durationMs:155,gain:.24},home_mimi:{durationMs:155,gain:.24},
 clear:{durationMs:360,gain:.28},complete:{durationMs:480,gain:.28},undo:{durationMs:90,gain:.19},
} as const;
export function synthesizeTwSound(id:TwSoundId,rate=48000){
 const pcm=new Float32Array(Math.ceil(TW_SOUND_SPECS[id].durationMs*rate/1000));
 const hit=(at:number,f:number,level:number,other=false,length=.105)=>{const start=Math.round(at*rate),count=Math.min(Math.round(length*rate),pcm.length-start);for(let j=0;j<count;j++){const t=j/rate,u=j/count,attack=Math.min(1,t/.004),tail=(1-u)**2*Math.exp(-t/(other?.050:.040));const modal=Math.sin(2*Math.PI*f*t)+.23*Math.sin(2*Math.PI*f*(other?2.41:2.76)*t)*Math.exp(-t/.018)+.07*Math.sin(2*Math.PI*f*4.93*t)*Math.exp(-t/.009);pcm[start+j]!+=level*attack*tail*modal;}};
 if(id==='step_round')hit(0,310,.52);
 if(id==='step_mimi')hit(0,415,.48,true);
 if(id==='step_pair'){hit(0,310,.34);hit(0,415,.30,true);}
 if(id==='rest')hit(0,190,.28,false,.065);
 if(id==='home_round')hit(0,392,.48,false,.15);
 if(id==='home_mimi')hit(0,523,.44,true,.15);
 if(id==='clear'||id==='complete'){hit(0,392,.32,false,.15);hit(0,523,.28,true,.15);hit(.095,587,.36,true,.23);if(id==='complete')hit(.24,392,.27,false,.23);}
 if(id==='undo'){hit(0,277,.38,true,.082);hit(.02,208,.10,false,.060);}
 // Exact endpoint and negligible DC without normalization or clipping.
 const mean=pcm.reduce((a,b)=>a+b,0)/pcm.length;for(let j=0;j<pcm.length;j++)pcm[j]!-=mean*Math.sin(Math.PI*j/(pcm.length-1))*Math.PI/2;pcm[0]=0;pcm[pcm.length-1]=0;return pcm;
}
