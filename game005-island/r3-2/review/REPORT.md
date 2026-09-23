# Game005 UI Live Integration R3.2 — Human Review

**Human authority:** B Gallery Gold R3.1 is the accepted UI Visual Direction. That is not Game005 Craft/UI final acceptance. This phase integrates that direction into the unchanged R2 simulation and renderer, in an isolated local candidate. No new game content or progression.

**Review:** http://127.0.0.1:4394/review/  
**Playable candidate:** http://127.0.0.1:4394/  
**Stop:** `GAME005_UI_LIVE_INTEGRATION_R3_2_READY / HUMAN_LIVE_CRAFT_UI_GATE_PENDING`.

## What is connected

| Surface | Live source / behavior |
|---|---|
| HUD | Actual `state.wood` and `state.coins`, updated during ordinary work and trade |
| Gallery | Five existing R2 facilities, original Gold R2-model preview images; real BALANCE costs and canBuild prerequisites |
| States | Selected, ready, missing coins, timber gathering plan, waiting for prerequisites/another project, construction progress, completed |
| Construction | `startBuild` and existing R2 automatic worker scheduler. Wood/coins reserved by existing rules; plan shortages collected automatically |
| Placement | Market coast/village selection, spend only at confirmation; free relocation after completion, current location disabled and busy/order guard |
| Progress/feedback | Real project work ratio; original R2 construction mesh animation; short Gold request/completion feedback on actual core events |
| Trade/priority/cancel | Explicit wood shipment; payment on arrival; original priority and refund logic; no offline or passive market revenue |
| Goals | Original dock / market-and-house / expansion conditions; minimal persistent goal with selected details |
| Settings | JA/EN, real mute, reduced animation, low-load graphics, version-2 persistence; reset separate from ordinary preferences |
| Save | R2 storage algorithm and validation, isolated R3.2 key. 5-second/event/page lifecycle saving, conflict blocking, honest temporary/corrupt warnings, reload |
| Input | Mouse, keyboard, touch, original rotation/zoom/home; no individual resident allocation UI |

`src/game.ts` directly imports the protected R2 core, scene and audio. `src/storage.ts` changes only the key/import routing from the R2 storage implementation. The original files are not edited. The R3.1 static landscape and mock phase controls are absent from the normal app bundle. Comparison fixtures are separate builds, with saves disabled and a read-only QA accessor; normal play has no such accessor.

Save key: `tinlumo:game005:island:live-ui:r3-2`. Envelope/schema version: **2**. R2 saves are not migrated, read or overwritten; new candidate starts fresh. Reset clears only candidate progress and retains preferences. Corrupt original data stays unchanged until the explicit candidate reset is confirmed.

## Visual integration decisions

- Keep the Gold hierarchy, image-led Gallery, light surfaces, restrained active marker, differentiated settings controls and short feedback. Do not create a new visual direction.
- PC uses a bottom shelf; its opening does not force the island into the former R2 side-panel framing. Closing restores the unobstructed scene. The shelf still covers the lower dock area while open, an explicit tradeoff retained for Human review.
- Mobile uses horizontal tray plus optional expanded grid. There are five real R2 facilities instead of the mock's four featured cards; swipe hint and PC browse control make the existing bridge discoverable. Expanded mode takes more vertical space, so it is optional. The selected cost/effect/CTA remains outside the scrolling candidate area.
- Construction may start with missing timber if the original core permits a gathering plan. Do not impose the Gold mock's simplified affordability rules or an invented workshop prerequisite.
- UI changes are state-driven at the existing 5Hz UI cadence, with stable card buttons and changed-detail rendering. Simulation and rendering timing remain R2's. Modal reset also pauses simulation; keyboard focus is retained when an executed action changes its button.
- Real Settings pause simulation and audio. Audio ON can initialize via keyboard, then safely resume when the modal closes. Audio failure is persistently reported, not silently treated as success.

## Self-review and corrections

Initial implementation QA found that the audio-unavailable toast could be overwritten by a construction message; it now appears in the persistent warning surface. An initial keyboard mesh-selection test read during a visibility transition; the test now waits for visible UI instead of mistaking the animation for missing content.

Independent read-only audit found three P2 issues: keyboard-only audio could not unlock, disappearing action buttons lost focus, and dock effect copy said 6 after market upgraded actual income to 8. All were corrected and covered by three focused regression groups. The independent reviewer closed all three and found no remaining important P1/P2 in that reviewed scope. This is source/evidence review, not Human visual or listening acceptance.

## Evidence and comparability

The Review has 18 switchable controlled comparison images: R2 / R3.1 Gold / R3.2 × desktop/mobile × HUD/Gallery/Settings. R2 and Live use the same explicit sample: wood10, coins8, repaired dock, workshop55%, two workers. Their ordinary renderers are paused and the camera is aligned with the Gold reference (desktop home / mobile R2 panel framing). Gold is the preserved fixed R3.1 background. Stop indicator, selection ring and water timing differences remain visible; no screenshot-only beautification or UI removal. The explicit sample exists only in the save-disabled comparison entry and is not a playable-save compatibility test.

Normal-route screenshots cover desktop1440×1000, mobile390×844, small360×640, English390×844 and landscape844×390; expanded tray samples are included. These render the real game. Full-loop recordings use the normal route and fresh storage without state injection or time scaling. Market-first desktop and house-first mobile viewport reach the original expansion endpoint with three workers. Detailed input/state traces are in `market-play.json` and `house-play.json`; mobile taps are viewport emulation on Windows, not a physical device. No audio track is captured. `construction-20s.webm` is an unchanged-speed stream-copy excerpt of the desktop full loop, not a staged demo.

<!-- metrics:start -->
- Desktop, market first: **155.409 seconds / 24 clicks or taps / 0 individual assignments**, 3 workers and expansion completed. Browser errors 0, external requests 0.
- Mobile viewport, house first: **146.553 seconds / 24 clicks or taps / 0 individual assignments**, 3 workers and expansion completed. Browser errors 0, external requests 0.

| Condition | R2 → Live frame interval p95 (ms) | R2 → Live JS (ms per second) | Live intervals >50ms |
|---|---:|---:|---:|
| desktop / hud | 16.8 → 16.8 | 88.1 → 87.9 | 0 |
| desktop / build | 16.8 → 16.8 | 76.0 → 92.0 | 0 |
| mobile-viewport / hud | 16.8 → 16.8 | 88.8 → 84.4 | 0 |
| mobile-viewport / build | 16.8 → 16.8 | 54.3 → 55.6 | 0 |
| mobile-low / hud | 33.4 → 33.4 | 33.9 → 41.2 | 0 |
| mobile-low / build | 33.4 → 33.4 | 45.6 → 43.5 | 0 |

Renderer: ANGLE (NVIDIA, NVIDIA GeForce RTX 4060 Ti (0x00002803) Direct3D11 vs_5_0 ps_5_0, D3D11). Desktop Gallery JS increased by 15.9 ms per second in this sample. The richer live card/status/detail updates have a measurable main-thread cost; the recorded frame intervals did not show a corresponding desktop frame-rate loss. This is a single controlled observation, not a universal performance PASS. The raw data includes task/style/layout time and CPU callback percentiles.

The previous protected R2 recordings used 33 operations per route; the current recordings use 24. This 9-operation reduction comes mainly from retaining the Gallery between choices. It is an automated route count, not a human usability-study result. Progression timing remains approximately the prior 2.5-minute loop.

Playable bundle: JS 632.94KB / gzip168.44KB; CSS21.82KB / gzip5.35KB; original-model preview PNGs121.53KB. Baseline fixture JS622.23KB / gzip164.53KB (slightly different entry scaffolding). The Vite >500KB chunk warning is retained; no dependency or renderer replacement was used to hide it.
<!-- metrics:end -->

## Targeted QA and limits

| Check | Evidence / scope |
|---|---|
| Strict TypeScript | R3.2 app + referenced R2 sources typecheck |
| Vite build | Playable / live fixture / unchanged R2 baseline builds. Known >500KB JS chunk warning retained |
| R2 rules | Original unchanged 11 core tests rerun; `core-test.txt` |
| Browser integration | `browser-qa.json`: 14 groups; mouse/keyboard/touch, placement, reservations, cancellation, reload, preferences, JA/EN, corrupt save, denied/quota storage, 2-tab conflict, pause/hidden, WebGL loss/unavailable, failed JS, reduced-idle behavior |
| Audit regressions | `audit-regressions.json`: 3 groups; real AudioContext lifecycle/oscillator creation, replacement focus and JA/EN market rate, actual courier arrival across reload |
| Real progression | Both full loops; actual state changes, no individual assignment, ordinary pacing |
| Visual evidence | Normal-route and explicit-comparison screenshots, initial/construction/placement/developed states |
| Review route | `review-qa.json`: comparison controls/images, videos/short excerpt, links, responsive page, errors/external requests |
| Isolation/Security | `security.json`, `preservation.json`; dedicated distribution and untouched prior artifacts |

Untouched public games / Portal / Consent / ads were not replayed or rebuilt; preservation hashing covers their existing source/artifacts and prior evidence. A new whole-repo QA PASS is not claimed. Protected R2 core/scene/audio remain byte-identical; expected shared-runtime behavior is assessed with targeted candidate checks and reused baseline evidence.

Performance measurements are sequential on the same Windows Edge/GPU, one 7-second sample window per cell after 1.2-second warmup. Initial state/camera/viewport/DPR/quality match. UI remains visible and workers actually run. Render interval, callback CPU time, CDP script/task/layout/style time, draw calls, buffer dimensions and JS heap are recorded. Main-thread timing is not GPU elapsed time or process-total memory. Physical-phone performance/thermal/battery, Safari/iOS, long sessions and statistical repeatability remain unverified. The low-quality mode keeps R2's 30Hz cap; it is not expected to match the standard-mode interval.

Physical smartphone/touch feel, iOS/Safari, screen reader, native 200% scaling, real listening and external first-time play remain **NOT TESTED**. Human's subjective quality, unobstructed island, construction clarity, Settings quality, non-regressed controls and desire to keep developing the island remain **PENDING**. PC/emulated checks do not establish any of these gates.

## Safety, provenance and process

- Dedicated source/build/save/review under `game005-island/r3-2/`; existing R1/R2/R3/R3.1 retained, including ignored prior builds/evidence. All writes and browser temp profiles are repo-local.
- Primary and independent bounded read-only reviewer actual model: **gpt-6-astra**. No additional writer, external generation, material acquisition, dependency install, purchase or external service connection.
- Gitleaks 8.30.1 scoped scans cover the new candidate/distributions/review without relaxing scanner configuration. Earlier full-project raw FAIL with six known findings and original dispositions is preserved, not relabelled PASS. No new full-project/index/history scan is claimed; no Git write was authorized.
- stage / commit / push / deploy / LAN / firewall / external setting changes: **none**. Published four games, Portal, Consent and ad-related work preserved.
- Only the new Review server remains for this task: loopback **127.0.0.1:4394, PID23848** at the recorded process identity. Test browsers and one-shot scripts exit. Existing 4391/PID26592, 4392/PID43724 and4393/PID38168 are retained.
- Safe stop from repo: `powershell -NoProfile -File game005-island/r3-2/scripts/stop.ps1`. It checks command line, creation time and listener ownership before stopping that PID.

**Final gate:** `GAME005_UI_LIVE_INTEGRATION_R3_2_READY / HUMAN_LIVE_CRAFT_UI_GATE_PENDING`.
