import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
const out='rimbloom-portal-integration-r1/release', old='tinlumo-production-remaster-r1';
const read=p=>JSON.parse(fs.readFileSync(p)), hash=b=>createHash('sha256').update(b).digest('hex');
const git=(...a)=>execFileSync('git',a,{windowsHide:true,maxBuffer:64e6,stdio:['pipe','pipe','pipe']});
const gt=(...a)=>git(...a).toString().trim();
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{assert(!e.isSymbolicLink());return e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name];});
const scope=read(out+'/release-scope.json'), dist=read(out+'/distribution.json');
const manifestHash=hash(fs.readFileSync(out+'/release-scope.json'));
const entries=[...scope.files,{file:out+'/release-scope.json',sha256:manifestHash}];
const phase=process.argv[2]||'prestage';
let step='entry';
try {
 assert.equal(fs.realpathSync('.').replaceAll('\\','/').toLowerCase(),'c:/projects/web game studio');
 assert.equal(gt('branch','--show-current'),'main');
 assert(entries.length>123);assert.equal(new Set(entries.map(x=>x.file)).size,entries.length);
 for(const f of entries)assert.equal(hash(fs.readFileSync(f.file)),f.sha256);
 assert.deepEqual(walk(dist.root).map(p=>p.slice(dist.root.length+1)).sort(),dist.files.map(f=>f.file).sort());
 for(const f of dist.files)assert.equal(hash(fs.readFileSync(dist.root+'/'+f.file)),f.sha256);
 for(const f of read(out+'/preservation-before.json').unrelatedTracked)assert.equal(hash(fs.readFileSync(f.file)),f.sha256);
 const unrelated='docs/qa/game005-release-r1/distribution-security.json';
 const preservation=out+'/unrelated-before.json';
 if(!fs.existsSync(preservation))fs.writeFileSync(preservation,JSON.stringify({file:unrelated,sha256:hash(fs.readFileSync(unrelated))}));
 assert.equal(hash(fs.readFileSync(unrelated)),read(preservation).sha256);
 const scanner=path.resolve('.cache/tools/gitleaks/8.30.1/gitleaks.exe');
 fs.writeFileSync(out+'/scan.ignore','');
 const scan=(p,redacted=true)=>{const r=spawnSync(scanner,['dir',p,'--config','.gitleaks.toml',...(redacted?['--redact=100']:[]),'--no-banner','--no-color','--gitleaks-ignore-path',out+'/scan.ignore','--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,maxBuffer:64e6});assert([0,1].includes(r.status));return JSON.parse(r.stdout);};
 step='known-identities';
 const approval=read(old+'/security-new5/human-approval.json'),target=approval.file;
 const before=read(old+'/internal/before.json').hashes.find(x=>x.path===target);assert(before);
 assert.equal(hash(fs.readFileSync(target)),before.sha256);
 assert.equal(approval.candidates.length,5);assert.equal(approval.candidates[4].falsePositive,false);assert.equal(approval.candidates[4].plaintext,'UNKNOWN');
 const five=scan(target,false);assert.equal(five.length,5);assert(five.every(x=>x.RuleID==='generic-api-key'));
 const known=[['.tmp/physical-mobile-r2/tls/server.key','private-key']];
 for(const file of ['.tmp/r3-before/manifest.json','.tmp/consent-r1/before.json','.tmp/provider-human-update/before.json']){
  const ledger=read(file), values=ledger.hashes||ledger;
  const sources=file.includes('/r3-before/')?['docs/security/SECRETS_REGISTER.md']:['docs/qa/public-deploy-go-r1/access-postflight.json','docs/security/SECRETS_REGISTER.md'];
  const rows=scan(file,false);assert.equal(rows.length,sources.length);
  for(const f of rows){assert.equal(f.RuleID,'generic-api-key');assert.equal(sources.filter(k=>values[k]===f.Secret&&hash(fs.readFileSync(k))===f.Secret).length,1);known.push([file,f.RuleID]);}
 }
 const prior=read('game005-island/hillside-r1/.cache/resume-before.json');
 for(const p of prior.approvedCurrentProfileFiles){assert.equal(hash(fs.readFileSync(p.file)),p.sha256);const rows=scan(p.file);assert.equal(rows.length,p.findings);for(const f of rows){assert.equal(f.RuleID,'generic-api-key');known.push([p.file,f.RuleID]);}}
 assert.equal(known.length,17);
 const all=read('.tmp/security-r1/all.summary.json');assert.equal(all.status,'FAIL');assert.equal(all.findings.length,24);
 const remaining=all.findings.map(f=>({file:f.file.replaceAll('\\','/'),type:f.type}));
 for(const [file,type] of [...known,...five.map(()=>[target,'generic-api-key'])]){const i=remaining.findIndex(f=>f.file===file&&f.type===type);assert(i>=0);remaining.splice(i,1);}assert.equal(remaining.length,2);
 step='human-disposed-local-runtime-secrets';
 const disposition=read('tinlumo-adsense-legal-final-r1/release/ephemeral-disposition.json');assert.equal(disposition.status,'SECURITY_DISPOSITION_CLEAR_FOR_RELEASE');assert.equal(disposition.findings.length,2);
 const stop=read('tinlumo-adsense-legal-final-r1/release/preview-stop-recheck.json');assert.equal(stop.status,'PASS');assert.equal(stop.remainingApprovedProcesses,0);assert.equal(stop.remainingApprovedListeners,0);
 assert.equal(disposition.newAccountProviderSecretCount,0);assert.equal(disposition.historicalProfileClassification,'EXISTING_HISTORICAL_FINDING_UNCHANGED');
 for(const f of disposition.findings){assert.equal(f.classification,'CONFIRMED_EPHEMERAL_LOCAL_SECRET_INVALIDATED');assert.equal(hash(fs.readFileSync(f.file)),f.logSha256);assert.equal(f.detector,'generic-api-key');const rows=scan(f.file);assert.equal(rows.length,1);assert.equal(rows[0].RuleID,f.detector);assert.equal(rows[0].StartLine,70);const i=remaining.findIndex(x=>x.file===f.file&&x.type===f.detector);assert(i>=0);remaining.splice(i,1);}
 assert.equal(remaining.length,0);
 step='scoped-scan';
 const scoped=[];
 for(const p of [dist.root,...entries.filter(f=>!f.file.startsWith(dist.root+'/')).map(f=>f.file)])for(const row of scan(p))scoped.push({file:row.File,type:row.RuleID,action:'STOP RELEASE / HUMAN REVIEW REQUIRED'});
 assert.equal(scoped.length,0);
 step='private-paths-and-whole-blobs';
 const privatePaths=['.tmp/physical-mobile-r2/tls/server.key',...prior.approvedCurrentProfileFiles.map(p=>p.file),target];
 const objects=gt('rev-list','--objects','--all','--reflog'),index=gt('ls-files','--stage','-z');
 const privateBytes=privatePaths.map(p=>fs.readFileSync(p));
 const absence=[];
 for(let i=0;i<privatePaths.length;i++){
  const pathInIndex=gt('ls-files','--',privatePaths[i])!=='';const pathInHistory=gt('log','--all','--reflog','--format=%H','--',privatePaths[i])!=='';
  const bytes=privateBytes[i], blob=createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex');
  const blobInHistory=objects.split('\n').some(x=>x.split(' ')[0]===blob),blobInIndex=index.split('\0').some(x=>x.split(' ')[1]===blob);
  absence.push({file:privatePaths[i],type:'PRIVATE_PATH_AND_BLOB_CHECK',action:pathInIndex||pathInHistory||blobInHistory||blobInIndex?'STOP / HUMAN REVIEW REQUIRED':'ABSENT FROM INDEX / HISTORY',pathInIndex,pathInHistory,blobInHistory,blobInIndex});
 }
 fs.writeFileSync(out+'/private-absence.json',JSON.stringify(absence,null,2)+'\n');assert(absence.every(x=>!x.pathInIndex&&!x.pathInHistory&&!x.blobInHistory&&!x.blobInIndex));
 step='private-copies-in-distribution';
 for(const file of walk(dist.root)){const bytes=fs.readFileSync(file);assert(privateBytes.every(p=>!bytes.equals(p)&&!bytes.includes(p)));for(const f of five){const variants=[Buffer.from(f.Secret),Buffer.from(f.Secret,'base64')];if(/^[a-fA-F0-9]+$/.test(f.Secret))variants.push(Buffer.from(f.Secret,'hex'));assert(variants.every(v=>v.length<16||!bytes.includes(v)));}}
 step='index-scope';
 const staged=gt('diff','--cached','--name-only','-z').split('\0').filter(Boolean).sort();
 if(phase==='diagnostic'){assert.equal(staged.length,0);const report={at:new Date().toISOString(),status:'STOP_NEW_SECURITY_CANDIDATES',rawFullProject:'FAIL',rawFindings:24,exactKnownIdentitiesVerified:22,newCandidates:remaining.map(f=>({...f,action:'HUMAN DISPOSITION REQUIRED; NO STAGE / COMMIT / PUSH / DEPLOY'})),scopedFindings:scoped,privatePathsAndWholeBlobsAbsentFromIndexRefsReflog:true,privateCopiesInDistribution:0,indexEmpty:true};fs.writeFileSync(out+'/security-stop.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));process.exit(0);}
 if(phase==='prestage'){assert.equal(staged.length,0);fs.writeFileSync(out+'/stage-paths.nul',entries.map(f=>f.file).join('\0')+'\0');}
 else {assert.deepEqual(staged,entries.map(f=>f.file).sort());for(const f of entries)assert.equal(hash(git('show',':'+f.file)),f.sha256);}
 const report={at:new Date().toISOString(),phase,status:'PASS',manifestHash,approvedFiles:entries.length,distributionFiles:123,rawFullProject:{status:'FAIL',findings:24,known17:17,samePreviouslyDisposedFive:5,humanDisposedInvalidatedLocalRuntimeSecrets:2,additionalNewCandidates:0,receiptModifiedAt:fs.statSync('.tmp/security-r1/all.summary.json').mtime.toISOString()},scopedFindings:scoped,exactKnownIdentities:true,privatePathsAndWholeBlobsAbsentFromIndexRefsReflog:true,privateCopiesInDistribution:0,unrelatedWorkPreserved:true,indexScopeExact:phase!=='prestage',head:gt('rev-parse','HEAD'),historical:'Raw FAIL24 retained. Two exact local-only inactive findings have explicit Human disposition; no scanner or hook exception added. TRR1-NEW-05 plaintext/recoverability UNKNOWN.'};
 const serialized=JSON.stringify(report,null,2)+'\n';for(const f of five)assert(!serialized.includes(f.Secret));assert(!serialized.includes(before.sha256));
 fs.writeFileSync(out+'/check-'+phase+'.json',serialized);console.log(JSON.stringify({status:report.status,phase,approvedFiles:report.approvedFiles,distributionFiles:123,rawFullProject:report.rawFullProject,scopedFindings:0,indexScopeExact:report.indexScopeExact}));
}catch {fs.writeFileSync(out+'/check-'+phase+'.json',JSON.stringify({at:new Date().toISOString(),status:'STOP',phase,step,error:'REDACTED_VERIFICATION_FAILURE'}));console.error('STOP: '+step);process.exitCode=1;}
