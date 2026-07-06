# Pilot Deployment Runbook — MJU-DRP SharePoint Pilot

**Status:** PLANNED — 2026-07-06
**Sprint:** 3D — SharePoint Pilot Deployment
**Next Step:** Run pilot deployment after approval

---

## Purpose

This runbook defines the controlled pilot deployment of the MJU Document Registry (MJU-DRP) SharePoint environment. The pilot creates a new SharePoint site, verifies its structure, uploads sample documents with metadata, exports metadata, and validates the exported data against the MJU-DRP registry.

The pilot is **not** production. It validates that the Deployment Kit templates produce a working SharePoint site that aligns with the Registry Specification v1.0.

## Assumptions

| # | Assumption | Notes |
|---|-----------|-------|
| 1 | Tenant hostname is `maejo365.sharepoint.com` (configurable) | Use `__TENANT_HOSTNAME__` placeholder |
| 2 | User executing scripts has SharePoint Administrator permissions | Or site collection admin equivalent |
| 3 | PnP.PowerShell module v2.x+ is installed | Required for all PowerShell scripts |
| 4 | Microsoft 365 admin has approved site creation | No script runs without explicit approval |
| 5 | The pilot site URL is unique and does not conflict | `sites/MJUDocumentRegistry` |
| 6 | No existing production data will be modified | All operations are scoped to the new pilot site |

## Prerequisites

### Software

| Tool | Version | Purpose |
|------|---------|---------|
| PnP.PowerShell | 2.x+ | SharePoint site creation and management |
| PowerShell | 7.x+ | Script execution |
| Node.js | 18.x+ | For validation and import scripts |
| Git | Latest | Version control |

### Permissions

| Role | Required For |
|------|-------------|
| SharePoint Administrator | Create site, configure permissions |
| Site Owner | Add libraries, columns, lists |
| PnP.PowerShell access | Automated operations |
| Entra ID Global Admin (delegated) | App registration (future Graph) |

### Configuration

| Item | Source | Format |
|------|--------|--------|
| Tenant hostname | `pilot/pilot-site-config.json` | `maejo365.sharepoint.com` |
| Site URL | `pilot/pilot-site-config.json` | Full URL with path |
| Site owner email | `pilot/pilot-site-config.json` | `user@domain.com` |
| Site name | `pilot/pilot-site-config.json` | `MJU Document Registry` |
| Metadata sample | `pilot/pilot-metadata-sample.csv` | CSV with registry-aligned columns |

## Required Permissions

| SharePoint Permission | Scope | Justification |
|----------------------|-------|--------------|
| Create site | Tenant | Create the MJU Document Registry site |
| Manage site permissions | Site | Configure DRP Owners, Editors, Reviewers, Readers |
| Create libraries | Site | Create 6 DRP document libraries |
| Create columns | Site | Create 22 metadata columns |
| Create lists | Site | Create 5 reference lists |
| Create views | Site | Create 13 views |
| Upload documents | Library | Upload pilot sample documents |
| Export metadata | Library | Export metadata for validation |

## Admin Checklist

### Pre-Deployment

- [ ] Verify tenant hostname in `pilot/pilot-site-config.json`
- [ ] Verify site URL does not already exist
- [ ] Confirm site owner email address
- [ ] Install PnP.PowerShell: `Install-Module PnP.PowerShell -Scope CurrentUser`
- [ ] Verify PowerShell 7+ is installed: `$PSVersionTable.PSVersion`
- [ ] Verify Node.js 18+ is installed: `node --version`
- [ ] Run dry-run deployment: `.\deployment\powershell\run-pilot-deployment.ps1`
- [ ] Review dry-run output for correctness
- [ ] Confirm rollback plan is ready before any real operation

### Deployment

- [ ] Step 1: Create site (`00_create_site.ps1`)
- [ ] Step 2: Create libraries (`01_create_libraries.ps1`)
- [ ] Step 3: Create columns (`02_create_columns.ps1`)
- [ ] Step 4: Create lists (`03_create_lists.ps1`)
- [ ] Step 5: Create views (`04_create_views.ps1`)
- [ ] Step 6: Create permissions (`05_create_permissions.ps1`)
- [ ] Step 7: Upload pilot metadata and documents

### Post-Deployment

- [ ] Run verification: `.\deployment\powershell\run-pilot-verification.ps1`
- [ ] Export metadata: `.\deployment\powershell\export-pilot-metadata.ps1`
- [ ] Import and validate: `node scripts/import-pilot-metadata.mjs`
- [ ] Validate pilot: `node scripts/validate-pilot.mjs`
- [ ] Generate pilot health check report
- [ ] Document Graph readiness

## Deployment Sequence

```
Phase 0: Preparation
  ├── Review runbook and checklist
  ├── Configure pilot-site-config.json
  ├── Install prerequisites
  └── Run dry-run deployment wrapper

Phase 1: Site Creation
  ├── Run 00_create_site.ps1
  └── Verify site accessible via browser

Phase 2: Libraries, Columns, Lists, Views
  ├── Run 01_create_libraries.ps1  (6 libraries)
  ├── Run 02_create_columns.ps1    (22 columns)
  ├── Run 03_create_lists.ps1      (5 lists)
  ├── Run 04_create_views.ps1      (13 views)
  └── Run 05_create_permissions.ps1 (7 groups)

Phase 3: Metadata & Documents
  ├── Upload pilot documents (see pilot-document-sample-list.md)
  └── Apply metadata from pilot-metadata-sample.csv

Phase 4: Verification
  ├── Run verification wrapper
  ├── Export metadata to CSV/JSON
  └── Validate exported metadata against MJU-DRP

Phase 5: Reporting
  ├── Generate import report
  ├── Generate validation report
  ├── Generate health check report
  └── Produce Graph readiness report
```

## Verification Sequence

| Step | Script / Action | Expected Result |
|------|----------------|-----------------|
| 1 | `run-pilot-verification.ps1` | All checks PASS |
| 2 | `export-pilot-metadata.ps1` | CSV + JSON exported |
| 3 | `node scripts/import-pilot-metadata.mjs` | Import report generated |
| 4 | `node scripts/validate-pilot.mjs` | Validation report — 0 errors |
| 5 | `node scripts/validate-registry.mjs` | Registry validation PASS |
| 6 | Review report in `pilot/generated/` | All checks green |
| 7 | Review report in `deployment/reports/` | All checks green |

## Rollback Approach

If the pilot deployment fails validation or causes unexpected issues:

### Rollback Steps

1. **Stop immediately** — Do not proceed to next phase
2. **Run rollback scripts** — Use `deployment/rollback/remove-demo-content.ps1`
3. **Archive pilot metadata** — Use `deployment/rollback/archive-metadata.ps1`
4. **Delete pilot site** — If necessary, delete via SharePoint Admin Center
5. **Document failure** — Record in `pilot/generated/pilot-failure-report.md`
6. **Restore from backup** — Follow `deployment/rollback/restore-checklist.md`
7. **Revise and retry** — Fix issues found and re-run dry-run

### Rollback Notes

- The pilot site is isolated and does not affect existing sites
- No production data is modified at any point
- Rollback is manual (SharePoint Admin Center or PnP commands)
- Pilot metadata is archived before deletion

## Success Criteria

| # | Criterion | Measurement |
|---|-----------|------------|
| 1 | Pilot site created successfully | Site accessible at configured URL |
| 2 | All 6 libraries created | Verification script reports 6/6 PASS |
| 3 | All 22 columns created | Verification script reports 22/22 PASS |
| 4 | All 5 lists created | Verification script reports 5/5 PASS |
| 5 | All 13 views created | Verification script reports 13/13 PASS |
| 6 | All 7 permission groups created | Verification script reports 7/7 PASS |
| 7 | Pilot documents uploaded | Document count matches sample list |
| 8 | Metadata exported successfully | CSV and JSON files exist in `pilot/exports/` |
| 9 | Exported metadata imports cleanly | Import report shows 0 errors |
| 10 | Pilot validation passes | Validation report shows 0 errors |
| 11 | Registry validation still passes | `validate-registry.mjs` reports PASS |
| 12 | Graph readiness documented | Report generated in `docs/pilot/` |

## Go / No-Go Checklist

### Pre-Execution

- [ ] Runbook reviewed and approved
- [ ] Pilot checklist reviewed (`pilot/pilot-checklist.md`)
- [ ] Pilot config files reviewed (`pilot/pilot-site-config.json`)
- [ ] All prerequisites installed
- [ ] Rollback plan confirmed
- [ ] Backup plan confirmed
- [ ] No active production deployments in progress
- [ ] SharePoint Administrator available for questions

### Decision

- **Go** — All items above checked → proceed with dry-run then execution
- **No-Go** — Any item unchecked → pause and resolve before proceeding

---

## Appendix: Pilot Artifacts

| Artifact | Location |
|----------|----------|
| Pilot Config | `pilot/pilot-site-config.json` |
| Metadata Sample | `pilot/pilot-metadata-sample.csv` |
| Document Sample List | `pilot/pilot-document-sample-list.md` |
| Pilot Checklist | `pilot/pilot-checklist.md` |
| Readiness Report | `pilot/pilot-readiness-report.md` |
| Deployment Reports | `deployment/reports/` |
| Exported Metadata | `pilot/exports/` |
| Generated Reports | `pilot/generated/` |
| Graph Readiness | `docs/pilot/01_GRAPH_READINESS_AFTER_PILOT.md` |
| Health Check | `docs/pilot/02_PILOT_HEALTH_CHECK.md` |
