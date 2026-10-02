# Manual Play Ads R1 — SDK selection correction

The initial Production browser readback found an implementation defect: on mobile RIMBLOOM and Light Garden, the Bottom request marker was set but the official SDK processed the hidden Left tag. Bottom then timed out. This is distinct from normal AdSense `unfilled`. The initial version `885b89a2-5b4d-4cbb-b5da-cd96aca3d376` therefore did not satisfy the final release gate.

The correction keeps dormant, unprocessed official tags outside the DOM using equal-sized inert placeholders. Only an eligible unit passing viewport, input separation and lazy-loading checks inserts its original official tag and calls the ordinary `adsbygoogle.push({})`. A second geometry check runs after insertion and before push. Processed tags and SDK iframe content are never detached. Preinitialized tags or uncertain SDK failure stop further pushes for that document. Delayed requests may complete while hidden after resize or timeout; they are not refreshed or reinitialized.

The product delta is only `assets/manual-play-ads-r1.js`. All 16 Play HTML files, CSS, accepted game runtimes, Worker modules, Growth specification, Consent C, Growth Consent, Google CMP implementation, legal and ads.txt are byte-identical to the initial deployment. Publisher, all three slot IDs, 2020/2540/2740px thresholds and every HOLD policy remain unchanged. Provider configuration changes and ad clicks are zero.

The correction continues the same unfinished, explicitly authorized Human release. Its preflight starts from private main `80505a8c2c2d0f8e7264a74b853562c2b568e6ef` and the initial deployment. It preserves the initial receipts instead of rewriting them as successful final readback. The same normal scoped Git, full security, deploy and postflight gates are mandatory for the correction. The authorization ends when this release completes and grants no future release permission.

Local verification uses a fixture that selects the first unprocessed DOM tag, rather than selecting by the adapter's request marker. It covers JA/EN wide/mobile pairs, 320/375px, landscape, breakpoint boundaries, resize round trips, queued SDK loading, pre-consumption exceptions, unfilled, no response, late fill and existing SDK tag/frame preservation. Fresh receipts are in `internal/sdk-selection-r1/browser-qa.json` and its linked input files.

The final authority is `internal/sdk-selection-r1/POSTFLIGHT.json` and the dated completion report written after the correction deploy. This document records the local repair scope; it does not itself assert postflight completion. Physical touch, iOS Safari, full campaign replay and independent audio listening remain unverified. Actual ad fill and AdSense management-panel state are not inferred from local QA. Auto Ads Play section exclusions remain the latest direct Human-confirmed setting.

Google documents the meaning of `data-ad-status` and unfilled-unit handling at https://support.google.com/adsense/answer/10762946?hl=en. This implementation uses the existing official tag and normal push API; it introduces no undocumented targeting parameter and changes no ad iframe, creative or click behavior.

Primary integration and final release responsibility: S tier. Actual model ID: `UNKNOWN_NOT_EXPOSED`.
