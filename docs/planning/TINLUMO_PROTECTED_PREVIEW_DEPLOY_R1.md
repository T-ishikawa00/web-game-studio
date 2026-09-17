# Tinlumo Production Deploy R1 — protected preview

最新結果: **PROTECTED_PREVIEW_DEPLOYED / PUBLIC_RELEASE_PENDING**。[postflight](../qa/production-deploy-r1/POSTFLIGHT.md)を参照。checkpoint後にpreview限定RUM停止ruleを追加し、実ページbeacon0を確認。以下はcheckpoint時点の準備・履歴。

2026-09-17。主担当 `gpt-6-astra`。**HUMAN_DISPOSITION_APPROVED / ACCESS_PROTECTION_VERIFIED / PUBLIC_RELEASE_PENDING**。今回のpreflight-status内2件はHumanがFALSE POSITIVE / NON-CREDENTIAL / APPROVEDと確定。識別子値は保存用レポートから省略し、scanner/hookを変更せず再検査する。検出時のraw FAIL4は[停止履歴](../qa/production-deploy-r1/security-blocker.json)、限定承認は[判定記録](../qa/production-deploy-r1/security-disposition.json)へ分離。checkpoint/push/RC配信はこれから実施する。

## 現在の確定状態

- HumanがAccessアプリとAllowポリシーを保存済み。App `value omitted`、policy `value omitted`。対象はpreview.tinlumo.com全体、確認済みメール完全一致1件、既存Cloudflare IdP限定、24h、Bypass/Service Authなし。確認環境だけのHttpOnlyを有効化し、API読戻しで確認。
- Wrangler認可はHuman完了。対象account一致、account:read / user:read / workers_scripts:write、Wrangler自動付加のoffline_accessを確認。認証情報は標準ユーザー側保存先、Repo/配布物へ転記なし。追加scope認可なし。
- Worker `tinlumo-preview` を機密なし空ページだけで作成。空ページversion **291b1c29-5047-43ed-aab5-3d5901055ad1**、deployment **14d52142-a0fd-4efa-a680-2b4a36c84f68**。初回RCに問題があれば戻す非ゲーム版。
- Custom Domain **preview.tinlumo.com**、ID `9d69118b17da5fb84c2971cefb339d329056bce5`。専用DNS/TLSを管理画面から作成。apex/www/mail/Registrar変更なし。Workers Free/current plan $0を管理画面で確認、Zero Trust Freeも確認済み。
- [匿名59リクエスト](../qa/production-deploy-r1/anonymous-protection-check.json) PASS。HTML/JS/画像/音源/iframe直URL/内部資料候補/HEAD/RangeはAccessへ、HTTPは安全なredirect。許可アカウントの認証済みChromeで空ページ本文を確認。Accessのログイン画面をゲーム200と扱っていない。
- [別URL検査](../qa/production-deploy-r1/bypass-protection-check.json)でworkers.dev/初期version previewは404。APIのenabled/previews_enabledは両方false。version metadataのhas_preview=trueはrouting許可ではない。
- 現在ゲームの外部uploadは0。RC採用48ファイル同一＋headersの49ファイルをcheckpoint後にuploadする。独立review修正完了。一般公開checkerはBLOCKEDを維持。

本工程はHuman限定の認証付き検証。一般公開用の[Release Decision Pack](TINLUMO_RELEASE_DECISION_PACK_R1.md)と公開checkerはBLOCKEDを維持。名称・全57問・Art/Motion/Audio・game ID/save key/schema・日英運営草案・既存の公開承認欄は変更しない。前工程の[domain/本番計画](TINLUMO_DOMAIN_AND_DEPLOY_READINESS_R1.md)は履歴として保全し、本工程では本番SEO/Analytics包装を使わない。

## 開始時の確認（履歴）

- local HEAD / origin/main / actual remote main: `14cb803243eceba9138f35dd4d6b7c46bd46c490`。
- 接続Cloudflareアカウント内のtinlumo.com: active / Free Website / paused=false。確認したアカウントのログインメール1件だけをAccess許可対象にする。登録者氏名・住所、認証値を配布物/報告へ転記しない。
- Workers=0、Workers Custom Domains=0、DNS records=0。作成直前に再確認する。既存の同名Worker/DNS/Access appとの衝突は停止。
- Access組織API: `access.api.error.not_enabled`。現在は認証保護未成立。アカウントsubscription APIはAuthentication errorで取得不能。zone Freeの確認をAccess/Workersの契約確認へ拡張しない。Workers settingsのdefault_usage_modelはstandardで、これ単独でもFree契約確認にならない。
- Worker作成、upload、deploy、DNS/TLS変更、Access作成、一般公開、Paid移行はまだ0。

追確認：Humanが「Free初期設定完了」と報告。APIでZero Trust組織開通、`tinlumo.cloudflareaccess.com`、既定Cloudflare IdP1件、Access apps0件を確認。管理画面にも「ゼロトラストフリー」を確認。subscription API取得不能は残すが、Freeは管理画面で確認済み。Accessアプリ作成APIは1010/detailなしで失敗し、一覧読戻しで未作成を確認。原因を認可不足等と断定せず、権限拡張・security設定変更は行わない。

ブラウザ管理画面にpreview.tinlumo.com/Path空欄、Tinlumo Human Preview、24h、既定Cloudflare IdP限定、Allow Emails完全一致1件のdraftを入力済み。ブラウザ操作規定の保存時確認待ちで、ポリシー/アプリとも未保存。

## 本人操作（完了済み・次回ログイン手順）

1. [Zero Trust dashboard](https://one.dash.cloudflare.com/)で対象アカウントの初期設定。team名、Free選択、本人同意、画面が要求する場合の支払情報はHuman本人が扱う。公式setupではFreeにも支払情報が必要、Freeは請求なし。課金する選択は停止。Freeの確認結果をread-backする。[Setup](https://developers.cloudflare.com/cloudflare-one/setup/)
2. Wrangler認可は再発行後にHuman完了。前回の認可要求は時間切れだった。OS keyring backendはrepo内へ導入してもWranglerから未認識だったため、global installせず標準保存方式を使用。認証値はRepoへ保存しない。
3. Accessは既定のCloudflare IdPをそのまま使う。HumanがCloudflareアカウントで最初のログインを行う。OTP/provider追加やアカウント全体のログイン設定変更はしない。自動QA用に別email/Service Auth/Bypassを追加しない。[Cloudflare IdP公式](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/)

## 配布物・ローカル検証

- 既存build `.cache/rc-dist` と[checkpoint manifest](../qa/soft-launch-rc-r1/checkpoint-r1/distribution-manifest.json)を再利用。RC48ファイル全byte一致。
- `node scripts/preview-prepare.mjs` はmanifest照合後、別フォルダ `.cache/tinlumo-protected-preview-r1` へ48ファイルをコピーし、[確認環境用_headers](../../config/release-preview/_headers)だけを追加する。既存出力は一致確認のみ、不一致なら停止。旧build/証拠を再生成しない。
- [新manifest](../qa/production-deploy-r1/distribution-manifest.json)は49ファイル。最大12,288,044 bytes、Free制限20,000 files / 各25 MiB内。`_headers`は配信設定ファイルであり通常の公開assetではない。
- 全HTML noindex、Analytics/広告なし。SAMEORIGIN + frame-ancestors selfで同一originゲームiframeを維持。private/no-storeはbrowser cacheの方針で、Accessの代わりにならない。Cloudflare内部asset cacheにも認証を先行させる。
- `node scripts/preview-audit.mjs`: 49ファイルallowlist、不要fixture/source/comparison除外、noindex、Analyticsなし、Gitleaks配布scan0件。配布scan0件と全projectを分離。検出時の全projectはraw FAIL4（既知SHA/TLS2件＋今回承認済み識別子2件）。変更後の検査結果はsecurity.jsonで時点を分離。既知SHA/TLSの別判定は維持し、新規候補へ適用しない。
- `node scripts/rc-preserve.mjs`: 1,690ファイルと凍結runtime一致。既存保存/BGM低速・失敗QAは配布byte一致により再利用。回線シミュレーションを実回線/実機PASSにしない。
- Wrangler **4.133.0**をrepo内 `.cache/tools/wrangler-r1` に版固定導入。root package/lockは不変。metrics disabled。`deploy --dry-run --config config/release-preview/wrangler.json` PASS。表示の88はrecursive readdirのディレクトリを含む件数で、実ファイル49と区別する。dry-runのno-op-worker出力はWrangler内部包装で、SSR/custom authの追加ではない。
- dry-runはCloudflare保護/実配信の試験ではない。空ページでの実URL保護確認は別に完了。RC配信後のゲームQA、PC/スマホ実機、聴感はこのcheckpoint時点ではNOT TESTED。
- 保護確認用の非機密空ページは `config/release-preview/protection-check` の3ファイルだけ。`wrangler.protection-check.json` を使ったdry-run後、同じWorker/hostnameへ配信し保護確認済み。RCのuploadはまだ行っていない。
- 独立reviewの2指摘（audit時の実tree/hash検証と元manifestのGit由来確認）は局所修正済み、再reviewで追加指摘なし。以前のfull index/history scanはPASSだったが、最新stage候補には適用しない。Human限定承認後、値を省略した候補のfull index/hook/history検査を改めて実施する。

## 保護を先に成立させる実行順

1. Human初期設定後、対象account/Free/zone/全Access apps/同名Worker/DNSを再確認。Freeが確認できなければ停止。
2. preview.tinlumo.com全体、Path空欄のself-hosted Access appを作成。AllowはHuman確認済みemail完全一致1件。Everyone、email domain全体、Bypass、Service Authなし。他site/アカウント全体のpolicy変更なし。
3. 既存Cloudflare IdPだけをこのappのログイン方法に指定。Login Method/アカウント全員だけをAllow条件にしない。`allow_iframe`も同一originでのゲーム表示に合わせて確認。[policy pitfalls](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/common-policies/)
4. 機密もゲームも含まない空ページだけでtinlumo-previewを作成し、workers_dev=false / preview_urls=falseを設定・読戻し。preview.tinlumo.comだけCustom Domain接続。自動DNS/TLS作成以外のapex/www/mail/Registrarを変更しない。
5. 未認証でhost全体のHTML/JS/image/audio/direct iframe相当URLが拒否され、Humanログイン後に空ページだけを表示できることを確認。Access loginの200をasset取得成功としない。保護未成立ならここで停止、ゲームuploadなし。
6. source/config/manifest/scope/保存状況を再確認し、全project・full index・historyのSecurityを実施。今回許可の1 checkpointだけをcommit、Private origin/mainへ通常fast-forward push1回。remote想定外進行は停止。前工程の無関係untracked13件は除外保全。commit直後/直前push/直後pushのref一致を記録。
7. 当該commit内manifestと49ファイルを再照合し、`node .cache/tools/wrangler-r1/node_modules/wrangler/bin/wrangler.js deploy --config config/release-preview/wrangler.json` で同じWorkerへassets-only upload。現設定にはroutesを含めず、確認済みCustom DomainをAPI/dashboardで管理する。意図しないroute削除等の表示があれば停止して設定を確認する。
8. Worker version/deployment ID、custom domain、subdomain disabled両項目、Access exact-email policyを読戻し、postflightへ保存。認証情報・cookie・OTPは保存しない。

## 実URL QA / Human確認

試遊URL `https://preview.tinlumo.com/ja/` / `/en/`（このcheckpoint前は保護確認用空ページだけ、ゲーム切替後に試遊可能）。Cloudflareログインへ転送されたら許可されたHumanアカウントでログイン。既に同アカウントへログイン済みなら自動復帰する場合がある。未認証は全48asset、GET/HEAD、音源Range、game iframe直URLも遮断。workers.dev/version previewは無効。HTTPからのゲームbody配信なし、HTTPS証明書確認。

認証後は日英Homeから3作品、起動/初操作/代表面クリア、再読込と作品別保存再開、作品間移動、mute/BGM/SFX、離脱復帰、portrait/landscapeを確認。Hakorilo BGM pending/failでも操作・保存継続、認証後404、内部fixtureの404、MIME/headers/cache、console/networkを確認。実機を操作できなければNOT TESTEDのままHumanへURLを渡す。localStorageはorigin依存であり、loopback保存がpreviewへ自動移行するとは説明しない。

## 費用・停止・rollback

Workers Static Assetsの静的request/asset保存は追加料金なし、Access Freeは最大50 users/月額$0。今回は1名、Paid/DB/R2/Analyticsなし。subscription APIは取得不能だが、実アカウントのWorkers Free/current planとZero Trust Freeを管理画面で確認した。[Static limits](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) / [Plans](https://www.cloudflare.com/plans/)

失敗時は同Workerの既知正常versionへrollback。初回RCに正常版がなければ保護された空ページversionへ戻すか、今回作ったCustom Domainだけを解除し経路を閉じる。Accessは維持、workers.dev/previewは無効を維持。DNS/cache反映中もAccessを外さない。今回作成したresource IDと変更前状態に限定して復旧し、既存DNS/保存データを消さない。止め方を確認せずAccessだけを削除しない。

## 完了条件

認証付きRC配信と実URLの対象QAが成立した後のみ **PROTECTED_PREVIEW_DEPLOYED / PUBLIC_RELEASE_PENDING**。一般公開の権利/運営/データ/実機範囲/公開承認は別。外部初見DEFERRED / NOT TESTED、Human RC Acceptance PASSを維持。このcheckpoint作成時点では保護した空ページのみ配信済み。RC配信結果・実URL QA・SHA/versionの対応はcheckpoint後postflightへ記録する。
