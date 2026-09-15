import {lightLevelsR2 as lightLevels} from './light-levels-r2';
import {homeLevels} from './home-levels-learning';
import {deliveryLevelsR2 as deliveryLevels} from './delivery-levels-r2';
export {lightLevels,homeLevels,deliveryLevels};
export const levelsByGame={'light-garden':lightLevels,'two-ways-home':homeLevels,'tiny-delivery':deliveryLevels};
export type GameId=keyof typeof levelsByGame;
export const gameIds=Object.keys(levelsByGame) as GameId[];
export function isGameId(id:unknown):id is GameId{return typeof id==='string'&&Object.hasOwn(levelsByGame,id);}
