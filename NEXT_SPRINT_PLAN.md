# Next Sprint Plan

## Sprint 2: Registry Population & Integration

### Preceded by: Enterprise Capability Discovery v1.3 ✅ + Enterprise Resource Certification v1.4 ✅

ERC v1.4 verified these tools through practical evaluation:

| Technology | ERC Status | Finding |
|------------|-----------|---------|
| **AJV + ajv-formats** | CONDITIONAL | Schema compiled; 7/7 docs valid; 5ms; requires ajv-formats |
| **MiniSearch** | CERTIFIED | 5000 docs in 67ms; 1.19MB index; zero dependencies |
| **GitHub MCP** | CONDITIONAL | Verified git ops; requires Cursor config + PAT |
| **Filesystem MCP** | CONDITIONAL | Verified file ops; requires Cursor config |
| **Dublin Core** | CERTIFIED | 22/26 fields mapped; no schema changes needed |

See `docs/certification/` for full certification reports.

### Objectives
1. Integrate AJV + ajv-formats into validation script for schema-driven validation
2. Integrate MiniSearch into search index generation
3. Configure GitHub MCP and Filesystem MCP in Cursor
4. Populate registry with real (or more realistic) document metadata
5. Establish Microsoft 365 / SharePoint folder structure aligned with registry taxonomy
6. Create initial consumer project integration examples
7. Add relationship entries between documents
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
- [ ] Certify SharePoint Document Library access (per certification plan)
- [ ] Certify Excel Online metadata sheet workflow
- [ ] Create folder hierarchy guidelines matching registry taxonomy

#### Consumer Integration
- [ ] Certify consumer JSON loading (per certification plan)
- [ ] Create example HTML page that fetches and displays registry data
- [ ] Document integration pattern in consumer project READMEs

#### Documentation
- [ ] Update README.md with ECD findings and current phase
- [ ] Review all 27 docs/ files for consistency
- [ ] Create quick-start guide for new consumer projects

### Allowed Actions
- Add and update registry data files
- Install and integrate AJV, MiniSearch
- Configure MCP servers in Cursor
- Create consumer integration examples
- Update memory files
- Configure static hosting

### Forbidden Actions
- Do not implement Microsoft Graph integration
- Do not implement SharePoint synchronization
- Do not create authentication or RBAC
- Do not build an admin panel
- Do not modify Microsoft 365 via automation
- Do not add AI chatbot or OCR
- Do not add a database

### Risks
- AJV or MiniSearch may require schema adjustments
- Real document metadata requires coordination with project owners
- SharePoint access may need IT approval
- Consumer projects may need updates to integrate registry outputs
