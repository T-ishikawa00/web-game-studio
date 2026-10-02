# Game009 build and release package

## Reproducible static build

Use Node.js 22 or newer and no package installation is required. From the project root, run:

```powershell
npm test
npm run build
npm run verify
```

`npm run build` creates a clean temporary directory inside this project, copies only `index.html`, `src/app.js`, `src/style.css`, `src/common/`, `src/product/`, and optional `assets/`, then writes `dist/manifest.json`. The manifest lists each runtime file in stable path order with its byte length and SHA-256. It contains no build time or machine-specific values. Running the same source twice yields the same built file set and manifest bytes.

The builder validates that inputs and output paths remain under the project root, rejects symlinks in runtime inputs, and does not write over an existing `dist/`. It stages the complete new build first. If a prior `dist/` exists, the builder moves it to a unique `dist-backup-<UTC timestamp>-<id>/` path, then atomically renames the staged build to `dist/`. Backups are retained. If publishing the new folder fails, it attempts to restore the old `dist/`; a failed stage is retained for inspection. No old output is recursively deleted.

The static build excludes `tools/`, `tests/`, `design/`, `research/`, `reviews/`, and `qa/`. The original three candidate modules in `src/games/` and Gold archive are excluded from the public build. Balanced build markers remove all capture UI, capture code and the research footer link. An unbalanced marker or leftover capture reference fails the build. Use the source-tree server with `?review=1` for captures; the public build has no capture feature even with that query.

## Immutable local release package

After the source, marketing files, QA records, rights record, and known limitations are ready, run:

```powershell
node tools/package.mjs
```

The command first makes a fresh static build, then creates `.release-packs/<package-id>/`. The ID is SHA-256-derived from the sorted project source snapshot and built static output. The package stores a complete source snapshot under `source/`, the verified static build under `build/`, a baseline source digest, and a file-by-file manifest. It excludes local `.env*` files, dependency caches, Git metadata, existing `dist/`, old build backups, and previous package output. Symlinks are rejected.

Package publication uses a new staging directory and a same-volume rename. An existing hash-named package is checked against its manifest and checksum; it is never overwritten. If the package changes, a new ID and directory are produced while prior packages remain in place. Failed staging directories are kept for inspection. The manifest covers every package file except the manifest itself and its detached `.sha256` checksum; the detached checksum covers the manifest.

`baseline.sha256` hashes the exact sorted source file paths and bytes included in the package. `build/manifest.json` covers the runnable files in the built site. Package creation records a local snapshot only; it does not establish Human acceptance, public rights clearance, an external listing, or a Production deployment. Use the included QA, rights, and known-limitations records to understand what the package proves and what remains unverified.

Run `node tools/server.mjs --dist` for the public build on http://127.0.0.1:4609. If that port is occupied by the source review server, use `$env:GAME009_PORT='4610'` before the same command. These servers bind only to loopback. The review-only static footer target, live network behavior, audio perception, physical-device compatibility, and external release status are not established by a successful build or package command.

