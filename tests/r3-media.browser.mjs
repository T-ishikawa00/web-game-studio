import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const dir=projectPath(path.join(projectRoot,'docs/qa/batch-01-r3')),screens=projectPath(path.join(dir,'screens')),videos=projectPath(path.join(dir,'videos')),raw=projectPath(path.join(projectRoot,'.tmp/r3-video'));
for(const d of [screens,videos,raw])await mkdir(d,{recursive:true});
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe',browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}}),records=[];
const ff=args=>new Promise((resolve,reject)=>{const child=spawn(ffmpeg,args,{windowsHide:true,stdio:['ignore','ignore','pipe']});let error='';child.stderr.on('data',d=>error+=d);child.on('error',reject);child.on('exit',code=>code===0?resolve(error):reject(Error(error)));});
if(process.env.QA_GAME){records.push(...JSON.parse(await readFile(projectPath(path.join(dir,'media-manifest.json')),'utf8')).filter(r=>r.id!==process.env.QA_GAME));}
try{for(const id of ['light-garden','two-ways-home','tiny-delivery'].filter(id=>!process.env.QA_GAME||process.env.QA_GAME===id))for(const mode of ['portrait','landscape']){
 const c=await browser.newContext({viewport:{width:1440,height:1600},recordVideo:{dir:raw,size:{width:1440,height:1600}}}),p=await c.newPage();const started=Date.now();
 await p.goto(`http://127.0.0.1:4324/ja/prototypes/play/${id}/?layout=${mode}`);const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`);await a('close-guide').click();
 const capture=f.locator('[data-capture-frame]');let box=await capture.boundingBox();await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));box=await capture.boundingBox();await p.waitForTimeout(200);
 const start=(Date.now()-started)/1000,shoot=async n=>capture.screenshot({path:projectPath(path.join(screens,`${id}-${mode}-motion-${n}.png`))});await shoot(1);box=await capture.boundingBox();await p.waitForTimeout(1400);
 if(id==='light-garden'){await a('mirror:0').click();await shoot(2);await p.waitForTimeout(1800);await a('undo').click();await p.waitForTimeout(1300);await a('mirror:0').click();await shoot(3);}
 else if(id==='two-ways-home'){await a('move:1').click();await shoot(2);await p.waitForTimeout(1700);await a('move:1').click();await shoot(3);await p.waitForTimeout(1600);await a('undo').click();await p.waitForTimeout(1200);await a('move:1').click();}
 else{await a('arrow:0').click();await a('arrow:0').click();await a('arrow:0').click();await a('arrow:1').click();await shoot(2);await p.waitForTimeout(1200);await a('go').click();await p.waitForTimeout(650);await a('go').click();await shoot(3);await p.waitForTimeout(1400);await a('go').click();await p.waitForTimeout(3200);assert.equal(await f.locator('.success').count(),1);await shoot(4);}
 const lastBox=await capture.boundingBox();assert.ok(Math.abs(lastBox.x-box.x)<1&&Math.abs(lastBox.y-box.y)<1,'Recording crop must not move');
 const remaining=12000-(Date.now()-started-start*1000);if(remaining>0)await p.waitForTimeout(remaining);
 const rawFile=await p.video().path();await c.close();const output=projectPath(path.join(videos,`${id}-${mode}.webm`));
 await ff(['-y','-hide_banner','-ss',String(start),'-i',rawFile,'-t','12','-vf',`crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`,'-an','-c:v','libvpx','-b:v','1200k',output]);
 records.push({id,mode,video:path.relative(dir,output).replaceAll('\\','/'),css:{width:box.width,height:box.height},durationSeconds:12,source:'real Edge UI operations; cropped recording, no scale'});console.log('Recorded',id,mode);
 // Independent high-DPR browser render, never an upscaled low-resolution screenshot.
 const dpr=mode==='portrait'?2.5:2,hd=await browser.newContext({viewport:{width:1440,height:1400},deviceScaleFactor:dpr}),hp=await hd.newPage();await hp.goto(`http://127.0.0.1:4324/ja/prototypes/play/${id}/?layout=${mode}`);const hf=hp.frameLocator('iframe');await hf.locator('[data-action="close-guide"]').click();const filename=projectPath(path.join(screens,`${id}-${mode}-hd.png`));const hb=await hf.locator('[data-capture-frame]').boundingBox();await hp.screenshot({path:filename,clip:{x:Math.round(hb.x),y:Math.round(hb.y),width:mode==='portrait'?432:960,height:mode==='portrait'?768:540}});const png=await readFile(filename),pixels={width:png.readUInt32BE(16),height:png.readUInt32BE(20)};assert.deepEqual(pixels,mode==='portrait'?{width:1080,height:1920}:{width:1920,height:1080});records.push({id,mode,image:path.relative(dir,filename).replaceAll('\\','/'),css:{width:mode==='portrait'?432:960,height:mode==='portrait'?768:540},dpr,pixels});await hd.close();
}}finally{await browser.close();await writeFile(projectPath(path.join(dir,'media-manifest.json')),JSON.stringify(records,null,2));}
