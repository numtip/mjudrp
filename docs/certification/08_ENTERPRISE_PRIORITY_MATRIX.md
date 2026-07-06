# Enterprise Priority Matrix

## Overview

This matrix maps all MJU-DRP capabilities to priority levels for implementation planning. Priority reflects both business value and dependency ordering.

## Priority Levels

| Level | Meaning | Implementation Window |
|-------|---------|----------------------|
| **P0** | Core registry — must exist for any consumer use | Sprint 2 |
| **P1** | High value — needed for production readiness | Sprint 2–3 |
| **P2** | Enhancement — valuable but not blocking | Sprint 3–4 |
| **P3** | Future — deferred until core is stable | Sprint 4+ |

---

## P0 — Core Registry

These capabilities are the minimum viable registry. Without these, no consumer project can use MJU-DRP.

| Capability | Status | Owner | Dependencies |
|------------|--------|-------|-------------|
| Document metadata registry | ✅ MVP | Foundation | None |
| Category taxonomy | ✅ MVP | Foundation | Document registry |
| Project mappings | ✅ MVP | Foundation | Document registry |
| Owner directory | ✅ MVP | Foundation | Document registry |
| Evidence mapping | ✅ MVP | Foundation | Document registry, Projects |
| Registry validation | ✅ MVP → Sprint 2+AJV | Foundation | Node.js |
| Search index generation | ✅ MVP → Sprint 2+MiniSearch | Foundation | Registry data |
| CI/CD validation | ✅ MVP | Foundation | GitHub Actions |
| Schema versioning | 📐 Contract | Foundation | Schema design |
| Consumer contract | 📐 Contract | Foundation | Registry outputs |

## P1 — Production Readiness

These capabilities transform MJU-DRP from a data repository into a shared platform.

| Capability | Priority | ECD Finding | ERC Status |
|------------|----------|-------------|------------|
| Microsoft Graph API | P1 | 📐 Future | FUTURE |
| SharePoint Sync (metadata columns) | P1 | ✅ Reuse | CERTIFIED |
| SharePoint Lists (metadata view) | P1 | ✅ Reuse | CERTIFIED |
| MiniSearch integration | P1 | ✅ Certify | CERTIFIED |
| AI metadata suggestion | P1 | ✅ 3 tools approved | CERTIFIED |
| GitHub MCP configuration | P1 | ✅ Certify | CONDITIONAL |
| Filesystem MCP configuration | P1 | ✅ Certify | CONDITIONAL |
| Real metadata population | P1 | 📐 Planned | Sprint 2 |
| Consumer integration examples | P1 | 📐 Planned | Sprint 2 |
| Static hosting (GitHub Pages) | P1 | 📐 Planned | Sprint 2 |
| Relationship data population | P1 | 📐 Schema only | Sprint 2 |
| AJV schema validation integration | P1 | ✅ Certify | CONDITIONAL |
| Dublin Core metadata mapping | P1 | ✅ Adopted | CERTIFIED |
| SharePoint folder taxonomy | P1 | 📐 Proposed | CERTIFIED |

## P2 — Platform Enhancement

These capabilities add analytical and structural value.

| Capability | Priority | ECD Finding | ERC Status |
|------------|----------|-------------|------------|
| Relationship engine | P2 | 📐 Blueprint | FUTURE |
| Knowledge layer | P2 | 📐 Blueprint | FUTURE |
| Analytics / usage reporting | P2 | 📐 Blueprint | FUTURE |
| Pagefind static search | P2 | ✅ Certify | FUTURE |
| SharePoint Term Store | P2 | 📐 Defer | FUTURE |
| Excel Online metadata workflow | P2 | ✅ Reuse | CERTIFIED |
| Power Automate notifications | P2 | 📐 Monitor | FUTURE |
| Provider layer (adapter impl.) | P2 | 📐 Architecture | FUTURE |
| Plugin layer (search/validate) | P2 | 📐 Architecture | FUTURE |

## P3 — Future / Experimental

These capabilities are not yet needed or require external dependencies.

| Capability | Priority | ECD Finding | ERC Status |
|------------|----------|-------------|------------|
| OCR service | P3 | ❌ Rejected | REJECTED |
| AI chatbot | P3 | ❌ Rejected | REJECTED |
| Workflow engine | P3 | ❌ Rejected | REJECTED |
| Custom authentication / RBAC | P3 | ❌ Rejected | REJECTED |
| Admin panel / CMS | P3 | ❌ Rejected | REJECTED |
| Database (beyond static JSON) | P3 | ❌ Rejected | REJECTED |
| Microsoft Syntex | P3 | 📐 Future | FUTURE |
| OpenRouter (multi-AI proxy) | P3 | 📐 Defer | FUTURE |
| Browser MCP | P3 | ❌ Low priority | REJECTED |
| Search MCP | P3 | ❌ Low priority | REJECTED |
| SharePoint Embedded | P3 | ❌ Rejected | REJECTED |

## Implementation Sequence

```
Sprint 2 (P0 + P1)
├── AJV integration (validate-registry.mjs)
├── MiniSearch integration (generate-search-index.mjs)
├── GitHub MCP + Filesystem MCP configuration
├── SharePoint folder structure
├── Real metadata population
├── Relationship data
├── Consumer integration examples
└── GitHub Pages setup

Sprint 3 (P1 + P2)
├── Pagefind evaluation for production
├── Microsoft Graph API planning
├── Relationship engine
├── Excel Online workflow
└── Consumer integration documentation

Sprint 4+ (P2 + P3)
├── Knowledge layer
├── Provider/Plugin implementation
├── Analytics
└── SharePoint Term Store
```

## Priority by Consumer Need

| Consumer Project | Needed From MJU-DRP | Priority Level |
|-----------------|-------------------|----------------|
| Green Office 2026 | Document registry, evidence mapping, search | P0 |
| RAE Landing | Document registry, category taxonomy, search | P0 |
| Learning Center | Document registry, catalog search | P0 |
| Research Portal | Document registry, evidence mapping | P1 |
| Future projects | Registry + search + relationship queries | P1+ |
