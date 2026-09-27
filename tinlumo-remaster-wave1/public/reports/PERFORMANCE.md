# Wave1 — performance and measurement limits

Measurements were collected through the running local Windows Chromium games. Viewport emulation is not physical-device validation. The primary interval metric includes long active-frame stalls; CPU submission is not GPU time, and none of these numbers are marketed as mobile FPS.

| Game / scene | Viewport | Draw calls at observation | Active interval P95 | Scope / budget |
|---|---|---:|---:|---|
| Lightwork L12 | 1440 × 900 · DPR1 | 460 | 5.6 ms | CPU submit P95 2.6 ms; 737,717 triangles; 2048 shadow; AO0.65; active animation sample |
| Lightwork L16 | 1440 × 900 · DPR1 | 617 | 5.7 ms | CPU submit P95 1.8 ms; 1,036,093 triangles; 2048 shadow; AO0.65; active animation sample |
| Lightwork L12 | 375 × 812 · DPR1 | 436 | 5.7 ms | CPU submit P95 2.5 ms; 733,445 triangles; 2048 shadow; AO0.65; active animation sample |
| Lightwork L16 | 320 × 812 · DPR1 | 593 | 5.6 ms | CPU submit P95 1.6 ms; 1,031,821 triangles; 2048 shadow; AO0.65; active animation sample |
| Two Ways T19 | 1280 × 900 · DPR1 | 402 | 5.6 ms | CPU submit P95 2.5 ms; 1,849,832 triangles; geometry attributes 45.3 MiB; 32 active intervals |
| Two Ways T12 | 375 × 812 · DPR1 | 596 | 5.7 ms | CPU submit P95 1.6 ms; 2,063,344 triangles; geometry attributes 37.3 MiB; 325 active intervals |
| Two Ways T18 | 320 × 812 · DPR1 | 596 | 5.7 ms | CPU submit P95 1.6 ms; 2,232,016 triangles; geometry attributes 39.4 MiB; 455 active intervals |
| Two Ways T12 | 1280 × 900 · DPR1 | 402 | 5.7 ms | CPU submit P95 1.5 ms; 1,372,808 triangles; geometry attributes 37.3 MiB; 600 active intervals |
| Magnet C6 | 1440 × 900 · DPR1 | 230 | 16.8 ms | CPU submit P95 1.0 ms; max 105.6 ms; >50ms 5/2685 active intervals; draw calls at boss observation |
| Magnet B6 | 1440 × 900 · DPR1 | 244 | 16.8 ms | CPU submit P95 0.9 ms; max 105.5 ms; >50ms 5/2557 active intervals; draw calls at boss observation |
| Magnet B1 | 375 × 812 · DPR1 | 229 | 16.8 ms | CPU submit P95 1.2 ms; 691,346 triangles; max 16.8 ms; 154 active intervals after pen input; short2.6s sample |

## Changes and tradeoffs

Lightwork reuses21 unique geometry definitions, groups repeated objects into instances, uses a2048 shadow map and65% AO resolution, caps DPR and stops rendering when still. The dense-scene measurements include the active mirror/gate/flower shadow work. In a settled L16 check, rendered frames stayed386→386 while the idle skip counter advanced180.

Two Ways combines static geometry by material without removing authored vertices, normals or colors. The same T19 scene changed730→402 observed draw calls (44.9% fewer), preserving1,849,832 triangles. CPU submission changed18.4→2.5ms in differently warmed samples; this is not a rigorous controlled speedup claim. The tradeoff is approximately37–45MiB of active geometry attributes in the observed scenes, excluding other CPU/GPU resources. Portrait uses two real camera views to preserve both towns and readability. Static idle rendering stops.

Magnet retains instanced scrap and effects, shared machine geometry/materials, shadow/AO limits, capped DPR and dirty rendering for pause/hub/choice/result. Its combat interval table includes unfiltered active-loop stalls. Paused frames remained229→229 while skip count increased4127→4211 over1400ms. See the Magnet browser report for the normal operation clears and exact sample conditions.

High-resolution cover exports requestDPR2 and use each renderer's own cap; they are a separate condition from theDPR1 performance table. Generated concepts are not rendered as scene backgrounds.

Physical phone memory pressure, battery/thermal behavior, Safari, low-endGPU and Human motion/listening acceptance remainNOT TESTED/PENDING.
