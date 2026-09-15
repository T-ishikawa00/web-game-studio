export type Direction='C'|'D1'|'D2';
export interface MusicPreferences{version:1;enabled:boolean;direction:'D1'|'D2';gain:number}
export const musicKey='wgs:music-pilot:tiny-delivery';
export const validMusic=(v:unknown):v is MusicPreferences=>{
 if(!v||typeof v!=='object'||Array.isArray(v))return false;const p=v as Record<string,unknown>;
 return Object.keys(p).sort().join(',')==='direction,enabled,gain,version'&&p.version===1&&typeof p.enabled==='boolean'&&(p.direction==='D1'||p.direction==='D2')&&typeof p.gain==='number'&&Number.isFinite(p.gain)&&p.gain>=0&&p.gain<=.5;
};
export function createMusicAudio(condition:Direction,allowed:()=>boolean){
 let prefs:MusicPreferences={version:1,enabled:condition!=='C',direction:condition==='D2'?'D2':'D1',gain:.18},writable=true,storageFailed=false;
 try{const raw=localStorage.getItem(musicKey);if(raw!==null){const v:unknown=JSON.parse(raw);if(!validMusic(v))throw Error('Invalid music preferences');prefs=v;}}catch{writable=false;storageFailed=true;}
 // A newly selected comparison condition overrides this visit. Reload of the same
 // condition preserves the user's on/off, direction and gain. C always stays off.
 let repeat=false;try{repeat=sessionStorage.getItem('wgs:bgm-condition')===condition;sessionStorage.setItem('wgs:bgm-condition',condition);}catch{}
 if(!repeat||condition==='C')prefs={...prefs,enabled:condition!=='C',direction:condition==='D2'?'D2':'D1'};
 let ctx:AudioContext|undefined,buffer:AudioBuffer|undefined,bufferDirection='',pending=false,generation=0,available=true,disposed=false;
 let voice:{source:AudioBufferSourceNode;gain:GainNode}|undefined,retiring:Promise<void>=Promise.resolve(),retireFinish:(()=>void)|undefined,suspendTimer:ReturnType<typeof setTimeout>|undefined;
 const sources=new Set<AudioBufferSourceNode>();
 const counts={starts:0,stops:0,failures:0,maxVoices:0,staleStartsDropped:0},timeline:{startedAt:number;direction:string;duration:number}[]=[];
 function halt(suspend=false){
  generation++;pending=false;clearTimeout(suspendTimer);
  if(voice){const old=voice;voice=undefined;counts.stops++;retiring=new Promise(resolve=>{retireFinish=resolve;});
   const finish=()=>{sources.delete(old.source);try{old.source.disconnect();old.gain.disconnect();}catch{}retireFinish?.();retireFinish=undefined;};
   try{const now=ctx!.currentTime;old.gain.gain.cancelAndHoldAtTime(now);old.gain.gain.linearRampToValueAtTime(0,now+.035);old.source.onended=finish;old.source.stop(now+.04);}catch{try{old.source.stop();}catch{}finish();}
  }
  if(suspend&&ctx){const token=generation;suspendTimer=setTimeout(()=>{if(token===generation&&!voice&&!pending)void ctx?.suspend().catch(()=>{counts.failures++;});},60);}
 }
 async function start(event:Event){
  if(condition==='C'||!event.isTrusted||disposed||!prefs.enabled||prefs.gain===0||!allowed()||voice||pending)return;
  const token=++generation,direction=prefs.direction;pending=true;clearTimeout(suspendTimer);
  const current=()=>token===generation&&!disposed&&prefs.enabled&&prefs.direction===direction&&prefs.gain>0&&allowed();
  let partialSource:AudioBufferSourceNode|undefined,partialGain:GainNode|undefined;
  try{
   ctx??=new AudioContext({latencyHint:'playback'});await ctx.resume();
   if(!current()){counts.staleStartsDropped++;return;}
   if(!buffer||bufferDirection!==direction){
    // One decoded direction retained. Loading/decoding never blocks the game's input/render path.
    const response=await fetch('/bgm-audio/'+direction+'.wav');if(!response.ok)throw Error('Music unavailable');const bytes=await response.arrayBuffer();if(!current()){counts.staleStartsDropped++;return;}
    const decoded=await ctx.decodeAudioData(bytes);if(!current()){counts.staleStartsDropped++;return;}buffer=decoded;bufferDirection=direction;
   }
   await retiring;if(!current()){counts.staleStartsDropped++;return;}
   const source=ctx.createBufferSource(),gain=ctx.createGain();partialSource=source;partialGain=gain;source.buffer=buffer!;source.loop=true;source.loopStart=0;source.loopEnd=buffer!.duration;
   const now=ctx.currentTime;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(prefs.gain,now+.12);source.connect(gain);gain.connect(ctx.destination);
   const next={source,gain};source.onended=()=>{if(voice===next)voice=undefined;sources.delete(source);source.disconnect();gain.disconnect();};
   source.start(now,0);voice=next;sources.add(source);partialSource=undefined;partialGain=undefined;counts.starts++;counts.maxVoices=Math.max(counts.maxVoices,sources.size);timeline.push({startedAt:now,direction,duration:buffer!.duration});if(timeline.length>64)timeline.shift();available=true;
  }catch{try{partialSource?.stop();}catch{}try{partialSource?.disconnect();partialGain?.disconnect();}catch{}if(token===generation)available=false;counts.failures++;}
  finally{if(token===generation)pending=false;else if(!voice&&!pending&&ctx?.state==='running')void ctx.suspend().catch(()=>{});}
 }
 function set(next:MusicPreferences){if(condition==='C'||!validMusic(next))return;const restart=next.enabled!==prefs.enabled||next.direction!==prefs.direction||next.gain===0;if(restart)halt();prefs={...next};if(voice&&ctx){const now=ctx.currentTime;voice.gain.gain.cancelAndHoldAtTime(now);voice.gain.gain.linearRampToValueAtTime(prefs.gain,now+.04);}
  if(!writable){storageFailed=true;return;}try{const raw=JSON.stringify(prefs);localStorage.setItem(musicKey,raw);if(localStorage.getItem(musicKey)!==raw)throw Error('Readback');storageFailed=false;}catch{storageFailed=true;}
 }
 function duck(){if(!voice||!ctx)return;const now=ctx.currentTime;voice.gain.gain.cancelAndHoldAtTime(now);voice.gain.gain.linearRampToValueAtTime(prefs.gain*.25,now+.025);voice.gain.gain.linearRampToValueAtTime(prefs.gain,now+.30);}
 function dispose(){disposed=true;halt(true);}
 return {start,halt,set,duck,dispose,get preferences(){return {...prefs};},get storageFailed(){return storageFailed;},snapshot:()=>({preferences:{...prefs},storageFailed,available,pending,playing:!!voice,activeSources:sources.size,context:ctx?.state??'uninitialized',contextTime:ctx?.currentTime??0,decodedBytes:buffer?buffer.length*buffer.numberOfChannels*4:0,counts:{...counts},timeline:[...timeline]})};
}
