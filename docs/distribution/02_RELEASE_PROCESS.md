# Release Process

## Overview

The MJU-DRP release process is automated via the release pipeline script and GitHub Actions. Each release produces a complete, self-validating registry package.

## Release Pipeline

```
Registry Data Changed
       │
       ▼
1. Validate (AJV)          ── node scripts/validate-registry.mjs
       │
2. Generate Outputs         ── node scripts/generate-search-index.mjs
       │
3. Run Tests                ── npm test
       │
4. Create Package           ── Copy dist/ → release/latest/registry-package/
       │
5. Enhance Manifest         ── Add version, counts, compatibility, build hash
       │
6. Generate Release Notes   ── node scripts/generate-release-notes.mjs
       │
7. Generate Checksums        ── node scripts/generate-checksum.mjs
       │
8. Validate Package          ── node scripts/validate-package.mjs
       │
9. Copy to Versioned Path   ── release/v1/registry-package/
       │
10. Commit & Push           ── git commit + git push
```

## Running a Release

```bash
# Full release pipeline
node scripts/release.mjs

# Individual steps (for debugging)
node scripts/validate-registry.mjs
node scripts/generate-search-index.mjs
npm test
node scripts/generate-release-notes.mjs
node scripts/generate-checksum.mjs
node scripts/validate-package.mjs
```

## Version Policy

| Component | Version | Policy |
|-----------|---------|--------|
| Registry Spec | v1.0 | FROZEN — requires ADR to change |
| Package Format | v1.0 | FROZEN — requires ADR to change |
| Package Release | 1.0.0 | Semantic versioning |

## Release Frequency

- **Patch releases** (1.0.x): Registry data corrections, documentation fixes
- **Minor releases** (1.x.0): New features, additional data, tooling improvements
- **Major releases** (x.0.0): Breaking changes to package format or consumer contract

## Quality Gates

Every release must pass:
1. `node scripts/validate-registry.mjs` — PASS
2. `node scripts/generate-search-index.mjs` — completes without error
3. `npm test` — ALL assertions PASS
4. `node scripts/generate-checksum.mjs` — completes
5. `node scripts/generate-release-notes.mjs` — completes
6. `node scripts/validate-package.mjs` — PASS
7. Memory files updated
8. Runtime files updated
9. Architecture Lock unchanged
10. Registry Spec unchanged
