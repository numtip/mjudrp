# Project Baseline

## Identity

| Field | Value |
|-------|-------|
| Project | MJU Document Registry Platform (MJU-DRP) |
| Repository | https://github.com/numtip/mjudrp |
| Type | Enterprise document infrastructure platform |
| Current Phase | Foundation Hardening (v1.2) |
| Branch | main |

## Architecture Baseline

| Layer | Status | Implementation |
|-------|--------|----------------|
| Foundation | ✅ Complete | Constitution, memory, governance, tools |
| Registry | ✅ Complete | Schemas, sample data, validation, generation |
| Provider | 📐 Architecture only | Interface defined, no implementation |
| Consumer | 📐 Architecture only | Contract defined, no consumption |
| Enterprise | 📐 Architecture only | Layers documented, not activated |
| Adapter | 📐 Architecture only | 4 adapters specified |
| Plugin | 📐 Architecture only | 5 plugins specified |
| Contract | 📐 Architecture only | 4 contracts defined |
| Runtime | 📐 Architecture only | 6 runtime state files |
| Knowledge | 📐 Blueprint only | Future knowledge graph layer |

## Core Principles (Locked)

1. GitHub is source of truth
2. Metadata-first (no binary storage)
3. Static-first (no database during MVP)
4. Use before build (prefer Microsoft 365, GitHub)
5. No unnecessary custom systems (CMS, auth, RBAC, admin panel, OCR, AI chatbot)

## Integration Baseline

| Integration | Status | Notes |
|-------------|--------|-------|
| Microsoft 365 | Documented | Strategy documented, no API integration |
| GitHub | Active | Repo, CI, raw file serving |
| Consumer projects | None | No project consuming outputs yet |

## Data Baseline

| Metric | Value |
|--------|-------|
| Document entries | 7 (sample) |
| Categories | 5 |
| Projects | 4 |
| Owners | 3 |
| Evidence mappings | 6 |
| Schemas | 6 |
| Documentation files | 16 |
| Memory files | 9 |
