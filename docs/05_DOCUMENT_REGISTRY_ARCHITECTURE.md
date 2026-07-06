# Document Registry Architecture

## Overview

The document registry is the core of MJU-DRP. It stores metadata about documents that live in Microsoft 365. Each document entry in the registry is a pointer — it tells consumer projects where to find the document and how it relates to projects, categories, and evidence requirements.

## Data Model

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Document   │────▶│   Category   │     │    Owner     │
│  (Registry)  │     │  (Taxonomy)  │     │  (Contact)   │
└──────┬───────┘     └──────────────┘     └──────────────┘
       │
       │  ┌──────────────────────────────────────────────────┐
       ├──│  Evidence Map (links docs to assessment criteria)│
       │  └──────────────────────────────────────────────────┘
       │
       │  ┌──────────────────────────────────────────────────┐
       ├──│  Relationship (links docs to other docs)         │
       │  └──────────────────────────────────────────────────┘
       │
       │  ┌──────────────────────────────────────────────────┐
       └──│  Project (consumer projects that reference docs) │
          └──────────────────────────────────────────────────┘
```

## Document Entry Structure

Each document entry has:

| Field Group | Fields | Purpose |
|-------------|--------|---------|
| Identity | id, title, description | Unique identification |
| Classification | category, subcategory, keywords, tags, language | Search and filtering |
| Lifecycle | year, fiscal_year, version, status | Document lifecycle tracking |
| Ownership | owner, department | Responsible party |
| Storage | file_type, file_size, storage_provider, storage_path, share_url | Where to find the file |
| Preview | preview_url, thumbnail_url | Visual preview (optional) |
| Relationships | project_refs, evidence_refs, related_documents | Cross-references |
| Access | visibility | Access guidance |
| Timestamps | created_at, updated_at | Registry audit trail |

## Registry Files

| File | Contents |
|------|----------|
| `registry/documents.sample.json` | Document metadata entries |
| `registry/categories.sample.json` | Document taxonomy/categories |
| `registry/projects.sample.json` | Consumer project definitions |
| `registry/owners.sample.json` | Document owner contact info |
| `registry/evidence-map.sample.json` | Evidence requirement mappings |

## Generated Outputs

| File | Contents | Consumer Use |
|------|----------|-------------|
| `dist/search-index.json` | Lightweight search subset | Quick search, autocomplete |
| `dist/document-registry.json` | Full normalized registry | Complete document listing |

## Validation Rules

- Every document must have a unique ID
- Every document must have a `share_url` pointing to Microsoft 365
- Every document must have an `owner` that exists in the owners registry
- Every document must have at least one `project_ref` to a registered project
- Every document must have a `category` that exists in the categories registry
- Evidence refs should reference valid evidence-map entries
