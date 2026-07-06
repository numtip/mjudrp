# MJU Document Registry Platform (MJU-DRP)

**A shared document infrastructure layer for Maejo University projects.**

MJU-DRP is a metadata registry that connects documents stored in Microsoft 365 / SharePoint / OneDrive to consumer projects. It is **not** a standalone document website or a content management system.

---

## What MJU-DRP Is

- A **metadata registry** for documents across MJU projects
- A **shared infrastructure layer** that multiple projects consume
- A **governance framework** for document taxonomy and evidence mapping
- A **static JSON output generator** that websites can fetch directly

## What MJU-DRP Is Not

- Not a document storage system (files live in Microsoft 365)
- Not a CMS (no admin panel, no upload UI)
- Not a database (JSON files committed to git during MVP)
- Not an authentication or RBAC system
- Not a workflow engine

## Core Architecture

```
Microsoft 365 / SharePoint / OneDrive
        │
        ▼
MJU-DRP Registry Core (this repository)
  - Metadata, schemas, taxonomy
  - Evidence mappings, project refs
  - Validation scripts, search index
        │
        ▼
Generated JSON Outputs (dist/)
  - search-index.json
  - document-registry.json
        │
        ▼
Consumer Projects
  - RAE Landing
  - Green Office 2026
  - Learning Center
  - Research Portal
  - Future MJU / RAE projects
```

## Core Principles

1. **Use before build** — Use Microsoft 365, SharePoint, GitHub, and existing tools before creating custom solutions.
2. **Metadata first** — MJU-DRP stores metadata, not binary files.
3. **Static first** — Generate JSON outputs for websites to consume. No database during MVP.
4. **Token-savior workflow** — Every sprint leaves compact memory files for the next agent/session.
5. **No unnecessary custom systems** — Do not build CMS, admin panel, database, auth, RBAC, workflow engine, OCR, or AI chatbot unless explicitly approved.

## Project Memory System

MJU-DRP includes a lightweight project memory system for AI agent continuity:

| File | Purpose |
|------|---------|
| `memory/CURRENT_STATE.md` | Project status, phase, branch, completed work |
| `memory/NEXT_TASK.md` | Immediate next sprint objectives |
| `memory/LAST_HANDOFF.md` | Compact handoff for next agent |
| `memory/SESSION_LOG.md` | Append-only session log |
| `memory/DECISIONS.md` | Architecture Decision Records (ADRs) |
| `memory/ARCHITECTURE_LOCK.md` | Locked architectural rules |

## Folder Structure

```
mjudrp/
├── README.md
├── PROJECT_CONSTITUTION.md
├── PROJECT_MEMORY.md
├── NEXT_SPRINT_PLAN.md
├── docs/               # Architecture and governance docs
├── memory/             # Project memory system
├── schemas/            # JSON schemas
├── registry/           # Sample registry data
├── scripts/            # Validation and generation scripts
├── dist/               # Generated JSON outputs
├── .github/workflows/  # CI/CD
└── .cursor/rules/      # Cursor IDE rules
```

## How to Validate

```bash
node scripts/validate-registry.mjs
```

Validates required fields, detects duplicates, and checks cross-references.

## How to Generate Search Index

```bash
node scripts/generate-search-index.mjs
```

Generates `dist/search-index.json` and `dist/document-registry.json`.

## How to Update Memory

```bash
node scripts/update-memory.mjs
```

Updates `CURRENT_STATE.md`, `LAST_HANDOFF.md`, and appends to `SESSION_LOG.md`.

## How Consumer Projects Use Outputs

Consumer projects fetch generated JSON files from the `dist/` directory:

```js
// Example: RAE Landing fetching document registry
const registry = await fetch(
  "https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json"
);
const docs = await registry.json();
```

Projects must not duplicate or independently maintain document metadata. All metadata originates from MJU-DRP.

## Current Status

**Enterprise Resource Certification v1.4** — Technologies verified through practical evaluation. 7 technologies certified/conditional/future. See `docs/certification/` for full findings and `knowledge/` for reusable enterprise knowledge.

---

*Built with Microsoft 365, GitHub, and Node.js.*
