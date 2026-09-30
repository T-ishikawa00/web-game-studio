# Tinlumo ads.txt + common Production AdSense head — local review

2026-10-01 JST. **LOCAL IMPLEMENTATION COMPLETE / HUMAN RELEASE APPROVAL PENDING.** This is the combined candidate for the latest Human request. No stage, commit, push or deployment has occurred. The earlier ads.txt-only candidate and its evidence are preserved as history.

## Final change

- `public/ads.txt` retains the requested single line, UTF-8 without BOM, final LF.
- Production builder retains the root ads.txt copy and uses `scripts/production-adsense-head.mjs` for all 39 public page heads: root 1, JA 19, EN 19. Ten JA/EN play pages are included. Layout, GamePage and IslandPlay have different source head paths; the common Production packaging step covers all three without modifying their bodies or runtime source.
- The common helper inserts exactly one async loader with the supplied client and `crossorigin="anonymous"`. Identical repeated packaging is idempotent. Duplicate, conflicting-client or out-of-head loaders fail the build instead of silently adding another one.
- New deployment payload: `release-artifacts/tinlumo-adsense-head-r1`, 103 files / 39 existing page routes plus `/ads.txt`.
- Of the existing 102 files, 39 public HTML files change only by the exact script insertion. Removing that script reconstructs each previous Production file byte for byte. The other 63 files, including 404, raw game documents, game JS/CSS/audio, assets, analytics-consent.js, save code, robots and headers, are byte identical. No game source, save namespace, Portal content/style, Consent C implementation or Analytics setting changed.

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2960465104451668" crossorigin="anonymous"></script>
```

JA/EN play exclusions in AdSense are **Human-reported applied**. The requested loader remains in these page heads; provider-side exclusions control Auto ads. No AdSense dashboard operation, H5 ad code or ad-unit implementation is included. Error pages and internal raw game distribution HTML do not receive the loader.

## Executed verification

| Check | Result |
|---|---|
| Actual Production pipeline `node scripts/visual-remaster-build.mjs --candidate adsense-head-r1` | PASS, 103 files / 39 routes |
| `node --test tinlumo-adsense-head-r1/head.test.mjs tests/consent-production-r1.mjs` | 12 PASS: 4 head/duplicate/conflict checks + 8 current Consent C checks |
| `node tinlumo-adsense-head-r1/verify.mjs` using unchanged Production config in Wrangler 4.133.0 local assets on loopback port 4427 | PASS, 102 served files and 39 routes; exact heads/body preservation |
| ads.txt anonymous GET/HEAD, Googlebot/Mediapartners-Google User-Agent | 200, text/plain; charset=utf-8, exact body, no redirect/authentication/crawler-restriction header |
| Browser `node tinlumo-adsense-head-r1/browser-qa.mjs` | PASS, JA desktop / EN 375px Portal; default Analytics OFF, allow once, reload persistence, withdrawal; all 10 play routes boot with game canvas and one head loader |
| Browser network isolation | 18 Google loader requests aborted locally; 4 Analytics loader requests fulfilled with local stub; no actual provider code executed; other external attempts 0 |
| Browser stability | application exceptions 0; settings work despite Google loader failure; temporary owned profile removed |
| Source syntax / scoped whitespace / preservation | PASS; HEAD/upstream/index and unrelated work preserved |

Evidence: [local QA](internal/local-qa.json), [browser QA](internal/browser-qa.json), [distribution](internal/distribution.json), [preservation](internal/preservation.json), [proposed release scope](internal/release-scope.json).

## Reused evidence and limits

The normal Astro local build from the ads.txt task is reused: its input files are unchanged by this extension, it has exact ads.txt bytes, and it is not the Production payload. The actual Production pipeline was freshly run for this combined candidate. Earlier live baseline readback matched all 101 served Production files; this extension has performed no remote write. Full gameplay, save migration, audio, physical-device and full responsive suites were not repeated because all game code/assets and every existing HTML body remain exact. The browser checks establish boot/settings behavior under blocked Google loading, not behavior of actual Google code or ads.

Consent C remains Cloudflare Analytics consent. It is not reused as advertising consent. The AdSense script is independent and requests Google at document load after a future deployment, including when Analytics is off. Browser QA therefore counts Google and Analytics separately; it does not claim zero external requests for an actual deployed page.

AdSense approval, actual Auto ad display, provider-side exclusion effectiveness and CMP state are NOT VERIFIED here. Existing Privacy/Terms statements that ads are not currently served remain unchanged, as requested. If deployment starts actual ads, their consistency with actual service state needs verification; this task does not silently rewrite accepted copy.

No existing AdSense/provider settings, H5, CMP, analytics consent/storage, game/Portal content, YouTube or global configuration was changed. Production is still unchanged; ads.txt-after-deploy and head-after-deploy readback are PENDING. Source implementation is not proof of actual ad delivery.

## Approval boundary and next action

The latest Human request preserves the earlier stop condition. AGENTS.md requires explicit scoped stage / commit / push approval and stops external changes without approval. Fresh ignored-inclusive full-project Security, full index, history, hooks and TLS/profile exclusion verification remain required for a subsequent approved checkpoint/release. Existing raw FAIL22 / historical FAIL11 / UNKNOWN dispositions are not reclassified.

The proposed release scope includes the combined candidate, three source files (ads.txt, Production builder, common head helper), relevant local review evidence, and the ads.txt/head task blocks in Current. It excludes unrelated work, old release candidates, browser profiles, raw temp/state/metafile/adapted build copies and entry inventory. After explicit approval and successful checks, deploy this candidate asset root to the existing assets-only `tinlumo-production`, preserving routing, variables and worker flags, then run `node tinlumo-adsense-head-r1/verify.mjs --live`. It reads back ads.txt, one loader per page, all candidate served bytes and existing routes without executing Google scripts.

Actual model ID: primary UNKNOWN / independent read-only reviewer UNKNOWN.

Primary references: [Google AdSense code](https://support.google.com/adsense/answer/9274634?hl=en), [Google page exclusions](https://support.google.com/adsense/answer/9262311?hl=en).
