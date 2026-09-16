import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {projectPath} from './project-path.mjs';
const root=projectPath('.cache/twoways-bgm'),review=projectPath('docs/qa/twoways-bgm-pilot-01'),port=4344;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.wav':'audio/wav','.webm':'video/webm','.md':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{try{
 if(!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 const url=new URL(req.url,'http://127.0.0.1');if(/^\/(ja|en)\/prototypes\/play\/two-ways-home\/$/.test(url.pathname)&&url.searchParams.get('tw')!=='TW-C'){url.searchParams.set('tw','TW-C');res.writeHead(302,{Location:url.pathname+url.search}).end();return;}const name=decodeURIComponent(url.pathname),isReview=name==='/'||name.startsWith('/review/'),base=isReview?review:root,relative=name==='/'?'/REVIEW.html':isReview?name.slice(7):name;
 let file=path.resolve(base,'.'+(relative.startsWith('/')?relative:'/'+relative));if(!file.startsWith(base+path.sep))throw Error('Path');if((await stat(file)).isDirectory())file=path.join(file,'index.html');if(!types[path.extname(file)])throw Error('Type');let data=await readFile(file);
 if(name==='/prototype-assets/game.html'&&url.searchParams.get('game')==='two-ways-home')data=Buffer.from(data.toString().replace('src="./game.js"','src="./twoways.js"').replace('</body>','<script type="module" src="./twoways-bgm.js"></script></body>'));
 res.setHeader('Content-Type',types[path.extname(file)]);res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Accept-Ranges','bytes');
 const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range??'');if(range){const start=Number(range[1]),end=Math.min(data.length-1,range[2]?Number(range[2]):data.length-1);if(start>end||start>=data.length){res.writeHead(416).end();return;}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));}else{res.writeHead(200,{'Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);}
 }catch{res.writeHead(404).end();}
}).listen(port,'127.0.0.1',()=>console.log(`Two Ways BGM Review: http://127.0.0.1:${port}/`));
