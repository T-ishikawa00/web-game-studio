// Publication candidate pins map to sanitized history; historical manifest bytes and original IDs remain evidence.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
export const PIN = Object.freeze({
  key:'five', title:'Tinlumo 2026-09-27 / 5 games',
  repository: 'T-ishikawa00/web-game-studio',
  releaseCommit: 'be4989a8f232024c1a351db35dc7db42bae3e5c5',
  preservedMainBasis: '4969bd5f5de0e292641b33f846f59d901bf233df',
  archiveCommit: '9a5c2e9e5f724dfd5a1b76fdd93d732a73a13b36',
  artifact: 'release-artifacts/tinlumo-copy-debt-r1',
  manifest: 'tinlumo-copy-debt-r1/internal/distribution.json',
  manifestBlob: 'abc06c362b4b036714a72a029e1f6df08a1dd2bd',
  artifactTree: '7a00e6e39619c558dbd17410e0af4ddc617dbff8',
  files: 102, served: 101, routes: 39,
});
export const FINAL_PIN=Object.freeze({...PIN,key:'final',title:'Tinlumo final Git preservation / 8 games (not byte-identical historical distribution)',releaseCommit:'4969bd5f5de0e292641b33f846f59d901bf233df',artifact:'tinlumo-visual-remaster-final-integration-r1/builds/candidate',manifest:'tinlumo-visual-remaster-final-integration-r1/CANDIDATE_MANIFEST.json',manifestBlob:'b9762053c1d6973fea0543e0cb5246828123b2ed',snapshotManifestBlob:'9fcd39d40bf134e5d956100088634c07ca672420',artifactTree:'4ec6ab85edc4882a57a55664061f4d1a837d114e',files:248,served:247,routes:51});
export function getPin(key='five'){if(key==='five')return PIN;if(key==='final')return FINAL_PIN;throw Error('Choose --release five or --release final');}
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export const gitBlob = bytes => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
export const GUARD_TAG='<script src="/__local_preview_guard.js"></script>';
export function originalHtmlFromResponse(bytes) {
  const html=bytes.toString('utf8');
  if(html.split(GUARD_TAG).length!==2)throw Error('Exactly one local safety guard is required');
  return Buffer.from(html.replace(GUARD_TAG,''));
}
export function safeRelative(s) {
  if (typeof s !== 'string' || !s || s.includes('\\') || /[\x00-\x1f:#?]/.test(s) || path.posix.isAbsolute(s) || s.split('/').some(x => !x || x === '.' || x === '..' || x.startsWith('.'))) throw Error('Unsafe manifest path');
  return s;
}
export function validateManifest(m, strict = true, pin=PIN) {
  if (!m || !Array.isArray(m.files) || !Array.isArray(m.routes)) throw Error('Invalid manifest');
  const seen = new Set();
  for (const e of m.files) {
    safeRelative(e.file);
    if (seen.has(e.file.toLowerCase())) throw Error('Duplicate/case-colliding manifest path');
    seen.add(e.file.toLowerCase());
    if (!Number.isSafeInteger(e.bytes) || e.bytes < 0 || !/^[a-f0-9]{64}$/.test(e.sha256)) throw Error('Invalid manifest hash/size');
  }
  if (strict && (m.root !== pin.artifact || m.files.length !== pin.files || m.routes.length !== pin.routes)) throw Error('Unexpected release identity or count');
  if (strict && !seen.has('_headers')) throw Error('Expected _headers missing');
  for (const route of m.routes) {
    if (typeof route !== 'string' || !route.startsWith('/') || !route.endsWith('/') || route.includes('..') || route.includes('\\') || route.includes('?')) throw Error('Unsafe route');
    const file = route.slice(1) + 'index.html';
    if (!m.files.some(e => e.file === file)) throw Error('Route has no manifest HTML');
  }
  return m;
}
export function readVerifiedSnapshot(root, strict = true) {
  const manifestPath = path.join(root, 'evidence', 'distribution.original.json');
  const raw = fs.readFileSync(manifestPath);
  const pin=[PIN,FINAL_PIN].find(p=>(p.snapshotManifestBlob??p.manifestBlob)===gitBlob(raw));
  if (strict && !pin) throw Error('Original manifest blob differs');
  const m = validateManifest(JSON.parse(raw), strict,pin);
  const publicRoot = fs.realpathSync(path.join(root, 'public'));
  const files = new Map();
  for (const e of m.files) {
    const fp = path.join(publicRoot, ...e.file.split('/'));
    const st = fs.lstatSync(fp);
    if (!st.isFile() || st.isSymbolicLink()) throw Error('Not an ordinary snapshot file');
    const resolved = fs.realpathSync(fp);
    if (!resolved.startsWith(publicRoot + path.sep)) throw Error('Snapshot path escapes root');
    const bytes = fs.readFileSync(fp);
    if (bytes.length !== e.bytes || sha256(bytes) !== e.sha256) throw Error(`Snapshot mismatch: ${e.file}`);
    files.set(e.file, bytes);
  }
  return {manifest:m, files,pin};
}
