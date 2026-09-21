# Consent Architecture R1 — Human Security Disposition

2026-09-21. Human explicitly approved exactly C1–C4 as **FALSE POSITIVE / NON-CREDENTIAL / APPROVED**. HUMAN_SECURITY_DISPOSITION_PENDING is CLOSED for these detections only.

| ID | File | Detector / type | Referenced file |
|---|---|---|---|
| C1 | `.tmp/consent-r1/before.json` | Gitleaks / generic-api-key | `docs/qa/public-deploy-go-r1/access-postflight.json` |
| C2 | `.tmp/consent-r1/before.json` | Gitleaks / generic-api-key | `docs/security/SECRETS_REGISTER.md` |
| C3 | `.tmp/provider-human-update/before.json` | Gitleaks / generic-api-key | `docs/qa/public-deploy-go-r1/access-postflight.json` |
| C4 | `.tmp/provider-human-update/before.json` | Gitleaks / generic-api-key | `docs/security/SECRETS_REGISTER.md` |

The exact detections are SHA256 file-preservation hashes in generated QA ledgers. Recalculation matched their referenced files. The ledgers are ignored/untracked and absent from Git index, local history, production distribution and Consent C served output. Identical non-secret file hashes also occur in older tracked QA evidence; this is distinct from inclusion of the candidate ledgers themselves. No credential values or fragments are recorded here.

Raw scanner FAIL history remains unchanged. No deletion, rotation, scanner relaxation or allowlist change is required or authorized. This approval does not apply to other past/future candidates or generic-api-key detections in general. The older SHA false positive and local-only TLS private key retain their separate dispositions. Full-index and history scans remain independent gates.

Human accepted C for production: no initial analytics banner; default OFF; explicit settings and allow only; separate from Google advertising/CMP. Human authorized targeted QA, checkpoint commit, normal push, production deploy and smoke for C only. Google and Cloudflare settings, games and saves remain unchanged. Any new Security candidate stops the release.
