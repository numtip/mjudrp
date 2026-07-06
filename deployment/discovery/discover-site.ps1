<#
.SYNOPSIS
    Discovers the MJU Document Registry site configuration.
.DESCRIPTION
    Outputs site metadata as JSON for reporting and validation.
.NOTES
    Template version: 1.0.0
    Output: JSON
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Discover: Site ===" -ForegroundColor Cyan

# Connect-PnPOnline -Url $SiteUrl -Interactive
# $web = Get-PnPWeb
# $site = Get-PnPSite

$siteInfo = @{
    SiteUrl = $SiteUrl
    # Title = $web.Title
    # Description = $web.Description
    # WebTemplate = $web.WebTemplate
    # TimeZone = $web.RegionalSettings.TimeZone
    # LocaleId = $web.RegionalSettings.LocaleId
    # Language = $web.Language
    # Created = $web.Created
    # LastItemModifiedDate = $web.LastItemModifiedDate
}
# $siteInfo | ConvertTo-Json | Out-File "../reports/site-discovery.json"

Write-Host "Site discovery output:" -ForegroundColor Yellow
Write-Host ($siteInfo | ConvertTo-Json)

Write-Host "Discover site template complete."
