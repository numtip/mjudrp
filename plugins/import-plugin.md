# Import Plugin

## Status

**Architecture documented.** Not implemented during MVP.

## Role

Parse external data sources and transform them into MJU-DRP registry format. The import plugin enables populating the registry from existing spreadsheets, SharePoint lists, or other data sources.

## Responsibilities

- Parse external data formats (CSV, Excel, SharePoint list export)
- Map external fields to registry schema fields
- Validate imported data before registry insert
- Handle duplicate detection and conflict resolution
- Generate import reports (records imported, skipped, errors)

## Supported Source Formats (Planned)

| Source | Format | Priority |
|--------|--------|----------|
| CSV files | Delimited text | Medium |
| Excel files | .xlsx worksheets | Medium |
| SharePoint list | JSON export | Medium |
| Microsoft Graph | API response | Low |
| Manual entry | JSON input | Low |

## Field Mapping

```csv
// CSV → Registry field mapping
ExternalField,RegistryField,Transform
"Document ID","id","trim, uppercase"
"Document Name","title","as-is"
"Document Type","category","lowercase, map to known categories"
"Owner Email","owner","lookup in owners registry"
"URL","share_url","validate URL format"
```

## Configuration

```json
{
  "plugin": "import",
  "source": {
    "type": "csv",
    "path": "./import/source.csv",
    "delimiter": ","
  },
  "mapping": "./import/field-mapping.json",
  "mode": "validate-only",
  "output": "./import/results.json"
}
```

## Import Modes

| Mode | Description |
|------|-------------|
| `validate-only` | Check data without importing |
| `dry-run` | Show what would be imported |
| `import` | Perform the import |
| `merge` | Merge with existing registry data |
