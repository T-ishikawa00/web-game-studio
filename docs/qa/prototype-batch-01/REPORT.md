# Prototype Batch 01 — technical QA / Human play handoff

2026-09-13 JST。**3作品×5問を実装。導入MVPの技術QA PASS。3作品をまとめてHumanが試遊する段階で停止。** 面白さ・正式採用・物理スマホの確認は別であり、技術PASSから推定しない。

## 試遊

ローカル案内: [日本語](http://127.0.0.1:4324/ja/prototypes/) / [English](http://127.0.0.1:4324/en/prototypes/)

| 作品 | 日本語 Play | English Play | PC実装画像 | スマホ実装画像 |
|---|---|---|---|---|
| ひかりの仕掛け庭 / Lightwork Garden | [開く](http://127.0.0.1:4324/ja/prototypes/play/light-garden/) | [Open](http://127.0.0.1:4324/en/prototypes/play/light-garden/) | [1440px](screens/light-garden-1440.png) | [390px](screens/light-garden-390.png) |
| ふたりの帰り道 / Two Ways Home | [開く](http://127.0.0.1:4324/ja/prototypes/play/two-ways-home/) | [Open](http://127.0.0.1:4324/en/prototypes/play/two-ways-home/) | [1440px](screens/two-ways-home-1440.png) | [390px](screens/two-ways-home-390.png) |
| ちいさな配送パズル / Tiny Delivery | [開く](http://127.0.0.1:4324/ja/prototypes/play/tiny-delivery/) | [Open](http://127.0.0.1:4324/en/prototypes/play/tiny-delivery/) | [1440px](screens/tiny-delivery-1440.png) | [390px](screens/tiny-delivery-390.png) |

```powershell
cd 'C:\projects\Web Game Studio'
npm run build:prototypes
npm run preview:prototypes
```

試遊サーバーは127.0.0.1:4324で起動。起動中に同じコマンドで二重起動しない。LAN bind・トンネルなし。日英は同一originで保存共有。4322/4323/4324は別originで保存も別。プライベートモード、ブラウザの保存削除、別端末への引継ぎは保証しない。

## 実装範囲

- **G001**: L01〜L05。鏡→2鏡→石垣と複数花→門の開放→光を一度別方向へ向けてから戻す。門のラッチとUndo、全花の同時点灯。5×5/6×6。
- **G002**: T01〜T05。共通入力→片側停止→位置調整→片方帰宅から退出→複数の壁を利用した帰宅。4×4×2。PC横並び/狭い幅は上下。両停止はUndoを増やさず、成功後の方向入力は無効。
- **G003**: D01〜D05。矢印→複数の曲がり角→交差と待機→2交差の待つ長さ→経路と待機。5×5/6×6、最大2台。D04は待機0/2で衝突、1で全員が届く。Pause/Step/Reset、配置保持、別の配置初期化。
- 各面のid/version・発見・盤面は`src/prototypes/levels.ts`。`answerKey`から隣接する`level-answers.json`の固定解答・各手/tickの中間状態を参照。ゲーム用ルールで全15問を再生して検証。解答データは配信しない。
- BGM/SEは追加していない。全編/中盤/終盤、追加ルール、広告報酬、アカウント、クラウド保存、第三者サービスは未実装。各作品の短いSPECは`docs/games/<slug>/SPEC.md`。

## 最終QA

| 検査 | 結果 | 根拠 / 範囲 |
|---|---|---|
| 型確認 | PASS | `npm run check`。0 errors/warnings/hints |
| 単体 | PASS | 41/41。既存12件＋新規29件。全15面の固定解答/中間状態、反射、門、同時移動、配送衝突/待機/ループ/上限、保存/bridge |
| 解答探索 | PASS | Light有限探索、Home位置ペアBFS、Delivery少数矢印と待機列挙で全15面の解あり。初期クリア0。[探索結果](solutions.json)。良問/面白さの証明ではない |
| 通常 / Design / Prototype build | PASS | 18 / 62 / 26 HTMLページ。prototypeは追加8ルート（日英案内＋各3 Play）。通常公開0、内部fixture1、Design10見本 |
| ルート・出力隔離 | PASS | 7/7。既存route3・Design隔離2・Prototype隔離2。通常/Designに新作route/runtime/artなし。prototype配信に解答JSONなし |
| 新作ブラウザQA | PASS | **16/16**。[生結果](browser-results.json)。全15面を実UIで操作してクリア→Next/Retry、Undo、保存、日英、失敗、pause、ロード再試行等 |
| 追加ブラウザ回帰 | PASS | 2/2。[生結果](extra-browser-results.json)。3作品のtouch、配送のEnter/Space、Homeクリア後の矢印/WASD無効、reset dialog中error→復帰、除去済みiframe拒否、主要44px |
| レスポンシブ | PASS（emulation） | 3作品×日英×320/390/768/1440px＝24組。横溢れ0、ゲーム内容のiframe内欠け0。最大盤面/長い説明を確認 |
| 保存/再開 | PASS | game別schema1/version0.1.0/levelVersion1。reload・言語切替・他作品非干渉。破損JSON/未知schema/無効levelを保持して一時モード。書込拒否もプレイ継続と失敗表示 |
| Bridge / 停止 | PASS | origin/source/gameId/protocol/generation、strict payload、旧iframe/誤schema拒否。内部モックで3作品停止、配送tick停止・追いつきなし。visibilityは注入イベントによる検証 |
| 既存Portal回帰 | PASS | 19/19。[既存suiteの今回結果](baseline-regression/browser-results.json)。日英144画面幅組合せ、fixture起動/保存/reset/保存失敗/モック停止復帰等。既存migration単体もPASS |
| Home/Play Baseline | 維持 | 既存components/styles/Layout/registry/fixture/save/ads/security設定にGit差分なし。既存Human Acceptance文書を変更しない。今回の回帰画像で再確認 |
| Console / 外部ネットワーク | PASS | 新作・既存suiteともpageerror 0 / 外部origin要求0。実広告なし |
| Secret Scan / Diff | PASS | Gitleaks 8.30.1 whole project/full index、検出候補0。hook `.githooks`維持。tracked diffと新規テキスト検査。最終実行結果は`technical-results.json` |
| 物理スマホ / 他ブラウザengine | NOT TESTED | Edge Chromium 153.0.4234.32で検証。端末emulationを実機PASSにしない |
| Humanの面白さ/採用 / 名称・権利・法務 / 一般公開 | PENDING / NOT TESTED | 既存Portalの受入とは別。実広告・本番サービス・市場反応も対象外 |

## 接続・保存・隔離

Connection Labの`wgs-fixture-v1`、`src/lib/save.ts`の9パネル保存、`src/scripts/play-shell.ts`、fixture本体は無変更。新作専用`wgs-prototype-v1`と`src/prototypes/state.ts`を追加し、GameId別の実型/値域検証を実施。unknown→anyによる保存の抜け道はない。保存元の破損/未知版を上書きせず、明示された作品全体の保存消去でのみ解除。Undo履歴は永続化しない。

共通layoutを再利用する専用Prototypeページを追加。サイズ報告は同じ検証済みenvelopeと400〜1600整数制約で受信し、iframeの高さだけ調整する。ページ非表示/モック/reset dialogでは入力とtickを止め、再開は新しい600msタイマーから。普通の試遊中に広告は発生しない。モックボタンは内部QA折りたたみ内のみで、既存のportal全体広告間隔adapterを再利用する。

metadataは別のprototype registry、stateはdraft。通常registryは元のfixture1本だけ。`--prototype-preview`でのみ別public/outDirへbundle生成。通常Homeのリンク非表示だけに依存せず、出力ファイル/内容を検査。Design Preview10作品は実作品へ変換しない。

## 修正・レビュー記録

- 初期のレベル探索で解けなかった案を修正し、全15面を再検証した。
- 独立read-onlyレビューで指摘された、クリア後にNextが消える入力、解答データの関連づけ、古いstaging asset残存、payload余剰field、エラー時dialog残存を修正した。
- ブラウザQAで、固定iframe高さによるタブレット幅の下部欠けを修正。新作16項目を再実行してPASS。
- 保存比較の初回テストにpostMessage処理待ち不足があり、永続化を待ってからsnapshot取得する検証へ修正した。保存仕様を弱めたものではない。
- **作業境界の一時的な逸脱**: Windows URLの空白変換ミスで生成JS2点を`C:\projects\Web%20Game%20Studio`へ誤出力した。`fileURLToPath`へ修正し、自身が生成した2点しか存在しないことと絶対パスを検証して当該誤出力ディレクトリを除去。最終不存在を確認。他の既存repoのソース/設定は変更していない。開始から一切境界逸脱がなかったとは記録しない。
- モデル記録: primaryは現在のGPT-6系実行環境で設計/実装/統合。詳細なruntime model IDは独立に取得できない。独立レビューの指定は`gpt-5.6-sol`、最終共有基盤read-only監査は明示的に`gpt-6-astra`でdispatch。最終監査は新規unit+output 31/31 PASS、共有bridge/save/pause/隔離に具体的ブロッカーなし。指定IDを実行環境から別途確認済みのIDと偽らない。global設定/モデル購入の変更なし。
- 共通接続/各作品/QA別の実測時間は採取していない。推測時間を実測として報告しない。

## Git / 停止

開始・終了HEAD/基準SHA: `fe5efc08239c1d40d253af07c33f0527bbae0db0`。その親: `95e3360b8de68a4df89a1a8889653af8c8e41d40`。branch `main`。開始時clean、upstream `origin/main`が同SHA、stashなし。今回remote live再照会なし。

作業ツリーは本バッチの未commit変更あり。index差分0、stage操作0、commit0、push0、deploy0、外部サービス接続/購入/実広告0。`git-state.json`に全変更ファイルと保全対象を記録。添付は`docs/games/GAME_PROTOTYPE_BATCH_01_R1.md`へ原文コピーしSHA256一致を確認した。START_HEREを変更せず、AGENTSには選択済み3作と今回範囲の短い参照だけ追加。

未解決の確認済み技術不具合: **なし（上記検証範囲）**。Humanには3本まとめて、操作/ルールの自然さ、解けた瞬間の気持ちよさ、もっと難しい問題を遊びたいかを確認する。今回はここで停止し、中盤/終盤/全編制作へ進めない。
