// Existing Git authentication is used only in memory for read-only repository metadata.
import {spawnSync} from 'node:child_process';import fs from 'node:fs';
const r=spawnSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\npath=T-ishikawa00/web-game-studio.git\n\n',encoding:'utf8',windowsHide:true});
if(r.status!==0)throw Error('Existing repository authentication unavailable; no details emitted');
const c=Object.fromEntries(r.stdout.trim().split(/\r?\n/).map(l=>{const n=l.indexOf('=');return [l.slice(0,n),l.slice(n+1)];}));
if(!c.password)throw Error('No usable existing authentication');
const response=await fetch('https://api.github.com/repos/T-ishikawa00/web-game-studio',{headers:{Authorization:'Bearer '+c.password,Accept:'application/vnd.github+json','User-Agent':'local-checkpoint-verifier'}});
if(!response.ok)throw Error('Private repository metadata check failed: '+response.status);
const data=await response.json();const safe={at:new Date().toISOString(),name:data.full_name,private:data.private,defaultBranch:data.default_branch,archived:data.archived};
if(safe.name!=='T-ishikawa00/web-game-studio'||safe.private!==true||safe.defaultBranch!=='main'||safe.archived)throw Error('Remote identity/privacy mismatch');
fs.writeFileSync('docs/qa/game005-expansion-baseline-r1/remote-preflight.json',JSON.stringify(safe,null,2));console.log(safe);
