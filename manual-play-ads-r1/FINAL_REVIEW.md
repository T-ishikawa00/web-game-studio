# TINLUMO — MANUAL PLAY PAGE ADS R1 / ORIGINAL LOCAL REVIEW SNAPSHOT

この文書は、Humanが2026-10-03 JSTに承認した元のローカルReviewを履歴として保全したものです。下記の公開許可待ち・未実施・元candidate hashは当時の状態です。

最新Humanは一回限りのscoped stage / commit / private main normal push / Production deploy / readbackを承認済み。現在の公開候補と権限は [RELEASE_AUTHORITY.json](RELEASE_AUTHORITY.json)、[CANDIDATE_MANIFEST.json](CANDIDATE_MANIFEST.json)、[QA_RESULTS.json](QA_RESULTS.json)を確認してください。元候補からの追加差分はHOLD対象の非表示広告aside除去のみで、HOLDの6 JA/EN routesは広告slot DOM 0件です。元Reviewの同一byte原本はinternal/release-r1/approvedに保全しています。

実行の成否・commit / version / deployment / Production readbackの最新証拠はinternal/release-r1に記録します。以下は元Reviewです。

2026-10-03 JST。ローカル実装・ブラウザQA・Production候補作成を完了。公開許可は未付与。stage / commit / push / deployは未実施。

## 結果と公開状態

- MANUAL_PLAY_ADS_R1_IMPLEMENTED
- PLAY_AUTO_ADS_EXCLUSION_PRESERVED
- DESKTOP_SIDE_ADS_SAFE
- MOBILE_BOTTOM_AD_SAFE_OR_EXPLICITLY_HELD
- PRODUCTION_CANDIDATE_READY
- HUMAN_RELEASE_REVIEW_PENDING

Productionは変更なし。main / origin/main / direct remote：f9d5d99277dd1e2a1ec9b5bcde4ea4d987bdde30。公開version：54243815-4bed-4b5f-8d2c-b011dec1a2c7、100%。公開8作品、51routes。今回の候補は181files / 180配信files。

## 配置

| 作品 | Desktop Left / Right | Mobile Bottom |
|---|---|---|
| RIMBLOOM R2 | 2020px以上、ゲーム幅1080pxを維持 | 条件付き表示 |
| Light Garden | 2540px以上、ゲーム幅1600pxを維持 | 条件付き表示 |
| Two Ways Home | 2740px以上、ゲーム幅1800pxを維持 | 条件付き表示 |
| COILHOP | 全幅iframeを維持するため非表示 | 条件付き表示 |
| EMBER & GLAZE / 火種と釉 | 全幅iframeを維持するため非表示 | 条件付き表示 |
| Hakorilo（registry / route: tiny-delivery） | 全幅ゲームを維持するため非表示 | HOLD：固定開始・設定UIがスクロール後に広告位置と重なる |
| Island Connections | 全画面canvasを維持するため非表示 | HOLD：body scroll lock |
| PROJECT MAGNET | 全画面canvasを維持するため非表示 | HOLD：body scroll lock |

Desktopは実測したゲーム幅 + 左右300px広告 + 左右150px間隔 + 左右20px外周余白で閾値を決定。広告は通常フローの300×250枠で、ゲーム・ツールバー・既存入力の位置と寸法を維持。閾値の前後1pxを測定し、左右150px以上。十分な余白がない作品では左右広告を出さない。

Mobileは1024px以下でゲーム・footer・既存設定パネルの後に通常フロー配置。広告幅はページ内幅、最大480px、高さ100px。320 / 375 / 390pxのMobile描画で、5作品の最短操作領域距離155px以上。ゲーム本体との距離はさらに大きい。固定・sticky・overlay・game viewport縮小は追加しない。

条件付き表示は、下部追加による通常スクロールバーでゲームが縮む環境、画面の向きや既存操作UIにより150pxを確保できない環境、SDKエラー・無応答ではHOLDする。短いlandscapeではCOILHOP / EMBER / RIMBLOOMが分離ガードによりHOLDになるケースを確認。Mobile portraitでは5作品が表示可。Hakorilo / Island / MAGNETの3作品は常時HOLD。Acceptedゲームを変更して広告枠を強制しない。

## 広告コードと同意

既存head loaderを1本のまま再利用。Publisher ca-pub-2960465104451668。Left 6898213660 / Right 4699511455 / Bottom 9760266447。各DOM slotでpushは最大1回。非表示・HOLDのslotは初期化しない。resize後に再pushせず、SDKのiframe・内容・click挙動を変更しない。AMPなし。

Google公式の[responsiveコード変更ガイド](https://support.google.com/adsense/answer/9183363?hl=en)にあるインラインCSS・メディアクエリと可変幅／固定高さの方式を採用。[未充填slotの公式取扱い](https://support.google.com/adsense/answer/10762946?hl=en)に沿ってunfilledを折りたたむ。SDKエラー・10秒無応答も枠を消し、再試行や自動refreshはしない。

Auto Adsの /ja/play・/en/play セクション除外はHuman申告を前提に保持。管理画面の変更なし。Growth Consentを広告同意として使用しない。既存Google CMP、Growth Consent、Consent C実装は同一バイト。広告同意は既存Google側の実装／設定が担う。Privacy / Termsは既にAdSenseを包括開示しており、今回の同一provider・データ取扱いの手動枠追加だけでは改定しない。ads.txtも同一バイト。

## 検証

- 全16 JA/EN Play routes。176組の基準版／候補寸法比較、ゲーム開始後4組。ゲーム／canvas／iframeの位置・寸法差0、横overflow0。
- Desktop：1280 / 1920 / 2880px、各閾値の直前・閾値・直後9ケース。Mobile：320 / 375 / 390 / 844×390。Mobile下部スクロール32ケース。
- filled / unfilled / SDK throw / pending、one-push、resize・history navigation・reloadを確認。historyは新documentで戻るため、実BFCache復元は未検証。コードのdocument guard・requested markerは保持。
- 普通のmouse / keyboard：Light Garden L01 clear・retry・pause・保存復元、Two Ways first return・retry・pause・1/21保存復元、RIMBLOOM開始・dash・pause、COILHOP jump・failure・retry・pause、EMBER開始・keyboard meaningful input・pause。
- RIMBLOOM / COILHOP音設定切替を確認。音声コード・資産は同一バイト。今回の独立試聴は未実施。
- Growth回帰10 tests PASS。ローカル同意ONでイベントを観測し、最後にOFFへ復帰。22 observed network requestsはloopbackのみ。実広告request / click 0。
- Portal / JA / EN / 既存ゲームcore / legal / ads.txt / Consent C / Growth client / Worker / configは同一バイト。全51公開HTML + ads.txtのlive readbackで既存Production一致。Worker・D1・Cron・vars・bindingsは変更なし。ローカルWrangler dry-run PASS、uploadなし。

## 明示的な未検証

Touch emulationは入力dispatch timeoutのため **ATTEMPTED_NOT_VERIFIED**。emulationを解除してreload後に通常入力へ復帰。物理スマートフォン・iOS Safari・実機のelastic overscroll・独立試聴はNOT TESTED。実AdSense fill / site review / live CMP挙動はNOT VERIFIED。今回のmockを実広告表示・広告承認・Human Craft Acceptanceとして扱わない。これらは公開判断時に残る確認項目。

## Security・保全・成果物

Fresh scoped Gitleaks 8.30.1は **PASS、新規秘密候補0件**。結果は [SECURITY_RESULTS.json](SECURITY_RESULTS.json) を正本とする。対象は今回source・候補・runtime・ignored QA・現在地追記。過去の全project raw FAIL46と既存Human exact dispositionは変更しない。Git checkpoint向け全index／history scanは今回未実施（Git操作未許可）。秘密候補の報告はfile / type / actionのみ。

既存dirty12を保全し、現在地は旧本文をbyte保全して先頭追記のみ。初期untracked72,661pathsの消失0。root主担当が統合・最終検証を担当、3 subagentはread-only調査。実model IDはroot / subagentともUNKNOWN_NOT_EXPOSED。

- [Candidate manifest](CANDIDATE_MANIFEST.json) SHA256 3882cd3df705d29b27f788f40d2eb990197f6bf1f04a4c921e840d38b9a596e8
- [QA results](QA_RESULTS.json)
- [Final diff](FINAL_DIFF.json)
- [Static check](internal/static-check.json)
- [Production preservation readback](internal/POSTFLIGHT.json)
- [Local dry-run](internal/dry-run.json)
- [Desktop snapshot](internal/screenshots/rimbloom-wide.png)
- [Mobile snapshot](internal/screenshots/rimbloom-mobile-full.png)

ここで停止。今回の公開候補への最終Human Review待ち。stage / commit / push / deploy、外部配信、AdSense管理画面操作は行わない。
