<#
.SYNOPSIS
    Archives metadata from active libraries to DRP Archive.
.DESCRIPTION
    Moves or copies document metadata from active libraries to DRP Archive.
    Documents remain available in archive for compliance.
.NOTES
    Template version: 1.0.0
    Reference: deployment/rollback/rollback-guide.md
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__",

    [Parameter(Mandatory=$false)]
    [string]$SourceLibrary = "DRP Documents",

    [Parameter(Mandatory=$false)]
    [string]$ArchiveLibrary = "DRP Archive",

    [Parameter(Mandatory=$false)]
    [string]$FilterOlderThan = "2020-01-01",

    [Parameter(Mandatory=$false)]
    [switch]$ExportBeforeArchive = $true
)

Write-Host "=== MJU-DRP Metadata Archival ===" -ForegroundColor Yellow
Write-Host "Source: $SourceLibrary -> Archive: $ArchiveLibrary"
Write-Host "Filter: Older than $FilterOlderThan"

$confirmation = Read-Host "Continue with archival? (Type 'yes' to confirm)"
if ($confirmation -ne "yes") {
    Write-Host "Operation cancelled." -ForegroundColor Yellow
    exit
}

Write-Host "Archival template complete." -ForegroundColor Green
