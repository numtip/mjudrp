# SharePoint Provider

## Status

**Architecture documented.** Implementation pending Microsoft Graph API access approval.

## Role

Primary document storage provider for team-based project documents. Each consumer project has a dedicated SharePoint site with document libraries organized by category.

## Responsibilities

- Maintain the base URL pattern for the MJU SharePoint tenant
- Validate SharePoint storage paths (`/sites/{site}/Shared%20Documents/{path}`)
- Resolve SharePoint share URLs for stored documents
- Define the SharePoint folder taxonomy aligned with registry categories

## URL Pattern

```
Base:     https://mju365.sharepoint.com
Site:     /sites/{ProjectSite}
Document: /sites/{ProjectSite}/Shared%20Documents/{Category}/{Filename}
```

## Configuration

```json
{
  "provider": "sharepoint",
  "tenant": "mju365",
  "site": "/sites/GreenOffice",
  "base_path": "Shared Documents",
  "default_library": "Shared%20Documents"
}
```

## Supported Operations

| Operation | MVP | Future |
|-----------|-----|--------|
| URL resolution | ✅ Documented | ✅ Programmatic |
| Path validation | ✅ Documented | ✅ Automated |
| Health check | ❌ Stub | ✅ Graph API |
| Metadata extraction | ❌ | ✅ Graph API |
| Document listing | ❌ | ✅ Graph API |

## Site Structure Convention

```
/sites/{Project}/
  Shared Documents/
    Plans/
    Guidelines/
    Reports/
    Evidence/
    Templates/
    Catalogs/
```

Each folder corresponds to a category in the registry taxonomy.

## Constraints

- SharePoint URLs are case-sensitive in path segments
- Spaces must be encoded as `%20`
- Sharing links may have expiration policies set by IT
- Access control is managed by SharePoint, not MJU-DRP
