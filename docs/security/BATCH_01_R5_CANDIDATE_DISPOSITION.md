# Batch 01 R5 — specific candidate Human disposition

2026-09-15。Humanが以下の1候補だけに条件付き承認を与えた。再確認結果は [値を含まない検証記録](batch-01-r5-disposition.json)。`scripts/checkpoint-security.mjs` は条件不成立またはraw finding集合の変化で停止する。

- File: `.tmp/r3-before/manifest.json`
- Scanner classification: `generic-api-key`
- Field: `hashes["docs/security/SECRETS_REGISTER.md"]`
- Human disposition: **FALSE POSITIVE / NON-CREDENTIAL / APPROVED**

保全生成scriptのSHA256計算を確認し、SHA256形式、対応する現ファイル再hashと当時のGit blob再hashの完全一致を確認した。tracked／commit候補内の値の使用箇所は0で、API key / token / password / credentialとして利用されていない。外部providerから取得した値ではなく、ローカルファイルから生成された整合性hashである。値自体は本記録・回答に含めない。providerへの照会・検証・rotationは行っていない。

**Raw scanner: FAIL（この1候補を引き続き検出）。Human disposition: APPROVED。** この二つの事実を別々に保持する。raw scannerをPASSと書き換えない。scanner設定・既存例外は変更せず、新しいallowlist／除外／regex例外を追加しない。`.tmp`全体をscan対象から外さず、候補は削除しない。承認は同じfield・形式・内容由来・raw位置を確認したこの1候補だけに限定する。

R4/R5の旧 `security-provenance.json` にあるHuman PENDINGは当時の未判定記録として保存し、本記録が今回のHuman判定を追加する。他の候補は自動承認しない。全indexとhistory scanは別途PASSが必要。
