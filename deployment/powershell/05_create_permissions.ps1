<#
.SYNOPSIS
    Creates MJU-DRP permission groups and configures library-level permissions.
.DESCRIPTION
    Creates 7 SharePoint groups and configures permission inheritance.
    Follows principle of least privilege.
.NOTES
    Template version: 1.0.0
    Requires: PnP.PowerShell 2.x+
    Reference: provisioning/permissions/
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl = "__SITE_URL__",

    [Parameter(Mandatory=$false)]
    [string[]]$OwnerMembers = @("__OWNER_EMAIL__"),

    [Parameter(Mandatory=$false)]
    [string[]]$EditorMembers = @(),

    [Parameter(Mandatory=$false)]
    [string[]]$ReviewerMembers = @(),

    [Parameter(Mandatory=$false)]
    [string[]]$ReaderMembers = @(),

    [Parameter(Mandatory=$false)]
    [string[]]$AuditorMembers = @(),

    [Parameter(Mandatory=$false)]
    [string[]]$AiServiceMembers = @(),

    [Parameter(Mandatory=$false)]
    [string[]]$ProjectOwnerMembers = @()
)

Write-Host "=== MJU-DRP Permission Creation ===" -ForegroundColor Green

# Connect-PnPOnline -Url $SiteUrl -Interactive

$groups = @(
    @{ Name = "DRP Owners"; Description = "Full control over MJU Document Registry"; Permission = "Full Control" },
    @{ Name = "DRP Editors"; Description = "Can contribute to document libraries"; Permission = "Contribute" },
    @{ Name = "DRP Reviewers"; Description = "Can review and edit metadata"; Permission = "Contribute" },
    @{ Name = "DRP Readers"; Description = "Read access to public documents"; Permission = "Read" },
    @{ Name = "DRP Auditors"; Description = "Read access to all content"; Permission = "Read" },
    @{ Name = "DRP AI Service Account"; Description = "Read-only for Graph API automation"; Permission = "Read" },
    @{ Name = "Project Owners"; Description = "Read access to project-filtered views"; Permission = "Read" }
)

foreach ($group in $groups) {
    Write-Host "Creating group: $($group.Name)" -ForegroundColor Yellow
    # New-PnPGroup -Title $group.Name -Description $group.Description
}

Write-Host @"
=== LIBRARY PERMISSION NOTES ===
1. DRP Documents:          Default inheritance (Readers see only public items)
2. DRP Evidence:           Break inheritance, remove Readers group
3. DRP Source Data:        Break inheritance, remove Readers group
4. DRP Templates:          Default inheritance (all readers)
5. DRP Archive:            Break inheritance, remove Readers group
6. DRP Working Area:       Break inheritance, restrict to Editors and Owners
"@ -ForegroundColor Cyan

Write-Host "Permission creation template complete." -ForegroundColor Green
Write-Host "Next: Run 06_import_metadata.ps1"
