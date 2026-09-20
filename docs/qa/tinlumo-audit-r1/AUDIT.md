# Tinlumo Portal / Trust / Monetization Audit R1

2026-09-20 · 主担当／独立法域・広告調査とも `gpt-6-astra`。独立担当はread-only、書込み・ブラウザは主担当のみ。

**結論：A・広告なしを推奨。** 確認済みP0はない。ただし網羅的なSecurity/法務適合のPASSではない。最も具体的なUX不足は、公開4作品に対して関連作品導線が3作品時代のままであること。Trustでは運営者情報照会と個人データ請求の分離、実運用の確認を先に行う。Homeの迷い軽減は仮説であり、全面再設計や規約の長文化を正当化する根拠はない。

[統合Review・2方向の画面・日英文案](REVIEW.html) / [次回実装依頼・上位5件](NEXT_BATCH.md)

## 1. 契約と証拠の強さ

添付 `C:\Users\PUBLIC_USER\Downloads\TINLUMO_PORTAL_TRUST_MONETIZATION_AUDIT_R1.md` は今回依頼の対象仕様。内部のChat所見は監査候補であり、欠陥確定や実装許可とは扱わない。最新ユーザー依頼が旧Authorityの「公開0」「公開前」「3作品」より優先する。今回は監査資料・隔離比較・文案だけ。stage/commit/push/deploy、外部設定、問い合わせ送信、契約、購入、広告SDKなし。

|記号|意味|
|---|---|
|F 事実|読み取ったsource/生成物/公式一次資料。適用法判断は含まない|
|O 観測|今回ブラウザ・HTTP・ハッシュ照合で得た状態。端末/日時/条件付き|
|R 再利用|同一artifact/sourceの過去QA。今回実行と区別|
|H 仮説|改善効果の推定。CTR/再訪/売上の因果は未実証|
|U 未確認|アカウント契約・法的適用・実機・実ユーザー等。未確認≠違反≠PASS|

## 2. 現物照合・証拠台帳

|ID|対象／証拠|結果・限界|
|---|---|---|
|E01|[preflight.json](evidence/preflight.json)|cwd/Git root `C:\projects\Web Game Studio`。main / HEAD / upstream / actual remote main = `77835d4474b877dec235bd3cc5cf0fb95fa03cc7`。remoteは今回 `git ls-remote` read-only確認。index空差分、trackedは既存Current追補2行、他に多数untracked。既存2,828ファイル＋配布62ファイルをhash保全。ignored全体は再走査せず配布物と既存QA参照に限定|
|E02|[artifact-inspection.json](evidence/artifact-inspection.json)|公開artifact `release-artifacts/game004-production-r1` 全62ファイルがrelease manifest一致。manifest SHA256 `39d940d4c251ba78ee80822c034c89cc08c94d71757b732ff941620a6cb3bbf6`|
|E03|同JSON live|今回11公開URLはHTTP200かつローカルとbyte一致：JA/EN Home、EN Magnet/Hakorilo Play、JA/EN Terms/Privacy、EN Contact/Credits、consent JS。全61公開URLを再取得したとはしない|
|E04|[公開postflight](../game004-magnet-release-r1/POSTFLIGHT.md)、[live-distribution](../game004-magnet-release-r1/live-distribution.json)、[live-browser](../game004-magnet-release-r1/live-browser.json)|同manifestの公開61ファイル、128ブラウザchecks、旧57問技術回帰等を再利用。新規全問再生/動画なし|
|E05|[live-consent](../game004-magnet-release-r1/live-consent.json)、[local-consent](../game004-magnet-release-r1/local-consent.json)、[旧詳細](../public-release-final-r1/consent-qa.json)|未選択/拒否通信0、許可後provider JS/RUM、撤回reloadの既存証拠。今回JS一致を確認。cross-tab/BFCache/書込拒否はsource/既存テストを照合。今回live allowを再送信していない|
|E06|[Home EN](evidence/live-home-en-1366.png)、[Home JA](evidence/live-home-ja-390.png)、[Play](evidence/live-play-magnet-en-1366.png)、[再訪](evidence/live-magnet-revisit-390.png)、[同意](evidence/live-consent-360.png)|今回IAB Chromiumのデスクトップ／モバイルviewport。物理スマホではない。画面記録は静止画のみ|
|E07|source `src/rc/pages/[locale]/[...path].astro`、`PublicOperations.astro`、`site.json`、`analytics-consent.js`、`scripts/magnet-public-build.mjs`、`magnet-release-build.mjs`|source→旧3作品生成物→004追加→公開projectionという経路を照合。「3作品」は公開Termsではfourへ変換済み。metadata/本文の生成後replaceは保守上のリスクで、現在の表示誤記ではない|
|E08|[004権利台帳](../game004-magnet-public-r1/RIGHTS.md)、release manifest内Astro/Vite notices|runtimeの実配布とbuild時依存を区別。004bundle入力はproject-local、system fonts、合成音。第三者の著作権/商標完全クリアランスとはしない|
|E09|[公開copy](../public-copy-cleanup-r1/COPY_REVIEW.md)、[Visual QA](../visual-polish-r1/REPORT.md)|Heroは既に軽量化済み。source Heroの装飾だけを見て巨大Heroが現存すると断定しない。画面・公開payloadで訂正|

要求名 `TINLUMO_MONETIZATION_RESEARCH_R1.md` はrepo内で見つからなかった。添付の該当節と既存 [MONETIZATION_AND_ADS_R1](../../planning/MONETIZATION_AND_ADS_R1.md) を代替の履歴として読み、広告条件は今回公式ページで更新。存在しない研究を読了扱いにしない。

## 3. 利用シナリオ

操作数はURL到着後の明示クリック数。scrollは別。初回とは当該ゲームで保存なし表示の観測であり、ブラウザ全体をfreshに初期化した意味ではない。初期Analyticsは既存deny。ユーザー保存を削除してfreshを捏造していない。

|場面／URL（tinlumo.com）|条件／入力|期待・実際／操作数|判定・証拠|
|---|---|---|---|
|初回Home `/en/`・`/ja/`|1366×768 EN、390×844 JA、pointer、既存deny|4作品・Play発見。EN Hero y92 h137、カード開始y278、CTA y723 h44。4枚目Two Waysは次行y795。JA004 CTA y599 h44、2枚目y695、4枚目y1520|O:1クリックでPlay。Homeは故障していない。全4作品の初期一覧性改善はH。E06|
|Play直行 `/en/play/project-magnet/`|1366×768、当該ゲーム新規、pointer|作戦選択・操作説明あり。START OPERATION A 1クリックでゲーム、Pause 1クリックで停止。広告/Portal巨大説明はない|O:正常。削除不要。直接ゲーム入口の利点をKEEP|
|詳細 `/en/games/project-magnet/`|同上、pointer|操作/目的/区画再開の説明とPlayあり。Play1クリック。本文は長い1段落で、短い保存要点の抽出はH|O:説明欠落ではない。フッターにTrust4ページあり|
|中断→同origin再訪|Magnet Play→詳細→Play、390×844も観測|詳細復帰1、Play1。新規開始後にRESUME OPERATION A / Zone1表示。区画開始保存という説明に合う。進行を勝手にリセットしない|O:今回Zone1のみ。後半/完走/破損はR|
|一作品→他作品／Retry|生成物JA/EN8 detail/play、Hakorilo live|旧3作品の関連は残り旧2作品のみ。Magnet detailに他3作品リンクなし。Magnet→詳細→All games→次作Playは3リンク操作、Home経由も必要。Retryは公開ゲームでボタン存在、完了後の挙動は既存QA再利用|F/O:回遊非対称。全作品3件の他作品リンクへP2。ゲーム内には被せない|
|未選択/拒否/許可/撤回/別タブ/保存拒否|今回360×800、Hakorilo、Footer設定クリック1|AllowとContinue withoutを同時表示。Hakorilo iframeはロード。既存QAの未選択/拒否通信0・許可後1script・撤回reload、storage/BFCache/保存拒否を再利用|O/R:新規P0未確認。選択日時envelopeがないこと自体を違反とはしない。目的追加時の版管理は次の別差分|
|音なし/読込失敗/保存不可|source、同manifest既存QA|旧3作品はrc-error/再読込、004は保存memory/corrupt/conflict表示と原値保護、音操作は入力起点。既存の読込失敗/BGM取得失敗でもゲーム継続の証拠あり|R/F。今回障害注入・音の実聴なし。非破壊復旧短文を草案化。Hakoriloの音未出力をbrowser不具合と断定しない|
|Help/Terms/Privacy/Contact/Credits|Hakorilo Play/footer・Magnet detail|旧3作はHow to play/フッター。Magnet direct Playは詳細復帰リンク→Trustで2リンク、直行先にfooterなし|O/F:Trust不在ではない。離脱先の整理で対応、常時overlay追加なし|

**寸法の意味**：viewport390に対しdocument client/scroll幅375（scrollbar15）、横overflowなし。CSS pxの座標であり物理タッチ精度ではない。360の計測ボタンは表示確認済み。キーボード・200%ズーム・reduced motionは新規比較側の証拠と既存production QAを分け、未試験を埋めない。

**性能の限界**：HTTP bytesはE03、採用ファイルのサイズはmanifest。転送圧縮・cache・実回線・実際に操作可能となるまでの時間・INP/FPSは今回新規実測なし。DOM-readyをゲーム操作可能時間として代用しない。CWVはLCP≤2.5s / INP≤200ms / CLS≤0.1、実利用p75の指標で、少数ラボ値を達成証明にしない。[公式Web Vitals](https://web.dev/articles/vitals)。タッチ実用目標44pxと、[WCAG2.2 AAの24px最低要件・例外](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)は別。全リンク44pxを一律法的必須とはしない。

## 4. 競合4サイトの独立比較

確認2026-09-20、IAB 1366×768・pointer、未ログイン。実広告はクリック/反復表示していない。公式HTML読取と1回の実画面観測を区別。ブラウザ最大2タブ、動画0。

|例／具体的場面|確認できた構造|Tinlumoへ採るもの／不要なもの|確認限界|
|---|---|---|---|
|[Poki / Level Devil](https://poki.com/en/g/level-devil)：検索から直行、困ったとき|HTMLにControls/Fullscreen/Report a bug/related。実ブラウザはJPへredirect、ゲーム周辺にFullscreen・不具合報告・関連作品が表示。[画面](evidence/competitor-poki.png)|操作・不具合報告・次作品の区別。大量recommendation、rating、カテゴリ網は4作品では不要|ゲームは準備中。Fullscreen/不具合送信/実広告/完走の動作は試験しない。HTMLの機能名を動作PASSとしない|
|[CrazyGames / Bloxd.io](https://www.crazygames.com/game/bloxdhop-io)：端末向きと次の作品を探す|公式ページに端末/landscape/Controls/Play next/Recently played。実画面にゲーム領域とsidebar、My Games等。[画面](evidence/competitor-crazygames.png)|端末条件を作品固有に示す。ログイン/Friends/通知/大量tag/最近遊んだ全作品は不要|初回goto timeout後にDOM/画面取得成功。iframe内部プレイ・再訪保存の機能は未確認。timeoutをサイト障害としない|
|[Cardgames.io / Solitaire](https://cardgames.io/solitaire/)：中断、新規ゲームとの区別|実画面でNew Game/Restart Game/Pause Game/Rules。HTMLにResume Gameも存在。[画面](evidence/competitor-cardgames.png)|開始/再開/新規を混ぜないラベル。今のMagnet RESUMEは既にある。統計/カスタマイズ/多人数機能不要|Pauseリンク操作後Resumeボタンを検出できず。Resume実動作はUNKNOWN。抽出HTMLの一括hidden文言を同時表示としない|
|[flanne / 10 Minutes Till Dawn](https://flanne.itch.io/10-minutes-till-dawn)：独立作を初めて試す|実画面にRun game、短いWASD/Left Click説明、作者、コメント/開発ログへの区別。[画面](evidence/competitor-itch.png)|短い操作要点＋Play、制作主体、詳しい説明を後方へ。コメント/Store/widgetをTinlumoへ追加しない|Run gameボタンの表示確認まで。ゲーム本体の操作・成果・収益未確認。コメント内容を品質証明に使わない|

参考の構造は仮説を作る材料。人気/売上/投票とUIの因果関係は検証していない。競合法務文言のコピーは行わない。

## 5. 実データフロー

送信先には公開サービス名だけを記録し、転送先mail、private identity、beacon identifier、顧客メールを収録しない。C=確認source、P=policy、U=契約/履行未確認。

|データ／目的|端末のみ／送信先|主体・契約上の役割|同意等の位置づけ|保持／削除|現行説明／証拠|
|---|---|---|---|---|---|
|旧3作localStorage進捗・clear・reduced motion（wgs save namespace/version）|端末のみ。サーバー送信処理なし|端末の利用者／Tinlumoコード。端末access規則の評価は必要|遊ぶ/再開要求を満たす保存。全用途一律免除とはしない|自動expiryなし、作品resetは進捗等のみ。音/guide/locale等は残る。全削除はbrowser site data|Privacy・Play保存説明あり。save-copy.ts、shell.ts、prototype save、R4/RC QA|
|音・gain・Hakorilo music・案内・言語localStorage|端末のみ|同上|機能別の必要性/設定選択。Analytics同意と別|expiryなし、全消去はsite data。作品間namespace独立|Privacy記載、craft-audio.ts/light-craft-audio.ts/twoways-craft-audio.ts/music-audio.ts/public-language.js|
|004 localStorage `tinlumo.game004.magnet.full.v1`|端末のみ|同上|作戦/記録/設定/区画開始checkpointのため|expiryなし、004resetは設定含む全部、他作品不変。破損時原値保持、競合時書込停止|公開Terms/Privacy追記、game004-magnet-full/save.ts、E04|
|sessionStorage表示/方向設定、wgs session重複防止、音pilot condition|端末のみ|同上|機能設定・重複防止、広告追跡ではない|タブsession。復元で残り得る、site dataで消去|Privacy記載。採用payload内用途とsource照合、非採用Twoways BGMを配布実態と混ぜない|
|メモリの操作・最大50件local event ring|端末のみ。createAnalyticsにfetch/beaconなし|Tinlumoコード|QA用local記録、Cloudflare custom eventsではない|page破棄で消去|src/lib/analytics.ts、src/rc/portal.ts。全ゲーム状態を常時外送しない|
|Analytics allow/deny `tinlumo:analytics-consent:v1`|選択自体localStorage|Tinlumoコード|現在の任意WA目的のみ。将来広告に再利用不可|expiry/選択日時envelopeなし。設定変更/site dataで変更、撤回reload|consentDisclosure/analytics-consent.js/E05。日時がないだけで違法とは断定しない|
|任意WA URL/referrer/browser/device/performance|許可後Cloudflareinsights script/RUM。ゲーム操作/保存内容なし|Tinlumoが目的を決定。Cloudflareの具体的役割/DPA適用はU|現行explicit opt-inを維持。拒否/未選択でもplay可能|provider保持基準、運営者が一括即時削除を保証しない。公式FAQ:7日unsampled、以後集約、閲覧範囲6か月。アカウント固有保証ではない|Privacyあり。E05＋[CF FAQ](https://developers.cloudflare.com/web-analytics/faq/)|
|配信・セキュリティIP/要求通信|Cloudflare edge。client Cookieなしでも通信データ処理あり|CFサービス別役割/契約はU、Tinlumo別途access log保管なしというP|サービス提供・保護。GDPRが適用される場合のArt6根拠は目的別に要判断|目的/法令/必要性、provider account固有期間U|hostingDisclosure。全request cookieが不存在とは断定しない。今回site Cookie総棚卸しなし|
|問い合わせmail、本文/添付、返信履歴|Cloudflare Email Routing→専用Gmail→Human返信|Tinlumo運営者。RoutingとGmailを分離。consumer GmailにはWorkspace DPAを仮定しない|任意送信＋問合せ/権利対応。国別根拠/国外取扱いU|解決後90日目安、未解決月次、合理的例外。trash/backups別。実削除履行U|Contact/Privacy/site.json。受信PASSを再試験しない|

詳細sourceではraw Cookie列挙・ユーザーstorage値・顧客情報は取得していない。既存証拠で不足するprovider contract/country/safeguardsは「一般Privacyリンクあり」から適合PASSへ進めない。

## 6. 適用条件と条項対応

次表は限定した法務監査論点。法律/事業者要件/任意方針を分け、専門家確認を実施したという意味ではない。確認日2026-09-20。

|ページ・現行→問題|適用条件／区分|一次根拠|不足・修正案|実運用／判断者|
|---|---|---|---|---|
|Contact:個人ブランド、情報は照会、本人確認後→照会障壁|日本APPI保有個人データの公表等／法的事項。照会方式の可否は条件付き|[PPC通則](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/)|運営者情報照会と本人の開示請求を分離。Reviewの日英案。実名住所の一律Web公開を即断しない|Humanが必要情報回答経路を準備。法域別の十分性は専門判断|
|Privacy:Cloudflare/Gmail一般Privacy→役割/国外根拠未整理|APPI委託・外国第三者提供・安全管理／法的事項。委託だから常に免除ではない|[PPC Q&A Q7-53/Q12-3/4](https://www.ppc.go.jp/personalinfo/faq/APPI_QA/)、[Q10-24](https://www.ppc.go.jp/all_faq_index/faq1-q10-24/)|サービス別data map・契約種別・外的環境・移転根拠。適切な契約締結済みと書かない|Humanが契約名/種別のみ確認、必要なら専門家。私用情報をReviewへ転記しない|
|Privacy:Gmail保管返信→processor仮定不可|GDPR等適用時Art28/移転関係／法的事項|[Google consumer services](https://support.google.com/policies/answer/9581826?hl=en)|consumer GmailにDPA提供/processor関係なしという公式説明。Workspace契約と区別。現在の契約種別U|SMTPと無関係。有料Workspace/独自SMTPを自動必須化せず処理関係を限定相談|
|Privacy:ブランドと連絡先のみ→EU/UK通知項目の条件付き不足|Art3:域内への提供意図/監視等。英語/Globalだけで自動適用せず、無料でも対象になり得る／法的事項|[GDPR Art3/12/13/27, Recital23](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)、[EDPB territorial](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-32018-territorial-scope-gdpr-article-3-version_en)、[ICO通知事項](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/)|該当時controller identity/contact、目的別根拠、権利/苦情、移転、保持等。Art27例外は、処理が偶発的で、大規模な特別カテゴリー/犯罪関連データ処理を含まず、権利自由へのリスクが低い等の要件を併せて検討。継続運営を小規模だけで例外扱いしない。DPOと別|Humanが実提供/宣伝計画を確認→専門判断。Geo-block・対象市場変更・代表者契約はしない|
|Privacy:全機能localStorage/opt-in→用途の分類|EU ePrivacy/各国法とUK PECR、端末storageにも適用。UK統計/appearance例外は限定／法的事項と任意方針|[ICO例外](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)、[2026-04-29更新](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/04/final-storage-and-access-technologies-guidance-published/)|cookie-free＝免除ではない。現行opt-in継続、目的変更時に版/説明を別設計。全世界必須の法律だからopt-inという説明はしない|実装は今回KEEP。広告追加はHuman承認後の別審査|
|Privacy/Contact:general audience、年齢未収集→児童連絡の手順なし|COPPA:13歳未満向け／一般向けでactual knowledge等。visual/題材/訴求/実利用を総合評価／法的事項|[FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)|4作の抽象パズル・ロボット表現だけで判定しない。「13歳以上」で解決しない。13歳未満と明らかなメールは一般90日と別扱い検討|一回回答例外ならonline contactを回答後削除等、継続収集なら親同意等の分岐。具体案件は専門判断。年齢ゲート/私用データ取得を追加しない|
|Privacy:Do Not Sellなし→直ちに欠陥か|CCPA:CAで事業をするfor-profit等、収益$26.625m、10万人のbuy/sell/share、50%売却共有収益等の条件／法的事項|[CPPA FAQ](https://cppa.ca.gov/faq)、[閾値更新](https://cppa.ca.gov/announcements/2024/20241217.html)|現規模/取扱いU。単なる10万人訪問ではない。機械的な全州条項/UIを追加しない|広告SDKのsharingと規模変化時に再評価。現在の非該当を数値未確認で断定しない|
|Terms:無料4作品/保存限界/法定権利留保→現行の良点|日本消費者契約法8–10条、海外強行規定等／法的事項|[消費者庁逐条解説](https://www.caa.go.jp/policies/policy/consumer_system/consumer_contract_act/annotations)|留保を保持、全部免責/故意重過失免責/上限0を追加しない。個別reset差分も維持|Terms短さを理由に書換えない。無用な仲裁/専属裁判所を設けない|
|Terms/Privacy:日付/重要変更方法なし|透明性・規約組入れ/変更は法域条件付き。版を残すのは推奨運営|[ICO right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/)、GDPR12/13|施行/最終更新を実公開日、重要差分/適用日を告知。閲覧やAnalytics許可をTerms包括同意としない。JA/EN優先言語を勝手に決めない|Humanが採用日と運用決定。次実装はfooter/detailから発見できるか検証。日付を遡らせない|
|Contact:一般返信に期限なし、権利請求は例外→運用の不足|APPI/該当時GDPR等の請求期限／法的事項＋90日任意方針|PPC通則・GDPR12|一般返信方針を法定請求へ流用しない。GDPR適用時原則1か月等を個別管理。運営者情報の照会を本人確認で遮断しない|Human担当。専用返信Fromの選択、迷惑メール確認、月次削除、例外の再確認。自動メール/AI常時転送なし|
|Credits:AI支援・noticeあり→実況未許可|権利者が許諾できる範囲／任意方針。OSSは個別license要件|E08＋[MIT](https://opensource.org/license/mit)|Reviewの通常プレイ/配信/標準広告収益化/ネタバレ案。批判禁止なし。asset単独・ゲームmirror・公式誤認を除外、法令/OSS例外保持|Human許諾決定。AI出自から独占著作権/非侵害/Content ID無事故は保証しない|

`site.json` の `legalReview:true`・`providerRetentionVerified` 等の既存フラグはHumanの過去決定／調査記録であり、上表の契約・適法性・実削除の確認済み証明ではない。変更も追加もしていない。

## 7. 運営手順の差分案（未実施）

1. Humanが専用Tinlumo受信箱と迷惑メールを通常確認。一般不具合/運営者情報/個人データ請求/児童可能性/安全問題を分ける。本文をAIへ転送する必要はない。
2. 運営者情報のみは本人確認を原則要求せず回答。個人データ請求は必要最小限を安全に照合し、該当法の期限を記録。通常問い合わせの「返信は必要に応じて」を適用しない。
3. 返信は明示選択された専用Fromを確認。別mailアドレスからの返信は公開説明済み。私用日常Fromの意図しない露出を避ける。独自SMTP追加は不要。
4. 解決日と削除目安だけを最小限記録、終了90日目安で削除、未解決は月次、例外は理由と次の確認日。provider trash/backupsの消去保証はしない。履行未確認なので「実行済み」と記録しない。
5. 13歳未満からと明らかな連絡は別分岐。一回回答の例外要件/速やかな削除、継続対応・親同意・権利請求を必要に応じ専門判断。年齢を調べるため全員のDOBを集めない。
6. 四半期など定期の再点検間隔は提案であり新規schedulerを作らない。provider/広告/対象処理の変更時にPrivacy/契約/子ども向け判断を再確認。

## 8. 広告条件・比較案

|方式|現在確認した条件|Tinlumoへの判断|
|---|---|---|
|通常AdSense content|[ゲームページ向け公式](https://support.google.com/adsense/answer/2768340?hl=en)は誤クリック回避、ゲームから150px以上離すかPlayから除くことを強く推奨。広告ラベルを明確にする|固定法令/全H5共通規則ではない。B desktop mockは160px gap。ゲームが小さくなる欠点があり採用非推奨。mobile Playは0枠|
|H5 Games Ads / Ad Placement API|[H5公式](https://support.google.com/adsense/answer/9959170?hl=en)。専用参加条件/承認/API、自然な切替、任意reward等。通常AdSenseの資格を流用しない|審査・参加資格U、SDK未接続。H5動画はゲームのpause/input/audio/失敗resume/報酬一回/ゲーム横断頻度の別QAが必要。次5件に含めない|
|外部Portal専用SDK|[CrazyGames requirements](https://docs.crazygames.com/requirements/gameplay/)等はその配信先の要件|自サイト広告の一般法律としない。作品別契約/独占/他所配信条件の確認が必要。契約/投稿なし|
|CMP / TCF|[Google公式](https://support.google.com/adsense/answer/13554116?hl=en)：EEA/UK/Switzerland向けGoogle publisher広告の認定CMP/TCF条件。形式/配信地域/技術条件を採用時に確認|認定＝法的適合保証ではない。現在WA allowを広告へ転用しない。CMP/同意版/Privacyは広告導入の独立差分|
|ads.txt|実際に採用・承認されたseller/publisherに基づく整備|今回空想のpublisher IDを作らない。申請/審査/契約なし|

**A**：現在の色/Art/ブランドを保持、4枚同列desktop、mobileは画像＋短文のcompact list。画像/作品名/Playの行き先を統一、Detailsのみ分離。広告0枠。**B**：004を編集上の代表作として先頭で大きく見せ、3作を小棚にする。「人気」「おすすめ実績」のラベルは付けない。mobileは他作が下がり、現状の偏りを強める可能性がある。広告を選ぶ場合Home末尾1枠、desktop Play外枠1は比較のみ。mobile Play0。

Play比較は離脱先/詳細側に置く情報を静止画で示す。採用full-screenゲーム本体をwrapperへ移植する提案ではない。実ゲーム画像を縮小したBは操作面積へのコストを可視化するための反証案でもある。

|状態|mockの挙動／次の実装条件|
|---|---|
|広告なし・同意未取得・拒否|初期から枠を生成しない。計測allowと独立。広告なしのときに常設空白を残さない|
|遅延→表示|予定枠を先に確保、内容だけ置換。ゲーム/CTAを後押ししない|
|no-fill・エラー|当該page中は予約領域保持、次navigationでは生成しない選択。空白を消すことと全layout shiftゼロを同時保証しない|
|mobile Play|広告枠0。タッチ領域/成功直後/操作中へのoverlayなし|
|動画機会|将来の自然な区切り候補。任意rewardでない通常interstitialとは区別。今回はUI/SDK/本番試験なし|

## 9. 計測・意思決定の限界

[Cloudflare公式FAQ](https://developers.cloudflare.com/web-analytics/faq/)ではcustom events/UTM集計は未対応。Tinlumoはopt-inしたPortalページだけが対象で、004direct runtimeはAnalyticsなし。ページ閲覧を開始/完走/再訪者と見なせない。WAの保存期間の説明も実アカウントのデータ利用を証明しない。

|手段|可能な判断|不可／今回未確認|
|---|---|---|
|既存WA|許可されたページの利用・referrer・端末/性能の参考|全訪問者の開始率、D1/D7、004全プレイヤー、因果。実dashboard数値は今回未取得|
|Search Consoleが既存接続されている場合|検索露出/検索click/query/page|今回存在・設定・数値未確認。接続を作らない。ゲーム完走/広告収益は測れない|
|手動観察|操作数、迷いの地点、誤解、保存説明との一致|少数からCTR/売上向上を断定できない。外部初見はDEFERRED維持|
|後日のイベント追加|別承認・目的/最小化/同意設計後に開始/関連遷移等を検討|今回新SDK/ID/イベント送信を作らない。計測が揃うまでUI改修を延々続けない|

## 10. QA選択・未確認

Playbook §4.2に従い、source/buildを変更しないため全build/全ゲーム録画/全問再生を再実行しない。62配布hashと既存QAの対象manifest一致で再利用可否を確認。新規対象はReviewのレスポンシブ・ローカル遷移・文案リンク・広告mockの寸法/状態・既存物保全。実結果は [review-qa.json](evidence/review-qa.json)、[postflight.json](evidence/postflight.json)。

今回の新規QA：2方向×Home/Play×1366/390幅の8組は画像読込・overflow確認。360/768幅もAで確認、CTA高さ44px。B Playの広告7状態×2幅で期待枠数を確認。遅延→表示→no-fill→errorの同一ページ変更でgame X/Y/width、広告height250px、gap160pxが不変。これはmock寸法の検査であり実広告SDKのCLS測定ではない。キーボードEnterで実本番の拒否、mock設定の開閉を確認。mockは通信・永続保存なし。全focus順序やスクリーンリーダーの完全監査ではない。

`node tests/analytics-consent.mjs` を今回実行し **6 PASS / 1 FAIL**。同意/撤回/cross-tab/BFCache/保存拒否/preview guard/production projectionの6件はPASS。残りは `tests/analytics-consent.mjs:60` の `deployment:humanFinalGate` がblockerに含まれることを期待する旧テスト。actualは含まれない。`scripts/public-release-readiness.mjs:20` は `deploymentHold !== false` の場合だけ追加し、現行siteはHuman公開承認によりfalse。テスト・readiness・siteのGit差分0を確認。**分類：既存の公開前前提と現在の公開済み状態の不整合（今回資料差分との因果なし）**。同テスト後段の未到達assertionも今回PASSとしない。source/テスト/承認フラグは変更せず、監査のために公開前へ戻さない。`node --check` はReview JS/server PASS。

独立Astra read-only最終レビューで、比較用ロゴが既存SVGと異なる点、Article27例外の複合条件の省略、公開文案内の編集者向け表現を指摘。既存SVGへ統一、条件を具体化、保持期間を利用者向け日英文へ修正。広告導入や適法性をHuman承認でPASS化しない構造は維持。

未確認：今回の物理スマホ/実タッチ/実聴/200%ズームの本番網羅、障害注入の本番再試験、初めて操作可能となる時間/INP/FPS/実利用p75、利用者選好/需要/収益、provider契約/メール/住所/実削除、EU/UK適用/代表者/全世界適法性、広告資格/CMP実設定、第三者権利の完全調査。既存Human実機PASSは申告範囲を保持し、機種不明・他条件へ拡張しない。

Security：既知raw2FAILと限定Human判定を保持。今回は全project/index/history scannerを再実行しない（checkpointなし）。既存秘密を読んだり複製せず、配布の不変とReviewの外部通信禁止を確認。新規のSecurity全面PASSは宣言しない。Preview Access/Analytics OFF・Cloudflare設定は変更0、再照会していないため現在のaccount設定は過去postflightのR。

資料本文は本書、REVIEW.html、NEXT_BATCH.mdの3点。追加はコード/機械証拠/静止画だけ。一時browserは競合タブを終了。提出previewはloopback4380のみ、PIDは [server.json](evidence/server.json)。停止はNEXT_BATCH末尾。既存の4364〜4373等のプロセスは停止しない。

**TINLUMO_AUDIT_AND_CHANGE_PLAN_READY / HUMAN_SCOPE_DECISION_PENDING**
