import {registry, type Game} from '../data/games';
export const candidateIds=['tiny-delivery','light-garden','two-ways-home'] as const;
export const acceptedProfiles={
 'tiny-delivery':'Craft R2 · Motion + SFX + B / D1 Rhythm Refine / 80 BPM',
 'light-garden':'Craft R1 · LG-C + Object Design + Art Polish · no BGM',
 'two-ways-home':'Craft R1 · TW-C · no BGM',
};
export const candidateGames:Game[]=candidateIds.map(id=>{
 const game=registry.find(g=>g.id===id);if(!game||game.state==='released')throw Error('RC selection must be unreleased');
 return {...game,cover:`/covers/${id}.png`,buildPath:`/games/${id}/rc-r1/index.html`,related:candidateIds.filter(other=>other!==id),category:{ja:'パズル',en:'Puzzle'},tags:['puzzle'],ads:{mode:'disabled',formats:[]}};
});
export const instructions={
 'tiny-delivery':{ja:'矢印をタップして道を決め、時計で待ち時間を選びます。走行で2台の荷物を届けましょう。途中で停止して調整に戻れます。1手Undoはありません。',en:'Tap arrows to plan routes and set waiting times with the clocks. Run both robots to their destinations. Pause to return to editing. There is no one-move Undo.'},
 'light-garden':{ja:'鏡をタップして光を反射させ、すべての花へ届けます。受光すると門が開きます。Undoで直前の操作を戻せます。',en:'Tap mirrors to reflect light to every flower. Receivers open gates. Undo takes back your last move.'},
 'two-ways-home':{ja:'盤面をスワイプすると、ふたりが同じ方向へ動きます。壁で片方を止め、同時に家へ帰しましょう。方向ボタン・矢印キー・WASDでも操作できます。',en:'Swipe a board to move both friends in the same direction. Use walls to stop one and bring both home together. Direction buttons, arrow keys and WASD also work.'},
};
