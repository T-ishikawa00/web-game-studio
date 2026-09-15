import test from 'node:test';
import assert from 'node:assert/strict';
import {synthesize,soundIds} from '../../src/prototypes/craft-sound';
import {validAudio,createCraftAudio} from '../../src/prototypes/craft-audio';
test('sound sources have silent edges, finite samples and headroom for three full-volume voices',()=>{
 let max=0;for(const sr of [22050,44100,48000])for(const id of soundIds)for(const variant of [0,1]){const data=synthesize(id,variant,sr);assert.equal(data[0],0);assert.ok(Math.abs(data.at(-1)!)<.001);assert.ok(data.some(x=>Math.abs(x)>.01));for(const v of data){assert.ok(Number.isFinite(v));max=Math.max(max,Math.abs(v));}}
 assert.ok(max*3*.65<1,`maximum mix bound ${max*3*.65}`);
});
test('audio preference validation is separate, strict, and rejects malformed/future settings',()=>{
 assert.ok(validAudio({version:1,mute:true,gain:0}));assert.ok(validAudio({version:1,mute:false,gain:1}));
 for(const v of [null,[],{version:2,mute:false,gain:.3},{version:1,mute:'false',gain:.3},{version:1,mute:false,gain:NaN},{version:1,mute:false,gain:1.1},{version:1,mute:false,gain:-.1},{version:1,mute:false,gain:.3,reducedMotion:false}])assert.equal(validAudio(v),false);
});
test('deferred old resume cannot suspend a later real-input request; rejection and source failure recover cleanly',async()=>{
 const original=new Map(['document','localStorage','AudioContext'].map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));
 const pending:(()=>void)[]=[];let state='suspended',suspends=0,rejectResume=false,throwStart=false,disconnected=0;
 class FakeContext{
  get state(){return state;}currentTime=1;sampleRate=44100;destination={};
  resume(){if(rejectResume)return Promise.reject(Error('Blocked'));return new Promise<void>(resolve=>pending.push(()=>{state='running';resolve();}));}
  suspend(){state='suspended';suspends++;return Promise.resolve();}
  createBuffer(){return {copyToChannel(){}};}
  createBufferSource(){return {buffer:null,onended:null,connect(){},disconnect(){disconnected++;},start(){if(throwStart)throw Error('Source missing');},stop(){}};}
  createGain(){return {gain:{value:1,cancelScheduledValues(){},setValueAtTime(){},linearRampToValueAtTime(){}},connect(){},disconnect(){disconnected++;}};}
 }
 try{
  Object.defineProperty(globalThis,'document',{value:{hidden:false},configurable:true});Object.defineProperty(globalThis,'localStorage',{value:{getItem:()=>null},configurable:true});Object.defineProperty(globalThis,'AudioContext',{value:FakeContext,configurable:true});
  const audio=createCraftAudio(),gesture={isTrusted:true} as Event;
  audio.unlock(gesture);audio.cancel(true);audio.unlock(gesture);assert.equal(pending.length,2);
  pending[1]!();await Promise.resolve();const expected=suspends;pending[0]!();await Promise.resolve();assert.equal(state,'running');assert.equal(suspends,expected);
  state='suspended';audio.unlock(gesture);audio.cancel(true);pending[2]!();await Promise.resolve();assert.equal(state,'suspended','cancelled resume stays suspended without newer input');
  rejectResume=true;audio.unlock(gesture);await Promise.resolve();await Promise.resolve();assert.equal(audio.available,false);
  rejectResume=false;audio.unlock(gesture);pending[3]!();await Promise.resolve();assert.equal(audio.available,true);
  throwStart=true;for(let i=0;i<6;i++)audio.play('arrow');assert.equal(audio.snapshot().voices,0);assert.equal(disconnected,12);assert.equal(audio.available,false);
  throwStart=false;audio.play('clear');assert.equal(audio.snapshot().counts.played,1);assert.equal(audio.available,true);
 }finally{for(const [key,descriptor]of original){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else Reflect.deleteProperty(globalThis,key);}}
});
