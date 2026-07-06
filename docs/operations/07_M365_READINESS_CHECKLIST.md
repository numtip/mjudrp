# Microsoft 365 Readiness Checklist — MJU-DRP

**Version:** 1.0.0
**Status:** READY — 2026-07-06
**Audience:** SharePoint Administrators and Entra ID administrators preparing for MJU-DRP Graph integration

---

## Purpose

This checklist captures everything required before the Microsoft Graph Read-only Adapter (Sprint 3E) can be implemented. Complete each item after the SharePoint pilot site is provisioned.

## Prerequisites

| # | Item | Status | Who | Notes |
|---|------|--------|-----|-------|
| 1 | SharePoint pilot site is provisioned and verified | ❌ PENDING | SharePoint Admin | Run pilot deployment first |
| 2 | Pilot verification report shows all PASS | ❌ PENDING | SharePoint Admin | Run `run-pilot-verification.ps1` |
| 3 | Pilot metadata exported and validated | ❌ PENDING | Registry Operator | Run `export-pilot-metadata.ps1` + `validate-pilot.mjs` |

## Entra ID App Registration

| # | Item | Details | Status | Who |
|---|------|---------|--------|-----|
| 1 | Create app registration in Entra ID | Name: `MJU-DRP Graph Adapter` | ❌ PENDING | Entra ID Admin |
| 2 | Set supported account types | `Accounts in this organizational directory only` | ❌ PENDING | Entra ID Admin |
| 3 | Configure application permissions (not delegated) | For CI/unattended operation | ❌ PENDING | Entra ID Admin |
| 4 | Request `Sites.Selected` permission | Application permission, not delegated | ❌ PENDING | Entra ID Admin |
| 5 | Record Client ID | Store as `__CLIENT_ID__` | ❌ PENDING | Entra ID Admin |
| 6 | Record Tenant ID | Store as `__TENANT_ID__` | ❌ PENDING | Entra ID Admin |
| 7 | Generate Client Secret | Store in GitHub Secrets as `GRAPH_CLIENT_SECRET` | ❌ PENDING | Entra ID Admin |
| 8 | Set secret expiration reminder | Rotate every 6 months | ❌ PENDING | Entra ID Admin |
| 9 | No redirect URI needed | App-only flow — no user sign-in | ✅ NOT NEEDED | — |

## Sites.Selected Configuration

| # | Item | Details | Status | Who |
|---|------|---------|--------|-----|
| 1 | Submit admin consent request | Send to MJU IT/Entra ID admin | ❌ PENDING | Project Owner |
| 2 | Admin grants consent | Via Azure Portal or Microsoft 365 Admin Center | ❌ PENDING | MJU IT |
| 3 | Grant app access to pilot site | Via PnP: `Grant-PnPAzureADAppSitePermission` | ❌ PENDING | SharePoint Admin |
| 4 | Verify app can read site metadata | Test Graph connectivity | ❌ PENDING | Developer |

## Site Information (Obtain After Provisioning)

| # | Item | How to Obtain | Status |
|---|------|--------------|--------|
| 1 | Site URL | From deployment config | ❌ PENDING |
| 2 | Site ID | `GET /sites?search=MJUDocumentRegistry` | ❌ PENDING |
| 3 | DRP Documents Drive ID | `GET /sites/{site-id}/drives` | ❌ PENDING |
| 4 | DRP Evidence Drive ID | `GET /sites/{site-id}/drives` | ❌ PENDING |
| 5 | DRP Templates Drive ID | `GET /sites/{site-id}/drives` | ❌ PENDING |
| 6 | DRP Archive Drive ID | `GET /sites/{site-id}/drives` | ❌ PENDING |
| 7 | DRP Working Area Drive ID | `GET /sites/{site-id}/drives` | ❌ PENDING |
| 8 | DRP Source Data Drive ID | `GET /sites/{site-id}/drives` | ❌ PENDING |
| 9 | DRP Categories List ID | `GET /sites/{site-id}/lists` | ❌ PENDING |
| 10 | DRP Projects List ID | `GET /sites/{site-id}/lists` | ❌ PENDING |
| 11 | DRP Owners List ID | `GET /sites/{site-id}/lists` | ❌ PENDING |
| 12 | Metadata QA Queue List ID | `GET /sites/{site-id}/lists` | ❌ PENDING |
| 13 | Registry Review Queue List ID | `GET /sites/{site-id}/lists` | ❌ PENDING |

## Column Internal Names (Verify After Provisioning)

| # | Schema Property | Expected Internal Name | Verified | Notes |
|---|----------------|----------------------|----------|-------|
| 1 | `id` | `DRP_x0020_Document_x0020_ID` | ❌ | |
| 2 | `title` | `Title` | ❌ | Built-in |
| 3 | `description` | `DRP_x0020_Description` | ❌ | |
| 4 | `category` | `DRP_x0020_Category` | ❌ | |
| 5 | `subcategory` | `DRP_x0020_Subcategory` | ❌ | |
| 6 | `fiscal_year` | `DRP_x0020_Fiscal_x0020_Year` | ❌ | |
| 7 | `year` | `DRP_x0020_Year` | ❌ | |
| 8 | `version` | `DRP_x0020_Version` | ❌ | |
| 9 | `status` | `DRP_x0020_Status` | ❌ | |
| 10 | `owner` | `DRP_x0020_Owner` | ❌ | |
| 11 | `department` | `DRP_x0020_Department` | ❌ | |
| 12 | `keywords` | `DRP_x0020_Keywords` | ❌ | |
| 13 | `tags` | `DRP_x0020_Tags` | ❌ | |
| 14 | `language` | `DRP_x0020_Language` | ❌ | |
| 15 | `file_type` | `FileType` | ❌ | Built-in |
| 16 | `project_refs` | `DRP_x0020_Project_x0020_Refs` | ❌ | |
| 17 | `evidence_refs` | `DRP_x0020_Evidence_x0020_Refs` | ❌ | |
| 18 | `related_documents` | `DRP_x0020_Related_x0020_Documents` | ❌ | |
| 19 | `visibility` | `DRP_x0020_Visibility` | ❌ | |
| 20 | `share_url` | `DRP_x0020_Share_x0020_URL` | ❌ | |
| 21 | `storage_path` | `FileLeafRef` | ❌ | Built-in |
| 22 | `created_at` | `Created` | ❌ | Built-in |
| 23 | `updated_at` | `Modified` | ❌ | Built-in |

**Note:** Verify internal names using `deployment/discovery/discover-columns.ps1` after provisioning.

## Content Type IDs (Verify After Provisioning)

| Content Type | Expected ID | Verified |
|-------------|-------------|----------|
| DRP Document | `0x01########` (auto-generated) | ❌ |
| DRP Evidence | `0x01########` (auto-generated) | ❌ |
| DRP Template | `0x01########` (auto-generated) | ❌ |
| DRP Archive | `0x01########` (auto-generated) | ❌ |

## Authentication Readiness

| # | Item | Status | Who |
|---|------|--------|-----|
| 1 | Client ID available (non-secret) | ❌ PENDING | Entra ID Admin |
| 2 | Tenant ID available (non-secret) | ❌ PENDING | Entra ID Admin |
| 3 | Client Secret stored in GitHub Secrets | ❌ PENDING | Project Owner |
| 4 | Admin consent completed | ❌ PENDING | MJU IT |
| 5 | Sites.Selected granted to pilot site | ❌ PENDING | SharePoint Admin |
| 6 | Graph connection test passes (local) | ❌ PENDING | Developer |
| 7 | Graph connection test passes (CI) | ❌ PENDING | Developer |

## Next Steps After This Checklist Is Complete

1. All items above must be ✅ COMPLETE
2. Update `environment/graph-inventory.template.json` with real values
3. Begin Sprint 3E — Microsoft Graph Read-only Adapter
4. Build `scripts/graph-adapter.mjs` (read-only, Sites.Selected)
5. Validate metadata round-trip
6. CI integration for automated sync

---

**Do not begin Graph adapter implementation until all items are complete.**
