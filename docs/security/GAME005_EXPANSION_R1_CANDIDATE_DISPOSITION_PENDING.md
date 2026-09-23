# GAME005 Expansion R1 — Security Human判定票

2026-09-23 — **HUMAN_SECURITY_DISPOSITION_PENDING**

製品は[GAME005_EXPANSION_GATE_PASS / PROGRESSION_DIRECTION_A_ACCEPTED](../games/GAME005_EXPANSION_SLICE_R1_ACCEPTANCE.md)。Securityは別判定であり、本書は推奨を提示するだけで承認しない。過去の既知6件の承認は適用しない。

## 原記録と識別の限界

2026-09-23 09:33:33 UTCの[原scan](../../game005-island/expansion-r1/review/security-active-browser-scan.json)は Gitleaks 8.30.1 / `generic-api-key` **5件・raw FAIL**。そのまま保持する。[当時の構造分類](../../game005-island/expansion-r1/review/security-profile-provenance.json)は公開鍵3件、profile保護領域2件である。

全5件のfile（F1）は同じ：

`game005-island/expansion-r1/.cache/browser-temp/playwright_chromiumdev_profile-6YTZix/Default/Secure Preferences`

絶対rootは `C:\projects\Web Game Studio`。分類は **QAが生成した一時Playwright／Edge browser profile**。ゲームsource、ゲーム資産、配布成果物ではない。サインインを行わない自動試遊contextの生成物である。

元ファイルは今回の作業開始時点ですでに不存在。今回、削除・復元・profile再生成は実施していない。秘密値・断片・候補fingerprint・raw matchは保存しておらず、値の再解析や完全一致検索はできない。S01〜S05は本判定票で付けた識別子で、scanner由来のfingerprintではない。公開鍵3件は保存済み分類の記録順、保護領域2件は当時の構造probeのフィールド順で区別する。元のscanner matchと値単位で再結合することはできない。

## 5候補の技術判断と推奨

下表のfile F1および「共通混入確認」は各候補すべてに適用する。値そのものは掲載しない。

| ID | file | detector / type | 検出理由と技術判断 | 推奨disposition（未承認） | 必要な安全な対処 |
|---|---|---|---|---|---|
| S01 | F1 | `generic-api-key` / public extension key 1 | 当時DER SPKIとしてpublic keyと構造確認された記録。公開鍵表現を汎用key検出器が拾ったもの。private key／認証secretという証拠はない。現在の再parseではない | この事象の公開鍵3件のうち1件に限定して **FALSE POSITIVE / NON-CREDENTIAL** を推奨。Human承認待ち | 原FAIL・構造記録を保全。削除／rotation／allowlist不要 |
| S02 | F1 | `generic-api-key` / public extension key 2 | S01と同じ根拠の別の公開拡張鍵。公開鍵構造の記録があり、現在の値の再確認は不可 | この事象の公開鍵3件のうち1件に限定して **FALSE POSITIVE / NON-CREDENTIAL** を推奨。Human承認待ち | 同上。将来の別検出へ一般化しない |
| S03 | F1 | `generic-api-key` / public extension key 3 | S01と同じ根拠の別の公開拡張鍵。公開鍵構造の記録があり、現在の値の再確認は不可 | この事象の公開鍵3件のうち1件に限定して **FALSE POSITIVE / NON-CREDENTIAL** を推奨。Human承認待ち | 同上。値別allowlistを作れる証拠はない |
| S04 | F1 | `generic-api-key` / browser profile protection value 1 | 当時の所在は `protection.macs.enterprise_signin.policy_recovery_token`。これはフィールド名であり値ではない。汎用key/token検出。profile整合性情報と整合する所在だが、名前だけでcredential／non-credentialとは確定できない | **UNKNOWN / UNRESOLVED** の維持を推奨。FALSE POSITIVE／NON-CREDENTIAL／TRUE SECRETのいずれも技術確定しない | 元値がなく再確認不可。判定待ちを維持し、Git／releaseへ進まない。再生成して別の値を確認しても元値の証明にはならない |
| S05 | F1 | `generic-api-key` / browser profile protection value 2 | 当時の所在は `protection.macs.enterprise_signin.policy_recovery_token_encrypted_hash`。フィールド名にhashが含まれても無害性の証明ではない。元値の型・用途の再確認不可 | **UNKNOWN / UNRESOLVED** の維持を推奨。S04とは別の未確定候補 | S04と同じ。provider照会・自動rotation・削除を行わない |

汎用detectorの一致はprovider認証の成功を示さない。各matchの正確なregex一致部分・entropy値は保持されておらず、再現した検出理由とは主張しない。S01〜S03の推奨は当時の構造分類を根拠にした限定判断であり、独立reviewerによる元値の再解析ではない。

## 共通混入確認 — S01／S02／S03／S04／S05の各件

| 確認項目 | 5件それぞれに適用する結果 | 範囲・限界 |
|---|---|---|
| tracked / untracked / ignored | **not tracked / ignored**。検出時は生成された未追跡ファイル、現在は不存在 | `game005-island/expansion-r1/.gitignore:1` の `.cache/` に該当。通常のuntracked一覧には出ない |
| source等の分類 | **generated browser profile / QA実行時の一時データ** | source／配布物ではない。残っている判定JSONは値を含まないQA evidence |
| Git indexへの混入 | **元fileの収載なし**。browser profile関連pathも0 | full index 2,684filesを元のpath・blob bytesで展開しscan PASS／0件。元候補の値コピーの有無は **NOT VERIFIED** |
| local historyへの混入 | **元fileの履歴収載なし**。browser profile関連pathも0 | local refs＋reflogsの20commits、scan PASS／0件。fetchなし。dangling object／remote履歴は未検査。元値コピーは **NOT VERIFIED** |
| distributionへの混入 | **確認した配布先に元fileなし**、補助marker一致0、scan PASS／0件 | 下記5scope・181filesのみ。元値コピーは **NOT VERIFIED**。画像／動画OCR、外部配信は未検査 |

配布検査scope：`game005-island/expansion-r1/dist`、`game005-island/r3-2/dist`、`public`、`dist`、`release-artifacts`。証拠：[exposure.json](../qa/game005-expansion-acceptance-security-r1/exposure.json)、[元ファイル境界を保ったfull index scan](../qa/game005-expansion-acceptance-security-r1/index-file-scan.json)。

**path不在や現在scanのPASSは、元の5値が他fileへコピーされていなかったことの証明ではない。** 全repo Security PASS、完全除去、漏洩なしとは結論しない。元ファイルの不存在もSecurity対応による解決とは扱わない。

## 補助検査の別結果

full indexのblobをGit batch header込みで連結した補助stdin検査は1件FAILだった。原5候補と別の検査結果として保存する。ファイル境界を保持した全index検査はPASSであり、前者を上書きしない。検出元の追跡結果は[stdin-attribution.json](../qa/game005-expansion-acceptance-security-r1/stdin-attribution.json)、検査方式と判断は[今回QA](../qa/game005-expansion-acceptance-security-r1/REPORT.md)を参照する。

## Human判定待ち

全5件とも **HUMAN_DISPOSITION_PENDING**。S01〜S03は上記の限定NON-CREDENTIAL承認候補、S04〜S05は未確定維持を推奨する。Humanが後者の不確実性を受容する場合も、記録すべきものは **Humanによるリスク受容／技術状態UNKNOWNの維持** であり、技術的FALSE POSITIVEへの変更ではない。本書はその受容を代行しない。

自動削除、rotation、allowlist拡張、scanner緩和、stage／checkpoint／commit／push、外部操作を行わない。将来のGit操作は、Human dispositionとその操作自体の明示許可を別々に必要とする。過去の既知6件のraw FAILと承認範囲を保全する。

主担当および独立read-only reviewer：`gpt-6-astra`。独立reviewは既存の値を含まない3証拠を読んだ監査であり、元の公開鍵の再parse／元の保護値の確認ではない。
