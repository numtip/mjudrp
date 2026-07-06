# SharePoint Metadata Strategy — Architecture Verification

## Scope

This certification verifies the **architecture and strategy** for SharePoint metadata alignment with MJU-DRP. No SharePoint access was performed — verification is based on documented SharePoint capabilities and Microsoft 365 documentation.

## Architecture Components

### 1. Document Library

| Capability | Verified | Notes |
|------------|----------|-------|
| Document storage | ✅ | Primary storage for all MJU-DRP binary files |
| Folder hierarchy | ✅ | Can be organized by project/category |
| Version history | ✅ | Built-in (major/minor versions) |
| Metadata columns | ✅ | Can be added as site columns |
| Check-out/in | ✅ | Available for document control |
| Thumbnail/preview | ✅ | SharePoint auto-generates previews |

**Recommendation:** Each project gets a SharePoint site with Document Libraries organized by category matching the registry taxonomy.

### 2. Columns (Metadata)

| MJU-DRP Field | SharePoint Column Type | Compatible |
|---------------|----------------------|------------|
| id | Text / Calculated | ✅ Can be formula-generated |
| title | Single line of text | ✅ Direct match |
| category | Choice / Lookup | ✅ Can use Term Store or Choice |
| owner | Person or Group | ✅ Maps to SharePoint user |
| year | Number / Choice | ✅ |
| status | Choice | ✅ "draft/review/approved/archived/superseded" |
| language | Choice | ✅ "th/en/both" |
| file_type | Calculated / Text | ✅ Auto-populated from file extension |
| keywords | Multiple lines / Taxonomy | ✅ Can use Enterprise Keywords |
| project_refs | Multiple lines / Lookup | ✅ Multiple lines or multi-value lookup |
| visibility | Choice | ✅ "public/internal/confidential/restricted" |

**Recommendation:** Define SharePoint site columns matching registry schema fields. This enables cross-site metadata consistency.

### 3. Lists

| Capability | Verified | Notes |
|------------|----------|-------|
| Registry as list | ✅ | SharePoint List can mirror registry data |
| JSON formatting | ✅ | Custom JSON view formatting available |
| Power Automate integration | ✅ | Flows for notifications/updates |
| Excel Online export | ✅ | List data can be exported to Excel |

**Recommendation:** Use SharePoint Lists as an optional metadata management interface. Git remains the source of truth — Lists are a convenience view.

### 4. Metadata Navigation

| Capability | Verified | Notes |
|------------|----------|-------|
| Managed metadata (Term Store) | ✅ | Enterprise taxonomy management |
| Enterprise Keywords | ✅ | Ad-hoc tagging |
| Content Types | ✅ | Reusable column sets |
| Document Information Panel | ✅ | In-editor metadata editing |

**Recommendation:** Defer Term Store setup until taxonomy exceeds ~20 categories. Start with Choice columns and Enterprise Keywords.

### 5. Version Control

| Capability | Verified | Notes |
|------------|----------|-------|
| Major versioning | ✅ | 1.0, 2.0, etc. |
| Minor versioning (draft) | ✅ | 0.1, 0.2, etc. |
| Version history limit | ✅ | Configurable |
| Content approval | ✅ | Optional workflow |

**Recommendation:** Enable major versioning with content approval for official documents. Minor versioning for draft documents.

### 6. Permissions

| Capability | Verified | Notes |
|------------|----------|-------|
| Site-level permissions | ✅ | Owners/Members/Visitors |
| Library-level permissions | ✅ | Break inheritance |
| Item-level permissions | ✅ | Per-document permissions |
| Sharing links | ✅ | Specific people / Org / Anyone |
| Anonymous access | ✅ | Configurable |

**Recommendation:** Manage permissions at the SharePoint site level. Use sharing links for document access. MJU-DRP's `visibility` field is advisory — actual enforcement is in SharePoint.

## Suggested Folder Taxonomy

```
Project Site: /sites/{ProjectName}
  └── Shared Documents
      ├── 01-Plans/          (category: plan)
      ├── 02-Guidelines/     (category: guideline)
      ├── 03-Reports/        (category: report)
      ├── 04-Templates/      (category: template)
      ├── 05-Evidence/       (category: evidence)
      └── 06-Archived/       (status: archived)
```

Numbered prefixes maintain sort order matching registry category priority.

## Limitations

1. **No automation** — Metadata synchronization between SharePoint and MJU-DRP is manual during MVP. Microsoft Graph API integration is deferred.
2. **No Term Store yet** — Taxonomy is small enough for Choice columns during MVP.
3. **Manual column creation** — SharePoint columns must be created manually in each site.
4. **No cross-site queries** — SharePoint doesn't easily query metadata across sites without Graph API.

## Certification Decision

**Status: CERTIFIED**

| Component | Verdict |
|-----------|---------|
| Document Library storage | ✅ Ready |
| Column metadata alignment | ✅ Feasible with site columns |
| Lists as metadata view | ✅ Available |
| Version control | ✅ Built-in |
| Permissions | ✅ Managed in M365 |
| Folder taxonomy | ✅ Proposed, ready for implementation |

## Risk

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Column changes need site admin | Medium | Low | Document procedure for column updates |
| Manual sync errors | Medium | Medium | Use validation script before commits |
| Permission drift | Low | Medium | Audit quarterly |

## Recommendation

**Document the SharePoint site provisioning procedure in the project wiki.** Create a checklist for setting up new project sites with the recommended Document Library structure, columns, and permissions. This can be implemented without any Graph API integration.

## Next Review

When a new project site needs to be provisioned, or when taxonomy exceeds capabilities of Choice columns.
