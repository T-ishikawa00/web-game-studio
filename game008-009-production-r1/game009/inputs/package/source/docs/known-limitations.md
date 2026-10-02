# Known limitations — EMBER & GLAZE 1.0.0

The full game is a finite, deterministic three-vessel commission. Replays use the same authored temperature schedules; the stored seed identifies a run but does not randomize its rules. The replay goal is improving the three finishes and reaching the 255/300 luminous tier, not an endless content system. Human enjoyment, retention, audience demand and commercial performance have not been measured.

Ordinary browser keyboard taps and pointer input have completed the route, including phone-width pointer overfire, retry and manual finish. The 390×844 phone viewport is a desktop browser simulation. Physical touch devices, Android, iOS Safari, real handheld ergonomics and an actual held-key full-route playthrough remain NOT TESTED. Automated tests cover held key/pointer cancellation and parity; these do not replace physical-device play.

The final pitcher has a five-second maximum finish window after the final cooling conditions become available. Visible readiness, a sound cue and the public HUD announce it. Ordinary-input completion was observed repeatedly, but a human difficulty distribution is unknown. The 255-point replay goal is reachable in the deterministic model; the tested controller reached it by finishing each vessel with only 0.5 simulated seconds of slack. This establishes reachability, not browser timing tolerance, human fairness or an exhaustive optimum. See qa/replay-goal-feasibility.md.

The interface offers keyboard gameplay, focusable native settings/navigation, visible status, language switching, reduced motion and high contrast. Gameplay still depends on a Canvas view; full nonvisual/screen-reader gameplay is not supported. Text is not a substitute for an accessible game model. Native browser zoom and assistive-technology compatibility have not been comprehensively tested.

Progress is stored under tinlumo.game009.v1 in localStorage, per browser and origin. A completed vessel is checkpointed; an interrupted vessel restarts from its beginning. Cross-device/cloud saves are not supported. Blocked storage, quota, corruption, future schemas and competing tabs have explicit failure handling, but browser eviction and cleared site data cannot be recovered without the player's exported backup.

The sound bank contains seven original procedural profiles; the full product calls six, and the archived slices retain the unused impact profile. Captured signal/decode checks and mocked Web Audio tests are objective checks. No subjective headphone/speaker or physical-device listening PASS is claimed. Event-only recordings can have an audio timestamp range shorter than the video; the distribution transcode restores packet gaps and pads its tail with silence. No music or narration is added.

The temperature and glaze rules are fictional game rules. The game is not real pottery firing instruction. Title screening was a bounded official-source/search check, not a trademark clearance or guarantee that no similar title exists. All shipped art and sounds were authored for this project; authorship, tooling and AI disclosure are recorded in docs/rights.md and marketing/copy.md.

Production status and safe Portal integration must be established by a fresh coordination gate. A ready static build and local package do not establish a published listing, Production deployment or readback.
