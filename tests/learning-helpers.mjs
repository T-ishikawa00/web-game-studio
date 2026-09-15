import {setup as currentSetup} from './r5-helpers.mjs';
export {launch,out,ids} from './r5-helpers.mjs';
// Replay the retained R5 input corpus against its original stable IDs. New-player
// and reordered-level tests use r5-helpers directly and test the new opening.
export async function setup(browser,options={}){const u=await currentSetup(browser,options),open=u.open;u.level=async i=>{await u.menu('levels');const prefix=(await u.state()).progress.levelId[0];await u.a('level:'+prefix+String(i+1).padStart(2,'0')).click();};u.open=async(...args)=>{await open(...args);if(args[0]==='two-ways-home')await u.level(0);};return u;}
