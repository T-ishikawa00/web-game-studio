export type Connection='village-link'|'cove-link';
export type Outlook='sea-view'|'town-view';
export type Point=[number,number];
export const isHill=(id:string)=>['hillpath','lookout'].includes(id);
// Authored height patch on the existing mainland. No terrain editing or extra island.
export function groundHeight(x:number,z:number){
 const r=Math.hypot((x-3.7)/1.18,(z+2.9)/1.08);
 const t=Math.max(0,Math.min(1,(1.48-r)/.82));
 return .35+1.25*t*t*(3-2*t);
}
// A narrow authored coastal bank grounds the new descent and joins the old bridge landing.
// Outside this patch the accepted coastline formula is untouched.
export function hillTerrainHeight(x:number,z:number,base:number){
 const a:Point=[4.8,-2.8],b:Point=[5,-1.05],dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz))),d=Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t);
 const bank=Math.max(0,Math.min(1,(.82-d)/.48));
 return Math.max(base,groundHeight(x,z)>.351?groundHeight(x,z):-9,base+(.35-base)*bank*bank*(3-2*bank));
}
export const HILL_NODES:Point[]=[
 [2.3,-.65],[2.45,-1.65],[2.6,-2.45],[3.35,-2.65],
 [4.12,-2.65],[3.25,-3.2],[4.8,-2.8],[5,-1.45],
 [4.25,-3.65],[3.1,-1.55]
];
// Independent route and outlook axes. Both circuits reuse the real accepted bridge.
export function hillEdges(connection:Connection):number[][]{
 return connection==='village-link'
 ?[[0,33],[33,34],[34,35],[35,36],[36,39],[39,40],[40,16],[36,37],[36,38]]
 :[[0,33],[33,42],[42,36],[36,41],[41,39],[39,40],[40,16],[36,37],[36,38]];
}
export const HILL_SITES:Record<string,Point>={hillpath:[2.3,-.65],lookout:[3.7,-2.9],'village-link':[2.3,-.65],'cove-link':[5,-1.45],'sea-view':[4.12,-2.65],'town-view':[3.25,-3.2]};
export const HILL_SEATS:Record<number,{angle:number,kind:'sit'|'look'}>={37:{angle:.05,kind:'sit'},38:{angle:-1.35,kind:'sit'},36:{angle:1.0,kind:'look'},41:{angle:-1.2,kind:'look'},33:{angle:.6,kind:'look'}};
