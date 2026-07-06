<#
.SYNOPSIS
    Creates standard views for MJU-DRP document libraries.
.DESCRIPTION
    Creates 13+ views across document libraries including general, project-specific, and role-specific views.
.NOTES
    Template version: 1.0.0
    Requires: PnP.PowerShell 2.x+
    Reference: provisioning/views/documents.json
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== MJU-DRP View Creation ===" -ForegroundColor Green

# Connect-PnPOnline -Url $SiteUrl -Interactive

$views = @(
    @{ Library = "DRP Documents"; Name = "All Active Documents"; Query = "<Where><Neq><FieldRef Name='Status'/><Value Type='Text'>archived</Value></Neq></Where>"; RowLimit = 30 },
    @{ Library = "DRP Documents"; Name = "Pending Review"; Query = "<Where><Eq><FieldRef Name='Status'/><Value Type='Text'>review</Value></Eq></Where>"; RowLimit = 30 },
    @{ Library = "DRP Documents"; Name = "Missing Metadata"; Query = "<Where><Or><Eq><FieldRef Name='Keywords'/><Value Type='Text'></Value></Eq><Eq><FieldRef Name='DRP_x0020_Category'/><Value Type='Text'></Value></Eq></Or></Where>"; RowLimit = 50 },
    @{ Library = "DRP Documents"; Name = "Recently Updated"; Query = "<Where><Gt><FieldRef Name='Modified'/><Value Type='DateTime'><Today/></Value></Gt></Where>"; RowLimit = 20 },
    @{ Library = "DRP Documents"; Name = "Public Documents"; Query = "<Where><Eq><FieldRef Name='DRP_x0020_Visibility'/><Value Type='Text'>public</Value></Eq></Where>"; RowLimit = 30 },
    @{ Library = "DRP Evidence"; Name = "All Evidence"; Query = ""; RowLimit = 30 },
    @{ Library = "DRP Evidence"; Name = "Satisfied Evidence"; Query = "<Where><Eq><FieldRef Name='DRP_x0020_Evidence_x0020_Status'/><Value Type='Text'>satisfied</Value></Eq></Where>"; RowLimit = 30 },
    @{ Library = "DRP Evidence"; Name = "Missing Evidence"; Query = "<Where><Eq><FieldRef Name='DRP_x0020_Evidence_x0020_Status'/><Value Type='Text'>missing</Value></Eq></Where>"; RowLimit = 30 },
    @{ Library = "DRP Templates"; Name = "All Templates"; Query = ""; RowLimit = 30 },
    @{ Library = "DRP Archive"; Name = "All Archived"; Query = ""; RowLimit = 50 }
)

foreach ($view in $views) {
    Write-Host "Creating view: $($view.Library) / $($view.Name)" -ForegroundColor Yellow
    # Add-PnPView -List $view.Library -Title $view.Name -Query $view.Query -RowLimit $view.RowLimit
}

Write-Host "View creation template complete." -ForegroundColor Green
Write-Host "Next: Run 05_create_permissions.ps1"
