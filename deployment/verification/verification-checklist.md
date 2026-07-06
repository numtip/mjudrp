# MJU-DRP Deployment Verification Checklist

## Pre-Deployment Checklist

- [ ] Tenant name configured (`__TENANT_NAME__` replaced)
- [ ] Site URL determined (`__SITE_URL__` replaced)
- [ ] Site owner identified (`__SITE_OWNER_EMAIL__` configured)
- [ ] PnP.PowerShell module installed (version 2.x+)
- [ ] User has SharePoint Administrator permissions
- [ ] User has permissions to create sites

## Site Checklist

- [ ] Site created (`00_create_site.ps1`)
- [ ] Site accessible via browser
- [ ] Time zone set to Bangkok (UTC+7)
- [ ] Default language set to Thai
- [ ] English configured as alternate language
- [ ] External sharing restricted

## Libraries Checklist

- [ ] DRP Documents created (versioning enabled, approval required)
- [ ] DRP Evidence created (versioning enabled, approval required)
- [ ] DRP Templates created (versioning enabled)
- [ ] DRP Archive created (versioning disabled)
- [ ] DRP Working Area created (major + minor versioning)
- [ ] DRP Source Data created (versioning disabled)

## Columns Checklist

- [ ] All 22 site columns created in "MJU Document Registry Columns" group
- [ ] Required columns marked as required (DRP Document ID, Title, Category, Owner, Project Refs)
- [ ] Choice columns have correct value lists
- [ ] Columns added to each library

## Lists Checklist

- [ ] DRP Categories created
- [ ] DRP Projects created
- [ ] DRP Owners created
- [ ] Metadata QA Queue created
- [ ] Registry Review Queue created

## Permissions Checklist

- [ ] DRP Owners group created (Full Control)
- [ ] DRP Editors group created (Contribute)
- [ ] DRP Reviewers group created (Contribute)
- [ ] DRP Readers group created (Read)
- [ ] DRP Auditors group created (Read)
- [ ] DRP AI Service Account group created (Read)
- [ ] Project Owners group created (Read)
- [ ] Permission inheritance broken on restricted libraries

## Views Checklist

- [ ] All Active Documents view
- [ ] Pending Review view
- [ ] Missing Metadata view
- [ ] Recently Updated view
- [ ] Public Documents view
- [ ] All Evidence view
- [ ] Satisfied Evidence view
- [ ] All Templates view
- [ ] All Archived view

## Final Verification

- [ ] `07_verify_environment.ps1` reports PASS
- [ ] Sample document can be uploaded and metadata filled
- [ ] Navigation links work correctly
- [ ] Permission levels verified for each group
