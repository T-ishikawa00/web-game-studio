# Lightwork Craft Recipe — Draft / Human not yet accepted

## What was reused

Tiny contributed the process: preserve → one representative scene → matched silent/sound comparison → lifecycle QA → Human review. No Tiny PCM, timbre recipe, effects, tempo, music or preferences were imported. Canonical Tiny and shared game sources remain untouched.

## Lightwork design

- Seven original deterministic synthesis recipes in `src/prototypes/light-craft-sound.ts`: rounded harmonics, percussive envelopes, weak filtered noise and short decays. Each has a fixed event seed. No external samples, music or synthesis API. PCM is not peak-normalized; the export applies the exact runtime gain and PCM16 quantization only. Rights final approval is not implied.
- Mirror, switch, mechanical latch and flower/result each have distinct roles. Optional ray/split sounds were omitted to preserve silence. No punishment sound for rerouting away from a flower or into a wall. Retained gates remain silent.
- `lightCraftPlan()` derives actual phases from `lightCause()` and phase `traceLight()` lit results. Both visual and audio schedules consume that plan. Same-time gates/flowers are grouped for sound only. Clear replaces the last flower group; Undo never emits restored achievements.
- Baseline timings remain ray100 / branch110 / switch215 / gate245 / phase300ms; mirror response150ms. Across all18 authored solution sequences, no flower timing changed. B/C's visual difference from A is intentionally small. The new planner allows a flower already reached in an earlier real phase to respond there instead of waiting for the final phase.
- One `performance.now()` origin maps to Web Animations and AudioContext relative offsets. Scheduled sources use the audio clock; initial input audio has a10ms safety offset. Resume accepts only the current generation within90ms, otherwise drops the cue. This does not establish perceived or device-output synchrony.
- Per-game versioned `wgs:audio:light-garden`; default master0.55 × role gain0.16–0.30. Corrupt preferences fall back to0.35 and retain the original value. Mute, gain and reduced motion are independent; settings failures leave gameplay usable.
- Bound concurrent/fading voices to3 using actual interval overlap, with finite16-cue scheduling and80-entry diagnostics. Future scheduled sources do not consume a simultaneous-voice slot. Cancel stops/disconnects pending sources and fades active sources for8ms. Menus, Undo, levels, pause, hidden, pagehide and layout/width changes cancel both presentation and audio.

## Source and build ownership

`scripts/lightwork-build.mjs` bundles the existing `game-r2.ts` via9 named, exact-match asserted hooks into `.cache/lightwork-craft/prototype-assets/lightwork.js`. The source file and Tiny's strict manifest are unchanged. The dedicated server chooses this script only for Lightwork; normal/design/prototype builds contain no Lightwork Pilot module or review/audio samples. Full transformation and reproduction receipts stay in `.tmp/lightwork-build/`.

Reproduce: normal3 builds via `node scripts/lightwork-qa.mjs build`; `node scripts/lightwork-server.mjs` binds127.0.0.1:4340. `node --import tsx scripts/lightwork-samples.ts` reproduces standalone WAVs. Browser tests use `QA_R5_BASE_URL=http://127.0.0.1:4340` and project-contained `QA_R5_OUTPUT_DIR`.

## Self-review and corrections

- A failed AudioBufferSource start originally left a partial voice. Independent Astra review reproduced it; the catch now stops/disconnects each partial node and clears the voice. A healthy start restores the unavailable status. Targeted real Edge failure/recovery tests pass.
- Initial tests sampled a480ms result before its215ms delayed tail ended; corrected the test observation window. A mock-ad test initially ignored the existing1200ms input cooldown; it now verifies the cooldown and then actual pause rather than weakening gameplay/ad policy.
- MediaRecorder initially omitted graph-idle intervals. The QA-only tap now supplies zero-valued ConstantSource samples to its recording destination so silence occupies real time. It is not connected to the speaker and is absent from gameplay. C clips were re-recorded; prior attempts are retained in `.tmp/lightwork-media/attempt-1/`.
- Primary inspected live browser play and decoded successive L15 video frames: inlet/branches, gate A then gate B, restored final beams and unchanged hit-target positions. Static layout images alone were not used as Motion evidence.

## What can transfer later

Exact build hooks, shared causal schedule, cancellation tests, matched input recordings and explicit listening limits are reusable techniques. These sounds, gain values and visual preferences are **not Studio standards**. Listening pleasure, fatigue, perceived synchrony, Lightwork physical devices and first-time comprehension remain unverified. Freeze/adoption requires Human Craft Review.
