import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const mode = process.argv[2];
if (!['all', 'staged', 'history'].includes(mode)) {
  console.error('Usage: node scripts/security-scan.mjs all|staged|history');
  process.exit(2);
}
process.chdir(root);
const output = path.join(root, '.tmp/security-r1');
mkdirSync(output, { recursive: true });
let snapshot;
const git = args => {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 64 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error('Git inspection failed; scan blocked.');
  return result.stdout;
};
const report = (status, findings = [], extra = {}) => {
  const summary = { mode, status, scanner: 'gitleaks 8.30.1', findings, ...extra };
  writeFileSync(path.join(output, `${mode}.summary.json`), JSON.stringify(summary, null, 2) + '\n');
  console.log(JSON.stringify(summary));
};
try {
  const gitRoot = git(['rev-parse', '--show-toplevel']).trim();
  if (path.resolve(gitRoot).toLowerCase() !== path.resolve(root).toLowerCase()) throw new Error('Unexpected repository root.');
  const localBinary = path.join(root, '.cache/tools/gitleaks/8.30.1', process.platform === 'win32' ? 'gitleaks.exe' : 'gitleaks');
  const binary = existsSync(localBinary) ? localBinary : 'gitleaks';
  const version = spawnSync(binary, ['version'], { encoding: 'utf8', windowsHide: true });
  if (version.error || version.status !== 0 || version.stdout.trim() !== '8.30.1') throw new Error('Install Gitleaks 8.30.1 before committing.');
  const fingerprints = [];
  if (mode === 'all') {
    const exceptions = JSON.parse(readFileSync(path.join(root, 'scripts/security-public-exceptions.json'), 'utf8'));
    for (const entry of exceptions) {
      if (!existsSync(entry.file)) continue;
      const digest = createHash('sha256').update(readFileSync(entry.file)).digest('hex');
      if (digest !== entry.sha256) throw new Error('Approved upstream file changed; exception review required.');
      for (const finding of entry.findings) fingerprints.push(`${entry.file}${entry.member ?? ''}:${finding}`);
    }
  }
  // Explicit ignore file prevents implicit .gitleaksignore suppression. Only all
  // mode uses Human-approved, byte-verified upstream exceptions; index/history use none.
  const ignorePath = path.join(output, `${mode}.ignore`);
  writeFileSync(ignorePath, fingerprints.join('\n') + '\n');
  let target = '.';
  if (mode === 'staged') {
    const entries = git(['ls-files', '--stage', '-z']).split('\0').filter(Boolean).map(entry => {
      const split = entry.indexOf('\t');
      const [mode, oid, stage] = entry.slice(0, split).split(' ');
      return { mode, oid, stage, file: entry.slice(split + 1) };
    });
    if (!entries.length) throw new Error('Empty index; nothing scanned.');
    const blocked = entries.flatMap(entry => {
      const parts = entry.file.toLowerCase().split('/');
      const base = parts.at(-1);
      const example = base === '.env.example' || base === '.dev.vars.example';
      const sensitive = !example && (/^\.env(?:\.|$)/.test(base) || /^\.dev\.vars(?:\.|$)/.test(base) || base === '.envrc');
      const privateFile = /\.(pem|key|p12|pfx)$/.test(base) || base === 'credentials.json' || /^service-account.*\.json$/.test(base);
      const localDir = parts.some(p => ['.cache', '.tmp', '.wrangler', '.secrets', 'node_modules'].includes(p));
      const unsafeMode = !['100644', '100755'].includes(entry.mode) || entry.stage !== '0';
      if (sensitive || privateFile || localDir || unsafeMode) return [{ file: entry.file, type: 'forbidden-index-entry', action: 'REVIEW REQUIRED' }];
      if (example) {
        const content = git(['show', `:${entry.file}`]);
        if (content.split(/\r?\n/).some(line => line.trim() && !line.trim().startsWith('#') && !/^[A-Za-z_][A-Za-z0-9_]*=\s*$/.test(line))) {
          return [{ file: entry.file, type: 'nonempty-secret-template', action: 'REVIEW REQUIRED' }];
        }
      }
      return [];
    });
    if (blocked.length) { report('FAIL', blocked); process.exit(1); }
    // Full index contents, including unchanged files; never scan only a diff.
    // Temporary snapshots are ignored and project-local; only our snapshot is removed.
    target = mkdtempSync(path.join(output, 'index-'));
    snapshot = target;
    for (const entry of entries) {
      const destination = path.resolve(target, entry.file);
      if (!destination.startsWith(path.resolve(target) + path.sep)) throw new Error('Unsafe index path.');
      const blob = spawnSync('git', ['cat-file', 'blob', entry.oid], { cwd: root, windowsHide: true, maxBuffer: 64 * 1024 * 1024 });
      if (blob.error || blob.status !== 0) throw new Error('Cannot read indexed blob; scan blocked.');
      mkdirSync(path.dirname(destination), { recursive: true });
      writeFileSync(destination, blob.stdout);
    }
  }
  const args = mode === 'history' ? ['git', root, '--log-opts=--all'] : ['dir', target];
  args.push('--config', path.join(root, '.gitleaks.toml'), '--redact=100', '--no-banner', '--no-color',
    '--gitleaks-ignore-path', ignorePath, '--ignore-gitleaks-allow', '--max-archive-depth=2', '--report-format=json', '--report-path=-');
  const result = spawnSync(binary, args, { cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 64 * 1024 * 1024 });
  if (result.error || ![0, 1].includes(result.status)) throw new Error('Scanner execution failed; no PASS issued.');
  const raw = JSON.parse(result.stdout);
  if (!Array.isArray(raw)) throw new Error('Invalid scanner report.');
  const findings = raw.map(f => ({ file: f.File, type: f.RuleID, action: 'HUMAN REVIEW REQUIRED' }));
  // Never print Match, Secret, source lines, author data, or raw scanner logs.
  report(result.status === 0 && findings.length === 0 ? 'PASS' : 'FAIL', findings);
  process.exitCode = result.status === 0 && findings.length === 0 ? 0 : 1;
} catch (error) {
  report('ERROR');
  console.error(error instanceof SyntaxError ? 'Invalid scanner report; scan blocked.' : error.message);
  process.exitCode = 2;
} finally {
  if (snapshot && path.dirname(path.resolve(snapshot)) === path.resolve(output) && path.basename(snapshot).startsWith('index-')) {
    rmSync(snapshot, { recursive: true, force: true });
  }
}
