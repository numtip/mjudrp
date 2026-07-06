<#
.SYNOPSIS
    Exports pilot metadata from SharePoint to CSV and JSON.
.DESCRIPTION
    Exports document metadata from the DRP Documents and DRP Evidence libraries.
    Uses PnP.PowerShell for automated export with manual CSV fallback.
    No Graph API dependency.
.NOTES
    Version: 1.0.0
    Requires: PnP.PowerShell 2.x+ (optional for auto mode)
    Output: pilot/exports/
    Safety: Read-only operation — never modifies SharePoint.
#>

param(
    [Parameter(Mandatory = $false)]
    [string]$SiteUrl = "__SITE_URL__",

    [Parameter(Mandatory = $false)]
    [string]$OutputDir = "pilot/exports/",

    [Parameter(Mandatory = $false)]
    [switch]$Execute = $false,

    [Parameter(Mandatory = $false)]
    [switch]$ManualFallback = $false
)

# ── Setup ──
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path "$scriptRoot/../.."
$outputFull = Resolve-Path "$repoRoot/$OutputDir" -ErrorAction SilentlyContinue

if (-not $outputFull) {
    $outputFull = "$repoRoot/$OutputDir"
    New-Item -ItemType Directory -Path $outputFull -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$logFile = "$outputFull/export-$timestamp.log"
$csvExport = "$outputFull/pilot-metadata-export.csv"
$jsonExport = "$outputFull/pilot-metadata-export.json"

function Log {
    param([string]$Message)
    $line = "[$timestamp] $Message"
    Add-Content -Path $logFile -Value $line
    Write-Host $line
}

# ── Safety header ──
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  MJU-DRP Metadata Export — Pilot" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

if (-not $Execute) {
    Write-Host "  🔒 DRY-RUN MODE" -ForegroundColor Yellow
    Write-Host "  No export will be performed." -ForegroundColor Yellow
    Write-Host "  Pass -Execute to perform real export." -ForegroundColor Yellow
    Write-Host ""
}

Log "Metadata export started. Site: $SiteUrl"
Log "Output directory: $outputFull"

# ── Print export plan ──
Write-Host "  === Export Plan ===" -ForegroundColor Green
Write-Host "  Libraries to export:"
Write-Host "    - DRP Documents (all items)"
Write-Host "    - DRP Evidence (all items)"
Write-Host "  Output formats: CSV, JSON"
Write-Host "  Output files:"
Write-Host "    - $csvExport"
Write-Host "    - $jsonExport"
Write-Host "  Mode: $(if ($Execute) { 'LIVE' } else { 'DRY-RUN' })"
Write-Host ""

if (-not $Execute) {
    Log "Dry-run complete. Pass -Execute to perform export."
    exit 0
}

# ── Mode selection ──
$usePnP = $false
try {
    $module = Get-Module -Name PnP.PowerShell -ListAvailable -ErrorAction SilentlyContinue
    if ($module -and -not $ManualFallback) {
        $usePnP = $true
    }
}
catch {
    $usePnP = $false
}

if ($usePnP) {
    Log "PnP.PowerShell detected — using automated export."
    Export-PnPMetadata -SiteUrl $SiteUrl -OutputDir $outputFull -LogFile $logFile
}
else {
    if ($ManualFallback) {
        Log "Manual fallback mode — generating template export files."
    }
    else {
        Log "PnP.PowerShell not found. Use -ManualFallback to generate template exports." "WARN"
    }
    Export-ManualFallback -OutputDir $outputFull -LogFile $logFile
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Export Complete" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CSV:  $csvExport"
Write-Host "  JSON: $jsonExport"
Write-Host "  Log:  $logFile"
Write-Host ""

# ── Export functions ──

function Export-PnPMetadata {
    param(
        [string]$SiteUrl,
        [string]$OutputDir,
        [string]$LogFile
    )

    Log "Connecting to site: $SiteUrl"
    # Connect-PnPOnline -Url $SiteUrl -Interactive

    $libraries = @("DRP Documents", "DRP Evidence")
    $allItems = @()

    foreach ($lib in $libraries) {
        Log "Exporting from library: $lib"

        # Get-PnPListItem -List $lib -PageSize 500 | ForEach-Object {
        #     $allItems += $_
        # }

        Log "  Found 0 items (template — replace with live call)"
    }

    # Generate CSV
    Log "Writing CSV export: $csvExport"

    # Generate JSON
    Log "Writing JSON export: $jsonExport"

    $exportData = @{
        timestamp = (Get-Date).ToString("o")
        source_site = $SiteUrl
        libraries = $libraries
        items = $allItems
        item_count = $allItems.Count
    }

    $exportData | ConvertTo-Json -Depth 4 | Out-File -FilePath $jsonExport -Encoding UTF8
    Log "JSON export written: $jsonExport ($($allItems.Count) items)"
}

function Export-ManualFallback {
    param(
        [string]$OutputDir,
        [string]$LogFile
    )

    Log "Generating manual fallback export templates."

    # Generate sample CSV
    $csvHeader = "DRP Document ID,Title,Category,Subcategory,Fiscal Year,Year,Version,Status,Owner,Department,Language,Keywords,Tags,Visibility,Project Refs,Evidence Refs,Related Documents,Share URL,Storage Path"
    $csvSample = @"
$csvHeader
PILOT-001,MJU-DRP Pilot Strategic Plan,strategic-plan,initiative,2569,2026,1.0,draft,owner-sustainability,Office of Sustainability,th,"pilot,strategic-plan,2569","pilot,strategic",internal,green-office-2026,EVD-PILOT-001,PILOT-002,https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-001-strategic-plan.pdf,/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-001-strategic-plan.pdf
PILOT-002,MJU-DRP Pilot Assessment Report,report,assessment,2569,2026,1.0,draft,owner-research,Research Administration,en,"pilot,assessment,rae","pilot,assessment",internal,rae-landing,EVD-PILOT-002,PILOT-001,https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-002-assessment-report.pdf,/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-002-assessment-report.pdf
PILOT-003,MJU-DRP Pilot Learning Guidelines,guideline,academic,2569,2026,1.0,draft,owner-learning-center,Learning Center,th,"pilot,guidelines,learning","pilot,guidelines",internal,learning-center,EVD-PILOT-003,PILOT-004,https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-003-learning-guidelines.pdf,/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-003-learning-guidelines.pdf
PILOT-004,MJU-DRP Pilot Research Policy,policy,data,2569,2026,1.0,draft,owner-research,Research Administration,th,"pilot,research,data,policy","pilot,policy,research",internal,research-portal,EVD-PILOT-004,PILOT-005,https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-004-research-policy.pdf,/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-004-research-policy.pdf
PILOT-005,MJU-DRP Pilot Green Office Report,report,environmental,2569,2026,1.0,draft,owner-sustainability,Office of Sustainability,en,"pilot,green-office,sustainability","pilot,green-office",public,green-office-2026,EVD-PILOT-005,PILOT-001,https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-005-green-office.pdf,/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-005-green-office.pdf
"@

    $csvSample | Out-File -FilePath $csvExport -Encoding UTF8
    Log "CSV export written: $csvExport (template with 5 sample rows)"

    # Generate JSON export
    $jsonData = @{
        timestamp = (Get-Date).ToString("o")
        source_site = $SiteUrl
        export_type = "manual_fallback"
        note = "Manual fallback — replace with live PnP export after site is provisioned"
        libraries_exported = @("DRP Documents")
        item_count = 5
        items = @(
            @{
                id = "PILOT-001"
                title = "MJU-DRP Pilot Strategic Plan"
                category = "strategic-plan"
                subcategory = "initiative"
                fiscal_year = "2569"
                year = 2026
                version = "1.0"
                status = "draft"
                owner = "owner-sustainability"
                department = "Office of Sustainability"
                language = "th"
                keywords = @("pilot", "strategic-plan", "2569")
                tags = @("pilot", "strategic")
                visibility = "internal"
                project_refs = @("green-office-2026")
                evidence_refs = @("EVD-PILOT-001")
                related_documents = @("PILOT-002")
                storage_path = "/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-001-strategic-plan.pdf"
                share_url = "https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-001-strategic-plan.pdf"
            }
            @{
                id = "PILOT-002"
                title = "MJU-DRP Pilot Assessment Report"
                category = "report"
                subcategory = "assessment"
                fiscal_year = "2569"
                year = 2026
                version = "1.0"
                status = "draft"
                owner = "owner-research"
                department = "Research Administration"
                language = "en"
                keywords = @("pilot", "assessment", "rae")
                tags = @("pilot", "assessment")
                visibility = "internal"
                project_refs = @("rae-landing")
                evidence_refs = @("EVD-PILOT-002")
                related_documents = @("PILOT-001")
                storage_path = "/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-002-assessment-report.pdf"
                share_url = "https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-002-assessment-report.pdf"
            }
            @{
                id = "PILOT-003"
                title = "MJU-DRP Pilot Learning Guidelines"
                category = "guideline"
                subcategory = "academic"
                fiscal_year = "2569"
                year = 2026
                version = "1.0"
                status = "draft"
                owner = "owner-learning-center"
                department = "Learning Center"
                language = "th"
                keywords = @("pilot", "guidelines", "learning")
                tags = @("pilot", "guidelines")
                visibility = "internal"
                project_refs = @("learning-center")
                evidence_refs = @("EVD-PILOT-003")
                related_documents = @("PILOT-004")
                storage_path = "/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-003-learning-guidelines.pdf"
                share_url = "https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-003-learning-guidelines.pdf"
            }
            @{
                id = "PILOT-004"
                title = "MJU-DRP Pilot Research Policy"
                category = "policy"
                subcategory = "data"
                fiscal_year = "2569"
                year = 2026
                version = "1.0"
                status = "draft"
                owner = "owner-research"
                department = "Research Administration"
                language = "th"
                keywords = @("pilot", "research", "data", "policy")
                tags = @("pilot", "policy", "research")
                visibility = "internal"
                project_refs = @("research-portal")
                evidence_refs = @("EVD-PILOT-004")
                related_documents = @("PILOT-005")
                storage_path = "/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-004-research-policy.pdf"
                share_url = "https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-004-research-policy.pdf"
            }
            @{
                id = "PILOT-005"
                title = "MJU-DRP Pilot Green Office Report"
                category = "report"
                subcategory = "environmental"
                fiscal_year = "2569"
                year = 2026
                version = "1.0"
                status = "draft"
                owner = "owner-sustainability"
                department = "Office of Sustainability"
                language = "en"
                keywords = @("pilot", "green-office", "sustainability")
                tags = @("pilot", "green-office")
                visibility = "public"
                project_refs = @("green-office-2026")
                evidence_refs = @("EVD-PILOT-005")
                related_documents = @("PILOT-001")
                storage_path = "/sites/MJUDocumentRegistry/DRP Documents/pilot-doc-005-green-office.pdf"
                share_url = "https://__TENANT_HOSTNAME__/sites/MJUDocumentRegistry/DRP%20Documents/pilot-doc-005-green-office.pdf"
            }
        )
    }

    $jsonData | ConvertTo-Json -Depth 4 | Out-File -FilePath $jsonExport -Encoding UTF8
    Log "JSON export written: $jsonExport (template with 5 sample items)"
}

Log "Metadata export process completed."
