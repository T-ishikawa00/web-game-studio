import {validEvent,fields} from './event-schema.mjs';
import {retentionMs,healthMaxAge,purgeGraceMs,purgeBatch,purgeBatches} from './limits.mjs';
const endpoint='/__growth/events',release='growth-r1-production-r1';
const reply=status=>new Response(null,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
function allowedOrigin(request,env){const origin=new URL(request.url).origin;if(env.GROWTH_MODE==='production')return origin==='https://tinlumo.com';return env.GROWTH_MODE==='qa'&&new URL(origin).hostname==='127.0.0.1'&&env.GROWTH_QA_ORIGIN===origin;}
function safePayload(p){if(!p||p.release_version!==release)return null;if(!validEvent({...p,release_version:'growth-r1'}))return null;return JSON.stringify(Object.fromEntries(fields.map(k=>[k,p[k]])));}
async function boundedBody(request){const reader=request.body?.getReader();if(!reader)return null;const decoder=new TextDecoder('utf-8',{fatal:true});let size=0,text='';try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2048){await reader.cancel();return null;}text+=decoder.decode(value,{stream:true});}return text+decoder.decode();}catch{return null;}}
export async function receive(request,env,now=Date.now()){
 if(env.GROWTH_ENABLED!=='true'||!env.GROWTH_DB)return reply(503);
 if(request.method!=='POST')return reply(405);
 if(!allowedOrigin(request,env)||request.headers.get('Origin')!==new URL(request.url).origin||request.headers.get('Sec-Fetch-Site')==='cross-site')return reply(403);
 if(request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase()!=='application/json')return reply(415);
 const body=await boundedBody(request);if(body===null)return reply(413);let p;try{p=JSON.parse(body);}catch{return reply(400);}const payload=safePayload(p);if(!payload)return reply(400);
 const day=new Date(now).toISOString().slice(0,10);
 try{
  // Health, expired-row exclusion and both ceilings are part of the atomic
  // admission statement. Origin and random document IDs are not bot proof.
  const inserted=await env.GROWTH_DB.prepare(`INSERT INTO events(event_id,document_id,received_at,expires_at,receive_day,payload)
   SELECT ?1,?2,?3,?4,?5,?6 WHERE
   EXISTS(SELECT 1 FROM maintenance WHERE singleton=1 AND healthy=1 AND last_success>=?7 AND last_success<=?3)
   AND NOT EXISTS(SELECT 1 FROM events WHERE expires_at<=?8 LIMIT 1)
   AND COALESCE((SELECT accepted FROM daily_budget WHERE day=?5),0)<2000
   AND (SELECT COUNT(*) FROM events WHERE document_id=?2)<1000
   ON CONFLICT(event_id) DO NOTHING`).bind(p.event_id,p.document_id,now,now+retentionMs,day,payload,now-healthMaxAge,now-purgeGraceMs).run();
  if(inserted.meta?.changes>0)return reply(201);
  const health=await env.GROWTH_DB.prepare(`SELECT 1 ok FROM maintenance WHERE singleton=1 AND healthy=1 AND last_success>=? AND last_success<=?
   AND NOT EXISTS(SELECT 1 FROM events WHERE expires_at<=? LIMIT 1)`).bind(now-healthMaxAge,now,now-purgeGraceMs).first();
  if(!health)return reply(503);
  const existing=await env.GROWTH_DB.prepare('SELECT payload FROM events WHERE event_id=? AND expires_at>?').bind(p.event_id,now).first();
  if(existing)return reply(existing.payload===payload?200:409);
  return reply(429);
 }catch{return reply(503);}
}
export async function prune(env,now=Date.now()){
 if(!env.GROWTH_DB)return {status:'NO_DATABASE'};
 let deleted=0;
 try{
  await env.GROWTH_DB.prepare(`INSERT INTO maintenance(singleton,healthy,last_success,last_attempt) VALUES(1,0,0,?1)
   ON CONFLICT(singleton) DO UPDATE SET healthy=0,last_attempt=?1`).bind(now).run();
  for(let i=0;i<purgeBatches;i++){
   const result=await env.GROWTH_DB.prepare(`DELETE FROM events WHERE event_id IN
    (SELECT event_id FROM events WHERE expires_at<=? ORDER BY expires_at LIMIT ?)`).bind(now,purgeBatch).run();
   const changes=result.meta?.changes??0;deleted+=changes;if(changes<purgeBatch)break;
  }
  // Each invocation has a fixed deletion bound. Backlogs keep admission OFF.
  const backlog=await env.GROWTH_DB.prepare('SELECT 1 backlog FROM events WHERE expires_at<=? LIMIT 1').bind(now).first();
  const day=new Date(now-8*86400000).toISOString().slice(0,10);
  await env.GROWTH_DB.prepare('DELETE FROM daily_budget WHERE day IN (SELECT day FROM daily_budget WHERE day<? ORDER BY day LIMIT 32)').bind(day).run();
  if(backlog)return {status:'BACKLOG',deleted};
  await env.GROWTH_DB.prepare('UPDATE maintenance SET healthy=1,last_success=? WHERE singleton=1').bind(now).run();
  return {status:'PASS',deleted};
 }catch{
  // If a write also fails, the last-success age still closes collection.
  try{await env.GROWTH_DB.prepare('UPDATE maintenance SET healthy=0 WHERE singleton=1').run();}catch{}
  return {status:'FAILED',deleted};
 }
}
export default {async fetch(request,env){const url=new URL(request.url);if(url.pathname===endpoint)return receive(request,env);if(url.pathname.startsWith('/__growth/'))return reply(404);return env.ASSETS.fetch(request);},async scheduled(_controller,env){await prune(env);}};
