# Tinlumo Trust & UX R2 release

Human acceptance: **PASS**, 2026-09-21. A / no ads. [Exact authority and remaining unknowns](ACCEPTANCE.md).

The accepted implementation is preserved. This release adds the explicitly accepted Shorts/TikTok and creator-monetization wording and sets Effective / Last updated to 2026-09-21. A separate production artifact restores indexability without overwriting the historical comparison build. Games, saves, consent and infrastructure configuration remain unchanged.

- [Accepted Review, before/after, JA/EN copy and source-of-truth](../tinlumo-trust-ux-r2/REVIEW.md)
- [Source-of-truth structure](../tinlumo-trust-ux-r2/SOURCE_OF_TRUTH.md)
- [Final public copy](PUBLIC_COPY.md)
- [Distribution manifest](distribution.json): 64 files, 33 public URLs; 26 exact retained runtime/assets.
- [Targeted QA](targeted-qa.json), [local browser](local-browser.json), [Security](security.json), [dry run](dry-run.json)
- [Live release receipt](POSTFLIGHT.md) is created after the authorized deployment and smoke; absence means release is not yet established.

Validation: production build, four integration groups, 215 unit tests and six consent behavior tests PASS. Historical consent release-gate assertion remains FAIL (1). Existing 12 TS18048 errors are in isolated, unchanged, non-distributed prototypes; prior typecheck evidence is reused with file preservation checks. No scanner rule was weakened. Raw all-project scanner remains FAIL for the same two Human-dispositioned findings; no new candidates. Distribution/index/history results are separate gates.

Native 200% zoom and R2 physical devices: NOT TESTED. Prior 683/390/320 viewport reflow is not native zoom. Comprehensive legal applicability remains UNCONFIRMED. Prior game completion/save evidence is reused because all game payloads are byte-identical; release smoke does not claim a new full playthrough.

Rollback point, verified live before release: production Worker `tinlumo-production`, version `30b9e1e5-691b-4528-9904-d2f1e1e59068`, deployment `3ee9bdab-47cd-49d4-9017-d19b204b926e`, source checkpoint `77835d4474b877dec235bd3cc5cf0fb95fa03cc7`. The previous committed artifact remains `release-artifacts/game004-production-r1`. A rollback must explicitly target this version; no rollback is executed unless needed and authorized.

Wrangler 4.133.0 uses the existing production config plus `--assets` for the exact new root and `--keep-vars`. Dry-run precedes deployment. No automatic framework setup, configuration migration, Preview activation, DNS/Access changes, advertising or paid operation. [Official CLI reference](https://developers.cloudflare.com/workers/wrangler/commands/workers/).

Actual models: primary and read-only independent reviewer `gpt-6-astra`.
