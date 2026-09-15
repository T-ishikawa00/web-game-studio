import type {HomeLevel} from './rules';
import {homeLevelsR2} from './home-levels-r2';

const wallsExcept=(floor:number[])=>Array.from({length:16},(_,i)=>i).filter(i=>!floor.includes(i));
// New content gets new stable IDs. No old ID is reused for a different puzzle.
export const homePrimers:HomeLevel[]=[
 {kind:'home',id:'T19',version:1,answerKey:'T19@1',size:4,
  title:{ja:'ひとつの合図',en:'One shared signal'},
  lesson:{ja:'どちらの庭でも、方向をひとつ送るとふたりが一歩。',en:'Send one direction in either garden: both friends take a step.'},
  starts:[9,9],homes:[10,10],walls:wallsExcept([9,10]),otherWalls:wallsExcept([9,10]),
  hints:[{ja:'ふたりの家は同じ方向にあります。',en:'Both homes lie in the same direction.'},{ja:'右へスワイプ、ドラッグ、または右キーを一回。',en:'Swipe or drag right, or press the right arrow once.'}]},
 {kind:'home',id:'T20',version:1,answerKey:'T20@1',size:4,
  title:{ja:'壁がそろえてくれる',en:'A wall lines them up'},
  lesson:{ja:'壁の前の子だけ止まります。もうひとりの一歩を見よう。',en:'The friend facing a wall stops. Watch the other take a step.'},
  starts:[8,9],homes:[6,6],walls:wallsExcept([8,9,10,6]),otherWalls:wallsExcept([9,10,6]),
  hints:[{ja:'曲がり角までの距離が、一歩違います。',en:'One friend is one step further from the corner.'},{ja:'右へ二回で角にそろい、上へ一歩で帰宅。',en:'Two rights line them up at the corner; then one step up.'}]},
 {kind:'home',id:'T21',version:1,answerKey:'T21@1',size:4,
  title:{ja:'こんどは縦の道',en:'Try the upright path'},
  lesson:{ja:'向きが変わっても、壁の働きは同じ。自分で試そう。',en:'A different direction, the same wall rule. Try it yourself.'},
  starts:[2,6],homes:[9,9],walls:wallsExcept([2,6,10,9]),otherWalls:wallsExcept([6,10,9]),
  hints:[{ja:'曲がり角へふたりをそろえるには？',en:'How can both friends reach the corner together?'},{ja:'下へ二回、左へ一回。片方が待つ一歩を確かめよう。',en:'Down twice, then left. Watch the step where one friend waits.'}]},
];
// Sequence is presentation only. Saves, answers, guides and navigation use IDs.
export const homeLearningOrder=['T19','T01','T20','T21','T02','T06','T07','T08','T09','T03','T04','T05','T10','T11','T12','T13','T14','T15','T16','T17','T18'] as const;
const all=[...homeLevelsR2,...homePrimers];
export const homeLevels=homeLearningOrder.map(id=>all.find(l=>l.id===id)!);
