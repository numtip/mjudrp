# Next Sprint Plan

## Sprint 2A: Core Registry Implementation (Completed)

### Preceded by: Enterprise Capability Discovery v1.3 ✅ + Enterprise Resource Certification v1.4 ✅ + Architecture Lock v1.0 ✅

Architecture is **LOCKED**. Registry Specification v1.0 is **FROZEN**. See `docs/architecture/` for all architecture documents and quality gates.

### Objectives (Completed)
1. ✅ Integrated AJV + ajv-formats into `validate-registry.mjs` — all 6 schemas compile, all entries validate
2. ✅ Integrated MiniSearch into `generate-search-index.mjs` — both search-index.json + minisearch-index.json
3. ✅ Generated 11 production-ready dist/ outputs (document, category, project, owner, evidence, relationship, search, minisearch, validation-report, manifest, performance-report)
4. ✅ Created registry fixtures: small (10 docs), medium (100 docs), large (1000 docs)
5. ✅ Created 4 test files with 77 total assertions
6. ✅ Updated CI pipeline: install → validate → generate → test → upload artifacts
7. ✅ Created 6 implementation documents in docs/implementation/
8. ✅ Applied schema corrections (ADR-012) for AJV compatibility
9. ✅ Updated all memory, runtime, PROJECT_MEMORY, NEXT_SPRINT_PLAN

## Sprint 2B: Registry Population & Consumer Integration

### Objectives (P0)
1. Configure GitHub MCP and Filesystem MCP in Cursor for AI agent access
2. Populate registry with real document metadata from registered projects (Green Office 2026, RAE, etc.)
3. Populate `registry/relationship.sample.json` with cross-document links
4. Establish Microsoft 365 / SharePoint folder structure aligned with registry taxonomy
5. Create consumer integration examples (static HTML + MiniSearch)
6. Set up GitHub Pages or static hosting for JSON outputs

### Tasks

#### Tooling — MCP Configuration
- [ ] Configure GitHub MCP (`npx @github/github-mcp-server`) in Cursor with PAT
- [ ] Configure Filesystem MCP (`npx @modelcontextprotocol/server-filesystem`) in Cursor

#### Registry Population
- [ ] Add real document metadata from Green Office 2026 project
- [ ] Add real document metadata from Research Portal project
- [ ] Add more sample documents for Learning Center project
- [ ] Add relationship entries between related documents
- [ ] Populate `registry/relationship.sample.json` with cross-document links

#### Microsoft 365 Alignment
- [ ] Implement SharePoint column template matching registry schema
- [ ] Document folder hierarchy guidelines matching registry taxonomy
- [ ] Create site provisioning checklist

#### Consumer Integration
- [ ] Create example HTML page that fetches and displays registry data
- [ ] Create example HTML page with MiniSearch client-side search
- [ ] Document integration pattern in consumer project READMEs
- [ ] Set up GitHub Pages for JSON output distribution

#### Documentation
- [ ] Update README.md with current status
- [ ] Review all documentation for consistency with architecture lock
- [ ] Create quick-start guide for new consumer projects

### Allowed Actions
- Configure MCP servers in Cursor
- Update registry data files with real project metadata
- Create consumer integration examples
- Configure static hosting (GitHub Pages)
- Update memory files (quality gates)

### Forbidden Actions
- Do not implement Microsoft Graph integration
- Do not implement SharePoint synchronization
- Do not create authentication or RBAC
- Do not build an admin panel
- Do not modify Microsoft 365 via automation
- Do not add AI chatbot or OCR
- Do not add a database

### Quality Gates
Before closing Sprint 2B:
1. `node scripts/validate-registry.mjs` — PASS
2. `npm test` — All 77 assertions PASS
3. Memory files updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
4. Runtime files updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
5. ADRs updated (if applicable)
6. Registry version updated (if schema changed)
7. No broken documentation links

### Risks
- Real document metadata requires coordination with project owners
- SharePoint access may need IT approval
- Consumer projects may need updates to integrate registry outputs
- GitHub Pages needs repository settings configuration
- MCP servers need Cursor IDE version that supports MCP
