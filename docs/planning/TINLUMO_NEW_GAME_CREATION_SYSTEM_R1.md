# Tinlumo New Game Creation System R1

2026-09-28 · **NEW_GAME_CREATION_SYSTEM_R1_READY / HUMAN_PROCESS_GATE_PENDING**

新作の完成像を先に決め、その作品として小範囲の完成品質を遊んで確かめる制作方式。今回のHuman指定を文書・入口へ反映した。方式全体のHuman採用、Visual案の選択、画像の採用、ゲーム制作許可は別々に記録する。今回の文書完成で後工程を開始しない。

## 1. 適用範囲と正本

Greenfieldの新作に適用する。既存作品の保守、Accepted作品のRemaster、Portal改修のCreative Authorityは自動置換しない。既存のAccepted Art・音・入力・保存・本番・配布素材は保全対象であり、新作の表現見本ではない。

- 参照と再利用の正本：[Visual Context Firewall](GREENFIELD_VISUAL_CONTEXT_FIREWALL_R1.md)。
- 完成品質と評価の正本：[Gold Craft Slice Standard](GOLD_CRAFT_SLICE_STANDARD_R1.md)。
- 毎回の開始入口：[New Game Codex Start Template](NEW_GAME_CODEX_START_TEMPLATE_R1.md)。
- 今回の根拠：[Root Cause Audit](../qa/new-game-creation-system-r1/ROOT_CAUSE_AUDIT.md)。
- 今回の適用例：[Chanbara Phase 0](../games/chanbara-restart/PRODUCT_ROLE_R1.md) → [Visual Direction Brief 4案](../games/chanbara-restart/CHANBARA_VISUAL_DIRECTION_BRIEF_R1.md)。

安全・Security・Git・費用・権利・公開制限は常に適用する。下記は**Creative Authorityの順位**であり、安全制約を下位へ落とすものではない。

## 2. Creative Authority

| 順位 | Authority | 必要な証拠 |
|---|---|---|
| 1 | Human latest judgment | 対象・日付・採用／却下／保留・許可範囲 |
| 2 | Human Accepted Visual North Star images | 正確な画像のpath／版、Humanの採用記録。生成しただけの画像は不可 |
| 3 | Game-specific Visual Bible | 上記画像から新規に起こした定義、参照画像との対応 |
| 4 | Human Accepted Gold Craft Slice | 遊べる版・代表証拠・Humanの受入範囲 |
| 5 | Game-specific gameplay / feel spec | 入力・敵・反応・テンポ等の当該作品仕様 |
| 6 | Common technical standards | 安全・保存・性能・入力・accessibility等の機能要件 |
| 7 | Existing implementation patterns | 上位の狙いを満たす技術的な選択肢だけ |

既存ゲームのVisual Authorityは自動参加しない。`IMPORT_REFERENCE:<specific item>` のHuman明示指定がある場合だけ、指定範囲を当該作品のCreative Authorityへ取り込む。順位2〜4の「Accepted」はそれぞれ独立したHuman判断を要する。下位で上位を実現できない時は差分と選択肢を示し、その箇所を止める。「今あるコードで作りやすい」ことを理由に画像や作品方向を黙って変更しない。

## 3. 標準工程

| Phase | 作業と成果物 | 次へ進む条件／禁止 |
|---|---|---|
| **0 — PRODUCT ROLE** | Portalに追加する価値、既存作との体験差、replayability、first 30 seconds、Shorts potential、target session lengthを1枚へ。仮説と未知を明記 | この段階のゲーム実装禁止。企画選択はHuman。未確定の番号・slugを予約済みにしない |
| **1 — VISUAL DIRECTION** | 原則3〜5方向。camera・player view・enemy scale・environment・lighting・materials・colors・VFX・composition・UI densityが比較できる**完成ゲーム画面**をVisual AI等で作る | Humanが実画像を見て選ぶ。文章案、雰囲気画、コード製の代替Conceptでは通過しない。未採用画像のまま主要Visualを実装しない |
| **2 — GAME-SPECIFIC VISUAL BIBLE** | Accepted画像からshape、palette、material、lighting、character、environment、VFX、motion、camera、HUD、readability、DO/DON'Tを新作専用に定義 | 画像の採用記録と各定義の対応が揃う。旧Bibleの複製禁止。画像だけでは決まらない動き・音・操作は仮説として残す |
| **3 — GOLD CRAFT SLICE** | 小範囲の実プレイにFinal-quality visual / motion / sound / interaction / feedbackを統合。North Starと同じ作品に見えることを確認 | [Gold基準](GOLD_CRAFT_SLICE_STANDARD_R1.md)で自己評価。弱い第一印象は **CREATIVE NOT READY**。技術研究demoをGoldと呼ばない |
| **4 — HUMAN CRAFT GATE** | Humanが通常Playで6問を判断。通常Play URL、第一画面、冒頭3秒、約15秒の連続実プレイ、既知の弱点を提出 | Accepted / Changes requested / Hold / Rejectと対象版を記録。AIの推薦・test PASS・無回答は採用ではない |
| **5 — FULL PRODUCTION** | Human Accepted後、採用されたArt・Feel・Camera・Motion・Sound・Feedbackを固定し、必要な量だけ拡張 | Accepted範囲と最新許可を確認。旧A–Fの中後半検証・逆算・全編受入、公開／法務／実機／広告Gateを省略しない |

制作上の局所調整ごとに確認を乱立させない。同一の承認済み範囲内で自己試遊・修正・技術QAを完了し、一括で判断可能な状態を提出する。上位Authorityの変更、費用、外部影響、次の未承認Phaseへの移行は別問題。

## 4. 旧工程との関係

旧工程は技術QAだけを要求していたわけではない。[Playbook](WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md)は作品の個性、H1/H2の分離、Human判断、動画の意味を既に要求している。今回追加するのは、**実装前の画像選択と、Creative参照の明示的な遮断・取込手続き**。

| 従来の経路／曖昧さ | 新しい扱い |
|---|---|
| 既存資料を「制作の学習」として読み、見た目まで入る | 共通技術と作品固有の表現を読込前に分類 |
| Core FeelとQuality Sliceを併記 | 技術研究は **TECHNICAL RESEARCH ASSET**。新作Creative Gateの名称は **GOLD CRAFT SLICE** |
| 小さな試作の仮の舞台・敵数・テンポが次作の既定になる | Phase 0へ戻し、採用していない仮仕様を継承しない |
| 実装候補を見せてからArt方向を判断 | Phase 1で画像を選んでから主要Visualへ |
| 技術PASSを主成果として報告 | 作品・実物・Craft判断・弱点を先に、QAは裏付けへ |

START_HEREのAはPhase 0の企画定義に対応。Bの冒頭体験、Cの中後半payoff、Dの逆算はGoldと拡張計画で引き続き実証する。Phase 3が冒頭だけならCは未達として明記し、中後半代表体験のHuman確認前に量産しない。EはPhase 5、Fの全編Human受入は完成時にも残す。PlaybookのH1「もう一度遊びたい核か」はPhase 3の自己試遊とPhase 4のHuman操作感・継続判断へ統合し、画像採用前の別実装や追加確認会を自動要求しない。H2はPhase 3〜4で具体化し、H3の公開判断はこの制作方式の採用と別。旧資料本文と既存Accepted工程は書き換えない。

## 5. First Impression / Shorts

Human Review前にCodexも第一画面、最初の3秒、約15秒の未編集gameplayを確認する。ゲームを知らない人の興味を引くか、1秒で動作が分かるか、操作で大きな変化が起きるか、hit／success／destruction／transformation等のpayoffが見えるか、Beginning → Action → Payoffが切り出せるかを所見付きで残す。

これは集客成果の証明ではない。ShortsのUIをゲームへ加える指示でもない。観測者・入力経路・音・切出し時刻・編集有無を記録し、演出専用の状態注入を実プレイとして使わない。AIが弱いと判断した候補は **CREATIVE NOT READY**。不足証拠は **NOT TESTED**。Human Craft Acceptanceは常に別。

## 6. Review報告の順序

1. What it is / What changed。
2. 通常Play URLとScreenshot / video。企画のみなら「Play未実装」「画像未生成」と明記。
3. Humanが見るべきCraft判断とknown visual / gameplay concerns。
4. 技術QA、実行／再利用／未実施、test counts、実装詳細。
5. 保全、hash、Security、権限、実利用model IDの取得値とUNKNOWN。

Technical QA件数、ファイル数、開発量は作品品質の主要成果にしない。推薦は採用ではない。初見、実機、聴感、市場性、法務、公開は未確認のまま混同しない。

## 7. 今回の完了と停止

本方式、Firewall、Gold基準、汎用テンプレート、原因監査、Chanbara Phase 0と4つのVisual Direction Briefを提出する。実Visual Concept生成は次のHuman / ChatGPT工程。画像選択、Visual Bible作成、Chanbara R2ゲーム実装、既存ゲーム・Portal・Production・YouTube・Consent C・save・AdSense・外部サービス変更、依存追加、stage / commit / push / deployは今回行わない。

**HUMAN_PROCESS_GATE_PENDING。ここで停止。** 文書のREADYは新方式のHuman採用済み、Visual Accepted、Gold Accepted、Full制作可能を意味しない。
