# Tinlumo Protected Preview — postflight

**PROTECTED_PREVIEW_DEPLOYED / PUBLIC_RELEASE_PENDING**。主担当 gpt-6-astra。Human実環境レビュー待ち。

- 試遊: [日本語](https://preview.tinlumo.com/ja/) / [English](https://preview.tinlumo.com/en/)。許可済みのCloudflareアカウント1件でログインする。新しいゲーム用accountや別メール許可は追加しない。
- Worker: tinlumo-preview。Version: 590239ba-da9d-43b4-835a-57c165fb6e65。Deployment: a75b3b1b-71fe-4abd-93e8-699343c428f2。
- Checkpoint: f43c4cdfb4d3bad792e681d6eee5a9af212e942d。HEAD / origin/main / actual remote main一致。今回1 commit / 通常FF push1回。
- [manifest](distribution-manifest.json):49ファイル、採用RC48ファイルbyte同一＋配布headers。配布rootは .cache/tinlumo-protected-preview-r1。アップロード46変更＋既存2 asset、headersは配信設定。source/configはcheckpointの config/release-preview と scripts/preview-*。

## QAと未確認

日英通常導線、3作品起動/初操作/最初の面クリア、Two Ways第2面、再読込保存再開、作品間移動、ミュートcheckbox、Hakorilo BGM on/off操作、メニュー中入力停止/復帰、390×844の全3作品と844×390横画面、親/iframe noindexを確認。ブラウザ上のQAであり実機/聴感PASSではない。QA用にこのChromeの進行は保存済み。Humanは必要なら面一覧から開始面を選択する。自動消去しない。loopbackの保存は別originで自動移行しない。

匿名59要求はAccess/HTTPSへ転送、ゲーム本文非取得。workers.dev/今回version previewは404。認証後は欠落ページ・内部report・source設定・比較音源の404本文を確認。検査したゲームpage consoleにwarn/errorなし。認証後raw HTTP header/cacheの独立取得は未実施だが、配布_headersと実際のiframe表示は確認。

Hakorilo12,288,044-byte BGMの低速/失敗試験は既存の1Mbps/150msシミュレーションを同一byte根拠で再利用（[証拠](../soft-launch-rc-r1/release-final-r1/browser-results.json)）。BGM待ち/失敗でも入力・保存を継続した。今回の実CDNに対する故障注入、実回線、iPhone/Android、Human聴感、実機background復帰はNOT TESTED。外部初見DEFERRED / NOT TESTED、Human RC Acceptance PASSを保持。

## 自己修正: エッジでの計測挿入

認証後HTMLにCloudflare Insights beaconを検出。採用RCには存在せず、Web Analytics site一覧は0件。既定有効化の起点はUNKNOWN。修正前QAで計測通信が発生した可能性はあり、実送信件数/内容/保持はUNKNOWN。工程全体のAnalytics通信0とは報告しない。

確認環境だけのConfiguration Rule「Tinlumo preview - disable RUM」を作成し、式 (http.host eq "preview.tinlumo.com") / set_config / disable_rum:true / enabled:true をAPI読戻し確認。管理画面から適用、事前API試行は認証エラーで未作成を確認。Free10件枠の1件。apex/wwwや他設定を含まない。日英6Playページの親/iframeとEnglish Homeでbeacon0を実DOM確認した。配布物/version/checkpointは変更なし。設定の正本控えは config/release-preview/disable-rum-rule.json（postflight未commit）。[公式設定](https://developers.cloudflare.com/rules/configuration-rules/settings/) / [Free枠](https://developers.cloudflare.com/rules/configuration-rules/)

## 外部操作と費用

本工程全体では保護確認用空ページWorker作成、previewだけのCustom Domain/DNS/TLS、確認環境AccessのHttpOnly強化、今回RC upload/deploy、previewだけのRUM停止ruleを実施。Accessアプリ/メール1件AllowはHumanが作成。Workers Free / Zero Trust Free、追加固定費USD0、Paid変更なし。DB/R2/SSR/bindingsなし。一般公開、apex/www、Email Routing、support、Registrar、課金/広告の有効化はなし。

## 停止・rollback

同じWorkerの非ゲーム空ページへ戻す場合、repo rootから次を使用する（このpostflightでは未実行）。

```powershell
$env:WRANGLER_SEND_METRICS = 'false'
node .cache/tools/wrangler-r1/node_modules/wrangler/bin/wrangler.js rollback 291b1c29-5047-43ed-aab5-3d5901055ad1 --config config/release-preview/wrangler.json --message "Return Human preview to empty check page"
```

Access・workers_dev=false・preview_urls=false・RUM停止ruleを維持。経路自体を閉じる場合は、tinlumo-previewのSettings > Domains & Routesで今回のpreview.tinlumo.com Custom Domainだけを解除する。他DNSや保存データは操作しない。Accessを外して復旧しない。今回のRUM停止ruleも、previewを提供する限り維持する。

## 保存状態と残件

Securityは識別子2件のHuman限定承認を別記録。検出時raw FAIL4を保全、値省略後の実scanはraw FAIL2（既知SHA/TLS）。index/hook/history PASS、scanner例外・hook変更なし。

postflightとCurrent/配信手順/RUM設定控えはcheckpoint後の未commit成果。今回のcommit/push許可は消費済み、追加commitなし。無関係untracked13件を保全。一般公開checkerはBLOCKED。公開運営者/問い合わせ/法務・権利/データ方針/実機と公開承認は引き続き別Gate。
