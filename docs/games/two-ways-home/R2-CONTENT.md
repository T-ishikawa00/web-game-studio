# Two Ways Home — R2 full-run Alpha content

Status: local Alpha content / Technical rule verification PASS / Human full-run acceptance pending.

Content work executed by `gpt-6-astra` under the primary Astra agent. This document covers level data and deterministic rule evidence. Game Art, onboarding, browser QA, persistence integration and final package are owned by the primary agent; this document does not certify them.

## Integration contract

- `src/prototypes/home-levels-r2.ts` exports all 18 `homeLevelsR2` as `HomeLevel[]`. It has no dependency on the registry and can replace the registry's existing home array without a circular import.
- The sole data-interface addition is optional `BaseLevel.hints?: [Text, Text]`. Every home level supplies two Japanese/English hints: a conceptual nudge, then an actionable route. Runtime movement rules remain unchanged.
- `src/prototypes/home-answers-r2.json` retains the answer-reader fields `key`, `gameId`, `id`, `version`, `solution`, `intermediate`. Added metadata supplies chapter, learning intent, controls, shortest distance, constrained-search evidence and counterexamples.
- T01–T05 retain their exact ID, version, dimensions, starts, homes and wall lists. Existing authored answers remain unchanged. Only guidance is added. No content version bump or old completion invalidation is needed for these unchanged boards.
- T06–T18 are new version-1 IDs. They must not inherit completion from a tutorial/demo. Tutorial state is not owned by this content module.
- All board cells are fixed. The shared four-direction pad, arrows/WASD and undo are the controls; the two boards never become independently controllable.

## Reverse-planned learning arc

The final requirement was established first: more than one relative-position adjustment, necessary departure from an early home, both axes involved, and a final direction that moves both friends home. T18 meets this with a 5×5 board and 14 shortest inputs. T12 was then fixed as a shorter middle representative. T06–T11 and T13–T17 bridge those states with narrower exercises and changes of pace. No new floor, enemy, object, timing rule or permanently parked home is introduced.

Coordinates are zero-based row-major cells in QA data, never player-facing labels. Shortest distances below describe the position-pair graph; they are not ratings or a claim about subjective difficulty. A unilateral adjustment is an input where exactly one friend is stopped. Minimum counts are optimized over **all** solutions, not counted only along the authored witness.

| Level | Chapter / discovery | Shortest inputs | Minimum unilateral adjustments | Distinguishing evidence or purpose |
|---|---|---:|---:|---|
| T01 | Introduction: shared input | 2 | 0 | Existing board; both move with either right input |
| T02 | Introduction: one-side stop | 5 | 1 | Existing board; relative offset must change |
| T03 | Introduction: compare both gardens | 10 | 8 | Existing board; one friend's shortcut is insufficient |
| T04 | Introduction: leave an early home | 9 | 4 | Existing board; first effective right input reaches only one home |
| T05 | Introduction: combine adjustments | 13 | 11 | Existing board and answer preserved |
| T06 | Introduction: unguided reset in difficulty | 4 | 3 | Small board; short independent application of the learned rules |
| T07 | Middle: horizontal spacing | 5 | 2 | Horizontal adjustment is necessary; a solution without vertical adjustment exists |
| T08 | Middle: vertical spacing | 6 | 3 | Vertical adjustment is necessary; a solution without horizontal adjustment exists |
| T09 | Middle: park at a corner | 8 | 4 | Boundary parking creates a route around the internal walls |
| T10 | Middle: home is a passage | 8 | 7 | Every solution must leave a previously reached home |
| T11 | Middle: order the walls | 8 | 5 | Witness changes columns, then uses lower positions; both axes are necessary |
| T12 | Middle: combined adjustments | 9 | 6 | Both axes necessary; final witness brings both in together |
| T13 | Closing: plan from the final step | 11 | 8 | Last input up from the two squares below home; no new rule |
| T14 | Closing: step away | 11 | 9 | Every solution requires home departure |
| T15 | Closing: prepare a parking place | 11 | 6 | A gentler pause between denser closing problems; bottom-edge setup then approach |
| T16 | Closing: think in position pairs | 12 | 7 | Revisiting one friend's cell with the other in a new position creates progress |
| T17 | Closing: combined rehearsal | 13 | 7 | Mandatory home departure and both axes; alternating blocked sides |
| T18 | Closing: welcome home | 14 | 8 | Mandatory home departure and both axes; final right input moves both |

The old opening contains a substantial T03–T05 challenge. Those exact boards were deliberately retained for saved-progress compatibility and the request to preserve the existing MVP. T06 is a four-input breathing space, not an attempt to make every successive shortest path longer. Human review should judge whether the improved guidance makes the inherited opening appropriate; this is not inferred from solver results.

T07 and T08 differ in topology and required axis; they are not a rotated pair. Later levels have different starting/target pairs, wall order and home-departure requirements. Candidate selection used authored wall topologies plus bounded local position-pair search; candidates were screened by their actual intermediate states and constrained reachability. No random board generation ships to players.

## Midpoint and final intermediate assertions

T12 witness is `E S E S S E W S E`. Selected positions are:

- After right: `[2,2]`, both moved.
- After down: `[7,2]`, second friend stopped.
- After right: `[7,3]`, first friend stopped instead.
- Before the final input: `[21,3]`.
- Final right: `[22,4]`, both moved; only now are both home.

T18 witness is `N N E E S W S S W S E E N E`. Its important states are:

- Start `[10,6]`, targets `[1,23]`.
- Input 3: `[1,1]`; first friend reaches its home, second is not home. This is not completion.
- Input 4: `[2,1]`; first friend leaves home while the second is held by its wall.
- Input 5: `[2,6]`; the blocked side changes.
- Inputs 6–8: `[1,5] → [1,10] → [1,15]`; first friend is back home while the other route is prepared.
- Input 9: `[0,15]`; first friend leaves home again to create the final alignment.
- Inputs 10–12: `[5,20] → [5,21] → [5,22]`.
- Input 13: `[0,22]`; both are exactly one right input from their homes.
- Input 14: `[1,23]`; neither is blocked and both arrive simultaneously.

Exhaustive graph traversal proves T18 cannot be solved while prohibiting home departure, while prohibiting horizontal unilateral adjustment, or while prohibiting vertical unilateral adjustment. Weighted search proves every solution needs at least eight unilateral adjustments. The stored witness has 14 inputs and the unweighted search proves none is shorter. Uniqueness is neither required nor claimed; legitimate alternative routes remain valid.

## Verification and limits

`npx tsx --test tests/unit/home-r2.test.ts`: **39 tests PASS** at initial content integration.

The frozen answers were calculated offline by an independent row/column movement implementation that imports no runtime `neighbor`, `moveHome` or `homeWon`. Runtime tests replay all 18 sequences and compare every resulting pair, blocked side and completion value with those frozen values. Tests also verify immutability of earlier states for undo snapshots, absence of both-blocked padding in answers, initial unsolved states, correct cell bounds, free starts/homes, bilingual hints, first-five compatibility and final-step completion.

For shortest paths and constraint proofs, each runtime test traverses at most the finite `size^4` position-pair states: 256 for 4×4 or 625 for 5×5. An exhausted queue supports an unreachable result; no timeout is interpreted as unsatisfiable. Weighted search separately minimizes unilateral adjustments. Every level also has a stop-before-final counterexample and an independently recorded deterministic nearest-total-distance greedy attempt. The greedy attempt fails on T07–T18; T01 and the short T06 appropriately allow that simple strategy. This one failed strategy does not prove the absence of all easy strategies; the stronger claims above are supported by exhaustive constraint tests.

Technical rule correctness does not establish subjective fun, readability of the actual Art, successful first-time learning, physical-mobile input quality, or Human acceptance. Those remain separately reviewable in the primary batch report. Nothing in this content change creates a released game, alters Portal Baseline, changes persistence/security/bridge rules, enables ads, or authorizes stage/commit/push/deploy.
