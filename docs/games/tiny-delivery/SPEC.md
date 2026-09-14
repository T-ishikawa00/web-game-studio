# G003 — ちいさな配送パズル / Tiny Delivery

2026-09-13 · prototype 0.1.0 · Phase A selected / B implemented / Human play review pending.

道とタイミングを準備する5問。5×5〜6×6、各1荷物、最大2台。固定ソケット2〜3箇所の矢印を回す。矢印のない道は現在方向へ直進。D03から待機ポイント1箇所、0/1/2tick。通常実行は1tick/600ms、同一の純粋tick関数をStepでも使用。

| Level/version | 発見 |
|---|---|
| D01/1 | 1台を2つの曲がり角で届ける |
| D02/1 | 3つの矢印で町角を回る |
| D03/1 | 2台の交差、1tickの待機 |
| D04/1 | 2か所の交差。待機0も2も衝突し、1で全員届く |
| D05/1 | 交差の待機と、その先の経路設定を組み合わせる |

全意図を旧状態から算出→境界/壁/誤配送/同セル/停止相手/辺交換を検査→同時反映→正しい配送完了で除去。後続が空いたセルへ入るのは許可。衝突時は直前の盤面で止まり理由を表示する。全員の配達でクリア。

待機: tick tに進入したらt+1からn回停止、t+n+1に移動。同じ訪問中は再発火せず、再進入時に再設定する。位置・方向・残り待機・配送状態の巡回を検出して失敗停止。100tick上限も失敗。フレームレートは成否に関与しない。

実行中の編集は禁止。Pause/Resume、Step、即Resetを用意。Resetは矢印と待機設定を保持し、「配置も最初に戻す」は別操作。保存するのは編集配置で、走行途中からの再開は行わない。日英共有、他作品とは分離。

盤面は`src/prototypes/levels.ts`。`answerKey`に対応する正解設定と全tickの位置/向き/待機/配達期待値は`src/prototypes/level-answers.json`（QA専用、配信対象外）。本物のルールで全問再生、列挙探索、独立した衝突/待機中間値テストを併用。

オリジナルSVG/CSSの机上コース。A/Bと色でロボット・配達先を対応づける。音・外部素材なし。未実装: 中盤/終盤、3台目、荷物交換、自由描画、信号AI、車体物理、公開・広告接続。物理スマホ/面白さ/権利・正式名称は未確認。

## R2 continuation — 2026-09-13

Human adopted continued development of the core and authorized Art/onboarding and a complete local alpha. The earlier five-stage stopping point is superseded only within this batch. See [R2 authority](../GAME_BATCH_01_R2_ART_UX_AND_FULL_RUN.md) and [R2 content / witnesses](R2-CONTENT.md). All 18 stages are selectable; original five gameplay boards and IDs remain. Visual/UX/full-run Human acceptance remains pending. No stage/commit/push/deploy/public release.

