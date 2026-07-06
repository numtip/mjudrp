# Template Guide

## How to Use Provisioning Templates

Each JSON template in the provisioning kit is designed to be human-readable and machine-parseable. Templates serve three purposes:

1. **Documentation —** Read the template to understand the expected configuration
2. **Validation —** Compare a provisioned site against the template
3. **Automation —** Feed into PnP PowerShell or Graph API for future automation

## Template Structure

All templates follow a consistent structure:

```json
{
  "template_type": "site|library|column|list|view|permission|content_type",
  "version": "1.0.0",
  "config": { /* template-specific fields */ },
  "mappings": { /* reference to schema/spec */ }
}
```

## Mapping to SharePoint

| Template | Creates | SharePoint UI Path |
|----------|---------|-------------------|
| site-template.json | Communication Site | Site Contents → New → Communication Site |
| libraries/*.json | Document Libraries | Site Contents → New → Document Library |
| columns/*.json | Site Columns | Site Settings → Site Columns → Create |
| lists/*.json | SharePoint Lists | Site Contents → New → List |
| views/*.json | Library Views | Library → All Documents → Create View |
| permissions/*.json | SharePoint Groups | Site Settings → Site Permissions |
| content-types/*.json | Content Types | Site Settings → Site Content Types → Create |

## Mapping to PnP PowerShell (Future)

```powershell
# Example: Provision a library from template
$template = Get-Content "provisioning/libraries/documents.json" | ConvertFrom-Json
New-PnPList -Title $template.library_name -Template DocumentLibrary
Set-PnPList -Identity $template.library_name -EnableVersioning $template.versioning.enabled
```

## Mapping to Graph API (Future)

```http
# Example: Create a document library via Graph
POST https://graph.microsoft.com/v1.0/sites/{site-id}/drives
Content-Type: application/json

{
  "name": "DRP Documents",
  "description": "Primary document storage..."
}
```
