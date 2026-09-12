import type { CatalogEntry, Category } from '../lib/catalog';
// Build-time only. Never merged into games/themes or release inventory.
const rows: [string, string, string, string, string, Category[]][] = [
  ['larva-evolution-lab', 'Larva Evolution Lab', '幼体進化ラボ', 'Evolve and explore new paths.', '進化して、すき間を抜けて、新しい道へ。', ['growth', 'puzzle']],
  ['clockwork-repair-workshop', 'Clockwork Repair Workshop', 'ぜんまい修理工房', 'Turn parts. Bring machines to life.', '部品を回して、小さな機械を動かそう。', ['puzzle']],
  ['one-move-chain', 'One-Move Chain', 'ワンムーブ・チェイン', 'One move. A whole chain reaction.', 'たった一手で、連鎖を起こそう。', ['puzzle', 'quick']],
  ['hidden-number-archive', 'Hidden Number Archive', 'ひみつの数字図書館', 'Find numbers in curious scenes.', '不思議な風景に隠れた数字を探そう。', ['puzzle']],
  ['cable-path', 'Cable Path', 'ケーブル・パス', 'Connect the matching terminals.', 'ケーブルをつないで、端子を結ぼう。', ['puzzle']],
  ['shape-fill-garden', 'Shape Fill Garden', 'かたちのガーデン', 'Place shapes. Grow your garden.', 'かたちをはめて、お庭を彩ろう。', ['puzzle']],
  ['slime-dungeon-route', 'Slime Dungeon Route', 'スライムの迷宮ルート', 'Find your way through the dungeon.', '道を選んで、迷宮のゴールへ。', ['puzzle', 'growth']],
  ['tiny-signal-factory', 'Tiny Signal Factory', 'ちいさな信号工場', 'Build, connect, deliver the signals.', '組み立てて、つないで、信号を届けよう。', ['puzzle']],
  ['mirror-glyph', 'Mirror Glyph', '鏡のグリフ', 'Use reflections to solve the mystery.', '鏡の反射で、謎を解き明かそう。', ['puzzle']],
  ['color-rail', 'Color Rail', 'カラー・レール', 'Guide the train with matching colors.', '色をつないで、列車を導こう。', ['puzzle', 'quick']],
];
export const designCatalog: CatalogEntry[] = rows.map(([slug, en, ja, descEn, descJa, categories], index) => ({
  id: `design-${slug}`, slug, title: { en, ja }, description: { en: descEn, ja: descJa },
  cover: `/design-art/card-${index + 1}.webp`, categories, tags: categories, state: 'design',
}));
