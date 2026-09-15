import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {launch,setup,out,ids} from './r5-helpers.mjs';
const raw=path.resolve('.tmp/learning-video'),videos=path.join(out,'videos');for(const dir of [raw,videos,path.join(out,'screens')])await mkdir(dir,{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
const ff=args=>new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let error='';p.stderr.on('data',d=>error+=d);p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error(error)));});
const browser=await launch(),records=[];
const clips=[{name:'shared-input',id:ids[1],level:'T19'},{name:'switch-latch-undo',id:ids[0],level:'L05'},{name:'splitter',id:ids[0],level:'L09'},{name:'branch-opens-gate',id:ids[0],level:'L11'}];
try{for(const clip of clips){const u=await setup(browser,{recordVideo:{dir:raw,size:{width:1440,height:1600}},hasTouch:true}),began=Date.now();await u.open(clip.id,'portrait','ja');
 if(clip.level!=='T19'){await u.menu('levels');await u.a('level:'+clip.level).click();}
 await u.p.evaluate(()=>scrollTo(0,0));const frame=u.f.locator('[data-capture-frame]'),box=await frame.boundingBox(),start=(Date.now()-began)/1000,actions=[];
 const action=async(label,fn)=>{actions.push({label,seconds:(Date.now()-began)/1000-start});await fn();};
 await frame.screenshot({path:path.join(out,'screens',clip.name+'-before.png')});await u.p.waitForTimeout(850);
 if(clip.name==='shared-input'){
  await action('shared swipe',()=>u.swipe(55,0));assert.equal((await u.state()).won,true);await u.p.waitForTimeout(700);await u.menu('levels');await u.a('level:T20').click();await u.p.waitForTimeout(700);await action('both move',()=>u.swipe(55,0));await u.p.waitForTimeout(600);await action('only one moves',()=>u.swipe(55,0));assert.deepEqual((await u.state()).blocked,[false,true]);await u.p.waitForTimeout(850);await action('Undo',()=>u.a('undo').click());
 }else if(clip.name==='switch-latch-undo'){
  await action('mirror to switch; gate opens',()=>u.a('mirror:0').tap());assert.equal((await u.state()).progress.board.gate,true);await u.p.waitForTimeout(1000);await action('reroute; gate stays open',()=>u.a('mirror:0').tap());assert.equal((await u.state()).won,true);await u.p.waitForTimeout(1000);await action('Undo reroute',()=>u.a('undo').click());await u.p.waitForTimeout(600);await action('Undo opening',()=>u.a('undo').click());assert.equal((await u.state()).progress.board.gate,false);
 }else{
  const answers=JSON.parse(await readFile('src/prototypes/light-answers-r2.json','utf8')),a=answers.find(a=>a.id===clip.level);
  for(const m of a.solution){await action('turn mirror '+(m+1),()=>u.a('mirror:'+m).tap());await u.p.waitForTimeout(1000);}assert.equal((await u.state()).won,true);await action('Undo',()=>u.a('undo').click());await u.p.waitForTimeout(600);await action('repeat final turn',()=>u.a('mirror:'+a.solution.at(-1)).tap());
 }
 await u.p.waitForTimeout(1000);await frame.screenshot({path:path.join(out,'screens',clip.name+'-after.png')});const last=await frame.boundingBox();assert.ok(Math.abs(last.x-box.x)<1&&Math.abs(last.y-box.y)<1);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);
 const duration=(Date.now()-began)/1000-start,source=await u.p.video().path();await u.c.close();const dest=path.join(videos,clip.name+'.webm');
 await ff(['-y','-hide_banner','-ss',String(start),'-i',source,'-t',String(duration),'-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-an','-c:v','libvpx','-b:v','1100k',dest]);
 for(const [i,offset] of [.08,.20,.30,.50].entries())await ff(['-y','-hide_banner','-ss',String(actions[0].seconds+offset),'-i',dest,'-frames:v','1',path.join(out,'screens',clip.name+'-phase-'+i+'.png')]);
 records.push({...clip,video:'videos/'+clip.name+'.webm',durationSeconds:duration,width:432,height:768,actions,source:'Real Edge UI recording; crop only, no scaling or synthetic animation',errors:u.errors,external:u.external});console.log('Recorded',clip.name,duration.toFixed(1));
}}finally{await browser.close();await writeFile(path.join(out,'media-manifest.json'),JSON.stringify(records,null,2));}
