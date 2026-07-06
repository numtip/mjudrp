# SharePoint Adapter

## Status

**Architecture documented.** Implementation follows Microsoft Graph adapter activation.

## Role

SharePoint-specific adapter that operates through the Microsoft Graph adapter. Handles SharePoint site structure, document library navigation, and SharePoint-specific metadata.

## Responsibilities

- Map SharePoint site paths to registry project references
- Navigate SharePoint document library folder hierarchy
- Extract SharePoint-specific metadata (site name, library name, folder path)
- Validate SharePoint share URLs
- Support SharePoint folder taxonomy alignment with registry categories

## SharePoint Site to Registry Mapping

| SharePoint Site | Registry Project ID |
|----------------|---------------------|
| `/sites/GreenOffice` | `green-office-2026` |
| `/sites/ResearchOffice` | `rae-landing`, `research-portal` |
| `/sites/LearningCenter` | `learning-center` |

## Folder to Category Mapping

| SharePoint Folder | Registry Category |
|-------------------|-------------------|
| `Plans/` | `strategic-plan` |
| `Guidelines/` | `guideline` |
| `Reports/` | `report` |
| `Templates/` | `template` |
| `Catalogs/` | `catalog` |
| `Evidence/` | (evidence storage) |

## Operations

| Operation | Description | Dependency |
|-----------|-------------|------------|
| `list_site_documents` | List all documents in a SharePoint site | Microsoft Graph |
| `sync_folder_to_category` | Map SharePoint folder to registry category | Microsoft Graph |
| `validate_site_url` | Validate SharePoint site URL format | None (path check) |
| `extract_site_metadata` | Extract site name, library, folder from URL | None (URL parse) |

## Constraints

- SharePoint adapter always delegates to Microsoft Graph adapter for API calls
- Site discovery requires knowing the site path or using Graph search
- Folder hierarchy must align with registry taxonomy conventions
