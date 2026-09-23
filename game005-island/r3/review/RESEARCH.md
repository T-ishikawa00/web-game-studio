# Game005 UI Reference → Direction R3

2026-09-23 / Primary and bounded read-only researcher: `gpt-6-astra`.

## Authority and evidence

Human: island, automatic work and game content broadly satisfactory; current building/settings UI **REJECTED**. This is visual direction selection, not a game implementation or Craft acceptance. Read the supplied CODEX_REQUEST_R3.md in full. Supplied RESEARCH_NOTES/REFERENCES are starting hypotheses, not observations made by this run. No wood/paper/notebook aesthetic is presumed approved.

The supplied 15 entries were triaged. Active comparison is 12 candidates: Rooms, Crouton, Procreate Pocket, Gentler Streak, Flighty, Things 3, Bear, Outlanders 2, Mini Motorways, and independently discovered **Structured, Darkroom, Apple Maps**. Nine are clearly native non-game apps; Rooms is a creative/social app with game-like features and is not needed to meet that majority. Six deep references are Rooms, Crouton, Procreate Pocket, Mini Motorways, Structured and Darkroom. No candidate is counted as a played/installed app. No sales, awards, reviews or popularity are used to establish causal UI superiority.

Not deepened: Portal/TIDE lack sufficiently specific settings/selection evidence in the supplied pack; Tiny Glade/Townscaper/ISLANDERS/Dorfromantik would duplicate the game/tool category. Their specific UI remains unverified in this run. This is prioritization, not a finding that their UI is poor. Games with many residents/resources do not justify adding those systems to Game005.

`references.json` records source, image, date/version limitations, observer, observed UI, borrow and avoid separately. Primary inspected Rooms/Crouton/Procreate/Mini Motorways/Outlanders images; independent Astra inspected the three new examples, and primary checked Structured/Darkroom official help text. All are published static screens, no timing/interaction/2026 current-build verification. Reference images in the Review load from their rights holders **only after pressing the image button**, with no referrer. They are not downloaded into or used by the mock/game. Source links remain if a remote image stops working. No private project material was uploaded.

## Current R2 audit → design brief

Normal R2 was observed in a separate clean local browser context at 1440×1000: pause → building catalogue → settings. `r2-build-audit.png` / `r2-settings-audit.png`. User-provided failure screenshots remain unmodified in unserved request/assets.

| Observation | Design decision | Verification |
|---|---|---|
| Settings are same-size command buttons: English / turn sound on / reduced motion / low drawing / erase | Label, current value and appropriate control become distinct; language select, named switch, quality segment | JA/EN and keyboard; selected values survive panel redraw |
| Building names and prices dominate; no built appearance | Original existing model previews with name, cost and written status | Four state examples; images decode; chosen object and detailed explanation update |
| Reset looks like an ordinary option | Separate data section; confirmation, safe default focus on Back | Cancel preserves mock settings; confirm affects only memory; sentinel R2 save remains exact |
| Similar beige surfaces make all entries equally strong | A tool rail, B illustrated shelf, C typographic ledger; each has its own HUD/settings layout | Nine PC screens, six mobile screens, interactive same-condition comparator |
| R2 selection opens one fixed contextual panel | Candidate/detail layout may be split; no obligation to preserve R2 panel structure | Review makes panel occupancy a tradeoff, not a hidden consequence |

## Three directions and recommendation

**A / ATELIER — landscape and tools.** Deep petrol surfaces, restrained lime action, left tool rail, compact side candidate list, right selected-object inspector; settings use a narrow right sheet. On phone the tool rail moves to the bottom and candidate/detail becomes a stacked sheet. Borrow Rooms' local object focus and Darkroom's tool relocation; do not borrow icon-only professional controls. Lowest scene interruption on PC, but two separated selection surfaces require eye travel and short cards carry less visual detail.

**B / GALLERY — buildings first.** Neutral cool white, warm red action, bottom central controls, large illustrated building shelf and expanded selected preview. Settings are a centered, generously spaced name/value form. Phone uses a two-column scrollable gallery with persistent selected detail. Borrow Crouton's image/name/metadata grouping, Structured's settings hierarchy, and the upper/lower role split seen in Outlanders. Larger illustration improves direct visual comparison, but the mobile gallery covers most of the island and has to scroll.

**C / SIGNAL — a quiet overview.** Flat light panels, left typographic status/goal rail, right numbered compact facility ledger, wide selected-object strip below the landscape. Settings use a full-height left sheet. Phone puts the ledger above the selected summary. Borrow the clear selected row from Maps and Structured's grouping; do not borrow blur or a document/notebook skin. Better simultaneous reading of costs/states, but more text-led and less welcoming to players who choose by appearance.

**Recommendation: B / GALLERY.** This is a design hypothesis for Human to choose, not acceptance. The most explicit rejection concerns building/settings appearance: B makes buildings the first thing to compare and gives settings a stable, readable structure. Its cost is mobile scenery occlusion during selection. If keeping the island visible while browsing is the dominant criterion, choose A instead. No fourth hybrid is silently implemented. C is a real alternative for a quieter, less card-led look.

Compared with Chat's starting A/B/C, the structural intent is retained; the unverified Portal/editorial inference is replaced by observed Structured/Maps hierarchy, and Darkroom supplies explicit large-screen/phone control relocation. Wood, paper and linen are not adopted. Procreate's observed preference image actually uses selected blue tiles, not conventional switch rows: the on/off switches here are our Game005 design decision, not a claim that its screenshot proves them.

## Mock contract and same-condition background

No game runtime, core or storage module is loaded by the mock. Runtime is plain HTML/CSS/JS plus local PNGs. Session state is JavaScript memory only. Reload resets it. R2 keys are neither read nor written. Pause/home/build/shipment are clearly sample UI feedback, not actual progression, camera manipulation or trade. No new user-facing game system is added.

The common island image comes from the **unmodified** R2 IslandView and art code through a separate generator. Desktop uses its normal home view; phone uses the existing normal selected-panel camera framing for all three mock directions and screens. Rendering remains normal R2 lights, materials, exposure and shadow settings, DPR1. Same frozen mid-progress state and time0 for all: dock repaired, cottage unexpanded, market absent, lumber shed at55%, extension/bridge unbuilt, two residents; displayed available timber10/coins8. Market has sufficient resources but must await the current shed project; cottage lacks2coins. This is mock data, not a played checkpoint. The chosen model preview does not alter the common island. No superior capture-only graphics or edited 3D.

Previews render existing original R2 market/house(upgraded)/lumber/dock meshes. The new preview camera fits the existing object; it does not change the object. Source imports are read-only. Main backgrounds are separate fixed desktop/phone compositions rather than a live responsive 3D simulation; between those sizes the static scene scales. This is a visual mock limitation, not a proposed R2 camera change.

System fonts only: -apple-system, BlinkMacSystemFont, Segoe UI, Yu Gothic UI, Meiryo, sans-serif. No font files distributed/downloaded. Inline stroke icons are original simple paths, with text labels. No external icons, models, textures, assets, generation APIs or new dependencies. Three.js is reused only by the local asset generator; the normal mock does not load it.

## Implementation impact after selection — separate future scope

All directions can share a semantic facility/settings component model. A requires a rail/inspector responsive arrangement; B requires catalogue thumbnails, larger candidate states, and mobile gallery scroll behavior; C requires independent ledger/summary placement and denser typographic testing. Existing build/reservation/priority/cancel/arrival/storage commands should then be connected through an adapter, with game-specific input/pause/save regression. No save migration or economic rebalance follows from choosing a visual direction. This connection has **not** been done here.

## QA and limits

See qa.json: three directions × desktop1440×1000, phone390×844 JA/EN, small360×640 EN, landscape844×390 EN. Real DOM input, selection, scroll into view, close, focus return, switches, segments, language, mock delete cancel/confirm, goals/pause, Escape/Enter. No page errors or automatic external requests. Two initial defects were corrected: delayed Escape focus stole the next keyboard action, and a landscape tool rail overlapped the goal. These fixes do not affect R2.

External reference image loading is separately tested from the network-isolated mock. Review screenshots use the exact mock, no hidden UI. No full-loop 3D recording or four-game regression was rerun because their bytes remain protected and no game code changed. Prior R2 game QA remains historical evidence, not new R3 execution.

NOT TESTED: physical devices, iOS/Safari, native200% browser zoom, screen reader, user first-look understanding, listening, game-integrated input/pause/save interaction, market outcomes. No native or App Store work. Human visual direction and Human Craft acceptance remain pending.

## Operation and authority boundary

Loopback4392 serves only R3 public/review/generator-dist. Request, source, baseline and .cache are not served. Existing R2 loopback4391/PID26592 was running at entry and is left alone. R3's PID/start/port are in processes.json; only its exact process may be stopped with `powershell -NoProfile -File game005-island/r3/scripts/stop.ps1` from the repo root. Restart: `node game005-island/r3/scripts/server.mjs`.

No stage, commit, push, deploy, LAN, purchase, external setting or external write. No production/Portal/Consent/advertising changes. Existing3278files protected by aggregate baseline. Current receives only a bounded R3 status block while older history remains unchanged. Security raw history is not rewritten.

Stop: **GAME005_UI_DIRECTION_R3_READY / HUMAN_VISUAL_DIRECTION_PENDING**. No normal R2 implementation before Human direction choice.

