import './hub.css';

export type HubView = {
  locale: 'ja' | 'en';
  unlocked: ('A' | 'B' | 'C')[];
  records: Partial<Record<'A' | 'B' | 'C', { clears: number; best: number; form: string }>>;
  resume: null | { mission: 'A' | 'B' | 'C'; zone: number };
  saveStatus: string;
  completed: boolean;
};

type MissionId = 'A' | 'B' | 'C';
type Confirmation = { kind: 'start'; mission: MissionId } | { kind: 'reset' } | null;

const missions: MissionId[] = ['A', 'B', 'C'];

const copy = {
  ja: {
    eyebrow: 'TINLUMO',
    heading: 'PROJECT MAGNET',
    deck: '磁力で装甲を集め、狙いを定め、崩れた設備を復旧する。3つの作戦で、判断の仕方が変わります。',
    normalEnd: 'NORMAL END',
    congratulations: '全作戦完了。最後の磁場制御機を停止し、回収区画を復旧しました。',
    resumeLabel: '作戦を再開',
    resumeDetail: (mission: MissionId, zone: number) => `作戦 ${mission}・区画 ${zone} の開始地点から`,
    startA: '作戦 A を開始',
    retryA: '作戦 A に再挑戦',
    operationSelect: '作戦を選ぶ',
    operationIntro: '各作戦は6区画。作戦内では、少数の強化を選びながらボスを攻略します。',
    mission: '作戦',
    unlocked: '解放済み',
    locked: '未解放',
    start: '開始',
    retry: '再挑戦',
    lockA: '',
    lockB: '作戦 A のクリアで解放',
    lockC: '作戦 B のクリアで解放',
    judgement: '判断',
    records: '記録',
    noRecord: 'クリア記録なし',
    clears: 'クリア',
    best: 'BEST',
    form: 'FORM',
    controls: '操作',
    move: '移動',
    magnet: '磁力',
    keyboard: 'WASD / 矢印キー',
    pointer: '押して吸引・照準 → 離して射出',
    touch: '左指で移動 · 右指で吸引・照準',
    learning: '最初の作戦で、帯電した装甲・設備への送電・進化をプレイしながら学べます。',
    data: 'セーブデータ',
    reset: 'セーブデータをリセット',
    close: '現在のプレイに戻る',
    back: '戻る',
    replaceTitle: '途中再開データを置き換えますか？',
    replaceBody: (mission: MissionId, zone: number, next: MissionId) =>
      `作戦 ${mission}・区画 ${zone} の開始地点は、作戦 ${next} の開始を確定すると置き換わります。`,
    confirmStart: (mission: MissionId) => `作戦 ${mission} を開始`,
    resetTitle: 'PROJECT MAGNETのデータをリセットしますか？',
    resetBody: 'PROJECT MAGNETの解放状況、クリア記録、途中再開、設定だけが対象です。他のゲームのデータには触れません。',
    confirmReset: 'リセットする',
    closeLabel: 'ミッションハブを閉じる',
  },
  en: {
    eyebrow: 'TINLUMO',
    heading: 'PROJECT MAGNET',
    deck: 'Gather armor with magnetic force, take aim, and restore the broken circuit. Each operation asks for a different judgement.',
    normalEnd: 'NORMAL END',
    congratulations: 'All operations complete. The magnetic controller is offline and the reclamation zone is restored.',
    resumeLabel: 'RESUME OPERATION',
    resumeDetail: (mission: MissionId, zone: number) => `Operation ${mission} · from the beginning of Zone ${zone}`,
    startA: 'START OPERATION A',
    retryA: 'RETRY OPERATION A',
    operationSelect: 'SELECT AN OPERATION',
    operationIntro: 'Each operation has six zones. Choose a focused set of upgrades, then break its boss.',
    mission: 'OPERATION',
    unlocked: 'UNLOCKED',
    locked: 'LOCKED',
    start: 'START',
    retry: 'RETRY',
    lockA: '',
    lockB: 'Clear Operation A to unlock',
    lockC: 'Clear Operation B to unlock',
    judgement: 'JUDGEMENT',
    records: 'RECORD',
    noRecord: 'No clear recorded',
    clears: 'CLEARS',
    best: 'BEST',
    form: 'FORM',
    controls: 'CONTROLS',
    move: 'MOVE',
    magnet: 'MAGNET',
    keyboard: 'WASD / arrow keys',
    pointer: 'Hold to gather and aim → release to launch',
    touch: 'Left thumb moves · right thumb gathers and aims',
    learning: 'Operation A teaches charged armor, relay power, and evolution through play.',
    data: 'SAVE DATA',
    reset: 'RESET SAVE DATA',
    close: 'RETURN TO CURRENT RUN',
    back: 'BACK',
    replaceTitle: 'Replace your current checkpoint?',
    replaceBody: (mission: MissionId, zone: number, next: MissionId) =>
      `Your Operation ${mission}, Zone ${zone} checkpoint remains intact until you confirm the start of Operation ${next}.`,
    confirmStart: (mission: MissionId) => `START OPERATION ${mission}`,
    resetTitle: 'Reset PROJECT MAGNET data?',
    resetBody: 'Only PROJECT MAGNET unlocks, clear records, checkpoint, and settings are included. Data from other games is untouched.',
    confirmReset: 'RESET DATA',
    closeLabel: 'Close mission hub',
  },
} as const;

const missionCopy = {
  ja: {
    A: { name: '回収線', judgement: '位置', detail: '射線と盾の向きを読み、装甲を当てる位置を選ぶ。' },
    B: { name: '突破線', judgement: '優先度', detail: '射線砲と修理支援のどちらを先に崩すか決める。' },
    C: { name: '磁場中枢', judgement: 'タイミング', detail: '装甲を今撃つか保持するか、安全帯と開口を見て決める。' },
  },
  en: {
    A: { name: 'RECLAMATION LINE', judgement: 'POSITION', detail: 'Read firing lanes and shield angles, then choose where to land your armor.' },
    B: { name: 'BREACH LINE', judgement: 'PRIORITY', detail: 'Decide whether the rail gun or repair support must fall first.' },
    C: { name: 'MAGNETIC CORE', judgement: 'TIMING', detail: 'Read safe lanes and openings to decide when to hold or launch your armor.' },
  },
} as const;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return '—';
  const minutes = Math.floor(value / 60);
  const seconds = value - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
}

function displayZone(index: number): number {
  return Number.isFinite(index) ? Math.max(0, Math.trunc(index)) + 1 : 1;
}

export function createHub(actions: {
  start: (mission: MissionId) => void;
  resume: () => void;
  reset: () => void;
  cancel: () => void;
}): { show: (state: HubView) => void; hide: () => void; isOpen: () => boolean } {
  const game = document.querySelector<HTMLElement>('#game');
  if (!game) throw new Error('PROJECT MAGNET hub requires #game');

  document.getElementById('mission-hub')?.remove();
  const root = el('section', 'mission-hub');
  root.id = 'mission-hub';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'false');
  root.setAttribute('aria-labelledby', 'mission-hub-title');
  game.append(root);

  let view: HubView | null = null;
  let confirmation: Confirmation = null;
  let priorFocus: HTMLElement | null = null;

  const hide = () => {
    root.hidden = true;
    confirmation = null;
    priorFocus?.focus({ preventScroll: true });
    priorFocus = null;
  };

  const finish = (callback: () => void) => {
    root.hidden = true;
    confirmation = null;
    priorFocus = null;
    callback();
  };

  const requestStart = (mission: MissionId) => {
    if (!view) return;
    if (view.resume) {
      confirmation = { kind: 'start', mission };
      render();
      root.querySelector<HTMLButtonElement>('[data-confirm-start]')?.focus({ preventScroll: true });
      return;
    }
    finish(() => actions.start(mission));
  };

  const makeButton = (label: string, className: string, onClick: () => void) => {
    const button = el('button', className);
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  };

  const render = () => {
    if (!view) return;
    const t = copy[view.locale];
    const mc = missionCopy[view.locale];
    root.lang = view.locale;
    root.replaceChildren();

    const shell = el('div', 'mission-hub__shell');
    const intro = el('header', 'mission-hub__intro');
    const titleWrap = el('div');
    const eyebrow = el('small', 'mission-hub__eyebrow');
    eyebrow.textContent = t.eyebrow;
    const title = el('h1');
    title.id = 'mission-hub-title';
    title.textContent = t.heading;
    const deck = el('p', 'mission-hub__deck');
    deck.textContent = t.deck;
    titleWrap.append(eyebrow, title, deck);
    const close = makeButton('×', 'mission-hub__close', () => {
      hide();
      actions.cancel();
    });
    close.setAttribute('aria-label', t.closeLabel);
    intro.append(titleWrap, close);
    shell.append(intro);

    if (view.completed) {
      const ending = el('div', 'mission-hub__ending');
      const endLabel = el('strong');
      endLabel.textContent = t.normalEnd;
      const endCopy = el('span');
      endCopy.textContent = t.congratulations;
      ending.append(endLabel, endCopy);
      shell.append(ending);
    }

    if (view.saveStatus.trim()) {
      const status = el('p', 'mission-hub__save-status');
      status.setAttribute('role', 'status');
      status.textContent = view.saveStatus;
      shell.append(status);
    }

    const lead = el('div', 'mission-hub__lead-actions');
    if (view.resume) {
      const resume = makeButton('', 'mission-hub__resume', () => finish(actions.resume));
      resume.id = 'continue-run';
      const resumeTitle = el('strong');
      resumeTitle.textContent = t.resumeLabel;
      const resumeDetail = el('span');
      resumeDetail.textContent = t.resumeDetail(view.resume.mission, displayZone(view.resume.zone));
      resume.append(resumeTitle, resumeDetail);
      lead.append(resume);
    }
    if (view.unlocked.includes('A')) {
      const first = makeButton(view.records.A ? t.retryA : t.startA, 'mission-hub__start-a', () => requestStart('A'));
      first.dataset.mission = 'A';
      lead.append(first);
    }
    shell.append(lead);

    const sectionHead = el('div', 'mission-hub__section-head');
    const selectTitle = el('h2');
    selectTitle.textContent = t.operationSelect;
    const selectIntro = el('p');
    selectIntro.textContent = t.operationIntro;
    sectionHead.append(selectTitle, selectIntro);
    shell.append(sectionHead);

    const grid = el('div', 'mission-hub__missions');
    for (const mission of missions) {
      const unlocked = view.unlocked.includes(mission);
      const record = view.records[mission];
      const card = el('article', `mission-card${unlocked ? '' : ' is-locked'}`);
      card.dataset.missionCard = mission;
      if (!unlocked) card.setAttribute('aria-disabled', 'true');

      const top = el('div', 'mission-card__top');
      const code = el('span', 'mission-card__code');
      code.textContent = `${t.mission} ${mission}`;
      const state = el('span', 'mission-card__state');
      state.textContent = unlocked ? t.unlocked : t.locked;
      top.append(code, state);

      const name = el('h3');
      name.textContent = mc[mission].name;
      const judgement = el('p', 'mission-card__judgement');
      const judgementLabel = el('span');
      judgementLabel.textContent = t.judgement;
      const judgementValue = el('strong');
      judgementValue.textContent = mc[mission].judgement;
      judgement.append(judgementLabel, judgementValue);
      const detail = el('p', 'mission-card__detail');
      detail.textContent = mc[mission].detail;
      card.append(top, name, judgement, detail);

      if (record) {
        const stats = el('dl', 'mission-card__record');
        const entries: [string, string][] = [
          [t.clears, String(record.clears)],
          [t.best, formatTime(record.best)],
          [t.form, record.form ? record.form.toUpperCase() : '—'],
        ];
        for (const [label, value] of entries) {
          const item = el('div');
          const dt = el('dt');
          dt.textContent = label;
          const dd = el('dd');
          dd.textContent = value;
          item.append(dt, dd);
          stats.append(item);
        }
        card.append(stats);
      } else {
        const empty = el('p', 'mission-card__empty');
        empty.textContent = t.noRecord;
        card.append(empty);
      }

      if (unlocked) {
        const start = makeButton(record ? t.retry : t.start, 'mission-card__action', () => requestStart(mission));
        start.dataset.mission = mission;
        start.setAttribute('aria-label', `${record ? t.retry : t.start} · ${t.mission} ${mission} · ${mc[mission].name}`);
        card.append(start);
      } else {
        const locked = el('p', 'mission-card__lock-note');
        locked.textContent = mission === 'B' ? t.lockB : t.lockC;
        card.append(locked);
      }
      grid.append(card);
    }
    shell.append(grid);

    const lower = el('div', 'mission-hub__lower');
    const controls = el('section', 'mission-hub__controls');
    const controlsTitle = el('h2');
    controlsTitle.textContent = t.controls;
    const controlList = el('div', 'mission-hub__control-list');
    const move = el('p');
    move.innerHTML = `<strong>${t.move}</strong><span>${t.keyboard}</span>`;
    const magnet = el('p');
    magnet.innerHTML = `<strong>${t.magnet}</strong><span>${t.pointer}</span><small>${t.touch}</small>`;
    controlList.append(move, magnet);
    const learning = el('p', 'mission-hub__learning');
    learning.textContent = t.learning;
    controls.append(controlsTitle, controlList, learning);

    const data = el('section', 'mission-hub__data');
    const dataTitle = el('h2');
    dataTitle.textContent = t.data;
    const reset = makeButton(t.reset, 'mission-hub__reset', () => {
      confirmation = { kind: 'reset' };
      render();
      root.querySelector<HTMLButtonElement>('[data-confirm-reset]')?.focus({ preventScroll: true });
    });
    const cancel = makeButton(t.close, 'mission-hub__return', () => {
      hide();
      actions.cancel();
    });
    data.append(dataTitle, reset, cancel);
    lower.append(controls, data);
    shell.append(lower);

    if (confirmation) {
      const confirm = el('aside', 'mission-hub__confirm');
      confirm.setAttribute('role', 'alertdialog');
      confirm.setAttribute('aria-modal', 'true');
      const confirmBody = el('div', 'mission-hub__confirm-body');
      const confirmTitle = el('h2');
      const confirmCopy = el('p');
      const confirmActions = el('div', 'mission-hub__confirm-actions');

      if (confirmation.kind === 'start' && view.resume) {
        const mission = confirmation.mission;
        confirmTitle.textContent = t.replaceTitle;
        confirmCopy.textContent = t.replaceBody(view.resume.mission, displayZone(view.resume.zone), mission);
        const accept = makeButton(t.confirmStart(mission), 'mission-hub__confirm-primary', () => finish(() => actions.start(mission)));
        accept.dataset.confirmStart = mission;
        const back = makeButton(t.back, 'mission-hub__confirm-back', () => {
          confirmation = null;
          render();
          root.querySelector<HTMLButtonElement>(`[data-mission="${mission}"]`)?.focus({ preventScroll: true });
        });
        confirmActions.append(accept, back);
      } else {
        confirmTitle.textContent = t.resetTitle;
        confirmCopy.textContent = t.resetBody;
        const accept = makeButton(t.confirmReset, 'mission-hub__confirm-primary is-danger', () => finish(actions.reset));
        accept.dataset.confirmReset = 'true';
        const back = makeButton(t.back, 'mission-hub__confirm-back', () => {
          confirmation = null;
          render();
          root.querySelector<HTMLButtonElement>('.mission-hub__reset')?.focus({ preventScroll: true });
        });
        confirmActions.append(accept, back);
      }
      confirmBody.append(confirmTitle, confirmCopy, confirmActions);
      confirm.append(confirmBody);
      shell.append(confirm);
    }

    root.append(shell);
  };

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      if (confirmation) {
        const previous = confirmation;
        confirmation = null;
        render();
        const selector = previous.kind === 'reset' ? '.mission-hub__reset' : `[data-mission="${previous.mission}"]`;
        root.querySelector<HTMLButtonElement>(selector)?.focus({ preventScroll: true });
      } else {
        hide();
        actions.cancel();
      }
      return;
    }
    if (event.key !== 'Tab' || !confirmation) return;
    const confirm = root.querySelector<HTMLElement>('.mission-hub__confirm');
    if (!confirm) return;
    const focusable = [...confirm.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
      .filter((node) => !node.hidden && node.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  return {
    show: (state: HubView) => {
      view = state;
      confirmation = null;
      if (root.hidden) priorFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      render();
      root.hidden = false;
      (root.querySelector<HTMLButtonElement>('#continue-run') ?? root.querySelector<HTMLButtonElement>('.mission-hub__start-a') ?? root.querySelector<HTMLButtonElement>('[data-mission]') ?? root.querySelector<HTMLButtonElement>('.mission-hub__close'))?.focus({ preventScroll: true });
    },
    hide,
    isOpen: () => !root.hidden,
  };
}
