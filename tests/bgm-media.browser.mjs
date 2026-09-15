import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {levelsByGame} from '../src/prototypes/levels';
import {initialBoard} from '../src/prototypes/state';
import {launch,setup} from './bgm-helpers.mjs';
const out='docs/qa/tiny-bgm-pilot-01',raw='.tmp/bgm-video';await mkdir(out+'/videos',{recursive:true});await mkdir(raw,{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe',ff=args=>new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let err='';p.stderr.on('data',d=>err+=d);p.on('error',reject);p.on('exit',c=>c===0?resolve():reject(Error(err)));});
const answers=JSON.parse(await readFile('src/prototypes/delivery-answers-r2.json','utf8')),browser=await launch(),records=[];
try{for(const direction of ['C','D1','D2'])for(const id of ['D01','D12','D18']){
 const u=await setup(browser,{recordVideo:{dir:raw,size:{width:1440,height:1600}}}),began=Date.now();
 await u.c.addInitScript(()=>{
  localStorage.setItem('wgs:audio:tiny-delivery',JSON.stringify({version:1,mute:false,gain:.35}));localStorage.removeItem('wgs:music-pilot:tiny-delivery');sessionStorage.removeItem('wgs:bgm-condition');
  const Native=window.AudioContext,connect=AudioNode.prototype.connect,taps=new Map();let mix,output,recorder,started,chunks=[];
  AudioNode.prototype.connect=function(destination,...args){if(destination===this.context.destination&&this.context!==mix){
   if(!mix){mix=new Native({sampleRate:48000});output=mix.createMediaStreamDestination();recorder=new MediaRecorder(output.stream,{mimeType:'audio/webm;codecs=opus'});recorder.ondataavailable=e=>chunks.push(e.data);started=Date.now();recorder.start();void mix.resume();window.__bgmCapture={finish:()=>new Promise(resolve=>{recorder.onstop=async()=>{const data=new Uint8Array(await new Blob(chunks).arrayBuffer());let str='';for(const byte of data)str+=String.fromCharCode(byte);resolve({started,contexts:taps.size,base64:btoa(str)});};recorder.stop();})};}
   let tap=taps.get(this.context);if(!tap){tap=this.context.createMediaStreamDestination();taps.set(this.context,tap);const source=mix.createMediaStreamSource(tap.stream);connect.call(source,output);}connect.call(this,tap);
  }return connect.call(this,destination,...args);};
 });
 await u.open(direction);await u.level(id);await u.p.evaluate(()=>scrollTo(0,0));const box=await u.f.locator('[data-capture-frame]').boundingBox(),start=(Date.now()-began)/1000,wall=Date.now(),actions=[];
 const answer=answers.find(a=>a.id===id),level=levelsByGame['tiny-delivery'].find(l=>l.id===id),board=initialBoard(level),plan=[];let time=700;
 for(let i=0;i<answer.solution.arrows.length;i++){const choices=level.allowedDirections?.[i]??[0,1,2,3];let guard=0;while(board.arrows[i]!==answer.solution.arrows[i]){assert.ok(++guard<=4);plan.push({ms:time,action:'arrow:'+i});time+=650;board.arrows[i]=choices[(choices.indexOf(board.arrows[i])+1)%choices.length];}}
 for(let i=0;i<(answer.solution.waits??[answer.solution.wait]).length;i++){const n=(answer.solution.waits??[answer.solution.wait])[i];if(n){plan.push({ms:time,action:'clock:'+i});plan.push({ms:time+180,wait:n});time+=850;}}
 plan.push({ms:time,action:'go'});
 for(const step of plan){await u.p.waitForTimeout(Math.max(0,wall+step.ms-Date.now()));const actual=Date.now()-wall;if(step.action)await u.a(step.action).click();else await u.f.locator('[data-wait-value="'+step.wait+'"]').click();actions.push({...step,actualMs:actual});}
 const durationMs=time+answer.intermediate.at(-1).after*600+1400;await u.p.waitForTimeout(Math.max(0,wall+durationMs-Date.now()));const state=await u.state();assert.equal(state.won,true);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);
 const music=await u.music(),craft=await u.craft(),tap=await u.f.locator('body').evaluate(()=>window.__bgmCapture.finish()),source=await u.p.video().path();await u.c.close();const audioPath=raw+'/'+direction+'-'+id+'.webm';await writeFile(audioPath,Buffer.from(tap.base64,'base64'));
 const offset=(tap.started-began)/1000-start,video=direction+'-'+id+'.webm';await ff(['-y','-hide_banner','-ss',String(start),'-i',source,'-itsoffset',String(offset),'-i',audioPath,'-map','0:v:0','-map','1:a:0','-c:a','copy','-t',String(durationMs/1000),'-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-c:v','libvpx','-b:v','1000k',out+'/videos/'+video]);
 records.push({direction,id,video:'videos/'+video,plan,actions,maxDispatchLatenessMs:Math.max(...actions.map(a=>a.actualMs-a.ms)),viewport:{width:1440,height:1600},capture:{width:Math.round(box.width),height:Math.round(box.height)},sfx:{gain:.35,mute:false},musicGain:.18,initialBoard:initialBoard(level),result:state.run,craft,music,audioContextsCaptured:tap.contexts,durationSeconds:durationMs/1000,offset,recording:'Actual Edge gameplay + MediaRecorder tap of actual SFX and Music output graphs, merged live through capture-only AudioContext. Wall-clock mux; no reconstructed/post-dub sound. Physical/perceptual sync and listening remain Human PENDING.'});console.log('Captured',direction,id,tap.contexts,'output graphs');
}}finally{await browser.close();await writeFile(out+'/media.json',JSON.stringify(records,null,2)+'\n');}
for(const id of ['D01','D12','D18']){const set=records.filter(r=>r.id===id);for(const row of set.slice(1)){assert.deepEqual(row.plan,set[0].plan);assert.deepEqual(row.initialBoard,set[0].initialBoard);assert.deepEqual(row.result,set[0].result);assert.deepEqual(row.craft.audio.counts.byEvent,set[0].craft.audio.counts.byEvent);}}
console.log('All comparison schedules, initial/final states and SFX event counts match.');
