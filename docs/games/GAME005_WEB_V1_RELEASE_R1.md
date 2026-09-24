# Game005 Web v1 — Human approved release R1

2026-09-24. **GAME005_PUBLIC_RELEASE_GATE_PASS**. Human accepted the title **島をつなぐ日 / An Island Connected**, Cover A (completed island overview), current Public Packaging R1 Portal integration and JA/EN copy. Human already accepted Web v1 normal gameplay. This release adds exactly the fifth Tinlumo game.

## Authority and fixed scope

Human authorized reviewed staging, final checkpoint, ordinary private-origin/main push, static Production deployment and production smoke after final gates. No gameplay scope change, fourth district, additional resident/resource/economy, Ads or App Store work. Accepted MVP, Expansion, Hillside, Web v1 and Public Packaging source/evidence remain preserved.

Three districts, three residents, wood/coins, automatic work, no individual assignment, existing Gold UI, tempo, completion, save namespace `tinlumo:game005:web:v1` and JA/EN remain unchanged. The public adapter was already Human accepted. Saved language takes priority over URL language. Physical iPhone / Safari remains **NOT TESTED**, not an automatic Web release blocker.

## Release integration

- Registry: `src/data/game005-release.json` and `src/data/games.ts`; public selection and routes derive from the registry. Title/copy remain the accepted text, Cover A is byte-identical.
- Root Portal adopts only the reviewed Game005 Play/detail/save/credits additions. Existing four games and Consent C stay intact. Privacy/Terms Game005 save disclosure becomes effective September 24, 2026; the other policy text and historical dates are unchanged. This is publication status/date metadata, not new gameplay or marketing copy.
- Release build: `node scripts/game005-release-build.mjs`. Dedicated artifact: `release-artifacts/game005-web-v1/`. Historical Trust UX builder is now fail-closed because its four-game asset list cannot build the five-game Portal. No old artifact is overwritten.
- 84 files, 37 public routes; indexable JA/EN pages and sitemap. Raw game documents and 404 retain noindex. No source maps, tests, personal profiles or QA evidence in distribution.
- Game005 generated gameplay payloads match Accepted RC exactly; only credits first line records approved name. Existing 26 payloads remain byte-identical. Cover A is unchanged. Bundle size warning above 500 KB is retained, not suppressed.
- Source/build inputs and exact artifact are included through an explicit checkpoint manifest. Large prior Review media, old profiles, unrelated work and historical documents are not blanket-staged.

## Validation and limits

Evidence lives in `docs/qa/game005-release-r1/`. Build and strict game types, current 37-route/JA/EN/mobile/related regression, existing four launches/input/save/reload, full Game005 normal completion/reload, distribution and security gates are linked to the artifact manifest before deploy.

Root unit suite: 215 PASS (including existing 57 puzzle solutions and shared save/mock-ad contracts). The old `npm run test:routes` was invoked once and failed 2 cases because port4322 was not running; source inspection establishes that suite targets the old 16-route internal fixture, draft legal text and noindex. It is not the public-release route suite and is not modified to manufacture PASS. The current public route/browser suite replaces that irrelevant execution for this release.

Portal type validation uses `astro check --config astro.game005-release.config.mjs --tsconfig tsconfig.game005-release.json`: 21 files, zero errors/warnings/hints. The release-specific include set retains the existing strict compiler settings and imported dependencies. An initial unscoped check traversed old prototypes and nested compiled bundles; that task-owned process was stopped after identifying unrelated diagnostics. Those historical sources and tests were not changed. Game strict typecheck and 42 Game005 unit cases pass separately.

Independent artifact audit by actual model `gpt-6-astra`: all84 manifest files and retained26 exact; normalized RC HTML differs only in robots/generated CSS IDs and four Privacy/Terms effective-date notices; no open P1/P2 in reviewed artifact scope. Continuous full video viewing, physical devices and fresh Human production smoke are separate.

## Security

Full project including ignored files retains **raw FAIL17**. Exact current identity/provenance is rechecked; no new candidate is accepted automatically. H01 remains TRUE SECRET / local temp QA profile / approved local retention only, excluded from Git and distribution. H02–H04/H07–H09 and H05–H06/H10–H11 retain their exact scoped public-key/integrity dispositions. Historical original raw FAIL11 and original/current identity UNKNOWN stay recorded. S04/S05 remain UNKNOWN / UNRESOLVED; previous checkpoint-only acceptance is consumed and is not reused.

Full index and local history must independently PASS. TLS key and old browser profile paths must be absent from index/history/distribution. Scanner, allowlist and hooks are unchanged. Fresh QA profiles use run-owned OS temporary roots; actual profile paths are not recorded and only that run's root is cleaned. New candidates stop the release.

## Rollback

Immediately before release, Cloudflare GET and all63 served-file comparisons verified the previous Production artifact `release-artifacts/tinlumo-trust-ux-r2/`, manifest `docs/qa/tinlumo-trust-ux-r2-release/distribution.json`.

Previous Production version: `0245614c-19fa-4e6c-a1bb-180a3230caff`, deployment `de0d7486-768c-4e70-933d-ef814333812a` at 100%. Preview version `590239ba-da9d-43b4-835a-57c165fb6e65` is outside release scope. Both workers.dev and version preview URLs remain disabled.

If release smoke fails, stop further rollout, record actual state and use the explicit previous version as rollback target under Human authorization. An exact-version rollback restores the complete four-game artifact including Consent C, CSS, catalog and sitemap; do not mix old CSS/new pages. Existing saves and Game005 browser localStorage remain intact. No DNS, email, Preview access, Ads, account or external policy settings are changed. No rollback has been performed merely to test it.

Final commit, deployed version and production smoke outcomes are recorded in `docs/qa/game005-release-r1/POSTFLIGHT.md` after execution. Successful technical smoke ends at **GAME005_WEB_V1_RELEASED / PRODUCTION_HUMAN_SMOKE_PENDING**, never Human production acceptance.
