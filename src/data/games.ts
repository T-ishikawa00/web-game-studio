import islandRelease from './game005-release.json';
import { prototypes } from '../prototypes/catalog';
import identities from './game-identities.json';
import magnetRelease from './game004-release.json';
export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;
export interface Game {
  id: string;
  slug: string;
  title: Localized;
  pronunciation?: Localized;
  description: Localized;
  cover: string;
  inputs: ('pointer' | 'touch' | 'keyboard')[];
  devices: { desktop: boolean; mobile: boolean };
  orientation: 'any' | 'portrait' | 'landscape';
  buildPath: string;
  version: string;
  state: 'internal' | 'draft' | 'released';
  category: Localized;
  tags: string[];
  related: string[];
  save: { strategy: 'local'; schema: number };
  ads: { mode: 'disabled' | 'mock'; formats: ('interstitial' | 'rewarded')[] };
  legal: { status: 'internal-only' | 'pending-review' | 'reviewed'; evidence: string };
}

export const games: Game[] = [{
  id: 'internal-connection-lab', slug: 'connection-lab',
  title: { ja: 'コネクション・ラボ', en: 'Connection Lab' },
  description: {
    ja: 'パネルを灯して、操作・保存・画面遷移を確認する内部テスト。公開作品には含みません。',
    en: 'Light up the panels to check input, saves, and navigation. An internal test, excluded from the launch lineup.',
  },
  cover: '/covers/connection-lab.svg',
  inputs: ['pointer', 'touch', 'keyboard'], devices: { desktop: true, mobile: true }, orientation: 'any',
  buildPath: '/games/connection-lab/v0.1.0/index.html', version: '0.1.0', state: 'internal',
  category: { ja: '接続テスト', en: 'Integration test' }, tags: ['internal', 'fixture'], related: [],
  save: { strategy: 'local', schema: 1 }, ads: { mode: 'mock', formats: ['interstitial', 'rewarded'] },
  legal: { status: 'internal-only', evidence: 'docs/records/ASSET_REGISTER_R1.md' },
}];

export function relatedGames(game: Game, catalog: Game[] = games): Game[] {
  return [...new Set(game.related)].flatMap(id => {
    const entry = catalog.find(item => item.id === id && item.id !== game.id && item.state === 'released');
    return entry ? [entry] : [];
  }).slice(0, 4);
}

// Shared metadata authority. Candidate selection does not change release state.
// Current public identity is separate from frozen prototype metadata and stable IDs.
// Keep the existing slug so previous RC links and same-origin saves continue to work.
export const registry: Game[] = [...games, ...prototypes.map(game => ({
  ...game, ...(identities[game.id as keyof typeof identities] ?? {}),
})), magnetRelease as Game, islandRelease as Game];

export const themes: { key: string; title: Localized; description: Localized; category: Localized }[] = [
  { key: 'A', title: { ja: '幼体進化ラボ', en: 'Larva Evolution Lab' }, description: { ja: '進化を選ぶ。姿と能力が変わり、行けなかった場所へ。', en: 'Choose an evolution. Change your shape and abilities to reach somewhere new.' }, category: { ja: '成長・探索', en: 'Growth & discovery' } },
  { key: 'B', title: { ja: '光と仕掛けの工房', en: 'Light & Mechanism Workshop' }, description: { ja: '光をつなぐ。小さな仕掛けが、ひとつの答えになる。', en: 'Connect the light. Turn simple mechanisms into a satisfying solution.' }, category: { ja: 'ルーティング・パズル', en: 'Routing puzzle' } },
  { key: 'C', title: { ja: 'ワンムーブ・チェイン', en: 'One-Move Chain' }, description: { ja: '一手で動き出す。連鎖の結末を読み、すぐに試し直す。', en: 'Set a chain in motion with one move. Predict the outcome, then try again.' }, category: { ja: '連鎖・チャレンジ', en: 'Chain challenge' } },
];
