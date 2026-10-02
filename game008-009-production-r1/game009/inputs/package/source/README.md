# 火種と釉 / EMBER & GLAZE — Game009 1.0.0

A finite three-vessel kiln game about anticipating residual heat. Stoke and vent a dawn bowl, a moss vase and an evening pitcher, then choose a manual finish. A completed commission takes about 6–8 minutes. Tinlumo role: a focused craft-and-mastery session whose reward is a visibly different ceramic finish.

This is the completed standalone product. Portal integration and Production publication are governed by the fresh coordination record in `deliverables/`; a local package is not a published release. The authoritative request is `REQUEST.txt`. Additional spend for this project: USD 0 / JPY 0. No accounts, runtime backend, downloaded runtime dependencies, advertisements or analytics are required.

## Run and verify

Node.js 22 or newer is the only runtime requirement. No npm installation is needed.

```powershell
npm test
npm run build
npm run verify
$env:GAME009_PORT='4610'
node tools/server.mjs --dist
```

Open `http://127.0.0.1:4610/`. The server binds only to loopback. For source-only review and capture, run `npm run dev` on port4609; the public build strips all review/capture controls and excludes the three discovery games.

Hold STOKE /「くべる」to heat, move VENT / 通気 right to cool, and press FINISH /「仕上げる」when ready. Keyboard: Space or Enter to stoke, left/right arrows to vent, F to finish, Escape to pause. Releasing Stoke does not stop residual ember heating. The current and next temperature bands provide the information needed to anticipate changes.

## Evidence and specifications

- `research/market.md`, `mechanics.md`, `selection.md`, `portfolio.md`:27 fresh primary references plus3 narrower official comparisons;40 distinct mechanisms;8 screened candidates;3 original slices; portfolio gap and read-only Game008 overlap checks.
- `qa/play-exposure.md` and `design/primary.md`: ordinary-input15-minute exposure for all3 slices and the evidence for selecting Kiln.
- `design/full-contract.md` and `docs/thermal-model.md`:3 authored firings, quality/fuel rules, variation, manual finish and timeout loss.
- `qa/full-play-r1.md`, `full-play-r2.md`, `full-play-r3.md`, `public-build-smoke.md`: ordinary-input full commissions, phone-width pointer fail/retry, reload checkpoints, pause/settings and public-build network checks.
- `reviews/final-integration.md`: root integration of6 blind full-product reviews, fixes and claim limits. `reviews/full-b-contaminated.md` is retained but excluded from the6.
- `docs/save-spec.md`, `audio.md`, `controls-accessibility.md`, `localization.md`, `rights.md`, `known-limitations.md`, `build.md`: product and maintenance specifications.
- `qa/replay-goal-feasibility.md`:255/300 is reachable in the deterministic model; this narrow tested schedule does not prove human fairness or browser timing tolerance.

The final standalone checks are85 automated tests passing and18 verifier checks passing, with0 WARN/FAIL. Public-build smoke used actual browser input at320/390 px phone widths and desktop, with22 local requests,0 third-party requests,0 network failures and no captured warning/error. Physical touch, iOS Safari, subjective listening, full nonvisual gameplay and human enjoyment/retention remain unverified; see the explicit limitations.

## Marketing and release

`marketing/cover-16x9.png` is1600×900; `thumbnail-square.png` is1080×1080. `marketing/copy.md` contains JA/EN title, description, hook, controls, social copy, disclosure and the suggested first route. `marketing/clips.json` binds3 final ordinary-input MP4 clips to their raw sources and decode measurements. Each clip is about20 seconds,720×720,H.264/AAC,30 fps; no music, narration, overlays, speed change or injected win is added. Failed/superseded captures remain in QA and are excluded from the final3-clip bundle.

Run `node tools/package.mjs` to produce a create-only, hash-named snapshot under `.release-packs/`. It contains source, static build, baseline digest and file-level manifest, including `build/manifest.json`. Existing snapshots and build backups are preserved. Only `build/` is suitable for public serving; the full source package contains private research and QA records. ZIPs and independent extraction/rebuild/security receipts are written under excluded `deliverables/` and `.package-validation/` directories, so they cannot recursively enter later packages. Read `docs/build.md` for the digest definition and package procedure.

Game save namespace: `tinlumo.game009.v1`. Completed-vessel checkpoints/settings are local to browser and origin; export a backup before clearing site data. Fictional firing rules are not real pottery guidance. Original code/art/sounds and AI-assisted authorship are documented; title screening is not trademark clearance.
