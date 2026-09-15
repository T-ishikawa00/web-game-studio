import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {launch,setup} from './r5-helpers.mjs';
import {tapAudio} from './lightwork-recording.mjs';
const raw=path.resolve('.tmp/lightwork-polish-media'),out='docs/qa/lightwork-art-polish-01';await mkdir(raw,{recursive:true});for(const d of ['videos','screens'])await mkdir(out+'/'+d,{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
const ff=args=>new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let err='';p.stderr.on('data',d=>err+=d);p.on('error',reject);p.on('exit',c=>c===0?resolve():reject(Error(err)));});
const browser=await launch(),records=[];
try{for(const variant of ['before','after'])for(const [id,sequence,shotAfter]of [['L01',[0],0],['L05',[0,0,'undo','undo'],2],['L16',[0,1,2,2,3,4],3]]){
 const u=await setup(browser,{recordVideo:{dir:raw,size:{width:1440,height:1600}}}),began=Date.now();await u.c.addInitScript(()=>{sessionStorage.setItem('wgs:light-craft-mode','LG-C');localStorage.setItem('wgs:audio:light-garden',JSON.stringify({version:1,mute:false,gain:.55}));});await u.c.addInitScript(tapAudio);
 await u.p.goto('http://127.0.0.1:4342/ja/prototypes/play/light-garden/?layout=portrait&lg=LG-C&objects='+variant);await u.a('menu').waitFor();await u.level(id);await u.p.evaluate(()=>scrollTo(0,0));
 assert.equal(await u.f.locator('.polish-garden').count(),variant==='after'?1:0);
 const box=await u.f.locator('[data-capture-frame]').boundingBox(),start=Date.now(),actions=[];if(shotAfter===0)await u.f.locator('[data-capture-frame]').screenshot({path:out+'/screens/'+variant+'-'+id+'.png'});await u.p.waitForTimeout(700);
 for(const [i,value]of sequence.entries()){
  await u.p.waitForTimeout(Math.max(0,start+700+i*1400-Date.now()));const action=value==='undo'?'undo':'mirror:'+value;actions.push({action,targetMs:700+i*1400,actualMs:Date.now()-start});await u.a(action).click();
  if(i+1===shotAfter){await u.p.waitForTimeout(1000);await u.f.locator('[data-capture-frame]').screenshot({path:out+'/screens/'+variant+'-'+id+'.png'});}
 }
 await u.p.waitForTimeout(1250);const state=await u.state(),craft=await u.f.locator('body').evaluate(()=>window.__lightCraftState()),duration=(Date.now()-start)/1000,video=await u.p.video().path(),tap=await u.f.locator('body').evaluate(()=>window.__lgTap.finish());assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);await u.c.close();
 const audio=path.join(raw,variant+'-'+id+'-audio.webm');await writeFile(audio,Buffer.from(tap.base64,'base64'));const offset=(tap.started-start)/1000,name=variant+'-'+id+'.webm';
 await ff(['-y','-hide_banner','-ss',String((start-began)/1000),'-i',video,'-itsoffset',String(offset),'-i',audio,'-map','0:v:0','-map','1:a:0','-c:a','copy','-t',String(duration),'-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-c:v','libvpx','-b:v','850k',out+'/videos/'+name]);
 records.push({variant,level:id,file:'videos/'+name,screenshot:'screens/'+variant+'-'+id+'.png',speed:1,gain:.55,actions,durationSeconds:duration,outputGraphRecording:true,offsetSeconds:offset,capture:{width:Math.round(box.width),height:Math.round(box.height)},finalBoard:state.progress.board,history:state.history,plan:craft.plan,recording:'Actual Edge UI + simultaneous Web Audio output graph. No dubbed audio. Perceived synchronization and physical output NOT TESTED.'});console.log('Recorded',variant,id);
 }
 for(const mode of ['auto','landscape']){const u=await setup(browser);await u.open('light-garden',mode,'ja');await u.level('L16');await u.f.locator('[data-capture-frame]').screenshot({path:out+'/screens/after-'+mode+'.png'});await u.c.close();}
 for(const level of ['L01','L05','L16']){const pair=records.filter(r=>r.level===level);assert.deepEqual(pair[0].finalBoard,pair[1].finalBoard);assert.deepEqual(pair[0].plan,pair[1].plan);}
}finally{await browser.close();await writeFile(out+'/media.json',JSON.stringify({records},null,2));}
