import {build} from 'vite';
import {projectRoot,projectPath} from './project-path.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=projectPath(`${projectRoot}/game004-magnet-tempo`),out=projectPath(`${projectRoot}/.cache/magnet-tempo-r2-1-dist`);
await build({configFile:false,root,publicDir:false,build:{outDir:out,emptyOutDir:true,rollupOptions:{input:{game:root+'/index.html',review:root+'/review.html'}}}});
await mkdir('docs/qa/game004-magnet-tempo-r2-1',{recursive:true});
const sources=['core.ts','progression.ts','art.ts','main.ts','audio.ts','style.css','index.html','review.html'];
await writeFile('docs/qa/game004-magnet-tempo-r2-1/build.json',JSON.stringify({at:new Date().toISOString(),root:'game004-magnet-tempo',out:'.cache/magnet-tempo-r2-1-dist',sources:await Promise.all(sources.map(async file=>({file,sha256:createHash('sha256').update(await readFile(root+'/'+file)).digest('hex')})))},null,2));

