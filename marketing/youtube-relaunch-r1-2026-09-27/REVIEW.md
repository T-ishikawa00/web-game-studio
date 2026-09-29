# Tinlumo YouTube Relaunch R1 — Gold fixed / Remaining 12 local review

**Gold G01 / G02 / G03 は Human Accepted。残り12企画 × JA/EN＝24本の新しい候補を制作済み。新作の Human Quality Gate は PENDING。**

- 一括Review: http://127.0.0.1:4464/
- 原則: [AUDIO_POLICY.md](AUDIO_POLICY.md)
- Accepted 6本: [Gold固定台帳](public/reports/gold-lock.json)。元ファイルをbyteそのままコピー。G01はR1、G02/G03はAudio R2のA。
- Scott Buckley比較版6本と旧R1音楽mix4本は **DO NOT POST**。履歴ページとmetadataにも最新Human判断を追加。媒体を削除/置換していない。

| ID | Game | Purpose | 尺 | Gameplay |
|---|---|---|---:|---|
| G04 | PROJECT MAGNET | Question | 15.2秒 | A02 / FIELD |
| G05 | PROJECT MAGNET | Satisfying | 17.6秒 | A03 / FIELD + SWARM |
| G06 | Hakorilo | Reach | 11.6秒 | D04 / Two crossings |
| G07 | Hakorilo | Satisfying | 10.9秒 | D18 / The final delivery |
| G08 | Lightwork Garden | Question | 12.6秒 | L13 / Step away from a flower |
| G09 | Lightwork Garden | Reach | 11.7秒 | L12 / A little greenhouse chorus |
| G10 | Two Ways Home | Reach | 10.7秒 | T06 / Read the gardens (06/21) |
| G11 | Two Ways Home | Question | 14.7秒 | T12 / Two adjustments (15/21) |
| G12 | Two Ways Home | Satisfying | 15.8秒 | T18 / Welcome home (21/21) |
| G13 | An Island Connected | Reach | 16.5秒 | Bridge expansion |
| G14 | An Island Connected | Question | 19.2秒 | Seaside commons |
| G15 | An Island Connected | Satisfying | 20.0秒 | Cove promenade |

## 撮影・音・編集

Humanが確認した5作品×Reach/Question/Satisfyingの15企画構成。新作は9件の新規収録から構成。撮影元はHuman Accepted Copy Debt artifactの102filesを照合して固定し、通常操作で成功/建築/住民行動まで進めた。古い録画は新12企画に流用していない。Production実配信成功とは別に扱い、実配信の状態はCopy Debt postflight側の記録に従う。

MagnetはA02/A03の新規プレイ、HakoriloはD04/D18、LightworkはL13/L12、Two WaysはT06/T12/T18（表示06/15/21面目）。Islandは空のsaveから300秒の通常進行、橋・海辺の広場・入り江の道。作品の正式JA名は『島をつなぐ日』。作業・待機の間を編集でカットし、時間加速やstate/save/camera注入はしていない。

追加BGM・ナレーション・TTSはゼロ。HakoriloのMusicは通常SettingsでOFF、ほかは固有SE、Islandは固有SE＋元のwind。音声は映像と同じsource区間を切り出し、端点の短いfadeと一定gainだけ。作品ごとの音を保ち、最大sample peakを0.78以内にするgain capを使用。G05/G06などはGold参照gainから下げているため、全動画同gainという意味ではない。EQ/新規音色/追加SE/リミッター/ラウドネス一律化なし。AACは途中flushせず最後の1回だけ。

短いパズルは無理に15秒へ引き延ばさず、見せ場と完了後の余韻で尺を決めた。Magnetの破壊後の余韻は追加確認して延長。JA/ENの実ゲームフレーム、edit timing、音声は共通。大きな説明文・logo introなし。最後1.8秒に実ゲーム上でbrand overlay。

## Reviewと検証

15企画の選択、目的filter、JA/EN同位置切替、full native playback/sound、連続再生、Gold参照と戻る、MP4、poster、timeline、通常操作記録、元の実プレイ、copy、素材来歴を一か所に用意。評価はブラウザー内保存のみ。新しい12企画と採用済みGoldは明確に区別。

- [Media QA](public/reports/media-qa.json): 30本全尺1x再生、1080×1920/30fps、JA/EN同一AACと時刻列、黒画面sample検査。変更後は対象動画だけ再検証し、その他はhash同一確認で再利用。
- [Audio QA](public/reports/audio-qa.json): 納品AAC decode、LUFS、sample peak、4倍補間peak、clipping/非有限値/無音を検査。静かなLightworkをGoldから不必要に増幅しない。
- [Review QA](public/reports/review-qa.json): 1440/768/390px、言語と再生位置、連続再生、filterと前後、評価保存、Gold往復、private/rejected path遮断。
- [素材来歴](public/reports/provenance.json) / [納品台帳](public/reports/delivery.json) / [保全](public/reports/preservation.json) / [Scoped Security](public/reports/security.json)。
- 独立read-onlyレビューでJA正式名、Magnet冒頭文字contrast、filter後の「前」動作を指摘し修正。主担当が統合し再検証。

**検証限界:** Automated playbackと数値測定はHuman実聴・審美判断ではない。代表posterとsample framesを視認、全編を人間として聴視した判定はしていない。物理端末/Safari/YouTube再圧縮はNOT TESTED。新12企画の公開したい品質かの最終判断はHuman待ち。

## 境界・再現

本taskのstage/commit/push/deploy/投稿/予約/Production変更は0。並行Copy Debt releaseのHEAD/indexの変化は本taskの操作ではなく、開始/終了snapshotを別記。既存ゲーム/Portal/Consent/sourceは変更していない。full-project raw Security FAIL22 / historical11 / S04-S05 UNKNOWNは維持し、今回scoped結果を全体PASSに置き換えない。

実model IDは主担当・read-only2名ともUNKNOWN（sessionから取得不可）。役割名でmodel IDを代用しない。

Local server: repo rootから node marketing/youtube-relaunch-r1-2026-09-27/scripts/server.mjs 。既に4464が起動中なら重複起動しない。新規captureの再実行はこのpack内だけを書き換える。編集再現は make-plan.mjs → island-plan.mjs → refine.mjs → render.mjs 。initは初回限定。旧Gold/Audio R2の制作scriptを実行して上書きしない。

**HUMAN_YOUTUBE_QUALITY_GATE_PENDING — 新12企画のHuman Review待ちで停止。**
