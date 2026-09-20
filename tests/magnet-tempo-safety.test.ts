import test from 'node:test';
import assert from 'node:assert/strict';
import {MagnetWorld,TUNE} from '../game004-magnet-tempo/core.ts';
const step=(w:MagnetWorld,n:number)=>{for(let t=0;t<n-1e-9;t+=TUNE.step)w.update(Math.min(TUNE.step,n-t));};
function supply(w:MagnetWorld,n:number,stage=w.stage){for(let i=0;i<n;i++){w.addScrap(100+i,150,0,true);w.scraps.at(-1)!.earnedStage=stage;}}
test('automatic delivery uses exactly the current quota, preserves old charge, surplus, metal and reward',()=>{
 const w=new MagnetWorld();w.started=true;w.enemies=[];supply(w,7,-1);supply(w,20);const ids=w.scraps.map(s=>s.id),rewards=w.scraps.filter(s=>s.reward).length;
 w.autoFeed();assert.equal(w.relays[0]!.charge,14);assert.equal(w.activeRelay,1);assert.deepEqual(w.scraps.map(s=>s.id),ids);assert.equal(w.scraps.filter(s=>s.salvaged&&s.earnedStage===-1).length,7);assert.equal(w.scraps.filter(s=>s.salvaged&&s.earnedStage===0).length,6);assert.equal(w.scraps.filter(s=>s.reward).length,rewards);
 w.autoFeed();assert.equal(w.counters['auto-charge'],14);assert.equal(w.counters['relay-0-0'],1);
});
test('no automatic spending during combat or reactor locks; manual power window remains tactical',()=>{
 const w=new MagnetWorld();w.started=true;supply(w,14);w.autoFeed();assert.equal(w.relays[0]!.charge,0);
 for(const s of w.scraps.filter(s=>s.salvaged))w.feedRelay(w.relays[0]!,s);
 assert.equal(w.counters['power-window'],1);assert.ok(w.enemies.every(e=>e.recover===3));
 w.enterStage(5);const c=w.scraps.filter(s=>s.salvaged).length;w.autoFeed();assert.equal(w.bossLocked,true);assert.equal(w.scraps.filter(s=>s.salvaged).length,c);
});
test('insufficient energy never borrows old stock and allows the unchanged reinforcement path',()=>{
 const w=new MagnetWorld();w.started=true;w.enemies=[];supply(w,10,-1);supply(w,3);w.nextArrival=100;step(w,.4);assert.equal(w.relays[0]!.charge,3);assert.equal(w.scraps.filter(s=>s.salvaged&&s.earnedStage===-1).length,10);step(w,2);assert.ok(w.enemies.some(e=>!e.dead));assert.equal(w.encounter,'combat');
});
test('last break survives a 650ms clear, exact one choice, no hostile simulation, no run-time padding',()=>{
 const w=new MagnetWorld();w.started=true;w.runTime=40;w.enemies=[];w.relays[0]!.done=true;w.burst(120,150,10,'#fff');w.scraps[0]!.mode='shot';w.releaseIn=.01;w.director(0);
 assert.equal(w.encounter,'settle');assert.equal(w.scraps.filter(s=>s.mode==='shot').length,0);assert.ok(w.particles.length);const hp=w.player.hp,t=w.runTime;w.damage();step(w,.64);assert.equal(w.encounter,'settle');assert.equal(w.player.hp,hp);assert.equal(w.runTime,t);step(w,.01);assert.equal(w.encounter,'choice');assert.equal(w.counters['circuit-secured'],1);assert.equal(w.counters['choice-open-1'],1);step(w,20);assert.equal(w.runTime,t);assert.equal(w.counters['stage-clear-0'],1);
 assert.equal(w.choose('rack'),true);assert.equal(w.choose('guard'),false);assert.equal(w.encounter,'equip');step(w,.17);assert.equal(w.stage,0);step(w,.01);assert.equal(w.stage,1);assert.equal(w.choices.length,1);assert.equal(w.scraps.some(s=>s.mode==='shot'),false);
});
test('pause and Retry cancel every delayed stage, choice and equipment event',()=>{
 for(const phase of ['settle','equip']){const w=new MagnetWorld();w.started=true;w.enemies=[];w.relays[0]!.done=true;w.director(0);if(phase==='equip'){step(w,.65);w.choose('guard');}w.paused=true;const t=w.time;step(w,10);assert.equal(w.time,t);w.reset();w.paused=false;step(w,1);assert.equal(w.stage,0);assert.equal(w.encounter,'combat');assert.equal(w.choice,0);assert.equal(w.choices.length,0);assert.equal(w.counters['circuit-secured'],undefined);assert.equal(w.links.length,0);}
});
test('multi-relay auto delivery is ordered and leaves excess for the next sector',()=>{
 const w=new MagnetWorld();w.enterStage(1);w.enemies=[];supply(w,40);w.autoFeed();assert.deepEqual(w.relays.map(r=>r.charge),[18,18]);assert.equal(w.activeRelay,2);assert.equal(w.scraps.filter(s=>s.salvaged).length,4);w.enterStage(2);w.enemies=[];w.autoFeed();assert.equal(w.relays[0]!.charge,0);assert.equal(w.scraps.filter(s=>s.salvaged).length,4);
});
test('reduced motion and mute-independent simulation retain completion and recover pickup credit',()=>{
 const w=new MagnetWorld();w.started=true;w.reduced=true;w.enemies=[];w.scraps=[];supply(w,14);for(const s of w.scraps){s.x=w.player.x;s.y=w.player.y;s.returnAt=0;}w.autoFeed();w.director(0);step(w,.65);assert.equal(w.encounter,'choice');assert.equal(w.counters['circuit-secured'],1);assert.equal(w.player.upgrade,1);assert.equal(w.armor,14);
});
