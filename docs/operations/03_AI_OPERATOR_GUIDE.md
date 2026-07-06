# MJU-DRP AI Operator Guide

**Version:** 1.0.0
**Status:** READY — 2026-07-06
**Audience:** AI agents (Cursor, GitHub Copilot, etc.) working with the MJU-DRP repository

---

## 1. First Steps for AI Agents

When starting a new session with the MJU-DRP repository, always read:

1. `memory/CURRENT_STATE.md` — Current project status and phase
2. `memory/NEXT_TASK.md` — Immediate next objectives
3. `memory/LAST_HANDOFF.md` — Previous agent's handoff notes
4. `memory/DECISIONS.md` — Architecture Decision Records
5. `memory/ARCHITECTURE_LOCK.md` — Locked architectural rules
6. `PROJECT_MEMORY.md` — Comprehensive project overview
7. `NEXT_SPRINT_PLAN.md` — Current and future sprint plans
8. `.cursor/rules/mjudrp.mdc` — Project-level Cursor rules

## 2. Core Principles (NEVER Violate)

| Principle | What It Means |
|-----------|---------------|
| GitHub is Source of Truth | All metadata lives in this repo, not in external systems |
| No CMS | MJU-DRP does not store binary files |
| Microsoft 365 Stores Files | Only URLs and metadata in the registry |
| No Production Modification | Scripts must not modify production Microsoft 365 data |
| No Database During MVP | Everything is static JSON |
| No Auth/RBAC Without Approval | No user accounts or roles |
| No Admin Panel During MVP | Use git and GitHub UI |
| Architecture is LOCKED | Do not redesign schemas, registry, or distribution |

## 3. Allowed Actions

### Operations Mode (Current)

The project is in **Operations Mode**. Allowed actions are:
- Maintain registry data in `registry/*.json`
- Run validation scripts
- Generate search indexes and packages
- Prepare deployment documentation
- Update memory files
- Create environment inventory templates

### Deployment Support

- Review and improve deployment documentation
- Prepare deployment readiness reports
- Generate operator and administrator guides
- Create troubleshooting and rollback documentation
- Prepare Graph readiness checklists

## 4. Forbidden Actions

| Action | Why |
|--------|-----|
| Redesign schemas | Schema v1.0 is FROZEN |
| Redesign architecture | Architecture is LOCKED |
| Modify Architecture Lock rules | Requires ADR per change policy |
| Create new platform features | Operations Mode — no new features |
| Provision SharePoint automatically | Requires human administrator |
| Store credentials in repository | Security risk |
| Modify production Microsoft 365 data | Safety policy |

## 5. Workflow

### Registry Change Workflow

```
AI edits registry JSON → validate-registry → generate-search-index → commit → push
```

### Release Workflow

```
validate-registry → generate-search-index → release.mjs → validate-package → tag → push
```

### Deployment Support Workflow

```
Update docs → validate-deployment → validate-provisioning → update memory → commit → push
```

## 6. Key Scripts

| Script | Description |
|--------|-------------|
| `node scripts/validate-registry.mjs` | Validate all registry data against schemas |
| `node scripts/generate-search-index.mjs` | Generate dist/ outputs |
| `node scripts/release.mjs` | Full release pipeline |
| `node scripts/validate-package.mjs` | Validate release package |
| `node scripts/validate-provisioning.mjs` | Validate provisioning templates |
| `node scripts/validate-deployment.mjs` | Validate deployment assets |
| `node scripts/update-memory.mjs` | Update memory timestamps |
| `node scripts/import-pilot-metadata.mjs` | Import pilot SharePoint metadata |
| `node scripts/validate-pilot.mjs` | Validate pilot metadata |

## 7. Memory System

| File | Purpose | Must Update? |
|------|---------|-------------|
| `memory/CURRENT_STATE.md` | Project status, phase, branch | ✅ Yes |
| `memory/NEXT_TASK.md` | Immediate next sprint objectives | ✅ Yes |
| `memory/LAST_HANDOFF.md` | Compact handoff for next agent | ✅ Yes |
| `memory/SESSION_LOG.md` | Append-only session log | ✅ Yes (append) |
| `memory/DECISIONS.md` | Architecture Decision Records | Only for new ADRs |
| `PROJECT_MEMORY.md` | Comprehensive project overview | ✅ Yes |
| `NEXT_SPRINT_PLAN.md` | Current and future sprint plans | ✅ Yes |
| `runtime/*.md` | Runtime state files | ✅ Yes |

End every session by running: `node scripts/update-memory.mjs`

## 8. Platform v1.0 Freeze

| Item | Value |
|------|-------|
| Platform Version | v1.0 |
| Git Tag | `platform-v1.0` |
| Freeze Date | 2026-07-06 |
| Mode | Operations Mode — no new features |
| Changes Allowed | Only defect fixes and operational improvements via ADR |

## 9. Next Sprint Reference

The next planned sprint is **Sprint 3E — Microsoft Graph Read-only Adapter**. It requires:
- SharePoint site provisioned and verified
- Entra ID app registration approved
- Admin consent for Sites.Selected
- Site ID, Drive IDs, List IDs confirmed

Do NOT begin Graph adapter work until the user provides real tenant values.
