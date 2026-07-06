# Import / Export Guide

## Supported Formats

| Format | Use Case | File |
|--------|----------|------|
| CSV | Batch import, Excel export | `provisioning/exports/metadata-template.csv` |
| JSON | Programmatic access, registry import | `provisioning/exports/registry-import-format.md` |
| Excel (.xlsx) | Manual entry, data review | `provisioning/exports/metadata-template.xlsx.md` |
| SharePoint Export | Library metadata export | `provisioning/exports/sharepoint-export-format.md` |

## Export from SharePoint

1. Navigate to DRP Documents library
2. Select desired view (e.g., "All Active Documents")
3. Click "Export to Excel" — this creates a .iqy query
4. Open the Excel file and save as CSV
5. Map SharePoint column names to Registry properties

## Import to Registry

1. Ensure metadata is in JSON format matching `document.schema.json`
2. Add entries to `registry/documents.sample.json`
3. Run `node scripts/validate-registry.mjs`
4. If PASS: create GitHub PR
5. If FAIL: fix errors and retry

## Bulk Import

For batch imports:
1. Prepare CSV file using the template
2. Upload to SharePoint DRP Source Data library
3. Use AI to review metadata quality
4. Export as JSON
5. Follow import-to-registry workflow above
