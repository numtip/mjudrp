# OneDrive Provider

## Status

**Architecture documented.** Implementation pending Microsoft Graph API access approval.

## Role

Secondary document storage provider for individual document ownership. Used when documents are owned by a specific person rather than a team.

## Responsibilities

- Maintain the base URL pattern for MJU OneDrive accounts
- Validate OneDrive storage paths (`/personal/{user}_domain_onmicrosoft_com/Documents/{path}`)
- Resolve OneDrive share URLs for personally owned documents
- Support individual document owner workflow

## URL Pattern

```
Base:     https://mju365-my.sharepoint.com
Account:  /personal/{user}_domain_onmicrosoft_com
Document: /personal/{user}_domain_onmicrosoft_com/Documents/{Category}/{Filename}
```

## Configuration

```json
{
  "provider": "onedrive",
  "tenant": "mju365",
  "user": "research",
  "domain": "mju365.onmicrosoft.com",
  "base_path": "Documents"
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

## Folder Structure Convention

```
Documents/
  RAE/
    Guidelines/
    Templates/
    Submissions/
  Research/
    Reports/
    Publications/
```

## Constraints

- OneDrive URLs include the user principal in the path
- Shared links may inherit the owner's access permissions
- Individual documents are better suited for personal working files
- Team documents should use SharePoint sites instead
