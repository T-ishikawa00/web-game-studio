# Greenfield Visual Context Firewall R1

2026-09-28 · **VISUAL_CONTEXT_FIREWALL_READY / REUSE_CLASSIFICATION_READY / HUMAN_PROCESS_GATE_PENDING**

新作開始時に読むのは必要最小限の共通Authorityと、その新作についてHumanが指定した資料。repo内にある、以前Acceptedだった、類似した処理がある、という理由だけではCreative参照しない。ファイルアクセスを技術的に封鎖する仕組みではなく、入口ルーター・読込台帳・レビューで運用する規則。

## 1. 最小Read Set

| 常に読む | 読む範囲・目的 |
|---|---|
| 最新Human依頼 | Goal / Delta / Keep / Done、許可されたPhase、停止条件、指定画像・import |
| AGENTS（参照原本はPrivate保全・候補には非同梱） | cwd・権限・Git保全・Security・作業別入口。既存作品の凍結はKEEPとして扱う |
| PRODUCTION_CURRENT（参照原本はPrivate保全・候補には非同梱） | 最新の関連状態・保全対象・未承認操作のみ。古い制作記録を全件展開せず、Artリンクを辿らない |
| [SECURITY](../../SECURITY.md) | 全文。候補値を出さず、既存判定を維持。必要なincident規則も確認 |
| [Creation System](TINLUMO_NEW_GAME_CREATION_SYSTEM_R1.md) / 本書 / [Gold Standard](GOLD_CRAFT_SLICE_STANDARD_R1.md) / [Start Template](NEW_GAME_CODEX_START_TEMPLATE_R1.md) | Phase、順位、読込・再利用規則、提出条件 |
| START_HERE（参照原本はPrivate保全・候補には非同梱） | §0・§5〜7の事業と品質／A–F、§16〜20の言語・static-heavy・費用・権利・ゲーム主導の集客。旧§8〜9の作品候補は新作のCreative参照にしない |
| [Playbook](WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md) | §1の共通方針、§4.2の影響別QA、§8の記録。旧H1/H2との工程対応を確認する場合のみ§2。作品別の具体例は参照しない |
| 当該新作のProduct Role・採用記録・Visual Bible・feel spec | 存在する当該Phase分だけ。未作成を既存作品の文書で埋めない |

新作開始時の番号照合はregistry／台帳のID・slug等のmetadataに限定する。全repoのArt本文検索を先行しない。Memoryや過去chatの作品表現もCreative Authorityではない。安全・権限の記憶は現行資料で確認する。

## 2. 必要時だけ読む

| 変更／リスク | 追加Read Set |
|---|---|
| 保存を扱う | START_HERE §13、Playbook §5.4、対象のnamespace/version/破損保全/reset規約と機能テスト |
| pause / visibility / audio lifecycle | Playbook §5.3、機能契約と対象テスト。既存音色・motion timingの好みを既定にしない |
| Portal / registry / 共通runtime接続 | START_HERE §10〜15、Portal仕様の技術契約、影響先の機能テスト。接続の新しい許可が必要なときは先に止める |
| accessibility / 性能 / browser入力 | 現行の共通要件と一次技術資料、当該新作の対象環境。mute、reduced motion、色だけに頼らない識別、メニューのkeyboard/focus、読みやすさ、停止復帰、条件付き性能計測を満たす。camera・palette・SFX・HUD外観は新作で決める |
| Git checkpoint / Secret候補 | SECURITY全文、Register、Incident、SHA/TLS等の対象限定判定。読むだけでGit操作権限を得ない |
| 原因監査 | 明示された監査対象の旧依頼／参照記録／sourceだけを **AUDIT ONLY** として読む。新作のCreative参照へ移さない |

共通最低基準は作品ごとの表現を消すための規則ではない。PC優先等の新作固有の指定があっても、未対応環境の案内・正直なNOT TESTED・安全な停止を省略しない。

## 3. デフォルトでCreative参照しない

- Hakorilo / Tiny、Lightwork、Two Ways、PROJECT MAGNET、IslandのArt / Craft / Visual Bible、画像・映像・造形・音色・動き。
- 旧Visual Language、旧Tinlumo North Star・Remaster画像／Review、旧procedural造形例。
- 既存のpalette、materials、shaders、mesh composition、world composition、environment layouts、character proportions。
- 既存UI componentの見た目、HUD styling、animation style、VFX appearance、asset style、motion language。
- Chanbara R1の道場・竹／木Material・見た目・敵構成・1vs1中心テンポ・Art Direction。

具体的な既存パス例：`docs/games/GAME_VISUAL_LANGUAGE_BASELINE_R5.md`、`CRAFT_BASELINE_R2.md`、`LIGHTWORK_CRAFT_BASELINE_R1.md`、`TWO_WAYS_CRAFT_BASELINE_R1.md`、`tinlumo-north-star-r1/`、`tinlumo-remaster-wave1/`、`game005-island/` のcreative部分。ディレクトリ全体を安全上読めないという意味ではない。技術だけ必要なら次の分類と範囲指定を先に行う。

## 4. Reuse分類

| 区分 | 既定 | 例 | 実施条件 |
|---|---|---|---|
| **A — INFRA REUSE** | DEFAULT ALLOWED | build infrastructure、test harness、save safety、pause lifecycle、security tooling、localization、pure utility、描画ライブラリ | Visualへ影響しない範囲だけ。契約と対象関数を指定し、style/theme/asset importが混入しないことを確認。外部操作・依存追加・共通基盤変更の許可にはならない |
| **B — MECHANIC RESEARCH REUSE** | EXPLICIT REVIEW | R1 mouse→sword、sweep collision、sword contact、以前のphysics helper | 再利用前に主担当が新作feel specと比較し、速度・閾値・距離・反応・テンポを旧挙動へ固定しないか記録。境界テストと新作の通常Playで再確認。未決ならコピーしない |
| **C — CREATIVE / VISUAL REUSE** | DEFAULT DENIED | mesh、material、shader、色、構図、比率、animation、HUD、VFX、既存visual component | Humanの `IMPORT_REFERENCE:<specific item>` と使用範囲が必要。importしてよいことと、その画像／実装の採用は別 |

混在ファイルは機能と見た目を分ける。分離できないcomponent丸ごとのコピーはC。Aを名乗ってCSS、camera setup、色定数、音色、既存モデル比率を運び込まない。新規procedural制作自体は禁止しないが、Accepted画像を達成する手段でなければ採用しない。

## 5. 読込・Import Ledger

開始時に以下を短く記録し、追加参照の前に更新する。

| 欄 | 記録内容 |
|---|---|
| source / exact section | path・関数・画像・版。repo全体という指定は不可 |
| role | SAFETY / STATE / INFRA / MECHANIC_RESEARCH / CREATIVE / AUDIT_ONLY |
| purpose / allowed extent | 何を読み、何を採用しないか |
| authority | 最新依頼、共通技術規則、Bの明示レビュー、またはHuman import原文 |
| outcome | 未読／読込済／再利用候補／承認範囲内／DENIED。Acceptedと混同しない |

Creative importの空の記録様式：

```text
IMPORT_REFERENCE:<specific item>
Human decision / date: 未記入
Source / exact version: 未記入
Allowed attribute / purpose: 未記入
Excluded attributes: 未記入
Destination game / phase: 未記入
Status: NOT AUTHORIZED UNTIL HUMAN SPECIFIES THE ITEM
```

Codexが上の文字列を自分で書いて許可を作らない。「Tinlumoらしく」「既存qualityを参考に」のように具体物・範囲が不明な場合は新作のCreative importへ広げず、既存作品参照なしで独立案を準備する。

## 6. 発見時の処理とレビュー例

誤って旧Art情報を読んだら、読込事実を隠さずAUDIT_ONLY／unapproved exposureへ記録する。記憶から消したと主張しない。そこから導いた候補の該当部分を、新作Product RoleとAccepted画像だけで見直す。未承認の流用が出た箇所は停止・分離し、独立して許可された文書・技術作業は続けられる。

| 開始例 | 適用結果 |
|---|---|
| Game008、画像未採用、importなし | Phase 0と独立したBrief。旧Artは読まない。主要Visual実装へ進まない |
| Game009、Bとして既存collisionの検討を指定 | exact math関数とテストを読み、feel固定の危険をレビュー。敵・material・cameraは持ち込まない |
| Humanが特定作品の特定画像の光だけをimport | その画像・光の範囲だけ許可。paletteやHUDや敵構成をまとめて継承しない |
| 技術QAはPASS、第一画面と15秒映像が弱い | CREATIVE NOT READY。Human AcceptedにもFull許可にも昇格しない |

適用責任は主担当。read-only reviewerにもこのRead Setを渡す。複数担当に古い全作品の文脈を無差別に配ることは防止策にならない。
