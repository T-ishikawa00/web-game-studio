import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import assert from 'node:assert/strict';
const qa='docs/qa/tinlumo-trust-ux-r2-release';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.json':'application/json','.md':'text/plain; charset=utf-8','.xml':'application/xml'};
const start=async(port,root,manifest)=>{
 const files=new Set(manifest.files.map(f=>f.file));
 const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Security-Policy',"default-src 'self'; connect-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'self'");
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.headers.host!==`127.0.0.1:${port}`||!['GET','HEAD'].includes(req.method)){res.writeHead(403).end();return;}
  const pathname=(req.url??'/').split('?')[0];let file=pathname.slice(1);if(file.endsWith('/')||file==='')file+='index.html';
  let target;
  if(files.has(file)&&file!=='_headers')target=root+'/'+file;
  else if(port===4383&&/^review\/(?:REVIEW\.html|result-layout-fixture\.html|review\.css|review\.js|(?:before|after)-[a-z-]+\.png|(?:browser|distribution|security|postflight|QA)\.json|(?:PUBLIC_COPY|REVIEW|SOURCE_OF_TRUTH)\.md)$/.test(file))target=qa+'/'+file.slice(7);
  else {res.writeHead(404).end();return;}
  try{const b=await fs.readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]??'application/octet-stream'});res.end(req.method==='HEAD'?undefined:b);}catch{res.writeHead(404).end();}
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});return server;
};
assert.equal(process.cwd().replaceAll('\\','/').toLowerCase(),'c:/projects/web game studio');
const after=JSON.parse(await fs.readFile(qa+'/distribution.json'));
const before=JSON.parse(await fs.readFile('docs/qa/game004-magnet-release-r1/distribution.json'));
const servers=[];
try{servers.push(await start(4383,after.root,after));}catch(e){for(const server of servers)server.close();throw e;}
await fs.writeFile(qa+'/server.json',JSON.stringify({pid:process.pid,startedAt:new Date().toISOString(),ports:[4383],roots:[after.root],loopbackOnly:true},null,2));
console.log('R2 release local: 127.0.0.1:4383');
