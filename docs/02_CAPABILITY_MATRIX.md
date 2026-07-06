# Capability Matrix

## Current Capabilities

| Capability | Status | Implementation |
|------------|--------|----------------|
| Document metadata registry | ✅ MVP | JSON files with schema validation |
| Category taxonomy | ✅ MVP | 5 categories with Thai/English names |
| Project mappings | ✅ MVP | 3 registered consumer projects |
| Owner directory | ✅ MVP | 3 owner entries |
| Evidence mapping | ✅ MVP | 6 evidence mappings across 3 projects |
| Relationship mapping | 🟡 Schema only | Schema defined, no sample data yet |
| Registry validation | ✅ MVP | Node.js script with duplicate/field checks |
| Search index generation | ✅ MVP | Generates lightweight search JSON |
| Memory system | ✅ MVP | 6 memory files with ADRs |
| Architecture documentation | ✅ MVP | 13 docs covering architecture, governance, roadmap |
| CI/CD validation | ✅ MVP | GitHub Actions workflow |
| Cursor IDE rules | ✅ MVP | .cursor/rules/mjudrp.mdc |

## ERC Certification Results (v1.4)

Enterprise Resource Certification (ERC) v1.4 verified 7 technologies through practical evaluation. See `docs/certification/` for full reports.

| Technology | ERC Status | Verification |
|------------|-----------|--------------|
| AJV + ajv-formats | CONDITIONAL | Schema compiled; 7/7 docs valid; 5ms; requires ajv-formats |
| MiniSearch | CERTIFIED | 7 → 50 → 500 → 5000 docs tested; 67ms; Thai/fuzzy/English |
| Filesystem MCP | CONDITIONAL | File ops verified; requires Cursor config |
| GitHub MCP | CONDITIONAL | Git ops verified; requires Cursor config |
| Pagefind | FUTURE | Deferred to Sprint 3+ (needs HTML output) |
| SharePoint Metadata | CERTIFIED | Architecture verified for columns, lists, versioning |
| Dublin Core Mapping | CERTIFIED | 22/26 fields mapped; no schema changes |

## ECD Capability Matrix v1

See `docs/discovery/08_CAPABILITY_MATRIX_V1.md` for full capability assessment across 30+ capabilities including M365, MCP, search, validation, AI, and consumer integration patterns.

Key certification results:
- **Certified**: MiniSearch, SharePoint Metadata, Dublin Core Mapping
- **Conditional**: AJV + ajv-formats, Filesystem MCP, GitHub MCP
- **Future**: Pagefind, Microsoft Graph API, SharePoint Term Store, Syntex, OpenRouter
- **Rejected**: SharePoint Embedded, Lunr, custom auth, OCR, chatbot

## Planned Capabilities

| Capability | Priority | Notes |
|------------|----------|-------|
| Real document metadata population | High | Requires coordination with project owners |
| SharePoint folder taxonomy | Medium | Align folder structure with registry categories |
| Consumer integration examples | Medium | HTML/JS example of fetching registry data |
| Relationship data population | Medium | Cross-document links |
| Static hosting for JSON outputs | Low | GitHub Pages or similar |
| Microsoft Graph API integration | Low | Automated metadata extraction |
