import {pageDescription as existingDescriptions,coverAlt as existingAlt,playGuide as existingGuide} from './legacy-copy';
import catalog from './rimbloom-catalog.json';
import type {Localized} from '../data/games';
export const pageDescription:Record<string,Localized>={...existingDescriptions,
 '':{ja:'パズル、磁力アクション、島づくり、60秒の反射アクション。Tinlumoのオリジナルゲームを、ブラウザーですぐに。無料・インストール不要、日本語と英語で遊べます。',en:'Puzzles, magnetic action, a little island and a fast ricochet score attack. Play Tinlumo originals free in your browser, in Japanese or English. No installation needed.'},
 games:{ja:'道順を考える、光をつなぐ、金属を放つ、島を育てる、壁で反射して連鎖を狙う。遊び方の異なるTinlumoの作品から、気になるゲームを選べます。',en:'Plan a delivery, guide the light, launch metal, build an island or rebound into a chain. Explore Tinlumo games and find out how to play.'}};
export const coverAlt:Record<string,Localized>={...existingAlt,game007:{ja:catalog.ja.coverAlt,en:catalog.en.coverAlt}};
export const playGuide:Record<string,Localized>={...existingGuide,game007:{ja:Object.values(catalog.ja.controls).join(' '),en:Object.values(catalog.en.controls).join(' ')}};
