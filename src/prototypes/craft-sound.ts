// Editable original: deterministic local synthesis, no recordings, services or samples.
export const soundIds=['arrow','wait','undo','start','arrive','collision','clear','complete'] as const;
export type SoundId=typeof soundIds[number];
export const durations:Record<SoundId,number>={arrow:.075,wait:.095,undo:.13,start:.19,arrive:.22,collision:.16,clear:.39,complete:.62};
export function synthesize(id:SoundId,variant=0,sampleRate=44100):Float32Array{
 const duration=durations[id],data=new Float32Array(Math.ceil(duration*sampleRate));
 let seed=0x71ac+(soundIds.indexOf(id)+1)*103+variant*211,low=0;
 const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2147483648-1;};
 const tone=(t:number,f:number,decay:number)=>Math.sin(2*Math.PI*f*t)*Math.exp(-t/decay);
 for(let i=0;i<data.length;i++){
  const t=i/sampleRate,n=noise();low+=.18*(n-low);const dry=n-low,pitch=variant===1?.83:1;
  let v=0;
  // A filtered impact plus non-harmonic resonances creates a small toy mechanism.
  if(id==='arrow')v=.21*dry*Math.exp(-t/.006)+.21*tone(t,790*pitch,.014)+.07*tone(t,1370*pitch,.009);
  if(id==='wait')v=.12*dry*Math.exp(-t/.009)+.19*tone(t,490,.024)+.075*tone(t,1120,.012);
  if(id==='undo')v=.12*low*Math.exp(-t/.018)+.19*Math.sin(2*Math.PI*(610*t-900*t*t))*Math.exp(-t/.03);
  if(id==='start')v=.1*dry*Math.exp(-t/.011)+.15*tone(t,240,.025)+(t>.045?.15*tone(t-.045,480,.031):0);
  if(id==='arrive')v=.12*low*Math.exp(-t/.025)+.24*tone(t,340*pitch,.035)+.09*tone(t,1030*pitch,.025)+(t>.065?.11*tone(t-.065,680*pitch,.026):0);
  if(id==='collision')v=.21*low*Math.exp(-t/.027)+.25*Math.sin(2*Math.PI*(160*t-180*t*t))*Math.exp(-t/.036)+.035*tone(t,470,.016);
  if(id==='clear'||id==='complete'){
   const notes=id==='clear'?[510,680,850]:[510,680,765,1020],gap=id==='clear'?.07:.105;
   for(let j=0;j<notes.length;j++){const u=t-j*gap;if(u>=0)v+=.16*(1-Math.exp(-u/.003))*(tone(u,notes[j]!*pitch,.052)+.22*tone(u,notes[j]!*2.73*pitch,.027));}
   v+=.075*low*Math.exp(-t/.012);
  }
  const edge=Math.min(1,t/.0018,(duration-t)/.014);
  data[i]=v*Math.max(0,edge);
 }
 return data;
}
