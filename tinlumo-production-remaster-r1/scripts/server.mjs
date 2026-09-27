import {createServer} from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const repo=fs.realpathSync('.');if(repo.replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('Wrong root');
const port=4412,root=path.join(repo,'release-artifacts/tinlumo-visual-remaster-r1'),review=path.join(repo,'tinlumo-production-remaster-r1/review');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.wav':'audio/wav','.txt':'text/plain','.md':'text/plain; charset=utf-8','.xml':'application/xml'};
createServer((req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('X-Content-Type-Options','nosniff');
 if(!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)||!['GET','HEAD'].includes(req.method)){res.writeHead(403).end();return;}
 try{const url=new URL(req.url,'http://127.0.0.1');let name=decodeURIComponent(url.pathname);if(name.includes('\\')||name.includes('\0')||name.split('/').some(p=>p.startsWith('.')))throw Error();
  const base=name.startsWith('/review/')?review:root;if(base===review)name=name.slice(7);let file=path.resolve(base,'.'+name);if(file!==base&&!file.startsWith(base+path.sep))throw Error();
  let code=200;if(!fs.existsSync(file)){file=path.join(root,'404.html');code=404;}else if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  const ext=path.extname(file);if(!types[ext])throw Error();const b=fs.readFileSync(file);res.writeHead(code,{'Content-Type':types[ext],'Content-Length':b.length});res.end(req.method==='HEAD'?undefined:b);
 }catch{res.writeHead(404).end('Not found');}
}).listen(port,'127.0.0.1',()=>{fs.writeFileSync('tinlumo-production-remaster-r1/internal/server.json',JSON.stringify({pid:process.pid,port,host:'127.0.0.1'}));console.log('http://127.0.0.1:'+port+'/');});
