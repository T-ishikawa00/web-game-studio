import {build} from '../../../node_modules/esbuild/lib/main.js';
import {writeFile,unlink} from 'node:fs/promises';import path from 'node:path';
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const root='game005-island/expansion-r1';
await build({stdin:{contents:`import * as T from 'three';import {threshold,commons,promenade} from './cove-art';
const kind=new URLSearchParams(location.search).get('kind'),g=new T.Group();g.add(...(kind==='cove'?threshold():kind==='commons'?commons('sea'):promenade()));
const box=new T.Box3().setFromObject(g),center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3());g.position.sub(center);
const scene=new T.Scene();scene.add(g,new T.HemisphereLight('#d9f0e6','#b1a284',1.6));const sun=new T.DirectionalLight('#fff0cf',2.6);sun.position.set(-8,14,7);scene.add(sun);
const span=Math.max(size.x,size.z)*1.05,camera=new T.OrthographicCamera(-span*.714,span*.714,span*.5,-span*.5,.1,100);camera.position.set(5,7,9);camera.lookAt(0,0,0);
const renderer=new T.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setSize(600,420);renderer.setPixelRatio(1);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.03;document.body.append(renderer.domElement);renderer.render(scene,camera);document.body.dataset.ready='true';`,resolveDir:path.resolve(root+'/src'),loader:'ts'},bundle:true,format:'esm',outfile:root+'/review/model-assets.js'});
await writeFile(root+'/review/model-assets.html','<!doctype html><style>html,body{margin:0;background:transparent}</style><script type="module" src="model-assets.js"></script>');
process.env.TEMP=path.resolve(root+'/.cache/browser-temp');process.env.TMP=process.env.TEMP;
const browser=await chromium.launch({channel:'msedge',headless:true,env:{...process.env}});
try{const page=await browser.newPage({viewport:{width:600,height:420}});for(const kind of ['cove','commons','promenade']){await page.goto('http://127.0.0.1:4395/review/model-assets.html?kind='+kind);await page.waitForSelector('body[data-ready]');await page.locator('canvas').screenshot({path:root+'/assets/'+kind+'.png',omitBackground:true});}}finally{await browser.close();await unlink(root+'/review/model-assets.js');await unlink(root+'/review/model-assets.html');}

