# MJU-DRP Project Constitution

## Mission

MJU Document Registry Platform (MJU-DRP) exists to provide a **shared document infrastructure layer** for all MJU projects. It connects Microsoft 365 document storage to multiple consumer projects through metadata, taxonomy, and evidence mappings — without duplicating files or building redundant systems.

## Core Values

### 1. Use Before Build
Prefer existing Microsoft 365, SharePoint, OneDrive, Excel Online, SharePoint Lists, GitHub, GitHub Actions, and AI providers. Build custom tools only when existing platforms demonstrably cannot meet the requirement.

### 2. Metadata First
Binary files live in Microsoft 365. MJU-DRP stores metadata, mappings, schema, search indexes, and validation rules. The registry is a pointer system, not a storage system.

### 3. Static First
Generate JSON outputs for websites to consume. Do not add a database during the MVP phase. Static JSON is sufficient for the registry's consumer model.

### 4. Token-Savior Workflow
AI agents operate with limited context windows. Every sprint must leave compact memory files so the next agent or session can continue without reading long chat history. Do not rely on long-running chat sessions.

### 5. No Unnecessary Custom Systems
Do not build:
- Content Management System
- Admin panel
- Database (during MVP)
- Authentication or RBAC
- Workflow engine
- OCR service
- AI chatbot

Unless explicitly approved by the project owner.

## Architecture

```
Microsoft 365 / SharePoint / OneDrive (binary storage)
        ↓
MJU-DRP Registry Core (metadata, schemas, validation)
        ↓
Generated JSON Outputs (search-index.json, document-registry.json)
        ↓
Consumer Projects (RAE Landing, Green Office 2026, Learning Center, etc.)
```

## Governance

- This repository is the single source of truth for metadata.
- All changes go through git (commit, PR, review).
- CI validates registry integrity on every push.
- Consumer projects must consume registry outputs directly.
- Architecture locks require project owner approval to change.

## Project Roles

- **Project Owner:** Responsible for architecture decisions and approvals.
- **Maintainers:** Responsible for registry data quality and CI health.
- **Consumer Project Teams:** Consume registry outputs; contribute metadata corrections via PR.

## Current Phase

**Enterprise Resource Certification v1.4** — Technology verification through practical evaluation across 7 targets. Final gate before Sprint 2 implementation.
