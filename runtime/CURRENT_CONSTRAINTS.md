# Current Constraints

## Technical Constraints

| Constraint | Impact | Mitigation |
|------------|--------|------------|
| No Microsoft Graph API access | Cannot verify SharePoint/OneDrive URLs | Store URLs as-is; validation checks format only |
| No database | Only static JSON queries | Filtering happens on consumer side |
| No authentication | Registry is public within organization | Sensitive documents restricted at Microsoft 365 level |
| No server-side processing | No transformation at request time | Pre-generate all output formats |
| GitHub raw URL rate limits | Consumer projects may hit limits | Use GitHub Pages or CDN for production |
| Static files only | No real-time updates | Consumer projects refresh on deploy |

## Architectural Constraints

| Constraint | Rationale | Expiration |
|------------|-----------|------------|
| No CMS | MJU-DRP is not a content management system | Permanent |
| No database | Avoid operational complexity during MVP | End of MVP |
| No auth/RBAC | Not needed for metadata consumption | When direct user access required |
| No admin panel | Git and GitHub UI are sufficient | When non-technical users need to manage data |
| No workflow engine | Out of scope | When approval workflows are needed |
| No OCR | Out of scope | When document content extraction is required |
| No AI chatbot | Out of scope | When natural language query is required |

## Resource Constraints

| Resource | Status | Limitation |
|----------|--------|------------|
| Sample data only | ✅ | 7 documents — not real metadata |
| Developer time | ⚠️ | Single maintainer during MVP |
| Consumer project integration | ❌ | No projects consuming yet |
| Microsoft 365 configuration | ❌ | No documented folder structure |

## Constraint Management

- All constraints are documented and tracked
- Constraint removals must go through architecture lock process
- New constraints must be added to this file and `memory/ARCHITECTURE_LOCK.md`
- Constraints are reviewed each sprint
