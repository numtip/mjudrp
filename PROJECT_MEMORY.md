# MJU-DRP Project Memory

## Quick Reference

| Item | Value |
|------|-------|
| Project | MJU Document Registry Platform |
| Repository | https://github.com/numtip/mjudrp |
| Current Phase | Sprint 2C — Registry Distribution & Packaging |
| Architecture Status | **LOCKED** — 8 locked rules, 9 quality gates, change policy established |
| Branch | main |
| Schema Version | v1.0 (FROZEN) |
| Document Count | 74 (populated) |
| Consumer Projects (registered) | 12 |
| Documentation Files | 56 (16 docs + 11 discovery + 14 certification + 10 architecture + 6 implementation + 8 distribution) |
| Knowledge Base Files | 8 |
| Memory Files | 9 |
| Architecture Documents | 10 |
| Implementation Documents | 6 |
| Distribution Documents | 8 |
| Tests | 211 assertions (4 test files) |
| Build Outputs | 12 JSON files in dist/ (including statistics.json) |
| Package Version | 1.0.0 |
| Registry Package | release/latest/registry-package/ (15 artifacts) |

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
12. **Distribution Layer implemented v1.0** — release/ structure, checksums, release notes, package validation.

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

## Registry Statistics (Sprint 2C)

| Entity | Count | Status |
|--------|-------|--------|
| Documents | 74 | ✅ |
| Categories | 22 | ✅ |
| Projects | 12 | ✅ |
| Owners | 12 | ✅ |
| Evidence | 124 | ✅ |
| Relationships | 250 | ✅ |
| Package Artifacts | 15 | ✅ (release/latest/registry-package/) |
| Distribution Documents | 8 | ✅ (docs/distribution/) |

## Distribution Layer

| Component | Status | Location |
|-----------|--------|----------|
| Distribution Structure | ✅ Complete | release/latest/, release/v1/, release/archive/ |
| Registry Package | ✅ Complete | release/latest/registry-package/ |
| Checksum Generation | ✅ Complete | scripts/generate-checksum.mjs |
| Release Notes | ✅ Complete | scripts/generate-release-notes.mjs |
| Package Validation | ✅ Complete | scripts/validate-package.mjs |
| Release Pipeline | ✅ Complete | scripts/release.mjs |
| Distribution Docs | ✅ Complete | docs/distribution/ (8 documents) |
| Distribution Contract | ✅ Complete | contracts/distribution-contract.md |
| CI Workflow | ✅ Enhanced | .github/workflows/validate.yml |
| Package Version | 1.0.0 | release/latest/registry-package/ |

## Active Risks

1. No Microsoft 365 API integration — URLs stored as-is, not verified.
2. Consumer projects not yet consuming — onboarding guide available.
3. MCP servers (GitHub, Filesystem) not yet configured in Cursor (CONDITIONAL certification).
4. GitHub Pages not yet deployed — strategy documented but not active.

## Architecture Layers

| Layer | Status |
|-------|--------|
| Foundation | ✅ Complete |
| Registry | ✅ Complete |
| Distribution | ✅ Complete |
| ECD | ✅ Complete (11 discovery docs) |
| ERC | ✅ Complete (14 certification docs, 8 knowledge base files) |
| Architecture Lock | ✅ LOCKED (10 architecture docs, v1.0) |
| Provider | 📐 Architecture only |
| Adapter | 📐 Architecture only |
| Plugin | 📐 Architecture only |
| Contract | 📐 Architecture only |
| Runtime | 📐 Architecture only |
| Knowledge | 📐 Blueprint only |
