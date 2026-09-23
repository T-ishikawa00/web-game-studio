import fs from 'node:fs';import {execFileSync} from 'node:child_process';
const qa='docs/qa/game005-expansion-baseline-r1',local='.cache/game005-expansion-baseline-r1',git=a=>execFileSync('git',a,{encoding:'utf8',windowsHide:true,maxBuffer:32_000_000});
const current='docs/games/PRODUCTION_CURRENT.md',head=git(['show','HEAD:'+current]),worktree=fs.readFileSync(current,'utf8');
const names=['game005-expansion-baseline-r1','game005-expansion-acceptance-r1','game005-expansion-slice-r1','game005-progression-research-r1'];
const blocks=names.map(n=>{const m=worktree.match(new RegExp('<!-- '+n+':start -->[\\s\\S]*?<!-- '+n+':end -->'));if(!m)throw Error('Missing Current block');return m[0];});
const header='# Production current state\n\n';if(!head.startsWith(header))throw Error('Current heading');
fs.writeFileSync(local+'/staged-current.md',header+blocks.join('\n\n')+'\n\n'+head.slice(header.length));
const roots=['game005-island/expansion-r1','docs/qa/game005-progression-research-r1','docs/qa/game005-expansion-acceptance-security-r1',qa];
const selected=git(['ls-files','--cached','--others','--exclude-standard','-z','--',...roots]).split('\0').filter(Boolean).filter(f=>!/(?:scripts\/(?:setup|implement-[^/]+)\.mjs)$/.test(f));
selected.push('docs/games/GAME005_PROGRESSION_RESEARCH_AND_EXPANSION_R1.md','docs/games/GAME005_PROGRESSION_RESEARCH_R1_SOURCES.md','docs/games/GAME005_EXPANSION_SLICE_R1.md','docs/games/GAME005_EXPANSION_SLICE_R1_ACCEPTANCE.md','docs/games/GAME005_EXPANSION_PROGRESS_BASELINE_R1.md','docs/security/GAME005_EXPANSION_R1_CANDIDATE_DISPOSITION_PENDING.md','docs/security/GAME005_EXPANSION_R1_HUMAN_DISPOSITION.md','scripts/game005-expansion-baseline-verify.mjs',qa+'/checkpoint-manifest.json');
const files=[...new Set(selected)].sort();
if(files.some(f=>/(^|\/)(\.cache|\.tmp|node_modules|dist|fixture-dist)\//.test(f)||/\.(key|pem|p12|pfx)$/.test(f)))throw Error('Forbidden selected path');
const manifest={at:new Date().toISOString(),parent:git(['rev-parse','HEAD']).trim(),files:[...files,current].sort(),sharedCurrent:{includedBlocks:names,base:'HEAD',preserveUnrelatedWorktree:true},exclusions:'All ignored files, TLS, generated dist, unrelated changes, Accepted MVP, one-time setup/implement scaffolding; later postflight is local only'};
fs.writeFileSync(qa+'/checkpoint-manifest.json',JSON.stringify(manifest,null,2));fs.writeFileSync(local+'/stage-paths.txt',files.join('\0')+'\0');
console.log({count:manifest.files.length,bytes:files.reduce((s,f)=>s+fs.statSync(f).size,0),currentBlocks:names});
if(process.argv.includes('--stage')){
 if(git(['diff','--cached','--name-only']).trim())throw Error('Expected initial empty index delta');
 execFileSync('git',['add','--pathspec-from-file='+local+'/stage-paths.txt','--pathspec-file-nul'],{windowsHide:true,stdio:['ignore','pipe','pipe']});
 const oid=execFileSync('git',['hash-object','-w','--stdin'],{input:fs.readFileSync(local+'/staged-current.md'),encoding:'utf8',windowsHide:true}).trim();
 execFileSync('git',['update-index','--add','--cacheinfo','100644',oid,current],{windowsHide:true});
 const staged=git(['diff','--cached','--name-only','-z']).split('\0').filter(Boolean).sort();if(JSON.stringify(staged)!==JSON.stringify(manifest.files))throw Error('Staged scope mismatch');console.log({stagedFiles:staged.length});
}
