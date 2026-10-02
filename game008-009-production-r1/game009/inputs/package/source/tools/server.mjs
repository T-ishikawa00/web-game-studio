import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.argv.includes('--dist')?'dist':'.');
const port=Number(process.env.GAME009_PORT||4609);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webm':'video/webm','.mp4':'video/mp4','.wav':'audio/wav'};
const server=http.createServer(async(req,res)=>{
 try{
  if(req.method==='POST'&&req.url.startsWith('/__review/')){
   if(req.headers.origin!==`http://127.0.0.1:${port}`||req.headers.host!==`127.0.0.1:${port}`){res.writeHead(403);return res.end();}
   const name=req.url.slice('/__review/'.length);
   if(!/^[a-z0-9_-]{1,70}\.(png|webm)$/.test(name)){res.writeHead(400);return res.end();}
   let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>45_000_000){res.writeHead(413);res.end();return;}chunks.push(chunk);}
   const evidence=path.resolve('qa','captures');await fs.mkdir(evidence,{recursive:true});await fs.writeFile(path.join(evidence,name),Buffer.concat(chunks),{flag:'wx'});res.writeHead(201,{'Content-Type':'application/json'});return res.end(JSON.stringify({file:`qa/captures/${name}`}));
  }
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end();}
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  const data=await fs.readFile(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'"});
  res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Game009 http://127.0.0.1:${port} (${root})`));
