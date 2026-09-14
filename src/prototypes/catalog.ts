import type { Game } from '../data/games';
export const prototypes: Game[] = [
  {id:'light-garden',slug:'light-garden',title:{ja:'ひかりの仕掛け庭',en:'Lightwork Garden'},description:{ja:'光をつなぐ。門を開く。小さな庭に、花を咲かせよう。',en:'Bend the light, open a gate, and bring a little garden into bloom.'}},
  {id:'two-ways-home',slug:'two-ways-home',title:{ja:'ふたりの帰り道',en:'Two Ways Home'},description:{ja:'ふたりは一緒に動く。壁を味方に、最後の一歩をそろえよう。',en:'Two friends move together. Use the walls to line up their last step home.'}},
  {id:'tiny-delivery',slug:'tiny-delivery',title:{ja:'ちいさな配送パズル',en:'Tiny Delivery'},description:{ja:'道を決めて、少し待って。ふたりの荷物を、ぶつからずに届けよう。',en:'Plan a route and a little wait. Help both robots deliver without a bump.'}},
].map(g=>({...g,cover:`/prototype-assets/${g.id}.svg`,inputs:['pointer','touch','keyboard'],devices:{desktop:true,mobile:true},orientation:'any',buildPath:`/prototype-assets/game.html?game=${g.id}`,version:'0.1.0',state:'draft',category:{ja:'通しプレイAlpha',en:'Full-run alpha'},tags:['prototype','full-run-alpha'],related:[],save:{strategy:'local',schema:1},ads:{mode:'disabled',formats:[]},legal:{status:'pending-review',evidence:'docs/records/ASSET_REGISTER_R1.md'}}));
