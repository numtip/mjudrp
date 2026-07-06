# Core Registry Implementation

## Overview

The Core Registry is the internal engine of MJU-DRP. It consists of three main components:

- **Validation Engine** (AJV-based schema validation)
- **Generator** (registry output generation)
- **Search Engine** (MiniSearch-based full-text search)

These components are implemented as Node.js ESM scripts in `scripts/`, producing JSON outputs in `dist/`.

## Data Flow

```
registry/*.json  ──→  validate-registry.mjs  ──→  dist/validation-report.json
                  ──→  generate-search-index.mjs ──→  dist/*-registry.json
                                                    ──→  dist/search-index.json
                                                    ──→  dist/minisearch-index.json
                                                    ──→  dist/manifest.json
                                                    ──→  dist/performance-report.json
```

## Validation Engine

- Uses AJV + ajv-formats for JSON Schema validation (Draft 2020-12)
- Compiles all 6 schemas on startup (`document`, `category`, `project`, `owner`, `evidence`, `relationship`)
- Validates each entry in all 5 registry files against its corresponding schema
- Validates URI formats (`format: "uri"`) with empty string allowances via `anyOf`
- Checks cross-references across registries (owner → owners, category → categories, project_refs → projects, evidence_refs → evidence)
- Reports duplicate IDs, missing references, and schema violations
- Produces `dist/validation-report.json` with structured error/warning data
- Exits with code 0 on PASS, code 1 on FAIL

## Registry Generator

- Reads all 5 registry files from `registry/`
- Produces 11 output files in `dist/`:
  - `document-registry.json` — normalized document entries
  - `category-registry.json` — category taxonomy
  - `project-registry.json` — consumer projects
  - `owner-registry.json` — document owners
  - `evidence-registry.json` — evidence mappings
  - `relationship-registry.json` — cross-document relationships
  - `search-index.json` — lightweight search index (flat JSON array)
  - `minisearch-index.json` — MiniSearch serialized index (full-text search)
  - `validation-report.json` — latest validation results
  - `performance-report.json` — timing metrics
  - `manifest.json` — build metadata

## Search Index

- `search-index.json` — simple array of id/title/description/keywords for basic filtering
- `minisearch-index.json` — pre-built MiniSearch index for full-text search with fuzzy matching, prefix search, and scoring

## Key Files

| File | Purpose |
|------|---------|
| `scripts/validate-registry.mjs` | AJV-based validation |
| `scripts/generate-search-index.mjs` | Registry + search output generation |
| `dist/manifest.json` | Build metadata |
| `examples/generate-fixtures.mjs` | Test data generator |
| `.github/workflows/validate.yml` | CI pipeline |
