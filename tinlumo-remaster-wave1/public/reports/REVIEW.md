# TINLUMO MULTI-GAME VISUAL REMASTER — WAVE 1

**LOCAL FULL CANDIDATES COMPLETE — HUMAN REVIEW READY**

Human Acceptance: **PENDING**. 最終採否の前にProductionへ置換しません。

## Reviewの入口

- [Unified Review](http://127.0.0.1:4410/index.html?lang=ja)
- [5作品Portal](http://127.0.0.1:4410/portal.html?lang=ja) / [English](http://127.0.0.1:4410/portal.html?lang=en)
- [Lightwork全18面](http://127.0.0.1:4410/lightwork/index.html?lang=ja)
- [Two Ways全21問](http://127.0.0.1:4410/two-ways/index.html?lang=ja)
- [PROJECT MAGNET全3作戦](http://127.0.0.1:4410/magnet/index.html?lang=ja)

5作品の一覧 → 各作品の実操作 → Cover A/B/C → Cross Gameの順に確認できます。新3作品の生成Concept、実ゲーム画面、実時間動画は別々に表示しています。Coverは実ゲーム描画だけを使用しています。

## 選択した方向と改修内容

| 作品 | Codex選択 | 立体構造と表現 | 全編 |
|---|---|---|---|
| Lightwork Garden | L1 — Luminous Conservatory | 石の作業台と温室の骨組み。真鍮・銀の光学器具、レンズ、門、植木鉢と開花。光路と因果を最優先。 | 18面・18/18通常操作PASS、60入力 |
| Two Ways Home | T1 — Parallel Little Towns | 運河を挟む二つの中庭。屋根・窓・石積み・花箱、コート姿のふたり。縦画面は二つの実カメラ。 | 21問・21/21通常操作PASS、166入力 |
| PROJECT MAGNET | M2 — Bright Industrial Frontier | 支柱と側壁を持つ工業港のデッキ、ガントリー、機体、装甲片。磁力・射出・破壊の明瞭さを保つ。 | 3作戦×6区画・ボス・進化・装備・解放を通常進行で確認 |

KEEPはルール、問題ID・順序、解答、コア入力、進行、保存schema、Accepted Sound。REBUILDは造形、空間、camera、material、lighting、UI/HUD、title/select/resultとレスポンシブ構図です。色替えや生成背景の貼替えではありません。

## 内部Quality Gateと再制作

- Lightworkの初期描画は白飛び、建築の見切れ、狭幅での成功ボタン欠落を検出し、不採用。照明・camera fitting・結果配置を再設計してrev04へ。
- Two Waysは320pxの横溢れ、小さいナビ、成功カードの重なり、成功直後のPause/resize/languageで結果が失われる問題を修正。static material batchingで同一sceneのdraw callを730→402に削減。
- Magnetは平坦な白い床に見えた初期版を不採用。デッキ側壁・脚・構造材・奥行き、異なる機体と進化形態を作り直し、実戦入力で照準と重なりを確認。
- 生成Conceptの柔らかな間接光・表面密度とブラウザー実描画には差があります。操作対象に被るcinematic blurや過剰なglowは採用していません。内部審査の通過とHumanの美的採用は別です。

## QAと証拠

| 項目 | 証拠 |
|---|---|
| Lightwork全18面の全中間状態 | internal/lightwork-normal-input.json |
| Two Ways全21問の全中間位置 | internal/two-ways-normal-input.json |
| Lightwork入力・保存・設定・idle | internal/lightwork-behavior.json / responsive.json |
| Two Ways最終入力・保存・8幅・通信 | two-ways/internal/browser-qa.json |
| Magnet実戦・作戦解放・最終QA | magnet/internal/browser-qa.json |
| 5作品Portal・Cover・Reviewの統合 | internal/portal-review-qa.json |
| 画像・動画の出所 | internal/browser-captures.json / workstream-evidence.json / cover-provenance.json |
| 9,074既存ファイル・Git保全 | internal/preservation.json |
| 今回候補だけの秘密検査 | internal/security-summary.json |
| 最終停止条件の個別判定 | internal/final-gates.json |

既存215 testsはPASS。対象別90 /117 /28正本+28copyもPASSですが、重複を含むため合算して独立テスト件数とは扱いません。strict typecheck / isolated buildを各候補で実行。LightworkとTwo Waysにはterminal lossがないため、未達・両側blocked・Undo/retryを失敗／修正ケースとして確認しています。

指定8幅は1440 /1280 /1024 /768 /430 /390 /375 /320。約44px以上の操作領域、横溢れ、画面内到達、重なりを実ブラウザーで確認しました。これはローカルWindows Chromiumのviewport検証であり、実機iPhone /Android /Safari /指操作ではありません。Magnetのポインター・pen操作とEnter/Escapeは実操作PASSですが、方向キー/WASDの長押し移動は使用可能なブラウザー操作APIで再現できずNOT TESTEDです。正本の移動ロジックとテストは維持しています。

## Coverの採否

各3案、計9案をlandscape1600×1000とportrait1200×1500で書き出しました。native scene → HTML/CSSのcrop・mask・文字組み → browser PNGという経路です。生成Concept・競合asset・架空のゲーム状態は含みません。入力PNGの実寸とhash、段階、出力条件はcover-provenance.jsonに記録しています。

初期表示は3作品ともA。AはPortal一覧で世界全体を伝えやすい初期推奨であり、Human選択ではありません。Bは近接・密度・アクション、Cは余白と場面の個性を重視します。Hakoriloの既存Cover Aも変更していない比較用初期値です。

## 保存と音

詳細はCOMPATIBILITY.md。全作品の保存形式を維持し、破損・storage拒否・競合を保存成功と表示しません。PreviewはProductionとは別originです。Productionの実データを取り込んだ、または端末間移行したという主張はしません。

Lightwork LG-C /Two Ways TW-Cの専用SFXとBGMなしを維持。Magnetは元のprocedural SFXと音声挙動を継承。Marketing動画の判断をゲーム本体の音の変更理由にしていません。Lightwork/Two Waysの記録動画はcanvasのみで音声trackなし。Magnet動画のtrack条件は各clipとprovenanceを参照。聴感のHuman採用はPENDINGです。

## 性能上の限界

PERFORMANCE.mdにviewport、draw calls、三角形数、active interval、CPU submit、改善・tradeoffを記録しています。CPU submitはGPU時間ではなく、intervalは実機FPS保証ではありません。特にTwo Waysの縦画面は実カメラ2passと約37–45MiBのgeometry属性を使うため、低性能端末・熱・battery・Safariは別Gateです。物理端末はNOT TESTEDです。

## 保全・権限・Security

新実装はtinlumo-remaster-wave1配下のisolated previewのみ。既存のHakorilo、Island、Production Portal、Marketing、Ads、Consent Cは変更していません。PRODUCTION_CURRENT.mdは今回の区切られた追記だけです。開始時のbranch /HEAD /upstream /indexと既存dirty/untrackedを保全しています。

既存Security raw FAIL17 /historical FAIL11 /S04S05 UNKNOWNは保持し、今回のscoped scanと混同しません。秘密値・credential・private profileをConcept promptへ含めていません。標準画像生成の既定出力のみ、今回のHuman例外を使用しました。最終Concept・prompt・生成条件・採否・出所は各workstream internalへ保存しています。

stage /commit /push /deploy /Production replacement /public release /account変更 /実広告 /購入は実施していません。local serverは127.0.0.1:4410だけで待受けます。LAN公開ではありません。

実利用model ID: Primary /Lightwork /Two Ways /MagnetすべてUNKNOWN。この環境から実IDを確認できなかったため、役割名をmodel IDへ置換していません。

## Humanが判断する6点

1. Lightwork：Portalから入って品質差を感じるか。
2. Two Ways：Portalから入って品質差を感じるか。
3. Magnet：Portalから入って品質差を感じるか。
4. 各ゲームのgameplay readabilityは維持されているか。
5. 各ゲームのCoverはA/B/Cのどれか。
6. 5作品一覧は本当に同じ高品質Studioに見えるか。

ここで停止し、HUMAN_MULTI_GAME_REMASTER_GATE_PENDINGを維持します。
