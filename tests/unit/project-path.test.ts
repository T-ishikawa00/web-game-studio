import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile, symlink, unlink } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { projectRoot, projectPath } from '../../scripts/project-path.mjs';

test('output guard: spaces, Japanese and file URLs round trip inside project', async () => {
  const dir = projectPath(path.join(projectRoot, '.tmp/path-test/空白 の出力'));
  await mkdir(dir, { recursive:true });
  const file = projectPath(pathToFileURL(path.join(dir, '実装 画像.txt')));
  await writeFile(file, 'path regression');
  assert.equal(await readFile(file, 'utf8'), 'path regression');
});
test('output guard rejects root, sibling prefix, encoded sibling and traversal before writing', () => {
  for (const file of [projectRoot, projectRoot+'-sibling/output.js', projectRoot.replaceAll(' ','%20')+'/output.js', path.join(projectRoot,'../outside.js')]) assert.throws(()=>projectPath(file));
});
test('output guard rejects junction before writing even when its target is internal', async () => {
  const parent = projectPath(path.join(projectRoot,'.tmp/path-test'));
  await mkdir(parent,{recursive:true});
  const link = path.join(parent,'junction');
  await symlink(projectRoot,link,'junction');
  try { assert.throws(()=>projectPath(path.join(link,'output.js'))); }
  finally { await unlink(link); }
});
test('output guard rejects a dangling junction before its target exists', async () => {
  const parent = projectPath(path.join(projectRoot,'.tmp/path-test'));
  await mkdir(parent,{recursive:true});
  const link = path.join(parent,'dangling');
  await symlink(path.join(parent,'not-created'),link,'junction');
  try { assert.throws(()=>projectPath(path.join(link,'output.js'))); }
  finally { await unlink(link); }
});
