# Next Sprint Plan

## Sprint 3A: SharePoint Enterprise Blueprint & Discovery (Completed)

### Preceded by: Sprint 2C Registry Distribution ✅ + Architecture Lock v1.0 ✅

Architecture is **LOCKED**. Registry Specification v1.0 is **FROZEN**. See `docs/architecture/` for all architecture documents and quality gates.

### Objectives (Completed)
1. ✅ Designed target SharePoint Site architecture (MJU Document Registry)
2. ✅ Defined 6 Document Libraries (DRP Documents, Evidence, Source Data, Templates, Archive, Working Area)
3. ✅ Mapped 22 metadata columns from Registry Spec v1.0 to SharePoint columns
4. ✅ Evaluated SharePoint Lists strategy (3 recommended, 2 deferred)
5. ✅ Defined 13 views and 7-step staff workflow
6. ✅ Designed permission model with 7 groups, least-privilege principles
7. ✅ Defined AI Agent Operating Model for 4 agent types
8. ✅ Assessed Microsoft Graph readiness with 7-phase implementation plan
9. ✅ Created 63-item provisioning checklist for manual SharePoint setup
10. ✅ Conducted gap analysis comparing current vs target state
11. ✅ Created 10 SharePoint blueprint documents
12. ✅ All validation passes (AJV: 0 errors, 0 warnings; Package: 55/55; Tests: 211/211)
13. ✅ Updated PROJECT_MEMORY, NEXT_SPRINT_PLAN, memory/*, runtime/*

### SharePoint Documents Created

| # | Document | Description |
|---|----------|-------------|
| 00 | Enterprise Blueprint | Target architecture, site proposal, operational model |
| 01 | Site and Library Design | 6 document libraries with full specifications |
| 02 | Metadata Column Blueprint | 22 columns mapped to document.schema.json |
| 03 | SharePoint List Strategy | 3 recommended lists, 2 deferred |
| 04 | Views and Staff Workflow | 13 views, 7-step upload-to-release workflow |
| 05 | Permission Model | 7 groups, least-privilege, library-level access |
| 06 | AI Agent Operating Model | Copilot, Cursor, External AI, Future Graph |
| 07 | Microsoft Graph Readiness | Prerequisites, permissions, secret management |
| 08 | Provisioning Checklist | 63-item manual setup checklist |
| 09 | Gap Analysis | Current vs target state with closure criteria |

## Sprint 3B: SharePoint Manual Provisioning Kit

### Objectives (P0)
1. Manually provision the MJU Document Registry SharePoint site following the checklist
2. Create document libraries with correct settings
3. Create site columns mapped to Registry Spec v1.0
4. Create content types and attach to libraries
5. Create views for staff workflow
6. Create SharePoint Lists (Categories, Projects, Owners, Metadata QA Queue)
7. Configure permission groups and library-level access
8. Upload test documents from 5 core project areas
9. Export sample metadata from SharePoint
10. Validate exported metadata against registry schemas (AJV)
11. Create SharePoint documentation artifacts (column templates, import guides)

### Tasks

#### Manual Site Setup
- [ ] Create MJU Document Registry Communication Site
- [ ] Create 6 document libraries with versioning and content approval
- [ ] Create 22 site columns under MJU Document Registry Columns group
- [ ] Create 4 content types (DRP Document, DRP Evidence, DRP Template, DRP Archive)
- [ ] Add content types to respective libraries
- [ ] Create 13 views in DRP Documents library

#### SharePoint Lists
- [ ] Create DRP Categories list and populate from registry
- [ ] Create DRP Projects list and populate from registry
- [ ] Create DRP Owners list and populate from registry
- [ ] Create Metadata QA Queue list

#### Permissions
- [ ] Create 7 permission groups
- [ ] Configure library-level permissions
- [ ] Break inheritance on restricted libraries

#### Test Content
- [ ] Upload 5 test documents from Green Office 2026
- [ ] Upload 3 test evidence documents
- [ ] Fill all required metadata fields
- [ ] Verify views and permissions

#### Validation
- [ ] Export metadata as CSV from SharePoint
- [ ] Validate against registry schemas (AJV)
- [ ] Fix any validation errors
- [ ] Create PR to add test documents to registry JSON

#### Documentation
- [ ] Create SharePoint column export template
- [ ] Create metadata import guide for staff
- [ ] Document manual provisioning process

### Allowed Actions
- Create manual documentation
- Create SharePoint column templates
- Document provisioning process

### Forbidden Actions
- Do NOT implement Microsoft Graph integration
- Do NOT configure MCP for SharePoint
- Do NOT write automation scripts for SharePoint
- Do NOT create authentication or RBAC
- Do NOT modify schemas, architecture, contracts, or consumer projects
- Do NOT add credentials to the repository

### Quality Gates
Before closing Sprint 3B:
1. `node scripts/validate-registry.mjs` — PASS
2. `node scripts/validate-package.mjs` — PASS
3. `npm test` — All assertions PASS
4. Memory files updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
5. Runtime files updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
6. ADRs updated (if applicable)
7. Registry version updated (if schema changed)
8. No broken documentation links
9. Architecture Lock unchanged
10. Registry Spec unchanged

### Risks
- SharePoint site provisioning may require IT permissions not yet available
- Metadata column creation must match schema exactly — manual errors possible
- Permission groups must be created with correct access levels
- No Graph integration yet — metadata export is manual (CSV)
