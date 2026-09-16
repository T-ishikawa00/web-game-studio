export const requiredFields=['officialSiteName','domain','publicOperator','publicContact','contactHandling','markets','targetAge','hostingAndLogs','retentionAndConsent'];
export const requiredApprovals=['humanRcCandidate','namesAndRights','legalReview','dataPolicyFinal','rcPhysicalDevices','human57Puzzles','externalFirstUse','release','deployedUrlSmoke'];
export const requiredDecisionFields=['operatorAddressDisclosure','contactReceiptAndReply','contactRetentionAndDeletion','hostingProcessorAndAccessRetention','analyticsAndConsent','budgetAndStopOwner','assetRightsAndVideoPolicy'];
export function releaseBlockers(site){
 const placeholder=/(?:\b(?:TBD|TODO|UNKNOWN|PENDING|example|sample|placeholder|unset)\b|未設定|未確定|仮称)/i;
 const blockers=[];
 for(const field of requiredFields){const value=site?.[field];if(typeof value!=='string'||!value.trim()||placeholder.test(value))blockers.push({code:field,reason:'Required public configuration is missing, invalid or provisional'});}
 for(const field of requiredDecisionFields){const value=site?.releaseDecisions?.[field];if(typeof value!=='string'||!value.trim()||placeholder.test(value))blockers.push({code:'decision:'+field,phase:'before-deployment',reason:'Explicit operating/data/rights decision missing; recommendations do not count as approval'});}
 const reasons={
  humanRcCandidate:'Explicit Human acceptance of the local RC candidate is required',
  namesAndRights:'Final distribution-asset rights approval pending; Human Soft Launch name freeze and residual trademark risks are recorded separately',
  dataPolicyFinal:'Final markets and public data handling decisions pending; general audience, no age gate, account/save and Web Analytics-only policy are fixed',
  rcPhysicalDevices:'Physical-device evidence/coverage decision remains separate from the accepted local RC candidate',
  human57Puzzles:'Full-57 Human evidence/coverage decision remains separate from the accepted local RC candidate',
  externalFirstUse:'External first-use testing has neither acceptance nor an explicit Human deferral',
  release:'Separate authorization for deployment/publication has not been given',
  deployedUrlSmoke:'After separately authorized deployment: actual public URL smoke test NOT TESTED; no deployment authorized by this check',
 };
 for(const key of requiredApprovals){
  const deferred=key==='externalFirstUse'&&site?.humanReview?.externalFirstUse?.status==='DEFERRED / NOT TESTED'&&!!site?.humanReview?.externalFirstUse?.source;
  if(site?.approvals?.[key]!==true&&!deferred)blockers.push({code:key,phase:key==='deployedUrlSmoke'?'after-authorized-deployment':'before-deployment',reason:reasons[key]??'Explicit Human review/decision pending'});
 }
 if(site?.legalDraft!==false)blockers.push({code:'legalDraft',reason:'Operating pages are legal drafts'});
 if(!Array.isArray(site?.unresolvedRights))blockers.push({code:'unresolvedRights',reason:'Rights disposition missing'});
 else for(const issue of site.unresolvedRights)blockers.push({code:'rights:'+issue.code,reason:issue.reason});
 return blockers;
}
