# Gap Analysis

**Status:** ANALYSIS — 2026-07-06

---

## Current State vs Target State

| Dimension | Current State | Target State | Gap |
|-----------|--------------|-------------|-----|
| **SharePoint Site** | Experimental sites only | Dedicated MJU Document Registry site | No production site exists |
| **Document Libraries** | Ad-hoc folders | 6 structured DRP libraries | No libraries exist |
| **Metadata Columns** | Inconsistent, missing fields | 22 standardized DRP columns | No columns exist |
| **Content Types** | None | DRP Document, Evidence, etc. | No content types exist |
| **Site Columns** | None | MJU Document Registry Columns group | No columns created |
| **Views** | Default only | 13 specialized views | No custom views exist |
| **SharePoint Lists** | None | 4 reference lists (Categories, Projects, Owners, QA Queue) | No lists exist |
| **Permission Groups** | Ad-hoc sharing | 7 defined groups (Owners, Editors, Reviewers, Readers, Auditors, AI Service, Project Owners) | No groups created |
| **Permission Inheritance** | Default | Broken inheritance on restricted libraries | Inheritance not configured |
| **Versioning** | Default | Major versions (Documents, Evidence); None (Archive); Major+Minor (Working) | Not configured |
| **Content Approval** | Not configured | Required on Documents, Evidence | Not configured |
| **Metadata Validation** | None | AJV validation for metadata exports | Validation process exists in MJU-DRP but not connected to SharePoint |
| **AI Workflow** | AI suggests → human reviews → MJU-DRP validates → package publishes | Fully defined | Not yet operational (no SharePoint data to process) |
| **Graph Integration** | None documented | Read-only sync with Sites.Selected permission | No Entra ID app registration, no permissions granted |
| **Document Upload Flow** | Unstructured | 7-step workflow (Upload → Metadata → AI Review → QA → Sync → Release) | Workflow defined but not implemented |
| **Registry Connection** | Sample data only (populated by script) | Real metadata from SharePoint documents | No live data flow |
| **Staff Training** | None | Document authors, editors, reviewers trained on workflow | Training materials not created |
| **Governance** | Architecture lock only | Site-level governance: permissions, visibility, retention | No operational governance in place |

## Gap Severity

| Gap | Severity | Impact | Resolution Sprint |
|-----|----------|--------|-------------------|
| No production SharePoint site | **Critical** | Cannot onboard real documents | Sprint 3B |
| No metadata columns | **Critical** | Cannot map registry schema to SharePoint | Sprint 3B |
| No permission groups | **High** | Risk of unauthorized access | Sprint 3B |
| No document libraries | **High** | No organized storage | Sprint 3B |
| No views | **Medium** | Staff cannot filter/search efficiently | Sprint 3B |
| No SharePoint Lists | **Medium** | Staff lack reference data for uploads | Sprint 3B |
| No content approval | **Medium** | Unreviewed content could enter registry | Sprint 3B |
| No live registry connection | **Medium** | Registry data is sample only | Sprint 3C (Graph sync) |
| No Graph integration | **Medium** | No automated sync from SharePoint | Sprint 3C+ |
| No staff training | **Low** | Staff need guidance on workflow | Sprint 3B |

## Closure Criteria

Each gap is considered closed when:

| Gap | Closure Criteria |
|-----|-----------------|
| **Site** | SharePoint site created and accessible |
| **Libraries** | All 6 libraries created with correct settings |
| **Columns** | All 22 site columns created and added to content types |
| **Content Types** | 4 content types created and assigned to libraries |
| **Views** | 13 views created in DRP Documents library |
| **Lists** | 4 SharePoint lists created and populated |
| **Permissions** | 7 groups created, inheritance configured |
| **Versioning** | All libraries configured per specification |
| **Metadata Validation** | CSV export from SharePoint passes AJV validation |
| **Graph** | Read-only metadata sync operational (Sprint 3C+) |
