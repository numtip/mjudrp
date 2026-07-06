# Schema Versioning Policy

## Version Format

MJU-DRP schemas use semantic versioning: **MAJOR.MINOR** (pre-release, no patch needed for MVP).

- **MAJOR**: Breaking changes (field removal, type change, required field addition)
- **MINOR**: Additive changes (new optional fields, new enum values)

## Version Location

Schema version is tracked in:

1. `$id` field in each JSON schema file
2. `contracts/registry-contract.md` version header
3. Registry changelog

## Current Version

**v1.0** — Initial schema draft

## Version Compatibility

| Consumer schema version | Registry schema version | Compatible? |
|------------------------|------------------------|-------------|
| v1.0 | v1.0 | ✅ Same |
| v1.0 | v1.1 | ✅ Additive only |
| v1.0 | v2.0 | ❌ Breaking change |

## Deprecation Process

1. Mark deprecated field with `"deprecated": true` in schema
2. Add `"deprecationMessage"` explaining migration
3. Keep deprecated field for at least 2 sprints
4. Document migration path in changelog
5. Remove in next MAJOR version

## Schema File Naming

```
schemas/{name}.schema.json
```

Examples:
- `document.schema.json` → document schema v1.0
- `document.schema.json` (updated) → document schema v1.1 or v2.0

Version is declared inside the file, not in the filename.

## Changelog

Each MAJOR/MINOR version bump must include:

- Date
- Version number
- List of changes
- Migration instructions (for breaking changes)
- Affected files

## Version Enforcement

- Validation script checks schema version compatibility
- CI pipeline rejects registry data with incompatible schema version
- Generated outputs include schema version metadata
