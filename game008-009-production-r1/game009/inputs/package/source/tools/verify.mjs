import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {createStore, KEY, CAMPAIGN_ID, CAMPAIGN_MODE} from '../src/common/store.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const failures = [];
const warnings = [];
const checks = [];
const pass = (name, detail) => checks.push({name, detail});
const fail = (name, detail) => failures.push({name, detail});
const warn = (name, detail) => warnings.push({name, detail});
const read = async file => fs.readFile(path.join(root, file), 'utf8');
const exists = async file => { try { await fs.access(path.join(root, file)); return true; } catch { return false; } };

async function walk(base) {
  const output = [];
  async function visit(dir) {
    for (const entry of await fs.readdir(dir, {withFileTypes:true})) {
      const absolute = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symbolic link in built output: ${absolute}`);
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile()) output.push(path.relative(base, absolute).replaceAll('\\','/'));
      else throw new Error(`Unsupported built output entry: ${absolute}`);
    }
  }
  await visit(base);
  return output.sort();
}

function importsOf(source) {
  const specifiers = [];
  const patterns = [
    /\b(?:import|export)\s+[^;]*?\s+from\s*['"]([^'"]+)['"]/g,
    /\bimport\s*['"]([^'"]+)['"]/g,
    /\bimport\(\s*['"]([^'"]+)['"]\s*\)/g
  ];
  for (const pattern of patterns) for (const match of source.matchAll(pattern)) specifiers.push(match[1]);
  return [...new Set(specifiers)];
}

async function verifyImports(files, base) {
  let unresolved = 0;
  for (const file of files.filter(name => name.endsWith('.js'))) {
    const source = await fs.readFile(path.join(base, ...file.split('/')), 'utf8');
    if (/\bimport\s*\(\s*(?!['"])/.test(source)) {
      fail('runtime import graph', `${file} contains a computed dynamic import.`);
      unresolved++;
    }
    for (const specifier of importsOf(source)) {
      if (!specifier.startsWith('.')) {
        fail('runtime import graph', `${file} imports non-local module ${specifier}.`);
        unresolved++;
        continue;
      }
      const target = path.resolve(base, path.dirname(file), specifier);
      const relative = path.relative(base, target);
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        fail('runtime import graph', `${file} escapes the runtime root through ${specifier}.`);
        unresolved++;
        continue;
      }
      try { await fs.access(target); }
      catch { fail('runtime import graph', `${file} has unresolved import ${specifier}.`); unresolved++; }
    }
  }
  if (!unresolved) pass('runtime import graph', 'Every built JavaScript import resolves inside dist.');
}

try {
  const buildScript = await read('tools/build.mjs');
  const expectedAllowlist = "['index.html','src/app.js','src/style.css','src/common','src/product','assets']";
  if (buildScript.includes(expectedAllowlist) && !/['"]src\/games['"]/.test(buildScript)) {
    pass('build allowlist', 'The builder copies only the single-game shell, shared runtime, product modules, and optional assets.');
  } else fail('build allowlist', `Expected ${expectedAllowlist} and no legacy src/games entry.`);

  const packageJson = JSON.parse(await read('package.json'));
  if (Object.keys(packageJson.dependencies || {}).length || Object.keys(packageJson.devDependencies || {}).length) {
    fail('runtime dependency footprint', 'package.json declares npm dependencies; inspect them before release.');
  } else pass('runtime dependency footprint', 'No npm runtime or development dependencies are declared.');

  const sourceRoot = path.join(root, 'src');
  const sourceRuntime = ['app.js','style.css'];
  for (const directory of ['common','product']) {
    const base = path.join(sourceRoot, directory);
    try { for (const file of await walk(base)) sourceRuntime.push(`${directory}/${file}`); }
    catch (error) { fail('source runtime inventory', error.message); }
  }
  const sourceJs = sourceRuntime.filter(file => file.endsWith('.js'));
  await verifyImports(sourceJs, sourceRoot);

  if (!await exists('dist/manifest.json')) {
    fail('built output', 'Run `npm run build` before verifying the public product.');
  } else {
    const actual = await walk(dist);
    const manifest = JSON.parse(await fs.readFile(path.join(dist,'manifest.json'),'utf8'));
    if (manifest.game !== 'game009' || manifest.schema !== 1 || !Array.isArray(manifest.files)) {
      fail('build manifest', 'The public build manifest has the wrong game identity or schema.');
    } else {
      const paths = manifest.files.map(file => file.path);
      if (new Set(paths).size !== paths.length || actual.filter(file => file !== 'manifest.json').join('\n') !== [...paths].sort().join('\n')) {
        fail('build manifest', 'The manifest file list does not exactly match the built directory.');
      } else {
        let integrityOk = true;
        for (const record of manifest.files) {
          if (typeof record.path !== 'string' || record.path.startsWith('/') || record.path.split('/').includes('..') || !Number.isInteger(record.bytes) || !/^[a-f0-9]{64}$/.test(record.sha256)) {
            integrityOk = false;
            fail('build integrity', `Invalid manifest record: ${JSON.stringify(record)}`);
            continue;
          }
          const bytes = await fs.readFile(path.join(dist,...record.path.split('/')));
          if (bytes.length !== record.bytes || createHash('sha256').update(bytes).digest('hex') !== record.sha256) {
            integrityOk = false;
            fail('build integrity', `Byte count or SHA-256 mismatch for ${record.path}.`);
          }
        }
        if (integrityOk) pass('build integrity', 'Every listed public file matches its byte count and SHA-256.');
      }
    }

    const allowedFile = file => file === 'index.html' || file === 'manifest.json' || file === 'src/app.js' || file === 'src/style.css'
      || file.startsWith('src/common/') || file.startsWith('src/product/') || file.startsWith('assets/');
    const outsideAllowlist = actual.filter(file => !allowedFile(file));
    if (outsideAllowlist.length) fail('public build contents', `Files fall outside the public allowlist: ${outsideAllowlist.join(', ')}`);
    else pass('public build contents', 'Only the single product and explicitly allowed assets are deployed.');
    if (actual.some(file => file.startsWith('src/games/'))) fail('legacy slices excluded', 'A standalone discovery slice is present in dist.');
    else pass('legacy slices excluded', 'None of the three discovery slices is present in dist.');

    const runtimeFiles = actual.filter(file => /\.(?:html|js|css)$/i.test(file));
    const publicText = new Map();
    for (const file of runtimeFiles) publicText.set(file, await fs.readFile(path.join(dist,...file.split('/')),'utf8'));
    const forbidden = ['LOCAL_CAPTURE_', '/__review/', 'recording', 'recordUrl', 'recordUploads', 'record-download', 'research-link', 'research/portfolio.md', 'Save frame'];
    for (const [file, source] of publicText) {
      for (const token of forbidden) if (source.includes(token)) fail('review tools stripped', `${file} retains ${token}.`);
    }
    if (!runtimeFiles.some(file => forbidden.some(token => publicText.get(file).includes(token)))) pass('review tools stripped', 'Review capture controls, upload routes, and research links are absent from the public build.');

    const external = /https?:\/\/|\b(?:fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|serviceWorker|gtag|googletag|adsbygoogle|analytics)\b/i;
    for (const [file, source] of publicText) if (external.test(source)) fail('network and tracking boundary', `${file} contains an external URL, request API, ad, or analytics reference.`);
    if (![...publicText.values()].some(source => external.test(source))) pass('network and tracking boundary', 'Public HTML, CSS, and JavaScript contain no network client or ad/analytics calls.');

    const builtJs = actual.filter(file => file.endsWith('.js'));
    await verifyImports(builtJs, dist);
    const html = publicText.get('index.html') || '';
    const css = publicText.get('src/style.css') || '';
    let brokenAssets = 0;
    const refs = [
      ...[...html.matchAll(/\b(?:src|href)\s*=\s*['"]([^'"]+)['"]/g)].map(match => match[1]),
      ...[...css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map(match => match[1])
    ];
    for (const ref of refs) {
      if (/^(?:#|data:|blob:|mailto:|tel:)/i.test(ref)) continue;
      if (/^[a-z][a-z0-9+.-]*:/i.test(ref) || ref.startsWith('/')) { fail('public assets', `Non-local asset reference ${ref}.`); brokenAssets++; continue; }
      const target = path.resolve(dist, ref.split(/[?#]/)[0]);
      const relative = path.relative(dist,target);
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || !actual.includes(relative.replaceAll('\\','/'))) {
        fail('public assets', `Missing or escaping asset reference ${ref}.`);
        brokenAssets++;
      }
    }
    if (!brokenAssets) pass('public assets', 'HTML and CSS asset references resolve inside dist.');
    const required = ['src/app.js','src/common/audio.js','src/common/input.js','src/common/store.js','src/product/kiln-game.js','src/product/kiln-model.js','src/product/kiln-render.js'];
    for (const file of required) if (!actual.includes(file)) fail('single product modules', `${file} is missing from the public build.`);
    if (required.every(file => actual.includes(file))) pass('single product modules', 'The full product shell, shared runtime, thermal game, and renderer are deployed.');

    const app = publicText.get('src/app.js') || '';
    if (!/function pause\(\)\{input\.cancel\(\)/.test(app)) fail('pause lifecycle', 'Pause must cancel active input sources.');
    else pass('pause lifecycle', 'Pause releases held input before stopping the game.');
    if (!/function frame\(time\).*if\(playable\(\)\)\{elapsed\+=dt;game\.step\(dt\);\}/s.test(app)) fail('paused time lifecycle', 'Frame time must advance only while gameplay is active.');
    else pass('paused time lifecycle', 'Paused, interlude, and result states do not advance firing time.');
    if (!/if\(\['won','lost'\]\.includes\(next\.status\).*input\.cancel\(\)/s.test(app)) fail('terminal input lifecycle', 'A firing result must release held input.');
    else pass('terminal input lifecycle', 'Won and lost results release active input.');
  }

  const server = await read('tools/server.mjs');
  if (!server.includes("server.listen(port,'127.0.0.1'") || !server.includes("req.headers.origin!==`http://127.0.0.1:${port}`") || !server.includes("req.headers.host!==`127.0.0.1:${port}`") || !server.includes("size>45_000_000") || !server.includes("flag:'wx'")) {
    fail('local capture boundary', 'Development capture must remain loopback-only, same-origin, size-bounded, and create-only.');
  } else pass('local capture boundary', 'Internal recording capture is limited to bounded loopback development requests.');

  const memory = {raw:null,getItem(){return this.raw;},setItem(key,value){if(key!==KEY)throw Error('wrong namespace');this.raw=value;}};
  const store = createStore(memory);
  let saveOk = store.startCampaign({seed:9,runId:'verify-run'});
  saveOk = saveOk && store.checkpointCampaign({runId:'verify-run',seed:9,stage:1,qualities:[75]});
  saveOk = saveOk && store.checkpointCampaign({runId:'verify-run',seed:9,stage:2,qualities:[75,80]});
  saveOk = saveOk && store.completeCampaign({runId:'verify-run',score:230});
  const reread = createStore(memory);
  if (!saveOk || reread.state.resume !== null || reread.state.bests[CAMPAIGN_ID] !== 230 || !reread.state.completed.includes(CAMPAIGN_ID)) {
    fail('campaign save invariants', 'Version-one campaign chapter saves or guarded completion failed readback.');
  } else pass('campaign save invariants', 'Chapter resume and 0–300 best completion survive a new store read.');

  const corruptRaw = '{"version":2,"future":true}';
  const corruptMemory = {raw:corruptRaw,getItem(){return this.raw;},setItem(key,value){this.raw=value;}};
  const corrupt = createStore(corruptMemory);
  if (corrupt.status !== 'corrupt-preserved' || corrupt.update({language:'en'}) !== false || corrupt.backup() !== corruptRaw || corruptMemory.raw !== corruptRaw) {
    fail('corrupt save preservation', 'Ordinary writes must leave unreadable or future save bytes unchanged.');
  } else pass('corrupt save preservation', 'Invalid version-one and future save bytes remain intact until an explicit reset.');

  const source = await read('src/app.js');
  if (/LOCAL_CAPTURE_ONLY_BEGIN/.test(source) && /LOCAL_CAPTURE_ONLY_END/.test(source)) pass('source review boundaries', 'Development-only recording controls remain explicitly bounded in source.');
  else warn('source review boundaries', 'No source capture markers were found; verify whether local review recording was intentionally removed.');
} catch (error) {
  fail('verifier execution', error.message);
}

for (const check of checks) console.log(`PASS ${check.name}: ${check.detail}`);
for (const warning of warnings) console.warn(`WARN ${warning.name}: ${warning.detail}`);
for (const failure of failures) console.error(`FAIL ${failure.name}: ${failure.detail}`);
console.log(JSON.stringify({pass:checks.length,warnings:warnings.length,failures:failures.length}));
if (failures.length) process.exitCode = 1;
