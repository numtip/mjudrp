# Current Runtime

## Snapshot

| Field | Value |
|-------|-------|
| Runtime Mode | Static file generation + Distribution Packaging |
| Provider Active | None (architecture documented) |
| Adapter Active | GitHub Actions (CI only) |
| Plugin Active | None (architecture documented) |
| Data Source | Git-committed JSON files (74 documents, 12 projects) |
| Output Method | Node.js script generation (AJV validation + MiniSearch search + Distribution packaging) |
| Hosting | GitHub repository (GitHub Pages documented, not deployed) |
| ECD Status | Complete — tools certified for Sprint 2 |
| ERC Status | Complete — 7 technologies verified through practical evaluation |
| Architecture Lock | **LOCKED** — v1.0 |
| Registry Spec | **FROZEN** — v1.0 |

## Execution Flow

```
1. Registry Data (registry/*.json) — 74 docs, 22 cats, 12 projects, 12 owners, 124 ev, 250 rel
       │
2. Validate (scripts/validate-registry.mjs) — AJV + ajv-formats schema validation ✅
       │                                    — Cross-reference validation
3. Generate (scripts/generate-search-index.mjs) — Static JSON + MiniSearch index ✅
       │                                         — Enhanced manifest + statistics
4. Package (scripts/release.mjs)
       │   ├── Generate checksums (SHA-256)
       │   ├── Generate release notes
       │   ├── Copy to release/latest/registry-package/
       │   └── Validate package (55 checks)
       │
5. Output (dist/*.json + release/latest/registry-package/) — 12 dist files + 15 package artifacts
       │
6. Test (npm test) — 211 assertions across 4 test suites ✅
       │
7. Consume (consumer projects fetch from release/latest/registry-package/)
```

## Active Components

| Component | Status | Notes |
|-----------|--------|-------|
| Registry data | ✅ Active | 74 documents, 12 projects, 12 owners, 22 categories, 124 evidence maps, 250 relationships |
| Validation script | ✅ Active | AJV + ajv-formats integrated. Passes with 0 errors. |
| Search index generator | ✅ Active | MiniSearch integrated. 3 output formats. Enhanced manifest + statistics. |
| Population script | ✅ Active | Reproducible registry generation |
| Checksum generator | ✅ Active | SHA-256 for all package artifacts |
| Release notes generator | ✅ Active | Auto-generated release notes with statistics |
| Package validator | ✅ Active | 55 validation checks |
| Release pipeline | ✅ Active | End-to-end: validate → generate → package → validate |
| Memory updater | ✅ Active | Preserves manual edits |
| CI/CD pipeline | ✅ Active | Full pipeline: install → validate → generate → test → checksums → release notes → validate package → upload |
| Architecture Lock | ✅ ACTIVE | 8 locked rules, 9 quality gates |
| Registry Specification | ✅ FROZEN v1.0 | 6 schemas, cross-reference rules, output contract |
| Test suite | ✅ Active | 211 assertions across 4 test files |
| Implementation docs | ✅ Active | 6 documents in docs/implementation/ |
| Distribution docs | ✅ Active | 8 documents in docs/distribution/ |
| Distribution contract | ✅ Active | contracts/distribution-contract.md |
| Provider layer | 📐 Architecture only | No implementation |
| Adapter layer | 📐 Architecture only | No implementation |
| Plugin layer | 📐 Architecture only | No implementation |

## Certified (Integrated)

| Tool | ERC Status | Integration Point | Sprint |
|------|-----------|------------------|--------|
| AJV + ajv-formats | ✅ CERTIFIED | `validate-registry.mjs` | Sprint 2A ✅ |
| MiniSearch | ✅ CERTIFIED | `generate-search-index.mjs` | Sprint 2A ✅ |

## Certified (Pending Integration)

| Tool | ERC Status | Integration Point | Sprint |
|------|-----------|------------------|--------|
| GitHub MCP | CONDITIONAL | Cursor MCP config | Sprint 2D |
| Filesystem MCP | CONDITIONAL | Cursor MCP config | Sprint 2D |
| SharePoint Metadata | CERTIFIED | SharePoint column template | Sprint 2D |
| Dublin Core Mapping | CERTIFIED | Consumer contract docs | Sprint 2D |

## Runtime Constraints

- No network dependencies for validation and generation
- No database connections
- No external API calls
- No persistence beyond git commits
- Runs on Node.js 20+ standard library
- Architecture is **LOCKED** — changes require ADR
- Registry Specification is **FROZEN** at v1.0
- AJV requires ajv-formats for format validation (dependencies installed via npm)
- Package distribution: consumers must fetch from release/*/registry-package/ only
