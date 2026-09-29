> **2026-09-27 Human decision — SE ONLY ACCEPTED.** G01 / G02 A / G03 Aを正式採用。Scott Buckley比較版を含む追加BGM版と旧R1音楽mixは **DO NOT POST**。以下は当時の比較・検証履歴です。現在の固定ファイルと音の方針は [Relaunch R1](../youtube-relaunch-r1-2026-09-27/AUDIO_POLICY.md) を参照。

# Tinlumo YouTube Gold — Audio R2

Status: **LOCAL AUDIO REVIEW READY / HUMAN_AUDIO_QUALITY_GATE_PENDING**

入口: **http://127.0.0.1:4462/** — loopback限定。G02とG03を1画面で切り替え、再生中のA/B/C比較は映像を止めず同じ位置で行えます。JA/EN、場面ジャンプ、リピート、MP4、poster、timeline、copy、音源来歴、ブラウザー内の評価欄を用意しました。スマートフォン幅には映像直上にも切替ボタンがあります。

## Human判断の適用

- G01: 「映像・音とも高品質。現状維持候補」。R1のJA/EN MP4をそのまま保持し参照。
- G02 / G03: 高評価の映像、テロップ、尺、JA/ENを固定。旧BGMはHuman rejected。旧ファイルは証拠として保全し、新Reviewの比較音には含めない。
- この作業はマーケティング音声の変更のみ。Production Accepted game audioの採否や本番ファイルを変更するものではない。

## 比較案

| Game | A | B | C |
|---|---|---|---|
| G02 Hakorilo / 12s | Accepted SE ONLY | MINIMAL TENSION BED | **見送り**。十分な品質根拠を持つplayful scoreに到達していないため、穴埋めの曲を提出しない |
| G03 Lightwork / 17s | Accepted SE ONLY | AMBIENT GLASS / LIGHT | POLISHED CINEMATIC MINIMALの**Human review候補** |

5mix × JA/EN = **新規MP4 10本**。G01の変更は0。G02は360frames、G03は510frames。1080×1920 / 30fps。`public/videos/` へ格納。音声編集用のfloat32 stereo WAVは `public/audio/`。未採用曲を大量に作る方式、旧38noteの組立方式、生成音声API、TTSは使用していません。

**再生方法:** ゲームを選び「音つきで再生」。A/B/Cまたは1/2/3キーで音だけを切替。A/B/Cは同じWeb Audio開始時刻から並行再生し、28msの線形gain切替を使用します。映像のsrc・currentTimeを変更しません。SEは共通で、切替の途中もgainの合計は1です。開始時は音声のoffsetをそのまま保ち、映像側の開始を出力遅延に合わせます。先頭SEを飛ばして同期させません。

## 音楽の選定・編集

作曲者Scott Buckleyの公式配布から3素材だけを取得しました。自身で新しい曲やMIDI note列を組み立てず、完成音源の連続区間を使っています。元の演奏・フレーズのタイミングを保持し、ループ・pitch shift・time stretch・音符の再配置はありません。

| 案 | 公式素材 / 原曲区間 | 編集意図 |
|---|---|---|
| G02 B | [Cobalt — No Piano](https://www.scottbuckley.com.au/library/cobalt/) / 2.25–14.25s | 公式のピアノなしmix。Question中に薄く入り、GOへ小さく変化し、deliveryの前から退く。3つのSE音域と衝突しやすい部分を抑制 |
| G03 B | [Computations in a Snowstorm — No Cello](https://www.scottbuckley.com.au/library/computations/) / 22.8–39.8s | 作曲者が背景用として配布する別mix。ambientを低く敷き、glass/lightの輪郭は実ゲームSEが担当。Bloom後に少し開いて退く |
| G03 C | [Reverie](https://www.scottbuckley.com.au/library/reverie/) / 195.6–212.6s | 終盤の静かなフレーズ。最後のharmonic arrivalをBloom付近へ配置し、自然な減衰をbrandへつなぐ。前面のSEを避けて音楽をduck |

音楽側だけにhigh-pass、upper spectrum control、広い帯域のEQ、stereo幅調整、有限のgain arc、SE前の滑らかなduckとrelease、終端fadeを適用。パラメータは `scripts/mix_audio.py` / `public/reports/mix-qa.json` に保存。SEへのcompressor/limiter、variantごとの全体正規化、音量だけを上げた迫力づけはありません。

素材の専門的な制作来歴・構造・音量・位相・同期は確認しましたが、**アシスタント自身による実聴は行えていません**。「不快感が完全に消えた」「商用品質に達した」「公開したい」はHumanによる聴感・品質判定です。Cという名称は品質の認定ではなく比較方向です。実機スピーカー・ヘッドホン、Safari、YouTube transcodeはNOT TESTED。

## SEの保全と同期

G02旧録音にはSE単独stemがなかったため、凍結Production artifactのD03を通常UIでMusicだけOFFにし、wait→Go→successを再演。ネイティブの音声start/connectを保持した出力observerで、実際に再生された4cueのPCMとgainを取得しました。state injection、映像の撮り直し・変更、BGMの音源分離はありません。新PCMはAccepted `craft-sound.ts` の44100Hz / variant 0出力と4cueとも全bytes一致を独立確認。

旧録音の一部cueには局所的な約10msの欠落/ずれが見られ、whole-cue相関から音量や開始時刻を推定すると誤ります。新しい連続PCMは初期attackに合わせ、元のnode gain 0.2275 × R1 master gain 14.017272を保持しました。

| cue | R2配置 | 整列方法 |
|---|---:|---|
| wait | 4.191583s | 旧attack一部欠落のため1ms RMSの初動。編集判断上の目安±5ms |
| start | 5.967833s | 最初3–15msの相関が同位置。目安±1ms |
| arrive | 8.569396s | 初期attack相関0.99869。目安±0.5ms |
| clear | 9.170000s | 初期attack相関0.99955。目安±0.5ms |

G03は既存SFX-only比較の48kHz音声をgain変更なしで保持。G03-A MP4は旧AACも直接copy。B/Cはその同じSEに音楽だけを加算しています。PCMの差分検証ではSE差分はfloat32の丸め範囲（最大G02 2.98e-8 / G03 7.45e-9）です。

新AACは途中でflushせず終端だけflush。書出し後の独立attack相関でも追加offsetは全cue **0sample**。終端paddingはG02 10.667ms、G03 2.667msで、映像尺・先頭同期には影響しません。

## 測定とその意味

| 案 | AAC後integrated LUFS | AAC後true peak / 4× estimate |
|---|---:|---:|
| G02 A | -17.68 | -1.45dBTP |
| G02 B | -21.00 | -1.47dBTP |
| G03 A | -27.07 | -13.45dBTP |
| G03 B | -32.96 | -13.35dBTP |
| G03 C | -31.93 | -12.99dBTP |

無音の多いSE-onlyと持続音を含むmixではloudness gateに含まれる区間が違うため、B/CでLUFSが低く出てもSEを下げたことを意味しません。公平性の根拠は**同じSE・gain・時刻**です。G03は元SEレベルを維持しているため全体が静かです。数値だけでShortsの実機聴感をPASSにせず、音楽の薄さ・十分な聞こえ方も今回のHuman判断に含めます。

## 権利・credit

3素材は公式ページで **CC BY 4.0**、クレジット付き商用利用可を確認。YouTube以外にも再利用可能ですが、credit・license URL・変更表示を維持します。YouTubeは説明文へのcreditが必要です。[公式使用条件](https://www.scottbuckley.com.au/library/using-this-music/) / [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。素材費は0。standaloneの原曲配布・Content ID登録は行いません。公開/uploadをしていないため、YouTube側の実際のclaim結果はUNKNOWN。

`public/reports/music-rights.json` に公式download URL、取得日時、原本hash、条件、attribution、変更内容を記録。`pack.json` の各variantのJA/EN説明文候補には、該当credit、license link、編集表示を追記済みです。映像上のcopyと既存タイトル・本文候補は変更していません。

## 検証・保全・停止

- 10MP4すべて、元R1のH.264 encoded bytes / PTS / DTS / frame duration一致。各variantのJA/ENはAAC encoded bytes一致。元の6MP4も全file hashを保持。
- 5案の全尺ブラウザー再生・出力観測、同じ位置での音切替、JA/EN切替、pause/seek/repeat、1440/768/390px、local評価保存を実施。UI開始処理のP2は修正して再検証。
- 新packのscoped security scanを実施。既存full-project raw FAIL22 / historical FAIL11 / S04・S05 UNKNOWNは別判定として保持。全project/index/historyのcheckpoint検査は再実行していません。Git操作は未実施。
- 同時進行のCopy Debt taskによる既存source差分を認識し、変更・復元せず保全。今回の撮影元は不変のreleased artifactで、その並行candidateには依存していません。詳細は `public/reports/verification.json`。
- npm build/check・ゲームロジック全体の再testは対象外。ゲームsource/runtime/payloadを変更しておらず、影響範囲のmedia・review・配布境界・原本照合を検証しています。
- 実利用model ID: primary / audio audit / source researchはいずれも **UNKNOWN**。ツールから取得できず、役割名で代用していません。

**HUMAN_AUDIO_QUALITY_GATE_PENDING** で停止。残り12企画、投稿・予約、stage / commit / push / deploy、Production変更、LAN再公開、paid services、TTSは行っていません。

ローカルサーバー再開が必要な場合のみ、repo rootで `node marketing/youtube-gold-audio-r2-2026-09-27/scripts/server.mjs`。既に4462が使用中なら既存プロセスを止めず、まずこのReviewが稼働しているか確認してください。
