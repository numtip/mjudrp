# Graph Preparation

## Overview

This document maps provisioning templates to Microsoft Graph API resources for future automated provisioning and metadata sync. **No Graph implementation is included in this sprint.**

## Prerequisites for Graph

1. Entra ID app registration
2. `Sites.Selected` application permission (or `Sites.Read.All` if not available)
3. Admin consent from MJU IT
4. Client secret or certificate

## Template → Graph API Mapping

| Template | Graph API Resource | Operation |
|----------|-------------------|-----------|
| site-template.json | `POST /sites` | Create site |
| libraries/*.json | `POST /sites/{id}/drives` | Create library |
| columns/*.json | `POST /sites/{id}/columns` | Create column |
| lists/*.json | `POST /sites/{id}/lists` | Create list |
| permissions/*.json | `POST /sites/{id}/permissions` | Grant permission |

## Metadata Read

```http
GET /sites/{site-id}/drives/{drive-id}/root/children
  ?$expand=listItem($expand=fields)
```

Returns all documents in a library with their metadata fields.

## Implementation Order (Future)

1. Read-only metadata sync (lowest risk)
2. Validate synced metadata against Registry Spec
3. Create GitHub PR from synced data
4. Await human approval before merging

## When to Implement

- After Entra ID app registration is approved
- After SharePoint site is manually provisioned
- After test documents are uploaded and metadata verified
- Not before Sprint 3C+
