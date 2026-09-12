import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const parent = path.join(root, '.tmp/security-r1');
mkdirSync(parent, { recursive: true });
const temp = mkdtempSync(path.join(parent, 'self-test-'));
const env = { ...process.env, GIT_INDEX_FILE: path.join(temp, 'index') };
const run = (command, args, input) => spawnSync(command, args, { cwd: root, env, input, encoding: 'utf8', windowsHide: true });
const git = (args, input) => {
  const result = run('git', args, input);
  assert.equal(result.status, 0, 'Isolated Git test operation failed');
  return result.stdout.trim();
};
const stage = (file, content) => {
  git(['read-tree', '--empty']);
  const blob = git(['hash-object', '-w', '--stdin'], content);
  git(['update-index', '--add', '--cacheinfo', `100644,${blob},${file}`]);
};
const scan = () => {
  const result = run(process.execPath, ['scripts/security-scan.mjs', 'staged']);
  // Parse only sanitized wrapper output. Never echo a raw tool response.
  return { exit: result.status, report: JSON.parse(result.stdout) };
};
try {
  stage('security-probe.txt', 'ordinary non-secret text\n');
  assert.equal(scan().exit, 0);
  // Deliberately synthetic GitHub-shaped token, constructed at runtime; never a credential.
  // Worktree has no probe file: the scanner must inspect the staged blob itself.
  stage('security-probe.txt', ['gh', 'p_', 'aB7cD9eF2gH4jK6mN8pQ0rS3tU5vW7xY9zA1bC3d'].join(''));
  const synthetic = scan();
  assert.equal(synthetic.exit, 1);
  assert.ok(synthetic.report.findings.some(f => f.type === 'github-pat'));
  stage('.dev.vars', 'SERVER_API_KEY=\n');
  assert.equal(scan().report.findings[0]?.type, 'forbidden-index-entry');
  stage('nested/.env.production', 'EMPTY=\n');
  assert.equal(scan().report.findings[0]?.type, 'forbidden-index-entry');
  stage('.dev.vars.example', 'PASSWORD=not-empty\n');
  assert.equal(scan().report.findings[0]?.type, 'nonempty-secret-template');
  stage('.dev.vars.example', '# No values\nSERVER_API_KEY=\n');
  assert.equal(scan().exit, 0);
  // Verify actual hook invocation and failure propagation using the isolated index.
  stage('.dev.vars', 'SERVER_API_KEY=\n');
  const hook = run('git', ['hook', 'run', 'pre-commit']);
  assert.notEqual(hook.status, 0);
  console.log('PASS: 7 isolated index/hook checks; real Git index untouched; synthetic values not printed.');
} finally {
  if (path.dirname(path.resolve(temp)) === path.resolve(parent) && path.basename(temp).startsWith('self-test-')) {
    rmSync(temp, { recursive: true, force: true });
  }
}
