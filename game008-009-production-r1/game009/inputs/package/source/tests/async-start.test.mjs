import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { unlockThenStart } from '../src/common/async-start.js';

const appSource = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

test('a slice change while audio unlock waits cannot start the stale game', async () => {
  const gate = deferred();
  let loadGeneration = 1;
  let startGeneration = 4;
  let game = { id: 'lens' };
  const candidate = game;
  const capturedLoad = loadGeneration;
  const capturedStart = startGeneration;
  let resetCount = 0;
  const pending = unlockThenStart({ unlock: () => gate.promise }, {
    isCurrent: () => capturedStart === startGeneration && capturedLoad === loadGeneration && candidate === game,
    start: () => { resetCount++; }
  });

  loadGeneration++;
  startGeneration++;
  game = { id: 'kiln' };
  gate.resolve();

  assert.equal(await pending, false);
  assert.equal(resetCount, 0);
});

test('audio failure still starts the current game and reports the blocked context', async () => {
  let started = false;
  let reported = false;
  const ready = await unlockThenStart({ unlock: async () => { throw Error('gesture denied'); } }, {
    isCurrent: () => true,
    onBlocked: () => { reported = true; },
    start: () => { started = true; }
  });
  assert.equal(ready, true);
  assert.equal(reported, true);
  assert.equal(started, true);
});

test('a stale rejected audio unlock cannot change the newer pending start',async()=>{
 let rejectOld,resolveNew;
 const oldGate=new Promise((resolve,reject)=>{rejectOld=reject;});
 const newGate=new Promise(resolve=>{resolveNew=resolve;});
 let generation=1,pending=true,started=0;
 const old=unlockThenStart({unlock:()=>oldGate},{isCurrent:()=>generation===1,onBlocked:()=>{pending=false;},start:()=>{started++;}});
 generation=2;
 const fresh=unlockThenStart({unlock:()=>newGate},{isCurrent:()=>generation===2,onBlocked:()=>{pending=false;},start:()=>{started++;}});
 rejectOld(Error('old request rejected'));
 assert.equal(await old,false);
 assert.equal(pending,true,'a stale rejection must leave the newer request cancellable');
 generation++;// The player pauses while the newer unlock is still waiting.
 pending=false;
 resolveNew();
 assert.equal(await fresh,false);
 assert.equal(started,0);
});

test('single-product start remains tied to the latest user intent across audio unlock', async () => {
  const startStart = appSource.indexOf('async function start()');
  const startEnd = appSource.indexOf('\nfunction pause()', startStart);
  const start = appSource.slice(startStart, startEnd);
  const pauseStart = startEnd + 1;
  const pauseEnd = appSource.indexOf('\nconst playable=', pauseStart);
  const pause = appSource.slice(pauseStart, pauseEnd);

  assert.ok(start.includes('const token=++startGeneration,intent=action'), 'each explicit start captures a fresh user intent');
  assert.ok(start.includes('await unlockThenStart(audio,{'));
  assert.ok(start.includes('isCurrent:()=>token===startGeneration'), 'unlock completion must still match the latest start generation');
  assert.ok(start.includes("if(intent==='advance'){game.advance();}") && start.includes("else if(intent==='retry'){game.retry();}"), 'the captured intent selects the real campaign transition');
  assert.ok(start.includes("else if(intent==='saved'&&checkpointAvailable())"), 'a stored chapter can resume only after the current save is rechecked');
  assert.ok(pause.includes('if(startPending){startGeneration++;startPending=false;audio.pause();return;}'), 'pause cancels and silences a pending start');
  assert.ok(appSource.includes("$('reset-confirm').addEventListener('click',()=>{if(!store.reset())"), 'save reset remains an explicit stop boundary');

  for (const cancel of ['pause', 'reset']) {
    const gate = deferred();
    let generation = 10;
    let started = 0;
    const captured = generation;
    const pending = unlockThenStart({unlock: () => gate.promise}, {
      isCurrent: () => captured === generation,
      start: () => { started++; }
    });
    generation++;
    gate.resolve();
    assert.equal(await pending, false, `${cancel} invalidates a pending unlock`);
    assert.equal(started, 0, `${cancel} does not start stale gameplay`);
  }
});
