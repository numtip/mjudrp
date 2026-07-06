# Discovery Guide

## Overview

The Discovery Kit documents existing SharePoint environments for reporting, migration, and validation purposes. Discovery scripts output JSON or CSV for further processing.

## Discovery Scripts

| Script | Output |
|--------|--------|
| `discover-site.ps1` | Site metadata (template, timezone, language) |
| `discover-libraries.ps1` | Library list with versioning and approval settings |
| `discover-columns.ps1` | Site columns with types and requirements |
| `discover-lists.ps1` | List configuration and item counts |
| `discover-permissions.ps1` | Permission groups and member counts |
| `discover-content-types.ps1` | Content type definitions |

## Usage

```powershell
# Discover the complete environment
.\deployment\discovery\discover-site.ps1 -SiteUrl $SiteUrl
.\deployment\discovery\discover-libraries.ps1 -SiteUrl $SiteUrl
# ... run all scripts

# Outputs are saved to deployment/reports/ as JSON
```

## Report Template

The `environment-report-template.md` is a Markdown template that consolidates all discovery results into a readable format for documentation and sharing.

## Use Cases

| Use Case | Description |
|----------|-------------|
| Environment audit | Document current state before changes |
| Migration planning | Discover source environment for migration |
| Compliance reporting | Generate compliance documentation |
| Gap analysis | Compare discovered state against expected |
