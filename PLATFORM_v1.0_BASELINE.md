# MJU-DRP Platform v1.0 Baseline

**Freeze Date:** 2026-07-06
**Git Tag:** `platform-v1.0`
**Commit:** `d78c98b`
**Mode:** Operations Mode — no new features

---

## 1. Architecture

| Component | Version | Status | Location |
|-----------|---------|--------|----------|
| Architecture Lock | v1.0 | ✅ LOCKED | `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` |
| Registry Specification | v1.0 | ✅ FROZEN | `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` |
| Schema Contract | v1.0 | ✅ FROZEN | `schemas/` (6 schema files) |
| Consumer Contract | v1.0 | ✅ FROZEN | `docs/architecture/06_CONSUMER_ONBOARDING_GUIDE.md` |
| Core Principles | v1.0 | ✅ LOCKED | 8 locked rules |
| Quality Gates | v1.0 | ✅ ACTIVE (9 gates) | CI pipeline + scripts |
| Architecture Change Policy | v1.0 | ✅ ACTIVE | `docs/architecture/09_ARCHITECTURE_CHANGE_POLICY.md` |

## 2. Registry

| Entity | Count | Schema File | Registry File |
|--------|-------|-------------|---------------|
| Documents | 74 | `schemas/document.schema.json` | `registry/documents.sample.json` |
| Categories | 22 | `schemas/category.schema.json` | `registry/categories.sample.json` |
| Projects | 12 | `schemas/project.schema.json` | `registry/projects.sample.json` |
| Owners | 12 | `schemas/owner.schema.json` | `registry/owners.sample.json` |
| Evidence | 124 | `schemas/evidence.schema.json` | `registry/evidence-map.sample.json` |
| Relationships | 250 | `schemas/relationship.schema.json` | Generated from document refs |
| Consumer Projects | 12 | — | `registry/projects.sample.json` |

## 3. Package

| Item | Version | Location |
|------|---------|----------|
| Package Version | 1.0.0 | `package.json` |
| Registry Package | v1.0 | `release/latest/registry-package/` (15 artifacts) |
| Distribution CDN | Not deployed | Pending GitHub Pages setup |

## 4. Deployment Kit

| Item | Version | Asset Count | Location |
|------|---------|-------------|----------|
| Deployment Manifest | 1.0.0 | 1 | `deployment/deployment-manifest.json` |
| PowerShell Scripts | 1.0.0 | 13 | `deployment/powershell/` |
| Site Scripts | 1.0.0 | 8 | `deployment/site-scripts/` |
| Site Designs | 1.0.0 | 5 | `deployment/site-designs/` |
| CSV Templates | 1.0.0 | 7 | `deployment/csv/` |
| JSON Templates | 1.0.0 | 7 | `deployment/json/` |
| Verification Kit | 1.0.0 | 7 | `deployment/verification/` |
| Rollback Kit | 1.0.0 | 4 | `deployment/rollback/` |
| Discovery Kit | 1.0.0 | 7 | `deployment/discovery/` |
| Health Check Kit | 1.0.0 | 3 | `deployment/health/` |
| Deployment Validator | 1.0.0 | 1 | `scripts/validate-deployment.mjs` |
| Deployment Docs | 1.0.0 | 10 | `docs/deployment/` |

## 5. Provisioning Kit

| Item | Version | Asset Count | Location |
|------|---------|-------------|----------|
| Provisioning Manifest | 1.0.0 | 1 | `provisioning/manifest.json` |
| Site Templates | 1.0.0 | 5 | `provisioning/site/` |
| Library Templates | 1.0.0 | 6 | `provisioning/libraries/` |
| Column Templates | 1.0.0 | 6 | `provisioning/columns/` |
| List Templates | 1.0.0 | 5 | `provisioning/lists/` |
| View Templates | 1.0.0 | 9 | `provisioning/views/` |
| Permission Templates | 1.0.0 | 3 | `provisioning/permissions/` |
| Content Type Templates | 1.0.0 | 6 | `provisioning/content-types/` |
| Validation Templates | 1.0.0 | 4 | `provisioning/validation/` |
| AI Prompt Library | 1.0.0 | 8 | `provisioning/prompts/` |
| Export Templates | 1.0.0 | 5 | `provisioning/exports/` |

## 6. Pilot Kit

| Item | Version | Asset Count | Location |
|------|---------|-------------|----------|
| Pilot Runbook | 1.0.0 | 1 | `docs/pilot/00_PILOT_DEPLOYMENT_RUNBOOK.md` |
| Graph Readiness | 1.0.0 | 1 | `docs/pilot/01_GRAPH_READINESS_AFTER_PILOT.md` |
| Pilot Health Check | 1.0.0 | 1 | `docs/pilot/02_PILOT_HEALTH_CHECK.md` |
| Pilot Config Files | 1.0.0 | 6 | `pilot/` |
| Deployment Wrapper | 1.0.0 | 1 | `deployment/powershell/run-pilot-deployment.ps1` |
| Verification Wrapper | 1.0.0 | 1 | `deployment/powershell/run-pilot-verification.ps1` |
| Export Workflow | 1.0.0 | 1 | `deployment/powershell/export-pilot-metadata.ps1` |
| Import Script | 1.0.0 | 1 | `scripts/import-pilot-metadata.mjs` |
| Validation Script | 1.0.0 | 1 | `scripts/validate-pilot.mjs` |

## 7. Operations Kit (NEW)

| Item | Asset Count | Location |
|------|-------------|----------|
| Operator Guide | 1 | `docs/operations/01_OPERATOR_GUIDE.md` |
| Administrator Guide | 1 | `docs/operations/02_ADMINISTRATOR_GUIDE.md` |
| AI Operator Guide | 1 | `docs/operations/03_AI_OPERATOR_GUIDE.md` |
| Troubleshooting Guide | 1 | `docs/operations/04_TROUBLESHOOTING_GUIDE.md` |
| Common Errors | 1 | `docs/operations/05_COMMON_ERRORS.md` |
| Rollback Quick Guide | 1 | `docs/operations/06_ROLLBACK_QUICK_GUIDE.md` |
| M365 Readiness Checklist | 1 | `docs/operations/07_M365_READINESS_CHECKLIST.md` |
| Deployment Readiness Report | 1 | `DEPLOYMENT_READINESS_REPORT.md` |

## 8. Environment Inventories

| Item | Location |
|------|----------|
| Production Template | `environment/production.example.json` |
| Pilot Template | `environment/pilot.example.json` |
| Development Template | `environment/development.example.json` |
| Tenant Inventory | `environment/tenant-inventory.template.json` |
| Site Inventory | `environment/site-inventory.template.json` |
| Library Inventory | `environment/library-inventory.template.json` |
| Graph Inventory | `environment/graph-inventory.template.json` |
| Column Inventory | `environment/column-inventory.template.json` |
| Permission Inventory | `environment/permission-inventory.template.json` |

## 9. Tests

| Suite | Assertions | Status |
|-------|-----------|--------|
| Validation Tests | 162 | ✅ PASS |
| Generator Tests | 29 | ✅ PASS |
| Registry Tests | 11 | ✅ PASS |
| Search Tests | 9 | ✅ PASS |
| **Total** | **211** | **✅ ALL PASS** |

## 10. Documentation

| Category | Count | Location |
|----------|-------|----------|
| Architecture | 10 | `docs/architecture/` |
| Sharepoint Blueprint | 10 | `docs/sharepoint/` |
| Provisioning | 11 | `docs/provisioning/` |
| Deployment | 10 | `docs/deployment/` |
| Distribution | 9 | `docs/distribution/` |
| Pilot | 3 | `docs/pilot/` |
| Operations | 7 | `docs/operations/` (NEW) |
| **Total** | **60** | — |

## 11. Approved ADRs

| ADR | Title | Date |
|-----|-------|------|
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
| ADR-012 | Schema Evolution Policy | 2026-07-06 |
| ADR-013 | AI Provisioning Kit v1.0 | 2026-07-06 |
| ADR-014 | Provisioning Kit Structure | 2026-07-06 |
| ADR-015 | SharePoint Deployment Kit v1.0 | 2026-07-06 |
| ADR-016 | SharePoint Pilot Deployment v1.0 | 2026-07-06 |

## 12. Known Issues

| # | Issue | Impact | Workaround |
|---|-------|--------|------------|
| 1 | No Microsoft 365 API integration | URLs stored as-is, not verified | Manual URL validation |
| 2 | No Graph metadata sync | Metadata must be exported manually | Export/import scripts provided |
| 3 | No GitHub Pages CDN | Consumers cannot fetch registry | Manual package distribution |
| 4 | No MCP configuration | AI agents cannot access SharePoint | Manual operations |
| 5 | SharePoint site not provisioned | No real environment to test | Templates ready for admin execution |
| 6 | No consumer deployment | No real consumption | Onboarding guide available |

## 13. Freeze Rules

1. **No new platform features** — Operations Mode only
2. **No architecture changes** without ADR per change policy
3. **No schema changes** — Registry Spec v1.0 is FROZEN
4. **Defect fixes allowed** — Must pass all quality gates
5. **Documentation improvements allowed** — No structural changes
6. **Operational tools allowed** — Deployment/validation/CI improvements
7. **ADR required** for any change to locked components

## 14. File Inventory (Summary)

| Directory | File Count |
|-----------|-----------|
| `deployment/` | 71 |
| `provisioning/` | 58 |
| `docs/` | 60 |
| `pilot/` | 6 |
| `environment/` | 9 |
| `memory/` | 9 |
| `runtime/` | 6 |
| `scripts/` | 12 |
| `schemas/` | 6 |
| `registry/` | 5 |
| `tests/` | 4 |
| Root files | 5 (CHANGELOG_v1.0, PLATFORM_v1.0_BASELINE, DEPLOYMENT_READINESS_REPORT, etc.) |

---

*This baseline is frozen as of 2026-07-06. Future changes require an Architecture Decision Record (ADR) per the Architecture Change Policy.*
