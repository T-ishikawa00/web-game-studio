import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {launch,setup} from './r5-helpers.mjs';
import {tapAudio} from './lightwork-recording.mjs';
const raw=path.resolve('.tmp/lightwork-media'),out='docs/qa/lightwork-craft-pilot-01';await mkdir(raw,{recursive:true});await mkdir(out+'/videos',{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
const ff=args=>new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let err='';p.stderr.on('data',d=>err+=d);p.on('error',reject);p.on('exit',c=>c===0?resolve():reject(Error(err)));});
const browser=await launch(),records=process.argv.includes('--c-only')?JSON.parse(await readFile(out+'/media-manifest.json','utf8')).filter(r=>r.mode!=='LG-C'):[];
try{for(const m of (process.argv.includes('--c-only')?['LG-C']:['LG-A','LG-B','LG-C']))for(const [id,sequence]of [['L01',[0]],['L05',[0,'undo',0,0,'undo']],['L15',[0,1,2,1,2]]]){
 const u=await setup(browser,{recordVideo:{dir:raw,size:{width:1440,height:1600}}}),began=Date.now();await u.c.addInitScript(m=>{sessionStorage.setItem('wgs:light-craft-mode',m);localStorage.setItem('wgs:audio:light-garden',JSON.stringify({version:1,mute:false,gain:.55}));},m);if(m==='LG-C')await u.c.addInitScript(tapAudio);
 await u.open('light-garden','portrait','ja');await u.level(id);await u.p.evaluate(()=>scrollTo(0,0));const box=await u.f.locator('[data-capture-frame]').boundingBox(),start=Date.now(),actions=[];await u.p.waitForTimeout(700);
 for(const [i,value]of sequence.entries()){const target=start+700+i*1100;await u.p.waitForTimeout(Math.max(0,target-Date.now()));const action=value==='undo'?'undo':'mirror:'+value;actions.push({action,targetMs:700+i*1100,actualMs:Date.now()-start});await u.a(action).click();}
 await u.p.waitForTimeout(1250);const state=await u.state(),craft=await u.f.locator('body').evaluate(()=>window.__lightCraftState()),duration=(Date.now()-start)/1000,video=await u.p.video().path(),tap=m==='LG-C'?await u.f.locator('body').evaluate(()=>window.__lgTap.finish()):null;assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);await u.c.close();
 let audio=['-an'],offset=null;if(tap){const file=path.join(raw,m+'-'+id+'-audio.webm');await writeFile(file,Buffer.from(tap.base64,'base64'));offset=(tap.started-start)/1000;audio=['-itsoffset',String(offset),'-i',file,'-map','0:v:0','-map','1:a:0','-c:a','copy'];}
 const name=m+'-'+id+'.webm';await ff(['-y','-hide_banner','-ss',String((start-began)/1000),'-i',video,...audio,'-t',String(duration),'-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-c:v','libvpx','-b:v','850k',out+'/videos/'+name]);
 records.push({mode:m,level:id,file:'videos/'+name,viewport:{width:1440,height:1600},capture:{width:432,height:768},speed:1,masterGain:.55,actions,durationSeconds:duration,actualGraphAudio:!!tap,offsetSeconds:offset,finalBoard:state.progress.board,history:state.history,craft,recording:tap?'Actual Edge UI + simultaneous output-graph MediaRecorder, measured offset mux; no dubbed or recreated sounds. Device output/perceptual sync NOT TESTED.':'Actual Edge UI; intentionally silent.'});console.log('Recorded',m,id);
}}finally{await browser.close();await writeFile(out+'/media-manifest.json',JSON.stringify(records,null,2));}
