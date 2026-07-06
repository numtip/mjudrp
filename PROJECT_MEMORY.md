# MJU-DRP Project Memory

## Quick Reference

| Item | Value |
|------|-------|
| Project | MJU Document Registry Platform |
| Repository | https://github.com/numtip/mjudrp |
| Current Phase | Foundation Sprint v1.1 |
| Architecture Status | MVP Initialized |
| Branch | main |
| Schema Version | 1.0 (draft) |
| Document Count (sample) | 7 |
| Consumer Projects (registered) | 3 |

## Key Architecture Decisions

1. **GitHub is source of truth** — All metadata, schemas, docs in git.
2. **MJU-DRP is registry core, not CMS** — No file storage, no uploads, no admin panel.
3. **Static-first, no database** — JSON files committed to git. No DB during MVP.
4. **Microsoft 365 stores binaries** — SharePoint/OneDrive for files; registry stores metadata + share URLs.
5. **Consumer projects consume JSON outputs** — Not duplicate metadata.

## Active Risks

1. Remote GitHub repo not yet configured — push status: pending.
2. Sample data only — real metadata population is a future sprint.
3. No Microsoft 365 API integration yet — strategy documented only.
4. Consumer projects not yet consuming — integration model designed but untested.

## Memory Files Location

All memory files are in `memory/`:
- `memory/CURRENT_STATE.md` — Current project state
- `memory/NEXT_TASK.md` — Immediate next tasks
- `memory/LAST_HANDOFF.md` — Last agent handoff summary
- `memory/SESSION_LOG.md` — Session activity log
- `memory/DECISIONS.md` — Architecture Decision Records
- `memory/ARCHITECTURE_LOCK.md` — Locked architecture rules
