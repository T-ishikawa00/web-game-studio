# LENS contrast scope

When the saved `highContrast` setting is enabled, LENS adds a bright neutral-accent subject fill with a dark silhouette outline, dual-stroke tracking brackets and crosshair, and a larger dual-stroke focus indicator. The light cue uses a dashed white ring while waiting and a solid yellow ring plus a diamond when open. Sea mist becomes a striped yellow band with an outlined label. These are visual cues only; shot timing, hit bounds, scoring, movement, and input are unchanged.

With the setting disabled, LENS keeps its original palette and single-stroke cues. A renderer-level mock test verifies the default palette and the added high-contrast drawing calls. It does not establish measured luminance or contrast ratios.

Physical display testing and screen-reader testing remain unverified. Canvas visual cues are not individually announced by this change, and no claim of screen-reader access or physical-device readability is made.
