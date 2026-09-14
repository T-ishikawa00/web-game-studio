# G002 — ふたりの帰り道 / Two Ways Home

2026-09-13 · prototype 0.1.0 · Phase A selected / B implemented / Human play review pending.

独立した4×4の庭2つで、○と□を同時に帰宅させる5問。共通の方向入力で各1歩。壁に当たった側だけ停止する。家は通れる床で、片方が着いても終わらず退出できる。両者の位置を更新してから同時帰宅を判定する。

| Level/version | 発見 |
|---|---|
| T01/1 | 同じ入力で二人が動く |
| T02/1 | 壁で片方だけ止め、位置をずらす |
| T03/1 | 二つの庭を比較し、位置を調整する |
| T04/1 | 最初の有効入力で一人が家へ入り、次の操作で出る |
| T05/1 | 異なる壁を使い、最後の一歩を合わせる |

方向ボタン・矢印・WASD。OS repeatは無視し、ゲーム外のキー操作は変更しない。両方停止時はUndoを増やさず、Undo/Retryは両者をまとめて復元。両方帰宅後の方向入力は無効になり、成功とNextが維持される。再挑戦/Undoは可能。PC横並び、狭い画面は上下並び。

盤面は`src/prototypes/levels.ts`。`answerKey`に対応する解答方向列と全手の両位置・停止側・クリア期待値は`src/prototypes/level-answers.json`（QA専用、配信対象外）。実ルール再生と有限の位置ペアBFSで全5面を検証。T04の片方帰宅→退出→同時帰宅も固定assert。

保存: 面ID/version、クリア済みID、設定、両位置。Undoは再開後のみ。オリジナルSVGの○/□キャラクター、対応する家、異なる庭の色と形。音・外部素材なし。物理端末/楽しさ/名称・権利は未確認。

未実装: 中盤/終盤、箱/敵/スイッチ/滑る床/ミラー操作、HP/時間制限、公開・広告接続。今回の5問は将来の全問題数を決めるものではない。

## R2 continuation — 2026-09-13

Human adopted continued development of the core and authorized Art/onboarding and a complete local alpha. The earlier five-stage stopping point is superseded only within this batch. See [R2 authority](../GAME_BATCH_01_R2_ART_UX_AND_FULL_RUN.md) and [R2 content / witnesses](R2-CONTENT.md). All 18 stages are selectable; original five gameplay boards and IDs remain. Visual/UX/full-run Human acceptance remains pending. No stage/commit/push/deploy/public release.

