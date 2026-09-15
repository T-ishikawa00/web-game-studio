# Tiny Delivery Craft Baseline R2 — Human Accepted BGM checkpoint

## Result and acceptance

**Tiny Delivery BGM Pilot 01: Human PASS.** Human selected **B = D1 Minimal Toy Electronic / Rhythm Refine / 80 BPM**, combined with Accepted Motion + SFX. A and tempo C were also good; B was slightly preferred as most natural. D1 identity was retained and the spacing concern improved. This judgment is sufficient: no further tempo/phrase refinement, sound authoring or variants.

[Craft Baseline R2](../../games/CRAFT_BASELINE_R2.md) preserves R1 and adds B. [Craft Pipeline learning](../../planning/CRAFT_PIPELINE_LEARNING_R2.md) records Visual → Interaction → Motion → SFX → optional BGM candidate → Mix → Human comparison → Freeze. Compare no-BGM, diagnose timing before rewriting, prefer minimal changes, stop when Human judgment is sufficient, and separate technical measurements from listening acceptance.

Actual primary model: `gpt-6-astra` (high), current session turn_context. Independent read-only reviewer: `gpt-6-astra` (medium). No global configuration, model-plan or billing change.

## Preserved build and evidence

- R5 Visual, Direct Manipulation, Accepted Motion/SFX, gameplay and all 57 puzzles, saves, JA/EN, three layouts, Portal and other games are unchanged.
- Accepted source/score/B PCM and all historical evidence remain byte-identical to this task's start. Original D1/A, tempo C, D2 and no-BGM C remain comparison evidence, not active baseline alternatives.
- All 46 files in the reproduced local R2 runtime match the Human-reviewed B runtime, including B.wav served under the runtime's D1 asset name. [Frozen manifest](frozen-runtime.json) binds that identity.
- A new reproduction script uses repository source and retained WAV files. It removes the need for ignored pre-review snapshots; the old comparison scripts remain preserved. Run `npm run build:prototypes`, `node scripts/craft-r2-build.mjs`, then `node scripts/craft-r2-server.mjs`.
- [Accepted B play](http://127.0.0.1:4336/ja/prototypes/play/tiny-delivery/?music=D1&layout=portrait). This is the exact reviewed comparison runtime/profile: keep D1 selected for R2. Other selector directions are comparison tools, not accepted R2 alternatives. Normal Portal and R1 runtime remain unchanged; no public release or other-game music integration.
- Original 330-second recordings, loop measurements, nine videos and standalone A/B/C tracks were **not regenerated**. Their byte identity supports reuse. [Preservation receipt](preservation.json).

## Final QA

Fresh checks target the reproduced R2 build where relevant. [QA summary](qa-summary.json) and `qa/` hold the receipts.

| Check | Result |
|---|---|
| Type check | PASS, 0 errors/warnings/hints |
| Unit tests | PASS, 189; includes exact accepted B PCM reproduction |
| Normal / Design / Prototype build | PASS |
| Route/output isolation | PASS, 7 |
| Tiny B all 18, actual timed runs + final reload/save | PASS, 18 |
| Full puzzle rules/state/save regression | PASS, 57 (18 Lightwork /21 Two Ways /18 Tiny) |
| BGM lifecycle | PASS, 19; pause/restart and JA/EN/layout/reduced-motion cases explicitly target B |
| BGM edge cases | PASS, 4; failure/collision, mock-ad, asset recovery, independent zero gains |
| Input / state / shared regression | PASS, 14 /6 /15 |
| Accepted Craft audio/Motion browser | PASS, 26 |
| Portal browser | PASS, 19 |
| Reproduced build vs reviewed B | PASS, all 46 files exact |
| Existing layout / responsive / visual / cause evidence | Reused PASS, 54 /84 /6 /32; source and evidence byte identity verified |
| Existing comparison media/control checks | Reused PASS, 14; no replacement recording |
| Existing B 5min30s loop | Reused PASS, 330.20 seconds /3 boundaries /single source; no new long run |

Checks cover B asset selection, accepted SFX/Motion, music/SFX gains, master mute, pause/resume, synthetic hidden/return, repeated and rapid restart, clear/failure, level transitions, layout switches, JA/EN, save/Undo, reduced motion independence and other-game isolation. All57 generic regression verifies original rules/state/save; the separate actual timed Tiny18 suite explicitly enables BGM B.

Visibility tests synthesize browser events and do not establish physical OS backgrounding. Numeric audio/headroom/clock evidence is separate from Human listening. Human B acceptance comes solely from the user's stated review, not from these tests. Earlier pending reports are historical and remain unchanged.

## Security and authorized checkpoint

Starting local HEAD, origin/main and actual remote main all matched `51ad2d0fe065f07876bd2bbf0410a578c3575a1f`. Branch main, initial index empty, stash empty. GitHub metadata verified **Private**, repository **T-ishikawa00/web-game-studio**, default branch main, push permission. Stop on unexpected remote advancement.

The checkpoint includes the inherited uncommitted BGM Pilot/Rhythm implementation, comparison media, tests and documentation needed to reproduce the accepted B, plus current R2 acceptance, build recipe, final QA and Studio learning. It does not rewrite old evidence or the R1 baseline. The reviewed stage manifest is `.tmp/craft-r2-checkpoint/stage-manifest.json`.

[Security receipt](security.json): raw full-project Gitleaks retains the single known `generic-api-key` candidate at `.tmp/r3-before/manifest.json`. Exact approved file/line/field and rehash are verified against unchanged Human **FALSE POSITIVE / NON-CREDENTIAL / APPROVED** disposition. Zero new candidates or exceptions; no values emitted, provider validation or secret operation. Index/history scanners do not suppress this candidate; it is not committed.

Tracked and new-text diff checks PASS. Full candidate index must pass Gitleaks and the installed pre-commit hook before the single checkpoint commit. Local history must pass before the single normal fast-forward push. Immediately before push, recheck unchanged starting remote, private status and ancestry. After push, local HEAD/origin/main/actual remote must match, with clean worktree and unchanged stash.

Final commit SHA/parent, index/hook/history outcomes and exact post-push references are saved in `.tmp/craft-r2-checkpoint/postflight.json` and reported to Human. That postflight receipt is intentionally outside the commit to avoid recording a commit's own hash inside itself. This report records the gate requirements; actual Git completion is established by the final receipt.

No force push, rebase, history rewrite, deployment, public release, real ads, purchase, external music API, contract, new game production, Tiny redesign, further D1 variants or other-game Audio/Motion rollout. This is one checkpoint authorization only; stop after the completion report.

## Remaining gates

- Physical smartphones: NOT TESTED.
- First-time external users: NOT ACCEPTED.
- Human gameplay acceptance of all 57 puzzles: PENDING.
- Lightwork / Two Ways Audio/Motion: NOT ACCEPTED; regression only.
- Public release, legal and ads: NOT ACCEPTED / NOT AUTHORIZED by this task.
