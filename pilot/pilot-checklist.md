# MJU-DRP Pilot Deployment Checklist

**Version:** 1.0.0
**Date:** 2026-07-06
**Initiator:** __________________
**Approver:** __________________

## Phase 0: Pre-Deployment

### Configuration

- [ ] Tenant hostname configured in `pilot/pilot-site-config.json`
- [ ] Site URL confirmed unique
- [ ] Site owner email configured
- [ ] `__TENANT_HOSTNAME__` placeholders resolved
- [ ] `__TENANT_ID__` placeholders resolved
- [ ] `__SITE_OWNER_EMAIL__` placeholders resolved

### Software Prerequisites

- [ ] PnP.PowerShell installed: `Get-Module PnP.PowerShell -ListAvailable`
- [ ] PowerShell 7+: `$PSVersionTable.PSVersion`
- [ ] Node.js 18+: `node --version`
- [ ] Git available: `git --version`

### Safety Checks

- [ ] Rollback plan reviewed (`deployment/rollback/rollback-guide.md`)
- [ ] Dry-run mode confirmed (default)
- [ ] No production SharePoint sites targeted
- [ ] No existing experimental sites will be modified
- [ ] Runbook reviewed (`docs/pilot/00_PILOT_DEPLOYMENT_RUNBOOK.md`)
- [ ] Pilot readiness report reviewed (`pilot/pilot-readiness-report.md`)

## Phase 1: Site Creation

- [ ] Dry-run executed: `.\deployment\powershell\run-pilot-deployment.ps1`
- [ ] Dry-run output reviewed for correctness
- [ ] `-Execute` flag passed for real deployment
- [ ] Site created at configured URL
- [ ] Site accessible via browser
- [ ] Time zone set to Bangkok (UTC+7)
- [ ] Default language set to Thai
- [ ] English configured as alternate language

## Phase 2: Libraries, Columns, Lists, Views

### Libraries

- [ ] DRP Documents created
- [ ] DRP Evidence created
- [ ] DRP Templates created
- [ ] DRP Archive created
- [ ] DRP Working Area created
- [ ] DRP Source Data created

### Columns

- [ ] 22 site columns created in "MJU Document Registry Columns" group
- [ ] Required columns marked as required
- [ ] Choice columns have correct value lists
- [ ] Columns added to each library

### Lists

- [ ] DRP Categories created
- [ ] DRP Projects created
- [ ] DRP Owners created
- [ ] Metadata QA Queue created
- [ ] Registry Review Queue created

### Views

- [ ] Document library views configured
- [ ] Evidence library views configured
- [ ] Template library views configured
- [ ] Archive library views configured
- [ ] Working Area views configured
- [ ] Administration views configured

### Permissions

- [ ] DRP Owners group created (Full Control)
- [ ] DRP Editors group created (Contribute)
- [ ] DRP Reviewers group created (Contribute)
- [ ] DRP Readers group created (Read)
- [ ] DRP External Readers group created (Read)
- [ ] DRP API Access group created (Read)
- [ ] DRP Compliance group created (Read)
- [ ] Library-level permission inheritance configured

## Phase 3: Metadata & Documents

- [ ] Pilot documents uploaded per `pilot-document-sample-list.md`
- [ ] Metadata applied per `pilot-metadata-sample.csv`
- [ ] Evidence documents uploaded to DRP Evidence library
- [ ] Evidence metadata applied
- [ ] Versioning enabled on document libraries
- [ ] Approval workflow configured on DRP Documents and Evidence

## Phase 4: Verification

- [ ] Verification wrapper executed: `run-pilot-verification.ps1`
- [ ] Verification report generated in `deployment/reports/`
- [ ] All verification checks PASS
- [ ] Metadata exported: `export-pilot-metadata.ps1`
- [ ] Export files exist in `pilot/exports/`

## Phase 5: Validation

- [ ] Import script executed: `node scripts/import-pilot-metadata.mjs`
- [ ] Import report reviewed: `pilot/generated/import-report.json`
- [ ] Validation script executed: `node scripts/validate-pilot.mjs`
- [ ] Validation report reviewed: `pilot/generated/validation-report.json`
- [ ] Registry validation executed: `node scripts/validate-registry.mjs`
- [ ] Registry validation PASS

## Phase 6: Reporting

- [ ] Pilot health check generated: `docs/pilot/02_PILOT_HEALTH_CHECK.md`
- [ ] Graph readiness documented: `docs/pilot/01_GRAPH_READINESS_AFTER_PILOT.md`
- [ ] Memory files updated
- [ ] Session log appended

## Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Pilot Initiator | | | |
| SharePoint Administrator | | | |
| Project Owner | | | |

## Notes

- __________________________________________________________________
- __________________________________________________________________
