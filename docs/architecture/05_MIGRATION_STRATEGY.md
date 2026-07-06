# Migration Strategy

## Status

**DOCUMENTED** — 2026-07-06

## Scope

This document defines how MJU-DRP handles migration between schema versions, output formats, and technology changes. It applies to both registry data and consumer project integration.

## Schema Migration

### Minor Version (v1.0 → v1.1)

**Type:** Additive changes only.

**Migration steps:**
1. Update schema file with new optional fields or enum values
2. Update registry data files to include new fields (optional)
3. Update registry contract version
4. Update changelog
5. Regenerate outputs

**Consumer impact:** None. Existing consumers continue to work without changes.

### Major Version (v1.x → v2.0)

**Type:** Breaking changes.

**Migration steps:**
1. Announce deprecation at least 1 sprint (2 weeks) in advance
2. Create new schema version (e.g., `document.schema.json` updated in place with major version in `$id`)
3. Update all registry data files to comply with new schema
4. Update validation script for new schema
5. Update registry contract
6. Create migration guide for consumer projects
7. Update consumer contract with new output format
8. Generate new outputs
9. Keep old outputs available during transition period (1 sprint)
10. Remove old schema support after transition

**Consumer impact:** Consumers must update their code to match new schema.

### No-Migration Changes

These changes do not require migration:

- Adding new optional fields
- Adding new enum values
- Adding new endpoints/outputs without removing old ones
- Documentation updates
- Bug fixes in schema descriptions

## Output Migration

### dist/ Output Format Changes

1. New output format gets a new filename (e.g., `document-registry-v2.json`)
2. Old output format remains available for 1 sprint with deprecation notice
3. Both formats are generated during transition period
4. Old format is removed after transition

### Output URL Changes

1. Old URLs continue to serve old content for 1 sprint
2. New URLs serve new content immediately
3. Consumer projects are notified via changelog
4. After transition, old URLs redirect to new URLs

## Technology Migration

### AJV Version Upgrade

1. Pin version in `package.json`
2. Test schema compilation with new version
3. Run full validation against all registry data
4. Update certification report if breaking changes are found
5. Commit version bump

### MiniSearch Version Upgrade

1. Pin version in `package.json`
2. Test index generation at multiple scales
3. Verify search results match expected output
4. Update certification report if breaking changes are found
5. Commit version bump

### MCP Server Updates

1. Update `npx` command (auto-fetches latest version)
2. Test all capabilities (read, write, search)
3. Document any behavior changes
4. No code changes needed (MCP is configured, not code)

## Rollback Plan

### Validation Failure

If a schema change causes validation failure:

1. Revert schema to previous version
2. Revert registry data to previous commit
3. Run validation to confirm PASS
4. Investigate root cause before retrying

### Output Generation Failure

If output generation fails:

1. Revert to previous commit
2. Run `node scripts/generate-search-index.mjs`
3. Verify output files are generated correctly
4. Commit the fix

### Consumer Breaking Change

If a change breaks existing consumer projects:

1. Roll back the breaking change immediately
2. Announce the issue
3. Follow major version migration process with proper notice
4. Provide migration guide before retrying

## Migration Checklist

For any migration (schema, output, technology):

- [ ] Migration documented
- [ ] Consumer projects notified (for breaking changes)
- [ ] Old version available during transition
- [ ] New version validated
- [ ] Rollback plan exists
- [ ] Changelog updated
- [ ] Registry contract updated
- [ ] Consumer contract updated (if applicable)
- [ ] ADR created (if architecture impact)
