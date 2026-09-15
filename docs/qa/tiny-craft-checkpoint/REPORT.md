# Tiny Delivery Craft Pilot 01 — accepted checkpoint

Date: 2026-09-15. Primary actual model: **gpt-6-astra (high)**, verified in this session's turn_context. Independent read-only source and boundary review: **gpt-6-astra (medium)**. No global configuration or billing changes.

Independent review found no runtime blocker. It corrected the reusable comparison description: A preserves existing pre-pilot Motion with no SFX; B has improved Motion only; C adds SFX. The baseline record reflects that correction without altering accepted source or media.

## Acceptance and preservation

**Human Craft Acceptance PASS** for current Tiny Delivery **C (Motion + SFX)** is recorded as [Craft Baseline R1](../../games/CRAFT_BASELINE_R1.md). Human accepted Motion/SFX direction, operation → reaction → outcome, integration with R5 Visual, and current Tiny C experience. C-alt remains a candidate. Reuse principles and comparison method, not Tiny's literal sounds/effects in other games.

[Original A/B/C Review](../tiny-craft-pilot-01/REVIEW.html) and all original evidence are preserved byte-for-byte: A/B/C/C-alt D01/D12/D18 recordings, 11 listening WAVs, conditions and measurements. Its earlier pending language is a historical pre-review record. Final checks do not overwrite it.

[Preservation evidence](preservation.json) compares the 1,392 starting files against the Human-reviewed working tree. Accepted runtime, rules, 57 puzzles/answers, saves, R5 Art, direct input, Portal, onboarding and prior QA/security remain byte-identical. Only current acceptance docs and three QA output-directory options changed during this checkpoint. START_HERE and the Playbook attachment remain unchanged. New QA artifacts are separate.

The checkpoint includes the inherited uncommitted onboarding work required by the current C tree: Two Ways learning levels/answers (T19–T21 and stable-ID progression), Lightwork causal feedback, their integration, tests and evidence. Excluding those imports/data would break the 57-puzzle baseline. This preservation does not expand the Craft acceptance to other games.

## Final technical QA

See [machine summary](qa-summary.json) and linked JSON/log files in this directory. These are fresh checks of accepted C, not inherited PASS labels.

| Check | Result |
| --- | --- |
| Type/Astro check | PASS: 0 errors, warnings or hints |
| Unit tests | PASS: 181/181 |
| Normal / Design / Prototype build | PASS: 18 / 62 / 26 generated HTML routes |
| Routes and output isolation | PASS: 7/7; zero released games, 10 isolated Design samples |
| All 57 puzzles, frozen solution/intermediate states and reload | PASS: 57/57 (Lightwork 18, Two Ways 21, Tiny 18) |
| Tiny all 18 puzzles × sound / mute / reduced motion | PASS: 54/54; states and final saves agree |
| Craft browser lifecycle/settings/events | PASS: 26/26 |
| Input / state / regression | PASS: 14/14, 6/6, 15/15 |
| JA/EN and normal/portrait/landscape layouts | PASS: 54/54 |
| Responsive / Visual contract / learning-cause regression | PASS: 84/84, 6/6, 32/32 |
| Portal regression | PASS: 19/19 |
| Preserved comparison Review/media integrity | PASS: 5/5 |

Craft checks cover Motion and SFX triggers, mute/unmute and gain persistence, Undo, pause/resume, edit/level/step/layout cancellation, synthetic visibility hidden/return, mock-ad pause, terminal cue coalescing, final completion by stable ID, unsupported/rejected audio recovery, corrupt/denied/no-op settings storage, JA/EN settings in three layouts, silence in other games, and reduced motion. No console errors or unexpected external requests in the browser cases.

Visibility events are **synthetic browser lifecycle verification**. They do not establish physical smartphone background/return behavior. Full-run automation establishes rules, states and save continuity; Human has not accepted the gameplay of all 57 questions. Graph-tapped audio decoding establishes nonzero signal and numerical headroom only; no speaker-output or perceptual-sync claim is added. Human listening acceptance comes only from the user's scoped C decision.

## Security and diff

[Security record](security.json): whole-project Gitleaks raw result retains the one known candidate at `.tmp/r3-before/manifest.json`, type `generic-api-key`. Exact approved file/line/field and current SHA256 provenance are rechecked, approval records unchanged, no source usage and **zero new candidates**. Human disposition remains **FALSE POSITIVE / NON-CREDENTIAL / APPROVED**, limited to that candidate. No values, provider validation, new exception or suppression.

Tracked diff check PASS. New-text check has only the original Playbook attachment's existing Markdown hard-break whitespace; attachment equality is verified, with zero introduced code/document whitespace defects. Staged diff must retain this exact classification. Full-index scan and installed pre-commit hook must PASS before commit; local-history scan must PASS before push. Actual results and commit/reference receipts are written to `.tmp/craft-checkpoint/postflight.json` outside the index after those operations.

## Authorized Git operation

User explicitly authorized one verified checkpoint commit and one normal fast-forward push to **existing Private origin/main**. Before work, local HEAD, tracking origin/main and actual remote main all equaled `7815bf03377e1063112406d28e404beffb017c5a`; branch main, index empty, stash empty. Repository metadata confirmed Private, default branch main and push permission.

Stage only the verified explicit file manifest for preserved onboarding + Craft implementation/evidence and the acceptance/checkpoint records. Recheck unchanged source, index bytes, remote baseline and private status. Commit parent must be the starting SHA. After commit, history scan and fast-forward ancestry must pass; normal push may advance only that unchanged remote base. After push, local HEAD, origin/main and actual remote main must all equal the checkpoint SHA, with clean worktree and unchanged stash. Receipt is local to avoid embedding a commit's own SHA into itself.

No force push, rebase, history rewrite, deploy, public release, real ads, BGM, audio rollout to other games, purchase, external audio service/contract, external message or new game production. This is one-time checkpoint authority, not standing permission for subsequent commits/pushes.

## Unaccepted gates / stop

- Physical smartphones and actual device background/return: **NOT TESTED**.
- First-time users and Human gameplay acceptance of all 57 puzzles: **PENDING**.
- Public release, final legal and real ads: **PENDING / NOT AUTHORIZED**.
- Lightwork / Two Ways Audio/Motion: **NOT ACCEPTED / NOT IMPLEMENTED by this Craft pilot**; regression only.
- New sound variant C-alt: comparison evidence only, not accepted C.

Stop after the authorized checkpoint and its final report. Do not extend the current Tiny Craft PASS to any gate above.
