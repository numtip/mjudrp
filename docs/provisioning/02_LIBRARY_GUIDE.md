# Library Guide

## Overview

Six document libraries form the MJU-DRP SharePoint workspace. Each library has a distinct purpose and configuration.

## Libraries

| Library | Purpose | Versioning | Approval | Public |
|---------|---------|-----------|----------|--------|
| DRP Documents | Production document storage | Major only | Required | Partial |
| DRP Evidence | QA evidence files | Major only | Required | No |
| DRP Source Data | Bulk import files | None | None | No |
| DRP Templates | Standard forms | Major only | None | Yes |
| DRP Archive | Long-term preservation | None | None | No |
| DRP Working Area | Drafts and collaboration | Major+Minor | None | No |

## Provisioning Order

1. Create site (if not already)
2. Create site columns (add to MJU Document Registry Columns group)
3. Create content types
4. Create libraries
5. Add content types to libraries
6. Configure library settings (versioning, approval)
7. Create views
8. Configure permissions

## Library Templates

Each library has a JSON template in `provisioning/libraries/`:
- `documents.json` — DRP Documents
- `evidence.json` — DRP Evidence
- `templates.json` — DRP Templates
- `archive.json` — DRP Archive
- `working-area.json` — DRP Working Area
- `source-data.json` — DRP Source Data
