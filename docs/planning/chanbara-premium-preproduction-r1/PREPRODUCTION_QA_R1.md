# Premium Preproduction R1 — QA and Preservation

2026-09-29 JST · DOCUMENTATION / READ-ONLY ENVIRONMENT AUDIT

[総合入口](CHANBARA_PREMIUM_PREPRODUCTION_VALIDATION_R1.md)

**最終結果：7資料、ローカルリンク29件、候補数3/3/3/3/4＝16件、指定停止status9件を確認。文書検査とgit diff --checkはPASS。既存成果の予期しない変更0、Current旧本文・HEAD・index保持、今回folderのscoped scan新規候補0件。** 外部source URLは41件。これは資料の完全性・保全の検査であり、素材品質・Unity実行・Human CraftのPASSではない。

## 1. Baselineと変更範囲

cwd/Git root：`C:\projects\Web Game Studio`、main、upstream origin/main、HEAD `d8ca30c36d94f1a9272267497c993a12dd0e9f25`。開始時tracked dirty4件、index差分なし、既存untracked/ignored成果あり。clean/reset/stash、branch操作、stage/commit/pushなし。

新規出力は本folder内の7 Markdownと内部監査記録。既存fileの許可差分は`docs/games/PRODUCTION_CURRENT.md`への今回状態の追記だけ。前研究R1のAccepted本文は変更しない。[baseline.json](internal/baseline.json)に開始時 **16,318 filesのsize/mtimeと3,635点の非秘密hash**を記録。hash範囲はtracked＋Chanbara重要source/画像＋研究R1の10 Markdown。大きなbinaryはsize/mtime比較であり、全binaryのbyte一致を断言しない。

`.git/node_modules/.cache/.tmp/.astro`はfile walkから除外し、Git indexは別hash。秘密file内容はhash収集しない。[preservation.json](internal/preservation.json)で比較し、Current追記前本文のbyte保持は[validation.json](internal/validation.json)で確認する。

## 2. 実行・再利用・未実施

| 項目 | 区分 / 根拠 |
|---|---|
| environment/Unity | 実行：CIM、installed product、exe version、module JSON、playback directory、vswhere、nvidia-smiの必要項目だけ。証拠はenvironment/module JSON |
| module JSON読込 | 初回PowerShellはpreSelected/preselectedキーのcase衝突で失敗。AsHashtableで再読込して解消。install状態はselectedだけで判定せずvariation folderを照合 |
| official docs / current SKU | 実行：公開テキスト調査。source linksと共通閲覧日を記録。今回素材本体/画像をAIへ入力しない |
| accepted reference | 再利用：A採用画像/記録/Bible、研究R1。新規assetの実物検収の証拠にはしない |
| docs / relative links / hierarchy / whitespace | 実行：内部QA、git diff --check、権限・status整合、候補カテゴリ数を検査 |
| code/build/gameplay tests | 未実施：runtime/codeへの変更なし。Playbook§4.2の文書QAを適用 |
| Unity起動・activation・project作成・package解決 | 未実施：実装前準備のみ。既存Editorを起動する必要なし |
| asset取得・購入・import・retarget・画像比較 | 未実施：Human禁止。公開仕様はvendor claim、全候補の品質NOT TESTED |
| install / account / Steam / deploy / Git writes | 未実施：今回許可なし |
| Human Craft/実聴/操作感/実機性能 | 未実施：全Visual GateはNOT EXECUTED、計画のHuman review待ち |

## 3. 独立レビュー

Character/Armsとlicense、Sword/Rockとengine/scene、Animationとデータ経路を3担当がread-onlyで調査・最終reviewし、主担当が統合。実model IDは全員UNKNOWNで、推奨名から実利用を推定しない。

| 指摘 | 最終対応 |
|---|---|
| CGTrader同梱licenseを追加条件として自動適用しない | §20.7とCustom欄を区別し、指定欄外の要求を自動で有効としない文面へ修正 |
| M1の追加prop boneがHumanoidだけでは移らない可能性 | export/retargetの独立検収項目にprop bone/weapon socket、軌跡/gripを明記 |
| S3のnative Blend不在を未取得のまま断言しない | 公開説明に記載なし・実ファイル未検収へ修正 |

installed/selected、Mono/IL2CPP、A比較/AI入力制限、Full Production権限、価格の転記について、レビューで重大な矛盾は検出されなかった。これは個別asset品質/法務/実buildの承認ではない。

## 4. Security

既存Gitleaks8.30.1とrepo `.gitleaks.toml`を変更せず、今回folder限定scanを実行した。[security-scoped.json](internal/security-scoped.json)に新規候補0件を記録。候補がある場合もfile/type/actionのみとする方式。環境auditでsecret/license/token fileを開いていない。

全project/ignored/full index/historyを再走査していない。commit/pushがなく、今回のscope判定を全体PASSへ置換しない。**既存raw FAIL22 / historical FAIL11 / S04-S05 UNKNOWN / TRR1-NEW-05限定保持・平文UNKNOWNを維持。** 新規候補があれば自動抹消・allowlist追加・provider検証をせずHuman分類待ちとする。

## 5. Final state

Human Acceptedは研究R1とPRIMARY戦略だけ。今回の7資料はHuman preproduction reviewへ提出する候補で、Full Production開始、素材採用、engine更新、実装の許可ではない。**NO_ASSET_PURCHASE / NO_ASSET_DOWNLOAD / NO_UNITY_INSTALL / NO_GAME_IMPLEMENTATION / HUMAN_PREPRODUCTION_GATE_PENDING**。
