# G001 — ひかりの仕掛け庭 / Lightwork Garden

2026-09-13 · prototype 0.1.0 · Phase A selected / B implemented / Human play review pending.

光を花へ届ける5問。4方向の光、指定位置の鏡を2姿勢へ切替、石壁、通過型の花センサー。L04から◇スイッチと開いたままの門が1組。全花の同時点灯でクリア。鏡を戻しても門は閉じず、Undoは操作前の鏡と門をまとめて復元する。

| Level/version | 発見 |
|---|---|
| L01/1 | 1枚の鏡で光が曲がる |
| L02/1 | 2枚をつないで経路を作る |
| L03/1 | 石垣を回り、2つの花を同時に照らす |
| L04/1 | スイッチで門を開き、先へ光を通す |
| L05/1 | 先に反対側のスイッチを照らし、鏡を戻して花へ |

操作: 鏡のタップ/クリック、Tab→Enter/Space。Undo、面の再挑戦、全5面の自由選択、クリア後のNext。クリア記録はUndoで消えない。成功後の追加盤面入力は停止し、Undo/Retryは可能。

盤面: `src/prototypes/levels.ts`。各levelの`answerKey`に対応する固定解答と各操作後の門・鏡・点灯・クリア期待値は隣接する`src/prototypes/level-answers.json`。この解答データはQA専用で通常/試作いずれの配信buildにも含めない。`tests/unit/prototypes.test.ts`が本物のルールに対して全手順を再生し中間値も検証する。

保存: 現在面ID/version、クリア済みID、reduce-motion設定、鏡姿勢、門の状態。Undo履歴は再開後のみ。作品全体の保存消去はPortal側の確認dialogから実施。

オリジナルSVG/CSS。音・外部素材なし。強い光の演出は抑え、記号と形を併用。名称・権利・面白さの受入は未確認。

未実装: 中盤/終盤、複数の門、分岐/色/複数光源、自由配置、音、公開・広告接続。後続はHuman試遊に基づく別判断。

## R2 continuation — 2026-09-13

Human adopted continued development of the core and authorized Art/onboarding and a complete local alpha. The earlier five-stage stopping point is superseded only within this batch. See [R2 authority](../GAME_BATCH_01_R2_ART_UX_AND_FULL_RUN.md) and [R2 content / witnesses](R2-CONTENT.md). All 18 stages are selectable; original five gameplay boards and IDs remain. Visual/UX/full-run Human acceptance remains pending. No stage/commit/push/deploy/public release.

