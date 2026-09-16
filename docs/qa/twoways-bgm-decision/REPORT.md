# Two Ways BGM decision — C selected and frozen

2026-09-16 Humanの最終判断。**C = Accepted Motion + SFX / BGMなしを最終採用**。D1/D2は不採用、比較証拠として保持。

検討中の「SFXなしの方が良いかもしれない」は最終判断ではない。今回の明示判断が優先し、TW-Cの専用SFX採用を維持する。追加候補・tempo調整・SFX再調整・新規制作は行わない。

## 保全と現在地

- [Two Ways Craft Baseline R1](../../games/TWO_WAYS_CRAFT_BASELINE_R1.md)に「BGMなしをHuman選択してFreeze」を追記。現在地（参照原本はPrivate保全・候補には非同梱）を更新。
- Active runtime、TW-CのMotion/SFX/入力時刻、Tiny R2、Lightwork Craft、全57問、Portal、保存・入力・日英・3表示は変更しない。
- [BGM Pilot仕様](../../games/TWO_WAYS_BGM_PILOT_01.md)と[Review Pack](../twoways-bgm-pilot-01/REPORT.md)、D1/D2のsource・音源・9動画・330秒loop記録を開始時のbyteのまま履歴保存。過去のPENDING/未commit/再開手順は当時の記録であり、新しい制作・Git許可ではない。
- 実機 NOT TESTED、外部初見 DEFERRED / NOT TESTED、全21問/全57問Human全編ゲーム性・公開/法務/広告は未受入。今回のC選択をこれらへ拡張しない。

## 最小限の差分QA / checkpoint

[対象manifest](checkpoint-files.json)と[検証記録](verification.json)。既存ゲーム・比較source・音源・QA証拠の不変、3作品の固定manifest、参照・権限・whitespaceを確認。前回のunit212、lifecycle23、edge6、Review17、D1/D2各330秒の技術QAは不変版の根拠付きで再利用する。build・ゲーム再生・録音・画像の再生成は行わない。

開始HEAD / origin/main / actual remote mainは `bed130a8a0874eead6fdbfd72743488293e35ac0` で一致。Private `T-ishikawa00/web-game-studio`を再確認。今回の明示許可による1 checkpoint commitと1通常fast-forward pushだけを実行対象とする。force/rebase/履歴改変は禁止。

全project raw検査とHuman限定判定は別記。SHAは FALSE POSITIVE / NON-CREDENTIAL / APPROVED、TLS鍵は別の TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION。鍵はGit/配布/レビューに含めず、新規候補へ承認を広げない。既存hookが全index検査を強制し、commit後はpush前に全local historyを検査する。実行結果と最終3者照合はignored `.tmp/twoways-bgm-decision/postflight.json` と最終報告に記録し、自己参照hashのための追加commit/amendを行わない。

無関係なTiny実機/LAN・旧局所監査helper計13件は対象外で未tracked保全。deploy・外部公開・購入・新規制作・LAN再公開は0。今回のcheckpoint/push照合後に停止し、この単発許可を再利用しない。実利用モデル `gpt-6-astra`。
