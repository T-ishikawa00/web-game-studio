import { COURSES } from './courses.js';
import { GRAVITY, MAX_CHARGE_SECONDS, FOOT_RADIUS, chargePower, launchVelocity, advanceBallistic, landingCrossing, padAt } from './physics.js';
import { render } from './render.js';
import { createStore } from '../shared/save.js';
import { createSynth } from '../shared/audio.js';
import { attachCapture } from '../shared/capture.js';

const $ = id => document.getElementById(id);
const canvas = $('gameCanvas'), frame = $('gameFrame'), ctx = canvas.getContext('2d', { alpha: false });
const SAVE_KEY = 'tinlumo:game008:coilhop:v1';
const defaults = { completed: {}, best: {}, settings: { lang: 'ja', sound: true, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, course: 0 } };
const store = createStore(SAVE_KEY, defaults);
let snapshot = store.read(), record = snapshot.ok ? snapshot.value : { ...structuredClone(defaults), generation: 0 };
const requestedLanguage = new URLSearchParams(location.search).get('lang');
const portalMode = new URLSearchParams(location.search).get('portal') === '1';
let generation = record.generation, lang = requestedLanguage === 'en' || requestedLanguage === 'ja' ? requestedLanguage : record.settings.lang === 'en' ? 'en' : 'ja', sound = record.settings.sound !== false;
let reducedMotion = record.settings.reducedMotion === true;
let mode = 'menu', pausedMode = 'ready', courseIndex = 0, currentId = 0, checkpointId = 0, targetIds = [], player;
let time = 0, runSeconds = 0, chargeStarted = 0, fallingAt = 0, pointerId = null, keyboardHeld = false, last = performance.now(), falls = 0, hops = 0;
let particles = [], toast = '', toastUntil = 0, groundedOffset = 0, camera = { x: 240, y: 540, scale: 1 }, cameraReady = false;
let view = { width: 800, height: 520, dpr: 1 }, storageReason = snapshot.ok ? '' : snapshot.reason, lastAnnouncedCharge = -1;
let resetReturn = 'menu';
let motionPhase = 0, branches = {};
const synth = createSynth(() => ({ sound }));
const activeModes = new Set(['ready', 'charging', 'flying', 'falling']);
const tr = (ja, en) => lang === 'ja' ? ja : en;
const title = () => COURSES[courseIndex].title[lang];
const padById = id => COURSES[courseIndex].pads.find(p => p.id === id);
const positionOf = (pad, at = time) => padAt(pad, at + motionPhase);
const progress = () => COURSES.filter(c => record.completed[c.id] === true).length;
const unlocked = i => Number.isInteger(i) && i >= 0 && i < COURSES.length && (i === 0 || record.completed[COURSES[i - 1].id] === true);
const text = (id, value) => { $(id).textContent = value; };

function announce(message) { text('gameStatus', message); $('gameStatus').dataset.state = mode; }
function cue(kind, power = 0) {
  if (kind === 'charge') synth.tone([230 + power * 260], { type: 'triangle', duration: .07, volume: .055 });
  else if (kind === 'jump') synth.tone([250 + power * 140, 500 + power * 200], { type: 'triangle', duration: .16, volume: .10, slide: 1.25, spacing: .035 });
  else if (kind === 'land') synth.tone([210, 470], { duration: .12, volume: .105 });
  else if (kind === 'beacon') synth.tone([480, 660, 880], { duration: .24, volume: .13, spacing: .10 });
  else if (kind === 'fall') synth.tone([220, 120], { type: 'triangle', duration: .23, volume: .08, slide: .65 });
  else if (kind === 'clear') synth.tone([523.25, 659.25, 783.99, 1046.5], { duration: .55, volume: .14, spacing: .13 });
}
function notify(value, duration = 1.7) { toast = value; toastUntil = time + duration; announce(value); }
function burst(x, y, color = '#ffd68a') {
  if (reducedMotion) return;
  for (let i = 0; i < 14; i++) { const angle = Math.PI * 2 * i / 14; particles.push({ x, y, vx: Math.cos(angle) * (28 + i * 2), vy: Math.sin(angle) * 55 - 25, life: .65, color }); }
}
function refreshStorageNote() {
  $('saveNote').hidden = !storageReason;
  text('saveNote', storageReason === 'malformed-data' || storageReason === 'unknown-version'
    ? tr('保存データを読み込めません。元のデータを残してプレイできます。リセットは設定から行えます。', 'This record cannot be read. Original data is preserved; you can still play. Reset is available in settings.')
    : tr('このブラウザーでは記録を保存できません。プレイは続けられます。', 'This browser cannot save the record. You can still play.'));
}
function writeRecord(patch) {
  const result = store.write({ ...patch, completed: { ...record.completed, ...(patch.completed || {}) }, best: { ...record.best, ...(patch.best || {}) } });
  if (result.ok) { record = result.value; generation = record.generation; storageReason = ''; }
  else {
    storageReason = result.reason;
    if (result.reason === 'stale-generation') externalReset();
    else {
      // A blocked browser store must not block this session's campaign.
      Object.assign(record.settings, patch.settings || {});
      for (const [id, value] of Object.entries(patch.completed || {})) if (value) record.completed[id] = true;
      for (const [id, value] of Object.entries(patch.best || {})) record.best[id] = Math.max(record.best[id] || 0, value);
    }
  }
  refreshStorageNote();
  return result.ok;
}
function cancelCharge(releaseCapture = true) {
  const id = pointerId; pointerId = null; keyboardHeld = false; player && (player.power = 0);
  text('chargeAccessible', tr('チャージ 0パーセント。', 'Charge 0 percent.'));
  if (mode === 'charging') mode = 'ready';
  if (releaseCapture && id !== null) { try { if (canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id); } catch {} }
}
function externalReset() {
  cancelCharge(); synth.stop(); mode = 'external-reset'; pausedMode = 'menu'; particles = [];
  const fresh = store.read();
  if (fresh.ok) { record = fresh.value; generation = record.generation; storageReason = ''; }
  else storageReason = fresh.reason;
  courseIndex = 0; checkpointId = 0; hops = 0; falls = 0; time = 0; runSeconds = 0; groundAt(0); cameraReady = false;
  overlay(); hud(); refreshStorageNote();
  announce(tr('別のタブで記録がリセットされました。この挑戦は終了し、古い進捗を保存しません。', 'Another tab reset this record. This attempt ended; old progress will not be saved.'));
}
function groundAt(id) {
  currentId = id; targetIds = [...(padById(id).next || [])];
  const p = positionOf(padById(id));
  player = { x: p.x, y: p.y, vx: 0, vy: 0, power: 0, grounded: true, flying: false, landingAt: time };
  groundedOffset = 0;
}
function startCourse(index, fromBeacon = false) {
  if (!Number.isInteger(index) || !COURSES[index] || !unlocked(index)) return;
  cancelCharge(); synth.stop();
  courseIndex = index;
  if (!fromBeacon) { checkpointId = 0; time = 0; runSeconds = 0; falls = 0; hops = 0; branches = {}; motionPhase = record.completed[COURSES[index].id] ? (performance.now() % 17000) / 1000 : 0; }
  else for (const source of Object.keys(branches)) if (Number(source) >= checkpointId) delete branches[source];
  groundAt(fromBeacon ? checkpointId : 0); mode = 'ready'; last = performance.now(); cameraReady = false; particles = []; toast = '';
  $('courseMap').hidden = true; overlay(); settings(); hud(); canvas.focus({ preventScroll: true });
  if (!fromBeacon) writeRecord({ settings: { course: index } });
  announce(COURSES[index].hint[lang]); synth.unlock();
}
function charge() {
  if (mode !== 'ready') return;
  mode = 'charging'; chargeStarted = time; lastAnnouncedCharge = -1; synth.unlock(); cue('charge');
  announce(tr('バネを縮めています。離すと跳びます。', 'Spring compressing. Release to jump.'));
}
function release() {
  if (mode !== 'charging') return;
  const power = chargePower(time - chargeStarted);
  Object.assign(player, launchVelocity(power), { grounded: false, flying: true, power });
  mode = 'flying'; hops++; cue('jump', power); overlay();
  announce(tr('ジャンプ。空中では曲がれません。', 'Jump launched. No steering in the air.'));
}
function pause() {
  if (!activeModes.has(mode)) return;
  if (mode === 'charging') cancelCharge();
  pausedMode = mode; cancelCharge(); mode = 'paused'; synth.stop(); overlay(); settings();
  announce(tr('一時停止中です。チャージは解除しました。', 'Paused. Any charge was canceled.'));
}
function resume() {
  if (mode !== 'paused') return;
  mode = pausedMode; last = performance.now(); overlay(); settings(); canvas.focus({ preventScroll: true });
  announce(tr('再開しました。', 'Resumed.'));
}
function fail() {
  if (mode !== 'falling') return;
  mode = 'failed'; falls++; cue('fall'); cancelCharge(); overlay(); settings();
  announce(tr('落下しました。最後の灯りからすぐ再挑戦できます。', 'You fell. Retry immediately from your latest lantern.'));
}
function clearCourse() {
  mode = courseIndex === COURSES.length - 1 ? 'finale' : 'course-clear';
  cancelCharge(); player.grounded = true; player.flying = false; cue('clear'); burst(player.x, player.y - 32);
  const medal = falls === 0 ? 3 : falls <= 3 ? 2 : 1;
  const completed = { [COURSES[courseIndex].id]: true };
  for (const [source, target] of Object.entries(branches)) completed[`${COURSES[courseIndex].id}:path:${source}:${target}`] = true;
  writeRecord({ completed, best: { [`medal:${COURSES[courseIndex].id}`]: medal }, settings: { course: Math.min(COURSES.length - 1, courseIndex + 1) } });
  // A generation change during the write invalidates this completion panel too.
  if (mode === 'external-reset') return;
  overlay(); hud(); settings();
  announce(tr('灯りがつながりました。コースクリア！', 'The lanterns are connected. Course clear!'));
}
function land(pad, position, crossing) {
  if (targetIds.length > 1) branches[currentId] = pad.id;
  player.x = crossing.x; player.y = position.y; player.vx = 0; player.vy = 0; player.grounded = true; player.flying = false; player.power = 0; player.landingAt = time;
  groundedOffset = Math.max(-pad.width * .4, Math.min(pad.width * .4, crossing.x - position.x));
  currentId = pad.id; targetIds = [...(pad.next || [])]; mode = 'ready'; cue('land'); burst(player.x, player.y);
  text('chargeAccessible', tr('チャージ 0パーセント。', 'Charge 0 percent.'));
  if (pad.beacon) { checkpointId = pad.id; cue('beacon'); notify(tr('灯り点灯！ ここから再挑戦', 'LANTERN LIT · Retry from here')); }
  else notify(tr('着地！', 'LANDED'));
  if (pad.final) clearCourse();
}
function tick(dt) {
  if (!activeModes.has(mode)) return;
  time += dt; runSeconds += dt;
  if (player.grounded) {
    const p = positionOf(padById(currentId));
    groundedOffset *= Math.exp(-dt * 10); player.x = p.x + groundedOffset; player.y = p.y;
    player.power = mode === 'charging' ? chargePower(time - chargeStarted) : 0;
    if (mode === 'charging') {
      const tier = Math.min(4, Math.floor(player.power * 4));
      if (tier !== lastAnnouncedCharge) { lastAnnouncedCharge = tier; text('chargeAccessible', tr(`チャージ ${tier * 25}パーセント。`, `Charge ${tier * 25} percent.`)); if (tier > 0) cue('charge', player.power); }
    }
  } else {
    const before = { ...player }, next = advanceBallistic(player, dt, GRAVITY);
    Object.assign(player, next);
    if (mode === 'flying') {
      let bestLanding;
      for (const id of targetIds) {
        const pad = padById(id), p = positionOf(pad), prior = positionOf(pad, time - dt);
        const relativeBefore = { ...before, y: before.y - prior.y + p.y };
        const cross = landingCrossing(relativeBefore, next, p, FOOT_RADIUS);
        if (cross && (!bestLanding || cross.fraction < bestLanding.cross.fraction)) bestLanding = { pad, p, cross };
      }
      if (bestLanding) land(bestLanding.pad, bestLanding.p, bestLanding.cross);
      else if (player.vy > 0) {
        const targets = targetIds.map(id => positionOf(padById(id)));
        if (targets.length && player.y > Math.max(...targets.map(p => p.y)) + 45) {
          mode = 'falling'; fallingAt = time;
          const right = Math.max(...targets.map(p => p.right)), left = Math.min(...targets.map(p => p.left));
          notify(player.x < left ? tr('少し短い。次は長めに縮めよう', 'SHORT · Hold a little longer') : player.x > right ? tr('飛びすぎ。次は少し早く離そう', 'LONG · Release a little sooner') : tr('高さが足りない。もう少し縮めよう', 'LOW · Compress a little more'));
        }
      }
    }
    if (mode === 'falling' && time - fallingAt >= .8) fail();
  }
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 75 * dt; p.life -= dt; }
}
function hud() {
  text('courseName', `${String(courseIndex + 1).padStart(2, '0')} / ${COURSES.length} · ${title()}`);
  const course = COURSES[courseIndex], linearCount = course.pads.length - 1;
  text('hopLabel', tr(`灯り ${progress()} / ${COURSES.length}`, `LANTERNS ${progress()} / ${COURSES.length}`));
  text('beaconLabel', checkpointId ? tr('灯りから再挑戦', 'LANTERN CHECKPOINT') : tr('出発の足場', 'STARTING LEDGE'));
  const power = mode === 'charging' ? player.power : 0;
  text('chargeValue', `${Math.round(power * 100)}%`); $('chargeFill').style.width = `${power * 100}%`;
  text('chargeHint', mode === 'flying' || mode === 'falling' ? tr('着地点を見よう', 'WATCH THE LANDING') : tr('押し続ける → 離して跳ぶ', 'HOLD → RELEASE TO HOP'));
  frame.dataset.state = mode; frame.dataset.course = course.id; frame.dataset.pad = String(currentId);
  frame.dataset.checkpoint = String(checkpointId);
}
function settings() {
  document.documentElement.lang = lang;
  document.title = tr('COILHOP — 雲の上の灯り', 'COILHOP — Lanterns above the clouds');
  text('tagline', tr('バネを縮めて、灯りをつなぐ。', 'Compress the spring. Connect the lanterns.'));
  text('overlayEyebrow', tr('灯りの庭を、ひと跳びずつ。', 'LANTERN GARDENS · ONE HOP AT A TIME'));
  text('mapKicker', tr('雲の上へ', 'ABOVE THE CLOUDS')); text('mapTitle', tr('8つの空中庭園', 'Eight sky gardens'));
  text('mapCopy', tr('庭園をクリアすると次のコースが開きます。', 'Complete a garden to unlock the next course.'));
  text('mapFootnote', tr('金：落下なし · 銀：落下3回以内 · 違う道でも挑戦しよう', 'Gold: no falls · Silver: at most 3 falls · Try another path'));
  text('controlNote', tr('Space または画面を押し続けて離す', 'Hold / release Space or the field'));
  text('footerDetail', tr('縮める → 離す → 着地', 'COMPRESS → RELEASE → LAND'));
  canvas.tabIndex = 0;
  frame.setAttribute('aria-label', tr('COILHOPのゲーム画面', 'COILHOP game field'));
  document.querySelector('.brand').setAttribute('aria-label', portalMode ? tr('ゲーム一覧へ戻る', 'Return to all games') : tr('道しるべを開く', 'Open route map'));
  document.querySelector('.utilities').setAttribute('aria-label', tr('ゲーム設定', 'Game settings'));
  document.querySelector('.hud-top').setAttribute('aria-label', tr('登頂状況', 'Ascent progress'));
  document.querySelector('.charge-panel').setAttribute('aria-label', tr('バネのチャージ', 'Spring charge'));
  $('courseList').setAttribute('aria-label', tr('コース一覧', 'Course list'));
  $('mapClose').setAttribute('aria-label', tr('閉じる', 'Close'));
  text('languageButton', lang === 'ja' ? 'EN' : '日本語'); $('languageButton').setAttribute('aria-label', tr('Switch to English', '日本語に切り替える'));
  text('soundButton', tr(`音 ${sound ? 'ON' : 'OFF'}`, `Sound ${sound ? 'ON' : 'OFF'}`)); $('soundButton').setAttribute('aria-pressed', String(sound));
  $('soundButton').setAttribute('aria-label', tr(sound ? '音を消す' : '音を出す', sound ? 'Mute sound' : 'Enable sound'));
  text('motionButton', tr(`演出 ${reducedMotion ? '少' : '標準'}`, reducedMotion ? 'Less effects' : 'Effects')); $('motionButton').setAttribute('aria-pressed', String(reducedMotion));
  $('motionButton').setAttribute('aria-label', tr('演出をひかえめにする', 'Reduce visual effects'));
  text('pauseButton', mode === 'paused' ? tr('再開', 'Resume') : tr('停止', 'Pause')); $('pauseButton').hidden = !activeModes.has(mode) && mode !== 'paused';
  text('mapButton', tr('コース', 'Courses')); text('mapClose', '×'); text('resetButton', tr('記録をリセット', 'Reset record'));
  if (mode !== 'charging') text('chargeAccessible', tr('チャージ 0パーセント。', 'Charge 0 percent.'));
  text('homeLink', portalMode ? tr('一覧へ', 'All games') : tr('道しるべ', 'Route map'));
  $('homeLink').href = portalMode ? `/${lang}/games/` : '#courses'; $('homeLink').target = portalMode ? '_top' : '_self';
  document.querySelector('.brand').href = $('homeLink').href; document.querySelector('.brand').target = $('homeLink').target;
  text('footerText', activeModes.has(mode) || mode === 'paused' ? COURSES[courseIndex].hint[lang] : tr('Space / 画面を押し続けて離す · 記録はこの端末のみ', 'Hold / release Space or the field · Records stay on this device'));
  canvas.setAttribute('aria-label', tr('バネの主人公を跳ばすフィールド。Spaceまたはポインターを押し続け、離すと跳びます。空中では曲がれません。', 'Spring hopping field. Hold Space or the pointer, then release to jump. No steering in the air.'));
  refreshStorageNote();
}
function overlay() {
  const shown = ['menu', 'paused', 'failed', 'course-clear', 'finale', 'reset', 'external-reset'].includes(mode);
  $('overlay').hidden = !shown;
  if (!shown) return;
  let head = title(), copy = COURSES[courseIndex].hint[lang], action = tr('跳び始める', 'Start hopping'), second = tr('コースを選ぶ', 'Choose course'), foot = tr('押して縮める。離して跳ぶ。空中では曲がれません。', 'Hold to compress. Release to hop. No steering in the air.');
  if (mode === 'menu') { head = tr('雲の上に、灯りを。', 'Light the gardens above.'); action = progress() === COURSES.length ? tr('コースを選んで再挑戦', 'Choose a course to replay') : progress() ? tr('続きを登る', 'Continue ascent') : tr('最初の灯りへ', 'Light the first lantern'); copy = progress() === COURSES.length ? tr('8つの灯りがつながりました。まだ通っていない道や、落下なしの金の灯りを目指そう。', 'All eight lanterns are connected. Try an unexplored path or earn a gold lantern with no falls.') : tr('バネを縮めて、ぽん。8つの空中庭園をつなぎ、頂上の鐘を鳴らそう。', 'Compress, then hop. Connect eight sky gardens and ring the summit bell.'); }
  if (mode === 'paused') { head = tr('ひと休み。', 'A little rest.'); copy = tr('足場も時計も停止中です。チャージは安全に解除しました。', 'Platforms and time are paused. Any charge was safely canceled.'); action = tr('再開する', 'Resume'); }
  if (mode === 'failed') { head = tr('もう一度、ぽん。', 'One more hop.'); copy = toast || tr('足場を外しました。少しチャージを変えてみよう。', 'Missed the ledge. Tune your charge a little.'); action = checkpointId ? tr('灯りから再挑戦', 'Retry from lantern') : tr('すぐ再挑戦', 'Retry now'); foot = tr(`この挑戦：${falls}回の落下。コースの最初へ戻らずに続けられます。`, `This attempt: ${falls} fall${falls === 1 ? '' : 's'}. Keep going from your checkpoint.`); }
  if (mode === 'course-clear' || mode === 'finale') { head = mode === 'finale' ? tr('空に、灯りがつながった。', 'A sky full of lanterns.') : tr('灯りが、ひとつ。', 'One more lantern.'); copy = mode === 'finale' ? tr('8つの庭園をつないで、頂上の鐘を鳴らしました。別の道や、落下なしの登頂にも挑戦できます。', 'Eight gardens connected. The summit bell rang. Try another path or a climb without falling.') : tr(`${title()}をクリア。次は違う足場のリズムへ。`, `${title()} complete. A different landing rhythm awaits.`); action = mode === 'finale' ? tr('コースを選んで再挑戦', 'Choose a course to replay') : tr('次の庭園へ', 'Next garden'); second = tr('同じコースをもう一度', 'Replay this course'); foot = tr(`${Math.round(runSeconds)}秒 · 落下${falls}回 · ${falls === 0 ? '金の灯り' : falls <= 3 ? '銀の灯り' : '灯り点灯'}`, `${Math.round(runSeconds)}s · ${falls} falls · ${falls === 0 ? 'Gold lantern' : falls <= 3 ? 'Silver lantern' : 'Lantern lit'}`); }
  if (mode === 'reset') { head = tr('このゲームの記録をリセット？', 'Reset this game’s record?'); copy = tr('COILHOPの進捗と設定を初期化します。読み込めない元データは先にバックアップします。', 'COILHOP progress and settings return to defaults. Unreadable original data is backed up first.'); action = tr('リセットする', 'Reset record'); second = tr('キャンセル', 'Cancel'); foot = tr('ほかのゲームの記録は対象外です。', 'Other games’ records are outside this reset.'); }
  if (mode === 'external-reset') { head = tr('記録が更新されました。', 'Record changed.'); copy = tr('別のタブのリセットを反映しました。古い挑戦の進捗は保存しません。', 'A reset in another tab was applied. Old attempt progress will not be saved.'); action = tr('最初の庭園へ', 'Start from the first garden'); }
  text('overlayTitle', head); text('overlayCopy', copy); text('overlayAction', action); text('overlaySecondary', second); text('overlayFootnote', foot);
}
function openMap() {
  if (activeModes.has(mode)) pause();
  $('courseMap').hidden = false; const list = $('courseList'); list.replaceChildren();
  COURSES.forEach((course, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.dataset.course = course.id; button.disabled = !unlocked(index);
    const medal = record.best[`medal:${course.id}`] || 0;
    const fork = course.pads.find(p => p.next.length > 1);
    const paths = fork ? fork.next.filter(target => record.completed[`${course.id}:path:${fork.id}:${target}`]).length : 0;
    button.textContent = `${String(index + 1).padStart(2, '0')} · ${course.title[lang]}${record.completed[course.id] ? `  ${medal === 3 ? '✦' : medal === 2 ? '✧' : '✓'}` : !unlocked(index) ? '  ◇' : ''}${fork ? tr(` · 道 ${paths}/2`, ` · PATHS ${paths}/2`) : ''}`;
    button.onclick = () => startCourse(index); list.append(button);
  });
  $('mapCard').scrollTop = 0;
  $('mapClose').focus({ preventScroll: true });
}
function primaryAction() {
  if (mode === 'paused') return resume();
  if (mode === 'failed') return startCourse(courseIndex, true);
  if (mode === 'course-clear') return startCourse(courseIndex + 1);
  if (mode === 'finale') return openMap();
  if (mode === 'menu' && progress() === COURSES.length) return openMap();
  if (mode === 'external-reset') return startCourse(0);
  if (mode === 'reset') {
    cancelCharge(); synth.stop(); const result = store.reset();
    if (result.ok) { record = result.value; generation = record.generation; storageReason = ''; lang = requestedLanguage === 'en' ? 'en' : 'ja'; sound = true; reducedMotion = defaults.settings.reducedMotion; courseIndex = 0; checkpointId = 0; hops = 0; falls = 0; time = 0; runSeconds = 0; groundAt(0); cameraReady = false; mode = 'menu'; }
    else { storageReason = result.reason; mode = resetReturn; }
    settings(); overlay(); hud(); refreshStorageNote(); return;
  }
  const index = Number.isInteger(record.settings.course) && unlocked(record.settings.course) ? record.settings.course : COURSES.findIndex((_, i) => unlocked(i) && !record.completed[COURSES[i].id]);
  startCourse(Math.max(0, index));
}
function secondaryAction() {
  if (mode === 'reset') { mode = resetReturn; overlay(); return; }
  if (mode === 'course-clear' || mode === 'finale') return startCourse(courseIndex);
  openMap();
}
$('overlayAction').onclick = primaryAction; $('overlaySecondary').onclick = secondaryAction;
$('mapButton').onclick = openMap; $('mapClose').onclick = () => { $('courseMap').hidden = true; if (mode === 'paused') resume(); else canvas.focus({ preventScroll: true }); };
$('homeLink').onclick = event => { if (!portalMode) { event.preventDefault(); openMap(); } };
document.querySelector('.brand').onclick = event => { if (!portalMode) { event.preventDefault(); openMap(); } };
$('pauseButton').onclick = () => mode === 'paused' ? resume() : pause();
$('languageButton').onclick = () => { lang = lang === 'ja' ? 'en' : 'ja'; toast = ''; writeRecord({ settings: { lang } }); settings(); overlay(); hud(); announce(tr('日本語に切り替えました。', 'Switched to English.')); if (!$('courseMap').hidden) openMap(); };
$('soundButton').onclick = () => { sound = !sound; if (!sound) synth.stop(); else synth.unlock(); writeRecord({ settings: { sound } }); settings(); };
$('motionButton').onclick = () => { reducedMotion = !reducedMotion; particles = []; writeRecord({ settings: { reducedMotion } }); settings(); };
$('resetButton').onclick = () => { if (activeModes.has(mode)) pause(); resetReturn = mode; mode = 'reset'; $('courseMap').hidden = true; overlay(); };
canvas.addEventListener('pointerdown', event => {
  if (mode !== 'ready' || pointerId !== null) return; event.preventDefault(); pointerId = event.pointerId;
  canvas.focus({ preventScroll: true }); try { canvas.setPointerCapture(pointerId); } catch {} charge();
});
canvas.addEventListener('pointerup', event => { if (event.pointerId !== pointerId) return; pointerId = null; release(); });
canvas.addEventListener('pointercancel', event => { if (event.pointerId === pointerId) cancelCharge(false); });
canvas.addEventListener('lostpointercapture', event => { if (event.pointerId === pointerId) cancelCharge(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Tab' && !$('courseMap').hidden) {
    const buttons = [...$('courseMap').querySelectorAll('button:not(:disabled)')], first = buttons[0], final = buttons.at(-1);
    if (event.shiftKey && (document.activeElement === first || !$('courseMap').contains(document.activeElement))) { event.preventDefault(); final.focus(); }
    else if (!event.shiftKey && (document.activeElement === final || !$('courseMap').contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    return;
  }
  if (event.key === 'Escape') { event.preventDefault(); if (!$('courseMap').hidden) { $('courseMap').hidden = true; if (mode === 'paused') resume(); } else if (mode === 'paused') resume(); else if (mode === 'reset') secondaryAction(); else pause(); return; }
  if (event.code !== 'Space' || event.repeat || event.target.closest('button,a,input,select')) return;
  if (event.target !== canvas && event.target !== frame) return;
  event.preventDefault(); keyboardHeld = true; charge();
});
document.addEventListener('keyup', event => { if (event.code === 'Space' && keyboardHeld) { event.preventDefault(); keyboardHeld = false; release(); } });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
window.addEventListener('blur', () => { if (mode === 'charging') pause(); });
window.addEventListener('storage', event => {
  if (event.key !== SAVE_KEY && event.key !== null) return;
  if (event.key === null || event.newValue === null) return externalReset();
  const fresh = store.read();
  if (!fresh.ok) { storageReason = fresh.reason; refreshStorageNote(); return; }
  if (fresh.value.generation !== generation) return externalReset();
  const mergedBest = { ...record.best };
  for (const [key, value] of Object.entries(fresh.value.best)) mergedBest[key] = Math.max(mergedBest[key] || 0, value);
  record = { ...fresh.value, completed: { ...record.completed, ...fresh.value.completed }, best: mergedBest };
  lang = record.settings.lang === 'en' ? 'en' : 'ja'; sound = record.settings.sound !== false;
  reducedMotion = record.settings.reducedMotion === true;
  settings(); refreshStorageNote(); hud(); overlay();
});
function resize() {
  const r = canvas.getBoundingClientRect(); view = { width: r.width, height: r.height, dpr: Math.min(2, devicePixelRatio || 1) };
  canvas.width = Math.round(view.width * view.dpr); canvas.height = Math.round(view.height * view.dpr); cameraReady = false;
}
new ResizeObserver(resize).observe(canvas); window.addEventListener('resize', resize);
function loop(now) {
  const dt = Math.max(0, Math.min(.04, (now - last) / 1000)); last = now; tick(dt); hud();
  const pad = padById(currentId), targets = targetIds.map(id => positionOf(padById(id)));
  const next = targets.length ? { x: targets.reduce((s,p) => s + p.x, 0) / targets.length, y: targets.reduce((s,p) => s + p.y, 0) / targets.length } : { x: player.x + 80, y: player.y - 40 };
  const currentPad = positionOf(pad);
  const left = Math.min(currentPad.left, player.x - 22), right = Math.max(currentPad.right, ...targets.map(p => p.right), player.x + 22);
  const top = Math.min(player.y - 72, ...targets.map(p => p.y - 50)), bottom = Math.max(currentPad.y + 45, player.y + 50, ...targets.map(p => p.y + 45));
  const follow = { x: view.width < 550 ? (left + right) / 2 : player.x * .60 + next.x * .40, y: view.width < 550 ? (top + bottom) / 2 : Math.min(player.y, next.y) - 60 };
  camera.scale = view.width < 550 ? Math.min(.92, (view.width - 36) / Math.max(360, right - left), (view.height - 155) / Math.max(300, bottom - top)) : Math.min(1.35, view.width / 760);
  if (!cameraReady || reducedMotion) { camera.x = follow.x; camera.y = follow.y; cameraReady = true; }
  else if (activeModes.has(mode)) { const ease = 1 - Math.exp(-dt * 6); camera.x += (follow.x - camera.x) * ease; camera.y += (follow.y - camera.y) * ease; }
  render(ctx, view, { course: COURSES[courseIndex], pads: COURSES[courseIndex].pads.map(p => ({ pad: p, position: positionOf(p) })), player, camera, time, reducedMotion, particles, targetIds, currentId, checkpointId, mode, toast: time < toastUntil ? toast : '', lang, hops, falls });
  requestAnimationFrame(loop);
}
courseIndex = Number.isInteger(record.settings.course) && COURSES[record.settings.course] && unlocked(record.settings.course) ? record.settings.course : 0;
groundAt(0); settings(); overlay(); hud(); announce(tr('登頂を始められます。', 'Ready to begin the ascent.')); resize(); attachCapture(canvas, synth); requestAnimationFrame(loop);
