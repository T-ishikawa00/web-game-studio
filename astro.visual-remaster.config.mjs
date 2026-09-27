import {defineConfig} from 'astro/config';
export default defineConfig({srcDir:'./src/production/',publicDir:'./.cache/tinlumo-visual-remaster-assets/',outDir:'./release-artifacts/tinlumo-visual-remaster-r1/',cacheDir:'./.cache/astro-visual-remaster/',output:'static',build:{inlineStylesheets:'always'},trailingSlash:'always',devToolbar:{enabled:false},vite:{define:{'import.meta.env.TINLUMO_PUBLIC_CANDIDATE':JSON.stringify('1'),'import.meta.env.TINLUMO_TRUST_UX_R2':JSON.stringify('1')},build:{sourcemap:false},server:{fs:{strict:true}}}});

