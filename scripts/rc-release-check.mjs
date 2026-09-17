import {rcEvidenceDir} from './rc-evidence.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import {releaseBlockers} from '../src/rc/readiness.mjs';
const site=JSON.parse(await readFile('src/rc/site.json'));
if(site.publicLaunch){
 const {publicPrerequisites}=await import('./public-release-readiness.mjs');
 const {mkdir}=await import('node:fs/promises');
 const measurement=JSON.parse(await readFile('config/release-production/measurement.json'));
 const blockers=publicPrerequisites(site,measurement);
 const report={at:new Date().toISOString(),status:blockers.length?'PUBLIC_RELEASE_BLOCKED':'PUBLIC_PREREQUISITES_READY',releaseReady:false,beforeDeploymentReady:blockers.length===0,afterDeployment:'Production smoke NOT TESTED',deployAuthorized:false,humanReview:site.humanReview,evidenceCoverage:site.publicLaunch.evidence,blockers};
 await mkdir('docs/qa/public-release-final-r1',{recursive:true});
 await writeFile('docs/qa/public-release-final-r1/release-check.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({status:report.status,blockers:blockers.map(b=>b.code),afterDeployment:report.afterDeployment}));
 process.exit(blockers.length?1:0);
}
const blockers=releaseBlockers(site);
// Setting flags alone cannot make the still-draft public copy ready.
const pages=await readFile('src/rc/Operations.astro','utf8');
if(/Local draft|unapproved draft|未承認草案/.test(pages))blockers.push({code:'publicCopyDraft',reason:'Rendered operating-page source still contains draft/provisional content'});
const report={at:new Date().toISOString(),releaseReady:blockers.length===0,previewAllowed:true,deployAuthorized:false,humanReview:site.humanReview,softLaunchPolicy:site.softLaunchPolicy,evidenceCoverage:{physicalDevices:site.approvals.rcPhysicalDevices?'recorded separately':'NOT ESTABLISHED by RC candidate PASS',full57Human:site.approvals.human57Puzzles?'recorded separately':'NOT ESTABLISHED by RC candidate PASS'},blockers};await writeFile(`${rcEvidenceDir}/release-readiness.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));process.exitCode=blockers.length?1:0;
