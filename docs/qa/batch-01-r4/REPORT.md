# Batch 01 R4 — 盤面への直接操作レビュー

2026-09-14。**3作品のローカル実装・技術QA・Visual自己レビュー完了。Human AcceptanceはPENDING。Security全件検査は候補1件でFAIL／Human判定待ち。**

最初に [起動中のReview Pack](http://127.0.0.1:4325/) を開いてください。[ローカルHTML](REVIEW.html) も同じ内容です。日英・通常／縦9:16／横16:9の18試遊リンク、同条件R3→R4比較、代表9画面、3本の短い実操作動画を集約しています。

## 変更内容

| 作品 | R4の主操作・補助UI |
|---|---|
| ひかりの仕掛け庭 | 既存の鏡クリック／タップを主操作に継続。drag-off・cancel・多指を拒否。大きな常設バーを外し、Undo／メニューとクリア後だけのNextを残す |
| ふたりの帰り道 | どちらの盤面からでも共通スワイプ／マウス方向ドラッグ。矢印／WASD継続。D-padは初回案内とメニューから選択。OFFではDOMから除去。狭幅通常と縦は上下、横は左右 |
| ちいさな配送パズル | 矢印は一段ずつ直接変更。時計は現在値付きの離散選択。編集Go／走行Pause／停止Resume／失敗Edit route／成功Next。Stepと調整は停止中だけ。調整に戻っても経路・待機設定は保持 |

鏡／矢印は既存のactionへ一回だけ接続。ルール関数を複製していません。配送はR3で編集Undoを持たないため、新規履歴機能は追加していません。

**時計と矢印が同じマスにある面**は、2つの44px領域を重ねず、その時計だけ盤面直下の短い入口から選択します。仕様5章の短い下部設定行を利用した調整です。専用の時計マスは盤面上の時計を直接操作します。非編集phaseでは両方とも無効です。時計popupは元の矢印へclickを通しません。

初回は短い目的・盤面近くの操作文・対象の目印を表示。大きな図解はメニューの遊び方へ移し、元の図・ルール説明・2段階ヒントを再利用しています。時計の同じ値を選んでも「編集できた」と進めません。メニュー、設定、Restart確認、時計はnative dialogで背景入力を抑止し、Escape／閉じるでfocusを戻します。

## 入力の契約

- スワイプの最終変位は **20 CSS px以上**、主軸は他軸の **1.3倍以上**。速度条件なし。静止・手ぶれ・ほぼ斜め・開始点へ戻す動作は無入力。長い／遅い操作もrelease時に最大一手です。
- 盤面外release、pointercancel、未確定中のlost capture、多指、Escape、pagehide、resize、Menu、mode切替は未確定入力だけ取消。tapは10 CSS pxを超えて動いた時点で取消。
- Pointer Eventsでtapを検証し、実際の編集は既存click経路。touchの暗黙capture解除後も正常なclickを一度だけ受け付けます。スワイプ後のclickを移動へ変換しません。
- ふたりの盤面だけ `touch-action:pinch-zoom`。ページ全体のpan/zoom禁止は追加していません。Tabで盤面へ入れ、連続キー操作後もfocusを維持。メニュー・フォーム・Portal操作をゲーム入力に変換しません。
- D-pad設定は専用sessionStorageで進行schemaと分離。保存不能でもメモリ上で使用可能。旧進行・ガイド保存は維持。
- mode切替は同じiframe／engine上で実施。配送走行を止め、明示Resumeまで停止。広告・非表示等の別停止理由をメニュー終了で解除しません。

## 技術QA

| 区分 | 結果 | 範囲・証拠 |
|---|---|---|
| 型／build | PASS | check errors/warnings/hints 0。通常18／Design62／prototype26 HTML |
| 単体 | PASS 170/170 | 54問の既知解答・独立oracle・中間assert・旧save・空白path／兄弟path／junction等 |
| route／build隔離 | PASS 7/7 | 通常・Design・prototype、公開0／fixture1／Design10／prototype3、解答データ不混入 |
| 全54問の実UI再生 | PASS 54/54 | [full-run-results](full-run-results.json)。既存中間状態を維持し、各18問の終了・明示Next・完了履歴のreloadまで確認。ふたりは選択式D-padだけで全18問 |
| 追加入力 | PASS 14/14 | [input-results](input-results.json)。実Edgeのmouse／keyboard／touch emulation、4方向・キャンセル境界・clock・focus・Restart・停止の重複 |
| 状態／座標 | PASS 6/6 | [state-results](state-results.json)。raw save／イベント／iframe／board／history／hint／run比較。DPR2.5・CSS scale・scroll・モード変更後の実tap。Tabから連続移動 |
| 日英・3表示 | PASS 54/54 | [layout-results](layout-results.json)。導入／12／18面×3作品×3mode×2言語。盤面・ボタン・状態表示の枠外0、測定対象44px未満0 |
| 狭幅等 | PASS 68/68 | [responsive-results](responsive-results.json)。通常1440×900、390×844、360×800、320×800、D-pad ON/OFF、縦360×640・432×768。遊び方・メニューscrollとfocus |
| 保存／bridge／mock等 | PASS 15/15 | [regression-results](regression-results.json)。R3検証を新UIの操作経路へ適応。旧save・日英共通・破損保持・reset範囲・pause・load failure・旧fixture |
| Portal Baseline回帰 | PASS 19/19 | [browser-results](baseline-regression/browser-results.json)。Home／Play／fixture、日英・6幅・200% reflow、touch emulation、no-JS、mock、画像復旧 |
| Security full index | PASS | Gitleaks8.30.1、候補0。index内容の検査でありstage操作ではない |
| Security whole project | **FAIL／PENDING** | 候補1件。値非表示の調査は下記。実装QAをもってSecurity全体PASSとはしない |
| 保全・差分 | PASS | [git-state](git-state.json)。477ファイルの開始時記録、欠損0、ルール／54問／Art／save／Portal／旧fixture／R1〜R3証拠の変更0、index不変 |

今回の変更に伴う旧テストのUI前提は、常設D-pad→明示ON、時計循環クリック→popup選択、常設Restart/Settings→Menu、常設disabled Step→停止中だけ、という範囲で更新しました。ゲームの中間状態assert、保存・失敗・停止の期待値を弱めていません。

`git diff --check` はPASS。未trackedテキスト全件へのno-index検査は、既存R3入力5文書とbyte一致保存したR4添付の計6文書でMarkdown改行用の末尾空白／既存EOF空行を検出しました。開始時bytesまたは添付原本との一致を確認し、原本を整形して消さず記録しています。新規実装コードの指摘は0。[diff-check](diff-check.json)。

## Visual自己レビュー・修正

実Edgeで生成した日英・3表示・狭幅・中終盤の画像を主担当が目視し、実pointer/touch/keyboardの操作テストと合わせて確認しました。Computer Useの接続はタイムアウトしたため、既存Edge＋Playwright経路を使用しました。

- 縦横のCSS grid継承を修正し、盤面・feedback・操作を意図した領域へ配置。
- 同マスの矢印／時計のclick遮蔽を解消。既存の許可方向・待機値は維持。
- narrow Normalで二面が極小の横並びになる箇所を上下へ修正。D-pad表示時も両盤面とボタンを重ねない。
- focusがrender後に失われて連続キーボード移動が止まる問題を修正。
- 正常なtouchのlost captureで有効tapを消さないよう修正。保存不能でも同じ入力が通ることを確認。
- 盤面近くへスワイプ／矢印編集の短い案内を明示。初回説明の大型カードは常設しない。

比較は**各作品の第1面・初期盤面・縦432×768 CSS px・日語・案内を閉じた同条件**です。R3画像は変更前に取得し、R4と盤面データ・levelId・未クリア状態・枠サイズが一致することを検証。通常表示の自然な高さの違いを、同じ撮影枠の比較と混同しません。

3本の動画は実ブラウザ録画を432×768へcropしたものです。ひかりtap→Undo、ふたりswipe→D-pad、配送編集→Go→Pause→Edit route。decodeしたフレームも目視しました。[寸法と記録](media-manifest.json)。録画機能やSNS投稿機能を製品に追加していません。

## Secret候補の独立した調査

[値を含まない調査証拠](security-provenance.json)。直接scanner再確認は `.tmp/r3-before/manifest.json:232`、rule `generic-api-key`、JSON key `hashes["docs/security/SECRETS_REGISTER.md"]`。

生成元は `scripts/r3-baseline.mjs:10-14` のファイルbytesからのSHA256記録です。同世代の退避には対象文書が含まれないため、保全時HEADのGit blobで照合しました。候補とのメモリ内一致、保全時status／diffに対象変更なし、現在文書も同bytes、を確認しました。**推奨分類は「ファイル整合性確認用SHA256、誤検出の提案」**です。

最終判定はHumanに残し **PENDING** を維持します。候補値・部分値・値を含む行は出力していません。削除・再生成による証拠上書き・自動例外化・rule無効化・provider照会・失効操作は0。現在の全件scanは引き続き同じ1候補でFAILです。

## 環境・保全・停止点

- 主担当実モデル **gpt-6-astra**：現セッション `01a09e26-075f-77d3-989a-ee4afd287d7a` の `turn_context.model` を読み取り確認。独立レビューも継承Astraで実施し、別個の実行attestationは未取得。
- CWD/Git root `C:\projects\Web Game Studio`、branch `main`、開始／終了HEAD `fe5efc08239c1d40d253af07c33f0527bbae0db0`。remote live照会なし、local upstream同SHA。
- R3の未commit成果・477ファイルのbytes記録と必要ソースを ignored `.tmp/r4-before/` に保全。添付仕様は [docs/games/GAME_DIRECT_MANIPULATION_R4.md](../../games/GAME_DIRECT_MANIPULATION_R4.md) へbyte一致コピー。
- 既存変更はREADME、prototypeのgame-r2／board-view／controls／guides、prototype-assets。新規は小さな入力adapter・R4 CSS・仕様・QA／review資料。最上位Authority、AGENTS、Securityルール、Portal、54問、ルール、Art関数、save schemaを変更していません。
- **staged=0／stage・commit・push・deploy・実広告・購入・新規外部サービス・global設定変更=0。**
- 物理スマホ、Safari／Firefox、OS回転、実投稿後の字幕/UI干渉、初見ユーザー理解・楽しさ・集客効果は **NOT TESTED**。アクセシビリティ適合認証も自己付与しません。

**Humanレビュー待ちで停止。** 確認点は①盤面から自然に遊べるか、②Undo／D-pad代替／配送Goを迷わず使えるか、③縦横で読みやすく途中切替でも体験が保たれるか、の3点です。UI／全編のHuman受入とSecurity候補の判断は別です。
