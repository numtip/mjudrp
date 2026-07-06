# MJU-DRP Changelog — Platform v1.0

**Release Date:** 2026-07-06
**Git Tag:** `platform-v1.0`
**Commit:** `d78c98b`
**Status:** FROZEN — Operations Mode

---

## v1.0.0 — Platform Release

This is the initial platform release of the MJU Document Registry Platform (MJU-DRP). The platform is now frozen and enters Operations Mode. No new features will be developed. Only operational improvements and defect fixes via ADR process.

### Architecture

| Component | Status | Reference |
|-----------|--------|-----------|
| Architecture Lock v1.0 | ✅ FROZEN | `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` |
| Registry Specification v1.0 | ✅ FROZEN | `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` |
| Core Principles | ✅ LOCKED | 8 locked rules |
| Quality Gates | ✅ ACTIVE (9 gates) | CI/CD pipeline |

### Registry

| Entity | Count |
|--------|-------|
| Documents | 74 |
| Categories | 22 |
| Projects | 12 |
| Owners | 12 |
| Evidence | 124 |
| Relationships | 250 |

### Sprint History

| Sprint | Deliverable | Artifacts |
|--------|------------|-----------|
| Sprint 1 | Foundation | Schemas, README, memory system |
| Sprint 2A | Registry + Distribution | Registry data, search index, JSON outputs |
| Sprint 2B | Certification + Architecture Lock | ECD, ERC, Architecture Lock v1.0 |
| Sprint 3A | SharePoint Enterprise Blueprint | 10 docs — site design, columns, lists, permissions, views |
| Sprint 3B | AI Provisioning Kit | 58 templates — site, libraries, columns, lists, views, permissions, content types, validation, prompts, exports |
| Sprint 3C | SharePoint Deployment Kit | 68 assets — PowerShell, Site Scripts, Site Designs, CSV, JSON, verification, rollback, discovery, health |
| Sprint 3D | SharePoint Pilot Deployment | 14 artifacts — runbook, config, wrappers, import/export, validation, Graph readiness, health check |

### Key ADRs

| ADR | Decision | Date |
|-----|----------|------|
| ADR-001 | GitHub is Source of Truth | 2026-07-06 |
| ADR-002 | MJU-DRP is Registry Core, Not CMS | 2026-07-06 |
| ADR-003 | Microsoft 365 Stores Binary Files | 2026-07-06 |
| ADR-004 | No Production Modification | 2026-07-06 |
| ADR-005 | Consumer Projects Consume Registry Outputs | 2026-07-06 |
| ADR-006 | No Database During MVP | 2026-07-06 |
| ADR-007 | No Authentication/RBAC Without Approval | 2026-07-06 |
| ADR-008 | No Admin Panel During MVP | 2026-07-06 |
| ADR-009 | Thai-English Bilingual Support | 2026-07-06 |
| ADR-010 | ERC Certification v1.0 | 2026-07-06 |
| ADR-011 | Registry Specification v1.0 + Architecture Lock | 2026-07-06 |
| ADR-012 | Schema Evolution Policy (Registry Spec §9) | 2026-07-06 |
| ADR-013 | AI Provisioning Kit v1.0 | 2026-07-06 |
| ADR-014 | Provisioning Kit Structure | 2026-07-06 |
| ADR-015 | SharePoint Deployment Kit v1.0 | 2026-07-06 |
| ADR-016 | SharePoint Pilot Deployment v1.0 | 2026-07-06 |

### Known Issues

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| 1 | No Microsoft 365 API integration | Open | URLs stored as-is, not verified via API |
| 2 | Consumer projects not yet consuming | Open | Onboarding guide available |
| 3 | MCP servers not configured in Cursor | Open | Required for AI agent automation |
| 4 | GitHub Pages not deployed | Open | Distribution CDN pending |
| 5 | SharePoint site not yet provisioned | Open | Templates ready, requires admin execution |
| 6 | Graph integration not yet certified | Open | Requires Entra ID app registration + admin consent |

### Package Contents

| Artifact | Location |
|----------|----------|
| Registry Package | `release/latest/registry-package/` (15 artifacts) |
| Documentation | `docs/` (100+ documents) |
| Provisioning Templates | `provisioning/` (58 files) |
| Deployment Assets | `deployment/` (71 files) |
| Pilot Artifacts | `pilot/` (6 config files) |
| Pilot Documentation | `docs/pilot/` (3 documents) |
| Memory Files | `memory/` (9 files) |
| Runtime Files | `runtime/` (6 files) |

---

*Platform v1.0 is frozen. Future changes require ADR per Architecture Change Policy (`docs/architecture/09_ARCHITECTURE_CHANGE_POLICY.md`).*
