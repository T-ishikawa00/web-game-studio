import path from 'node:path';
import { realpathSync, lstatSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const projectRoot = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
// Reject sibling prefixes, encoded URL paths, and links before any output operation.
export function projectPath(value, root = projectRoot) {
  const base = realpathSync(root);
  const target = path.resolve(value instanceof URL ? fileURLToPath(value) : value);
  const relative = path.relative(base, target);
  if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error('Output must be below project root');
  let cursor = base;
  for (const part of relative.split(path.sep)) {
    cursor = path.join(cursor, part);
    let entry;
    try { entry=lstatSync(cursor); } catch(error) { if(error.code==='ENOENT')continue; throw error; }
    if (entry.isSymbolicLink() || realpathSync(cursor) !== cursor) throw new Error('Linked output path rejected');
  }
  return target;
}
