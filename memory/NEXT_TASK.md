# Next Task

## Sprint: Sprint 3D — SharePoint Pilot Deployment (Completed)

### Objectives
- [x] Create Pilot Deployment Runbook
- [x] Create pilot config files (6 files)
- [x] Create safe deployment wrapper (dry-run by default)
- [x] Create verification wrapper with MD + JSON reports
- [x] Create metadata export workflow
- [x] Create import pilot metadata script
- [x] Create pilot validation script (7 checks)
- [x] Create Graph readiness report
- [x] Create pilot health check
- [x] Update package.json with pilot scripts
- [x] All quality gates pass

## Next Sprint: Sprint 3E — Microsoft Graph Read-only Adapter

### Objectives
- [ ] Configure Entra ID app registration for Microsoft Graph
- [ ] Build read-only Graph adapter script
- [ ] Validate metadata round-trip
- [ ] CI integration for automated metadata sync
- [ ] Consumer project onboarding

### Prerequisites
- Pilot SharePoint site provisioned and verified
- Entra ID app registration approved
- Admin consent for Sites.Selected
- Site ID, Drive IDs, List IDs confirmed

### Quality Gates
1. `node scripts/validate-registry.mjs` — PASS
2. `node scripts/validate-provisioning.mjs` — PASS
3. `node scripts/validate-deployment.mjs` — PASS
4. `node scripts/validate-package.mjs` — PASS
5. `node scripts/validate-pilot.mjs` — PASS (after pilot data exists)
6. `npm test` — All assertions PASS
7. Architecture unchanged
