# Current Runtime

## Snapshot

| Field | Value |
|-------|-------|
| Runtime Mode | Static file generation |
| Provider Active | None (architecture documented) |
| Adapter Active | GitHub Actions (CI only) |
| Plugin Active | None (architecture documented) |
| Data Source | Git-committed JSON files |
| Output Method | Node.js script generation |
| Hosting | GitHub repository |
| ECD Status | Complete — tools certified for Sprint 2 |

## Execution Flow

```
1. Registry Data (registry/*.json)
       │
2. Validate (scripts/validate-registry.mjs) — MVP: custom checks
       │                                    — Sprint 2: +AJV schema validation
3. Generate (scripts/generate-search-index.mjs) — MVP: static JSON
       │                                         — Sprint 2: +MiniSearch index
4. Output (dist/*.json)
       │
5. Consume (consumer projects fetch from GitHub)
```

## Active Components

| Component | Status | Notes |
|-----------|--------|-------|
| Registry data | ✅ Active | 7 documents, 4 projects, 3 owners, 5 categories, 6 evidence maps |
| Validation script | ✅ Active | Passes with 0 errors, 0 warnings. AJV integration pending. |
| Search index generator | ✅ Active | Produces 2 output files. MiniSearch integration pending. |
| Memory updater | ✅ Active | Now preserves manual edits |
| CI/CD pipeline | ✅ Active | GitHub Actions on push/PR |
| Provider layer | 📐 Architecture only | No implementation |
| Adapter layer | 📐 Architecture only | No implementation |
| Plugin layer | 📐 Architecture only | No implementation |

## Certified (Pending Integration)

| Tool | Integration Point | Sprint |
|------|------------------|--------|
| AJV | `validate-registry.mjs` | Sprint 2 |
| MiniSearch | `generate-search-index.mjs` | Sprint 2 |
| GitHub MCP | Cursor MCP config | Sprint 2 |
| Filesystem MCP | Cursor MCP config | Sprint 2 |

## Runtime Constraints

- No network dependencies for validation and generation
- No database connections
- No external API calls
- No persistence beyond git commits
- Runs on Node.js 20+ standard library
