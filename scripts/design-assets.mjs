import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { mkdir, cp, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const target = new URL('.cache/visual-public/', root);
await mkdir(target, { recursive: true });
await cp(new URL('public/', root), target, { recursive: true });
await mkdir(new URL('design-art/', target), { recursive: true });
const source = new URL('docs/design/references/PORTAL_VISUAL_REFERENCE_R1.png', root);
// Artwork/decoration only, as explicitly authorized in the adopted reference.
const crops = [
  ['card-1', 46, 328, 357, 158], ['card-2', 424, 291, 283, 172],
  ['card-3', 731, 291, 282, 172], ['card-4', 1036, 291, 281, 172], ['card-5', 1340, 291, 285, 172],
  ['card-6', 47, 596, 305, 143], ['card-7', 375, 588, 300, 151], ['card-8', 698, 588, 278, 151],
  ['card-9', 1000, 588, 294, 151], ['card-10', 1317, 588, 308, 152],
  ['hero', 1153, 81, 278, 129], ['footer', 48, 846, 165, 76],
];
for (const [name, left, top, width, height] of crops) {
  await sharp(fileURLToPath(source)).extract({ left, top, width, height }).webp({ quality: 88 }).toFile(fileURLToPath(new URL(`design-art/${name}.webp`, target)));
}
const svg = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 288">${body}</svg>`;
const mixed = [
  svg('<rect width="480" height="288" fill="#152e47"/><path d="M0 230H480V288H0Z" fill="#73b69b"/><path d="M30 190h80v40H30zm110-60h80v100h-80zm110-60h80v160h-80zm110 80h90v80h-90" fill="#395e78"/><path d="M180 60h60v60h-60z" fill="#d4ff69"/><path d="M190 78h8v9h-8zm30 0h8v9h-8z" fill="#14243a"/><path d="M70 55h12v12H70zm290-20h12v12h-12z" fill="#fcbe62"/>'),
  svg('<rect width="480" height="288" fill="#f0eafa"/><circle cx="145" cy="145" r="90" fill="#7768dc"/><path d="M250 45l150 200H220Z" fill="#ff9d79"/><circle cx="350" cy="90" r="38" fill="#d4ff69"/><path d="M65 210L400 70" stroke="white" stroke-width="12"/>'),
  svg('<rect width="480" height="288" fill="#e4eced"/><path d="M70 65H230V215H400M70 215H140V130H400" fill="none" stroke="#658292" stroke-width="25"/><g fill="#17374b" stroke="#9db3ba" stroke-width="12"><circle cx="70" cy="65" r="30"/><circle cx="230" cy="215" r="30"/><circle cx="400" cy="130" r="30"/></g><g fill="#d4ff69"><circle cx="70" cy="65" r="10"/><circle cx="230" cy="215" r="10"/><circle cx="400" cy="130" r="10"/></g>'),
];
for (const [i, content] of mixed.entries()) await writeFile(new URL(`design-art/mixed-${i}.svg`, target), content);
await writeFile(new URL('docs/design/references/crops.json', root), JSON.stringify(crops, null, 2) + '\n');
