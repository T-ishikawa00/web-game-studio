# Game009 save format

Game009 keeps the version-1 storage key `tinlumo.game009.v1`. Settings, legacy slice scores, completed IDs, reset generations, and older `resume: { mode, stage }` records remain readable. Invalid or future-version data stays intact and blocks ordinary writes. The campaign is an optional resume record inside version 1; it does not migrate or erase the existing save.

## Campaign resume

The campaign record stores only a chapter boundary. It never stores a partial firing:

```json
{
  "mode": "ember-glaze-campaign-v1",
  "campaignVersion": 1,
  "stage": 1,
  "seed": 9,
  "runId": "run-identifier",
  "qualities": [74]
}
```

`stage` is the next firing, from 0 through 2. `qualities` contains exactly one finite 0–100 grade for each already completed firing, so its length equals `stage`. `seed` must be a safe integer. `runId` is 1–80 letters, digits, underscores, or hyphens. Extra fields are rejected for this campaign record. A failed firing remains at the same stage; resume begins that firing from its opening state.

The wrapper must call `startCampaign({ seed, runId })` only for an explicit new commission. It creates stage 0 and may replace the currently stored campaign only when the store snapshot still matches the record read when this store instance was opened. A stale tab cannot use this call to overwrite progress saved by another tab after it opened.

After a firing is completed, call `checkpointCampaign({ runId, stage, seed, qualities })`. The saved campaign must have the same `runId` and seed. Stage may stay the same or advance by one; previous grades must remain identical. A stale checkpoint, a skipped stage, a changed grade, an invalid grade count, or a different run is refused. The wrapper must show a save failure as a failure and must not announce the checkpoint as saved.

For a user-requested abandon, `clearCampaign({ runId })` clears only the matching live run. To record the completed commission, call `completeCampaign({ runId, score })` from stage 2. It clears the matching resume record, adds `ember-glaze-campaign-v1` to `completed`, and merges the 0–300 score into `bests.ember-glaze-campaign-v1` by maximum. Completion and abandon reject a stale run ID. Ordinary `update()` rejects direct resume mutations; settings-only updates preserve the latest saved campaign and can retry a previously failed, authorized campaign write.

Reset remains explicit. It clears the campaign with the other save fields, advances `resetGeneration`, requires exact storage readback, and prevents older tabs from resurrecting cleared data. Campaign writes also require exact readback; quota, storage, or readback failure returns `false` and leaves `status` at `write-failed`.

## Compatibility and limits

Old score IDs and their existing score range remain valid. The campaign best alone is limited to 300. Completed IDs and best scores remain monotonic across ordinary writes. Settings are merged from the latest stored snapshot, and a setting changes only when a patch names that setting. These checks protect local progress integrity; they do not prove campaign gameplay or completion. The caller can only mark a chapter complete after the game reports a real firing result.
