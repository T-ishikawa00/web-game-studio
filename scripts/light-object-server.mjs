import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {projectPath} from './project-path.mjs';
const root=projectPath('.cache/lightwork-object'),review=projectPath('docs/qa/lightwork-object-design-01'),port=4341;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.webm':'video/webm','.md':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{try{
 if(!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 const url=new URL(req.url,'http://127.0.0.1'),name=decodeURIComponent(url.pathname),isReview=name==='/'||name.startsWith('/review/'),base=isReview?review:root,relative=name==='/'?'/REVIEW.html':isReview?name.slice(7):name;
 let file=path.resolve(base,'.'+(relative.startsWith('/')?relative:'/'+relative));if(!file.startsWith(base+path.sep))throw Error('Path');if((await stat(file)).isDirectory())file=path.join(file,'index.html');if(!types[path.extname(file)])throw Error('Type');let data=await readFile(file);
 if(/^\/(ja|en)\/prototypes\/play\/light-garden\/$/.test(name)&&url.searchParams.get('objects')==='before'){
  const source=data.toString(),from='data-build="/prototype-assets/game.html?game=light-garden"';if(source.split(from).length!==2)throw Error('Exact comparison hook');data=Buffer.from(source.replace(from,'data-build="/prototype-assets/game.html?game=light-garden&amp;objects=before"'));
 }
 if(name==='/prototype-assets/game.html'&&url.searchParams.get('game')==='light-garden'){
  const before=url.searchParams.get('objects')==='before';
  data=Buffer.from(data.toString().replace('src="./game.js"',`src="./${before?'lightwork':'light-object'}.js"`).replace('</head>',`${before?'':'<link rel="stylesheet" href="./light-object.css">'}</head>`));
 }
 res.setHeader('Content-Type',types[path.extname(file)]);res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Accept-Ranges','bytes');
 const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range??'');if(range){const start=Number(range[1]),end=Math.min(data.length-1,range[2]?Number(range[2]):data.length-1);if(start>end||start>=data.length){res.writeHead(416).end();return;}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));}else{res.writeHead(200,{'Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);}
 }catch{res.writeHead(404).end();}
}).listen(port,'127.0.0.1',()=>console.log(`Lightwork Object Review: http://127.0.0.1:${port}/`));
