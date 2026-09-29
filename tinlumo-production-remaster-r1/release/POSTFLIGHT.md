# Tinlumo Production Remaster R1 — Production released

2026-09-27 JST. **PRODUCTION RELEASE COMPLETE / PRODUCTION SMOKE PASS** within the scope below. Latest Human Production Release Gate approved this exact integrated RC, scoped staging, checkpoint, private normal push, deploy and smoke. No additional remaster implementation was made in this release turn.

## Release identity

| Item | Verified result |
|---|---|
| Commit | `af7016d14c9f151a9c1136379c85de26bbe24e2a` |
| Parent | `57b1daab800a5ad85fef705de05e96657a0b7f93` |
| Git | main / origin/main / actual remote main equal; private repository; normal push; no force |
| Worker | tinlumo-production |
| Version | `aad80d7b-373b-4dc3-8026-40fbb73c14e5` |
| Deployment | `3827f5b6-87bb-4d0f-a273-3e164fcc8f98` |
| Traffic | 100% new version; workers.dev and preview URLs remain disabled |
| Deploy completed | 2026-09-27 15:02:16 JST |
| Artifact | release-artifacts/tinlumo-visual-remaster-r1; 101 committed files |
| Served bytes | 100/100 public files match approved manifest and committed artifact; `_headers` is provider configuration |
| Routes | 39/39 public routes HTTP 200 and exact content; missing route HTTP 404 |

Evidence: [deploy](deploy.json), [cloud postflight](cloud-postflight.json), [served content](live-distribution.json), [Git postflight](git-postflight.json), [push](push.json). Preview worker remains on version `590239ba-da9d-43b4-835a-57c165fb6e65`, deployment `a75b3b1b-71fe-4abd-93e8-699343c428f2`.

## Production smoke

Native browser interaction on https://tinlumo.com. No save injection, save reset, accelerated clock or browser-profile copy.

| Game | Normal Production verification | Save / reload |
|---|---|---|
| Hakorilo U1 Full18 | D01 saved arrows North/East, Go, delivery success at six beats | Existing 1/18 and D01 completed retained |
| Lightwork Garden L1 Full18 | L01 mirror click, flower 1/1, success | Continue restored solved L01 |
| Two Ways Home T1 Full21 | Display01/T19, Right once, both home | Existing 1/21 and T19 completed retained |
| PROJECT MAGNET M2 | Existing A01 resume, keyboard input submitted, pause responded | A01 checkpoint and unlock state retained; mission completion not rerun live |
| An Island Connected | Dock repair requested through normal UI, automatic worker completion | Completed dock persisted after reload; Accepted payload unchanged |

JA and EN launch routes verified for all five. Island retains the Accepted saved-language precedence: EN route can initially show saved JA; normal Settings → English produces English UI and EN return link. Original JA preference was restored. This behavior was already observed in the accepted RC; no gameplay or save change was made.

Home JA/EN loaded; mobile EN 375×812 had no horizontal overflow. Visible game-card images loaded. Four inactive hero slides were lazy and had not loaded at the sampled moment; all underlying served assets separately matched exactly. Captured browser console errors: zero. Session network buffer was truncated, so it is not exhaustive negative evidence. A separate fresh post-withdrawal reload capture was complete and showed only tinlumo.com.

Consent C: no initial panel and zero beacon scripts; explicit Allow inserted one beacon; reload retained allowance; explicit decline/withdraw plus reload restored zero beacon and closed panel. Final smoke browser preference is measurement OFF. No Ads, CMP, AdSense/H5, analytics provider settings, Google, DNS, email or social configuration changed.

Evidence: [browser smoke](browser-smoke.json), [JA Home](screenshots/production-home-ja.png), [EN mobile](screenshots/production-home-en-mobile.png), [Hakorilo](screenshots/hakorilo-success.png), [Lightwork](screenshots/lightwork-success.png), [Two Ways](screenshots/two-ways-success.png), [Magnet](screenshots/magnet-play.png), [Island](screenshots/island-save.png).

Physical iPhone/Android/Safari, real finger touch and full-game playthroughs were not repeated in Production. RC evidence remains: 414 tests; 312 responsive cases; normal-input full18/18/21 puzzle runs; accepted full Magnet/Island evidence reused with source/payload identity. Production smoke is a release sanity check, not replacement Human full-game acceptance.

## Security and scope

- Exactly 242 reviewed paths committed: manifest-listed 240, manifest itself and only the owned Current block. No broad add. Stage receipt and committed path equality verified.
- Fresh post-stage gate: raw full-project **FAIL22 retained**, known17 + specifically Human-disposed5, additional new candidates **0**. Full index PASS; reachable history PASS; distribution/source 0 findings. Actual pre-commit hook PASS and post-commit history PASS before push. See [fresh gate](security-poststage.json), [commit hook](commit.json), [prepush](security-prepush.json).
- TRR1-NEW-01–04: FALSE POSITIVE / NON-CREDENTIAL / APPROVED. TRR1-NEW-05: ENCRYPTED LOCAL INTEGRITY METADATA / RESTRICTED LOCAL RETENTION ONLY / HUMAN APPROVED. Plaintext and recovery feasibility remain UNKNOWN. This does not approve another value, profile or future candidate.
- Target profile remains untracked and **not ignored**. Absent from index, reachable history/reflog, approved manifest, committed paths and distribution. Never copied into assets or distributed evidence. No values, fragments, complete candidate fingerprints or decryption information in this record.
- Prior17, historical11 and S04/S05 dispositions unchanged. No scanner, allowlist, Security policy, rotation, deletion or history rewrite.

## Preservation, rollback and remaining workspace

[Preservation postflight](preservation-postflight.json): 9,565 prior files unchanged; pre-existing dirty Current body preserved; 1,262 internal asset/link references resolve; old84-file rollback artifact unchanged; Consent payload byte-identical.

Rollback target remains **version `143bd3d1-d8c0-45ad-a31c-5502ed656936`**, deployment `7b18c79f-58dd-44cb-8e1e-38669b1aac11`, commit `57b1daab800a5ad85fef705de05e96657a0b7f93`, artifact `release-artifacts/game005-web-v1/`. Target was verified live immediately before deploy and artifact preservation was rechecked afterward. No rollback executed or required by observed smoke.

Trigger: serious launch, input, save-corruption, route or Consent regression. Stop additional rollout; wait Human decision for this exact rollback. Preserve evidence and check remaster-written saves against old renderer before execution; do not substitute an older four-game artifact or reset saves.

One worktree remains: `C:/projects/Web Game Studio`, main, release commit above. Index empty, ahead/behind 0/0. Existing unrelated untracked work and tracked changes to Current / old distribution-security evidence preserved. This release directory and latest Current postflight note are local postflight records; **not included in a second commit/push**. The committed RC PENDING text is historical; this postflight records the subsequent authorized release.

Implementation model ID: UNKNOWN (exact runtime identifier unavailable); primary retained Security/release responsibility. Read-only source review supplied minimal smoke operations.

Deployment used the existing configuration and explicit approved artifact path with `--keep-vars`; no provider configuration expansion. Command reference: [Cloudflare Workers Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/workers/).
