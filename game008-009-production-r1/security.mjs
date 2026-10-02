import fs from 'node:fs';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';import {root,read,json,env,verifyManifest} from './common.mjs';
const game=process.argv[2],mode=process.argv[3]??'all';assert(['game008','game009'].includes(game));assert(['all','staged','history','postflight'].includes(mode));
const inherited=spawnSync(process.execPath,['rimbloom-complete-r2-integration/security.mjs',mode],{encoding:'utf8',windowsHide:true,maxBuffer:64e6,env:env()});assert.equal(inherited.status,0,'Security scanner or exact existing disposition validation failed');
const scopes=[];
if(['all','postflight'].includes(mode)){
 const m=read(root+'/'+game+'/RELEASE_MANIFEST.json');verifyManifest(m);
 for(const target of [root,m.root]){
  const result=spawnSync('.cache/tools/gitleaks/8.30.1/gitleaks.exe',['dir',target,'--config','.gitleaks.toml','--redact=100','--no-banner','--no-color','--gitleaks-ignore-path','rimbloom-complete-r2-integration/internal/empty.ignore','--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,maxBuffer:64e6,env:env()});
  assert([0,1].includes(result.status),'Scope scanner execution error');const findings=JSON.parse(result.stdout).map(f=>({file:f.File,type:f.RuleID,action:'HUMAN_DISPOSITION_REQUIRED'}));scopes.push({target,status:findings.length?'FAIL':'PASS',findings});assert.equal(findings.length,0,'New security candidate; release STOP');
 }
}
const inheritedGate=['all','postflight'].includes(mode)?read('rimbloom-complete-r2-integration/internal/security-gate'+(mode==='postflight'?'-postflight':'')+'.json'):read('.tmp/security-r1/'+mode+'.summary.json');
const receipt={at:new Date().toISOString(),game,mode,status:'PASS',rawStatus:['all','postflight'].includes(mode)?'FAIL':'PASS',existingExactHumanDisposed:46,newUndisposedCandidates:0,scopes,inheritedEvidence:inheritedGate};json(root+'/internal/'+game+'-security-'+mode+'.json',receipt);console.log(JSON.stringify({...receipt,inheritedEvidence:undefined}));
