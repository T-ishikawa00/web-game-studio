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

- Accepted PCM asset: B.wavは最終候補D1.wavとbytes単位で一致します。候補側SHA-256は05b01efe37574c335b5164b92c8c80896e20a452696fd66fd55c1d5336a75945です。比較用QAはローカル公開準備候補から除外しています。
- Accepted score: score-BはrhythmScore('B') in src/prototypes/music-rhythm.ts、合成kernelはsrc/prototypes/music-score.tsで生成します。
- Identity and compiled files: frozen-runtime manifest is historical evidence; detailed run captures are not included in this candidate.
- Reproduce from repository source/assets: `npm ci`, `npm run build:prototypes`, `node scripts/craft-r2-build.mjs`, `node scripts/craft-r2-server.mjs`. No ignored pre-review snapshot is needed. Build verifies every runtime file against the frozen manifest.
- 当時のlocal play確認は2026-09-15の記録です。過去のlocalhost URLや操作状態は現在の閲覧入口・稼働確認ではありません。

R1's no-BGM runtime and all other games remain intact. The new baseline is an accepted Tiny build/profile; this checkpoint does not roll music into Portal or other games.

## Human comparison and retained evidence

1. BGM Pilot: old C = R1 without BGM versus original D1 and D2. D1 was highly rated; BGM adoption was optional.
2. Rhythm Review: A = original 96-second D1; B = rhythm-only adjustment at 80 BPM; C = B at 82.4 BPM. D01/D12/D18 used the same initial state, input schedule, viewport, SFX and gain.
3. Human selected B. Original comparison evidence remains in the private source mirror; this document summarizes the accepted selection and does not include all captures or audio variants.

Prior BGM comparison evidence was kept in the private source mirror and is not included in this candidate.

## Studio reuse and remaining gates

Follow [Craft Pipeline learning](../planning/CRAFT_PIPELINE_LEARNING_R2.md): Visual → Interaction → Motion → SFX → BGM candidate → Mix → Human comparison → Freeze. Reuse decisions, comparison discipline, silence and lifecycle principles. **Do not mechanically copy Tiny's song, timbre, tempo, SFX or Motion to Lightwork, Two Ways or future games.**

Not accepted here: physical smartphones; first-time external users; Human gameplay acceptance of all 57 puzzles; Lightwork / Two Ways Audio/Motion; public release; legal; ads. No new game, external music API, purchase, contract or deployment.

Final QA and one authorized Private checkpoint: [R2 checkpoint report](../qa/tiny-craft-r2-checkpoint/REPORT.md). One normal fast-forward push only; no force push, rebase or history rewrite. Stop after its completion report. This is not continuing Git authorization.
