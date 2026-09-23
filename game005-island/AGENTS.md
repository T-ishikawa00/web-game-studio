# Game005 — accepted MVP protection

2026-09-23 Human accepted the R3.2 Live Integration as the **Game005 High-Quality MVP**. The authority is [the accepted baseline](../docs/games/GAME005_HIGH_QUALITY_MVP_BASELINE_R1.md), not the older Review's pending status.

- Preserve B Gallery Gold Visual Direction, island-first composition, automatic work by a small number of residents, no individual resident assignment, short action tempo, the R2 loop/3D/resources/building/save behavior and the R3.2 live UI.
- The [frozen manifest](../docs/qa/game005-high-quality-mvp-baseline/frozen-manifest.json) includes R3.2 and its direct R2 dependencies. Editing R2 core/art/scene/audio can change the accepted R3.2 even without editing R3.2. Do not change these inputs, the manifest or frozen evidence to accommodate a later feature.
- Future Progression work requires a new Human request and isolated candidate. Keep this playable baseline and its save namespace intact. No automatic new production or polishing after the checkpoint.
- Before and after authorized work touching Game005, run `node scripts/game005-baseline-verify.mjs`. Use its isolated output; do not overwrite accepted evidence merely to refresh a timestamp. A mismatch requires investigation against the original baseline, not updating its expected hashes.
- Human MVP acceptance does not establish Full Game completion, physical iPhone performance, Safari compatibility, App Store suitability, external first-use, marketability or retention. Those remain UNKNOWN / NOT TESTED.
- The one-time checkpoint/push authority is confined to the adoption checkpoint. No future Git/publication/LAN/Cloudflare/advertising permission is implied. Root AGENTS and current Human instructions continue to apply.
