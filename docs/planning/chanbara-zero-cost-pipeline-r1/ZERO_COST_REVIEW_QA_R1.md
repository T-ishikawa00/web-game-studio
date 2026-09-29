# ZERO-COST — Review QA R1

2026-09-29 JST · 文書・研究のみ

[Review入口](ZERO_COST_PREMIUM_3D_PIPELINE_R1.md)

## Scopeと状態

変更は本folderの研究5資料と内部の資料QA証拠、PRODUCTION_CURRENT（参照原本はPrivate保全・候補には非同梱）への状態追記のみ。game source、既存asset、Accepted画像、旧研究/Preproduction資料、global設定、Memoryは変更しない。

開始時root/cwdは厳密に `C:\projects\Web Game Studio`、branch `main`、HEAD `d8ca30c36d94f1a9272267497c993a12dd0e9f25`、upstream `origin/main`。index差分なし。既存tracked差分はAGENTS.md、PRODUCTION_CURRENT.md、Playbook、game005 distribution-security.json。多数のuntracked/ignored証拠を含め保全し、stage/reset/clean/stashを行わない。

[baseline](internal/baseline.json)は16,337ファイルのsize/mtimeと3,642件のnon-sensitive SHA-256を記録。既存ゲームの大きなbinaryはmetadata比較、tracked非秘密file・Chanbara source/text/image・研究/Preproduction本文はhash比較。`.git/node_modules/.cache/.tmp/.astro`をwalkから除外し、秘密候補の内容をhash目的で読まない。全binaryをbyte検証したという報告ではない。

## QA選択

[Playbook §4.2](../WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md#qa-by-change)の文書変更経路を適用。game/runtime/build対象に変更がないため、npm build/gameplay/画像再生成/Unity起動/import testは実施しない。文書の構成、リンク、権限・予算・候補の整合、Git差分、既存成果保全を確認する。

| 確認 | 結果 |
|---|---|
| 5資料の存在・local参照先・budget0/10カテゴリ・停止status | PASS。local参照30件、公式/作者source URL62件を記録、10カテゴリ、停止status15項目。外部URLの将来可用性は保証しない |
| 新規資料のwhitespace / git diff --check | PASS。新規5本文のUTF-8/fence/末尾空白も確認 |
| Current旧本文byte保全 / HEAD・index・既存成果 | PASS。既存変更はCurrent追記だけ、元本文byte保全。HEAD/index/branch/upstream不変、task外の追加/想定外変更0 |
| scoped secret候補 | PASS、gitleaks8.30.1、新規候補0。全project/history Securityの再監査ではない |
| 公式source | public product/license textを調査。主要な無料枠・原資料との差異を主担当が照合 |
| 独立read-only文書レビュー | Must-fix 0。予算0、有料除外、取得/導入/実装境界、baseと完成品質、license/AI区別を確認。権利保証や実物品質PASSではない |
| Asset visual / rig / import / performance | NOT TESTED。取得禁止とAI入力境界を維持 |
| 各Visual/Craft Gate | NOT EXECUTED / Human Acceptedではない |

## 研究の限界と更新点

- 第三者asset/previewを見た視覚審査ではない。A適合の見込みと具体的な補修工程まで。配布元の高解像度・対応engine表記を実測結果にしない。
- Human Base Meshes公式一覧の直接取得は一部失敗。公式検索本文で名称/CC0/Blender必要版を照合し、rig同梱はUNKNOWNとした。
- Quaterniusは無料Standardを固定し、120+やnative .blendを無料版の保証から外した。exact clip一覧と現在の収録数は未開封。
- Meshyは現行6 Liteの無料commercial/export条件を旧情報から更新。ただしAのProduction Candidateには入れない。pricingとTermsのprovider学習利用記述差を記録。
- Unity一般Termsのagentic access条件、Personal適格性、NoAI素材のHuman編集担当を独立した成立条件として記録。
- 有料候補は現行候補から全除外。購入Gateなし。旧資料を削除/書換えせず、Currentと新入口でsupersessionを明示。

主担当は全体統合・採否・最終確認。3名の既存read-only subagentはCharacter/arms/rig、environment/sword/material/light、animation/VFX/AI3Dの独立調査だけを担当。主担当と各担当の実model IDは環境から確認できず**UNKNOWN**。役割名からmodel IDを推測していない。

既存Security **raw FAIL22 / historical FAIL11 / S04–S05 UNKNOWN / TRR1-NEW-05限定保持・平文UNKNOWN**はそのまま。今回のscoped結果でproject全体をSecurity PASSへ変更しない。

最終証拠：[validation](internal/validation.json) / [preservation](internal/preservation.json) / [scoped security](internal/security-scoped.json) / [Current prefix](internal/current-prefix.json)。
