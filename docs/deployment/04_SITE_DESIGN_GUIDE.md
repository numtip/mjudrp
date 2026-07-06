# Site Design Guide

## Overview

SharePoint Site Designs combine multiple Site Scripts into reusable design packages. MJU-DRP provides 5 site designs.

## Available Designs

| Design | Scripts Used | Use Case |
|--------|-------------|----------|
| `enterprise-registry.json` | All 8 site scripts | Full MJU Document Registry |
| `green-office.json` | 4 core scripts | Green Office project registry |
| `rae.json` | 4 core scripts | RAE project registry |
| `learning-center.json` | 4 core scripts | Learning Center project registry |
| `research-portal.json` | 4 core scripts | Research Portal project registry |

## Registering a Site Design

```powershell
# Register a site design
$design = Get-Content "deployment/site-designs/enterprise-registry.json" | ConvertFrom-Json

Add-PnPSiteDesign `
  -Title $design.site_design_title `
  -Description $design.site_design_description `
  -WebTemplate "68" `
  -SiteScriptIds @("script-id-1", "script-id-2", ...)
```

## Applying a Site Design

```powershell
# Apply to existing site
Invoke-PnPSiteDesign -Identity "design-id" -WebUrl $SiteUrl

# Or apply during site creation
New-PnPSite -Type CommunicationSite -DesignPackage "design-id" ...
```

## Enterprise Design

The `enterprise-registry.json` design applies all 8 site scripts and creates the complete MJU Document Registry environment. This is the recommended design for full deployment.
