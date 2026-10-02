import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {root,read,verifyManifest,json} from './common.mjs';
const game=process.argv[2]??'game008',port=Number(process.argv[3]??4196),m=read(root+'/'+game+'/RELEASE_MANIFEST.json');verifyManifest(m);
const dist=path.resolve(m.root),payloads=[];let failed=false;
const types={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.mjs':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain;charset=utf-8','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
 const u=new URL(req.url,'http://127.0.0.1:'+port);
 if(u.pathname==='/__growth/events'&&req.method==='POST'){
  let body='';for await(const b of req)body+=b;if(body.length>2048){res.writeHead(413).end();return;}
  try{payloads.push(JSON.parse(body));json(root+'/internal/'+game+'-local-events.json',{at:new Date().toISOString(),receiverFailure:failed,payloads});}catch{res.writeHead(400).end();return;}
  res.writeHead(failed?503:201,{'Cache-Control':'no-store'}).end();return;
 }
 if(u.pathname==='/__local_qa/receiver-failure'&&req.method==='POST'){failed=u.searchParams.get('enabled')==='true';res.writeHead(204).end();return;}
 if(u.pathname==='/__local_qa/events'&&req.method==='GET'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'}).end(JSON.stringify({failed,payloads}));return;}
 let name=decodeURIComponent(u.pathname).replace(/^\//,'');if(!name||name.endsWith('/'))name+='index.html';
 const file=path.resolve(dist,name);let status=200,target=file;
 if(!file.startsWith(dist+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){status=404;target=dist+'/404.html';}
 const headers={'Content-Type':types[path.extname(target)]??'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'SAMEORIGIN'};
 if(name.startsWith('games/')||status===404)headers['X-Robots-Tag']='noindex, nofollow';
 if(name.startsWith('games/game008/'))headers['Content-Security-Policy']="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; media-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'none'";
 res.writeHead(status,headers).end(fs.readFileSync(target));
});server.listen(port,'127.0.0.1',()=>console.log(JSON.stringify({status:'LOOPBACK_PREVIEW_READY',game,port,assets:m.root,authProxy:false,credentials:false})));process.on('SIGINT',()=>server.close(()=>process.exit(0)));
