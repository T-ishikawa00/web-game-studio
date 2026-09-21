import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {analyticsConsentKey,installAnalyticsConsent} from '../src/rc/analytics-consent.js';



function fixture({host='tinlumo.com',protocol='https:',path='/en/',saved=null,enabled=true,frame=false,blockedStorage=false,existing=false,failWrites=false,hash=''}={}){
 const events={},appended=[],store=new Map(saved?[[analyticsConsentKey,saved]]:[]);let reloads=0;
 const button=v=>({dataset:{analyticsChoice:v},focused:false,isConnected:true,addEventListener(_,fn){this.click=fn;},focus(){this.focused=true;}});
 const allow=button('allow'),deny=button('deny'),open=button(null),close=button(null),status={textContent:''},controls={hidden:false};
 const panel={hidden:true,dataset:{enabled:String(enabled),beaconId:'0'.repeat(32),allowedText:'allowed',deniedText:'denied',initialText:'off'},querySelector:q=>q==='[data-close-analytics]'?close:q==='[data-analytics-status]'?status:controls,querySelectorAll:()=>[allow,deny],scrollIntoView(){}};
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

test('First visit never prompts; explicit settings opens; close/Escape preserve undecided state and focus',()=>{
 const x=fixture();assert.equal(x.panel.hidden,true);assert.equal(x.appended.length,0);assert.equal(x.store.size,0);
 x.open.click();assert.equal(x.panel.hidden,false);assert.equal(x.controls.hidden,false);
 x.close.click();assert.equal(x.panel.hidden,true);assert.equal(x.store.size,0);assert.equal(x.open.focused,true);
 x.open.click();let prevented=false;x.events.keydown({key:'Escape',preventDefault(){prevented=true;}});assert.ok(prevented);assert.equal(x.panel.hidden,true);assert.equal(x.store.size,0);
});
test('Prior choices persist without unsolicited UI; invalid/blocked state remains off',()=>{
 for(const saved of ['allow','deny','invalid',null]){const x=fixture({saved});assert.equal(x.panel.hidden,true);assert.equal(x.appended.length,saved==='allow'?1:0);}
 const x=fixture({blockedStorage:true});assert.equal(x.panel.hidden,true);x.open.click();x.allow.click();assert.equal(x.panel.hidden,true);assert.equal(x.appended.length,1);
});
test('Storage changes do not prompt; unrelated ad consent cannot enable or disable analytics',()=>{
 const x=fixture();x.store.set('tinlumo:ad-pilot:consent:v1','allow');x.events.storage({key:'tinlumo:ad-pilot:consent:v1'});assert.equal(x.appended.length,0);assert.equal(x.panel.hidden,true);
 x.store.set(analyticsConsentKey,'deny');x.events.storage({key:analyticsConsentKey});assert.equal(x.panel.hidden,true);
 const y=fixture({saved:'allow'});y.events.storage({key:'tinlumo:ad-pilot:consent:v1'});assert.equal(y.reloads,0);
});
