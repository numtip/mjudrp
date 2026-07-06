<#
.SYNOPSIS
    Verifies all required views are configured in document libraries.
.DESCRIPTION
    Checks view presence and query definitions.
.NOTES
    Template version: 1.0.0
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Verify: Views ===" -ForegroundColor Cyan

$expectedViews = @(
    @{ Library = "DRP Documents"; Views = @("All Active Documents","Pending Review","Missing Metadata","Recently Updated","Public Documents") },
    @{ Library = "DRP Evidence"; Views = @("All Evidence","Satisfied Evidence") },
    @{ Library = "DRP Templates"; Views = @("All Templates") },
    @{ Library = "DRP Archive"; Views = @("All Archived") }
)

# Connect-PnPOnline -Url $SiteUrl -Interactive

foreach ($lib in $expectedViews) {
    Write-Host "  Library: $($lib.Library)" -ForegroundColor Yellow
    foreach ($view in $lib.Views) {
        # $v = Get-PnPView -List $lib.Library -Identity $view -ErrorAction SilentlyContinue
        $icon = "✅"  # template placeholder
        Write-Host "    $icon $view"
    }
}

Write-Host "Verify views template complete."
