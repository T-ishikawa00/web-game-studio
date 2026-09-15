# Lightwork — Object Design 01

2026-09-15 Humanの指示基盤採用とObject Design差分依頼に基づく。実施範囲はこの仕様と最新Human依頼。旧PilotのHuman待ち停止点を今回の描画変更に限って更新し、過去のGit/LAN許可は再利用しない。

## Goal / Delta

何を操作するか・光への作用・作動後の状態を、常設文章に依存せず形から読み取りやすくする。鏡・受光器・門を中心に、必要な光源・分光器を更新する。単なる配色変更にしない。

| 道具 | 採った描画 | 実ルールとの対応 |
|---|---|---|
| 鏡 | 透明な円形回転台、細い両面対称の反射板、受光時の接点 | 2方向へ切り替わる同じ鏡。全方向から反射でき、片面/裏面ルールを作らない。旧button hitbox/直接入力を保持 |
| 受光器 | 中央の光学レンズ＋隅の機械ラッチ、対応紋章 | 現在受光はfinal traceのswitched/switchedGates。ラッチはgate/gates。光は吸収せず通過し、充電や待機条件なし |
| 門 | 4枚の板が四隅へ退くシャッター、紋章/ラッチ | 開いたら全方向へ通過可能。L16は同じ門で縦と横を使うため一方向の枠にしない。光が離れても保持、Undoは過去状態へ戻す |
| 光源/分光器 | 射出口、固定された入口/出口を持つ装置 | splitter.inputは進行方向。入口側は反対向き、指定外の進入は停止。新規操作対象を作らない |

花は旧描画を保持し、その時点で光が届いている状態だけ点灯する。全花同時点灯条件・開門処理・問題/難易度・解答・保存・Undoは変更しない。

## Keep / 実装境界

- 採用LG-CのSFX合成・音量・イベント計画・因果順序は原本不変。gateの描画は既存245ms/45ms、receiverは既存switchArrivalに同期。入力・rule/save処理は演出の完了を待たない。
- 新しいobject専用view/art/cssと描画接続だけ。既存 `game-r2.ts` / `board-view.ts` / `art.ts` / `light-craft-*`、Tiny R2、Two Ways、Portalは編集しない。build内の一致数assert付き変換で専用bundleへ接続する。
- 通常/縦/横・日英、全57問、旧LG-A/B/C比較・文書整理7ファイルを開始時に保全。Current/入口の新しい状態記録は旧版コピーを残して更新する。既存証拠を上書きしない。
- [元Pilot](LIGHTWORK_CRAFT_PILOT_01_R1.md) §0・2・5–6・11–12、[R5](GAME_VISUAL_LANGUAGE_BASELINE_R5.md)、[QA選択方針](../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md#qa-by-change)を適用。作業途中の未検証部分をPASSにしない。

## Review / Stop

導入L01、保持/UndoのL05、密集/両軸通過のL16をBefore/Afterで比較。L15の順次開門とL13の一時消灯も技術QAで確認。Lightwork全18問へ展開する。[一つのReview Pack](../qa/lightwork-object-design-01/REPORT.md)でHumanレビュー待ち停止。

初見理解は未実証。Lightwork実機・外部初見・全57問Human全編受入・公開/法務/広告は別Gate。stage/commit/push/deploy/LAN再公開/購入/外部送信は行わない。既知SHA誤検出とTLS実秘密鍵の別判定を維持し、新規候補へ拡張しない。
