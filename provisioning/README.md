# MJU-DRP AI Provisioning Kit

**Version:** 1.0.0
**Status:** READY — 2026-07-06

## Overview

This AI Provisioning Kit converts the SharePoint Enterprise Blueprint into reusable Infrastructure-as-Code-style artifacts. Every template, prompt, and validation document is designed to be consumed by:

- **Human administrators** — Manual setup checklists and reference templates
- **AI Agents** — Structured prompts for metadata review, classification, quality checks
- **PowerShell** — JSON templates map to PnP PowerShell commands
- **Microsoft Graph** — Templates map to MS Graph API resources for future automation
- **Future Automation** — CSV formats for bulk import/export, validation scripts for consistency

## Directory Structure

```
provisioning/
├── README.md                    This file
├── manifest.json                Provisioning manifest (version, compatibility, requirements)
├── site/                        Site templates
│   ├── site-template.json       Full site definition
│   ├── communication-site.json  Communication site config
│   ├── team-site.json          Team site alternative config
│   ├── site-settings.json      Regional, language, timezone settings
│   └── site-navigation.json    Navigation links
├── libraries/                   Library templates
│   ├── documents.json          DRP Documents library
│   ├── evidence.json           DRP Evidence library
│   ├── templates.json          DRP Templates library
│   ├── archive.json            DRP Archive library
│   ├── working-area.json       DRP Working Area library
│   └── source-data.json        DRP Source Data library
├── columns/                     Metadata column definitions
│   ├── document-columns.json   All 22 DRP columns
│   ├── category-columns.json   Category-specific columns
│   ├── project-columns.json    Project reference columns
│   ├── owner-columns.json      Owner/People columns
│   ├── evidence-columns.json   Evidence mapping columns
│   └── relationship-columns.json Relationship columns
├── lists/                       SharePoint List templates
│   ├── categories.json         DRP Categories list
│   ├── projects.json           DRP Projects list
│   ├── owners.json             DRP Owners list
│   ├── metadata-review.json    Metadata QA Queue
│   └── registry-review.json    Registry Review Queue
├── views/                       Library view definitions
│   ├── documents.json          DRP Documents views (13)
│   ├── evidence.json           DRP Evidence views
│   ├── review.json             Review-focused views
│   ├── audit.json              Audit-focused views
│   ├── public.json             Public document views
│   ├── internal.json           Internal document views
│   ├── green-office.json       Green Office project views
│   ├── learning-center.json    Learning Center project views
│   └── rae.json                RAE Landing project views
├── permissions/                 Permission model
│   ├── groups.json             SharePoint groups
│   ├── libraries.json          Library-level permissions
│   └── permission-matrix.json  Full cross-reference matrix
├── content-types/               Content type definitions
│   ├── document.json           DRP Document
│   ├── policy.json             Policy Document
│   ├── manual.json             Training Manual
│   ├── report.json             Report Document
│   ├── evidence.json           Evidence Document
│   └── template.json           Template Document
├── validation/                  Validation templates
│   ├── metadata-checklist.json Metadata completeness checklist
│   ├── library-validation.json Library configuration validation
│   ├── site-validation.json    Site configuration validation
│   └── permission-validation.json Permission validation
├── prompts/                     AI prompt library
│   ├── metadata-review.md      Prompt for metadata review
│   ├── document-classification.md Prompt for category classification
│   ├── keyword-generation.md   Prompt for keyword extraction
│   ├── summary-generation.md   Prompt for description generation
│   ├── duplicate-detection.md  Prompt for duplicate detection
│   ├── relationship-suggestion.md Prompt for relationship mapping
│   ├── quality-review.md       Prompt for quality review
│   └── registry-validation.md  Prompt for registry validation
├── exports/                     Import/Export formats
│   ├── metadata-template.xlsx.md Excel template documentation
│   ├── metadata-template.csv   CSV template
│   ├── bulk-import-format.md   Bulk import guidelines
│   ├── sharepoint-export-format.md SharePoint export mapping
│   └── registry-import-format.md Registry import format
├── templates/                   Reusable templates directory
└── samples/                     Sample data directory
```

## Compatibility

| Component | Version |
|-----------|---------|
| Template Version | 1.0.0 |
| Registry Version | 1.0 |
| Schema Version | 1.0 |
| Compatible SharePoint | SharePoint Online (Microsoft 365) |
| Compatible Graph API | Microsoft Graph v1.0 (future) |
| Compatible PnP PowerShell | PnP.PowerShell 2.x+ |

## Usage

For human administrators: Follow the SharePoint blueprint (`docs/sharepoint/`) and reference the JSON templates here for column names, types, and values.

For AI agents: Use the prompts in `prompts/` to assist with metadata review, classification, and quality checks.

For PowerShell: Map JSON templates to PnP PowerShell commands for site provisioning.

For Microsoft Graph: Map JSON templates to Graph API resources for future read-only sync.

## See Also

- `docs/sharepoint/` — SharePoint Enterprise Blueprint (design)
- `docs/provisioning/` — Provisioning documentation (guides)
- `docs/architecture/` — Architecture Lock and Registry Specification
- `contracts/distribution-contract.md` — Consumer distribution contract
