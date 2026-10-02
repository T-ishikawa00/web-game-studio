# COILHOP save specification — standalone r1

Status: exact game/save source copies verified in the final standalone package. Portal integration is separately blocked.

## Scope and namespace

Save only player progress and selected local preferences. No account, cloud sync, analytics, unique player identifier, or cross-device promise is part of this standalone package.

The production source uses `tinlumo:game008:coilhop:v1`. The earlier slice key `tinlumo:game008:slice:coilhop:v1` remains separate; the production build does not implicitly migrate or overwrite it. A release must not accidentally share a key with another title or overwrite slice progress. Any future migration must be explicit, versioned, tested, preserve the source record until the new record has been validated, and be included in the release notes.

## Record contract

The current game calls the shared `createStore(key, defaults)` in `public/shared/save.js`. It stores an origin-local JSON record containing `version`, `generation`, `completed`, `best`, and `settings`. Maps are validated as plain objects and written with own properties; persisted completion/best progress is monotonic, while setting fields use last-write-wins. Current defaults contain:

- `completed.course-01` through `completed.course-08: true` after each authored garden course is cleared; the final completion represents the summit course. Clearing a forked course also records the selected edge as `completed.<course-id>:path:<fork-pad-id>:<selected-pad-id> = true`; these path flags power replay-choice tracking and do not unlock courses or increase campaign-clear count.
- `best["medal:<course-id>"]` as a bounded medal value produced from the current run's falls.
- `settings.lang` (`ja` or `en`), `settings.sound` (boolean), `settings.reducedMotion` (boolean), and `settings.course` (zero-based course index).

Do not persist simulation objects, frame time, random effects state, DOM state, checkpoint, current pad, partial run seconds, falls, or hops. The current course is a preference used to resume; `unlocked(index)` checks bounds and requires the preceding course's completion before a noninitial course may start or be selected. Preserve that authorization boundary on every navigation/replay path.

## Failure, reset and privacy behavior

The shared store fails closed on malformed or unknown-version records, preserves raw bytes, verifies writes, and backs up existing raw data on explicit reset before replacement. A successful reset advances `generation`; tabs opened on an older generation receive `stale-generation` on write. Keep this behavior: storage denied, quota exceeded, or malformed data must show an honest localized notice and allow session-only play where safe. Never auto-reset, silently replace unknown schema, or erase another game's key. Reset must be user initiated and scoped to the full-game key; generation-based stale writers must not revive a cleared save.

Browser local storage may be cleared or unavailable in private/restricted contexts. Saves are not a backup and do not survive all browser/site-data deletion. Avoid collecting or storing personal information. If a later Portal integration adopts a different official WGS key/adapter, define a separate reviewed migration and do not claim standalone saves carry over until verified.

## Validation and limits

50 tests PASS, including both course-five paths, summit completion, source keyboard/pointer/cancel, quota/corrupt/unknown-schema, reset counters/generation and storage clear. The VM harness is not browser QA. Actual browser play reached all8 courses and both alternatives of both forks; latest map readback showed8/8 and2/2 for each fork. Game-only reset in another tab while a pointer was held ended the old attempt; stale release did not launch. Packaged course01 completion/settings/reload retained the medal, unlocked02 and kept03 onward locked; explicit reset returned0/8. All storage/browser/device permutations are not tested.
