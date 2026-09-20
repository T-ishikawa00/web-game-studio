import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const port=4372,root='.cache/game004-public-candidate',qa='docs/qa/game004-magnet-public-r1';
const manifest=JSON.parse(await fs.readFile(qa+'/distribution.json')),files=new Map();
for(const item of manifest.files){if(item.file==='_headers')continue;files.set('/'+item.file,root+'/'+item.file);if(item.file.endsWith('index.html'))files.set('/'+item.file.slice(0,-10),root+'/'+item.file);}
files.set('/review/','game004-public/review.html');
files.set('/review/REPORT.md',qa+'/REVIEW.md');
files.set('/review/highlight.webm','docs/qa/game004-magnet-full-r1/highlight.webm');
for(const name of ['portal-ja','portal-en','detail-ja','detail-en','game-ja','game-en','mobile-portrait','mobile-landscape','play-desktop','play-portrait','play-landscape','resume','clear','retry'])files.set('/review/'+name+'.png',qa+'/'+name+'.png');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav','.webm':'video/webm','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.md':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Cache-Control','no-store');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 res.setHeader('Content-Security-Policy',"default-src 'self'; connect-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'self'");
 if(req.headers.host!==`127.0.0.1:${port}`){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 const file=files.get((req.url??'/').split('?')[0]);if(!file){res.writeHead(404).end();return;}
 try{const bytes=await fs.readFile(file);res.setHeader('Content-Type',mime[path.extname(file)]??'application/octet-stream');const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range??'');if(match){const start=Number(match[1]),end=Math.min(Number(match[2]||bytes.length-1),bytes.length-1);if(start>end){res.writeHead(416).end();return;}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${bytes.length}`,'Content-Length':end-start+1,'Accept-Ranges':'bytes'});res.end(req.method==='HEAD'?undefined:bytes.subarray(start,end+1));}else{res.writeHead(200,{'Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);}}catch{res.writeHead(404).end();}
});
server.listen(port,'127.0.0.1',async()=>{await fs.mkdir('.tmp/magnet-public-r1',{recursive:true});await fs.writeFile('.tmp/magnet-public-r1/server.json',JSON.stringify({pid:process.pid,port,url:`http://127.0.0.1:${port}/review/`}));console.log(`Game004 public candidate http://127.0.0.1:${port}/review/`);});
