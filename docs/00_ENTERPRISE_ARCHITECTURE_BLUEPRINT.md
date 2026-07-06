# Enterprise Architecture Blueprint

## Overview

MJU-DRP is an enterprise document registry platform that provides a shared metadata infrastructure layer across all MJU projects. It sits between Microsoft 365 document storage and consumer projects, providing discovery, taxonomy, and evidence mapping without duplicating files.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   Microsoft 365 / Entra ID                    │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │  SharePoint  │  │   OneDrive   │  │   Teams / Files    │   │
│  └──────┬──────┘  └──────┬───────┘  └────────┬───────────┘   │
│         │                │                    │               │
│         └────────────────┼────────────────────┘               │
│                          │                                    │
│                   share URLs & permissions                    │
└──────────────────────────┼────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  MJU-DRP Registry Core                        │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐   │
│  │ Schema   │  │ Registry │  │ Evidence │  │ Taxonomy    │   │
│  │ (JSON)   │  │ (JSON)   │  │ Mapping  │  │ (Categories)│   │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘   │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐   │
│  │ Scripts  │  │ Memory   │  │ Docs     │  │ CI/CD       │   │
│  │ (Node)   │  │ (MD)     │  │ (MD)     │  │ (Actions)   │   │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘   │
└──────────────────────────┬────────────────────────────────────┘
                           │
                           ▼
              Generated JSON Outputs (dist/)
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Consumer Projects                         │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ RAE Landing   │  │ Green Office  │  │ Learning Center  │    │
│  │ (Next.js)     │  │ 2026         │  │ (Static Site)    │    │
│  └──────────────┘  └──────────────┘  └──────────────────┘    │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │ Research      │  │ Future MJU   │                           │
│  │ Portal        │  │ Projects     │                           │
│  └──────────────┘  └──────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

## Layers

### 1. Storage Layer (Microsoft 365)
- SharePoint sites for team document libraries
- OneDrive for individual document ownership
- Teams for channel-based file sharing
- All binary files live here. MJU-DRP never stores files.

### 2. Registry Layer (MJU-DRP)
- JSON schemas defining document structure
- Registry data files (metadata only)
- Evidence mappings linking documents to criteria
- Category/ taxonomy definitions
- Relationship mappings between documents
- Validation scripts ensuring data quality

### 3. Output Layer (Generated JSON)
- `search-index.json` — Lightweight search data
- `document-registry.json` — Normalized full registry

### 4. Consumption Layer (Consumer Projects)
- Websites and applications that fetch JSON outputs
- Each project is independently deployed
- No project duplicates registry metadata

## Key Design Decisions

- **No API server** — JSON files are served statically (GitHub raw, GitHub Pages, or CDN)
- **No database** — All data is committed as JSON files
- **No auth** — Registry outputs are public; access control is at the storage layer
- **Git-centric** — All changes tracked in version control
