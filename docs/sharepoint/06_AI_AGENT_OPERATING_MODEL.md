# AI Agent Operating Model

**Status:** BLUEPRINT — 2026-07-06

---

## Overview

This document defines how AI agents interact with the MJU-DRP SharePoint environment. The operating model follows a **safe AI** pattern: AI suggests, human reviews, MJU-DRP validates, registry publishes.

---

## AI Agents and Their Roles

### 1. Microsoft 365 Copilot / SharePoint Agents

**Capabilities:**
- Answer questions from documents stored in SharePoint libraries
- Assist staff with locating documents across libraries
- Summarize document content
- Draft metadata based on file content
- Respect SharePoint permissions (cannot access restricted documents without authorization)

**Integration Points:**
| Task | Copilot Action | Registry Impact |
|------|---------------|-----------------|
| Find document | "Show me all approved RAE documents" | None (direct SharePoint query) |
| Summarize content | "Summarize this policy document" | None |
| Suggest metadata | "Suggest category and keywords for this file" | Informs registry metadata |
| Draft description | "Write a description for this uploaded file" | Staff reviews, then adds to registry |

**Limitations:**
- Cannot write to MJU-DRP GitHub repository directly
- Cannot run registry validation scripts
- Cannot generate registry packages

### 2. Cursor Agent (This Environment)

**Capabilities:**
- Manage MJU-DRP GitHub repository (registry data, schemas, scripts)
- Generate registry packages (validate → generate → package → release)
- Validate metadata and cross-references using AJV
- Generate documentation and checklists
- Update memory and runtime files for AI continuity
- Read and analyze SharePoint blueprint documents

**Restrictions:**
- Must NOT directly modify SharePoint unless explicitly approved
- Must NOT add credentials to the repository
- Must NOT provision SharePoint resources
- Must NOT configure MCP for SharePoint access
- Must NOT modify locked architecture or frozen schemas

**Workflow:**

```
User request → Cursor reads context → Implements change →
Validates (AJV + tests) → Updates memory → Commits to git
```

### 3. ChatGPT / Claude / Gemini (External AI)

**Capabilities:**
- Summarize exported SharePoint documents
- Suggest metadata (category, keywords, description) from document content
- Detect potential duplicate documents
- Review metadata quality and completeness
- Generate batch metadata from exported Excel/CSV files
- Suggest evidence mappings based on document content

**Safe AI Workflow:**

```
Export documents from SharePoint (CSV/Excel)
        │
        ▼
External AI reviews metadata
  ├── Suggests missing fields
  ├── Detects duplicates
  ├── Recommends categories
  └── Suggests evidence mapping
        │
        ▼
Human reviews AI suggestions
  ├── Accept, modify, or reject
  └── Updates metadata in SharePoint
        │
        ▼
MJU-DRP validates (AJV)
  ├── Checks schema compliance
  ├── Checks cross-references
  └── Reports errors
        │
        ▼
Registry package published
  ├── Release notes generated
  ├── Checksums validated
  └── Package available for consumers
```

### 4. Future Graph Adapter (Architecture Only)

**Capabilities (future):**
- Read metadata from SharePoint libraries via Microsoft Graph API
- Export metadata as JSON for registry import
- Validate against registry schemas
- No write-back to SharePoint in MVP

---

## Safe AI Principles

| Principle | Rule |
|-----------|------|
| **AI suggests, human approves** | No AI action is taken without human review |
| **Read always, write never (to SharePoint)** | AI can read from SharePoint (future Graph) but never writes |
| **Git is the write target** | Metadata changes go through git PRs |
| **Validation before publish** | Every registry change passes AJV validation before release |
| **No tenant-wide permissions** | AI service accounts use least-privilege scoped permissions |
| **No credentials in repo** | Never store API keys, tokens, or secrets in the repository |

## AI Assistance by Metadata Field

| Field | AI Assistance | Confidence | Human Review Required |
|-------|--------------|-----------|---------------------|
| Description | AI generates from document content | Medium | ✅ Always |
| Keywords | AI extracts key terms | High | ✅ Quick review |
| Tags | AI suggests relevant tags | Medium | ✅ Quick review |
| Category | AI classifies from taxonomy | Medium | ✅ Yes |
| Evidence Refs | AI maps to evidence criteria | Low | ✅ Always |
| Related Documents | AI detects duplicates/related | Medium | ✅ Yes |

## Decision Matrix

| Action | Cursor Agent | M365 Copilot | External AI | Future Graph |
|--------|-------------|-------------|-------------|--------------|
| Read registry data | ✅ Yes | ❌ No access | ❌ No access | ✅ Yes |
| Write registry data | ✅ Yes (git) | ❌ No | ❌ No | ❌ No |
| Validate data | ✅ Yes (AJV) | ❌ No | ❌ No | ❌ No |
| Generate package | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Read SharePoint docs | ❌ No (no Graph) | ✅ Yes | ❌ No | ✅ Future |
| Suggest metadata | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Update memory files | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Configure permissions | ❌ No | ❌ No | ❌ No | ❌ No |
| Provision resources | ❌ No | ❌ No | ❌ No | ❌ No |
