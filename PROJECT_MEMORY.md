# MJU-DRP Project Memory

## Quick Reference

| Item | Value |
|------|-------|
| Project | MJU Document Registry Platform |
| Repository | https://github.com/numtip/mjudrp |
| Current Phase | Sprint 3B — SharePoint AI Provisioning Kit |
| Architecture Status | **LOCKED** — 8 locked rules, 9 quality gates, change policy established |
| Branch | main |
| Schema Version | v1.0 (FROZEN) |
| Document Count | 74 (populated) |
| Consumer Projects (registered) | 12 |
| Documentation Files | 77 (16 docs + 11 discovery + 14 certification + 10 architecture + 6 implementation + 8 distribution + 10 sharepoint + 11 provisioning) |
| Knowledge Base Files | 8 |
| Memory Files | 9 |
| Provisioning Templates | 58 files in provisioning/ |
| Tests | 211 assertions (4 test files) |
| Build Outputs | 12 JSON files in dist/ |
| Package Version | 1.0.0 |
| Registry Package | release/latest/registry-package/ (15 artifacts) |

## Key Architecture Decisions

1-13. (unchanged — see previous entries)
14. **AI Provisioning Kit v1.0** — 58 reusable templates, 8 AI prompts, 5 export formats, 10 provisioning docs, full provisioning validator.

## ERC Certifications (v1.4)

(unchanged)

## Registry Statistics (Sprint 3B)

| Entity | Count | Status |
|--------|-------|--------|
| Documents | 74 | ✅ |
| Categories | 22 | ✅ |
| Projects | 12 | ✅ |
| Owners | 12 | ✅ |
| Evidence | 124 | ✅ |
| Relationships | 250 | ✅ |

## SharePoint Blueprint

| Component | Status | Location |
|-----------|--------|----------|
| Enterprise Blueprint | ✅ Complete | docs/sharepoint/ (10 documents) |

## Provisioning Kit

| Component | Status | Location |
|-----------|--------|----------|
| Site Templates | ✅ Complete | provisioning/site/ (5 files) |
| Library Templates | ✅ Complete | provisioning/libraries/ (6 files) |
| Column Templates | ✅ Complete | provisioning/columns/ (6 files) |
| List Templates | ✅ Complete | provisioning/lists/ (5 files) |
| View Templates | ✅ Complete | provisioning/views/ (9 files) |
| Permission Templates | ✅ Complete | provisioning/permissions/ (3 files) |
| Content Type Templates | ✅ Complete | provisioning/content-types/ (6 files) |
| Validation Templates | ✅ Complete | provisioning/validation/ (4 files) |
| AI Prompt Library | ✅ Complete | provisioning/prompts/ (8 files) |
| Export Templates | ✅ Complete | provisioning/exports/ (5 files) |
| Provisioning Manifest | ✅ Complete | provisioning/manifest.json |
| Provisioning Validator | ✅ Complete | scripts/validate-provisioning.mjs |
| Provisioning Docs | ✅ Complete | docs/provisioning/ (11 documents) |

## Active Risks

1. No Microsoft 365 API integration — URLs stored as-is, not verified.
2. Consumer projects not yet consuming — onboarding guide available.
3. MCP servers not yet configured in Cursor.
4. GitHub Pages not yet deployed.
5. SharePoint site not yet provisioned — templates ready, manual setup planned.
6. Graph integration not yet certified.

## Architecture Layers

| Layer | Status |
|-------|--------|
| Foundation | ✅ Complete |
| Registry | ✅ Complete |
| Distribution | ✅ Complete |
| SharePoint Blueprint | ✅ Complete (10 docs) |
| Provisioning Kit | ✅ Complete (58 templates + 11 docs) |
| ECD | ✅ Complete |
| ERC | ✅ Complete |
| Architecture Lock | ✅ LOCKED |
| Provider | 📐 Architecture only |
| Adapter | 📐 Architecture only |
| Plugin | 📐 Architecture only |
| Contract | 📐 Architecture only |
