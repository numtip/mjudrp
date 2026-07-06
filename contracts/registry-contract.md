# Registry Contract

## Version

**v1.0 (Draft)** — Current schema definition.

## Purpose

Define the internal contract for registry data files. This contract ensures consistency between schemas, registry data, validation scripts, and generated outputs.

## Schema Files

| Schema | Version | Defines |
|--------|---------|---------|
| `schemas/document.schema.json` | 1.0 | Document entry structure |
| `schemas/category.schema.json` | 1.0 | Category taxonomy |
| `schemas/project.schema.json` | 1.0 | Consumer project definition |
| `schemas/owner.schema.json` | 1.0 | Document owner contact |
| `schemas/evidence.schema.json` | 1.0 | Evidence mapping |
| `schemas/relationship.schema.json` | 1.0 | Document relationship |

## Registry Files

| File | Schema | Required |
|------|--------|----------|
| `registry/documents.sample.json` | document.schema.json | Yes |
| `registry/categories.sample.json` | category.schema.json | Yes |
| `registry/projects.sample.json` | project.schema.json | Yes |
| `registry/owners.sample.json` | owner.schema.json | Yes |
| `registry/evidence-map.sample.json` | evidence.schema.json | Yes |

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
6. Cross-references must point to existing entries
7. Required fields must not be null or empty
8. ID format must follow the project-defined pattern

## Schema Evolution

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Add optional field | Minor | Adding `notes` field |
| Add required field | Major | Adding new mandatory reference |
| Remove field | Major | Removing deprecated field |
| Change field type | Major | `year` string → integer |
| Add enum value | Minor | New status value |
| Remove enum value | Major | Removing a status |

## Validation Contract

The validation script (`scripts/validate-registry.mjs`) guarantees:

- No duplicate IDs across registry files
- No missing required fields on any entry
- Cross-references are internally consistent
- Exit code 0 means valid data
- Exit code 1 means invalid data
- Warnings do not cause exit code 1
