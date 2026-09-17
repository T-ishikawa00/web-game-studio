# Tinlumo Public Release Final R1 — Release Decision

2026-09-17 最新 manual Analytics差分：Cloudflareのmanual snippetとauto_install=falseを確認。default OFF、許可後のみmoduleを1個読み込む。未同意/拒否/拒否再読込のJS・beacon送信処理0、許可後JS HTTP200・XHR送信試行1、応答status0につき配送/集計未確認。Preview保護/計測OFF維持。本番deploy/公開接続0、最終Human承認待ち。今回許可された1checkpoint/通常pushの詳細と残Gateは [最新Final Gate](TINLUMO_PUBLIC_DEPLOY_FINAL_GATE_R1.md) を正本とする。以下の接続未設定・stage/commit/push0等は過去時点の記録。


2026-09-17 最新：Human Final Decision Public Data / Analytics / Legal R1を反映。メールGate CLOSED、必要保存・日英Privacy/Terms・default-OFF opt-in UIの実装/QA完了。動画方針・独自domain送信は初回必須Gateではない。**PUBLIC_RELEASE_BLOCKED / FINAL_DEPLOY_GATE_PENDING**。[本番Deploy直前の最終Gate](TINLUMO_PUBLIC_DEPLOY_FINAL_GATE_R1.md)が現在の正本。以下の旧blocker/未確定表示は過去時点の記録で、最新承認へ再適用しない。


2026-09-17。**PUBLIC_RELEASE_BLOCKED / LOCAL_PUBLIC_CANDIDATE_READY**。主担当・独立read-onlyレビューの実利用モデルは `gpt-6-astra`。採用済みゲームの追加Polish・音源変更・全57問再採点は実施しない。

## 現在の公開状態

| 項目 | 状態 |
|---|---|
| Public Production | 未作成・未upload・未deploy。tinlumo.com / www未接続。version/deploymentなし |
| Protected Preview | https://preview.tinlumo.com/ja/ / https://preview.tinlumo.com/en/ 。Access維持、workers.dev / version preview無効、preview限定RUM停止維持 |
| Human受入 | Protected Preview **Human PASS**を今回明示記録。機種/OS/聴感/全57問等の未報告内容を補完しない。外部初見はDEFERRED / NOT TESTED |
| Git | 既知HEAD・origin/main・actual remoteはf43c4cdfb4d3bad792e681d6eee5a9af212e942d。今回stage/commit/pushなし。前回postflight/RUM停止雛形、無関係untracked13件を保全 |
| Preview版 | Worker tinlumo-preview、version 590239ba-da9d-43b4-835a-57c165fb6e65、deployment a75b3b1b-71fe-4abd-93e8-699343c428f2。今回変更なし |
| 問い合わせ | support@tinlumo.comを採用。15:00 JST時点でRouting enabled/ready、検証済み専用Gmail宛先1件、MX3・SPF1・DKIM1を確認。Human実受信テストPASS（初回Spam振分け）。返信・認証等は未確認 |
| 費用 | 今回Cloudflare受信DNS5件を追加。既存supportルールは保全。Git書込・メール送信・購入・有料契約0。選択はFree。既存domain費用は今回発生額に含めない |

## 今回のHuman判断を反映済み

- 名称FREEZE・残余リスクを維持。新しい名前候補探索なし。TIRMO unresolved / WIPO UNKNOWN、法的安全保証なし。
- 運営公開表記：Tinlumo Studio（個人運営）。本名・住所は常時掲載せず、必要な請求に対してHumanが適切な本人確認等を行い遅滞なく回答する方針。実名・住所はrepo/公開コード/chatに記録しない。
- 主力は海外・英語圏中心のGlobal、日本は重要な第二市場として第一級対応。日英正式提供、geoblockなし、初期マーケティングEnglish-first。米国/EU/UK等の積極広告は別判断。日本限定・世界中の全法令適合済みとは記載しない。
- 問い合わせはHumanが内容を確認し必要に応じ返信、固定期限なし。法定請求は通常の任意返信方針と分離。
- 正規support-domain SMTP/mailboxは既存なし。初回はHumanが**Tinlumo専用受信箱のアドレスから返信**する最新判断を採用。これはsupport名義のFrom送信ではない。個人の常用メールからの返信は行わない。support名義送信は実需要後の別判断へ延期し、初回必須条件に戻さない。
- 問い合わせ本文は対応終了後90日目安で削除、未解決は月1回確認。法令・Security incident・不正利用・紛争等の合理的保持を例外とし、providerのtrash/backupの実仕様を別記する。即時完全削除を約束しない。
- account/課金/実広告/Cloud Saveなし、作品別進行・設定保存、persistent user ID/fingerprint/custom eventsなし。Cloudflare Web Analyticsは本番Portalだけ。Privacy/実装の整合前は無効。

## ローカル実装と検証

正本は `src/rc/site.json`。日英の公開用About/Contact/Privacy/Terms/Creditsを同じ設定から生成する。受信転送設定は開通済みで、実メール試験が未確認の間はその状態を明示してmailtoリンクを保留する。hosting、計測、問い合わせ、端末保存を別に説明する。未確定欄と公開前ラベルは残し、法務完了へ偽装しない。

2026-09-17 Human再確認反映：転送先1件の登録・検証とRouting開通を再度「未設定」へ戻さない。初回のメール基盤は受信転送のみで、support名義のSMTP/送信サービス導入を公開条件にしない。先に承認された専用受信箱からのHuman返信方針は維持する。Global/English-first・日本は重要な第二市場・日英正式・Geo-blockなしを中央設定に明示。日英Contactに残った「予定窓口／まだ利用できない」は、設定完了と実到達試験未確認を区別する文へ修正した。SMTPなしのまま必要なメール試験が揃えばメールゲートが解消できることをローカルfixtureで検証し、そのfixtureを実試験PASSへ流用しない。

公開用 `/` は明示的な言語設定を優先し、なければ第一ブラウザ言語が日本語なら/ja/、他は/en/へ `replace` で案内する。判定不能・JS無効では日英リンクを保持。直リンクを自動転送しない。保存する新しい値はja/enの言語設定だけで、識別子・ゲーム保存変更ではない。

別build設定で `.cache/tinlumo-public-candidate` に51ファイルを出力。採用RC48ファイルと旧配布manifestは上書きしない。採用ゲームiframe・JS/CSS・音源・画像等18payloadをbyte一致で保持。Portal27URLのcanonical/hreflang/sitemapはhttps://tinlumo.comに整合し、candidateは全noindex。公開用の最終包装時だけPortalのindexを許可し、ゲームiframe/404はnoindexを維持する。内部資料は配布allowlist外。

計測は手動loader雛形でHTTPSのtinlumo.com・トップレベルの/ja/または/en/だけを対象にし、既存beaconがある場合は重複追加しない。**現在の候補にはbeaconなし、外部有効化なし。同意方式とその実装は未完了。** 旧包装コマンドは新しいメール・公開copyゲートを通らない別入口になり得たため、独立レビュー後に書込みを廃止し、常にBLOCKEDで停止するよう修正した。

検証結果は [技術QA](../qa/public-release-final-r1/technical-qa.json)、[配布候補manifest](../qa/public-release-final-r1/candidate-manifest.json)、[公開判定](../qa/public-release-final-r1/release-check.json)、[Security](../qa/public-release-final-r1/security.json) を参照。必要な未実施は以下のblockerと区別する。旧BGMの1Mbps/150ms・取得失敗時の操作/保存継続証拠は同じ音源・runtimeのため再利用し、実回線・本番CDN試験へ拡張しない。

## 公開前blocker・解消条件

| Blocker | 根拠・現在地 | 解消条件 / 担当 |
|---|---|---|
| 専用メール受信先と開通（完了） | Human登録・検証後、既存support完全一致ルール→検証済み1件を確認。API書込は10000で不成立、DNS変更なしを再確認して管理画面で不足DNSだけ追加 | Routing ready、catch-all無効、Preview DNS保全。追加SMTPなし。設定証拠はemail-routing-setup.json |
| 返信・認証等の残試験 | 受信はHuman PASS。初回Spam到達を運用注意として記録。support SMTPなしは採用済み延期、専用受信箱からの実返信はNOT TESTED | 別送信元を使用したかは未報告のため推測しない。専用箱から返信→到達等の未実施分を確認。From/Reply-To/Sender、SPF/DKIM/DMARC、常用個人アドレスが露出しないことを確認。本文・実アドレスを証拠へ保存しない |
| メールprovider実態（公開仕様確認済み） | Human選択先のproviderはGmail。実アドレスは記録しない。Gmail trash30日、Google一般削除約2か月・暗号化backup最長6か月、法令例外/遅延/国外処理を日英Privacyへ反映 | Humanの90日目安・月次確認運用を実施。providerの全backendやアカウント固有設定を検証済みとはしない |
| Global向け事業者/データ説明 | 日本32条の請求時回答方式は採用済み。EU/UKの適用評価・取得時説明へそのまま流用はできない | Humanまたは専門家が適用と必要なcontroller説明を判断。選択済みの非公開方針との両立を確認。実名住所の無断公開なし |
| Analytics/保存の同意 | cookieless・IDなしだけで不要としない。自動挿入事故履歴は保全 | 推奨：WAはGlobal共通の事前opt-in。許可前取得0/拒否してもplay可/容易な撤回を実装・検証してから有効化。保存はキーごとの目的・必要性を判断。採用ゲームの保存挙動は今回変更しない / Human判断後Codex |
| hosting保持・法務/素材表示の最終確認 | providerの全処理保持を単一固定日数で断定できない。Terms・素材配布/動画許諾欄は未承認を維持 | 確認済み事実と運営者が管理しないprovider処理を説明し、対象市場に応じた公開文をHuman確認。動画利用は当面包括許諾なし/個別確認案。名称の再選定とは分離 |
| 公開直前の技術・Git判定 | 現在は条件付きGit権限未消費、approved-distなし | 上記解消後、最新manifest/source・QA/Security・remote一致を確認し1checkpoint/1通常push。値やフラグを仮埋めしない |

Humanへ残る入力は、①指定試験用送信元による受信・専用箱返信・認証結果の確認、②Globalでのcontroller説明/同意方式と法務最終判断、③配布素材・動画の公開説明の確定。運営ブランド、Global市場、90日方針、専用箱返信の採用を再質問しない。

### 判断する具体案（まだ公開設定へ採用していない）

1. **メール試験**：受信はHuman PASS済み。初回は迷惑メールフォルダへ到達。送信元が転送先と別だったかは未報告。その専用箱から返信し、元の送信元で到達を確認。結果は「受信／返信到達／From・Reply-Toが意図した専用窓口／SPF・DKIM・DMARC／常用個人アドレス露出」の合否だけでよい。不明なヘッダー項目はUNKNOWNのまま。実アドレス、本文、ヘッダー全文をrepoやchatへ記録しない。
2. **Globalデータ・必要表示**：WAは全地域で事前opt-in、拒否・未選択では送信せず遊べる方式を推奨。許可の撤回も同じ容易さで提供する。これはHuman採否・実装QA待ちであり、現行loaderだけでは同意を実現しない。日本の請求時回答方針は維持しつつ、対象とする利用者についてGDPR等が適用される場合の取得時controller情報・処理根拠・国外移転説明と、必要に応じ代表者等の要否をHuman/専門家が確認する。本名住所はCodexへ渡さず、公開方針に変更が必要な場合だけ方式を決定する。
3. **Terms・素材**：既存配布台帳の対象だけを最終確認する。追加免責・準拠法・裁判管轄・世界法令適合の断定は加えない。公開草案案は「サービスの内容・提供を変更または停止する場合があります。法令上制限できない権利を制限しません。／The service may be changed or discontinued. Rights that cannot be limited under applicable law are unaffected.」。動画案は「ゲーム動画・配信および素材単体の再利用について包括的な許諾は行っていません。利用条件はお問い合わせください。／No blanket permission is granted for game videos, streams or reuse of standalone assets. Contact us about applicable permissions.」。この案の採否と配布権利の確認が必要で、AI支援の来歴だけを根拠に権利確認済みとしない。名称再選定を求めるものではない。

## 一次資料による整理（法的PASSではない）

- 日本：保有個人データの事業者情報等を知り得る状態にする方法には請求に遅滞なく回答する方式もある。通常サポートの任意返信と法定対応は別。屋号だけで個人の氏名要件を満たすと一律には断定しない。[PPC通則編3-8-1](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/)、[Q9-1](https://www.ppc.go.jp/all_faq_index/faq1-q9-1/)。90日は今回の運営方針で、法定の一律期限ではない。[PPC Q5-2](https://www.ppc.go.jp/all_faq_index/faq1-q5-2/)
- EU：アクセス可能であるだけでGDPR域外適用を断定せず、EU向け提供の意図などを評価する。無料だけを理由に除外もしない。[EDPB域外適用指針pp.15–19](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf)。適用時のcontroller identity/contactは取得時の説明対象であり、日本の請求方式と同一ではない。[GDPR13・27条](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- UK：現在は統計目的等の条件付き例外もある。説明・容易な無料の拒否・目的制限等の確認が必要で、「英国はすべての計測に常に同意必須」ともしない。[ICO例外](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)。Global共通opt-inは保守的な実装推奨で、法務全体の解消保証ではない。[ICO同意実装](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/)
- Email Routingは受信転送機能で、通常の返信元は転送先のアドレスになる。[Cloudflare Postmaster](https://developers.cloudflare.com/email-service/reference/postmaster/#sending-or-replying-to-an-email-from-your-cloudflare-domain)。CloudflareはSMTP送信にも対応するが一般宛先はWorkers Paidが必要で、今回採用しない。[SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/)、[料金](https://developers.cloudflare.com/email-service/platform/pricing/)。MXと認証は受信/送信を分け、既存SPFを重複させない。[Domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/)
- Cloudflare Web Analyticsは無料のページ/性能計測。provider説明だけをサイト全体の個人データ処理ゼロという説明へ拡張しない。[About](https://developers.cloudflare.com/web-analytics/about/)、[Cloudflare Privacy](https://www.cloudflare.com/privacypolicy/)。disable_rumのConfiguration RuleはWeb Analyticsルールに優先するため、manual実装との最終挙動も実URLで確認する。[Configuration settings](https://developers.cloudflare.com/rules/configuration-rules/settings/)

## 次の外部実行順序・費用・戻し方

メールの本人登録・support受信DNS/ルール完了→Human所有の試験→providerと公開説明/同意最終確認→ローカル最終包装/QA/Security→1checkpoint/1通常push→新規tinlumo-production作成と配布upload（別URL無効）→本番Custom Domain/必要TLS→競合がなければwwwのpath/query保持転送→本番smoke。具体的手順は [production runbook](../../config/release-production/README.md)。匿名公開の開始点はtinlumo.comの接続。

追加固定費はFree構成で$0を維持する方針。Routing/静的配信/WA以外の動的処理・有料送信・追加購入はしない。Cloudflare一般宛先送信はWorkers Paid基本$5/月・含まれる枠/従量課金があり、今回の禁止範囲。Humanの専用受信箱が有料なら費用条件が別途必要で、こちらから新規有料化しない。

初回本番に正常versionがなければ、今回作成した本番の公開経路とwww転送だけを閉じる。正常な本番versionがあればそこへrollbackし再smoke。PreviewのAccess・配布版・メール・他DNS・端末保存を変更しない。保護用空ページを一般公開の復旧版にしない。

## 起動・未commit差分・実行上の例外

ローカル確認URL: http://127.0.0.1:4352/ja/ / http://127.0.0.1:4352/en/ 。再起動はrepoで `node scripts/public-release-server.mjs`。127.0.0.1限定、他プロセス停止やLAN再公開なし。再buildは `node scripts/public-release-build.mjs`。型確認は `node scripts/astro.mjs check --config astro.public.config.mjs` を使用する。

今回のsource/config/資料/QAは未stage・未commit。前回のpostflight/RUM停止設定も引き続き未commitで保全。変更一覧・ブラウザQA・最終refsは [今回QA報告](../qa/public-release-final-r1/REPORT.md) に記録。

型確認の初回だけ、既存wrapperを使わずAstro CLIを直接実行してしまい、標準通知がユーザー側Astro設定の通知日・Telemetry有効既定値を更新した。これはrepo内限定の実行方針からの逸脱。ローカルのcheck実装ではsyncのtelemetry=falseが既定で、当該check経路の送信呼出しは確認されなかった。実ネットワーク送信の記録は取得していない。以後はASTRO_TELEMETRY_DISABLED付きの既存wrapperに統一し、global設定の復元/追加変更は実施していない。ゲーム/Cloudflare Web Analyticsの有効化とは別の記録。

Gmail/Googleの確認済み保持仕様：[Gmail削除](https://support.google.com/mail/answer/7401?hl=en)、[Google保持](https://policies.google.com/technologies/retention?hl=en)、[国外処理を含むPrivacy](https://policies.google.com/privacy?hl=en)。送信先メールアドレス・本文・私用情報は資料へ保存していない。

## Human実受信報告の反映

実受信はPASS。受信経路が正常なことと、迷惑メールフォルダへの初回振分けを分離する。運用者は通常の問い合わせ確認時に迷惑メールフォルダも確認する。自動振分けの改善・受信トレイ到達を保証しない。Codexは迷惑メール設定や広い許可ルールを変更していない。転送先・本文・ヘッダーは保存しない。独自domain送信は未実装のまま。返信/認証等の未報告事項は未確認として保持。[Human受信証拠](../qa/public-release-final-r1/mail-receipt-human.json)
