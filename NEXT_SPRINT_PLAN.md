# Next Sprint Plan

## Sprint 3D: SharePoint Pilot Deployment (Completed)

### Preceded by: Sprint 3C SharePoint Deployment Kit ✅

Architecture is **LOCKED**. Registry Specification v1.0 is **FROZEN**.

### Objectives (Completed)
1. ✅ Created Pilot Deployment Runbook (`docs/pilot/00_PILOT_DEPLOYMENT_RUNBOOK.md`)
2. ✅ Created pilot config files (`pilot/` — 6 files)
3. ✅ Created safe deployment wrapper (`deployment/powershell/run-pilot-deployment.ps1`) — dry-run by default, requires -Execute for real ops
4. ✅ Created pilot verification wrapper (`deployment/powershell/run-pilot-verification.ps1`)
5. ✅ Created metadata export workflow (`deployment/powershell/export-pilot-metadata.ps1`)
6. ✅ Created import pilot metadata script (`scripts/import-pilot-metadata.mjs`)
7. ✅ Created pilot validation script (`scripts/validate-pilot.mjs`)
8. ✅ Created Graph readiness report (`docs/pilot/01_GRAPH_READINESS_AFTER_PILOT.md`)
9. ✅ Created pilot health check (`docs/pilot/02_PILOT_HEALTH_CHECK.md`)
10. ✅ Updated package.json with `pilot:import` and `pilot:validate` scripts
11. ✅ Updated all memory and state files

### Pilot Kit Summary

| Category | Files |
|----------|-------|
| Pilot Docs | 3 (runbook, graph readiness, health check) |
| Pilot Config | 6 (configs, samples, checklist, readiness) |
| PowerShell Wrappers | 3 (deployment, verification, export) |
| Node.js Scripts | 2 (import, validate) |
| **Total** | **14 artifacts** |

## Sprint 3E: Microsoft Graph Read-only Adapter (Next)

### Objectives
1. Configure Entra ID app registration for Microsoft Graph
2. Build read-only Graph adapter script (SharePoint → Graph → Registry)
3. Validate metadata round-trip
4. CI integration for automated metadata sync
5. Consumer project onboarding

### Prerequisites
- Pilot SharePoint site must be provisioned and verified
- Entra ID app registration approved by MJU IT
- Admin consent for Sites.Selected
- Site ID, Drive IDs, List IDs, Column internal names confirmed

### Allowed Actions
- Build Graph read-only adapter
- Document Graph integration
- Publish registry package to GitHub Pages
- Create consumer onboarding guide

### Forbidden Actions
- Do NOT write to SharePoint via Graph
- Do NOT provision SharePoint automatically
- Do NOT request tenant-wide permissions
- Do not modify Architecture Lock or Registry Spec
