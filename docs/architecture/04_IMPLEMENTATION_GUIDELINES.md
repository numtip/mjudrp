# Implementation Guidelines

## Status

**ACTIVE** — 2026-07-06

## Core Principles

1. **Use before build** — Use existing tools before creating custom solutions.
2. **Metadata first** — MJU-DRP stores metadata, not binary files.
3. **Static first** — Generate JSON outputs. No database during MVP.
4. **Token-savior workflow** — Every sprint leaves compact memory files.
5. **No unnecessary custom systems** — Do not build what exists elsewhere.

## Coding Standards

### JavaScript/Node.js

- Use ES modules (`import`/`export`) — all scripts use `.mjs` extension
- Use `const` by default, `let` only when reassignment is needed
- Use descriptive variable names (no single-letter variables except loop counters)
- All scripts must handle errors gracefully with exit code 1 on failure
- Console output should be structured and readable
- No external dependencies beyond those explicitly certified

### Schema Files (JSON)

- Use JSON Schema draft-07
- Every field must have a `description`
- Required fields list must be explicit
- Enum values must be lowercase kebab-case
- Format validators (`uri`, `date-time`, `email`) must be paired with `ajv-formats`
- Optional URL fields must use `anyOf` pattern for empty strings

### Registry Data (JSON)

- All registry files are valid JSON arrays
- IDs must follow pattern `^[A-Z0-9]+-[0-9]{3,}$`
- Cross-references must be validated on commit
- Comments are not allowed in JSON files (use `description` fields in schema)

### Documentation (Markdown)

- Use GitHub Flavored Markdown
- Tables for structured data
- Code blocks with language tags
- Links use relative paths within the repository
- Headers use ATX-style (`#`)

## Architecture Constraints

### What You CAN Implement

- Registry data population and validation
- Schema-driven validation (AJV)
- Search index generation (MiniSearch)
- MCP configuration for AI agents
- Registry output generation
- Static hosting configuration
- Consumer integration examples
- Documentation updates

### What You CANNOT Implement

- Microsoft Graph API integration
- SharePoint synchronization
- Authentication or RBAC
- Admin panel or CMS
- Database connections
- AI chatbot or OCR
- Workflow engine
- Direct modification of Microsoft 365

## Test Requirements

| Component | Test Type | Required |
|-----------|-----------|----------|
| Validation script | Manual run against registry | ✅ Required |
| Search index generation | Manual run | ✅ Required |
| AJV integration | Schema validation test | ✅ Required |
| MiniSearch integration | Scale test (7 → 500 → 5000) | ✅ Required |
| Memory updates | Manual verification | ✅ Required |
| CI pipeline | GitHub Actions | ✅ Required |

## Git Workflow

- Branch: `main` is the single active branch during MVP
- Commits: Use conventional commit format (`type: message`)
- Commit types: `docs:`, `feat:`, `fix:`, `chore:`, `refactor:`, `test:`
- CI must pass before merge
- No force push to `main`

## Sprint Deliverables

Every sprint must produce:

1. Completed objectives (marked with ✅ in NEXT_TASK.md)
2. Updated memory files (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
3. Updated runtime files (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
4. Updated ADRs if decisions were made
5. Passing validation scripts
6. Git commit and push

## Code Review Checklist

- [ ] Follows implementation guidelines
- [ ] No locked architecture rules violated
- [ ] Registry validation passes
- [ ] Schema validation passes (with AJV where applicable)
- [ ] Search index generation succeeds
- [ ] Memory files updated
- [ ] Runtime files updated
- [ ] ADRs updated (if decisions changed)
- [ ] No secrets committed
- [ ] No new dependencies without certification
- [ ] Documentation links are valid
