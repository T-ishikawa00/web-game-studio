import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const root=projectPath(path.join(projectRoot,'docs/qa/batch-01-learning'));
const types={'.html':'text/html; charset=utf-8','.md':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.webm':'video/webm','.css':'text/css','.svg':'image/svg+xml'};
createServer(async(req,res)=>{try{
 const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname),file=path.resolve(root,'.'+(pathname==='/'?'/REVIEW.html':pathname));
 if(!file.startsWith(root+path.sep)||!types[path.extname(file)]||!['GET','HEAD'].includes(req.method)){res.writeHead(404);res.end();return;}
 projectPath(file);const data=await readFile(file);await stat(file);res.setHeader('Content-Type',types[path.extname(file)]);res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range??'');if(range){const start=Number(range[1]),end=Math.min(data.length-1,range[2]?Number(range[2]):data.length-1);if(start>end||start>=data.length){res.writeHead(416);res.end();return;}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1,'Accept-Ranges':'bytes'});res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));}else{res.writeHead(200,{'Content-Length':data.length,'Accept-Ranges':'bytes'});res.end(req.method==='HEAD'?undefined:data);}
 }catch{res.writeHead(404);res.end();}
}).listen(4326,'127.0.0.1',()=>console.log('R5 review: http://127.0.0.1:4326/'));
