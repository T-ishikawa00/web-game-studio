# Build / Runtime

追加package・network install・bundler不要。Node built-insのみ。検証host: Windows / Node v24.14.0。npmは付属runnerとして使用。

1. ZIPを任意の空folderへ展開し、package.jsonのあるfolderへ移動。
2. npm run verify: 全pack、Accepted source/dist、fixtures、baseline aggregateを比較。
3. npm run build: Accepted source9ファイルをdistへbyte copy。パラメータ・JS/CSS・copyを変換しない。
4. npm test: 自己完結した84 core/input/records試験。
5. npm run preview: 127.0.0.1:4188 のstatic local preview。

Production runtime対象はdistのindex.htmlとsrcの8ファイルだけ。manifest.jsonはdeployment検証用として保管可能。tools、tests、evidence、QA、handoff.html、cover制作page、原型fixtureはgame runtimeに不要。Portal listing用coverは別asset。

必須browser機能: JavaScript、ES Modules、Canvas2D、Pointer Events、requestAnimationFrame。Web Audioはoptional、失敗しても遊べる。localStorageはoptional、拒否時memory fallback。MediaRecorder/captureStreamはdev recorderのみで通常playに不要。外部font・CDN・texture・sprite・音声ファイル・worker・API・account・backendなし。

**現Accepted index.htmlは /src/style.css と /src/game.mjs のorigin-root absolute参照。** sourceを無加工でsubpathへ置くだけではPortal側と競合する。専用originのrootに配置するか、後続統合candidateでこの2asset URLを正しいgame baseへ解決する。docs/PORTAL_INTEGRATION.md参照。ここではindexを変更しない。

Previewはdistをserveし、/__recordと/__qaを提供しない。?review=1はpreviewで403にする。accepted gameのhidden QA branchはsource保全のため残るが、公開surfaceへそのquery/APIを出さないことを統合条件とする。
