import {createServer} from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('release-artifacts/rimbloom-portal-integration-r1'),port=4447;
if(path.resolve('.').toLowerCase()!=='c:\\projects\\web game studio')throw Error('Repository root mismatch');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const csp="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'";
const server=createServer(async(req,res)=>{
 res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 // Local preview blocks external ad/analytics execution while retaining candidate response bytes.
 res.setHeader('Content-Security-Policy',csp);
 if(![`127.0.0.1:${port}`,`localhost:${port}`].includes(req.headers.host)){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 try{
  const url=new URL(req.url,'http://127.0.0.1'),name=decodeURIComponent(url.pathname);
  if(name.includes('\\')||name.includes('\0'))throw Error();
  let file=path.resolve(root,'.'+name);if(file!==root&&!file.startsWith(root+path.sep))throw Error();
  if((await fs.stat(file)).isDirectory()){
   if(!name.endsWith('/')){res.writeHead(301,{Location:name+'/'+url.search}).end();return;}
   file=path.join(file,'index.html');
  }
  if(!(await fs.realpath(file)).startsWith(root+path.sep)||!types[path.extname(file)])throw Error();
  if(name.startsWith('/games/game007/'))res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; media-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
  const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)],'Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?undefined:await fs.readFile(root+'/404.html'));}
});
server.listen(port,'127.0.0.1',()=>console.log('RIMBLOOM local candidate: http://127.0.0.1:4447/ja/ and /en/ (external scripts blocked)'));
