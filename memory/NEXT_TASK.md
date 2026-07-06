# Next Task

## Sprint: Architecture Lock v1.0 + Registry Spec Freeze (Completed)

### Objectives
- [x] Create official Architecture Lock document
- [x] Freeze Registry Specification v1.0 (all 6 schemas reviewed)
- [x] Create Schema Version Policy
- [x] Create Implementation Backlog (P0-P3)
- [x] Create Implementation Guidelines
- [x] Create Migration Strategy
- [x] Create Consumer Onboarding Guide
- [x] Create Release Policy with quality gates
- [x] Create Deprecation Policy
- [x] Create Architecture Change Policy
- [x] Add ADR-011
- [x] Update ARCHITECTURE_LOCK.md, all memory, runtime, and core docs
- [x] Validate, commit, push

## Next Sprint: Registry Population & Integration (Sprint 2)

### Objectives
- [ ] Integrate AJV + ajv-formats into `validate-registry.mjs`
- [ ] Integrate MiniSearch into `generate-search-index.mjs`
- [ ] Configure GitHub MCP and Filesystem MCP in Cursor
- [ ] Populate registry with real document metadata (P0)
- [ ] Populate `registry/relationship.sample.json` with cross-document links (P0)
- [ ] Establish SharePoint folder taxonomy (P0)
- [ ] Create consumer integration examples
- [ ] Set up GitHub Pages or static hosting

### Allowed Actions
- Install and integrate AJV, ajv-formats, MiniSearch
- Configure MCP servers in Cursor
- Update registry data files
- Create consumer integration examples
- Configure static hosting
- Update memory files

### Forbidden Actions
- Do not implement Microsoft Graph integration
- Do not implement SharePoint synchronization
- Do not create authentication or RBAC
- Do not build an admin panel
- Do not modify Microsoft 365 via automation
- Do not add AI chatbot or OCR
- Do not add a database

### Quality Gates
Before closing any future sprint:
1. `node scripts/validate-registry.mjs` — PASS
2. Memory files updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
3. Runtime files updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
4. ADRs updated (if applicable)
5. Registry version updated (if schema changed)
