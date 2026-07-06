# Rollback Guide

## Overview

The Rollback Kit provides safe procedures for reverting changes to the MJU Document Registry SharePoint environment.

## Rollback Assets

| Asset | Purpose |
|-------|---------|
| `rollback-guide.md` | Comprehensive rollback documentation |
| `remove-demo-content.ps1` | Interactive script to remove demo content |
| `archive-metadata.ps1` | Archive documents from active libraries |
| `restore-checklist.md` | Recovery verification checklist |

## Rollback Principles

1. **Manual confirmation required** — All destructive operations require user input
2. **Backup before rollback** — Export metadata before any deletion
3. **No automatic cleanup** — Never schedule automated content deletion
4. **Audit trail** — Document all rollback operations

## Scenarios

| Scenario | Script | Risk |
|----------|--------|------|
| Remove demo documents | `remove-demo-content.ps1` | Low |
| Archive old metadata | `archive-metadata.ps1` | Low |
| Restore from backup | Manual (see checklist) | Medium |
| Full site reset | Manual re-provisioning | High |

## Before Any Rollback

```bash
# 1. Export current metadata
.\deployment\powershell\08_export_metadata.ps1 -SiteUrl $SiteUrl

# 2. Create backup
Copy-Item "../reports/sharepoint-export.json" "../reports/backup-$(Get-Date -Format yyyyMMdd).json"

# 3. Document the change
```

## After Rollback

```bash
# 1. Verify the environment
.\deployment\powershell\07_verify_environment.ps1 -SiteUrl $SiteUrl

# 2. Run health check
.\deployment\health\health-check.ps1 -SiteUrl $SiteUrl

# 3. Run registry validation
node scripts/validate-registry.mjs
```
