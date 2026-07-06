# Architecture Lock v1.0

## Status

**LOCKED** — 2026-07-06

This document formally locks the MJU-DRP architecture before implementation begins. The architecture is now frozen. Any future change to locked components requires a new ADR.

## Lock Scope

| Locked Component | Version | Lock Date | ADR Reference |
|-----------------|---------|-----------|---------------|
| Registry Specification | v1.0 | 2026-07-06 | ADR-011 |
| Schema Contract | v1.0 | 2026-07-06 | ADR-011 |
| Consumer Contract | v1.0 | 2026-07-06 | ADR-005, ADR-011 |
| Core Principles | v1.0 | 2026-07-06 | ADR-001 through ADR-006 |
| Certification Decisions | v1.0 | 2026-07-06 | ADR-010 |
| Quality Gates | v1.0 | 2026-07-06 | ADR-011 |

## Locked Architecture Rules

### Rule 1: GitHub is Source of Truth
All metadata, schemas, scripts, governance docs, and project memory live in this GitHub repository. No other system holds authoritative metadata.

**Lock violated if:** Registry data is stored in a database, another repository, or external service as source of truth.

### Rule 2: MJU-DRP is Registry Core, Not CMS
MJU-DRP stores metadata, mappings, schemas, and search indexes only. It does not store binary files, process uploads, or provide a content management interface.

**Lock violated if:** Binary file content is uploaded to or stored in this repository. An upload UI or file management interface is added.

### Rule 3: Microsoft 365 Stores Binary Files
All document binary files live in Microsoft 365 (SharePoint, OneDrive, Teams). MJU-DRP stores only share URLs and metadata. Access control is managed through Microsoft 365.

**Lock violated if:** Binary files are committed to this repository as primary storage. MJU-DRP scripts modify Microsoft 365 permissions or content.

### Rule 4: No Production Modification
This repository defines the registry schema and governance. Direct modification of production Microsoft 365 data from MJU-DRP scripts is forbidden. All document operations happen through Microsoft 365 interfaces.

**Lock violated if:** Scripts in this repository create, update, or delete documents in Microsoft 365.

### Rule 5: Consumer Projects Consume Registry Outputs
Consumer projects (RAE Landing, Green Office 2026, Learning Center, etc.) must consume generated JSON outputs from this repository. They must not duplicate or independently maintain document metadata.

**Lock violated if:** A consumer project stores its own copy of registry metadata outside the MJU-DRP distribution.

### Rule 6: No Database During MVP
No database, database schema, or database connection is permitted during the MVP phase. All data lives in static JSON files committed to git.

**Lock violated if:** A database driver, ORM, or database connection appears in dependencies or scripts.

### Rule 7: No Authentication or RBAC Without Approval
No authentication system, user accounts, roles, permissions, or access control layer may be added without explicit approval from the project owner and a new ADR.

**Lock violated if:** Login, user registration, session management, or permission checks are added to any script.

### Rule 8: No Admin Panel Without Approval
No admin panel, management UI, or dashboard for registry data management may be built without explicit approval. Use git, GitHub UI, and existing Microsoft 365 tools instead.

**Lock violated if:** A web-based UI for editing registry data is added to this repository.

## Certified Technologies (Locked for Implementation)

These certification decisions are locked for Sprint 2 implementation:

| Technology | ERC Status | Implementation Constraint |
|-----------|-----------|--------------------------|
| AJV + ajv-formats | CONDITIONAL | Must use ajv-formats. Schema must accept empty URLs for optional fields. |
| MiniSearch | CERTIFIED | Zero-dependency. Generate index file for consumer projects. |
| GitHub MCP | CONDITIONAL | Configure in Cursor. Token must not be committed. |
| Filesystem MCP | CONDITIONAL | Configure in Cursor with project path. |
| SharePoint Metadata | CERTIFIED | Architecture only. No automation during MVP. |
| Dublin Core | CERTIFIED | Documentation mapping. No schema changes needed. |
| Pagefind | FUTURE | Not for Sprint 2. Re-evaluate in Sprint 3+. |

## Quality Gates (Locked)

No sprint may proceed unless:

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

## Change Process

To change a locked component:

1. Create a new ADR in `memory/DECISIONS.md` describing the proposed change
2. Document why the lock must be broken
3. Assess impact on all locked components
4. Update `memory/ARCHITECTURE_LOCK.md` to reflect new state
5. Get approval from the project owner
6. Update all affected documentation

## Violation Monitoring

Lock violations are detected by:

- **CI/CD pipeline** — Validates registry integrity on every push
- **Code review** — All PRs are checked against locked rules
- **Sprint reviews** — Each sprint verifies lock compliance
- **Architecture audits** — Random audits by project owner

## Signature

| Role | Name | Date |
|------|------|------|
| Project Owner | [To be assigned] | 2026-07-06 |
| Architecture Lock | ADR-011 | 2026-07-06 |
