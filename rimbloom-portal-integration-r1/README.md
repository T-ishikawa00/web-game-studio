# RIMBLOOM Portal Integration & Release Candidate R1

最新Authority: HumanがPortal統合、Core Baseline保全、Release Candidateを正式受入し、ONE-SHOT PRODUCTION RELEASE R1を承認しました。以下のローカルReview時点のPENDING/未許可記録は履歴です。現在の承認・実機NOT TESTEDのRelease blocker免除・AdSense既存section除外coverageは `release/human-release-authority.json` が正本です。Production結果は `release/postflight.json` を参照してください。共有srcへの反映を伴わない、専用overlay buildと明示assets directoryによるreleaseです。

**LOCAL INTEGRATION COMPLETE — HUMAN REVIEW READY**

ローカル候補の実装・技術検証を完了。RIMBLOOMのPortal統合に対するHuman受入はPENDING。公開・deploy可能判定は未成立です。実機3項目と公開前のProvider確認を残しています。

## Reviewを開く

専用previewは `127.0.0.1:4447` のみで稼働します。

| 対象 | JA | EN |
|---|---|---|
| Home・6作品 | http://127.0.0.1:4447/ja/ | http://127.0.0.1:4447/en/ |
| RIMBLOOM詳細 | http://127.0.0.1:4447/ja/games/rimbloom/ | http://127.0.0.1:4447/en/games/rimbloom/ |
| RIMBLOOMプレイ | http://127.0.0.1:4447/ja/play/rimbloom/ | http://127.0.0.1:4447/en/play/rimbloom/ |
| 記録消去・Consent | http://127.0.0.1:4447/ja/settings/#rimbloom-save | http://127.0.0.1:4447/en/settings/#rimbloom-save |

1. Home/GamesのRIMBLOOMカード・カバー・JA/EN説明を確認。
2. 詳細からプレイし、壁反射・装甲・連鎖・Result・同じTide/新しいTideのRetryを確認。
3. ゲーム内JA/EN・音・FX・Pause、Portalへ戻る導線を確認。
4. 設定画面でRIMBLOOMだけの消去対象と確認dialogを確認。実際の記録消去は取り消せません。

![JA詳細ページ](review/ja-detail-1440-final.png)

![通常入力60秒の結果](review/en-normal-keyboard-full-run.png)

## Authorityと開始基準

| 項目 | 基準 |
|---|---|
| main HEAD / origin/main | `a7e7bf417f437ee23d6b2dcbb70bc914defef4e0` |
| Current Production version | `b5ff0484-ae7d-4df9-ab46-a8aa1eb1db06` |
| Current Production deployment | `d1e09100-b5ea-410c-9dac-89d4ee546689` |
| Accepted RIMBLOOM version | `1.0.0-r1` |
| Accepted aggregate SHA-256 | `b25d2a4ac01c3d073bff24a80d8d6bc80b33c8ad93d9c45055be892c3959c0e6` |
| Current candidate | `RIMBLOOM_PORTAL_INTEGRATION_RELEASE_CANDIDATE_R1` |

最新Human指定のhandoff `C:\projects\App 007\rimbloom-release-handoff-r1` と、同workspaceの `rimbloom-release-baseline-r1/HUMAN_ACCEPTANCE.json` / `RELEASE_BASELINE.json` を使用。App 007はREAD-ONLYで、Accepted Baselineを変更していません。元handoffの「このpackでは統合しない」という歴史的停止点は、今回の直接Human依頼によりローカル候補統合の範囲だけ更新されています。公開・外部操作の許可は含みません。

Human Accepted状態は `RIMBLOOM_FULL_GAME_R1_HUMAN_ACCEPTED` / `CORE_FUN_HUMAN_ACCEPTED` / `CHAIN_FEEL_HUMAN_ACCEPTED` / `FULL_GAME_PRODUCT_ACCEPTED`。今回のPortal統合・カバー・配置に対する追加Human受入は未成立です。

source9 / dist9 / baseline9はbyte-identical、51,448 bytes。canonical runtime inventoryのaggregate SHA-256が指定値と一致。source packのrecords.mjs対応表に記載漏れがあるため、実在ファイルとhashを確認して候補内のProvenanceに補足しました。元packは保持しています。

## 保全と分離

- shared `src`、既存registry、package、AdSense legal source、Git HEAD/indexを変更していません。stage / commit / push / deploy / provider操作を行っていません。
- 既存tracked変更 `docs/games/PRODUCTION_CURRENT.md` と `docs/qa/game005-release-r1/distribution-security.json` は開始時と同じbytesで保全し、候補に取り込んでいません。
- 実測開始untrackedは19,016 paths。提示18,960との差異、およびPRODUCTION_CURRENT内の別Production IDは開始状態として保全。現在の基準は今回直接指定されたSHA/version/deploymentと完了済みlegal release記録です。
- 開始時19,016 pathsはすべて存在を再確認。作業中に別領域 `marketing/hakorilo-x-cause-effect-2026-10-01-r1` のuntracked追加も観測しました。発生元は断定せず、RIMBLOOM候補へ混ぜず保全しています。総数の増加をRIMBLOOM blockerにはしていません。
- 候補sourceは本folder、公開用bytesは `release-artifacts/rimbloom-portal-integration-r1`、生成snapshotは専用 `.cache/rimbloom-portal-integration-r1` のみ。buildのcache再生成は厳密にこの所有cacheだけを対象にします。
- 本番の公開作品数は5のまま。ローカル候補だけ6作品です。新しいregistry項目はdraft / local-save / disabled in-game adsとして分離しています。

## 統合変更

独立したfull-page documentで既存play routeの構造に合わせました。`game007` / `rimbloom` / `/games/game007/1.0.0-r1/` を使用。原型のarenaサイズ、toolbar、renderer、physics、60秒、dash/recovery、chain、pacing、SEのbytes/値を保全しています。

Accepted runtime9のうち、audio/content/core/input/style/viewの6ファイルは完全同一。変更はindex.html・game.mjs・records.mjsの3ファイルです。

- asset baseをgame別directoryへ調整。routeの初期JA/ENを適用し、game内言語切替後もPortalリンクを追従。
- QA capture UI・record/qa endpoint参照を配布entryから除去。`?review=1`でもcapture UI・APIは有効化されません。
- 原型と同じRecords key / schema / スコア意味を維持。破損/不明version/過大rawは元keyに保全。Quota・読込拒否・write dropではページ内記録を続け、永続保存を成功表示しません。
- 設定にRIMBLOOM単独の確認付き消去を追加。既存save/Consentへ干渉せず、readbackで消去を確認。Back/BFcache・別documentのreset/site-data-clearで古い記録を再作成しないためのreload guardを追加。
- Home/Gamesを6作品へ。desktopは3列×2段、狭い幅のfeature controlsはwrap。既存5作品のdetail/play/legal pagesはbyte単位で維持。RIMBLOOMの発見導線はHome/Gamesに置き、既存detailの関連4作品を変更していません。
- カバーは提供されたcode-native listing候補を変換。portraitはsquareをcropせず上下padding。詳細sceneは提供されたAccepted実描画。Gameplay Visualの置換はありません。
- JA/ENのcanonical・hreflang・OG・sitemapを追加。Canvas requirements、record保存、creditsを実態に合わせ、RIMBLOOMへThree.js licenseを誤表示しません。

最終配布manifestは43 public routes / 123 files。既存103 filesのうち93同一、10変更、20追加。10変更はJA/EN Home・Games・Credits・Settingsの8ページと `_headers` / `sitemap.xml` のみ。全旧game assets、旧play10ページ、旧detail10ページ、legal4ページを維持しました。追加20と変更10はbuild内で固定allowlistとして照合します。

## QA結果と限界

| 確認 | 判定・範囲 |
|---|---|
| Unit regression | **94 PASS**：Accepted84＋Records6＋lifecycle4 |
| Astro/TypeScript | **PASS**：106 files、errors/warnings/hintsすべて0 |
| Dedicated build | **PASS**：43 routes / 123 files、payload allowlist、既存93 filesのhash一致 |
| Static server/route QA | **PASS**：43 routes、122 served files、95 local links、MIME/HEAD/301/404/private-path拒否/canonical/OG/CSP |
| JA/EN play responsive | **PASS**：1440×900 / 390×844 / 360×640 / 320×568 / 844×390。viewport emulationであり実機判定ではありません |
| Home responsive | **PASS**：1440 / 320 / 350 / 360 / 375 / 390px。6 cards・6 feature controls、document/control overflowなし |
| Detail responsive | **PASS**：JA/EN 1440 / 390 / 320px。image読込、要件/保存説明、4関連作品、リンク |
| Normal mouse | **PASS**：通常aim/releaseで425点・3chain。game state injectionなし |
| Normal keyboard full run | **PASS**：60秒完走、18,325点・15chain、通常arrow/Space、Low FX。Result・readback・reload・Retryを確認 |
| 保存・消去 | **PASS**：破損rawがResult後も不変、Quota時の正直な表示、取消、単独消去、他5ゲームprimary＋Island secondary key/Consent保全、Back後の旧記録復活なし、remove no-opの失敗表示 |
| 音・Pause・言語 | **PASS範囲**：mute/FX/JAEN UI、native Escape/resume、synthetic blur停止、AudioContext不在でもplay/result継続。音色・聴感の追加Human受入は未実施 |
| Pointer cancel/queued input | Accepted input bytes同一・84 regressionとhandoff Touch記録を再利用。今回のIABはCDP touch入力を提供せず、新規Touch実機試験は未実施 |
| Background hidden | 既存handler・unit evidenceを再利用。IAB別tabがdocument.hiddenを変えないため、実際のtab/background停止は今回NOT TESTED |
| 既存5作品回帰 | JA/EN10ページをfresh bootしcanvas/menuを観測。全runtime/play bytes同一性と採用済みQAを再利用。全編再プレイは未実施 |
| Consent | ローカルSettingsで許可・reload・撤回のchoice保存を確認。RIMBLOOM playへConsent panel/beaconは追加していません |
| External network | preview CSPでexternal scripts/connectを遮断。観測windowに共有AdSense loaderの要求試行とcsp loadingFailedあり。実provider通信・広告動作の検証は未実施。event bufferは一部truncatedで全時間帯のnetwork traceではありません |

既存IslandのJA play起動ではENゲームUIを観測しました。該当released page/runtimeはbyte-identicalで保全し、今回の範囲外として記録します。既存Three.jsのPCFSoftShadowMap移行warnも観測。新RIMBLOOMのuncaught exceptionは観測windowで0です。

## Security

`gitleaks 8.30.1` と現行scanner/hook/configを維持。秘密候補はfile / type / actionだけを記録し、例外の拡張、provider検証、rotation、削除、履歴操作を行っていません。

| 対象 | Raw結果 | Delta / 判定 |
|---|---|---|
| 全project・ignored含む、最終fresh scan | **FAIL24** | 既知22＋exact Human-disposed inactive local Wrangler2。開始receiptとfile/typeの重複数が完全一致。新規finding0 |
| Integration Candidate全folder | **PASS / 0** | 空ignoreでscan、QA/provenance/sourceを含む |
| 公開配布artifact | **PASS / 0** | 秘密candidate0、forbidden file0、QA/input/manifests/keys/logsを公開payloadから除外 |
| 新規exposure | **0 observed** | Git/外部upload/deploy/provider/LAN操作なし。ローカル配布面とallowlistを検査。live Productionを再接続して証明したものではありません |
| Full index / local history | 今回再実行なし | stage/commit/push未依頼・未実行。将来の個別許可後、該当checkpoint直前にfresh gateを実行する必要あり |

全projectのRaw FAILをPASSへ書き換えていません。新規finding/exposureが出る場合は対象checkpoint/releaseを停止しHuman disposition待ちです。

## 公開前に残るGate

1. **physical smartphone / iOS Safari / low-performance device：NOT TESTED、Release blocker。** Source authorityのRELEASE_QA要件を維持。指の遮蔽・capture/cancel・browser chrome/safe-area・60秒密集・長時間・audio/storage失敗と復帰を実機で確認する必要があります。
2. **Human Portal Integration Acceptance：PENDING。** listing候補、JA/EN導線、Portal上の見え方・実プレイをHumanが受け入れること。
3. **AdSense play URL exclusion / provider / legal公開判定：PENDING。** 現行の承認済みsite-wide AdSense head loaderは43 public routesに同じ契約で維持。RIMBLOOMのin-game SDK/slot/formatはdisabled。新 `/ja/play/rimbloom/` / `/en/play/rimbloom/` を含むprovider側除外の確認が公開前に必要です。providerやlegal releaseを今回再編集していません。
4. **Git stage / commit / push、deploy、公開：NOT AUTHORIZED。** ローカル候補完成や技術PASSはその許可・Human受入を代替しません。

## 再現

WGS rootから実行します。既存local dependenciesを使用し、App 007への書込みや元workspaceへの依存はありません。shared sourceとreleased legal artifactのhashを検証した専用snapshotでbuildします。共有入力が変わった場合は黙って採用せず停止します。

```powershell
cd "C:\projects\Web Game Studio"
node rimbloom-portal-integration-r1/build.mjs
node node_modules/astro/bin/astro.mjs check --config rimbloom-portal-integration-r1/astro.config.mjs --tsconfig rimbloom-portal-integration-r1/tsconfig.qa.json
node --test rimbloom-portal-integration-r1/inputs/accepted/tests/*.test.mjs rimbloom-portal-integration-r1/tests/*.test.mjs
node rimbloom-portal-integration-r1/server.mjs
```

既に4447が稼働している場合はserverを重複起動しません。別terminalから以下を実行できます。

```powershell
node rimbloom-portal-integration-r1/verify.mjs
node rimbloom-portal-integration-r1/security.mjs
```

終了はこの候補serverを起動したterminalのCtrl+C。既存の他processを停止しません。Cloudflare edge/HTTPS/実providerはこのstatic loopback previewの確認範囲外です。

## Evidence

- `inputs/PROVENANCE.json`：curated source/hash/path対応、records mapping補足。
- `inputs/HUMAN_ACCEPTANCE.json` / `RELEASE_BASELINE.json` / `RUNTIME_SHA256.tsv`：元Accepted Authorityを保持。
- `inputs/handoff-authority/`：START_HERE、統合/build/save/audio/accessibility/release QA、QA_HANDOFFのbyte-identical copy。元pack当時の停止文も保持。
- `internal/distribution.json`：全public file bytes/hash、固定10変更/20追加、runtime差分、Production base。
- `internal/static-qa.json` / `browser-qa.json` / `qa-summary.json`：今回QAの証拠・再利用・未実施・限界。
- `internal/security-scoped.json` / `security-full-final.json`：sanitized Security raw/delta。
- `internal/preservation-final.json`：開始状態の保全と別領域追加の分離。
- `internal/build.log` / `typecheck.log` / `tests.log`：今回の成功診断。
- `review/`：Portal・play・保存失敗・リセット・通常60秒のスクリーンショット。

Primaryは統合・最終QA・Security/Git境界を担当。2 subagentsは独立read-only handoff audit / Portal mapping・reviewを実施し、書込み・外部権限は委任していません。subagentsへの指定modelは `gpt-5.6-sol`。このsessionの実runtime model IDはツールに露出しておらず、**UNKNOWN**として報告します。

停止点：**HUMAN_PORTAL_INTEGRATION_REVIEW_PENDING / DEVICE_RELEASE_QA_PENDING / PUBLIC_RELEASE_NOT_AUTHORIZED**。
