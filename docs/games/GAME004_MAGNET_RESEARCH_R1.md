# PROJECT MAGNET — Research R1 / implementation authority

2026-09-19 JST. Research completed before gameplay implementation. Primary: `gpt-6-astra`; bounded read-only research: `gpt-5.6-sol`. Human request: research → original 20–30 second Gold Micro Slice; no intermediate approval unless a material concept/safety blocker. Nurture H1 = **FAIL / REJECTED**, archived in place without changing its source/evidence. Full game and publication are not authorized.

## Evidence method and limits

**FACT** = a statement or metric displayed by the named official/store page, not independent verification of publisher marketing. **OBSERVED** = visible media or sampled review text. **INFERENCE** = our design interpretation. **UNKNOWN** = not measured or available. Read on 2026-09-19; search/cache/locale snapshots can differ. Votes are not plays; Steam language-filtered counts are not total buyers. Review samples are convenience samples, not a statistical survey. No game was purchased, installed or independently played for research. No retention, revenue, ranking or input-latency estimate is invented.

## Eight benchmarks

| Title / primary evidence | FACT success signal | Loop / input / replay | OBSERVED feedback and limits |
|---|---|---|---|
| [Go Mecha Ball](https://store.steampowered.com/app/2008510/Go_Mecha_Ball/) / [user reviews](https://steamcommunity.com/app/2008510/reviews/?browsefilter=toprated) | 85% / 371 Steam purchaser reviews displayed | Walking/shooting ↔ ball collision; twin-stick physics arenas; upgrades between runs. Native touch suitability UNKNOWN. | Multiple sampled reviewers praise movement, kinetic feedback and polish; recurring criticism of shallow upgrades/run variety, with individual readability/depth perception complaints. Launch-era complaints are historical, not proof of current bugs. |
| [SYNTHETIK: Legion Rising](https://store.steampowered.com/app/528230/) / [reviews](https://steamcommunity.com/app/528230/reviews/) | English 95% / 7,787; browser JA all-language display 10,110 (different filter, not contradiction) | Tactical top-down shooting; manual eject/reload, recoil/heat; run builds and classes. Mobile UNKNOWN. | Repeated praise for weighty shooting and weapon diversity. Complexity/UI complaints in [discussion](https://steamcommunity.com/app/528230/discussions/1/3596571824758208022/) and [review](https://steamcommunity.com/id/Czaele/recommended/528230). Do not import reload/jam complexity. |
| [Nuclear Throne](https://store.steampowered.com/app/242680/) / [reviews](https://steamcommunity.com/app/242680/reviews/?browsefilter=toprated) | English 96% / 9,801; browser all-language 15,050 | Top-down roguelike shooting, weapons, mutation and restart. Exact control bindings/native touch UNKNOWN from inspected store text. | Repeated short-run/retry, weapon/character variety and art/sound praise; RNG/spikes/secret knowledge complaints. Green pickups and high-contrast projectile silhouettes visible in official media. |
| [Pickle Pete: Survivor](https://play.google.com/store/apps/details?id=com.frojo.pickle) | 10M+ downloads; retrieved locale snapshots 4.1–4.5, 145K–149K reviews; not one synchronized metric | Mobile auto-shooter; move/dodge, arena survival, run/gear growth, replay modes | Sampled praise for smooth visuals/easy controls and variety; repeated grind/popups/monetization complaints. Easy move control does not validate our simultaneous two-thumb input. |
| [Telekinesis Race 3D](https://www.crazygames.com/es/game/telekinesis-race-3d) / [mechanic description](https://www.crazygames.com/kr/game/telekinesis-race-3d) | 8.9/10 / 8,507 votes in sampled locale; other cached counts differ | Lift and throw objects/enemies; environment as weapon; desktop/mobile/tablet listed; exact bindings UNKNOWN | Individual review prose unavailable: recurring positives/complaints UNKNOWN. Rating does not prove magnet satisfaction. Closest mechanic, therefore differentiation must be tangible. |
| [Teardown](https://store.steampowered.com/app/1167630/Teardown/) / [reviews](https://steamcommunity.com/app/1167630/reviews/?browsefilter=toprated) | English 95% / 76,140; recent 95% / 1,481 | Destructible world → plan path → execute heist; tool/object physics; sandbox retries. Native touch UNKNOWN. | Sampled reviews repeatedly value destruction/freedom; older reviews discuss time-limit friction and performance. Old multiplayer requests are superseded by current listing and must not be treated as current missing feature. |
| [Noita](https://store.steampowered.com/app/881100/Noita/) / [player discussion](https://steamcommunity.com/app/881100/discussions/0/3159831641997471284/) | English 95% / 47,496; recent 92% / 436 | Simulated material → spell interaction → emergent consequence → new experiment/run. Keyboard/pointer suitability inferred; native mobile UNKNOWN. | Multiple participants in the sampled discussion enjoy creative interactions but describe unfair deaths, stuck objects and unreadable physical consequences. A discussion is not population prevalence. |
| [Demolition Derby Crash Racing](https://poki.com/en/g/demolition-derby-crash-racing) | Current page 970.6K likes / 156.0K dislikes; older indexed 4.5/5 and 1,054,834 votes. Keep snapshots separate; plays/ranking UNKNOWN. | WASD, nitro; collide/destroy while surviving; upgrades/endless score retry; touch suitability UNKNOWN | Publisher describes crash physics. Individual user-review reasons unavailable; positive/negative recurring themes UNKNOWN. Useful collision result reference, weaker direct input match. |

## First 5 / 15 / 30 seconds

No first-launch gameplay was recorded for these commercial references. For **each of the eight titles**, actual first-input latency, first-impact time, first reward and first 5/15/30-second player experience are **UNKNOWN / NOT TESTED**. Trailers are edited and not onboarding evidence. The following is an INFERENCE about what to expose in MAGNET, derived from their visible verbs, not a claim about their opening timelines:

| Reference pattern | Our first 5 seconds | Our first 15 seconds | Our first 30 seconds |
|---|---|---|---|
| Go Mecha Ball / SYNTHETIK: expressive physical action | instantly move; scraps twitch then converge | release one compact burst; recoil and distinct impact | repeat against heavier mass with transformed machine |
| Nuclear Throne / Pickle Pete: reward feeds action | no menu wall | broken target produces reachable reward | show silhouette growth and immediate restart |
| Telekinesis / Demolition Derby: intention → collision | aim direction visible without tutorial panel | visibly displace target, no ambiguous disappearance | repeat same verb with more mass |
| Teardown / Noita: meaningful physical aftermath | distinguish manipulable scrap from scenery | bodies split into usable parts | recover the exact aftermath, not a separate coin shower |

## Visual benchmark (three selected works)

OBSERVED in official Steam media through browser: Go Mecha Ball gameplay GIF, Nuclear Throne desert screenshot/trailer, SYNTHETIK official store media. Ratios below are qualitative estimates, not calibrated measurements; exact camera matrices/areas UNKNOWN. Protected media is viewed only and never imported into the game or review pack.

| Element | Go Mecha Ball | Nuclear Throne | SYNTHETIK | MAGNET design decision (INFERENCE) |
|---|---|---|---|---|
| Camera / occupancy | elevated oblique arenas, small mech against open traversal | high top-down, player small compared with visible room | elevated industrial combat view | fixed overhead yard; player body ~6–9% of short playfield dimension; no tracking drift |
| Enemy / silhouette | distinctive chunky robots; hot action against cooler structure | outlined actor forms; threats larger than individual pickups | mechanical panels and angular industrial forms | ivory U-magnet + dark twin treads; red wedge enemies; heavy wider armored chassis |
| Arena density / contrast | sparse traversal gaps around structures; very saturated surroundings | open floor and low-frequency walls; busy action localized | hard-surface panels; media includes saturated green and cooler blue arenas | dark desaturated olive steel; decorative junk outside combat center; floor below actor contrast |
| Effects / color | luminous arcs/trails; high motion intensity | bright bullets and green reward marks; sparse static UI | bright firing/impact against metal | mint = magnetic force; warm amber = scrap/reward; coral = hostile; ivory = player |
| UI / motion | edge HUD; strong kinetic motion | corner HUD; strong local explosions | more combat UI than slice needs | title + sound/pause/restart only; short local bursts, capped particles, reduced-motion option |

## Game-feel chain and why repetition matters

**Go Mecha Ball (review-supported INFERENCE):** input → readable body change → purposeful acceleration → collision displacement + situational sound → maintained flow → another collision. Repetition is attractive because movement itself has expression, not because a number increased. **SYNTHETIK:** prepare → fire → recoil/impact → target response → deliberate next shot. Each shot has consequence; copying its input burden would weaken a browser opening. **Nuclear Throne:** aim → shoot → kill → pickup/mutation → next risk; immediate reward motion shortens the separation between combat and growth. **Telekinesis:** select matter → lift → throw → environment changes → another usable object; this verb is already established, so a generic throw prototype is insufficient differentiation.

No reliable frame-by-frame timing or isolated audio stems were obtained. Commercial input response, anticipation, hit stop duration, projectile speed, knockback distance, camera impulse amplitude, shake frequency, animation timing, squash/stretch magnitude, particle count, debris lifetime, audio layers/pitch, pickup latency, combo window and dead time all remain **UNKNOWN as measured competitor values**. Their functional roles, visible media and sampled comments inform our targets below; they do not justify fabricated milliseconds.

## Anti-references / avoid

1. **Floaty collection / weak impact (design counterexample)**: constant-speed scraps, identical launch/collect velocities, target disappears without displacement. Breaks the sense that accumulated mass mattered. Use acceleration, snap, short release anticipation, swept collisions, recoil and physical pieces. This is our diagnostic pattern, not an accusation against a named title.
2. **Unreadable physical chaos (Noita discussion + Go Mecha Ball readability complaints)**: decoration, reward and threats share brightness; full-screen neon and continuous shake hide cause. Use muted floor, distinct material shapes/colors, directionally biased particles, brief bounded camera kick and reduced motion.
3. **Slow startup / confusing controls / programmer art (SYNTHETIK complexity + Pickle Pete friction as caution)**: extra reload/mode buttons, popup upgrade choices, plain placeholder shapes, a tutorial before doing anything. One hold/release action, two purposeful thumb regions, and original layered beveled sprites from the first implementation pass. No currency/meta/advertisement.

## Fun hypothesis — one claim to test

**Choosing when to release a visibly compressed ring of mismatched metal feels like turning scattered disorder into a controlled, heavy punch; when the enemy's recognizable armor joins that ring, the next punch feels personally earned.** The pleasure should come from gathering tension and deciding the release, not passive auto-damage or a numeric damage upgrade.

Research decision: **PROCEED, mechanic refined**. Keep magnet combat, but emphasize compression and recognizable armor recycling. Novelty alone is moderate: telekinetic throwing and growth are established. A tightly coupled material loop is a testable differentiation, not a proven market advantage.

Rejected: auto-shoot survivor (weakens intentional release), one-object telekinesis (too close to direct competitor and less visible accumulation), polarity puzzle (slower explanation, outside requested action moment), full rigid-body sandbox (too much uncontrolled chaos / scope), upgrade selection menu (breaks the 20–30-second loop).

## Gold Slice acceptance hypotheses / initial tunable design targets

These are **local engineering hypotheses**, selected to make the above chain legible within Human's 20–30-second budget; not published competitor timings. Record actual runtime measurements and revisions in QA before claiming technical success.

1. **Immediate magnetic authorship:** next rendered frame shows the field; loose metal begins wobble/acceleration within 100 ms; nearest scrap settles into orbit in ~0.2–0.6 s. Nearer objects accelerate more strongly. No mandatory hold threshold. Test input-to-event and capture pull/orbit.
2. **Heavy, precise release:** ~65 ms anticipation after release, then ~1,200 world px/s launch (cross a 300 px gap in ~250 ms), swept hit test; impact freeze ~45 ms regular / 65 ms break, camera kick <=7 world px and decay <0.25 s; direction visible even muted. These separate load and discharge without making controls sluggish.
3. **Aftermath becomes the next action:** enemy cracks/recoils then splits into real recoverable scraps; debris starts magnetic reward return after ~0.25 s and within 1 s. Distinguish reward fragments from purely fading sparks; avoid a post-kill menu.
4. **One readable escalation within 30 s:** two light wrecks supply enough recovered armor for one silhouette upgrade; wider magnet arms + stronger field + larger payload capacity. First strong impact target <10 s in internal input replay, full loop 20–30 s capture. No claim about untrained Human times.
5. **Readable and repeatable:** three light targets + one heavy in one arena, one-tap restart; keyboard/mouse and concurrent touch movement/aim. No scrolling while controlling, no input latched after cancel/blur, no network/storage, stable desktop frame pacing with measurements. Motion reduction removes camera shake/flash; sound has on/off and graceful failure.

## Runtime / isolation decision

Original Canvas 2D + TypeScript, fixed-step bounded simulation and native Web Audio, bundled with existing Vite. One arena, <80 physical scraps, capped particles, no joints/stacking/content pipeline require Phaser. Native implementation avoids changing shared package/lock/runtime and makes tuning the exact release/impact chain direct. Reconsider Phaser only for a later Human-approved scope. Separate `game004-magnet/`, `.cache/magnet-r1-dist`, `scripts/magnet-*`, `tests/magnet-*`, `docs/qa/game004-magnet-r1/`; no registry/Portal/Cloudflare changes. 127.0.0.1 only.

## Remaining unknowns and stop

Subjective magnet satisfaction, sound quality on speakers/headphones, real iPhone/Android simultaneous touch, first-time comprehension, demand/retention and 3–5-minute depth remain PENDING/NOT TESTED. Limited commercial media observation cannot establish comparable shipped-game quality. Final self-review must grade specific visible moments honestly (below / approaching / comparable in target moment), with no popularity/revenue equivalence. Stop at `GAME004_MAGNET_GOLD_SLICE_READY / HUMAN_CRAFT_GATE_PENDING` only after a reviewable implementation, captures and QA. Full game needs Human A/B/C decision.
