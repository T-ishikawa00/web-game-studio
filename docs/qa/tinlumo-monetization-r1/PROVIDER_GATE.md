# Tinlumo Monetization — Provider / Approval Gate R1

## 最新Human更新 — 2026-09-21 / AdSense審査待ち

**ADSENSE_SITE_REVIEW_PENDING / HUMAN_PROVIDER_ACTION_PAUSED_UNTIL_REVIEW_RESULT**。以下の状態はHuman報告に基づく。CodexによるGoogle管理画面の代理観測ではない。後段の初回手順・旧状態は履歴として保持し、この最新更新を優先する。

|対象|最新状態|
|---|---|
|Publisher|既存AdMob連携Publisher / AdSenseを使用。新規アカウント作成なし|
|AdSense for Content|tinlumo.com追加済み。旧「サイトメニューなし・登録前」は解消。アカウント全体の承認完了は推定しない|
|所有権確認|Human PASS。本番meta反映とは別にGoogle側確認が完了|
|サイト審査|準備中 / 審査待ち。Ready / 審査PASSではない|
|Google CMP|作成済み。第一画面「同意しない / 同意する / オプション管理」を採用。公開状態・対象地域・言語・Privacy URL・最適化設定・本番表示は未確認|
|H5 Games Ads|未申請 / 未承認|
|実広告|未配信。実SDK・CMP通信・収益性の技術PASSなし|

### 現在の停止条件と、審査後の順序

今は追加のGoogle操作を案内しない。AdSense審査結果を待つ。自動監視は設定しない。旧手順01から再開したり、site削除・再登録・重複upgradeを行ったりしない。

1. Humanからサイト審査結果を受け取る。Ready / PASSなら次の準備へ。Needs attentionなら指摘内容だけを整理し、追加申請・本番修正は具体的な承認後に行う。
2. PASS後にH5申請内容と最新条件を確認し、Humanに次のGoogle操作を1つずつ提示する。申請送信は別途明示承認が必要。今回の「PASS後へ進む前提」は自動送信許可ではない。
3. H5承認・条件確認を経て、Google CMPの公開状態、地域/言語、拒否/再選択、Privacy文面、Auto ads状態を確認する。既存CMPを重複作成しない。
4. 限定した実SDK test mode・CMP通信試験の差分と試験条件をレビューし、通信許可後に検証する。H5承認、実SDK試験PASS、本番配信承認を別々に記録する。
5. 未解決の復帰/同意問題を閉じてから、Hakoriloの1作品・1形式の本番接続をHuman Gateへ出す。通常AdSense承認だけでH5を有効にせず、Auto adsで代替しない。

### ローカル整合確認とSDK接続準備

2026-09-21に現行sourceを読み直した。今回は受入済みmockを維持し、以下を接続前の確認表として固定する。Google信号を推測で実装へ結び付けない。

|論点|現在の実装 / 判定|次の接続時のQA|
|---|---|---|
|CMPと広告要求|`monetization-r1/pilot.ts` の独立mock keyと4状態は認定CMPではない。`core.ts` はallow以外でskip。Google CMPへの変換は未実装|未決定・拒否・取得失敗・撤回で新しい広告要求0。オプション管理を開くだけではallowにしない。目的/vendor等の必要条件を確認し、部分同意を一括allowへ変換しない|
|Analytics opt-in|広告mockは既存Analytics keyを利用しない|広告の同意/拒否とAnalyticsの許可/拒否を交差させ、どちらも他方を上書きしない|
|CMP作成と稼働|作成済みはHuman確認、公開・実ページ表示はUNKNOWN|対象site、日英、地域、Privacy URL、再選択/撤回、最適化設定を確認。CMP通信・SDK取得・広告要求・計測を分離して記録|
|発火と復帰|成功・保存後Next、requestingとshowingを分離。mockは取消/後着を試験済み|保存失敗・拒否・無在庫・例外で次へ進む。表示後は入力/音/保存を復帰し、重複callbackで二重進行しない|
|実SDKの重要残件|`h5Contract.cancel()` はfalse。現Boundaryのwatchdogは取消不能時にログを残すだけでrequestingを解除しない。**mock用Boundaryへ実driverを差し替えるだけでは接続不可**|取消不能要求の無応答・撤回・遷移・後着について、ゲーム継続と遅延広告の抑止を両立できる経路を設計・検証する。単純timeout解除で解決済みにしない|
|配布の隔離|`assertMode` はdisabled/mockのみ。loaderなし。ローカルserver CSPは外部SDKを許可しない|実SDK試験は別の限定候補で行う。現ReviewのCSPや本番設定を先に緩和しない|
|採用UX|Hakorilo Next、安全な外枠のみ、Mobile面積維持、Home/運営ページ無広告、無料機能維持、Rewarded追加なし。MAGNET区画/進化/Boss直後なし|実形式、無在庫、地域別CMP、実機で採用条件を再確認。Googleの在庫選択を動画保証としない|

公式一次資料を再確認：Googleの作成手順はSave draftとPublishを区別し、実ページ用AdSenseコードも前提にしている。[CMP作成](https://support.google.com/adsense/answer/10960768?hl=en)。EEA / UK / Switzerlandのパーソナライズ広告には認定TCF CMPが必要だが、認定は法的適合全体の保証ではない。[認定要件](https://support.google.com/adsense/answer/13554116?hl=en)。Google test modeは実広告要求をせずに試せるが、ID設定の正しさを証明しない。[SDK試験](https://developers.google.com/ad-placement/docs/test)。今回はいずれのSDKも読み込んでいない。

今回の変更はローカル文書・Reviewのみ。コード/build対象の変更がないため再build・ゲームQA・録画・全project Security再走は行わず、文書/リンク/差分と既存ファイルのhash保全を検証する。過去のSecurity raw既知2件FAILは維持し、今回の新規scan PASSとは報告しない。主担当実モデル `gpt-6-astra`。main / HEAD・ローカルorigin/main `337f545fc099a60ed74b5abdcbe4511cbc6eed75`、index空、remote再取得なし。stage / commit / push / deploy / 外部申請 / CMP公開 / 実SDK通信0。以前のmeta追加限定許可は完了済み。

---

## 以下は初回Provider Gate準備時の履歴

2026-09-21。**TINLUMO_MONETIZATION_PROVIDER_GATE_READY / HUMAN_PROVIDER_ACTION_PENDING**。

最新Human判断：**HUMAN AD UX ACCEPTANCE — PASS**。これは広告UXパイロットの受入であり、Google審査・実SDK・CMP・実配信・収益性のPASSではない。今回の成果は公式資料に基づく手順書とローカル記録。Google管理画面へのログイン・変更・申請送信は行っていない。

## 1. 採用事項と現在地

- Hakoriloは成功・保存完了後、利用者が「次へ」を選ぶ境界を動画広告候補とする。
- 外枠はゲーム外へ安全に置ける場合の補助候補。Mobileのゲーム面積・操作性を損なう外枠は表示しない。
- Home / Privacy / Terms / Contact等に広告を置かない。広告なし・無在庫・拒否・失敗でも通常プレイを継続する。
- 既存無料機能を広告必須にせず、Rewarded用の通貨・復活・shopを追加しない。
- PROJECT MAGNETは毎区画・進化・Boss撃破直後には入れない。将来もMission全体終了等の大きな自然な区切りだけを候補にする。
- 旧ReviewのUX PENDINGは過去時点の記録。本書のPASSは上記UX方針に限定し、その他の未確認を解除しない。

|Gate|現在の証拠・状態|通過を示す証拠|
|---|---|---|
|既存Publisher / AdSense|あり。AdMob側GoogleアカウントでAdSenseへログイン可能（Human報告）|この確認は完了。IDの共有は不要|
|Web向けAdSense for Content|有効化未確認。「サイト」「広告」メニューなし（Human報告）|Googleのupgrade確認メール・アカウント状態。ログイン可能だけでは足りない|
|tinlumo.com|サイト審査未申請・未承認|Sitesの対象domainがReady|
|H5 Games Ads|未申請・未承認|Googleから対象PublisherへのH5利用承認|
|CMP|未公開・実接続未検証|設定・公開状態、実地域/同意状態に応じた通信と復帰の検証|
|実配信 / 収益性|未接続・未検証|別途Human公開承認と実測。mock成功は含めない|

新規AdSenseは作成しない。既存AdMobアプリ、既存Publisher、支払情報を閉鎖・移行・変更しない。Tinlumo用Googleアカウントへの管理招待は必要な場合だけの後工程で、Web有効化の前提ではない。

## 2. 公式資料で確認できた経路

### 既存AdMob連携PublisherをWeb向けにする

GoogleはAdMob用に作成されたAdSenseへ **AdSense for Contentを追加するupgrade申請**を案内している。入口はAdSense開始ページのGet startedで、AdMobに紐づく同じGoogleアカウントを使う。申請フォーム、Start using AdSense、サイト接続へ進み、成功時に確認メールが届く。新しいPublisherを作る案内として解釈しない。[公式upgrade手順](https://support.google.com/adsense/answer/6023158?hl=en)

メニュー欠如の原因は今回の公開資料だけでは確定できない。未有効化の可能性はあるが、権限・画面構成・保留状態も実画面未確認。既存アカウントへ戻される、別アカウント作成が出る、既存アカウント警告が出る場合は、そこで表示文言を確認し、別Googleログインで新規作成して回避しない。

別Googleアカウントの管理は既存AdSenseのAccount → Access and authorization → User managementからの招待が公式経路。招待先は別の有効または閉鎖済みAdSenseに紐づいていない必要がある。これは共有管理のための後工程であり、今回の招待実行はない。[公式ユーザー追加](https://support.google.com/adsense/answer/2659101?hl=en)

### H5の要件と現在の申請先

H5は現在も申請制。HTML5ゲームのinterstitial / rewardedを対象とし、配信には承認済みAdSenseが必要。Googleによるpartner eligibility審査があり、承認保証はない。確認した公式申請ヘルプと公開フォームには、最低PV・最低ゲーム数・合格日数の確約を見つけられなかった。[H5申請ヘルプ](https://support.google.com/adsense/answer/1705831?hl=en)

公式ヘルプの旧h5-betaリンクは、現在[H5 Games Ads申請フォーム](https://adsense.google.com/start/h5-game-ads-apply/?src=help-center)へ転送される。公開フォームで確認できる項目はAdSense有無、氏名、連絡先、事業名、国、サイト、事業者種別/役割、Publisher ID、収益化計画、連絡に関する選択。実情報はHumanがGoogleへ直接入力し、自由記述へ個人情報を混ぜない。個人運営でCompany欄の適切な記載が不明なら、法人を捏造せずGoogle確認対象にする。公開HTMLにある汎用エラー文は、送信失敗を実観測した証拠ではない。

フォームはAdSenseの有無を尋ね、ヘルプは配信時にapproved AdSenseを要求する。**サイトReadyがH5フォーム送信の一律必須条件とは公開資料から断定しない**。Tinlumoでは状況を誤記しないため、Content有効化・サイト審査状態の確認後にH5を申請する順序を推奨する。H5固有の条件、収益分配、対象domain、サポート窓口は承認時の通知/契約で確認する。

### 通常AdSenseとH5の役割

|経路|役割|Tinlumoへの適用|
|---|---|---|
|AdSense for Content|Webコンテンツの広告枠|安全な外枠1個の補助候補。Googleはゲームから150px以上離すかゲームページから除去することを強く推奨。候補160pxと狭幅省略を維持|
|H5 Games Ads / Ad Placement API|自然な区切りの全画面interstitial、任意rewarded|HakoriloのNext候補。通常display unitをmodalへ入れて代用しない。Rewardedは今回なし|
|AdMob|既存ネイティブアプリの広告|Publisher起点として利用。既存App Storeアプリのad unitをWebへ流用しない|

[ゲームページの通常広告配置](https://support.google.com/adsense/answer/2768340?hl=en) / [H5形式・自然な区切り・同一AdSenseコード](https://support.google.com/adsense/answer/9959170?hl=en)

H5 interstitialはdisplayとvideo両形式を扱う。Humanが採用した「動画候補」は毎回動画が配信される保証ではない。video限定の可否・設定は承認後に確認する。APIは表示機会を受け、在庫等により実表示を判断する。[Ad Placement API](https://developers.google.com/ad-placement)

## 3. tinlumo.comサイト審査の要件

|確認対象|公式の要求とTinlumoの準備|
|---|---|
|申請者・所有|18歳以上等の資格、独自コンテンツ、サイトHTMLへアクセスできること。既存AdMobの稼働をWebサイト審査の合格証拠にしない。[資格](https://support.google.com/adsense/answer/9724?hl=en)|
|内容・操作|独自で価値ある内容、分かりやすいnavigation。4作品/57問/MAGNET18区画は説明事実であって合格数値ではない。審査目的の薄い記事量産やダミー広告ページは追加しない。[サイト準備](https://support.google.com/adsense/answer/7299563?hl=en)|
|ポリシー|権利、禁止コンテンツ、無効traffic/自己クリック禁止、広告由来のデータ利用のPrivacy開示等。実広告を入れる前に現行「広告なし」文面と将来の実処理を整合させる。[Program policies](https://support.google.com/adsense/answer/48182?hl=en) / [Publisher policies](https://support.google.com/adsense/answer/10502938?hl=en)|
|接続・審査|公開サイトへGoogleが到達でき、所有確認後にRequest review。対象はtinlumo.com。protected Previewやlocalhostを申請せず、Preview Accessを外さない。[サイト接続](https://support.google.com/adsense/answer/7584263?hl=en)|
|完了状態|Requires review / Getting ready / Needs attention / Readyを区別。必要なaccount setup未完了では審査が進まないことがある。通常数日、2–4週の場合もあるが保証ではない。再登録連打はしない。[状態の意味](https://support.google.com/adsense/answer/12170222?hl=en)|
|ads.txt|販売者の認証。一般案内では強く推奨されるが一律必須とは書かれていない。Authorizedとsite Readyは別。将来は管理画面の実Publisher行だけを使用。[ads.txtガイド](https://support.google.com/adsense/answer/12171612?hl=en)|

所有確認はAdSense script / ads.txt / meta tagの公式選択肢がある。**今回の推奨は、実画面で選べるならmeta tagによる確認**。scriptなしで所有確認を準備できるため、Home無広告・SDK未接続の方針を保ちやすい。meta公開も本番変更なので未実行。選択肢が出なければ、その画面を確認して次の具体案を作る。ads.txtやmetaの設置だけで広告配信が始まるわけではない。

## 4. CMP / Privacy & messaging

EEA・UK・Switzerlandのパーソナライズ広告ではGoogle認定かつIAB TCF統合CMPが必要。GoogleのEuropean regulations message自体は認定CMPである。認定はプライバシー法全体への適法性を保証しない。NPA/limited adsと認定要件は区別し、非パーソナライズなら同意が一切不要とはしない。[GoogleのPublisher向け要件](https://support.google.com/adsense/answer/13554116?hl=en)

Google Privacy & messagingを**第一検証候補**とする。一般Web向けの公式作成経路は確認できるが、現在のアカウントで利用可能なメニューは未確認。サイト追加とAdSense code配置が公式手順の前提であり、AdMobで使っているapp用UMPをWebへ移植する手順ではない。[Google CMP概要](https://support.google.com/adsense/answer/16918505?hl=en) / [European message作成](https://support.google.com/adsense/answer/10960768?hl=en)

将来の設定案は、対象tinlumo.com、英語＋日本語、最初の画面にDo not consentを表示、各言語のPrivacy URL・文面確認、同意の再選択/撤回導線を用意すること。自動のconsent最適化は当初無効を提案し、Human確認済みの選択肢を維持する。これらは設定案で、Google画面へ保存していない。Save draftも外部変更、Publishは公開なので次回の許可範囲に含める。

通常のCMPダイアログでDo not consentを選ぶことと、広告要求がゼロになることは同義ではない。Googleは許容される場合にNPA/limited adsを扱う。Tinlumoのローカル方針では未決定・拒否・取得失敗時に要求しないため、実CMP信号と自社request gateを結び付けて試験する。Google CMP表示に必要な初期通信、広告SDK取得、広告要求、計測通信を個別に観測する。CMP設定だけでWA opt-inを置換・継承しない。

サイト審査フローにはCMP選択→SubmitでEuropean messageが自動生成される経路もある。これを無害な確認ボタンとして押さず、生成後の公開状態・適用先・defaultsを確認する。自動生成とPublishを同一視しない。適切な保留経路が画面上になければその場で停止し、未利用の第三者CMPを「利用中」と選んで回避しない。[接続フロー内CMP選択](https://support.google.com/adsense/answer/7584263?hl=en)

米州は別途US state regulations message / GPP / Do Not Sell or Share導線を検討する。Googleは適用州のGPCを直接受信してRDPにするが、これは全vendor停止や全米州法対応を保証しない。地域範囲は公開前に再確認する。[US message](https://support.google.com/adsense/answer/10961479?hl=en) / [GPC・RDP](https://support.google.com/adsense/answer/14182916?hl=en)

残る実接続Gate：H5とGoogle CMPの具体的な読み込み順、親/iframeの同意・表示責任、TCF信号到着前/撤回時の要求停止、SDKの取消不能/後着、無広告ページでの再選択導線、CSP/referrer-policyとの整合。一般AdSenseコードを使うので適合候補になるというのは設計上の推論であり、Hakoriloで検証済みではない。Referrer共有条件は公式作成手順にあるが、今回CSPやヘッダーを緩和しない。

AdSense参加自体は無料。[公式料金案内](https://support.google.com/adsense/answer/32850?hl=en)。現在のGoogle CMP固有料金・H5固有契約条件の確約はこの調査では得ていない。旧Funding Choices資料を現在の無償契約保証に使わず、Humanが現行UI/条件を確認する。有料CMP購入は計画に入れない。

## 5. Human操作台帳 — 1行ずつ案内する

**これは将来の案内順であり、現在の外部変更許可ではない。** 今回は手順の準備で停止。再開時は各行の結果を見て次の1行だけを提示する。日本語UIではラベルが異なり得るため、表示に合わせる。画面タイトル・メニュー名・状態文だけでよく、メール、Publisher ID、残高、支払/本人情報をこちらへ送る必要はない。

|順|Humanが行う1操作|結果と次の分岐|外部影響/停止点|
|---|---|---|---|
|01|AdMob用Googleアカウントを使用しているブラウザで[AdSense開始ページ](https://adsense.google.com/start/)を開く|既存アカウントの正式upgrade入口|読取り。現在案内するのはここだけ|
|02|Get startedを選ぶ|ログイン選択なら03、申請画面なら04、既存dashboardならメニュー/案内文を確認|申請入力・送信はまだしない|
|03|AdMobと同じGoogleアカウントでログインする|本人が行う。別Publisher作成案内や重複警告なら停止|認証情報をこちらに渡さない|
|04|表示された申請/upgrade画面の見出し・必要項目を確認する|Content追加経路か、既に有効か、保留かを判定|ここでWeb upgradeの具体的な申請内容を確定。未確認の画面で手順を推測しない|
|05|承認したupgradeフォームへ実情報を入力する|既存支払主体との一致、サイトtinlumo.com、規約を本人確認|**以降は別途upgrade申請承認後のみ**。新規AdSense作成禁止|
|06|Start using AdSenseを押す|account setup / site接続画面へ|申請・同意を含む操作。今回未許可|
|07|ホームの未完了setup項目を確認する|本人情報・支払等は必要な項目だけ本人処理。既存設定を不用意に上書きしない|追加入力/送信は項目ごとに範囲確認|
|08|tinlumo.comが未登録の場合だけAdd siteへ進む|upgrade時登録済みなら重複追加せず10へ|site登録承認後のみ|
|09|tinlumo.comを入力してSaveする|サイト接続カードが出る|外部登録。Previewや/ja/などのパスを別サイトとして申請しない|
|10|Connect your siteカードのLet's goを選ぶ|利用可能な所有確認方法が表示される|読取り。実画面の選択肢を記録|
|11|利用可能ならMeta tag方式を選ぶ|実アカウントのtagを本人の手元で確認|公開はまだしない。選べなければ停止して代案検討|
|12|所有確認用の最小本番差分をレビューする|Codexが別依頼で候補作成→Humanが公開許可→許可された担当が反映|**本番変更Gate**。今回tag実装/deployなし|
|13|公開後、所有確認完了をチェックしてVerifyを押す|成功なら14。不成功ならURL/tag/crawl状態を調査|外部検証。広告配信承認ではない|
|14|Request reviewを押す|Getting ready等の状態を記録|**サイト審査送信Gate**。今回未許可|
|15|CMP選択画面が出たら選択肢と説明を確認する|Google CMPを選ぶ際の生成/公開影響を確認|Submitはまだ押さない。第三者CMP利用を偽らない|
|16|Sitesでtinlumo.comの状態を確認する|ReadyとContent upgrade完了を別記録。Needs attentionは理由ごとに修正|繰返し削除・再登録はしない|
|17|[公式H5フォーム](https://adsense.google.com/start/h5-game-ads-apply/?src=help-center)を開く|現時点の項目とtermsを確認|この順番はTinlumoの推奨。Googleの一律site Ready前提とは断定しない|
|18|承認したH5申請内容を入力する|既存AdSenseあり、実Publisher、対象site、実際の事業規模を記入|**H5申請承認後のみ**。PV/収益を推測で埋めない|
|19|H5フォームのSubmitを押す|送信完了/Google連絡待ち。完了は利用承認ではない|今回未許可。契約受諾を含む場合は本人が判断|
|20|GoogleのH5審査結果と条件を確認する|明示承認/追加情報/不承認を区別|メール到着だけで承認としない|
|21|Privacy & messagingのEuropean regulations画面を開く|作成済みmessageと設定状況を確認|サイト追加後。表示されなければ利用可能と決め付けない|
|22|承認済みの対象site・言語・拒否導線・Privacy URLでSave draftする|公開前の文面/設定レビュー|**CMP設定変更Gate**。draft保存も今回はしない|
|23|必要なUS messageと撤回導線を設定・レビューする|GPP/GPC/RDPと自社方針を照合|法的適用・年齢・vendorはHuman判断。WA独立|
|24|限定SDK試験・CMP表示のための候補差分をレビューする|tag読込みとCMP起動、Auto ads無効、要求禁止を先に検証|**実SDK通信Gate**。ネットワーク許可なしに実行しない|
|25|対象messageのPublishを押す|公開対象・status・実ページ表示を確認|**CMP公開Gate**。無広告ページへ広告を出さない|
|26|実機・地域/同意・無在庫・失敗・音/入力/保存復帰の試験結果をレビューする|H5要求取消/後着等の未解決を閉じる|Google test modeでもSDK取得は外部通信。test成功は承認/収益ではない|
|27|1作品1形式のlive開始候補をレビューする|実ID/広告文/CMP/ads.txt/kill switch/Auto ads状態を確認|**本番配信Gate**。Humanの具体的承認後に限り実施|

Google側のtest modeは実広告の要求をせず広告あり/なしを試せるが、アカウントID設定の正しさは証明しない。今回の完全ローカルmockとも別物。[公式test mode](https://developers.google.com/ad-placement/docs/test)

H5承認待ちの間にCMPのローカル設計/文案は進められる。通常広告の承認だけでH5を配信せず、H5が通らない場合も既存無料ゲームを継続する。手順21以降は、事業者承認とHumanの通信・公開許可を実際のUI/依存関係に合わせて調整する。Auto ads / vignette / anchorを有効にしてH5の代わりにはしない。

## 6. 今回のQA・Git・未実施

変更対象は本書、既存Provider/Reportへの最新入口、Reviewの受入状態とリンク、Current、ローカル配信中ReviewのHTMLだけ。ゲーム、広告core、bridge、保存、SDK、Cloudflare/Preview、依存、広告設定は変更しない。主担当gpt-6-astra、CMPの独立read-only調査gpt-5.6-sol。外部資料はGoogle公式のみ、2026-09-21取得。非公開アカウントUIはHuman報告であり代理観測ではない。

文書QAとしてリンク・状態・停止点・差分・保全hashを確認する。コード変更なしのため既存215unit/専用14unitは前工程の証拠として保持し、今回は再実行しない。既知旧試作の型12errorsと全project raw Security既知2FAILをPASSへ変更しない。実機・実CMP・実SDK・サイト/H5審査・法的適合・収益性は未確認。

Git：main / HEAD a2f8d3985c02d15f2952a734c360b5a8ae761a70 / upstream origin/main、index空。既存差分・未追跡成果を保持。remote最新取得なし。新規プロセスなし、前工程のloopback Reviewを利用。外部送信・upgrade・H5申請・CMP公開・実SDK通信・stage/commit/push/deploy/LAN操作0。

最終照合：[provider-gate-verification.json](provider-gate-verification.json)。ゲーム等75ファイルの保全と文書リンクを対象とする。

**TINLUMO_MONETIZATION_PROVIDER_GATE_READY / HUMAN_PROVIDER_ACTION_PENDING**
