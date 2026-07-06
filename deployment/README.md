# MJU-DRP SharePoint Deployment Kit

**Version:** 1.0.0
**Status:** READY — 2026-07-06

## Overview

The Deployment Kit converts the AI Provisioning Kit templates into production-ready deployment assets. It contains PowerShell scripts, Site Scripts (JSON), Site Designs, verification, rollback, discovery, and health check kits for deploying and managing MJU Document Registry SharePoint environments.

## Directory Structure

```
deployment/
├── README.md                       This file
├── deployment-manifest.json        Deployment version and compatibility
├── powershell/                     10 template PowerShell scripts
├── site-scripts/                   8 Site Script JSON templates
├── site-designs/                   5 Site Design templates
├── verification/                   6 verification scripts + checklist
├── rollback/                       Rollback guide, scripts, checklist
├── discovery/                      6 discovery scripts + report template
├── health/                         Health check script, rules, report template
├── csv/                            7 CSV import/export templates
├── json/                           7 JSON configuration templates
├── reports/                        Generated report output directory
└── examples/                       Example deployment assets
```

## Consumers

| Role | Uses |
|------|------|
| SharePoint Administrator | PowerShell scripts, Site Scripts, verification |
| AI Agent (Cursor) | Site Designs, deployment validation, CI pipeline |
| Registry Maintainer | CSV/JSON templates, metadata import |
| Project Owner | Discovery scripts, health checks |

## Deployment Order

1. Create site (00_create_site.ps1)
2. Create libraries (01_create_libraries.ps1)
3. Create columns (02_create_columns.ps1)
4. Create lists (03_create_lists.ps1)
5. Create views (04_create_views.ps1)
6. Create permissions (05_create_permissions.ps1)
7. Import metadata (06_import_metadata.ps1)
8. Verify environment (07_verify_environment.ps1)

## Key Principles

- **Template-first** — No hardcoded tenant values
- **Idempotent** — Safe to run multiple times
- **Reversible** — Rollback kit for recovery
- **AI-friendly** — Scripts structured for AI interpretation
