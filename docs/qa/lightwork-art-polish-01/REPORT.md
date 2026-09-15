# Lightwork Art Polish 01 — Review Pack

2026-09-15。**ローカル実装・自己レビュー・技術QA完了、Humanレビュー待ち。**

- [比較・動画・試遊をまとめたReview](http://127.0.0.1:4342/)
- [日本語で試遊](http://127.0.0.1:4342/ja/prototypes/play/light-garden/?lg=LG-C&layout=auto) / [English](http://127.0.0.1:4342/en/prototypes/play/light-garden/?lg=LG-C&layout=auto)
- [今回開始時のObject Design](http://127.0.0.1:4342/ja/prototypes/play/light-garden/?objects=before&lg=LG-C&layout=auto)

## 変更したこと

受光器はレンズの明暗/光点で現在受光、鉤形の留め金の位置で作動保持を示す。門も退いた板と解除機構を残し、小さなチェック表示を除去。鏡の回転矢印は初期案内・hover・keyboard focusへ限定。銀白の筐体、青い光学部、琥珀の光/作動部へ揃えた。光源の射出口、分光器の入口/出口を整えた。

自己レビューで開門後の板が小さすぎたため、四隅への終点を±13 / scale(.4)へ局所修正。静止画とMotion終点を一致させ、LG-Cの開門245ms/45ms、受光215ms、音・因果計画・操作応答は維持。鏡の光接点と両面反射、門の縦横通過、光が離れた後の開放保持、花の現在照射だけの変化を維持。

[差分仕様](../../games/LIGHTWORK_ART_POLISH_01.md)。主担当・独立read-onlyレビューとも実利用 **`gpt-6-astra`**。独立レビューで重要blockerなし。Human理解・個別聴感の代替ではない。

## 比較条件

Beforeは**このArt Polish開始時の最新Object Design**。旧LG-C版との比較へすり替えていない。開始時の専用出力46ファイルを保全し、新出力へ同一内容で含めた。旧4341も維持。

L01 / L05 / L16の同じ操作列・局面、LG-C・1×・gain .55で、Before/After各3本を実ブラウザから録画。432×768、約3〜10秒、同時Web Audio出力を収録。後付け音・BGMなし。最終盤面・履歴・因果計画を比較した。[撮影条件](media.json)。Reviewページに同局面静止画、通常/縦/横、小画面の未作動→受光中→開放保持を収録。

## QAの選択と結果

[Playbook §4.2](../../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md#qa-by-change)の作品固有Art/描画経路を適用。

| 今回実行 | 結果 |
|---|---|
| 型確認 / 専用build | PASS。型0 errors / 0 warnings、既存3 hints。描画11箇所の一致assert、既存LG-C接続9箇所を継承 |
| unit | 197 PASS。ルール・保存・全57問の既存検証を含む |
| Tiny R2凍結再現 | 既存manifestの46ファイル完全一致 |
| Object描画回帰 | 12 PASS。全18問、L05保持/Undo、L13花の現在照射、L15因果順、L16両軸開口、日英/3表示、reduced motion |
| 今回Polish固有 | 5 PASS。touch初期案内（文を閉じても表示）、hover/focus/keyboard、320/390pxで消音＋reduced motionのレンズ/留め金/門/Undo、静止/演出終点一致 |
| LG-C関連回帰 | Pilot 27、edge 5 PASS。入力・保存・設定・停止復帰・取消・音発火・失敗処理・mock広告・network |
| Review/動画 | 6本の再生、リンク、320/390/1280px表示、禁止path/Host/method、Range配信、Before/After条件一致を確認 |
| 自己/独立視覚確認 | L01/L05/L16、320pxの状態別・密集盤面。紋章、光路、レンズ/留め金、開口を確認 |

今回の数値は[QA記録](qa.json)。共通Runtime/Portal/Two Ways sourceと旧出力は不変。従来のPortal route・他作品ブラウザ証拠は再利用し、他作品の全問動画や全画像再生成は行っていない。既存test/hook/scanner設定を変更していない。

## 保全とSecurity

開始時の1,689ファイル中、既存変更は入口AGENTSと現在地の2件のみ。残り1,687ファイルとObject比較出力46ファイルは同一。文書整理・LG-C・Object Design・Tiny実機記録、START_HERE、ゲームコード/問題/保存/音/依存/旧証拠を保全。HEAD・branch・upstream・index不変、stageなし。[保全記録と変更manifest](preservation.json)。今回remote照会なし。

全project（ignored含む）を再検査し、raw **FAIL / 既知2件**、新規候補0。SHAはFALSE POSITIVE / NON-CREDENTIAL / APPROVED、local TLS鍵は別のTRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION。承認範囲・scanner設定は不変。full index/historyの前回PASSは不変のindex/HEADを確認して再利用し、今回再実行したとは記録しない。将来commit/push前は再検査。[Security記録](security.json)。秘密値・鍵の複製/配信/外部検証なし。

## 残る懸念・未確認

- 320px幅では紋章と留め金が小さい。色以外の形は残したが、対応関係と「受光中／作動済み／開放保持」を初見で読み取れるかは未実証。
- 鏡の初期案内と分光器の入口/出口が、実際の初見操作で十分かはHumanレビュー対象。
- 外部初見：**DEFERRED / NOT TESTED**。Lightwork実機・個別聴感：**NOT TESTED**。今回Art Polish・全57問Human全編受入・公開/法務/広告：**PENDING**。Tiny既存実機PASSを拡張しない。

stage / commit / push / deploy / LAN再公開 / 購入 / 外部送信は未実施。Humanレビュー待ちで停止。

## ローカル再現

既存 `.cache/lightwork-object` が今回のBefore。`node scripts/light-polish-build.mjs` で専用出力を生成し、未使用時だけ `node scripts/light-polish-server.mjs` で127.0.0.1:4342を起動する。既存プロセスを停止しない。

`node scripts/light-polish-qa.mjs core|browser|objects` は各groupを個別実行。media/reviewテストは `QA_R5_BASE_URL=http://127.0.0.1:4342` とrepo内の `QA_R5_OUTPUT_DIR` を指定し、`node --import tsx tests/light-polish-media.mjs` / `tests/light-polish-review.browser.mjs`。証拠の再撮影は新しい変更・失敗・未解決リスクがあるときだけ行う。
