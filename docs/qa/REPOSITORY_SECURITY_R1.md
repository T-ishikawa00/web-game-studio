# Repository / Security Bootstrap R1

Date: 2026-09-13. Scope: `C:\projects\Web Game Studio` only. GitHub creation/remote/push await Human confirmation.

## Initial state and preservation

- cwd exactly matched the required project directory. Git already initialized; branch `main`; HEAD unborn; tracked 0; untracked 52; remote 0; stash 0.
- Captured SHA256 for all 52 original files in ignored `.tmp/security-r1/baseline.json` before edits. All 52 remain; only `.gitignore` and repo-local `AGENTS.md` were updated. The other 50, including all Portal source, fixture, tests, package/lock files, existing QA/screens and authority, remain byte-identical.
- Authority SHA256 remains `FAAB664608C7F80FE6A5E5E543A9D632ED23939E7A5DD6461E24EF19B22A3F73`. No Portal redesign, game production, reset, deletion or recreation.
- Added secret templates/policy/register/incident response, minimum exit inventory, pinned local scanner/setup, index guard/hook and regression self-test. `.gitattributes` preserves LF in shell hooks for Windows/macOS/Linux checkouts.
- Writes and cache/tool downloads were confined to this project. No other repository, global Codex/Git settings, profile, deployment, provider configuration, contract, purchase or external message was changed by this task. Other processes' filesystem activity was not audited.

## Verification

| Gate | Result | Evidence / scope |
|---|---|---|
| Baseline | PASS | `.dev.vars` and `.env` variants ignored, including nested paths; empty examples remain Git candidates. Forced sensitive paths blocked in index; real secrets prohibited in browser output |
| Gitleaks installation | PASS | Official 8.30.1 Windows x64 archive SHA256 `d29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e`; repository-local install and hook config |
| Whole project scan | PASS | `node scripts/security-scan.mjs all`: includes ignored caches/dependencies/builds, archive depth 2; zero unresolved findings after Human-approved provenance verification |
| Full index scan | PASS | `node scripts/security-scan.mjs staged`: raw Git blobs, no checkout/smudge transformation; no project exceptions. Re-run by real pre-commit hook |
| Scanner/hook regression | PASS | `node scripts/security-self-test.mjs`: 7 isolated-index cases covering clean file, synthetic staged token, forced `.dev.vars`, nested `.env`, nonempty/empty template and actual hook failure propagation. Real index unchanged; no real credentials used |
| Type check | PASS | `npm run check`: 0 errors/warnings/hints |
| Unit regression | PASS | `npm test`: 10 passed, including persistence/failure, pause-pressure and local analytics/registry |
| Production build | PASS | `npm run build`: 18 static pages |
| HTTP/route regression | PASS | `npm run test:routes`: 3 passed; 16 locale routes, links/assets/root/404/legal drafts and no external runtime transport |
| Whitespace | PASS for new/modified content | `git diff --cached --check -- . ':(exclude)START_HERE_CODEX_WEB_GAME_STUDIO.md'`. Full check reports only the original authority's lines 3–4 Markdown trailing double-spaces; preserved by instruction |
| Independent review | PASS | Read-only agent review of security code/docs; raw-blob snapshot recommendation incorporated. Primary verified integration |
| Browser/responsive/physical device | NOT RE-RUN | Portal runtime and previous browser evidence unchanged by SHA256. Prior browser QA remains in `BOOTSTRAP_QA_R1.md`; no new physical-device claim |
| Human product/rights acceptance | NOT TESTED | Not inferred from QA. Existing theme-selection gate remains |
| GitHub creation/push/deploy | NOT EXECUTED | Human confirmation boundary; private target prepared only |

## Approved scanner dispositions

Initial full scan detected eight candidates and commit was held. Human then explicitly allowed only provenance-verified public sample exceptions. Two npm cache matches are public experimental Astro version strings, confirmed against official registry metadata; six are official Gitleaks README detection examples, including duplicate archive members. The tagged README was byte-identical and the archive checksum matched the official release.

`scripts/security-public-exceptions.json` records full artifact hashes, source links and exact file/member/rule/line. Exceptions apply only to the whole-directory scan and only while entire artifact bytes match. No directory exclusion or source/history suppression. No credential value is recorded. Changed/new findings require Human review. Scanner PASS is not a guarantee that every possible secret or image-embedded text is detectable.

## Commit and GitHub boundary

First local commit is authorized only after the above technical gates. Pre-commit HEAD: unborn. The resulting SHA and post-commit history scan/worktree state are reported in the task and can be checked with `git log -1 --format=%H` and `node scripts/security-scan.mjs history`; this document does not embed its own commit SHA.

Proposed owner/name: `T-ishikawa00/web-game-studio`; **Private**; remote `origin`; branch `main`. Connected profile and existing default Git authentication both resolve to that account. Name lookup returned 404 at preflight; repeat before creation. No credential is saved in source. Create/push permission remains untested until Human-authorized execution.
