# Microsoft Graph Adapter

## Status

**Architecture documented.** Implementation requires Microsoft Graph API access approval and Entra ID app registration.

## Role

Unified adapter for Microsoft 365 services via Microsoft Graph API (`https://graph.microsoft.com/v1.0`). Provides a single entry point for accessing SharePoint, OneDrive, Teams, and Entra ID resources.

## Responsibilities

- Authenticate with Microsoft 365 using OAuth 2.0 / Entra ID
- Query SharePoint sites and document libraries
- Retrieve file metadata (size, type, modified date, author)
- Generate or verify share URLs
- Translate Microsoft Graph responses into MJU-DRP registry entries

## API Endpoints (Future)

| Operation | Graph API Endpoint |
|-----------|-------------------|
| List sites | `GET /sites?search={query}` |
| List drives | `GET /sites/{site-id}/drives` |
| List files | `GET /drives/{drive-id}/root/children` |
| File metadata | `GET /drives/{drive-id}/items/{item-id}` |
| Create sharing link | `POST /drives/{drive-id}/items/{item-id}/createLink` |

## Authentication Flow

```
MJU-DRP → OAuth 2.0 (device code / client credentials) → Microsoft Graph
```

- **Client Credentials**: For automated/scheduled operations
- **Device Code**: For interactive setup and debugging
- **Scopes required**: `Sites.Read.All`, `Files.Read.All`, `User.Read`

## Data Transformation

```json
// Microsoft Graph file response
{
  "id": "01ABCDEF",
  "name": "report.pdf",
  "size": 2450000,
  "file": { "mimeType": "application/pdf" },
  "lastModifiedDateTime": "2026-03-15T10:30:00Z",
  "webUrl": "https://mju365.sharepoint.com/..."
}

// Transformed → MJU-DRP registry entry
{
  "file_type": "pdf",
  "file_size": 2450000,
  "updated_at": "2026-03-15T10:30:00Z",
  "share_url": "https://mju365.sharepoint.com/..."
}
```

## Constraints

- Requires Entra ID app registration with appropriate permissions
- Rate limits apply (typically 10,000 requests per hour per app)
- Some metadata may require specific Graph API permissions
- SharePoint site discovery requires site search or known site IDs
