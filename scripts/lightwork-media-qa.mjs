import {spawn} from 'node:child_process';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const ffmpeg='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe',out='docs/qa/lightwork-craft-pilot-01';
const {chromium}=await import('file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:process.cwd()+'/.tmp',TMP:process.cwd()+'/.tmp'}}),page=await browser.newPage();
const decode=async file=>page.evaluate(async base64=>{const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0)),ctx=new OfflineAudioContext(1,1,48000),audio=await ctx.decodeAudioData(bytes.buffer),data=audio.getChannelData(0);let peak=0,sum=0,squares=0,nonzero=0,invalid=0;for(const v of data){if(!Number.isFinite(v)){invalid++;continue;}peak=Math.max(peak,Math.abs(v));sum+=v;squares+=v*v;if(Math.abs(v)>.0001)nonzero++;}return {samples:data.length,seconds:data.length/audio.sampleRate,peak,dc:sum/data.length,rms:Math.sqrt(squares/data.length),nonzero,invalid};},(await readFile(file)).toString('base64'));

const manifest=JSON.parse(await readFile(out+'/media-manifest.json','utf8')),measurements=[];
for(const r of manifest.filter(r=>r.mode==='LG-C')){const m=await decode(out+'/'+r.file);assert.equal(m.invalid,0);assert.ok(m.peak>0&&m.peak<.9);assert.ok(m.nonzero>100);measurements.push({file:r.file,...m});}
if(process.argv.includes('--loop')){const m=await decode('.tmp/lightwork-qa/active-loop.webm');assert.equal(m.invalid,0);assert.ok(m.peak>0&&m.peak<.9);assert.ok(m.seconds>=299);measurements.push({file:'.tmp/lightwork-qa/active-loop.webm',...m});}
for(const id of ['L01','L05','L15']){const rows=manifest.filter(r=>r.level===id),first=rows[0];for(const row of rows){assert.deepEqual(row.finalBoard,first.finalBoard);assert.deepEqual(row.history,first.history);assert.deepEqual(row.actions.map(a=>[a.action,a.targetMs]),first.actions.map(a=>[a.action,a.targetMs]));}}
await mkdir('.tmp/lightwork-qa/frames',{recursive:true});
for(const [i,at]of [2.96,3.2,3.49,3.78].entries())await new Promise((resolve,reject)=>{const p=spawn(ffmpeg,['-y','-v','error','-ss',String(at),'-i',out+'/videos/LG-C-L15.webm','-frames:v','1','.tmp/lightwork-qa/frames/L15-'+i+'.png'],{windowsHide:true,stdio:'ignore'});p.on('exit',c=>c===0?resolve():reject(Error('Frame extraction')));});
await writeFile(out+'/media-qa.json',JSON.stringify({status:'PASS',measurements,comparisons:{sameBoards:true,sameUndo:true,sameTargetInputSchedule:true,maxDispatchLatenessMs:Math.max(...manifest.flatMap(r=>r.actions.map(a=>a.actualMs-a.targetMs)))},scope:'Decoded actual browser graph capture. Codec output verified; perception and device speaker output NOT TESTED.'},null,2));console.log(JSON.stringify({status:'PASS',recordings:measurements.length,peak:Math.max(...measurements.map(m=>m.peak))}));

await browser.close();
