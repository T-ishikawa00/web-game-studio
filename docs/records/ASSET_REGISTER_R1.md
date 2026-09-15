# R1 Asset and Rights Register

## Tiny Delivery Craft Pilot 01 — 2026-09-15

- Asset IDs: `tiny-sfx-arrow`, `tiny-sfx-wait`, `tiny-sfx-undo`, `tiny-sfx-start`, `tiny-sfx-arrive`, `tiny-sfx-collision`, `tiny-sfx-clear`, `tiny-sfx-complete`. Arrow/arrival/clear each have variants 0 and 1. Uses and duration/peaks: [audio measurements](../qa/tiny-craft-pilot-01/audio-measurements.json).
- Original editable synthesis master: `src/prototypes/craft-sound.ts`, AI-assisted local TypeScript authored by actual `gpt-6-astra`. Deterministic filtered noise, nonharmonic resonances, envelopes and a short original note sequence; no third-party recordings, artist imitation, sound libraries or external generation API. Created locally on this date, no paid service/plan/license was purchased or consumed.
- Reproduction/edit pipeline: `scripts/craft-samples.ts` exports mono PCM16 44.1kHz preview WAVs at the same default gain as the runtime. Variants change representative timbre/pitch; no equal-peak normalization across events. Game synthesizes only needed buffers at device sample rate; WAV masters/previews are not included in normal, Design or prototype delivery. Necessary synthesis code is in the prototype bundle only.
- Runtime use: accepted route/wait edits, return to editing, departure, delivery arrival, rejected run, puzzle clear and first completion of all 18 stable IDs. Pause/resume are intentionally silent; no motor loop, per-tick SFX or BGM. Final arrival is coalesced with clear/signature to avoid stacking.
- Review videos are actual local Edge UI recordings. C/C-alt use a simultaneous tap of the real Web Audio output graph and measured wall-clock mux offset; no reconstructed post-dub sound. This is not a speaker/device/listening or perceptual synchronization acceptance. [Review](../qa/tiny-craft-pilot-01/REPORT.md) records limitations.
- Local project-created material; no third-party attribution requirement identified from imported assets because none were imported. Public/commercial/streaming/ad/external-platform/transfer rights review remains PENDING; AI authorship is not a copyright or legal-clearance guarantee. No Content ID registration or external publishing performed.

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

## Prototype Batch 01 — 2026-09-13

- G001 Lightwork Garden / G002 Two Ways Home / G003 Tiny Delivery: Human選択の導入MVP各5問。`src/prototypes/`のルール・UI・全15盤面・固定QA解答は本タスクでAI支援新規制作。既存ゲームのレベル・コード・素材の取込みなし。
- ゲーム内の庭・鏡・花・門・家・二人・配送ロボット・道路/受取口は`game.ts`/`game.css`のオリジナルSVG/CSS。案内カードのSVG3点は`scripts/prototype-assets.mjs`に原本コードを保持。外部フォント/素材/API・音楽/SEなし。生成画像APIは使用していない。
- Artwork/runtimeの配信ファイルは明示prototype buildの`.cache/prototype-public/prototype-assets/`と`.cache/prototype-dist/`のみ。通常public/dist、Design見本、公開registryへ昇格させない。QA解答JSONは配信しない。
- `docs/qa/prototype-batch-01/screens/`の6画像と案内画像は実ブラウザ実装のキャプチャ。生成画像による代替ではない。
- 仮題の名称/商標調査、類似性/商用権利/動画配信許可、Humanによる作品受入は未完了。導入MVPの技術検証を法的保証・公開許可・正式Artworkの採用と扱わない。

## Visual Reference R1 — 2026-09-13

### Batch 01 R2 original in-game art — 2026-09-13

- `src/prototypes/art.ts`: AI-assisted original state-aware SVG for greenhouse stone frame, glass lamp, metal mirror, blooming flowers, gate/switch badges, scarfed original characters, paired houses, parcel robots, roads, clocks and depots. Shapes, depth and states are authored as code; no third-party game assets or generated-image API used.
- `src/prototypes/guides.ts`: original bilingual, code-drawn rule diagrams; separate examples do not change play state. `game-r2.css` owns materials, responsive composition and reduced-motion handling. No sound/music or external fonts.
- `scripts/prototype-covers.mjs` creates the three covers from the same original sprite source, matching the playable worlds. Only prototype output receives these assets. Original R1 source is preserved in ignored `.tmp/r2-before/`.
- `docs/qa/batch-01-r2/screens/`: actual Edge Chromium screenshots, including same-first-stage PC Before/After, guides, interaction sequence, middle, ending and mobile views. These are implementation evidence, not concept renders.
- Human art/UX/full-run acceptance and legal/name/similarity clearance remain PENDING / NOT TESTED. AI assistance is provenance, not a legal guarantee.

- Human添付の採用Concept A原本を `docs/design/references/PORTAL_VISUAL_REFERENCE_R1.png`、対応文書を同名 `.md` に無変更コピー。画像SHA256: `c288f35353bf65f547bbe2c71f8ad6d4f564d884ee92c0550b844704fef67646`、1672×941。
- 指示書7節の明示許可に基づきArtwork10点と装飾2点だけを切出し。タイトル・タグ・ボタン・枠はHTML/CSS。切出し座標 `[name,x,y,width,height]` は `docs/design/references/crops.json`、再現処理は `scripts/design-assets.mjs`。カード1は画像内Newバッジを避けて下側を利用し、Heroは生成文字を避けたマスコット部分を利用。WebP quality 88、CSSによるobject-fit/装飾端のフェード。暫定利用であり公開時差替え必須。
- 仮Artworkは `.cache/visual-public/design-art/` と `.cache/visual-dist/design-art/` のみ。通常 `public/` / `dist/` へ配置しない。仮10作品は `src/design/catalog.ts`、実games/themes配列へ混入させない。
- 混在確認用SVG3点は、この工程で新規に記述したピクセル・抽象形状・機構の模式図。公開素材/実ゲームの制作ではない。元Concept Aの置換案でもない。
- Headerの仮WマークはHTML内SVGによる暫定図形。フォントは引き続きOS stack、追加binary・外部font通信なし。原画像・マーク・仮名・マスコットの採用は権利/商標/ブランド確定を意味しない。
- Clockwork Repair Workshopはデザイン見本の仮タイトルであり、他repoの正式作品・Artworkではない。他repoへの読取・書込みなし。

## Batch 01 R5 — local prototype visual language (2026-09-14)

- Editable masters: src/prototypes/art.ts; semantic roles and crests: src/prototypes/visual-language.ts; mirror/arrow/clock and scene CSS: src/prototypes/game-r5.css. Original AI-assisted vector/code shapes, no imported third-party image or image API. Actual authoring model verified: gpt-6-astra.
- Uses: all 54 prototype scenes and generated internal prototype cards; normal Portal / ten Design Preview samples unchanged. SVG center anchors use 60-unit cells; state is derived from the existing engine. Help imports the same actors and shapes.
- Derived evidence: docs/qa/batch-01-r5/MATERIALS.html, screenshots, three cropped Edge recordings, and RECIPE.md. No added sound or fonts.
- Old masters/source preserved in ignored .tmp/r5-before/src/prototypes/ and .tmp/r5-before/scripts/. Earlier R1-R4 evidence retained.
- Rights, similarity, names and publication acceptance remain PENDING. No claim of legal clearance or commercial acceptance.
