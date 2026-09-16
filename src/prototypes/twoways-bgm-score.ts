export type TwMusicDirection='D1'|'D2';
export const TW_MUSIC={D1:{seconds:40,title:'Two little detours',gain:.18},D2:{seconds:48,title:'Windows at dusk',gain:.18}} as const;
// Original local compositions. No sampled instruments, percussion, reverb or game-clock coupling.
export function renderTwMusic(direction:TwMusicDirection,rate=48000){
 const duration=TW_MUSIC[direction].seconds,pcm=new Float32Array(Math.round(duration*rate));
 const note=(time:number,midi:number,length:number,amp:number,kind:'wood'|'air')=>{
  const hz=440*2**((midi-69)/12),samples=Math.round(length*rate),start=Math.round(time*rate);
  for(let n=0;n<samples;n++){const t=n/rate,x=n/(samples-1),envelope=kind==='wood'?(1-Math.exp(-t/0.012))*Math.exp(-t/0.19)*Math.sin(Math.PI*x)**.35:Math.sin(Math.PI*x)**2;
   const wave=kind==='wood'?Math.sin(2*Math.PI*hz*t)+.22*Math.sin(2*Math.PI*hz*2.72*t)*Math.exp(-t*8)+.07*Math.sin(2*Math.PI*hz*4.6*t)*Math.exp(-t*14):.8*Math.sin(2*Math.PI*hz*t)+.13*Math.sin(2*Math.PI*hz*2*t)+.06*Math.sin(2*Math.PI*hz*3*t);
   const index=(start+n)%pcm.length;pcm[index]=pcm[index]!+amp*envelope*wave;
  }
 };
 if(direction==='D1'){
  // Unequal phrases and resting bars leave room for thinking; no metronome/drum layer.
  const phrases=[[60,67,69,64],[57,64,67,62],[53,60,65,64],[55,62,69,67],[60,64,72,69],[57,67,64,62],[53,65,69,67],[55,62,64,60]];
  phrases.forEach((p,i)=>{const start=i*5;note(start+.24,p[0]!-12,1.2,.17,'wood');note(start+.74,p[0]!,0.85,.29,'wood');note(start+1.58,p[1]!,0.72,.19,'wood');if(i%3!==1)note(start+2.36,p[2]!,0.78,.22,'wood');if(i%2===0)note(start+3.24,p[3]!,0.8,.15,'wood');});
 }else{
  const chords=[[48,55,62],[45,52,60],[41,48,57],[43,50,59],[48,55,64],[45,52,62],[41,48,60],[43,50,62]];
  chords.forEach((p,i)=>{const start=i*6;p.forEach((m,j)=>note(start+j*.36,m,6.8,.085/(1+j*.25),'air'));if(i%2===0){note(start+2.05,p[2]!+12,1,.20,'wood');note(start+3.71,p[1]!+12,1.2,.10,'wood');}});
 }
 // Circular notes continue across the seam; remove the tiny constant offset, not the tails.
 let mean=0;for(const v of pcm)mean+=v;mean/=pcm.length;for(let i=0;i<pcm.length;i++)pcm[i]=pcm[i]!-mean;
 return pcm;
}
