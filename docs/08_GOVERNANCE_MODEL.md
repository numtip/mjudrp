# Governance Model

## Overview

MJU-DRP governance ensures registry data quality, consistency, and alignment with project goals. Governance is lightweight during MVP and evolves as the platform matures.

## Governance Principles

1. **Single source of truth** — This GitHub repository is the authoritative source for all metadata
2. **Change through git** — All registry changes are tracked in version control
3. **Validation on every change** — CI validates registry integrity on every push
4. **Consumer projects are read-only consumers** — They fetch, they do not modify
5. **Architecture locks require approval** — Locked decisions cannot be changed unilaterally

## Roles

| Role | Responsibilities |
|------|-----------------|
| **Project Owner** | Architecture decisions, lock approvals, strategic direction |
| **Registry Maintainer** | Data quality, CI health, PR review, schema updates |
| **Consumer Project Lead** | Consuming registry outputs, suggesting metadata corrections |
| **Contributor** | Submitting registry data changes via PR |

## Processes

### Adding a New Document
1. Verify the document exists in Microsoft 365 with a valid share URL
2. Assign a unique document ID following project prefix convention (e.g., `GO2026-004`)
3. Identify the appropriate category from the taxonomy
4. Link to at least one consumer project via `project_refs`
5. Add to `registry/documents.sample.json`
6. Run `node scripts/validate-registry.mjs`
7. Commit and push

### Adding a New Consumer Project
1. Add project entry to `registry/projects.sample.json`
2. Link existing documents via `project_refs`
3. Regenerate outputs
4. Update consumer project to fetch MJU-DRP outputs

### Modifying an Architecture Lock
1. Create an ADR in `memory/DECISIONS.md` documenting the change rationale
2. Update `memory/ARCHITECTURE_LOCK.md`
3. Get approval from project owner
4. Update all affected documentation

## Data Quality Standards

- All document entries must pass validation (required fields, unique IDs, valid refs)
- Category IDs must exist in the categories registry
- Owner IDs must exist in the owners registry
- Project refs must reference registered projects
- Evidence refs should reference valid evidence maps
- Share URLs must be valid Microsoft 365 URLs

## Review Cadence

| Activity | Frequency | Responsible |
|----------|-----------|-------------|
| Registry data review | Per sprint | Registry Maintainer |
| Validation CI check | Every push | GitHub Actions |
| Memory file update | Every session | AI Agent / Maintainer |
| Architecture review | Per milestone | Project Owner |
| Consumer project sync | As needed | Consumer Leads |
