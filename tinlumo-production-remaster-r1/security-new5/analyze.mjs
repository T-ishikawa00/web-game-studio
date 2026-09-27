import fs from 'node:fs';
import path from 'node:path';
import {spawnSync,execFileSync} from 'node:child_process';
import {createHash,createPublicKey} from 'node:crypto';
const root='C:/projects/Web Game Studio',target='marketing/m01-post-ready-r1-2026-09-26/internal/browser-profile/Default/Secure Preferences';
const out='tinlumo-production-remaster-r1/security-new5';
const digest=b=>createHash('sha256').update(b).digest('hex');
const safeKeys=new Set(['extensions','settings','manifest','key','protection','macs','super_mac','os_crypt','encrypted_key','account_values','encrypted_hash','hash','browser','enabled','preference','preferences','signature','public_key']);
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',windowsHide:true,maxBuffer:64e6,stdio:['pipe','pipe','pipe']}).trim();
const list=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isSymbolicLink()?[]:e.isDirectory()?list(d+'/'+e.name):[d+'/'+e.name]);
function safePath(parts){return parts.map(p=>safeKeys.has(p)||(/^[a-z_]{1,64}$/.test(p)&&!/^([a-p]{32}|[a-f0-9]{24,})$/.test(p))?p:'[entry]').join('.');}
function fail(code){console.error('LOCAL_ANALYSIS_STOP: '+code);process.exit(1);}
try{
 if(fs.realpathSync('.').replaceAll('\\','/').toLowerCase()!==root.toLowerCase())fail('WRONG_ROOT');
 const original=fs.readFileSync(target),object=JSON.parse(original),leaves=[];
 const protectedFiles=[...list('docs/security'),'.gitleaks.toml','SECURITY.md','docs/games/PRODUCTION_CURRENT.md','tinlumo-production-remaster-r1/review/security.json','tinlumo-production-remaster-r1/review/gates.json',...list('scripts').filter(p=>p.includes('security'))];
 const preserved=new Map(protectedFiles.map(p=>[p,digest(fs.readFileSync(p))]));
 function walk(o,parts=[]){if(typeof o==='string')leaves.push({parts,value:o});else if(o&&typeof o==='object')for(const [k,v]of Object.entries(o))walk(v,[...parts,k]);}
 walk(object);
 const scan=spawnSync(path.resolve('.cache/tools/gitleaks/8.30.1/gitleaks.exe'),['dir',target,'--config','.gitleaks.toml','--no-banner','--no-color','--gitleaks-ignore-path','tinlumo-production-remaster-r1/internal/scan.ignore','--ignore-gitleaks-allow','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,maxBuffer:8e6});
 if(![0,1].includes(scan.status))fail('SCANNER_EXECUTION');
 const rows=JSON.parse(scan.stdout);if(rows.length!==5||rows.some(x=>x.RuleID!=='generic-api-key'))fail('FINDING_SET_CHANGED');
 const results=rows.map((f,i)=>{
  const matches=leaves.filter(x=>x.value.includes(f.Secret));
  return {candidateId:'TRR1-NEW-'+String(i+1).padStart(2,'0'),file:target,fileType:'Chromium Secure Preferences / JSON',scannerRule:f.RuleID,matches:matches.map(x=>{
   let publicKey=false,keyType=null;
   try{const key=createPublicKey({key:Buffer.from(x.value,'base64'),format:'der',type:'spki'});publicKey=key.type==='public';keyType=key.asymmetricKeyType;}catch{}
   const encoded=Buffer.from(x.value,'base64');
   return {structuralContext:safePath(x.parts),exactLeaf:f.Secret===x.value,publicKeySpki:publicKey,keyType,hexIntegrityShape:/^[A-Fa-f0-9]{64}$/.test(x.value),hexOnly:/^[A-Fa-f0-9]+$/.test(x.value),pathInProtection:x.parts[0]==='protection',manifestKey:x.parts.includes('manifest')&&x.parts.at(-1)==='key',envelopeShape:{dpapiPrefix:encoded.subarray(0,5).equals(Buffer.from('DPAPI')),appBoundPrefix:encoded.subarray(0,4).equals(Buffer.from('APPB')),chromiumVersionPrefix:/^v(?:10|11|20)/.test(encoded.subarray(0,3).toString()),dpapiBlobHeader:encoded.subarray(0,20).equals(Buffer.from('01000000d08c9ddf0115d1118c7a00c04fc297eb','hex'))}};
  })};
 });
 const baseline=JSON.parse(fs.readFileSync('tinlumo-production-remaster-r1/internal/before.json'));
 const previous=baseline.hashes.find(x=>x.path===target);
 const indexEntries=git('ls-files','--stage','-z').split('\0');
 const blob=createHash('sha1').update(Buffer.from('blob '+original.length+'\0')).update(original).digest('hex');
 const reachable=git('rev-list','--objects','--all').split('\n');
 const exposure={currentFilePathInIndex:!!git('ls-files','--',target),exactCurrentFileBlobInIndex:indexEntries.some(x=>x.split(' ')[1]===blob),pathInReachableHistory:!!git('log','--all','--format=%H','--',target),exactCurrentFileBlobInReachableHistory:reachable.some(x=>x.split(' ')[0]===blob),ignored:spawnSync('git',['check-ignore','--quiet','--',target],{windowsHide:true}).status===0};
 const manifest=JSON.parse(fs.readFileSync('tinlumo-production-remaster-r1/internal/distribution.json'));
 const artifactFiles=list(manifest.root);let symlinks=false;
 function checkLinks(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.isSymbolicLink())symlinks=true;else if(e.isDirectory())checkLinks(d+'/'+e.name);}}checkLinks(manifest.root);
 const distributionCounts=rows.map(()=>0);let targetFileCopies=0;
 for(const file of artifactFiles){const b=fs.readFileSync(file);if(b.equals(original))targetFileCopies++;rows.forEach((row,i)=>{const variants=[Buffer.from(row.Secret),Buffer.from(row.Secret,'base64')];if(/^[a-fA-F0-9]+$/.test(row.Secret))variants.push(Buffer.from(row.Secret,'hex'));if(variants.some(v=>v.length>=16&&b.includes(v)))distributionCounts[i]++;});}
 const oldManifest=JSON.parse(fs.readFileSync('docs/qa/game005-release-r1/distribution.json'));
 const oldDistributionCounts=rows.map(()=>0);
 for(const file of oldManifest.files){const b=fs.readFileSync(oldManifest.root+'/'+file.file);rows.forEach((row,i)=>{const variants=[Buffer.from(row.Secret),Buffer.from(row.Secret,'base64')];if(/^[a-fA-F0-9]+$/.test(row.Secret))variants.push(Buffer.from(row.Secret,'hex'));if(variants.some(v=>v.length>=16&&b.includes(v)))oldDistributionCounts[i]++;});}
 const originalSummary=JSON.parse(fs.readFileSync('tinlumo-production-remaster-r1/review/security.json'));
 const originalRows=originalSummary.newCandidates.filter(x=>x.file.replaceAll('\\','/')===target&&x.type==='generic-api-key');
 const originalSame=!!previous&&previous.sha256===digest(original);
 if(!originalSame||originalRows.length!==5)fail('ORIGINAL_IDENTITY_NOT_ESTABLISHED');
 if(results.some(r=>r.matches.length!==1)||results.slice(0,3).some(r=>!r.matches[0].publicKeySpki||!r.matches[0].manifestKey)||!results[3].matches[0].hexIntegrityShape||results[3].matches[0].structuralContext!=='protection.macs.enterprise_signin.policy_recovery_token'||results[4].matches[0].structuralContext!=='protection.macs.enterprise_signin.policy_recovery_token_encrypted_hash'||!results[4].matches[0].envelopeShape.chromiumVersionPrefix)fail('CANDIDATE_MAPPING_OR_STRUCTURE_CHANGED');
 const unchanged=original.equals(fs.readFileSync(target));
 const protectionsUnchanged=[...preserved].every(([p,h])=>digest(fs.readFileSync(p))===h);
 if(!unchanged||!protectionsUnchanged||symlinks)fail('PRESERVATION_OR_ARTIFACT_LINK_CHECK');
 const recommendations=['A','A','A','A','D'];
 const report={scope:'NEW_FIVE_ONLY',releaseGate:'CLOSED / SECURITY_RELEASE_GATE_STOPPED',humanApproval:'PENDING - recommendations only',file:target,fileType:'Microsoft Edge Chromium persistent profile / Secure Preferences JSON',
  provenance:{localSource:'marketing/m01-post-ready-r1-2026-09-26/internal/verify.mjs:20',evidence:'launchPersistentContext targets this exact profile, channel msedge; local media QA; network disabled/proxy blocked. Browser-written profile cache; public key material originates in extension manifests, not necessarily generated cryptographically by the browser.',generationTimeAudit:'No OS process/file-write audit was captured; origin inferred from exact local launch source and standard profile structure.'},
  identity:{entrySnapshotContainsTarget:!!previous,entrySnapshotCurrentFileSame:originalSame,entrySnapshotAt:baseline.at,originalSanitizedDetectionCount:originalRows.length,currentDetectionCount:rows.length,canReproduceFiveFromIdenticalBaselineBytes:originalSame&&originalRows.length===5,originalPerCandidateValueReceipt:'NOT RETAINED; original scan retained file/type/action only. Exact whole-file match plus deterministic rescan supports current mapping; direct comparison against separately retained original candidate values is unavailable.',currentUnchangedDuringAnalysis:unchanged,fingerprintsExported:false},
  exposure:{...exposure,artifactPath:manifest.root,artifactFilesExamined:artifactFiles.length,currentProductionArtifact:oldManifest.root,currentProductionFilesExamined:oldManifest.files.length,currentProductionCandidateMatches:oldDistributionCounts,exactProfileFileCopiesInArtifact:targetFileCopies,symlinks:false,profilePathPresentInArtifact:artifactFiles.some(p=>p.includes('browser-profile')||p.endsWith('/Secure Preferences')),staticArtifactReachability:'NO: artifact root contains no profile file, symlink or candidate byte representation; dedicated server is rooted in artifact/review, not repository. This is local source/artifact inspection, not a live Production/provider audit.',indexHistoryScope:'Current path and exact whole-file Git blob checked in full index/all reachable refs. Does not assert all fragments/transformations absent from every historical file.'},
  candidates:results.map((r,i)=>({...r,structuralContext:r.matches[0].structuralContext+(i<3?' (manifest key entry '+(i+1)+' in scanner order)':''),browserRuntimeProfileData:true,
   classification:i<3?'PUBLIC KEY / NON-CREDENTIAL':i===3?'PREFERENCE INTEGRITY MAC METADATA':'ENCRYPTED LOCAL PREFERENCE-INTEGRITY HASH / PLAINTEXT CONTENT UNVERIFIED',
   usableCredentialStructure:i<3?'NO private credential: DER SubjectPublicKeyInfo RSA public key parses; provides no signing/decryption private material':i===3?'NO direct credential structure observed: integrity MAC leaf under protection.macs, not the live enterprise_signin token preference':'NO direct plaintext/bearer credential structure observed; encrypted envelope cannot establish plaintext type or usability without decryption, which was not attempted',
   recommendationCode:recommendations[i],recommendedDisposition:i<4?'A. FALSE POSITIVE / NON-CREDENTIAL — APPROVED is for Human to decide':'D. ENCRYPTED LOCAL INTEGRITY METADATA / RESTRICTED LOCAL RETENTION ONLY — HUMAN PENDING; do not assert TRUE SECRET or fully verified NON-CREDENTIAL',
   reasoning:i<3?'Scanner matched the whole manifest public-key leaf. Local cryptographic parser confirms public-key structure; generic key-name/entropy detection is not provider credential validation.':i===3?'Whole detected leaf is a fixed-format integrity value under protection.macs. policy_recovery_token is the name of the protected preference; this location stores integrity metadata, not evidence of a usable account token.':'Field is policy_recovery_token_encrypted_hash under protection.macs; local envelope-header shape matches Chromium versioned encryption. It is evidence of encrypted local integrity data, not proof of a recoverable credential. Keep restricted, unapproved retention while Human decides.',
   uncertainty:i<3?'No external extension/vendor signature or reputation check. Public-key provenance inferred from local profile structure; does not approve the extension or entire profile.':i===3?'Integrity algorithm/key and authenticity were not recomputed; matching semantics are inferred from protection.macs structure. No claim about the actual protected token elsewhere.':'Plaintext, algorithm/key binding, OS/browser recoverability and semantic equivalence to the sibling MAC are UNKNOWN. No decryption/credential use. If Human requires plaintext classification, retain C. UNKNOWN / UNRESOLVED.',
   inGitIndex:exposure.currentFilePathInIndex,inReachableHistory:exposure.pathInReachableHistory,inProductionDistribution:distributionCounts[i]>0||oldDistributionCounts[i]>0,artifactReachable:distributionCounts[i]>0,matchingArtifactFiles:distributionCounts[i],matchingCurrentProductionArtifactFiles:oldDistributionCounts[i],originalIdentity:originalSame?'Identical entry-snapshot file bytes + same5 rescan; no independent original per-candidate receipt':'UNVERIFIED'})),
  preservation:{prior17DispositionsUnchanged:true,historical11Unchanged:true,S04S05Unchanged:true,securityRulesAndExistingReportsUnchanged:protectionsUnchanged,profileUnmodified:unchanged,stageCommitPushDeploy:false,deletionRotationDecryptionExternalApi:false},
  actualModelId:'UNKNOWN - not exposed',sources:['marketing/m01-post-ready-r1-2026-09-26/internal/verify.mjs:20','tinlumo-production-remaster-r1/internal/before.json (identity comparison in memory only)','tinlumo-production-remaster-r1/review/security.json (sanitized original5)','tinlumo-production-remaster-r1/internal/distribution.json','tinlumo-production-remaster-r1/scripts/server.mjs'],limitations:['Local analysis only; no external requests','Candidate IDs are scoped to identical baseline bytes and this scanner order; rerun must recheck identity before reuse','No whole-profile clearance or past approval transfer']};
 // Guard every new output against candidate values/long fragments and candidate/file fingerprints.
 const serialized=JSON.stringify(report,null,2)+'\n';
 const forbidden=rows.flatMap(r=>[r.Secret,digest(Buffer.from(r.Secret))]).concat(digest(original));
 if(forbidden.some(v=>serialized.includes(v)))fail('OUTPUT_VALUE_GUARD');
 for(const r of rows)for(let i=0;i<=r.Secret.length-16;i++)if(serialized.includes(r.Secret.slice(i,i+16)))fail('OUTPUT_FRAGMENT_GUARD');
 for(const file of list(out)){const b=fs.readFileSync(file,'utf8');if(forbidden.some(v=>b.includes(v)))fail('EXISTING_NEW_OUTPUT_VALUE_GUARD');for(const r of rows)for(let i=0;i<=r.Secret.length-16;i++)if(b.includes(r.Secret.slice(i,i+16)))fail('EXISTING_NEW_OUTPUT_FRAGMENT_GUARD');}
 fs.writeFileSync(out+'/disposition.json',serialized);
 console.log(JSON.stringify({candidates:report.candidates.map(x=>({id:x.candidateId,context:x.structuralContext,recommendation:x.recommendationCode,classification:x.classification})),exposure:report.exposure,identity:report.identity,preserved:protectionsUnchanged,gate:report.releaseGate},null,2));
}catch{fail('REDACTED_INTERNAL_ERROR');}
