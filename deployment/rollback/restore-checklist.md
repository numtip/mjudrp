# MJU-DRP Restore Checklist

## Pre-Restore

- [ ] Backup file located and verified (file exists, hash matches)
- [ ] Backup timestamp recorded
- [ ] SharePoint site is accessible
- [ ] Target library/list exists
- [ ] Restore reason documented

## Restoration Steps

- [ ] Connect to SharePoint site
- [ ] Validate backup JSON is well-formed
- [ ] Validate backup data against Registry Spec (AJV)
- [ ] Import backup (06_import_metadata.ps1)
- [ ] Verify imported items count matches expected
- [ ] Verify metadata fields populated correctly

## Post-Restore

- [ ] Run verification (deployment/verification/verify-*.ps1)
- [ ] Run registry validation (node scripts/validate-registry.mjs)
- [ ] Run health check (deployment/health/health-check.ps1)
- [ ] Notify affected users
- [ ] Document restore in session log

## Rollback (if restore fails)

- [ ] Identify the failure cause
- [ ] Remove partially restored items
- [ ] Attempt alternative restore method
- [ ] Escalate if needed
