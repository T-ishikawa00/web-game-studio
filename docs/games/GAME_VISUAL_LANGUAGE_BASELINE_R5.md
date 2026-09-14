# Game Visual Language Baseline R5

2026-09-15、Humanが3作品のR5 Visual Language方向を正式採用。今回の明示指示に基づく現行Baselineであり、旧R2/R3の淡色・文章量の多い方向へ、明確なHuman指示なしに戻さない。

## Human Acceptance

**Visual Language Human Acceptance: PASS**

- 色・輪郭・質感の方向
- キャラクター／オブジェクトの記号化
- 文字量削減
- 盤面中心の情報設計
- R4の直接操作との統合
- 通常／縦9:16／横16:9のVisual方向

| 保持対象・残るGate | 判定 |
|---|---|
| R4 Direct Manipulation、D-pad代替、Undo、配送実行／停止／再開 | KEEP |
| 3作品各18問、全54問、ルール、解答条件、難易度、保存互換性 | KEEP |
| Normal / 9:16 / 16:9 | KEEP |
| 日英 | KEEP |
| Portal Baseline、旧fixture、prototype / Design Preview隔離 | KEEP |
| Physical mobile | NOT TESTED |
| First-time external user | NOT TESTED |
| Full gameplay Human Acceptance | PENDING |
| Public release / legal / ads | PENDING |

このPASSは全54問のゲーム性最終受入、物理スマホ、初見ユーザー、公開、法務・広告承認を含まない。公開ゲーム0本を維持する。

## 実装に基づく正本

- Art: `src/prototypes/art.ts`
- 色／紋章／表示語彙: `src/prototypes/visual-language.ts`
- 盤面／状態表現: `src/prototypes/board-view.ts`
- 画面: `src/prototypes/game-r5.css`、表示専用演出: `game-r2.ts`
- [実素材と制作レシピ](../qa/batch-01-r5/RECIPE.md)、[素材シート](../qa/batch-01-r5/MATERIALS.html)
- [採用時のReview Pack](../qa/batch-01-r5/REVIEW.html)、[チェックポイント最終検証](../qa/batch-01-checkpoint/REPORT.md)

旧R2〜R5仕様とQAは各時点の工程記録として保全する。旧Art／未commitの開始状態はignored `.tmp/r2-before`〜`.tmp/r5-before`に保持し、削除や一律除外によるSecurity PASS化は行わない。

## 今回だけの保存・同期権限

2026-09-15のHuman指示は、最終検証後のBatch 01 checkpointを1 local commitに保存し、Private `T-ishikawa00/web-game-studio` の `origin/main` へ通常fast-forward pushすることを許可する。過去のbatch工程のno-commit/no-push停止点は、この操作に限り更新された。deploy、Public化、Release、実広告、本番接続、購入、新ゲーム制作等の許可には拡張しない。
