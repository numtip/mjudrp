# MJU-DRP Rollback Quick Guide

**Version:** 1.0.0
**Status:** READY — 2026-07-06
**Reference:** `deployment/rollback/rollback-guide.md` (full guide)

---

## 1. When to Roll Back

Roll back if any of these occur after deployment:
- Validation checks fail (site, libraries, columns, lists, views, permissions)
- Metadata export fails or produces corrupted data
- Pilot documents cannot be uploaded
- Permission groups are misconfigured
- Site is inaccessible or misconfigured
- Any unexpected behavior affecting operation readiness

## 2. Rollback Levels

### Level 1: Remove Demo Content (Fastest)

Remove pilot documents and test metadata. Site structure remains.

```powershell
.\deployment\rollback\remove-demo-content.ps1 -SiteUrl "<url>"
```

### Level 2: Archive Metadata

Export existing metadata before making structural changes.

```powershell
.\deployment\rollback\archive-metadata.ps1 -SiteUrl "<url>" -OutputDir "pilot/archives/"
```

### Level 3: Delete Site (Full Reset)

Delete the entire SharePoint site. Requires SharePoint Admin Center.

1. Go to SharePoint Admin Center
2. Navigate to Active Sites
3. Search for "MJU Document Registry"
4. Select → Delete
5. Confirm deletion

### Level 4: Restore from Snapshot (Graph Future)

When Graph integration is available, restore metadata from the last successful export.

Follow `deployment/rollback/restore-checklist.md` for restoration steps.

## 3. Rollback Decision Tree

```
Is the site accessible?
  ├── YES → Can you upload documents?
  │         ├── YES → Level 1: Remove demo content only
  │         └── NO  → Level 2: Archive metadata, then Level 1
  └── NO  → Is the site partially created?
            ├── YES → Level 2: Archive what exists, then Level 3
            └── NO  → Level 3: Delete site
```

## 4. Quick Commands

```powershell
# Remove demo content
.\deployment\rollback\remove-demo-content.ps1 -SiteUrl "https://tenant.sharepoint.com/sites/MJUDocumentRegistry"

# Archive metadata before structural changes
.\deployment\rollback\archive-metadata.ps1 -SiteUrl "<url>" -OutputDir "pilot/archives/"

# Verify content removed
.\deployment\powershell\run-pilot-verification.ps1 -SiteUrl "<url>"
```

## 5. Post-Rollback Steps

1. Verify content is removed through SharePoint Admin Center
2. Confirm no residual items remain in libraries
3. Optionally delete the site via SharePoint Admin Center
4. Document the rollback reason in `pilot/generated/rollback-log.md`
5. Fix the issue that caused the rollback
6. Re-run dry-deployment
7. Re-deploy with corrected configuration

## 6. Rollback Precautions

| Precaution | Action |
|-----------|--------|
| Always archive first | Run `archive-metadata.ps1` before destructive operations |
| Never delete without backup | Ensure metadata is exported before site deletion |
| Document the issue | Write a rollback log entry |
| Notify stakeholders | Inform project owner and SharePoint admin |
| Test rollback scripts | Run in pilot first, not in production |

## 7. Full Guide

For complete rollback documentation, see:
`deployment/rollback/rollback-guide.md`
`deployment/rollback/restore-checklist.md`
