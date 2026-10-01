// A language preference only, never a visitor identifier or game-save migration.
export const languageKey = 'tinlumo:language';
export function chooseLanguage(saved, languages) {
  if (saved === 'ja' || saved === 'en') return saved;
  const first = Array.isArray(languages) ? languages.find(v => typeof v === 'string' && v.trim()) : undefined;
  if (!first) return null;
  return /^ja(?:-|$)/i.test(first) ? 'ja' : 'en';
}
export function installLanguageNavigation(win, doc) {
  doc.addEventListener('click', event => {
    const link = event.target?.closest?.('a[data-locale-link]');
    if (!link) return;
    const lang = link.getAttribute('lang');
    if (lang !== 'ja' && lang !== 'en') return;
    try { win.localStorage.setItem(languageKey, lang); } catch { /* Links still work. */ }
  });
  if (win.location.pathname !== '/') return;
  let saved;
  try { saved = win.localStorage.getItem(languageKey); } catch { /* Use browser language. */ }
  let languages;
  try { languages = win.navigator.languages?.length ? win.navigator.languages : [win.navigator.language]; } catch { return; }
  const lang = chooseLanguage(saved, languages);
  // replace avoids inserting the routing page into the Back stack.
  if (lang) win.location.replace('/' + lang + '/');
}
if (typeof window !== 'undefined') installLanguageNavigation(window, document);
