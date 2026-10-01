// Small, readable formations; every run uses the engine's explicit seeded RNG.
export const FORMATIONS = ['fan','crescent','rim-ladder','guarded','crossing'];
const zones=[[135,245],[405,245],[130,555],[405,555],[270,210],[270,610]];
export function formation(g){
  const id=Math.floor(g.rng()*FORMATIONS.length);
  const candidates=zones.filter(([x,y])=>Math.hypot(x-g.p.x,y-g.p.y)>145);
  const [cx,cy]=candidates[Math.floor(g.rng()*candidates.length)];
  const angle=(g.rng()-.5)*.7+(cx>270?Math.PI:0),c=Math.cos(angle),s=Math.sin(angle);
  const relay=g.t>=11,armor=g.band>=1;
  const center=relay?'relay':'soft';
  const patterns=[
    [[center,0,0],['soft',-52,-32],['soft',-52,32],['soft',45,0]],
    [[center,0,0],['soft',-45,-52],['soft',-65,0],['soft',-45,52]],
    [[armor?'armor':'soft',0,-60],[center,0,0],['soft',0,58],['soft',-55,15]],
    [[center,0,0],[armor?'armor':'soft',-58,0],['soft',42,-35],['soft',42,35]],
    [[center,0,0],['soft',-65,-38],['soft',65,38],[armor?'armor':'soft',55,-38]]
  ];
  const targets=patterns[id].map(([type,x,y])=>({type,x:Math.max(65,Math.min(475,cx+x*c-y*s)),y:Math.max(150,Math.min(665,cy+x*s+y*c))}));
  if(g.band===2){targets.push({type:'soft',x:Math.max(65,Math.min(475,cx-70*s)),y:Math.max(150,Math.min(665,cy+70*c))});if(id===1||id===3)targets.push({type:'armor',x:Math.max(65,Math.min(475,cx+82*c)),y:Math.max(150,Math.min(665,cy+82*s))});}
  return {name:FORMATIONS[id],targets};
}
