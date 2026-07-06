# Current Outputs

## Generated Outputs

| File | Format | Size | Consumer |
|------|--------|------|----------|
| `dist/search-index.json` | JSON array | ~4 KB | All consumer projects (search) |
| `dist/document-registry.json` | JSON array (normalized) | ~9 KB | All consumer projects (full registry) |

## Output Schema

### search-index.json

```json
[
  {
    "id": "GO2026-001",
    "title": "Green Office 2026 Initiative Plan",
    "description": "Strategic plan...",
    "keywords": ["green office", "sustainability"],
    "tags": ["green-office", "strategic"],
    "category": "strategic-plan",
    "year": 2025,
    "project_refs": ["green-office-2026"],
    "evidence_refs": ["ev-go-strategy"]
  }
]
```

### document-registry.json

Normalized copy of all document entries with consistent field ordering, null defaults for missing fields, and no schema violations.

## Output Lifecycle

```
Registry data changed → validate → generate → commit → push → consumer fetches
```

## Output Distribution

| Channel | Status | URL |
|---------|--------|-----|
| GitHub raw | ✅ Active | `https://raw.githubusercontent.com/numtip/mjudrp/main/dist/{filename}` |
| GitHub Pages | ❌ Planned | `https://numtip.github.io/mjudrp/{filename}` |
| CDN | ❌ Future | TBD |

## Output Quality

- All outputs pass validation (0 errors, 0 warnings)
- Outputs are generated from canonical registry data
- No manual output editing — always regenerated from source
- Outputs are committed to git for version traceability
