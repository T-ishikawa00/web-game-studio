# Two Ways Home — Craft Pilot 01

2026-09-16 Human依頼。Lightwork Craft R1を1 checkpoint/pushし実remote一致を確認後に開始。Phase 2の成果はstage/commit/pushしない。

## Goal / 比較

一入力で二人が同時に動き、壁で片方を止めて位置を調整し、二人を同時に帰す面白さを、短いMotionと専用SFXで補強する。

| 比較 | 表示 | 音 |
|---|---|---|
| TW-A | 開始時のR5。既存150ms移動/停止反応、350ms方向cue | なし |
| TW-B | 同一起点・180msの一歩。停止側は小さな圧縮、同じ方向cue。家/表情の表示は到着時に切替 | なし |
| TW-C | Bと同一 | Two Ways専用の木質系toy resonator |

通常の二人移動は一つの合成bufferに調和する二つの音色を束ねる。片側だけの移動はその子の音色。両側停止は短い弱音で、失敗ブザー/罰にしない。片方の帰宅は到着時に控えめな一音。家は通過可能で、出直し時に永久駐留表示や罰音を出さない。両者の新規同時帰宅は個別帰宅音を抑えてclear、最後の未クリア問題を解いた時だけcomplete。Undoは専用の弱音だけで達成音を再発火しない。

入力→ルール確定→checkpoint/save→描画→Motion/音の順。音や180msの完了待ちはない。連続入力/render/Undo/menu/設定/比較切替/resize/hidden/pagehideで古いMotion/予約音を取消。reduced motionは最終状態を即時表示し音とは独立。mute・gain・保存失敗の表示を維持。

## 実装とKeep

`twoways-craft-{plan,motion,sound,audio,runtime}.ts`と専用build/server。`game-r2.ts`は編集せず8箇所の一致assert付き表示接続。音schedulerの取消/失敗処理は既存方式をTwo Ways専用moduleへ適応、具体音/周波数レシピ/素材をTiny/Lightworkからコピーしない。

全21問とT19/T01/T20/T21からの導入順、ルール・問題・保存schema/version・Undo・全入力、R5 Art・日英・3表示は不変。音設定だけ`wgs:audio:two-ways-home`のversion 1、比較modeはsession key。進行や他作品の音設定へ混在しない。原本の破損音設定を保持し、保存失敗を成功表示しない。

全57問・Portal・Tiny R2・Lightwork R1を維持。共通sourceや依存を変更せず、凍結manifestによる再現を再確認。BGM・新問題・全面再デザイン・エンジン変更・外部APIなし。

## QA / 停止

[Playbook §4.2](../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md#qa-by-change)を適用。全21問の各手、代表T19/T20/T04、日英/3表示/320px、入力・取消・設定独立・失敗・mock pause、固定成果再現を検証。[Review Pack](../qa/twoways-craft-pilot-01/REPORT.md)に同条件動画9本と単体試聴を集約。

技術QAとHuman聴感/理解/実機/全編受入/公開は別。外部初見DEFERRED / NOT TESTED。Human Craftレビュー待ちで停止。Phase 2 stage/commit/push、deploy、LAN再公開、購入、外部音源API、外部公開は禁止。既知SHA/TLSの限定判定を維持し新規候補へ拡張しない。
