# Architecture Decisions

## ADR-001: GitHub as Source of Truth

| Field | Value |
|-------|-------|
| Decision ID | ADR-001 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP needs a single source of truth for metadata, schemas, governance docs, and project memory. Multiple team members need to collaborate. |
| Decision | GitHub is the single source of truth. All metadata, schemas, governance docs, and project memory live in this GitHub repository. |
| Consequences | Other systems must fetch from GitHub; no other system holds authoritative metadata. |

## ADR-002: MJU-DRP is Registry Core, Not CMS

| Field | Value |
|-------|-------|
| Decision ID | ADR-002 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | Multiple MJU projects need document metadata. A single shared service is better than each project managing its own document metadata. |
| Decision | MJU-DRP is a registry core, not a CMS. No file storage, no upload UI, no admin panel. |
| Consequences | All binary files must stay in Microsoft 365. MJU-DRP stores only metadata and SharePoint/OneDrive URLs. |

## ADR-003: Static-First, No Database

| Field | Value |
|-------|-------|
| Decision ID | ADR-003 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | Projects need to consume registry data. Adding a database during MVP introduces complexity, hosting, and maintenance overhead. |
| Decision | Use static JSON files committed to git during MVP. No database during MVP phase. |
| Consequences | JSON files are versioned in git. CI regenerates outputs. Static files limit real-time updates. |

## ADR-004: Microsoft 365 Stores Binaries

| Field | Value |
|-------|-------|
| Decision ID | ADR-004 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP needs a binary storage location for documents. Microsoft 365 is the university's standard platform. |
| Decision | SharePoint and OneDrive store binary files. MJU-DRP stores metadata and shareable URLs pointing to Microsoft 365. |
| Consequences | MJU-DRP depends on Microsoft 365 for file availability. URLs must remain valid. |

## ADR-005: Consumer Projects Consume JSON Outputs

| Field | Value |
|-------|-------|
| Decision ID | ADR-005 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | Consumer projects need registry data. Individual database connections create coupling. |
| Decision | Consumer projects consume generated JSON outputs directly. No duplicate metadata stores. |
| Consequences | Consumers always fetch from generated outputs. Registry changes committed to git may have a delay before consumption. |

## ADR-006: Provider/Adapter/Plugin/Contract Layers

| Field | Value |
|-------|-------|
| Decision ID | ADR-006 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP needs a pluggable architecture for future integrations. |
| Decision | Define Provider/Adapter/Plugin/Contract layers in architecture documents, but keep implementation empty during hardening. |
| Consequences | Architecture is blueprint-only for these layers until Sprint 3+. |

## ADR-007: Dublin Core as Metadata Baseline

| Field | Value |
|-------|-------|
| Decision ID | ADR-007 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP needs a metadata standard for interoperability. |
| Decision | Adopt Dublin Core (ISO 15836) as the metadata baseline. 22 of 26 Dublin Core fields mapped to registry schema. |
| Consequences | Consumer projects familiar with Dublin Core can map easily. 4 unmapped fields (audience, provenance, rightsHolder, accrualMethod) deferred. |

## ADR-008: AJV Certified for Validation

| Field | Value |
|-------|-------|
| Decision ID | ADR-008 |
| Date | 2026-07-06 |
| Status | Accepted (as of Sprint 2A) |
| Context | Registry data must be validated for correctness before generating outputs. |
| Decision | Certify AJV + ajv-formats for JSON Schema validation. Integrated into CI pipeline. |
| Consequences | All registry data is validated before generation. Non-conforming data is caught before release. |

## ADR-009: MiniSearch + Pagefind Certified for Search

| Field | Value |
|-------|-------|
| Decision ID | ADR-009 |
| Date | 2026-07-06 |
| Status | Accepted (as of Sprint 2A) |
| Context | Consumer projects need client-side search capability. |
| Decision | Certify MiniSearch and Pagefind for search. MiniSearch integrated in Sprint 2A; Pagefind deferred to future sprint. |
| Consequences | All dist/ outputs include a MiniSearch serialized index for full-text search. Pagefind delayed until file-based static site generation is needed. |

## ADR-010: Architecture Locked v1.0

| Field | Value |
|-------|-------|
| Decision ID | ADR-010 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | The architecture has been validated through ECD and ERC phases. Changes need a controlled process. |
| Decision | Lock architecture v1.0 with 8 locked rules, 9 quality gates, and a formal change policy. |
| Consequences | Any architecture change requires an ADR, project owner approval, and a new lock version. |

## ADR-011: Schema Corrections for AJV Compatibility

| Field | Value |
|-------|-------|
| Decision ID | ADR-011 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | AJV with ajv-formats rejected some registry data due to null parent fields and empty URI strings. |
| Decision | Fix schemas to allow null for non-required fields and use valid URI format for empty URIs. |
| Consequences | Registry data passes AJV validation. Schema corrections do not change the metadata model. |

## ADR-012: Distribution Layer v1.0

| Field | Value |
|-------|-------|
| Decision ID | ADR-012 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | Registry outputs need to be packaged as self-contained, versioned, validated distribution artifacts for consumer projects. Consumers must never depend on internal registry files. |
| Decision | Implement Distribution Layer with release/ directory structure (latest/, v1/, archive/), SHA-256 checksums, auto-generated release notes, package validation (55 checks), and a distribution contract. Package format v1.0 is frozen. |
| Consequences | Consumer projects fetch from release/*/registry-package/ only. Package integrity is verifiable via checksums. Distribution is versioned and immutable. Distribution contract defines backward compatibility policy. |

## ADR-013: SharePoint Enterprise Blueprint v1.0

| Field | Value |
|-------|-------|
| Decision ID | ADR-013 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP needs a target SharePoint architecture for document operations. Existing experimental SharePoint sites are not suitable as a production baseline. |
| Decision | Design a new SharePoint site (MJU Document Registry) with 6 document libraries, 22 metadata columns mapped to Registry Spec v1.0, 13 views, 7 permission groups, and AI Agent Operating Model. SharePoint is an operational document workspace only — GitHub remains the source of truth. Graph integration is deferred until Entra ID app registration and admin consent are obtained. |
| Consequences | SharePoint provisioning is manual (Sprint 3B). No automated writes to SharePoint in MVP. Graph read-only sync is deferred (Sprint 3C+). Existing experimental sites should not be reused as production. |
