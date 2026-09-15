# Lightwork — Craft Baseline R1

## Human Craft Acceptance — 2026-09-16

**採用・固定：LG-C Motion/SFX ＋ Object Design 01 ＋ Art Polish 01。BGMなし。**

Humanが今回確認したCraftの範囲だけを採用した。旧QAのPENDINGは当時の記録として保全する。Lightwork実機、外部初見理解、全57問Human全編ゲーム性、公開/法務/広告へPASSを拡張しない。外部初見はDEFERRED / NOT TESTED、Tiny Craft R2は固定。

## 固定対象

- Motion/SFX：`light-craft-{plan,motion,runtime,audio,sound}.ts`。LG-Cの因果順、受光215ms・開門245ms/45ms、直接操作・取消・無音/reduced motionを保持。
- Object：`light-object-{art,view,motion}.ts` / `light-object.css`と`light-polish-art.ts` / `light-polish.css`。回転台/両面反射板、現在受光のレンズ、作動保持の留め金、四隅へ退くシャッター、紋章、光源/分光器。
- Art Polish専用buildの表示接続11箇所とLG-C接続9箇所。光線・花・床/壁の原本、全18問のルール/保存/Undoは不変。全57問・Portal・他作品への移植なし。
- 編集可能な素材はSVG描画/ローカルSFX合成source。外部音源なし。比較WAVは[旧Pilot](../qa/lightwork-craft-pilot-01/REPORT.md)、画像・動画は[Object](../qa/lightwork-object-design-01/REPORT.md)と[Polish](../qa/lightwork-art-polish-01/REPORT.md)に保持。

## 再現と照合

`npm ci`後に `node scripts/light-baseline-build.mjs`。prototype → LG-C → Object → Polishをsourceから順にbuildし、[frozen-runtime.json](../qa/lightwork-craft-baseline-r1/frozen-runtime.json)の全配布ファイルを照合する。manifestの再採番で差分を隠さない。

`node scripts/light-polish-server.mjs` は127.0.0.1:4342だけ。既存同サーバーが起動中なら再利用し、他プロセスを停止しない。[採用版試遊](http://127.0.0.1:4342/ja/prototypes/play/light-garden/?lg=LG-C&layout=auto)。設定の比較modeはLG-Cを選ぶ。旧A/B・旧Objectへの切替は比較証拠であり採用版変更ではない。通常Portalへの自動統合・公開ではない。

## 今回だけのcheckpoint

最新Human依頼により、Lightwork成果・採用された指示整理・関連Current/Security記録を1 commitに保存し、Private origin/mainへ1回だけ通常fast-forward push。開始remoteは`e24556ba57284d993cdb0ac9c476a975f63bef11`。対象は[manifest](../qa/lightwork-craft-baseline-r1/checkpoint-files.json)。`.tmp`/`.cache`/TLS鍵/Tiny LAN関連は対象外。SHA誤検出とTLS実秘密鍵の限定判定を維持。

push後のlocal HEAD / origin/main / 実remote一致を確認してTwo Ways Pilotへ進む。Phase 2は未commitでHuman Craftレビュー待ち停止。このcheckpointの許可は再利用不可。deploy/LAN再公開/購入/外部音源API/外部公開は行わない。
