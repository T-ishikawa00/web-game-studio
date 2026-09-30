// Consent Architecture R1 candidate C. Explicit settings only; no first-visit prompt.
// Original production hostname, storage and withdrawal guards remain intact.
export const analyticsConsentKey = 'tinlumo:analytics-consent:v1';
export function installAnalyticsConsent(win, doc) {
  const panel = doc.querySelector('[data-analytics-consent]');
  if (!panel || win !== win.top || win.location.hostname === 'preview.tinlumo.com') return;
  const choiceButtons = panel.querySelectorAll('[data-analytics-choice]');
  const status = panel.querySelector('[data-analytics-status]');
  const controls = panel.querySelector('[data-analytics-choices]');
  let choice = null, loaded = false, opened = false, opener = null;
  const closeButton = panel.querySelector("[data-close-analytics]");
  const readChoice = () => {
    try {
      const v = win.localStorage.getItem(analyticsConsentKey);
      // Do not reuse a permission that cannot currently be changed/revoked.
      if (v === 'allow') win.localStorage.setItem(analyticsConsentKey, v);
      return v === 'allow' || v === 'deny' ? v : null;
    }
    catch { return null; }
  };
  function render() {
    panel.hidden = !opened;
    controls.hidden = !opened;
    status.textContent = choice === 'allow' ? panel.dataset.allowedText : choice === 'deny' ? panel.dataset.deniedText : panel.dataset.initialText;
  }
  function start() {
    if (choice !== 'allow' || loaded || panel.dataset.enabled !== 'true' ||
        win.location.hostname !== 'tinlumo.com' || win.location.protocol !== 'https:' ||
        !/^\/(ja|en)\//.test(win.location.pathname) ||
        !/^[a-f0-9]{32}$/i.test(panel.dataset.beaconId || '') || doc.querySelector('script[data-cf-beacon]')) return;
    const script = doc.createElement('script');
    // Match Cloudflare's verified manual snippet; insertion stays behind consent.
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({token: panel.dataset.beaconId}));
    script.onerror = () => { /* Measurement failure never changes game state or access. */ };
    loaded = true;
    doc.head.append(script);
  }
  function close() {
    opened = false; render();
    if (opener?.isConnected) opener.focus();
  }
  function select(value) {
    if (value !== "allow" && value !== "deny") return;
    opened = false;
    choice = value;
    let persisted = false;
    try { win.localStorage.setItem(analyticsConsentKey, value); persisted = win.localStorage.getItem(analyticsConsentKey) === value; } catch { /* Fail closed below. */ }
    if (choice === 'allow' && win.location.hash === '#analytics-off') {
      const target = new URL(win.location.href); target.hash = '';
      win.history.replaceState(null, '', target.href);
    }
    render();
    if (opener?.isConnected) opener.focus();
    if (choice === 'deny' && !persisted) {
      try { win.localStorage.removeItem(analyticsConsentKey); } catch { /* The fixed fragment also overrides a stale permission. */ }
      const target = new URL(win.location.href); target.hash = 'analytics-off';
      // replace to another fragment alone would retain provider listeners.
      win.location.replace(target.href); win.location.reload(); return;
    }
    // Reload removes the provider's listeners too; removing its script alone does not.
    // Already initiated requests may complete while the old document unloads.
    if (choice === 'deny' && loaded) { win.location.reload(); return; }
    start();
  }
  for (const button of choiceButtons) button.addEventListener('click', () => select(button.dataset.analyticsChoice));
  for (const button of doc.querySelectorAll('[data-open-analytics]')) button.addEventListener('click', () => {
    opener = button; opened = true; render();
    panel.scrollIntoView({block:'nearest'});
    choiceButtons[0]?.focus();
  });
  closeButton?.addEventListener('click', close);
  win.addEventListener('keydown', event => {
    if (event.key === 'Escape' && opened) { event.preventDefault(); close(); }
  });
  win.addEventListener('storage', event => {
    if (event.key !== analyticsConsentKey && event.key !== null) return;
    const stored = readChoice();
    if (stored !== 'allow') { choice = stored; render(); if (loaded) win.location.reload(); }
  });
  win.addEventListener('pageshow', event => {
    if (event.persisted && readChoice() !== 'allow' && loaded) win.location.reload();
  });
  choice = win.location.hash === '#analytics-off' ? 'deny' : readChoice();
  if (win.location.hash === '#analytics-off') {
    try { win.localStorage.setItem(analyticsConsentKey, 'deny'); } catch { /* Fragment stays authoritative. */ }
  }
  render(); start();
}
if (typeof window !== 'undefined' && typeof document !== 'undefined') installAnalyticsConsent(window, document);
