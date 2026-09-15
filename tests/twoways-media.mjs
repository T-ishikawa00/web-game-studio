import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {launch,setup,base} from './r5-helpers.mjs';
import {tapAudio} from './lightwork-recording.mjs';
const raw=path.resolve('.tmp/twoways-media'),out='docs/qa/twoways-craft-pilot-01';await mkdir(raw,{recursive:true});for(const d of ['screens','videos'])await mkdir(out+'/'+d,{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
const ff=args=>new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let error='';p.stderr.on('data',d=>error+=d);p.on('error',reject);p.on('exit',c=>c===0?resolve():reject(Error(error)));});
const browser=await launch(),records=[];
try{for(const variant of ['TW-A','TW-B','TW-C'])for(const [id,sequence]of [['T19',[1]],['T20',[1,1,0]],['T04',[1,0,0,0,2,3,0,3,1]]]){
 const u=await setup(browser,{recordVideo:{dir:raw,size:{width:1440,height:1600}}}),began=Date.now();if(variant==='TW-C')await u.c.addInitScript(tapAudio);
 await u.p.goto(base+'/ja/prototypes/play/two-ways-home/?layout=portrait&tw='+variant);await u.a('menu').waitFor();await u.level(id);await u.p.evaluate(()=>scrollTo(0,0));assert.equal(await u.f.locator('body').evaluate(()=>window.__twCraftState().mode),variant);
 const box=await u.f.locator('[data-capture-frame]').boundingBox(),start=Date.now(),actions=[];await u.f.locator('[data-capture-frame]').screenshot({path:out+'/screens/'+variant+'-'+id+'.png'});
 for(const [i,d]of sequence.entries()){await u.p.waitForTimeout(Math.max(0,start+600+i*900-Date.now()));actions.push({direction:d,targetMs:600+i*900,actualMs:Date.now()-start});await u.f.locator('[data-swipe-board="0"]').focus();await u.p.keyboard.press(['ArrowUp','ArrowRight','ArrowDown','ArrowLeft'][d]);if(variant==='TW-C'&&id==='T04'&&i<2){await u.p.waitForTimeout(220);await u.f.locator('[data-capture-frame]').screenshot({path:out+'/screens/T04-'+(i===0?'home':'departed')+'.png'});}}
 await u.p.waitForTimeout(650);const state=await u.state(),craft=await u.f.locator('body').evaluate(()=>window.__twCraftState()),duration=(Date.now()-start)/1000,video=await u.p.video().path(),tap=variant==='TW-C'?await u.f.locator('body').evaluate(()=>window.__lgTap.finish()):null;assert.equal(state.won,true);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);await u.c.close();
 const args=['-y','-hide_banner','-ss',String((start-began)/1000),'-i',video];if(tap){const audio=path.join(raw,variant+'-'+id+'.webm');await writeFile(audio,Buffer.from(tap.base64,'base64'));args.push('-itsoffset',String((tap.started-start)/1000),'-i',audio,'-map','0:v:0','-map','1:a:0','-c:a','copy');}else args.push('-an');args.push('-t',String(duration),'-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-c:v','libvpx','-b:v','850k',out+'/videos/'+variant+'-'+id+'.webm');await ff(args);
 records.push({variant,id,file:'videos/'+variant+'-'+id+'.webm',speed:1,actions,durationSeconds:duration,width:Math.round(box.width),height:Math.round(box.height),board:state.progress.board,history:state.history,plan:craft.plan,sound:variant==='TW-C'?'Simultaneous Web Audio graph, no dubbed audio':'No audio track; silent variant',scheduled:craft.audio.counts.scheduled});console.log('Recorded',variant,id);
 }
 for(const layout of ['auto','landscape']){const u=await setup(browser);await u.open('two-ways-home',layout,'en');await u.level('T12');await u.f.locator('[data-capture-frame]').screenshot({path:out+'/screens/T12-'+layout+'.png'});await u.c.close();}
 for(const id of ['T19','T20','T04']){const group=records.filter(r=>r.id===id);for(const r of group){assert.deepEqual(r.board,group[0].board);assert.deepEqual(r.history,group[0].history);assert.deepEqual(r.plan,group[0].plan);if(r.variant!=='TW-C')assert.equal(r.scheduled,0);}}
}finally{await browser.close();await writeFile(out+'/media.json',JSON.stringify({records,physicalOutputAndPerceivedSync:'NOT TESTED'},null,2));}
