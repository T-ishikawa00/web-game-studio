import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {projectRoot,projectPath} from './project-path.mjs';
const out=projectPath(`${projectRoot}/.tmp/magnet-public-r1`);
const hash=b=>createHash('sha256').update(b).digest('hex');
const git=(...args)=>execFileSync('git',args,{cwd:projectRoot,encoding:'utf8',windowsHide:true});
if(process.argv.includes('--baseline')){
 await mkdir(out,{recursive:true});
 const files=new Set(git('ls-files','-z','--cached','--others','--exclude-standard').split('\0').filter(Boolean));
 for(const root of ['.cache/magnet-full-r1-dist','.cache/magnet-expansion-a-r1-dist','.cache/magnet-tempo-r2-1-dist','.cache/magnet-progression-r2-dist','.cache/magnet-vertical-r1-dist','.cache/magnet-r1-dist','.cache/game004-dist','.cache/tinlumo-mvp-portal-baseline-r1','.cache/tinlumo-approved-dist','dist']){
  const walk=async dir=>{for(const e of await readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw Error('Linked baseline rejected');const p=dir+'/'+e.name;if(e.isDirectory())await walk(p);else files.add(p);}};await walk(root);
 }
 const records=[];for(const file of files)records.push({file,digest:hash(await readFile(file))});
 await writeFile(out+'/before.json',JSON.stringify({head:git('rev-parse','HEAD').trim(),index:git('ls-files','--stage'),status:git('status','--porcelain=v1'),records},null,2));console.log({baselineFiles:records.length});
}else{
 const before=JSON.parse(await readFile(out+'/before.json','utf8'));const changed=[];
 const earlyCreated=['scripts/magnet-full-baseline-verify.mjs','scripts/magnet-full-baseline-media.mjs','scripts/magnet-public-preserve.mjs'];
 for(const x of before.records.filter(x=>!earlyCreated.includes(x.file))){try{if(hash(await readFile(x.file))!==x.digest)changed.push(x.file);}catch{changed.push(x.file);}}
 const allowed=['docs/games/PRODUCTION_CURRENT.md','docs/records/ASSET_REGISTER_R1.md'];
 const result={baselineFiles:before.records.length,preExistingFiles:before.records.length-earlyCreated.length,excludedTaskCreatedHelpers:earlyCreated,changed,unexpected:changed.filter(x=>!allowed.includes(x)),headUnchanged:git('rev-parse','HEAD').trim()===before.head,indexUnchanged:git('ls-files','--stage')===before.index,protected:['production source + existing tracked/untracked','Nurture source + evidence + built output','approved production distributions'],remoteRead:true,authorizedCheckpoint:'8589025926c2ca34d87548521e28d7277e668f66',baselineIncludesEarlyNewHelpers:true,helperDelta:'magnet-full-baseline-verify.mjs was created in this task before snapshot; ps1 line-ending support added before checkpoint, not a pre-existing accepted file',gitChanges:'One explicitly authorized checkpoint commit/push; index empty afterward'};
 await writeFile('docs/qa/game004-magnet-public-r1/preservation.json',JSON.stringify(result,null,2));console.log(result);result.checkpointMatches=git('rev-parse','HEAD').trim()===result.authorizedCheckpoint;result.indexEmpty=git('diff','--cached','--name-only').trim()==='';result.status=!result.unexpected.length&&result.checkpointMatches&&result.indexEmpty?'PASS':'FAIL';await writeFile('docs/qa/game004-magnet-public-r1/preservation.json',JSON.stringify(result,null,2));if(result.status!=='PASS')process.exitCode=1;
}
