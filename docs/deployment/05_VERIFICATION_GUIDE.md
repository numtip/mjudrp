# Verification Guide

## Overview

The Verification Kit ensures the deployed SharePoint environment matches the expected configuration.

## Verification Scripts

| Script | What It Verifies |
|--------|-----------------|
| `verify-site.ps1` | Site URL, web template, accessibility |
| `verify-libraries.ps1` | All 6 libraries exist, versioning, approval |
| `verify-columns.ps1` | All 22 columns present in correct group |
| `verify-lists.ps1` | All 5 lists exist |
| `verify-permissions.ps1` | All 7 groups exist |
| `verify-views.ps1` | Required views configured |

## Verification Checklist

The `verification-checklist.md` provides a comprehensive manual checklist covering:
- Pre-deployment setup
- Site configuration
- Libraries
- Columns
- Lists
- Permissions
- Views
- Final verification

## Usage

```powershell
# Run individual verification
.\deployment\verification\verify-libraries.ps1 -SiteUrl $SiteUrl

# Run all verifications
.\deployment\powershell\07_verify_environment.ps1 -SiteUrl $SiteUrl
```

## Expected Output

Each script outputs:
- Pass/Fail status for each check
- Summary of passed vs failed checks
- Detailed error information for failures

## Registry Validation

After verifying the SharePoint environment, also run:
```bash
node scripts/validate-registry.mjs
node scripts/validate-provisioning.mjs
node scripts/validate-deployment.mjs
```
