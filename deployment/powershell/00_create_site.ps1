<#
.SYNOPSIS
    Creates the MJU Document Registry SharePoint site.
.DESCRIPTION
    Template script for creating a Communication Site for the MJU-DRP.
    Replace placeholders before execution.
.NOTES
    Template version: 1.0.0
    Requires: PnP.PowerShell 2.x+
    Run: .\00_create_site.ps1
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$TenantName = "__TENANT_NAME__",

    [Parameter(Mandatory=$true)]
    [string]$SiteName = "MJU Document Registry",

    [Parameter(Mandatory=$false)]
    [string]$SiteDescription = "Central document registry for MJU-DRP consumer projects.",

    [Parameter(Mandatory=$false)]
    [string]$SiteUrl = "__TENANT_URL__/sites/MJUDocumentRegistry",

    [Parameter(Mandatory=$false)]
    [string]$SiteOwner = "__SITE_OWNER_EMAIL__",

    [Parameter(Mandatory=$false)]
    [int]$TimeZoneId = 7,

    [Parameter(Mandatory=$false)]
    [int]$LocaleId = 1054
)

Write-Host "=== MJU-DRP Site Creation ===" -ForegroundColor Green
Write-Host "Template: deployment/powershell/00_create_site.ps1"

# Validate placeholders
if ($TenantName -eq "__TENANT_NAME__" -or $SiteOwner -eq "__SITE_OWNER_EMAIL__" -or $SiteUrl -like "*__TENANT_URL__*") {
    Write-Warning "WARNING: Unresolved placeholders detected. Review and update before running."
    Write-Host "TenantName: $TenantName"
    Write-Host "SiteUrl: $SiteUrl"
    Write-Host "SiteOwner: $SiteOwner"
    $confirm = Read-Host "Continue with placeholders? (y/N)"
    if ($confirm -ne "y") { exit }
}

Write-Host "Connecting to tenant: $TenantName" -ForegroundColor Yellow
# Connect-PnPOnline -Url "https://$TenantName-admin.sharepoint.com" -Interactive

Write-Host "Creating Communication Site: $SiteUrl" -ForegroundColor Yellow
# New-PnPSite -Type CommunicationSite `
#   -Title $SiteName `
#   -Description $SiteDescription `
#   -Url $SiteUrl `
#   -Owner $SiteOwner `
#   -TimeZone $TimeZoneId `
#   -LocaleId $LocaleId `
#   -Lcid $LocaleId

Write-Host "Configuring site settings..." -ForegroundColor Yellow
# Set-PnPStorageEntity -Key "DRP_SiteVersion" -Value "1.0.0"

Write-Host "Site creation template complete." -ForegroundColor Green

Write-Host @"

=== NEXT STEPS ===
1. Run 01_create_libraries.ps1
2. Run 02_create_columns.ps1
3. Run 03_create_lists.ps1
4. Run 04_create_views.ps1
5. Run 05_create_permissions.ps1
6. Run 06_import_metadata.ps1
7. Run 07_verify_environment.ps1

"@
