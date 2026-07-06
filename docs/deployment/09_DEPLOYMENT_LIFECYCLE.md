# Deployment Lifecycle

## Overview

The MJU-DRP deployment lifecycle describes the complete journey from AI-generated assets through deployment, verification, registry validation, and package release.

## Lifecycle Stages

```
┌──────────────────────────────────────────────────┐
│           1. PROVISIONING (Sprint 3B)              │
│   provisioning/ templates define WHAT to create    │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│             2. DEPLOYMENT (Sprint 3C)              │
│   deployment/ scripts define HOW to deploy         │
│   - PowerShell scripts                             │
│   - Site Scripts (JSON)                            │
│   - Site Designs                                   │
│   - CSV/JSON templates                             │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│               3. VERIFICATION                       │
│   deployment/verification/ confirms the site        │
│   matches the expected configuration                │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│               4. METADATA IMPORT                    │
│   - CSV import to SharePoint lists                  │
│   - Manual document upload                         │
│   - AI-assisted metadata review                    │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│               5. HEALTH CHECK                       │
│   deployment/health/ verifies runtime health        │
│   - Libraries, views, permissions, columns          │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│             6. REGISTRY VALIDATION                  │
│   node scripts/validate-registry.mjs               │
│   AJV schema + cross-reference validation          │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│              7. PACKAGE GENERATION                  │
│   node scripts/release.mjs                         │
│   Creates distributable registry package           │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│              8. CONSUMER RELEASE                    │
│   Consumer projects fetch latest package           │
│   from release/latest/registry-package/            │
└──────────────────────────────────────────────────┘
```

## Continuous Operations

```
Every N months:
  - Run discovery (deployment/discovery/)
  - Run health check (deployment/health/)
  - Run registry validation
  - Regenerate package
  - Release to consumers
```

## Components Involved

| Stage | Assets | Location |
|-------|--------|----------|
| Provisioning | 58 templates | provisioning/ |
| Deployment | 68 assets | deployment/ |
| Verification | 7 scripts + checklist | deployment/verification/ |
| Discovery | 7 scripts + report | deployment/discovery/ |
| Health Check | 3 assets | deployment/health/ |
| Rollback | 3 documents | deployment/rollback/ |
| Validation | 3 validators | scripts/ |
| Release | 15 artifacts | release/ |
