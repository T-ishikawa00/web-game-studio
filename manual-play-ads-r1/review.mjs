import fs from 'node:fs';
import assert from 'node:assert/strict';
import {read,sha,put,json} from '../game008-009-production-r1/common.mjs';
const root='manual-play-ads-r1',m=read(root+'/CANDIDATE_MANIFEST.json'),qa=read(root+'/QA_RESULTS.json'),p=read(root+'/internal/PREFLIGHT.json');
assert.equal(qa.manifestSha256,sha(fs.readFileSync(root+'/CANDIDATE_MANIFEST.json')));
const security=read(root+'/SECURITY_RESULTS.json');assert.equal(security.status,'PASS');assert.equal(security.newUndisposedCandidates,0);assert.equal(security.candidateManifestSha256,qa.manifestSha256);
const table=`| 作品 | Desktop Left / Right | Mobile Bottom |
|---|---|---|
| RIMBLOOM R2 | 2020px以上、ゲーム幅1080pxを維持 | 条件付き表示 |
| Light Garden | 2540px以上、ゲーム幅1600pxを維持 | 条件付き表示 |
| Two Ways Home | 2740px以上、ゲーム幅1800pxを維持 | 条件付き表示 |
| COILHOP | 全幅iframeを維持するため非表示 | 条件付き表示 |
| EMBER & GLAZE / 火種と釉 | 全幅iframeを維持するため非表示 | 条件付き表示 |
| Hakorilo（registry / route: tiny-delivery） | 全幅ゲームを維持するため非表示 | HOLD：固定開始・設定UIがスクロール後に広告位置と重なる |
| Island Connections | 全画面canvasを維持するため非表示 | HOLD：body scroll lock |
| PROJECT MAGNET | 全画面canvasを維持するため非表示 | HOLD：body scroll lock |`;
const md=`# TINLUMO — MANUAL PLAY PAGE ADS R1 / FINAL HUMAN REVIEW

2026-10-03 JST。ローカル実装・ブラウザQA・Production候補作成を完了。公開許可は未付与。stage / commit / push / deployは未実施。

## 結果と公開状態

- MANUAL_PLAY_ADS_R1_IMPLEMENTED
- PLAY_AUTO_ADS_EXCLUSION_PRESERVED
- DESKTOP_SIDE_ADS_SAFE
- MOBILE_BOTTOM_AD_SAFE_OR_EXPLICITLY_HELD
- PRODUCTION_CANDIDATE_READY
- HUMAN_RELEASE_REVIEW_PENDING

Productionは変更なし。main / origin/main / direct remote：${p.head}。公開version：${p.production.versions[0].version}、100%。公開8作品、51routes。今回の候補は181files / 180配信files。

## 配置

${table}

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

- [Candidate manifest](CANDIDATE_MANIFEST.json) SHA256 ${qa.manifestSha256}
- [QA results](QA_RESULTS.json)
- [Final diff](FINAL_DIFF.json)
- [Static check](internal/static-check.json)
- [Production preservation readback](internal/POSTFLIGHT.json)
- [Local dry-run](internal/dry-run.json)
- [Desktop snapshot](internal/screenshots/rimbloom-wide.png)
- [Mobile snapshot](internal/screenshots/rimbloom-mobile-full.png)

ここで停止。今回の公開候補への最終Human Review待ち。stage / commit / push / deploy、外部配信、AdSense管理画面操作は行わない。
`;
put(root+'/FINAL_REVIEW.md',md);
const rows=table.split('\n').filter((_,i)=>i!==1).map((line,i)=>'<tr>'+line.split('|').slice(1,-1).map(c=>`<${i?'td':'th'}>${c.trim()}</${i?'td':'th'}>`).join('')+'</tr>').join('');
const html=`<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Tinlumo Manual Play Ads R1 — Human Review</title><style>body{margin:0;background:#f4f5f7;color:#17222e;font:16px/1.75 system-ui,"Yu Gothic UI",sans-serif}main{max-width:1160px;margin:auto;padding:40px 24px}h1{font-size:32px;line-height:1.3}h2{font-size:23px;margin-top:40px}p{max-width:950px}table{border-collapse:collapse;width:100%;font-size:14px;background:white}td,th{padding:14px;border-bottom:1px solid #d5dce3;text-align:left;vertical-align:top}th{background:#e8edf3}a{color:#214b7e}img{max-width:100%;height:auto;border:1px solid #cad3de}figure{margin:24px 0}.mobile img{width:390px}.status{border-left:5px solid #26664b;background:#e7f0ec;padding:16px 22px}.note{background:#fff2d9;padding:16px 22px}code{word-break:break-all}nav{display:flex;gap:20px;flex-wrap:wrap}@media(max-width:650px){main{padding:24px 14px}table{font-size:12px}td,th{padding:8px}h1{font-size:26px}}</style><main><h1>TINLUMO<br>MANUAL PLAY ADS R1</h1><p class="status">ローカル実装・Production候補作成完了。<strong>HUMAN RELEASE REVIEW PENDING</strong><br>stage / commit / push / deploy 未実施。現在のProductionは変更なし。</p><nav><a href="FINAL_REVIEW.md">詳細Review</a><a href="QA_RESULTS.json">QA結果</a><a href="SECURITY_RESULTS.json">Fresh Security</a><a href="FINAL_DIFF.json">最終差分</a></nav><h2>全8作品・日英16 Playルート</h2><table>${rows}</table><p>左右の最小距離150pxを実測。Mobile portraitでは操作領域と155px以上。既存game viewportの位置・寸法差0、横overflow0。</p><p>条件付き表示は、スクロールバーによるgame縮小、150px未満の操作UI距離、SDKエラー・10秒無応答を検出するとHOLDします。短いlandscapeで分離条件を満たさないslotも非表示です。</p><h2>Desktop — 2560px</h2><p>画像は実広告を送信しないローカルテスト広告です。広告を出すためのゲーム縮小はありません。</p><figure><img src="internal/screenshots/rimbloom-wide.png" alt="RIMBLOOMの外周に150pxを隔てて左右のテスト広告"><figcaption>RIMBLOOM、左右300×250。ゲーム領域の幅1080pxを維持。</figcaption></figure><h2>Mobile — 390px</h2><figure class="mobile"><img src="internal/screenshots/rimbloom-mobile-full.png" alt="ゲームと既存操作パネルの下に150px以上を隔てたテスト広告"><figcaption>ゲーム・footer・既存設定パネルの後に通常フロー配置。overlay / stickyなし。</figcaption></figure><h2>QAの範囲</h2><p>176組の基準／候補比較、ゲーム開始後4組、境界幅9ケース、Mobile scroll32ケース。filled / unfilled / SDK error / pendingとone-pushを確認。Growth10 tests PASS。既存core・Portal・legal・ads.txt・同意・Workerは同一バイト。</p><p class="note"><strong>未検証：</strong>touch emulationは入力timeoutで完了せず、実機・iOS Safari・elastic overscroll・独立試聴・実AdSense fill・live CMP・BFCache復元は未確認です。mock結果を実広告承認として扱いません。</p><h2>Publisher / units</h2><p><code>ca-pub-2960465104451668</code><br>Left：6898213660 ／ Right：4699511455 ／ Bottom：9760266447<br>既存head loader 1本を再利用。PlayのAuto Adsセクション除外はHuman申告を前提に維持。Growth Consentを広告同意に流用しません。</p><p>Privacy / Termsは既にAdSenseを包括開示。今回の手動枠追加では改定せず、既存CMP・Consent C・Growth実装を保全しています。</p><h2>固定した候補</h2><p>公開版基準：<code>${p.production.versions[0].version}</code><br>Candidate manifest SHA256：<code>${qa.manifestSha256}</code><br>181 files / 180 served files / 51 routes。</p><p>最終差分とFresh scoped Securityを上部リンクから確認できます。ここで停止し、HumanのRelease Reviewを待ちます。</p></main></html>`;
put(root+'/Review.html',html);
put(root+'/README.md',`# Manual Play Ads R1\n\nLocal candidate only. No Git writes or deployment authorization.\n\nRead FINAL_REVIEW.md, QA_RESULTS.json, SECURITY_RESULTS.json and CANDIDATE_MANIFEST.json. The baseline is pinned to the existing Game009 release manifest and fresh Production readback. Exactly the current 16 registry Play routes are adapted; a new unmeasured route makes build fail closed. Game runtimes/Portal/consent/legal/ads.txt/Worker remain byte-identical.\n\nLocal commands: node manual-play-ads-r1/build.mjs; node manual-play-ads-r1/check.mjs; node manual-play-ads-r1/preview.mjs. Preview is loopback only and disables real AdSense; ?adqa=filled|unfilled|throw|pending selects mock fixtures. Production assets contain no QA fixture or mock code.\n\nThe historic Game009 check intentionally rejects play slots and remains unchanged. A future authorized release must use this reviewed candidate manifest/config and carry this adapter forward; do not publish an old artifact that omits the manual-unit delta. Fresh permissions and Git checkpoint security are required before any stage/commit/push/deploy.\n`);
const file='docs/games/PRODUCTION_CURRENT.md',before=root+'/internal/current-before.md';
if(!fs.existsSync(before)){const old=fs.readFileSync(file);assert.equal(sha(old),p.tracked.find(r=>r.file===file).sha256);put(before,old);
 const prefix=`# 2026-10-03 — MANUAL PLAY ADS R1 / LOCAL CANDIDATE / HUMAN RELEASE REVIEW PENDING\n\n最新Human依頼のローカル実装・browser QA・Production候補・final diff・fresh scoped Securityを実施する範囲。stage / commit / push / deployは未許可・未実施。現在ProductionはGame009 version ${p.production.versions[0].version}の公開8作品のまま。\n\n- 全16 JA/EN Play routesへ3手動Display slotを導入したローカル候補。Publisher ca-pub-2960465104451668、Left6898213660 / Right4699511455 / Bottom9760266447。既存loader1本、Play Auto Ads除外はHuman申告を前提に保持。\n- Desktop：RIMBLOOM2020px / Light Garden2540px / Two Ways2740px以上。既存幅を維持し左右150px以上を実測。全幅5作品は左右非表示。\n- Mobile：5作品で通常フロー下部表示、操作領域155px以上。Hakorilo（固定UI競合）/ Island / MAGNET（scroll lock）はHOLD。classic scrollbarによる縮小、短いlandscape等で150px未満、SDK failure / timeout時は自動HOLD。\n- 基準／候補176組 + ゲーム開始後4組、寸法・位置差0／横overflow0。境界幅9・Mobile scroll32。通常mouse/keyboard/pause/retry/save/音設定を確認、Growth10 tests PASS。gamecore・Portal・legal・ads.txt・同意・Worker/configは同一byte。候補181files / 180servedfiles / 51routes、local dry-run PASS。\n- Touch emulation ATTEMPTED_NOT_VERIFIED（input timeout）、解除・reload後通常入力復帰。実機/iOS/elastic overscroll/独立試聴/実広告fill/live CMP/BFCache復元は未検証。Human受入と公開判断を代替しない。\n- [最終Review](../../manual-play-ads-r1/FINAL_REVIEW.md) / [候補manifest](../../manual-play-ads-r1/CANDIDATE_MANIFEST.json) / [QA](../../manual-play-ads-r1/QA_RESULTS.json) / [Fresh scoped Security結果](../../manual-play-ads-r1/SECURITY_RESULTS.json) / [最終差分](../../manual-play-ads-r1/FINAL_DIFF.json)。旧本文・dirty12・初期untracked72661pathsを保全。実model ID UNKNOWN_NOT_EXPOSED。\n\n**停止点：HUMAN_RELEASE_REVIEW_PENDING。外部Distributionの個別exact Human GO待ちも維持。** 以下は既存Production公開済みの保全記録。\n\n`;
 put(file,Buffer.concat([Buffer.from(prefix),old]));
}
console.log(JSON.stringify({status:'HUMAN_REVIEW_WRITTEN',candidateManifestSha256:qa.manifestSha256,currentOriginalBodyPreserved:true}));
