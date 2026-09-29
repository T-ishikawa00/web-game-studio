# ADSENSE_OWNERSHIP_META_DEPLOYED — HTML verification PASS

2026-09-21 JST。Humanが許可した所有確認metaだけを本番反映。

- Commit: `337f545fc099a60ed74b5abdcbe4511cbc6eed75`。main → private origin/mainへnormal push 1回。
- Worker: `tinlumo-production`
- Version: `8b2ec5aa-db79-48cd-b035-4d0d925eb4f6`、100%。
- Deployment: `273d663c-7fe1-4cf3-ad1e-0cafe9adde28`
- 確認URL：[root](https://tinlumo.com/) / [日本語Home](https://tinlumo.com/ja/) / [English Home](https://tinlumo.com/en/)

[配信照合](live-html.json)：配信63ファイルがcommit済みartifact bytesと一致。公開33ページのheadに指定metaがちょうど1個。残りのHTML・ゲームpayloadには追加なし。広告JS、Auto ads、実広告、CMP、Analytics consent、ゲーム本体、CSP/ヘッダーの差分0。所有確認のmetaのみでSDK通信や広告配信を開始しない。

[Cloudflare照合](cloud-postflight.json)：Preview deployment `a75b3b1b-71fe-4abd-93e8-699343c428f2` / version `590239ba-da9d-43b4-835a-57c165fb6e65` は不変。匿名Previewは302でAccessへ遷移。両Workerのworkers.dev・version Preview URLsは無効を維持。新規server/LAN/証明書/有料操作なし。

[対象QA](QA.json)：production build、local build、R2 integration4 PASS。33ページはmetaを除くと直前版にbyte一致、残り31ファイル不変。歴史的local候補は再build時の既存文案差分6ページを開始hashへ復元、64files最終一致。表示やゲーム本体を変更していないため追加録画・全編再試遊なし。

Security：全project rawは既知2FAILを保持、新規0。配布物・full index・commit hook・local history PASS。TLS鍵はignoredでindex/history不在。既知旧試作型12errorsは今回再検査/修正していない。scanner/allowlist/hook変更なし。

今回のcommitは37pathsに限定。前工程Current追記、Monetization Pilot/Provider文書、多数untracked成果を含めていない。配信後のこの記録とCurrent追記はローカル未commitのまま保持し、許可を2回目のcheckpointへ転用しない。

主担当・独立read-onlyレビュー：`gpt-6-astra`。Cloudflare / Wranglerスキルを使用。Google側のVerify・Request review・H5申請は実行していない。タグ公開はサイト審査・H5・CMP・実配信・収益性のPASSではない。
