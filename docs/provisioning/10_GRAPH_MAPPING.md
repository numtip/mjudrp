# Graph Mapping

## Provisioning Template → Graph API Resource

| Provisioning Template | Graph API Resource | HTTP Method | Endpoint |
|----------------------|-------------------|-------------|----------|
| site-template.json | `site` | POST | `/sites` |
| communication-site.json | `site` | POST | `/sites` (with template) |
| team-site.json | `group` + `site` | POST | `/groups` (creates both) |
| libraries/documents.json | `drive` | POST | `/sites/{id}/drives` |
| libraries/evidence.json | `drive` | POST | `/sites/{id}/drives` |
| columns/document-columns.json | `columnDefinition` | POST | `/sites/{id}/columns` |
| lists/categories.json | `list` | POST | `/sites/{id}/lists` |
| views/documents.json | `view` | PATCH | `/sites/{id}/lists/{list-id}/views` |
| permissions/groups.json | `permission` | POST | `/sites/{id}/permissions` |
| content-types/document.json | `contentType` | POST | `/sites/{id}/contentTypes` |

## Key Graph Queries

```http
# Get site by URL
GET /sites/mju365.sharepoint.com:/sites/MJUDocumentRegistry

# Get all document libraries
GET /sites/{id}/drives

# Get documents with metadata
GET /sites/{id}/drives/{drive-id}/root/children?$expand=listItem($expand=fields)

# Get site columns
GET /sites/{id}/columns

# Get lists
GET /sites/{id}/lists

# Get list items
GET /sites/{id}/lists/{list-id}/items?$expand=fields
```

## Future Adapter

When implemented, the Graph Adapter script (`scripts/graph-adapter.mjs`) will:

1. Authenticate using client credentials
2. Fetch documents + metadata from SharePoint
3. Map Graph fields to Registry properties
4. Validate against AJV schemas
5. Export as registry-compatible JSON
6. Create GitHub PR for human review
