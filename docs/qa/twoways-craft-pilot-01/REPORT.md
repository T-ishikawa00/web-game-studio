# Two Ways Home Craft Pilot 01 — Review Pack

2026-09-16。**ローカル実装・自己レビュー・関連QA完了。Two Ways Human Craftレビュー待ち、Phase 2は未commit。**

## Review / 試遊

- [A/B/C比較動画・単体試聴・試遊を一つにまとめたReview](http://127.0.0.1:4343/)
- [日本語 TW-C](http://127.0.0.1:4343/ja/prototypes/play/two-ways-home/?tw=TW-C&layout=auto) / [English TW-C](http://127.0.0.1:4343/en/prototypes/play/two-ways-home/?tw=TW-C&layout=auto)
- URLの`tw=TW-A` / `TW-B` / `TW-C`、またはゲーム内設定のCraft比較で切替。

TW-Aは開始時の無音版（既存Motionあり）。Bは改善Motionのみ、CはBと同じMotion＋専用SFX。T19（表示01）共有移動、T20（表示03）片側停止、T04（表示11）片方帰宅→出直し→同時クリアを、同じ初期状態/操作列/1×速度/432×768で各3本、合計9本録画。[条件と実操作記録](media.json)。A/Bは音声trackなし、Cは実操作時Web Audio出力を同時収録し、後付け音なし。[単体音・信号計測](sound-map.json)はruntimeと同じ合成とgain .55。聴感の合否は未判定。

## 実装内容

二人の一歩を同じ起点・180msで同期。停止側は小さな圧縮反応。家と表情は移動の到着時に切り替え、出直し可能な状態を維持する。共通移動は調和する二音色を一つの音に束ね、片側帰宅は控えめ、二人同時clearと全21問completeを区別。Undo/復元/停止復帰では達成音を再生しない。

専用source5件＋8箇所のbuild時表示接続。既存共通source・Art・ルール・問題・保存・入力・他作品は不変。[仕様](../../games/TWO_WAYS_CRAFT_PILOT_01.md)。主担当・独立read-onlyレビューは実利用 **gpt-6-astra**。

自己レビュー：実ブラウザの表示とT04帰宅/離脱、T12横表示を確認。独立レビューに重要blockerなし。buildの非assert置換を1件整理し、生成bundleがbyte同一と確認したため既存ゲームQA/録画を再利用。

## QA結果と選択

| 今回実行 | 結果 |
|---|---|
| 型 / 専用build | 0 errors / 0 warnings、既存3 hints。8箇所assert PASS |
| unit | 209 PASS（既存197＋専用12）。全57問の既存ルール/保存検証を含む |
| Two Ways browser | 17 PASS。全21問各手の盤面/Undo/クリア、順序、A/B/C、同期時刻、日英/3表示、320px、mute/reduced motion、設定再読込・破損保持、停止復帰 |
| Audio/停止edge | 5 PASS。音源開始失敗、遅延resume、連続操作/voice上限、mock広告停止、合成入力/repeat |
| 既存Home入力回帰 | 7 PASS。両盤面swipe、タッチ/multitouch、無効gesture、D-pad、壁/帰宅、keyboard/menu、保存拒否 |
| Tiny R2 | 既存manifest 46ファイル完全一致 |
| Lightwork R1 | Phase 1のmanifest、配布48ファイル・固定source完全一致 |
| Review / 配信 | 比較動画9本と試聴9本、リンク、responsive、localhost応答・禁止path/Host/method・Range配信を確認 |

[QA記録](qa.json)。専用出力だけの変更であることを確認し、Portal/他作品のroute・ゲーム性browser証拠は不変sourceと合わせて再利用。全57問の映像や他作品の画像を再生成していない。入力回帰は既存suiteからHome関連7件を一時出力先へ実行し、既存test/証拠を書換えていない。

## Phase 1との区分 / Security

Phase 1：`440b1b133a6863cd3d9e8b8f894bc4f581ae89a1` に141ファイルを1 checkpoint保存し、Private origin/mainへ通常fast-forward push。HEAD / origin/main / 実remote一致を確認後にPhase 2を開始。[postflight](phase1-postflight.json)。全projectはraw FAIL既知2件、全index/hookとcommit後historyはPASS。TLS鍵は対象外。

Phase 2：全project検査と保全を[Security/保全記録](preservation-security.json)に分離。SHA誤検出とTLS実秘密鍵の限定判定を維持し、scanner/hook変更なし。今回のPhase 2でstage/commit/pushは行わない。Tiny LAN scripts/実機記録/過去局所監査helperは開始時どおり未commitで保全、Two Waysの新規差分に混ぜない。

## 未確認・残る懸念

- **Human Craft/聴感：PENDING / NOT TESTED。** 玩具・木質系の音の柔らかさ、二人の音色差、反復時の疲れや180msの手応えはHumanレビュー対象。
- **実機：NOT TESTED。外部初見：DEFERRED / NOT TESTED。** ブラウザの幅/タッチ模擬を実機PASSにしない。片側停止・帰宅と出直しの理解を実証したとは扱わない。
- 全57問Human全編ゲーム性、公開/法務/広告はPENDING。TinyとLightworkの採用をTwo Waysへ拡張しない。

## 閲覧サーバーの再起動

既存出力がある場合、repoで `node scripts/twoways-server.mjs`。**127.0.0.1:4343だけ**で上のReviewを表示する。稼働中なら再利用し、他の使用中プロセスを無断停止しない。別PCからのLAN閲覧には対応しない。

source再現が必要な場合だけ `npm run build:prototypes` → `node scripts/twoways-build.mjs`。単なるサーバー再起動でQA/Review/素材を再生成する必要はない。`QA_R5_BASE_URL=http://127.0.0.1:4343`、`QA_R5_OUTPUT_DIR=.tmp/twoways-pilot`で専用browser/edge/mediaテストを実行できるが、再実行には変更/失敗/未解決リスクの根拠が必要。

deploy・LAN再公開・購入・外部音源API・外部公開なし。Human Craftレビュー待ちで停止。
