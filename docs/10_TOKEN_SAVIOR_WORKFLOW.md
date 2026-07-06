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
| Session report | ~300 tokens |
| File diff (per file) | ~100-500 tokens |
| Full file paste | Only when requested |
