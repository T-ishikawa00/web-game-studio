import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const project = fileURLToPath(new URL('../', import.meta.url));
const temp = path.join(project, '.tmp');
await mkdir(temp, { recursive: true });
const args = process.argv.slice(2);
const design = args.includes('--design-preview');
if (design) { process.env.WGS_DESIGN_PREVIEW = '1'; await import('./design-assets.mjs'); }
// Keep the second, design-only preview in the foreground; preserve the normal preview lock.
if (design && args[0] === 'preview') process.env.ASTRO_PREVIEW_BACKGROUND = '1';
const child = spawn(process.execPath, [path.join(project, 'node_modules/astro/bin/astro.mjs'), ...args.filter(arg => arg !== '--design-preview')], {
  cwd: project,
  stdio: 'inherit',
  windowsHide: true,
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', TEMP: temp, TMP: temp },
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
