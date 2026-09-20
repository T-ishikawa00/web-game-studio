# PROJECT MAGNET — Progression Slice R2

Authority: [Progression Research R1](GAME004_MAGNET_PROGRESSION_RESEARCH_R1.md), created before the implementation. 2026-09-20 Human: Craft Quality / Core Combat PASS; progress, purpose, ending and growth potential require improvement. R2 remains an isolated Human Progression Gate candidate, not Full Game or production.

## Scope and progression contract

`game004-magnet-progression/` → `.cache/magnet-progression-r2-dist` → loopback `http://127.0.0.1:4368/`. No shared runtime/registry/save/Portal changes. Gold4365 and VerticalR14366 remain available. All source/build/evidence for those, Nurture and Production are preserved against a 2,408-file entry manifest.

Six finite encounters: crane → shields → chargers → vertical current → overseer/mixed current → reactor. No minimum-time gate. Only enemy-derived charged armor powers a relay, once per piece. Delivery consumes the charge, not the reusable metal body. Empty metal still damages enemies and returns from a relay. Completing a relay opens surviving shields for3s and cancels floor current for7s. New relay locations change firing positions between encounters. All relays and remaining guards must be cleared before leaving encounters1–5.

Three safely paused decisions follow encounters1/2/5. Module choices: automatic return / +3 holding slots on any chassis / +1 maximum armor and full repair. Evolution1 chooses SWARM or LANCE. Evolution2 completes that build or switches to the other final chassis; no permanent unlock prerequisite. Result displays the chosen build and suggests the alternative. One-click retry resets all run state.

|Build|Evolution1|Evolution2|
|---|---|---|
|SWARM|460 pull radius,24 slots,wide fan; external coils|30 slots; each launch opens/pushes nearby ordinary guards; crown/dual drums|
|LANCE|340 radius,12 slots,1.45× launch speed,narrow line,3-target penetration; rail nose|4-target penetration,automatic spent-shot return; extended dual spine|

The rack module adds3 slots to either row. Both deliver one relay charge per charged piece; no hidden doubled objective value. Gold's initial radius320, anticipation65ms, launch1260, impact45ms/break65ms, recoil, initial objects and base sound remain. First reclaimed armor still produces the accepted MAGNET II transformation; it is separate from the two branch evolutions.

Reactor boss remains24HP rather than a larger sponge. It is completely protected while each of3 relay locks is active; delivery triggers a committed countercharge before exposing the core. HP16/8 thresholds clamp damage, eject charged plating, relock and countercharge. Initial12 and each segment10 plating supplies cover the required10 per relay without a kill-farming prerequisite. A volley cannot skip the next lock. Final destruction → brief settlement → RUN CLEAR; damage cannot override an established clear.

## Playtest → weakness → fix → replay

1. Initial ordinary-input browser-clock run cleared at152.36s but relay progress was effectively stationary target HP. This did not substantiate the6–8min target or a distinct purpose. Evidence `iteration-01.json`; not accepted as final.
2. Changed to one-time charge extraction from recovered enemy armor; blank metal is reusable ammunition. Added tactical power windows and distinct layouts. Fixed real hazard damage width that was twice the drawn band. Revised SWARM reached final evolution at409.67s before the **QA harness's240s wall-clock deadline**, not a game failure/clear. Evidence `iteration-02.json`.
3. LANCE reached the second final relay at9/10 with charged pieces nearby, but returning blanks filled all12 orbit slots. Confirmed acquisition-priority defect, not a shortage of boss supply. Changed full-orbit collection to release enough blanks briefly and admit charged armor. Regression test covers actual collection and capacity. `iteration-03-lance.json` retains the earlier incomplete run.
4. Recorder chunk handling initially split a codec-bearing Data URL on its first comma, yielding invalid partial chunks. Fixed to locate the base64 delimiter; a standalone4.2s smoke verified1.13MB, two monotonic tracks. Partial capture is not delivered as a complete run. Final full-run recording uses the corrected chunk writer; native real-time canvas and original Web Audio, no speed alteration. Choice text is drawn into the live canvas and mirrored by accessible DOM controls; browser chrome and DOM-only controls are not captured.
5. Empty-floor intervals in complete runs (SWARM368.75s / LANCE299.84s) showed slow replenishment. Restore clear-driven arrival acceleration (maximum2.2s when no guards remain) rather than extending session time with idle gaps. Relay unlock now triggers countercharge before the exposed window. Corrected lane axis/telegraph color, choice-exit audio ordering, opaque DOM choice overlay and final-switch capacity trimming. Fatal floor damage now ends the step before a queued shot can override failure; targeted regression covers it.
6. Final branch runs, actual timings, screenshots and verification are recorded in [Review Pack](../qa/game004-magnet-progression-r2/REVIEW.md). A scripted policy sees world state and therefore does not establish Human first-time duration, fun or acceptance.

## Technical / Human boundary

Fixed120Hz simulation, ≤70 scrap,≤220 particles, normal reinforcements capped by live enemy count; finite input-driven completion. Choice/pause/blur cancel controls; resize transforms relays and lane as well as actors. Localized JA/EN objective/choice/onboarding copy, no persistence or external network requests. Original code art and Web Audio; no new assets/services/packages.

Acceptance state must remain **GAME004_MAGNET_PROGRESSION_SLICE_READY / HUMAN_PROGRESSION_GATE_PENDING** after final technical evidence. Human A–H, physical iPhone/Android, actual listening, external first-time play, broad balance and retention are separate pending/unverified gates. No stage/commit/push/deploy/production/Cloudflare/LAN/external write/paid service/asset purchase is authorized.
