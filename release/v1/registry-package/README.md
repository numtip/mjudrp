# MJU-DRP Registry Package

## Overview

This package is a **self-contained distribution artifact** of the MJU Document Registry Platform (MJU-DRP). It contains all registry data, search indexes, validation reports, and metadata needed for consumer projects to integrate with the MJU document registry.

## Contents

- **document-registry.json** — All document metadata entries
- **category-registry.json** — Category taxonomy
- **project-registry.json** — Consumer project definitions
- **owner-registry.json** — Document owners
- **evidence-registry.json** — Evidence-to-document mappings
- **relationship-registry.json** — Cross-document relationships
- **search-index.json** — Lightweight search index
- **minisearch-index.json** — MiniSearch full-text search index
- **statistics.json** — Registry statistics and metrics
- **validation-report.json** — AJV validation results
- **performance-report.json** — Generation timing metrics
- **manifest.json** — Package manifest with version, counts, compatibility
- **release-notes.md** — Auto-generated release notes
- **checksum.json** — SHA-256 checksums for all package files

## Quick Start

```js
// Fetch the latest document registry
const registry = await fetch(
  "https://raw.githubusercontent.com/numtip/mjudrp/main/release/latest/registry-package/document-registry.json"
).then(r => r.json());

// Always check the manifest first
const manifest = await fetch(
  "https://raw.githubusercontent.com/numtip/mjudrp/main/release/latest/registry-package/manifest.json"
).then(r => r.json());

console.log(`Loaded ${manifest.document_count} documents`);
```

## Consumer Rules

1. Always fetch from `registry-package/` — never from `dist/`, `registry/`, or `schemas/`
2. Validate `manifest.json` before processing data
3. Pin to `v1/` in production; use `latest/` for development
4. Verify checksums for production deployments
5. Never duplicate registry metadata

## Version

| Field | Value |
|-------|-------|
| Registry Version | 1.0 |
| Package Version | 1.0.0 |
| Schema Version | 1.0 |

See [manifest.json](./manifest.json) for full details.

---

*Part of the MJU Document Registry Platform (MJU-DRP)*
*Repository: https://github.com/numtip/mjudrp*
