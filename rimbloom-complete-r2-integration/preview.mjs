// Static loopback QA uses no authentication proxy and creates no credential.
import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import {validateRelease} from './release-state.mjs';
const {manifest}=validateRelease(),base=path.resolve(manifest.root),listed=new Set(manifest.files.map(e=>e.file));
const rules=fs.readFileSync(base+'/_headers','utf8').trim().split(/\r?\n\s*\r?\n/).map(block=>{const [pattern,...rows]=block.split(/\r?\n/);return{pattern,headers:rows.map(row=>{const i=row.indexOf(':');return[row.slice(0,i).trim(),row.slice(i+1).trim()];})};});
const types={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.wasm':'application/wasm'};
http.createServer((req,res)=>{try{const url=new URL(req.url,'http://127.0.0.1:4195'),name=decodeURIComponent(url.pathname);for(const rule of rules){const match=rule.pattern.endsWith('*')?name.startsWith(rule.pattern.slice(0,-1)):name===rule.pattern;if(match)for(const [k,v] of rule.headers)res.setHeader(k,v);}
 if(name==='/__growth/events'){res.writeHead(503,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end('{"status":"disabled_local_static_qa"}');return;}
 let file=name.replace(/^\//,'');if(!file||name.endsWith('/'))file+='index.html';if(listed.has(file+'/index.html')){res.writeHead(307,{Location:name+'/'});res.end();return;}
 if(!listed.has(file)||file==='_headers'||!path.resolve(base,file).startsWith(base+path.sep)){file='404.html';res.statusCode=404;}
 res.setHeader('Content-Type',types[path.extname(file)]??'application/octet-stream');res.end(fs.readFileSync(path.join(base,file)));
 }catch{res.statusCode=400;res.end('Invalid request');}}).listen(4195,'127.0.0.1',()=>console.log(JSON.stringify({status:'LOCAL_STATIC_QA_READY',origin:'http://127.0.0.1:4195',assets:manifest.root,proxy:false,credentialsCreated:0,measurementReceiver:'DISABLED_LOCAL_ONLY'})));
