import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash, randomUUID} from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const realRoot = await fs.realpath(root);
const out = path.resolve(root, 'dist');

function assertChild(candidate, label) {
  const relative = path.relative(root, candidate);
  if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label} must be a child of the project root: ${candidate}`);
  }
  if (!candidate.startsWith(root + path.sep)) throw new Error(`${label} is outside the project root: ${candidate}`);
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function stripMarkedSections(source, startMarker, endMarker, label) {
  const startCount = source.split(startMarker).length - 1;
  const endCount = source.split(endMarker).length - 1;
  if (startCount !== endCount) throw new Error(`${label} has unbalanced public-build markers.`);
  let output = source;
  while (output.includes(startMarker)) {
    const start = output.indexOf(startMarker);
    const end = output.indexOf(endMarker, start + startMarker.length);
    const nestedStart = output.indexOf(startMarker, start + startMarker.length);
    if (end < 0 || (nestedStart >= 0 && nestedStart < end)) throw new Error(`${label} has nested or unbalanced public-build markers.`);
    output = output.slice(0, start) + output.slice(end + endMarker.length);
  }
  if (output.includes(endMarker)) throw new Error(`${label} has a stray public-build end marker.`);
  return output;
}

async function removeInternalReviewFeatures(stage) {
  const targets = [
    {path:'index.html', start:'<!-- LOCAL_CAPTURE_UI_BEGIN -->', end:'<!-- LOCAL_CAPTURE_UI_END -->'},
    {path:'src/app.js', start:'/* LOCAL_CAPTURE_ONLY_BEGIN */', end:'/* LOCAL_CAPTURE_ONLY_END */'},
    {path:'src/style.css', start:'/* LOCAL_CAPTURE_ONLY_BEGIN */', end:'/* LOCAL_CAPTURE_ONLY_END */'}
  ];
  for (const target of targets) {
    const file = path.join(stage, target.path);
    const source = await fs.readFile(file, 'utf8');
    const publicSource = stripMarkedSections(source, target.start, target.end, target.path);
    await fs.writeFile(file, publicSource);
  }
  const forbidden = ['LOCAL_CAPTURE_', 'review-tools', 'research-link', 'research/portfolio.md', '/__review/', 'record-download', 'recording', 'pageLeaving', 'recordUrl', 'recordUploads', '20秒を録画', 'Record 20 seconds', 'Save frame'];
  for (const file of await listFiles(stage)) {
    if (!/\.(?:html|js|css)$/i.test(file)) continue;
    const contents = await fs.readFile(file, 'utf8');
    const hit = forbidden.find(token => contents.includes(token));
    if (hit) throw new Error(`Internal review feature remains in public build file ${path.relative(stage, file)} (${hit}).`);
    if (/\$\s*\(\s*['"](?:record|record-download|research-link)['"]\s*\)|getElementById\s*\(\s*['"](?:record|record-download|research-link)['"]\s*\)/.test(contents)) {
      throw new Error(`Internal review DOM reference remains in public build file ${path.relative(stage, file)}.`);
    }
  }
}

async function assertNoSymlinks(target, required = false) {
  let stat;
  try { stat = await fs.lstat(target); }
  catch (error) {
    if (!required && error.code === 'ENOENT') return false;
    throw error;
  }
  if (stat.isSymbolicLink()) throw new Error(`Build input may not be a symbolic link: ${target}`);
  if (stat.isDirectory()) {
    for (const entry of await fs.readdir(target, {withFileTypes: true})) {
      const child = path.join(target, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Build input may not contain a symbolic link: ${child}`);
      if (entry.isDirectory()) await assertNoSymlinks(child, true);
      else if (!entry.isFile()) throw new Error(`Unsupported build input: ${child}`);
    }
  } else if (!stat.isFile()) {
    throw new Error(`Unsupported build input: ${target}`);
  }
  return true;
}

async function listFiles(dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(absolute));
    else if (entry.isFile()) files.push(absolute);
    else throw new Error(`Unsupported build output entry: ${absolute}`);
  }
  return files;
}

if (await fs.realpath(root) !== realRoot) throw new Error('Project root changed during build.');
assertChild(out, 'Build output');
await assertNoSymlinks(path.join(root, 'index.html'), true);
await assertNoSymlinks(path.join(root, 'src'), true);
await assertNoSymlinks(path.join(root, 'assets'));

const stage = path.resolve(root, `.dist-temp-${process.pid}-${randomUUID()}`);
assertChild(stage, 'Build staging path');
await fs.mkdir(stage);
let switched = false;
let previousDist = null;

try {
  // Keep this allowlist in sync with the local static-build verifier; review
  // and authoring materials do not belong in the runnable build.
  for (const entry of ['index.html','src/app.js','src/style.css','src/common','src/product','assets']) {
    const source = path.join(root, entry);
    if (['assets','src/common','src/product'].includes(entry)) {
      try { await fs.access(source); }
      catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    }
    await fs.mkdir(path.dirname(path.join(stage,entry)),{recursive:true});
    await fs.cp(source, path.join(stage, entry), {recursive: true, errorOnExist: true, force: false});
  }

  await removeInternalReviewFeatures(stage);

  const files = [];
  for (const absolute of await listFiles(stage)) {
    const bytes = await fs.readFile(absolute);
    files.push({
      path: path.relative(stage, absolute).replaceAll('\\','/'),
      bytes: bytes.length,
      sha256: sha256(bytes)
    });
  }
  files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  const manifest = {game: 'game009', schema: 1, files};
  await fs.writeFile(path.join(stage, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, {flag: 'wx'});

  try {
    const old = await fs.lstat(out);
    if (old.isSymbolicLink() || !old.isDirectory()) throw new Error(`Existing dist is not a regular directory; preserved at ${out}`);
    const stamp = new Date().toISOString().replaceAll(':','').replaceAll('.','');
    previousDist = path.resolve(root, `dist-backup-${stamp}-${randomUUID().slice(0,8)}`);
    assertChild(previousDist, 'Previous build backup path');
    await fs.rename(out, previousDist);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  try {
    await fs.rename(stage, out);
    switched = true;
  } catch (error) {
    if (previousDist) {
      try { await fs.rename(previousDist, out); previousDist = null; }
      catch (restoreError) {
        throw new Error(`Publish failed and the old dist could not be restored. Old dist remains at ${previousDist}; staging remains at ${stage}. ${restoreError.message}`, {cause: error});
      }
    }
    throw error;
  }

  const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
  console.log(JSON.stringify({status: 'built', files: files.length, bytes: totalBytes, manifest: path.join(out, 'manifest.json'), previousDist}, null, 2));
} catch (error) {
  if (!switched) console.error(`Build failed. Existing output was preserved; inspect any retained staging directory at ${stage}.`);
  throw error;
}
