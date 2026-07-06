# Dependency Map

## Overview

This document maps all major dependency chains in the MJU-DRP architecture. Dependencies flow from bottom (storage) to top (AI/consumer).

```
AI / Agents
    ↑
Consumer Projects
    ↑
Generated JSON Outputs (dist/)
    ↑
Search Index (MiniSearch) ─── Validation (AJV + Custom)
    ↑                              ↑
Registry Data (JSON files) ←─── Schemas (draft-07)
    ↑
Microsoft 365 (SharePoint/OneDrive) ←─── Authors
```

---

## Chain 1: Document Publication

```
Document Author
    ↓
Microsoft 365 (SharePoint/OneDrive) ←─── Binary file storage [CERTIFIED]
    ↓
MJU-DRP Registry (registry/documents.sample.json) ←─── Metadata entry [CERTIFIED]
    ↓
Schema Validation (scripts/validate-registry.mjs) ←─── AJV + ajv-formats [CONDITIONAL]
    ↓
Search Index Generation (scripts/generate-search-index.mjs) ←─── MiniSearch [CERTIFIED]
    ↓
dist/document-registry.json ─┐
dist/search-index.json       ├─── Consumer projects fetch
dist/search-index.minisearch.json ┘
```

**Key dependencies:** Node.js, AJV, ajv-formats, MiniSearch

---

## Chain 2: Registry Maintenance

```
Registry Admin (human or AI agent)
    ↓
Git Operations ───── GitHub MCP [CONDITIONAL] ←─── GitHub PAT
Filesystem Operations ── Filesystem MCP [CONDITIONAL]
    ↓
Registry JSON files (registry/*.json)
    ↓
Git Commit & Push ─── GitHub Actions (CI)
    ↓
Validation passes ─── Deployment ready
```

**Key dependencies:** Git, GitHub MCP, Filesystem MCP, GitHub Actions

---

## Chain 3: Consumer Integration

```
Consumer Project (Astro/Next.js/Vue/Laravel/HTML)
    ↓
fetch() / import ──── dist/*.json from GitHub raw URLs
    ↓
MiniSearch library ──── Local search on fetched data
    ↓
Document display ──── User-facing search results
    ↓
(Optional) Dublin Core meta tags ──── SEO / interoperability
```

**Key dependencies:** Static hosting, MiniSearch (client library), Dublin Core mapping

---

## Chain 4: Metadata Management

```
Project Owner
    ↓
Define metadata in SharePoint ──── Document Library columns
    ↓
Export / manually copy ──── Register in MJU-DRP JSON
    ↓
Validate against schema ──── AJV
    ↓
Commit and push ──── GitHub
```

**Key dependencies:** SharePoint, AJV, Git

---

## Chain 5: AI-Assisted Workflow

```
Human Operator
    ↓
Prompt AI (ChatGPT/Claude/Gemini)
    ↓
AI reads context via MCP ──── GitHub MCP, Filesystem MCP
    ↓
AI suggests metadata / finds duplicates / maps categories
    ↓
Human reviews and commits ──── Git
```

**Key dependencies:** AI tools (ChatGPT, Claude, Gemini), GitHub MCP, Filesystem MCP

---

## External Dependencies

| Dependency | Version | Type | Required By | Status |
|------------|---------|------|-------------|--------|
| Node.js | 18+ / 20+ | Runtime | All scripts | ✅ Installed (v24) |
| npm | 9+ | Package manager | AJV, MiniSearch | ✅ Installed |
| Git | 2.x | Version control | All operations | ✅ Installed |
| GitHub | — | Hosting/CI | Repository, Actions | ✅ Configured |
| GitHub Actions | — | CI/CD | Validation pipeline | ✅ Configured |
| Microsoft 365 | — | Storage | Binary files | ✅ Available |
| SharePoint | — | Document storage | Binary files | ✅ Available |
| AJV | 8.x | Validation | Schema validation | ✅ npm |
| ajv-formats | 2.x | Format validation | Schema format checks | ✅ npm |
| MiniSearch | 7.x | Search | Search indexing | ✅ npm |
| Pagefind | — | Production search | Future (Sprint 3+) | 📐 npm |
| ChatGPT | — | AI assistance | Ad-hoc metadata | ✅ Available |
| Claude | — | AI assistance | Ad-hoc metadata | ✅ Available |
| Gemini | — | AI assistance | Ad-hoc metadata | ✅ Available |

## Dependency Constraints

| Constraint | Details |
|------------|---------|
| No network at runtime | Validation and generation run offline |
| No database | All data is JSON files committed to git |
| No auth | No authentication for registry access |
| Public by default | Registry outputs are public / internal only |
| git is source of truth | All metadata changes go through git |
| AI output is advisory | AI suggestions require human review |

## Critical Paths

The most critical dependency chain (needed for consumer project launch):

```
Node.js → npm install → AJV + MiniSearch → validate registry → generate search index → commit → push → CI passes → consumer fetches
```

This entire chain must work before any consumer project can trust the registry outputs.
