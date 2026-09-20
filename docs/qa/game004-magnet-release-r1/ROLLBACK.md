# Production-only rollback point

Immediately before Game004 release (live Cloudflare API rechecked 2026-09-20):

- Worker: `tinlumo-production`
- Previous version: `f92b24da-946f-4c22-9464-fe7cf011ff50` at 100%
- Previous deployment: `bdefa828-d1f4-4660-98e1-d5115f940d1c`
- Previous accepted artifact: `.cache/tinlumo-mvp-portal-baseline-r1`, 52 files, hashes in `docs/qa/mvp-portal-release-r1/distribution-manifest.json`
- Previous Git checkpoint: `8589025926c2ca34d87548521e28d7277e668f66` (Full baseline; no Game004 public integration)
- Preview baseline: version `590239ba-da9d-43b4-835a-57c165fb6e65`, deployment `a75b3b1b-71fe-4abd-93e8-699343c428f2`

If Game004 release smoke fails, run `node scripts/magnet-release-wrangler.mjs --rollback`, then inspect the active production deployment/version and recheck JA/EN Portal, previous 3 games, consent and legal routes. The helper selects the exact previous production version. Cloudflare creates a new deployment for a rollback; it does not rewrite Git history. [Official rollback semantics](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/).

Scope is only tinlumo-production static assets. Do not modify Preview, DNS/domain routing, Access, email, Analytics settings/automatic insertion, or browser localStorage. The Game004 save namespace stays on users' devices for a future re-release. Do not reset/force-push/rebase. No database migrations or server state accompany this release.

Successful release must record its commit/version/deployment in POSTFLIGHT.md. This rollback plan is not evidence that rollback has been executed.
