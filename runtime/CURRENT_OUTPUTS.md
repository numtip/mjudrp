# Current Outputs

## Generated Outputs

| File | Format | Size | Consumer |
|------|--------|------|----------|
| `dist/search-index.json` | JSON array | ~4 KB | All consumer projects (search) |
| `dist/document-registry.json` | JSON array (normalized) | ~9 KB | All consumer projects (full registry) |

## Architecture Outputs

| File | Purpose |
|------|---------|
| `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` | Architecture lock v1.0 (8 rules, quality gates, change process) |
| `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` | Frozen Registry Specification v1.0 (6 schemas) |
| `docs/architecture/02_SCHEMA_VERSION_POLICY.md` | Semantic versioning for schemas |
| `docs/architecture/03_IMPLEMENTATION_BACKLOG.md` | Prioritized P0-P3 backlog |
| `docs/architecture/04_IMPLEMENTATION_GUIDELINES.md` | Coding standards and constraints |
| `docs/architecture/05_MIGRATION_STRATEGY.md` | Schema and output migration |
| `docs/architecture/06_CONSUMER_ONBOARDING_GUIDE.md` | Consumer integration step-by-step |
| `docs/architecture/07_RELEASE_POLICY.md` | Quality gates and release process |
| `docs/architecture/08_DEPRECATION_POLICY.md` | Deprecation timelines |
| `docs/architecture/09_ARCHITECTURE_CHANGE_POLICY.md` | Process for changing locked components |

## Certification Outputs

| File | Purpose |
|------|---------|
| `docs/certification/00_ERC_OVERVIEW.md` through `13_FUTURE_TECHNOLOGIES.md` | 14 certification reports |
| `knowledge/README.md` through `PATTERNS.md` | 8 knowledge base files |
| `scripts/certify-ajv.mjs`, `scripts/certify-minisearch.mjs` | Verification scripts |

## Discovery Outputs

| File | Purpose |
|------|---------|
| `docs/discovery/00_ECD_OVERVIEW.md` through `10_RESOURCE_CERTIFICATION_PLAN.md` | 11 discovery documents |

## Consumer Contract

Consumers must ONLY depend on `dist/` outputs. Internal implementation files (`registry/*.json`, `schemas/*.json`, `scripts/*.mjs`) are NOT part of the consumer contract.

## Future Outputs (Sprint 2+)

| File | Format | Sprint |
|------|--------|--------|
| `dist/search-index.minisearch.json` | MiniSearch index | Sprint 2 |
| `dist/pagefind/` (directory) | Pagefind index | Sprint 3 |
| GitHub Pages `https://numtip.github.io/mjudrp/` | Static site | Sprint 2 |

## Output Lifecycle

```
Registry data changed → validate → generate (static + MiniSearch) → commit → push → consumer fetches
                                                                              ↓
                                                                    GitHub Pages (future)
```
