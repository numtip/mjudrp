# Architecture Lock

The following architectural decisions are **locked** and must not be violated without explicit approval from the project owner.

## Locked Rules

### 1. GitHub is Source of Truth
All metadata, schemas, scripts, governance docs, and project memory live in this GitHub repository. No other system holds authoritative metadata.

### 2. MJU-DRP is Registry Core, Not CMS
MJU-DRP stores metadata, mappings, schemas, and search indexes only. It does not store binary files, process uploads, or provide a content management interface.

### 3. Microsoft 365 Stores Binary Files
All document binary files live in Microsoft 365 (SharePoint, OneDrive, Teams). MJU-DRP stores only share URLs and metadata. Access control is managed through Microsoft 365.

### 4. No Production Modification
This repository defines the registry schema and governance. Direct modification of production Microsoft 365 data from MJU-DRP scripts is forbidden. All document operations happen through Microsoft 365 interfaces.

### 5. Consumer Projects Consume Registry Outputs
Consumer projects (RAE Landing, Green Office 2026, Learning Center, etc.) must consume generated JSON outputs from this repository. They must not duplicate or independently maintain document metadata.

### 6. No Database During MVP
No database, database schema, or database connection is permitted during the MVP phase. All data lives in static JSON files committed to git.

### 7. No Authentication or RBAC Without Approval
No authentication system, user accounts, roles, permissions, or access control layer may be added without explicit approval from the project owner.

### 8. No Admin Panel Without Approval
No admin panel, management UI, or dashboard for registry data management may be built without explicit approval. Use git, GitHub UI, and existing Microsoft 365 tools instead.

## Violation Process

If any of the above locked rules need to be changed:

1. Create a new ADR in `memory/DECISIONS.md`
2. Update this file to reflect the new locked state
3. Get approval from the project owner
4. Update all affected documentation
