> **2026-09-27 Human decision — SE ONLY ACCEPTED.** G01 / G02 A / G03 Aを正式採用。Scott Buckley比較版を含む追加BGM版と旧R1音楽mixは **DO NOT POST**。以下は当時の比較・検証履歴です。現在の固定ファイルと音の方針は [Relaunch R1](../youtube-relaunch-r1-2026-09-27/AUDIO_POLICY.md) を参照。

# Tinlumo YouTube Relaunch R1 — Gold Prototype G01–G03

Local Review: http://127.0.0.1:4414/

新Production / Human Accepted Remasterの実プレイを新規収録した3企画・JA/EN計6本。1080×1920、30fps、H.264 / AAC stereo 48kHz。ナレーションなし。タイトル・説明文はReview候補。

| Gold | 尺 | 企画と構成 | 音 |
|---|---:|---|---|
| G01 PROJECT MAGNET / Reach | 19.2秒 | A03、FIELD＋SWARM。冒頭のScrap吸引 → PULL / AIM / FIRE → 装甲を壊す → debrisを再回収。実プレイから5カット | Accepted game SEのみ |
| G02 Hakorilo / Question | 12.0秒 | Parcel Grove D03 / After you。問いを置き、2台と交差点を見せる → WAIT → GO → 2台配送。1テイク | Accepted D1＋SE |
| G03 Lightwork Garden / Satisfying | 17.0秒 | L18 / The greenhouse lights。鏡 → 光路 → gate → 分光 → 3輪の開花 → 全体を見せる。1テイク | Accepted LG-C SE＋新曲1案、SEのみ比較付き |

G02は成功が約9秒で伝わるため、長い静止の余韻を削り12秒へ最適化。15〜22秒の目安に尺を合わせる引き延ばしは行わない。G03は現行ゲームの照明状態を維持し、架空の暗い温室や別sceneは作っていない。

各版の終端1.8秒にゲーム映像上でTinlumoを表示。ロゴイントロなし。JA/ENは同じフレーム・crop・タイムラインと同一AAC音声を使用し、言語依存のテロップのみ変更する。canvasのみを収録することで、DOM上の言語UIが他言語版へ混入しない。

## Reviewの使い方

- 「JA 3本を順に再生」または各動画の再生で音声付き全尺を確認。ENへ一括切替も可能。
- 各カードにJA/EN MP4、poster、timeline、copy、未編集の新規収録と通常入力記録を配置。
- G03は「専用BGMあり / SEのみ」を同一映像・同じゲームSE音量で比較。
- 7つの品質項目で評価。メモはこのReview専用のブラウザ内下書きで、送信されない。

## 原動画と制作根拠

`public/reports/source-identity.json` と `provenance.json` に配布物・原動画・最終成果のhashを記録。配布物は9月27日のProduction version `aad80d7b-373b-4dc3-8026-40fbb73c14e5` に対応するローカルrelease artifactを101 files照合して使用。ライブProductionへ接続せず、通常のUI入力で撮影した。

採用原動画は `G01-take01` / `G02-take04` / `G03-take04`。G02/G03の旧takeは、canvasの描画停止に起因する可変フレーム時刻の問題を最終検証で発見し、不採用とした。take03の黒フレームも不採用とし、take04ではゲームcanvasの出力streamをvideoで保持し、出力専用canvasへ30Hzで記録した。再収録は実映像の出力観測のみで、ゲーム本体・描画・時計・保存・結果を変更していない。G03はcapture streamの初期サイズが安定したraw 1.2秒から18.2秒を採用し、最初の光路が伸びる場面から開始する。最終編集は元MP4のpresentation timestampを直接decodeして行う。古いtakeと過去の暫定QAは完成の証拠に使わない。

`public/reports/AUDIO_AUDIT.md` にゲーム別のAccepted audio分類、新曲の必要性、1案比較の扱いを記載。新曲は既存CC0録音sampleから今回の映像用に制作し、Production音源には追加していない。

## QAと停止条件

最終検証の正本は `public/reports/media-qa.json`、`ui-qa.json`、`verification.json`。対象に応じた実行／再利用／未実施を `verification.json` に明記する。動画のdecodeと全尺再生、音の有無、フレーム時刻、両言語、UI操作、loopback限定、素材hash、既存成果の保全を確認する。

Humanの審美・聴感・初見理解・YouTubeへ出したい品質はPENDING。実機、YouTubeの再エンコード、投稿後の指標はNOT TESTED / UNKNOWN。技術PASSをHuman Acceptanceに読み替えない。

主担当・2名のread-only reviewerの実model IDは、この実行環境で確認できるIDがないため **UNKNOWN**。役割名からモデルを推測しない。実装・統合・最終検証は主担当が実施し、補助担当へ書込みや外部操作を委任していない。

**停止:** Human YouTube Quality Gateまで。残り12企画、YouTube投稿／予約、X／Reddit投稿、stage／commit／push／deploy、Production変更は行わない。

再起動が必要な場合はrepo rootで `node marketing/youtube-gold-r1-2026-09-27/scripts/server.mjs`。既存4414 serverが動いていれば再利用する。127.0.0.1限定。LAN公開・証明書・Firewall・tunnelは使用しない。
