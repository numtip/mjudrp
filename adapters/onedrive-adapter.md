# OneDrive Adapter

## Status

**Architecture documented.** Implementation follows Microsoft Graph adapter activation.

## Role

OneDrive-specific adapter that operates through the Microsoft Graph adapter. Handles OneDrive folder navigation, personal document access, and OneDrive-specific metadata.

## Responsibilities

- Map OneDrive user paths to registry owner references
- Navigate OneDrive folder hierarchy
- Extract OneDrive-specific metadata (owner, personal folder structure)
- Validate OneDrive share URLs
- Support individual document ownership workflow

## Operations

| Operation | Description | Dependency |
|-----------|-------------|------------|
| `list_user_documents` | List documents in a user's OneDrive | Microsoft Graph |
| `validate_onedrive_url` | Validate OneDrive URL format | None (path check) |
| `extract_owner_from_url` | Extract user principal from OneDrive URL | None (URL parse) |

## URL Structure

```
https://mju365-my.sharepoint.com/personal/{user}_{domain}_onmicrosoft_com/Documents/{path}
```

Components:
- `mju365-my.sharepoint.com` — OneDrive tenant host
- `personal/` — OneDrive personal site prefix
- `{user}_{domain}` — Encoded user principal name
- `Documents/` — Root document folder
- `{path}` — Relative path within Documents

## Owner Extraction

From a OneDrive URL like:
```
https://mju365-my.sharepoint.com/personal/research_mju365_onmicrosoft_com/Documents/RAE/file.pdf
```

Extract:
- User: `research`
- Domain: `mju365.onmicrosoft.com`
- Owner reference: `owner-research` (if mapped in owners registry)

## Constraints

- OneDrive adapter delegates API calls to Microsoft Graph adapter
- Personal OneDrive documents have different sharing behavior than SharePoint
- Access permissions are tied to the document owner's account
- OneDrive is best for individual working documents, not team repositories
