import fs from 'node:fs/promises';
const p='src/games/lens.js';let s=await fs.readFile(p,'utf8');s=s.replaceAll("state.aim={x:clamp(p.x,112,608),y:clamp(p.y,105,528)};", "state.aim={x:clamp(p.x,112,608),y:clamp(p.y,105,528)};state.frame={...state.aim};");await fs.writeFile(p,s);
