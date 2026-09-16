import {createServer} from 'node:http';
import {readFile,stat,writeFile,mkdir,realpath} from 'node:fs/promises';
import path from 'node:path';
import {projectPath} from './project-path.mjs';
const review=process.argv.includes('--review'),port=review?4351:4350,root=projectPath(review?'docs/qa/soft-launch-rc-r1':'.cache/rc-dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav','.txt':'text/plain; charset=utf-8','.json':'application/json','.md':'text/plain; charset=utf-8','.webm':'video/webm'};
const server=createServer(async(req,res)=>{res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');try{
 if(![`127.0.0.1:${port}`,`localhost:${port}`].includes(req.headers.host)){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 const url=new URL(req.url,'http://127.0.0.1'),name=decodeURIComponent(url.pathname);if(name.includes('\\')||name.includes('\0'))throw Error();
 let file=path.resolve(root,'.'+(review&&name==='/'?'/REVIEW.html':name));if(file!==root&&!file.startsWith(root+path.sep))throw Error();projectPath(file===root?path.join(file,'index.html'):file);
 if((await stat(file)).isDirectory())file=path.join(file,'index.html');const resolved=await realpath(file);if(!resolved.startsWith(root+path.sep)||!types[path.extname(file)])throw Error();const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)],'Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});let body='404 · Not found';if(!review)try{body=await readFile(path.join(root,'404.html'));}catch{}res.end(req.method==='HEAD'?undefined:body);}});
server.listen(port,'127.0.0.1',async()=>{await mkdir(projectPath('.tmp/rc'),{recursive:true});await writeFile(projectPath(`.tmp/rc/${review?'review':'preview'}-process.json`),JSON.stringify({pid:process.pid,port,root,script:'scripts/rc-server.mjs',review,at:new Date().toISOString()}));console.log(`RC ${review?'Review':'Portal'}: http://127.0.0.1:${port}/`);});
