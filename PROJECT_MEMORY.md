# MJU-DRP Project Memory

## Quick Reference

| Item | Value |
|------|-------|
| Project | MJU Document Registry Platform |
| Repository | https://github.com/numtip/mjudrp |
| Current Phase | Foundation Hardening v1.2 |
| Architecture Status | Hardened — 5 enterprise layers documented |
| Branch | main |
| Schema Version | 1.0 (draft) |
| Document Count (sample) | 7 |
| Consumer Projects (registered) | 4 |
| Documentation Files | 17 |
| Memory Files | 9 |

## Key Architecture Decisions

1. **GitHub is source of truth** — All metadata, schemas, docs in git.
2. **MJU-DRP is registry core, not CMS** — No file storage, no uploads, no admin panel.
3. **Static-first, no database** — JSON files committed to git. No DB during MVP.
4. **Microsoft 365 stores binaries** — SharePoint/OneDrive for files; registry stores metadata + share URLs.
5. **Consumer projects consume JSON outputs** — Not duplicate metadata.
6. **Provider/Adapter/Plugin layers are architecture-only** — No implementation during hardening.

## Active Risks

1. No Microsoft 365 API integration — URLs stored as-is, not verified.
2. Sample data only — real metadata population needed.
3. Consumer projects not yet consuming — integration model designed but untested.
4. No static hosting beyond GitHub raw URLs.

## Architecture Layers

| Layer | Status |
|-------|--------|
| Foundation | ✅ Complete |
| Registry | ✅ Complete |
| Provider | 📐 Architecture only |
| Adapter | 📐 Architecture only |
| Plugin | 📐 Architecture only |
| Contract | 📐 Architecture only |
| Runtime | 📐 Architecture only |
| Knowledge | 📐 Blueprint only |

## Memory Files Location

All memory files are in `memory/`:
- `memory/CURRENT_STATE.md` — Current project state (updated v1.2)
- `memory/NEXT_TASK.md` — Immediate next tasks (updated v1.2)
- `memory/LAST_HANDOFF.md` — Last agent handoff summary (updated v1.2)
- `memory/SESSION_LOG.md` — Session activity log (updated v1.2)
- `memory/DECISIONS.md` — Architecture Decision Records (unchanged)
- `memory/ARCHITECTURE_LOCK.md` — Locked architecture rules (unchanged)
- `memory/PROJECT_BASELINE.md` — Project baseline (new v1.2)
- `memory/PROJECT_CAPABILITIES.md` — Current capabilities (new v1.2)
- `memory/PROJECT_CONSTRAINTS.md` — Current constraints (new v1.2)
