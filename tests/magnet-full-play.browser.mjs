import assert from 'node:assert/strict';
import {mkdir,writeFile,appendFile} from 'node:fs/promises';
import {launch} from './r5-helpers.mjs';
const form=process.argv.find(s=>s.startsWith('--form='))?.split('=')[1]??'satellite',fast=!process.argv.includes('--realtime'),mobile=process.argv.includes('--mobile'),record=process.argv.includes('--record');
const mission=process.argv.find(s=>s.startsWith('--mission='))?.split('=')[1]??'B';
const alternate=process.argv.includes('--alternate');
const base='http://127.0.0.1:4371',out='docs/qa/game004-magnet-full-r1';await mkdir(out,{recursive:true});
const browser=await launch(),ctx=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:800},hasTouch:mobile,isMobile:mobile}),p=await ctx.newPage();const errors=[],external=[],trace=[];p.on('pageerror',e=>errors.push(e.message));await ctx.route('**/*',r=>{if(new URL(r.request().url()).origin!==base){external.push(r.request().url());return r.abort();}return r.continue();});
const tick=async ms=>fast?p.clock.runFor(ms):p.waitForTimeout(ms);let pressed=new Set(),holding=false,lastRelease=0,moveTouch=false,previous='';
const cdp=mobile?await ctx.newCDPSession(p):null,touch=async(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(([id,x,y])=>({id,x,y,radiusX:5,radiusY:5,force:1}))});
try{
 if(fast){await p.clock.install();await p.clock.pauseAt(Date.now()+100);}await ctx.addInitScript(({mission})=>{if(mission!=='A'){localStorage.setItem('tinlumo.game004.magnet.full.v1',JSON.stringify({schemaVersion:1,contentVersion:'magnet-full-r1',settings:{locale:'en',muted:false,reducedMotion:false},unlocked:mission==='B'?['A','B']:['A','B','C'],records:mission==='B'?{A:{clears:1,best:100,form:'cyclone'}}:{A:{clears:1,best:100,form:'cyclone'},B:{clears:1,best:100,form:'cyclone'}},run:null}));}}, {mission});await p.goto(base+'/?lang='+ (mobile?'ja':'en'));await p.locator('#sound').click();if(record)await p.locator('#sound').click();await p.locator('[data-mission='+mission+']').first().click();await p.locator('canvas').focus();
 if(record){await writeFile(out+'/full-run.webm','');await p.exposeBinding('saveChunk',async(_,b64)=>appendFile(out+'/full-run.webm',Buffer.from(b64,'base64')));await p.evaluate(()=>{const stream=window.__magnet.captureStream();window.chunksDone=Promise.resolve();window.rec=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9,opus',videoBitsPerSecond:1800000});window.rec.ondataavailable=e=>{window.chunksDone=window.chunksDone.then(async()=>{const a=await e.data.arrayBuffer();let s='';for(const x of new Uint8Array(a))s+=String.fromCharCode(x);await window.saveChunk(btoa(s));});};window.rec.start(1000);});}
 for(let iter=0;iter<2400;iter++){
  const {s,m,b}=await p.evaluate(()=>({s:window.__magnet.snapshot(),m:window.__magnet.metrics(),b:(()=>{const r=document.querySelector('canvas').getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})()}));
  const sig=s.stage+':'+s.encounter;if(sig!==previous){trace.push({time:s.runTime,stage:s.stage,encounter:s.encounter,hp:s.player.hp,kills:s.kills});console.log(form,sig,s.runTime.toFixed(1),s.player.hp);previous=sig;if(s.encounter==='combat'&&s.stage>=0)await p.screenshot({path:out+'/'+mission+'-'+form+(mobile?'-mobile':'')+'-stage'+s.stage+'.png'});}
  if(s.over)break;
  if(s.encounter==='choice'){
   if(mobile){if(moveTouch)await touch('touchCancel',[]);moveTouch=false;}else if(holding)await p.mouse.up();holding=false;for(const k of pressed)await p.keyboard.up(k);pressed.clear();
   const id=s.choice===1?(alternate?(s.modules.includes('drive')?'shock':'drive'):(s.modules.includes('field')?'brake':'field')):s.choice===2?(['satellite','cyclone'].includes(form)?'swarm':'lance'):form;
   await tick(record?1400:150);const before=s.runTime;assert.equal((await p.evaluate(()=>window.__magnet.snapshot())).runTime,before);
   await p.locator('[data-choice='+id+']').click();await tick(250);await p.locator('canvas').focus();continue;
  }
  const alive=s.enemies.filter(e=>!e.dead&&e.spawnIn<=0),loaded=s.scraps.filter(x=>x.mode==='orbit').length;
  const target=alive.sort((a,b)=>((a.role==='support'?-500:0)+Math.hypot(a.x-s.player.x,a.y-s.player.y))-((b.role==='support'?-500:0)+Math.hypot(b.x-s.player.x,b.y-s.player.y)))[0];
  const relay=s.relays[s.activeRelay];const point=(mission==='A'&&s.stage===5&&s.bossLocked?relay:target)??{x:m.width*.65,y:m.height*.4};let dest={x:m.width*.5+Math.cos(s.runTime*.18)*m.width*.25,y:m.height*.52+Math.sin(s.runTime*.18)*m.height*.21};
  if(target){const a=Math.atan2(s.player.y-target.y,s.player.x-target.x)+.48;dest={x:target.x+Math.cos(a)*195,y:target.y+Math.sin(a)*195};if(target.shield>0)dest={x:target.x-Math.cos(target.facing)*150,y:target.y-Math.sin(target.facing)*150};}
  if(loaded<(form==='satellite'?8:4)){const scrap=s.scraps.filter(x=>x.mode==='loose').sort((a,b)=>Math.hypot(a.x-s.player.x,a.y-s.player.y)-Math.hypot(b.x-s.player.x,b.y-s.player.y))[0];if(scrap)dest=scrap;}
  let dx=dest.x-s.player.x,dy=dest.y-s.player.y,len=Math.hypot(dx,dy)||1,vx=dx/len,vy=dy/len;
  for(const e of alive){dx=s.player.x-e.x;dy=s.player.y-e.y;const d=Math.hypot(dx,dy)||1;if(d<145){vx+=dx/d*(145-d)/30;vy+=dy/d*(145-d)/30;}if(e.windup>0||e.dash>0){const cross=dx*-Math.sin(e.locked)+dy*Math.cos(e.locked);if(Math.abs(cross)<95){vx+=-Math.sin(e.locked)*(cross>=0?1:-1)*3;vy+=Math.cos(e.locked)*(cross>=0?1:-1)*3;}}}
  if(s.lane&&s.lane.telegraph<.6){const delta=s.player[s.lane.axis]-s.lane.position;if(Math.abs(delta)<70){if(s.lane.axis==='x')vx+=(delta>=0?1:-1)*3;else vy+=(delta>=0?1:-1)*3;}}
  if(s.player.x<100)vx+=2;if(s.player.x>m.width-100)vx-=2;if(s.player.y<150)vy+=2;if(s.player.y>m.height-110)vy-=2;len=Math.max(1,Math.hypot(vx,vy));vx/=len;vy/=len;
  if(!mobile){const next=new Set();if(vx>.3)next.add('d');if(vx<-.3)next.add('a');if(vy>.3)next.add('s');if(vy<-.3)next.add('w');for(const k of pressed)if(!next.has(k))await p.keyboard.up(k);for(const k of next)if(!pressed.has(k))await p.keyboard.down(k);pressed=next;await p.mouse.move(b.x+(b.width-m.width*m.scale)/2+point.x*m.scale,b.y+(b.height-m.height*m.scale)/2+point.y*m.scale);}
  else{if(!moveTouch){await touch('touchStart',[[1,68,685]]);moveTouch=true;}dx=point.x-s.player.x;dy=point.y-s.player.y;len=Math.hypot(dx,dy)||1;const points=[[1,68+vx*36,685+vy*36]];if(holding)points.push([2,310+dx/len*34,680+dy/len*34]);await touch('touchMove',points);}
  const wait=s.time-lastRelease;if(!holding&&wait>.22&&!s.won&&s.encounter==='combat'){if(mobile)await touch('touchStart',[[1,68+vx*36,685+vy*36],[2,310,680]]);else await p.mouse.down();holding=true;lastRelease=s.time;}
  else if(holding&&((loaded>=(form==='satellite'?12:7)&&wait>.75)||(loaded>(form==='satellite'?4:0)&&wait>1.8))){if(mobile)await touch('touchEnd',[[2,310,680]]);else await p.mouse.up();holding=false;lastRelease=s.time;}
  await tick(140);
 }
 if(record)await p.evaluate(async()=>{await new Promise(resolve=>{window.rec.onstop=resolve;window.rec.stop();});await window.chunksDone;});
 const data=await p.evaluate(()=>({state:window.__magnet.snapshot(),metrics:window.__magnet.metrics()}));await p.screenshot({path:out+'/'+form+(mobile?'-mobile':'')+'-result.png'});
 await p.locator('#restart').click();await tick(500);const retry=await p.evaluate(()=>window.__magnet.snapshot());assert.equal(retry.stage,0);assert.equal(retry.choices.length,0);assert.equal(retry.runTime,0);
 await writeFile(out+'/'+form+(mobile?'-mobile':'')+(fast?'-fast':'-realtime')+'.json',JSON.stringify({mode:fast?'accelerated browser clock; actual input; no world mutation':'realtime actual input; no world mutation',form,mobile,errors,external,trace,retryClean:true,...data},null,2));console.log(JSON.stringify({won:data.state.won,time:data.state.runEndedAt,hp:data.state.player.hp,peak:data.state.peak,errors,external}));assert.equal(errors.length,0);assert.equal(external.length,0);assert.equal(data.state.won,true);
}finally{await browser.close();}



