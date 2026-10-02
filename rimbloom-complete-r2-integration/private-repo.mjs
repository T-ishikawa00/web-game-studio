import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
// Existing credential-helper authentication stays in memory. Never emit or persist it.
export async function verifyPrivateRepo(){
  const result=spawnSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\npath=T-ishikawa00/web-game-studio.git\n\n',encoding:'utf8',windowsHide:true,env:{...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'}});
  assert.equal(result.status,0,'Existing noninteractive GitHub authentication unavailable');
  const values=Object.fromEntries(result.stdout.trim().split(/\r?\n/).map(line=>{const i=line.indexOf('=');return [line.slice(0,i),line.slice(i+1)];}));
  assert(values.password,'Existing GitHub authentication unavailable');
  const response=await fetch('https://api.github.com/repos/T-ishikawa00/web-game-studio',{headers:{Authorization:'Bearer '+values.password,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(20000)});
  assert.equal(response.status,200,'Fresh repository visibility read failed');
  const data=await response.json();assert.equal(data.full_name,'T-ishikawa00/web-game-studio');assert.equal(data.private,true,'Push destination must remain private');
  return {isPrivate:true,nameWithOwner:data.full_name,verifiedAt:new Date().toISOString(),source:'GITHUB_REPOSITORY_API_EXISTING_NONINTERACTIVE_AUTH'};
}
