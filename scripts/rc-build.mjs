import {spawnSync} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {projectRoot,projectPath} from './project-path.mjs';
await mkdir(projectPath('.tmp/rc'),{recursive:true});
for(const args of [['scripts/rc-assets.mjs'],['node_modules/astro/bin/astro.mjs','build','--config','astro.rc.config.mjs'],['scripts/rc-manifest.mjs']]){
 const r=spawnSync(process.execPath,args,{cwd:projectRoot,stdio:'inherit',windowsHide:true,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1',TEMP:projectPath('.tmp/rc'),TMP:projectPath('.tmp/rc')}});if(r.status!==0)process.exit(r.status??1);
}
