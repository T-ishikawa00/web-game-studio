import {defineConfig} from 'astro/config';
const candidate=process.env.TINLUMO_BUILD_CANDIDATE;
if(candidate&&(!/^[a-z][a-z0-9-]*$/.test(candidate)||['visual-remaster-r1','production-remaster-r1','game005-web-v1'].includes(candidate)))throw Error('Invalid candidate identity');
export default defineConfig({srcDir:'./src/production/',publicDir:candidate?`./.cache/tinlumo-${candidate}-assets/`:'./.cache/tinlumo-visual-remaster-assets/',outDir:candidate?`./release-artifacts/tinlumo-${candidate}/`:'./release-artifacts/tinlumo-visual-remaster-r1/',cacheDir:candidate?`./.cache/astro-tinlumo-${candidate}/`:'./.cache/astro-visual-remaster/',output:'static',build:{inlineStylesheets:'always'},trailingSlash:'always',devToolbar:{enabled:false},vite:{define:{'import.meta.env.TINLUMO_PUBLIC_CANDIDATE':JSON.stringify('1'),'import.meta.env.TINLUMO_TRUST_UX_R2':JSON.stringify('1')},build:{sourcemap:false},server:{fs:{strict:true}}}});

