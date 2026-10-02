import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {read,sha,json,ensureRoot} from '../game008-009-production-r1/common.mjs';
ensureRoot();const root='manual-play-ads-r1',out=root+'/internal/sdk-selection-r1',mode=process.argv[2]??'all';assert(['all','staged','history','postflight'].includes(mode));
const kind=mode==='postflight'?'all':mode,summary='.tmp/security-r1/'+kind+'.summary.json';
fs.mkdirSync(out+'/temp',{recursive:true});if(fs.existsSync(summary))json(out+'/previous-'+mode+'.json',read(summary));
const result=spawnSync(process.execPath,['scripts/security-scan.mjs',kind],{encoding:'utf8',windowsHide:true,maxBuffer:64e6,env:{...process.env,TEMP:path.resolve(out+'/temp'),TMP:path.resolve(out+'/temp')}});
assert([0,1].includes(result.status),'Security scanner execution error; diagnostics withheld');const fresh=read(summary);
const findings=fresh.findings.map(f=>({file:f.file,type:f.type,action:'HUMAN_DISPOSITION_REQUIRED'}));let exactKnown=0;
if(kind==='all') {
 const expected=read('rimbloom-complete-r2-integration/internal/security-all.json');const ids=f=>f.map(e=>e.file.replaceAll('\\','/')+'|'+e.type).sort();
 json(out+'/security-'+mode+'-raw.json',{at:new Date().toISOString(),rawStatus:fresh.status,count:findings.length,findings});
 assert.equal(fresh.status,'FAIL');assert.equal(findings.length,46,'New or changed full-project security finding; release STOP');assert.deepEqual(ids(findings),ids(expected.findings),'Fresh findings differ from exact Human dispositions; release STOP');
 const authority=read('rimbloom-complete-r2-integration/internal/security-human-authority.json');assert.equal(authority.source,'DIRECT_HUMAN_RESPONSE');assert.equal(authority.approved,true);assert.equal(authority.scope,'EXACT_TWO_R2_OWNED_PREVIEW_PROXY_TREES_AND_LOGS_ONLY');
 for(const f of authority.exactLogs){assert.equal(f.disposition,'CONFIRMED_EPHEMERAL_LOCAL_SECRET_INVALIDATED');assert.equal(f.falsePositive,false);assert.equal(sha(fs.readFileSync(f.file)),f.sha256);}
 const stopped=read('rimbloom-complete-r2-integration/internal/process-post-stop.json');assert.equal(stopped.remainingOriginalPortListeners,0);assert.equal(stopped.remainingOwnedProxyProcesses,0);assert.equal(stopped.unstableLogs,0);assert.equal(stopped.logsDeleted,false);
 const exposure=read('rimbloom-complete-r2-integration/internal/exposure.json');assert.equal(exposure.status,'PASS');assert.equal(exposure.exposures.length,0);assert.equal(exposure.fullIndexIncluded,true);assert.equal(exposure.gitRefsAndReflogIncluded,true);
 const exact=read('tinlumo-growth-readiness-r1/20261002T185529JST/internal/security/new-candidates.json');for(const e of exact.entries)assert.equal(sha(fs.readFileSync(e.file)),e.wholeFileSha256);
 const legacy=read('tinlumo-quality-recovery-r1/release-20261001/security-exact-disposition-readback.json');for(const e of [...legacy.disposedExactLogHashes,...legacy.historicalProfileExactHashes])assert.equal(sha(fs.readFileSync(e.file)),e.sha256);
 const protectedFiles=read('.tmp/rimbloom-portal-r1/preflight-20261001/baseline.json');for(const e of protectedFiles.securityProtectedFileHashes)assert.equal(sha(fs.readFileSync(e.file)),e.sha256);
 exactKnown=46;
}else{assert.equal(fresh.status,'PASS');assert.equal(findings.length,0);}
const scan=spawnSync('.cache/tools/gitleaks/8.30.1/gitleaks.exe',['dir',root,'--config','.gitleaks.toml','--redact=100','--no-banner','--no-color','--gitleaks-ignore-path','rimbloom-complete-r2-integration/internal/empty.ignore','--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,maxBuffer:64e6,env:{...process.env,TEMP:path.resolve(out+'/temp'),TMP:path.resolve(out+'/temp')}});
assert([0,1].includes(scan.status),'Scoped scanner execution error');const scoped=JSON.parse(scan.stdout||'[]').map(f=>({file:f.File,type:f.RuleID,action:'HUMAN_DISPOSITION_REQUIRED'}));
json(out+'/security-'+mode+'.json',{at:new Date().toISOString(),mode,status:scoped.length?'STOP':'PASS',rawStatus:fresh.status,exactHumanDisposed:exactKnown,newUndisposedCandidates:scoped.length,scopedFindings:scoped,scanner:'gitleaks 8.30.1',fullProject:kind==='all',fullIndex:kind==='staged',localHistory:kind==='history',tlsKeyIndexHistoryAbsenceRechecked:kind!=='all',hookOrScannerChanged:false,manifestSha256:sha(fs.readFileSync(root+'/CANDIDATE_MANIFEST.json'))});
console.log(JSON.stringify({mode,status:scoped.length?'STOP':'PASS',rawStatus:fresh.status,exactHumanDisposed:exactKnown,newUndisposedCandidates:scoped.length,scopedFindings:scoped}));assert.equal(scoped.length,0,'New scoped candidate; release STOP');
