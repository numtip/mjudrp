<#
.SYNOPSIS
    Discovers content types provisioned on the site.
.DESCRIPTION
    Outputs content type details as JSON.
.NOTES
    Template version: 1.0.0
    Output: JSON
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== Discover: Content Types ===" -ForegroundColor Cyan

# Connect-PnPOnline -Url $SiteUrl -Interactive
# $contentTypes = Get-PnPContentType

$ctInfo = @()
# foreach ($ct in $contentTypes) {
#     if ($ct.Group -eq "MJU Document Registry Content Types") {
#         $ctInfo += @{
#             Name = $ct.Name
#             Description = $ct.Description
#             Group = $ct.Group
#             Id = $ct.Id.StringValue
#         }
#     }
# }

# $ctInfo | ConvertTo-Json | Out-File "../reports/content-type-discovery.json"
Write-Host "Content types discovered: 0 (template)" -ForegroundColor Yellow

Write-Host "Discover content types template complete."
