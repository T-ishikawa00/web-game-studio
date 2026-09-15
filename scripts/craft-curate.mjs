import {mkdir,readdir,rename,copyFile} from 'node:fs/promises';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const review=projectPath(path.join(projectRoot,'docs/qa/tiny-craft-pilot-01')),extras=projectPath(path.join(projectRoot,'.tmp/craft-qa/extra-screens'));await mkdir(extras,{recursive:true});
// Preserve repetitive QA captures locally; keep six representative review images.
for(const file of await readdir(path.join(review,'screens')))if(!/^(ja|en)-(auto|portrait|landscape)\.png$/.test(file))await rename(projectPath(path.join(review,'screens',file)),projectPath(path.join(extras,file)));
await copyFile(projectPath(path.join(projectRoot,'.tmp/craft-qa/coverage/layout-results.json')),path.join(review,'layout-results.json'));
await mkdir(path.join(review,'portal'),{recursive:true});
await copyFile(projectPath(path.join(projectRoot,'.tmp/craft-qa/portal-design/browser-results.json')),path.join(review,'portal/browser-results.json'));
