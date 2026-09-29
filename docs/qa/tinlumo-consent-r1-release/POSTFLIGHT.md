# Consent Architecture R1 C — production postflight

**TINLUMO_CONSENT_ARCHITECTURE_R1_RELEASED / PRODUCTION_SMOKE_PASS**

- Commit: `ed0695b5f187567cd52a30759774ff945c5a6e19` (normal push; local main, origin/main and remote main agree).
- Worker: tinlumo-production. Deployment: `de0d7486-768c-4e70-933d-ef814333812a`; version: `0245614c-19fa-4e6c-a1bb-180a3230caff`.
- URLs: [JA](https://tinlumo.com/ja/) / [EN](https://tinlumo.com/en/) / [JA Privacy](https://tinlumo.com/ja/privacy/#analytics) / [EN Privacy](https://tinlumo.com/en/privacy/#analytics).
- Build and 12 targeted tests PASS; 68 browser checks PASS. Live 63 served files match committed artifact bytes, 33 ownership meta pages retained.
- Production smoke: no initial analytics UI; no default/deny requests; explicit allow loads the existing Cloudflare beacon; withdrawal reload stops subsequent requests; JA/EN Privacy and all four games load; no Google advertising/CMP requests.
- Game/save code and 25 retained assets unchanged. MAGNET public launch HTML changes only the compiled shared CSS filename. No Google or Cloudflare setting operations. Preview deployment/version unchanged; anonymous Access protection retained.
- Security raw full project remains FAIL with six explicitly approved findings. C1–C4 provenance revalidated. Distribution, full index and local history PASS; new candidates 0. No allowlist changes/deletion/rotation.
- Main/review model: gpt-6-astra. Index empty. Existing untracked work preserved; Current and postflight evidence remain local after the single checkpoint.

Google site review/H5 approval/CMP publication and actual regional behavior, physical devices and legal applicability remain unverified. This release does not establish advertising delivery or revenue success.
