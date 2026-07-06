# Output Format

## Overview

The registry generator produces 11 JSON files in `dist/`. All outputs are versioned, validated, and documented.

## Output Files

### document-registry.json

Normalized document entries with all fields. Array of objects.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique document ID |
| title | string | Document title |
| category | string | Category reference |
| owner | string | Owner reference |
| storage_provider | string | SharePoint/OneDrive/Teams |
| storage_path | string | Relative path in storage |
| share_url | string | Direct access URL |
| year | number | Document year |
| status | string | draft/review/approved/published/archived |
| visibility | string | public/internal/confidential |

### category-registry.json

Category taxonomy. Array of objects.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Category ID |
| name | string | Display name |
| parent | string|null | Parent category ID (null = root) |
| sort_order | number | Display order |

### project-registry.json

Consumer projects. Array of objects.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Project ID |
| name | string | Project name |
| department | string | Responsible department |

### owner-registry.json

Document owners. Array of objects.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Owner ID |
| name | string | Display name |
| email | string | Contact email |

### evidence-registry.json

Evidence mappings linking documents to projects. Array of objects.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Evidence mapping ID |
| project_ref | string | Project reference |
| document_refs | string[] | Document references |

### relationship-registry.json

Cross-document relationships. Array of objects.

### search-index.json

Lightweight search index. Array of objects with id/title/description/keywords.

### minisearch-index.json

MiniSearch serialized index for full-text search. Object with internal MiniSearch state.

## manifest.json

Build metadata:

| Field | Type | Description |
|-------|------|-------------|
| registry_version | string | Registry spec version |
| schema_version | string | JSON Schema version |
| build_timestamp | string | ISO 8601 build time |
| document_count | number | Number of documents |
| generator_version | string | Generator script version |
| outputs | string[] | List of generated files |

## Versioning

See `docs/architecture/02_SCHEMA_VERSION_POLICY.md` for the full versioning policy.
