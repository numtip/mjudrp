# Implementation Backlog

## Status

**PRIORITIZED** — 2026-07-06

## Priority Levels

| Level | Meaning | Implementation Window |
|-------|---------|----------------------|
| P0 | Blocking — must complete before any consumer project can use MJU-DRP | Sprint 2 |
| P1 | High value — needed for production readiness | Sprint 2–3 |
| P2 | Enhancement — valuable but not blocking | Sprint 3–4 |
| P3 | Future — deferred until core is stable | Sprint 4+ |

## P0 — Registry Foundation

| # | Item | Type | ERC Status | Dependencies | Sprint |
|---|------|------|-----------|-------------|--------|
| 1 | **Registry Population** — Add real document metadata for all registered projects | Data | — | None | 2 |
| 2 | **AJV Integration** — Integrate AJV + ajv-formats into `validate-registry.mjs` | Tooling | CONDITIONAL | npm install, schema validation | 2 |
| 3 | **MiniSearch Integration** — Integrate MiniSearch into `generate-search-index.mjs` | Tooling | CERTIFIED | npm install, registry data | 2 |
| 4 | **Metadata Import** — Create script or process for importing metadata from Excel/CSV | Tooling | — | Registry schema | 2 |
| 5 | **Relationship Registry** — Populate `registry/relationship.sample.json` with cross-document links | Data | — | Document registry | 2 |
| 6 | **SharePoint Taxonomy Mapping** — Document SharePoint folder hierarchy matching registry categories | Documentation | CERTIFIED | Category registry | 2 |
| 7 | **GitHub MCP Configuration** — Configure GitHub MCP in Cursor for AI agent access | Tooling | CONDITIONAL | GitHub PAT | 2 |
| 8 | **Filesystem MCP Configuration** — Configure Filesystem MCP in Cursor for AI agent access | Tooling | CONDITIONAL | — | 2 |

## P1 — Production Readiness

| # | Item | Type | ERC Status | Dependencies | Sprint |
|---|------|------|-----------|-------------|--------|
| 1 | **Microsoft Graph Adapter** — Architecture doc to adapter for Graph API access | Architecture | FUTURE | Adapter layer | 3 |
| 2 | **SharePoint Adapter** — Architecture doc to adapter for SharePoint access | Architecture | FUTURE | Adapter layer | 3 |
| 3 | **OneDrive Adapter** — Architecture doc to adapter for OneDrive access | Architecture | FUTURE | Adapter layer | 3 |
| 4 | **Filesystem Provider** — Architecture doc to provider for local file access | Architecture | FUTURE | Provider layer | 3 |
| 5 | **Static Hosting** — Configure GitHub Pages for JSON output distribution | Infrastructure | — | Registry outputs | 2–3 |
| 6 | **Consumer Contract Publication** — Publish consumer contract v1.0 as stable | Documentation | — | Registry spec v1.0 | 2–3 |

## P2 — Consumer Integration

| # | Item | Type | ERC Status | Dependencies | Sprint |
|---|------|------|-----------|-------------|--------|
| 1 | **Astro Integration Example** — Create example Astro project consuming registry JSON | Example | — | Registry outputs | 3 |
| 2 | **Next.js Integration Example** — Create example Next.js project consuming registry JSON | Example | — | Registry outputs | 3 |
| 3 | **Vue Integration Example** — Create example Vue project consuming registry JSON | Example | — | Registry outputs | 3 |
| 4 | **Laravel Integration Example** — Create example Laravel project consuming registry JSON | Example | — | Registry outputs | 3 |
| 5 | **Static HTML Example** — Create example static HTML page with MiniSearch | Example | — | MiniSearch integration | 2 |
| 6 | **Consumer Project README Updates** — Add integration guide to consumer project READMEs | Documentation | — | Consumer contract | 3 |

## P3 — Future Enhancements

| # | Item | Type | ERC Status | Dependencies | Sprint |
|---|------|------|-----------|-------------|--------|
| 1 | **AI-Assisted Metadata** — Workflow for using AI (ChatGPT/Claude) to suggest metadata | Process | CERTIFIED | AI tools, MCP | 4 |
| 2 | **Knowledge Layer** — Semantic/graph query layer over registry data | Architecture | FUTURE | Registry population | 4+ |
| 3 | **Pagefind Integration** — Add Pagefind search for consumer projects with HTML pages | Tooling | FUTURE | Static hosting, consumer HTML | 3+ |
| 4 | **Relationship Engine** — Query and visualization for cross-document relationships | Feature | FUTURE | Relationship data | 4 |
| 5 | **Analytics** — Usage reporting for registry consumption | Feature | FUTURE | Static hosting | 4+ |

## Sprint Assignment

### Sprint 2 (P0 + Selected P1)

| Task | Effort | Owner |
|------|--------|-------|
| AJV Integration | Small | Developer |
| MiniSearch Integration | Small | Developer |
| Registry Population | Medium | Project Owner |
| Relationship Registry | Small | Developer |
| SharePoint Taxonomy | Small | Developer |
| GitHub MCP Config | Small | Developer |
| Filesystem MCP Config | Small | Developer |
| Static HTML Example | Small | Developer |
| Static Hosting (GitHub Pages) | Small | Developer |

### Sprint 3 (P1 + P2)

| Task | Effort | Owner |
|------|--------|-------|
| Microsoft Graph Adapter | Medium | Developer |
| SharePoint Adapter | Medium | Developer |
| Consumer Examples (2-3 frameworks) | Medium | Developer |
| Consumer Contract Publication | Small | Developer |

### Sprint 4+ (P2 + P3)

| Task | Effort | Owner |
|------|--------|-------|
| Remaining Consumer Examples | Medium | Developer |
| AI-Assisted Metadata Workflow | Small | Developer |
| Relationship Engine | Medium | Developer |
| Knowledge Layer Blueprint | Large | Architect |
| Pagefind Integration | Medium | Developer |
