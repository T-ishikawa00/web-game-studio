const params = new URLSearchParams(location.search);
const locale = params.get('lang') === 'en' ? 'en' : 'ja';
const generation = params.get('generation');
const gameId = 'internal-connection-lab';
const t = locale === 'ja' ? {
  label: '内部接続テスト', heading: 'パネルを灯そう。', hint: 'クリック・タップ、またはTabとEnter', panel: 'パネル',
  paused: '一時停止中', rewards: 'テスト報酬', complete: 'すべて点灯！', standalone: 'このテストはPortalのプレイ画面から開いてください。',
} : {
  label: 'INTERNAL CONNECTION TEST', heading: 'Light up the panels.', hint: 'Click, tap, or use Tab and Enter', panel: 'Panel',
  paused: 'Paused', rewards: 'Test rewards', complete: 'All lit up!', standalone: 'Open this test from the Portal play page.',
};
document.documentElement.lang = locale;
for (const key of ['label', 'heading', 'hint']) document.getElementById(key).textContent = t[key];
const board = document.getElementById('board');
board.setAttribute('aria-label', t.panel);
let paused = true;
const buttons = Array.from({ length: 9 }, (_, index) => {
  const button = document.createElement('button');
  button.type = 'button'; button.textContent = String(index + 1);
  button.setAttribute('aria-label', `${t.panel} ${index + 1}`);
  button.setAttribute('aria-pressed', 'false'); button.disabled = true;
  button.addEventListener('click', () => {
    if (!paused) parent.postMessage({ protocol: 'wgs-fixture-v1', gameId, generation, type: 'input', index }, location.origin);
  });
  board.append(button); return button;
});
window.addEventListener('message', event => {
  const message = event.data;
  if (event.origin !== location.origin || event.source !== parent || !message || message.protocol !== 'wgs-fixture-v1' || message.gameId !== gameId || message.generation !== generation || message.type !== 'state') return;
  if (!Array.isArray(message.active) || message.active.length > 9 || new Set(message.active).size !== message.active.length || !message.active.every(n => Number.isInteger(n) && n >= 0 && n < 9) || typeof message.paused !== 'boolean') return;
  paused = message.paused;
  buttons.forEach((button, index) => { button.disabled = paused; button.setAttribute('aria-pressed', String(message.active.includes(index))); });
  document.getElementById('count').textContent = message.active.length === 9 ? t.complete : `${message.active.length} / 9`;
  const pauseLabel = document.getElementById('paused'); pauseLabel.textContent = t.paused; pauseLabel.hidden = !paused;
  document.getElementById('rewards').textContent = Number.isInteger(message.rewards) && message.rewards > 0 ? `${t.rewards}: ${message.rewards}` : '';
});
new ResizeObserver(entries => {
  const rect = entries[0]?.contentRect;
  if (rect) document.getElementById('dimensions').textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)}`;
}).observe(document.documentElement);
if (parent === window) { const note = document.getElementById('standalone'); note.hidden = false; note.textContent = t.standalone; }
else parent.postMessage({ protocol: 'wgs-fixture-v1', gameId, generation, type: 'ready' }, location.origin);
