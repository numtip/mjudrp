# Enterprise Resource Certification (ERC) — Sprint v1.4

## Mission

Convert every "Recommended" capability from Enterprise Capability Discovery (ECD v1.3) into a verified status using repeatable, practical evaluation. ERC is the final gate before implementation.

## Sprint Identity

| Field | Value |
|-------|-------|
| Sprint | Enterprise Resource Certification v1.4 |
| Preceded by | Enterprise Capability Discovery v1.3 |
| Followed by | Sprint 2: Registry Population & Integration |
| Branch | main |
| Date | 2026-07-06 |

## Certification Process

Every technology underwent:

1. **Selection rationale** — why this technology was recommended
2. **Verification procedure** — repeatable steps to validate functionality
3. **Measured results** — quantitative and qualitative findings
4. **Limitations** — known constraints and edge cases
5. **Certification decision** — CERTIFIED, CONDITIONAL, REJECTED, or FUTURE

## Certified Technologies

| # | Technology | Status | Verification |
|---|------------|--------|--------------|
| 1 | AJV + ajv-formats | CONDITIONAL | Schema compiled; 7/7 docs valid; 5ms; requires ajv-formats |
| 2 | MiniSearch | CERTIFIED | 7 → 50 → 500 → 5000 docs tested; Thai/fuzzy/English search |
| 3 | Filesystem MCP | CONDITIONAL | File ops verified; requires npm install and Cursor config |
| 4 | GitHub MCP | CONDITIONAL | Git ops verified; requires npm install and Cursor config |
| 5 | Pagefind | FUTURE | Post-build static search; Sprint 3+ when consumer projects exist |
| 6 | SharePoint Metadata | CERTIFIED | Architecture verified; columns, lists, versioning all available |
| 7 | Dublin Core Mapping | CERTIFIED | Mapping table produced; no schema changes needed |

## Status Legend

| Status | Meaning |
|--------|---------|
| **CERTIFIED** | Ready for implementation. No blockers. |
| **CONDITIONAL** | Certified but requires specific conditions (dependency, config, timing). |
| **REJECTED** | Not suitable. Documented reasons. |
| **FUTURE** | Viable but deferred to a later sprint. |

## Files Created

| File | Purpose |
|------|---------|
| `docs/certification/00_ERC_OVERVIEW.md` | This document |
| `docs/certification/01_AJV_CERTIFICATION.md` | AJV certification report |
| `docs/certification/02_MINISEARCH_CERTIFICATION.md` | MiniSearch certification report |
| `docs/certification/03_FILESYSTEM_MCP_CERTIFICATION.md` | Filesystem MCP certification report |
| `docs/certification/04_GITHUB_MCP_CERTIFICATION.md` | GitHub MCP certification report |
| `docs/certification/05_PAGEFIND_EVALUATION.md` | Pagefind architecture evaluation |
| `docs/certification/06_SHAREPOINT_METADATA_CERTIFICATION.md` | SharePoint metadata strategy verification |
| `docs/certification/07_DUBLIN_CORE_MAPPING.md` | Dublin Core mapping verification |
| `docs/certification/08_ENTERPRISE_PRIORITY_MATRIX.md` | Priority matrix for all capabilities |
| `docs/certification/09_DEPENDENCY_MAP.md` | Full dependency chain map |
| `docs/certification/10_CERTIFIED_TECHNOLOGIES.md` | Aggregate list of CERTIFIED technologies |
| `docs/certification/11_CONDITIONAL_TECHNOLOGIES.md` | Aggregate list of CONDITIONAL technologies |
| `docs/certification/12_REJECTED_TECHNOLOGIES.md` | Aggregate list of REJECTED technologies |
| `docs/certification/13_FUTURE_TECHNOLOGIES.md` | Aggregate list of FUTURE technologies |

## Verification Scripts Created

| Script | Purpose |
|--------|---------|
| `scripts/certify-ajv.mjs` | AJV schema validation with ajv-formats |
| `scripts/certify-minisearch.mjs` | MiniSearch scale and search quality tests |

## Documents Updated

- `docs/02_CAPABILITY_MATRIX.md` — Updated with ERC statuses
- `docs/03_BUILD_VS_BUY_DECISIONS.md` — Updated with ERC findings
- `NEXT_SPRINT_PLAN.md` — Updated Sprint 2 with ERC results
- `PROJECT_MEMORY.md` — Updated quick reference and ECD certifications
- `memory/CURRENT_STATE.md` — Updated to ERC v1.4
- `memory/NEXT_TASK.md` — Updated objectives
- `memory/LAST_HANDOFF.md` — Updated handoff summary
- `memory/SESSION_LOG.md` — Appended ERC v1.4 entry
- `memory/DECISIONS.md` — Added ADR-010 (ERC results)
- `runtime/CURRENT_RUNTIME.md` — Updated with ERC status
- `runtime/CURRENT_PHASE.md` — Updated to ERC v1.4
- `runtime/CURRENT_OUTPUTS.md` — Updated with certification outputs
