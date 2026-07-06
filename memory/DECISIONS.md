# Architecture Decisions

## ADR-001: GitHub as Source of Truth

| Field | Value |
|-------|-------|
| Decision ID | ADR-001 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP needs a single source of truth for metadata, schemas, governance docs, and project memory. Multiple team members need to collaborate. |
| Decision | GitHub is the single source of truth. All registry data, schemas, scripts, and documentation live in the GitHub repository. |
| Reason | Git provides version control, audit trail, collaboration via PRs, CI/CD integration, and free hosting. Avoids vendor lock-in and redundant storage. |
| Impact | All changes go through git. CI validates on every push. No direct database modifications. |

## ADR-002: MJU-DRP as Registry Core, Not CMS

| Field | Value |
|-------|-------|
| Decision ID | ADR-002 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | There is a temptation to build a full document management system with admin panel, upload UI, and workflow engine. This would duplicate existing Microsoft 365 functionality. |
| Decision | MJU-DRP is a registry core that stores metadata only. It does not store binary files, manage uploads, or replace Microsoft 365. |
| Reason | Microsoft 365/SharePoint/OneDrive already provides document storage, versioning, sharing, and access control. MJU-DRP adds a metadata layer on top for cross-project discoverability. |
| Impact | No file storage, no upload UI, no admin panel. All documents remain in Microsoft 365. |

## ADR-003: Static-First, No Database During MVP

| Field | Value |
|-------|-------|
| Decision ID | ADR-003 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP needs to serve metadata to multiple consumer projects. A database adds operational complexity, hosting costs, and maintenance overhead during MVP. |
| Decision | Generate static JSON outputs from registry data. Consumer projects fetch JSON files directly from GitHub or a static host. No database during MVP. |
| Reason | Static JSON eliminates database provisioning, connection management, API development, scaling concerns, and security surface. Fast iteration. |
| Impact | Registry data is committed to git. CI generates search index. Consumer projects consume generated JSON files. Database can be added later if needed. |

## ADR-004: Microsoft 365 as Document Storage Layer

| Field | Value |
|-------|-------|
| Decision ID | ADR-004 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP documents need to be stored somewhere accessible. MJU already uses Microsoft 365. |
| Decision | Microsoft 365 (SharePoint, OneDrive, Teams) is the sole document storage provider. MJU-DRP stores only metadata and share URLs. |
| Reason | Organizations with existing Microsoft 365 licenses should maximize existing investments. Avoids duplicating storage and access management. |
| Impact | All documents live in Microsoft 365. Share URLs in the registry point to SharePoint/OneDrive. Access control is managed through Microsoft 365, not MJU-DRP. |

## ADR-005: Consumer Projects Consume Registry Outputs

| Field | Value |
|-------|-------|
| Decision ID | ADR-005 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | Consumer projects (RAE Landing, Green Office 2026, etc.) need to display document information without duplicating metadata. |
| Decision | Consumer projects fetch generated JSON outputs from the MJU-DRP registry. They do not duplicate document metadata or store copies of the registry. |
| Reason | Single source of truth for metadata. Changes in MJU-DRP propagate to all consumers. Prevents drift and inconsistency. |
| Impact | Consumer projects include a dependency on MJU-DRP JSON outputs. Registry updates require regeneration of outputs. |

## ADR-006: No Authentication or RBAC During MVP

| Field | Value |
|-------|-------|
| Decision ID | ADR-006 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | MJU-DRP metadata is intended for internal and public consumption. Adding auth adds complexity. |
| Decision | No authentication, user accounts, or role-based access control during MVP. Registry data is public within the organization. |
| Reason | Auth systems add development, maintenance, and security overhead. During MVP, the registry is consumed by other projects, not by end users directly. |
| Impact | Sensitive documents should be restricted at the Microsoft 365 level, not in the registry. Visibility field is metadata-only guidance. |
