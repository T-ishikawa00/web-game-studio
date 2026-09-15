# Lightwork Craft R1 — checkpoint preparation

2026-09-16 Human採用：LG-C Motion/SFX＋最新Object Design＋Art Polish。実機・外部初見・全57問Human全編ゲーム性・公開は含まない。

## 保存対象と再現

[凍結基準](../../games/LIGHTWORK_CRAFT_BASELINE_R1.md) / [対象manifest](checkpoint-files.json) / [固定source・配布物](frozen-runtime.json)。主担当と独立read-onlyレビューは実利用 `gpt-6-astra`。

既存のLG-C/Object/Polish実装・比較画像/動画/単体試聴・技術QA、採用済み指示整理、Current、TLSの限定判定記録を対象とする。Tiny LAN一式・実機QA、過去の一時環境に依存する`lightwork-security.mjs`と`lightwork-preservation.mjs`は今回checkpoint外でローカル保全。過去資料内のこれらへの参照は履歴でありclone再現の必須手順ではない。`.tmp`・`.cache`・秘密鍵をstageしない。

sourceからprototype/LG-C/Object/Polishを再buildし、開始時の採用配布物48ファイルが完全一致。Tiny R2も既存46ファイル完全一致。sourceが不変で既存のPolish型/build・unit197・Object12・Polish5・Pilot27・edge5・Review10の対象に一致するため、全問再生や比較動画再生成は不要として再利用した。今回の検証は再現・差分・リンク/権限・checkpoint Securityを対象とする。

## Security / Git境界

開始local HEAD / origin/main / 実remote mainは`e24556ba57284d993cdb0ac9c476a975f63bef11`、index空。GitHub metadataでPrivate `T-ishikawa00/web-game-studio`を確認。

全project（ignored含む）・full indexをcommit前に検査し、commit後のlocal historyをpush前に検査する。新規候補や想定外の履歴では停止。既知SHAはFALSE POSITIVE / NON-CREDENTIAL / APPROVED、local TLS鍵は別のTRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION。raw FAIL 2件をPASSへ書換えず、scanner/hookを変更しない。値/断片/鍵hashを証拠へ出さない。鍵のindex/history/配信物不在を再確認する。

この文書はcheckpointに保存する準備記録。commit/pushの成功を事前に主張しない。1 commit＋1通常fast-forward push後、HEAD/origin/main/実remoteの照合結果をローカルpostflight記録とバッチ最終報告で提示する。許可はこの1回のみ、Phase 2は未commit。force/rebase/履歴改変/deploy/LAN再公開/購入/外部公開は行わない。

差分検査：旧Pilot原本の5行にMarkdownの明示改行用末尾2スペースを検出。行3/4/5/6/64で用途を確認し、原本保全を優先してそのまま保存。他の空白不整合は検出なし。Git設定・scanner/hookの緩和は行わない。
