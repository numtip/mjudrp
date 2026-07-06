# Next Task

## Sprint: Sprint 3A — SharePoint Enterprise Blueprint & Discovery (Completed)

### Objectives
- [x] Design target SharePoint Site architecture (MJU Document Registry)
- [x] Define 6 Document Libraries with full specifications
- [x] Map 22 metadata columns from Registry Spec v1.0 to SharePoint
- [x] Evaluate SharePoint Lists strategy (3 recommended, 2 deferred)
- [x] Define 13 views and 7-step staff workflow
- [x] Design permission model with 7 groups, least-privilege
- [x] Define AI Agent Operating Model for 4 agent types
- [x] Assess Microsoft Graph readiness with 7-phase implementation plan
- [x] Create 63-item provisioning checklist for manual SharePoint setup
- [x] Conduct gap analysis comparing current vs target state
- [x] Create 10 SharePoint blueprint documents
- [x] Run AJV validation (PASS: 0 errors, 0 warnings)
- [x] Run package validation (55/55 PASS)
- [x] Run all tests (211/211 PASS)
- [x] Update memory and runtime files

### SharePoint Documents Created
10 documents in docs/sharepoint/ covering enterprise blueprint, library design, metadata columns, list strategy, views, permissions, AI operating model, Graph readiness, provisioning checklist, and gap analysis.

## Next Sprint: Sprint 3B — SharePoint Manual Provisioning Kit

### Objectives
- [ ] Manually provision MJU Document Registry SharePoint site
- [ ] Create 6 document libraries with correct settings
- [ ] Create 22 site columns mapped to Registry Spec v1.0
- [ ] Create 4 content types (DRP Document, DRP Evidence, DRP Template, DRP Archive)
- [ ] Create 13 views for staff workflow
- [ ] Create 4 SharePoint Lists (Categories, Projects, Owners, Metadata QA Queue)
- [ ] Configure 7 permission groups with library-level access
- [ ] Upload test documents from 5 core project areas
- [ ] Export sample metadata and validate against registry schemas

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
Before closing any future sprint:
1. `node scripts/validate-registry.mjs` — PASS
2. `node scripts/validate-package.mjs` — PASS
3. `npm test` — All assertions PASS
4. Memory files updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
5. Runtime files updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
6. ADRs updated (if applicable)
7. Registry version updated (if schema changed)
8. No broken documentation links
