import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {read,sha,json,ensureRoot} from '../game008-009-production-r1/common.mjs';
ensureRoot();
const root='manual-play-ads-r1',exe='.cache/tools/gitleaks/8.30.1/gitleaks.exe';
fs.mkdirSync(root+'/internal/temp',{recursive:true});
const env={...process.env,TEMP:path.resolve(root+'/internal/temp'),TMP:path.resolve(root+'/internal/temp')};
const version=spawnSync(exe,['version'],{encoding:'utf8',windowsHide:true,env});assert.equal(version.status,0,'Pinned scanner unavailable');assert.equal(version.stdout.trim(),'8.30.1');
const current=fs.readFileSync('docs/games/PRODUCTION_CURRENT.md'),before=fs.readFileSync(root+'/internal/current-before.md');
assert(current.subarray(current.length-before.length).equals(before));
fs.mkdirSync(root+'/internal/security-scope',{recursive:true});
fs.writeFileSync(root+'/internal/security-scope/CURRENT_ADDED.md',current.subarray(0,current.length-before.length));
const scan=spawnSync(exe,['dir',root,'--config','.gitleaks.toml','--redact=100','--no-banner','--no-color','--gitleaks-ignore-path','rimbloom-complete-r2-integration/internal/empty.ignore','--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,env,maxBuffer:64e6});
assert([0,1].includes(scan.status),'Scoped scanner execution error; diagnostics withheld');
const findings=JSON.parse(scan.stdout||'[]').map(f=>({file:f.File,type:f.RuleID,action:'HUMAN_DISPOSITION_REQUIRED'}));
json(root+'/SECURITY_RESULTS.json',{
 at:new Date().toISOString(),scanner:'gitleaks',version:'8.30.1',status:findings.length?'FAIL_NEW_CANDIDATE':'PASS',rawScopedStatus:findings.length?'FAIL':'PASS',
 scope:{directory:root,includes:['source','candidate','runtime','ignored QA artifacts','local dry-run bundle','CURRENT_ADDED.md exact current handoff delta'],fullProject:false,fullIndex:false,localHistory:false},
 scanExitCode:scan.status,newUndisposedCandidates:findings.length,findings,
 priorFullProjectRawStatus:'FAIL',priorExactHumanDisposedCandidates:46,priorDispositionUnchanged:true,
 candidateManifestSha256:sha(fs.readFileSync(root+'/CANDIDATE_MANIFEST.json')),finalDiffSha256:sha(fs.readFileSync(root+'/FINAL_DIFF.json')),
 redaction:'100_PERCENT',rawFindingsSaved:false,providerValidation:false,stage:false,commit:false,push:false,deploy:false,
 release:'HUMAN_RELEASE_REVIEW_PENDING'
});
console.log(JSON.stringify({status:findings.length?'FAIL_NEW_CANDIDATE':'PASS',scope:root,scannerVersion:'8.30.1',newUndisposedCandidates:findings.length,findings}));
assert.equal(findings.length,0,'New scoped security candidate; release STOP');
