<#
.SYNOPSIS
    Discovers all document libraries in the MJU Document Registry site.
.DESCRIPTION
    Outputs library configuration as JSON including versioning, approval, content types.
.NOTES
    Template version: 1.0.0
    Output: JSON
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Discover: Libraries ===" -ForegroundColor Cyan

# Connect-PnPOnline -Url $SiteUrl -Interactive
# $lists = Get-PnPList | Where-Object { $_.BaseTemplate -eq 101 }

$librariesInfo = @()
# foreach ($list in $lists) {
#     $librariesInfo += @{
#         Title = $list.Title
#         Description = $list.Description
#         ItemCount = $list.ItemCount
#         EnableVersioning = $list.EnableVersioning
#         EnableMinorVersions = $list.EnableMinorVersions
#         EnableContentApproval = $list.EnableContentApproval
#         ContentTypesEnabled = $list.ContentTypesEnabled
#     }
# }

# $librariesInfo | ConvertTo-Json | Out-File "../reports/library-discovery.json"
Write-Host "Libraries discovered: 0 (template)" -ForegroundColor Yellow

Write-Host "Discover libraries template complete."
