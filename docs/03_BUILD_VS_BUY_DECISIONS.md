# Build vs. Buy Decisions

## Decision Framework

MJU-DRP follows the **use-before-build** principle: use existing platforms before creating custom tools.

## Decisions

| Requirement | Decision | Rationale |
|-------------|----------|-----------|
| Document storage | **Buy** — Microsoft 365 / SharePoint / OneDrive | Already licensed. Provides versioning, sharing, access control, and audit. |
| Document metadata registry | **Build** — Lightweight JSON registry | No off-the-shelf solution for cross-project metadata registry that is free and git-based. |
| Search index | **Build** — Static JSON generation | Simple script generates searchable index. No Elasticsearch/Solr needed for MVP. |
| Validation | **Build** — Node.js script | Simple script checks required fields, duplicates, and cross-references. |
| Taxonomy management | **Build** — JSON category registry | Simple structured data. No taxonomy tool needed. |
| Project memory for AI agents | **Build** — Markdown memory files | Purpose-built for AI continuity. No existing tool solves this for agent workflows. |
| CI/CD | **Buy** — GitHub Actions | Free for public repos. Integrates with GitHub natively. |
| Version control | **Buy** — Git / GitHub | Industry standard. Free for public repos. |
| Authentication | **Decline** — Not building | Not needed during MVP. Access control handled by Microsoft 365. |
| CMS / Admin panel | **Decline** — Not building | Would duplicate git and GitHub UI functionality. |
| Database | **Decline** — Not building during MVP | JSON files are sufficient for registry scale. |
| AI chatbot | **Decline** — Not building | Out of scope for registry platform. |
| OCR service | **Decline** — Not building | Out of scope for registry platform. |

## ERC Verified Decisions (v1.4)

Enterprise Resource Certification v1.4 verified the ECD decisions through practical evaluation.

| Requirement | ECD Decision | ERC Status | ERC Finding |
|-------------|-------------|------------|-------------|
| Schema validation | **Buy** — AJV | CONDITIONAL | Works with ajv-formats; schema needs optional URL fix |
| Client search | **Buy** — MiniSearch | CERTIFIED | 5000 docs in 67ms; zero dependencies |
| Production search | **Buy** — Pagefind | FUTURE | Deferred to Sprint 3+; needs HTML output first |
| Azure AI / OCR | **Decline** | REJECTED | Confirmed out of scope |
| Duplicate detection | **Build** + **Buy** (Claude) | CERTIFIED | Existing script + AI review |

## ECD Decision Refresh

ECD v1.3 updated 15 capability decisions. See `docs/discovery/09_DECISION_MATRIX_V1.md` for full matrix.

New decisions:
| Requirement | Decision | Rationale |
|-------------|----------|-----------|
| Schema validation (enhanced) | **Buy** — AJV library | Best JSON Schema validator; pure JS; CI-ready |
| Client search | **Buy** — MiniSearch | Static-first; 6KB gzipped; Thai-capable |
| Production search | **Buy** — Pagefind | Post-build indexing; best static search |
| Azure AI / OCR | **Decline** — Not building | Out of scope; Syntex future option |
| Duplicate detection | **Build** (in validation) + **Buy** (Claude ad-hoc) | Existing script + AI review |

## Build Criteria

Only build when:
1. No existing platform can fulfill the requirement
2. The build effort is proportional to the value
3. The solution is simpler than integrating an external tool
4. Maintenance burden is acceptable
