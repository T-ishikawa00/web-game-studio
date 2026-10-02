# Rollback scope

The accepted R1 baseline remains immutable. R2 is a separate standalone candidate with separate Journey records and settings; Quick Run retains its accepted record key. No migration or remote database change exists.

Before Portal integration, record latest main commit, current published deploy ID, Production runtime hashes, dirty state and active writer in an integration receipt. Use latest main; never reset or redeploy an older Production revision to remove unrelated Growth or Consent work.

After integration, rollback is a scoped revert of the R2 integration commit on the then-current main, followed by the current full security/QA/deploy/readback gates. Preserve unrelated subsequent commits. An alternative emergency republish may only use the exact immediately previous deploy captured at integration if no intervening independent Production changes exist; otherwise perform the scoped revert. Verify that existing six games, current consent/measurement and AdSense play exclusions still work.

Keep R2 local record keys; older R1 ignores them. Do not delete user storage. The immediately previous Portal/RIMBLOOM assets must be included or identified by verified Git paths/hashes in the integration receipt. Until that receipt exists, Production rollback is NOT VERIFIED and this document alone is not a deploy authorization or proof of remote state.
