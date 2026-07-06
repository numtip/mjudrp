# Validation Engine

## Dependencies

- `ajv` (^8.20.0) — JSON Schema validation
- `ajv-formats` (^3.0.1) — format validation (uri, email, date-time, etc.)

## Architecture

The validation engine (`scripts/validate-registry.mjs`) operates in four phases:

### Phase 1: Schema Compilation

All 6 JSON schemas are compiled using AJV with `ajv-formats`:

```javascript
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);
// compile each schema
validators[key] = ajv.compile(schema);
```

- `allErrors: true` — collects all errors per entry (not just first)
- `verbose: true` — includes error details in output
- `ajv-formats` adds support for `format: "uri"`, `format: "date-time"`, etc.

### Phase 2: Schema Validation

Each entry in every registry file is validated against its compiled schema:

| Registry File | Schema |
|---------------|--------|
| `documents.sample.json` | `document.schema.json` |
| `categories.sample.json` | `category.schema.json` |
| `projects.sample.json` | `project.schema.json` |
| `owners.sample.json` | `owner.schema.json` |
| `evidence-map.sample.json` | `evidence.schema.json` |

### Phase 3: Cross-Reference Validation

After schema validation, the engine checks referential integrity:

- `document.owner` → must exist in `owners`
- `document.category` → must exist in `categories`
- `document.project_refs[]` → must exist in `projects`
- `document.evidence_refs[]` → must exist in `evidence`
- `document.related_documents[]` → must exist in `documents`
- `evidence.project_ref` → must exist in `projects`
- `evidence.document_refs[]` → must exist in `documents`

### Phase 4: Report Generation

The validation report (`dist/validation-report.json`) includes:

```json
{
  "timestamp": "2026-07-06T...",
  "documents_checked": 7,
  "errors": [...],
  "warnings": [...],
  "duplicates": [...],
  "missing_owners": [...],
  "missing_categories": [...],
  "missing_evidence": [...],
  "invalid_references": [...],
  "summary": { "errors": 0, "warnings": 0, "passed": true },
  "status": "PASS"
}
```

## URI Handling

Optional URI fields (`preview_url`, `thumbnail_url`, `repository_url`, `website_url`) use `anyOf` to accept either valid URIs or empty strings:

```json
"preview_url": {
  "anyOf": [
    { "type": "string", "format": "uri" },
    { "type": "string", "maxLength": 0 }
  ]
}
```

## Error Classification

- **Errors** — schema violations, missing required fields, duplicate IDs (exit code 1)
- **Warnings** — cross-references to non-existent entries (exit code 0)
