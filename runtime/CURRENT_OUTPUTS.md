# Current Outputs

## Generated Outputs

| File | Format | Size | Consumer |
|------|--------|------|----------|
| `dist/search-index.json` | JSON array | ~4 KB | All consumer projects (search) |
| `dist/document-registry.json` | JSON array (normalized) | ~9 KB | All consumer projects (full registry) |
| `dist/category-registry.json` | JSON array | ~1 KB | All consumer projects (categories) |
| `dist/project-registry.json` | JSON array | ~1 KB | All consumer projects (projects) |
| `dist/owner-registry.json` | JSON array | ~1 KB | All consumer projects (owners) |
| `dist/evidence-registry.json` | JSON array | ~1 KB | All consumer projects (evidence) |
| `dist/relationship-registry.json` | JSON array | ~1 KB | Cross-document links |
| `dist/minisearch-index.json` | MiniSearch serialized index | ~3 KB | Full-text search |
| `dist/validation-report.json` | JSON (validation results) | ~1 KB | CI/development |
| `dist/manifest.json` | JSON (build metadata) | ~1 KB | CI/development |
| `dist/performance-report.json` | JSON (timing metrics) | ~1 KB | CI/development |

## Implementation Outputs

| File | Purpose |
|------|---------|
| `docs/implementation/00_CORE_REGISTRY.md` | Core registry overview |
| `docs/implementation/01_VALIDATION_ENGINE.md` | AJV validation engine |
| `docs/implementation/02_SEARCH_ENGINE.md` | MiniSearch search engine |
| `docs/implementation/03_OUTPUT_FORMAT.md` | Output format specification |
| `docs/implementation/04_TESTING.md` | Test suite documentation |
| `docs/implementation/05_BUILD_PIPELINE.md` | CI/CD pipeline documentation |

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

## Fixtures

| Directory | Documents | Purpose |
|-----------|-----------|---------|
| `examples/registry-small/` | 10 | Minimal test dataset |
| `examples/registry-medium/` | 100 | Moderate test dataset |
| `examples/registry-large/` | 1000 | Performance test dataset |

## Consumer Contract

Consumers must ONLY depend on `dist/` outputs. Internal implementation files (`registry/*.json`, `schemas/*.json`, `scripts/*.mjs`) are NOT part of the consumer contract.

## Output Lifecycle

```
Registry data changed → validate (AJV) → generate (static + MiniSearch) → test (77 assertions) → commit → push → consumer fetches
                                                                                                                   ↓
                                                                                                         GitHub Pages (future)
```
