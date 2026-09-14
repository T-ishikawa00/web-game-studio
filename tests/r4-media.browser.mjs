import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {launch,setup,out,ids} from './r4-helpers.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const raw=projectPath(path.join(projectRoot,'.tmp/r4-video')),videos=path.join(out,'videos');for(const d of [raw,videos])await mkdir(d,{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
const ff=args=>new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let e='';p.stderr.on('data',d=>e+=d);p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error(e)));});
const browser=await launch(),records=[];
try{for(const id of ids){const u=await setup(browser,{recordVideo:{dir:raw,size:{width:1440,height:1600}},hasTouch:true}),started=Date.now();await u.open(id,'portrait','ja');if(await u.a('close-guide').count())await u.a('close-guide').click();await u.p.evaluate(()=>scrollTo(0,0));const capture=u.f.locator('[data-capture-frame]'),box=await capture.boundingBox();const start=(Date.now()-started)/1000;
 const shot=async n=>{await capture.screenshot({path:path.join(out,'screens',`${id}-motion-${n}.png`)});};await shot(1);await u.p.waitForTimeout(900);
 if(id===ids[0]){await u.a('mirror:0').tap();await shot(2);await u.p.waitForTimeout(1800);await u.a('undo').click();await shot(3);await u.p.waitForTimeout(1200);await u.a('mirror:0').tap();}
 else if(id===ids[1]){await u.swipe(50,0,1);await shot(2);await u.p.waitForTimeout(1300);await u.menu();await u.p.waitForTimeout(700);await u.f.locator('.menu-dialog [data-action="dpad"]').click();await u.a('close-menu').click();await shot(3);await u.p.waitForTimeout(1400);await u.a('move:1').click();await shot(4);}
 else{await u.a('arrow:0').tap();await u.a('arrow:0').tap();await u.a('arrow:0').tap();await u.a('arrow:1').tap();await shot(2);await u.p.waitForTimeout(900);await u.a('go').click();await u.p.waitForTimeout(660);await u.a('go').click();await shot(3);await u.p.waitForTimeout(1100);const plan=(await u.state()).progress.board;await u.a('retry').click();assert.deepEqual((await u.state()).progress.board,plan);await shot(4);}
 await u.p.waitForTimeout(1800);const last=await capture.boundingBox();assert.ok(Math.abs(last.x-box.x)<1&&Math.abs(last.y-box.y)<1,'fixed crop origin');const duration=(Date.now()-started)/1000-start;const source=await u.p.video().path();await u.c.close();const dest=path.join(videos,`${id}.webm`);
 await ff(['-y','-hide_banner','-ss',String(start),'-i',source,'-t',String(duration),'-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-an','-c:v','libvpx','-b:v','1100k',dest]);
 await ff(['-y','-hide_banner','-ss',String(Math.min(3,duration/2)),'-i',dest,'-frames:v','1',path.join(out,'screens',`${id}-video-decoded.png`)]);
 records.push({id,video:`videos/${id}.webm`,width:Math.round(box.width),height:Math.round(box.height),durationSeconds:duration,source:'Edge real UI recording; mouse/touch emulation; crop only, no scale',errors:u.errors,external:u.external});console.log('Recorded',id);
}}finally{await browser.close();await writeFile(path.join(out,'media-manifest.json'),JSON.stringify(records,null,2));}
