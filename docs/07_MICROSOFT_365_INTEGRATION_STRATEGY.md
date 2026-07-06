# Microsoft 365 Integration Strategy

## Overview

Microsoft 365 (SharePoint, OneDrive, Teams) is the binary storage layer for all documents referenced by MJU-DRP. The registry stores only metadata and share URLs.

## Integration Points

### 1. Document Storage
- **SharePoint Online** — Primary document storage. Each project gets a SharePoint site with document libraries organized by category.
- **OneDrive for Business** — For individual document ownership. Share URLs generated from OneDrive.
- **Teams** — Channel files are stored in the underlying SharePoint site.

### 2. Share URLs
All documents have a `share_url` field pointing to their location in Microsoft 365:

```
SharePoint: https://mju365.sharepoint.com/sites/{site}/Shared%20Documents/{path}
OneDrive:   https://mju365-my.sharepoint.com/personal/{user}_mju365_onmicrosoft_com/Documents/{path}
```

### 3. Metadata Extraction (Future)
- Microsoft Graph API can extract file metadata from SharePoint/OneDrive
- Potential for automated registry population
- Not implemented during MVP

## SharePoint Site Architecture (Proposed)

```
MJU SharePoint Tenant
├── /sites/GreenOffice
│   └── Shared Documents
│       ├── Plans/
│       ├── Guidelines/
│       ├── Reports/
│       └── Evidence/
├── /sites/ResearchOffice
│   └── Shared Documents
│       ├── RAE/
│       ├── Guidelines/
│       └── Templates/
├── /sites/LearningCenter
│   └── Shared Documents
│       ├── Catalog/
│       ├── Reports/
│       └── Materials/
└── /sites/ResearchPortal (future)
    └── Shared Documents
```

## Access Control

- Access to documents is managed through Microsoft 365 permissions
- MJU-DRP does not manage access — it only stores the share URL
- The `visibility` field in the registry is guidance, not enforcement
- Public documents should use organization-wide sharing links
- Confidential documents should use specific user/group sharing

## Integration Rules

1. All documents in the registry must have a valid Microsoft 365 share URL
2. Share URLs must be accessible by the intended audience
3. Do not create documents directly from MJU-DRP scripts
4. Do not modify Microsoft 365 permissions from MJU-DRP
5. Folder structure in SharePoint should mirror registry taxonomy where practical

## ECD Discovery Results

ECD v1.3 evaluated 14 Microsoft 365 capabilities. See `docs/discovery/01_MICROSOFT_365_CAPABILITY_DISCOVERY.md` for full analysis.

Key recommendations:
- **SharePoint Document Library**: ✅ Reuse as primary document storage
- **SharePoint Lists**: ✅ Reuse as alternative metadata view (git remains source of truth)
- **SharePoint Columns**: ✅ Adopt — define columns matching registry schema
- **SharePoint Term Store**: 📐 Defer until taxonomy exceeds ~20 categories
- **Microsoft Graph API**: 📐 Future — requires Entra ID app registration
- **Microsoft Syntex**: 📐 Future — license-dependent; Thai support unclear
- **SharePoint Embedded**: ❌ Rejected — violates no-CMS rule
- **Microsoft Search**: ❌ Not suitable for consumer project search

## Future Enhancements

- Microsoft Graph API integration for automated metadata sync
- SharePoint list as an alternative registry view
- Power Automate flows for registry updates on file changes
