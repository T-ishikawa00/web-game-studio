export const encounters = [
 {id:'b1-sightline', enemies:[['shield',.53,.40],['gunner',.76,.32],['basic',.28,.28]], relay:[.72,.72], quota:9},
 {id:'b2-support', enemies:[['support',.70,.30],['shield',.48,.45],['charger',.25,.32],['gunner',.77,.64]], relay:[.25,.70], quota:12},
 {id:'b6-carrier', enemies:[['carrier',.53,.30],['shield',.66,.44],['gunner',.78,.57]], relay:[.22,.65], quota:0},
] as const;
export const modules=['field','brake','drive','shock'] as const;
