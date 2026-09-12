# Exit Readiness R1 — minimum inventory

2026-09-13. Local preparation only. This is an ownership/dependency checklist, not a statement that the business, IP or accounts are already transferable. No corporation, contract or rights clearance is assumed.

| Item | Current project state / ownership | Future third-party transfer |
|---|---|---|
| GitHub | Project repository: **NOT YET CREATED**. Proposed owner: connected account `T-ishikawa00` (Human confirmation pending); proposed `web-game-studio`, **Private**, `origin`, `main` | Repository transfer/access must be verified and authorized at the time. Corporate ownership is not established. Local Git author is not proof of business/IP ownership |
| Cloudflare | Project account/resources: **NOT YET CREATED**. Candidate infrastructure only; owner unassigned | Verify future account/resource transfer rules, billing owner and recovery access before provisioning/transfer |
| Domain | Project domain/registrar ownership: **NOT YET CREATED** | Record registrant, registrar, renewal/billing and approved transfer process when acquired |
| Advertising provider | **NOT YET CREATED**. Mock/disabled ads only; provider, approval and contract unselected | Review contract assignment, exclusivity, payouts and approval requirements before use/transfer |
| Analytics | External provider/account: **NOT YET CREATED**. Current events are local browser memory only | If added, record account/data ownership and export/deletion/assignment terms |
| Secrets storage | Project vault and production secret store: **NOT YET CREATED**. Local convention `.dev.vars`; metadata in `../security/SECRETS_REGISTER.md` | Recipient receives controlled access and newly issued credentials, not personal passwords; verify recovery ownership |
| IP / assets / licenses | Existing source and internal fixture preserved. `../records/ASSET_REGISTER_R1.md` and `../records/DEPENDENCY_LICENSES_R1.json` contain provenance/license metadata | Human IP/asset acceptance, trademark checks, actual OSS license/NOTICE obligations and any assignment rights remain unverified. No blanket commercial or transfer clearance |
| External contracts | Project contracts: **NOT YET CREATED** per local project record; external personal arrangements not audited | Record parties, term, assignment/consent, exclusivity and termination when a contract exists |

## Minimum handoff structure

- Preserve the Git history, authority, source, lockfile, asset/license records and QA evidence. No paid service, account backend, CMS or M&A system is introduced.
- For each future resource, record actual legal owner, administrator, billing/recovery control and transfer restriction when created; do not infer these from a login name.
- The recipient can rebuild the static portal with Node/npm and the lockfile. Local development is independent of an external production account. Reinstall the repository-local secret-scan hook after cloning.
- Before a real transfer, Human must verify ownership/rights, applicable provider/contract terms, recipient access and credential rotation. **Transfer readiness: NOT YET VERIFIED.**

## Proposed GitHub operation — not executed

Target: `T-ishikawa00/web-game-studio`; visibility **Private**; remote `origin`; branch `main`. Creation, remote configuration and the first push remain behind the final Human confirmation. No deploy or workflow activation is included.

Read-only preflight: connected GitHub profile and existing default Git credential both identify `T-ishikawa00`. The proposed repository lookup returned 404; verify again immediately before creation. Authentication and name availability can change; create/push permissions are not proven until the authorized operation succeeds. No credentials were saved in this repository.

After explicit Human approval only: create an empty private repository with the GitHub API `POST /user/repos`, body `{"name":"web-game-studio","private":true,"auto_init":false}` using the existing credential in process memory; verify response owner/name and `private=true` before setting a remote. Never reuse an unexpected existing repository. Then:

```text
git remote add origin https://github.com/T-ishikawa00/web-game-studio.git
git push -u origin main
```

Before that push, rerun full/history scans and confirm the reviewed local SHA. Afterward, verify private visibility and direct remote branch equality with the local SHA. If creation has an ambiguous result, inspect read-only and stop before retrying. No Public fallback and no force push.
