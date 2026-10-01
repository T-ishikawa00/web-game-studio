# Release QA — accepted product, incomplete device qualification

Human Full Game Acceptanceは確定。以下3項目はRelease blockerとして未完了。

| Required QA | Current status | 次の確認範囲 |
|---|---|---|
| physical smartphone | NOT TESTED | 実際の指、遮蔽lens、狙い/release、連打、二本指/cancel、viewport/safe-area/回転、60秒run、Result/Retry、storage/audio拒否と復帰 |
| iOS Safari | NOT TESTED | 実SafariのPointer/capture、dvh/browser chrome、user-gesture Web Audio、mute/pause/resume/hidden、module/CSP、localStorage fallback |
| low-performance device | NOT TESTED | 後半密集・高chainのframe/input latency、熱・長時間反復、低FX、audio10voice、memory安定 |

今回のTouchは390×844 Chrome emulation / native pointerType=touch / 26accepted shots。実機やHuman初心者の試験ではない。JA/EN viewport8casesと44px UIを確認。touch cancel後発射数26不変、queued shotなし。

現在QA: 84 core/input/records tests PASS、17 local guard/audit PASS、secret scan0、動画decode PASS、ブラウザ6動画loaded/通常Play確認。9runtime source/dist hashes一致。詳細 evidence/qa/FINAL_EVIDENCE.json、MEDIA_INDEX.json、LOCAL_AUDIT.json、layout-results.json、independent reviews。新packのbuild/test/verify/isolated static previewは QA_HANDOFF.json。

選定Full60: 15,740/12chain/life1/67 keyboard、Mouse:11,810/13chain/43.858s失敗、simple keyboard example:2,695/5chain/28.5s、touch:2,840/4chain/26.683s。SEのみ1×。Result/Retryはnative249frames、timestamp維持。

Touch動画は後続QA recorder guardと横画面CSSの変更前。core/content/input/view/audioはfinalと同じ。Full60/Mouse/simple keyboardとnative Result/Retryは現accepted9source hashes一致。失敗・interruption・0byte auxiliaryは完全baselineに保全し、最終Gameplay見本から除外。

Known limitations: predictionは壁だけを反映し移動敵/装甲で早く止まる。横画面は照準が小さい。長期Skill/replay/retentionデータUNKNOWN。SE実機聴感未検証。screen-reader部分対応。gamepadなし。origin-root asset参照のmount処理とPortal save/Consent policy接続は未実施。

sourceやfeelを変える修正はこのAccepted baselineへ直書きしない。新candidateでsource差分、parameter比較、84 regression、通常操作60秒/chain/Retry、物理device結果を揃える。公開判断は別Human Gate。
