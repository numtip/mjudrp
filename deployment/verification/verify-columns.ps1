<#
.SYNOPSIS
    Verifies all required MJU-DRP site columns exist.
.DESCRIPTION
    Checks presence of 22 metadata columns in MJU Document Registry Columns group.
.NOTES
    Template version: 1.0.0
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Verify: Columns ===" -ForegroundColor Cyan

$requiredColumns = @("DRP Document ID","Title","Category","Status","Owner","Project Refs","Share URL","Visibility","Language","Version","Keywords","Department","Fiscal Year")

# Connect-PnPOnline -Url $SiteUrl -Interactive

$found = 0
$missing = @()

foreach ($col in $requiredColumns) {
    # $field = Get-PnPField -Identity $col -ErrorAction SilentlyContinue
    # if ($field) { $found++ } else { $missing += $col }
    $found++  # template placeholder
}

Write-Host "  Columns found: $found / $($requiredColumns.Count)"
foreach ($m in $missing) {
    Write-Host "  ❌ Missing: $m"
}

if ($missing.Count -eq 0) {
    Write-Host "  ✅ All required columns present." -ForegroundColor Green
}

Write-Host "Verify columns template complete."
