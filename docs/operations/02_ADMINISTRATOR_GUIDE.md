# MJU-DRP Administrator Guide

**Version:** 1.0.0
**Status:** READY — 2026-07-06
**Audience:** SharePoint Administrators deploying and managing the MJU-DRP SharePoint environment

---

## 1. Overview

The MJU-DRP SharePoint environment is an operational workspace where staff upload, manage, and review documents. The MJU-DRP Registry Core (this GitHub repository) validates and publishes metadata.

As an administrator, your responsibilities include:
- Provisioning the SharePoint site and structure
- Managing permissions and access
- Uploading and maintaining documents
- Exporting metadata for registry validation
- Monitoring site health

## 2. Prerequisites

### Software
- PnP.PowerShell 2.x+: `Install-Module PnP.PowerShell -Scope CurrentUser`
- PowerShell 7+: Download from https://github.com/PowerShell/PowerShell

### Permissions
- SharePoint Administrator role (or equivalent)
- Access to Microsoft 365 Admin Center
- Permission to create sites

### Information Needed
- Tenant hostname (e.g., `maejo365.sharepoint.com`)
- Site owner email address
- Site URL (e.g., `https://maejo365.sharepoint.com/sites/MJUDocumentRegistry`)

## 3. Deployment Sequence

### Step 1: Configure

Edit `pilot/pilot-site-config.json` with real tenant values:

```json
{
  "Tenant": {
    "hostname": "maejo365.sharepoint.com",
    "tenant_id": "your-tenant-id"
  },
  "Site": {
    "url": "https://maejo365.sharepoint.com/sites/MJUDocumentRegistry",
    "owner_email": "admin@maejo365.onmicrosoft.com"
  }
}
```

### Step 2: Dry-Run

```powershell
.\deployment\powershell\run-pilot-deployment.ps1
```

Review the printed actions. No real changes are made.

### Step 3: Execute

```powershell
.\deployment\powershell\run-pilot-deployment.ps1 -Execute
```

Type `DEPLOY PILOT` to confirm.

### Step 4: Verify

```powershell
.\deployment\powershell\run-pilot-verification.ps1 -SiteUrl "https://maejo365.sharepoint.com/sites/MJUDocumentRegistry"
```

Check `deployment/reports/pilot-verification-report-*.md` for results.

### Step 5: Export Metadata

```powershell
.\deployment\powershell\export-pilot-metadata.ps1 -SiteUrl "<url>" -Execute
```

Check `pilot/exports/` for CSV and JSON exports.

## 4. Manual Configuration (if PowerShell is unavailable)

If PnP.PowerShell is not available, configure the SharePoint site manually:

1. Create Communication Site via SharePoint Admin Center
2. Create 6 libraries: DRP Documents, DRP Evidence, DRP Templates, DRP Archive, DRP Working Area, DRP Source Data
3. Enable versioning on DRP Documents, Evidence, Templates, Working Area
4. Create 22 site columns (defined in `provisioning/columns/`)
5. Create 5 lists: DRP Categories, DRP Projects, DRP Owners, Metadata QA Queue, Registry Review Queue
6. Create 13 views
7. Create 7 permission groups
8. Assign members to groups

## 5. Managing Permissions

### Permission Groups

| Group | Level | Members |
|-------|-------|---------|
| DRP Owners | Full Control | Site administrators |
| DRP Editors | Contribute | Document editors |
| DRP Reviewers | Contribute | Quality reviewers |
| DRP Readers | Read | Internal staff |
| DRP External Readers | Read | External stakeholders |
| DRP API Access | Read | Service accounts |
| DRP Compliance | Read | Auditors |

### Adding Members

Via SharePoint:
1. Site Settings → Site Permissions
2. Select group
3. Add members

## 6. Document Lifecycle

```
Draft (DRP Working Area)
  → Review (DRP Documents, status: review)
  → Approved (DRP Documents, status: approved)
  → Published (DRP Documents, status: published)
  → Archived (DRP Archive)
```

## 7. Exporting Metadata for Registry

For manual export (when PowerShell is unavailable):

1. Navigate to DRP Documents library
2. Select "Export to Excel" in the toolbar
3. Save the exported XLSX
4. Convert to CSV or JSON
5. Place in `pilot/exports/`
6. Run: `node scripts/import-pilot-metadata.mjs`

## 8. Health Checks

### PowerShell Health Check

```powershell
.\deployment\health\health-check.ps1 -SiteUrl "<url>"
```

### Manual Health Check

Use `docs/pilot/02_PILOT_HEALTH_CHECK.md` for a comprehensive checklist.

## 9. Rollback

If the deployment fails or needs to be undone:

1. Run rollback scripts: `deployment/rollback/remove-demo-content.ps1`
2. Archive metadata: `deployment/rollback/archive-metadata.ps1`
3. Delete site via SharePoint Admin Center (if needed)
4. Follow `deployment/rollback/restore-checklist.md` for restoration

## 10. Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Script fails with authentication error | Not connected to SharePoint | Uncomment `Connect-PnPOnline` lines |
| Site creation fails | URL already exists | Choose a different URL |
| Column creation fails | Column already exists | Scripts are idempotent — safe to re-run |
| Permission group creation fails | Insufficient permissions | Request SharePoint Admin role |
| Metadata import fails | CSV format mismatch | Check column headers match template |
| Verification checks fail | Site not fully configured | Re-run missing phase scripts |
