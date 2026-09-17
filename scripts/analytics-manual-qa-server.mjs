// Explicit local QA only: never included in either distribution allowlist.
// The consent controller is unchanged. An adapter supplies its production location
// guard; the real provider still sees the actual localhost document/origin.
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const config=JSON.parse(await readFile('config/release-production/measurement.json'));
assert.equal(config.enabled,true);assert.equal(config.automaticInsertionConfirmedDisabled,true);
assert.match(config.publicBeaconId,/^[a-f0-9]{32}$/i);
const source=await readFile('src/rc/analytics-consent.js','utf8');
const auto="if (typeof window !== 'undefined' && typeof document !== 'undefined') installAnalyticsConsent(window, document);";
assert.ok(source.trimEnd().endsWith(auto));
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>Tinlumo local analytics QA</title>
<style>body{font:18px system-ui;max-width:55rem;margin:2rem auto;padding:1rem}button{font:inherit;padding:1rem;margin:.4rem}pre{white-space:pre-wrap}</style>
<h1>Local manual analytics QA</h1><p>Isolated local fixture. Real Cloudflare script and transport; production location guard supplied by a test adapter. This is not production-host verification.</p>
<section data-analytics-consent data-enabled="true" data-beacon-id="${config.publicBeaconId}" data-initial-text="Analytics OFF" data-allowed-text="Analytics allowed" data-denied-text="Analytics rejected">
<p data-analytics-status></p><div data-analytics-choices><button data-analytics-choice="allow">Allow analytics</button><button data-analytics-choice="deny">Continue without analytics</button></div></section>
<button data-open-analytics>Change analytics choice</button><button id="reset">Reset this fixture's consent</button><button id="refresh">Refresh counters</button><pre id="counters"></pre>
<script type="module">
import {installAnalyticsConsent,analyticsConsentKey} from '/controller.js';
const report={scriptLoads:0,scriptErrors:0,beaconCalls:0,beaconQueued:0,xhrCalls:0,fetchCalls:0,responses:[]};
const isRum=u=>{try{return new URL(u,location.href).pathname==='/cdn-cgi/rum';}catch{return false;}};
const beacon=navigator.sendBeacon.bind(navigator);
navigator.sendBeacon=(url,data)=>{if(isRum(url))report.beaconCalls++;const result=beacon(url,data);if(isRum(url)&&result)report.beaconQueued++;return result;};
const open=XMLHttpRequest.prototype.open,send=XMLHttpRequest.prototype.send;
const requests=new WeakSet();
XMLHttpRequest.prototype.open=function(method,url,...args){if(isRum(url))requests.add(this);return open.call(this,method,url,...args);};
XMLHttpRequest.prototype.send=function(body){if(requests.has(this)){report.xhrCalls++;this.addEventListener('loadend',()=>report.responses.push({transport:'xhr',status:this.status}));}return send.call(this,body);};
const realFetch=window.fetch.bind(window);
window.fetch=async(input,init)=>{const rum=isRum(typeof input==='string'?input:input.url);if(rum)report.fetchCalls++;try{const r=await realFetch(input,init);if(rum)report.responses.push({transport:'fetch',status:r.status});return r;}catch(e){if(rum)report.responses.push({transport:'fetch',status:0});throw e;}};
document.addEventListener('load',e=>{if(e.target?.tagName==='SCRIPT'&&e.target.src.startsWith('https://static.cloudflareinsights.com/'))report.scriptLoads++;},true);
document.addEventListener('error',e=>{if(e.target?.tagName==='SCRIPT'&&e.target.src.startsWith('https://static.cloudflareinsights.com/'))report.scriptErrors++;},true);
function show(){const resources=performance.getEntriesByType('resource').filter(e=>e.name.startsWith('https://static.cloudflareinsights.com/')||isRum(e.name)).map(e=>({kind:isRum(e.name)?'rum':'script',status:e.responseStatus??null,initiator:e.initiatorType}));document.querySelector('#counters').textContent=JSON.stringify({...report,scriptElements:document.querySelectorAll('script[data-cf-beacon]').length,resources},null,2);}
document.querySelector('#reset').onclick=()=>{localStorage.removeItem(analyticsConsentKey);location.replace('/en/analytics-qa/');};
document.querySelector('#refresh').onclick=show;
const adapter={location:{hostname:'tinlumo.com',protocol:'https:',pathname:'/en/analytics-qa/',hash:location.hash,href:'https://tinlumo.com/en/analytics-qa/'+location.hash,reload:()=>location.reload(),replace:url=>location.replace('/en/analytics-qa/'+new URL(url).hash)},history:{replaceState:(_s,_t,url)=>history.replaceState(null,'','/en/analytics-qa/'+new URL(url).hash)},localStorage:window.localStorage,addEventListener:window.addEventListener.bind(window)};
adapter.top=adapter;installAnalyticsConsent(adapter,document);show();setInterval(show,250);
</script></html>`;
http.createServer((req,res)=>{
 const headers={'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'};
 if(!['127.0.0.1:4353','localhost:4353'].includes(req.headers.host)){res.writeHead(403,headers);res.end();return;}
 if(req.method!=='GET'){res.writeHead(405,headers);res.end();return;}
 if(req.url==='/controller.js'){res.writeHead(200,{...headers,'Content-Type':'text/javascript; charset=utf-8'});res.end(source.slice(0,source.lastIndexOf(auto)));}
 else if(req.url==='/en/analytics-qa/'){res.writeHead(200,{...headers,'Content-Type':'text/html; charset=utf-8'});res.end(html);}
 else{res.writeHead(404,headers);res.end('Not found');}
}).listen(4353,'127.0.0.1',()=>console.log('Isolated manual analytics QA: http://127.0.0.1:4353/en/analytics-qa/ ; no payload/request logs'));
