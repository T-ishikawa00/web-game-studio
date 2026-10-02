# R2 quality evidence

Bounded internal review: the main mode completes, accepted Quick Run is preserved, current desktop/small viewport UI is reviewable, and no unresolved major local gameplay/security defect remains in these checks. This is Codex internal review, not a new Human craft acceptance or Portal Production result.

## Actual play / record / inspect

All videos are actual canvas capture at 1× with local synthesized SE. They include pauses/idle intervals between agent input batches; no speed-up is used. Complete Result cards are DOM, so their full-page screenshots supplement canvas-only video. The controller is an agent using normal trusted pointer/key input, with geometric aiming guidance in the root runs. These samples do not measure human population balance or retention.

|Sample|Evidence take|Observed result|Scope/limit|
|---|---|---|---|
|Beginner keyboard style|1790951208960|46.93 active sec, 48 shots, 6,070 score, chain 7, still playing|Opening/mastery sample, not a full clear|
|Independent novice mouse / failure|1790951585644|21.05 sec, 2 shots, score 3,465, chain 9, lost|Long deliberation can be punished; Assist route and failure guidance are available. No population difficulty claim|
|Normal full clear, JA|1790951510403|321.46 sec, 7/7, 12 seals, score 74,780, chain 9, A, life3|Original 111MB WebM decodes 17:15.398 including long pauses; initial R2 UI revision, current Journey engine|
|High-skill / mobile-size full clear, EN|1790952823140|325.27 sec, 7/7, 12 seals, score 74,955, chain8, A, life3|375×812 viewport, trusted mouse, current progression/UI before final boot guard; not touch or physical phone|
|Quick full clear|1790952681472|60.00 sec, score18,655, chain6, life3|Accepted core/content; current entry UI|
|Independent touch sample|1790952330667|7.92 active sec at stop, 4 shots,3kills,8banks,score255,life3,no damage|375×812 Edge trusted touch events; not a touch full clear|
|Landscape keyboard failure|1790953664889|17.15 sec, one shot, chain3, lost|568×320; failure advice and all three result actions visible after automatic result scroll|

Additional historical stress/failed-attempt videos are retained honestly. `1790951075563` was idle startup failure despite its beginner label; `1790951744652` produced no valid shot; `1790952771136` is an aborted touch attempt because IAB rejected `Input.dispatchTouchEvent`. They do not establish successful touch play. An earlier localhost touch recording failed the local recorder origin guard and is not a saved video. The successful 127.0.0.1 touch take above is the saved evidence.

Current screenshot checks: `mobile-375-clear-r2.jpg`, `mobile-320-clear-r2.jpg`, `mobile-landscape-failure-r2.jpg`, `public-no-debug-input-r2.jpg`, plus the normal clear and actual extracted early/mid/finale frames. Portrait is the recommended phone orientation. Landscape keeps a readable 300px board with vertical scrolling; ending scrolls the compact result into view, with 44px actions. Small header/microcopy remains compact. No fully nonvisual gameplay claim is made.

Final UI guard disables interaction until module initialization and settings restoration complete. Reloading initially exposed the HTML default sound label; the saved mute flag was correctly restored after initialization. This was a boot-display timing issue, not lost settings. Language, mute, motion and contrast persistence were checked via UI reload and unit storage cases. Default route is always Normal. Physical smartphone, iOS Safari, low-performance hardware, and real-device battery/thermal behavior: NOT TESTED.

## Independent review and fixes

Three independent Luna agents reviewed game feel, progression and mobile UX. Actionable findings fixed: missing Journey armor/safe stats, finite clear audio cancellation on immediate retry, timed-only progression with no mastery advance, wrong finale deadline after early advance, new-rail overlap at stage changes, mixed JA mode/HUD labels, no visible in-progress saving limitation, missing failed-storage warning, small landscape result reachability, generic early failure advice, and incomplete product/research records. The full clear and original media were independently inspected. No major local blocker remains after these bounded checks.

Residual product uncertainties: the expert Crown clear was about11sec; it is a brisk three-circuit climax, not evidence of typical finale duration. Fixed-seed retry supports score mastery; the separate new-layout action changes seed. Encounter shapes repeat within authored chapters. Typical novice clear rate, average session length and lasting replay motivation remain NOT VERIFIED. The 5–8min copy is a design target; observed expert clears are two samples.

## Regression, security and provenance

106/106 Node tests pass using included historical fixtures: accepted movement/control/records regressions; 360 mirror rays match actual landing; mastery/fallback transitions, hazards, life rules, all12seals, exact timeout/clear priority, corrupt/denied saves and route isolation. Offline9 route/seed simulations are in `simulation-r2.json`, explicitly not browser/craft evidence. Wild is intentionally harder and is not claimed to be a normal novice route.

59/59 standalone release checks pass; secret-pattern findings0. Runtime has no QA UI/API, review routes, external asset URL, cookie/identity form or third-party dependency. Local production server rejects recorder/debug/doc/secret paths, POST and invalid Host, with CSP/nosniff/referrer/permissions headers. Portal security/Consent/measurement/AdSense are a separate fresh integration gate.

Frozen R1 audit:371 files /184,717,806bytes, all hashes match; accepted runtime hash `b25d2a4ac01c3d073bff24a80d8d6bc80b33c8ad93d9c45055be892c3959c0e6` unchanged. Six Quick modules match byte-for-byte. Candidate CSS only removes unused recorder rules. Journey records also preserve invalid raw values, merge fresh route records at result time, and avoid restoring a previously deleted key. Two added counterexample tests cover stale-tab downgrade/reset/corruption. Build has17 files and no runtime dependencies.

Media inspection used existing Bitwig FFmpeg7.1.1, no installation. Original normal-clear VP9 540×760 + Opus48kHz stereo fully decodes with0errors. Audio max−12dB, no clipping; paused full-video mean−39.2dB is not active-play loudness. Audio decoding is not a subjective listening panel. Recorder hash covers fetched main entry plus local observer, not every imported module; metadata flags are unsigned observer claims. Runtime manifests and capture-version receipts provide reproducible candidate bytes without overstating the old video's complete source provenance.

External spend:USD0 /JPY0. No paid API, asset, account or backend was added. Production release/readback status is recorded separately after integration.
