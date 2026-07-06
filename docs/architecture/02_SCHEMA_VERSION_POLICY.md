# Schema Version Policy

## Status

**LOCKED** — 2026-07-06

## Version Format

MJU-DRP schemas use **semantic versioning**: `MAJOR.MINOR`

- **MAJOR**: Breaking changes (field removal, type change, required field addition)
- **MINOR**: Additive changes (new optional fields, new enum values)

Patch versions are not used during MVP. All changes are either minor or major.

## Version Location

Schema version is declared in these locations:

1. **Schema `$id` field** — Each JSON schema file declares its version via `$id` URL
2. **`contracts/registry-contract.md`** — Registry contract version header
3. **`docs/architecture/01_REGISTRY_SPECIFICATION_v1.md`** — Frozen specification
4. **Changelog** — Each version bump must include a changelog entry

## Current Version

| Schema | Version | Status |
|--------|---------|--------|
| document.schema.json | v1.0 | Frozen |
| category.schema.json | v1.0 | Frozen |
| project.schema.json | v1.0 | Frozen |
| owner.schema.json | v1.0 | Frozen |
| evidence.schema.json | v1.0 | Frozen |
| relationship.schema.json | v1.0 | Frozen |

## Version Compatibility Matrix

| Consumer expects | Registry provides | Compatible? |
|-----------------|-------------------|-------------|
| v1.0 | v1.0 | ✅ Same version |
| v1.0 | v1.1 | ✅ Additive changes only |
| v1.0 | v1.2 | ✅ Additive changes only |
| v1.0 | v2.0 | ❌ Breaking change |
| v1.1 | v1.0 | ❌ Consumer expects field that doesn't exist |
| v1.1 | v1.1 | ✅ Same version |
| v1.1 | v2.0 | ❌ Breaking change |

## Schema File Naming

```
schemas/{name}.schema.json
```

Examples:
- `document.schema.json` — Document schema
- `category.schema.json` — Category schema

Version is declared inside the file (`$id`), not in the filename.

## Version Bump Process

### Minor Version (v1.0 → v1.1)

1. Update schema `$id` to reflect new minor version
2. Add new optional fields
3. Add new enum values
4. Update `contracts/registry-contract.md`
5. Update changelog
6. No consumer notification required (backward compatible)

### Major Version (v1.x → v2.0)

1. Update schema `$id` to reflect new major version
2. Remove or change fields
3. Update `contracts/registry-contract.md`
4. Update `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` (or create v2)
5. Update consumer contract
6. Update changelog with migration guide
7. Notify all registered consumer projects
8. Minimum 1 sprint transition period
9. Create new ADR documenting the breaking change

## Changelog Format

Each version bump must include:

```markdown
### vX.Y — YYYY-MM-DD

**Changes:**
- Added field `new_field` (optional)
- Removed field `old_field` (deprecated since v1.0)
- Changed `field_type` from string to integer (breaking)

**Migration:**
- Consumer projects must update field references
- Old `field_type` values will be rejected by validation

**Affected files:**
- schemas/document.schema.json
- contracts/registry-contract.md
```

## Version Enforcement

- Validation script (`validate-registry.mjs`) checks schema version compatibility
- CI pipeline rejects registry data with incompatible schema version
- Generated outputs include schema version metadata in consumer contract
- AJV validation verifies data against the declared schema version

## Deprecation Process

1. Mark deprecated field with `"deprecated": true` in schema
2. Add `"deprecationMessage"` explaining migration path
3. Keep deprecated field for minimum 2 sprints
4. Document migration path in changelog
5. Remove in next MAJOR version

## Registry File Version Tracking

Each registry file should include version metadata:

```json
{
  "registry_version": "1.0",
  "schema_ref": "https://github.com/numtip/mjudrp/schemas/document.schema.json",
  "entries": [...]
}
```

This is a **future enhancement** for Sprint 2+ — current registry files are flat arrays.
