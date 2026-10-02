import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root='manual-play-ads-r1',port=Number(process.env.MANUAL_ADS_QA_PORT??4197);
const basis=JSON.parse(fs.readFileSync('game008-009-production-r1/game009/RELEASE_MANIFEST.json','utf8'));
const candidate=path.resolve(root+'/builds/candidate'),baseline=path.resolve(basis.root);
const types={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.mjs':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain;charset=utf-8','.json':'application/json'};
const payloads=[];
http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1:'+port);
 if(url.pathname.startsWith('/__local_qa/review/')) {
  const name=url.pathname.slice('/__local_qa/review/'.length)||'Review.html';
  const allow=['Review.html','FINAL_REVIEW.md','CANDIDATE_MANIFEST.json','QA_RESULTS.json','SECURITY_RESULTS.json','FINAL_DIFF.json','internal/screenshots/rimbloom-wide.png','internal/screenshots/rimbloom-mobile-full.png'];
  if(!allow.includes(name)||!fs.existsSync(root+'/'+name)){res.writeHead(404).end();return;}
  res.writeHead(200,{'Content-Type':types[path.extname(name)]??'text/plain;charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'none'; connect-src 'none'; object-src 'none'; base-uri 'self'"}).end(fs.readFileSync(root+'/'+name));return;
 }
 if(url.pathname==='/__local_qa/mock-ads.js') {
  const mode=url.searchParams.get('mode');
  const script=`// Loopback-only QA fixture. Never included in candidate assets.
document.documentElement.dataset.qaDocument=crypto.randomUUID();
const install=()=>{const queue=Array.isArray(window.adsbygoogle)?window.adsbygoogle:[];window.adsbygoogle={push(){const ins=[...document.querySelectorAll('ins.adsbygoogle')].find(e=>!e.dataset.adsbygoogleStatus);if(!ins)throw Error('QA duplicate push');if(!ins.dataset.manualAdRequested)throw Error('QA SDK targeted an unrequested slot');ins.dataset.qaPushes='1';${mode==='throw'?"throw Error('QA SDK failure before tag consumption');":""}ins.dataset.adsbygoogleStatus='done';${mode==='pending'?'':`ins.dataset.adStatus='${mode==='unfilled'?'unfilled':'filled'}';${mode==='unfilled'?'':"const label=document.createElement('div');label.textContent='TEST DISPLAY — NO REAL AD';label.style.cssText='height:100%;display:grid;place-items:center;background:#e3e7ec;color:#354051;font:12px system-ui;pointer-events:none';ins.append(label);"}`}}};for(const item of queue)window.adsbygoogle.push(item);};${mode==='queued'?"setTimeout(install,1000);":mode==='late'?"setTimeout(install,12000);":"install();"}`;
  res.writeHead(200,{'Content-Type':types['.js'],'Cache-Control':'no-store'}).end(script);return;
 }
 if(url.pathname==='/__growth/events'&&req.method==='POST') {let body='';for await(const b of req)body+=b;try{payloads.push(JSON.parse(body));fs.writeFileSync(root+'/internal/local-events.json',JSON.stringify(payloads,null,2));}catch{}res.writeHead(201).end();return;}
 const isBaseline=url.pathname.startsWith('/baseline/'),dist=isBaseline?baseline:fs.existsSync(candidate)?candidate:baseline;
 let name=decodeURIComponent(isBaseline?url.pathname.slice(9):url.pathname).replace(/^\//,'');if(!name||name.endsWith('/'))name+='index.html';
 const file=path.resolve(dist,name);if(!file.startsWith(dist+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
 const headers={'Content-Type':types[path.extname(file)]??'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'"};
 let body=fs.readFileSync(file);
 if(name.endsWith('.html'))body=Buffer.from(body.toString().replace(/<script[^>]+src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=[^"]+"[^>]*><\/script>/g,url.searchParams.has('adqa')?'<script src="/__local_qa/mock-ads.js?mode='+encodeURIComponent(url.searchParams.get('adqa'))+'"></script>':'<!-- QA only: real AdSense loader disabled -->'));
 if(name.endsWith('.html')&&url.searchParams.get('adqa')==='preinitialized')body=Buffer.from(body.toString().replace('</body>',`<script>const tag=document.querySelector('[data-manual-ad="left"] ins');if(tag){tag.dataset.qaPreinitialized='true';tag.dataset.adsbygoogleStatus='done';const frame=document.createElement('iframe');frame.title='SDK owned fixture';tag.append(frame);}</script></body>`));
 res.writeHead(200,headers).end(body);
}).listen(port,'127.0.0.1',()=>console.log(JSON.stringify({status:'LOOPBACK_QA_ONLY',port,baseline:basis.root,realAds:false,externalNetwork:false,authProxy:false})));
