export type CovePlot='sea'|'shade';
export type Point=[number,number];
// All navigable ground stays within the flat inner part of the accepted shore.
// 17 is the real bridge landing; 18 is the new cove threshold.
export const COVE_NODES:Point[]=[
 [7.8,-1.946],[8.18,-2.08],[8.68,-2.46],[9.08,-1.35],
 [9.48,-1.12],[10.32,-2.62],[9.98,-3.18],[9.42,-3.88],
 [8.32,-3.25],[9.88,-1.26],[10.30,-3.42],
 [9.47,-3.35],[10.08,-3.71],[9.37,-2.85],[9.88,-.96],[9.48,-.84]
];
export const COVE_EDGES=[[16,17],[17,18],[18,19],[19,20],[20,32],[32,21],[32,31],[31,26],[19,28],[28,23],[28,29],[29,27],[24,28],[28,30],[30,22],[24,25],[25,18],[20,22]];
export const PLAZA:Record<CovePlot,Point>={sea:[9.48,-1.12],shade:[9.98,-3.18]};
export const SEATS:Record<number,{angle:number,kind:'sit'|'look'}>={
 21:{angle:.15,kind:'sit'},26:{angle:.15,kind:'sit'},
 23:{angle:-2.5,kind:'sit'},27:{angle:-2.5,kind:'sit'},
 22:{angle:1.6,kind:'look'},24:{angle:-2.5,kind:'look'},17:{angle:.9,kind:'look'}
};
export const isCove=(kind:string)=>['cove','commons','promenade'].includes(kind);
