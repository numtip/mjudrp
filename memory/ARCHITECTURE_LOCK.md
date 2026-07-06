# Architecture Lock

**Status:** LOCKED — 2026-07-06

The following architectural decisions are **locked** and must not be violated without explicit approval from the project owner following the process defined in `docs/architecture/09_ARCHITECTURE_CHANGE_POLICY.md`.

## Locked Rules

### 1. GitHub is Source of Truth
All metadata, schemas, scripts, governance docs, and project memory live in this GitHub repository. No other system holds authoritative metadata.

### 2. MJU-DRP is Registry Core, Not CMS
MJU-DRP stores metadata, mappings, schemas, and search indexes only. It does not store binary files, process uploads, or provide a content management interface.

### 3. Microsoft 365 Stores Binary Files
All document binary files live in Microsoft 365 (SharePoint, OneDrive, Teams). MJU-DRP stores only share URLs and metadata. Access control is managed through Microsoft 365.

### 4. No Production Modification
This repository defines the registry schema and governance. Direct modification of production Microsoft 365 data from MJU-DRP scripts is forbidden. All document operations happen through Microsoft 365 interfaces.

### 5. Consumer Projects Consume Registry Outputs
Consumer projects (RAE Landing, Green Office 2026, Learning Center, etc.) must consume generated JSON outputs from this repository. They must not duplicate or independently maintain document metadata.

### 6. No Database During MVP
No database, database schema, or database connection is permitted during the MVP phase. All data lives in static JSON files committed to git.

### 7. No Authentication or RBAC Without Approval
No authentication system, user accounts, roles, permissions, or access control layer may be added without explicit approval from the project owner.

### 8. No Admin Panel Without Approval
No admin panel, management UI, or dashboard for registry data management may be built without explicit approval. Use git, GitHub UI, and existing Microsoft 365 tools instead.

## Architecture Documents

| Document | Lock Version | Description |
|----------|-------------|-------------|
| `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` | v1.0 | Official architecture lock document |
| `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` | v1.0 | Frozen registry specification |
| `docs/architecture/02_SCHEMA_VERSION_POLICY.md` | v1.0 | Schema versioning policy |
| `docs/architecture/03_IMPLEMENTATION_BACKLOG.md` | v1.0 | Prioritized implementation backlog |
| `docs/architecture/04_IMPLEMENTATION_GUIDELINES.md` | v1.0 | Implementation coding standards |
| `docs/architecture/05_MIGRATION_STRATEGY.md` | v1.0 | Schema and output migration strategy |
| `docs/architecture/06_CONSUMER_ONBOARDING_GUIDE.md` | v1.0 | Consumer integration guide |
| `docs/architecture/07_RELEASE_POLICY.md` | v1.0 | Release and quality gate policy |
| `docs/architecture/08_DEPRECATION_POLICY.md` | v1.0 | Deprecation timeline policy |
| `docs/architecture/09_ARCHITECTURE_CHANGE_POLICY.md` | v1.0 | How to change locked architecture |

## Quality Gates

No sprint may continue unless:

1. `node scripts/validate-registry.mjs` — PASS
2. `memory/CURRENT_STATE.md` — Updated
3. `memory/NEXT_TASK.md` — Updated
4. `memory/LAST_HANDOFF.md` — Updated
5. `memory/SESSION_LOG.md` — Appended
6. `memory/DECISIONS.md` — Updated if applicable
7. `runtime/CURRENT_RUNTIME.md` — Updated
8. `runtime/CURRENT_PHASE.md` — Updated
9. `runtime/CURRENT_OUTPUTS.md` — Updated
10. Registry version updated (if schema changed)

## Violation Process

If any of the above locked rules need to be changed:

1. Follow `docs/architecture/09_ARCHITECTURE_CHANGE_POLICY.md`
2. Create a new ADR in `memory/DECISIONS.md`
3. Update this file to reflect the new locked state
4. Get approval from the project owner
5. Update all affected documentation
