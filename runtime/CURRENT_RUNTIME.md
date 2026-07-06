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

## Execution Flow

```
1. Registry Data (registry/*.json)
       │
2. Validate (scripts/validate-registry.mjs)
       │
3. Generate (scripts/generate-search-index.mjs)
       │
4. Output (dist/*.json)
       │
5. Consume (consumer projects fetch from GitHub)
```

## Active Components

| Component | Status | Notes |
|-----------|--------|-------|
| Registry data | ✅ Active | 7 documents, 4 projects, 3 owners, 5 categories, 6 evidence maps |
| Validation script | ✅ Active | Passes with 0 errors, 0 warnings |
| Search index generator | ✅ Active | Produces 2 output files |
| Memory updater | ✅ Active | Updates 3 memory files |
| CI/CD pipeline | ✅ Active | GitHub Actions on push/PR |
| Provider layer | 📐 Architecture only | No implementation |
| Adapter layer | 📐 Architecture only | No implementation |
| Plugin layer | 📐 Architecture only | No implementation |

## Runtime Constraints

- No network dependencies for validation and generation
- No database connections
- No external API calls
- No persistence beyond git commits
- Runs on Node.js 20+ standard library

## Next Runtime State

When Microsoft Graph integration is approved, the runtime will gain adapter and provider activations. Until then, all operations are local and git-based.
