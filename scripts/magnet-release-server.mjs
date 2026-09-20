import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const m=JSON.parse(await fs.readFile('docs/qa/game004-magnet-release-r1/distribution.json')),port=4373,files=new Map();
for(const f of m.files){if(f.file==='_headers')continue;files.set('/'+f.file,f.file);if(f.file.endsWith('index.html'))files.set('/'+f.file.slice(0,-10),f.file);}
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Cache-Control','no-cache');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 if(req.headers.host!==`127.0.0.1:${port}`){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 const route=(req.url??'/').split('?')[0],file=files.get(route);
 if(route.startsWith('/games/')||route==='/404.html')res.setHeader('X-Robots-Tag','noindex, nofollow');
 if(!file){res.writeHead(404).end();return;}
 try{const bytes=await fs.readFile(m.root+'/'+file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]??'application/octet-stream','Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);}catch{res.writeHead(404).end();}
}).listen(port,'127.0.0.1',()=>console.log(`http://127.0.0.1:${port}/en/`));
