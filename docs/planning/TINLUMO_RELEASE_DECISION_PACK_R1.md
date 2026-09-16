# Tinlumo Release Readiness Final R1 — Release Decision Pack

2026-09-17 JST。**Human決定反映済みRC checkpoint／公開BLOCKED**。「Final」は工程名。最新RCのHuman候補PASSを維持し、公開許可・商標確認・実機試験と区別する。外部初見は **DEFERRED / NOT TESTED**、必須Gateへ戻さない。

主担当・統合：`gpt-6-astra`。独立した名称/domain・配信条件・権利監査はread-onlyで並行実施。名称・権利担当も同モデル、配信担当は親設定継承（独立したruntime ID照会なし）。外部実行は委任せず、公式情報の検索読取のみ。

## 1. 最新Human決定 — Soft Launch RC checkpoint

2026-09-17 Human Decisions — FIXを正本へ反映。**Human RC Acceptance PASS**。外部初見は **DEFERRED / NOT TESTED**。実機・全57問Human全編の未実施項目をPASSへ変更しない。公開在庫0、deploy未承認。

| 項目 | 決定／実状態 |
|---|---|
| 名前 | Tinlumo / ティンルモ / Tinlumo Studio、Hakorilo / ハコリロをSoft Launch用にHuman FREEZE。Lightwork Garden / ひかりの仕掛け庭、Two Ways Home / ふたりの帰り道を維持。新候補探索終了 |
| 運営・提供 | 個人運営。Tinlumo Studioはブランドであり法人名ではない。無料3作品、日英、課金・実広告・account・Cloud Saveなし |
| 保存・年齢 | 作品別localStorage自動保存。一般向け、DOB/年齢入力・年齢Gateなし、子ども向けとして積極訴求しない。対象国の最終指定は未決定 |
| 計測 | 初回はCloudflare Web Analyticsのみを選択。game custom eventsは対象外。persistent user ID / fingerprintなし。現在の外部計測はdisabled |
| 配信・費用 | Workers Static Assets assets-only Free第一候補。Paid移行は別Human承認 |
| 問い合わせ | domain取得後の第一候補support@tinlumo.com、Email Routingで既存受信箱へ転送。未取得・未開通なので公開Contactへ掲載しない。受信箱・返信元・保持は未確定 |
| Git権限 | 今回Phase1のRCを1 checkpoint commit、Private origin/mainへ通常fast-forward push1回のみ。成功後にdomain読取調査へ進む。追加commit/pushの恒常許可ではない |

## 2. 名称予備調査の確定記録・残余不確実性

2026-09-17の一次登録簿ピンポイント調査を反映。**日本・米国の確認範囲では重大blocker未確認。ただしTIRMO unresolved、WIPO UNKNOWN。法的安全保証ではない。Humanはこの条件でSoft Launch用名称をFREEZEした。** 名称選択を未決定へ戻さず、素材配布権利・法務・公開許可と分離する。

| 検索 | 取得結果 |
|---|---|
| J-PlatPat：商標検索用Tinlumo/Hakorilo/ティンルモ/ハコリロ（OR）、全区分 | 0件 |
| 称呼単純：ティンルモ/ハコリロ、全区分 | 0件 |
| 称呼類似：同2称呼 | 全区分5件、第41類0件、41K01/41Z99限定0件、11C01限定2件 |
| USPTO：TINLUMO/HAKORILO、live登録・出願、全区分 | 0件 |
| USPTO：TINLUMを含む表記、TIRMO、HAKORILを含む表記、HAKORIO、HAKOLILO、live | 0件 |
| WIPO GBD | アクセス制限で取得不能、完全一致/近似ともUNKNOWN |

- **ＴＩＲＭＯ：unresolved**。[登録7014427／出願2025-074116](https://www.j-platpat.inpit.go.jp/c1801/TR/JP-2025-074116/40/ja)、細野佑介、存続-登録-継続、称呼ティルモ/ターモ。指定商品全文を取得。第9類のスマートフォン関連品・電気通信機械器具・電子応用機械器具及びその部品等。第41類/オンラインゲーム提供の明示なし。ただし11C01上位商品には電子計算機用プログラムを含み、software無関係とはしない。ティンルモ/ティルモの称呼差と商品範囲の関係は法的類否未確定。
- **ＨＡＫＯＮＥ∞はこジ郎：weak hit（名称）、商品はゲーム関連**。[登録5691985／出願2014-021426](https://www.j-platpat.inpit.go.jp/c1801/TR/JP-2014-021426/40/ja)、神奈川県・箱根町・小田原市・真鶴町・湯河原町・南足柄市、存続-登録-継続。称呼ハコネハコジロー/ハコジロー。第9/39類の指定全文を取得。コンピュータソフトウェア、電子計算機用プログラム、家庭用テレビゲーム機用プログラムを明示。第39類は旅行・輸送等。第41類/オンラインゲーム提供の明示なし。称呼類似検索hitを類似確定とはしない。
- 残りChillmo（6544000、11/20/34類）、発酵理論スキンケア（6976513、3類）、HATTORI LAW（出願2026-088468、45類）はweak/unrelated。exact conflict/materially close conflictと確認できた候補なし。未登録周知表示・全法域の網羅保証ではない。
- 一次資料：[J-PlatPat](https://www.j-platpat.inpit.go.jp/t0100)、[USPTO](https://tmsearch.uspto.gov/search/search-results)、[WIPO](https://branddb.wipo.int/)、[JPO 2026分類表](https://www.jpo.go.jp/e/system/laws/rule/guideline/trademark/ruiji-kijun/document/ruiji_kijun13-2026/all.pdf)。

Domainはtinlumo.com第一候補。取得不能の場合だけplaytinlumo.com、tinlumostudio.com。ブランド名は変更しない。前回9/17 02:57 JSTのCloudflare表示は初年度/更新ともUSD10.46、税と最終tier未確認、RDAP404。これは現在の取得可否・購入額の確定ではない。**checkpoint成功後に読取再照会し、購入直前結果を別記する。購入・予約・cart追加なし。**

## 3. 配布権利・運営・データ

独立監査で、変更前配布48/48がsave-policy-r1 manifestとbyte一致。今回build後もゲーム・Art・音・cover・noticeを保全照合する。対象は[最新配布manifest](../qa/soft-launch-rc-r1/checkpoint-r1/distribution-manifest.json)に含むものだけ。

| 配布対象 | 来歴／最終照合 | 残る判断 |
|---|---|---|
| code / SVG・CSS Art / 57盤面 | repo内原本。採用3game bundleの凍結元との一致、RCの固定採用変換を再確認 | AI支援は来歴。権利帰属・類似表現・商用配布の法的保証ではない |
| SFX | craft-sound / light-craft-sound / twoways-craft-soundの作品別ローカル合成。外部録音・sample取込の証拠なし | 今回配布の権利判断はHumanに残す |
| Hakorilo BGM | music-score → music-rhythm → rhythm-samples。配布music.wavは採用B.wavとbyte一致、12,288,044 B | 採用・権利・動画利用条件を分離。圧縮/差替えなし |
| covers / mark | cover3点は採用版の実画面。最新markはsrc/rc/favicon.svgとLayout内の既存幾何図形 | 旧台帳W記載は過去。現在のN形状を勝手にTへ再設計しない |
| fonts | OS stack、font binary0・外部font request0 | 将来webfont追加時のみ別照合 |
| OSS | 4 bundle metafileのinputsはsrc/のみ、third-party client code0。配布licenses/astro.txtはinstalled LICENSEと一致。Astro/SvelteKit/Vite由来MIT noticeを含み日英Creditsからリンク | installed全依存を配布物と混同しない。今の出力で追加notice不足は未検出 |

[素材台帳](../records/ASSET_REGISTER_R1.md)と[依存台帳](../records/DEPENDENCY_LICENSES_R1.json)の旧記録は保持。新たな具体的な素材侵害候補は今回未検出だが、権利確認完了とはしない。実況/収益化動画/切抜きの許諾範囲はHuman決定待ち。第三者Content ID申立てなしを保証しない。外部Portal契約・実広告・事業承継は今回の実施対象外。

日英About/Contact/Privacy/Termsへ、中央設定による運営情報表と、問い合わせ・hosting・計測・端末保存の区別を追加。未設定は「未確定」、草案を維持。Tinlumo Studioは制作元ブランドであり実運営者・法人名ではない。住所そのものを機械的必須にせず、必要な表示範囲をHumanが法域に照らして決める項目を設けた。

| 処理 | 現実装／推奨案 | 保持・受信・同意の残件 |
|---|---|---|
| 端末内保存 | 同一端末/browser/originで作品別localStorage、自動保存。アカウント/Cloud Saveなし。詳細は日英Privacyの実key表 | 自動期限なし。作品の進行消去は音/guide等を残す。全削除はbrowserサイトデータ削除。別domain/portは別保存。目的と対象市場に応じた保存/同意検討 |
| 内部イベント | 現状メモリ各50件、Play最大100件。外部送信・永続化なし。session markerは固定値 | 新規永続ID/fingerprintなし。Bの将来仕様とは分離 |
| 問い合わせ | 専用support mailbox＋担当者による返信を推奨。site formなし。provider/宛先未選択 | 提案：受信確認はmail providerの実機能確認後、返信目安3営業日（能力確認後にのみ公表）、解決後90日で本文削除、未解決は月次見直し。迷惑メール/バックアップの保持、削除窓口、例外保持を実providerで確認。未承認値は中央の確定欄へ入れない |
| hosting | 静的でもCloudflareがIP/HTTP request/traffic routing等を処理し得る | operatorの閲覧可能項目、providerの用途・保持・削除・処理地域、契約/DPAを確認。固定日数は公開資料だけで確定できずblocker。[Cloudflare Privacy](https://www.cloudflare.com/privacypolicy/) |
| A/B計測 | 下記。現在未接続 | IDなしを個人データ処理なし・同意不要としない。受信先、利用目的、対象地域/年齢、保存/防御処理を評価 |

市場・年齢：**一般向け、DOB/年齢入力・年齢Gateなし、子ども向けとして積極訴求しない方針をHuman決定済み**。対象国と海外提供範囲の最終指定は残る。これは法的対象を日本だけに限定する保証ではない。対象年齢を便宜的に13+/18+と捏造しない。Humanが想定利用者と海外向け提供範囲を決める。日本は[個人情報保護委員会の現行法令/ガイドライン](https://www.ppc.go.jp/personalinfo/legal/)、米国の児童利用は[FTC COPPA案内](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)、英国の児童アクセスは[ICO Children’s Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/)を対象に応じて確認。年齢表示だけで適用除外とは判断しない。これは法的適合結論ではない。

## 4. 配信・費用・停止

2026-09-17 02:56–03:02 JSTに公式条件を読取確認。料金はUSD、税/domain/mailは別。**推奨はWorkers Static Assets assets-only / Free**。現在のAstro静的出力を使い、`main`/Worker script/SSR/DB/R2/常駐serverを追加しない。

| 比較 | Workers Static Assets | Pages Direct Upload |
|---|---|---|
| 静的request／asset保存 | 静的request無料・無制限、asset保存追加料金なし | Functionsなしの静的request無料・無制限 |
| 配布上限 | Free 20,000 files、1 file 25 MiB | CLI 20,000 files、drag/drop1,000、1 file25 MiB |
| 現RC | 48 files、最大12.29 MB、上限内 | 同じく上限内 |
| 運用差分 | scriptなしの直接upload可能、直近100 versionsからrollback | 直接upload可能、成功済みproductionへrollback。Direct UploadからGit連携は新projectが必要 |
| 選択理由 | 新規サイトで将来も継続する公式投資先 | 継続supportされる代替、今回は追加しない |

出典：[assets-only移行/設定](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)、[静的料金](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)、[Workers上限](https://developers.cloudflare.com/workers/platform/limits/)、[Pages料金](https://developers.cloudflare.com/pages/functions/pricing/)、[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)、[公式開発方針](https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/)。

**推奨構成の配信固定費/静的従量費：$0。** 動的event collectorを追加するBは別課金枠。Workers Freeは100,000 request/日、CPU10 ms/invocation。Paidは最低$5/月、10 million requests・30 million CPU ms/月を含み、超過は$0.30/million requests、$0.02/million CPU ms。静的requestはこのdynamic枠と区別する。[Workers現行料金](https://developers.cloudflare.com/workers/platform/pricing/)。

`run_worker_first`、Worker script、別製品Workers Cacheを理由なく追加しない。静的Assets内蔵cacheとWorkers Cacheの課金を混同しない。`_headers`雛形は可変のrc-r1 URLに長いimmutableを付けず`no-cache`で再検証する。[Headers仕様](https://developers.cloudflare.com/workers/static-assets/headers/)。

予算推奨：hosting月額$0、有料upgradeは別承認、domain/mailは別上限。将来Paidにする場合も[Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/)は通知だけで強制上限ではない。CPU制限も月額上限ではない。通知先と停止担当、50/80/100%等のしきい値を実際のplanで確認する。Free枠到達で動的受付が停止し得る設計でも、static gameはその受付に依存させない。

停止：clientのBを切るだけで偽造event課金を止められない。collector自体の全公開route停止が必要。サイトは休止版へrollbackまたはcustom domain/routeを無効化し、[workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)・preview URLも閉じていることを確認。DNS削除だけを全停止としない。

## 5. 最小計測 A / B

| 案 | 得られる指標 | 費用／保持／閲覧 | 判断 |
|---|---|---|---|
| **A 初回採用方針**：ページ/性能だけ | page views、visits、URL別読込、Core Web Vitals。ゲーム進行は取れない | Web Analytics無料。UIから過去6か月閲覧。Cloudflare dashboardで週1回、作品Playと日英を比較 | 初期の配信品質を低運用負担で見る。今回未接続。有効化には別許可 |
| B：A＋最小event | ready、first input、進行節目、関連作品クリック、起動失敗の観測件数/比率 | 別Workers collector＋Analytics Engine案。3か月保持、集計CSVは提案90日。定型SQL→週次小表で十分 | 初回Release対象外。将来は別要件・別Human承認 |

[Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/)ではcustom event未対応。Aのbeaconへ独自eventを流用しない。[Providerの説明](https://www.cloudflare.com/web-analytics/)は計測cookie/localStorage/fingerprintを使わないという説明で、サイト全体の法的結論ではない。6か月の閲覧期間と全処理データの削除保証は別。

Bの未接続雛形は `config/release-final-r1/measurement.template.json`。送信許可fieldは **name、gameId、locale、progressBucket、errorCode**だけ。`game_start`はクリックではなくready受信時、`first_input`は最初の有効操作、`progress`はfirst_clear/middle/completeの節目、`related_open`は移動元作品で関連リンクを選んだ件数、`load_failure`はtimeout/load_errorだけ。送信先gameIdはこの最小案では取らず、作品間の詳細遷移行列は測れない。日時は受信側で付与。

- 送らないもの：full URL/query、メール、save/盤面/操作列、自由文、永続ID、fingerprint、UA/IPのanalytics dimension。既存bridge nonceを計測に転用しない。
- 重複：page寿命だけのメモリsetでready/first_input/各節目を各1回、ページ12件上限、再送0、永続queueなし。reload/多tab/偽造を跨ぐ厳密重複排除は保証しない。
- 不正送信：POST・Content-Type・512 B上限・固定enum・field拒否・正確なOrigin/Fetch Metadata・rate制限。Originは認証ではない。IPを防御keyに使うなら短期の別処理として説明し、analyticsには保存しない。[Rate Limiting API](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)は拠点単位のeventual consistencyで、全体会計上限にはならない。
- 失敗：非同期、短いtimeout、ゲームに待機画面を出さず、保存/音/入力を止めない。adblock/通信断/JS自体の未読込では欠測する。load_failure送信自体が失敗するケースもあり、失敗率は観測可能範囲だけ。
- 保持：[Analytics Engine上限](https://developers.cloudflare.com/analytics/analytics-engine/limits/)の3か月。生データ30日削除をこの構成で保証しない。生データexportを常態化せず、集計CSVはHuman決定の90日案。個別削除/processor条件は導入時に確認。
- 費用：[Analytics Engine pricing](https://developers.cloudflare.com/analytics/analytics-engine/pricing/)は照会時点で未請求と明記。将来価格はFree100,000 points/日・10,000 read queries/日、Paid10 million points/月＋超過$0.25/million、1 million queries/月＋超過$1/million。**恒久無料とはしない**。collector request/CPU費用はこれと別。
- 集計：`events-summary.sql`雛形を[SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/)で実行する将来手順。`SUM(_sample_interval)`で[sampling](https://developers.cloudflare.com/analytics/analytics-engine/sampling/)を考慮し、日/作品/locale/event別の観測推定件数を見る。tokenはbrowserやSQL fileへ入れない。大型dashboardは作らない。

両案とも、個人単位の再訪率/retention・unique player・cross-device・長期個人funnelは測れない。Bのfirst_input/ready等はイベント比率で、人数の転換率と表示しない。市場・年齢に応じた通知/同意/越境処理の確認後にのみ接続する。

## 6. 公開前後の実行手順とrollback

雛形：`config/release-final-r1/wrangler.template.json`、`_headers.template`、計測JSON/SQL。今回のvalidatorは**offlineの構造・上限・route投影のみ**。Wrangler実runtime/schema、CDN headers、TLSはまだ未検証。deploy commandを実行していない。

1. 下記blockerをHumanが決定し、中央`src/rc/site.json`へ確定情報だけを反映。草案と法務/権利は明示判断、RC候補PASSを再取得したことにしない。
2. domainを最終照会して承認上限内で取得（別許可）。Cloudflare account owner/MFA/recovery・Free plan・必要権限・契約条件をHuman管理で確定。Git自動deployは使わない。
3. 本番用の別出力 `.cache/tinlumo-approved-dist` を将来作成し、manifestに結び付ける。今回このfolderは生成していない。`_headers.template`をレビュー後に同folder直下の **`_headers`** として配置する（雛形のままでは適用されない）。ローカルRC/旧Baselineは保全。本番copyの未確定/草案/local RC帯を、確定情報へ局所変更し、QAしてから公開許可を求める。
4. SEO：`domain`の単一HTTPS originを正本にする。日英26ページに自己canonicalと同一pageのja/en絶対hreflang、言語入口 `/` をx-default、必要なOG URLを設定。`sitemap.xml`は `/`＋日英26の**27 URLのみ**、ゲームiframe内部/404/比較/fixtureを含めない。更新日を捏造しない。robotsのDisallowと外向けnoindexは公開承認後の本番出力でのみ切替。iframe内部と404はnoindexを維持。現RCは全noindexを維持。[offline投影結果](../qa/soft-launch-rc-r1/release-final-r1/hosting-validation.json)
5. 実operator情報の表示/Privacy/Terms/Contact final照合、配布allowlist・license・secrets scanを**本番出力で**再実行。既存RCのchecker/allowlistはnoindexのRC用なので、本番へ流用してPASSを捏造しない。別本番profileで公開meta・sitemap・headersを許可し、同じ内部除外/秘密検査の強度を維持する。
6. `wrangler.template.json`のassets.directoryは上記未生成folderを指す。version固定のWranglerでlocal schema/dry-runを確認後、明示許可の下でassets-only upload。custom domainを追加し、DNSとCloudflare発行HTTPSの有効化を確認。workers.dev/preview URLはfalseを維持。`www`を使う場合は正規hostへredirect、HTTP→HTTPSも確認。同一origin内の作品保存を維持し、別originのローカル保存の移行は約束しない。
7. 承認deploy後smoke：JA/EN Home→詳細→3作品、保存→reload→言語→作品往復、音ON/OFF・pause復帰、失敗表示、Contact到達、全重要link、HTTPS/証明書/MIME/404/headers、canonical/hreflang/sitemap、内部11URL拒否、no secret、外部通信が選択案だけ、WAV cold/warm/失敗。iPhone/Androidと実回線を条件付き記録し、desktop simulationと分ける。
8. manifest SHAとCloudflare version ID、直前正常版、DNS/route設定の変更前値を記録。smoke不合格なら告知/集客を止め、承認済み正常版または休止版へ戻す。

**rollback**：[Workersの直近100 versions](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)からDashboardのDeployments→対象→Rollback、または別許可後の`wrangler rollback <VERSION_ID>`。CLIへ実credentialを引数直書きしない。初回は正常な旧productionが存在しないため、事前に休止版/route停止の方法と許可を用意する。復旧後は上記smoke、cache再検証、公開経路を確認。browserのlocalStorageはサーバーrollbackで戻らないため、schema/keyを維持する。公開中のorigin変更や保存削除はrollbackに含めない。

| 次回別途許可する外部操作（順序） | 費用 | 戻し方・限界 |
|---|---|---|
| ① 将来必要とHumanが判断した場合だけの限定専門家相談 | 公開読取は無料範囲、専門家費用は見積と上限を先に承認 | 問い合わせ送信/契約は今回なし。依頼後費用は取消保証なし |
| ② tinlumo.com最終照会・購入/登録 | 表示$10.46/初年・更新、税込上限未決定 | domain解約/更新停止は別判断。購入費返金を保証しない |
| ③ Cloudflareとsupport mailboxのowner/契約/設定 | static Free $0、mail未選択/未見積 | 有料追加禁止、mail送受信テストも別許可。停止しても既存メール保持は別処理 |
| ④ custom domain/DNS/HTTPS＋承認build upload | static $0想定、domain別 | 旧DNS/route値へ戻すか休止版。公開済みcacheや受信データの回収保証なし |
| ⑤ 初回方針として選択済みのAを別許可で有効化、実URL smoke | A無料、Bは初回対象外 | beacon除去・自動挿入停止、過去データ保持はprovider条件 |

今回Phase1の1 checkpoint commit＋Private origin/main通常push1回のみ明示許可。上記domain/Cloudflare/連絡/計測の外部実行は未承認。

## 7. 残blocker・解消条件・担当

正本はsrc/rc/site.jsonと[現在のreadiness](../qa/soft-launch-rc-r1/checkpoint-r1/release-readiness.json)。名前FREEZEと一般向け/計測A選択を未決定へ戻さない。TIRMO/WIPOは記録済み残余不確実性であり、自動改名や追加候補探索の指示ではない。

| 残件 | 解消条件／担当 |
|---|---|
| Domain所有・公開origin | Humanが可否/tier/税・初年/更新価格/更新管理を確認し、別途購入承認 |
| 公開運営者・住所表示方針 | 個人運営の公開表記と必要な住所等の表示範囲をHuman決定。ブランドで代替しない |
| Contact | Humanが転送先・返信元・担当・保持削除を決定。別許可後に設定・受信/返信試験。Email Routing単体はsupport@からの返信を提供しない |
| 市場・データ最終説明 | 対象国、Cloudflare側アクセス処理/保持、メール処理、Web Analyticsと保存の通知/同意判断をHuman確定。年齢方針と計測の選択自体は確定済み |
| 配布素材・動画・法務 | notice照合とAI来歴を法的承認に代用しない。Humanによる配布権利・動画許諾範囲・日英最終文面判断 |
| 実機/全57問Humanの証拠範囲 | 候補PASSを維持し、既存証拠と追加確認/受入範囲をHumanが区別。未実施をPASSにしない。外部初見はDEFERREDのまま |
| 公開artifact・外部操作 | 上記確定、production用SEO/Privacy/Contact・配布検査後にHumanがdeploy/DNS/Analytics等を別承認 |
| 本番smoke | 承認deploy後に担当が実URL確認。公開前条件との循環を作らない。不合格時rollback |

## 8. 次回Human判断（決定済みを再質問しない）

1. **Domain**：tinlumo.comの1年購入の税込上限・更新管理。fallbackは第一候補が取得不能の場合だけ。名称FREEZEは完了。
2. **個人運営・窓口**：公開運営者/住所表示方針、転送先、返信元、保持削除。support@候補は未開通なので公開しない。
3. **市場・データ・公開**：対象国、アクセス処理/保持・同意、権利/動画/法務、実機証拠範囲、費用と停止担当。一般向け/no age gate、Web Analyticsのみ、Free維持は決定済み。外部実行の許可は次回。

## 9. QA・変更・試遊

[今回QA](../qa/soft-launch-rc-r1/checkpoint-r1/REPORT.md)に実行/再利用/未実施、変更manifestと保全照合を集約。配布security PASSと全projectの既知raw FAIL2件を分ける。旧SHAの限定FALSE POSITIVEとTLS鍵のTRUE SECRET / LOCAL DEV ONLY保持承認は不変。

- [日本語Portal](http://127.0.0.1:4350/ja/) / [English Portal](http://127.0.0.1:4350/en/)
- [このPackのloopback表示](http://127.0.0.1:4351/checkpoint-r1/REVIEW.html)
- [Hakorilo](http://127.0.0.1:4350/ja/play/tiny-delivery/) / [Lightwork](http://127.0.0.1:4350/ja/play/light-garden/) / [Two Ways](http://127.0.0.1:4350/ja/play/two-ways-home/)

repo内から `npm run build:rc`、停止中のportだけ確認して `npm run preview:rc`（127.0.0.1:4350）、別terminalで `npm run review:rc`（127.0.0.1:4351）。既存processは無断停止しない。必要な停止は既存 `powershell -NoProfile -File scripts/rc-stop.ps1 -Target both` がPID/command/portを確認する。LAN/証明書/Firewallは変更しない。

**今回のGit権限はPhase1の1 commit/1通常pushのみ。** checkpoint後はdomain読取調査とCloudflare手順のローカル準備まで。deploy/DNS/LAN/購入/契約/外部登録/問い合わせ送信/計測有効化は0で停止。
