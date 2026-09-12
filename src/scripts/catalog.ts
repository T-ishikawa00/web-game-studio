const catalog = document.querySelector<HTMLElement>('[data-catalog]');
if (catalog) {
  const search = document.querySelector<HTMLInputElement>('#game-search')!;
  const cards = [...catalog.querySelectorAll<HTMLAnchorElement>('.game-card')];
  const filters = [...catalog.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const clear = document.querySelector<HTMLButtonElement>('#clear-search')!;
  const count = document.querySelector('#catalog-count')!;
  const empty = document.querySelector<HTMLElement>('#catalog-empty')!;
  const sample = document.querySelector<HTMLSelectElement>('#sample-count');
  const mixed = document.querySelector<HTMLInputElement>('#mixed-art');
  const ja = document.documentElement.lang === 'ja';
  let category = 'all';
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') ?? '';
  if (filters.some(f => f.dataset.filter === params.get('category'))) category = params.get('category')!;
  if (sample && ['0', '2', '10'].includes(params.get('samples') ?? '')) sample.value = params.get('samples')!;
  if (mixed) mixed.checked = params.get('art') === 'mixed';
  document.querySelectorAll<HTMLElement>('[data-search-controls]').forEach(el => el.hidden = false);
  function update() {
    const query = search.value.normalize('NFKC').trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach((card, index) => {
      card.hidden = !!(sample && index >= Number(sample.value)) || !(card.dataset.search ?? '').includes(query) || (category !== 'all' && !(card.dataset.categories ?? '').split(' ').includes(category));
      if (!card.hidden) visible++;
      const img = card.querySelector<HTMLImageElement>('img')!;
      img.dataset.original ??= img.getAttribute('src')!;
      if (mixed) img.src = mixed.checked && index >= 7 ? `/design-art/mixed-${index - 7}.svg` : img.dataset.original;
    });
    filters.forEach(f => f.setAttribute('aria-pressed', String(f.dataset.filter === category)));
    count.textContent = ja ? `${visible}件${sample ? 'の見本' : ''}` : `${visible} ${sample ? 'design samples' : 'games'}`;
    clear.hidden = !query && category === 'all'; empty.hidden = visible !== 0;
    const url = new URL(location.href); url.search = '';
    if (search.value) url.searchParams.set('q', search.value);
    if (category !== 'all') url.searchParams.set('category', category);
    if (sample && sample.value !== '10') url.searchParams.set('samples', sample.value);
    if (mixed?.checked) url.searchParams.set('art', 'mixed');
    history.replaceState(null, '', url);
    document.querySelectorAll<HTMLAnchorElement>('[data-locale-link]').forEach(link => { const translated = new URL(link.href); translated.search = url.search; link.href = translated.href; });
    // Return state is restricted to a fixed same-origin path, never an arbitrary redirect.
    cards.forEach(card => { const target = new URL(card.href); target.search = url.search; card.href = target.href; });
  }
  search.addEventListener('input', update);
  filters.forEach(f => f.addEventListener('click', () => { category = f.dataset.filter!; update(); }));
  clear.addEventListener('click', () => { search.value = ''; category = 'all'; update(); search.focus(); });
  sample?.addEventListener('change', update); mixed?.addEventListener('change', update);
  update();
}
