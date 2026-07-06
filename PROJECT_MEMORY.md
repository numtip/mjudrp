# MJU-DRP Project Memory

## Quick Reference

| Item | Value |
|------|-------|
| Project | MJU Document Registry Platform |
| Repository | https://github.com/numtip/mjudrp |
| Current Phase | Enterprise Capability Discovery v1.3 |
| Architecture Status | ECD completed — 7 areas discovered, tools certified |
| Branch | main |
| Schema Version | 1.0 (draft) |
| Document Count (sample) | 7 |
| Consumer Projects (registered) | 4 |
| Documentation Files | 27 (16 docs + 11 discovery) |
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

## ECD Certifications

| Tool | Area | Status |
|------|------|--------|
| GitHub MCP | MCP | ✅ Certify |
| Filesystem MCP | MCP | ✅ Certify |
| AJV | Validation | ✅ Certify |
| MiniSearch | Search | ✅ Certify |
| Pagefind | Search | ✅ Certify |
| ChatGPT | AI | ✅ Approved |
| Claude | AI | ✅ Approved |
| Gemini | AI | ✅ Approved |
| Microsoft Graph API | M365 | 📐 Future |
| SharePoint Term Store | M365 | 📐 Future |

## Active Risks

1. No Microsoft 365 API integration — URLs stored as-is, not verified.
2. Sample data only — real metadata population needed.
3. Consumer projects not yet consuming — integration patterns documented.
4. No static hosting beyond GitHub raw URLs.
5. Certified tools (AJV, MiniSearch) not yet integrated — scheduled for Sprint 2.

## Architecture Layers

| Layer | Status |
|-------|--------|
| Foundation | ✅ Complete |
| Registry | ✅ Complete |
| ECD | ✅ Complete (11 discovery docs) |
| Provider | 📐 Architecture only |
| Adapter | 📐 Architecture only |
| Plugin | 📐 Architecture only |
| Contract | 📐 Architecture only |
| Runtime | 📐 Architecture only |
| Knowledge | 📐 Blueprint only |
