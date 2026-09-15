// Original, locally authored BGM candidates. No samples, external service or copied composition.
export type MusicDirection='D1'|'D2';
export type Instrument='pluck'|'pulse'|'brush'|'mallet'|'pad';
export interface Note{beat:number;midi:number;length:number;velocity:number;instrument:Instrument;pan:number}
export function musicScore(direction:MusicDirection){
 const bpm=direction==='D1'?80:64,bars=32,notes:Note[]=[];
 const add=(bar:number,beat:number,midi:number,length:number,velocity:number,instrument:Instrument,pan=0)=>notes.push({beat:bar*4+beat,midi,length,velocity,instrument,pan});
 if(direction==='D1'){
  // Four eight-bar phrases: question / reply / slightly raised bridge / return.
  const chords=[[48,55,59,64],[45,52,55,60],[41,48,52,57],[43,50,57,62]];
  const motifs=[[76,79,74,72],[72,76,79,76],[77,81,76,74],[74,79,76,72]];
  for(let bar=0;bar<bars;bar++){
   const section=Math.floor(bar/8),phrase=bar%8,c=chords[Math.floor(phrase/2)]!;
   if(phrase===7||bar===15)continue; // A complete breathing bar, not a mechanical short ostinato.
   add(bar,0,c[0]!,1.3,.27,'pulse',-.08);
   if(phrase%2===0)add(bar,2.5,c[1]!,.65,.12,'pulse',.08);
   const m=motifs[section]!;const index=phrase%4;
   if(phrase!==3){add(bar,.5,m[index]!+(section===2&&phrase===4?0:-12),.65,.28,'pluck',-.22);if(phrase%2===0)add(bar,2.75,m[(index+1)%4]! -12,.52,.19,'pluck',.24);}
   if(phrase===4||phrase===6)add(bar,1.75,c[2]!+12,.35,.13,'pluck',.1);
   if(phrase<6){add(bar,1,42,.10,.055,'brush',-.3);if(phrase%2===0)add(bar,3.25,47,.075,.045,'brush',.3);}
  }
 }else{
  // Sparse, slow workshop harmony; no pulse bass or repeating drum grid.
  const harmony=[[48,55,62,64],[50,57,60,64],[41,48,57,60],[48,55,59,62],[52,59,62,67],[41,48,55,57],[43,50,57,60],[48,55,62,64]];
  const melody=[[72,79,76],[74,69,76],[72,77,69],[79,74,71],[76,83,79],[77,72,69],[74,79,72],[76,74,72]];
  for(let phrase=0;phrase<8;phrase++){
   const bar=phrase*4,c=harmony[phrase]!,m=melody[phrase]!;
   for(let n=0;n<3;n++)add(bar,1.1+n*.12,c[n]!,5.3,.073,'pad',(n-1)*.26);
   add(bar,.5,m[0]!,1.3,.26,'mallet',-.25);
   add(bar+1,2.25,m[1]!,1.1,.18,'mallet',.28);
   if(phrase!==2&&phrase!==5)add(bar+2,1.5,m[2]!,1.6,.22,'mallet',.04);
   // Fourth bar is space; the final C phrase resolves well before the seam.
  }
 }
 return {direction,bpm,bars,seconds:bars*4*60/bpm,notes};
}
export function renderMusic(direction:MusicDirection,sampleRate=32000,options?:{score:ReturnType<typeof musicScore>;noteBpm?:number;normalization?:number}){
 const score=options?.score??musicScore(direction),length=Math.round(score.seconds*sampleRate),left=new Float32Array(length),right=new Float32Array(length);
 let seed=direction==='D1'?2718:3141;const noise=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2147483648-1;};
 for(const note of score.notes){
  const start=Math.round(note.beat*60/score.bpm*sampleRate),seconds=note.length*60/(options?.noteBpm??score.bpm),f=440*2**((note.midi-69)/12),count=Math.ceil(seconds*sampleRate),lp=Math.sqrt((1-note.pan)/2),rp=Math.sqrt((1+note.pan)/2);let filtered=0;
  for(let i=0;i<count;i++){
   const t=i/sampleRate,x=i/count,edge=Math.min(1,t/.008)*Math.min(1,(seconds-t)/.035),p=2*Math.PI*f*t;let signal=0;
   if(note.instrument==='pluck')signal=(Math.sin(p)*Math.exp(-t*7)+.32*Math.sin(p*2.003)*Math.exp(-t*15)+.12*Math.sin(p*3.98)*Math.exp(-t*25)+.055*noise()*Math.exp(-t*90))*edge;
   if(note.instrument==='pulse')signal=(Math.sin(p)+.10*Math.sin(3*p))*Math.sin(Math.PI*Math.min(1,t/.03)/2)*Math.exp(-t*4.5)*edge;
   if(note.instrument==='brush'){filtered=.6*filtered+.4*noise();signal=(filtered*.75+Math.sin(p)*.25)*Math.exp(-t*48)*edge;}
   if(note.instrument==='mallet')signal=(Math.sin(p)*Math.exp(-t*3.2)+.22*Math.sin(p*2.756)*Math.exp(-t*8)+.075*Math.sin(p*5.404)*Math.exp(-t*14))*edge;
   if(note.instrument==='pad')signal=(Math.sin(p)+.12*Math.sin(p*2.001)+.045*Math.sin(p*3))*Math.sin(Math.PI*x)**2*(.94+.06*Math.cos(t*2.3))*edge;
   const j=(start+i)%length,value=signal*note.velocity;left[j]!+=value*lp;right[j]!+=value*rp;
  }
 }
 let sum=0,peak=0;for(let i=0;i<length;i++){sum+=left[i]!**2+right[i]!**2;peak=Math.max(peak,Math.abs(left[i]!),Math.abs(right[i]!));}
 // Defaults cap peak; fixed-normalization comparisons retain reference gain and report actual peak/RMS.
 const scale=options?.normalization??Math.min(.070/Math.sqrt(sum/(length*2)),.25/peak);for(let i=0;i<length;i++){left[i]!*=scale;right[i]!*=scale;}
 return {score,sampleRate,left,right,normalization:scale};
}
