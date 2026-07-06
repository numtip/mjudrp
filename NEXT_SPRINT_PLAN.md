# Next Sprint Plan

## Sprint 2C: Registry Distribution & Packaging (Completed)

### Preceded by: Sprint 2B Registry Population ✅ + Architecture Lock v1.0 ✅

Architecture is **LOCKED**. Registry Specification v1.0 is **FROZEN**. See `docs/architecture/` for all architecture documents and quality gates.

### Objectives (Completed)
1. ✅ Created Enterprise Distribution Layer (release/latest/, release/v1/, release/archive/)
2. ✅ Implemented Registry Packaging with 15-artifact self-contained package
3. ✅ Created Release Management pipeline (scripts/release.mjs)
4. ✅ Defined Registry CDN Structure in GitHub Pages strategy document
5. ✅ Implemented Distribution Validation (scripts/validate-package.mjs — 55 checks)
6. ✅ Enhanced Release Manifest with full versioning, counts, compatibility, build hash
7. ✅ Implemented Checksum Generation (SHA-256) for all package artifacts
8. ✅ Created Release Notes Generator with automatic statistics and change tracking
9. ✅ Created 8 distribution documentation files in docs/distribution/
10. ✅ Created Distribution API Contract (contracts/distribution-contract.md)
11. ✅ Enhanced GitHub Actions workflow for release pipeline
12. ✅ Enhanced statistics.json with registry growth, density, and distribution metrics
13. ✅ All validation passes (AJV: 0 errors, 0 warnings; Package: 55/55; Tests: 211/211)
14. ✅ Updated PROJECT_MEMORY, NEXT_SPRINT_PLAN, memory/*, runtime/*

### Package Summary

| File | Artifacts |
|------|-----------|
| release/latest/registry-package/ | 15 files (6 registry JSON + 2 search + 5 metadata + checksum + release notes + README) |
| release/v1/registry-package/ | Frozen copy of v1.0.0 package |
| Package Version | 1.0.0 |
| Registry Version | 1.0 |
| Checksum Algorithm | SHA-256 |
| Validation Checks | 55 (all PASS) |

## Sprint 2D: Consumer Integration & SharePoint Alignment

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
- [ ] Activate GitHub Pages for registry package CDN distribution

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
- Do not modify schemas, architecture, contracts, or consumer projects

### Quality Gates
Before closing Sprint 2D:
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
- MCP servers need Cursor IDE version that supports MCP
- Consumer projects may need updates to integrate registry outputs
- GitHub Pages needs repository settings configuration
- SharePoint access may need IT approval
