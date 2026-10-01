import {games as existingGames, definitions as existingDefinitions, releaseIdentity as baseReleaseIdentity, facts as existingFacts, saveNote as existingSaveNote, genre as existingGenre} from './legacy-catalog';
import type {Game,Locale,Localized} from '../data/games';
import catalog from './rimbloom-catalog.json';
export {baseReleaseIdentity};
export const releaseIdentity='RIMBLOOM_PORTAL_INTEGRATION_RELEASE_CANDIDATE_R1';
export const rimbloom:Game={
 id:'game007',slug:'rimbloom',title:{ja:catalog.ja.title,en:catalog.en.title},
 description:{ja:catalog.ja.description,en:catalog.en.description},cover:'/covers/game007-a.webp',
 inputs:['pointer','touch','keyboard'],devices:{desktop:true,mobile:true},orientation:'portrait',
 buildPath:'/games/game007/1.0.0-r1/index.html',version:'1.0.0-r1',state:'draft',
 category:{ja:'反射アクション',en:'Ricochet action'},tags:['action','score-attack'],
 related:existingGames.map(game=>game.id),save:{strategy:'local',schema:1},ads:{mode:'disabled',formats:[]},
 legal:{status:'pending-review',evidence:'rimbloom-portal-integration-r1/README.md'}
};
// Six entries in this local candidate only. The shared registry and live lineup remain unchanged.
export const games=[...existingGames,rimbloom];
export const definitions=[...existingDefinitions,{id:rimbloom.id,slug:rimbloom.slug,title:rimbloom.title,summary:{ja:catalog.ja.shortDescription,en:catalog.en.shortDescription}}];
export function definition(id:string){const entry=definitions.find(game=>game.id===id);if(!entry)throw Error('Unknown candidate game');return entry;}
export const genre:Record<string,Localized>={...existingGenre,game007:rimbloom.category};
export function facts(game:Game){return game.id==='game007'?{count:{ja:'60秒のスコアアタック',en:'60-second score attack'},controls:{ja:'ドラッグ・タッチ / 矢印・WASD＋Space',en:'Drag or touch / Arrows or WASD + Space'}}:existingFacts(game);}
export function saveNote(id:string,locale:Locale){if(id!=='game007')return existingSaveNote(id,locale);return locale==='ja'?'Run終了時にベストスコア・最大連鎖・前回スコア・プレイ回数を、このブラウザーへ保存します。途中のRunは保存されません。保存を利用できない場合は、そのページ内だけに記録を保持します。記録の消去はサイトの設定ページで確認してから行えます。':'Best score, best chain, previous score and run count save in this browser when a run ends. An unfinished run is not saved. If storage is unavailable, records last only for this page. Review and erase this game’s records from the site Settings page.';}
