# Graph Readiness After Pilot — MJU-DRP

**Status:** DRAFT — 2026-07-06
**Precondition:** Pilot deployment completed and verified

---

## Purpose

This document captures the readiness assessment for implementing a Microsoft Graph read-only adapter after the SharePoint pilot deployment. It consolidates the site information, required permissions, and Entra ID app registration prerequisites needed for Graph integration.

## Confirmed Site Information

| Item | Value | Source |
|------|-------|--------|
| Site Name | `MJU Document Registry` | Pilot site config |
| Site URL | `[PLACEHOLDER — set after pilot]` | Pilot deployment |
| Site ID | `[PLACEHOLDER — requires Graph call]` | `GET /sites?search=MJUDocumentRegistry` |
| Tenant Hostname | `[PLACEHOLDER — set in config]` | `pilot/pilot-site-config.json` |
| Tenant ID | `[PLACEHOLDER — from Entra ID]` | Azure portal |

## Required Site ID

The Site ID is a composite value returned by Microsoft Graph in the format:
```
{tenant}.sharepoint.com,{site-collection-id},{site-id}
```

**How to obtain after pilot:**
```powershell
# Via PnP.PowerShell
$site = Get-PnPSite
$site.Id  # Returns the site collection ID

# Via Microsoft Graph (after app registration)
# GET https://graph.microsoft.com/v1.0/sites?search=MJUDocumentRegistry
```

## Required Drive IDs

Each document library in SharePoint has a unique Drive ID. After pilot deployment, discover these with:

| Library | Expected Drive ID |
|---------|------------------|
| DRP Documents | `[PLACEHOLDER — requires Graph call]` |
| DRP Evidence | `[PLACEHOLDER — requires Graph call]` |
| DRP Templates | `[PLACEHOLDER — requires Graph call]` |
| DRP Archive | `[PLACEHOLDER — requires Graph call]` |
| DRP Working Area | `[PLACEHOLDER — requires Graph call]` |
| DRP Source Data | `[PLACEHOLDER — requires Graph call]` |

**Discovery script:** `deployment/discovery/discover-libraries.ps1`

## Required List IDs

| List | Internal Name | Expected List ID |
|------|--------------|-----------------|
| DRP Categories | `DRP_x0020_Categories` | `[PLACEHOLDER]` |
| DRP Projects | `DRP_x0020_Projects` | `[PLACEHOLDER]` |
| DRP Owners | `DRP_x0020_Owners` | `[PLACEHOLDER]` |
| Metadata QA Queue | `Metadata_x0020_QA_x0020_Queue` | `[PLACEHOLDER]` |
| Registry Review Queue | `Registry_x0020_Review_x0020_Queue` | `[PLACEHOLDER]` |

**Discovery script:** `deployment/discovery/discover-lists.ps1`

## Required Column Internal Names

| Schema Property | Expected Internal Name (Approximate) |
|----------------|--------------------------------------|
| `id` | `DRP_x0020_Document_x0020_ID` |
| `title` | `Title` |
| `description` | `DRP_x0020_Description` |
| `category` | `DRP_x0020_Category` |
| `subcategory` | `DRP_x0020_Subcategory` |
| `fiscal_year` | `DRP_x0020_Fiscal_x0020_Year` |
| `year` | `DRP_x0020_Year` |
| `version` | `DRP_x0020_Version` |
| `status` | `DRP_x0020_Status` |
| `owner` | `DRP_x0020_Owner` |
| `department` | `DRP_x0020_Department` |
| `keywords` | `DRP_x0020_Keywords` |
| `tags` | `DRP_x0020_Tags` |
| `language` | `DRP_x0020_Language` |
| `file_type` | `FileType` |
| `project_refs` | `DRP_x0020_Project_x0020_Refs` |
| `evidence_refs` | `DRP_x0020_Evidence_x0020_Refs` |
| `related_documents` | `DRP_x0020_Related_x0020_Documents` |
| `visibility` | `DRP_x0020_Visibility` |
| `share_url` | `DRP_x0020_Share_x0020_URL` |
| `storage_path` | `FileLeafRef` |

**Note:** Internal names may differ. Run `deployment/discovery/discover-columns.ps1` to obtain the actual names after pilot deployment.

## Required Permissions

| Graph Permission | Required | Scope | Justification |
|-----------------|----------|-------|--------------|
| `Sites.Selected` | ✅ Yes | Single site | Read metadata from MJU Document Registry site |
| `Sites.Read.All` | ❌ No | Tenant-wide | Too broad for MVP — use Sites.Selected |
| `Files.Read.All` | ❌ No | All files | Too broad — restrict to selected site |
| `User.Read.All` | ❌ No | User directory | Not needed for metadata sync |

## Entra ID App Registration Checklist

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Create app registration in Entra ID | ❌ PENDING | Name: `MJU-DRP Graph Adapter` |
| 2 | Set application (not delegated) permissions | ❌ PENDING | For CI/unattended operation |
| 3 | Request `Sites.Selected` permission | ❌ PENDING | Must specify target site after pilot |
| 4 | Generate client secret or certificate | ❌ PENDING | Store securely in GitHub Secrets |
| 5 | Configure redirect URI | ❌ NOT NEEDED | No user sign-in required |
| 6 | Submit admin consent request | ❌ PENDING | Requires MJU Entra ID admin |
| 7 | Admin grants consent | ❌ PENDING | Follow MJU IT consent process |
| 8 | Test Graph connection | ❌ PENDING | After app registration + consent |
| 9 | Store credentials securely | ❌ PENDING | GitHub Secrets or Azure Key Vault |
| 10 | Document rotation policy | ❌ PENDING | Client secret: every 6 months |

## Sites.Selected Readiness

`Sites.Selected` is the recommended permission model for the Graph adapter:

**Advantages:**
- Restricts access to exactly one SharePoint site
- No tenant-wide permissions
- Follows least-privilege principle
- Aligns with MJU IT security requirements

**Steps to configure:**
1. Create app registration in Entra ID
2. Request `Sites.Selected` application permission (not delegated)
3. Submit admin consent request
4. After consent, grant access to the specific pilot site:
   ```powershell
   # Via PnP.PowerShell (requires SharePoint admin)
   Grant-PnPAzureADAppSitePermission `
     -AppId "<client-id>" `
     -DisplayName "MJU-DRP Graph Adapter" `
     -Site "<pilot-site-url>" `
     -Permissions Read
   ```
5. Verify Graph API can read lists, columns, and items from the permitted site

## Next Steps for Read-Only Graph Adapter

### Immediate (Post-Pilot)

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| 1 | Confirm pilot site URL and Site ID | SharePoint Admin | High |
| 2 | Run discovery scripts to capture column internal names | SharePoint Admin | High |
| 3 | Document all internal names in this report | AI Agent | Medium |
| 4 | Create Entra ID app registration | Entra ID Admin | High |
| 5 | Configure `Sites.Selected` permission | Entra ID Admin | High |
| 6 | Obtain admin consent | MJU IT | High |
| 7 | Test Graph connection from local environment | Developer | Medium |

### Sprint 3E — Graph Adapter Implementation

| # | Action | Artifact |
|---|--------|----------|
| 1 | Build read-only Graph adapter script | `scripts/graph-adapter.mjs` |
| 2 | Map SharePoint columns to Registry schema | Mapping table |
| 3 | Export documents as registry JSON | Pipeline output |
| 4 | Validate exported data against AJV schemas | Validation report |
| 5 | CI integration | GitHub Actions workflow |
| 6 | Consumer onboarding | Updated consumer guide |

### Authentication Flow (Future)

```
Entra ID App Registration
  (Client ID + Client Secret / Certificate)
        │
        ▼
Microsoft Graph API
  (Sites.Selected — scoped to pilot site)
        │
        ▼
MJU-DRP Graph Adapter Script
  ├── Read document library items → Map columns → Registry JSON
  ├── Read reference lists → Validate cross-refs
  ├── Export JSON → Human reviews → PR → Merge → Package release
  └── No write-back to SharePoint (read-only)
```

## Architecture Constraints

| Constraint | Description |
|-----------|-------------|
| Read-only | The Graph adapter must NOT write to SharePoint |
| No tenant-wide permissions | Use `Sites.Selected`, never `Sites.Read.All` |
| No file downloads | The adapter reads metadata only, not binary files |
| Human-in-the-loop | Exported metadata must be PR-reviewed before merging |
| Credentials never in repo | Secrets in GitHub Secrets or Key Vault only |

---

*This document must be updated after pilot deployment with real Site ID, Drive IDs, List IDs, and verified Column internal names.*
