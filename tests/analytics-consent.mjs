import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {analyticsConsentKey,installAnalyticsConsent} from '../src/rc/analytics-consent.js';
import {publicPrerequisites} from '../scripts/public-release-readiness.mjs';
import {publicHtml} from '../scripts/release-prepare.mjs';

function fixture({host='tinlumo.com',protocol='https:',path='/en/',saved=null,enabled=true,frame=false,blockedStorage=false,existing=false,failWrites=false,hash=''}={}){
 const events={},appended=[],store=new Map(saved?[[analyticsConsentKey,saved]]:[]);let reloads=0;
 const button=v=>({dataset:{analyticsChoice:v},focused:false,addEventListener(_,fn){this.click=fn;},focus(){this.focused=true;}});
 const allow=button('allow'),deny=button('deny'),open=button(null),close=button(null),status={textContent:''},controls={hidden:false};
 const panel={hidden:true,dataset:{enabled:String(enabled),beaconId:'0'.repeat(32),allowedText:'allowed',deniedText:'denied',initialText:'off'},querySelector:q=>q==='[data-analytics-status]'?status:q==='[data-close-analytics]'?close:controls,querySelectorAll:()=>[allow,deny],scrollIntoView(){}};
 const doc={querySelector:q=>q==='[data-analytics-consent]'?panel:existing||appended.length?{}:null,querySelectorAll:()=>[open],createElement:()=>({setAttribute(){}}),head:{append:s=>appended.push(s)}};
 const win={location:{hostname:host,protocol,pathname:path,hash,href:protocol+'//'+host+path+hash,replace(url){this.href=url;this.hash=new URL(url).hash;},reload(){reloads++;}},localStorage:{getItem:k=>{if(blockedStorage)throw Error();return store.get(k);},setItem:(k,v)=>{if(blockedStorage||failWrites)throw Error();store.set(k,v);},removeItem:k=>{if(blockedStorage||failWrites)throw Error();store.delete(k);}},addEventListener:(k,fn)=>events[k]=fn};win.top=frame?{}:win;
 win.history={replaceState(_state,_title,url){win.location.href=url;win.location.hash=new URL(url).hash;}};
 installAnalyticsConsent(win,doc);
 return {allow,deny,open,close,status,controls,panel,appended,events,store,win,get reloads(){return reloads;}};
}
test('Default OFF and rejection load nothing; explicit allow loads once; failure does not touch games',()=>{
 const x=fixture();assert.equal(x.appended.length,0);assert.equal(x.status.textContent,'off');
 x.deny.click();assert.equal(x.appended.length,0);assert.equal(x.store.get(analyticsConsentKey),'deny');
 x.open.click();assert.equal(x.controls.hidden,false);assert.equal(x.allow.focused,true);
 x.allow.click();x.allow.click();assert.equal(x.appended.length,1);assert.doesNotThrow(()=>x.appended[0].onerror());
 assert.equal(x.appended[0].type,'module');assert.equal(x.appended[0].src,'https://static.cloudflareinsights.com/beacon.min.js');
 assert.deepEqual([...x.store.keys()],[analyticsConsentKey]);
});
test('Stored rejection, invalid consent, Preview, game frames and nonproduction hosts cannot start measurement',()=>{
 for(const options of [{saved:'deny'},{saved:'invalid'},{host:'preview.tinlumo.com',saved:'allow'},{host:'127.0.0.1',saved:'allow'},{protocol:'http:',saved:'allow'},{path:'/games/tiny-delivery/rc-r1/',saved:'allow'},{path:'/',saved:'allow'},{frame:true,saved:'allow'},{enabled:false,saved:'allow'},{existing:true,saved:'allow'}])assert.equal(fixture(options).appended.length,0);
 assert.equal(fixture({saved:'allow'}).appended.length,1);
});
test('Withdrawal persists deny and reloads; other-tab withdrawal and restored pages remove the active document',()=>{
 const x=fixture({saved:'allow'});x.open.click();x.deny.click();assert.equal(x.store.get(analyticsConsentKey),'deny');assert.equal(x.reloads,1);
 assert.equal(fixture({saved:x.store.get(analyticsConsentKey)}).appended.length,0);
 const y=fixture({saved:'allow'});y.store.set(analyticsConsentKey,'deny');y.events.storage({key:analyticsConsentKey});assert.equal(y.reloads,1);
 const z=fixture({saved:'allow'});z.store.clear();z.events.pageshow({persisted:true});assert.equal(z.reloads,1);
});
test('Blocked storage keeps defaults off, permits only this-page explicit consent and safely reloads on withdrawal',()=>{
 const x=fixture({blockedStorage:true});assert.equal(x.appended.length,0);x.allow.click();assert.equal(x.appended.length,1);x.deny.click();assert.equal(x.reloads,1);assert.equal(fixture({blockedStorage:true}).appended.length,0);
});
test('Readable old allow plus write failure cannot re-enable analytics after withdrawal',()=>{
 const x=fixture({saved:'allow',failWrites:true});assert.equal(x.appended.length,0);
 x.allow.click();assert.equal(x.appended.length,1);x.deny.click();assert.equal(x.win.location.hash,'#analytics-off');assert.equal(x.reloads,1);
 const reloaded=fixture({saved:'allow',failWrites:true,hash:x.win.location.hash});assert.equal(reloaded.appended.length,0);
 const recovered=fixture({saved:'allow',hash:x.win.location.hash});assert.equal(recovered.appended.length,0);assert.equal(recovered.store.get(analyticsConsentKey),'deny');
 recovered.open.click();recovered.allow.click();assert.equal(recovered.win.location.hash,'');assert.equal(recovered.appended.length,1);
});
test('Production projection configures consent only; there is no eager beacon loader',()=>{
 const html='<html><head><meta name="robots" content="noindex"></head><body><section data-enabled="false" data-beacon-id=""></section></body></html>';
 const output=publicHtml(html,'/en/','https://tinlumo.com','0'.repeat(32));
 assert.ok(output.includes('data-enabled="true"'));assert.ok(!output.includes('beacon.min.js'));assert.ok(!output.includes('<script>'));
 assert.ok(publicHtml(html,'/en/','https://tinlumo.com',null,{indexable:false}).includes('data-enabled="false"'));
 assert.throws(()=>publicHtml(html.replace('data-enabled','other'),'/en/','https://tinlumo.com','0'.repeat(32)));
});
test('Human email closure preserves untested evidence while accepted policy no longer blocks release',async()=>{
 const site=JSON.parse(await readFile('src/rc/site.json')),measurement=JSON.parse(await readFile('config/release-production/measurement.json'));
 assert.equal(site.publicLaunch.mail.gateStatus,'CLOSED');assert.equal(site.publicLaunch.mail.receiveTest,'PASS');assert.equal(site.publicLaunch.mail.replyTest,'NOT TESTED');
 assert.equal(site.publicLaunch.mail.supportAddressOutbound,false);assert.equal(site.approvals.human57Puzzles,false);assert.equal(site.approvals.rcPhysicalDevices,false);
 const codes=publicPrerequisites(site,measurement).map(x=>x.code);
 assert.ok(!codes.some(x=>x.startsWith('mail:')||['legalDraft','legalReview','dataPolicyFinal','namesAndRights'].includes(x)));
 assert.equal(site.publicLaunch.deploymentHold,false);assert.ok(!codes.includes('deployment:humanFinalGate'));assert.ok(!codes.includes('analytics:productionConnectionPending'));
 const disconnected=structuredClone(measurement);disconnected.enabled=false;
 assert.ok(publicPrerequisites(site,disconnected).some(x=>x.code==='analytics:productionConnectionPending'));
 const bad=structuredClone(site);bad.publicLaunch.mail.receiveTest='NOT TESTED';assert.ok(publicPrerequisites(bad,measurement).some(x=>x.code==='mail:receiveTest'));
 assert.equal(measurement.enabled,true);assert.equal(measurement.automaticInsertionConfirmedDisabled,true);
 // Historical source flag is not evidence of current collector reception.
 assert.equal(site.publicLaunch.analyticsActive,false);assert.equal(site.approvals.release,true);
});
test('Current close control and Escape retain OFF without an implicit permission',()=>{
 const x=fixture();x.open.click();x.close.click();assert.equal(x.panel.hidden,true);assert.equal(x.appended.length,0);
 x.open.click();x.events.keydown({key:'Escape',preventDefault(){}});assert.equal(x.panel.hidden,true);assert.equal(x.appended.length,0);
});
