import {execFileSync} from 'node:child_process';import {writeFile,copyFile} from 'node:fs/promises';
const out='game005-island/r3-2/review',ff='C:/Users/PUBLIC_USER/AppData/Local/ms-playwright/ffmpeg-1011/ffmpeg-win64.exe';
for(const name of ['market','house']){const raw=`game005-island/r3-2/.cache/full-loop-${name}-raw.webm`;await copyFile(out+`/full-loop-${name}.webm`,raw);execFileSync(ff,['-hide_banner','-loglevel','error','-y','-i',raw,'-c','copy',out+`/full-loop-${name}.webm`],{windowsHide:true});}
execFileSync(ff,['-hide_banner','-loglevel','error','-y','-i',out+'/full-loop-market.webm','-t','20','-c','copy',out+'/construction-20s.webm'],{windowsHide:true});
await writeFile(out+'/media.json',JSON.stringify({at:new Date().toISOString(),source:'full-loop-market.webm',excerpt:'construction-20s.webm',startSeconds:0,endSeconds:20,speed:1,method:'stream copy; ordinary UI and original video quality; no audio track'},null,2));
