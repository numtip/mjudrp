# MJU-DRP Rollback Guide

## Overview

This guide documents safe rollback procedures for the MJU Document Registry SharePoint environment. Rollbacks should be performed manually by a SharePoint Administrator.

## Rollback Principles

1. **Never delete production data automatically** — All rollback scripts require manual confirmation.
2. **Backup before rollback** — Always export metadata before making changes.
3. **Document the rollback** — Record what was changed and why.
4. **Test in staging first** — Never rollback production without testing.

## Rollback Scenarios

### Scenario 1: Remove Demo Content

**Use when:** Demo/test content was uploaded and needs to be removed.

**Script:** `deployment/rollback/remove-demo-content.ps1`

**Procedure:**
1. Export current metadata (`deployment/powershell/08_export_metadata.ps1`)
2. Run `remove-demo-content.ps1` with `-Confirm:$true`
3. Verify remaining content
4. Document the change

### Scenario 2: Archive Metadata

**Use when:** Content needs to be preserved but removed from active libraries.

**Script:** `deployment/rollback/archive-metadata.ps1`

**Procedure:**
1. Connect to SharePoint site
2. Run archive script with filter parameters
3. Items are moved to DRP Archive or exported as JSON
4. Update registry accordingly

### Scenario 3: Restore from Backup

**Use when:** Metadata or content needs to be restored to a previous state.

**Checklist:** `deployment/rollback/restore-checklist.md`

**Procedure:**
1. Locate the backup export file
2. Validate backup is from trusted timestamp
3. Re-import using `06_import_metadata.ps1`
4. Verify restored data
5. Re-run registry validation

### Scenario 4: Full Site Reset (Re-provisioning)

**Use when:** The site needs to be completely rebuilt.

**Procedure:**
1. Export all metadata (backup)
2. Record site configuration (deployment/discovery/)
3. Delete the site (via SharePoint Admin Center)
4. Re-provision using deployment/powershell/ scripts
5. Re-import metadata from backup

## Safety Rules

| Rule | Description |
|------|-------------|
| Manual confirmation required | All destructive operations require user type 'yes' |
| Backup before destroy | Export metadata before any deletion |
| Audit trail | Log all rollback operations |
| Least privilege | Only Owners can perform rollbacks |
| No auto-cleanup | Never schedule automatic content deletion |
