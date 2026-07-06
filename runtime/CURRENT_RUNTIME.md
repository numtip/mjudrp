# Current Runtime

## Snapshot

| Field | Value |
|-------|-------|
| Runtime Mode | Static file generation |
| Provider Active | None (architecture documented) |
| Adapter Active | GitHub Actions (CI only) |
| Plugin Active | None (architecture documented) |
| Data Source | Git-committed JSON files |
| Output Method | Node.js script generation (AJV validation + MiniSearch search) |
| Hosting | GitHub repository |
| ECD Status | Complete — tools certified for Sprint 2 |
| ERC Status | Complete — 7 technologies verified through practical evaluation |
| Architecture Lock | **LOCKED** — v1.0 |
| Registry Spec | **FROZEN** — v1.0 |

## Execution Flow

```
1. Registry Data (registry/*.json)
       │
2. Validate (scripts/validate-registry.mjs) — AJV + ajv-formats schema validation ✅
       │                                    — Cross-reference validation
3. Generate (scripts/generate-search-index.mjs) — Static JSON + MiniSearch index ✅
       │
4. Output (dist/*.json) — 11 files including manifest.json + performance-report.json
       │
5. Test (npm test) — 77 assertions across 4 test suites ✅
       │
6. Consume (consumer projects fetch from GitHub)
```

## Active Components

| Component | Status | Notes |
|-----------|--------|-------|
| Registry data | ✅ Active | 7 documents, 4 projects, 3 owners, 5 categories, 6 evidence maps |
| Validation script | ✅ Active | AJV + ajv-formats integrated. Passes with 0 errors. |
| Search index generator | ✅ Active | MiniSearch integrated. 3 output formats. |
| Memory updater | ✅ Active | Preserves manual edits |
| CI/CD pipeline | ✅ Active | Full pipeline: install → validate → generate → test → upload |
| Architecture Lock | ✅ ACTIVE | 8 locked rules, 9 quality gates |
| Registry Specification | ✅ FROZEN v1.0 | 6 schemas, cross-reference rules, output contract |
| Test suite | ✅ Active | 77 assertions across 4 test files |
| Implementation docs | ✅ Active | 6 documents in docs/implementation/ |
| Provider layer | 📐 Architecture only | No implementation |
| Adapter layer | 📐 Architecture only | No implementation |
| Plugin layer | 📐 Architecture only | No implementation |

## Certified (Integrated)

| Tool | ERC Status | Integration Point | Sprint |
|------|-----------|------------------|--------|
| AJV + ajv-formats | CONDITIONAL ✅ | `validate-registry.mjs` | Sprint 2A ✅ |
| MiniSearch | CERTIFIED ✅ | `generate-search-index.mjs` | Sprint 2A ✅ |

## Certified (Pending Integration)

| Tool | ERC Status | Integration Point | Sprint |
|------|-----------|------------------|--------|
| GitHub MCP | CONDITIONAL | Cursor MCP config | Sprint 2B |
| Filesystem MCP | CONDITIONAL | Cursor MCP config | Sprint 2B |
| SharePoint Metadata | CERTIFIED | SharePoint column template | Sprint 2B |
| Dublin Core Mapping | CERTIFIED | Consumer contract docs | Sprint 2B |

## Runtime Constraints

- No network dependencies for validation and generation
- No database connections
- No external API calls
- No persistence beyond git commits
- Runs on Node.js 20+ standard library
- Architecture is LOCKED — changes require ADR
- Registry Specification is FROZEN at v1.0
- AJV requires ajv-formats for format validation (dependencies installed via npm)
