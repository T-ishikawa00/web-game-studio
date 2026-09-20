import fs from 'node:fs/promises';
import {spawnSync,execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const qa='docs/qa/game004-magnet-public-r1',raw=JSON.parse(await fs.readFile('.tmp/security-r1/all.summary.json'));
assert.equal(raw.status,'FAIL');assert.deepEqual(raw.findings.map(f=>[f.file.replaceAll('\\','/'),f.type]).sort(),[['.tmp/physical-mobile-r2/tls/server.key','private-key'],['.tmp/r3-before/manifest.json','generic-api-key']].sort(),'New candidate requires Human disposition; stop');
const hash=b=>createHash('sha256').update(b).digest('hex'),old=JSON.parse(await fs.readFile('.tmp/r3-before/manifest.json'));
assert.equal(old.hashes['docs/security/SECRETS_REGISTER.md'],hash(await fs.readFile('docs/security/SECRETS_REGISTER.md')));
await fs.writeFile('.tmp/magnet-public-r1/distribution.ignore','');
const scans=[];
for(const root of ['.cache/game004-public-candidate','.cache/game004-public-game']){
 const r=spawnSync('.cache/tools/gitleaks/8.30.1/gitleaks.exe',['dir',root,'--config','.gitleaks.toml','--redact=100','--no-banner','--no-color','--gitleaks-ignore-path','.tmp/magnet-public-r1/distribution.ignore','--ignore-gitleaks-allow','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true});
 assert.ok([0,1].includes(r.status),'Scanner failed');const findings=JSON.parse(r.stdout).map(f=>({file:f.File,type:f.RuleID,action:'HUMAN DISPOSITION REQUIRED'}));scans.push({root,status:r.status===0?'PASS':'FAIL',findings});
}
const base=JSON.parse(await fs.readFile('docs/qa/mvp-portal-release-r1/distribution-manifest.json')),candidate=JSON.parse(await fs.readFile(qa+'/distribution.json')),retained=[];
for(const f of base.files){assert.equal(hash(await fs.readFile(base.root+'/'+f.file)),f.sha256,'Production artifact changed');if(/^(games\/|assets\/|covers\/|licenses\/|_astro\/)/.test(f.file)){assert.equal(hash(await fs.readFile(candidate.root+'/'+f.file)),f.sha256,'Existing payload changed');retained.push(f.file);}}
const frozen=JSON.parse(await fs.readFile('docs/qa/game004-magnet-full-baseline-r1/frozen-manifest.json'));let artifacts=0;for(const f of frozen.artifacts){assert.equal(hash(await fs.readFile(f.file)),f.sha256,'Accepted Full artifact changed');artifacts++;}
const git=(...a)=>execFileSync('git',a,{encoding:'utf8',windowsHide:true}).trim(),tls='.tmp/physical-mobile-r2/tls/server.key';
const tlsChecks={ignored:!!git('check-ignore',tls),absentIndex:!git('ls-files','--',tls),absentHistory:!git('log','--all','--format=%H','--',tls)};
const result={rawFullProject:raw,approvedExistingFindings:2,newCandidates:scans.reduce((s,x)=>s+x.findings.length,0),distributionScans:scans,tlsChecks,productionFilesVerified:base.files.length,retainedPayloads:retained,fullAcceptedArtifactsVerified:artifacts,indexEmpty:!git('diff','--cached','--name-only'),scannerExceptionsAdded:0,externalProviderCalls:0,deploy:0};
await fs.writeFile(qa+'/security.json',JSON.stringify(result,null,2));assert.equal(result.newCandidates,0);assert.ok(Object.values(tlsChecks).every(Boolean));assert.ok(result.indexEmpty);console.log({distribution:scans.map(s=>s.status),raw:'FAIL (2 approved existing)',newCandidates:0,retained:retained.length,acceptedArtifacts:artifacts});
