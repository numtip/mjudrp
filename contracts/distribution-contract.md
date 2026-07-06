# MJU-DRP Distribution Contract v1.0

## Status: FROZEN — 2026-07-06

This contract defines the relationship between MJU-DRP registry packages and consumer projects.

## Package Layout

Consumers must reference ONLY the `registry-package/` directory within a release directory:

```
release/
├── latest/registry-package/    ← Always newest stable
├── v1/registry-package/        ← Frozen versioned
└── archive/                    ← Historical
```

**Forbidden paths for consumers:**
- `registry/` — Internal registry data
- `schemas/` — JSON Schema files
- `scripts/` — Build and validation scripts
- `dist/` — Temporary build output
- `memory/` — Project memory

## Version Rules

| Component | Rule |
|-----------|------|
| Package Version | Semantic versioning (MAJOR.MINOR.PATCH) |
| Registry Spec | FROZEN at v1.0; changes require ADR |
| Package Format | FROZEN at v1.0; changes require ADR |
| Consumer Contract | FROZEN at v1.0; changes require ADR |

## Compatibility Rules

| Package Version | Registry Spec | Consumer Contract | Status |
|----------------|---------------|-------------------|--------|
| 1.0.x | v1.0 | v1.0 | ✅ Active |

## Consumer Requirements

1. **Fetch from `registry-package/` only** — Never reference internal folders
2. **Check manifest.json** — Validate `consumer_compatibility` before processing
3. **Pin versions in production** — Use `release/v1/registry-package/` not `latest/`
4. **Validate checksums** — Verify SHA-256 hashes for production use
5. **No metadata duplication** — Always fetch from MJU-DRP; do not maintain copies

## Package Contents

Every registry package MUST contain:

| File | Required | Description |
|------|----------|-------------|
| `document-registry.json` | ✅ | All document metadata |
| `category-registry.json` | ✅ | Category taxonomy |
| `project-registry.json` | ✅ | Consumer projects |
| `owner-registry.json` | ✅ | Document owners |
| `evidence-registry.json` | ✅ | Evidence mappings |
| `relationship-registry.json` | ✅ | Cross-document relationships |
| `search-index.json` | ✅ | Lightweight search index |
| `minisearch-index.json` | ✅ | MiniSearch full-text index |
| `statistics.json` | ✅ | Registry statistics |
| `validation-report.json` | ✅ | AJV validation results |
| `performance-report.json` | ✅ | Generation timing |
| `manifest.json` | ✅ | Package manifest |
| `release-notes.md` | ✅ | Release notes |
| `checksum.json` | ✅ | SHA-256 checksums |
| `README.md` | ✅ | Package overview |

## Backward Compatibility Policy

1. **JSON field additions**: Allowed in minor/patch releases
2. **JSON field removals**: Only in major releases
3. **JSON field type changes**: Only in major releases
4. **New output files**: Allowed in minor releases
5. **Removed output files**: Only in major releases
6. **Search index format changes**: Only in major releases
7. **Manifest schema changes**: Only in major releases

## Contract Violations

If a consumer project violates this contract (e.g., by depending on internal registry files):

1. The project will receive a warning
2. If unresolved, the project may break when internal files change
3. MJU-DRP maintainers are not obligated to maintain backward compatibility for internal files

## Change Process

Changes to this contract require:
1. ADR in `memory/DECISIONS.md`
2. Approval from project owner
3. Update to this document
4. Update to all distribution documentation
5. New major version of the package format
