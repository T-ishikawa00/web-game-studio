import { ui } from '../i18n/ui';
import { createSaveAdapter, emptySave } from '../lib/save';
import { createAdAdapter, type AdKind, type AdMode } from '../lib/ads';
import { createAnalytics, type EventName } from '../lib/analytics';

const shell = document.querySelector<HTMLElement>('#play-shell');
if (shell) {
  const locale = shell.dataset.locale === 'en' ? 'en' : 'ja';
  const t = ui[locale];
  const gameId = shell.dataset.game!;
  const buildPath = shell.dataset.build!;
  const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const stage = el('game-stage');
  const loading = el('load-state');
  const error = el('error-state');
  const saveStatus = el('save-status');
  const adStatus = el('ad-status');
  const log = el('event-log');
  const adDialog = el<HTMLDialogElement>('ad-dialog');
  const resetDialog = el<HTMLDialogElement>('reset-dialog');
  const saves = createSaveAdapter(gameId, () => localStorage);
  const ads = createAdAdapter(() => sessionStorage);
  const analytics = createAnalytics();
  let data = emptySave();
  let frame: HTMLIFrameElement | undefined;
  let phase: 'loading' | 'playing' | 'paused' | 'error' = 'loading';
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastInputAt = 0;
  let firstInput = false;
  let progressReached = false;
  let runCompleted = false;
  let adKind: AdKind = 'interstitial';
  let rewardCount = 0;
  let generation = '';
  function showNetwork() {
    const resources = [...performance.getEntriesByType('resource')];
    try { resources.push(...(frame?.contentWindow?.performance.getEntriesByType('resource') ?? [])); } catch { /* Future cross-origin games need their own diagnostics. */ }
    const external = resources.filter(resource => new URL(resource.name, location.href).origin !== location.origin).length;
    el('network-status').textContent = `${t.network}: ${resources.length} / ${t.external}: ${external}`;
  }
  const resourceObserver = new PerformanceObserver(showNetwork);
  resourceObserver.observe({ type: 'resource', buffered: true });

  function emit(name: EventName, result?: string) {
    analytics.emit({ name, locale, gameId, result });
    log.replaceChildren(...analytics.snapshot().slice().reverse().map(event => {
      const item = document.createElement('li');
      item.textContent = `${String(event.sequence).padStart(2, '0')}  ${event.name}`;
      if (event.result) { const detail = document.createElement('small'); detail.textContent = event.result; item.append(detail); }
      return item;
    }));
  }
  function showSave(message: string, failed = false) {
    saveStatus.textContent = message;
    saveStatus.dataset.state = failed ? 'error' : 'ok';
  }
  function send(type: string, extra: Record<string, unknown> = {}) {
    frame?.contentWindow?.postMessage({ protocol: 'wgs-fixture-v1', gameId, generation, type, ...extra }, location.origin);
  }
  function sync() { send('state', { active: data.active, paused: phase !== 'playing', rewards: rewardCount }); }
  function setControls(enabled: boolean) {
    ['mock-interstitial', 'mock-rewarded', 'disabled-ad', 'reset-save'].forEach(id => { el<HTMLButtonElement>(id).disabled = !enabled; });
  }
  function failLoad(reason: string) {
    if (timer) clearTimeout(timer);
    phase = 'error';
    frame?.remove(); frame = undefined;
    loading.hidden = true; error.hidden = false;
    stage.setAttribute('aria-busy', 'false');
    setControls(false);
    emit('game_load_error', reason);
  }
  function load() {
    if (timer) clearTimeout(timer);
    frame?.remove();
    phase = 'loading'; firstInput = false; progressReached = false; runCompleted = false; rewardCount = 0;
    loading.hidden = false; error.hidden = true; stage.setAttribute('aria-busy', 'true'); setControls(false);
    const loaded = saves.load(); data = loaded.data;
    showSave(loaded.status === 'invalid' ? t.recovered : loaded.status === 'unavailable' ? t.saveFailed : loaded.status === 'empty' ? t.saveEmpty : t.saved, loaded.status === 'invalid' || loaded.status === 'unavailable');
    emit('game_load_start');
    generation = crypto.randomUUID();
    const url = new URL(buildPath, location.origin);
    url.searchParams.set('lang', locale); url.searchParams.set('generation', generation);
    frame = document.createElement('iframe');
    frame.title = locale === 'ja' ? 'コネクション・ラボ 内部テスト' : 'Connection Lab internal test';
    frame.referrerPolicy = 'no-referrer';
    // Self-developed, same-origin fixture only. This is not a boundary for untrusted third-party games.
    frame.src = url.href;
    frame.addEventListener('error', () => failLoad('frame-error'), { once: true });
    stage.append(frame);
    timer = setTimeout(() => failLoad('ready-timeout'), 8000);
  }
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame?.contentWindow) return;
    const message = event.data;
    if (!message || message.protocol !== 'wgs-fixture-v1' || message.gameId !== gameId || message.generation !== generation) return;
    if (message.type === 'ready' && phase === 'loading') {
      clearTimeout(timer); phase = 'playing'; loading.hidden = true; stage.setAttribute('aria-busy', 'false');
      setControls(true); sync(); emit('game_load_success'); showNetwork(); return;
    }
    if (message.type === 'input' && phase === 'playing' && Number.isInteger(message.index) && message.index >= 0 && message.index < 9) {
      lastInputAt = Date.now();
      if (!firstInput) { firstInput = true; emit('first_input'); }
      const index = message.index as number;
      data = { active: data.active.includes(index) ? data.active.filter(n => n !== index) : [...data.active, index].sort((a, b) => a - b) };
      const saved = saves.write(data); showSave(saved ? t.saved : t.saveFailed, !saved); emit('save_result', saved ? 'persisted' : 'failed');
      if (data.active.length >= 3 && !progressReached) { progressReached = true; emit('meaningful_progress', 'three-panels'); }
      if (data.active.length === 9 && !runCompleted) { runCompleted = true; emit('run_complete', 'nine-panels'); }
      sync();
    }
  });
  function requestAd(mode: AdMode, kind: AdKind) {
    if (phase !== 'playing') return;
    const decision = ads.request(mode, lastInputAt);
    emit('ad_opportunity', decision);
    if (decision !== 'show-mock') { adStatus.textContent = decision === 'unavailable' ? t.unavailable : t.cooldown; return; }
    adKind = kind; phase = 'paused'; sync(); setControls(false);
    adDialog.showModal();
  }
  function finishAd(completed: boolean) {
    const result = ads.complete(adKind, completed);
    if (result.reward) rewardCount++;
    adDialog.close();
    if (phase === 'paused') phase = 'playing';
    sync(); setControls(phase === 'playing');
    adStatus.textContent = result.reward ? t.rewardGranted : t.resumed;
    emit('ad_resume', result.reward ? 'reward-granted' : 'no-reward');
  }
  el('mock-interstitial').addEventListener('click', () => requestAd('mock', 'interstitial'));
  el('mock-rewarded').addEventListener('click', () => requestAd('mock', 'rewarded'));
  el('disabled-ad').addEventListener('click', () => requestAd('disabled', 'interstitial'));
  el('finish-ad').addEventListener('click', () => finishAd(true));
  el('skip-ad').addEventListener('click', () => finishAd(false));
  adDialog.addEventListener('cancel', event => { event.preventDefault(); finishAd(false); });
  el('simulate-error').addEventListener('click', () => failLoad('qa-simulated'));
  el('reload-game').addEventListener('click', () => { emit('retry', 'reload'); load(); });
  el('reset-save').addEventListener('click', () => {
    if (phase !== 'playing') return;
    phase = 'paused'; sync(); resetDialog.showModal();
  });
  function cancelReset() { resetDialog.close(); phase = 'playing'; sync(); }
  el('cancel-reset').addEventListener('click', cancelReset);
  resetDialog.addEventListener('cancel', event => { event.preventDefault(); cancelReset(); });
  el('confirm-reset').addEventListener('click', () => {
    const success = saves.reset();
    if (success) { data = emptySave(); firstInput = false; progressReached = false; runCompleted = false; rewardCount = 0; }
    showSave(success ? t.resetDone : t.saveFailed, !success);
    emit('save_result', success ? 'reset' : 'reset-failed');
    if (success) emit('retry', 'reset');
    cancelReset();
  });
  window.addEventListener('pagehide', () => {
    if (timer) clearTimeout(timer);
    if (adDialog.open) finishAd(false);
    if (resetDialog.open) cancelReset();
    send('state', { active: data.active, paused: true, rewards: rewardCount });
  });
  window.addEventListener('pageshow', event => { if (event.persisted) sync(); });
  Object.defineProperty(window, '__gameEvents', { value: () => analytics.snapshot(), configurable: true });
  load();
}
