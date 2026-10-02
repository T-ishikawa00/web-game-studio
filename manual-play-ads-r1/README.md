# Manual Play Ads R1

Human approved the one-shot Production release on 2026-10-03 JST, including scoped stage, commit, private main normal push, deployment and readback. No Provider/CMP changes or Growth specification changes are authorized.

Read CANDIDATE_MANIFEST.json and QA_RESULTS.json for the release candidate; internal/release-r1 contains the one-shot release plan, Security receipts, commit/deployment and final readback. FINAL_REVIEW.md and Review.html are the preserved original Human review; the approved snapshot is also retained in internal/release-r1/approved. The release narrows that candidate only by removing dormant HOLD unit markup. HOLD routes contain no advertising slot DOM. Game runtimes/Portal/consent/legal/ads.txt/Worker remain byte-identical. Exactly the current 16 registry Play routes are audited; a new unmeasured route makes build fail closed.

Local commands: node manual-play-ads-r1/build.mjs; node manual-play-ads-r1/check.mjs; node manual-play-ads-r1/preview.mjs. Preview is loopback only and disables real AdSense; ?adqa=filled|unfilled|throw|pending selects mock fixtures. Production assets contain no QA fixture or mock code.

The historic Game009 check intentionally rejects play slots and remains unchanged. Use this candidate manifest/config for the authorized manual-ad release; do not deploy an earlier Game009 asset directory that omits the ad delta. The release.mjs controller pins reviewed files and permits explicit paths only. release-security.mjs requires all/index/history checks, retaining raw FAIL46 and exact Human dispositions separately. The current approval is one-shot and does not authorize later releases.
