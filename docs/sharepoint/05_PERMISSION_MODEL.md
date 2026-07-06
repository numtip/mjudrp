# Permission Model

**Status:** BLUEPRINT — 2026-07-06

---

## Security Groups

### SharePoint Groups

Create these SharePoint groups on the MJU Document Registry site:

| Group | SharePoint Permission Level | Members | Scope |
|-------|---------------------------|---------|-------|
| **DRP Owners** | Full Control | Project owner, maintainers | Site-wide |
| **DRP Editors** | Contribute | Document authors, metadata editors | All libraries |
| **DRP Reviewers** | Contribute (read + edit metadata) | QA staff, auditors | DRP Documents, DRP Evidence |
| **DRP Readers** | Read | All staff, consumer project teams | Public documents only |
| **DRP Auditors** | Read (all content) | Internal audit, QA management | All libraries (including restricted) |
| **DRP AI Service Account** | Read | Future Graph service account | All libraries (read-only) |
| **Project Owners** | Read (by project scope) | Green Office, RAE, LC, RP leads | Project-filtered views |

### Principle of Least Privilege

| Group | Can Create | Can Edit | Can Delete | Can Manage Permissions |
|-------|-----------|---------|-----------|----------------------|
| DRP Owners | ✅ | ✅ | ✅ | ✅ |
| DRP Editors | ✅ | ✅ | Own files only | ❌ |
| DRP Reviewers | ❌ | ✅ (metadata only) | ❌ | ❌ |
| DRP Readers | ❌ | ❌ | ❌ | ❌ |
| DRP Auditors | ❌ | ❌ | ❌ | ❌ |
| DRP AI Service Account | ❌ | ❌ | ❌ | ❌ |
| Project Owners | ❌ | ❌ | ❌ | ❌ |

## Library-Level Permissions

| Library | DRP Readers | DRP Auditors | Other Notes |
|---------|------------|-------------|-------------|
| DRP Documents | Public docs only | All | Break inheritance for restricted documents |
| DRP Evidence | ❌ | ✅ | Internal only |
| DRP Source Data | ❌ | ✅ | Internal only |
| DRP Templates | ✅ | ✅ | Public templates |
| DRP Archive | ❌ | ✅ | Internal only |
| DRP Working Area | ❌ | ❌ | Contributors only |

## Public vs Internal Documents

The `Visibility` metadata column controls document-level access:

| Visibility | SharePoint Setting | Registry Output |
|------------|-------------------|-----------------|
| Public | Shared with "Everyone except external" | Included in registry, public |
| Internal | Site members only | Included in registry, internal |
| Confidential | DRP Owners + specific editors | Included in registry, confidential |
| Restricted | Named group only | Excluded from registry (or flagged) |

## Read-Only Sync Account (Future Graph)

When Microsoft Graph read-only sync is implemented:

| Attribute | Recommendation |
|-----------|---------------|
| Account type | Application (not user) |
| Permission | `Sites.Selected` (not tenant-wide) |
| Scope | Read all files and metadata in MJU Document Registry site |
| Write access | **NONE** — Graph write-back is deferred |
| Secret rotation | Annual rotation or managed identity |
| Approval | Requires admin consent in Entra ID |

## Why Write Automation Is Deferred

1. **Risk of data corruption** — Automated write-back could overwrite human-curated metadata
2. **Permission complexity** — Least-privilege write access requires scoped application permissions
3. **No undo mechanism** — SharePoint does not have git-style rollback for metadata changes
4. **Validation gap** — Automated writes could bypass AJV validation
5. **Architecture principle** — GitHub is source of truth; SharePoint is operational workspace. Write-back would reverse this

## Future Graph Permission Preference

| Priority | Permission | Scope | Notes |
|----------|-----------|-------|-------|
| 1 | `Sites.Selected` | Single site | Most restrictive, preferred |
| 2 | `Sites.Read.All` | All sites | Broader, needs justification |
| 3 | `Files.Read.All` | All files | Even broader, not recommended |

**No tenant-wide permissions** will be requested without explicit project owner approval.
