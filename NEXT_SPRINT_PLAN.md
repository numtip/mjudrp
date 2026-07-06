# Next Sprint Plan

## Sprint 2: Registry Population & Integration

### Preceded by: Enterprise Capability Discovery v1.3 ✅ + Enterprise Resource Certification v1.4 ✅ + Architecture Lock v1.0 ✅

Architecture is now **LOCKED**. Registry Specification v1.0 is **FROZEN**. See `docs/architecture/` for all architecture documents and quality gates.

ERC v1.4 verified these tools through practical evaluation:

| Technology | ERC Status | Finding |
|------------|-----------|---------|
| **AJV + ajv-formats** | CONDITIONAL | Schema compiled; 7/7 docs valid; 5ms; requires ajv-formats |
| **MiniSearch** | CERTIFIED | 5000 docs in 67ms; 1.19MB index; zero dependencies |
| **GitHub MCP** | CONDITIONAL | Verified git ops; requires Cursor config + PAT |
| **Filesystem MCP** | CONDITIONAL | Verified file ops; requires Cursor config |
| **Dublin Core** | CERTIFIED | 22/26 fields mapped; no schema changes needed |

### Objectives (P0)
1. Integrate AJV + ajv-formats into `validate-registry.mjs` for schema-driven validation
2. Integrate MiniSearch into `generate-search-index.mjs` for client-side search
3. Configure GitHub MCP and Filesystem MCP in Cursor for AI agent access
4. Populate registry with real (or more realistic) document metadata
5. Populate `registry/relationship.sample.json` with cross-document links
6. Establish Microsoft 365 / SharePoint folder structure aligned with registry taxonomy
7. Create consumer integration examples (static HTML + MiniSearch)
8. Set up GitHub Pages or static hosting for JSON outputs

### Tasks

#### Tooling — ERC Certified
- [ ] Install AJV + ajv-formats (`npm install ajv ajv-formats`) and integrate into `validate-registry.mjs`
- [ ] Install MiniSearch (`npm install minisearch`) and integrate into `generate-search-index.mjs`
- [ ] Configure GitHub MCP (`npx @github/github-mcp-server`) in Cursor with PAT
- [ ] Configure Filesystem MCP (`npx @modelcontextprotocol/server-filesystem`) in Cursor

#### Registry Population
- [ ] Add more sample documents for Research Portal project
- [ ] Add real document metadata from Green Office 2026
- [ ] Add relationship entries between related documents
- [ ] Populate `registry/relationship.sample.json` with cross-document links

#### Microsoft 365 Integration
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
- Add and update registry data files
- Install and integrate AJV, ajv-formats, MiniSearch
- Configure MCP servers in Cursor
- Create consumer integration examples
- Update memory files (quality gates)
- Configure static hosting

### Forbidden Actions
- Do not implement Microsoft Graph integration
- Do not implement SharePoint synchronization
- Do not create authentication or RBAC
- Do not build an admin panel
- Do not modify Microsoft 365 via automation
- Do not add AI chatbot or OCR
- Do not add a database

### Quality Gates
Before closing this sprint:
1. `node scripts/validate-registry.mjs` — PASS
2. Memory files updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
3. Runtime files updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
4. ADRs updated (if applicable)
5. Registry version updated (if schema changed)

### Risks
- AJV or MiniSearch may require schema adjustments
- Real document metadata requires coordination with project owners
- SharePoint access may need IT approval
- Consumer projects may need updates to integrate registry outputs
