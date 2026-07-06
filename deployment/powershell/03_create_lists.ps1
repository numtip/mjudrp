<#
.SYNOPSIS
    Creates the 5 MJU-DRP SharePoint lists.
.DESCRIPTION
    Creates reference lists (Categories, Projects, Owners) and workflow lists (Metadata QA Queue, Registry Review Queue).
.NOTES
    Template version: 1.0.0
    Requires: PnP.PowerShell 2.x+
    Reference: provisioning/lists/
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== MJU-DRP List Creation ===" -ForegroundColor Green

# Connect-PnPOnline -Url $SiteUrl -Interactive

$lists = @(
    @{ Name = "DRP Categories"; Description = "Master list of 22 document categories"; Template = "GenericList" },
    @{ Name = "DRP Projects"; Description = "Master list of 12 registered consumer projects"; Template = "GenericList" },
    @{ Name = "DRP Owners"; Description = "Master list of 12 document owners"; Template = "GenericList" },
    @{ Name = "Metadata QA Queue"; Description = "Workflow tracking for metadata review"; Template = "GenericList" },
    @{ Name = "Registry Review Queue"; Description = "Workflow tracking for registry integration"; Template = "GenericList" }
)

foreach ($list in $lists) {
    Write-Host "Creating list: $($list.Name)" -ForegroundColor Yellow
    # New-PnPList -Title $list.Name -Template $list.Template -Description $list.Description
}

Write-Host @"
After list creation, populate reference lists from CSV files:
  PRP Categories  <- deployment/csv/categories.csv
  DRP Projects    <- deployment/csv/projects.csv
  DRP Owners      <- deployment/csv/owners.csv

Run: 06_import_metadata.ps1 for bulk import.
"@ -ForegroundColor Yellow

Write-Host "List creation template complete." -ForegroundColor Green
Write-Host "Next: Run 04_create_views.ps1"
