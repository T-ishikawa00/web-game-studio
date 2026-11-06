/** Local historical preview. No provider calls, no npm dependencies, no background daemon. */
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readVerifiedSnapshot,GUARD_TAG} from './common.mjs';
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ogg':'audio/ogg','.mp3':'audio/mpeg','.wav':'audio/wav','.mp4':'video/mp4','.webm':'video/webm','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.woff2':'font/woff2'};
const CSP=["default-src 'self' data: blob:","script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:","style-src 'self' 'unsafe-inline'","img-src 'self' data: blob:","font-src 'self' data:","media-src 'self' blob:","connect-src 'self'","frame-src 'self'","worker-src 'self' blob:","object-src 'none'","base-uri 'self'","form-action 'none'","frame-ancestors 'self'"].join('; ');
// Added to RESPONSE HTML only. Stored original bytes remain unchanged and verifiable.
const GUARD=Buffer.from(`(()=>{ 'use strict';
function localURL(raw){try{const u=new URL(raw,location.href);if(u.origin===location.origin)return u;if((u.hostname==='tinlumo.com'||u.hostname==='www.tinlumo.com'||u.hostname==='preview.tinlumo.com')&&/^https?:$/.test(u.protocol))return new URL(u.pathname+u.search+u.hash,location.origin);return null;}catch{return null;}}
document.addEventListener('click',e=>{const a=e.target instanceof Element?e.target.closest('a[href]'):null;if(!a)return;const u=localURL(a.getAttribute('href'));if(!u){e.preventDefault();e.stopImmediatePropagation();console.warn('Local preview: external navigation blocked.');return;}if(a.href!==u.href)a.href=u.href;},true);
document.addEventListener('auxclick',e=>{const a=e.target instanceof Element?e.target.closest('a[href]'):null;if(a&&!localURL(a.getAttribute('href'))){e.preventDefault();e.stopImmediatePropagation();}},true);
document.addEventListener('submit',e=>{e.preventDefault();e.stopImmediatePropagation();},true);
const originalOpen=window.open.bind(window);window.open=(u,...args)=>{const local=localURL(u);return local?originalOpen(local.href,...args):null;};
// Block old service-worker registration rather than changing browser-wide settings.
if('serviceWorker' in navigator){try{navigator.serviceWorker.register=()=>Promise.reject(new Error('Disabled in historical preview'));}catch{}}
})();`, 'utf8');
export function createPreview({root, strict=true}={}) {
  const {manifest,files,pin}=readVerifiedSnapshot(path.resolve(root),strict);
  const server=http.createServer((req,res)=>{
    const set=()=>{
      res.setHeader('Cache-Control','no-store');res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
      res.setHeader('Content-Security-Policy',CSP);res.setHeader('Referrer-Policy','no-referrer');
      res.setHeader('X-DNS-Prefetch-Control','off');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','SAMEORIGIN');
      res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=(), payment=()');
    };set();
    const stop=(status,text)=>{res.statusCode=status;res.setHeader('Content-Type','text/plain; charset=utf-8');res.end(req.method==='HEAD'?undefined:text);};
    const port=server.address()?.port;
    if(req.headers.host!==`127.0.0.1:${port}` && req.headers.host!==`localhost:${port}`)return stop(403,'Invalid Host');
    if(req.headers['sec-fetch-site']==='cross-site')return stop(403,'Cross-site request blocked');
    if(!['GET','HEAD'].includes(req.method))return stop(405,'Local preview accepts GET/HEAD only');
    let pathname;
    try{pathname=decodeURIComponent((req.url||'/').split('?')[0]);}catch{return stop(400,'Malformed URL');}
    if(!pathname.startsWith('/')||pathname.includes('\\')||/[\x00-\x1f]/.test(pathname)||pathname.split('/').some(s=>s==='..'||s==='.'||s.startsWith('.')))return stop(403,'Unsafe path');
    if(pathname==='/__growth/events'||pathname.startsWith('/cdn-cgi/')||pathname.startsWith('/api/'))return stop(410,'Remote services disabled');
    let file=pathname.slice(1), bytes;
    if(file==='__local_preview_guard.js'){bytes=GUARD;}
    else {
      if(file==='_headers')return stop(404,'Not served');
      if(!file || file.endsWith('/'))file+='index.html';
      if(!files.has(file) && files.has(file+'/index.html')){
        res.writeHead(308,{Location:'/'+file+'/'});return res.end();
      }
      bytes=files.get(file);
      if(!bytes){res.statusCode=404;file='404.html';bytes=files.get(file)||Buffer.from('Not found');}
      if(file.endsWith('.html')){
        const html=bytes.toString('utf8');
        const script=GUARD_TAG;
        bytes=Buffer.from(/<head(?:\s[^>]*)?>/i.test(html)?html.replace(/<head(?:\s[^>]*)?>/i,m=>m+script):script+html);
      }
    }
    res.setHeader('Content-Type',MIME[path.extname(file)]||'application/octet-stream');
    // Audio/video range playback only. HTML response bytes include the safety guard.
    if(req.headers.range && /\.(ogg|mp3|wav|mp4|webm)$/.test(file) && res.statusCode===200){
      const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      let begin=0,end=bytes.length-1;
      if(!m || (!m[1]&&!m[2]))return stop(416,'Unsupported range');
      if(!m[1]){const n=Number(m[2]);begin=Math.max(0,bytes.length-n);}else{begin=Number(m[1]);if(m[2])end=Number(m[2]);}
      end=Math.min(end,bytes.length-1);
      if(!Number.isSafeInteger(begin)||!Number.isSafeInteger(end)||begin<0||begin>end||begin>=bytes.length){res.setHeader('Content-Range',`bytes */${bytes.length}`);return stop(416,'Range not satisfiable');}
      res.statusCode=206;res.setHeader('Content-Range',`bytes ${begin}-${end}/${bytes.length}`);bytes=bytes.subarray(begin,end+1);
    }
    res.setHeader('Content-Length',bytes.length);res.end(req.method==='HEAD'?undefined:bytes);
  });
  server.requestTimeout=15000;server.headersTimeout=10000;
  server.on('clientError',(_,socket)=>{if(socket.writable)socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');});
  return {server,manifest,pin};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2), at=n=>args.indexOf(n), opt=(n,d)=>at(n)<0?d:args[at(n)+1];
  try{
    const root=opt('--root',path.dirname(fileURLToPath(import.meta.url))),port=Number(opt('--port','4387'));
    if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Use a non-privileged port 1024..65535');
    const {server,manifest,pin}=createPreview({root});
    server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'Port in use. Do not stop the existing process; choose another port.':'Preview start failed.');process.exitCode=1;});
    server.listen(port,'127.0.0.1',()=>console.log(`Historical ${pin.title} / ${manifest.routes.length} routes\nJA http://127.0.0.1:${port}/ja/\nEN http://127.0.0.1:${port}/en/\nLocal-only: external subresources/forms blocked; analytics endpoint disabled.\nResponse HTML has a local safety guard; on-disk release bytes are preserved.\nPress Ctrl+C here to stop. Do not click external links or use this as a production server.`));
    const close=()=>{server.close(()=>process.exit(0));server.closeIdleConnections?.();setTimeout(()=>process.exit(0),1500).unref();};
    process.on('SIGINT',close);process.on('SIGTERM',close);
  }catch(e){console.error('PREVIEW STOPPED: '+e.message);process.exitCode=1;}
}
