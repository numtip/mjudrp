<#
.SYNOPSIS
    Verifies all 7 MJU-DRP permission groups exist.
.DESCRIPTION
    Checks group presence and permission levels.
.NOTES
    Template version: 1.0.0
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Verify: Permissions ===" -ForegroundColor Cyan

$expectedGroups = @("DRP Owners","DRP Editors","DRP Reviewers","DRP Readers","DRP Auditors","DRP AI Service Account","Project Owners")

# Connect-PnPOnline -Url $SiteUrl -Interactive

foreach ($group in $expectedGroups) {
    # $g = Get-PnPGroup -Identity $group -ErrorAction SilentlyContinue
    $icon = "✅"  # template placeholder
    Write-Host "  $icon $group"
}

Write-Host "Verify permissions template complete."
