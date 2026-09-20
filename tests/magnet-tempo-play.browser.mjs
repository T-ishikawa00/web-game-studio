import assert from 'node:assert/strict';
import {mkdir,writeFile,appendFile} from 'node:fs/promises';
import {launch} from './r5-helpers.mjs';
const safety=process.argv.includes('--safety'),interrupt=process.argv.includes('--interrupt');
const compare=process.argv.includes('--compare'),before=process.argv.includes('--before');
const fast=process.argv.includes('--fast'),branch=process.argv.includes('--lance')?'lance':'swarm';
const final=process.argv.includes('--final'),mobile=process.argv.includes('--mobile');
const out=safety?'.tmp/magnet-tempo-r2-1/feedback-'+(interrupt?'interrupt':'choice'):compare?'docs/qa/game004-magnet-tempo-r2-1/'+(before?'before':'after'):final?'docs/qa/game004-magnet-tempo-r2-1':'.tmp/magnet-tempo-r2-1/'+branch+(fast?'-fast':'-first');
await mkdir(out,{recursive:true});const base=before?'http://127.0.0.1:4368':'http://127.0.0.1:4369',browser=await launch();
const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:800},hasTouch:mobile,isMobile:mobile});
const p=await context.newPage(),errors=[],external=[],choiceChecks=[];
await context.route('**/*',r=>{if(new URL(r.request().url()).origin!==base){external.push(r.request().url());return r.abort();}return r.continue();});
p.on('pageerror',e=>errors.push(e.message));
try{
 if(final&&!mobile){for(const name of ['full','highlight'])await writeFile(out+'/'+(name==='full'?'full-run':'highlight')+'.webm','');await p.exposeBinding('writeVideoChunk',async(_source,name,base64)=>{if(!['full','highlight'].includes(name))throw Error('Invalid media name');await appendFile(out+'/'+(name==='full'?'full-run':'highlight')+'.webm',Buffer.from(base64,'base64'));});}
 if(fast){await p.clock.install({time:Date.now()});await p.clock.pauseAt(Date.now()+100);}await p.goto(base);await p.locator('#sound').click();await p.locator('#sound').click();await p.locator('canvas').focus();if(safety){await p.locator('#sound').click();await p.locator('#motion').click();}
 await p.screenshot({path:out+(mobile?'/mobile.png':'/desktop.png')});
 await p.evaluate(({record})=>{window.transitions=[];window.runFrames={};window.runSamples=[];window.recorders={};if(record){const stream=window.__magnet.captureStream();for(const name of ['full','highlight']){const r=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9,opus',videoBitsPerSecond:4000000}),chunks=[];let tail=Promise.resolve();r.ondataavailable=e=>{if(e.data.size)tail=tail.then(async()=>{const data=await new Promise(resolve=>{const fr=new FileReader();fr.onload=()=>resolve(fr.result);fr.readAsDataURL(e.data)});await window.writeVideoChunk(name,data.slice(data.indexOf(';base64,')+8));});};window.recorders[name]={r,chunks,flush:()=>tail};r.start(1000);if(name==='highlight')r.pause();}}
 let bucket=-1;function observe(){const s=window.__magnet.snapshot();const tr={wall:performance.now(),time:s.time,runTime:s.runTime,stage:s.stage,encounter:s.encounter,alive:s.enemies.filter(e=>!e.dead).length,all:s.relays.every(r=>r.done),selectable:!document.querySelector('#choice').hidden,hp:s.player.hp,auto:s.counters['auto-charge']??0};const prev=window.transitions.at(-1);if(!prev||['stage','encounter','alive','all','selectable'].some(k=>tr[k]!==prev[k]))window.transitions.push(tr);const save=n=>{if(!window.runFrames[n])window.runFrames[n]=document.querySelector('canvas').toDataURL('image/png')};
 if(s.holding&&s.time<3)save('pull');if(s.scraps.filter(x=>x.mode==='orbit').length>=8)save('orbit');if(s.scraps.some(x=>x.mode==='shot'))save('launch');if(s.enemies.some(x=>x.flash>0))save('impact');if(s.enemies.some(x=>x.dead))save('destruction');
 for(const kind of ['shield','charger'])if(s.enemies.some(e=>e.kind===kind&&e.spawnIn===0&&!e.dead))save(kind);
 if(s.player.upgrade===1&&s.runTime>30)save('upgrade-before');if(s.player.upgrade===3&&s.player.transform>.3&&s.player.transform<.9)save('upgrade-after');
 if(s.enemies.some(e=>e.kind==='elite'&&e.windup>0))save('climax');
 if(s.player.upgrade===1)save('upgrade');
 const b=Math.floor(s.runTime/20);if(b!==bucket){bucket=b;window.runSamples.push({t:s.runTime,stage:s.stage,relays:s.relays,build:s.build,hp:s.player.hp,kills:s.kills,upgrade:s.player.upgrade,objects:s.peak,metrics:window.__magnet.metrics()});}
 // Four real-time excerpts, no speed changes or generated frames. Full recording remains continuous.
 const stageStart=[...s.milestones].reverse().find(e=>e.kind.startsWith('stage-start-'))?.t??-10;const active=(s.stage>0&&s.runTime-stageStart<3)||(s.runTime>=1&&s.runTime<9)||(s.encounter==='choice')||(s.evolution>0&&s.player.transform>.2)||(s.stage===5&&s.enemies.some(e=>e.kind==='elite'&&e.windup>0))||s.won;
 if(s.encounter==='choice')save('choice-'+s.choice);if(s.stage===5&&s.player.transform<.5)save('reactor');if(s.evolution>0&&s.encounter==='combat'&&s.player.transform<.8)save(s.build+'-'+s.evolution);
 const hr=window.recorders.highlight?.r;if(hr&&hr.state!=='inactive'){if(active&&hr.state==='paused')hr.resume();else if(!active&&hr.state==='recording')hr.pause();}
 requestAnimationFrame(observe);}requestAnimationFrame(observe);
 },{record:final&&!mobile});
 const begin=Date.now();let holding=false,lastRelease=0,reported=-1,pressed=new Set(),lastOver=0;
 const cdp=mobile?await context.newCDPSession(p):null;
 const touch=async(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(([id,x,y])=>({id,x,y,radiusX:5,radiusY:5,force:1}))});
 const moveBase={x:68,y:685},aimBase={x:310,y:680};let moveTouch=false;
 while(Date.now()-begin<(fast?660000:720000)){
  const {s,m,b}=await p.evaluate(()=>({s:window.__magnet.snapshot(),m:window.__magnet.metrics(),b:(()=>{const r=document.querySelector('canvas').getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})()}));
  const alive=s.enemies.filter(e=>!e.dead&&e.spawnIn<=0);
  if(safety&&interrupt&&s.encounter==='settle'){if(holding){await p.mouse.up();holding=false;}await p.locator('#pause').click();const frozen=await p.evaluate(()=>window.__magnet.snapshot());await p.clock.runFor(1400);assert.equal((await p.evaluate(()=>window.__magnet.snapshot())).clearElapsed,frozen.clearElapsed);await p.locator('#restart').click();await p.clock.runFor(1400);const retry=await p.evaluate(()=>window.__magnet.snapshot());assert.equal(retry.encounter,'combat');assert.equal(retry.stage,0);assert.equal(retry.runTime,0);assert.equal(retry.counters['choice-open-1'],undefined);choiceChecks.push({pauseSettle:true,retryNoStaleEffect:true});break;}
  if(s.encounter==='choice'){if(compare){await p.waitForTimeout(1000);break;}if(mobile){await touch('touchCancel',[]);moveTouch=false;}if(holding&&!mobile)await p.mouse.up();holding=false;for(const k of pressed)await p.keyboard.up(k);pressed=new Set();const id=s.choice===1?'recycler':s.choice===2?branch:branch==='swarm'?'cyclone':'return';const beforeChoice=await p.evaluate(()=>({s:window.__magnet.snapshot(),a:window.__magnet.metrics().audio}));if(fast)await p.clock.runFor(1600);else await p.waitForTimeout(1600);const held=await p.evaluate(()=>({s:window.__magnet.snapshot(),a:window.__magnet.metrics().audio,overflow:document.documentElement.scrollWidth>innerWidth}));assert.equal(held.s.runTime,beforeChoice.s.runTime);assert.equal(held.s.holding,false);assert.equal(held.a.paused,true);assert.equal(held.overflow,false);await p.screenshot({path:out+'/'+(mobile?'mobile-':'')+'choice-ui-'+s.choice+'.png'});await p.locator('[data-choice='+id+']').click();const afterChoice=await p.evaluate(()=>({s:window.__magnet.snapshot(),a:window.__magnet.metrics().audio}));if(s.choice>1)assert.ok((afterChoice.a.events.upgrade??0)>(held.a.events.upgrade??0));choiceChecks.push({choice:s.choice,selected:id,pausedClock:true,audioPaused:true,overflow:false,evolutionCue:s.choice>1?'played':'not applicable'});await p.locator('canvas').focus();continue;}
  if(s.over){lastOver++;if(lastOver>12)break;if(fast)await p.clock.runFor(150);else await p.waitForTimeout(150);continue;}
  const stamp=Math.floor(s.runTime/30);if(stamp!==reported){reported=stamp;console.log(JSON.stringify({at:s.runTime,hp:s.player.hp,kills:s.kills,stage:s.stage,relay:s.relays[s.activeRelay]?.charge,build:s.build,tier:s.player.upgrade,alive:alive.length}));}
  const near=alive.sort((a,b)=>Math.hypot(a.x-s.player.x,a.y-s.player.y)-Math.hypot(b.x-s.player.x,b.y-s.player.y));const boss=alive.find(e=>e.kind==='elite');const relay=s.relays[s.activeRelay],charged=s.scraps.filter(x=>x.mode==='orbit'&&x.salvaged).length;
  const target=compare&&s.stage===0&&near.length?near[0]:s.stage===5?(s.bossLocked?relay:boss):relay&&!relay.done&&charged>0&&(near.length===0||Math.hypot(near[0].x-s.player.x,near[0].y-s.player.y)>180)?relay:near[0]??relay;
  const point=target??{x:m.width*.7,y:m.height*.3};
  let vx=0,vy=0;
  if(s.runTime>25){
   // Seek metal when empty; otherwise flank and evade. Input only, no world mutation.
   const loaded=s.scraps.filter(x=>x.mode==='orbit').length;
   let dest={x:m.width*.5+Math.cos(s.runTime*.1)*m.width*.22,y:m.height*.5+Math.sin(s.runTime*.1)*m.height*.2};
   if(loaded<5||charged===0){const scrap=s.scraps.filter(x=>x.mode==='loose'&&(charged>0||x.salvaged)).sort((a,b)=>Math.hypot(a.x-s.player.x,a.y-s.player.y)-Math.hypot(b.x-s.player.x,b.y-s.player.y))[0];if(scrap)dest=scrap;}
   else if(target?.shield>0){dest={x:target.x-Math.cos(target.facing)*160,y:target.y-Math.sin(target.facing)*160};}
   if(target&&loaded>=5&&charged>0&&!target.shield){const angle=Math.atan2(s.player.y-target.y,s.player.x-target.x)+.12;dest={x:target.x+Math.cos(angle)*175,y:target.y+Math.sin(angle)*175};}
   const dx=dest.x-s.player.x,dy=dest.y-s.player.y,len=Math.hypot(dx,dy)||1;vx=dx/len;vy=dy/len;
   for(const e of alive){const dx=s.player.x-e.x,dy=s.player.y-e.y,d=Math.hypot(dx,dy)||1;if(d<155){vx+=dx/d*(155-d)/35;vy+=dy/d*(155-d)/35;}if(e.windup>0||e.dash>0){const cross=(s.player.x-e.x)*-Math.sin(e.locked)+(s.player.y-e.y)*Math.cos(e.locked);if(Math.abs(cross)<85){const side=cross>=0?1:-1;vx+=-Math.sin(e.locked)*side*2;vy+=Math.cos(e.locked)*side*2;}}}
   if(s.lane&&s.lane.telegraph<.6){const axis=s.lane.axis,delta=s.player[axis]-s.lane.position;if(Math.abs(delta)<70){if(axis==='x')vx+=(delta>=0?1:-1)*3;else vy+=(delta>=0?1:-1)*3;}}
   if(s.player.x<95)vx+=2;if(s.player.x>m.width-95)vx-=2;if(s.player.y<130)vy+=2;if(s.player.y>m.height-110)vy-=2;
   if(s.stage===5&&boss&&Math.hypot(s.player.x-boss.x,s.player.y-boss.y)<145&&(s.player.x<100||s.player.x>m.width-100||s.player.y<140||s.player.y>m.height-120)){vx=(m.width/2-s.player.x)/100;vy=(m.height/2-s.player.y)/100;}const norm=Math.max(1,Math.hypot(vx,vy));vx/=norm;vy/=norm;
  }
  if(!mobile){const next=new Set();if(vx>.25)next.add('d');if(vx<-.25)next.add('a');if(vy>.25)next.add('s');if(vy<-.25)next.add('w');for(const k of pressed)if(!next.has(k))await p.keyboard.up(k);for(const k of next)if(!pressed.has(k))await p.keyboard.down(k);pressed=next;await p.mouse.move(b.x+(b.width-m.width*m.scale)/2+point.x*m.scale,b.y+(b.height-m.height*m.scale)/2+point.y*m.scale);}
  else {if(!moveTouch){await touch('touchStart',[[1,moveBase.x,moveBase.y]]);moveTouch=true;}const dx=point.x-s.player.x,dy=point.y-s.player.y,d=Math.hypot(dx,dy)||1;const points=[[1,moveBase.x+vx*36,moveBase.y+vy*36]];if(holding)points.push([2,aimBase.x+dx/d*34,aimBase.y+dy/d*34]);await touch('touchMove',points);}
  const loaded=s.scraps.filter(x=>x.mode==='orbit').length,wait=fast?s.time*1000-lastRelease:Date.now()-lastRelease;
  if(!holding&&wait>450&&!s.won){if(mobile)await touch('touchStart',[[1,moveBase.x+vx*36,moveBase.y+vy*36],[2,aimBase.x,aimBase.y]]);else await p.mouse.down();holding=true;lastRelease=fast?s.time*1000:Date.now();}
  else if(holding&&((s.runTime<25&&wait>1300)||(s.runTime>=25&&loaded>=7&&wait>700)||(loaded>0&&wait>1800))){if(mobile)await touch('touchEnd',[[2,aimBase.x,aimBase.y]]);else await p.mouse.up();holding=false;lastRelease=fast?s.time*1000:Date.now();}
  if(fast)await p.clock.runFor(140);else await p.waitForTimeout(140);
 }
 if(holding&&!mobile)await p.mouse.up();for(const k of pressed)await p.keyboard.up(k);
 const data=await p.evaluate(async()=>{const recordings={};for(const {r,flush}of Object.values(window.recorders)){await new Promise(resolve=>{r.onstop=resolve;r.stop()});await flush();}return{transitions:window.transitions,recordings,frames:window.runFrames,state:window.__magnet.snapshot(),metrics:window.__magnet.metrics(),samples:window.runSamples}});
 if(!mobile){for(const [name,dataUrl]of Object.entries(data.recordings))await writeFile(out+'/'+(name==='full'?'full-run':'highlight')+'.webm',Buffer.from(dataUrl.split(',')[1],'base64'));for(const [name,dataUrl]of Object.entries(data.frames))await writeFile(out+'/'+name+'.png',Buffer.from(dataUrl.split(',')[1],'base64'));}
 if(mobile)for(const [name,dataUrl]of Object.entries(data.frames))if(name.startsWith('lance-'))await writeFile(out+'/'+name+'.png',Buffer.from(dataUrl.split(',')[1],'base64'));await p.screenshot({path:out+(mobile?'/mobile-result.png':'/result.png')});delete data.recordings;delete data.frames;
 if(safety&&!interrupt){const button=p.locator('[data-choice=recycler]');const clean=await p.evaluate(()=>window.__magnet.snapshot());assert.equal(clean.encounter,'choice');assert.equal((await p.evaluate(()=>window.__magnet.metrics())).reduced,true);assert.equal((await p.evaluate(()=>window.__magnet.metrics())).audio.muted,true);
  await button.dispatchEvent('click');assert.equal((await p.evaluate(()=>window.__magnet.snapshot())).choices.length,0);
  const b=await button.boundingBox();await p.mouse.move(b.x+b.width/2,b.y+b.height/2);await p.mouse.up();await p.keyboard.up(' ');await p.clock.runFor(1600);assert.equal((await p.evaluate(()=>window.__magnet.snapshot())).choices.length,0);
  await p.locator('#pause').click();await button.dispatchEvent('click');assert.equal((await p.evaluate(()=>window.__magnet.snapshot())).choices.length,0);await p.locator('#resume').click();
  await button.focus();await p.keyboard.press('Enter');const equip=await p.evaluate(()=>window.__magnet.snapshot());assert.equal(equip.encounter,'equip');assert.equal(equip.choices.length,1);await p.clock.runFor(60);await p.screenshot({path:'docs/qa/game004-magnet-tempo-r2-1/equip-muted-reduced.png'});await button.dispatchEvent('click');assert.equal((await p.evaluate(()=>window.__magnet.snapshot())).choices.length,1);await p.locator('#restart').click();await p.clock.runFor(1400);const retry=await p.evaluate(()=>window.__magnet.snapshot());assert.equal(retry.stage,0);assert.equal(retry.choices.length,0);assert.equal(retry.encounter,'combat');choiceChecks.push({syntheticClickRejected:true,releaseWithoutNewPressRejected:true,heldKeyReleaseRejected:true,choicePauseSafe:true,freshKeyboardAccepted:true,duplicateRejected:true,equipRetryClean:true,mutedReducedReadable:true});
 }
 if(safety)await writeFile('docs/qa/game004-magnet-tempo-r2-1/feedback-'+(interrupt?'interrupt':'choice')+'.json',JSON.stringify({status:'PASS',checks:choiceChecks,errors,external,mode:'accelerated browser clock; actual DOM input, no world mutation'},null,2));
 if(data.state.over){await p.locator('#retry').click();if(fast)await p.clock.runFor(100);else await p.waitForTimeout(100);data.retryAfterResult=await p.evaluate(()=>{const s=window.__magnet.snapshot();return{stage:s.stage,runTime:s.runTime,build:s.build,choiceCount:s.choices.length,over:s.over}});if(data.retryAfterResult.stage!==0||data.retryAfterResult.runTime!==0||data.retryAfterResult.build!=='base')throw Error('Result retry leaked state');}data.testMode=fast?'accelerated browser clock / NOT realtime performance':'realtime ordinary input';data.branch=branch;data.choiceChecks=choiceChecks;
 await writeFile(out+(mobile?'/mobile-run.json':'/play-results.json'),JSON.stringify({errors,external,...data},null,2));console.log(JSON.stringify({won:data.state.won,time:data.state.runEndedAt,kills:data.state.kills,upgrades:data.state.upgrades,hp:data.state.player.hp,peak:data.state.peak,metrics:data.metrics,errors}));
 if(errors.length||external.length||(!compare&&!data.state.won)||data.state.runEndedAt>600||(!compare&&(data.state.choices.length!==3||data.state.evolution!==2)))process.exitCode=1;
}finally{await browser.close();}




