import {defineConfig} from 'astro/config';
export default defineConfig({srcDir:'./src/rc',publicDir:'./.cache/rc-public',outDir:'./.cache/rc-dist',output:'static',trailingSlash:'always',devToolbar:{enabled:false},vite:{build:{sourcemap:false},server:{fs:{strict:true}}}});
