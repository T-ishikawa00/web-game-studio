# Gold Craft Slice Standard R1

2026-09-28 · **GOLD_CRAFT_SLICE_STANDARD_READY / HUMAN_PROCESS_GATE_PENDING**

**GOLD CRAFT SLICE = 範囲は小さいが、HumanがそのままFinal Productの一部として受け入れられる品質。**

新作Creative Gateでは曖昧な「Quality Slice」を使わない。過去の成果名は履歴として残す。mechanicsだけ動くtechnical demo、画像だけのモック、動画だけの演出はGold Craft Sliceではない。

## 1. 状態の区別

| 状態 | 意味 |
|---|---|
| TECHNICAL RESEARCH ASSET | 入力・衝突・性能・lifecycle等の研究証拠。Visual / Feel / Product DirectionのAuthorityではない |
| GOLD_CRAFT_SLICE_CANDIDATE | Accepted North Starと当該Visual Bibleに従い、実際に遊べる完成品質を目指した候補。まだHuman未採用 |
| CREATIVE NOT READY | 第一印象・North Star一致・動き・音・反応などに重大な不足。Technical PASSでも維持 |
| HUMAN_CRAFT_GATE_PENDING | 自己レビューと必要な証拠を整えた。Humanの通常Playによる判断待ち |
| HUMAN_ACCEPTED_GOLD_CRAFT_SLICE | Humanがexact版を採用。対象範囲の品質基準として固定。全編受入・公開許可ではない |

検査未実施はNOT TESTED。自己評価の欠測を「良いだろう」で補わない。弱い候補を相談目的で見せる場合も、Gold Readyと呼ばず何が不足かを先に表示する。

## 2. 実装前の前提

- 当該作品のProduct Role、Human Accepted Visual North Star画像、採用記録、作品専用Visual Bibleがある。
- gameplay / feel specと今回実装する小範囲、利用環境、既知の未知が明確。
- [Firewall](GREENFIELD_VISUAL_CONTEXT_FIREWALL_R1.md)のA/B/C分類と参照台帳を確認済み。
- 現在のHuman依頼がそのPhaseの実装を許可している。画像採用だけを、Fullや外部操作の許可に広げない。

## 3. 小さくても省略しない品質

| 対象 | 確認内容 | 失敗の例 |
|---|---|---|
| Final-quality visual | camera、scale、shape、material、lighting、composition、HUDがNorth Starと同じ作品に見える | 配色だけ近く、敵の存在感や空間が別物 |
| Final-quality motion | 予備動作、加速、接触、余韻、倒れ方が作品の重さと一致 | idle・移動だけ完成しhit後が仮の消滅 |
| Final-quality sound | 動作／材質／強弱に合うSFX、適切な混ざり方、停止・mute・音量制御 | 大音量や同音連打だけで手応えを代用 |
| Final-quality interaction | 通常入力が気持ちよく、視点と意図が一致し、失敗とRetryも自然 | 自動demoのみ成立、実入力の遅れを未記録 |
| Final-quality feedback | 何をしたか、当たったか、成功か、失敗か、方向と因果が分かる | HUD数字しか変わらず場面にpayoffがない |
| Playable whole moment | 開始→操作→payoff→再挑戦を途切れず遊べる | 複数の別demoを編集して一連のゲームに見せる |

Final-qualityはこの作品・この範囲の完成品質であり、全素材量産、全編完成、無欠陥、法的保証という意味ではない。音はその作品で設計する。R1や他作品のSE・BGM有無を自動継承しない。画像では音や操作感はAcceptedにならない。

## 4. FIRST IMPRESSION GATE

Humanへ渡す前にCodexが次の実物を確認する。証拠を作るためだけの自動攻撃・状態注入・撮影専用演出は使わない。

| 証拠 | 問い | 記録 |
|---|---|---|
| first screenshot | 説明なしで何を触る作品か、新作として興味を持つ画面か | 通常の初期画面。タイトル画面が別なら最初の操作画面も補足 |
| first 3 seconds | 起動／開始から動作へ自然に入れるか、動く対象と操作が伝わるか | 起点を明記。始動の弱さを途中開始で隠さない |
| 約15秒のunedited gameplay segment | 構え→行動→結果が見え、自分でも試したい体験か | start/end、入力経路、版、連続・等速、実ゲーム音。15秒に足りない場合は理由と未達を記録し水増ししない |

判定は `SELF REVIEW: READY / CREATIVE NOT READY / NOT TESTED` と具体的な所見。開いた瞬間の魅力、North Starとの距離、独自性、何が弱いかを述べる。観察できる形・動きと、「興味を持つだろう」という仮説は区別する。

## 5. SHORTS READINESS GATE

以下を実gameplayから判定する。

1. **1秒で何が起きているか分かる。** 短い説明テロップを必須にしない。
2. プレイヤーの行動により、大きなvisual changeがある。
3. success / hit / destruction / transformation等のvisible payoffがある。
4. 約15秒でBeginning → Action → Payoffを切り出せる。

9:16での切出し候補と16:9本体の読みやすさを確認し、縦cropで武器や結果が欠けるなら懸念として出す。SNS用のUIや情報密度を本体へ押し込まない。編集で分かりやすく見せた動画と、未編集証拠は区別する。Shorts適性は制作仮説であり、scroll-stop率・視聴数・訪問・retentionの実証ではない。投稿・YouTube変更は別権限。

## 6. HUMAN CRAFT GATE

Humanが通常Playで次を判断する。質問数を技術項目で埋めない。

1. 最初の画面だけで遊びたくなるか。
2. 自分で操作して気持ちいいか。
3. North Starの作品に見えるか。
4. 旧Tinlumoゲームの焼き直しに見えないか。
5. 15秒Shortsへ切って成立するか。
6. 続きを作ってほしいと思えるか。

記録は `candidate path/version / North Star path/version / Human decision/date / accepted scope / requested changes / remaining unknowns`。点数の自動合計やtest件数でHumanの回答を代替しない。部分採用の場合、採用した軸と再検討する軸を分ける。

## 7. 採用後の保全

GoldでAcceptedされたArt・Feel・Camera・Motion・Sound・Feedbackを、source・実物証拠・採用記録で固定する。Fullで量を増やした結果の密度、性能、敵の重なり、音の混雑もこの基準と比較する。基準の変更はHumanの最新判断へ戻す。中後半代表体験、保存、失敗、全編Human受入、実機、初見、権利、Security、公開・広告のGateは別に残す。

## 8. Human Review報告テンプレート

```text
What it is / What changed:
Status: GOLD_CRAFT_SLICE_CANDIDATE / CREATIVE NOT READY / HUMAN_CRAFT_GATE_PENDING
Normal Play URL:
First screenshot / first 3 seconds / 15 second unedited gameplay:
North Star / Visual Bible / candidate version:
Human craft judgments: 上の6問
Known visual / gameplay concerns:
First Impression self-review and concrete evidence:
Shorts readiness and crop concerns:
Technical QA: executed / reused / NOT TESTED + reasons
Preservation / Security / model ID and UNKNOWN:
Requested decision and exact stop point:
```

本資料は標準の策定のみ。今回のChanbara R1をこの基準でGoldへ昇格しない。Chanbara R2の画像・Visual Bible・Gold候補は未作成。
