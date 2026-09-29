# Consent Architecture R1 — Human acceptance / Security disposition request

2026-09-21。C案は **HUMAN ACCEPTED CANDIDATE**。初回Analyticsバナーなし、未選択default OFF、明示設定からの許可だけでON、Google広告/CMPとは別管理、必要地域ではGoogle CMPだけを初回表示する候補。Aの全地域通常計測は不採用。過去に保存されたallow/denyを維持する候補であり、過去のallowを無条件ONへ変えたものではない。本番への移行、法務適合、Google CMP稼働、実SDKの受入・公開承認を含まない。

**HUMAN_SECURITY_DISPOSITION_PENDING**。以下は推奨判定だけで、4件のHuman承認は未取得。既知SHA/TLSの承認は適用していない。

## 候補4件

|候補 / file|detector / type|tracked / untracked / ignored|分類|Git index / local history / distribution|検出理由|推奨disposition|
|---|---|---|---|---|---|---|
|SEC-C1 — `.tmp/consent-r1/before.json`|Gitleaks 8.30.1 / `generic-api-key`|trackedなし / untracked / ignored（既存 `.tmp/` 規則）|generated artifact / QA evidence：ファイル保全台帳。application sourceではない|台帳file：indexなし、全local refs履歴なし、配布なし。同一文字列：indexの既存QA5paths・履歴6pathsにあり。ローカル過去QA配布にあり。本番/C候補配布なし|`docs/qa/public-deploy-go-r1/access-postflight.json` をkeyとするSHA256。key内の`access`と続くハッシュを汎用API-key検出器が検出。参照元の再計算と完全一致|**FALSE POSITIVE / NON-CREDENTIAL**。このfile・field・生成由来に限定したAPPROVEDを推奨。現在PENDING|
|SEC-C2 — `.tmp/consent-r1/before.json`|Gitleaks 8.30.1 / `generic-api-key`|trackedなし / untracked / ignored（既存 `.tmp/` 規則）|generated artifact / QA evidence：ファイル保全台帳。application sourceではない|台帳file：indexなし、全local refs履歴なし、配布なし。同一文字列：indexの既存QA9paths・履歴10pathsにあり。ローカル過去QA配布にあり。本番/C候補配布なし|`docs/security/SECRETS_REGISTER.md` をkeyとするSHA256。key内の`secret`と続くハッシュを汎用API-key検出器が検出。参照元の再計算と完全一致|**FALSE POSITIVE / NON-CREDENTIAL**。このfile・field・生成由来に限定したAPPROVEDを推奨。現在PENDING|
|SEC-C3 — `.tmp/provider-human-update/before.json`|Gitleaks 8.30.1 / `generic-api-key`|trackedなし / untracked / ignored（既存 `.tmp/` 規則）|generated artifact / QA evidence：前工程のファイル保全台帳。application sourceではない|台帳file：indexなし、全local refs履歴なし、配布なし。同一文字列：indexの既存QA5paths・履歴6pathsにあり。ローカル過去QA配布にあり。本番/C候補配布なし|`docs/qa/public-deploy-go-r1/access-postflight.json` のSHA256。`access`とハッシュの組合せを検出。参照元の再計算と完全一致|**FALSE POSITIVE / NON-CREDENTIAL**。このfile・field・生成由来に限定したAPPROVEDを推奨。現在PENDING|
|SEC-C4 — `.tmp/provider-human-update/before.json`|Gitleaks 8.30.1 / `generic-api-key`|trackedなし / untracked / ignored（既存 `.tmp/` 規則）|generated artifact / QA evidence：前工程のファイル保全台帳。application sourceではない|台帳file：indexなし、全local refs履歴なし、配布なし。同一文字列：indexの既存QA9paths・履歴10pathsにあり。ローカル過去QA配布にあり。本番/C候補配布なし|`docs/security/SECRETS_REGISTER.md` のSHA256。`secret`とハッシュの組合せを検出。参照元の再計算と完全一致|**FALSE POSITIVE / NON-CREDENTIAL**。このfile・field・生成由来に限定したAPPROVEDを推奨。現在PENDING|

## 出現状況の意味と確認範囲

- 4件は2種類のファイルハッシュが2つの台帳にあるもの。値、断片、raw Match、Fingerprintは本票・返信・保存ログへ出していない。scanner出力はメモリ内で照合し、保存したのはfile/type/由来/混入状況だけ。
- indexおよび全local refsのblob計2,594個を照合した。台帳パス未収載と、同じSHA文字列が既存QA JSONにあることを分けた。代表は `docs/qa/mvp-portal-release-r1/preservation.json`。これは既存の保全用digestの存在であり、今回の台帳をstage/commitした結果ではない。
- 配布候補・既存配布とReview証拠の計453filesを確認。本番 `release-artifacts/`、C候補/現行比較 `.cache/tinlumo-consent-r1/`、既存Monetization/Trust UXのゲーム配布rootには同一文字列なし。現在の本番リモートへの再fetch・設定操作は行っていない。
- 同じSHAは既存の `docs/qa/tinlumo-monetization-r1/preflight.json` と `docs/qa/tinlumo-trust-ux-r2/preflight.json` にある。前者はloopback4382の `/evidence/preflight.json` でHTTP200・同一文字列をメモリ照合。後者はローカルReview証拠ファイルとして確認。公開Internet配布を示すものではない。
- 今回の台帳2filesはC ReviewのHTTP経路で404、現行比較経路でも対象確認404。ゲームへコピーしていない。過去の全ローカルサーバー/全外部システムを網羅した監査ではない。
- 推奨は今回4件だけの限定判定。過去の同じdigestの判定、新規file、新規field、変更後の内容へ自動拡張しない。今回APPROVEDとは記録していない。

Raw全project scanの既知結果は **6件FAIL（既知2＋今回4）** を維持。今回は対象2filesを再scanし4件を再現した。全体scanをPASSへ書換えず、scanner/hook/allowlist/ignore設定変更・自動削除・rotation・provider検証・Git履歴書換えは0。

主担当実モデル `gpt-6-astra`。main / HEAD・ローカルorigin/main `337f545fc099a60ed74b5abdcbe4511cbc6eed75`、index差分空、remote再取得なし。受入記録・この判定票・Review以外の実装/配布は保全。stage / commit / push / deploy・Cloudflare/Google変更0。Human disposition待ちで停止。
