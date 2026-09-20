import { defineConfig } from 'astro/config';
import {retiredPublicBuild} from './scripts/retired-public-build.mjs';
retiredPublicBuild();
export default defineConfig({
  srcDir: './src/rc', publicDir: './.cache/tinlumo-public-assets',
  outDir: './.cache/tinlumo-public-candidate', cacheDir: './.cache/astro-public',
  output: 'static', trailingSlash: 'always', devToolbar: { enabled: false },
  vite: { define: { 'import.meta.env.TINLUMO_PUBLIC_CANDIDATE': JSON.stringify('1') }, build: { sourcemap: false }, server: { fs: { strict: true } } }
});
