<#
.SYNOPSIS
    Creates the 6 MJU-DRP document libraries.
.DESCRIPTION
    Creates document libraries with versioning, approval, and content type settings.
.NOTES
    Template version: 1.0.0
    Run after: 00_create_site.ps1
    Requires: PnP.PowerShell 2.x+
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== MJU-DRP Library Creation ===" -ForegroundColor Green

# Connect-PnPOnline -Url $SiteUrl -Interactive

$libraries = @(
    @{
        Name = "DRP Documents"
        Description = "Primary document storage for all registered consumer project documents"
        EnableVersioning = $true
        EnableMinorVersions = $false
        EnableApproval = $true
        ContentTypes = @("DRP Document")
    },
    @{
        Name = "DRP Evidence"
        Description = "Evidence documents mapped to quality assurance criteria"
        EnableVersioning = $true
        EnableMinorVersions = $false
        EnableApproval = $true
        ContentTypes = @("DRP Evidence")
    },
    @{
        Name = "DRP Templates"
        Description = "Standardized templates for metadata import, reports"
        EnableVersioning = $true
        EnableMinorVersions = $false
        EnableApproval = $false
        ContentTypes = @("DRP Template")
    },
    @{
        Name = "DRP Archive"
        Description = "Long-term preservation of superseded documents"
        EnableVersioning = $false
        EnableMinorVersions = $false
        EnableApproval = $false
        ContentTypes = @()
    },
    @{
        Name = "DRP Working Area"
        Description = "In-progress documents and collaborative drafts"
        EnableVersioning = $true
        EnableMinorVersions = $true
        EnableApproval = $false
        ContentTypes = @()
    },
    @{
        Name = "DRP Source Data"
        Description = "Raw data exports, CSV/Excel metadata templates"
        EnableVersioning = $false
        EnableMinorVersions = $false
        EnableApproval = $false
        ContentTypes = @()
    }
)

foreach ($lib in $libraries) {
    Write-Host "Creating library: $($lib.Name)" -ForegroundColor Yellow
    # New-PnPList -Title $lib.Name -Template DocumentLibrary
    # Set-PnPList -Identity $lib.Name -EnableVersioning $lib.EnableVersioning -EnableMinorVersions $lib.EnableMinorVersions
    # Set-PnPList -Identity $lib.Name -EnableContentApproval $lib.EnableApproval
    foreach ($ct in $lib.ContentTypes) {
        # Add-PnPContentTypeToList -List $lib.Name -ContentType $ct
    }
}

Write-Host "Library creation template complete." -ForegroundColor Green
Write-Host "Next: Run 02_create_columns.ps1"
