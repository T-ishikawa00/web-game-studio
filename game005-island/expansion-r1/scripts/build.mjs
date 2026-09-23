import {build} from '../../node_modules/vite/dist/node/index.js';import {copyFile} from 'node:fs/promises';import path from 'node:path';
const r='game005-island/expansion-r1';
await build({configFile:false,root:path.resolve(r+'/app'),base:'./',publicDir:false,envDir:false,cacheDir:path.resolve(r+'/.cache/vite'),build:{outDir:path.resolve(r+'/dist'),emptyOutDir:true,sourcemap:false,target:'es2022'}});
await copyFile('game005-island/node_modules/three/LICENSE',r+'/dist/THREE-LICENSE.txt');
