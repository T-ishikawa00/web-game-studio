# Secrets Register R1

2026-09-13. Metadata only. R1 has no configured API, account, Cloudflare, advertising or external analytics integration. A scan finding is not proof that a credential is active.

| Purpose / name | Project status | Storage location | Owner / access | Rotation / transfer |
|---|---|---|---|---|
| GitHub project access token / SSH key | Project-specific credential: NOT YET CREATED | Existing operator authentication is outside this repository; never copy it here | Connected GitHub account observed: `T-ishikawa00`; local Git author identity is separate | Before transfer, assign recipient access and revoke obsolete access; do not transfer personal tokens |
| Cloudflare deployment API token | NOT YET CREATED | Future approved password manager / execution secret store; never browser/runtime assets | Project account owner: NOT YET CREATED | Scope to project, reissue on owner/access changes |
| Cloudflare runtime / server API secret | NOT YET CREATED | Local `.dev.vars`; future authorized Worker secret binding | NOT YET CREATED | Per-provider rotation and recovery procedure at integration |
| `SERVER_API_KEY` | NOT YET CREATED; template name only | `.dev.vars` when required | NOT YET CREATED | Define at integration |
| `AD_PROVIDER_SECRET` | NOT YET CREATED; template name only | `.dev.vars` locally; future provider-managed server secret | NOT YET CREATED | Define at provider selection |
| `ANALYTICS_WRITE_SECRET` | NOT YET CREATED; template name only | `.dev.vars` locally; future provider-managed server secret | NOT YET CREATED | Define at provider selection |
| Password / recovery codes / domain registrar credentials | Project-specific credentials: NOT YET CREATED | Human-controlled vault: NOT YET CREATED | NOT YET CREATED | Verify recovery ownership; rotate/reissue at transfer |

Do not enter real values, partial values, personal vault paths, recovery codes or credential-bearing URLs. A future register entry must name the responsible owner, least-privilege scope, environment, storage system, last rotation date and revocation procedure. Public measurement IDs must be explicitly classified separately; they cannot replace authorization secrets.

Pending scanner candidates are held in ignored `.tmp/security-r1/` as file/type/action only. Do not assume they are genuine credentials or silently allowlist them.
