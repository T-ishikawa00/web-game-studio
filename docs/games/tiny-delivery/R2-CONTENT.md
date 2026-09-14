# Tiny Delivery — R2 content and deterministic rules

Date: 2026-09-13. Local Full-Run Alpha; Human visual, onboarding and full-game acceptance remain pending. This report covers the bounded rules/content workstream, not browser or physical-device acceptance.

18 levels in three six-level chapters. Original D01–D05 gameplay fields, IDs, answer keys and content version 1 are preserved. New boards D06–D18 are version 1. Each level has localized title, discovery and two hints. Answer JSON carries chapter, deterministic edit settings, every expected intermediate frame, counterexamples and complete enumeration counts.

## Final challenge, designed first

D18 uses a 7×7 board with two shared cells, two possible lower routes, four editable plates, two painted turns and two waiting places. Robot A must cross cell 23 before B; B must cross cell 25 before A. These are observations proved for every successful setting, not added priority rules.

Authored solution: arrows [2,2,0,1] in socket order [16,30,32,26]; waits [2,0] at cells [22,30]. Directions are north=0/east=1/south=2/west=3 in QA data only. A takes the longer southern route. A visits the first crossing on beat 2, B on beat 4. B visits the second crossing on beat 6, A on beat 8. B delivers on beat 8; A delivers on beat 9.

The short route with the same two-beat wait collides at cell 25 on beat 6. Reducing B's wait to one makes that short route work. Waiting only at A's later clock cannot fix the first collision. Thus route length and the location/timing of a wait affect the answer. Complete enumeration checks all 144 legal settings, finding 11 successes; every success retains both required crossing orders. Multiple valid solutions are intentional.

## Learning progression

| Level | Chapter | Discovery | Authored run beats | Winning settings / checked |
|---|---:|---|---:|---:|
| D01 | 1 | 矢印をタップして道を準備。出発すると走り出す。 | 6 | 1/16 |
| D02 | 1 | 曲がり角をつないで、荷物を受取口へ届けよう。 | 10 | 1/64 |
| D03 | 1 | 全員を届けよう。時計の場所で少し待つと、交差点を譲れる。 | 5 | 2/48 |
| D04 | 1 | 待ちすぎても、次の交差点でぶつかる。1コマずつ見てみよう。 | 6 | 1/48 |
| D05 | 1 | 曲がる場所と待つ場所。ふたりとも届ける計画を作ろう。 | 8 | 2/48 |
| D06 | 1 | 道を整え、交差点が空いてから進もう。 | 7 | 2/24 |
| D07 | 2 | 近道がふさがるなら、外側の道を使おう。 | 8 | 1/8 |
| D08 | 2 | 共有するマスへ入る順番を決めよう。 | 7 | 2/24 |
| D09 | 2 | 同じ長さの待機でも、置く側で順番が変わる。 | 6 | 6/36 |
| D10 | 2 | 相手が出るマスには、同じ拍で入れる。 | 4 | 1/4 |
| D11 | 2 | 正面から入れ替わる道を避けよう。 | 6 | 1/16 |
| D12 | 2 | 経路を整えたら、二台の交差を調整しよう。 | 7 | 6/144 |
| D13 | 3 | 最初の交差だけで安心せず、次も確かめよう。 | 7 | 1/24 |
| D14 | 3 | 最初と次の交差で、先を譲る側が変わる。 | 8 | 1/24 |
| D15 | 3 | 待機を増やしたとき、二度目の交差も見よう。 | 6 | 5/72 |
| D16 | 3 | 遠回りと待機を組み合わせて通そう。 | 8 | 2/48 |
| D17 | 3 | 二つの交差と、待つ位置をまとめて考えよう。 | 9 | 5/144 |
| D18 | 3 | 最初はA、次はB。道の長さと待つ場所を使い分けよう。 | 9 | 11/144 |

D07 introduces a usable detour around a simultaneous crossing. D09 makes two clock locations explicit. D10 demonstrates legal entry into a cell vacated on the same beat. D11 includes an independently checked head-on edge-exchange counterexample and a safe detour. D12 combines route editing with timing. D13 adds a second encounter; D14 reverses who yields. D15 demonstrates that an extra beat can cause a later collision. D16 requires route and timing together. D17 rehearses two encounters and clock placement. D18 completes the route-length/timing choice above. Later levels deliberately reuse earlier concepts with changed causal constraints rather than adding new rules.

## Local adjustment to the proposed shared-road theme

Under the retained unconditional plate rule, once two robots have the same cell and heading, they have the same future route. A genuine merged convoy cannot later choose two independent exits without conditional routing, or sending a robot through another robot's depot. Neither extension is authorized here. D08/D12 therefore use shared crossing cells, and D10 uses a just-vacated cell with perpendicular departures. This is a geometric adjustment to the proposed shared-corridor examples, not a new traffic priority or a claimed multi-cell convoy implementation.

## Verification evidence and limits

Command: node --import tsx --test tests/unit/delivery-r2.test.ts

24 tests PASS in this workstream. All 18 authored answers replay through the actual runtime rules. The 13 new answer traces were independently expanded from authored route coordinate lists plus arithmetic arrival/wait timing, without importing the runtime neighbor, tick or collision logic. The old five preserve prior MVP intermediate evidence. Additional manually stated expected cells, beats and wait counters cover D07, D10, D11, D15 and D18. Full bounded enumeration checks 936 settings across all levels; none relies on a timeout or unbounded search. These checks establish solvability and the specified constraints, not subjective fun or first-time comprehensibility.

Rules regression: two clocks, 0–3 stationary beats on arrival, no rearming during the same visit, reentry, painted turns, stationary collision, failed-intent locations, last-valid-position retention, opposite edge swap, full-state loop termination, safety cap, terminal runs, immutable edits and robot-order determinism. Legacy tests retain own/wrong depot and same-beat failure priority coverage. Production pause/step/background scheduling and persistence integration belong to the primary UI/integration QA.

No authored level needs three beats; maxWait stays 2 for this batch. The optional 3-beat ceiling is implemented and tested without inflating content difficulty with waiting duration.

## Integration contract

- delivery-r2.ts exports DeliveryLevel, DeliveryEdit, Robot, Bot, DeliveryRun, DeliveryFailure, startDelivery, tickDelivery and deliveryWaitCells. It imports only BaseLevel, Dir and neighbor from rules.ts.
- delivery-levels-r2.ts exports deliveryLevelsR2 (all 18). BaseLevel supports hints?: [Text,Text].
- Existing waitCell and edit.wait retain their exact semantics/shape. Old levels do not acquire waitCells or edit.waits.
- New waitCells is an ordered number array, including [] for no-clock boards. Persist edit.waits of the same length, using integers 0..(maxWait??2); retain wait:0 for structural compatibility. Restore editing settings only, never active run state.
- allowedDirections is parallel to sockets. Both input cycling and save validation must respect each cell's allowed directions. FixedArrows is a numeric-cell-to-direction record; these are painted, noninteractive turns and are not sockets.
- failureCells exposes the attempted failure locations; boundary failure highlights the last valid cell. Bot positions remain at the last accepted state on rejected movement. Draw both rather than relocating robots into walls.
- UI owns pause/resume/step scheduling and frozen edits while running. tickDelivery is entirely clock-free. Hints and QA answers do not auto-clear progress.

No stage, commit, push, deploy, real ads, purchase, external service or secret operation was performed by this workstream. Shared Portal, fixture, state and UI files were not edited here.
