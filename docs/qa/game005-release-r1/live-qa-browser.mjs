// Human-authorized OS-temp exception, isolated to each run's owned directory.
// Never persist actual profile paths or import any personal/persistent profile.
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';import path from 'node:path';import os from 'node:os';
let active=false;
const inside=(base,target)=>{const r=path.relative(base,target);return r===''||(!r.startsWith('..'+path.sep)&&r!=='..'&&!path.isAbsolute(r));};
export async function launchQaBrowser({label='qa'}={}){
 if(active||process.env.SELENIUM_REMOTE_URL)throw Error('QA requires one fresh local browser per process');
 const repo=await fs.realpath(process.cwd());if(repo.replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('QA repository mismatch');
 const temp=await fs.realpath(process.platform==='win32'?path.join(process.env.LOCALAPPDATA,'Temp'):os.tmpdir());
 if(inside(repo,temp))throw Error('QA temp root must be outside project');
 const owned=await fs.mkdtemp(path.join(temp,'game005-public-r1-qa-')),ownedReal=await fs.realpath(owned),evidence={label,freshTemporaryProfile:true,outsideProject:true,persistentProfile:false,importedProfile:false,profilePathRecorded:false,cleanup:'PENDING'};
 if(!inside(temp,ownedReal)||inside(repo,ownedReal)||path.dirname(ownedReal)!==temp)throw Error('QA ownership boundary');
 const old={TEMP:process.env.TEMP,TMP:process.env.TMP};process.env.TEMP=ownedReal;process.env.TMP=ownedReal;active=true;
 const restore=()=>{for(const k of ['TEMP','TMP'])if(old[k]===undefined)delete process.env[k];else process.env[k]=old[k];};
 let browser;
 try{browser=await chromium.launch({channel:'msedge',headless:true,env:{...process.env},proxy:{server:'http://127.0.0.1:9',bypass:'tinlumo.com'},args:['--disable-background-networking','--disable-component-update','--disable-sync','--no-first-run','--disable-domain-reliability']});}
 catch{restore();active=false;throw Error('QA browser launch failed; owned OS temp retained; no raw launch log recorded');}
 restore();
 const newContext=browser.newContext.bind(browser);browser.newContext=async options=>{const context=await newContext(options);await context.route('**/*',route=>{const u=new URL(route.request().url());return u.protocol==='https:'&&u.hostname==='tinlumo.com'?route.continue():route.abort();});return context;};
 const close=browser.close.bind(browser);let closed=false;
 browser.close=async()=>{if(closed)return;await close();closed=true;active=false;
  // Re-resolve immediately before recursive cleanup; no shell/path interpolation.
  const actual=await fs.realpath(ownedReal).catch(()=>null);
  if(actual===null)evidence.cleanup='ALREADY REMOVED';
  else if(actual===ownedReal&&path.dirname(actual)===temp&&path.basename(actual).startsWith('game005-public-r1-qa-')&&!inside(repo,actual)){await fs.rm(actual,{recursive:true,force:false,maxRetries:5,retryDelay:300});evidence.cleanup='OWN RUN ONLY / REMOVED';}
  else throw Error('QA cleanup boundary mismatch; retained');
  await fs.mkdir('docs/qa/game005-release-r1/harness',{recursive:true});await fs.writeFile('docs/qa/game005-release-r1/harness/'+label.replace(/[^a-z0-9-]/gi,'_')+'.json',JSON.stringify(evidence,null,2));
 };
 return browser;
}
