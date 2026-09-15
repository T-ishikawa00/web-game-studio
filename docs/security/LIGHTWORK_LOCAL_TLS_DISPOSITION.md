# Local development TLS private key — separate Human disposition

2026-09-15. Exact file: `.tmp/physical-mobile-r2/tls/server.key`. Scanner type: `private-key`.

**TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION**

Human explicitly classified this as a real locally generated Tiny Delivery Physical Mobile Validation HTTPS server private key, not a false positive. The approval permits unchanged local-only retention and continued local Lightwork development when the stated isolation conditions hold. It grants no distribution, Git inclusion, external validation, LAN reopening or new use.

Verified conditions and sanitized evidence: [Lightwork security receipt](../qa/lightwork-craft-pilot-01/security.json). The key is ignored/untracked, absent from index and scanned Git history, and absent from other inspected files and frozen served output. Actual remote main equals the scanned HEAD. The shared HTTP/HTTPS request handler rejects requests for the private-key path; no listener or TLS key use was needed for that test. The repository-local OpenSSL generator and earlier physical-mobile report establish local provenance and existing TLS-only code use. No claim is made to audit unrelated external systems.

Raw full-project detection remains **FAIL with two findings**. This Human disposition does not erase the detection. Existing `.tmp/r3-before/manifest.json` retains its separate **FALSE POSITIVE / NON-CREDENTIAL / APPROVED** disposition in [its original record](BATCH_01_R5_CANDIDATE_DISPOSITION.md).

No scanner rule/regex/directory exception, key copy into Review/build, value or key-hash disclosure, deletion, rotation, remote transfer or provider validation is authorized. Future Git checkpoints must recheck full index and history absence. Stop immediately if staged, committed, remotely shared or browser-accessible exposure is found.
