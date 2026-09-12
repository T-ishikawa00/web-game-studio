import type { Game, Locale, Localized } from '../data/games';
export type Category = 'puzzle' | 'growth' | 'quick';
export interface CatalogEntry {
  id: string; slug: string; title: Localized; description: Localized; cover: string;
  categories: Category[]; tags: string[]; state: 'internal' | 'released' | 'design';
}
export function catalogEntry(game: Game): CatalogEntry {
  return { ...game, state: game.state === 'released' ? 'released' : 'internal', categories: game.tags.filter((tag): tag is Category => ['puzzle', 'growth', 'quick'].includes(tag)) };
}
export const categoryLabels: Record<Locale, Record<Category | 'all', string>> = {
  ja: { all: 'すべて', puzzle: 'パズル', growth: '成長', quick: 'さくっと' },
  en: { all: 'All Games', puzzle: 'Puzzle', growth: 'Growth', quick: 'Quick Play' },
};
export function searchText(entry: CatalogEntry): string {
  return [entry.title.ja, entry.title.en, entry.description.ja, entry.description.en, ...entry.tags, ...entry.categories.flatMap(c => [categoryLabels.ja[c], categoryLabels.en[c]])].join(' ').normalize('NFKC').toLocaleLowerCase();
}
