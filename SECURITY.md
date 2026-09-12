# Security baseline R1

This repository is private project source. No public license or distribution permission is granted by this document. Product, rights and release acceptance remain separate.

## Secrets

- Never put real API keys, passwords, tokens, private keys or provider secrets in source, Git history, examples, issues, logs, screenshots, test fixtures or agent replies. Report only file, type and whether action is required.
- R1 is static and requires no runtime secrets. For a future authorized Cloudflare local integration, use ignored `.dev.vars`. Copy `.dev.vars.example` and populate only needed names locally. Do not create competing `.env` and `.dev.vars` sources. Examples contain comments and empty assignments only.
- `.dev.vars`, its variants, `.env` variants, key exports and `.wrangler/` are ignored. Ignore rules do not protect previously tracked files or `git add -f`; the pre-commit index check also blocks sensitive filenames.
- Browser-delivered code, `public/`, HTML, JS bundles, source maps, browser storage and `PUBLIC_*` variables are public to the browser. Never embed a real secret there, including through build-time substitution. A future secret-bearing operation must run on an authorized server/Worker with least privilege; a browser receives only a safe result. Public provider IDs are not authorization credentials.
- Future production secrets belong in provider-managed secret bindings; recovery credentials and ownership records belong in a Human-controlled password manager. Neither system has been established for this project. Never commit vault exports or recovery codes.
- Track names, purpose, owner and storage metadata in [the register](docs/security/SECRETS_REGISTER.md), never values. Do not share personal root credentials at transfer; assign access and rotate/reissue project credentials.

## Local protection and commands

Windows x64, from this repository:

```powershell
powershell -NoProfile -File scripts/security-setup.ps1
node scripts/security-scan.mjs all
git add -- <reviewed-paths>
node scripts/security-scan.mjs staged
git commit -m "<reviewed message>"
node scripts/security-scan.mjs history
```

Setup downloads the official pinned Gitleaks 8.30.1 archive, verifies its pinned SHA256, and sets only this repository's `core.hooksPath=.githooks`. No global installation/configuration. A clone does not inherit Git config: run setup before the first commit on every checkout.

On macOS/Linux, place the official Gitleaks 8.30.1 executable (verify the platform archive against official release checksums) in `.cache/tools/gitleaks/8.30.1/gitleaks` and give it executable permission, or use the same version on PATH. Then run `git config --local core.hooksPath .githooks`. Node and Git are required; the scanner itself is portable.

- `all`: scan the working directory including ignored files, caches, installed dependencies and build output; inspect archives to depth 2. Gitleaks' built-in rules/allowlists and supported text formats apply. Binary images are not OCR-scanned; arbitrary encryption and every possible password cannot be detected.
- `staged`: reject sensitive paths, nonempty secret templates, symlinks/submodules and unresolved entries, then scan a project-local snapshot of the complete Git index. This detects a secret staged earlier even when the working file has since been cleaned. The pre-commit hook runs this automatically and fails closed if Gitleaks is missing or the scan errors.
- `history`: scan all local refs after a commit and before an authorized push.
- Only sanitized file/type/action summaries are written to ignored `.tmp/security-r1/`. Index snapshots are removed after scanning; interrupted processes may leave ignored local copies. Treat this directory as sensitive if a future scan fails; do not upload it. Scan results never establish absolute absence of secrets.
- Do not bypass hooks (`--no-verify`), force-add secrets, suppress findings or weaken rules to obtain PASS. Hook configuration can be bypassed by a local user; this is a local guard, not server enforcement. New findings require Human judgment, including suspected false positives. No GitHub workflow or paid scanning service is enabled by this bootstrap.
- Human approved exceptions for verified upstream public examples/non-secret metadata on 2026-09-13. `scripts/security-public-exceptions.json` records only exact artifact hashes, provenance and finding locations: two npm public version strings and six Gitleaks README examples (archive duplicates included). Only `all` mode uses these exceptions after byte verification; a changed artifact blocks scanning. Index/history scans use no project exceptions. No directory-wide exclusion was added.
- Before any authorized push: full scan, staged scan when applicable, history scan, inspect changes, and pass existing QA. Public repositories are prohibited. Repository creation, remote configuration and push require the requested final Human confirmation.

## Reporting and incidents

Public reporting address: NOT YET CREATED. Inform the project owner through an already authorized private channel; do not invent an address or post credential evidence publicly. No external messages are authorized by this policy. Follow [incident response](docs/security/INCIDENT_RESPONSE.md).

References: [Gitleaks official usage](https://github.com/gitleaks/gitleaks), [pinned release and checksums](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1), [Cloudflare local variables and secrets](https://developers.cloudflare.com/workers/local-development/environment-variables/).
