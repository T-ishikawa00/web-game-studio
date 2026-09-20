import {defineConfig} from 'astro/config';
export default defineConfig({
 srcDir:'./src/rc',publicDir:'./.cache/tinlumo-trust-ux-r2-assets',
 outDir:process.env.TINLUMO_TRUST_RELEASE==='1'?'./release-artifacts/tinlumo-trust-ux-r2':'./.cache/tinlumo-trust-ux-r2',cacheDir:'./.cache/astro-trust-ux-r2',
 output:'static',trailingSlash:'always',devToolbar:{enabled:false},
 vite:{define:{'import.meta.env.TINLUMO_PUBLIC_CANDIDATE':JSON.stringify('1'),'import.meta.env.TINLUMO_TRUST_UX_R2':JSON.stringify('1')},build:{sourcemap:false},server:{fs:{strict:true}}}
});
