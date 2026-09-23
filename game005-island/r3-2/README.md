# Game005 — Gold Live Integration R3.2

Human accepted **B Gallery Gold R3.1 Visual Direction**. This is a local live integration candidate, not Human Craft/UI final acceptance, not a release.

- [Review](http://127.0.0.1:4394/review/) / [Live game](http://127.0.0.1:4394/)
- [Report](review/REPORT.md), [browser QA](review/browser-qa.json), [independent-audit regression QA](review/audit-regressions.json), [performance](review/performance.json), [preservation](review/preservation.json)
- Actual models: primary and bounded read-only review `gpt-6-astra`; no additional writer.

## Isolation and source

`src/game.ts` integrates Gold UI with direct imports of unchanged `../r2/src/core.ts`, `scene.ts`, `audio.ts`, `ui-copy.ts`. Real core decides costs, prerequisites, reservation, planning, delivery payment, completion and automatic work. No mock phase state is imported into the app. The five existing R2 facilities include the original bridge/shore expansion; no content or progression was added.

`src/storage.ts` uses R2's exact envelope/validation/conflict/failure rules with only a new key import. Key: `tinlumo:game005:island:live-ui:r3-2`, envelope/schema version 2. No automatic migration, reading or writing of the old R2 save. Reset affects only the candidate, retaining preferences. Assets are the original R2-model renders preserved from Gold.

`app/` builds to `dist/` (real playable entry); `fixture/` to `fixture-dist/` (read-only QA accessor, saves disabled); `baseline/` to `baseline-dist/` (unchanged R2 controller with same sample for comparison). QA samples never enter the playable bundle. `scripts/setup.mjs` records initial scaffolding; normal reproduction does **not** need to run it.

## Reproduce locally

Run from `C:\projects\Web Game Studio`. Existing repo dependencies only; no install required.

```powershell
node node_modules/typescript/bin/tsc -p game005-island/r3-2/tsconfig.json
node game005-island/r3-2/scripts/build.mjs
node game005-island/r3-2/scripts/server.mjs
```

The server is strict loopback `127.0.0.1:4394`; don't start another instance while the Review server is running. `/gold/` serves preserved R3.1 static files read-only; `/baseline/` and `/fixture/` are explicit comparison entries. App scripts / private cache / source paths are not served.

Stop only this task's server using its recorded identity:

```powershell
powershell -NoProfile -File game005-island/r3-2/scripts/stop.ps1
```

Do not stop or restart older R2 / R3 / R3.1 servers without a separate reason. No LAN, firewall, external settings or publication is needed.

## Evidence generation

Browser tooling uses the already-installed Windows Edge and bundled Playwright, with all temporary profiles/output under this candidate's `.cache`. Run browser scripts sequentially, especially performance and video:

```powershell
node --import ./node_modules/tsx/dist/loader.mjs game005-island/r3-2/tests/browser.mjs
node --import ./node_modules/tsx/dist/loader.mjs game005-island/r3-2/tests/audit-regressions.mjs
node game005-island/r3-2/scripts/play.mjs market --record
node game005-island/r3-2/scripts/play.mjs house --mobile --record
node game005-island/r3-2/scripts/screens.mjs
node game005-island/r3-2/scripts/compare-screens.mjs
node game005-island/r3-2/scripts/performance.mjs
node game005-island/r3-2/scripts/media.mjs
node game005-island/r3-2/scripts/review-data.mjs
node game005-island/r3-2/scripts/security.mjs
node game005-island/r3-2/scripts/preserve.mjs
```

Matched screenshots use an explicit sample state and paused ordinary renderers; full-loop videos use normal play without state injection or time scaling. See the Report for each observation's scope and limitations. Prior successful evidence should be archived inside `.cache` before deliberately re-recording.

**Stop:** `GAME005_UI_LIVE_INTEGRATION_R3_2_READY / HUMAN_LIVE_CRAFT_UI_GATE_PENDING`.
