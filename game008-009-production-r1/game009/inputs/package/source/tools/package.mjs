import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash, randomUUID} from 'node:crypto';
import {spawnSync} from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const releaseRoot = path.resolve(root, '.release-packs');
const excludedDirectories = new Set(['.git','.release-packs','.package-validation','deliverables','.portal-integration','dist','node_modules','.cache','.media-tools','coverage','.venv','venv','env','__pycache__','.pytest_cache','.mypy_cache','.ruff_cache','.vite','.next','.turbo','.parcel-cache','.npm','.pnpm-store','.playwright','.wrangler']);
const excludedPrefixes = ['.dist-temp-','dist-backup-','.pack-temp-'];
const excludedFiles = name => /^\.env(?:\.|$)/i.test(name) || /\.log$/i.test(name) || name === '.eslintcache' || name.endsWith('.pyc');

function assertChild(candidate, label) {
  const absolute = path.resolve(candidate);
  const relative = path.relative(root, absolute);
  if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || !absolute.startsWith(root + path.sep)) {
    throw new Error(`${label} must be a child of the project root: ${candidate}`);
  }
  return absolute;
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function collectFiles(base, {skipGenerated = false} = {}) {
  const files = [];
  async function walk(directory) {
    const entries = await fs.readdir(directory, {withFileTypes: true});
    entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    for (const entry of entries) {
      if (entry.name === '.' || entry.name === '..') continue;
      if (entry.isDirectory() && (excludedDirectories.has(entry.name) || excludedPrefixes.some(prefix => entry.name.startsWith(prefix)))) continue;
      if (entry.isFile() && excludedFiles(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Release package refuses symbolic links: ${absolute}`);
      if (entry.isDirectory()) await walk(absolute);
      else if (entry.isFile()) {
        const relative = path.relative(base, absolute).replaceAll('\\','/');
        files.push({absolute, path: relative});
      } else throw new Error(`Unsupported release input: ${absolute}`);
    }
  }
  await walk(base);
  files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  return files;
}

function treeHash(entries) {
  const hash = createHash('sha256');
  for (const entry of entries) {
    const name = Buffer.from(entry.path.replaceAll('\\','/'), 'utf8');
    hash.update(name).update(Buffer.from([0]));
    hash.update(entry.bytes).update(Buffer.from([0]));
  }
  return hash.digest('hex');
}

async function hashedEntries(base) {
  const entries = [];
  for (const file of await collectFiles(base)) {
    const bytes = await fs.readFile(file.absolute);
    entries.push({path: file.path, bytes, size: bytes.length, sha256: sha256(bytes)});
  }
  return entries;
}

async function verifyBuiltDist(distInput = path.join(root, 'dist')) {
  const dist = assertChild(distInput, 'Build output');
  const stat = await fs.lstat(dist);
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`Build output is not a regular directory: ${dist}`);
  const rawManifest = await fs.readFile(path.join(dist, 'manifest.json'), 'utf8');
  const manifest = JSON.parse(rawManifest);
  if (Object.keys(manifest).sort().join('\0') !== ['files','game','schema'].join('\0') || manifest.game !== 'game009' || manifest.schema !== 1 || !Array.isArray(manifest.files)) throw new Error('The build manifest has an unknown schema.');
  const actual = await collectFiles(dist);
  const expected = new Map();
  let previousPath = null;
  for (const file of manifest.files) {
    if (Object.keys(file).sort().join('\0') !== ['bytes','path','sha256'].join('\0') || !Number.isSafeInteger(file.bytes) || file.bytes < 0 || typeof file.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(file.sha256)) {
      throw new Error('The build manifest has an invalid file record.');
    }
    if (typeof file.path !== 'string' || path.posix.isAbsolute(file.path) || file.path.split('/').some(part => !part || part === '.' || part === '..') || expected.has(file.path)) {
      throw new Error(`Unsafe or duplicate build manifest path: ${file.path}`);
    }
    if (previousPath !== null && previousPath >= file.path) throw new Error('The build manifest file list is not in canonical path order.');
    previousPath = file.path;
    expected.set(file.path, file);
  }
  const actualPayload = actual.filter(file => file.path !== 'manifest.json');
  if (actualPayload.length !== expected.size) throw new Error('Build output and manifest file counts differ.');
  const entries = [];
  for (const file of actualPayload) {
    const record = expected.get(file.path);
    if (!record) throw new Error(`Build file is missing from its manifest: ${file.path}`);
    const bytes = await fs.readFile(file.absolute);
    if (record.bytes !== bytes.length || record.sha256 !== sha256(bytes)) throw new Error(`Build hash mismatch: ${file.path}`);
    entries.push({path: file.path, bytes});
  }
  return {dist, entries, digest: treeHash(entries)};
}

async function payloadRecords(directory) {
  const records = [];
  for (const file of await collectFiles(directory)) {
    if (file.path === 'package-manifest.json' || file.path === 'package-manifest.sha256') continue;
    const bytes = await fs.readFile(file.absolute);
    records.push({path: file.path, bytes: bytes.length, sha256: sha256(bytes)});
  }
  return records;
}

async function verifyExisting(target, packageId, sourceHash, buildHash) {
  const stat = await fs.lstat(target);
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`Existing package path is not a regular directory: ${target}`);
  const manifestBytes = await fs.readFile(path.join(target, 'package-manifest.json'));
  const manifest = JSON.parse(manifestBytes.toString('utf8'));
  const manifestFields = ['buildSha256','createdBy','files','game','packageId','schema','sourceSha256'];
  if (Object.keys(manifest).sort().join('\0') !== manifestFields.join('\0') || manifest.game !== 'game009' || manifest.schema !== 1 || manifest.createdBy !== 'tools/package.mjs' || !Array.isArray(manifest.files)) {
    throw new Error(`Existing package manifest has an unsupported schema; it has been preserved at ${target}`);
  }
  const expectedId = sha256(Buffer.from(`game009-release-v1\0${sourceHash}\0${buildHash}`, 'utf8'));
  if (manifest.packageId !== packageId || manifest.packageId !== expectedId || manifest.sourceSha256 !== sourceHash || manifest.buildSha256 !== buildHash) {
    throw new Error(`Existing package provenance does not match the source/build snapshot; it has been preserved at ${target}`);
  }
  const archivedSource = await hashedEntries(path.join(target, 'source'));
  if (treeHash(archivedSource) !== sourceHash) throw new Error(`Existing package source snapshot hash does not match; it has been preserved at ${target}`);
  const archivedBuild = await verifyBuiltDist(path.join(target, 'build'));
  if (archivedBuild.digest !== buildHash) throw new Error(`Existing package build snapshot hash does not match; it has been preserved at ${target}`);
  const baseline = await fs.readFile(path.join(target, 'baseline.sha256'), 'utf8');
  if (baseline !== `${sourceHash}  source/\n`) throw new Error(`Existing package baseline record does not match; it has been preserved at ${target}`);
  const expected = [...manifest.files].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  const actual = await payloadRecords(target);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Existing package is modified or incomplete; it has been preserved at ${target}`);
  const checksum = await fs.readFile(path.join(target, 'package-manifest.sha256'), 'utf8');
  if (checksum !== `${sha256(manifestBytes)}  package-manifest.json\n`) throw new Error(`Existing package manifest checksum does not match; it has been preserved at ${target}`);
  return manifest;
}

// Always publish a just-built runtime. tools/build.mjs stages and atomically
// swaps dist; any previous dist is retained in a timestamped sibling folder.
const build = spawnSync(process.execPath, [path.join(root, 'tools', 'build.mjs')], {cwd: root, stdio: 'inherit'});
if (build.error) throw build.error;
if (build.status !== 0) throw new Error(`Build step failed with exit code ${build.status}.`);
const built = await verifyBuiltDist();
const sourceFiles = await collectFiles(root);
const sourceEntries = [];
for (const file of sourceFiles) sourceEntries.push({path: file.path, bytes: await fs.readFile(file.absolute)});
const sourceHash = treeHash(sourceEntries);
const packageId = sha256(Buffer.from(`game009-release-v1\0${sourceHash}\0${built.digest}`, 'utf8'));

assertChild(releaseRoot, 'Release package directory');
await fs.mkdir(releaseRoot, {recursive: false}).catch(error => {
  if (error.code !== 'EEXIST') throw error;
});
const releaseRootStat = await fs.lstat(releaseRoot);
if (releaseRootStat.isSymbolicLink() || !releaseRootStat.isDirectory()) throw new Error(`Release package directory must be a regular directory: ${releaseRoot}`);
const target = assertChild(path.join(releaseRoot, packageId), 'Release package output');
let existingPackage = null;
try { existingPackage = await fs.lstat(target); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
if (existingPackage) {
  if (!existingPackage.isDirectory() || existingPackage.isSymbolicLink()) throw new Error(`Existing release package path is not a regular directory: ${target}`);
  const manifest = await verifyExisting(target, packageId, sourceHash, built.digest);
  console.log(JSON.stringify({status: 'existing-verified', packageId, sourceSha256: sourceHash, path: target, files: manifest.files.length}, null, 2));
} else {

const stage = assertChild(path.join(releaseRoot, `.pack-temp-${process.pid}-${randomUUID()}`), 'Package staging path');
await fs.mkdir(stage);
const sourceDestination = path.join(stage, 'source');
const buildDestination = path.join(stage, 'build');
await fs.mkdir(sourceDestination);
await fs.mkdir(buildDestination);

for (const file of sourceEntries) {
  const destination = path.join(sourceDestination, file.path);
  assertChild(destination, 'Source package file');
  await fs.mkdir(path.dirname(destination), {recursive: true});
  await fs.writeFile(destination, file.bytes, {flag: 'wx'});
}
for (const entry of built.entries) {
  const destination = path.join(buildDestination, entry.path);
  assertChild(destination, 'Build package file');
  await fs.mkdir(path.dirname(destination), {recursive: true});
  await fs.writeFile(destination, entry.bytes, {flag: 'wx'});
}
await fs.writeFile(path.join(buildDestination, 'manifest.json'), await fs.readFile(path.join(built.dist, 'manifest.json')), {flag: 'wx'});

const packageReadme = [
  '# Game009 local release package',
  '',
  `Package ID: \`${packageId}\``,
  `Baseline source SHA-256: \`${sourceHash}\``,
  `Build SHA-256: \`${built.digest}\``,
  '',
  'This directory is a create-only local snapshot. Its identifier is derived from the source snapshot and packaged static build. Existing hash-named output is verified and never rewritten.',
  '',
  '## Contents',
  '',
  '- `source/`: source, research, design, review, QA, marketing, and project records present when packaged; local environment files and generated build/package outputs are excluded.',
  '- `build/`: static site and deterministic SHA-256 manifest.',
  '- `baseline.sha256`: source snapshot hash used by this package ID.',
  '- `package-manifest.json`: file-level size and SHA-256 inventory for every other package file.',
  '- `package-manifest.sha256`: SHA-256 of the package manifest.',
  '',
  '## Rebuild',
  '',
  'From `source/` with Node.js 22 or later, run `npm test`, `npm run build`, then `npm run verify`. To create another immutable local package, run `node tools/package.mjs`. The package command rebuilds `dist`, preserves an existing build as a timestamped `dist-backup-*` directory, and creates a new hash-named package when inputs change.',
  '',
  'Creating this local package is not evidence of Human acceptance, rights clearance beyond the included rights record, a hosted listing, or a Production deployment. Read the included QA and known-limitations records for the state represented by this snapshot.',
  ''
].join('\n');
await fs.writeFile(path.join(stage, 'PACKAGE-README.md'), packageReadme, {flag: 'wx'});
await fs.writeFile(path.join(stage, 'baseline.sha256'), `${sourceHash}  source/\n`, {flag: 'wx'});

const files = await payloadRecords(stage);
const packageManifest = {
  schema: 1,
  game: 'game009',
  packageId,
  sourceSha256: sourceHash,
  buildSha256: built.digest,
  createdBy: 'tools/package.mjs',
  files
};
const manifestBytes = Buffer.from(`${JSON.stringify(packageManifest, null, 2)}\n`, 'utf8');
await fs.writeFile(path.join(stage, 'package-manifest.json'), manifestBytes, {flag: 'wx'});
await fs.writeFile(path.join(stage, 'package-manifest.sha256'), `${sha256(manifestBytes)}  package-manifest.json\n`, {flag: 'wx'});

try {
  await fs.rename(stage, target);
} catch (error) {
  throw new Error(`Package publish failed. The prior package state was preserved; inspect staging at ${stage}. ${error.message}`, {cause: error});
}
console.log(JSON.stringify({status: 'created', packageId, sourceSha256: sourceHash, buildSha256: built.digest, path: target, files: files.length}, null, 2));
}
