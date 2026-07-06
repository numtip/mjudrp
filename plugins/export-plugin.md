# Export Plugin

## Status

**Architecture documented.** Not implemented during MVP.

## Role

Export registry data into various formats for different consumers. The export plugin allows consumer projects to receive registry data in their preferred format.

## Responsibilities

- Convert registry data to export formats
- Support format-specific transformations
- Maintain data integrity across formats
- Generate format-specific metadata (field mappings, type conversions)

## Supported Formats (Planned)

| Format | Use Case | Priority |
|--------|----------|----------|
| JSON (existing) | All consumer projects | ✅ MVP |
| CSV | Excel analysis, reporting | Medium |
| Markdown | Documentation, README generation | Low |
| HTML | Embeddable document listings | Low |
| XML | Legacy system integration | Very low |

## Transformations

```json
// JSON → CSV transformation
{
  "id": "GO2026-001",
  "title": "Green Office 2026 Initiative Plan",
  "category": "strategic-plan",
  "owner": "owner-sustainability",
  "share_url": "https://..."
}

// becomes:
// id,title,category,owner,share_url
// GO2026-001,"Green Office 2026 Initiative Plan",strategic-plan,owner-sustainability,https://...
```

## Configuration

```json
{
  "plugin": "export",
  "formats": ["json", "csv"],
  "output_dir": "./dist/exports/",
  "include_fields": ["id", "title", "category", "owner", "share_url"]
}
```
