# R1 Asset and Rights Register

2026-09-13 / 内部レビュー用。公開許可未判定。

| Asset | 来歴 | 状態 / 証拠 |
|---|---|---|
| Portal・adapter・fixture source | このbootstrapでCodexによるAI支援開発、Human依頼から新規作成 | コードは本repo。Humanによる製品/権利受入は未実施 |
| `public/covers/connection-lab.svg` | 接続テストの9パネルを描いた新規の機能模式図。外部参照画像なし | 製品アートではなく内部fixtureの図。商用公開前レビュー待ち |
| `public/favicon.svg` | 仮スタジオ用のW幾何マークを新規作成 | 正式ブランド/商標レビュー未実施 |
| フォント | OSのfont stack。フォントbinaryを同梱しない | 配布フォントlicenseは対象外。将来webfont追加時に別途確認 |
| 音楽/SE/音声/映像 | 使用なし | 対象外 |
| 第三者ゲーム/第三者ゲーム素材 | 使用なし | 対象外 |
| OSS dependencies | npm、固定lockfile | `DEPENDENCY_LICENSES_R1.json` にinstalled package metadataの棚卸し。実ライセンス本文/NOTICE/配布義務の最終確認は公開前 |
| Working titles | Human Authorityの候補を元に仮称 | 名前調査・商標調査未実施 |

AI生成は法的安全の保証ではない。ライセンス文字列の自動抽出だけでOSS配布条件への適合を断言しない。

## Visual Reference R1 — 2026-09-13

- Human添付の採用Concept A原本を `docs/design/references/PORTAL_VISUAL_REFERENCE_R1.png`、対応文書を同名 `.md` に無変更コピー。画像SHA256: `c288f35353bf65f547bbe2c71f8ad6d4f564d884ee92c0550b844704fef67646`、1672×941。
- 指示書7節の明示許可に基づきArtwork10点と装飾2点だけを切出し。タイトル・タグ・ボタン・枠はHTML/CSS。切出し座標 `[name,x,y,width,height]` は `docs/design/references/crops.json`、再現処理は `scripts/design-assets.mjs`。カード1は画像内Newバッジを避けて下側を利用し、Heroは生成文字を避けたマスコット部分を利用。WebP quality 88、CSSによるobject-fit/装飾端のフェード。暫定利用であり公開時差替え必須。
- 仮Artworkは `.cache/visual-public/design-art/` と `.cache/visual-dist/design-art/` のみ。通常 `public/` / `dist/` へ配置しない。仮10作品は `src/design/catalog.ts`、実games/themes配列へ混入させない。
- 混在確認用SVG3点は、この工程で新規に記述したピクセル・抽象形状・機構の模式図。公開素材/実ゲームの制作ではない。元Concept Aの置換案でもない。
- Headerの仮WマークはHTML内SVGによる暫定図形。フォントは引き続きOS stack、追加binary・外部font通信なし。原画像・マーク・仮名・マスコットの採用は権利/商標/ブランド確定を意味しない。
- Clockwork Repair Workshopはデザイン見本の仮タイトルであり、他repoの正式作品・Artworkではない。他repoへの読取・書込みなし。
