# Current Outputs

## Generated Outputs (dist/)
12 JSON files (unchanged)

## Distribution Package (release/latest/registry-package/)
15 artifacts (unchanged)

## SharePoint Blueprint (docs/sharepoint/)
10 documents (unchanged)

## Provisioning Kit (provisioning/)
58 files (unchanged)

## Provisioning Docs (docs/provisioning/)
11 documents (unchanged)

## Deployment Kit (deployment/)
| Category | Files |
|----------|-------|
| PowerShell Scripts | 13 (10 original + 3 pilot wrappers) |
| Site Scripts | 8 |
| Site Designs | 5 |
| CSV Templates | 7 |
| JSON Templates | 7 |
| Verification Kit | 7 |
| Rollback Kit | 4 |
| Discovery Kit | 7 |
| Health Check Kit | 3 |
| Manifest + README | 2 |
| **Total** | **71** |

## Deployment Docs (docs/deployment/)
10 documents

## Pilot Kit (new)
| Category | Files |
|----------|-------|
| Pilot Docs | 3 (runbook, graph readiness, health check) |
| Pilot Config | 6 (configs, samples, checklist, readiness) |
| **Total** | **9 files** |

## Pilot Scripts (new)
| Script | Location | Purpose |
|--------|----------|---------|
| run-pilot-deployment.ps1 | deployment/powershell/ | Safe dry-run deployment wrapper |
| run-pilot-verification.ps1 | deployment/powershell/ | Verification with MD + JSON reports |
| export-pilot-metadata.ps1 | deployment/powershell/ | Metadata export to CSV/JSON |
| import-pilot-metadata.mjs | scripts/ | Convert export to registry format |
| validate-pilot.mjs | scripts/ | 7 validation checks |

## Consumer Contract
Consumers must ONLY depend on `release/*/registry-package/`.
For provisioning, use `provisioning/` templates.
For deployment, use `deployment/` scripts.
For pilot, use `docs/pilot/` and `pilot/`.
