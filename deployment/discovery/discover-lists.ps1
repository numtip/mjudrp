<#
.SYNOPSIS
    Discovers all MJU-DRP SharePoint lists.
.DESCRIPTION
    Outputs list configuration as JSON.
.NOTES
    Template version: 1.0.0
    Output: JSON
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Discover: Lists ===" -ForegroundColor Cyan

# Connect-PnPOnline -Url $SiteUrl -Interactive
# $lists = Get-PnPList | Where-Object { $_.BaseTemplate -eq 100 -and $_.Title -like "DRP*" -or $_.Title -like "*QA*" -or $_.Title -like "*Review*" }

$listsInfo = @()
# foreach ($list in $lists) {
#     $listsInfo += @{
#         Title = $list.Title
#         Description = $list.Description
#         ItemCount = $list.ItemCount
#         Hidden = $list.Hidden
#     }
# }

# $listsInfo | ConvertTo-Json | Out-File "../reports/list-discovery.json"
Write-Host "Lists discovered: 0 (template)" -ForegroundColor Yellow

Write-Host "Discover lists template complete."
