# Current Outputs

## Generated Outputs

### dist/ (Build Outputs)

| File | Format | Size | Consumer |
|------|--------|------|----------|
| `dist/search-index.json` | JSON array | ~12 KB | All consumer projects (search) |
| `dist/document-registry.json` | JSON array (normalized) | ~85 KB | All consumer projects (full registry) |
| `dist/category-registry.json` | JSON array | ~4 KB | All consumer projects (categories) |
| `dist/project-registry.json` | JSON array | ~4 KB | All consumer projects (projects) |
| `dist/owner-registry.json` | JSON array | ~3 KB | All consumer projects (owners) |
| `dist/evidence-registry.json` | JSON array | ~28 KB | All consumer projects (evidence) |
| `dist/relationship-registry.json` | JSON array | ~38 KB | Cross-document links |
| `dist/minisearch-index.json` | MiniSearch serialized index | ~10 KB | Full-text search |
| `dist/validation-report.json` | JSON (validation results) | ~2 KB | CI/development |
| `dist/manifest.json` | JSON (build metadata, enhanced) | ~1 KB | CI/development |
| `dist/performance-report.json` | JSON (timing metrics) | ~1 KB | CI/development |
| `dist/statistics.json` | JSON (registry statistics, enhanced) | ~5 KB | CI/development |

### release/latest/registry-package/ (Distribution Package)

| File | Format | Consumer |
|------|--------|----------|
| `document-registry.json` | JSON array | All consumer projects |
| `category-registry.json` | JSON array | All consumer projects |
| `project-registry.json` | JSON array | All consumer projects |
| `owner-registry.json` | JSON array | All consumer projects |
| `evidence-registry.json` | JSON array | All consumer projects |
| `relationship-registry.json` | JSON array | Cross-document links |
| `search-index.json` | JSON array | Lightweight search |
| `minisearch-index.json` | MiniSearch serialized index | Full-text search |
| `statistics.json` | JSON | Registry metrics |
| `validation-report.json` | JSON | Validation results |
| `performance-report.json` | JSON | Timing metrics |
| `manifest.json` | JSON (enhanced) | Package manifest |
| `release-notes.md` | Markdown | Release documentation |
| `checksum.json` | JSON (SHA-256) | Integrity verification |
| `README.md` | Markdown | Package overview |

**Total artifacts: 15**

## Registry Data Files

| File | Entries | Format | Source of Truth |
|------|---------|--------|-----------------|
| `registry/documents.sample.json` | 74 | JSON array | Yes |
| `registry/categories.sample.json` | 22 | JSON array | Yes |
| `registry/projects.sample.json` | 12 | JSON array | Yes |
| `registry/owners.sample.json` | 12 | JSON array | Yes |
| `registry/evidence-map.sample.json` | 124 | JSON array | Yes |
| `registry/relationship.sample.json` | 250 | JSON array | Yes |

## Implementation Outputs

| File | Purpose |
|------|---------|
| `docs/implementation/00_CORE_REGISTRY.md` | Core registry overview |
| `docs/implementation/01_VALIDATION_ENGINE.md` | AJV validation engine |
| `docs/implementation/02_SEARCH_ENGINE.md` | MiniSearch search engine |
| `docs/implementation/03_OUTPUT_FORMAT.md` | Output format specification |
| `docs/implementation/04_TESTING.md` | Test suite documentation |
| `docs/implementation/05_BUILD_PIPELINE.md` | CI/CD pipeline documentation |

## Distribution Outputs

| File | Purpose |
|------|---------|
| `docs/distribution/00_DISTRIBUTION_ARCHITECTURE.md` | Distribution architecture overview |
| `docs/distribution/01_PACKAGE_STRUCTURE.md` | Package layout and contents |
| `docs/distribution/02_RELEASE_PROCESS.md` | Release pipeline documentation |
| `docs/distribution/03_MANIFEST_SPECIFICATION.md` | Manifest schema and fields |
| `docs/distribution/04_CHECKSUM_POLICY.md` | Checksum generation and verification |
| `docs/distribution/05_CONSUMER_DISTRIBUTION_GUIDE.md` | Consumer integration guide |
| `docs/distribution/06_VERSION_LIFECYCLE.md` | Version management policy |
| `docs/distribution/07_GITHUB_PAGES_STRATEGY.md` | GitHub Pages CDN strategy |
| `docs/distribution/08_PACKAGE_VALIDATION.md` | Package validation documentation |

## SharePoint Blueprint Outputs

| File | Purpose |
|------|---------|
| `docs/sharepoint/00_SHAREPOINT_ENTERPRISE_BLUEPRINT.md` | Target architecture, site proposal, operational model |
| `docs/sharepoint/01_SITE_AND_LIBRARY_DESIGN.md` | 6 document libraries with full specifications |
| `docs/sharepoint/02_METADATA_COLUMN_BLUEPRINT.md` | 22 columns mapped to document.schema.json |
| `docs/sharepoint/03_SHAREPOINT_LIST_STRATEGY.md` | 3 recommended lists, 2 deferred |
| `docs/sharepoint/04_VIEWS_AND_STAFF_WORKFLOW.md` | 13 views, 7-step upload-to-release workflow |
| `docs/sharepoint/05_PERMISSION_MODEL.md` | 7 groups, least-privilege, library-level access |
| `docs/sharepoint/06_AI_AGENT_OPERATING_MODEL.md` | Copilot, Cursor, External AI, Future Graph |
| `docs/sharepoint/07_MICROSOFT_GRAPH_READINESS.md` | Prerequisites, permissions, secret management |
| `docs/sharepoint/08_PROVISIONING_CHECKLIST.md` | 63-item manual setup checklist |
| `docs/sharepoint/09_GAP_ANALYSIS.md` | Current vs target state with closure criteria |

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

## Contracts

| File | Purpose |
|------|---------|
| `contracts/distribution-contract.md` | Distribution API contract (packaging rules, version rules, compatibility, consumer requirements) |

## Fixtures

| Directory | Documents | Purpose |
|-----------|-----------|---------|
| `examples/registry-small/` | 10 | Minimal test dataset |
| `examples/registry-medium/` | 100 | Moderate test dataset |
| `examples/registry-large/` | 1000 | Performance test dataset |

## Consumer Contract

Consumers must ONLY depend on `release/*/registry-package/` outputs. Internal files (`registry/*.json`, `schemas/*.json`, `scripts/*.mjs`, `dist/`) are NOT part of the consumer contract. See `contracts/distribution-contract.md` for full details.

## Output Lifecycle

```
Registry data changed → validate (AJV) → generate (static + MiniSearch) → package (checksums + release notes + validation) → test (211 assertions)
       ↓
commit → push → CI (validate → generate → test → checksums → release notes → validate package → upload artifacts)
       ↓
consumer fetches from release/latest/registry-package/ or pinned version

Future:
SharePoint (MJU Document Registry) → Manual metadata export → Registry JSON → Package release
```
