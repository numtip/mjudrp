# Microsoft Graph Readiness

**Status:** READINESS ASSESSMENT — 2026-07-06
**Next Step:** Not yet implemented. This document identifies prerequisites.

---

## Preconditions for Graph Implementation

Before any Microsoft Graph API integration, these items must be confirmed:

### 1. Entra ID App Registration

| Item | Required | Notes |
|------|----------|-------|
| App registration in Entra ID | ✅ | Create a new app registration for MJU-DRP |
| Application (not delegated) permissions | ✅ | Service account runs unattended in CI |
| Redirect URI | ❌ | Not needed (no user sign-in) |
| Client secret or certificate | ✅ | For application authentication |
| Admin consent | ✅ | Required for application permissions |

### 2. Graph Permissions

| Permission | Required | Scope | Justification |
|-----------|----------|-------|--------------|
| `Sites.Selected` | ✅ Yes (preferred) | Single site | Read metadata from MJU Document Registry site |
| `Sites.Read.All` | ❌ No | Tenant-wide | Too broad for MVP |
| `Files.Read.All` | ❌ No | All files | Too broad for MVP |
| `User.Read.All` | ❌ No | User directory | Not needed for metadata sync |

### 3. SharePoint Site Information

| Item | How to Obtain | Example |
|------|--------------|---------|
| Site ID | Graph `GET /sites?search=MJUDocumentRegistry` | `mju365.sharepoint.com,abc-123,def-456` |
| Drive ID (Documents) | Graph `GET /sites/{site-id}/drives` | `b!abc123` |
| Drive ID (Evidence) | Graph `GET /sites/{site-id}/drives` | `b!def456` |
| List IDs | Graph `GET /sites/{site-id}/lists` | `{list-guid}` |
| Column internal names | Graph `GET /sites/{site-id}/lists/{list-id}/columns` | `DRP_x0020_Document_x0020_ID` |

### 4. Column Internal Names

SharePoint creates internal names when columns are created. These must be mapped to schema properties:

| Schema Property | Expected Column Internal Name | SharePoint Column Name |
|----------------|------------------------------|----------------------|
| `id` | `DRP_x0020_Document_x0020_ID` | DRP Document ID |
| `title` | `Title` | Title |
| `description` | `DRP_x0020_Description` | Description |
| `category` | `DRP_x0020_Category` | Category |
| `subcategory` | `DRP_x0020_Subcategory` | Subcategory |
| `fiscal_year` | `DRP_x0020_Fiscal_x0020_Year` | Fiscal Year |
| `year` | `DRP_x0020_Year` | Year |
| `version` | `DRP_x0020_Version` | Version |
| `status` | `DRP_x0020_Status` | Status |
| `owner` | `DRP_x0020_Owner` | Owner |
| `department` | `DRP_x0020_Department` | Department |
| `keywords` | `DRP_x0020_Keywords` | Keywords |
| `tags` | `DRP_x0020_Tags` | Tags |
| `language` | `DRP_x0020_Language` | Language |
| `file_type` | `FileType` | File Type (auto) |
| `project_refs` | `DRP_x0020_Project_x0020_Refs` | Project Refs |
| `evidence_refs` | `DRP_x0020_Evidence_x0020_Refs` | Evidence Refs |
| `related_documents` | `DRP_x0020_Related_x0020_Documents` | Related Documents |
| `visibility` | `DRP_x0020_Visibility` | Visibility |
| `share_url` | `DRP_x0020_Share_x0020_URL` | Share URL |
| `storage_path` | `FileLeafRef` | Name (auto) |

**Note:** Internal names may differ based on how columns are created (through UI or via REST API). Final mapping must be verified after site setup.

### 5. Admin Consent Process

1. Create app registration in Entra ID
2. Request `Sites.Selected` application permission
3. Submit admin consent request to MJU IT/Entra ID administrator
4. Admin grants consent
5. Graph API client authenticates and accesses only the permitted site

### 6. Authentication Strategy

| Environment | Auth Method | Secret Storage |
|------------|------------|---------------|
| Local development | Device code flow or app-only cert | `.env.local` (not committed) |
| CI (GitHub Actions) | Client secret or certificate | GitHub Secrets |
| Production | Managed identity (if Azure-hosted) or certificate | Azure Key Vault or GitHub Secrets |

### 7. Secret Management

| Secret | Type | Where Stored | Rotation |
|--------|------|-------------|----------|
| Client ID | Non-secret | GitHub Actions variable | N/A |
| Client Secret | Sensitive | GitHub Secrets | Every 6 months |
| Certificate thumbprint | Non-secret | GitHub Actions variable | On cert renewal |
| Tenant ID | Non-secret | GitHub Actions variable | N/A |

## Graph Integration Architecture (Future)

```
MJU Document Registry SharePoint Site
        │
        ▼  (Sites.Selected, read-only)
Microsoft Graph API
        │
        ▼  (authenticated client)
MJU-DRP Graph Adapter (scripts/graph-adapter.mjs)
        │
        ├── Read documents + metadata from libraries
        ├── Map SharePoint columns → Registry schema
        ├── Validate against AJV schemas
        └── Export as registry JSON
        │
        ▼
Human reviews → PR → Merge → Package release
```

## Implementation Order

| Phase | Action | Dependency |
|-------|--------|-----------|
| 1 | Site provisioning (Sprint 3B) | None (manual) |
| 2 | Add test documents, configure columns | Site exists |
| 3 | Create Entra ID app registration | IT approval |
| 4 | Configure Sites.Selected permission | Admin consent |
| 5 | Build read-only Graph adapter (script) | App registration ready |
| 6 | Validate metadata round-trip | Graph adapter working |
| 7 | CI integration for automated sync | Graph adapter tested |
