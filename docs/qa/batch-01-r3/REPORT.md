# Batch 01 R3 — 操作UI・撮影レイアウトの一括レビュー

2026-09-14。**3作品の実装・Visual自己レビュー・操作QAを完了。Human受入はPENDING。Security全件検査は候補1件のHuman判定待ちです。**

[試遊URL・9画面比較・6本の操作動画](REVIEW.html)を先に開いてください。推奨順は「操作バー → 縦で導入を一回 → 横へ切替 → 配送の一時停止／再開」です。

## 試遊

ローカルサーバーは127.0.0.1:4324。通常の保存・復元は同一ブラウザ／origin内の日英で共通です。

| 作品 | 通常 | 縦9:16 | 横16:9 |
|---|---|---|---|
| ひかりの仕掛け庭 | [通常](http://127.0.0.1:4324/ja/prototypes/play/light-garden/?layout=auto#prototype-stage) | [縦](http://127.0.0.1:4324/ja/prototypes/play/light-garden/?layout=portrait#prototype-stage) | [横](http://127.0.0.1:4324/ja/prototypes/play/light-garden/?layout=landscape#prototype-stage) |
| ふたりの帰り道 | [通常](http://127.0.0.1:4324/ja/prototypes/play/two-ways-home/?layout=auto#prototype-stage) | [縦](http://127.0.0.1:4324/ja/prototypes/play/two-ways-home/?layout=portrait#prototype-stage) | [横](http://127.0.0.1:4324/ja/prototypes/play/two-ways-home/?layout=landscape#prototype-stage) |
| ちいさな配送パズル | [通常](http://127.0.0.1:4324/ja/prototypes/play/tiny-delivery/?layout=auto#prototype-stage) | [縦](http://127.0.0.1:4324/ja/prototypes/play/tiny-delivery/?layout=portrait#prototype-stage) | [横](http://127.0.0.1:4324/ja/prototypes/play/tiny-delivery/?layout=landscape#prototype-stage) |

Englishへの各直リンクもREVIEW.htmlに掲載しています。現在の盤面を保って切り替えるには、ゲーム内の「設定 → 撮影用レイアウト」を使います。直リンクを新規ロードした場合は従来のsave restoreです。Undoや配送の走行途中までページ再読込で復元する機能は追加していません。

```powershell
cd 'C:\projects\Web Game Studio'
npm run build:prototypes
npm run preview:prototypes
```

起動済みの4324は二重起動しないでください。4322通常／4323Design／4324prototypeは別originで、保存も別です。レビューHTMLはローカルファイルでも閲覧でき、レビュー専用の静的配信を使う場合は127.0.0.1:4325です。

## KEEP / CHANGE

| 維持 | 今回の変更 |
|---|---|
| 18問×3作品、問題ID・content version・解答・ルール | native button、共通SVGアイコン、濃い主操作／淡いUtility／軽い補助導線 |
| 盤面Art、キャラクター、タイル、装置、既存CSS | 通常48px級の操作、押下中も当たり範囲を固定、キーボードfocus ring |
| 光の鏡＋門のUndo、二人の同時移動と履歴 | 解答中の無効Nextを撤去。成功後だけNext、最終面はLevels |
| 配送の編集設定、失敗地点・理由、既存tick | Go／Pause／Resume／Edit routeを既存run状態から導出。Stepは停止中の1tickのみ |
| schema1、game version0.1.0、旧saveの解釈 | Restartで変更済み盤面を捨てる場合のnative確認、キャンセル優先、focus復帰 |
| 図解、短い導入、2段階ヒント、完了履歴 | 設定内の3モード。縦は二人を上下、横は左右。正方形セル／座標を維持 |
| Portal Baseline、旧fixture、公開0本、Design10見本 | prototypeだけの局所変更。通常／Design出力に新runtimeなし |

撮影領域は`data-capture-frame`。設定・面一覧の展開・長いガイド・内部QAは撮影枠外です。Normalでは既存の盤面近くにガイドを置き、撮影時も枠外から開閉・実入力できます。構図ガイドは既定OFF、投稿サービスの公式safe zoneではありません。

表示設定は専用sessionStorageキーへ保存。ゲーム保存schemaやイベントとは独立しています。設定保存拒否でも切替は可能。配送は切替前にtimerを解除し、同じrun／tickを保持したままlocal pauseへ移ります。設定・モック・pagehideが重なっても、残る停止理由を無視して再開しません。

## QAの結論

| 区分 | 結果 | 証拠／実施範囲 |
|---|---|---|
| 型 | PASS | `npm run check`: errors / warnings / hints = 0 |
| 単体・path安全性 | PASS | 170/170。54問の既知解答・中間状態・独立oracle、旧save、空白／日本語／兄弟path／traversal／junction拒否を含む |
| build | PASS | 通常18／Design62／prototype26 HTML |
| route・出力隔離 | PASS | 7/7。日英、公開0・fixture1・Design10・prototype3、解答データの不混入 |
| 全54問の実UI再生 | PASS | [33項目](full-run-browser-results.json)。3×18問を順番に解き、既存中間assert、章移動、全編成功と再読込を確認 |
| 状態維持 | PASS | [9項目](state-results.json)。生のsave／イベント列／iframe srcに加え、盤面・Undo・hint・guide・run全体・完了履歴を比較。保存不能、停止理由の重複、未クリア／失敗／clear、旧restoreも確認 |
| 保存・bridge・モック等回帰 | PASS | [15項目](regression-results.json)。origin/source/protocol/game/generation/payload拒否、旧iframe、日英、破損／未知保存保持、書込拒否、モック、pagehide、旧fixture |
| 3モード・日英・導入／12／18面 | PASS | [54場面](layout-results.json)。盤面・主要操作の枠外なし、主要hit area 44px以上 |
| 狭幅・低いPC高さ・終盤clear | PASS | [54条件](responsive-results.json)。Normal 320/360/390/768/1280、撮影枠360×640・432×768・960×540。低いPC高さ600。clearによる盤面・Undo位置の移動なし、guide／設定の開閉、最終面の不正Nextなし |
| 操作Visual・コントラスト | PASS（限定範囲） | [3作品](control-results.json)。押下中のhit box不変、active control文字4.5:1以上、utility縁3:1以上、keyboard focus、reduced-motion。全体の適合認証ではない |
| Portal回帰 | PASS | [19項目](baseline-regression/browser-results.json)。Home／Play／fixture、日英、responsive、mock、no-JS等 |
| Security full index | PASS | Gitleaks8.30.1、候補0。indexのscanでありstage操作ではない |
| Security whole project | **FAIL / HUMAN REVIEW REQUIRED** | `.tmp/r3-before/manifest.json`、`generic-api-key`候補1件。自動例外化・削除・外部認証確認はしていない |
| Diff／保全 | PASS | [Git証拠](git-state.json)。START_HERE・Portal・R2証拠・ルール／問題／Art／saveの開始時hash一致。欠損0、index差分0 |
| Codex Visual自己レビュー | 実施・修正済み | 実Edgeを手動で操作し、実ブラウザの撮影画像も目視。自動件数を初見UX受入とはしていない |
| Human Art以外のUI／全編受入 | **PENDING** | 今回の一括レビューで判断いただく段階 |
| 物理スマホ、Safari／Firefox、投稿後の重なり | **NOT TESTED** | Chromium viewport／touch emulationは実機の代替ではない |
| 公開、広告、市場／再生数／収益効果、法務 | **NOT TESTED / 未実施** | 権限を追加していない |

Security候補は保全用に生成した記録内の検出です。生成物であることだけでfalse positiveとは確定しません。[SECURITY.md](../../../SECURITY.md)の「New findings require Human judgment」に従い、候補の実値は表示せずHuman判定待ちとしています。全検査PASSとは報告しません。

## Visual自己修正・検証の限界

- 低いPC画面で、長いiframe内のnative dialogが表示領域外へ出た。実際に見えているiframe部分へサイズ・位置を合わせ、親scroll／resizeとiframe resizeで更新。320px英語と600px高さも再確認した。
- 英語の最終クリア文で盤面／Undo位置が動いた。結果の領域を確保し、縦では通常feedbackを短い達成文で置換。最終面クリアと全18問クリアは短文でも区別する。
- ガイドを盤面近くへ戻した際、スマホ初回の方向／出発が遠くなった。Normalの短い図解を横組みへ整理し、実操作の直後に結果領域を置いた。初回主要操作が指定ゲームviewport内に入る既存assertを通している。
- 配送の失敗後も主操作位置を維持。失敗理由／地点を残してEdit routeだけを強く示し、Reset layoutと混同しない。
- 提出動画をdecodeして目視し、element撮影の自動scrollでcrop位置が変わる問題を修正。十分な高さの同一viewportで撮影位置を固定し、操作前後の領域原点一致をassert。ふたり横表示のNextと達成文の重なりも専用行で解消し、終盤の文字／CTA非交差assertを追加した。
- 独立レビューでnative dialogの読み上げ名と、PCで内容が変わらないDetailsボタンを発見。名前を付け、全説明を表示済みの幅では冗長なDetailsを隠した。
- 追加QAのモック要求が入力直後の抑制に止まった件は、1.2秒抑制の後に重複停止を検証するよう修正。focus-visible測定もkeyboard入力状態で実施するよう修正。過去のStep-from-edit検証はGo→Pause→Stepへ変更し、中間assertは維持した。
- 個人ブラウザの英語ページに自動翻訳が掛かったため、個人設定は変更せず、日本語の手動操作と、翻訳なし独立Edge contextの英語画像・QAを分けた。

Landscapeは960×540の制作枠を維持します。狭いスマホでは無理に縮小せず、枠外にNormalへの案内と復帰操作を表示します。選択自体は保持されます。Portraitも最小360pxの制作枠が必要です。OS回転・fullscreenを必須にしていません。実装は現在のportal→iframe経路で検証し、新規fullscreen機能や多重埋込機能は追加していません。

## 画像・動画の寸法

- [9画面比較](REVIEW.html#compare)：導入の同じ問題・初期状態、ゲーム領域だけ。各原寸画像へリンク。
- 3作品の操作バーBefore／After、pressed／clearの拡大図。Beforeは実装前に実Edgeで記録。
- 6本×12秒の実操作WebM。縦432×768／横960×540をブラウザ録画からclipし、拡大していません。読み込み前後のPortal UIは提出動画の領域に含めていません。
- HD静止画は別のブラウザ描画です。縦432×768 CSS px × DPR2.5 → 1080×1920、横960×540 × DPR2 → 1920×1080。領域原点をCSS pixelへ丸めたclipで余分な1pxを除き、低解像画像の拡大はしていません。
- [media manifest](media-manifest.json)にCSS／DPR／出力pxを記録。動きの連続PNGも併記しています。動画の内容は実操作の例で、投稿後の安全領域や初見理解の保証ではありません。

## 環境・差分・停止点

- 主担当実モデル：**gpt-6-astra**。現在のセッション`turn_context.model`で確認。独立担当は読み取り専任の継承モデルで、独立したモデルattestationは未取得。実装・統合・Visual判断・最終確認は主担当。
- branch **main**、HEAD **fe5efc08239c1d40d253af07c33f0527bbae0db0**。開始時の未commit MVP／R2を保全し、その上へ差分統合。remote live照会なし、local upstream同SHA。
- 既存ファイルへの今回の変更はREADME、prototypeのgame-r2／board-view／shell、prototype-assetsの5ファイル。新規は共通controls／R3 CSS、R3仕様コピー、QA scripts／証拠・レビュー資料。Portal本体やゲームのルールは変更していない。
- 開始時266ファイルのhash、必要なprototypeソースをignored `.tmp/r3-before/`へ保全。添付仕様はRepo内へbyte一致コピー。
- **stage / commit / push / deploy / 実広告 / 購入 / 新規外部サービス / global設定変更 = すべて0。**
- **Humanレビュー待ちで停止。** UI／撮影／全編のHuman受入とSecurity候補の判断が残ります。今回の結果を完成品・公開版・全面PASSへ昇格しません。
