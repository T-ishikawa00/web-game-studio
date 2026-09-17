# Tinlumo — domain購入直前 / Cloudflare Release Plan R1

2026-09-17 JST。Phase1 checkpoint完了後の**ローカル追補、未commit/未push**。Phase1の権限は消費済み。購入・予約・cart追加・account変更・Cloudflare resource作成・deploy・DNS・Analytics・Email Routing・契約・外部連絡は未実施。

## 1. Checkpoint receipt

- Commit **14cb803243eceba9138f35dd4d6b7c46bd46c490**、親44ce3ca2e079aa64733be7da3435726e400a54c6。1 commit / 通常fast-forward push1回。
- HEAD / origin/main / actual remote mainは同SHA一致、Private `T-ishikawa00/web-game-studio`。開始時も3者一致、予期しないremote進行なし。追確認2026-09-17 05:19 JST。
- [checkpoint QA](../qa/soft-launch-rc-r1/checkpoint-r1/REPORT.md)、[scope162件](../qa/soft-launch-rc-r1/checkpoint-r1/commit-scope.json)。既存untracked13件は除外・不変。全project raw FAIL2の限定SHA/TLS判定維持、full index / pre-commit hook / commit後history scan PASS。旧Baseline・全57問・save ID/schema・Art/Motion/Audioは保全。
- Human RC Acceptance PASS、名称Human FREEZE、外部初見DEFERRED / NOT TESTED。TIRMO unresolved / WIPO UNKNOWNは消していない。主担当実モデル `gpt-6-astra`。

## 2. Domain read-only結果

Cloudflare公式公開検索UIを2026-09-17 **05:16–05:17 JST（2026-09-16 20:16–20:17 UTC）**に照会。購入ボタンを押さず、個別のBuy now表示と初年/更新価格を読取。

| Domain | 用途 | Cloudflare表示上の可否 | Premium | 初年度 | 更新/年 | 税等 |
|---|---|---|---|---|---|---|
| [tinlumo.com](https://www.cloudflare.com/domains/search?q=tinlumo.com) | 第一候補 | available表示（Buy now）。購入前の最終可否は未確認 | 表示なし、明示tier未確認 | US$10.46 | US$10.46 | 税込/税抜の画面明示なし。税額・最終合計未確認 |
| [playtinlumo.com](https://www.cloudflare.com/domains/search?q=playtinlumo.com) | 第一候補取得不能時のみ | 同上 | 同上 | US$10.46 | US$10.46 | 同上 |
| [tinlumostudio.com](https://www.cloudflare.com/domains/search?q=tinlumostudio.com) | 同上 | 同上 | 同上 | US$10.46 | US$10.46 | 同上 |

Registrarは3件ともCloudflare。fallbackを買い足す提案ではなく、ブランドはTinlumoを維持。

Verisign .com RDAPは3件ともHTTP404 / application/rdap+json / 空body。**登録レコード未取得まで**であり、これだけではavailabilityを確定しない。

| Registry一次照会 | 確認時刻UTC |
|---|---|
| [tinlumo.com](https://rdap.verisign.com/com/v1/domain/tinlumo.com) | 2026-09-16 20:16:24.854 |
| [playtinlumo.com](https://rdap.verisign.com/com/v1/domain/playtinlumo.com) | 2026-09-16 20:16:25.094 |
| [tinlumostudio.com](https://rdap.verisign.com/com/v1/domain/tinlumostudio.com) | 2026-09-16 20:16:25.315 |

ICANN Lookup個票は取得不能。認証済みRegistrarの確定availability/tier照会は未実施。今回の価格は見積表示で、予約・所有・将来更新額の固定保証ではない。

## 3. 次に許可する具体的外部操作・費用

**次の最小承認対象は、Cloudflare Registrarでtinlumo.comを1年購入すること。** 購入直前に可否・通常/Premium・税込総額・更新価格・auto-renewを再確認し、Humanの税込上限を超えたら停止。fallbackへの自動購入はしない。登録者の正確な氏名・住所・電話・確認済みmail・支払情報と規約承認はHumanが管理し、Gitやこの資料へ記載しない。

Cloudflare nameserverが必須、登録者mail確認が必要。Dashboard登録のauto-renew既定ONは購入時に明示確認する。登録/更新料金は返金保証なし。後で未公開のまま保持/auto-renew停止はできても、購入費をrollbackで戻せるとはしない。[登録条件](https://developers.cloudflare.com/registrar/get-started/register-domain/) / [更新](https://developers.cloudflare.com/registrar/account-options/renew-domains/) / [登録非返金](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/create/)

| 操作・サービス | 費用目安と境界 |
|---|---|
| Domain1件1年 | 表示US$10.46、更新現表示US$10.46/年。税・為替・カード手数料別途確認。税込上限は未承認 |
| Workers Static Assets Free | 静的request無料無制限、asset保存追加費用なし。Free 20,000 files、各25MiB。現RC48 files、最大12,288,044 Bで枠内 |
| Web Analytics A | 無料。custom event collectorを作らない |
| Email Routing inbound転送 | 無料。既存mailbox側の費用は契約に依存。独自domainからの返信機能とは別 |
| 有料化する操作 | Workers Paid（最低US$5/月）への切替、Email Sendingの任意宛先送信、paid add-on/別provider契約。すべて別Human承認、今回は不要 |

税は請求先住所により処理されるため「US$10.46税込」としない。[税](https://developers.cloudflare.com/billing/understand/sales-tax/) / [静的料金](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) / [Workers料金](https://developers.cloudflare.com/workers/platform/pricing/) / [Email料金](https://developers.cloudflare.com/email-service/platform/pricing/)。課金通知は強制上限ではない。Paidへ移行しない方針と、異常時の配信停止担当を分けて記録する。

## 4. 配信方式・設定・build

方式は**Workers Static Assets / assets-only / Free / ローカル承認artifact直接upload**に一本化。Git自動deploy、Worker script、SSR、DB、R2、KV、常駐serverなし。

- project/Worker名：`tinlumo-static`（ローカル設定名、resource未作成）。config：[wrangler.json](../../config/release-production/wrangler.json)。
- build実行root：`C:\projects\Web Game Studio`。直接upload方式なのでCloudflare Buildsのroot/build設定は作らない。
- static asset root：`.cache/tinlumo-approved-dist`。config所在基準の`../../.cache/tinlumo-approved-dist`。repo全体・RC Review・`.cache/rc-public`をuploadしない。
- `workers_dev:false`、`preview_urls:false`、observability disabled。routes/domain未設定。`auto-trailing-slash`と`404-page`でSSGに合わせる。[公式SSG](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
- Wranglerはnpm公式metadataで **4.132.0** を2026-09-17 05:19:46 JST確認。[package metadata](https://registry.npmjs.org/wrangler/latest)。今回は未install/未実行。以下は将来の版固定手順。

本番buildは2段階。**現時点では2段目がBLOCKEDで、公開用folderを作らない**。先に運営/市場/権利/法務の確定内容で日英copyを完成し、sourceの草案状態とsiteの承認欄を根拠付きで更新する。flagだけの書換えではdraft source検査で停止。ローカル包装は公開許可に先行してレビュー可能にし、`release`と公開後smokeだけを包装gateから除外する。外部deploy gateでは公開許可が引き続き必須。Analytics設定/有効化の許可は別途必要。

**次回build前の保全手順**：現在の採用RC48 filesをmanifest照合して別のrepo内`.cache/rc-checkpoint-14cb803`へ保全し、既存なら上書きしない。確定copyを扱う次回工程では`scripts/rc-evidence.mjs`の出力先を新規`docs/qa/soft-launch-rc-r1/production-preflight-r1`へ局所更新し、checkpoint-r1の証拠を再生成しない。その後、以下を実行する。`build:rc`自体は`.cache/rc-dist`を更新するため、包装script単体の「RCを変更しない」と混同しない。この保全/出力先変更は今回未実行。

```powershell
npm run build:rc
node scripts/release-prepare.mjs --prepare
```

[release-prepare](../../scripts/release-prepare.mjs)は配布manifestの全file byte照合後、別folderへ50 filesの本番包装を作る。RCは書換えない。domain/contact未確定、draft、未承認Analytics等では停止。出力済みfolderは上書きせず、正常版を別途保全してから次版を作る。副作用はrepo内の出力だけでネットワーク呼出しなし。

SEO切替：日英26ページ＋言語入口の27 URLだけ自己canonical・相互ja/en・x-default・OG URL・sitemap、robots Allowに揃える。iframe内部/404はnoindexを維持しsitemap除外。既存RCは全noindex維持。noindex/robotsはアクセス制御ではなく、公開routeを作らないことが未公開境界。[Google公式](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## 5. Domain接続・Analytics・メールの順序（すべて未実行）

1. **Domainだけ購入**：上記の個別承認・税込上限・連絡先確認。取得後も公開routeを作らない。
2. **運営データ条件確定**：実運営者公開表記・住所表示方針、対象国、providerアクセス処理/保持・同意、メール運用、配布権利/動画/法務、実機証拠範囲を確定。契約/DPA等の判断を名称FREEZEで代用しない。
3. **Email Routing**：別許可後、Human管理の受信箱1件を確認mailでverify。domainのMX/TXT変更前値を記録し、support一件だけ転送、catch-all/Email Worker/自動返信なし。受信・迷惑mail・返信・削除試験を行い、開通確認後にのみpublicContactへ反映。[公式設定](https://developers.cloudflare.com/email-service/get-started/route-emails/)
4. **返信元を先に決める**：無料転送先からの通常返信は、そのmailboxのaddressがFromとして見える。support@から返信するなら既存providerの対応可否/料金または別送信契約をHuman確認する。Cloudflare Email Sendingの任意宛先はWorkers Paidが必要で初回無料構成へ暗黙追加しない。[返信制約](https://developers.cloudflare.com/email-service/reference/postmaster/)
5. **Web Analytics**：有効化許可後にhostnameを追加。proxied hostでは自動挿入が初期有効になり得るので、Manage Siteで **Enable with JS Snippet installation** を選び手動に統一。二重挿入なし。公開beacon ID（秘密値ではない）を[measurement](../../config/release-production/measurement.json)へ記録、enabled/activationApproval、site.analyticsProviderと日英Privacyを実状態に揃える。最初の登録から外部設定変更として扱い、今回行わない。[導入](https://developers.cloudflare.com/web-analytics/get-started/)
6. **local本番包装・検査**：上記buildコマンド後、配布secret scan、50-file allowlist/内部fixture除外、27 SEO URL、JA/EN全3導線、既存保存・音・低速/失敗、Contactの実在確認。実IDを含むartifactのlocal browser QAは、非loopback requestを先に全遮断し、Cloudflare scriptをstub、beacon送信をabortする専用contextで実施。通常browserで開くだけでは外部送信が起き得る。実送信確認は別許可後の公開smokeに限定する。beaconは外側ページに1個、iframeには入れない。CSPを将来設ける場合はscript-src `https://static.cloudflareinsights.com` / connect-src `https://cloudflareinsights.com`を局所追加。現雛形はCSP未設定でCSP検証済みとはしない。[FAQ](https://developers.cloudflare.com/web-analytics/faq/)
7. **local dry-run**：必要な版固定Wranglerをrepo内だけへ導入し、`WRANGLER_SEND_METRICS=false`を設定。`npx --no-install wrangler deploy --config config/release-production/wrangler.json --dry-run --outdir .tmp/rc/wrangler-dry-run`。schema/packaging確認でありCDN確認ではない。現在はWrangler未導入・production gate未解消のため未実行。
8. **明示許可後だけupload**：本番manifest・Security・外部操作対象をHuman確認後、版固定CLIで`npx --no-install wrangler deploy --config config/release-production/wrangler.json`。config内にroutesなしのままuploadし、workers.dev/previewが閉じていることを確認。認証情報をコマンド引数/Gitに書かない。
9. **公開境界：Custom Domain追加**：active Cloudflare zoneでWorkerのSettings → Domains & Routes → Add → Custom Domainに取得済み正規hostを指定。追加操作がDNS record/証明書を作成し、配信を公開する。直前DNSを記録。apexを正規originに推奨、wwwは必要時だけ別redirect、HTTP→HTTPSを確認。[Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

Web Analyticsはdashboard → Web Analytics → 対象siteでpage views/visits/URL別性能/Core Web Vitalsを見る。週次でja/enと作品Playを確認する。Aで初操作・進行・正確なゲーム開始率・個人単位の再訪率は測れない。Visitsは固有人数と同一視しない。独自event、永続ID/fingerprint、dashboard追加開発なし。Providerの閲覧期間と生処理の保持は同一ではなく、アクセス/セキュリティ処理を0日と捏造しない。

## 6. Smoke / rollback

公開直後：正規HTTPS/証明書、HTTP redirect、ja/en27 URLと404、canonical/hreflang/sitemap、MIME/_headers、内部fixture/秘密/比較URLの404、通常Home→詳細→3作品、同origin作品別保存→reload→言語切替、mute/音/pause復帰、BGM cold/warm/失敗、Contact受信/返信、Analyticsが意図した1回だけ送信されることを確認。iPhone/Android・実回線は実際の環境だけを記録。過去desktop simulationを代用しない。

Cloudflare version ID、artifact manifest、直前正常版、DNS/route変更前値を保存。不合格なら告知を止め、Dashboard Deployments → 正常version → Rollback、または明示許可の範囲で`npx --no-install wrangler rollback <VERSION_ID> --config config/release-production/wrangler.json`。直近100 versionsの制約。初回は旧productionなしのため、公開時承認に「失敗時にCustom Domain/routeを解除し非公開へ戻す」を含める。[公式rollback](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)

Worker rollbackはDNS、Email Routing、Analyticsのprovider設定、browser localStorageを戻さない。Analytics停止はsnippet削除＋自動挿入停止、メール停止はroute設定、契約停止はbillingの別操作。DNS削除だけで全公開経路や課金が止まると考えない。save key/schema/originを維持し、保存データを削除しない。

## 7. 今回のローカル検証・残blocker

- 本番包装の純粋HTML変換（日英絶対SEO/二重beacon防止/iframe保持）、未確定状態で`--prepare`を明示してもfolderを作らない検査、local包装と公開許可の独立gate：`node --test tests/release-prepare.mjs` **3 PASS**。実domain・本番copyを使った成功包装、Wrangler dry-run、Cloudflare CDN、メール、Analytics、本番smokeは **NOT TESTED**。
- 本追補、production設定、包装script/検査はPhase1後のローカル準備。追加stage/commit/pushなし。RC checkpointのtracked製品source不変。
- **購入直前の残件**：税込購入上限、最終available/tier/価格、登録者/account/更新管理のHuman確認と購入許可。
- **公開前の残件**：公開個人運営者/住所方針、受信箱と返信元・保持削除、対象国/アクセス処理/同意、権利/法務、実機証拠範囲、確定copyでのproduction build＋Security/配布QA、外部設定と公開許可。本番smokeはその後。TIRMO/WIPOはHuman FREEZEに伴う残余不確実性として保持。

購入・設定・公開等は実行せず、Human判断待ちで停止する。
