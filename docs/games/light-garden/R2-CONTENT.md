# Lightwork Garden — R2 content and deterministic rules

Status: local full-run Alpha content, awaiting integrated Visual/UX review and Human play review. The Human decision to continue the core game is not design acceptance or final acceptance. Actual assigned implementation model: `gpt-6-astra`.

## Content intent

Eighteen authored problems form three six-level chapters. The final experience was fixed first: prepare gate A, reach and prepare B, redirect the preparation ray into one fixed splitter, then illuminate three flowers simultaneously. L08 isolates the sequential-gate dependency. L09 teaches the only new light device. L14–L17 practice branch cooperation, opening order, reverse tracing and redistribution; L18 concludes with fewer mirrors than L16, allowing a readable payoff rather than a density contest.

L01–L05 keep their existing IDs, version 1, coordinates, initial mirror orientations and saved `{mirrors, gate}` board shape. Their localized hints are additive. L06–L18 are new version 1 levels. All boards are 5×5, 6×6 or 7×7; at most five movable mirrors are actually used, with no more than two gate pairs, one fixed splitter, and three flowers. No rotation/translation/color-copy level generator was used.

| ID/version | Chapter | Discovery and meaningful difference | Movable mirror cells | Authored turns (zero-based mirror indices, QA only) |
|---|---|---|---|---|
| L01@1 | First light | One mirror changes down to up; preserved opening | 17 | 0 |
| L02@1 | First light | Two sequential turns; preserved | 22, 7 | 0, 1 |
| L03@1 | First light | Four turns route around walls and through two flowers; preserved | 32, 14, 16, 28 | 0, 1, 2, 3 |
| L04@1 | First light | Switch opens its gate on the current ray; preserved | 17 | 0 |
| L05@1 | First light | A mirror must visit a switch and return; preserved | 12 | 0, 0 |
| L06@1 | First light | Independently apply preparation/return after routing down from above | 3, 21 | 0, 1, 1 |
| L07@1 | Preparing paths | Two independent badges; prepare lower B and upper A, then use both gates on the final descent | 20, 26, 8, 11 | 1, 0, 2, 3 |
| L08@1 | Preparing paths | B is physically behind A; the right mirror changes from preparation to final descent | 32, 14, 16 | 0, 1, 2, 2 |
| L09@1 | Preparing paths | One correct splitter entrance creates two simultaneous rays; deliberately easy introduction | 32 | 0 |
| L10@1 | Preparing paths | Each branch needs a different turn: left down, right up | 32, 13, 16 | 0, 1, 2 |
| L11@1 | Preparing paths | One branch prepares its own gate; the other flower stays lit | 32, 13 | 0, 1, 1 |
| L12@1 | Preparing paths | Gate preparation happens before access to the splitter | 32, 14, 16 | 0, 1, 2 |
| L13@1 | Whole greenhouse | Extinguish an already lit flower to prepare the opposite branch; past light does not count | 32, 12 | 0, 1, 1 |
| L14@1 | Whole greenhouse | Each branch prepares the other branch's gate; both mirrors change roles twice | 44, 9, 26 | 0, 1, 2, 1, 2 |
| L15@1 | Whole greenhouse | Separate branches still require A before B; return both branches to flowers afterward | 44, 21, 26 | 0, 2, 1, 1, 2 |
| L16@1 | Whole greenhouse | Reverse-trace a final branch that climbs left and recrosses the prepared A gate horizontally | 44, 16, 19, 29, 8 | 0, 1, 2, 2, 3, 4 |
| L17@1 | Whole greenhouse | Complete both preparations above the source, then redistribute below and adjust both branch tips | 24, 10, 36, 40 | 1, 1, 0, 2, 3 |
| L18@1 | Whole greenhouse | A → B → reroute into fixed splitter → two branches, three simultaneous flowers | 37, 16, 19, 29 | 0, 1, 2, 2, 3 |

The canonical initial boards, titles, discoveries and two localized hints per level are in `src/prototypes/light-levels-r2.ts`. Canonical replayable actions, gate/mirror/flower intermediate states and two counterexamples per level are in `src/prototypes/light-answers-r2.json`. Coordinates are row-major, zero-based; these numbers are internal authoring evidence and are not intended as normal player copy.

## Final problem and representative intermediate evidence

L08 starts at cell 30. Turning mirror 0 opens A only. Turning mirror 1 directs light toward the B-locked lower route. Turning mirror 2 upward reaches B through open A; both gates are then open but no flower is lit. Turning mirror 2 back down lights 28 and 34 simultaneously. Every reachable state was checked for the invariant “B open implies A open.” No fresh all-closed gate state wins under any of its eight mirror configurations.

L18 starts at cell 35 with four mirrors at 37, 16, 19 and 29. Its exact stable snapshots are:

| After action | A / B | Lit flowers | Result |
|---|---|---|---|
| 0 → source ray upward, left at central mirror | open / closed | none | A prepared |
| 1 → central mirror right | open / closed | none | B gate blocks the lower route |
| 2 → upper-right mirror upward | open / open | none | B prepared through A |
| 2 → same mirror downward | open / open | 31, 34 | Splitter works, last branch still wrong |
| 3 → lower-left mirror downward | open / open | 31, 43, 34 | Three flowers lit together |

A source-row bypass was found during authoring: the first draft placed flower 43 directly on the source ray, making the final branch mirror unnecessary. The source moved from cell 42 to 35 and the first mirror from 44 to 37 before integration. The authored after-four-actions assertion now requires exactly two flowers and `won: false`; the fifth action is necessary for this authored route. This correction is specifically protected by replay and the fresh-gates exhaustive check. No uniqueness of action ordering is claimed.

L13 explicitly protects against accumulating historical flower hits. Its first branch state lights 13 and 24; the preparation state lights 13 and 17. The union is all three flowers, but the second state must remain unsolved because 24 is currently dark.

## Runtime integration contract

`src/prototypes/light-r2.ts` exports `LightLevel`, `LightState`, `LightGate`, `LightSplitter`, `reflect`, `traceLight`, `settleLight`, and `turnMirror`. The primary integration should re-export them from `rules.ts`, replacing the earlier light-specific declarations only. `lightLevelsR2` is the complete light level array; it does not import `levels.ts`, so replacing that module's earlier light array introduces no level cycle. The shared `BaseLevel` supplies optional `hints?: [Text, Text]`.

Additive level properties:

```ts
gates?: { id: 'A' | 'B'; gate: number; switch: number }[];
splitter?: { cell: number; input: Dir; outputs: [Dir, Dir] };
```

`input` means the light's direction of travel, not the side of the cell. Example: `input: 0` accepts light travelling north from below. Other entries stop. Outputs are fixed travel directions, must remain visually distinguishable from movable mirrors, and cannot be changed by the player. L09 uses north input and west/east outputs. L14 uses north input and north/east outputs. L16/L18 use south input and west/east outputs.

Legacy `gate?: number` / `switch?: number` and `state.gate: boolean` remain unchanged. New multi-gate levels add `state.gates: boolean[]` matching `level.gates` order. Only those levels carry this array; legacy states never acquire it. The primary save integration must validate exact lengths and booleans and copy gate arrays into undo snapshots. No existing saved content version is changed here.

Tracing retains the original single-ray `path` and adds `paths: number[][]`, `segments: [number, number][]`, and `switchedGates: number[]`. For split levels, `path` is the source-to-splitter path; draw `segments` or every `paths` entry to show both branches. `lit` is the current stable frame only. `settleLight` monotonically opens gates and re-traces until stable, within the number of gates; only the final trace determines completion. State copies are immutable. Directed-cell traversal bounds cycles and rejoining branches; splitter return from an invalid entrance stops.

## Verification completed in the bounded content task

- `node --import tsx --test tests/unit/light-r2.test.ts`: **42 PASS**.
- All 18 complete authored answers replay through the actual runtime functions, asserting every action's mirror/gate state, current lit flowers and completion flag.
- All 36 authored counterexamples remain unsolved.
- **496** total combinations of mirror orientation and gate state, each checked both before and after gate settling against an independent coordinate/vector oracle (**992** raw/stable comparisons). The oracle does not call runtime `neighbor`, `reflect`, `traceLight`, `settleLight`, or `turnMirror`.
- Intermediate gate/flower expectations in JSON were authored as literal tables, not copied from runtime output. The test adds literal splitter segment expectations, legacy board snapshots, fixed-point gate examples, wrong-entry examples, an actual splitter feedback loop, and immutable undo state checks.
- L08/L18 reachable-state traversal verifies gate order, all-gates-required completion, and no win from final orientation alone with gates freshly closed.
- L01–L05 board snapshots and legacy answer intermediates remain equivalent. All component cells are in bounds, pairwise distinct, and clear of walls; gate and device limits are checked.

Integrated builds, persistence validation, browser interaction, art, localization layout, and bridge behavior belong to the primary integration's final QA. Physical mobile operation, first-time user comprehension, subjective difficulty/fun, legal clearance, release readiness and Human acceptance are not established by these deterministic tests. These remain separate review outcomes.
