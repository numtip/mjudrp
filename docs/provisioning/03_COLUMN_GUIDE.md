# Column Guide

## Overview

22 metadata columns map 1:1 to the MJU-DRP Document Schema (`schemas/document.schema.json`). Columns are created as Site Columns under the group "MJU Document Registry Columns".

## Column Templates

See `provisioning/columns/document-columns.json` for the complete column definition.

## Key Columns

| Column | SharePoint Type | Required | Validation |
|--------|----------------|----------|------------|
| DRP Document ID | Single line text | ✅ | Pattern: ^[A-Z0-9]+-[0-9]{3,}$ |
| Title | Single line text | ✅ | Max 255 chars |
| Category | Choice | ✅ | 22 approved values |
| Owner | Person or Group | ✅ | Valid SharePoint user |
| Project Refs | Multiple lines text | ✅ | Semicolon-separated project IDs |
| Visibility | Choice | No | public/internal/confidential/restricted |

## Column Internal Names

SharePoint generates internal names from display names (e.g., "DRP Document ID" → `DRP_x0020_Document_x0020_ID`). Reference the template for exact internal names when using PowerShell or Graph API.

## Adding Columns to Libraries

1. Navigate to Library Settings
2. Click "Add from existing site columns"
3. Select "MJU Document Registry Columns" group
4. Add all columns from the group
5. Or: Add only required columns for specific libraries
