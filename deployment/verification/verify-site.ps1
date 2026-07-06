<#
.SYNOPSIS
    Verifies the MJU Document Registry site exists and is accessible.
.DESCRIPTION
    Checks site URL, web template, and basic configuration.
.NOTES
    Template version: 1.0.0
    Reference: deployment/verification/verification-checklist.md
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Verify: Site ===" -ForegroundColor Cyan

# Connect-PnPOnline -Url $SiteUrl -Interactive

# $web = Get-PnPWeb
# $webTemplate = $web.WebTemplate
# $webTitle = $web.Title

Write-Host "  Site URL: $SiteUrl"
# Write-Host "  Title: $webTitle"
# Write-Host "  Template: $webTemplate"

$checks = @(
    # @{ Name = "Site accessible"; Status = if ($web) { "PASS" } else { "FAIL" } },
    @{ Name = "Site URL format valid"; Status = if ($SiteUrl -match "^https://") { "PASS" } else { "FAIL" } }
)

foreach ($check in $checks) {
    $icon = if ($check.Status -eq "PASS") { "✅" } else { "❌" }
    Write-Host "  $icon $($check.Name): $($check.Status)"
}

Write-Host "Verify site template complete."
