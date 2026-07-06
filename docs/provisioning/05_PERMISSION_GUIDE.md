# Permission Guide

## Overview

Seven permission groups control access to the MJU Document Registry site.

## Groups

| Group | Level | Access Scope |
|-------|-------|-------------|
| DRP Owners | Full Control | Entire site |
| DRP Editors | Contribute | Libraries (create/edit own files) |
| DRP Reviewers | Contribute (metadata only) | DRP Documents, DRP Evidence |
| DRP Readers | Read | Public documents only |
| DRP Auditors | Read | All libraries |
| DRP AI Service Account | Read | All libraries (future Graph) |
| Project Owners | Read | Project-filtered views |

## Library-Level Permissions

1. Create groups at site level (default permissions)
2. Break inheritance on restricted libraries:
   - DRP Evidence: Remove DRP Readers
   - DRP Source Data: Remove DRP Readers
   - DRP Archive: Remove DRP Readers
   - DRP Working Area: Remove DRP Readers, DRP Auditors
3. Keep DRP Documents and DRP Templates with default inheritance

## Principle: Least Privilege

Every group has only the minimum access needed:
- No group gets Full Control except Owners
- AI Service Account is strictly read-only
- Reviewers can edit metadata but not delete files
- Readers only see public content

## Future Graph Permissions

- `Sites.Selected` — scoped to this site only
- Read-only for metadata sync
- Write-back deferred to post-MVP

See `provisioning/permissions/` for templates.
