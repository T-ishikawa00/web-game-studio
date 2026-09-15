# Tiny Delivery — Craft Baseline R2

## Human BGM Acceptance PASS — 2026-09-15

**R2 = preserved [Craft Baseline R1](CRAFT_BASELINE_R1.md) + Human Accepted BGM B.**

Human formally selected **B = D1 Minimal Toy Electronic / Rhythm Refine / 80 BPM**, with the existing Accepted Motion + SFX. Human judged that D1's musical identity remained intact and the uncomfortable phrase spacing improved. A and C were also good; B felt slightly more natural, with a small preference over C's +3% tempo. This is sufficient acceptance. **Freeze B; no further tempo/phrase variants or polish.**

This decision is the user's explicit Human review, separate from technical QA. It finalizes **Tiny Delivery BGM Pilot 01: Human PASS** for this exact combination. Earlier Conditional PASS/PENDING reports remain historical evidence.

| Area | Frozen baseline |
|---|---|
| Visual | R5 Visual KEEP; Portal Baseline R1 unchanged |
| Interaction | Direct Manipulation KEEP; gameplay timing/rules unchanged |
| Motion | R1 Accepted Motion KEEP; reduced motion respected |
| SFX | R1 Accepted SFX KEEP; original event selection and result cues |
| BGM | B / D1 Rhythm Refine / 80 BPM / 96 seconds / 32 bars / 128 notes |
| Refinement | 20 existing onset positions adjusted; no added notes, timbres, melody or harmony replacement |
| Mix | Music gain 0.18, SFX gain 0.35; independent gains, existing master mute silences both; existing music gain maximum 0.5 |
| Silence and priority | Music is optional; leave rests and space for thought. SFX explains input/results. Short arrival duck; clear/failure stops music to preserve terminal cues. No gameplay delay for music. |
| Lifecycle | Trusted gesture before playback; 120 ms start / 35 ms stop fade. Single music source; cancel pending starts, pause/hidden/layout/level/exit cancellation, no stale playback on resume. Next allowed gesture restarts at offset 0. |
| Persistence | Music preferences use a separate versioned key; game progress schema and SFX preferences unchanged; storage failure is visible |
| Independence | Music/SFX volume, master mute and reduced motion remain separate controls |

## Canonical source and reproduction

- Accepted PCM asset: B.wav（参照原本はPrivate保全・候補には非同梱）. It remains at its original evidence path to avoid duplication or overwriting.
- Accepted score: score-B.json（参照原本はPrivate保全・候補には非同梱）, authored by `rhythmScore('B')` in `src/prototypes/music-rhythm.ts`; original synthesis kernel in `music-score.ts`.
- Identity, compiled files and hashes: [frozen-runtime.json](../qa/tiny-craft-r2-checkpoint/frozen-runtime.json). This binds the reviewed B waveform and actual executable runtime.
- Reproduce from repository source/assets: `npm ci`, `npm run build:prototypes`, `node scripts/craft-r2-build.mjs`, `node scripts/craft-r2-server.mjs`. No ignored pre-review snapshot is needed. Build verifies every runtime file against the frozen manifest.
- [Accepted B local play](http://127.0.0.1:4336/ja/prototypes/play/tiny-delivery/?music=D1&layout=portrait). The reviewed runtime retains its comparison controls. For R2 use **D1**; its asset is exactly B. Switching to D2 or the old no-BGM comparison is evidence review, not a baseline change. This local build is not a public release.

R1's no-BGM runtime and all other games remain intact. The new baseline is an accepted Tiny build/profile; this checkpoint does not roll music into Portal or other games.

## Human comparison and retained evidence

1. BGM Pilot: old C = R1 without BGM versus original D1 and D2. D1 was highly rated; BGM adoption was optional.
2. Rhythm Review: A = original 96-second D1; B = rhythm-only adjustment at 80 BPM; C = B at 82.4 BPM. D01/D12/D18 used the same initial state, input schedule, viewport, SFX and gain.
3. Human selected B. No-BGM C, original D1/A, tempo C and D2 remain comparison evidence, **not active R2 alternatives**. Do not delete or overwrite their scores, recordings, WAVs, QA or reports.

[BGM comparison](../qa/tiny-bgm-pilot-01/REVIEW.html) and Rhythm comparison（参照原本はPrivate保全・候補には非同梱） are preserved unchanged, including 330-second loop recordings. Their earlier pending labels describe when the evidence was made; this record supplies the current decision.

## Studio reuse and remaining gates

Follow [Craft Pipeline learning](../planning/CRAFT_PIPELINE_LEARNING_R2.md): Visual → Interaction → Motion → SFX → BGM candidate → Mix → Human comparison → Freeze. Reuse decisions, comparison discipline, silence and lifecycle principles. **Do not mechanically copy Tiny's song, timbre, tempo, SFX or Motion to Lightwork, Two Ways or future games.**

Not accepted here: physical smartphones; first-time external users; Human gameplay acceptance of all 57 puzzles; Lightwork / Two Ways Audio/Motion; public release; legal; ads. No new game, external music API, purchase, contract or deployment.

Final QA and one authorized Private checkpoint: [R2 checkpoint report](../qa/tiny-craft-r2-checkpoint/REPORT.md). One normal fast-forward push only; no force push, rebase or history rewrite. Stop after its completion report. This is not continuing Git authorization.
