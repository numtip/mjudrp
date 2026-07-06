# AI Deployment Workflow

## Overview

AI agents (Cursor, Microsoft 365 Copilot) assist in the deployment of the MJU Document Registry. This document defines the workflow boundaries: AI generates, administrator reviews, deployment proceeds.

## Workflow Stages

```
AI generates deployment assets
  (PowerShell templates, CSV imports, JSON configs)
        ↓
Administrator reviews generated assets
  (Check for correctness, safety, tenant-specific values)
        ↓
Administrator replaces placeholders
  (__TENANT_NAME__, __SITE_URL__, __SITE_OWNER_EMAIL__)
        ↓
Administrator executes deployment scripts
  (00_create_site.ps1 through 05_create_permissions.ps1)
        ↓
Administrator imports metadata
  (06_import_metadata.ps1 or manual CSV import)
        ↓
Administrator runs verification
  (07_verify_environment.ps1, verification scripts)
        ↓
Administrator runs health check
  (health-check.ps1)
        ↓
Registry Validation
  (node scripts/validate-registry.mjs)
        ↓
Generate package → Release
  (node scripts/release.mjs)
```

## AI Responsibilities

| Task | AI | Human |
|------|----|-------|
| Generate initial deployment scripts | ✅ | |
| Create CSV templates with sample data | ✅ | |
| Generate site scripts and designs | ✅ | |
| Create validation checklists | ✅ | |
| Review placeholders | | ✅ |
| Execute deployment | | ✅ |
| Import data | | ✅ |
| Verify environment | | ✅ |
| Approve for production | | ✅ |

## Safety Principles

- AI ALWAYS generates templates, NEVER deploys
- Human ALWAYS reviews before executing scripts
- Human ALWAYS replaces placeholders with actual values
- No automatic deployment from AI
- All scripts require manual confirmation for destructive operations
- Registry validation runs before any package release
