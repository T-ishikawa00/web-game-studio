export type TwMusicCondition='C'|'D1'|'D2';
export interface TwMusicPreferences{version:1;enabled:boolean;direction:'D1'|'D2';gain:number}
export const twMusicKey='wgs:music-pilot:two-ways-home';
export function validTwMusic(v:unknown):v is TwMusicPreferences{if(!v||typeof v!=='object'||Array.isArray(v))return false;const p=v as Record<string,unknown>;return Object.keys(p).sort().join(',')==='direction,enabled,gain,version'&&p.version===1&&typeof p.enabled==='boolean'&&(p.direction==='D1'||p.direction==='D2')&&typeof p.gain==='number'&&Number.isFinite(p.gain)&&p.gain>=0&&p.gain<=.4;}
export function createTwMusic(condition:TwMusicCondition,allowed:()=>boolean){
 let prefs:TwMusicPreferences={version:1,enabled:condition!=='C',direction:condition==='D2'?'D2':'D1',gain:.18},writable=true,storageFailed=false;
 try{const raw=localStorage.getItem(twMusicKey);if(raw!==null){const parsed:unknown=JSON.parse(raw);if(!validTwMusic(parsed))throw Error();prefs=parsed;}}catch{writable=false;storageFailed=true;}
 let repeat=false;try{repeat=sessionStorage.getItem('wgs:tw-bgm-condition')===condition;sessionStorage.setItem('wgs:tw-bgm-condition',condition);}catch{}
 if(!repeat||condition==='C')prefs={...prefs,enabled:condition!=='C',direction:condition==='D2'?'D2':'D1'};
 let ctx:AudioContext|undefined,buffer:AudioBuffer|undefined,bufferDirection='',pending=false,generation=0,available=true,offset=0,disposed=false,request:AbortController|undefined;
 type Voice={source:AudioBufferSourceNode;gain:GainNode;started:number;offset:number};let voice:Voice|undefined,retiring=Promise.resolve(),suspendTimer:ReturnType<typeof setTimeout>|undefined;
 const sources=new Set<AudioBufferSourceNode>(),counts={starts:0,stops:0,failures:0,maxVoices:0,staleDropped:0,ducks:0},timeline:{start:number;offset:number;duration:number;direction:string}[]=[];
 function halt(suspend=true){generation++;pending=false;request?.abort();request=undefined;clearTimeout(suspendTimer);
  if(voice&&ctx){const old=voice;voice=undefined;offset=(old.offset+Math.max(0,ctx.currentTime-old.started))%(buffer?.duration??1);counts.stops++;
   retiring=new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;sources.delete(old.source);try{old.source.disconnect();old.gain.disconnect();}catch{}resolve();};old.source.onended=finish;try{const now=ctx!.currentTime;old.gain.gain.cancelAndHoldAtTime(now);old.gain.gain.linearRampToValueAtTime(0,now+.025);old.source.stop(now+.03);}catch{finish();}});
  }
  if(suspend&&ctx){const token=generation;suspendTimer=setTimeout(()=>{if(token===generation&&!voice&&!pending)void ctx?.suspend().catch(()=>{});},45);}
 }
 async function start(event:Event){if(condition==='C'||!event.isTrusted||disposed||!prefs.enabled||prefs.gain===0||!allowed()||voice||pending)return;
  const token=++generation,direction=prefs.direction;pending=true;clearTimeout(suspendTimer);const current=()=>token===generation&&!disposed&&prefs.enabled&&prefs.direction===direction&&prefs.gain>0&&allowed();let source:AudioBufferSourceNode|undefined,gain:GainNode|undefined;
  try{ctx??=new AudioContext({latencyHint:'playback'});await ctx.resume();if(!current()){counts.staleDropped++;return;}
   if(!buffer||bufferDirection!==direction){request=new AbortController();const response=await fetch('/tw-bgm-audio/'+direction+'.wav',{signal:request.signal});if(!response.ok)throw Error();const bytes=await response.arrayBuffer();if(!current()){counts.staleDropped++;return;}const decoded=await ctx.decodeAudioData(bytes);if(!current()){counts.staleDropped++;return;}buffer=decoded;bufferDirection=direction;offset=0;request=undefined;}
   await retiring;if(!current()){counts.staleDropped++;return;}source=ctx.createBufferSource();gain=ctx.createGain();source.buffer=buffer!;source.loop=true;source.loopEnd=buffer!.duration;const now=ctx.currentTime;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(prefs.gain,now+.20);source.connect(gain);gain.connect(ctx.destination);const next={source,gain,started:now,offset};source.onended=()=>{if(voice===next)voice=undefined;sources.delete(next.source);next.source.disconnect();next.gain.disconnect();};source.start(now,offset);voice=next;sources.add(source);source=undefined;gain=undefined;available=true;counts.starts++;counts.maxVoices=Math.max(counts.maxVoices,sources.size);timeline.push({start:now,offset,duration:buffer!.duration,direction});if(timeline.length>40)timeline.shift();
  }catch{try{source?.stop();}catch{}try{source?.disconnect();gain?.disconnect();}catch{}if(token===generation){available=false;counts.failures++;}}
  finally{if(token===generation)pending=false;else if(!voice&&!pending&&ctx?.state==='running')void ctx.suspend().catch(()=>{});}
 }
 function set(next:TwMusicPreferences){if(condition==='C'||!validTwMusic(next))return;halt();if(next.direction!==prefs.direction)offset=0;prefs={...next};if(!writable){storageFailed=true;return;}try{const raw=JSON.stringify(prefs);localStorage.setItem(twMusicKey,raw);if(localStorage.getItem(twMusicKey)!==raw)throw Error();storageFailed=false;}catch{storageFailed=true;}}
 function duck(){if(!voice||!ctx)return;counts.ducks++;const now=ctx.currentTime;voice.gain.gain.cancelAndHoldAtTime(now);voice.gain.gain.linearRampToValueAtTime(prefs.gain*.28,now+.008);voice.gain.gain.setValueAtTime(prefs.gain*.28,now+.13);voice.gain.gain.linearRampToValueAtTime(prefs.gain,now+.32);}
 return {start,halt,set,duck,dispose:()=>{disposed=true;halt();},get preferences(){return {...prefs};},get storageFailed(){return storageFailed;},snapshot:()=>({condition,preferences:{...prefs},storageFailed,available,pending,playing:!!voice,activeSources:sources.size,context:ctx?.state??'uninitialized',contextTime:ctx?.currentTime??0,decodedBytes:buffer?buffer.length*buffer.numberOfChannels*4:0,counts:{...counts},timeline:[...timeline]})};
}
