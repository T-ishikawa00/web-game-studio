# Lightwork Object Design 01 — Review Pack

2026-09-15 Human差分依頼。**ローカル実装・技術QA済み。Object DesignのHuman Review PENDING。初見理解を実証したものではない。**

## Review入口

**http://127.0.0.1:4341/** — [Review HTML](REVIEW.html)。Before/After動画6本、代表画像8枚、JA/EN試遊を一つに集約。評価対象は前後とも**採用LG-C**。

- 導入L01：鏡の回転台・両面反射板・光の接点。
- 保持L05：現在受光 → 光を外してラッチ保持 → Undoで作動前へ。
- 密集L16：門の縦/横通過、受光器2台、分光器の入口と出口。
- [比較条件](media.json)：同じ面/初期状態/操作列、1×速度、SFX master0.55、portrait432×768。前後の最終stateとLG-C planは一致。実Edge操作と同時Web Audio出力を収録し、測定offsetでmux。別音源の後付けなし。端末出力や聴感同期のPASSではない。

必要時の再現：既存prototype/旧LG-C buildがある今回の環境では `node scripts/light-object-build.mjs` → `node scripts/light-object-server.mjs`。不足時のみ `npm run build:prototypes` → `node scripts/lightwork-build.mjs` を先に行う。専用4341はloopbackのみ。既存4340 LG-C、4336 Tiny、4322/4323/4324のプロセスを保全。4341と既存originの保存は別で、データ移行/resetは不要。

## 実装の要点

| 変更 | 意図と制約 |
|---|---|
| 鏡 | 不透明な青い四角を外し、円形台＋対称な両面反射板。反射点/出射路を見せ、既存button範囲を維持 |
| 受光器 | 光学レンズの現在受光と、機械ラッチの作動済みを分離。充電・待ち時間・吸収・片側入口を追加しない |
| 門 | 4枚の遮光板が四隅へ退き、縦横を通せる空間になる。対応紋章/ラッチで開放保持を示す |
| 光源/分光器 | 出射口、正しいinlet側と2つのoutletを示す固定装置。splitter.inputはtravel headingであることを反映 |
| 演出接続 | 旧LG-Cの215ms受光・245ms開門・45ms開門duration・300ms phase等は維持。receiverを既存phaseで更新し、門のcover描画をシャッターに置換。取消/復元/Reduced motionに対応 |

新しい `light-object-art.ts` / `light-object-view.ts` / `light-object-motion.ts` / `light-object.css` と専用build/serverを追加。元の `game-r2.ts`、`board-view.ts`、`art.ts`、`light-craft-*`、ルール・全57問・保存/Undo・依存を直接編集していない。既存LG-Cの9つの厳密hookを再利用し、追加4箇所の描画hookを一致数assertで適用。新bundleは専用cacheだけで通常buildへ混入しない。花は旧Art/現在点灯条件のまま。

新しい道具の正本と範囲：[差分仕様](../../games/LIGHTWORK_OBJECT_DESIGN_01.md)。SVGは本repoで描いた編集可能な原本、外部素材/API/購入なし。法務最終受入を示すものではない。

## 開始状態と指示整理7件 / UI5件

- CWD/Git root：`C:\projects\Web Game Studio`。branch `main`、HEAD/local upstream `origin/main` は `e24556ba57284d993cdb0ac9c476a975f63bef11`。index差分・stashなし。remote実照会は今回未実行。
- 整理の7ファイルはすべて存在。UI5件というHuman報告に対応する編集Markdownは、AGENTS、Current、Playbook、履歴README、整理REPORTの5件。残りはコピーで保存した `AGENTS.before.txt` / `PRODUCTION_CURRENT.before.txt`。両txtは整理開始時の旧版とbyte一致。UI件数をGit上の全変更数と同一視していない。今回、UI画面そのものを再取得したという主張ではない。
- `.tmp/lightwork-object-before/manifest.json` で既存1658ファイル（tracked＋nonignored untracked）を記録。7文書の開始時copyを同じignored領域へ保存。旧LG-C・旧比較素材・文書整理成果・Tiny実機/LAN成果を巻き戻さない。
- 指示整理の採用は今回Humanが明示。旧整理REPORTのPENDINGは当時の記録として保持し、Currentを採用済みに更新。今回AGENTS/Currentへの変更はObject Design参照/状態の更新。

## QA — 影響に応じた実行

| 確認 | 結果 |
|---|---|
| Type check | PASS：0 errors /0 warnings、既存unused import hints3 |
| Unit suite | PASS：既存197件 |
| 専用build | PASS：既存LG-C9hook＋新描画4hook、通常source不変 |
| Tiny R2元frozen build | PASS：元manifestの46ファイル厳密一致。基準の更新なし |
| 既存LG-C browser | PASS：27件。全18×LG-A/B/Cのrule/中間state/Undo/save、取消、JA/EN、3表示、入力/失敗経路 |
| 既存audio edge | PASS：5件。音失敗復旧、古いresume、連続入力、mock pause、非trusted入力 |
| 新Object描画 | PASS：12ケースの最終判定。全18のrenderer/current受光/ラッチ、L05保持/Undo、L13花の消灯、L15順次受光、L16両軸、日英×3表示、Reduced motion |
| Before/After | PASS：3組の最終state・操作列・SFX/cause plan一致。動画6本を作成 |
| Review再生・リンク・配信 | PASS：10件。19リンク/素材、6動画のEdge再生432×768・time進行、320/390/1280px、禁則path404・POST405・Host403・動画range206、前後一致 |
| 保全・差分 | PASS：既存1658件中、AGENTS/Currentの更新2件を除く1656件byte不変。旧LG-C出力44件も新専用cache内でbyte一致。HEAD/index保持、diff check |
| Security | 下記のraw検出・Human判定・index/historyを分離 |

結果集約：[qa.json](qa.json)、[保全manifest](preservation.json)。実行ログは `.tmp/lightwork-object/`。既存browser test原本を変更せず、出力先/相対importだけを一時copyで差し替えて実行し、旧QA/画像を上書きしていない。共通source・他作品出力が不変のため、全57問の再動画化やPortal全画面再撮影は行っていない。以前のPASSを今回の実行結果へ付け替えていない。

### 自己修正と限界

1. 新規L13テストの「花の総数が減る」という仮定が誤り。正本エンジンでは操作0で花13/24、次の1で花13/17となり、総数は同じ。対象の花24が消灯し次の1で再点灯する検査に修正し、そのケースだけ再実行PASS。初回 `objects-commands.json` / `object-results.json` のFAILと `object-results-L13.json` のPASSを両方保持。既存テスト失敗やゲーム修正で解決したものではない。
2. Before比較の初回撮影ではiframeの既存 `no-referrer` により分岐できないことを検出。参照元保護を維持し、専用Previewのdata-buildへ明示比較パラメータを付ける方式に修正。誤ったBefore動画を採用せず、6本を正しい前後で収録した。
3. Object Designの評価はLG-C。継承した設定にあるLG-Aは旧因果表示の過渡gate Artを使うため、旧比較そのものは4340/Beforeを参照する。Helpの既存図は模式図として保持。これらを新Objectの追加採用候補として扱わない。
4. 新規Host拒否テストのNode fetchは指定Hostを送らず200となった。サーバー変更をせず、Hostを明示送信できる標準http.requestで403を確認し検査を修正。再実行でReview10件PASS。初回部分結果もignoredに保持。

独立read-only Astraレビュー：コード/静止画で重要blockerなし。両軸開通、live/latched、phase/cleanup、専用build、server境界を確認。動画の実再生・文書最終整合は主担当が確認する。

## Security — rawと承認を分離

[今回のsanitized receipt](security.json)：既存Gitleaks 8.30.1で全project scan **FAIL / 既知2件**。full index scan **PASS**、local history scan **PASS**、新規未承認0。scanner/hook/例外設定は不変。

- `.tmp/r3-before/manifest.json` / generic-api-key：**FALSE POSITIVE / NON-CREDENTIAL / APPROVED**。既存の限定SHA判定だけ。
- `.tmp/physical-mobile-r2/tls/server.key` / private-key：別の **TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION**。ignored、index/履歴path不在、専用serverから404を確認。値・鍵digestの出力、複製、配信、rotation/deletion、provider検証、LAN再公開なし。

rawをPASSへ書き換えず、新しい候補へ既知承認を広げない。今回Git操作の許可はなく、将来の明示checkpoint時も必要な再検査を行う。

## Acceptance / 停止

主担当：**`gpt-6-astra`**（本タスクsessionの実model、high）。独立レビューも `gpt-6-astra`。Sol/Luna未使用。global設定/Memory/他repo/Skillへの書込みなし。

Human Object Design Review **PENDING**。初見理解 **NOT TESTED**、外部初見 **DEFERRED / NOT TESTED**、Lightwork実機/端末聴感 **NOT TESTED**。Tinyの以前の限定実機PASSを拡張しない。全57問Human全編受入、公開/法務/広告も未受入。公開0本、Preview10隔離を維持。

stage / commit / push / deploy / LAN再公開 / 購入 / 外部API・外部送信 **0**。新規BGM、Tiny/Two Ways/Portalへの変更 **0**。ここでHumanレビュー待ち停止。
