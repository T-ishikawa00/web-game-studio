# Two Ways Home BGM Pilot 01 — Review Pack

2026-09-16。**TW-C Craft採用を固定・保存後、BGM C/D1/D2を比較制作。Human BGMレビュー待ち、Phase 2未commit。** BGM採用は必須ではない。

## Review / 試遊

[比較動画・単体試聴・長時間記録を開く](http://127.0.0.1:4344/)

| 条件 | 日本語 | English |
|---|---|---|
| C — Accepted TW-C / BGMなし | [試遊](http://127.0.0.1:4344/ja/prototypes/play/two-ways-home/?tw=TW-C&bgm=C&layout=auto) | [Play](http://127.0.0.1:4344/en/prototypes/play/two-ways-home/?tw=TW-C&bgm=C&layout=auto) |
| D1 — Playful minimal / wood-toy | [試遊](http://127.0.0.1:4344/ja/prototypes/play/two-ways-home/?tw=TW-C&bgm=D1&layout=auto) | [Play](http://127.0.0.1:4344/en/prototypes/play/two-ways-home/?tw=TW-C&bgm=D1&layout=auto) |
| D2 — Calm quirky / light ambient | [試遊](http://127.0.0.1:4344/ja/prototypes/play/two-ways-home/?tw=TW-C&bgm=D2&layout=auto) | [Play](http://127.0.0.1:4344/en/prototypes/play/two-ways-home/?tw=TW-C&bgm=D2&layout=auto) |

T19/T20/T04（表示01/03/11）の同じ初期状態・操作列・1×速度・432×768で9動画。盤面タップ＋1.8秒待機を共通の準備として置き、実ゲームSFX/BGMを別AudioContextから同時収録。後付け音・microphoneなし。[比較条件](media.json)。WAV単体2本と実時間330秒のゲーム出力記録2本を保持。

## 制作とKeep

D1は40秒の疎な木質系の句、D2は48秒の丸い持続音と短い音。[譜面・合成・信号計測](composition.json)。ローカル独自合成のみ、外部API・購入・契約なし。長いreverb・drum・入力との拍同期はない。

採用済みTW-Cのゲーム・Art・Motion・SFXを変更せず、独立entry/audio/scoreと専用build/serverを追加。BGMは既定18%。盤面入力でBGMだけ短く退かせる。同時clearでは停止し採用clear SFXを優先、片方帰宅・出直しは特別に祝わない。曲の開始/停止はゲームの操作や180msの時刻を待たせない。[詳細仕様](../../games/TWO_WAYS_BGM_PILOT_01.md)。

独立read-onlyレビューで比較URLに旧A/B設定が残るリスクを検出し、専用serverのTW-C正規化で修正。初回QAで盤面の高さ変化がBGM停止を招いたため、幅変更だけを停止対象とし修正。試験用イベントの引数不備も修正し再実行。停止・設定・失敗処理はBGM内に限定した。

## QA

- unit：212 PASS（既存209＋音楽設定/信号3）。型エラー・warningなし、既存hintは別記。
- lifecycle：C同一性・autoplay禁止・1source・帰宅/離脱/clear/Undo・mute/gain/保存独立・hidden/blur/pagehide・ロード取消・保存失敗・広告・日英3表示・reduced motion・他作品非干渉。
- edge：遅延resume/decode、開始失敗回復、破損音源、連続中断、旧A/B設定、広告終了後の再開なし。
- D1/D2各330秒の実時間ブラウザ再生。1source・再開始/失敗なし・音声clock追従・継ぎ目の信号計測。[loop記録](loop-results.json)。人の5分聴感レビューではない。
- 固定sourceと配布：Tiny R2 46、Lightwork R1 48、Two Ways Craft R1 44。全57問のルール/保存unitと既存Craft browser/入力QAは不変sourceの根拠付きで再利用。BGM代表面比較では全入力後の盤面・履歴・SFX planが同一。
- Reviewリンク・動画実再生・WAV/長時間音源・小画面・loopback配信制限を検証。[QA実行記録](qa.json)。

## Phase 1 / Phase 2 / Security

Phase 1 checkpoint：`bed130a8a0874eead6fdbfd72743488293e35ac0`、対象61ファイル、1 commit＋Private origin/mainへ1通常fast-forward push。HEAD/origin/main/実remote一致を確認。[postflight](phase1-postflight.json)。全index/hook/history PASS、raw全project FAILは既知2件のみ。

Phase 2は未commit、stage/commit/push 0。[保全とSecurity](preservation-security.json)。TLS実秘密鍵はローカル保持のみでGit/レビュー/配布外、SHA誤検出と別判定。新規候補へ承認を広げない。既存scanner/hook/依存設定不変。対象外13件の旧Tiny実機/LAN資料・helperも保全。

## Human未確認 / 残る懸念

**BGM聴感・採用 PENDING**。音楽が明確に良いか、考える間を邪魔しないか、共通移動/停止SFXを埋めないか、長時間反復で疲れないかはHumanレビュー対象。信号計測やAIの視覚確認からPASSにしない。Cを選ぶ判断も成立する。

実機 NOT TESTED、外部初見 DEFERRED / NOT TESTED、全21問/全57問Humanゲーム性・公開/法務/広告は未受入。TW-C Human Craft PASSをこれらへ拡張しない。主担当・独立レビュー実利用モデルは `gpt-6-astra`。

## 再起動 / 再現

閲覧のみ：repo `C:\projects\Web Game Studio` で `node scripts/twoways-bgm-server.mjs`。**127.0.0.1:4344限定**。既に稼働中なら再利用。他プロセスを無断停止しない。サーバー再起動だけでQA/Review/音源を再生成しない。

出力の再現が必要な場合：`node scripts/twoways-baseline-build.mjs` → `node --import tsx scripts/twoways-bgm-samples.ts` → `node scripts/twoways-bgm-build.mjs`。固定manifestは再生成しない。専用QAは`QA_R5_BASE_URL=http://127.0.0.1:4344`で実行し、再実行は差分/失敗/未解決リスクに応じて選ぶ。

deploy・LAN再公開・購入・契約・外部音源API・外部公開なし。Human BGMレビュー待ちで停止。
