# Thermal model — EMBER & GLAZE

`src/product/kiln-model.js` is a deterministic game simulation. Temperature values and effects are fictional game rules, not ceramic-firing advice. It has no DOM, audio, storage, random calls, or wall-clock access.

## Firing route

| Piece | Authored bands | Scheduled limit | Fuel reserve |
|---|---|---:|---:|
| Dawn bowl / 朝の椀 | warm → soften → set | 130 s | 0.15 |
| Moss vase / 苔色の花瓶 | warm → moss glaze → downward dip → polish | 136 s | 0.16 |
| Evening pitcher / 宵の水差し | warm → blue glaze → downward dip → final glaze → controlled cool | 146 s | 0.17 |

The three scheduled limits total 412 seconds (6m52s). Each profile has its own target bands and reserve. Every phase and its countdown, plus the next phase, are available from `describeFiring()`. The pitcher ends in a lower controlled-cooling band after the final glaze; Finish becomes ready only after at least 15 seconds in that final 20-second phase, with quality at least 50 and temperature inside its band plus a 26-degree margin. The player must call `finishFiring()`; letting the firing reach its limit loses instead of silently awarding a win.

## Input and scoring

The heat-rate rule is `0.9 + ember × 23 − vent × (3 + temperature × 0.008)`. Ember falls by 0.085 per second without stoking. A held stoke adds 0.24 ember per second for 0.0045 fuel per second. A standard tap adds 0.12 ember and spends 0.00225 fuel, the same fuel per ember as a held stoke. Fuel cannot fall below zero; an empty reserve makes another stoke ineffective. Vent and ember clamp to 0–1.

Quality accumulates from time within each announced band and, at a smaller rate, within 44 degrees of that band. A firing requires grade 50 and an in-window manual finish. A finite reserve is re-established at each authored firing; campaign persistence remains the wrapper's responsibility.

## Deterministic controller check

`tests/full-kiln-model.test.mjs` compares the same controller with or without the next announced phase. The controller reads only the public phase/next-phase/countdown, temperature, ember and fuel state. It starts preparing for the next band during its final 16 seconds, blends the target toward the announced band's center plus a 20-degree lead, then requests a heat rate of `clamp((target − temperature) × 0.085, −9, 8)`. Vent is solved from the public heat-rate rule. The keyboard-shaped run moves vent by one 0.07 step at most every 0.3 simulated seconds; it adds a 0.12 ember tap when target error exceeds 30 degrees, ember is below 0.65, fuel exceeds 0.025, and at least 0.8 seconds have passed. It never holds stoke.

| Piece | Current-band grade | Anticipatory grade | Anticipatory finish time | Remaining fuel |
|---|---:|---:|---:|---:|
| Dawn bowl | 65 | 75 | 112.1 s | 0.055 / 0.15 |
| Moss vase | 59 | 77 | 126.1 s | 0.056 / 0.16 |
| Evening pitcher | 56 | 80 | 141.1 s | 0.066 / 0.17 |

The simulated anticipatory route totals 379.3 seconds (6m19s), and its three grades are each at least 10 points above the current-band-only run. No-input and continuously held-stoke controls fail. These are deterministic model-test results, not browser play, human comprehension, or evidence of actual enjoyment. The test's arrow cadence is a constrained simulation; root still needs normal-input browser verification.

The main tuning risk is the precise transition lead and vent-response feel. The controller result shows one visible-data policy is reachable within a limited fuel reserve; it does not establish that first-time players will infer that policy without clear on-screen cues.
