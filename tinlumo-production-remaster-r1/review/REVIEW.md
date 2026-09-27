<!-- current-security-update:start -->
**最新状態：今回RCのSecurity Release Gateは解除可能。Human Production Release Gate待ち。**

新規5件はHuman承認済み。05は暗号化ローカル整合性メタデータ／限定保持だけの承認、平文・復旧可能性UNKNOWN。raw FAIL22維持、追加新規0、fresh index/history/distribution PASS、profileはscoped manifest対象外。[最新Security報告](SECURITY_GATE_UPDATE.md)。以下の本文にある未判定STOPは、承認前のRC検証履歴として保持しています。公開操作は未許可です。
<!-- current-security-update:end -->

# Tinlumo Visual Remaster — Production RC R1

**LOCAL RC PREPARED / SECURITY RELEASE GATE STOPPED**

Portal North StarとHuman Accepted4作品＋現行Islandを統合しました。新規Security候補5件はHuman指示により未判定のままです。Release許可、stage、commit、push、deploy、本番更新はありません。

## Review入口

- [統合Review](http://127.0.0.1:4412/review/)
- [JA Home](http://127.0.0.1:4412/ja/) / [EN Home](http://127.0.0.1:4412/en/)
- artifact: `release-artifacts/tinlumo-visual-remaster-r1/` — 101files、39indexable routes＋404、約17.73MiB（全5ゲーム・音・画像の総量、初期転送量ではない）
- build: `node scripts/visual-remaster-build.mjs`
- local server: `node tinlumo-production-remaster-r1/scripts/server.mjs`（127.0.0.1:4412のみ）

## 統合内容

Homeは左右の見出し／Featured、5作品横並び、作品固有Cover A、手動Featured切替、余白と紫系の操作色を持つNorth Star構成です。Mobileは縦Heroと絵・説明の横組みカードへ再構成。5作品Detail、related4作品、Play、設定、法務、Contact、404をJA/ENで接続しました。追加のアカウント、検索、CMS、ランキング、cloud save、決済はありません。

| 作品 | Accepted方向 | 配信version | 進行 | 保存identity |
|---|---|---|---|---|
| Hakorilo | U1 Parcel Grove | parcel-grove-r1 | 18 stages | wgs:save:tiny-delivery |
| Lightwork Garden | L1 Luminous Conservatory | conservatory-r1 | 18 stages | wgs:save:light-garden |
| Two Ways Home | T1 Parallel Little Towns | little-towns-r1 | 21 stages | wgs:save:two-ways-home |
| PROJECT MAGNET | M2 Bright Industrial Frontier | frontier-r1 | 18 sectors +3 bosses | tinlumo.game004.magnet.full.v1 |
| An Island Connected | Current Accepted Web v1 | web-v1-r1 | 3 districts | tinlumo:game005:web:v1 |

3パズルを旧親iframe保存Shellに差し込むと二重保存／ready handshake不一致になるため、新Playはstandalone documentとし、各ゲームだけが保存を所有します。locale、戻り先、音源URL、review capture除去だけを明示compile adapterで変更。ゲームルール、問題数、解放条件、音の選択は保全しています。Magnetのpublic-copyによる戻り先上書きも修正済み。Islandは旧IslandPlay componentと現行payloadを再利用しています。

LightworkはMobile titleの一行化がoverflowを起こしたため、配信wrapperだけで2行へ戻し、320pxの最小幅問題を解消。初期の空文言をHTML側で埋め、読込時の上下移動も削減しました。原本は変更していません。

## Design System / Cover / Brand

- Ink #201955、muted #5a587c、primary #4c36cf、coral #c84240、paper #fbfdff、line #dedff0。白い面、控えめな影、24px前後の角丸、pill CTA。
- システム書体。見出しは太さと密度、本文はline-height1.65。44px以上の主操作域、3px visible focus、hover浮上2px、pressed1px、disabled状態、reduced-motion時transition0。自動カルーセルなし。
- Desktop5列、Tablet3列、Mobile1列横組み。950px／680px／350px周辺の再構成。細かなtokenはsrc/production/site.css。
- 4 Remasterはネイティブportrait Cover Aの全体を保持。小さな焼込み文字を操作情報にせず、HTMLの作品名／説明／Playを併記。Islandは既存Accepted Cover Aを使用しportrait表示はCSS crop。B/Cへの変更なし。
- 新logo／mascotの独立原本は見つからないため、既存Accepted Nアイコンとwordmarkを使用。参考画像そっくりの新mascotは生成していません。この差は最終Brand Reviewで確認してください。
- 全cover/sceneの元ファイル・SHA256・WebP変換条件はasset-provenance.json。Concept／promptは既存Reviewに残し、配布物へ含めていません。

## QA / Save / Consent

414 tests（root215、Remaster88、Island42、統合61、Consent8）通過。新sourceのAstro checkは0error/0warning。39×8＝312画面を検査し、Lightwork修正後の16再検査を適用した最終horizontal overflowは0。実機試験ではありません。

Hakorilo18／Lightwork18／Two Ways21は新しい正式Playで通常UI入力による全編クリアと再読込を実施。MagnetはA1クリア、A2被弾失敗、Retry／Hub／locale／reloadを再実行し、全18＋3bossは変更なし10modulesとAccepted全編通常入力を照合して再利用。Islandはdock／shipping／workshop／marketの通常操作・reload・localeを再実行し、全3地区は現行payload一致を条件に2026-09-24のRoute B通常76クリック・445.74秒証拠を再利用しました。**新RCでMagnet全3作戦とIsland全3地区をもう一度完走したという報告ではありません。**

既存save schema／namespaceを変更していません。全57パズルのold-format envelope、Magnet ABC記録／設定、Island version1 envelope、破損原文の保持を検査。実利用者のsaveは収集していません。Hakoriloの明示進行消去をサイト設定へ接続し、ブラウザーで確認dialogとCancel、単体でexact-key消去・他作品／音設定保持を検査。3パズルには元々ない多タブ競合防止を追加したとは主張しません。Islandのwrite-readback保証も追加していません。

Consent CのJSは現行と同一バイト。初期bannerなし、既定OFF、設定を開いて明示選択、拒否でもゲーム利用可。3パズルPlayの既存適用範囲を維持し、Magnet／Island Playへの計測拡大なし。ローカルで許可→reload保持→拒否→閉じるを検証、外部script挿入0。実tinlumo.comへの送信／Cloudflare側設定確認は今回行っていません。Google Ads／CMP／H5や広告SDK追加なし。

Privacy／Terms／Contact／video policyは既存PublicOperationsを再利用、実データフロー変更なし。Creditsだけ作品のprocedural3D、合成SFX/BGM、Three.js／Astro MITを反映しました。

## 性能

| Page | Width | Load ms | LCP ms | CLS | Resource KiB |
|---|---:|---:|---:|---:|---:|
| Home | 1440 | 17.9 | 32.0 | 0.0000 | 342 |
| Home | 375 | 18.3 | 20.0 | 0.0000 | 243 |
| tiny-delivery | 1440 | 314.3 | 36.0 | 0.0098 | 731 |
| light-garden | 1440 | 311.9 | 32.0 | 0.0037 | 736 |
| two-ways-home | 1440 | 616.1 | 624.0 | 0.0003 | 713 |
| project-magnet | 1440 | 186.2 | 376.0 | 0.0001 | 730 |
| island-connections | 1440 | 144.5 | 216.0 | 0.0002 | 667 |
| tiny-delivery | 375 | 123.9 | 28.0 | 0.0067 | 731 |
| light-garden | 375 | 110.0 | 40.0 | 0.0651 | 736 |
| two-ways-home | 375 | 593.4 | 608.0 | 0.0194 | 713 |
| project-magnet | 375 | 165.9 | 332.0 | 0.0000 | 730 |
| island-connections | 375 | 154.6 | 20.0 | 0.0010 | 667 |

Windows Chromium、loopback HTTP、同一origin iframe、3秒の初期idle sample、throttlingなし。転送量はHTMLを除くresource合計で、圧縮実運用／冷たい端末／初見回線を再現しません。Home JSは7,088 bytes（decoded）、Hero画像約70KB。静的CSSをHTMLに同梱、他Featuredとcoverはlazy、解像度別WebP、settings専用JSは設定画面だけで読込みます。

ゲームのdraw calls／active frame interval／idle redrawは、変更していないrender sourceを照合したWave1 PERFORMANCE.mdを参照。Lightwork460–617calls／idle停止、Two Ways402–596calls／merged geometry、Magnet230–244calls／pause idle停止等は**以前の測定値**です。今回のrAF callback cadenceを実描画FPSと誤記しません。Heapは他contextを含む概算。実機のGPU、発熱、電池、メモリ圧、SafariはNOT TESTED。

## Accessibility Review

Portal主要文字色のcontrastは4.87〜15.47:1（5組）。詳細accessibility.json。semantic header/nav/main、skip link、3px focus、FeaturedのArrowRight／End、設定dialogのCancel、44px主操作、Reduced Motion時transition0を確認。重要なゲーム状態は色だけでなく形・ラベル・テキストを併用。8幅で可読性とoverflowを確認しました。正式なWCAG適合宣言ではありません。Screen reader実機、200%文字拡大の専用試験、実指touch、iPhone／Android／SafariはNOT TESTED。ゲームの既存キーボード可否とPortalのkeyboardを混同しません。

## Security — RELEASE STOP

今回full project ignored-inclusive raw FAIL22：既知17件のidentityを再確認＋新規5件。新規対象は `marketing/m01-post-ready-r1-2026-09-26/internal/browser-profile/Default/Secure Preferences`、type `generic-api-key`。値・断片を表示／配布せず、Humanが「未判定のままGate停止で仕上げる」と指定しました。

full current index PASS、今回reachable history scan PASS、distribution PASS／0件。これは過去historical FAIL11を消すものではありません。S04/S05 UNKNOWN／UNRESOLVEDと旧historical判定は維持。TLS・既知profile・今回profileのindex/history/reflog不在、配布物からのprivate path不在を確認。scanner/hook/allowlist変更なし。過去checkpoint-only risk acceptanceの再利用なし。詳細security.json。

## Release / Rollback / Git

Rollbackは現在の5作品版 `release-artifacts/game005-web-v1/`（84files保全）、commit57b1daab800a5ad85fef705de05e96657a0b7f93、version143bd3d1-d8c0-45ad-a31c-5502ed656936、deployment7b18c79f-58dd-44cb-8e1e-38669b1aac11。Cloud値は2026-09-24のlocal POSTFLIGHT／cloud-postflight報告に基づき、今回はlive照会していません。旧4作品版をrollback先にしません。実rollbackなし。

将来の手順は、**新候補Human dispositionと残るSecurity判断→最終全project/index/history/distribution検査→Humanが対象hash/pathを指定してstage/commit/push/deployを明示承認→scoped stage→checkpoint commit→private origin/main push→新artifactを明示してProduction deploy→5作品/save/Consent smoke→Human production smoke**。重大問題では別途承認された現行versionへrollback。今回はどれも実行していません。

scoped-git-manifest.jsonは必要pathだけ。git add .は禁止。PRODUCTION_CURRENT.mdの既存dirty差分を一括stageせず、今回blockだけが対象。既存QA差分、marketing/browser profiles、他工程、cache、before snapshot、temp、tool logsはstage対象から除外します。

## Human判断に残す点

1. 新規Security5件が未判定のためRelease Gateは停止。現状を無条件のSECURITY_RELEASE_GATE_READYとはしません。
2. 新Portal＋Cover Aの実画面、既存NmarkとのBrand整合、Islandのportrait cropをReview。新logo／mascot原本が必要なら別工程で正式素材を受領。
3. Desktop/viewport emulation QAと実機／聴感／Human製品受入は別判定。過去のAccepted判断は固定し、この統合RCの公開許可には転用しません。

最新gates.jsonを正本とし、Human Production Release GateはSecurity停止解消後もPENDING。
