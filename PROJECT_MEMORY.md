# MJU-DRP Project Memory

## Quick Reference

| Item | Value |
|------|-------|
| Project | MJU Document Registry Platform |
| Repository | https://github.com/numtip/mjudrp |
| Current Phase | Enterprise Resource Certification v1.4 |
| Architecture Status | ERC completed — 7 technologies certified through practical evaluation |
| Branch | main |
| Schema Version | 1.0 (draft, adjusted for AJV compatibility) |
| Document Count (sample) | 7 |
| Consumer Projects (registered) | 4 |
| Documentation Files | 31 (16 docs + 11 discovery + 14 certification) |
| Knowledge Base Files | 8 |
| Memory Files | 9 |

## Key Architecture Decisions

1. **GitHub is source of truth** — All metadata, schemas, docs in git.
2. **MJU-DRP is registry core, not CMS** — No file storage, no uploads, no admin panel.
3. **Static-first, no database** — JSON files committed to git. No DB during MVP.
4. **Microsoft 365 stores binaries** — SharePoint/OneDrive for files; registry stores metadata + share URLs.
5. **Consumer projects consume JSON outputs** — Not duplicate metadata.
6. **Provider/Adapter/Plugin/Contract layers are architecture-only** — No implementation during hardening.
7. **Dublin Core adopted as metadata baseline** — No schema changes needed.
8. **AJV certified for validation** — Add in Sprint 2.
9. **MiniSearch + Pagefind certified for search** — Add in Sprint 2-3.

## ERC Certifications (v1.4)

| Tool | Area | ERC Status | Verification |
|------|------|------------|-------------|
| MiniSearch | Search | ✅ CERTIFIED | 5000 docs in 67ms; zero dependencies |
| SharePoint Metadata | Microsoft 365 | ✅ CERTIFIED | Architecture verified |
| Dublin Core Mapping | Metadata | ✅ CERTIFIED | 22/26 fields mapped |
| AJV + ajv-formats | Validation | ⚠️ CONDITIONAL | Requires ajv-formats |
| Filesystem MCP | MCP | ⚠️ CONDITIONAL | Needs Cursor config |
| GitHub MCP | MCP | ⚠️ CONDITIONAL | Needs Cursor config + PAT |
| Pagefind | Search | 📐 FUTURE | Deferred to Sprint 3+ |
| Microsoft Graph API | M365 | 📐 FUTURE | Requires Entra ID app registration |
| SharePoint Term Store | M365 | 📐 FUTURE | Defer until >20 categories |

## Active Risks

1. No Microsoft 365 API integration — URLs stored as-is, not verified.
2. Sample data only — real metadata population needed.
3. Consumer projects not yet consuming — integration patterns documented.
4. No static hosting beyond GitHub raw URLs.
5. AJV requires ajv-formats dependency for format validation (CONDITIONAL certification).
6. MCP servers (GitHub, Filesystem) not yet configured in Cursor (CONDITIONAL certification).

## Architecture Layers

| Layer | Status |
|-------|--------|
| Foundation | ✅ Complete |
| Registry | ✅ Complete |
| ECD | ✅ Complete (11 discovery docs) |
| ERC | ✅ Complete (14 certification docs, 8 knowledge base files) |
| Provider | 📐 Architecture only |
| Adapter | 📐 Architecture only |
| Plugin | 📐 Architecture only |
| Contract | 📐 Architecture only |
| Runtime | 📐 Architecture only |
| Knowledge | 📐 Blueprint only |
