# PowerShell Guide

## Overview

Ten PowerShell scripts form the MJU-DRP deployment pipeline. Each script handles one deployment step.

## Scripts

| Script | Function | Requires Previous |
|--------|----------|-------------------|
| `00_create_site.ps1` | Creates Communication Site | — |
| `01_create_libraries.ps1` | Creates 6 document libraries | Site |
| `02_create_columns.ps1` | Creates 22 site columns | Site |
| `03_create_lists.ps1` | Creates 5 SharePoint lists | Site |
| `04_create_views.ps1` | Creates library views | Libraries + Columns |
| `05_create_permissions.ps1` | Creates permission groups | Site |
| `06_import_metadata.ps1` | Imports CSV metadata | Lists |
| `07_verify_environment.ps1` | Verifies the deployed environment | All above |
| `08_export_metadata.ps1` | Exports metadata for registry | Libraries populated |
| `09_cleanup_demo.ps1` | Removes demo/test content (interactive only) | — |

## Prerequisites

- PnP.PowerShell 2.x+
- SharePoint Administrator permissions (for site creation)
- Tenant admin consent for app permissions

## Execution Order

```
00 → 01 → 02 → 03 → 04 → 05 → 06 → 07
```

08 and 09 are standalone scripts for maintenance.

## Placeholder Replacement

Before running, replace these placeholders:

- `__TENANT_NAME__` — Your Microsoft 365 tenant name
- `__SITE_URL__` — The SharePoint site URL
- `__SITE_OWNER_EMAIL__` — Site owner's email address

Use find-and-replace across all scripts before execution.

## Safety

All scripts are templates. Commands are commented out by default.
Uncomment lines after reviewing and replacing placeholders.
