# Lightwork Garden Craft Pilot 01 — Review Pack

2026-09-15. **Local implementation / technical QA complete. Human Craft Review PENDING. LG-C is not adopted.**

## Review entrance

Open **http://127.0.0.1:4340/** in Edge: [all18 JA/EN play, LG-A/B/C, nine videos, seven samples and three layout images](REVIEW.html).

Server: `node scripts/lightwork-server.mjs`, binds only127.0.0.1. Dedicated rebuild: `node scripts/lightwork-build.mjs` after the existing prototype build. Menu → Settings & layout → Craft comparison preserves board and Undo; Menu → Levels →01 starts the first puzzle without deleting progress.

**Browser limitation:** all nine videos played/decoded in Edge. Codex in-app browser crashed on video playback, including after disabling preload. Use Edge for the Review Pack. Live game interaction was inspected in-app; this does not establish all-browser compatibility.

## Scope, model and preservation

- [Attachment](../../games/LIGHTWORK_CRAFT_PILOT_01_R1.md) preserved byte-for-byte.
- Start/final HEAD, origin/main and verified remote main: `e24556ba57284d993cdb0ac9c476a975f63bef11`, branch main. Remote verification was read-only; no upload.
- Actual primary and bounded synthesis/independent review models: `gpt-6-astra`. Global settings and billing unchanged.
- Initial1591 file records and copies of existing11 untracked Tiny physical-mobile/LAN files retained at `.tmp/lightwork-before/`. [Final preservation receipt](preservation.json).
- Canonical game/rules/levels/save/Undo/input/art/Tiny audio/music sources and earlier evidence remain byte-identical. Only existing AGENTS/current-status sections changed; Pilot implementation/evidence are new files.
- Original Tiny R2 builder verifies exact46 frozen files, including B /80 BPM and accepted Motion/SFX/settings. Original A/C/D2/no-BGM evidence retained. All57 puzzles remain18/21/18. Portal, fixture and10 Design Preview samples remain isolated; released games0.

## Implementation

| Mode | Behavior |
|---|---|
| LG-A | Current canonical causal feedback, silent |
| LG-B | Cause-driven Motion sharing one presentation timeline, silent |
| LG-C | Exactly B Motion plus original Lightwork SFX |

Mirror → ray/split → newly activated switch → opening gate → new flower/result follows the actual canonical cause trace. Retained gates are silent. Undo has only a short return cue. Simultaneous same-role reactions merge; clear/completion replaces the last flower cue. No per-cell noise, error buzzer, ambient loop or BGM.

Seven original synthesized roles: mirror turn, switch on, gate open, flower lit, puzzle clear, run complete and Undo. No Tiny samples or external material. Default master0.55; role gains0.16–0.30. Samples use the exact game synthesis/mix. [Sound map](sound-map.json), [Recipe Draft](RECIPE.md).

**A/B visual differences are small.** Existing ray100ms, branch110ms, switch215ms, gate245ms and phase300ms remain. [Timing comparison](timing-diff.json): zero timing changes across all18 authored solution sequences. This consolidates cause, Motion and audio scheduling; no unobserved visual improvement is claimed.

Lightwork uses its own versioned settings key `wgs:audio:light-garden`. Trusted input starts one context; stale resume is omitted. Undo/reset/level/menu/layout/compare/hidden/teardown cancel old output. Active/fading voices are bounded at3, scheduled cues16, diagnostics80. Mute/gain changes affect active audio; reduced motion is independent. Corrupt/denied saves and unavailable audio are reported without breaking play.

Five new `light-craft-*.ts` modules implement sound/plan/motion/audio/runtime. Dedicated build/server use nine exact-asserted hooks into an in-memory copy of canonical source; dedicated `lightwork.js` is isolated from normal builds. No source edits to Tiny, MutationObserver dispatch or manually edited bundle.

## Final technical verification

| Check | Result |
|---|---|
| Type check | PASS:0 errors/0 warnings;3 pre-existing unused-import hints |
| Unit | 197 PASS |
| Normal / Design Preview / prototype build; routes | PASS |
| Original Tiny frozen build | Exact46 PASS, deterministic rebuild |
| Lightwork browser suite | 27 PASS: all18×A/B/C, intermediate logic, Undo/save/reload, event/cancellation/settings/input/JA/EN/layout |
| Audio edge cases | 5 PASS: failed start cleanup/recovery, hidden delayed resume, rapid input, mock pause, untrusted input |
| All57 solution replay | 57 PASS |
| Direct input / preserved state | 14 /6 PASS |
| Pilot behavioral regression | 15 PASS: persistence failures, localization, mocks, fixture/bridge and network boundaries |
| Portal regression | 19 PASS |
| Tiny frozen audio/music lifecycle | 19 PASS |
| Review links/videos/responsive/forbidden paths/isolation/reproducibility | 6 PASS |
| Active repeat | 121 cycles /726 real mouse inputs /~303seconds; bounds held; final voices0/failures0/overlays0 |

Receipts: [qa/](qa/), [active loop](loop-results.json), [media manifest](media-manifest.json), [recording measurements](media-qa.json). Raw logs and earlier failed attempts remain `.tmp/lightwork-qa/`; final receipts identify successful reruns without relabeling old failures.

Scenes: L01 first turn/success; L05 gate/retention/Undo; L15 splitting, sequential A→B gates and two goals. A/B/C share initial state, sequence, target1100ms input intervals,1× speed, display and gain. Primary inspected live input and successive L15 motion frames including gates and cleanup.

C captures actual browser Web Audio output during recorded UI operations, aligned by measured time, not dubbed WAVs. A zero-valued source only in the QA recording graph preserves silent intervals; it is absent from Pilot code. Four actual recordings including the active loop decoded finite/non-clipping. This verifies captured output, not physical speakers or perceived sync.

Local fixes: source-start failure cleanup, availability recovery, hidden delayed-resume cancellation, recording silent intervals and Review media URL resolution. Independent final review found no remaining essential implementation blocker.

## Security — separate dispositions

| File / scanner | Human disposition |
|---|---|
| `.tmp/r3-before/manifest.json` / generic-api-key | **FALSE POSITIVE / NON-CREDENTIAL / APPROVED**, existing exact scope |
| `.tmp/physical-mobile-r2/tls/server.key` / private-key | **TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION**, current explicit approval |

**Raw full-project scan remains FAIL, two findings.** No new unapproved finding. Full index and history scans PASS separately. No scanner exception was added. [Security evidence](security.json), [TLS disposition](../../security/LIGHTWORK_LOCAL_TLS_DISPOSITION.md).

The unchanged key is under .tmp, ignored/untracked, absent from index/reachable history and served maps, build/Portal/Review/browser output and other inspected content. Local generation and sole existing LAN HTTPS use are documented. Shared HTTP/HTTPS handler rejects key paths in-memory without opening a socket; Pilot live server rejects forbidden paths. No value/key digest output, copy, transmission, provider validation, rotation, deletion or LAN restart. Repository remote absence is supported by scanned history and exact remote-main equality, not an audit of unrelated systems. Future checkpoint must recheck index/history and never include this key.

## Acceptance / stop

- **Human Craft Review PENDING:** Is C clearer and satisfying versus A? Any distracting/tiring sound? Can cause/result be followed without adding text?
- **Listening/perceptual sync NOT TESTED:** measurements do not establish pleasantness, fatigue or smartphone speaker quality.
- **Lightwork physical-device NOT TESTED:** Tiny Human device PASS is limited to its tested conditions and is not extended.
- **External first-time users DEFERRED / NOT TESTED**, not a blocker. All57 Human gameplay/public/legal/ads remain separate.
- Stage/commit/push/deploy/LAN reopening/real ads/new external API/purchase/contract/external message: **0**. BGM and Two Ways Craft rollout: **0**.

Stop for one Human Craft Review. No automatic C adoption or further variants.
