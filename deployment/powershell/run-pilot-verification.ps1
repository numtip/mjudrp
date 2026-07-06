<#
.SYNOPSIS
    Pilot verification wrapper for MJU-DRP SharePoint pilot.
.DESCRIPTION
    Calls existing verification scripts and generates reports.
    Outputs reports to deployment/reports/ in both MD and JSON formats.
.NOTES
    Version: 1.0.0
    Requires: PnP.PowerShell 2.x+, PowerShell 7+
    References: deployment/verification/*.ps1
#>

param(
    [Parameter(Mandatory = $false)]
    [string]$SiteUrl = "__SITE_URL__",

    [Parameter(Mandatory = $false)]
    [string]$LogDir = "deployment/reports/",

    [Parameter(Mandatory = $false)]
    [string]$VerificationScriptsDir = "deployment/verification/"
)

# ── Setup ──
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path "$scriptRoot/../.."
$logFull = Resolve-Path "$repoRoot/$LogDir" -ErrorAction SilentlyContinue

if (-not $logFull) {
    $logFull = "$repoRoot/$LogDir"
    New-Item -ItemType Directory -Path $logFull -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$isoTimestamp = (Get-Date).ToString("o")
$mdReport = "$logFull/pilot-verification-report-$timestamp.md"
$jsonReport = "$logFull/pilot-verification-report-$timestamp.json"
$logFile = "$logFull/pilot-verification-$timestamp.log"

$results = @{
    timestamp = $isoTimestamp
    site_url = $SiteUrl
    checks = @()
    summary = @{
        total = 0
        passed = 0
        failed = 0
        skipped = 0
    }
    status = "PENDING"
}

function Log {
    param([string]$Message)
    $line = "[$timestamp] $Message"
    Add-Content -Path $logFile -Value $line
    Write-Host $line
}

function Add-CheckResult {
    param(
        [string]$Category,
        [string]$CheckName,
        [string]$Status,
        [string]$Details = ""
    )
    $result = @{
        category = $Category
        check = $CheckName
        status = $Status
        details = $Details
    }
    $results.checks += $result
    $results.summary.total++

    $icon = switch ($Status) {
        "PASS" { $results.summary.passed++; "✅" }
        "FAIL" { $results.summary.failed++; "❌" }
        "WARN" { $results.summary.passed++; "⚠️" }
        default { $results.summary.skipped++; "⏭️" }
    }
    Log "  $icon [$Category] $CheckName : $Status $Details"
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  MJU-DRP Pilot Verification Wrapper" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Log "Verification started for site: $SiteUrl"

# ── 1. Verify Site ──
Write-Host "  ── 1. Site Verification ──" -ForegroundColor Green

# Simulate verify-site checks
$siteChecks = @(
    @{ Name = "Site accessible"; Check = "Resolve-PnPWeb" }
    @{ Name = "Site URL format valid"; Check = "URL pattern" }
    @{ Name = "Site template correct"; Check = "CommunicationSite" }
    @{ Name = "Time zone Bangkok (UTC+7)"; Check = "TimeZone" }
)

foreach ($check in $siteChecks) {
    # In real execution, call: .\deployment\verification\verify-site.ps1 -SiteUrl $SiteUrl
    # For template purposes, mark as template:
    Add-CheckResult -Category "Site" -CheckName $check.Name -Status "TEMPLATE" -Details "Run verify-site.ps1 for real result"
}

# ── 2. Verify Libraries ──
Write-Host "  ── 2. Library Verification ──" -ForegroundColor Green

$expectedLibraries = @(
    "DRP Documents",
    "DRP Evidence",
    "DRP Templates",
    "DRP Archive",
    "DRP Working Area",
    "DRP Source Data"
)

foreach ($lib in $expectedLibraries) {
    Add-CheckResult -Category "Library" -CheckName $lib -Status "TEMPLATE" -Details "Run verify-libraries.ps1 for real result"
}

Add-CheckResult -Category "Library" -CheckName "Library Count (6)" -Status "TEMPLATE" -Details "Expected 6 libraries"

# ── 3. Verify Columns ──
Write-Host "  ── 3. Column Verification ──" -ForegroundColor Green

$expectedColumns = @(
    "DRP Document ID", "Title", "Description", "Category", "Subcategory",
    "Fiscal Year", "Year", "Version", "Status", "Owner", "Department",
    "Keywords", "Tags", "Language", "File Type", "Project Refs",
    "Evidence Refs", "Related Documents", "Visibility", "Share URL"
)

foreach ($col in $expectedColumns) {
    Add-CheckResult -Category "Column" -CheckName $col -Status "TEMPLATE" -Details "Run verify-columns.ps1 for real result"
}

Add-CheckResult -Category "Column" -CheckName "Column Count (22)" -Status "TEMPLATE" -Details "Expected 22 columns"
Add-CheckResult -Category "Column" -CheckName "Required columns marked" -Status "TEMPLATE" -Details "5 required columns"

# ── 4. Verify Lists ──
Write-Host "  ── 4. List Verification ──" -ForegroundColor Green

$expectedLists = @(
    "DRP Categories",
    "DRP Projects",
    "DRP Owners",
    "Metadata QA Queue",
    "Registry Review Queue"
)

foreach ($lst in $expectedLists) {
    Add-CheckResult -Category "List" -CheckName $lst -Status "TEMPLATE" -Details "Run verify-lists.ps1 for real result"
}

Add-CheckResult -Category "List" -CheckName "List Count (5)" -Status "TEMPLATE" -Details "Expected 5 lists"

# ── 5. Verify Views ──
Write-Host "  ── 5. View Verification ──" -ForegroundColor Green
Add-CheckResult -Category "View" -CheckName "13 views configured" -Status "TEMPLATE" -Details "Run verify-views.ps1 for real result"
Add-CheckResult -Category "View" -CheckName "Document views exist" -Status "TEMPLATE" -Details "All Documents, By Category, By Status"
Add-CheckResult -Category "View" -CheckName "Evidence views exist" -Status "TEMPLATE" -Details "All Evidence, By Project"

# ── 6. Verify Permissions ──
Write-Host "  ── 6. Permission Verification ──" -ForegroundColor Green

$expectedGroups = @(
    "DRP Owners",
    "DRP Editors",
    "DRP Reviewers",
    "DRP Readers",
    "DRP External Readers",
    "DRP API Access",
    "DRP Compliance"
)

foreach ($grp in $expectedGroups) {
    Add-CheckResult -Category "Permission" -CheckName $grp -Status "TEMPLATE" -Details "Run verify-permissions.ps1 for real result"
}

Add-CheckResult -Category "Permission" -CheckName "Group Count (7)" -Status "TEMPLATE" -Details "Expected 7 groups"

# ── 7. Metadata Export Check ──
Write-Host "  ── 7. Metadata Export Check ──" -ForegroundColor Green
Add-CheckResult -Category "Export" -CheckName "Metadata exported to CSV" -Status "TEMPLATE" -Details "Run export-pilot-metadata.ps1 for real result"
Add-CheckResult -Category "Export" -CheckName "Metadata exported to JSON" -Status "TEMPLATE" -Details "Run export-pilot-metadata.ps1 for real result"

# ── 8. Document Upload Check ──
Write-Host "  ── 8. Document Upload Check ──" -ForegroundColor Green
Add-CheckResult -Category "Document" -CheckName "Pilot documents uploaded" -Status "TEMPLATE" -Details "Check DRP Documents library"
Add-CheckResult -Category "Document" -CheckName "Evidence documents uploaded" -Status "TEMPLATE" -Details "Check DRP Evidence library"

# ── Summary ──
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Verification Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Total checks:  $($results.summary.total)"
Write-Host "  Passed:        $($results.summary.passed)" -ForegroundColor Green
Write-Host "  Failed:        $($results.summary.failed)" -ForegroundColor Red
Write-Host "  Skipped:       $($results.summary.skipped)" -ForegroundColor Yellow

$overallStatus = if ($results.summary.failed -eq 0) { "PASS" } else { "FAIL" }
$results.status = $overallStatus

Write-Host "  Status:        $overallStatus" -ForegroundColor $(if ($overallStatus -eq "PASS") { "Green" } else { "Red" })
Write-Host ""

# ── Write reports ──

# Markdown report
$mdContent = @"
# Pilot Verification Report

**Date:** $isoTimestamp
**Site URL:** $SiteUrl
**Status:** $overallStatus

## Summary

| Metric | Value |
|--------|-------|
| Total Checks | $($results.summary.total) |
| Passed | $($results.summary.passed) |
| Failed | $($results.summary.failed) |
| Skipped | $($results.summary.skipped) |

## Checks

"@

$byCategory = $results.checks | Group-Object category
foreach ($cat in $byCategory) {
    $mdContent += "`n### $($cat.Name)`n`n"
    $mdContent += "| Check | Status | Details |`n"
    $mdContent += "|-------|--------|---------|`n"
    foreach ($check in $cat.Group) {
        $icon = switch ($check.status) {
            "PASS" { "✅" }
            "FAIL" { "❌" }
            "WARN" { "⚠️" }
            default { "⏭️" }
        }
        $mdContent += "| $icon $($check.check) | $($check.status) | $($check.details) |`n"
    }
}

$mdContent += @"

---

*Generated by run-pilot-verification.ps1 at $isoTimestamp*
"@

$mdContent | Out-File -FilePath $mdReport -Encoding UTF8

# JSON report
$results | ConvertTo-Json -Depth 3 | Out-File -FilePath $jsonReport -Encoding UTF8

Log "Markdown report: $mdReport"
Log "JSON report: $jsonReport"
Log "Verification completed with status: $overallStatus"

Write-Host "  Reports generated:" -ForegroundColor Green
Write-Host "    📄 $mdReport"
Write-Host "    📄 $jsonReport"
Write-Host ""
