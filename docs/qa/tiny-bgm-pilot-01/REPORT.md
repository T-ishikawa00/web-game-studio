# Tiny Delivery BGM Pilot 01 — Human Review PENDING

## Decision to make

Does adding music **clearly improve** the Human Accepted C experience? C remains the canonical [Craft Baseline R1](../../games/CRAFT_BASELINE_R1.md), commit `51ad2d0fe065f07876bd2bbf0410a578c3575a1f`. Neither BGM candidate is adopted. If neither improves concentration, integration, repeat listening and Tiny's character, retain C. No BGM is a valid outcome.

[Open Review](http://127.0.0.1:4329/) / [local Review HTML](REVIEW.html). Primary actual model **gpt-6-astra / high**, verified from current session turn_context; independent read-only architecture and failure review **gpt-6-astra / medium**. No global configuration or billing changes.

## Candidates and mix

| Condition | Authored direction | Arrangement |
| --- | --- | --- |
| C | Accepted Motion + accepted SFX, no BGM | Unmodified game/Motion/SFX source and compiled JS/CSS |
| D1 | Minimal Toy Electronic | 80 BPM, 96 seconds / 32 bars, 128 events; pluck, soft pulse bass, tiny dry mechanical brush rhythm; four phrases with breathing bars |
| D2 | Calm Mechanical / Ambient | 64 BPM, 120 seconds / 32 bars, 46 events; sparse inharmonic mallet, soft short-envelope harmony; no continuous drums, space in each phrase |

These are different compositions, harmony/rhythm/density/instrument arrangements, not timbre swaps of one song. Source: `src/prototypes/music-score.ts`, render: `scripts/bgm-samples.ts`. Locally authored and synthesized, no samples, imported compositions, external audio API, purchase or contract. No long reverb. This establishes provenance, not legal/publication clearance or professional music quality.

- SFX unchanged: gain **0.35**; existing mute becomes master mute in the pilot.
- Music independently enabled and selected, gain **0.18**, allowed range **0–0.50**. Separate `wgs:music-pilot:tiny-delivery` preference with strict version/schema and readback validation; progress schema unchanged.
- Raw peak cap **0.25** per candidate; actual RMS 0.03023 / 0.02868 (about 0.46 dB difference). Same gain and peak cap, **not a claim of perceptual loudness equality**.
- Conservative simultaneous maximum: accepted SFX bound 0.722 + music 0.125 = **0.847**, below digital full scale. [Numerical measurements](audio-measurements.json) do not prove masking or listening comfort.
- Start fade 120 ms, stop fade 35 ms; one looping music source, sample-clock loop. Arrival briefly ducks music; clear/collision stops music while accepted result SFX remains unchanged. No gameplay timing change.
- Playback starts only after a trusted board/control gesture. Settings/menu/clock/pause/hide/layout/level transitions cancel it; closing settings or returning to the tab does not automatically replay. The next accepted interaction starts a fresh loop at its beginning, never drains stale queued notes. Frequent settings/restarts can therefore revisit the opening phrase: Human should assess that repetition too.
- New comparison URL chooses C/D1/D2; same-condition reload retains music choices. C is locked to no music in both controller and settings; select D1/D2 to experiment. Music gain zero and SFX gain zero are independent. Malformed/future preference is retained and reported temporary; asset failure reports unavailable and allows retry.

## Isolation and comparison evidence

Accepted 4324 remains available. The pilot runs at **4328**, with separate browser storage by origin. It does not inherit or overwrite Human progress/mute from 4324. Its static base is a preserved accepted build; `scripts/bgm-server.mjs` injects one extra module only into the Tiny iframe. Other games, game source, Motion/SFX source, all 57 puzzle definitions/answers, R5 Art, direct manipulation, saves, JA/EN, three layouts and previous A/B/C evidence stay unchanged. Pilot controls exist only in Tiny's isolated settings.

[Nine videos](media.json): C/D1/D2 × D01/D12/D18, same initial board, authored input timestamp schedule, 1440×1600 browser / 432×768 crop, SFX 35%, final run state and SFX event counts. Measured dispatch lateness is recorded (maximum 16 ms); browser input is not claimed sample-exact. Music is the sole experimental condition. Live trial links keep ordinary save behavior; use fixed videos for controlled same-state comparison.

Videos contain actual Edge gameplay and simultaneous SFX/music output-graph captures, mixed live in a capture-only AudioContext and muxed by measured wall time. No reconstructed or post-dub sound. [Capture checks](review-results.json) verify nonzero finite signal, numerical headroom and playable media. They do not verify physical output or perceptual synchronization.

Standalone WAVs and **5:30 actual-runtime music recordings** are embedded in the Review. Long-listen controls can also repeat each authored WAV for 330 seconds. Only one review media element plays at a time. Listening quality is not auto-scored.

## Technical QA

[Machine summary](qa-summary.json), [lifecycle](lifecycle-results.json), [edge cases](edge-results.json), [loops](loop-results.json), [Tiny real-time runs](full-run-results.json), [preservation](preservation.json), [security](security.json).

[Final reference/audio check](final-check.json): C cannot enable music through UI or controller; accepted SFX still plays. Both 330-second actual recordings decode with peak below 0.046, and Review playback does not overlap media.

| Verification | Result |
| --- | --- |
| Type/Astro, unit, builds and routes | PASS: 0 diagnostics, 185 unit tests, 18/62/26 build routes, 7 route/isolation tests |
| Tiny all 18 × C/D1/D2, actual 600 ms gameplay ticks and saved completion | PASS: 54 real-time runs |
| Full 57 puzzle regression / input / state | PASS: 57 / 14 / 6 |
| Cross-game regression / layouts / responsive / visual / onboarding cause | PASS: 15 / 54 / 84 / 6 / 32 |
| Accepted Craft Motion/SFX and settings regression | PASS: 26 |
| BGM lifecycle + edge cases | PASS: 19 + 4 |
| Portal | PASS: 19 |
| Comparison media/Review | PASS: 12 |
| Each direction 330 seconds real-time looping | PASS: 2 continuous runs; one active source, no duplicate start, no failure; at least 3 D1 / 2 D2 boundaries |

Loop tests use actual browser wall/audio clocks, not accelerated/offline playback. [Loop results](loop-results.json) record every 30 seconds and phase drift; the rendered boundary has zero endpoint discontinuity. **Whether boundaries or repetition feel unpleasant remains Human PENDING.** Physical smartphones, real device background/return and perceptual sync remain NOT TESTED; visibility automation explicitly overrides document.hidden and dispatches a synthetic event.

Independent review fixed partial-node cleanup, fallback stop after failed fade, stale asynchronous failure status, honest unavailable/recovery messaging, and a strict no-music lock for C. Tests initially caught an ambiguous retry selector, a mistaken assumption about settings-close playback, missing old preview servers, and the existing mock-ad idle guard; the harness was corrected and affected suites rerun. D1/D2 playback paths were verified in fresh 330-second recordings; the subsequent C-only lock was verified separately without altering those paths. Prior attempts stay in ignored local evidence; no failed attempt is relabeled PASS.

## Local quality and delivery limits

The authored phrases, distinct arrangements, dry envelopes, silence and restrained mix provide concrete Human comparison candidates. This is **not a completed-quality or listening PASS**. D1 may still sound too synthetic in its pluck/brush body; D2 may feel static or lack the organic softness of a felt mallet. These are questions for this review, not observed Human complaints.

Review WAVs are stereo 32 kHz PCM: about **12.3 MB / 15.4 MB**. Observed browser decoded buffers at 44.1 kHz are **33.9 MB / 42.3 MB**, one direction retained at a time. C decodes no music. This uncompressed pilot delivery is not a final mobile distribution choice; compressed asset size/decoding and real devices need a separate follow-up only if Human selects music.

If timbre is the shortfall, a sound designer's original soft pluck/felt-mallet instruments and restrained final mix are the most targeted next step. If musical development is weak, an original composer arrangement is more targeted. A suitable royalty-free licensed long-form underscore is an alternative when its edit/loop/streaming rights fit. External AI music generation could explore more directions, but would still need licensing review, stem/edit control and in-game comparison. None was connected, purchased or contracted, and no external option is required to keep C.

## Reproduction and stop

From this repository, after the existing accepted prototype build is available:

1. `node --import tsx scripts/bgm-samples.ts` — authored WAVs and measurements.
2. `node scripts/bgm-build.mjs` — isolated build from preserved `.tmp/bgm-before/prototype-dist`; this local snapshot is retained.
3. `node scripts/bgm-server.mjs` — pilot 4328.
4. `node scripts/bgm-review.mjs` then `node scripts/bgm-server.mjs --review` — Review 4329.
5. Do not duplicate servers on occupied ports. Accepted prototype server remains 4324; Design QA 4323 and normal QA 4322.

Stage **0**, commit **0**, push **0**, deploy **0**, purchase **0**, external audio API **0**, new service contract **0**. HEAD/tracking/index unchanged at the accepted checkpoint. Known security disposition remains limited to its exact original candidate; no new scanner exception or provider check. Full-index scan is read-only; newly untracked files are covered by whole-project scan. Diff check includes new text.

Stop for Human judgment: C is clearly better / D1 / D2 / revise direction. Ask whether music clearly improves C, supports concentration, integrates with SFX, stays pleasant on repetition and feels like Tiny Delivery. No selection preserves accepted C. Do not extend this review to physical devices, first-time users, Human gameplay of all 57 puzzles, publication/legal/ads or other games' Audio/Motion.
