# RIMBLOOM Complete Edition R2

No install or third-party package is needed. Node.js 20+ is the only build/test prerequisite.

1. `npm run build` copies a small static production runtime into `dist/` and writes `BUILD_MANIFEST.json`.
2. `npm test` runs accepted-core regressions and Journey collision/progression/save tests with included historical fixtures.
3. `npm run preview` opens the production surface at http://127.0.0.1:4191/ (no recorder or QA APIs).
4. `npm run review` serves the separate local-only review surface at http://127.0.0.1:4192/review.html. This surface is never deployed.

The public runtime is `dist/index.html` plus `dist/src/` only. Assets for the Portal card are in `assets/`. Package docs and QA evidence are not public game files. Deploy under a static directory; all runtime imports and CSS paths are relative. Portal integration must preserve current Consent and measurement policy and isolate its game events. See the latest integration receipt for actual Production status.

Seven-garden Journey is the main mode. Normal restores one life at chapter changes; Wild has more pressure and no automatic healing; Assist has slower enemies. Each route has separate local records. Quick Run preserves the accepted 60-second physics/content. There is no account, backend, BGM, shop, grind or permanent stat tree.

An active run is not checkpoint-saved. Pause and keep the page open for a break. Records and accessibility/sound/language settings persist locally. Storage failure is disclosed, while play continues in memory. Browser storage origin/sandbox affects save continuity when embedding; the Portal integration receipt must describe that mapping.

Research, decision, authority, rights, QA and rollback documents are in `docs/`. Videos in `qa/evidence/` are 1× actual canvas and synthesized SE with trusted browser input; read their metadata and QA report for pause/provenance limits. Physical smartphone, iOS Safari and low-performance-device performance are not verified by viewport emulation.
