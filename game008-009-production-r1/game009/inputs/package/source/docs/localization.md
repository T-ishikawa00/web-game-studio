# Localization

The full product supports Japanese and English. All authored profile/phase names are bilingual in kiln-model.js. kiln-game.js supplies bilingual controls, objective, hook, hints, public temperature/fuel/ember/vent/timing facts and failure reasons. kiln-render.js localizes canvas controls, target/cooling labels, shelf/result and fuel facts. src/app.js localizes opening, paused/interlude/result states, saved-chapter notices, settings, backup/reset and storage errors. The language preference is saved in tinlumo.game009.v1. The document language and title update when switching languages.

Localized routes are the responsibility of the Portal adapter. The standalone product uses one entry and the player's saved language. It has no IP/geolocation-based language inference or remote translations. Correct JA/EN display and overflow must be verified in the actual source and public build browser before release; source presence alone is not that proof.
