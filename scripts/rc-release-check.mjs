import {rcEvidenceDir} from './rc-evidence.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import {releaseBlockers} from '../src/rc/readiness.mjs';
const site=JSON.parse(await readFile('src/rc/site.json'));
const blockers=releaseBlockers(site);
// Setting flags alone cannot make the still-draft public copy ready.
const pages=await readFile('src/rc/Operations.astro','utf8');
if(/Local draft|unapproved draft|未承認草案/.test(pages))blockers.push({code:'publicCopyDraft',reason:'Rendered operating-page source still contains draft/provisional content'});
const report={at:new Date().toISOString(),releaseReady:blockers.length===0,previewAllowed:true,deployAuthorized:false,humanReview:site.humanReview,softLaunchPolicy:site.softLaunchPolicy,evidenceCoverage:{physicalDevices:site.approvals.rcPhysicalDevices?'recorded separately':'NOT ESTABLISHED by RC candidate PASS',full57Human:site.approvals.human57Puzzles?'recorded separately':'NOT ESTABLISHED by RC candidate PASS'},blockers};await writeFile(`${rcEvidenceDir}/release-readiness.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));process.exitCode=blockers.length?1:0;
