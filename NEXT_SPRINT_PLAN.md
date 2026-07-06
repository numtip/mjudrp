# Next Sprint Plan

## Sprint 2B: Registry Population & Enterprise Taxonomy (Completed)

### Preceded by: Sprint 2A Core Registry Implementation ✅ + Architecture Lock v1.0 ✅

Architecture is **LOCKED**. Registry Specification v1.0 is **FROZEN**. See `docs/architecture/` for all architecture documents and quality gates.

### Objectives (Completed)
1. ✅ Populated realistic registry data with 74 documents, 22 categories, 12 projects, 12 owners, 124 evidence maps, 250 relationships
2. ✅ Strengthened relationships with cross-document, cross-project, and intra-project links (250 total)
3. ✅ Standardized taxonomy with 22 hierarchical categories across 12 projects
4. ✅ Prepared enterprise registry with real-world metadata models for 5 key project areas:
   - Green Office 2026 (10 docs, 12 evidence)
   - RAE Landing (8 docs, 12 evidence)
   - Learning Center (8 docs, 12 evidence)
   - Research Portal (6 docs, 10 evidence)
   - Enterprise Shared Documents (8 docs, 10 evidence)
   - 7 additional supporting projects
5. ✅ Created dist/statistics.json with comprehensive registry metrics
6. ✅ All validation passes (AJV: 0 errors, 0 warnings; Tests: 211/211 passed)
7. ✅ Updated all dist outputs, manifest, search index, MiniSearch index
8. ✅ Created SharePoint taxonomy documentation (Document Library structure, folder strategy, metadata columns, naming convention, version strategy, retention concept)
9. ✅ Updated PROJECT_MEMORY, NEXT_SPRINT_PLAN, memory/*, runtime/*

## Sprint 2C: Consumer Integration & SharePoint Alignment

### Objectives (P0)
1. Configure GitHub MCP and Filesystem MCP in Cursor for AI agent access
2. Create consumer integration examples (static HTML + MiniSearch)
3. Set up GitHub Pages or static hosting for JSON output distribution
4. Implement SharePoint column template matching registry schema
5. Document folder hierarchy guidelines matching registry taxonomy
6. Create site provisioning checklist

### Tasks

#### Tooling — MCP Configuration
- [ ] Configure GitHub MCP (`npx @github/github-mcp-server`) in Cursor with PAT
- [ ] Configure Filesystem MCP (`npx @modelcontextprotocol/server-filesystem`) in Cursor

#### Consumer Integration
- [ ] Create example HTML page that fetches and displays registry data
- [ ] Create example HTML page with MiniSearch client-side search
- [ ] Document integration pattern in consumer project READMEs
- [ ] Set up GitHub Pages for JSON output distribution

#### Microsoft 365 / SharePoint Alignment
- [ ] Implement SharePoint column template matching registry schema
- [ ] Document folder hierarchy guidelines matching registry taxonomy
- [ ] Create site provisioning checklist

#### Documentation
- [ ] Update README.md with current status
- [ ] Review all documentation for consistency with architecture lock
- [ ] Create quick-start guide for new consumer projects

### Allowed Actions
- Configure MCP servers in Cursor
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
Before closing Sprint 2C:
1. `node scripts/validate-registry.mjs` — PASS
2. `npm test` — All assertions PASS
3. Memory files updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
4. Runtime files updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
5. ADRs updated (if applicable)
6. Registry version updated (if schema changed)
7. No broken documentation links

### Risks
- MCP servers need Cursor IDE version that supports MCP
- Consumer projects may need updates to integrate registry outputs
- GitHub Pages needs repository settings configuration
- SharePoint access may need IT approval
