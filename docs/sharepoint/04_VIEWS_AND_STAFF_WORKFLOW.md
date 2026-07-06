# Views and Staff Workflow

**Status:** BLUEPRINT — 2026-07-06

---

## Recommended Views

### DRP Documents Library Views

| View Name | Filter | Sort | Columns | Audience |
|-----------|--------|------|---------|----------|
| **All Active Documents** | Status ≠ Archived, Superseded | Updated At descending | All standard columns | General |
| **Missing Metadata** | Keywords = "" OR Category = "" | — | ID, Title, Owner, Missing fields | Editors, Reviewers |
| **Pending Review** | Status = "review" | Updated At ascending | ID, Title, Owner, Updated At, Version | Reviewers |
| **Green Office Evidence** | Project Refs contains "green-office-2026" | Fiscal Year descending | ID, Title, Status, Category, Year | GO2026 team |
| **RAE Landing Documents** | Project Refs contains "rae-landing" | Fiscal Year descending | ID, Title, Status, Category, Year | RAE team |
| **Learning Center Manuals** | Project Refs contains "learning-center" | Title ascending | ID, Title, Status, Version | LC team |
| **Research Portal Documents** | Project Refs contains "research-portal" | Year descending | ID, Title, Status, Category | RP team |
| **Public Documents** | Visibility = "public" AND Status = "published" | Updated At descending | ID, Title, Category, Share URL | External readers |
| **Internal Documents** | Visibility = "internal" | Updated At descending | ID, Title, Category, Owner | Staff |
| **Archived Documents** | Status = "archived" | Archived Date descending | ID, Title, Archived Date, Superseded By | Auditors |
| **Recently Updated** | Modified > [7 days ago] | Modified descending | ID, Title, Modified, Modified By | All |
| **By Fiscal Year** | (Grouped by Fiscal Year) | Fiscal Year descending | ID, Title, Fiscal Year, Status | Management |
| **By Owner** | (Grouped by Owner) | Owner ascending | ID, Title, Owner, Status | Management |

### DRP Evidence Library Views

| View Name | Filter | Audience |
|-----------|--------|----------|
| **All Evidence** | None | General |
| **Satisfied** | Status = "satisfied" | Reviewers |
| **Pending or Partial** | Status = "partial" OR Status = "draft" | Editors |
| **Not Applicable** | Status = "not-applicable" | Auditors |
| **By Project** | (Grouped by Project Refs) | Project teams |

---

## Staff Workflow

### Document Upload and Metadata Workflow

```
Step 1: Prepare
  │
  ├── Author creates document in Microsoft 365 (Word, Excel, etc.)
  ├── Save to local or OneDrive
  └── Ensure document is final enough for registry inclusion
       │
       ▼
Step 2: Upload to SharePoint
  │
  ├── Navigate to MJU Document Registry site
  ├── Select appropriate library (DRP Documents for production)
  ├── Upload file (drag-and-drop or Upload button)
  └── SharePoint auto-generates: File Type, Storage Path, Share URL
       │
       ▼
Step 3: Fill Metadata
  │
  ├── Required fields:
  │   ├── DRP Document ID (e.g., GO2026-011)
  │   ├── Title (auto-filled from filename, edit as needed)
  │   ├── Category (select from DRP Categories list)
  │   ├── Owner (select person or department)
  │   └── Project Refs (select from DRP Projects list)
  │
  ├── Recommended fields:
  │   ├── Description (AI-suggested or manual)
  │   ├── Keywords (AI-extracted or manual)
  │   ├── Tags (AI-suggested or manual)
  │   ├── Fiscal Year
  │   ├── Version
  │   └── Visibility (default: internal)
  │
  └── Optional fields:
      ├── Evidence Refs
      ├── Related Documents
      └── Subcategory
       │
       ▼
Step 4: AI-Assisted Review
  │
  ├── AI agent reviews metadata for completeness
  ├── AI suggests missing fields:
  │   ├── Category recommendation
  │   ├── Keyword extraction
  │   ├── Duplicate detection
  │   └── Evidence mapping suggestions
  │
  └── Human reviews AI suggestions, accepts or modifies
       │
       ▼
Step 5: Registry QA
  │
  ├── Status set to "review"
  ├── DRP Reviewer checks:
  │   ├── Metadata completeness
  │   ├── Cross-reference validity
  │   ├── Category correctness
  │   └── Evidence mapping accuracy
  │
  └── Reviewer approves (Status → "approved") or returns for edits
       │
       ▼
Step 6: MJU-DRP Sync
  │
  ├── Metadata exported from SharePoint (manual CSV or future Graph)
  ├── Validated against registry schemas (AJV)
  ├── Added to registry JSON files via PR
  └── Registry package regenerated
       │
       ▼
Step 7: Package Release
  │
  ├── All validations pass
  ├── Release notes generated
  ├── Checksums validated
  ├── Package published to latest/
  └── Consumer projects notified
```

### Staff Roles in Workflow

| Role | Step | Responsibility |
|------|------|---------------|
| Document Author | 1-2 | Creates content, uploads to SharePoint |
| Document Editor | 3 | Fills metadata, ensures correctness |
| AI Agent | 4 | Suggests metadata, detects issues |
| DRP Reviewer | 5 | Validates metadata quality, approves or rejects |
| Registry Maintainer | 6 | Syncs to GitHub, validates registry |
| Release Manager | 7 | Runs release pipeline, publishes package |

## Key Principles

1. **Humans always approve** — AI suggestions are recommendations
2. **Metadata before registry** — Correct metadata at upload time reduces rework
3. **Git controls releases** — No direct publishing from SharePoint to registry
4. **Validation at every step** — Each step validates before passing to next
