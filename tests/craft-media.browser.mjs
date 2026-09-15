import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {launch,setup} from './r5-helpers.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const mode=process.argv[2];if(!['A','B','C','C-alt'].includes(mode))throw Error('Select A/B/C/C-alt');
const out=projectPath(path.join(projectRoot,'docs/qa/tiny-craft-pilot-01')),raw=projectPath(path.join(projectRoot,'.tmp/craft-video',mode));
for(const d of [raw,path.join(out,'videos')])await mkdir(d,{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
const ff=args=>new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let err='';p.stderr.on('data',d=>err+=d);p.on('error',reject);p.on('exit',c=>c===0?resolve():reject(Error(err)));});
const answers=JSON.parse(await readFile('src/prototypes/delivery-answers-r2.json','utf8')),browser=await launch(),records=[];
try{for(const id of ['D01','D12','D18']){
 const u=await setup(browser,{recordVideo:{dir:raw,size:{width:1440,height:1600}}}),began=Date.now();
 await u.c.addInitScript(m=>{
  localStorage.setItem('wgs:audio:tiny-delivery',JSON.stringify({version:1,mute:m==='B',gain:0.35}));sessionStorage.setItem('wgs:craft-review-variant',m==='C-alt'?'1':'0');
  if(m.startsWith('C')){
   const Native=window.AudioContext,connect=AudioNode.prototype.connect;
   AudioNode.prototype.connect=function(destination,...args){if(window.__qaTap&&destination===this.context.destination)connect.call(this,window.__qaTap.destination);return connect.call(this,destination,...args);};
   window.AudioContext=class extends Native{constructor(options){super(options);const destination=this.createMediaStreamDestination(),chunks=[],recorder=new MediaRecorder(destination.stream,{mimeType:'audio/webm;codecs=opus'}),started=Date.now();recorder.ondataavailable=e=>chunks.push(e.data);recorder.start();window.__qaTap={destination,finish:()=>new Promise(resolve=>{recorder.onstop=async()=>{const data=new Uint8Array(await new Blob(chunks).arrayBuffer());let raw='';for(const byte of data)raw+=String.fromCharCode(byte);resolve({started,base64:btoa(raw)});};recorder.stop();})};}};
  }
 },mode);
 await u.open('tiny-delivery','portrait','ja');await u.menu('levels');await u.a('level:'+id).click();await u.p.evaluate(()=>scrollTo(0,0));
 const frame=u.f.locator('[data-capture-frame]'),box=await frame.boundingBox(),start=(Date.now()-began)/1000,actions=[];
 const action=async(label,fn)=>{actions.push({label,seconds:(Date.now()-began)/1000-start});await fn();await u.p.waitForTimeout(350);};
 const answer=answers.find(x=>x.id===id),solution=answer.solution,ticks=answer.intermediate.at(-1).after;await u.p.waitForTimeout(700);
 for(let i=0;i<solution.arrows.length;i++){let guard=0;while((await u.state()).progress.board.arrows[i]!==solution.arrows[i]){if(++guard>4)throw Error('Arrow cycle');await action('arrow:'+i,()=>u.a('arrow:'+i).click());}}
 for(let i=0;i<(solution.waits??[solution.wait]).length;i++){const n=(solution.waits??[solution.wait])[i];if(n)await action('wait:'+i+':'+n,()=>u.wait(i,n));}
 await action('go',()=>u.a('go').click());
 await u.p.waitForTimeout(ticks*600+1000);const state=await u.state();assert.equal(state.won,true);assert.equal(state.run.tick,ticks);
 const audio=await u.f.locator('body').evaluate(()=>window.__craftState?.()??null);
 assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);
 const duration=(Date.now()-began)/1000-start,source=await u.p.video().path(),tap=mode.startsWith('C')?await u.f.locator('body').evaluate(()=>window.__qaTap?.finish()):null;await u.c.close();const name=mode+'-'+id+'.webm';
 let audioArgs=['-an'],offset=null;if(tap){const audioPath=path.join(raw,id+'-runtime-audio.webm');await writeFile(audioPath,Buffer.from(tap.base64,'base64'));offset=(tap.started-began)/1000-start;audioArgs=['-itsoffset',String(offset),'-i',audioPath,'-map','0:v:0','-map','1:a:0','-c:a','copy'];}
 await ff(['-y','-hide_banner','-ss',String(start),'-i',source,...audioArgs,'-t',String(duration),'-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-c:v','libvpx','-b:v','1000k',path.join(out,'videos',name)]);
 records.push({mode,id,video:'videos/'+name,viewport:{width:1440,height:1600},capture:{width:Math.round(box.width),height:Math.round(box.height)},tickMs:600,interInputWaitMs:350,actions,durationSeconds:duration,result:state.run,audio,audioOffsetSeconds:offset,recording:tap?'Real Edge UI plus simultaneous MediaRecorder tap of the actual Web Audio output graph, muxed using measured wall-clock offset. No recreated/post-dub SFX. Speaker output, perceptual synchronization and listening acceptance NOT VERIFIED.':'Real Edge UI, crop only, intentionally no audio track.'});console.log('Recorded',mode,id,tap?'runtime audio captured':'silent');
}}finally{await browser.close();await writeFile(path.join(out,'media-'+mode+'.json'),JSON.stringify(records,null,2)+'\n');}
