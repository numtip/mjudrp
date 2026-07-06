# Metadata Plugin

## Status

**Architecture documented.** Not implemented during MVP.

## Role

Enrich, transform, and validate document metadata as it flows through the registry pipeline. The metadata plugin can add computed fields, normalize values, and apply transformations.

## Responsibilities

- Compute derived metadata fields (e.g., `fiscal_year` from `year`)
- Normalize keyword and tag formats (lowercase, deduplicate)
- Validate metadata against registry schemas
- Auto-generate descriptions from document titles when missing
- Apply language normalization (Thai/English field alignment)

## Pipeline Position

```
Registry Data → Metadata Plugin → Validator → Search Index
```

## Extension Points

| Hook | When | Input | Output |
|------|------|-------|--------|
| `before_validate` | Before validation runs | Raw registry entry | Transformed entry |
| `after_validate` | After validation passes | Validated entry | Enriched entry |
| `before_index` | Before search index generation | Registry entry | Index-ready entry |

## Example Transformations

```json
// Input
{ "year": 2026, "title": "แผนยุทธศาสตร์" }

// After metadata plugin
{
  "year": 2026,
  "fiscal_year": "2569",
  "title": "แผนยุทธศาสตร์",
  "title_en": "Strategic Plan (auto)",
  "normalized_keywords": ["strategic", "plan", "ยุทธศาสตร์"],
  "language": "th"
}
```

## Configuration

```json
{
  "plugin": "metadata",
  "enabled": true,
  "rules": {
    "auto_fiscal_year": true,
    "auto_language_detect": false,
    "normalize_keywords": true,
    "deduplicate_tags": true
  }
}
```
