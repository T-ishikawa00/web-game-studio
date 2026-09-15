import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const out='.tmp/lightwork-object';mkdirSync(out,{recursive:true});const results=[];
const run=(name,args)=>{const r=spawnSync(process.execPath,args,{encoding:'utf8',windowsHide:true,maxBuffer:32*1024*1024,env:{...process.env,QA_R5_BASE_URL:'http://127.0.0.1:4341',QA_R5_OUTPUT_DIR:out}});writeFileSync(out+'/'+name+'.log',(r.stdout??'')+(r.stderr??''));results.push({name,status:r.status===0?'PASS':'FAIL',exit:r.status});console.log(name,r.status);if(r.status!==0)console.log(((r.stdout??'')+(r.stderr??'')).slice(-2200));return r.status===0;};
if(process.argv[2]==='browser'){
 for(const name of ['lightwork-pilot','lightwork-edge']){const source=readFileSync('tests/'+name+'.browser.mjs','utf8').replaceAll("'./r5-helpers.mjs'","'../../tests/r5-helpers.mjs'").replaceAll('.tmp/lightwork-qa',out).replaceAll('docs/qa/lightwork-craft-pilot-01',out+'/legacy-suite');const target=out+'/'+name+'.mjs';writeFileSync(target,source);if(!run(name,['--import','tsx',target]))break;}
}else if(process.argv[2]==='core'){
 run('unit',['--import','tsx','--test','tests/unit/*.test.ts']);run('tiny-frozen',['scripts/craft-r2-build.mjs']);
}else if(process.argv[2]==='objects')run('object-browser',['--import','tsx','tests/light-object.browser.mjs']);
else throw Error('Choose core, browser or objects');
writeFileSync(out+'/'+process.argv[2]+'-commands.json',JSON.stringify(results,null,2));if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
