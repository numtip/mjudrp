# MJU-DRP Project Memory

## Quick Reference

| Item | Value |
|------|-------|
| Project | MJU Document Registry Platform |
| Repository | https://github.com/numtip/mjudrp |
| Current Phase | Sprint 2B — Registry Population |
| Architecture Status | **LOCKED** — 8 locked rules, 9 quality gates, change policy established |
| Branch | main |
| Schema Version | v1.0 (FROZEN) |
| Document Count | 74 (populated) |
| Consumer Projects (registered) | 12 |
| Documentation Files | 47 (16 docs + 11 discovery + 14 certification + 10 architecture + 6 implementation) |
| Knowledge Base Files | 8 |
| Memory Files | 9 |
| Architecture Documents | 10 |
| Implementation Documents | 6 |
| Tests | 211 assertions (4 test files) |
| Build Outputs | 12 JSON files in dist/ (including statistics.json) |

## Key Architecture Decisions

1. **GitHub is source of truth** — All metadata, schemas, docs in git.
2. **MJU-DRP is registry core, not CMS** — No file storage, no uploads, no admin panel.
3. **Static-first, no database** — JSON files committed to git. No DB during MVP.
4. **Microsoft 365 stores binaries** — SharePoint/OneDrive for files; registry stores metadata + share URLs.
5. **Consumer projects consume JSON outputs** — Not duplicate metadata.
6. **Provider/Adapter/Plugin/Contract layers are architecture-only** — No implementation during hardening.
7. **Dublin Core adopted as metadata baseline** — No schema changes needed.
8. **AJV certified for validation** — Integrated in Sprint 2A.
9. **MiniSearch + Pagefind certified for search** — MiniSearch integrated in Sprint 2A; Pagefind deferred.
10. **Architecture locked v1.0** — 10 architecture documents frozen. Changes require ADR.
11. **Schema corrections ADR-012** — Null parent and empty URI field fixes for AJV compatibility.

## ERC Certifications (v1.4)

| Tool | Area | ERC Status | Verification |
|------|------|------------|-------------|
| MiniSearch | Search | ✅ CERTIFIED | 5000 docs in 67ms; zero dependencies |
| SharePoint Metadata | Microsoft 365 | ✅ CERTIFIED | Architecture verified |
| Dublin Core Mapping | Metadata | ✅ CERTIFIED | 22/26 fields mapped |
| AJV + ajv-formats | Validation | ✅ CERTIFIED | Integrated in Sprint 2A |
| Filesystem MCP | MCP | ⚠️ CONDITIONAL | Needs Cursor config |
| GitHub MCP | MCP | ⚠️ CONDITIONAL | Needs Cursor config + PAT |
| Pagefind | Search | 📐 FUTURE | Deferred to Sprint 3+ |
| Microsoft Graph API | M365 | 📐 FUTURE | Requires Entra ID app registration |
| SharePoint Term Store | M365 | 📐 FUTURE | Defer until >20 categories |

## Registry Statistics (Sprint 2B)

| Entity | Count | Target | Status |
|--------|-------|--------|--------|
| Documents | 74 | 50+ | ✅ |
| Categories | 22 | 20+ | ✅ |
| Projects | 12 | 10+ | ✅ |
| Owners | 12 | 10+ | ✅ |
| Evidence | 124 | 100+ | ✅ |
| Relationships | 250 | 200+ | ✅ |

## Active Risks

1. No Microsoft 365 API integration — URLs stored as-is, not verified.
2. Consumer projects not yet consuming — onboarding guide available.
3. MCP servers (GitHub, Filesystem) not yet configured in Cursor (CONDITIONAL certification).

## Architecture Layers

| Layer | Status |
|-------|--------|
| Foundation | ✅ Complete |
| Registry | ✅ Complete |
| ECD | ✅ Complete (11 discovery docs) |
| ERC | ✅ Complete (14 certification docs, 8 knowledge base files) |
| Architecture Lock | ✅ LOCKED (10 architecture docs, v1.0) |
| Provider | 📐 Architecture only |
| Adapter | 📐 Architecture only |
| Plugin | 📐 Architecture only |
| Contract | 📐 Architecture only |
| Runtime | 📐 Architecture only |
| Knowledge | 📐 Blueprint only |
