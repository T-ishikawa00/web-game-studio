import {registry, type Game, type Localized} from '../data/games';
import {instructions} from './profile';
import {levelsByGame, type GameId} from '../prototypes/levels';

// Public selection authority. Registry remains the authority for identity/copy.
// A new game is registered there and selected here after acceptance; page counts,
// routes and related games are derived, never patched into generated HTML.
export const publicSelection = [
  {id:'game005', delivery:'island',version:'web-v1-r1',summary:{"ja":"道をつなぎ、暮らしの景色を育てよう。","en":"Connect the paths. Watch island life grow."}},
  {id:'project-magnet', delivery:'fullscreen', version:'full-r1',summary:{ja:'金属を集め、狙って一斉射出。',en:'Gather metal. Aim. Release.'}},
  {id:'tiny-delivery', delivery:'shell', version:'rc-r1',summary:{ja:'道と待ち時間を決め、2台で届けよう。',en:'Plan two routes. Deliver together.'}},
  {id:'light-garden', delivery:'shell', version:'rc-r1',summary:{ja:'鏡で光をつなぎ、花を咲かせよう。',en:'Bend the light. Let the garden bloom.'}},
  {id:'two-ways-home', delivery:'shell', version:'rc-r1',summary:{ja:'ふたりを同時に動かし、家へ帰そう。',en:'Move as one. Bring both friends home.'}},
] as const;
export const publicGames: Game[] = publicSelection.map(entry => {
  const game=registry.find(g=>g.id===entry.id);
  if(!game || game.id.startsWith('internal-'))throw Error('Invalid public selection');
  return {...game, state:'released', version:entry.version,
    cover:`/covers/${entry.id}.png`,buildPath:`/games/${entry.id}/${entry.version}/index.html`,
    related:publicSelection.filter(g=>g.id!==entry.id).map(g=>g.id),ads:{mode:'disabled',formats:[]}};
});
export const fullscreenGame = (id:string) => publicSelection.find(g=>g.id===id)?.delivery==='fullscreen';
export const publicCopy = {
  heading:{ja:'見つけよう、小さな遊び。',en:'Find your next little adventure.'},
  description:{ja:'日本語と英語で遊べる、無料のオリジナルブラウザーゲーム。',en:'Free original browser games in Japanese and English.'},
  about:{ja:'Tinlumo Studioは、ブラウザーですぐ遊べるオリジナルゲームを制作・公開しています。',en:'Tinlumo Studio creates original games you can play right in your browser.'},
  terms:{ja:'Tinlumoは、日本語と英語で遊べる無料のオリジナルブラウザーゲームを提供します。',en:'Tinlumo provides free original browser games in Japanese and English.'},
};
export const magnetSave:Localized={
  ja:'作戦の解放、記録、言語・消音・動きの設定、区画開始時点の再開データを、このブラウザに保存します。作戦画面のデータ消去では、PROJECT MAGNETの設定も含めてすべて消去します。他の作品の保存は変更しません。保存できない場合は画面に表示し、そのタブ内でのみ続行します。',
  en:'Mission unlocks, records, language, mute, motion preferences and a sector-start checkpoint are saved in this browser. Resetting PROJECT MAGNET deletes its settings as well as its progress. Other games are unaffected. If saving is unavailable, the game tells you and lets you continue in this tab only.',
};
export const islandSave={ja:'建物・資源・進行・配置と、言語・音・動き・画質の設定を、このブラウザに自動保存します。島の進行を消去しても設定は残ります。保存できない場合は画面にお知らせします。日本語と英語で進行を共有し、保存した言語設定を優先します。',en:'Buildings, resources, progress, placements and language, sound, motion and graphics settings save automatically in this browser. Resetting the island keeps your settings. A message appears if saving is unavailable. Progress is shared across Japanese and English; your saved language preference takes priority.'};
export function gameFacts(game:Game) {
 if(game.id==='game005')return {count:{ja:'3つの場所を結ぶ島づくり',en:'One island · three places'},controls:{ja:'タッチ・マウス・キーボード',en:'Touch · mouse · keyboard'},instructions:{ja:'建築・施設から、次に作る場所を選びます。木材と資金を使い、作業は住民におまかせ。入り江の広場、丘への入口、見晴らしの向きを選び、島全体をつなぎましょう。完成後も鑑賞と市場・広場の配置調整ができます。',en:'Open Build & explore and choose what to make next. Spend timber and coins; residents handle the work. Choose a cove commons, a path up the hill and a view to bring the island together. After completion, keep looking around or reposition the market and commons.'}};
  if(fullscreenGame(game.id))return {
    count:{ja:'3作戦 · 18区画',en:'3 missions · 18 sectors'},
    controls:{ja:'マウス・キーボード / 2本指タッチ',en:'Mouse + keyboard / two-finger touch'},
    instructions:{ja:'WASDまたは矢印で移動。金属の近くで押し続け、敵を狙って離すと一斉射出。タッチは左指で移動、右指で吸引・照準し、右指を離して射出します。壊した装甲を回収して設備へ送電。区画をクリアして進化を選び、作戦Aを完了するとB、Bを完了するとCが開きます。',en:'Move with WASD or arrow keys. Hold near metal, aim at an enemy, then release to launch. On touch screens, move with your left thumb; gather and aim with your right thumb, then release it. Gather broken armor to power the relays. Clear sectors and choose upgrades. Complete Mission A to unlock B, then B to unlock C.'},
  };
  const count=levelsByGame[game.id as GameId].length;
  return {count:{ja:`${count}問`,en:`${count} puzzles`},controls:{ja:'タッチ・マウス・キーボード',en:'Touch · Mouse · Keyboard'},instructions:instructions[game.id as keyof typeof instructions]};
}
