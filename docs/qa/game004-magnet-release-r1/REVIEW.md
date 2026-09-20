# Game004 production release R1

Authority: [Human Release acceptance](ACCEPTANCE.md). This checkpoint contains the accepted public presentation source, registry metadata, exact static production distribution and release tooling. Live deployment and smoke evidence are written after checkpoint to POSTFLIGHT.md and live-*.json; preflight success is not live success.

## Distribution and preservation

`release-artifacts/game004-production-r1/`: 62 files. Manifest `distribution.json` is the upload allowlist, with exact SHA-256 and byte lengths. Binary-safe Git attributes retain all bytes on checkout. It is deployable without rebuilding historical Portal source. Only that directory is uploaded. Public candidate/game-only artifacts and earlier Full/R2.1/Slice/Nurture evidence remain in place.

Production projection restores 31 indexed routes, 28 opt-in consent panels, prior production headers/robots and canonical/hreflang on the two new Play routes. Game004 credits remove the obsolete pending-gate sentence. No game JS/CSS/Canvas art/audio/save changes; 20 previous gameplay/shared payloads are identical. No providers, trackers, ads, accounts or custom analytics events added. Existing consent script remains byte-identical; automatic insertion OFF remains a provider setting to verify read-only after deployment.

Registry: `src/data/game004-release.json`, imported by the shared registry and asserted by packaging. Game004 uses its accepted direct Play runtime, not the old puzzle-only RC renderer. Old fixture/prototype identities remain isolated.

## QA

- Full public browser matrix: 128 checks, with B/C save fixtures explicitly distinguished from earned unlock proof.
- New fresh-storage trusted-input replay: 8,296 keyboard/mouse/clock operations, A→B→C clear and earned unlocks, normal end, records and reload. No save injection, QA API or runtime mutation; accelerated time. Recorded on the frozen deterministic baseline, replayed against the exact public artifact. `trusted-input.json` is reproducible input, not customer data.
- HTTP distribution: all 61 served files compared to exact artifact hashes, canonical/hreflang/indexing, private routes 404, method 405 and headers.
- Consent: default/deny/reload zero requests, allow inserts one manual script, revoke/reload stops new requests; JA/EN Privacy/Terms and direct Game004 runtime exclusion. Local provider response is stubbed; live test is separate.
- Existing unit suite: 215/215 after correcting a stale current-site test that assumed domain/contact were still unacquired. Unknown physical-device/full-57/external-use flags remain protected by assertions.
- Game004 frozen core/mechanics tests are reused/run without modifying their source.
- Repository-wide `npm run check` retains 12 TS18048 errors in three pre-existing isolated prototype `core.ts` files (game004-magnet, game004-magnet-progression, game004-magnet-vertical). They are not distributed. Public adapter needed a tuple type annotation for `noUncheckedIndexedAccess`; a separate Vite rebuild proves its HTML/JS/CSS are byte-identical to the accepted artifact. Compiled release artifacts are excluded from source type analysis like dist/cache; no source check is disabled.
- Security raw full-project result remains FAIL for the same two Human-disposed existing findings. New candidates must be zero. Index/history/distribution are separate scans; no hook bypass or new scanner exceptions.

QA files bind their PASS to the current distribution manifest hash; deploy guard rejects stale evidence. Independent read-only review found the Play noindex mismatch and stale-QA risk, both resolved before checkpoint/deployment.

## Remaining limits

Human reported physical mobile/touch/actual audio PASS; specific devices/OS/browser versions were not reported. No claim of independent physical testing by Codex. External first use NOT TESTED; commercial demand/retention/revenue UNKNOWN. Old 57-puzzle Human full-run acceptance not inferred. No new content or polish.

## Release and rollback

Local production preview: http://127.0.0.1:4373/en/ and /ja/. Local accepted candidate review remains http://127.0.0.1:4372/review/.

Intended public URLs: https://tinlumo.com/ja/play/project-magnet/ and https://tinlumo.com/en/play/project-magnet/; localized detail/card routes under /ja/ and /en/.

Explicit release operations: one checkpoint, one normal private main push, one tinlumo-production deployment. No Cloudflare Analytics setting changes. See [rollback point](ROLLBACK.md). Execution counts and live identifiers belong in POSTFLIGHT.md.
