# Bulk Import Format

## Supported Formats

MJU-DRP supports metadata import in these formats:
1. **CSV** (recommended for batch operations)
2. **JSON** (recommended for programmatic access)
3. **Excel (.xlsx)** (recommended for manual entry)

## CSV Format

First row: Column headers matching the metadata column names.
Subsequent rows: One document per row.
Separator: Comma (,)
Encoding: UTF-8

## JSON Format

Array of document objects matching Registry Specification v1.0:

```json
[
  {
    "id": "GO2026-001",
    "title": "Document Title",
    "category": "policy",
    "owner": "owner-green-office",
    "project_refs": ["green-office-2026"],
    "storage_provider": "sharepoint",
    "storage_path": "/sites/...",
    "share_url": "https://..."
  }
]
```

## Excel Format

Single worksheet with one row per document.
Column headers in row 1.
Data starts in row 2.

## Import Workflow

1. Prepare data in supported format
2. Upload to SharePoint DRP Source Data library
3. AI agent reviews metadata quality
4. Human validates and approves
5. Export to JSON format
6. Validate against Registry Spec (AJV)
7. Create GitHub PR with new records
8. Merge and regenerate registry package
