# Current Outputs

## Generated Outputs

| File | Format | Size | Consumer |
|------|--------|------|----------|
| `dist/search-index.json` | JSON array | ~4 KB | All consumer projects (search) |
| `dist/document-registry.json` | JSON array (normalized) | ~9 KB | All consumer projects (full registry) |

## Certification Outputs

| File | Purpose |
|------|---------|
| `docs/certification/00_ERC_OVERVIEW.md` | ERC mission, process, and results |
| `docs/certification/01_AJV_CERTIFICATION.md` | AJV certification report (CONDITIONAL) |
| `docs/certification/02_MINISEARCH_CERTIFICATION.md` | MiniSearch certification report (CERTIFIED) |
| `docs/certification/03_FILESYSTEM_MCP_CERTIFICATION.md` | Filesystem MCP certification report (CONDITIONAL) |
| `docs/certification/04_GITHUB_MCP_CERTIFICATION.md` | GitHub MCP certification report (CONDITIONAL) |
| `docs/certification/05_PAGEFIND_EVALUATION.md` | Pagefind evaluation (FUTURE) |
| `docs/certification/06_SHAREPOINT_METADATA_CERTIFICATION.md` | SharePoint metadata strategy (CERTIFIED) |
| `docs/certification/07_DUBLIN_CORE_MAPPING.md` | Dublin Core mapping (CERTIFIED) |
| `docs/certification/08_ENTERPRISE_PRIORITY_MATRIX.md` | Priority matrix for all capabilities |
| `docs/certification/09_DEPENDENCY_MAP.md` | Full dependency chain map |
| `docs/certification/10_CERTIFIED_TECHNOLOGIES.md` | Aggregate CERTIFIED list |
| `docs/certification/11_CONDITIONAL_TECHNOLOGIES.md` | Aggregate CONDITIONAL list |
| `docs/certification/12_REJECTED_TECHNOLOGIES.md` | Aggregate REJECTED list |
| `docs/certification/13_FUTURE_TECHNOLOGIES.md` | Aggregate FUTURE list |
| `knowledge/README.md` | Knowledge base overview |
| `knowledge/CERTIFIED_TOOLS.md` | Certified tools reference |
| `knowledge/REJECTED_TOOLS.md` | Rejected tools reference |
| `knowledge/CONDITIONAL_TOOLS.md` | Conditional tools reference |
| `knowledge/LESSONS_LEARNED.md` | Lessons from ERC process |
| `knowledge/BEST_PRACTICES.md` | Best practices from certification |
| `knowledge/ANTI_PATTERNS.md` | Anti-patterns to avoid |
| `knowledge/PATTERNS.md` | Reusable patterns |
| `scripts/certify-ajv.mjs` | AJV certification verification script |
| `scripts/certify-minisearch.mjs` | MiniSearch certification verification script |

## Discovery Outputs
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
