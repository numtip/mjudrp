# SharePoint Export Format

When exporting metadata from the DRP Documents SharePoint library, use this mapping to align with Registry Spec v1.0.

## SharePoint to Registry Mapping

| SharePoint Column (Internal Name) | Registry Property | Type |
|----------------------------------|-------------------|------|
| DRP_x0020_Document_x0020_ID | `id` | string |
| Title | `title` | string |
| DRP_x0020_Description | `description` | string |
| DRP_x0020_Category | `category` | string |
| DRP_x0020_Subcategory | `subcategory` | string |
| DRP_x0020_Fiscal_x0020_Year | `fiscal_year` | string |
| DRP_x0020_Year | `year` | number |
| DRP_x0020_Version | `version` | string |
| DRP_x0020_Status | `status` | string |
| DRP_x0020_Owner | `owner` | string (resolve to owner ID) |
| DRP_x0020_Department | `department` | string |
| DRP_x0020_Keywords | `keywords` | array (split by comma) |
| DRP_x0020_Tags | `tags` | array (split by comma) |
| DRP_x0020_Language | `language` | string |
| FileType | `file_type` | string |
| DRP_x0020_Project_x0020_Refs | `project_refs` | array (split by semicolon) |
| DRP_x0020_Evidence_x0020_Refs | `evidence_refs` | array (split by semicolon) |
| DRP_x0020_Related_x0020_Documents | `related_documents` | array (split by semicolon) |
| DRP_x0020_Visibility | `visibility` | string |
| FileLeafRef | `storage_path` | string |
| DRP_x0020_Share_x0020_URL | `share_url` | string |
| Created | `created_at` | ISO 8601 string |
| Modified | `updated_at` | ISO 8601 string |

## Export Instructions

1. Navigate to DRP Documents library
2. Select all documents or filtered view
3. Click "Export to Excel" or "Export to CSV"
4. The export will contain internal column names
5. Map internal names to registry properties using the table above
6. Validate the exported JSON against the Registry Spec
