# Web Game Studio — Portal Core R1

AI支援による自社開発ブラウザゲームと、日英の自社Portal。**ローカルbootstrap完成 / Humanレビュー・最初のテーマ選択待ち**。公開ゲームは0本です。

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
