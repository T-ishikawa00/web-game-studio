# Batch 01 R2 — 3作品・全編Alphaの一括レビュー

2026-09-13。**各18問、3章、計54問の通しプレイAlphaを実装。Visual/UX自己レビュー後のHumanレビュー待ち。** ゲーム性の継続制作はHuman採用済み。見た目・初見理解・全編の楽しさ・完成品としての受入は未承認です。

主担当の実モデルは **`gpt-6-astra`**。現在のセッションの`turn_context.model`から確認。global設定・課金プランの変更なし。独立担当の問題設計・検証・レビューを主担当が統合しました。

## すぐ試遊

サーバーは **127.0.0.1:4324**。リンク末尾のanchorはゲーム位置へ移動するためのものです。保存は同一ブラウザ・同一originの日英で共通。別port・別ブラウザ・別端末への同期はありません。

| 作品 | 日本語 | English | 全編 |
|---|---|---|---|
| ひかりの仕掛け庭 | [遊ぶ](http://127.0.0.1:4324/ja/prototypes/play/light-garden/#prototype-stage) | [Play](http://127.0.0.1:4324/en/prototypes/play/light-garden/#prototype-stage) | 18問・3章 |
| ふたりの帰り道 | [遊ぶ](http://127.0.0.1:4324/ja/prototypes/play/two-ways-home/#prototype-stage) | [Play](http://127.0.0.1:4324/en/prototypes/play/two-ways-home/#prototype-stage) | 18問・3章 |
| ちいさな配送パズル | [遊ぶ](http://127.0.0.1:4324/ja/prototypes/play/tiny-delivery/#prototype-stage) | [Play](http://127.0.0.1:4324/en/prototypes/play/tiny-delivery/#prototype-stage) | 18問・3章 |

[日本語の3作品一覧](http://127.0.0.1:4324/ja/prototypes/) / [English collection](http://127.0.0.1:4324/en/prototypes/)

「面選択 / Stages」から全問へ直接移動できます。初回ガイドは閉じる・再表示・詳しく読むが可能。ヒントは任意の2段階で、解答を自動適用しません。最終面だけのクリアと全18問クリアを画面上で区別します。

```powershell
cd 'C:\projects\Web Game Studio'
npm run build:prototypes
npm run preview:prototypes
```

起動中の4324を二重起動しないでください。通常出力4322、Design Preview4323、prototype4324を区別しています。LAN bind・公開トンネル・deployなし。

## Before / After・実装画像

[画像比較ギャラリー](REVIEW.html)。以下はすべて実Edgeブラウザのゲーム本体です。Before/Afterは同じ最初の問題・初期状態を比較。Portalの画像や生成イメージではありません。

| 作品 | PC Before | PC After | 導入ガイド | 中盤 | 終盤 | スマホ |
|---|---|---|---|---|---|---|
| 光 | [Before](screens/light-garden-before.png) | [After](screens/light-garden-after.png) | [導入](screens/light-garden-after-guide.png) | [12面](screens/light-garden-middle-initial.png) | [18面](screens/light-garden-final-initial.png) / [完成](screens/light-garden-final-solved.png) | [ガイド](screens/light-garden-mobile-guide.png) / [盤面](screens/light-garden-mobile.png) / [終盤](screens/light-garden-mobile-final.png) |
| ふたり | [Before](screens/two-ways-home-before.png) | [After](screens/two-ways-home-after.png) | [導入](screens/two-ways-home-after-guide.png) | [12面](screens/two-ways-home-middle-initial.png) | [18面](screens/two-ways-home-final-initial.png) / [完成](screens/two-ways-home-final-solved.png) | [ガイド](screens/two-ways-home-mobile-guide.png) / [盤面](screens/two-ways-home-mobile.png) / [終盤](screens/two-ways-home-mobile-final.png) |
| 配送 | [Before](screens/tiny-delivery-before.png) | [After](screens/tiny-delivery-after.png) | [導入](screens/tiny-delivery-after-guide.png) | [12面](screens/tiny-delivery-middle-initial.png) | [18面](screens/tiny-delivery-final-initial.png) / [完成](screens/tiny-delivery-final-solved.png) | [ガイド](screens/tiny-delivery-mobile-guide.png) / [盤面](screens/tiny-delivery-mobile.png) / [終盤](screens/tiny-delivery-mobile-final.png) |

動画の代わりに、実操作→結果の連続3枚を収録しています。

| 光 | ふたり | 配送 |
|---|---|---|
| [操作前](screens/light-garden-intro-initial.png) → [鏡を回す](screens/light-garden-interaction-2.png) → [花が開く](screens/light-garden-interaction-3.png) | [操作前](screens/two-ways-home-intro-initial.png) → [同時に一歩](screens/two-ways-home-interaction-2.png) → [同時帰宅](screens/two-ways-home-interaction-3.png) | [操作前](screens/tiny-delivery-intro-initial.png) → [矢印設定](screens/tiny-delivery-interaction-2.png) → [配達完了](screens/tiny-delivery-interaction-3.png) |

画像はゲーム全体が見えるよう、同じ幅で撮影時のみviewportの高さを伸ばした全要素キャプチャです。寸法QAは1440×900、390×844、360×800、320×800、768×800へ戻して測定。Chromiumの縦長要素撮影で画面外fixed要素が写り込む問題を避けています。画像への合成・塗り消しはしていません。`*-draft-*` / `focus-review*`は途中診断用で、最終比較資料には使いません。

## 実装と問題の考え方

導入6問 → 中盤6問 → 終盤6問。旧5問のID/version/盤面を保持し、各作品に13問を追加。中盤・最終体験から学習順を設計し、全問に日英の発見・2段階ヒント・解答・中間状態・反例を用意しました。

| 作品 | Art / 操作 | 中盤と最後の体験 | ルール範囲 |
|---|---|---|---|
| 光 | 石枠の温室、ガラスの光源、回転する金属鏡、光で開く花。門とスイッチを同じ徽章で対応 | L12は門と分岐。L18はA開放→B開放→組替え→分岐光で3花同時点灯 | 最大2門、固定分光器1個。鏡は固定セルの2姿勢。安定後の同時点灯、門と鏡のUndo |
| ふたり | 絵本の見開き、輪郭と徽章の異なる二人・家。共通方向パッド、壁で止まる状態を表示 | T12で縦横の位置調整。T18は家からの退出と両軸の調整を経て、最後の共通右入力で二人とも動いて帰宅 | 同時移動・壁・家のみ。家は通過可能。両者停止はUndo履歴を増やさない |
| 配送 | 玩具の拠点、荷物付きロボット、番号付き回転plateと固定paint、時計・待機数・残り表示、失敗地点の強調 | D12は共有点と待機。D18は第1共有点A先→第2共有点B先。長い道と短い道で必要な待機が変わる | 最大2台、2待機点。0〜3拍の型を検証したが実問題は0〜2で足りたため無意味に3拍を追加しない。編集→出発→停止/再開→設定を残して調整 |

配送の複数セルの合流道路は、無条件の固定矢印では同じ位置・向きになった2台が同じ未来経路をたどり、別々の受取口と両立しにくい制約があります。新しい交通ルールを足さず、共有点・直前に空いたマスへの進入・複数交差で意図を実装。調整理由は[配送content](../../games/tiny-delivery/R2-CONTENT.md)に記録。

[光の全問と検証](../../games/light-garden/R2-CONTENT.md) / [ふたりの全問と検証](../../games/two-ways-home/R2-CONTENT.md) / [配送の全問と検証](../../games/tiny-delivery/R2-CONTENT.md)

探索と解答再生は解の存在・明記した有限範囲の性質を示します。Humanの面白さや独自性の証明ではありません。T18の最短14手と全解に必要な8回以上の片側調整、D18の144設定中11成功と全成功の通行順は、それぞれの独立検証範囲内の結果です。

## QA

| 区分 | 結果 | 確認範囲・根拠 |
|---|---|---|
| Technical: 型 | PASS | `npm run check`: errors/warnings/hints 0 |
| Technical: 単体 | PASS | 170/170。旧41件を保持、独立oracle・全問証拠・拡張save・sparse payload・pathを追加 |
| Technical: build | PASS | 通常18 / Design62 / prototype26 HTML。prototypeは8個の日英専用route |
| Technical: routes / 隔離 | PASS | 7/7。公開0・fixture1・Design10・prototype3。通常/Designに新作route/runtime/art/解答を含まない |
| Technical: 全編実UI | PASS | 3作品×18問を順番に実入力、証拠状態を照合、章移動、全編成功、再読込。[結果](full-run-browser-results.json) |
| Technical: 画面幅 / ガイド | PASS | 3作品×日英×5幅×導入/12面/18面＝90条件。横溢れなし、操作対象44px以上。ガイド閉じる/再表示/詳しく、2段階ヒント。最初の操作はゲーム上端から指定viewport高さ内 |
| Technical: 保存 / bridge / 停止 | PASS | 15項目。未知/破損保存保持、旧保存、日英/ゲーム間分離、書込拒否・silent loss、origin/source/protocol/gameId/generation/payload拒否、旧iframe拒否、pause/復帰、エラー再試行。[結果](regression-results.json) |
| Technical: Portal回帰 | PASS | 既存suite19/19。Home/Play/fixture、日英6幅、入力、保存、モック、失敗、no-JS、reflow。[結果](baseline-regression/browser-results.json) |
| Technical: Security / diff | PASS | Gitleaks8.30.1 whole working projectとfull index、候補0。repo-local hook維持。`git diff --check`と新規テキスト検査 |
| 自己Visual/UX review | 実施・修正済み | 下記に発見と修正。自動操作を初見ユーザーテストとは呼ばない |
| Human Visual / 初見UX / 全編受入 | **PENDING** | 今回まとめて試遊いただく段階 |
| 物理スマホ・他browser engine | **NOT TESTED** | Edge Chromiumのviewport/touch emulation。実機操作の代替ではない |
| 一般公開・実広告・法務・市場評価 | **NOT TESTED / 未実施** | 今回の承認範囲外 |

ブラウザの予期しないJSエラー0、外部origin要求0。通常試遊は広告なし。音楽/SEは未追加、外部フォント/analytics/新規サービスなし。reduced-motionを尊重し、強制演出待ちを設けていません。

## 自己レビューで直した点

- 余白に比して小さかった盤面を拡大。色替えだけでなく、駒・装置・材質・開放/点灯/到着/失敗の状態を描き分けた。
- PCは盤面の横に短いガイド。スマホでは短文＋実ルールの図を先に置き、詳細は任意。方向パッドと出発までの距離を再測定した。
- ふたりのスマホ上下配置では、初回ガイド中の方向入力が画面下へ離れすぎた。仕様の「上下を第一案」を実画面で見直し、左右の庭を同時比較する配置へ変更。盤面セルは直接タップせず、方向ボタン44px以上を維持。
- 配送の出発を主操作とし、コマ送り・全配置初期化・全進行消去を別の補助操作へ整理。固定矢印と編集可能方向を視覚と文字で区別した。
- 英語の長い見出しの横溢れ、320px終盤の44px不足を修正。最狭幅ではprototype枠だけ全幅化し、既存Portal Home/Playのデザインには触れていない。
- 独立VisualレビューでD01説明図の矢印座標誤りを発見し修正。説明があるだけではUX PASSとしなかった。
- 旧iframe拒否テストの保存snapshot取得にpostMessage完了待ちが不足していた。保存後の状態を待つよう検証側を修正し、拒否assertは維持。過去のテスト側不備は回帰結果のpriorRunsに残した。

## 保存・旧MVP・path事故の保全

旧MVPは開始時のファイルhash・Git差分とともにignored `.tmp/r2-before/`へ保全。元のprototypeソース9ファイルの退避hash一致、Portal/fixture/保存/広告/Security/既存QA等96ファイルの開始時hash一致を確認しました。[Git・保全証拠](git-state.json)

旧5問はcontent versionを変える必要のない同一盤面を維持。schema1 / game version0.1.0と元のIDを保持。新規面のみに厳密なgates/waits配列を追加。全15旧保存を単体で確認し、日英ブラウザで再開を確認。不正・未知schema・無効levelは原データを自動上書きせず、一時モード表示。配送の再開は編集配置からです。チュートリアルの表示記録はゲーム別キー、進行は同一originの日英共通です。

前回の空白パス事故はURLのpathnameをファイルパスとして使ったことが原因で、`fileURLToPath`へ修正済みでした。今回、repoルートからの相対パス要素検証、現存/非現存リンクの`lstat`検証を追加。空白・日本語の書込み成功、兄弟prefix/誤エンコード/traversal/生きたjunction/リンク先不存在junctionの書込み前拒否を確認。build・素材・新しい撮影出力にguardを使用しています。誤出力先`C:\projects\Web%20Game%20Studio`は不存在。今回の範囲外出力・範囲外削除はありません。

## Gitと停止点

- branch: `main`
- HEAD: `fe5efc08239c1d40d253af07c33f0527bbae0db0`（開始時と同一）
- upstreamはローカル追跡refが同SHA。今回はremote live照会・書込みなし。
- index差分0、stashなし。既存未commit MVPにR2差分を追加した状態。
- **stage / commit / push / deploy / 実広告 / 購入 / 新規外部サービス接続：すべて0。**
- START_HERE原本は変更なし。添付のrepo内コピーは原本SHA256一致。
- 工程別工数は未計測。推測を実測として記録しない。

確認済み技術不具合は上記検証範囲で未残存。ただし、初見理解と長時間の楽しさはHuman試遊待ちです。物理端末での触りやすさ、法的独自性・名称、市場性、公開可否は未確認です。

Humanに確認いただきたいのは次の3点です。

1. 見た目が、ゲームとして遊びたい水準になったか。
2. 説明を探し回らず、最初の一手とルールが分かったか。
3. 中盤・終盤で考え方が深まり、最後まで遊ぶ価値があったか。

ここで一括Humanレビュー待ち。完成品・公開版・受入PASSへ昇格しません。
