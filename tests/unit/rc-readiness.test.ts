import {test} from 'node:test';
import assert from 'node:assert/strict';
import {releaseBlockers,requiredFields,requiredApprovals,requiredDecisionFields} from '../../src/rc/readiness.mjs';
import currentSite from '../../src/rc/site.json';
test('RC readiness rejects missing fields, false approvals and placeholders',()=>{
 const good:any={...Object.fromEntries(requiredFields.map(k=>[k,'Human-approved value'])),releaseDecisions:Object.fromEntries(requiredDecisionFields.map(k=>[k,'Human-approved decision recorded'])),legalDraft:false,unresolvedRights:[],approvals:Object.fromEntries(requiredApprovals.map(k=>[k,true]))};
 assert.equal(releaseBlockers(good).length,0);
 for(const key of requiredFields)for(const value of [undefined,null,'','  ','TBD','example.com',42])assert.ok(releaseBlockers({...good,[key]:value}).some((b:any)=>b.code===key));
 for(const key of requiredApprovals)assert.ok(releaseBlockers({...good,approvals:{...good.approvals,[key]:undefined}}).some((b:any)=>b.code===key));
 for(const key of requiredDecisionFields)for(const value of [undefined,null,'','TBD',false])assert.ok(releaseBlockers({...good,releaseDecisions:{...good.releaseDecisions,[key]:value}}).some((b:any)=>b.code==='decision:'+key));
 assert.ok(releaseBlockers({...good,unresolvedRights:[{code:'name',reason:'unresolved'}]}).some((b:any)=>b.code==='rights:name'));
});
test('Frozen Soft Launch names and analytics policy do not publish an unacquired domain or contact',()=>{
 const blockers=releaseBlockers(currentSite);
 assert.equal(currentSite.humanReview.rcCandidate.status,'PASS');
 assert.equal(currentSite.nameRiskDisposition.tirmo,'unresolved');
 assert.equal(currentSite.nameRiskDisposition.wipo,'UNKNOWN');
 assert.equal(currentSite.analyticsProvider,'disabled');
 assert.equal(currentSite.softLaunchPolicy.gameCustomEvents,false);
 assert.equal(currentSite.publicContact,null);
 assert.equal(currentSite.domain,null);
 for(const key of ['domain','publicContact','publicOperator','release','legalReview','dataPolicyFinal','deployedUrlSmoke'])assert.ok(blockers.some(b=>b.code===key));
 assert.ok(!blockers.some(b=>['humanRcCandidate','externalFirstUse','targetAge','rights:tinlumoClearance','rights:hakoriloClearance'].includes(b.code)));
});
test('Human candidate PASS and explicit first-use deferral do not imply rights, physical/full-run or live deployment PASS',()=>{
 const site:any={...Object.fromEntries(requiredFields.map(k=>[k,'Human-approved value'])),legalDraft:true,unresolvedRights:[],approvals:{humanRcCandidate:true},humanReview:{rcCandidate:{status:'PASS'},externalFirstUse:{status:'DEFERRED / NOT TESTED',source:'Human decision 2026-09-17'}}};
 const blockers=releaseBlockers(site);
 assert.ok(!blockers.some((b:any)=>['humanRcCandidate','externalFirstUse'].includes(b.code)));
 for(const key of ['namesAndRights','legalReview','dataPolicyFinal','rcPhysicalDevices','human57Puzzles','release','deployedUrlSmoke'])assert.ok(blockers.some((b:any)=>b.code===key));
 assert.equal(blockers.find((b:any)=>b.code==='deployedUrlSmoke')?.phase,'after-authorized-deployment');
 assert.ok(releaseBlockers({...site,humanReview:{}}).some((b:any)=>b.code==='externalFirstUse'));
 assert.equal(site.approvals.externalFirstUse,undefined);
});
