import {readFile,writeFile} from 'node:fs/promises';
const root='game005-island/r3-2/review',read=async name=>JSON.parse(await readFile(root+'/'+name+'.json','utf8'));
await writeFile(root+'/data.js','export const perf='+JSON.stringify(await read('performance'))+';\nexport const plays='+JSON.stringify(await Promise.all(['market-play','house-play'].map(read)))+';\n');
