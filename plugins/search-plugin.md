# Search Plugin

## Status

**Architecture documented.** Core search index generation exists in `scripts/generate-search-index.mjs`. Plugin architecture describes future enhancements.

## Role

Generate, optimize, and serve search indexes from registry data. The search plugin abstracts the search output format and allows multiple search strategies.

## Responsibilities

- Generate search indexes from registry data
- Support multiple output formats (JSON, lunr.js, mini-search)
- Optimize index size for token efficiency
- Support field weighting for relevance ranking
- Enable incremental index updates

## Current Implementation

The MVP search index in `scripts/generate-search-index.mjs` produces a lightweight JSON array with essential search fields.

## Future Enhancements

| Feature | Description | Priority |
|---------|-------------|----------|
| Full-text search | Generate lunr.js or mini-search compatible index | Medium |
| Relevance ranking | Weighted fields (title > description > keywords) | Low |
| Faceted search | Filter by category, project, year | Low |
| Incremental updates | Only re-index changed documents | Low |
| Search-as-a-service | Self-hosted search endpoint | Very low |

## Configuration

```json
{
  "plugin": "search",
  "engine": "simple-json",
  "output": "./dist/search-index.json",
  "fields": {
    "title": { "weight": 5 },
    "description": { "weight": 3 },
    "keywords": { "weight": 2 },
    "tags": { "weight": 1 },
    "category": { "weight": 1 }
  }
}
```

## Supported Output Formats

| Format | Size | Search Capability |
|--------|------|-------------------|
| `simple-json` (MVP) | Small | Client-side filtering |
| `lunr-index` | Medium | Full-text, relevance ranking |
| `minisearch` | Small | Full-text, fuzzy search |
