<#
.SYNOPSIS
    Creates all 22 MJU-DRP metadata site columns.
.DESCRIPTION
    Creates site columns mapped to Registry Specification v1.0.
    Adds columns to "MJU Document Registry Columns" group.
.NOTES
    Template version: 1.0.0
    Requires: PnP.PowerShell 2.x+
    Reference: provisioning/columns/document-columns.json
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__"
)

Write-Host "=== MJU-DRP Column Creation ===" -ForegroundColor Green

# Connect-PnPOnline -Url $SiteUrl -Interactive

$columnGroup = "MJU Document Registry Columns"

$columns = @(
    @{ Name = "DRP_x0020_Document_x0020_ID"; DisplayName = "DRP Document ID"; Type = "Text"; Required = $true; Group = $columnGroup },
    @{ Name = "Title"; DisplayName = "Title"; Type = "Text"; Required = $true; Group = $columnGroup },
    @{ Name = "DRP_x0020_Description"; DisplayName = "Description"; Type = "Note"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Category"; DisplayName = "Category"; Type = "Choice"; Required = $true; Choices = @("policy","guideline","report","template","training"); Group = $columnGroup },
    @{ Name = "DRP_x0020_Subcategory"; DisplayName = "Subcategory"; Type = "Choice"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Fiscal_x0020_Year"; DisplayName = "Fiscal Year"; Type = "Text"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Year"; DisplayName = "Year"; Type = "Number"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Version"; DisplayName = "Version"; Type = "Text"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Status"; DisplayName = "Status"; Type = "Choice"; Required = $false; Choices = @("draft","review","approved","published","archived","superseded"); Group = $columnGroup },
    @{ Name = "DRP_x0020_Owner"; DisplayName = "Owner"; Type = "User"; Required = $true; Group = $columnGroup },
    @{ Name = "DRP_x0020_Department"; DisplayName = "Department"; Type = "Choice"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Keywords"; DisplayName = "Keywords"; Type = "Note"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Tags"; DisplayName = "Tags"; Type = "Note"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Language"; DisplayName = "Language"; Type = "Choice"; Required = $false; Choices = @("th","en"); Group = $columnGroup },
    @{ Name = "DRP_x0020_Project_x0020_Refs"; DisplayName = "Project Refs"; Type = "Note"; Required = $true; Group = $columnGroup },
    @{ Name = "DRP_x0020_Evidence_x0020_Refs"; DisplayName = "Evidence Refs"; Type = "Note"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Related_x0020_Documents"; DisplayName = "Related Documents"; Type = "Note"; Required = $false; Group = $columnGroup },
    @{ Name = "DRP_x0020_Visibility"; DisplayName = "Visibility"; Type = "Choice"; Required = $false; Choices = @("public","internal","confidential","restricted"); Group = $columnGroup },
    @{ Name = "DRP_x0020_Share_x0020_URL"; DisplayName = "Share URL"; Type = "URL"; Required = $true; Group = $columnGroup }
)

foreach ($col in $columns) {
    Write-Host "Creating column: $($col.DisplayName)" -ForegroundColor Yellow
    # Add-PnPField -DisplayName $col.DisplayName -InternalName $col.Name -Type $col.Type -Group $col.Group -Required $col.Required
}

Write-Host "Column creation template complete." -ForegroundColor Green
Write-Host "Next: Run 03_create_lists.ps1"
