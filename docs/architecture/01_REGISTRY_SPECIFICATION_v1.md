# Registry Specification v1.0

## Status

**FROZEN** — 2026-07-06

This document defines the MJU-DRP Registry Specification v1.0. The registry specification is now frozen. Any future changes require the architecture change process defined in `docs/architecture/09_ARCHITECTURE_CHANGE_POLICY.md`.

## Version

| Field | Value |
|-------|-------|
| Specification Version | v1.0 |
| Schema Draft | JSON Schema draft-07 |
| Effective Date | 2026-07-06 |
| Status | FROZEN |

## Schema Inventory

| Schema | File | Version | Required |
|--------|------|---------|----------|
| Document Entry | `schemas/document.schema.json` | v1.0 | Yes |
| Category | `schemas/category.schema.json` | v1.0 | Yes |
| Project | `schemas/project.schema.json` | v1.0 | Yes |
| Owner | `schemas/owner.schema.json` | v1.0 | Yes |
| Evidence Mapping | `schemas/evidence.schema.json` | v1.0 | Yes |
| Relationship | `schemas/relationship.schema.json` | v1.0 | Yes |

## Document Schema (document.schema.json)

### Required Fields

| Field | Type | Pattern | Description |
|-------|------|---------|-------------|
| `id` | string | `^[A-Z0-9]+-[0-9]{3,}$` | Unique document identifier (e.g., GO2026-001) |
| `title` | string | — | Human-readable document title |
| `category` | string | — | Primary category ID referencing categories registry |
| `owner` | string | — | Owner ID referencing the owners registry |
| `storage_provider` | string | enum: sharepoint, onedrive, teams | Microsoft 365 storage platform |
| `storage_path` | string | — | Relative path within the storage provider |
| `share_url` | string | format: uri | Shareable link to the document in Microsoft 365 |
| `project_refs` | array[string] | minItems: 1 | Array of project IDs that reference this document |

### Optional Fields

| Field | Type | Constraints | Default |
|-------|------|------------|---------|
| `description` | string | — | — |
| `subcategory` | string | — | — |
| `year` | integer | — | — |
| `fiscal_year` | string | — | — |
| `version` | string | — | `"1.0"` |
| `status` | string | enum: draft, review, approved, published, archived, superseded | — |
| `department` | string | — | — |
| `keywords` | array[string] | — | — |
| `tags` | array[string] | — | — |
| `language` | string | — | `"th"` |
| `file_type` | string | — | — |
| `file_size` | integer | — | — |
| `preview_url` | string | anyOf: format:uri or empty | — |
| `thumbnail_url` | string | anyOf: format:uri or empty | — |
| `evidence_refs` | array[string] | — | — |
| `related_documents` | array[string] | — | — |
| `visibility` | string | enum: public, internal, confidential, restricted | `"internal"` |
| `created_at` | string | format: date-time | — |
| `updated_at` | string | format: date-time | — |

### Naming Rules

- Document IDs follow pattern: `{PROJECT_PREFIX}-{SEQUENCE_NUMBER}`
- Project prefix: uppercase alphanumeric (e.g., GO, RAE, LC)
- Sequence number: minimum 3 digits, zero-padded (e.g., 001, 002)
- Storage paths use forward slashes
- Category IDs are lowercase kebab-case
- Project IDs are lowercase kebab-case

### Compatibility Rules

1. **Backward compatible**: Adding new optional fields. Adding new enum values. Adding new valid values.
2. **Breaking**: Removing fields. Changing field types. Adding required fields. Removing enum values. Changing ID patterns.
3. **Deprecation**: Mark deprecated fields with `"deprecated": true`. Keep for minimum 2 sprints before removal.

## Category Schema (category.schema.json)

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique category identifier |
| `name` | string | Human-readable category name |
| `description` | string | Description of what this category covers |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `name_en` | string | English category name |
| `name_th` | string | Thai category name |
| `parent` | string | Optional parent category ID for hierarchy |
| `icon` | string | Icon identifier for UI rendering |
| `sort_order` | integer | Display sort order (default: 0) |

## Project Schema (project.schema.json)

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique project identifier |
| `name` | string | Human-readable project name |
| `status` | string | enum: active, planned, completed, on-hold |

### Optional Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `name_en` | string | — |
| `name_th` | string | — |
| `description` | string | — |
| `category_filters` | array[string] | Preferred categories |
| `repository_url` | string | format: uri |
| `website_url` | string | format: uri |
| `contact` | string | — |
| `department` | string | — |
| `created_at` | string | format: date-time |
| `updated_at` | string | format: date-time |

## Owner Schema (owner.schema.json)

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique owner identifier |
| `name` | string | Full name of the owner |
| `email` | string | format: email |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `department` | string | Department or faculty |
| `role` | string | Role or position |
| `phone` | string | Contact phone number |

## Evidence Mapping Schema (evidence.schema.json)

### Required Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | string | Unique evidence mapping identifier |
| `name` | string | Evidence requirement name |
| `project_ref` | string | Project ID this evidence belongs to |
| `document_refs` | array[string] | minItems: 1 |

### Optional Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `description` | string | — |
| `criteria` | string | Assessment criteria |
| `status` | string | enum: satisfied, partial, missing, not-applicable |
| `notes` | string | — |
| `created_at` | string | format: date-time |
| `updated_at` | string | format: date-time |

## Relationship Schema (relationship.schema.json)

### Required Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | string | Unique relationship identifier |
| `source_id` | string | Source document ID |
| `target_id` | string | Target document ID |
| `relationship_type` | string | enum: supersedes, superseded-by, related-to, derived-from, appendix-of, has-appendix, references, referenced-by |

### Optional Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `description` | string | — |
| `created_at` | string | format: date-time |

## Cross-Reference Rules

```
document.owner              → owner.id
document.category           → category.id
document.project_refs[]     → project.id
document.evidence_refs[]    → evidence.id
evidence.project_ref        → project.id
evidence.document_refs[]    → document.id
relationship.source_id      → document.id
relationship.target_id      → document.id
```

## Data Integrity Rules

1. Every document ID must be unique across all documents
2. Every category ID must be unique across all categories
3. Every project ID must be unique across all projects
4. Every owner ID must be unique across all owners
5. Every evidence ID must be unique across all evidence maps
6. Every relationship ID must be unique across all relationships
7. Cross-references must point to existing entries
8. Required fields must not be null or empty
9. ID format must follow the defined pattern (`^[A-Z0-9]+-[0-9]{3,}$`)
10. Share URLs must be valid URIs

## Output Contract

The registry produces these outputs in `dist/`:

| Output | Format | Consumer |
|--------|--------|----------|
| `dist/document-registry.json` | JSON array of document objects | All consumer projects |
| `dist/search-index.json` | JSON array of searchable index entries | All consumer projects |
| `dist/search-index.minisearch.json` | MiniSearch-compatible index (Sprint 2+) | Consumer projects with search |

Consumer projects must never depend on internal implementation. Only consume `dist/` outputs.

## Schema Evolution (Semantic Versioning)

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Add optional field | Minor | Adding `notes` field |
| Add required field | Major | Adding new mandatory reference |
| Remove field | Major | Removing deprecated field |
| Change field type | Major | `year` string → integer |
| Add enum value | Minor | New status value |
| Remove enum value | Major | Removing a status |

## Changelog

### v1.0 — 2026-07-06
- Initial frozen specification
- 6 schemas defined (document, category, project, owner, evidence, relationship)
- Cross-reference rules established
- ID naming convention established
- Output contract defined
- Schema evolution rules defined
