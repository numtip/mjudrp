# MJU-DRP Common Errors

**Version:** 1.0.0
**Status:** READY — 2026-07-06

---

## Registry Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `"id" is required` | Document missing ID field | Add unique `id` field |
| `Duplicate Document ID: "XYZ"` | Two documents share same ID | Change one to a unique ID |
| `Owner "xyz" not found` | Document references unknown owner | Add owner to `registry/owners.sample.json` or fix ref |
| `Category "xyz" not found` | Document references unknown category | Add category or fix ref |
| `Project ref "xyz" not found` | Document references unknown project | Add project or fix ref |
| `Evidence ref "xyz" not found` | Document references unknown evidence | Add evidence or fix ref |
| `Invalid JSON in ...` | File has syntax error | Validate JSON with `jsonlint` or editor tools |
| `Schema compilation failed` | Schema file has error | Check schema JSON syntax |

## Provisioning Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `File not found: provisioning/...` | Template file missing | Ensure all 58 provisioning files exist |
| `Invalid JSON` | Template has syntax error | Validate JSON |
| `manifest.json is not valid` | Manifest has missing/invalid fields | Check manifest structure |

## Deployment Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `File not found: deployment/...` | Asset file missing | Ensure all 71 deployment files exist |
| `No MJU-DRP header` | PowerShell script missing header | Add standard header to script |
| `No placeholders` | Script has no __VAR__ placeholders | Ensure template placeholders present |
| `Site script has no operations` | JSON script missing operations array | Add operations array |

## Package Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Package file not found` | Release not generated | Run `node scripts/release.mjs` |
| `Checksum mismatch` | File changed after checksum | Re-run release pipeline |
| `Count mismatch` | Registry counts don't match | Re-generate and re-release |

## Test Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Schema file not found` | Schema missing from schemas/ | Restore schema file |
| `Document validation failed` | Document doesn't match schema | Fix document data |
| `Generator output missing` | dist/ files not generated | Run `generate-search-index.mjs` |
| `Cross-reference error` | Invalid refs in registry | Fix reference data |

## PowerShell Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Connect-PnPOnline : Unable to connect` | Not authenticated | Uncomment and use `-Interactive` |
| `New-PnPSite : Access denied` | Insufficient permissions | Request SharePoint Admin role |
| `Set-PnPList : List not found` | Wrong list name | Verify list exists |
| `Command not found` | PnP.PowerShell not installed | Run `Install-Module PnP.PowerShell` |
| `The term 'Connect-PnPOnline' is not recognized` | Module not loaded | Run `Import-Module PnP.PowerShell` |

## Git Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Failed to connect to github.com` | Network issue | Retry later or check VPN/proxy |
| `Push rejected` | Branch protection or stale branch | Pull latest, resolve conflicts |
| `Merge conflict in ...` | Concurrent edits | Resolve conflicts manually |

## Pilot Deployment Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Config file not found` | Wrong path or missing config | Check `pilot/pilot-site-config.json` |
| `Unresolved placeholders` | __VAR__ not replaced | Replace all placeholders with real values |
| `Confirmation failed` | Wrong confirmation text | Type `DEPLOY PILOT` exactly |
| `Export produced 0 items` | No documents in library | Upload documents first |
| `Import report shows errors` | CSV format mismatch | Check column headers match template |

## When All Else Fails

1. Check logs in `deployment/reports/`
2. Check `pilot/generated/validation-report.json`
3. Re-run `node scripts/release.mjs` to regenerate all artifacts
4. Consult the troubleshooting guide: `docs/operations/04_TROUBLESHOOTING_GUIDE.md`
5. Escalate to project owner
