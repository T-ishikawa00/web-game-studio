# Consent Architecture R1 C — accepted production release

Human formally accepted C and authorized one checkpoint, normal push, production deploy and smoke on 2026-09-21. The initial analytics prompt is removed; measurement remains OFF until the visitor explicitly opens Analytics settings and allows it. Saved choices remain compatible. Close/Escape do not grant consent; withdrawal reloads and stops subsequent measurement. JA/EN Privacy explains these behaviors.

Production source remains `src/rc/` and `scripts/trust-ux-build.mjs --production`; output remains `release-artifacts/tinlumo-trust-ux-r2`. The accepted analytics runtime is the only changed asset among the 26 previously retained assets. The other 25, including game payloads, retain exact bytes. Analytics panel/Privacy HTML are rebuilt from source. Google ownership meta is retained. Google ads/CMP, Cloudflare settings and game/save code are unchanged. Existing public analytics configuration is retained behind explicit opt-in; it is not an eager loader.

Validation: production build; 8 consent unit tests plus 4 distribution integration tests; 68 browser checks (JA/EN, mobile/desktop, keyboard/focus, close/Escape, storage failure, previous choices, game input/save/reload and MAGNET pause/resume); production-origin network test with local provider stub. `QA.json` binds evidence to the artifact manifest. `local-network.json` is not evidence of live delivery. Production smoke is recorded separately after deployment. Existing 215 game unit tests from C candidate QA are reused because game code/payloads are unchanged. No new broad QA/video capture is necessary.

Security: [exact C1–C4 Human approval](../../security/CONSENT_R1_CANDIDATE_DISPOSITION.md). Raw full-project scan remains FAIL with six approved findings; new candidates must stop this release. Full-index/history and distribution scans are separate gates. No scanner/allowlist changes.

This release does not implement Google CMP or ads. Actual CMP publication, region/language behavior, Google review, H5 eligibility, legal applicability and physical-device testing remain unverified. Google CMP is only a future regional UI candidate; the analytics choice is not advertising consent.

Main and independent read-only final review: `gpt-6-astra`. Prior local prototype evidence is preserved. Post-deploy receipts and Current update are kept locally after the single authorized checkpoint.
