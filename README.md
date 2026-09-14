# Web Game Studio — Portal Core R1

## Current: Batch 01 R5 — Visual Language Human Acceptance PASS

2026-09-15、HumanがR5の色・形・質感・最小テキスト・盤面中心の設計・R4操作との統合・3表示のVisual方向を正式採用。[現行Baselineと受入範囲](docs/games/GAME_VISUAL_LANGUAGE_BASELINE_R5.md) / [R5 Review Pack](docs/qa/batch-01-r5/REVIEW.html) / [制作レシピ](docs/qa/batch-01-r5/RECIPE.md) / [checkpoint QA](docs/qa/batch-01-checkpoint/REPORT.md)。全54問のHumanゲーム性受入・実機・初見・公開・法務・広告は未完了です。

再起動: `npm run preview:prototypes`（4324）と `node scripts/r5-review-server.mjs`（4325）。今回だけ、検証後の1 checkpoint commitと既存Private origin/mainへの通常pushが承認されています。以下は以前の工程記録です。

## Historical: Batch 01 R4 — 直接操作UI / Humanレビュー待ち

最新の3作品レビューは [R4 Review Pack](docs/qa/batch-01-r4/REVIEW.html) / [QA・保全・Security調査](docs/qa/batch-01-r4/REPORT.md)。[R4仕様原本](docs/games/GAME_DIRECT_MANIPULATION_R4.md)に従い、54問・ルール・Art・R3の3表示を維持して盤面への直接操作と選択式D-padへ変更しました。下記のR1〜R3は以前の工程記録です。今回のUI／操作／全編Human AcceptanceはPENDING、Security候補1件もHuman判定待ちです。

起動中の [レビュー](http://127.0.0.1:4325/) から日英・通常／縦／横の18リンクと比較画像・操作動画へ進めます。再起動は `npm run preview:prototypes`（4324）と `node scripts/r4-review-server.mjs`（4325）。ポートの重複起動を避けてください。今回のstage・commit・push・deployは0です。

AI支援による自社開発ブラウザゲームと、日英の自社Portal。**Portal Baseline R1はHuman Acceptance PASS・正式採用 / 最初の実ゲームのテーマ選択待ち**。公開ゲームは0本です。

## Portal Baseline R1 — Human Acceptance PASS

2026-09-13、Humanが「ゲーム画面もこれでいい。Portalとして完成でOK」と判断し、前回のHome Visualを維持したローカルPortal本体（確認したPlayを含む）を正式採用しました。Games index、全幅Playと折りたたみ内部QA、関連作品の空状態、JS無効時と404、画像復旧を含みます。[受入範囲・残課題](docs/qa/baseline-r1/REPORT.md#human-acceptance) / [技術QA・6画面](docs/qa/baseline-r1/REPORT.md)。物理スマホはNOT TESTED、一般公開・実広告・法務確定・実ゲーム完成は未承認です。

基準commitは `95e3360b8de68a4df89a1a8889653af8c8e41d40`。今回のHuman指示でBaseline差分と受入記録のcommit・Private `origin/main`への通常pushだけを許可。直近QAを引き継ぎ、採用後の追加編集は文書のみです。下記のVisual R1・bootstrapの作業状態は以前の工程の記録です。

見本の[Games index](http://127.0.0.1:4323/ja/design-preview/games/)も利用できます。ブラウザQAの最新出力先は `docs/qa/baseline-r1/`（`QA_OUTPUT_DIR`で変更可）。以前のHome受入証跡は上書きしません。

## Visual R1 — Concept A 採用後のローカルレビュー

採用画像・5調整を反映した共通Home/Card/Play周辺と日英補助画面を実装。2026-09-13、Concept A実装方向と日英PC HomeはHuman PASS、日本語スマホHome提示画像はVisual PASS。現在の配色・Hero・カード・グリッド・雰囲気をVisual Baselineとして維持します。Play受入・物理スマホ操作・公開可否は未承認です。[採用記録](docs/qa/visual-r1/REPORT.md#human-acceptance) / [原本](docs/design/references/PORTAL_VISUAL_REFERENCE_R1.md) / [画像](docs/design/references/PORTAL_VISUAL_REFERENCE_R1.png) / [技術QAと実装画像](docs/qa/visual-r1/REPORT.md)。Repository全体のTier S/A/B割当方針はrepo-local `AGENTS.md` に記載しています。

```powershell
npm run build:design
npm run preview:design
```

デザイン見本: [日本語Home](http://127.0.0.1:4323/ja/design-preview/) / [English Home](http://127.0.0.1:4323/en/design-preview/) / [Play周辺](http://127.0.0.1:4323/ja/design-preview/play/larva-evolution-lab/)。仮10作品は実ゲーム・公開本数に含みません。下部の「デザイン確認用の表示設定」で10/2/0件・混在Artworkを確認できます。

通常ビルドは `dist/`、デザイン専用ビルドは `.cache/visual-dist/`。デザイン用データは `src/design/`、画像は原本から `scripts/design-assets.mjs` で再現し `.cache/visual-public/design-art/` に隔離します。通常ビルドに見本ルート・仮作品データ・仮Artworkを含めません。通常データ: [日本語Home](http://127.0.0.1:4322/ja/)、実際に動く [内部接続テスト](http://127.0.0.1:4323/ja/play/connection-lab/)。4322と4323は別originなので保存は共有しません。

`preview:design` は4323でフォアグラウンド起動し、既存4322のAstro preview lockを維持します。端末起動ならCtrl+Cで停止。今回のレビュー用プロセスはウィンドウ非表示で起動済みです。再起動前はポート使用状況を確認してください。

```powershell
node node_modules/tsx/dist/cli.mjs --test tests/visual-output.test.ts
# Playwrightがインストール済みならそのまま実行可能。
# 同梱runtimeを使う場合はQA_PLAYWRIGHT_MODULEにplaywright/index.mjsの絶対パスを指定。
node tests/visual.browser.mjs
```

Visual実装完了時はcommit/push/deploy・実広告・購入・外部サービス接続は0。その後のHome採用に伴い、Humanが今回のVisual実装・受入記録のローカルcommitだけを追加許可しました。push・deploy・実広告・購入・ゲーム制作は許可されていません。以下のbootstrap記録中の「初期化・commitなし」は初期工程当時の情報です。

最上位Authority: START_HERE_CODEX_WEB_GAME_STUDIO.md（参照原本はPrivate保全・候補には非同梱）。元文書は変更していません。ゲーム「Connection Lab」はPortal接続用の内部fixture 1本のみで、Game 001・販売作品・公開本数には含みません。

## ローカル起動（PowerShell）
Node.js 22.12以上、npmが必要です。今回確認したNodeは24.14.0、npmは11.9.0。

```powershell
Set-Location -LiteralPath 'C:\projects\Web Game Studio'
npm ci
npm run dev -- --port 4321
```

日本語: [http://127.0.0.1:4321/ja/](http://127.0.0.1:4321/ja/) / 英語: [http://127.0.0.1:4321/en/](http://127.0.0.1:4321/en/)

依存は既にインストール済みなら `npm ci` を省略できます。Astroのコマンドはrepo内wrapperでtelemetryを無効にし、一時ファイルを `.tmp/` に限定。npm cacheは `.cache/npm/`。global設定は変更しません。

## 本番ビルドと技術QA
```powershell
npm run check
npm test
npm run build
npm run preview -- --port 4322
npm run test:routes
```

本番出力は `dist/`。確認用プレビュー: [日本語](http://127.0.0.1:4322/ja/) / [内部ゲーム](http://127.0.0.1:4322/ja/play/connection-lab/)。`test:routes` は4322の本番プレビューにHTTPで接続し、日英ルート・リンク・素材・404を検査します。別ポートの場合は `$env:QA_BASE_URL='http://127.0.0.1:任意ポート'` を設定します。

このAstro版のdev/previewはバックグラウンドプロセスで起動します。状態確認と停止:
```powershell
npm run dev -- status
npm run preview -- status
npm run dev -- stop
npm run preview -- stop
```

ブラウザQAの実施手順・結果は [QA記録](docs/qa/BOOTSTRAP_QA_R1.md)。lintは未設定で、型チェックと意味のあるadapter/routeテストを実施。外部サービス接続・実機互換性の全検証は含みません。

## 構成
| ディレクトリ | 役割 |
|---|---|
| `src/pages/`, `src/layouts/`, `src/components/` | 静的Portal、日英のHome/index/detail/play/About/Privacy/Terms/Contact、404 |
| `src/data/games.ts` | 型付きregistryと未制作のtheme cards |
| `src/i18n/` | Portalの日本語・英語UI |
| `src/lib/` | save、mock/disabled ads、メモリ内analytics |
| `src/scripts/` | iframeのload/input/state、保存、QA操作 |
| `public/games/connection-lab/v0.1.0/` | 唯一の内部fixture、独立した版付き静的build |
| `docs/planning/` | ロードマップ・Portal仕様・制作・広告・法務・インフラ・マーケティング・3候補 |
| `docs/architecture/`, `docs/records/`, `docs/qa/` | event辞書、来歴/依存license、検証証跡 |
| `tests/`, `scripts/` | adapterテスト、HTTP route checks、ローカルツール |

ゲーム追加時は、まず `src/data/games.ts` に安定したID/slug、日英情報、版付きbuildPathとcover、inputs/devices/orientation、state、related、save/ads/legalを登録。現在のプレイ接続契約は内部fixture用であり、実ゲームでは同じadapterを利用するruntime契約を作品のA–C段階で拡張します。registryに追加するだけで任意の第三者ゲームが動くとは保証しません。

## セーブ・広告・プライバシー
- セーブは `wgs:save:<gameId>`。schema/version入り、旧schema移行例あり。不正/未知版は元データを残して一時モード。resetはそのゲームだけを消します。保存できなければ成功表示しません。
- adはmock/disabledのみ。明示ボタンでpause/resumeを確認。rewardedは任意、skipでは報酬なし。前回mockから60秒・入力後1.2秒は表示しません。これは内部QA方針で本番頻度ではありません。
- localStorage/sessionStorageはブラウザと**origin（scheme/host/port）**ごと。4321と4322で保存が別なのは仕様。別端末同期・消去後の復旧はありません。
- analyticsは最新50件のページメモリのみ。広告/分析サービスへ送信しません。法務文書は草案で、適法性や権利処理の保証ではありません。

## 今回の境界と次の判断
変更先は `C:\projects\Web Game Studio` のみ。Gitはmainを初期化し、commit/push/remote作成なし。公開/deploy/購入/契約/広告申請/実広告/外部メッセージ送信なし。全ページnoindexとrobots Disallowですが、これはアクセス制御ではありません。公開前にinternal/draftの除外と別途Human承認が必要です。

HumanはHomeの印象、日英切替、スマホ幅の操作、内部fixtureの保存/広告復帰を確認してください。その後 [3テーマ](docs/planning/INITIAL_GAME_THEME_CARDS_R1.md) からA幼体進化 / B光と仕掛け / C一手の連鎖のいずれかを選択します。実ゲームの全制作・公開可否はこのbootstrapでは承認されていません。
# Prototype Batch 01 — R1 historical opening slice

Human選択の「ひかりの仕掛け庭」「ふたりの帰り道」「ちいさな配送パズル」を各5問の導入MVPとして実装。Portal Baseline R1を維持し、公開ゲーム0本・Design Preview10見本とは別のprototype buildへ隔離しています。

```powershell
cd 'C:\projects\Web Game Studio'
npm run build:prototypes
npm run preview:prototypes
```

案内: [日本語](http://127.0.0.1:4324/ja/prototypes/) / [English](http://127.0.0.1:4324/en/prototypes/)。127.0.0.1限定、deployではありません。日英で保存を共有しますが、4322/4323/4324は別originで保存も別です。起動済みの4324を二重に開始しないでください。

仕様原本: [Batch依頼](docs/games/GAME_PROTOTYPE_BATCH_01_R1.md)。[実装/QA/試遊画像/制約](docs/qa/prototype-batch-01/REPORT.md)。今回の停止点は3作品まとめてのHuman試遊。中盤・終盤・公開・commit/push/deployは実行しません。

## Historical: Batch 01 R2 full-run alpha

3作品の核はHumanが継続制作を採用。各18問・3章へ拡張し、ゲーム内Artと初見ガイドを改修しました。ゲーム性の継続採用はVisual/UX/全編のHuman PASSを意味しません。[R2依頼原本](docs/games/GAME_BATCH_01_R2_ART_UX_AND_FULL_RUN.md) / [まとめて試遊・Before/After・QA](docs/qa/batch-01-r2/REPORT.md)。上記のbuild/previewコマンド、port4324を継続使用。公開0本・Design見本10点・旧fixtureを維持し、未stage/未commitでHumanレビュー待ちです。

R2 QA: `npm test`、`npm run check`、通常/Design/prototype build、`node --import tsx tests/r2-full-run.browser.mjs`、`node tests/r2-browser-regression.mjs`。ブラウザQAはこのWindows環境のbundled Playwright/Edgeを使用し、他環境の依存パスは調整が必要です。

## Historical: Batch 01 R3 controls and capture layouts

3作品の54問・ルール・Art・旧保存を維持し、共通操作バー、状態に応じた主操作、設定内の通常／縦9:16／横16:9切替を追加しました。[依頼原本](docs/games/GAME_CONTROL_UI_AND_CAPTURE_R3.md) / [試遊・9画面比較・6動画](docs/qa/batch-01-r3/REVIEW.html) / [QAとHuman判断待ち事項](docs/qa/batch-01-r3/REPORT.md)。ローカル試遊は引き続き4324です。撮影切替は現在のiframeとゲーム状態を維持し、配送の走行は明示的な再開まで停止します。未stage・未commit、Humanレビュー待ちです。

R3 QA: `node --import tsx tests/r3-full-run.browser.mjs`、`node tests/r3-state.browser.mjs`、`node tests/r3-browser-regression.mjs`、`node tests/r3-layout.browser.mjs`、`node tests/r3-responsive.browser.mjs`、`node tests/r3-controls.browser.mjs`。R2の証拠は別フォルダに保持しています。
