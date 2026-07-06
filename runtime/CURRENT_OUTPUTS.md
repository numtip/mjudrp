# Current Outputs

## Generated Outputs

| File | Format | Size | Consumer |
|------|--------|------|----------|
| `dist/search-index.json` | JSON array | ~4 KB | All consumer projects (search) |
| `dist/document-registry.json` | JSON array (normalized) | ~9 KB | All consumer projects (full registry) |

## Discovery Outputs

| File | Purpose |
|------|---------|
| `docs/discovery/00_ECD_OVERVIEW.md` | ECD mission and scope |
| `docs/discovery/01_MICROSOFT_365_CAPABILITY_DISCOVERY.md` | 14 M365 capabilities evaluated |
| `docs/discovery/02_MCP_ECOSYSTEM_DISCOVERY.md` | 9 MCP servers evaluated |
| `docs/discovery/03_SEARCH_CAPABILITY_DISCOVERY.md` | 7 search tools compared |
| `docs/discovery/04_VALIDATION_CAPABILITY_DISCOVERY.md` | 5 validation tools compared |
| `docs/discovery/05_METADATA_STANDARDS_DISCOVERY.md` | 5 metadata standards reviewed |
| `docs/discovery/06_AI_METADATA_DISCOVERY.md` | 7 AI tools assessed |
| `docs/discovery/07_CONSUMER_INTEGRATION_PATTERNS.md` | 5 integration patterns |
| `docs/discovery/08_CAPABILITY_MATRIX_V1.md` | 30+ capability fit assessment |
| `docs/discovery/09_DECISION_MATRIX_V1.md` | 15 build/buy/reuse decisions |
| `docs/discovery/10_RESOURCE_CERTIFICATION_PLAN.md` | 10 test plans |

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
