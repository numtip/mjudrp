# SharePoint Enterprise Blueprint — MJU-DRP

**Status:** BLUEPRINT — 2026-07-06
**Sprint:** 3A — SharePoint Enterprise Blueprint & Discovery
**Next Step:** Manual provisioning (Sprint 3B)

---

## Overview

This blueprint defines the target SharePoint architecture for the MJU Document Registry Platform (MJU-DRP). It is a discovery and planning artifact — no SharePoint resources have been provisioned, modified, or configured as part of this sprint.

---

## Target SharePoint Site

| Attribute | Recommendation |
|-----------|---------------|
| **Site Name** | MJU Document Registry |
| **Site Type** | Team site — no Microsoft 365 Group (communication site alternative) |
| **URL** | `https://mju365.sharepoint.com/sites/MJUDocumentRegistry` |
| **Template** | Communication site (if public-facing content) or Team site (if staff-only) |
| **Language** | Thai + English |
| **Description** | Central metadata registry and document workspace for MJU-DRP consumer projects |

### Why a New Site (Not Experimental Sites)

Existing experimental SharePoint sites are NOT suitable as a production baseline because:

1. **No standardized metadata** — Experimental sites lack the full set of DRP metadata columns
2. **Inconsistent taxonomy** — Categories, projects, and evidence mappings are not aligned with Registry Spec v1.0
3. **No permission model** — Experimental sites may have ad-hoc permissions
4. **No versioning policy** — Document versioning is not configured for registry requirements
5. **No audit trail** — Experimental sites lack the structured review workflow needed
6. **Data quality unknown** — Existing content has not been validated against MJU-DRP schemas
7. **Architecture debt** — Using experimental sites as production would embed non-standard practices

---

## Architecture: SharePoint and MJU-DRP Relationship

```
┌─────────────────────────────────────────────────────────────┐
│                  SharePoint (Operational Workspace)          │
│                                                             │
│  DRP Documents  │  DRP Evidence  │  DRP Templates           │
│  DRP Source Data │  DRP Archive  │  DRP Working Area        │
│                                                             │
│  Staff uploads files → fills metadata → review → publish    │
└──────────────────────┬──────────────────────────────────────┘
                       │ Metadata exported / synced (future Graph)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               MJU-DRP Registry Core (GitHub)                │
│                                                             │
│  registry/*.json  │  schemas/*.json  │  scripts/*.mjs       │
│                                                             │
│  Validates data → Generates outputs → Packages releases     │
└──────────────────────┬──────────────────────────────────────┘
                       │ Static JSON
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            GitHub Pages (Registry Package CDN)               │
│                                                             │
│  /latest/  │  /v1/  │  /archive/                            │
│                                                             │
│  Serves registry packages to consumer projects              │
└──────────────────────┬──────────────────────────────────────┘
                       │ Fetch
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Consumer Projects                           │
│                                                             │
│  RAE Landing  │  Green Office  │  Learning Center  │  ...   │
└─────────────────────────────────────────────────────────────┘
```

## Operational Model

| Layer | System | Responsibility | Write Access |
|-------|--------|---------------|-------------|
| **File Storage** | SharePoint / OneDrive | Store binary files, manage versions, control permissions | Staff editors |
| **Registry** | GitHub (MJU-DRP repo) | Validate metadata, generate JSON, package releases | Maintainers |
| **Distribution** | GitHub Pages | Serve registry packages as static CDN | CI pipeline |
| **Consumption** | Consumer projects | Fetch packages, display documents, link to SharePoint | Consumer dev teams |

## Key Principles

1. **SharePoint = operational workspace.** Files live here. Staff upload and manage content here.
2. **MJU-DRP = registry compiler.** Validates metadata, generates search indexes, packages releases.
3. **GitHub = source of truth for registry.** The registry JSON files in git are authoritative.
4. **GitHub Pages = distribution CDN.** Consumer projects fetch from here.
5. **AI agents assist, not replace.** AI suggests metadata, validates quality, generates docs — but humans review and approve.
6. **Graph sync is future.** Read-only metadata sync from SharePoint to registry will come later.

## Restrictions

- No Graph API write-back in MVP
- No SharePoint provisioning from automation yet
- No credentials stored in the repository
- No MCP configuration for SharePoint access
