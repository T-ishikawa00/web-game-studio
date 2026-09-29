# Hakorilo U1 — Full 18 Remaster candidate

2026-09-27。Human AcceptedのParcel Grove Gold Sliceを全18面へ展開した、ローカルの全編Review候補です。

**HAKORILO_U1_FULL_18_REMASTER_CANDIDATE_READY / HUMAN_FULL_GAME_REVIEW_PENDING**

- 一括Review：<http://localhost:4406/>
- 通常プレイ：<http://localhost:4406/play.html?lang=ja>
- English：<http://localhost:4406/play.html?lang=en>
- Portal接続：<http://localhost:4406/portal.html>
- QA・資料：<http://localhost:4406/report.html>

Gold SliceはHumanが実際に試遊し「すごすぎる。完璧」と評価、HUMAN_ACCEPTED。今回の全18候補はまだHuman Acceptance前です。全編の受入・Cover採用・Production置換を代行判断しません。

## 今回の完成範囲

| 要求 | 候補の内容 / 証拠 |
|---|---|
| Gold固定 | `internal/gold-slice-manifest.json`。既存Gold全124ファイルをhash照合。Gold自体を変更しない |
| Gameplay | 正本delivery engine / 18 stage data / authored answersをそのまま利用。解法・難度・失敗/成功条件・600ms/拍・自由選択を維持 |
| Visual System | `src/world.ts` + `src/stage-art.ts`。島・道路・受取所・時計・courier・木・柵・素材・照明・AO・camera・responsive projectionを共通化 |
| Stage variation | 3章×6面。控えめな植生色、stage seed、道路に合う地形、家の向き、時計・植栽・柵の配置。別作品のような絵柄変更なし |
| Title / Entry | 実world preview、Start / Continue、言語、Settings、保存状態・18面進行、短いloading状態 |
| Level Select | 円い配送印をつなぐ3章の旅。completed / current / next recommendation、stage名と番号、quick resume。正本はunlocked18 / locked0 |
| Play / HUD | Worldを中心に、stage/lesson、A/B到着、出発/一時停止/1拍、道を直す、ヒント、Settings。色に加えて文字・形・位置で識別 |
| Motion | Goldの180ms移動・旋回、待機の小さな揺れと残拍、到着、短い失敗反応、success。進行を遅らせるintroなし。Reduced motionは初回読込から適用 |
| Sound | Accepted SFXとB/D1 BGMを継承。新規音源0。mute / music OFF / gainを保存。1台・2台・初回全18達成を区別 |
| Success / Failure | 正本判定を表示。失敗の原因と見出しを整合。即retry、設定保持、Next、Level Select。D01/D02の1台successに対応 |
| Save / Progression | 同じ `wgs:save:tiny-delivery`、schema1、version0.1.0。新schema/移行なし。既存18stage保存・破損/書込失敗の保全を検証 |
| Performance | courier材質単位結合・固定物instance化・不要な静止描画/影更新停止。2048 shadow、AO、葉の密度、Gold部品を保持 |
| Responsive | 全18×8幅×JA/EN = 288条件。1440/1280/1024/768/430/390/375/320。操作領域44px以上、重なり・横overflow・中心遮蔽0 |
| Accessibility | native buttons / keyboard / focus outline / Reduced motion / A-B文字識別 / 状態文 / JA/EN。OSの実機アクセシビリティ評価は未実施 |
| Cover | A broad world / B courier interaction / C junction gameplay。実ゲームcanvasのみ。各960×600と480×680、160px比較 |
| Portal preview | 隔離Home card / Detail / Play / Return。Human Approved North Star参照。既存Portal source、registry、Production成果物は変更しない |
| Full QA | Desktop JA18 + Mobile EN18の通常成功。各18面の反例失敗・retry。60unit、strict type、専用build、保存・設定・通信・assets |
| Baseline準備 | asset inventory / provenance / shared system / stage-specific plan / compatibility / QA / candidate manifest。Baseline昇格はしない |

## Human推奨Review順

1. 一括ReviewからCover Aを選び、Portal Home card → Detail → Play。入口の質感が続くか確認。
2. TitleからD01。矢印を触り、通常速度で出発。失敗しても「道を直す」で即戻れるか確認。
3. D01〜D06を順にプレイし、Level Selectの進行が自然か確認。
4. D07〜D18。特にD09/D12の時計、D16の道、D18の密度と待機順を確認。
5. ブラウザーを375px幅にしてD18、英語、Pause、Settings。画面幅を変えると自動pauseする。
6. 途中でreload → Continue。設定と現在面・矢印・時計・クリア記録が戻るか確認。
7. 音量・BGM OFF・mute・Reduced motionを好みに合わせ、全編の触感と聴感を判断。
8. Cover A/B/CをPortal上で比較し、採用案と全編Acceptanceを明示する。

localhostと127.0.0.1は異なるoriginです。Humanはlocalhost:4406を一貫して使用してください。QAは127.0.0.1:4406で行っており、Human側をQAの全問クリア状態にしません。Productionの保存はローカルから読取り・移送していません。

## 実測と限界

Windows Codex in-app Chromium、DPR1、viewport1440×1000、実canvas1440×707、normal rendererの動作中でD03は195 draw calls、D18は225。D03のGold記録314に対し約38%減。複数passを含む値です。記録対象のframe interval P95は両面約16.8ms、JS描画投入時間P95は約2.2ms（GPU時間ではありません）。frame intervalは静止gap対策のため100ms以上を除外する実装なので、長いstallを含めた全時間のFPS/P95とは扱いません。主観的な「軽い」の代替ではなく、同環境の参考観測です。

静止したD03の独立観測区間でrenderedFramesは4992のまま、skip数9659以上へ増加。D03/D18を4往復すると、geometry41/42、texture19、attribute bytes約1.83MBで安定。GPU総memory・熱・低価格mobileの性能は測定していません。Capture modeは書出しのため連続描画するので性能評価から除外します。

横向き844×390では760px高さのcanvas領域を縦スクロールして使う設計です。狭い横向き画面へ盤面とHUDを無理に圧縮しません。safe-areaはCSS対応、実際のnotch端末はNOT TESTEDです。

物理iPhone / Android / Safari、実指touch / multi-touch、低性能GPU / thermal、WebGL context loss、BFCache実復帰、外部初見、Humanの最終審美・聴感はNOT TESTED / PENDING。今回の自動blockerへ追加していません。

## QA中に直した点

- D01/D02のsuccessで2台目を参照する想定を解消。
- 内部目的地・6×6・複数時計へ配置を一般化。道と受取所を隠す時計/装飾を避ける。
- 独立reviewが検出したD02の目的地へ侵入する柵を、線分全体の距離判定で除外。Gold柵は同値。
- 320pxで端の受取所が切れないcameraと、44pxの操作領域補正を両立。
- Title Settingsの変更が保存済みの別stageをD03に書き換えないよう、設定と盤面保存を分離。
- 全編完了メッセージ/音は初めて18面に達したrunだけ。再プレイの結果は1面のsuccess。
- wrong-goal等の原因と失敗見出しを一致させた。

## 資料と凍結候補

- `VISUAL_SYSTEM.md` — 共通部品とstage固有データ、最適化、motion/sound。
- `COMPATIBILITY.md` — save / progression / public identityと試験境界。
- `GOLD_DELTA.md` — Goldからの差分、必要性、品質影響。
- `internal/browser-qa.json` — 通常操作、layout、failure/retry、lifecycle、測定生データ。
- `internal/unit-tests.log` — 既存テストを書換えずに60件PASS。
- `internal/asset-provenance.json` — 全画像・素材・音・codeの出自とhash。
- `internal/qa-plan.json` — 正本から作った試験操作表。public bundleには含めない。
- `internal/verification.json` / `public/qa.json` — 最終QA・保全・Security。
- `internal/candidate-manifest.json` — 全候補source / assets / docsのhash固定。Human受入済みBaselineではない。

主担当・独立read-only reviewerの実利用model IDは、確認可能な実値がないため両者UNKNOWN。役割上の推奨モデル名を実利用IDとして記載しません。

stage / commit / push / deploy / Production変更 / 公開 / Cloudflare / Google / account / 購入 / 有料サービス / Lightwork着手 / 他作品変更は0。新規依存・画像生成・外部音源追加0。Security既知raw FAIL17 / historical FAIL11 / S04S05 UNKNOWNは今回scoped検査と分けて保持します。

**ここで停止。次のAuthorityはHumanによる全編Acceptanceです。**
