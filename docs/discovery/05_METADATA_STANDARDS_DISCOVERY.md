# Metadata Standards Discovery

## Investigated Standards

### Dublin Core

| Field | Value |
|-------|-------|
| Overview | 15-element metadata standard for digital resources (dc:title, dc:creator, dc:date, etc.) |
| MJU-DRP fit | High — document.schema.json already covers many Dublin Core elements |
| Mapping to existing schema | `title` → `dc:title`, `description` → `dc:description`, `owner` → `dc:creator`, `created_at` → `dc:date`, `category` → `dc:type`, `language` → `dc:language`, `keywords` → `dc:subject` |
| Recommendation | ✅ **Adopt as baseline** — Map document schema fields to Dublin Core where applicable. |

### schema.org CreativeWork

| Field | Value |
|-------|-------|
| Overview | Schema.org vocabulary for creative works (articles, documents, datasets) |
| MJU-DRP fit | Medium — useful for consumer projects that expose structured data for SEO |
| Example mapping | `CreativeWork.name`, `CreativeWork.description`, `CreativeWork.dateCreated`, `CreativeWork.about` |
| Recommendation | ✅ **Optional** — Consumer projects can add schema.org markup using registry data. Not required in registry itself. |

### SharePoint Metadata Columns

| Field | Value |
|-------|-------|
| Overview | SharePoint site columns for document metadata (Choice, Text, Number, DateTime, Person/Group, Managed Metadata) |
| MJU-DRP fit | High — aligns with metadata-first approach |
| Mapping | Each registry field becomes a SharePoint column: `category` → Choice column with category options, `owner` → Person/Group column, `year` → Number column, `status` → Choice column with status values |
| Recommendation | ✅ **Adopt** — Define SharePoint columns matching registry schema for direct document metadata entry. |

### Microsoft Purview / Sensitivity Labels

| Field | Value |
|-------|-------|
| Overview | Microsoft Purview information protection — sensitivity labels, data classification, retention policies |
| MJU-DRP fit | Medium — `visibility` field in schema maps to sensitivity concepts |
| Recommendation | ⚠️ **Note for future** — When documents need compliance classification, map `visibility` field to Purview sensitivity labels. Not needed during MVP. |

### ISO Document Metadata Concepts

| Field | Value |
|-------|-------|
| Overview | ISO 15489 (records management) and related standards for document metadata |
| MJU-DRP fit | Low — enterprise records management standards are more rigorous than MVP needs |
| Recommendation | ⚠️ **Future reference** — If MJU-DRP needs ISO compliance, extend schema with ISO 23081-1 metadata elements. |

---

## Recommended Metadata Baseline

| Field | Dublin Core | SharePoint Column Type | Priority |
|-------|:-----------:|:---------------------:|:--------:|
| id | — | Text (single line) | Required |
| title | dc:title | Text (single line) | Required |
| description | dc:description | Text (multiple lines) | Required |
| category | dc:type | Choice | Required |
| subcategory | — | Choice | Optional |
| year | dc:date (year) | Number | Required |
| fiscal_year | — | Text | Optional |
| version | — | Text | Optional |
| status | — | Choice | Required |
| owner | dc:creator | Person/Group | Required |
| department | — | Choice | Optional |
| keywords | dc:subject | Text (multiple lines) | Required |
| tags | — | Text (multiple lines) | Optional |
| language | dc:language | Choice | Optional |
| file_type | dc:format | Choice | Required |
| file_size | dc:format (extent) | Number | Optional |
| storage_provider | — | Choice | Required |
| storage_path | — | Text (single line) | Required |
| share_url | dc:identifier | Hyperlink | Required |
| project_refs | — | Multiple choice | Required |
| evidence_refs | — | Text (multiple lines) | Optional |
| visibility | — | Choice | Optional |
| created_at | dc:date | DateTime | Required |
| updated_at | dc:date | DateTime | Required |

## Fields to Avoid in MVP

| Field | Reason |
|-------|--------|
| `publisher` | Covered by `project_refs` |
| `rights` | Covered by `visibility` |
| `contributor` | Low value for current volume |
| `source` | Covered by `storage_provider` + `storage_path` |
| `relation` | Covered by `related_documents` |

## Schema Mapping

Current `document.schema.json` already covers ~90% of Dublin Core required elements. No schema changes needed for Dublin Core alignment. Add `dcterms` mapping documentation in schema `$comment` fields if desired.
