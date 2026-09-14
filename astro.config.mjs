import { defineConfig } from 'astro/config';

export default defineConfig({
  publicDir: process.env.WGS_PROTOTYPE_PREVIEW === '1' ? './.cache/prototype-public' : process.env.WGS_DESIGN_PREVIEW === '1' ? './.cache/visual-public' : './public',
  outDir: process.env.WGS_PROTOTYPE_PREVIEW === '1' ? './.cache/prototype-dist' : process.env.WGS_DESIGN_PREVIEW === '1' ? './.cache/visual-dist' : './dist',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { server: { fs: { strict: true } } },
});
