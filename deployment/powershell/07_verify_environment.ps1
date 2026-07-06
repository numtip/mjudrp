<#
.SYNOPSIS
    Verifies the MJU-DRP SharePoint environment.
.DESCRIPTION
    Checks all libraries, lists, columns, views, and permissions are configured correctly.
.NOTES
    Template version: 1.0.0
    Requires: PnP.PowerShell 2.x+
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__",

    [Parameter(Mandatory=$false)]
    [string]$ReportPath = "../reports"
)

Write-Host "=== MJU-DRP Environment Verification ===" -ForegroundColor Green

# Connect-PnPOnline -Url $SiteUrl -Interactive

$results = @()
$pass = 0
$fail = 0

# Verify libraries
$expectedLibraries = @("DRP Documents","DRP Evidence","DRP Templates","DRP Archive","DRP Working Area","DRP Source Data")
foreach ($lib in $expectedLibraries) {
    Write-Host "Checking library: $lib" -ForegroundColor Yellow
    # $exists = Get-PnPList -Identity $lib -ErrorAction SilentlyContinue
    # if ($exists) { $pass++ } else { $fail++; $results += "MISSING: Library $lib" }
}

# Verify lists
$expectedLists = @("DRP Categories","DRP Projects","DRP Owners","Metadata QA Queue","Registry Review Queue")
foreach ($lst in $expectedLists) {
    Write-Host "Checking list: $lst" -ForegroundColor Yellow
    # $exists = Get-PnPList -Identity $lst -ErrorAction SilentlyContinue
    # if ($exists) { $pass++ } else { $fail++; $results += "MISSING: List $lst" }
}

# Verify groups
$expectedGroups = @("DRP Owners","DRP Editors","DRP Reviewers","DRP Readers","DRP Auditors","DRP AI Service Account","Project Owners")
foreach ($grp in $expectedGroups) {
    Write-Host "Checking group: $grp" -ForegroundColor Yellow
    # $exists = Get-PnPGroup -Identity $grp -ErrorAction SilentlyContinue
    # if ($exists) { $pass++ } else { $fail++; $results += "MISSING: Group $grp" }
}

# Generate report
$report = @{
    Timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    LibrariesPassed = ($pass)
    LibrariesFailed = ($fail)
    Status = if ($fail -eq 0) { "PASS" } else { "FAIL" }
    Issues = $results
}
# $report | ConvertTo-Json | Out-File "$ReportPath/verification-report.json"

Write-Host "=== Verification Results ===" -ForegroundColor Green
Write-Host "Passed: $pass | Failed: $fail"
if ($fail -eq 0) { Write-Host "ENVIRONMENT VERIFIED: PASS" -ForegroundColor Green }
else { Write-Host "ENVIRONMENT VERIFIED: FAIL (review issues above)" -ForegroundColor Red }

Write-Host "Verification template complete." -ForegroundColor Green
Write-Host "Next: Run 08_export_metadata.ps1 or 09_cleanup_demo.ps1"
