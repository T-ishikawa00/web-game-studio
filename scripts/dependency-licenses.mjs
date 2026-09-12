import { readFile, writeFile } from 'node:fs/promises';
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
const packages = Object.entries(lock.packages).filter(([key]) => key).map(([location, value]) => ({
  location, name: value.name ?? location.split('node_modules/').at(-1), version: value.version,
  license: value.license ?? 'UNKNOWN - inspect upstream license', dev: value.dev ?? false,
}));
await writeFile('docs/records/DEPENDENCY_LICENSES_R1.json', JSON.stringify({
  generated: '2026-09-13', source: 'package-lock.json', note: 'Metadata inventory, not legal clearance. Inspect license text and NOTICE before distribution.', packages,
}, null, 2) + '\n');
console.log(`Inventoried ${packages.length} locked dependencies; unknown metadata: ${packages.filter(p => p.license.startsWith('UNKNOWN')).length}`);
