# Registry Import Format

When importing metadata into the MJU-DRP GitHub registry, use this format.

## File: registry/documents.sample.json

Each entry must conform to `schemas/document.schema.json`:

```json
{
  "id": "GO2026-001",
  "title": "Document Title",
  "description": "Brief description",
  "category": "policy",
  "subcategory": "environmental",
  "year": 2026,
  "fiscal_year": "2569",
  "version": "1.0",
  "status": "approved",
  "owner": "owner-green-office",
  "department": "Green Office Committee",
  "keywords": ["keyword1", "keyword2"],
  "tags": ["tag1", "tag2"],
  "language": "th",
  "file_type": "pdf",
  "file_size": 4100000,
  "storage_provider": "sharepoint",
  "storage_path": "/sites/...",
  "share_url": "https://...",
  "project_refs": ["green-office-2026"],
  "evidence_refs": ["EVD-GREE-001"],
  "related_documents": ["GO2026-002"],
  "visibility": "internal",
  "created_at": "2026-07-06T00:00:00Z",
  "updated_at": "2026-07-06T00:00:00Z"
}
```

## Required Fields

id, title, category, owner, storage_provider, storage_path, share_url, project_refs

## Import Workflow

1. Export metadata from SharePoint (CSV)
2. Convert to JSON format using the mapping
3. Add to `registry/documents.sample.json`
4. Run `node scripts/validate-registry.mjs`
5. If PASS: create PR with the new entries
6. If FAIL: fix validation errors and retry
7. After merge: run `node scripts/release.mjs` to regenerate package

## Validation Commands

```bash
node scripts/validate-registry.mjs     # AJV validation
node scripts/generate-search-index.mjs # Regenerate outputs
node scripts/release.mjs               # Full release pipeline
```
