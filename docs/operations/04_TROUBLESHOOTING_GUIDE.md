# MJU-DRP Troubleshooting Guide

**Version:** 1.0.0
**Status:** READY — 2026-07-06
**Audience:** Administrators and operators troubleshooting MJU-DRP issues

---

## 1. Registry Validation Failures

### Symptom: `validate-registry.mjs` reports errors

**Common Causes:**
- Missing required fields (id, title, category, status, owner, visibility)
- Invalid JSON syntax
- Duplicate document IDs
- Cross-reference to non-existent category/project/owner/evidence

**Resolution:**
1. Check the specific error message — it includes the document ID and field
2. Open the relevant registry file in `registry/`
3. Fix the reported issue
4. Re-run validation

### Symptom: AJV schema validation fails

- Verify the document matches the schema at `schemas/document.schema.json`
- Check field types (string, number, array, etc.)
- Check field formats (date-time, URI, etc.)

## 2. Provisioning Validation Failures

### Symptom: `validate-provisioning.mjs` reports failures

- Missing template files in `provisioning/` directories
- Invalid JSON in template files
- Missing required properties in templates
- Mismatched expected counts

**Resolution:**
1. Review which specific check failed (line number included)
2. Restore or fix the affected template file
3. Re-run `node scripts/validate-provisioning.mjs`

## 3. Deployment Validation Failures

### Symptom: `validate-deployment.mjs` reports failures

- Missing deployment files in `deployment/` directories
- Missing `MJU-DRP` header in PowerShell scripts
- Missing placeholders in PowerShell scripts
- Invalid JSON in Site Scripts or Site Designs

**Resolution:**
1. Review the specific check that failed
2. Ensure all 10 PowerShell scripts have proper headers and placeholders
3. Ensure all JSON files are valid
4. Re-run `node scripts/validate-deployment.mjs`

## 4. Package Validation Failures

### Symptom: `validate-package.mjs` reports failures

- Missing artifacts in `release/latest/registry-package/`
- Checksum mismatch
- Registry count mismatch between manifest and actual data

**Resolution:**
1. Run `node scripts/release.mjs` to regenerate the package
2. Re-run `node scripts/validate-package.mjs`

## 5. Test Failures

### Symptom: `npm test` reports failures

- Registry data validation errors (see #1)
- Generator output missing or incorrect
- Search index invalid
- Cross-reference errors

**Resolution:**
1. Run individual test files to identify the failing suite
2. Fix the underlying data or code issue
3. Run all tests again

## 6. Git Issues

### Symptom: Push fails

- Network connectivity (retry later)
- Authentication (check GitHub credentials)
- Branch protection rules

### Symptom: Merge conflicts

- Pull latest from main: `git pull origin main`
- Resolve conflicts manually
- Commit and push

## 7. SharePoint Pilot Deployment Issues

### Symptom: Dry-run shows unexpected actions

- Review `run-pilot-deployment.ps1` output
- Check `pilot/pilot-site-config.json` values
- Fix configuration and re-run dry-run

### Symptom: Site creation fails

- URL may already exist — choose a different URL
- Insufficient permissions — request SharePoint Admin role
- Tenant may not allow Communication Sites — check policy

### Symptom: Library/column/list creation fails

- Scripts are idempotent — safe to re-run
- Check if item already exists
- Verify PnP.PowerShell connection

### Symptom: Permission group creation fails

- User creating groups must have site admin rights
- Group names must not conflict with existing groups

## 8. Metadata Export Issues

### Symptom: Export produces empty files

- No documents uploaded to SharePoint yet
- PnP.PowerShell not connected
- Wrong library name specified

### Symptom: Import script reports errors

- CSV column headers don't match expected format
- Missing required fields
- Encoding issues (use UTF-8)

## 9. General Debugging

### Check Logs

- Deployment logs: `deployment/reports/`
- Export logs: `pilot/exports/export-*.log`
- Import reports: `pilot/generated/import-report.json`
- Validation reports: `dist/validation-report.json`
- Health reports: `deployment/health/`

### Verify File Structure

```bash
# Check all required directories exist
ls deployment/powershell/
ls provisioning/site/
ls docs/pilot/
```

### Check Dependencies

```powershell
# PowerShell
Get-Module PnP.PowerShell -ListAvailable

# Node.js
node --version
npm list
```

## 10. When to Escalate

Escalate to the project owner if:
- Registry validation errors cannot be resolved
- SharePoint tenant-level permissions are required
- Entra ID app registration is needed for Graph
- Consumer projects report issues with registry packages
- Architecture Lock or Registry Spec changes are requested (requires ADR)
