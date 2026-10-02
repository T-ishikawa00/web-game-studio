import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildSource = await fs.readFile(path.join(projectRoot, 'tools', 'build.mjs'));
const packageSource = await fs.readFile(path.join(projectRoot, 'tools', 'package.mjs'));

async function makeFixture({withPackage = false} = {}) {
  const parent = await fs.mkdtemp(path.join(os.tmpdir(), 'game009-build-test-'));
  const root = path.join(parent, 'fixture');
  await fs.mkdir(path.join(root, 'tools'), {recursive: true});
  await fs.mkdir(path.join(root, 'src'), {recursive: true});
  await fs.mkdir(path.join(root, 'assets'), {recursive: true});
  await fs.mkdir(path.join(root, 'research'), {recursive: true});
  await fs.mkdir(path.join(root, 'qa'), {recursive: true});
  await fs.writeFile(path.join(root, 'tools', 'build.mjs'), buildSource);
  if (withPackage) await fs.writeFile(path.join(root, 'tools', 'package.mjs'), packageSource);
  await fs.writeFile(path.join(root, 'index.html'), '<!doctype html><script type="module" src="./src/app.js"></script>\n');
  await fs.writeFile(path.join(root, 'src', 'app.js'), 'export const value = 7;\n');
  await fs.writeFile(path.join(root, 'src', 'style.css'), '.game { display: block; }\n');
  await fs.writeFile(path.join(root, 'assets', 'icon.svg'), '<svg></svg>\n');
  await fs.writeFile(path.join(root, 'research', 'notes.md'), 'review-only\n');
  await fs.writeFile(path.join(root, 'qa', 'trace.txt'), 'private-qa\n');
  await fs.writeFile(path.join(root, '.env'), 'SHOULD_NOT_BE_PACKAGED=1\n');
  await fs.writeFile(path.join(root, 'package.json'), '{"name":"fixture","private":true,"type":"module"}\n');
  return {parent, root};
}

function run(root, script = 'tools/build.mjs') {
  return spawnSync(process.execPath, [path.join(root, script)], {cwd: root, encoding: 'utf8'});
}

function lastJson(stdout) {
  const starts = [...stdout.matchAll(/(?:^|\r?\n)\{/g)].map(match => match.index + match[0].length - 1);
  for (const start of starts.reverse()) {
    const tail = stdout.slice(start);
    const end = tail.lastIndexOf('\n}');
    if (end < 0) continue;
    try { return JSON.parse(tail.slice(0, end + 2)); }
    catch { /* Continue at an earlier object boundary in diagnostic output. */ }
  }
  assert.fail(`expected a JSON result in output:\n${stdout}`);
}

async function walkRelative(base) {
  const files = [];
  async function walk(dir) {
    for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(absolute);
      else files.push(path.relative(base, absolute).replaceAll('\\','/'));
    }
  }
  await walk(base);
  return files.sort();
}

async function treeHash(base, excluded = []) {
  const hash = createHash('sha256');
  for (const name of await walkRelative(base)) {
    if (excluded.includes(name)) continue;
    hash.update(Buffer.from(name, 'utf8')).update(Buffer.from([0]));
    hash.update(await fs.readFile(path.join(base, ...name.split('/')))).update(Buffer.from([0]));
  }
  return hash.digest('hex');
}

async function makeCurrentAppFixture(t) {
  const parent = await fs.mkdtemp(path.join(os.tmpdir(), 'game009-runtime-test-'));
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));
  const root = path.join(parent, 'fixture');
  await fs.mkdir(path.join(root, 'tools'), {recursive: true});
  await fs.copyFile(path.join(projectRoot, 'tools', 'build.mjs'), path.join(root, 'tools', 'build.mjs'));
  await fs.copyFile(path.join(projectRoot, 'index.html'), path.join(root, 'index.html'));
  await fs.cp(path.join(projectRoot, 'src'), path.join(root, 'src'), {recursive: true});
  return root;
}

test('fresh static build is deterministic, allowlisted, and preserves every prior dist', async t => {
  const {parent, root} = await makeFixture();
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));

  const first = run(root);
  assert.equal(first.status, 0, first.stderr);
  const manifestPath = path.join(root, 'dist', 'manifest.json');
  const firstManifest = await fs.readFile(manifestPath);
  const manifest = JSON.parse(firstManifest.toString('utf8'));
  assert.equal(manifest.game, 'game009');
  assert.deepEqual(manifest.files.map(file => file.path), ['assets/icon.svg','index.html','src/app.js','src/style.css']);
  assert.ok(manifest.files.every(file => /^[a-f0-9]{64}$/.test(file.sha256)));
  for (const record of manifest.files) {
    const bytes = await fs.readFile(path.join(root, 'dist', ...record.path.split('/')));
    assert.equal(record.bytes, bytes.length);
    assert.equal(record.sha256, createHash('sha256').update(bytes).digest('hex'));
  }
  assert.deepEqual(await walkRelative(path.join(root, 'dist')), ['assets/icon.svg','index.html','manifest.json','src/app.js','src/style.css']);

  await fs.writeFile(path.join(root, 'dist', 'obsolete-user-file.txt'), 'retain this build\n');
  const second = run(root);
  assert.equal(second.status, 0, second.stderr);
  assert.deepEqual(await walkRelative(path.join(root, 'dist')), ['assets/icon.svg','index.html','manifest.json','src/app.js','src/style.css']);
  assert.deepEqual(await fs.readFile(manifestPath), firstManifest);
  const backups = (await fs.readdir(root)).filter(name => name.startsWith('dist-backup-'));
  assert.equal(backups.length, 1);
  assert.equal(await fs.readFile(path.join(root, backups[0], 'obsolete-user-file.txt'), 'utf8'), 'retain this build\n');

  const third = run(root);
  assert.equal(third.status, 0, third.stderr);
  assert.deepEqual(await fs.readFile(manifestPath), firstManifest);
  assert.equal((await fs.readdir(root)).filter(name => name.startsWith('dist-backup-')).length, 2);
});

test('missing required source fails before touching an existing dist', async t => {
  const {parent, root} = await makeFixture();
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));
  await fs.rm(path.join(root, 'index.html'));
  await fs.mkdir(path.join(root, 'dist'));
  await fs.writeFile(path.join(root, 'dist', 'owner.txt'), 'keep\n');

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.equal(await fs.readFile(path.join(root, 'dist', 'owner.txt'), 'utf8'), 'keep\n');
  assert.equal((await fs.readdir(root)).some(name => name.startsWith('dist-backup-')), false);
});

test('public build strips only marked review UI and starts without review DOM nodes', async t => {
  const {parent, root} = await makeFixture();
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));
  await fs.writeFile(path.join(root, 'index.html'), '<!doctype html><main id="game-root"></main><!-- LOCAL_CAPTURE_UI_BEGIN --><aside class="review-tools"><button id="record">Record 20 seconds</button><a id="research-link" href="./research/portfolio.md">Discovery evidence</a></aside><!-- LOCAL_CAPTURE_UI_END -->\n');
  await fs.writeFile(path.join(root, 'src', 'app.js'), 'const root = document.getElementById("game-root"); root.textContent = "started"; /* LOCAL_CAPTURE_ONLY_BEGIN */ document.getElementById("record").addEventListener("click", () => {}); /* LOCAL_CAPTURE_ONLY_END */\n');
  await fs.writeFile(path.join(root, 'src', 'style.css'), '.game { display: block; } /* LOCAL_CAPTURE_ONLY_BEGIN */ .review-tools { display: flex; } /* LOCAL_CAPTURE_ONLY_END */\n');

  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  const html = await fs.readFile(path.join(root, 'dist', 'index.html'), 'utf8');
  const app = await fs.readFile(path.join(root, 'dist', 'src', 'app.js'), 'utf8');
  const css = await fs.readFile(path.join(root, 'dist', 'src', 'style.css'), 'utf8');
  for (const contents of [html, app, css]) {
    assert.doesNotMatch(contents, /LOCAL_CAPTURE_|review-tools|research-link|research\/portfolio\.md|record|Record 20 seconds/);
  }
  assert.match(html, /id="game-root"/);
  assert.match(app, /getElementById\("game-root"\)/);
  assert.match(css, /\.game \{ display: block; \}/);
  const syntax = spawnSync(process.execPath, ['--check', path.join(root, 'dist', 'src', 'app.js')], {encoding: 'utf8'});
  assert.equal(syntax.status, 0, syntax.stderr);

  const gameRoot = {textContent: ''};
  runInNewContext(app, {document: {getElementById(id) { return id === 'game-root' ? gameRoot : null; }}});
  assert.equal(gameRoot.textContent, 'started');
});

test('unbalanced review marker fails closed and leaves existing dist untouched', async t => {
  const {parent, root} = await makeFixture();
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));
  await fs.mkdir(path.join(root, 'dist'));
  await fs.writeFile(path.join(root, 'dist', 'owner.txt'), 'preserve\n');
  await fs.writeFile(path.join(root, 'src', 'app.js'), '/* LOCAL_CAPTURE_ONLY_BEGIN */ const review = true;\n');

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /unbalanced public-build markers/);
  assert.equal(await fs.readFile(path.join(root, 'dist', 'owner.txt'), 'utf8'), 'preserve\n');
  assert.equal((await fs.readdir(root)).some(name => name.startsWith('dist-backup-')), false);
});

test('public build rejects an unmarked reference to stripped review DOM', async t => {
  const {parent, root} = await makeFixture();
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));
  await fs.writeFile(path.join(root, 'index.html'), '<!doctype html><main id="game-root"></main><!-- LOCAL_CAPTURE_UI_BEGIN --><button id="record">Record 20 seconds</button><!-- LOCAL_CAPTURE_UI_END -->\n');
  await fs.writeFile(path.join(root, 'src', 'app.js'), 'const root = document.getElementById("game-root"); root.textContent = "started"; const recorder = $("record");\n');

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Internal review DOM reference remains/);
  assert.equal(await fs.stat(path.join(root, 'dist')).then(() => true, () => false), false);
});

test('release package rejects extra root and file fields in the build manifest', async t => {
  const {parent, root} = await makeFixture({withPackage: true});
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));
  for (const tamper of ['root', 'file']) {
    const extraField = tamper === 'root' ? ', unexpected: true' : ', internal: true';
    const buildStub = `import fs from 'node:fs/promises';\nimport path from 'node:path';\nimport {fileURLToPath} from 'node:url';\nimport {createHash} from 'node:crypto';\nconst root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');\nconst dist=path.join(root,'dist');\nawait fs.mkdir(dist,{recursive:true});\nconst bytes=Buffer.from('<!doctype html>\\n');\nawait fs.writeFile(path.join(dist,'index.html'),bytes);\nconst record={path:'index.html',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')${tamper === 'file' ? extraField : ''}};\nconst manifest={game:'game009',schema:1,files:[record]${tamper === 'root' ? extraField : ''}};\nawait fs.writeFile(path.join(dist,'manifest.json'),JSON.stringify(manifest,null,2)+'\\n');\n`;
    await fs.writeFile(path.join(root, 'tools', 'build.mjs'), buildStub);
    const result = run(root, 'tools/package.mjs');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, tamper === 'root' ? /unknown schema/ : /invalid file record/);
    assert.equal(await fs.stat(path.join(root, '.release-packs')).then(() => true, () => false), false);
  }
});

test('current production app has no review references and completes simulated startup without review DOM', async t => {
  const root = await makeCurrentAppFixture(t);
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);

  const index = await fs.readFile(path.join(root, 'dist', 'index.html'), 'utf8');
  const appPath = path.join(root, 'dist', 'src', 'app.js');
  const app = await fs.readFile(appPath, 'utf8');
  const ids = new Set([...index.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  const referencedIds = [...app.matchAll(/\$\('([^']+)'\)/g)].map(match => match[1]);
  assert.deepEqual([...new Set(referencedIds.filter(id => !ids.has(id)))], []);
  assert.match(await fs.readFile(path.join(root, 'tools', 'build.mjs'), 'utf8'), /\['index\.html','src\/app\.js','src\/style\.css','src\/common','src\/product','assets'\]/);
  const builtFiles = await walkRelative(path.join(root, 'dist'));
  const manifest = JSON.parse(await fs.readFile(path.join(root, 'dist', 'manifest.json'), 'utf8'));
  assert.deepEqual(builtFiles.filter(file => file !== 'manifest.json'), manifest.files.map(file => file.path).sort());
  assert.ok(!builtFiles.some(file => file.startsWith('src/games/')), 'the three R&D slices must not ship');
  assert.ok(builtFiles.includes('src/product/kiln-game.js') && builtFiles.includes('src/product/kiln-model.js') && builtFiles.includes('src/product/kiln-render.js'));
  const publicTextFiles = builtFiles.filter(file => /\.(?:html|js|css)$/i.test(file));
  for (const file of publicTextFiles) {
    const contents = await fs.readFile(path.join(root, 'dist', ...file.split('/')), 'utf8');
    for (const token of ['LOCAL_CAPTURE_', '/__review/', 'recording', 'pageLeaving', 'recordUrl', 'recordUploads', 'record-download', 'research-link', 'research/portfolio.md', 'Save frame']) {
      assert.equal(contents.includes(token), false, `public ${file} retained ${token}`);
    }
    assert.doesNotMatch(contents, /https?:\/\/|\b(?:fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|gtag|googletag|adsbygoogle|analytics)\b/i, `public ${file} retained a network or tracking call`);
  }
  assert.match(app, /function pause\(\)\{input\.cancel\(\)/);
  assert.match(app, /status==='interlude'.*input\.cancel\(\)/s);
  assert.match(app, /\['won','lost'\].includes\(next\.status\).*input\.cancel\(\)/s);
  const syntax = spawnSync(process.execPath, ['--check', appPath], {encoding: 'utf8'});
  assert.equal(syntax.status, 0, syntax.stderr);

  const sourceJs = builtFiles.filter(file => file.endsWith('.js'));
  for (const file of sourceJs) {
    const contents = await fs.readFile(path.join(root, 'dist', ...file.split('/')), 'utf8');
    const imports = [...contents.matchAll(/\b(?:import|export)\s+[^;]*?\s+from\s*['"]([^'"]+)['"]|\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g)].map(match => match[1] || match[2]);
    for (const specifier of imports) {
      assert.ok(specifier.startsWith('.'), `${file} has a non-local dependency: ${specifier}`);
      const target = path.resolve(root, 'dist', path.dirname(file), specifier);
      await fs.access(target);
    }
  }

  const bootstrap = String.raw`
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root = process.env.GAME009_FIXTURE;
const html = await fs.readFile(path.join(root, 'dist', 'index.html'), 'utf8');
const missing = [];
const errors = [];
class Element {
  constructor(id='created') { this.id=id; this.textContent=''; this.hidden=false; this.disabled=false; this.value='45'; this.checked=false; this.dataset={}; this.children=[]; this.style={setProperty(){}}; this.classList={toggle(){}}; }
  addEventListener(){} setAttribute(){} removeAttribute(){} append(child){this.children.push(child)} focus(){} showModal(){} close(){} setPointerCapture(){} getBoundingClientRect(){return {left:0,top:0,width:720,height:720}}
  getContext(){return context}
}
const elements = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], new Element(match[1])]));
const contextTarget = {canvas:null, measureText(text){return {width:String(text).length*12}}, createLinearGradient(){return {addColorStop(){}}}, createRadialGradient(){return {addColorStop(){}}}};
const context = new Proxy(contextTarget, {get(target,key){return key in target ? target[key] : ()=>{};}});
elements.get('board').getContext = () => context;
contextTarget.canvas = elements.get('board');
const document = {hidden:false, title:'', body:new Element('body'), documentElement:new Element('html'), getElementById(id){const element=elements.get(id); if(!element)missing.push(id); return element||null;}, querySelector(){return null}, createElement(){return new Element()}, addEventListener(){}};
const storage = new Map();
let networkAttempts=0;
Object.assign(globalThis, {document, window:{addEventListener(){}}, location:{hash:'',search:''}, fetch(){networkAttempts++;throw Error('unexpected network request')}, localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)}, requestAnimationFrame:()=>1, cancelAnimationFrame:()=>{}, setTimeout, clearTimeout});
const originalError=console.error; console.error=(...args)=>errors.push(args.map(String).join(' '));
await import(pathToFileURL(path.join(root, 'dist', 'src', 'app.js')));
await new Promise(resolve=>setTimeout(resolve,30));
assert.deepEqual(missing, []);
assert.equal(elements.get('start').disabled, false);
assert.equal(elements.get('title').textContent, '火種と釉');
assert.equal(elements.get('board').ariaLabel.includes('「くべる」を長押し'), true);
assert.equal(networkAttempts, 0, 'normal public startup makes no network call');
assert.deepEqual(errors, []);
console.error=originalError;
`;
  const runtime = spawnSync(process.execPath, ['--input-type=module', '-e', bootstrap], {cwd: root, encoding: 'utf8', env: {...process.env, GAME009_FIXTURE: root}, timeout: 15000});
  assert.equal(runtime.status, 0, `${runtime.stderr}\n${runtime.stdout}`);
});

test('release package is hash-addressed, reuses only verified bytes, and excludes local environment files', async t => {
  const {parent, root} = await makeFixture({withPackage: true});
  t.after(async () => fs.rm(parent, {recursive: true, force: true}));
  const ignoredInputs = [
    '.media-tools/ffmpeg.exe', '.cache/root.cache', 'research/.cache/research.cache',
    'docs/node_modules/ignored/index.js', 'qa/.venv/ignored.py', 'qa/env/ignored.py',
    'research/.env.local', 'docs/session.log', 'qa/.eslintcache', 'qa/__pycache__/ignored.pyc'
  ];
  for (const name of ignoredInputs) {
    const file = path.join(root, ...name.split('/'));
    await fs.mkdir(path.dirname(file), {recursive: true});
    await fs.writeFile(file, 'excluded local artifact\n');
  }

  const firstRun = run(root, 'tools/package.mjs');
  assert.equal(firstRun.status, 0, firstRun.stderr);
  const output = lastJson(firstRun.stdout);
  assert.equal(output.status, 'created');
  const firstPackage = output.path;
  assert.ok(firstPackage.startsWith(path.join(root, '.release-packs') + path.sep));
  assert.equal(await fs.readFile(path.join(firstPackage, 'source', 'index.html'), 'utf8'), '<!doctype html><script type="module" src="./src/app.js"></script>\n');
  assert.equal(await fs.readFile(path.join(firstPackage, 'build', 'src', 'app.js'), 'utf8'), 'export const value = 7;\n');
  assert.deepEqual(await fs.readFile(path.join(firstPackage, 'build', 'manifest.json')), await fs.readFile(path.join(root, 'dist', 'manifest.json')), 'the packaged build must retain its independently verifiable runtime manifest');
  const sourceFiles = await walkRelative(path.join(firstPackage, 'source'));
  assert.ok(!sourceFiles.some(name => ignoredInputs.includes(name)));
  assert.equal(sourceFiles.includes('.env'), false);
  assert.equal(sourceFiles.some(name => name.endsWith('.env.local') || name.endsWith('.log') || name.endsWith('.eslintcache') || name.endsWith('.pyc')), false);
  assert.equal(sourceFiles.some(name => name.split('/').some(part => ['.media-tools','.cache','node_modules','.venv','venv','env','__pycache__'].includes(part))), false);
  assert.equal(await fs.readFile(path.join(firstPackage, 'package-manifest.sha256'), 'utf8'), `${createHash('sha256').update(await fs.readFile(path.join(firstPackage, 'package-manifest.json'))).digest('hex')}  package-manifest.json\n`);

  const snapshot = await fs.readFile(path.join(firstPackage, 'package-manifest.json'));
  const packageManifest = JSON.parse(snapshot.toString('utf8'));
  const sourceHash = await treeHash(path.join(firstPackage, 'source'));
  const buildHash = await treeHash(path.join(firstPackage, 'build'), ['manifest.json']);
  assert.equal(packageManifest.sourceSha256, sourceHash);
  assert.equal(packageManifest.buildSha256, buildHash);
  assert.equal(packageManifest.packageId, createHash('sha256').update(`game009-release-v1\0${sourceHash}\0${buildHash}`).digest('hex'));
  assert.equal(await fs.readFile(path.join(firstPackage, 'baseline.sha256'), 'utf8'), `${sourceHash}  source/\n`);

  const secondRun = run(root, 'tools/package.mjs');
  assert.equal(secondRun.status, 0, secondRun.stderr);
  assert.match(secondRun.stdout, /"status": "existing-verified"/);
  assert.deepEqual(await fs.readFile(path.join(firstPackage, 'package-manifest.json')), snapshot);

  const manifestPath = path.join(firstPackage, 'package-manifest.json');
  const checksumPath = path.join(firstPackage, 'package-manifest.sha256');
  const metadataMutations = [
    ['createdBy', 'tampered', /unsupported schema/],
    ['sourceSha256', 'tampered', /provenance/],
    ['buildSha256', 'tampered', /provenance/],
    ['packageId', 'tampered', /provenance/],
    ['game', 'other', /unsupported schema/],
    ['schema', 2, /unsupported schema/],
    ['unexpected', true, /unsupported schema/]
  ];
  for (const [field, value, expectedError] of metadataMutations) {
    const metadataTamper = {...packageManifest, [field]: value};
    const tamperedManifest = Buffer.from(`${JSON.stringify(metadataTamper, null, 2)}\n`);
    await fs.writeFile(manifestPath, tamperedManifest);
    await fs.writeFile(checksumPath, `${createHash('sha256').update(tamperedManifest).digest('hex')}  package-manifest.json\n`);
    const metadataRun = run(root, 'tools/package.mjs');
    assert.notEqual(metadataRun.status, 0, `${field} metadata tamper was accepted`);
    assert.match(metadataRun.stderr, expectedError);
    assert.deepEqual(await fs.readFile(manifestPath), tamperedManifest);
    await fs.writeFile(manifestPath, snapshot);
    await fs.writeFile(checksumPath, `${createHash('sha256').update(snapshot).digest('hex')}  package-manifest.json\n`);
  }
  const recordTamper = {...packageManifest, files: packageManifest.files.map((record, index) => index === 0 ? {...record, sha256: 'tampered'} : record)};
  const recordTamperedBytes = Buffer.from(`${JSON.stringify(recordTamper, null, 2)}\n`);
  await fs.writeFile(manifestPath, recordTamperedBytes);
  await fs.writeFile(checksumPath, `${createHash('sha256').update(recordTamperedBytes).digest('hex')}  package-manifest.json\n`);
  const recordTamperedRun = run(root, 'tools/package.mjs');
  assert.notEqual(recordTamperedRun.status, 0);
  assert.match(recordTamperedRun.stderr, /modified or incomplete/);
  assert.deepEqual(await fs.readFile(manifestPath), recordTamperedBytes);
  await fs.writeFile(manifestPath, snapshot);
  await fs.writeFile(checksumPath, `${createHash('sha256').update(snapshot).digest('hex')}  package-manifest.json\n`);

  const originalFile = path.join(firstPackage, 'source', 'index.html');
  await fs.writeFile(originalFile, 'tampered\n');
  const tamperedRun = run(root, 'tools/package.mjs');
  assert.notEqual(tamperedRun.status, 0);
  assert.match(tamperedRun.stderr, /source snapshot hash does not match|modified or incomplete/);
  assert.equal(await fs.readFile(originalFile, 'utf8'), 'tampered\n');

  await fs.mkdir(path.join(root, 'docs'), {recursive: true});
  await fs.writeFile(path.join(root, 'docs', 'additional-record.md'), 'new source input\n');
  const changedRun = run(root, 'tools/package.mjs');
  assert.equal(changedRun.status, 0, changedRun.stderr);
  const changed = lastJson(changedRun.stdout);
  assert.equal(changed.status, 'created');
  assert.notEqual(changed.packageId, output.packageId);
  assert.deepEqual(await fs.readFile(path.join(firstPackage, 'package-manifest.json')), snapshot);
  assert.equal(await fs.readFile(path.join(changed.path, 'source', 'docs', 'additional-record.md'), 'utf8'), 'new source input\n');
});
