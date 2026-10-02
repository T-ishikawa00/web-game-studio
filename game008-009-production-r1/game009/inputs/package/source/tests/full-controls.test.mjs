import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame} from '../src/product/kiln-game.js';
import {CONTROLS} from '../src/product/kiln-render.js';

function makeGame(language='en', checkpoint={mode:'ember-glaze-campaign-v1',campaignVersion:1,stage:0,seed:9,runId:'control-test',qualities:[]}, preview=false) {
  let currentLanguage=language;
  let report = null;
  const game = createGame({
    ctx: {},
    audio: {play(){},pause(){},unlock:async()=>{}},
    settings: () => ({reducedMotion:false,highContrast:false}),
    lang: () => currentLanguage,
    onReport: next => { report = next; }
  });
  if(preview)game.preview(checkpoint);else game.reset(checkpoint);
  return {game,get report(){return report;},setLanguage(value){currentLanguage=value;game.refresh();}};
}

function fuelPercent(report, language='en') {
  const label = language === 'ja' ? '燃料' : 'Fuel';
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const match = new RegExp(`${escaped}\\s+(\\d+(?:\\.\\d+)?)%`).exec(report.detail);
  assert.ok(match, `public report should contain a percentage fuel reading: ${report.detail}`);
  const value = Number(match[1]);
  assert.ok(value >= 0 && value <= 100, `fuel percentage must stay within 0–100: ${value}`);
  return value;
}

function stokePoint() {
  const control = CONTROLS.stoke;
  return {x:control.x+control.w/2,y:control.y+control.h/2};
}

function assertFinishReadout(report, language) {
  const marker=language==='ja'?'仕上げ可能':'FINISH READY';
  assert.equal(report.detail.includes(marker),report.finishReady,
    'the visible readiness label must match the public finishReady fact');
}

test('public JA and EN reports expose localized temperature, ember, vent, fuel and next target', () => {
  const ja = makeGame('ja');
  assert.equal(ja.report.status,'running');
  for(const label of ['火種','通気','燃料','次','残り']) assert.ok(ja.report.detail.includes(label),`Japanese public HUD is missing ${label}`);
  assert.match(ja.report.detail,/\d+–\d+°/);
  assert.equal(fuelPercent(ja.report,'ja'),100);
  assertFinishReadout(ja.report,'ja');

  const en = makeGame('en');
  assert.equal(en.report.status,'running');
  for(const label of ['Ember','Vent','Fuel','Next','Left']) assert.ok(en.report.detail.includes(label),`English public HUD is missing ${label}`);
  assert.match(en.report.detail,/\d+–\d+°/);
  assert.equal(fuelPercent(en.report),100);
  assertFinishReadout(en.report,'en');
});

test('Space and Enter are independent held sources until their matching keyup', () => {
  const bothHeld = makeGame();
  bothHeld.game.key('Space');
  bothHeld.game.key('Enter');
  bothHeld.game.keyUp('Space');
  bothHeld.game.step(1);
  bothHeld.game.refresh();

  const bothReleased = makeGame();
  bothReleased.game.key('Space');
  bothReleased.game.key('Enter');
  bothReleased.game.keyUp('Space');
  bothReleased.game.keyUp('Enter');
  bothReleased.game.step(1);
  bothReleased.game.refresh();

  assert.equal(bothHeld.report.status,'running');
  assert.equal(bothReleased.report.status,'running');
  assert.ok(fuelPercent(bothHeld.report)<fuelPercent(bothReleased.report),
    'the still-held Enter source should continue feeding fuel after Space is released');
});

test('pointer release does not cancel a held key, and cancel releases every source', () => {
  const pointerAndKey = makeGame();
  pointerAndKey.game.pointer('down',stokePoint());
  pointerAndKey.game.key('Space');
  pointerAndKey.game.pointer('up',stokePoint());
  pointerAndKey.game.step(1);
  pointerAndKey.game.refresh();

  const released = makeGame();
  released.game.pointer('down',stokePoint());
  released.game.key('Space');
  released.game.pointer('up',stokePoint());
  released.game.keyUp('Space');
  released.game.step(1);
  released.game.refresh();
  assert.ok(fuelPercent(pointerAndKey.report)<fuelPercent(released.report),
    'releasing the pointer must leave the keyboard hold active');

  const cancelled = makeGame();
  cancelled.game.key('Space');
  cancelled.game.cancel();
  cancelled.game.step(.8);
  cancelled.game.refresh();

  const keyReleased = makeGame();
  keyReleased.game.key('Space');
  keyReleased.game.keyUp('Space');
  keyReleased.game.step(.8);
  keyReleased.game.refresh();
  assert.equal(fuelPercent(cancelled.report),fuelPercent(keyReleased.report),
    'cancel must stop held heat while preserving the single tap already applied');

  const pointerCancelled = makeGame();
  pointerCancelled.game.pointer('down',stokePoint());
  pointerCancelled.game.cancel();
  pointerCancelled.game.step(.8);
  pointerCancelled.game.refresh();

  const pointerReleased = makeGame();
  pointerReleased.game.pointer('down',stokePoint());
  pointerReleased.game.pointer('up',stokePoint());
  pointerReleased.game.step(.8);
  pointerReleased.game.refresh();
  assert.equal(fuelPercent(pointerCancelled.report),fuelPercent(pointerReleased.report),
    'cancel must release pointer-held heat while preserving its single tap');
});

test('pointer hold uses the public stoke control and F cannot award an unearned firing', () => {
  const pointer = makeGame();
  const initialFuel = fuelPercent(pointer.report);
  pointer.game.pointer('down',stokePoint());
  pointer.game.step(1);
  pointer.game.pointer('up',stokePoint());
  pointer.game.refresh();
  assert.ok(fuelPercent(pointer.report)<initialFuel,'a normal pointer hold spends the visible fuel reserve');

  const premature = makeGame();
  premature.game.key('f');
  premature.game.refresh();
  assertFinishReadout(premature.report,'en');
  assert.equal(premature.report.status,'running');
  assert.equal(premature.report.checkpoint.stage,0);
  assert.deepEqual(premature.report.qualities,[]);
  premature.game.step(.2);
  premature.game.refresh();
  assertFinishReadout(premature.report,'en');
  assert.equal(premature.report.status,'running','an early finish command cannot force a win');
  assert.deepEqual(premature.report.qualities,[],'a premature finish awards no grade');
});

test('a saved third-chapter preview keeps the pitcher, completed grades and zero elapsed progress across language changes', () => {
  const saved={mode:'ember-glaze-campaign-v1',campaignVersion:1,stage:2,seed:7301,runId:'saved-third',qualities:[71,84]};
  const preview=makeGame('en',saved,true);
  const before=preview.report;
  assert.equal(before.status,'idle');
  assert.equal(before.stage,2);
  assert.equal(before.profileName,'Evening pitcher');
  assert.deepEqual(before.qualities,[71,84]);
  assert.deepEqual(before.checkpoint,saved);
  assert.equal(before.progress.value,2,'a chapter preview shows the completed chapter boundary, not firing time');
  assert.equal(before.progress.goal,3);
  assert.equal(before.finishReady,false);

  preview.game.key('Space');
  preview.game.keyUp('Space');
  preview.game.key('ArrowRight');
  preview.game.key('f');
  preview.game.pointer('down',stokePoint());
  preview.game.pointer('up',stokePoint());
  preview.game.step(120);
  preview.game.refresh();
  assert.equal(preview.report.status,'idle','preview input must not start a firing or award a result');
  assert.equal(preview.report.profileName,'Evening pitcher');
  assert.deepEqual(preview.report.checkpoint,saved);
  assert.deepEqual(preview.report.qualities,[71,84]);
  assert.equal(preview.report.progress.value,2);
  assert.equal(preview.report.detail,before.detail,'keys and elapsed steps must not mutate hidden firing facts in preview');

  preview.setLanguage('ja');
  assert.equal(preview.report.status,'idle');
  assert.equal(preview.report.profileName,'宵の水差し');
  assert.ok(preview.report.detail.includes('次'));
  assert.deepEqual(preview.report.qualities,[71,84]);
  assert.deepEqual(preview.report.checkpoint,saved);
  assert.equal(preview.report.progress.value,2);

  preview.setLanguage('en');
  assert.equal(preview.report.profileName,'Evening pitcher');
  assert.equal(preview.report.status,'idle');
  assert.deepEqual(preview.report.checkpoint,saved);
  assert.deepEqual(preview.report.qualities,[71,84]);
});
