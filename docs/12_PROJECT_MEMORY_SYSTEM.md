# Project Memory System

## Purpose

The MJU-DRP project memory system enables AI agents (Cursor, ChatGPT, Claude) to continue work across sessions without reading long chat histories. It preserves architecture decisions, current status, next tasks, and validation results in compact Markdown files.

## Memory File Overview

| File | Purpose | Updated By | Update Frequency |
|------|---------|------------|-----------------|
| `memory/CURRENT_STATE.md` | Snapshot of project state | Agent / Script | Every session |
| `memory/NEXT_TASK.md` | Immediate next objectives | Agent | Every session |
| `memory/LAST_HANDOFF.md` | Handoff summary for next agent | Agent / Script | Every session |
| `memory/SESSION_LOG.md` | Append-only activity log | Agent / Script | Every session |
| `memory/DECISIONS.md` | Architecture Decision Records | Agent | When decisions change |
| `memory/ARCHITECTURE_LOCK.md` | Locked architectual rules | Agent | When locks change |

## File Details

### CURRENT_STATE.md
Contains project name, current phase, branch, latest commit, architecture status, completed files, validation status, and open risks. Acts as the first read for any new agent.

### NEXT_TASK.md
Contains the immediate next sprint objectives, allowed actions, forbidden actions, and expected deliverables. Prevents agents from going off-track.

### LAST_HANDOFF.md
A compact handoff summary with date, sprint name, summary of work done, files changed, commands run, validation results, commit hash, push status, and next action. Designed to be read in under 30 seconds.

### SESSION_LOG.md
Append-only log of all sessions. Each entry has session ID, date, goal, completed work, decisions made, and validation result. Provides full history without overwriting.

### DECISIONS.md
Architecture Decision Records (ADR) in a structured format:
- Decision ID, Date, Status
- Context — Why this decision was needed
- Decision — What was decided
- Reason — Why this option was chosen
- Impact — Consequences of this decision

### ARCHITECTURE_LOCK.md
Contains locked architectural rules that cannot be changed without project owner approval. Acts as a guardrail against scope creep and architecture violations.

## Automation

The `scripts/update-memory.mjs` script automates memory file updates:
- Updates `CURRENT_STATE.md` with current git commit and branch
- Updates `LAST_HANDOFF.md` with session summary
- Appends to `SESSION_LOG.md`

## Agent Onboarding Process

Every new AI agent must:

1. Read `PROJECT_CONSTITUTION.md` (mission, values, rules)
2. Read `PROJECT_MEMORY.md` (quick reference)
3. Read `NEXT_SPRINT_PLAN.md` (current sprint)
4. Read memory files in order:
   - `memory/CURRENT_STATE.md`
   - `memory/NEXT_TASK.md`
   - `memory/LAST_HANDOFF.md`
   - `memory/DECISIONS.md`
   - `memory/ARCHITECTURE_LOCK.md`
5. Begin working on the next task
6. At end of session, update memory files

## Maintenance

- Memory files are Markdown for maximum compatibility
- Keep each file under 100 lines
- Use tables for structured data
- Use concise language
- Do not include full file contents — reference by path
