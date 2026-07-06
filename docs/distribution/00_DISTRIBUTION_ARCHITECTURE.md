# MJU-DRP Distribution Architecture

## Status: IMPLEMENTED — 2026-07-06

This document defines the Enterprise Distribution Layer for the MJU Document Registry Platform (MJU-DRP).

## Overview

The Distribution Layer transforms the MJU-DRP Registry Core into a **distributable enterprise package** that consumer projects can fetch and consume without ever accessing internal registry files, schemas, or scripts.

## Architecture

```
Registry Core (registry/*.json)
       │
       ▼
Validation (scripts/validate-registry.mjs) — AJV + ajv-formats
       │
       ▼
Generation (scripts/generate-search-index.mjs) — Static JSON + MiniSearch
       │
       ▼
Release Pipeline (scripts/release.mjs)
       │
       ├──→ Enhanced Manifest (manifest.json)
       ├──→ Release Notes (release-notes.md)
       ├──→ Checksums (checksum.json)
       ├──→ Package Directory (release/latest/registry-package/)
       │
       ▼
Distribution Layer
       ├── release/latest/          — Always points to newest stable package
       ├── release/v1/              — Frozen versioned packages
       └── release/archive/         — Historical packages
              │
              ▼
Consumer Projects (fetch from GitHub / GitHub Pages)
```

## Key Principles

1. **Package-first** — Consumers consume only release packages, never internal folders
2. **Immutable versions** — Once published, a versioned package is never modified
3. **Latest pointer** — `release/latest/` always represents the newest stable package
4. **Self-validating** — Every package carries checksums, manifest, and validation report
5. **Backward compatibility** — Package format v1.0 is frozen; changes require new major version

## Distribution Layers

| Layer | Path | Purpose |
|-------|------|---------|
| Latest | `release/latest/` | Always points to newest stable package |
| Versioned | `release/v{N}/` | Frozen packages by major version |
| Archive | `release/archive/` | Historical packages for legacy consumers |
| Package | `release/*/registry-package/` | Complete, self-contained registry package |

## Package Contents

Each registry package contains:
- All registry JSON outputs (documents, categories, projects, owners, evidence, relationships)
- Search indexes (lightweight + MiniSearch)
- Statistics and performance reports
- Validation report
- Enhanced manifest
- Release notes
- Checksum manifest (SHA-256)
- README

## Consumer Contract

Consumers must depend ONLY on `release/*/registry-package/` outputs. Internal files (`registry/*.json`, `schemas/*.json`, `scripts/*.mjs`) are NOT part of the consumer contract.

## GitHub Pages Integration (Future)

When GitHub Pages is enabled, the distribution layer will be served as a static CDN:
- `/latest/` → `release/latest/registry-package/`
- `/v1/` → `release/v1/registry-package/`
- `/archive/` → `release/archive/`
