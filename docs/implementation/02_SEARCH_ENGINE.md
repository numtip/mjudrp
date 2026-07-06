# Search Engine

## Dependencies

- `minisearch` (^7.2.0) — client-side full-text search

## Architecture

The search engine is integrated into `scripts/generate-search-index.mjs` and produces two search index formats.

## search-index.json

A lightweight, flat JSON array for basic filtering and browsing:

```json
[
  {
    "id": "GO2026-001",
    "title": "Green Office Annual Plan 2026",
    "description": "...",
    "keywords": ["strategic", "plan"],
    "tags": ["strategic-plan", "published"],
    "category": "strategic-plan",
    "year": 2026
  }
]
```

Best for: consumer projects that need simple document browsing without full-text search.

## minisearch-index.json

A pre-built MiniSearch index serialized via `miniSearch.toJSON()`. It supports:

- **Full-text search** across title, description, and keywords fields
- **Fuzzy matching** — handles typos and partial matches
- **Prefix search** — fast autocomplete-style queries
- **Scoring** — results ranked by relevance

### Consumer Usage

Consumer projects load the pre-built index:

```javascript
import MiniSearch from "minisearch";

const response = await fetch("/dist/minisearch-index.json");
const raw = await response.text();
const miniSearch = MiniSearch.loadJSON(raw, {
  fields: ["title", "description", "keywords"],
  storeFields: ["id", "title", "category", "file_type", "year", "status", "language"],
});

// Search
const results = miniSearch.search("strategic plan");
// Fuzzy search
const fuzzyResults = miniSearch.search("stratejic", { fuzzy: 0.2 });
```

## Performance

| Dataset | Documents | Index Time | Index Size |
|---------|-----------|-----------|------------|
| Small | 10 | <1ms | ~3KB |
| Medium | 100 | ~2ms | ~24KB |
| Large | 1000 | ~14ms | ~239KB |

## Output Files

- `dist/search-index.json` — lightweight index (flat array)
- `dist/minisearch-index.json` — MiniSearch serialized index
