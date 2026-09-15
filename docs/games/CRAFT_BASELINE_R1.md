# Tiny Delivery — Craft Baseline R1

## Human Craft Acceptance PASS — 2026-09-15

Human formally accepted **Tiny Delivery Craft Pilot 01, C (Motion + SFX)**, with a very high assessment. Accepted scope: current Motion direction, current SFX direction, support for operation → reaction → outcome, integration with R5 Visual, and the current Tiny Delivery C experience. This is an explicit Human decision, separate from automated QA.

C means the current default sound variant 0 and full motion with user preferences respected. C-alt is a comparison candidate, not the accepted baseline. [A/B/C Review Pack](../qa/tiny-craft-pilot-01/REVIEW.html), recordings, listening WAVs, comparison conditions and machine results remain preserved. Its earlier pending status describes the pre-review creation time; this decision supersedes only that Craft gate.

This PASS does **not** cover physical smartphones, first-time users, Human evaluation of all 57 puzzles' gameplay, publication, legal/ads, or Audio/Motion for Lightwork Garden or Two Ways Home. Public inventory remains zero. Portal Baseline R1, R5 Visual, three adopted cores, 57 local puzzles (18/21/18) and onboarding improvements remain protected.

## Reusable production principles

| Area | Baseline principle and current Tiny example |
| --- | --- |
| Select Motion | Explain a state change: accepted editing input, robot travel, arrival and outcome. Preserve board coordinates, hit targets and immediate direct input. Decorative motion must earn its place. |
| Select SFX | Distinguish accepted arrow/wait edits, Undo, starting a run, arrival, collision, clear and completion. Trigger from the accepted action/result, never from rendering. |
| Preserve silence | Leave unchanged input, pause/resume, settings navigation and intermediate simulation ticks silent. Coalesce final arrival with clear/completion; avoid duplicate rewards. |
| Length and response | Current input/move/arrival/result motion is 140/180/240/200 ms; result follows the 180 ms travel. Cues are 75–620 ms. These are bounded Tiny examples, not universal timings. Never delay input or change rules to accommodate an effect. |
| Volume | Independent mute and gain, default 0.35, voice scale 0.65. Maximum three live voices, with one reserved for results; bound overlap and cancellation fades. Numeric headroom is engineering evidence, not a listening verdict. |
| Input and audio | Unlock/resume the audio context through real user interaction; play only accepted events. Tie sound and visual reaction to the same transition. Browser graph capture does not prove physical or perceptual synchronization. |
| Lifecycle | Cancel voices, pending effects, animations and arrival ghosts on pause, visibility loss, page exit or layout reinitialization. Suspend audio when inactive; recover through user input without replaying stale cues. Persist audio preferences separately from game progress. |
| Accessibility | Mute and reduced motion are independent. Reduced motion removes transient animation while retaining essential state information. Persistence failure is visible and does not corrupt saves. |
| A/B/C comparison | A = existing pre-pilot Motion, no SFX; B = improved Motion only; C = improved Motion + SFX. Replay the same D01/D12/D18 solutions with the same viewport, input schedule, level data and gain; change only comparison conditions. Keep C-alt separate. Preserve recordings and measurement limits. |
| Human Craft Gate | Technical QA precedes Human review. Human judges direction, timing, sound, reaction and visual integration for the named game and variant. Record exact acceptance and exclusions; do not infer device, gameplay or launch acceptance. |

Reuse this selection and evaluation process in future authorized work. **Do not mechanically copy Tiny's concrete sounds or effects to Lightwork or Two Ways.** Each game needs its own event selection, silence, timbre, motion and Human Craft Gate. This record authorizes no BGM, audio rollout or new game production.

## References and checkpoint

- Operating standard: [Production & Growth Playbook R2](../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md).
- Current state: PRODUCTION_CURRENT（参照原本はPrivate保全・候補には非同梱）.
- Final verification and dependency scope: [checkpoint report](../qa/tiny-craft-checkpoint/REPORT.md).
- Source: `src/prototypes/craft-sound.ts`, `craft-audio.ts`, `craft-motion.ts`, `game-r2.ts`.
- Accepted source captured at checkpoint start in `.tmp/craft-checkpoint/start.json`; final preservation evidence verifies runtime and original comparison evidence remain byte-identical.

Human permits one verified checkpoint commit and normal fast-forward push to existing Private origin/main. No force push, rebase, history rewrite, deploy, public release, real ads, purchase, external audio contract or new game production. After this checkpoint, further Git publication needs a new instruction.
