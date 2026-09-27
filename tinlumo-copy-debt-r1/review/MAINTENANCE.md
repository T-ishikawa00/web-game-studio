# Public copy maintenance

- Future edits start from current production registry, source adapters and candidate manifest. Build with `node scripts/visual-remaster-build.mjs --candidate <new-name>`; never overwrite accepted artifacts or postflight evidence.
- A newly added game must be audited through its actual renderer: visible copy, aria/title/alt, settings, empty saves, errors, reset confirmation, ending screens and linked credits. Internal IDs remain stable. Brand copy must not depend on portfolio size.
- Island public names currently live in `src/production/island-copy.js` for the coast/village markers. Both Play wrapper and raw HTML load it. On an authorized Island source rebuild, move the names into its native localization table and remove the adapter only after equivalent placement/relocation/language QA. Do not silently stop shipping the adapter.
- New evolution/build options must supply public names in JA/EN without development version notes. Compare labels with the actual choice screen.
- Actual ad introduction requires a separate release review of public policy, provider/data disclosures, Consent/CMP and real SDK behavior together. Current no-ad legal facts change only when the real operation changes. No ad-free brand promise.
- Keep contact-purpose restrictions, attribution, operator, retention, rights and effective dates distinct from marketing changes.
- Before publication, require explicit scoped Git/deploy authorization and fresh applicable Security checks. Historical raw failures and unknowns remain evidence; local content QA does not clear them.
