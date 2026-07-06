# Next Task

## Sprint: Sprint 2A — Core Registry Implementation (Completed)

### Objectives
- [x] Integrate AJV + ajv-formats into `validate-registry.mjs`
- [x] Create `dist/validation-report.json` with structured report
- [x] Integrate MiniSearch into `generate-search-index.mjs`
- [x] Generate `dist/minisearch-index.json` (keep existing search-index.json)
- [x] Generate all 11 registry outputs in `dist/`
- [x] Create registry fixtures: small (10), medium (100), large (1000) documents
- [x] Create 4 test files with 77 total assertions
- [x] Update GitHub Actions pipeline (install, validate, generate, test, upload)
- [x] Create `dist/performance-report.json` with timing metrics
- [x] Create 6 implementation documents in `docs/implementation/`
- [x] Add ADR-012 for schema corrections
- [x] Update all memory, runtime, PROJECT_MEMORY, NEXT_SPRINT_PLAN

## Next Sprint: Sprint 2B — Registry Population & Consumer Integration

### Objectives
- [ ] Configure GitHub MCP and Filesystem MCP in Cursor
- [ ] Populate registry with real document metadata from registered projects
- [ ] Populate `registry/relationship.sample.json` with cross-document links
- [ ] Establish SharePoint folder taxonomy matching registry categories
- [ ] Create consumer integration examples (static HTML + MiniSearch)
- [ ] Set up GitHub Pages or static hosting for JSON output distribution

### Allowed Actions
- Configure MCP servers in Cursor
- Update registry data files with real project metadata
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
2. `npm test` — All 77 assertions PASS
3. Memory files updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
4. Runtime files updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
5. ADRs updated (if applicable)
6. Registry version updated (if schema changed)
7. No broken documentation links
