import fs from 'node:fs/promises';
import {spawnSync,execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const qa='docs/qa/game004-magnet-release-r1',hash=b=>createHash('sha256').update(b).digest('hex');
const raw=JSON.parse(await fs.readFile('.tmp/security-r1/all.summary.json'));
assert.equal(raw.status,'FAIL');assert.deepEqual(raw.findings.map(f=>[f.file.replaceAll('\\','/'),f.type]).sort(),[['.tmp/physical-mobile-r2/tls/server.key','private-key'],['.tmp/r3-before/manifest.json','generic-api-key']].sort(),'New secret candidate: stop checkpoint/push/release for Human disposition');
const old=JSON.parse(await fs.readFile('.tmp/r3-before/manifest.json'));assert.equal(old.hashes['docs/security/SECRETS_REGISTER.md'],hash(await fs.readFile('docs/security/SECRETS_REGISTER.md')));
await fs.writeFile('.tmp/magnet-release-r1/distribution.ignore','');
const root='release-artifacts/game004-production-r1',r=spawnSync('.cache/tools/gitleaks/8.30.1/gitleaks.exe',['dir',root,'--config','.gitleaks.toml','--redact=100','--no-banner','--no-color','--gitleaks-ignore-path','.tmp/magnet-release-r1/distribution.ignore','--ignore-gitleaks-allow','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true});
assert.ok([0,1].includes(r.status),'Scanner unavailable/error');const findings=JSON.parse(r.stdout).map(f=>({file:f.File,type:f.RuleID,action:'HUMAN DISPOSITION REQUIRED'}));assert.equal(findings.length,0,'Distribution scan blocks release');
const git=(...a)=>execFileSync('git',a,{encoding:'utf8',windowsHide:true}).trim(),tls='.tmp/physical-mobile-r2/tls/server.key';
const tlsChecks={ignored:!!git('check-ignore',tls),absentIndex:!git('ls-files','--',tls),absentHistory:!git('log','--all','--format=%H','--',tls)};assert.ok(Object.values(tlsChecks).every(Boolean));
const before=JSON.parse(await fs.readFile('.tmp/magnet-release-r1/before.json')),allowed=['docs/games/PRODUCTION_CURRENT.md','.gitattributes','src/data/games.ts','src/rc/site.json','tests/unit/rc-readiness.test.ts','tsconfig.json','game004-public/adapter.ts','scripts/magnet-public-preserve.mjs'];let preserved=0;
for(const f of before.records){if(allowed.includes(f.file))continue;assert.equal(hash(await fs.readFile(f.file)),f.sha256,'Existing evidence/source changed: '+f.file);preserved++;}
const m=JSON.parse(await fs.readFile(qa+'/distribution.json'));for(const f of m.files)assert.equal(hash(await fs.readFile(m.root+'/'+f.file)),f.sha256);
const result={at:new Date().toISOString(),rawFullProject:raw,newCandidates:0,distribution:{status:'PASS',root,files:m.files.length,findings},tlsChecks,preservedPriorFiles:preserved,allowedModifiedPriorFiles:allowed,scannerExceptionsAdded:0};
await fs.writeFile(qa+'/security.json',JSON.stringify(result,null,2)+'\n');console.log({distribution:'PASS',raw:'FAIL (2 approved existing)',newCandidates:0,preserved});
