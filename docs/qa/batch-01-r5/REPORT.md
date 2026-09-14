# Batch 01 R5 — Visual Language Review Pack

## Human Acceptance — 2026-09-15

**Visual Language Human Acceptance PASS。** 色・輪郭・質感、記号化、文字量削減、盤面中心、R4直接操作との統合、通常／縦／横のVisual方向を正式採用。[現行Baseline](../../games/GAME_VISUAL_LANGUAGE_BASELINE_R5.md)が範囲とKEEP／未受入Gateを定義する。全編ゲーム性のHuman受入はPENDING、物理スマホ・初見外部ユーザーはNOT TESTED、公開・法務・広告はPENDING。

特定Security候補の条件付きHuman判定は[個別disposition](../../security/BATCH_01_R5_CANDIDATE_DISPOSITION.md)に追加。raw FAILとHuman false positive承認を分離する。[checkpoint最終QA](../batch-01-checkpoint/REPORT.md)でcommit／push前の再検証を記録。以下は採用前の2026-09-14記録を保全したもの。

## Historical implementation report

2026-09-14。3作品・全54問に新Art、最小HUD、形による状態表示を統合。ローカル技術QAとVisual／UX自己レビューを完了。**Human AcceptanceはPENDING。Security raw scanは既知1候補でFAIL／Human判定PENDING。**

試遊・比較・動画は [Review Pack](http://127.0.0.1:4325/) に集約。ゲーム配信は127.0.0.1:4324。起動は `npm run preview:prototypes` と `node scripts/r5-review-server.mjs`。レビューserverは本QAフォルダの許可拡張子だけを配信し、repo root／.tmp／.gitは配信しない。

## 変更したもの

| 作品 | 実装 |
|---|---|
| ひかり | 青い大きな対角鏡、暗縁＋琥珀の光、つぼみ／開花、○／◇の対応門とスイッチ、入口と二出口の分光器。連続した青緑の壁と明るい床 |
| ふたり | 橙の丸角○とシアンの切欠き◇、別の目／表情、対応する家。共通入力後の150ms移動、片側停止、実方向cue。縦は二面上下、横は左右 |
| 配送 | 連続した配送所区画、大きい二車体、顔のない受取口、固定印と編集plateを区別。矢印／時計の同マスは別領域。待機・衝突位置・実行phase・配達完了を形で表示 |

常設の作品名・面タイトル・目的文・装飾枠を整理し、面番号と必要な達成数、Undo／Menu、配送Go等を残した。元の説明・翻訳・ヒントはHelpへ。保存異常等の安全情報は保持。ArtとHUDは全問共通rendererから生成し、特定面のmockupではない。内部prototypeカードも同じ素材へ整合した。

## 保全と環境

- 主担当実モデル **gpt-6-astra / high**。現セッション `01a09f3c-dace-70f3-ae56-3b1cb083de43` の `turn_context.model` をread-only確認。独立read-onlyレビューは継承Astra、別個の実行attestationは未取得。global設定・プラン変更なし。
- CWD／Git root `C:\projects\Web Game Studio`、branch main、開始HEAD `fe5efc08239c1d40d253af07c33f0527bbae0db0`。HEAD／index不変、staged=0。remote live照会なし、local upstream同SHA。
- 開始時665ファイルを記録。旧Art／R4ソースと必要なscriptsは ignored `.tmp/r5-before/` に退避。欠損0、許可外の既存ファイル変更0。R1〜R4のQA資料も保全。
- 全54問のlevel data／回答系列／engine／save schema／bridge／R4直接入力adapter／Portal／旧fixture／Security設定／lockfile／最上位Authorityは開始時bytesと一致。見せ方としての紋章変換だけを導入。
- 添付は `docs/games/GAME_VISUAL_LANGUAGE_R5.md` へbyte一致コピー。詳細は git-state.json。
- **stage／commit／push／deploy／実広告／購入／新規外部サービス接続／global設定変更=0。** 公開ゲーム0、Design Preview見本10、prototype3の隔離を維持。

## 検証結果

| 区分 | 結果 | 証拠・範囲 |
|---|---|---|
| 型／3 build | PASS | check 0 errors/warnings/hints、通常18／Design62／prototype26 HTML |
| 単体 | PASS 170/170 | 54問の独立oracle、既知解答、中間状態、旧save、path安全性 |
| Route／出力隔離 | PASS 7/7 | 通常／Design／prototype。回答データは配信せず |
| 全問実UI解答再生 | PASS 54/54 | full-run-results.json。既知中間assert、各18問終了、履歴reload。ふたり全18問をD-padでも再生 |
| 入力 | PASS 14/14 | input-results.json。mouse／keyboard／touch emulation、一回入力、4方向、cancel／多指／境界、Undo、Go／Pause／Resume／Step |
| 保存・停止・bridge | PASS 15/15 | regression-results.json。旧保存、破損／未知版保持、保存失敗、日英共通、mock広告、visibility、停止理由、旧fixture |
| 状態／座標 | PASS 6/6 | state-results.json。raw save／history／hint／iframe／run、DPR2.5、CSS scale、scroll、mode変更後の実操作 |
| 日英・3表示 | PASS 54/54 | layout-results.json。1／12／18面×3作品×3mode×2言語 |
| 狭幅・tablet等 | PASS 84/84 | responsive-results.json。1440×900、768×800、390×844、360×800、320×800、D-pad、portrait最小幅、menu／Help |
| R5固有の意味／入力 | PASS 6/6 | visual-contract-results.json。全54場面の新renderer、8面の時計／矢印分離、冠詞A、実素材のHelp、再表示、時計のない導入 |
| Portal Baseline | PASS 19/19 | baseline-regression/browser-results.json。Home／Play／fixture、日英・6幅・200% reflow、no-JS、mock、画像fallback |
| Diff | PASS（新規実装） | git diff --check。未tracked raw whitespaceは旧入力6文書＋byte一致のR5添付を保全。新規実装の指摘0 |
| Security full index | PASS | 現index全内容、候補0。stage操作なし |
| Security whole project | **FAIL／PENDING** | 既知1候補。値を出さず既存調査を再利用。新規候補／重複候補0 |

回帰テストは、常設文／D-pad初回cueの退避、セル内の小型時計、衝突表示のSVG transformという表示差に適応。44px基準は補助操作へ維持し、細かいセルは実入力と非重複を別検証。衝突assertは旧rectの左上123から実衝突セル中心150へ変更し、論理の期待値は維持。最初の不一致と修正後の実行は regression-results.json のpriorRunsに記録。

## Visual／初見UX自己レビュー

ひかり18面を先行レビューし、壁と床、鏡／花／門／分光器の役割を確認。その規則を二人と配送へ展開し、実ブラウザの通常／縦／横、導入／終盤、狭幅、Help、動画フレームを目視した。

修正した主な不一致：旧CSSによる背景とHelp素材の上書き、壁内部の継ぎ目、二面縦配置の不要な余白、英語冠詞Aの紋章化、時計のないD10／D11の案内、操作後のHelp再表示、説明図の車体方向。キャラと車体の実移動を描画層だけで補間し、入力／tickの時刻と勝敗は変更していない。

初回は実盤面＋対象cue、ふたりの方向ボタンへの一操作入口、配送Goを確認。正常プレイの長文は退避し、状態のaccessible textは保持。これは自己レビューであり、初見ユーザー理解の実証ではない。

比較は同じ1／18面の初期状態・同じ1440×1600 viewport・DPR1、同一portrait432×768／landscape960×540。通常の自然な高さは変化するため、主比較には同寸portraitを使う。各側を同じ倍率で表示する。代表9画面に加え、日英・狭幅等の詳細を折りたたみで提供。

動画はEdgeの実操作を記録し、ゲーム領域だけ432×768pxへcrop。拡大・字幕追加・偽入力はなし。元viewport1440×1600、DPR1。縦動画はReviewで320px幅に縮小しても形／状態を確認。1080p出力や物理端末の精細度とは称さない。白黒／deuteranopiaシミュレーションは補助チェックであり、アクセシビリティ認証ではない。computed色の比は contrast-and-vision.json に記録。

## Performance

各作品のiframe初期JS＋CSS decoded bodyは **156,999→168,339 bytes（約7.2%増）**。JSは116,022→115,708 bytes、CSSは40,977→52,631 bytes。画像リクエスト0を維持。HTML／Portal外枠／圧縮転送量はこの数値に含めない。

同条件60回rAFの中央値はBefore約5.5〜5.6ms、After約5.6ms。これは当ローカル環境の代表フレーム間隔で、描画所要時間や実機fps保証ではない。巨大画像・外部font・新engine・依存追加なし。CSSの増加はR4を保全したうえでR5差分を連結したため。比較データは comparison-before.json／comparison-after.json。

## Secret候補のHuman判定

対象は **`.tmp/r3-before/manifest.json`、rule `generic-api-key` の1件**。既存の security-provenance.json では、JSON key `hashes["docs/security/SECRETS_REGISTER.md"]`、生成元 `scripts/r3-baseline.mjs:10-14`、同世代HEADのblobとのSHA256一致、当該文書変更なしを確認済み。今回その根拠を保全・再利用した。

推奨分類は「ファイル整合性確認用SHA256の誤検出」。**Human例外承認はPENDING**。値・部分値・値を含む行は出力せず、削除・書換え・自動allowlist・rule無効化・provider照会を行っていない。whole-project raw scanはFAILを維持する。

## Humanレビュー待ち

確認は①色・輪郭・キャラクター・質感、②最初の操作とHelp／Undo／Goの到達性、③小画面と縦横動画で操作と結果が読めるか、の3点。別枠で上記1候補の分類判断を待つ。

**物理スマホ、Safari／Firefox、OS回転、初見ユーザー試遊、楽しさ、動画投稿後UI干渉、集客効果、法務／名称、全54問のHuman受入、公開承認はNOT TESTED／PENDING。** Human評価をPASSと記録しない。本Review Packを提示して停止。
