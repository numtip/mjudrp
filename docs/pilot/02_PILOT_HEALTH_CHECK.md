# Pilot Health Check — MJU-DRP SharePoint Pilot

**Status:** DRAFT — 2026-07-06
**Last Updated:** PENDING — update after pilot execution

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| Pilot Site Created | ❌ PENDING | Execute pilot deployment |
| Libraries Created (6/6) | ❌ PENDING | Verify with verification script |
| Columns Created (22/22) | ❌ PENDING | Verify with verification script |
| Lists Created (5/5) | ❌ PENDING | Verify with verification script |
| Views Created (13/13) | ❌ PENDING | Verify with verification script |
| Permissions Configured (7/7) | ❌ PENDING | Verify with verification script |
| Versioning Enabled | ❌ PENDING | Check library settings |
| Test Documents Uploaded | ❌ PENDING | See pilot-document-sample-list.md |
| Metadata Exported | ❌ PENDING | Check pilot/exports/ |
| MJU-DRP Validation | ❌ PENDING | Run validate-pilot.mjs |

## 1. Libraries Created

| Library | Exists | Versioning | Approval | Content Types |
|---------|--------|------------|----------|---------------|
| DRP Documents | ❌ | ❌ | ❌ | ❌ |
| DRP Evidence | ❌ | ❌ | ❌ | ❌ |
| DRP Templates | ❌ | ❌ | ❌ | ❌ |
| DRP Archive | ❌ | ❌ | ❌ | ❌ |
| DRP Working Area | ❌ | ❌ | ❌ | ❌ |
| DRP Source Data | ❌ | ❌ | ❌ | ❌ |

## 2. Columns Created

| # | Column Name | Type | Required | Created |
|---|-------------|------|----------|---------|
| 1 | DRP Document ID | Text (single line) | ✅ | ❌ |
| 2 | Title | Text (single line) | ✅ | ❌ |
| 3 | Description | Text (multiple lines) | ❌ | ❌ |
| 4 | Category | Choice | ✅ | ❌ |
| 5 | Subcategory | Choice | ❌ | ❌ |
| 6 | Fiscal Year | Text (single line) | ❌ | ❌ |
| 7 | Year | Number | ❌ | ❌ |
| 8 | Version | Text (single line) | ❌ | ❌ |
| 9 | Status | Choice | ❌ | ❌ |
| 10 | Owner | Choice | ✅ | ❌ |
| 11 | Department | Text (single line) | ❌ | ❌ |
| 12 | Keywords | Text (multiple lines) | ❌ | ❌ |
| 13 | Tags | Text (multiple lines) | ❌ | ❌ |
| 14 | Language | Choice | ❌ | ❌ |
| 15 | File Type | Text (single line) | ❌ | ❌ |
| 16 | Project Refs | Text (multiple lines) | ✅ | ❌ |
| 17 | Evidence Refs | Text (multiple lines) | ❌ | ❌ |
| 18 | Related Documents | Text (multiple lines) | ❌ | ❌ |
| 19 | Visibility | Choice | ❌ | ❌ |
| 20 | Share URL | Hyperlink | ❌ | ❌ |
| 21 | Created By | Person (auto) | ❌ | ✅ (built-in) |
| 22 | Modified By | Person (auto) | ❌ | ✅ (built-in) |

## 3. Views Created

| Library | View Name | Type | Created |
|---------|-----------|------|---------|
| DRP Documents | All Documents | Default | ❌ |
| DRP Documents | By Category | Grouped | ❌ |
| DRP Documents | By Status | Filtered | ❌ |
| DRP Evidence | All Evidence | Default | ❌ |
| DRP Evidence | By Project | Grouped | ❌ |
| DRP Templates | All Templates | Default | ❌ |
| DRP Archive | Archived Documents | Default | ❌ |
| DRP Archive | By Year | Grouped | ❌ |
| DRP Working Area | My Drafts | Personal | ❌ |
| DRP Working Area | All Items | Default | ❌ |
| Administration | Metadata Review | Filtered | ❌ |
| Administration | Registry Queue | Filtered | ❌ |
| Administration | Recent Changes | Sorted | ❌ |

## 4. Lists Created

| List | Exists | Items Added | Purpose |
|------|--------|-------------|---------|
| DRP Categories | ❌ | 0 | Controlled vocabulary for document categories |
| DRP Projects | ❌ | 0 | Registered consumer projects |
| DRP Owners | ❌ | 0 | Document owners and stewards |
| Metadata QA Queue | ❌ | 0 | Documents pending metadata quality review |
| Registry Review Queue | ❌ | 0 | Documents pending registry publication review |

## 5. Permissions Configured

| Group | Permission Level | Members | Created |
|-------|-----------------|---------|---------|
| DRP Owners | Full Control | Site Owner | ❌ |
| DRP Editors | Contribute | TBD | ❌ |
| DRP Reviewers | Contribute | TBD | ❌ |
| DRP Readers | Read | TBD | ❌ |
| DRP External Readers | Read | TBD | ❌ |
| DRP API Access | Read | TBD | ❌ |
| DRP Compliance | Read | TBD | ❌ |

## 6. Versioning Enabled

| Library | Versioning | Minor Versions | Draft Approval |
|---------|------------|----------------|----------------|
| DRP Documents | ✅ Expected | ❌ | ✅ Expected |
| DRP Evidence | ✅ Expected | ❌ | ✅ Expected |
| DRP Templates | ✅ Expected | ❌ | ❌ |
| DRP Archive | ❌ | ❌ | ❌ |
| DRP Working Area | ✅ Expected | ✅ Expected | ❌ |
| DRP Source Data | ❌ | ❌ | ❌ |

## 7. Test Documents Uploaded

| Document ID | Library | Uploaded | Metadata Applied |
|-------------|---------|----------|-----------------|
| PILOT-001 | DRP Documents | ❌ | ❌ |
| PILOT-002 | DRP Documents | ❌ | ❌ |
| PILOT-003 | DRP Documents | ❌ | ❌ |
| PILOT-004 | DRP Documents | ❌ | ❌ |
| PILOT-005 | DRP Documents | ❌ | ❌ |
| EVD-PILOT-001 | DRP Evidence | ❌ | ❌ |
| EVD-PILOT-002 | DRP Evidence | ❌ | ❌ |
| EVD-PILOT-003 | DRP Evidence | ❌ | ❌ |
| EVD-PILOT-004 | DRP Evidence | ❌ | ❌ |
| EVD-PILOT-005 | DRP Evidence | ❌ | ❌ |

## 8. Metadata Exported

| Format | File | Exists | Records |
|--------|------|--------|---------|
| CSV | `pilot/exports/pilot-metadata-export.csv` | ❌ | 0 |
| JSON | `pilot/exports/pilot-metadata-export.json` | ❌ | 0 |

## 9. MJU-DRP Validation Result

| Validation | Result | Errors | Warnings |
|-----------|--------|--------|----------|
| Import Report | ❌ PENDING | — | — |
| Pilot Validation | ❌ PENDING | — | — |
| Registry Validation | ❌ PENDING | — | — |

---

*This health check must be updated after each phase of the pilot deployment.*
