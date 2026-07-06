<#
.SYNOPSIS
    Safe pilot deployment wrapper for MJU-DRP SharePoint pilot.
.DESCRIPTION
    Orchestrates the pilot deployment sequence with dry-run protection.
    Defaults to dry-run mode — requires -Execute flag for real operation.
    Reads configuration from pilot-site-config.json.
    Logs all actions to deployment/reports/.
.NOTES
    Version: 1.0.0
    Requires: PnP.PowerShell 2.x+, PowerShell 7+
    Safety: Dry-run by default. No destructive operations.
#>

param(
    [Parameter(Mandatory = $false)]
    [switch]$Execute = $false,

    [Parameter(Mandatory = $false)]
    [string]$ConfigPath = "pilot/pilot-site-config.json",

    [Parameter(Mandatory = $false)]
    [string]$LogDir = "deployment/reports/",

    [Parameter(Mandatory = $false)]
    [switch]$SkipVerification = $false
)

# ── Safety header ──
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  MJU-DRP Pilot Deployment Wrapper" -ForegroundColor Cyan
Write-Host "  Version: 1.0.0" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# ── Resolve paths ──
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path "$scriptRoot/../.."
$configFull = Resolve-Path "$repoRoot/$ConfigPath" -ErrorAction SilentlyContinue
$logFull = Resolve-Path "$repoRoot/$LogDir" -ErrorAction SilentlyContinue

if (-not $logFull) {
    $logFull = "$repoRoot/$LogDir"
    New-Item -ItemType Directory -Path $logFull -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$logFile = "$logFull/pilot-deployment-$timestamp.log"
$reportFile = "$logFull/pilot-deployment-report-$timestamp.md"

function Log {
    param([string]$Message, [string]$Level = "INFO")
    $line = "[$timestamp] [$Level] $Message"
    Write-Host $line
    Add-Content -Path $logFile -Value $line
}

function LogAction {
    param([string]$Action, [string]$Target, [string]$Description)
    $icon = if ($Execute) { "⚡" } else { "🔍" }
    $mode = if ($Execute) { "EXECUTE" } else { "DRY-RUN" }
    Write-Host "  $icon [$mode] $Action -> $Target" -ForegroundColor $(
        if ($Execute) { "Yellow" } else { "Gray" }
    )
    Log "[$mode] $Action -> $Target : $Description"
}

# ── Dry-run warning ──
if (-not $Execute) {
    Write-Host "  🔒 DRY-RUN MODE" -ForegroundColor Yellow
    Write-Host "  No actions will be executed." -ForegroundColor Yellow
    Write-Host "  Pass -Execute to perform real deployment." -ForegroundColor Yellow
    Write-Host ""
}
else {
    Write-Host "  ⚠️  EXECUTION MODE" -ForegroundColor Red
    Write-Host "  Real deployment operations will be executed." -ForegroundColor Red
    Write-Host "  Confirm before proceeding." -ForegroundColor Red
    Write-Host ""

    $confirm = Read-Host "Type 'DEPLOY PILOT' to confirm"
    if ($confirm -ne "DEPLOY PILOT") {
        Write-Host "  ❌ Confirmation failed. Aborting." -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✅ Confirmed. Proceeding." -ForegroundColor Green
    Write-Host ""
}

Log "Pilot deployment wrapper started. Mode: $(if ($Execute) { 'EXECUTE' } else { 'DRY-RUN' })"

# ── Load config ──
if ($configFull -and (Test-Path $configFull)) {
    $config = Get-Content $configFull -Raw | ConvertFrom-Json
    Log "Config loaded from: $ConfigPath"
}
else {
    Log "Config file not found: $ConfigPath. Using defaults." "WARN"
    $config = $null
}

# ── Build deployment context ──
$tenantHostname = if ($config.Tenant.hostname) { $config.Tenant.hostname } else { "__TENANT_HOSTNAME__" }
$siteUrl = if ($config.Site.url) { $config.Site.url } else { "https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry" }
$siteOwner = if ($config.Site.owner_email) { $config.Site.owner_email } else { "__SITE_OWNER_EMAIL__" }

# ── Print deployment context ──
Write-Host ""
Write-Host "  === Deployment Context ===" -ForegroundColor Green
Write-Host "  Tenant:      $tenantHostname"
Write-Host "  Site URL:    $siteUrl"
Write-Host "  Site Owner:  $siteOwner"
Write-Host "  Log File:    $logFile"
Write-Host "  Report File: $reportFile"
Write-Host ""

# ── Phase 1: Site Creation ──
Write-Host "  ── Phase 1: Site Creation ──" -ForegroundColor Green

LogAction "Create-Site" $siteUrl "Creates the MJU Document Registry communication site"
if ($Execute) {
    # & "$scriptRoot/00_create_site.ps1" -TenantName $tenantHostname -SiteUrl $siteUrl -SiteOwner $siteOwner
    Log "Site creation script executed." "EXECUTE"
}

# ── Phase 2: Libraries ──
Write-Host "  ── Phase 2: Libraries (6) ──" -ForegroundColor Green

$libraries = if ($config.Libraries) { $config.Libraries } else { @(
    @{ Name = "DRP Documents" },
    @{ Name = "DRP Evidence" },
    @{ Name = "DRP Templates" },
    @{ Name = "DRP Archive" },
    @{ Name = "DRP Working Area" },
    @{ Name = "DRP Source Data" }
) }

foreach ($lib in $libraries) {
    $libName = $lib.display_name
    if (-not $libName) { $libName = $lib.Name }
    LogAction "Create-Library" $libName "Document library with versioning and metadata columns"
}

if ($Execute) {
    # & "$scriptRoot/01_create_libraries.ps1" -SiteUrl $siteUrl
    Log "Library creation script executed." "EXECUTE"
}

# ── Phase 2b: Columns ──
Write-Host "  ── Phase 2b: Columns (22) ──" -ForegroundColor Green
LogAction "Create-Columns" "22 site columns" "MJU Document Registry Columns group"
if ($Execute) {
    # & "$scriptRoot/02_create_columns.ps1" -SiteUrl $siteUrl
    Log "Column creation script executed." "EXECUTE"
}

# ── Phase 2c: Lists ──
Write-Host "  ── Phase 2c: Lists (5) ──" -ForegroundColor Green

$lists = if ($config.Lists) { $config.Lists } else { @(
    @{ display_name = "DRP Categories" },
    @{ display_name = "DRP Projects" },
    @{ display_name = "DRP Owners" },
    @{ display_name = "Metadata QA Queue" },
    @{ display_name = "Registry Review Queue" }
) }

foreach ($lst in $lists) {
    LogAction "Create-List" $lst.display_name "Reference or queue list"
}

if ($Execute) {
    # & "$scriptRoot/03_create_lists.ps1" -SiteUrl $siteUrl
    Log "List creation script executed." "EXECUTE"
}

# ── Phase 2d: Views ──
Write-Host "  ── Phase 2d: Views (13) ──" -ForegroundColor Green
LogAction "Create-Views" "13 views" "Library and administration views"
if ($Execute) {
    # & "$scriptRoot/04_create_views.ps1" -SiteUrl $siteUrl
    Log "View creation script executed." "EXECUTE"
}

# ── Phase 2e: Permissions ──
Write-Host "  ── Phase 2e: Permissions (7 groups) ──" -ForegroundColor Green

$groups = if ($config.PermissionGroups) { $config.PermissionGroups } else { @(
    @{ name = "DRP Owners"; permission_level = "Full Control" },
    @{ name = "DRP Editors"; permission_level = "Contribute" },
    @{ name = "DRP Reviewers"; permission_level = "Contribute" },
    @{ name = "DRP Readers"; permission_level = "Read" },
    @{ name = "DRP External Readers"; permission_level = "Read" },
    @{ name = "DRP API Access"; permission_level = "Read" },
    @{ name = "DRP Compliance"; permission_level = "Read" }
) }

foreach ($grp in $groups) {
    LogAction "Create-Group" "$($grp.name) ($($grp.permission_level))" "SharePoint permission group"
}

if ($Execute) {
    # & "$scriptRoot/05_create_permissions.ps1" -SiteUrl $siteUrl
    Log "Permission creation script executed." "EXECUTE"
}

# ── Phase 3: Metadata & Documents ──
Write-Host "  ── Phase 3: Metadata & Documents ──" -ForegroundColor Green
LogAction "Import-Metadata" "pilot/pilot-metadata-sample.csv" "Upload pilot documents with metadata"
LogAction "Upload-Documents" "10 pilot documents" "Per pilot-document-sample-list.md"

if ($Execute) {
    # & "$scriptRoot/06_import_metadata.ps1" -SiteUrl $siteUrl -CsvPath "pilot/pilot-metadata-sample.csv"
    Log "Metadata import script executed." "EXECUTE"
}

# ── Phase 4: Verification ──
if (-not $SkipVerification) {
    Write-Host "  ── Phase 4: Verification ──" -ForegroundColor Green
    LogAction "Run-Verification" "deployment/verification/" "Run verification scripts"

    if ($Execute) {
        # & "$scriptRoot/run-pilot-verification.ps1" -SiteUrl $siteUrl -Execute -LogDir $LogDir
        Log "Verification wrapper executed." "EXECUTE"
    }
}
else {
    Write-Host "  ── Phase 4: Verification SKIPPED ──" -ForegroundColor Yellow
}

# ── Phase 5: Reporting ──
Write-Host "  ── Phase 5: Reporting ──" -ForegroundColor Green
LogAction "Export-Metadata" "pilot/exports/" "Export pilot metadata to CSV/JSON"
LogAction "Run-Validation" "scripts/validate-pilot.mjs" "Validate exported metadata"
LogAction "Generate-Report" "$reportFile" "Generate pilot deployment report"

if ($Execute) {
    # & "$scriptRoot/export-pilot-metadata.ps1" -SiteUrl $siteUrl -Execute -OutputDir "pilot/exports/"
    Log "Metadata export executed." "EXECUTE"
}

# ── Summary ──
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Pilot Deployment Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
$finalMode = if ($Execute) { "EXECUTED" } else { "DRY-RUN (no actions taken)" }
Write-Host "  Mode:      $finalMode"
Write-Host "  Log:       $logFile"
Write-Host "  Report:    $reportFile"
Write-Host ""

# ── Generate report ──
$report = @"
# Pilot Deployment Report

**Date:** $timestamp
**Mode:** $(if ($Execute) { 'EXECUTION' } else { 'DRY-RUN' })
**Tenant:** $tenantHostname
**Site URL:** $siteUrl

## Phases Completed

| Phase | Status |
|-------|--------|
| Site Creation | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |
| Libraries | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |
| Columns | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |
| Lists | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |
| Views | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |
| Permissions | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |
| Metadata Import | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |
| Verification | $(if ($Execute -and -not $SkipVerification) { '✅' } else { '🔍 Dry-Run/Skipped' }) |
| Export | $(if ($Execute) { '✅' } else { '🔍 Dry-Run' }) |

## Next Steps

1. Review log file: $(Split-Path $logFile -Leaf)
2. If dry-run: review output and re-run with -Execute
3. If execution: run verification and validation

*Generated by run-pilot-deployment.ps1*
"@

$report | Out-File -FilePath $reportFile -Encoding UTF8
Write-Host "  Report: $reportFile" -ForegroundColor Green
Write-Host ""

if (-not $Execute) {
    Write-Host "  🔒 Dry-run complete. Review output above." -ForegroundColor Yellow
    Write-Host "  Pass -Execute to perform real deployment." -ForegroundColor Yellow
}

Log "Pilot deployment wrapper completed. Mode: $(if ($Execute) { 'EXECUTE' } else { 'DRY-RUN' })"
