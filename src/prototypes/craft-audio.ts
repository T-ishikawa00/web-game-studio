import {synthesize,type SoundId} from './craft-sound';
export const audioKey='wgs:audio:tiny-delivery';
export interface AudioPreferences{version:1;mute:boolean;gain:number}
export function validAudio(value:unknown):value is AudioPreferences{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const v=value as Record<string,unknown>;
 return Object.keys(v).sort().join(',')==='gain,mute,version'&&v.version===1&&typeof v.mute==='boolean'&&typeof v.gain==='number'&&Number.isFinite(v.gain)&&v.gain>=0&&v.gain<=1;
}
export function createCraftAudio(){
 let preferences:AudioPreferences={version:1,mute:false,gain:.35},writable=true,storageFailed=false,context:AudioContext|undefined,epoch=0,available=true,resumeRequest=0,wantsRunning=false;
 try{const raw=localStorage.getItem(audioKey);if(raw!==null){const v:unknown=JSON.parse(raw);if(!validAudio(v))throw Error('Invalid audio preference');preferences=v;}}catch{preferences={version:1,mute:false,gain:.2};writable=false;storageFailed=true;}
 const voices=new Set<{source:AudioBufferSourceNode;gain:GainNode;priority:number}>(),buffers=new Map<string,AudioBuffer>(),last=new Map<SoundId,number>();
 const counts={played:0,dropped:0,cancelled:0,failures:0,maxVoices:0,byEvent:{} as Partial<Record<SoundId,number>>};
 function retire(v:{source:AudioBufferSourceNode;gain:GainNode}){try{v.source.disconnect();}catch{}try{v.gain.disconnect();}catch{}}
 function cancel(suspend=false){
  epoch++;wantsRunning=false;last.clear();
  for(const v of voices){try{const now=context!.currentTime;v.gain.gain.cancelScheduledValues(now);v.gain.gain.setValueAtTime(v.gain.gain.value,now);v.gain.gain.linearRampToValueAtTime(0,now+.008);v.source.stop(now+.009);}catch{retire(v);}counts.cancelled++;}
  if(suspend&&context&&context.state!=='closed'){for(const v of voices){try{v.source.stop();}catch{}retire(v);}voices.clear();void context.suspend().catch(()=>{counts.failures++;});}
 }
 function unlock(event:Event){
  if(!event.isTrusted||document.hidden||preferences.mute)return;
  const request=++resumeRequest;wantsRunning=true;
  try{
   context??=new AudioContext({latencyHint:'interactive'});
   if(context.state==='suspended'||(context.state as string)==='interrupted'){
    void context.resume().then(()=>{if(request!==resumeRequest)return;if(!wantsRunning&&context?.state==='running')void context.suspend().catch(()=>{});else available=true;}).catch(()=>{counts.failures++;if(request===resumeRequest)available=false;});
   }else available=true;
  }catch{available=false;counts.failures++;}
 }
 function play(id:SoundId,variant=0,delay=0){
  if(preferences.mute||preferences.gain===0||document.hidden||!context||context.state!=='running'){counts.dropped++;return;}
  const now=context.currentTime;if(now-(last.get(id)??-100)<.045){counts.dropped++;return;}
  const priority=['complete','clear','collision'].includes(id)?2:id==='arrive'?1:0;
  if(voices.size>=3||(priority===0&&voices.size>=2)){counts.dropped++;return;} // Reserve a voice for results; include fades in the hard ceiling.
  let source:AudioBufferSourceNode|undefined,gain:GainNode|undefined,voice:{source:AudioBufferSourceNode;gain:GainNode;priority:number}|undefined;
  try{
   const key=id+':'+variant;let buffer=buffers.get(key);
   if(!buffer){const data=synthesize(id,variant,context.sampleRate);buffer=context.createBuffer(1,data.length,context.sampleRate);buffer.copyToChannel(new Float32Array(data),0);buffers.set(key,buffer);}
   source=context.createBufferSource();gain=context.createGain();source.buffer=buffer;gain.gain.value=preferences.gain*.65;
   source.connect(gain);gain.connect(context.destination);voice={source,gain,priority};voices.add(voice);const startedVoice=voice;source.onended=()=>{voices.delete(startedVoice);retire(startedVoice);};
   source.start(now+delay);available=true;last.set(id,now);counts.played++;counts.byEvent[id]=(counts.byEvent[id]??0)+1;counts.maxVoices=Math.max(counts.maxVoices,voices.size);
  }catch{if(voice)voices.delete(voice);try{source?.disconnect();}catch{}try{gain?.disconnect();}catch{}available=false;counts.failures++;}
 }
 function set(next:Pick<AudioPreferences,'mute'|'gain'>){
  const v={version:1 as const,...next};if(!validAudio(v))return;cancel();preferences=v;
  if(!writable){storageFailed=true;return;}
  try{const serialized=JSON.stringify(v);localStorage.setItem(audioKey,serialized);if(localStorage.getItem(audioKey)!==serialized)throw Error('Readback failed');storageFailed=false;}catch{storageFailed=true;}
 }
 return {unlock,play,cancel,set,get preferences(){return {...preferences};},get storageFailed(){return storageFailed;},get available(){return available;},snapshot:()=>({preferences:{...preferences},storageFailed,available,context:context?.state??'uninitialized',voices:voices.size,epoch,counts:structuredClone(counts)})};
}
