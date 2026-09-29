# GAME005 HILLSIDE R1 — Security forensic classification

2026-09-23 / 主担当・独立provenance review: gpt-6-astra。**限定技術分類のみ。Human Security dispositionは全11件PENDING。** 実装・通常試遊・ゲームQAを再開していない。

**現存11フィールドの推奨分類：A 6件 / B 4件 / C 1件 / D 0件。** 新規11件に過去承認を適用しない。既知S04/S05はhistorical UNKNOWN / UNRESOLVEDを維持し、使用済みcheckpoint-only risk acceptanceを転用しない。

**原検出時の値との同一性はUNKNOWN。** 当初scanはfile/type/countのみ保管しており、元値・比較fingerprintがない。今回同じ3fileでgeneric-api-keyを1/5/5件再検出してstructured pathを確定したが、以下の分類・値の混入照合は**現存field**に対するもの。特にLocal Stateは原scan後に更新されており、当時の値と同一だったとは断定しない。変更された証拠もない。この制約を消して過去の原候補を技術的に解決済みとは扱わない。

## 対象と1候補1行の判定表

共通prefix: `game005-island/hillside-r1/.cache/browser-temp/`。

- **F1**: `playwright_chromiumdev_profile-32i3MC/Local State`
- **F2**: `playwright_chromiumdev_profile-JdI4wx/Default/Secure Preferences`
- **F3**: `playwright_chromiumdev_profile-32i3MC/Default/Secure Preferences`

全候補のdetector/typeは **Gitleaks 8.30.1 / generic-api-key**。raw scanner結果は**FAIL / 11**のまま。候補値・断片・全文fingerprintは出力しない。

| ID | file | JSON / structured key path | 形式・decode後の構造 | 推奨区分 | 用途の技術判断 | confidence | Human disposition |
|---|---|---|---|---|---|---|---|
| H01 | F1 | `$.os_crypt.encrypted_key` | Base64 → DPAPI暗号化鍵blob（295 bytes） | **C** | local暗号鍵素材・復号未実施 | 高※ | PENDING |
| H02 | F2 | `$.extensions.settings.dgiklkfkllikcanfonkcabmbdfmgleag.manifest.key` | Base64 → DER SPKI / RSA 1024 | **A** | 公開鍵・秘密用途なし | 高※ | PENDING |
| H03 | F2 | `$.extensions.settings.iglcjdemknebjbklcgkfaebgojjphkec.manifest.key` | Base64 → DER SPKI / RSA 2048 | **A** | 公開鍵・秘密用途なし | 高※ | PENDING |
| H04 | F2 | `$.extensions.settings.mhjfbmdgcfjbbpaeojofohoefgiehjai.manifest.key` | Base64 → DER SPKI / RSA 1024 | **A** | 公開鍵・秘密用途なし | 高※ | PENDING |
| H05 | F2 | `$.protection.macs.enterprise_signin.policy_recovery_token` | hex → HMAC-SHA256出力（32 bytes） | **B** | 設定整合性出力・credential証拠なし | 高※ | PENDING |
| H06 | F2 | `$.protection.macs.enterprise_signin.policy_recovery_token_encrypted_hash` | Base64 → v10暗号化ハッシュ（63 bytes） | **B** | 設定整合性出力・credential証拠なし | 高※ | PENDING |
| H07 | F3 | `$.extensions.settings.dgiklkfkllikcanfonkcabmbdfmgleag.manifest.key` | Base64 → DER SPKI / RSA 1024 | **A** | 公開鍵・秘密用途なし | 高※ | PENDING |
| H08 | F3 | `$.extensions.settings.iglcjdemknebjbklcgkfaebgojjphkec.manifest.key` | Base64 → DER SPKI / RSA 2048 | **A** | 公開鍵・秘密用途なし | 高※ | PENDING |
| H09 | F3 | `$.extensions.settings.mhjfbmdgcfjbbpaeojofohoefgiehjai.manifest.key` | Base64 → DER SPKI / RSA 1024 | **A** | 公開鍵・秘密用途なし | 高※ | PENDING |
| H10 | F3 | `$.protection.macs.enterprise_signin.policy_recovery_token` | hex → HMAC-SHA256出力（32 bytes） | **B** | 設定整合性出力・credential証拠なし | 高※ | PENDING |
| H11 | F3 | `$.protection.macs.enterprise_signin.policy_recovery_token_encrypted_hash` | Base64 → v10暗号化ハッシュ（63 bytes） | **B** | 設定整合性出力・credential証拠なし | 高※ | PENDING |

※構造・用途の分類に対するconfidence。秘密鍵の復号、MAC検証、暗号化ハッシュの復号／tag検証、実アカウント認証は一切行っていない。Edge独自実装の完全な同一性も未検証。

**各11行すべてに適用する共通項目**（候補別の完全レコードは[classification.json](../qa/game005-hillside-security-classification-r1/classification.json)）：

| 必須項目 | H01〜H11それぞれの結果 |
|---|---|
| tracked / untracked / ignored | not tracked / untracked / ignored |
| file分類 | browser-generated temporary QA profile artifact（source/game assetではない） |
| profile lifetime | temporary QA profile。QA中断後に残存。persistent利用・既存profile importの実装なし |
| Git index混入 | 元file path 0、候補の比較対象表現 0 |
| local history混入 | 全local refs＋reflog到達可能履歴：元file path 0、候補の比較対象表現 0 |
| distribution混入 | 確認したlocal build/public/review 479files：元file 0、候補の比較対象表現 0 |
| 検出理由 | generic-api-keyの汎用パターン／entropy検出。detector名だけではcredential用途の証明にならない |
| Human承認 | 全件PENDING。この資料は承認でもcheckpoint許可でもない |

## Local State：H01はTRUE SECRETを維持

`$.os_crypt.encrypted_key`は、Base64をdecodeするとDPAPI prefix、version 1、標準DPAPI provider構造を持つ295-byte blob。**公開鍵・公開metadata・profile整合性MACではない**。

Chromiumの[DPAPI key provider](https://raw.githubusercontent.com/chromium/chromium/main/components/os_crypt/async/browser/dpapi_key_provider.cc)はこの同じfieldを読み、DPAPIでunwrapしてbrowserの暗号鍵として利用する。今回の実値はunwrapしていないため、plaintext長・鍵の有効性・復号可能性の実証はしていない。それでもfield用途とcontainer構造により、**暗号化して保存されたlocal browser秘密鍵素材**として取り扱う。暗号化済みだからFALSE POSITIVE、という判断はしない。

authentication / signing credentialの証拠はない。暗号化・復号用の鍵を包む値であり、直接使えるplaintext鍵ではない。推奨は **C: TRUE SECRET / LOCAL TEMP QA PROFILE ONLY / NOT TRACKED / NOT DISTRIBUTED（確認範囲）**。Humanが承認する場合も、この候補のlocal保全に限定し、公開・Git収載・将来checkpointへの包括承認を含めない。

## Secure Preferences：公開鍵と整合性データを分離

**A — H02/H03/H04/H07/H08/H09。** 6フィールドを個別にDER SPKIとしてparseし、再encode完全一致、RSA公開鍵構造、対応するextension ID導出一致を確認。private PKCS8構造ではない。単にBase64の先頭が似ているから、という判定ではない。[manifest key公式資料](https://developer.chrome.com/docs/extensions/reference/manifest/key)の公開鍵による拡張ID維持の役割と一致する。公開の検証／暗号化materialになり得るが、署名・秘密復号・secret credentialとして使える秘密成分は含まない。**今回の6件それぞれのみPUBLIC KEY / NON-CREDENTIAL / FALSE POSITIVE承認を推奨**。

**B — H05/H10。** `protection.macs`配下の64桁hexを32-byteへdecode。[保存実装](https://raw.githubusercontent.com/chromium/chromium/main/services/preferences/tracked/dictionary_hash_store_contents.cc)はこの辞書を設定のauthenticator置場とし、[計算実装](https://raw.githubusercontent.com/chromium/chromium/main/services/preferences/tracked/pref_hash_calculator.cc)は設定path/value等からHMAC-SHA256を計算しhexで保存する。候補はMACの出力であり、MAC seed/keyや`policy_recovery_token`本体ではない。対応するrootの`enterprise_signin.policy_recovery_token`は両Secure Preferences内に不存在。不存在は他fileや実アカウント全体にtokenがない証明ではない。

**B — H06/H11。** suffix `_encrypted_hash`の扱いを[PrefHashStoreImpl](https://raw.githubusercontent.com/chromium/chromium/main/services/preferences/tracked/pref_hash_store_impl.cc)で確認。上記計算実装は設定のSHA-256ハッシュをOSCryptで暗号化しBase64保存する。実値は63-byteのv10 envelopeで、[Encryptorのprefix/nonce/ciphertext構成](https://raw.githubusercontent.com/chromium/chromium/main/components/os_crypt/async/common/encryptor.cc)と整合する。**暗号化されたハッシュ出力**であり、H01の**暗号化された鍵素材**とは用途が異なる。復号して内部digestの正当性を証明したわけではない。

Bの4件は、remote authentication credential / signing key / encryption keyという証拠なし。公開鍵とも扱わない。ローカル設定の改変検知に使うsecurity metadataであり、無意味な値とも扱わない。**今回の4件それぞれのみPROFILE INTEGRITY METADATA / NON-CREDENTIAL / FALSE POSITIVE承認を推奨**。用途が異なる将来の`protection.macs`候補への一括承認は禁止。

## 生成経路・時刻

| file | 作成UTC | 最終更新UTC | bytes |
|---|---|---|---|
| F1 | 2026-09-23T13:27:21.684Z | 2026-09-23T13:28:51.763Z | 8345 |
| F2 | 2026-09-23T13:27:32.454Z | 2026-09-23T13:27:32.461Z | 12303 |
| F3 | 2026-09-23T13:27:22.422Z | 2026-09-23T13:27:22.428Z | 12303 |

Hillside保全snapshotは13:17:05 UTC、今回の2profileの該当fileは13:27:21〜32 UTCに作成、最初の11候補scanは13:28:34 UTC。QA開始時の新規一時profile生成と時系列が整合する。

[play.mjs](../../game005-island/hillside-r1/scripts/play.mjs:5)がrepo内TEMP/TMPを指定し、`chromium.launch(channel: msedge)`後に新contextを生成。インストール済みPlaywright 1.62.1の`coreBundle.js`では、userDataDir未指定時に`mkdtemp`し`--user-data-dir`へ渡す。setupには旧profileコピー、playにはpersistent profile指定・storageState importがない。現在のSELENIUM_REMOTE_URLは未設定。独立read-only reviewerもこの経路を確認。

**判断：今回のQAが新しく作ったtemporary profile内へbrowserが書いた情報、という説明を高confidenceで支持する。既存ユーザーprofileを丸ごと持ち込んだ証拠はない。** ただしprocess単位のfile-write監査はなく、OS/policy由来metadataやbrowser組込み公開鍵は新profileでも取り込まれ得る。公開鍵の値自体が今回新規生成されたとは主張しない。過去のbrowser全体の外部通信ゼロも証明していない。

追加profile再生成は**未実施**。既存2profileで同じ5 structured pathsを確認でき、公開sourceと構造照合で必要な用途判断ができるため。新しい秘密素材やbackground通信の可能性を伴うbrowser起動は増やさなかった。今回browser同期・login・remote browser service接続は0。公開一次資料だけを閲覧し、候補値を外部へ送っていない。

## 混入確認の範囲と限界

[exposure.json](../qa/game005-hillside-security-classification-r1/exposure.json)に対象root・件数・方法を記録。

- **full index**：2,836 entries / 2,266 unique objects。元pathなし、候補一致なし。
- **local history**：all local refs＋reflogから到達する3,582 objects。blobだけでなくcommit/tree/tagの内容も比較。元pathの履歴照合も0。
- **distribution**：root `dist/public`と各ゲームのdist、fixture/baseline dist、review等22root・479files・332,737,781 bytes。Hillside local serverが配信するdist/reviewと旧baseline distを含む。元profile fileも候補内容も検出なし。
- 比較は元fieldのUTF-8／UTF-16LE、scannerが捕捉した部分、decode後bytesをprocess memory内で照合。値やfingerprintの一覧は保存しない。
- **remote/deployed配布状態はNOT VERIFIED**。このlocal限定依頼で外部設定・配信先へアクセスしていない。圧縮container内の再展開、任意の再encoding、画像OCR、暗号化内容やprune済み到達不能履歴までは不在証明しない。

これは11候補の混入確認であり、通常のcheckpoint前full-project security gateの代替でも、別のsecretが存在しない証明でもない。

## Humanに提案する安全な扱い

- **H01**：TRUE SECRETのまま、現在のignored local temporary profile内に保全してHuman判断を待つ。自動削除・復号・複製・rotationしない。後日削除が必要なら対象profileと証拠保全を明示した別指示を受ける。
- **A/B 10件**：この表のID＋file＋structured pathに限定したnon-credential判定を提案。承認前にallowlistへ入れず、承認後もscanner ruleを広く緩めない。
- provider credentialの推測や根拠のないrotation提案なし。既存S01〜S03承認は今回未適用、S04〜S05 UNKNOWNは変更なし。

実装・通常試遊・ゲームQA、profile再生成／削除、rotation、scanner/allowlist変更、Git書込み、deploy、外部設定変更は実施していない。Gitは必須混入確認のread-only参照のみ。Human Security disposition待ちで停止。Physical iPhone / Safariは引き続きNOT TESTED。

**GAME005_HILLSIDE_SECURITY_CLASSIFICATION_READY / HUMAN_SECURITY_DISPOSITION_PENDING**
