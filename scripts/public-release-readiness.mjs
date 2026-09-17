import {releaseBlockers} from '../src/rc/readiness.mjs';
export function publicPrerequisites(site,measurement){
 const accepted=site.humanReview?.protectedPreview?.status==='PASS';
 // The current Human requests launch with accepted games and no full-57 rerating.
 // Keep the unreported coverage fields false; they are evidence, not extra gates.
 const blockers=releaseBlockers(site).filter(b=>b.phase!=='after-authorized-deployment'&&b.code!=='release'&&!(accepted&&['rcPhysicalDevices','human57Puzzles'].includes(b.code)));
 const p=site.publicLaunch;
 if(!accepted)blockers.push({code:'protectedPreviewHuman'});
 if(!p?.conditionalOneCheckpointAndPublicConnection)blockers.push({code:'conditionalAuthorization'});
 for(const field of ['operatorInformation','markets','contactMethod','contactRetention','dataRequests','hostingDisclosure','consentDisclosure','analyticsDisclosure','termsDisclosure','rightsDisclosure']){
  for(const lang of ['ja','en'])if(typeof p?.[field]?.[lang]!=='string'||!p[field][lang].trim()||/未確定|Undecided|UNKNOWN|PENDING|TBD/i.test(p[field][lang]))blockers.push({code:`publicText:${field}:${lang}`});
 }
 if(p?.mail?.destinationHumanConfirmed!==true||p.mail.verifiedDestinationCount!==1||p.mail.routingEnabled!==true)blockers.push({code:'mailReceivingConfiguration'});
 if(p?.mail?.receiveTest!=='PASS')blockers.push({code:'mail:receiveTest'});
 // Explicit Human closure supersedes the former outbound/headers launch gates.
 // Preserve their NOT TESTED evidence; closing a gate never fabricates test results.
 if(p?.mail?.gateStatus!=='CLOSED'||!p.mail.gateAuthority)blockers.push({code:'mail:humanClosure'});
 if(p?.mail?.providerRetentionVerified!==true||!p.mail.providerDisclosure?.ja||!p.mail.providerDisclosure?.en)blockers.push({code:'mail:providerHandlingAndRetention'});
 if(p?.mail?.replyIdentityMode==='dedicated-tinlumo-inbox'&&p.mail.dedicatedInboxReplyHumanApproved!==true)blockers.push({code:'mail:replyIdentityApproval'});
 if(p?.deploymentHold!==false)blockers.push({code:'deployment:humanFinalGate',phase:'before-deployment'});
 // Local connection readiness is separate from actual deployment/traffic state.
 // analyticsActive remains false until an authorized production deployment exists.
 if(!measurement?.enabled||!measurement.activationApproval||measurement.provider!=='Cloudflare Web Analytics')blockers.push({code:'analytics:productionConnectionPending',phase:'before-deployment'});
 if(measurement?.automaticInsertionConfirmedDisabled!==true)blockers.push({code:'analytics:automaticInsertionControl'});
 if(!measurement?.consentMode||measurement.consentImplementationVerified!==true)blockers.push({code:'analytics:consentImplementation'});
 if(measurement?.enabled){
  if(!/^[a-f0-9]{32}$/i.test(measurement.publicBeaconId??''))blockers.push({code:'publicBeaconConfiguration'});
  if(!p?.analyticsDisclosure?.ja||!p?.analyticsDisclosure?.en)blockers.push({code:'analyticsDisclosure'});
 }
 if(measurement?.customEvents!==false||measurement?.persistentUserId!==false||measurement?.fingerprint!==false)blockers.push({code:'measurementScope'});
 return blockers;
}
