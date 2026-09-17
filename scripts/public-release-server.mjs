// Loopback-only review of the isolated candidate; never serves the repository.
import {createServer} from 'node:http';
import {readFile,stat,realpath,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {projectPath} from './project-path.mjs';
const port=4352,root=projectPath('.cache/tinlumo-public-candidate');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server=createServer(async(req,res)=>{
 res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','SAMEORIGIN');
 if(![`127.0.0.1:${port}`,`localhost:${port}`].includes(req.headers.host)){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 try{
  const name=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);if(name.includes('\\')||name.includes('\0'))throw Error();
  let file=path.resolve(root,'.'+name);if(file!==root&&!file.startsWith(root+path.sep))throw Error();
  if((await stat(file)).isDirectory())file=path.join(file,'index.html');
  if(!(await realpath(file)).startsWith(root+path.sep)||!types[path.extname(file)])throw Error();
  const b=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)],'Content-Length':b.length});res.end(req.method==='HEAD'?undefined:b);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?undefined:await readFile(path.join(root,'404.html')));}
});
server.listen(port,'127.0.0.1',async()=>{await mkdir(projectPath('.tmp/public-release-final-r1'),{recursive:true});await writeFile(projectPath('.tmp/public-release-final-r1/server.json'),JSON.stringify({pid:process.pid,port,root}));console.log(`Public candidate review: http://127.0.0.1:${port}/`);});
