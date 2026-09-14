import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { projectPath } from './project-path.mjs';

const project = fileURLToPath(new URL('../', import.meta.url));
const temp = path.join(project, '.tmp');
projectPath(temp);
for (const output of ['dist','.cache/visual-dist','.cache/prototype-dist','.cache/visual-public','.cache/prototype-public']) projectPath(path.join(project,output));
await mkdir(temp, { recursive: true });
const args = process.argv.slice(2);
const design = args.includes('--design-preview');
const prototype = args.includes('--prototype-preview');
if (design && prototype) throw new Error('Select one preview mode');
if (prototype) { process.env.WGS_PROTOTYPE_PREVIEW = '1'; await import('./prototype-assets.mjs'); }
if (design) { process.env.WGS_DESIGN_PREVIEW = '1'; await import('./design-assets.mjs'); }
// Keep the second, design-only preview in the foreground; preserve the normal preview lock.
if ((design || prototype) && args[0] === 'preview') process.env.ASTRO_PREVIEW_BACKGROUND = '1';
const child = spawn(process.execPath, [path.join(project, 'node_modules/astro/bin/astro.mjs'), ...args.filter(arg => arg !== '--design-preview' && arg !== '--prototype-preview')], {
  cwd: project,
  stdio: 'inherit',
  windowsHide: true,
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', TEMP: temp, TMP: temp },
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
