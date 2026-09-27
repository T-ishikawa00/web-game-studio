import {productionCandidateRegistry, type Locale} from '../data/games';
import release from '../data/visual-release.json';
import {gameFacts,magnetSave,islandSave} from '../rc/public-catalog';
import {saveCopy} from '../rc/save-copy';
export const games=productionCandidateRegistry;
export const definitions=release.games;
export const releaseIdentity=release.identity;
export function definition(id:string){const game=definitions.find(g=>g.id===id);if(!game)throw Error('Unknown production game');return game;}
export const facts=gameFacts;
export function saveNote(id:string,locale:Locale){return id==='game005'?islandSave[locale]:id==='project-magnet'?magnetSave[locale]:saveCopy[locale].detail;}
export const genre:Record<string,{ja:string;en:string}>={
 'tiny-delivery':{ja:'配送パズル',en:'Routing puzzle'},'light-garden':{ja:'光のパズル',en:'Light puzzle'},
 'two-ways-home':{ja:'ふたりのパズル',en:'Synchronized puzzle'},'project-magnet':{ja:'磁力アクション',en:'Magnetic action'},'game005':{ja:'小さな島づくり',en:'Island builder'}
};
