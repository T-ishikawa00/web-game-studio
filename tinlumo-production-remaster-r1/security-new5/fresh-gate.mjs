import fs from 'node:fs';import path from 'node:path';import {spawnSync,execFileSync} from 'node:child_process';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const task='tinlumo-production-remaster-r1',folder=task+'/security-new5',output=task+'/review/security-fresh-gate.json';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),hash=b=>createHash('sha256').update(b).digest('hex');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',windowsHide:true,maxBuffer:64e6,stdio:['pipe','pipe','pipe']}).trim();
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{assert(!e.isSymbolicLink());return e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name];});
const started=new Date().toISOString();let phase='entry';
try{
 assert.equal(fs.realpathSync('.').replaceAll('\\','/').toLowerCase(),'c:/projects/web game studio');
 const approval=read(folder+'/human-approval.json'),target=approval.file,profile=target.slice(0,target.indexOf('/Default/'));
 const artifact=approval.artifact,manifest=read(task+'/internal/distribution.json'),initialGates=read(task+'/review/gates.json');
 const artifactSet=()=>walk(artifact).map(p=>p.slice(artifact.length+1)).sort();
 assert.deepEqual(artifactSet(),manifest.files.map(f=>f.file).sort());
 assert.equal(hash(fs.readFileSync(task+'/internal/distribution.json')),initialGates.artifactManifestSha256);
 for(const f of manifest.files)assert.equal(hash(fs.readFileSync(artifact+'/'+f.file)),f.sha256);
 assert.equal(approval.candidates.length,5);approval.candidates.forEach((c,i)=>{assert.equal(c.id,'TRR1-NEW-0'+(i+1));assert.equal(c.disposition,i===4?'ENCRYPTED LOCAL INTEGRITY METADATA / RESTRICTED LOCAL RETENTION ONLY / HUMAN APPROVED':'FALSE POSITIVE / NON-CREDENTIAL / APPROVED');});
 assert.equal(approval.candidates[4].plaintext,'UNKNOWN');assert.equal(approval.candidates[4].recoverability,'UNKNOWN');assert.equal(approval.candidates[4].falsePositive,false);assert.equal(approval.candidates[4].nonCredential,false);
 const protectedPaths=[...walk('docs/security'),...walk('.githooks'),'.gitleaks.toml','.gitignore','SECURITY.md','scripts/security-scan.mjs','scripts/security-public-exceptions.json',task+'/review/security.json'];
 const preserved=new Map(protectedPaths.map(p=>[p,hash(fs.readFileSync(p))]));const targetBefore=hash(fs.readFileSync(target));
 const initialHead=git('rev-parse','HEAD'),initialIndex=git('ls-files','--stage','-z');assert.equal(git('diff','--cached','--name-only'),'');
 phase='candidate-identity';
 const analysis=spawnSync(process.execPath,[folder+'/analyze.mjs'],{encoding:'utf8',windowsHide:true,maxBuffer:8e6});assert.equal(analysis.status,0);
 const identity=read(folder+'/disposition.json');assert(identity.identity.entrySnapshotCurrentFileSame&&identity.identity.canReproduceFiveFromIdenticalBaselineBytes);assert.equal(identity.candidates.length,5);
 const scans={};
 for(const mode of ['all','staged','history']){phase='scan-'+mode;console.log(JSON.stringify({phase,status:'RUNNING'}));const startMs=Date.now(),at=new Date(startMs).toISOString();const r=spawnSync(process.execPath,['scripts/security-scan.mjs',mode],{encoding:'utf8',windowsHide:true,maxBuffer:64e6});assert([0,1].includes(r.status));const receiptPath='.tmp/security-r1/'+mode+'.summary.json';assert(fs.statSync(receiptPath).mtimeMs>=startMs,'Fresh receipt required');const receipt=read(receiptPath);assert.equal(receipt.mode,mode);assert(['PASS','FAIL'].includes(receipt.status));assert.equal(r.status,receipt.status==='PASS'?0:1);scans[mode]={started:at,completed:new Date().toISOString(),exitCode:r.status,freshReceiptVerified:true,...receipt};console.log(JSON.stringify({phase,status:receipt.status,count:receipt.findings.length}));}
 phase='prior-identity-and-distribution';
 function scan(p,redacted=true){const r=spawnSync(path.resolve('.cache/tools/gitleaks/8.30.1/gitleaks.exe'),['dir',p,'--config','.gitleaks.toml',...(redacted?['--redact=100']:[]),'--no-banner','--no-color','--gitleaks-ignore-path',task+'/internal/scan.ignore','--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,maxBuffer:64e6});assert([0,1].includes(r.status));return JSON.parse(r.stdout);}
 assert.equal(fs.readFileSync(task+'/internal/scan.ignore','utf8'),'');
 const known=[['.tmp/physical-mobile-r2/tls/server.key','private-key']];
 for(const file of ['.tmp/r3-before/manifest.json','.tmp/consent-r1/before.json','.tmp/provider-human-update/before.json']){const ledger=read(file),entries=ledger.hashes||ledger,sources=file.includes('/r3-before/')?['docs/security/SECRETS_REGISTER.md']:['docs/qa/public-deploy-go-r1/access-postflight.json','docs/security/SECRETS_REGISTER.md'];const rows=scan(file,false);assert.equal(rows.length,sources.length);for(const f of rows){assert.equal(f.RuleID,'generic-api-key');assert.equal(sources.filter(k=>entries[k]===f.Secret&&hash(fs.readFileSync(k))===f.Secret).length,1);known.push([file,f.RuleID]);}}
 const prior=read('game005-island/hillside-r1/.cache/resume-before.json');for(const p of prior.approvedCurrentProfileFiles){assert.equal(hash(fs.readFileSync(p.file)),p.sha256);const rows=scan(p.file);assert.equal(rows.length,p.findings);for(const f of rows){assert.equal(f.RuleID,'generic-api-key');known.push([p.file,f.RuleID]);}}
 assert.equal(known.length,17);
 const remainder=scans.all.findings.map(f=>({file:f.file.replaceAll('\\','/'),type:f.type,action:'NEW CANDIDATE: STOP / HUMAN REQUIRED'}));
 for(const [file,type]of known){const n=remainder.findIndex(f=>f.file===file&&f.type===type);assert(n>=0);remainder.splice(n,1);}
 for(let i=0;i<5;i++){const n=remainder.findIndex(f=>f.file===target&&f.type==='generic-api-key');assert(n>=0);remainder.splice(n,1);}
 const distribution=scan(artifact).map(f=>({file:f.File,type:f.RuleID,action:'STOP / HUMAN REQUIRED'}));
 const productionSource=scan('src/production').map(f=>({file:f.File,type:f.RuleID,action:'STOP / HUMAN REQUIRED'}));
 phase='manifest-and-preservation';
 const scope=read(task+'/review/scoped-git-manifest.json');
 const stagePaths=[...scope.files.map(f=>f.file),scope.partialFile.file,scope.manifestSelf.file,...scope.requiredAlreadyTracked,...scope.existingTrackedBuildDependencies].map(p=>p.replaceAll('\\','/'));
 const manifestProfilePaths=stagePaths.filter(p=>p===profile||p.startsWith(profile+'/')||profile.startsWith(p.endsWith('/')?p:p+'/')||/browser.profile|Secure Preferences|Local State|server\.key/i.test(p));
 const profileInIndex=!!git('ls-files','--',profile+'/'),profileInHistory=!!git('log','--all','--format=%H','--',profile+'/'),profileInReflog=!!git('log','--all','--reflog','--format=%H','--',profile+'/');
 const forbiddenDistribution=walk(artifact).filter(p=>/browser.profile|Secure Preferences|Local State|\.key$|\.pem$|\.env|\.dev.vars|\/internal\/|\/review\//i.test(p));
 const privatePaths=['.tmp/physical-mobile-r2/tls/server.key',...prior.approvedCurrentProfileFiles.map(p=>p.file),target];
 const privateAbsence=privatePaths.every(p=>!git('ls-files','--',p)&&!git('log','--all','--reflog','--format=%H','--',p));
 const keep=[...preserved].every(([p,h])=>hash(fs.readFileSync(p))===h)&&hash(fs.readFileSync(target))===targetBefore;
 const unchangedGit=git('rev-parse','HEAD')===initialHead&&git('ls-files','--stage','-z')===initialIndex;
 for(const f of manifest.files)assert.equal(hash(fs.readFileSync(artifact+'/'+f.file)),f.sha256);
 assert.deepEqual(artifactSet(),manifest.files.map(f=>f.file).sort());
 const candidateBytesAbsent=identity.candidates.every(c=>!c.inProductionDistribution&&!c.artifactReachable&&c.matchingArtifactFiles===0&&c.matchingCurrentProductionArtifactFiles===0);
 const exactProfileBlobAbsent=!identity.exposure.exactCurrentFileBlobInIndex&&!identity.exposure.exactCurrentFileBlobInReachableHistory&&identity.exposure.exactProfileFileCopiesInArtifact===0;
 const pass=remainder.length===0&&scans.all.findings.length===22&&scans.staged.status==='PASS'&&scans.history.status==='PASS'&&distribution.length===0&&productionSource.length===0&&manifestProfilePaths.length===0&&!profileInIndex&&!profileInHistory&&!profileInReflog&&forbiddenDistribution.length===0&&privateAbsence&&keep&&unchangedGit&&candidateBytesAbsent&&exactProfileBlobAbsent;
 const report={started,completed:new Date().toISOString(),status:pass?'SECURITY_RELEASE_GATE_RELEASABLE_FOR_THIS_RC':'SECURITY_RELEASE_GATE_STOPPED',scope:approval.scope,approval:'../security-new5/HUMAN_DISPOSITION.md',humanProductionReleaseGate:'PENDING',rawFullProject:{status:scans.all.status,total:scans.all.findings.length,priorKnown:17,humanDisposedCurrentFive:5,additionalNewCandidates:remainder.length},additionalFindings:remainder,scans,
 distribution:{status:distribution.length?'FAIL':'PASS',files:manifest.files.length,findings:distribution},productionSource:{status:productionSource.length?'FAIL':'PASS',findings:productionSource},candidateIdentity:{sameEntrySnapshotFile:identity.identity.entrySnapshotCurrentFileSame,sameFiveReproduced:true,originalPerCandidateReceipt:'Not retained; same-file rescan evidence only'},
 profile:{path:profile,untracked:!profileInIndex,ignored:identity.exposure.ignored,indexAbsent:!profileInIndex,reachableHistoryAbsent:!profileInHistory,reflogHistoryAbsent:!profileInReflog,scopedStageManifestExcluded:manifestProfilePaths.length===0,manifestProfilePaths,distributionAbsent:forbiddenDistribution.length===0&&identity.candidates.every(c=>!c.inProductionDistribution),productionArtifactReachable:false,candidateByteMatches:identity.candidates.map(c=>({id:c.candidateId,rc:c.matchingArtifactFiles,currentProduction:c.matchingCurrentProductionArtifactFiles}))},
 fiveDispositions:approval.candidates,prior17:'UNCHANGED / existing identity verified',historical11:'UNCHANGED historical FAIL11',S04_S05:'UNKNOWN / UNRESOLVED — unchanged; no prior risk acceptance reused',preservation:{securityRulesPriorDispositionsAndTargetUnchanged:keep,headAndFullIndexUnchanged:unchangedGit,artifactUnchanged:true,privatePathsAbsent:privateAbsence},
 limits:['Current RC and current inspected state only; no approval transfer','Raw FAIL22 is preserved, not turned into scanner PASS','05 plaintext/recoverability UNKNOWN; restricted local retention only','Security releasable report does not authorize stage/commit/push/deploy or Product acceptance','Existing historical11/S04/S05 unresolved state is not cleared by this narrow gate'],actualModelId:'UNKNOWN - exact ID not exposed'};
 fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,additionalNewCandidates:remainder.length,index:scans.staged.status,history:scans.history.status,distribution:report.distribution.status,profileExcluded:report.profile.scopedStageManifestExcluded,preserved:keep}));if(!pass)process.exitCode=1;
}catch{fs.writeFileSync(output,JSON.stringify({status:'SECURITY_RELEASE_GATE_STOPPED',failedPhase:phase,error:'REDACTED_VERIFICATION_FAILURE',humanProductionReleaseGate:'PENDING'},null,2)+'\n');console.error('SECURITY_RELEASE_GATE_STOPPED: '+phase);process.exitCode=1;}
