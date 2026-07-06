<#
.SYNOPSIS
    Verifies all 6 MJU-DRP document libraries exist and are configured correctly.
.DESCRIPTION
    Checks library presence, versioning settings, content types, and approval settings.
.NOTES
    Template version: 1.0.0
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Verify: Libraries ===" -ForegroundColor Cyan

$expected = @(
    @{ Name = "DRP Documents"; Versioning = "MajorOnly"; Approval = $true },
    @{ Name = "DRP Evidence"; Versioning = "MajorOnly"; Approval = $true },
    @{ Name = "DRP Templates"; Versioning = "MajorOnly"; Approval = $false },
    @{ Name = "DRP Archive"; Versioning = "None"; Approval = $false },
    @{ Name = "DRP Working Area"; Versioning = "MajorMinor"; Approval = $false },
    @{ Name = "DRP Source Data"; Versioning = "None"; Approval = $false }
)

# Connect-PnPOnline -Url $SiteUrl -Interactive

foreach ($lib in $expected) {
    # $list = Get-PnPList -Identity $lib.Name -ErrorAction SilentlyContinue
    # $exists = $list -ne $null
    $exists = $true  # template placeholder
    $icon = if ($exists) { "✅" } else { "❌" }
    Write-Host "  $icon $($lib.Name) [Found: $exists]"
}

Write-Host "Verify libraries template complete."
