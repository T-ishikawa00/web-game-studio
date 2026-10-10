// Manual Display units only. The sitewide AdSense loader and Google CMP own
// ad delivery/advertising consent. Growth Consent and Consent C are separate.
const root = document.querySelector('[data-manual-play-ads]');
if (root && !root.dataset.manualAdsInstalled) {
  root.dataset.manualAdsInstalled = 'true';
  const units = [...document.querySelectorAll('[data-manual-ad]')];
  const preinitialized = units.some(unit => {
    const ins = unit.querySelector('ins');
    return !ins || ins.hasAttribute('data-adsbygoogle-status') || ins.dataset.manualAdRequested || ins.querySelector('iframe');
  });
  // The official push({}) processes the first unprocessed ins in the DOM.
  // Keep dormant official tags detached, with an equal-sized inert placeholder,
  // so a mobile Bottom request cannot initialize a hidden Desktop Left tag.
  // Once requested, the official tag and any SDK-owned iframe stay in place.
  const slots = new Map(units.map(unit => {
    const ins = unit.querySelector('ins');
    if (preinitialized) return [unit, {ins, placeholder:null}];
    const placeholder = document.createElement('span');
    placeholder.className = 'manual-play-unit';
    placeholder.style.display = 'block';
    placeholder.style.width = unit.dataset.manualAd === 'bottom' ? '100%' : '300px';
    placeholder.style.height = unit.dataset.manualAd === 'bottom' ? '100px' : '250px';
    placeholder.setAttribute('aria-hidden', 'true');
    ins.replaceWith(placeholder);
    return [unit, {ins, placeholder}];
  }));
  const mobile = matchMedia('(max-width: 1024px)');
  const wide = matchMedia(`(min-width: ${root.dataset.sideBreakpoint}px)`);
  const game = document.querySelector(root.dataset.gameRegion);
  const protectedElements = () => [...document.querySelectorAll('canvas,iframe,button,a,input,select,summary,[role="application"]')]
    .filter(el => !el.closest('[data-manual-ad]') && el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0);
  const geometry = () => protectedElements().map(el => ({el, rect: el.getBoundingClientRect()}));
  const separation = (a,b) => Math.hypot(Math.max(0,a.left-b.right,b.left-a.right), Math.max(0,a.top-b.bottom,b.top-a.bottom));
  const close = (unit, state) => {unit.hidden = true;unit.dataset.adState = state;};
  const allowed = unit => unit.dataset.manualAd === 'bottom'
    ? root.dataset.mobilePolicy === 'safe' && mobile.matches
    : root.dataset.sidePolicy === 'safe' && wide.matches && !mobile.matches;
  let loaderFailed = preinitialized;
  const holdSdk = state => {loaderFailed=true;for(const unit of units)close(unit,state);};
  if (preinitialized) holdSdk('held-preinitialized');
  const classicScrollbarWouldShrinkGame = unit => {
    if (unit.dataset.manualAd !== 'bottom' || document.documentElement.clientWidth >= innerWidth) return false;
    // The game can change from a long menu to a shorter play/result screen.
    // In a classic-scrollbar browser, suppress the ad if the page without this
    // trailing unit would fit the viewport. This also covers later state changes.
    const flow = [game, ...document.body.children].filter(el => el && !el.matches('[data-manual-ad],script,style') && !['fixed','absolute'].includes(getComputedStyle(el).position));
    const bottom = Math.max(...flow.map(el => el.getBoundingClientRect().bottom + scrollY + (parseFloat(getComputedStyle(el).marginBottom)||0)));
    return bottom <= innerHeight;
  };
  const request = unit => {
    const {ins, placeholder} = slots.get(unit);
    if (unit.hidden || loaderFailed) return;
    if (classicScrollbarWouldShrinkGame(unit)) {close(unit,'held-viewport');return;}
    const rect = unit.getBoundingClientRect();
    if (!rect.width || !rect.height || rect.top > innerHeight + 200 || rect.bottom < -200) return;
    const targets = [game, ...protectedElements()].filter(Boolean);
    if (targets.some(el => separation(rect, el.getBoundingClientRect()) < 150)) {close(unit,'held-separation');return;}
    if (ins.dataset.manualAdRequested) return;
    const beforeInsert = geometry();
    placeholder.replaceWith(ins);
    if (beforeInsert.some(({el,rect}) => {
      const after = el.getBoundingClientRect();
      return after.width < rect.width - .5 || after.height < rect.height - .5;
    }) || classicScrollbarWouldShrinkGame(unit)) {
      ins.replaceWith(placeholder);close(unit,'held-viewport');return;
    }
    if (targets.some(el => separation(unit.getBoundingClientRect(),el.getBoundingClientRect()) < 150)) {
      ins.replaceWith(placeholder);close(unit,'held-separation');return;
    }
    // Mark before pushing. Resize, BFCache and repeated installation cannot
    // initialize this same DOM unit twice, including a failed push.
    ins.dataset.manualAdRequested = 'true';
    try {(window.adsbygoogle = window.adsbygoogle || []).push({});}
    // A throw before the SDK consumes this tag leaves it ahead of later tags.
    // Stop all further pushes for this document; never detach SDK-owned content.
    catch {holdSdk('held-sdk-error');}
    // Bound blank space if the loader/request never completes. No retry or
    // refresh is attempted. A new document is the next opportunity to request.
    setTimeout(() => {
      if (!ins.hasAttribute('data-ad-status')) {
        if (ins.getAttribute('data-adsbygoogle-status') !== 'done') holdSdk('held-sdk-uncertain');
        else close(unit,'held-no-response');
      }
    }, 10000);
  };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) request(entry.target);
  }, {rootMargin:'200px 0px'});
  for (const unit of units) {
    const {ins} = slots.get(unit);
    if (!ins) {close(unit,'held-invalid-tag');continue;}
    observer.observe(unit);
    new MutationObserver(() => {
      const status = ins.getAttribute('data-ad-status');
      if (status === 'unfilled' || status === 'unfill-optimized') close(unit,'unfilled');
      else if (status === 'filled') unit.dataset.adState = unit.hidden ? 'held-late-fill' : 'filled';
    }).observe(ins, {attributes:true,attributeFilter:['data-ad-status']});
  }
  function update() {
    for (const unit of units) {
      if (!allowed(unit)) {unit.hidden=true;continue;}
      if (loaderFailed || /^(unfilled|held-)/.test(unit.dataset.adState || '')) continue;
      if (!unit.hidden) {request(unit);continue;}
      const before = geometry();
      unit.hidden=false;
      // An added classic scrollbar must not shrink the accepted canvas,
      // controls or iframe. Hold this unit rather than alter the game CSS.
      if (before.some(({el,rect}) => {
        const after=el.getBoundingClientRect();
        return after.width < rect.width - .5 || after.height < rect.height - .5;
      })) {close(unit,'held-viewport');continue;}
      request(unit);
    }
  }
  const loader = [...document.scripts].find(s => /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/.test(s.src));
  loader?.addEventListener('error', () => {loaderFailed=true;for(const unit of units)close(unit,'held-loader-error');}, {once:true});
  mobile.addEventListener('change',update);wide.addEventListener('change',update);
  addEventListener('resize',update,{passive:true});addEventListener('pageshow',update);
  let scrollFrame = 0;
  addEventListener('scroll',() => {
    if (!scrollFrame) scrollFrame=requestAnimationFrame(() => {scrollFrame=0;update();});
  },{passive:true});
  if (game) new ResizeObserver(update).observe(game);
  const layoutAttributes = new MutationObserver(update);
  for (const el of [document.body,document.querySelector('#app')].filter(Boolean)) {
    layoutAttributes.observe(el,{attributes:true,attributeFilter:['data-screen','data-view','data-won','class']});
  }
  update();
}
