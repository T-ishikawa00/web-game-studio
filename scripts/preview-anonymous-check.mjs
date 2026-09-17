import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { projectPath } from './project-path.mjs';

const phase=process.argv[2];
assert.ok(['protection-check','postflight'].includes(phase));
const manifest=JSON.parse(await readFile(projectPath('docs/qa/production-deploy-r1/distribution-manifest.json')));
const host='https://preview.tinlumo.com';
const paths=[...new Set(['/', '/ja/','/en/','/missing/','/src/rc/site.json','/.tmp/physical-mobile-r2/tls/server.key','/docs/qa/soft-launch-rc-r1/checkpoint-r1/REPORT.md','/games/tiny-delivery/rc-r1/D2.wav',...manifest.files.filter(f=>f.file!=='_headers').map(f=>'/'+f.file)])];
const requests=paths.map(path=>({url:host+path,method:'GET'}));
requests.push({url:host+'/games/tiny-delivery/rc-r1/music.wav',method:'GET',headers:{Range:'bytes=0-63'}},{url:host+'/ja/',method:'HEAD'},{url:'http://preview.tinlumo.com/',method:'GET'});
const results=[];
for(const request of requests) {
  const r=await fetch(request.url,{method:request.method,headers:request.headers,redirect:'manual'});
  const location=r.headers.get('location');
  const destination=location?new URL(location,request.url):null;
  const accessRedirect=[302,303,307].includes(r.status)&&destination?.hostname==='tinlumo.cloudflareaccess.com'&&destination.pathname.startsWith('/cdn-cgi/access/login/');
  const tlsRedirect=[301,302,307,308].includes(r.status)&&destination?.origin===host;
  const body=await r.text();
  const leaked=/Authentication check page\. No games are deployed\.|<!doctype html>.*Tinlumo|Tinlumo Studio|localStorage|RIFF/s.test(body);
  const pass=!leaked&&(accessRedirect||(request.url.startsWith('http:')&&tlsRedirect));
  results.push({path:new URL(request.url).pathname,scheme:new URL(request.url).protocol,method:request.method,range:!!request.headers?.Range,status:r.status,accessRedirect,tlsRedirect,contentBodyReceived:leaked,pass});
  assert.ok(pass,'Anonymous request was not safely redirected: '+new URL(request.url).pathname);
}
const report={at:new Date().toISOString(),phase,anonymousRequests:results.length,results,status:'PASS',credentialsSent:false,queryStringsCookiesAndBodiesRecorded:false,authenticatedAssetQa:'SEPARATE',tls:'HTTPS certificate validation enabled; no insecure override'};
await writeFile(projectPath(`docs/qa/production-deploy-r1/anonymous-${phase}.json`),JSON.stringify(report,null,2)+'\n');
console.log('PASS: '+results.length+' anonymous requests denied or redirected to Access/HTTPS; no credential sent.');
