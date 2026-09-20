import http from 'node:http';
import {readFile,readdir,stat,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const port=4371,root=projectPath(`${projectRoot}/.cache/magnet-full-r1-dist`),files=new Map();
async function collect(dir,prefix=''){for(const e of await readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw Error('Linked distribution rejected');const rel=prefix+e.name,p=projectPath(path.join(dir,e.name));if(e.isDirectory())await collect(p,rel+'/');else files.set('/'+rel,p);}}await collect(root);
files.set('/',root+'/index.html');files.set('/review/',root+'/review.html');
for(const name of ['full-flow.webm','full-canvas-audio.webm','highlight.webm','A-cyclone-stage5.png','A-satellite-stage5.png','B-satellite-stage5.png','B-foundry-stage5.png','C-return-stage5.png','C-foundry-mobile-stage5.png','normal-end.png','resume-B4.png','hub-desktop.png','hub-portrait.png','hub-landscape.png','unlocked-B.png','unlocked-C.png'])files.set('/evidence/'+name,projectPath(`${projectRoot}/docs/qa/game004-magnet-full-r1/${name}`));
for(const [route,file] of [['validation','docs/games/GAME004_INDEPENDENT_VALIDATION_R1.md'],['production','docs/games/GAME004_FULL_GAME_PRODUCTION_R1.md'],['review','docs/qa/game004-magnet-full-r1/REVIEW.md']])files.set('/notes/'+route,projectPath(`${projectRoot}/${file}`));
const mime={'.md':'text/plain; charset=utf-8','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webm':'video/webm'};
const server=http.createServer(async(req,res)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Cache-Control','no-store');res.setHeader('Content-Security-Policy',"default-src 'self'; connect-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
 if(req.headers.host!==`127.0.0.1:${port}`){res.writeHead(403).end();return;}if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}const file=files.get((req.url??'/').split('?')[0]);if(!file){res.writeHead(404).end();return;}
 try{const bytes=await readFile(file),size=bytes.length;res.setHeader('Content-Type',mime[path.extname(file)]??'application/octet-stream');const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range??'');if(match){const start=Number(match[1]),end=Math.min(Number(match[2]||size-1),size-1);if(start>end){res.writeHead(416).end();return;}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1,'Accept-Ranges':'bytes'});res.end(req.method==='HEAD'?undefined:bytes.subarray(start,end+1));}else{res.writeHead(200,{'Content-Length':size});res.end(req.method==='HEAD'?undefined:bytes);}}catch{res.writeHead(404).end();}
});server.listen(port,'127.0.0.1',async()=>{await mkdir(projectPath(`${projectRoot}/.tmp/magnet-full-r1`),{recursive:true});await writeFile(projectPath(`${projectRoot}/.tmp/magnet-full-r1/server.json`),JSON.stringify({pid:process.pid,port,url:`http://127.0.0.1:${port}/review/`}));console.log(`PROJECT MAGNET http://127.0.0.1:${port}/review/ PID ${process.pid}`);});



