# Game009 audio cues and media evidence

## Runtime cues

Game009 generates seven short oscillator cues with Web Audio. The cues are event-only: there is no music loop, ambient bed, downloaded audio, narration, or third-party audio service.

| Cue | Tone profile | Gameplay event |
| --- | --- | --- |
| tap | 360→520 Hz, 90 ms, sine | A stoke press or keyboard tap. Sustained feeding does not repeat this cue every frame. |
| impact | 170→55 Hz, 170 ms, triangle | Retained sound-bank profile used by archived discovery slices; the full product does not call it. |
| success | 660→990 Hz, 270 ms, sine | Ready-to-finish transition and a successful first/second vessel. |
| fail | 180→85 Hz, 400 ms, triangle | A failed firing. |
| step | 420→630 Hz, 140 ms, sine | Firing-phase change. |
| finale | 440→880 Hz, 800 ms, sine, followed by four short staggered sine tones | Successful third vessel and commission result. |
| swish | 190→370 Hz, 110 ms, triangle | A vent pointer press or keyboard adjustment. Continuous pointer dragging does not repeat this cue every frame. |

The user volume setting is clamped to 0–1, defaults to 0.45, and drives master gain at volume × 0.65. The master feeds a Web Audio compressor (threshold −8 dB, knee 0 dB, ratio 20:1, attack 3 ms, release 120 ms) and, when available, the capture stream. This is peak control, not a brick-wall limiter guarantee. The audio context is unlocked after a user action; unsupported or blocked audio does not stop gameplay.

## Current Kiln clip pack

[marketing/clips.json](../marketing/clips.json) binds each accepted source WebM and MP4 by SHA-256, byte size, duration, geometry, codec, visible description, source contact sheet, and objective decode measurements. It also records the ordinary-input / real-elapsed gameplay and frozen-rule QA references, with the boundary that the key-event trace is campaign-level rather than synchronized to individual frames and the capture-time source revision was not assessed.

| Capture | Visible content in the source | Source video / audio | Audio alignment | Final decoded AAC |
| --- | --- | --- | --- | --- |
| A — [MP4](../marketing/clips/ember-glaze-clip-1790964826149.mp4) | Commission 1/3, Dawn bowl; “Soften the glaze”; sampled countdown 90→75 s. | 19.971 s; audio timeline 19.088 s; source peak −15.47 dBFS, RMS −39.79 dBFS, 0 samples ≥0.999. | Fill source packet timestamp gaps with silence; pad the remaining 0.883 s to the source video duration. | 19.989 s decoded; peak −15.51 dBFS, RMS −40.01 dBFS, 0 samples ≥0.999. |
| B — [MP4](../marketing/clips/ember-glaze-clip-1790964982494.mp4) | Commission 2/3, Moss vase; “Open the moss glaze” then “Cool into the deep green”; sampled countdown 80→65 s. | 19.972 s; audio timeline 20.025 s; source peak −15.52 dBFS, RMS −38.44 dBFS, 0 samples ≥0.999. | Fill source packet timestamp gaps with silence, then trim 0.053 s to the source video duration. | 19.989 s decoded; peak −15.53 dBFS, RMS −38.59 dBFS, 0 samples ≥0.999. |
| C — [MP4](../marketing/clips/ember-glaze-clip-1790965867522.mp4) | Commission 3/3, Evening pitcher; cool for final sheen, manually finish; result shows 75 / 76 / 78. | 19.971 s; audio timeline 16.604 s; source peak −11.84 dBFS, RMS −38.08 dBFS, 0 samples ≥0.999. | Fill source packet timestamp gaps with silence; pad the remaining 3.367 s to the source video duration. | 19.989 s decoded; peak −11.84 dBFS, RMS −38.89 dBFS, 0 samples ≥0.999. |

The original captures are retained in qa/captures/. Each output is MP4/H.264, 720×720, yuv420p, 30 fps, AAC 48 kHz stereo, with moov before mdat for fast start. The source is already square; the packer preserves the complete frame if future source geometry differs. It adds no BGM, narration, overlays, speed change, or gameplay outcome.

For audio alignment the packer uses FFmpeg aresample=48000:async=1:first_pts=0 to restore gaps in the sparse source Opus packet timeline as silence, then apad and atrim to the original video duration. It does not shift the game clock or retime the video. AAC frame packing yields a decoded PCM tail of about 17–18 ms beyond the exact MP4 movie duration; each output remains within one 30 fps frame of the source video duration. Final video and audio streams were decoded fully. Audio was decoded to 48 kHz stereo float PCM for peak, RMS, and absolute sample count at or above 0.999.

An initial A transcode failed the audio-duration check: resampling without timestamp-gap restoration produced only 12.096 s of decoded audio for 19.971 s of video. That file is retained at [the failed first-pass output](../qa/media-transcode-failures/ember-glaze-clip-1790964826149-first-pass-audio-timeline-mismatch.mp4), excluded from the marketing deliverables, and listed in marketing/clips.json. The corrected timestamp-aware method above was used for the three final clips.

The three clips are Kiln gameplay. They make no Lens-specific audio or visual claim. No subjective listening, speaker/headphone comparison, or physical-device playback was performed. tests/audio.test.mjs passes 7/7 tests; those tests use mocked Web Audio objects and verify setup, profiles, settings, cleanup, and failure handling. They do not play or listen to the cues and do not establish perceived loudness or sound quality.
