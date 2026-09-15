# Production System R2 Adoption + Tiny Delivery Craft Pilot 01

2026-09-15 / **Craft Pilot実装・技術QA済み、音と反応のHuman受入待ち。**

[統合Review Pack](http://127.0.0.1:4327/) / [Tiny Delivery 日本語](http://127.0.0.1:4324/ja/prototypes/play/tiny-delivery/) / [English](http://127.0.0.1:4324/en/prototypes/play/tiny-delivery/)。停止中なら `npm run preview:prototypes` と `node scripts/craft-review-server.mjs` を別ターミナルで実行。loopback限定。

## 現在地と保全

[採用Playbook](../../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md) は添付と完全一致。現在地（参照原本はPrivate保全・候補には非同梱） とAGENTS、旧制作R1、READMEに短い参照を追加。START_HEREは不変。main / HEAD / local upstream reference `7815bf03377e1063112406d28e404beffb017c5a`。remoteへの新規照会なし。最新dirty成果は `.tmp/craft-before/` に保全し、54問へ戻していない。

Lightwork 18 / Two Ways 21 / Tiny Delivery 18、計57問。導入3問・学習順・光の因果反応、Portal Baseline、R5 Art/配色、直接操作、縦横/通常表示、解答・ルール・保存形式を保持。旧QAとSecurity判定も保全。今回のsource変更はTiny向けの表示/音の統合のみ。他2作品への新SFX/Motion追加なし。

主担当は実行記録で確認した **gpt-6-astra (high)**。独立読み取りレビューは **gpt-6-astra (medium)**。global設定・課金プラン変更なし。追加契約/API/素材購入費0、モデル利用量・Human工数の総量は取得していない。

## 実装と試聴

小さな玩具機械を意図した8イベント。矢印、時計、調整へ戻る、出発、到着、失敗、問題クリア、初回全18問クリア。停止/再開は無音。最終到着はclear/signatureへまとめ、毎tick・常時モーター・BGMは追加しない。代表の矢印/到着/clearは各2候補、計11 WAV。variant 0を仮採用し、variant 1をC-altで同じゲーム内比較できる素材として残す。耳で優劣を選定済みとはしない。

原本は `src/prototypes/craft-sound.ts`、来歴は[素材台帳](../../records/ASSET_REGISTER_R1.md)。ローカルの決定的なノイズ/共鳴/エンベロープ合成のみ。外部生成・第三者素材・既存曲模倣なし。初期gain 35%は仮値、破損/読取拒否時は20%。Human試聴で最終調整する。

メニュー→設定に消音・音量。独立キー `wgs:audio:tiny-delivery` version 1、進行セーブに新項目を加えない。破損/保存拒否/読戻し不一致は明示し、その回の設定とプレイを保つ。初回は本物の操作でAudioContext初期化/再開。拒否・非対応・音源作成/開始失敗でもプレイ継続。render/復元/resizeから発音しない。

Motionは押込み140ms、移動180ms、到着240ms、短い失敗/達成反応。判定と600ms tickはそのまま。pause/メニュー/Undo相当の調整/再起動/表示切替/page hideで世代を取消し、音は短いfadeと発音上限3。軽い操作は2音までとして結果音の枠を確保。reduced-motionでは補助演出を省略し、最終位置・待機・成功/失敗は既存の表示で伝える。

## 同条件A/B/C

D01導入・D12交差/待機・D18終盤、各432×768、同じ入力順・350ms操作後待機・600ms tick。Aは変更前の実録画、Bは新Motion/無音、Cは新Motion/SFX。異なる隔離browser contextを使い、Human保存を共有/変更しない。[入力・結果照合](comparison.json) / [A](media-A.json) / [B](media-B.json) / [C](media-C.json) / [別音候補](media-C-alt.json)。操作APIの処理時間には小さな変動があり、映像の全フレーム時刻一致を主張しない。

C/C-altは**実ゲームWeb Audio出力graphをMediaRecorderへ同時分岐**して取得した音。実測したwall-clock offsetで映像へ多重化。音を編集で再構成して付けたものではない。ただしブラウザ映像の開始時刻誤差、実スピーカー、聴感上の同期は未検証。同期/音量の判断は実ゲームURLを優先する。A/Bは意図した無音。波形/peak確認を聴感PASSと呼ばない。

## 技術QA

| 項目 | 結果 |
|---|---|
| Type check | 0 errors / warnings / hints |
| Unit | 181/181 PASS。混音headroom、厳密設定検証、順序逆転resume/拒否/開始失敗cleanupを含む |
| 通常 / Design / prototype build | PASS、18 / 62 / 26 HTML |
| Route / isolation | 7/7 PASS、公開ゲーム0・Design見本10を維持 |
| [full-run-results.json](full-run-results.json) | 57/57 PASS |
| [input-results.json](input-results.json) | 14/14 PASS |
| [state-results.json](state-results.json) | 6/6 PASS |
| [regression-results.json](regression-results.json) | 15/15 PASS |
| [layout-results.json](layout-results.json) | 54/54 PASS |
| [responsive-results.json](responsive-results.json) | 84/84 PASS |
| [visual-contract-results.json](visual-contract-results.json) | 6/6 PASS |
| [learning-cause-results.json](learning-cause-results.json) | 32/32 PASS |
| [audio-browser-results.json](audio-browser-results.json) | 26/26 PASS |
| [mode-results.json](mode-results.json) | 54/54 PASS |
| [portal/browser-results.json](portal/browser-results.json) | 19/19 PASS |
| [review-results.json](review-results.json) | 5/5 PASS |

無音/音あり/reduced-motionそれぞれ配送18問、計54runの全中間状態・結果・保存再開が一致。mute保持、連打、同値待機、terminal重複、mock pause、表示切替、音源欠落、storage拒否/破損、visibility、初回以外の面での全クリアも確認。visibilityはsynthetic lifecycle検査であり物理スマホ背景復帰ではない。Portal既存回帰はDesign Baseline 4323と旧fixtureを使用、通常配布は4322のroute/isolation検査。

追加配布コード **8,696 bytes (uncompressed)**、音ファイル追加配信/音源リクエスト **0**。[内訳・CPU測定](cost-results.json)。3音最大gainの保守的peak上限 **0.722 < 1**。[波形測定](audio-measurements.json)。音色の聴感・疲労の証拠にはならない。

CPUはD01同条件をA/B/C各3回・順序回転し、読み込み後のrenderer TaskDurationを測定。中央値ms: A 86.8 / B 99.0 / C 116.8。小標本のdesktop実測で、audio worklet/デバイス処理を含む総CPU・電池・mobile性能ではない。負荷の増減を断定しない。

## 自己レビュー・失敗記録

独立レビューの3件を修正: 古いresumeが新しい入力を停止する競合、resume拒否時の利用不可表示、source.start失敗時のnode/voice残留。遅延Promiseを逆順に完了する試験、拒否後回復、開始失敗6連続後の回復で確認。実機iOS検証への読み替えなし。

QA初回の失敗は `.tmp/craft-qa/` に保全。既存解答JSONのtick格納位置/第2矢印を読み違えた撮影/計測script、初期矢印値の固定assertion、signature終了前の350msでの残音検査を修正。layout suiteの比較fixture不足を既存基準から補い、Designカードを前提としたPortal suiteは誤指定した通常4322から正しい4323へ変更。製品のルールや受入条件をテスト都合で緩めていない。

## Security / 保全 / 停止

[Security検証](security.json): raw allは既知1件のFAILを維持、限定 **FALSE POSITIVE / NON-CREDENTIAL / APPROVED** を現物再確認。新規候補0、既存full index scan PASS（stageした意味ではない）、scanner/allowlist変更なし。値を出力せずprovider照会なし。[保全・差分](preservation.json)。大量の反復スクリーンショットはignored `.tmp/craft-qa/`、Reviewには代表6画像・短い映像のみ。

**stage / commit / push / deploy / 実広告 / 外部サービス接続 / 購入 / 外部送信なし。** 次の明示承認までは実行しない。受入後は既存導入改善とCraft Pilotを識別できるcommit単位として保存する提案を行う。

## Humanレビューと残課題

聴感、音色選定、繰返し疲労、物理スマホ/Safari/Firefox、外部初見、全編ゲーム性、法務・公開・実広告は **NOT TESTED / PENDING**。初期gainとvariantは暫定。

手元の方式では録音由来の木/玩具素材の質感や端末スピーカーでの聞こえを検証できていない。特に短いarrowの刺さり、arrivalの重量感、signatureの独自性と繰返し疲労を評価対象に残す。不足がHuman試聴で具体化した場合のみ、該当音の録音素材/限定sound designer review/外部生成を比較して費用・許諾を別承認にまとめる。今回は契約・API利用・権利を推定しない。

初見: 制作に関わっていない成人の協力者をHumanが手配し、別browser profileでD01→D12を説明なしで試す。最初に触る対象、最初の成功、誤操作、retry、待機の理解を観測し、教えた時点を記録。録画は本人同意がある場合のみ。自動QAと既存Humanを初見人数に数えない。

実機: Humanの端末で届くローカル試遊手段の別確認が必要（現URLはこのPCのloopback限定）。スマホ実機を装わない。確認時は縦横、矢印/時計、消音/音量のreload保持、ロック/タブ切替→復帰、mock pause、連打→調整を短く試す。外部公開やトンネル作成は未承認。

## 動画Hook案（投稿未実施）

- JA 1: 「時計を1つ変えるだけ。ふたりの配達、ぶつからずに通せる？」D12の待機編集→交差→到着、実ゲーム5〜10秒。
- JA 2: 「近道が正解とは限らない。最後の配達、何拍待つ？」D18の経路と時計→最終交差。未実装の演出や架空の成功率を足さない。
- EN 1: “One tiny clock. Two deliveries. Can you make room for both?” D12, actual wait edit → crossing → delivery.
- EN 2: “The shortest road isn't always the answer. How long would you wait?” D18, actual route and clock setup → crossing.

観測した流入/再訪/収益はまだない。投稿・募集・外部送信・広告費は今回実行しない。
