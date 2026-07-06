# Token-Savior Workflow

## Problem

AI agents (Cursor, ChatGPT, Claude) operate with limited context windows. Long chat histories consume tokens, slow down responses, and cause agents to lose context. MJU-DRP development must work within these constraints.

## Principles

1. **Never paste long files into chat** unless explicitly requested by the user or another agent.
2. **Summarize large files into context packs** — use file maps, manifests, diffs, and IDs instead of full contents.
3. **Use structured references** — refer to files by path, section, and line numbers.
4. **Keep reports concise** — include only: status, changed files, validation, risks, and next action.
5. **Avoid duplicate documentation** — write once, reference everywhere else.
6. **Every sprint must update memory files** — minimal but sufficient for next agent.
7. **Optimize over time** — each sprint should be more token-efficient than the last.

## Context Pack Lifecycle

```
Create → Store (memory/docs) → Reference (by path) → Refresh (when content changes) → Archive (when superseded)
```

- **Create**: When first documenting a large concept
- **Store**: Keep in `docs/` for permanent reference
- **Reference**: Use file path and line numbers instead of quoting
- **Refresh**: Update when content changes significantly
- **Archive**: Move to archive when superseded

## Runtime Summaries

Include in each handoff:

```
Runtime:
  Mode: static generation
  Provider: none (architecture only)
  Adapter: GitHub Actions (CI only)
  Outputs: dist/search-index.json, dist/document-registry.json
  Constraints: 7 active, all documented
```

## Memory Summaries

Include in each handoff:

```
Memory:
  Files: 9 (state, task, handoff, log, decisions, locks, baseline, capabilities, constraints)
  ADRs: 6 (all accepted)
  Locks: 8 (unchanged)
```

## Architecture Summaries

Include in each handoff:

```
Architecture:
  Foundation: ✅ Complete
  Registry: ✅ Complete (7 docs, 4 projects, 3 owners, 5 cats, 6 evidence)
  Provider: 📐 Architecture only (4 providers specified)
  Adapter: 📐 Architecture only (4 adapters specified)
  Plugin: 📐 Architecture only (5 plugins specified)
  Contract: 📐 Architecture only (4 contracts specified)
  Runtime: 📐 Architecture only (6 state files)
  Knowledge: 📐 Blueprint only
```

## ADR Summaries

Include when ADRs change:

```
ADRs: 6 accepted
  ADR-001: GitHub source of truth
  ADR-002: Registry core, not CMS
  ADR-003: Static-first, no DB
  ADR-004: M365 as storage
  ADR-005: Consumers consume outputs
  ADR-006: No auth during MVP
```

## Max Report Size Guidelines

| Section | Max Lines | Max Tokens |
|---------|-----------|------------|
| Report header | 3 | ~30 |
| Files changed list | 10 | ~200 |
| Validation result | 5 | ~80 |
| Risks | 10 | ~150 |
| Next action | 3 | ~50 |
| **Total** | **~31** | **~510** |

## Handoff Optimization Strategy

1. **Memory files first** — Always include a summary of read memory files (not full contents)
2. **Diff over full file** — List what changed, not what everything contains
3. **Counts over contents** — "7 documents, 4 projects" not the full JSON
4. **Status codes** — ✅=complete, 📐=architecture only, ❌=not started
5. **Status icons over text** — Use icons for quick scanning
6. **Table format** — Use tables for structured data
7. **One level deep** — Summary at top, details only if requested

## Required Updates Per Sprint

| File | Update Type | When |
|------|-------------|------|
| `PROJECT_MEMORY.md` | Refresh quick reference | End of sprint |
| `NEXT_SPRINT_PLAN.md` | Update tasks and objectives | End of sprint |
| `memory/CURRENT_STATE.md` | Update status, commit, validation | End of session |
| `memory/NEXT_TASK.md` | Update next immediate task | End of session |
| `memory/LAST_HANDOFF.md` | Create handoff for next agent | End of session |
| `memory/SESSION_LOG.md` | Append session entry | End of session |
| `memory/DECISIONS.md` | Add new ADRs | When decisions are made |
| `memory/ARCHITECTURE_LOCK.md` | Update if locks change | Only when locks change |

## New Agent Onboarding

Every new AI agent must read these files first (in order):

1. `PROJECT_CONSTITUTION.md` — Project mission, values, and rules
2. `PROJECT_MEMORY.md` — Quick reference
3. `NEXT_SPRINT_PLAN.md` — Current sprint objectives
4. `memory/CURRENT_STATE.md` — Current state
5. `memory/NEXT_TASK.md` — Immediate task
6. `memory/LAST_HANDOFF.md` — Previous agent summary
7. `memory/DECISIONS.md` — Architecture decisions
8. `memory/ARCHITECTURE_LOCK.md` — Locked rules
9. `memory/PROJECT_BASELINE.md` — Project baseline
10. `memory/PROJECT_CAPABILITIES.md` — Current capabilities
11. `memory/PROJECT_CONSTRAINTS.md` — Current constraints
12. `runtime/CURRENT_RUNTIME.md` — Runtime state
13. `runtime/CURRENT_CONSTRAINTS.md` — Runtime constraints
14. `runtime/CURRENT_PHASE.md` — Current phase details

## Report Format

Every agent report must follow this concise format:

```
Status: [current state]
Files changed: [list of files]
Validation: [PASS/FAIL with count]
Risks: [open risks]
Next action: [immediate next step]
```

## Token Budget Guidelines

| Activity | Token Budget |
|----------|-------------|
| Reading memory files | ~500 tokens |
| Reading runtime files | ~300 tokens |
| Session report | ~300 tokens |
| File diff (per file) | ~100-500 tokens |
| Full file paste | Only when requested |
| Architecture summary | ~200 tokens |
| Context pack | ~100-300 tokens |

## Progressive Optimization

The token-savior workflow improves over time:

- v1.1: Basic principles, required updates, onboarding order
- v1.2: Added context pack lifecycle, runtime summaries, memory summaries, architecture summaries, ADR summaries, max report sizes, handoff optimization strategies, progressive optimization tracking
