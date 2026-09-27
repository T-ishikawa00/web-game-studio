import {productionCandidateRegistry, type Locale} from '../data/games';
import release from '../data/visual-release.json';
import {gameFacts,magnetSave,islandSave} from '../rc/public-catalog';
import {saveCopy} from '../rc/save-copy';
export const games=productionCandidateRegistry;
export const definitions=release.games;
export const releaseIdentity=release.identity;
export function definition(id:string){const game=definitions.find(g=>g.id===id);if(!game)throw Error('Unknown production game');return game;}
export const facts=gameFacts;
export function saveNote(id:string,locale:Locale){
 if(id==='game005')return islandSave[locale];
 if(id==='project-magnet')return magnetSave[locale];
 const condition=locale==='ja'?' 保存できない場合は画面にお知らせします。':' If saving is unavailable, a message appears in the game.';
 const checkpoint=id==='tiny-delivery'?(locale==='ja'?' 配達の途中でページを閉じた場合は、保存した道順と待ち時間の編集から再開します。走行途中の位置は保存しません。':' If you leave during a delivery, you return to the saved route and waits, ready to edit and run again. Mid-run courier positions are not saved.') : '';
 const reset=locale==='ja'?` 進行の消去は${id==='tiny-delivery'?'サイトの設定ページ':'ゲーム内の設定'}から行えます。この作品の進行・クリア記録・動きの設定が消え、音の設定と他の作品の保存は残ります。`:` Reset progress from ${id==='tiny-delivery'?'the site Settings page':'the in-game settings'}. This removes this game’s progress, completions and motion preference, while keeping sound preferences and other games’ saves.`;
 return saveCopy[locale].detail+condition+checkpoint+reset;
}
export const genre:Record<string,{ja:string;en:string}>={
 'tiny-delivery':{ja:'配送パズル',en:'Routing puzzle'},'light-garden':{ja:'光のパズル',en:'Light puzzle'},
 'two-ways-home':{ja:'ふたりのパズル',en:'Synchronized puzzle'},'project-magnet':{ja:'磁力アクション',en:'Magnetic action'},'game005':{ja:'小さな島づくり',en:'Island builder'}
};
