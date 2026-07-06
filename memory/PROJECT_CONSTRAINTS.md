# Project Constraints

## Architecture Constraints

| Constraint | Source | Status |
|------------|--------|--------|
| GitHub is source of truth | ADR-001 | ✅ Locked |
| MJU-DRP is registry core, not CMS | ADR-002 | ✅ Locked |
| Microsoft 365 stores binary files | ADR-004 | ✅ Locked |
| No production modification | ARCHITECTURE_LOCK | ✅ Locked |
| Consumer projects consume registry outputs | ADR-005 | ✅ Locked |
| No database during MVP | ADR-003 | ✅ Locked |
| No authentication or RBAC | ADR-006 | ✅ Locked |
| No admin panel during MVP | ARCHITECTURE_LOCK | ✅ Locked |
| No workflow engine | PROJECT_CONSTITUTION | ✅ Locked |
| No OCR service | PROJECT_CONSTITUTION | ✅ Locked |
| No AI chatbot | PROJECT_CONSTITUTION | ✅ Locked |

## Technical Constraints

| Constraint | Impact | Mitigation |
|------------|--------|------------|
| No Microsoft Graph API | Cannot verify or extract SharePoint/OneDrive metadata | Store URLs as-is; validate format only |
| No database | No dynamic queries; filtering is client-side | Pre-generate filtered outputs for common patterns |
| No authentication | Registry outputs are public within org | Sensitive documents restricted at M365 level |
| No server-side runtime | No request-time transformations | Pre-generate all output formats |
| GitHub raw URL rate limits | 60 req/hr unauthenticated | Use GitHub Pages or CDN for production |
| Static files only | No real-time updates | Consumer projects refresh on deploy |

## Resource Constraints

| Constraint | Detail |
|------------|--------|
| Single maintainer | Currently one person managing the full platform |
| Sample data only | Real metadata requires coordination with project owners |
| No active consumers | No projects are consuming registry outputs yet |
| SharePoint access unconfirmed | May require IT approval for production access |
| No dedicated hosting | Outputs served via GitHub raw URLs |

## Technology Constraints

| Technology | Allowed | Forbidden |
|------------|:-------:|:---------:|
| Node.js | ✅ v20+ | ❌ |
| JSON | ✅ | ❌ |
| Markdown | ✅ | ❌ |
| Git / GitHub | ✅ | ❌ |
| GitHub Actions | ✅ | ❌ |
| Microsoft 365 | ✅ (as storage) | ❌ (automation not approved) |
| External databases | ❌ | ✅ PostgreSQL, MongoDB, etc. |
| Auth services | ❌ | ✅ Auth0, Firebase Auth, etc. |
| CMS platforms | ❌ | ✅ WordPress, Strapi, etc. |
| AI / LLM services | ❌ | ✅ Chatbots, OCR, etc. |
| Graph databases | ❌ | ✅ Neo4j, etc. (not approved) |

## Constraint Lifecycle

- Constraints are reviewed each sprint
- Constraint removal requires ADR and architecture lock update
- New constraints are added when discovered
- Temporary constraints are marked with expiration
