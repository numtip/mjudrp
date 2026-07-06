# Site Script Guide

## Overview

SharePoint Site Scripts are JSON files that define operations for provisioning SharePoint sites. MJU-DRP uses 8 site scripts to automate site configuration.

## Available Scripts

| Script | Operations |
|--------|-----------|
| `communication-site.json` | Create Communication Site (template placeholder) |
| `libraries.json` | Create 6 document libraries |
| `columns.json` | Create 14+ site columns |
| `lists.json` | Create 5 SharePoint lists |
| `views.json` | Create library views with CAML queries |
| `permissions.json` | Add principal to permission group |
| `navigation.json` | Configure navigation links and footer |
| `theme.json` | Apply MJU-brand theme palette |

## Script Format

All scripts follow the SharePoint Site Script JSON schema:
`https://developer.microsoft.com/json-schemas/sp/site-script.json`

Each script contains an `operations` array with typed operations.

## Usage with PnP PowerShell

```powershell
# Apply a site script
$script = Get-Content "deployment/site-scripts/columns.json" -Raw
Invoke-PnPSiteScript -Script $script
```

## Usage with SharePoint Admin Center

1. Navigate to SharePoint Admin Center > Site Scripts
2. Upload each JSON script
3. Assign to site design

## Creation Order

1. Apply `communication-site.json` (or use `00_create_site.ps1`)
2. Apply `columns.json`
3. Apply `libraries.json`
4. Apply `lists.json`
5. Apply `views.json`
6. Apply `permissions.json`
7. Apply `navigation.json`
8. Apply `theme.json`
