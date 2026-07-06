# Deprecation Policy

## Status

**LOCKED** — 2026-07-06

## Scope

This policy governs the deprecation and removal of:
- Schema fields
- Registry data formats
- Generated output formats
- API contracts
- Technologies and dependencies
- Documentation

## Field Deprecation

### Process

1. **Mark as deprecated** — Add `"deprecated": true` and `"deprecationMessage"` to the schema field
2. **Keep in schema** — Deprecated fields remain in the schema for minimum 2 sprints
3. **Remove from schema** — Remove in next MAJOR version bump
4. **Remove from registry** — Registry data may stop populating deprecated fields after deprecation period

### Schema Markup

```json
{
  "old_field": {
    "type": "string",
    "description": "Original description",
    "deprecated": true,
    "deprecationMessage": "Use 'new_field' instead. Will be removed in v2.0."
  },
  "new_field": {
    "type": "string",
    "description": "Replacement for old_field"
  }
}
```

### Timeline

| Event | Timing |
|-------|--------|
| Field marked deprecated | Start of deprecation |
| Deprecation notice published | Same day |
| Consumer projects notified | Same day (for breaking changes) |
| Field removed from schema | Next MAJOR version (min 2 sprints later) |
| Old data removed | Next MAJOR version |

## Output Format Deprecation

### Process

1. **Announce deprecation** — Add deprecation notice to the output file and changelog
2. **Dual output** — Generate both old and new formats for 1 sprint
3. **Remove old format** — After transition period

### Timeline

| Event | Timing |
|-------|--------|
| New format introduced | Start of sprint |
| Old format deprecated | Same day |
| Dual generation active | 1 sprint |
| Old format removed | Next sprint |

## Technology / Dependency Deprecation

### Process

1. **Assess impact** — What breaks? What needs migration?
2. **Find replacement** — Certified alternative must exist
3. **Announce deprecation** — At least 1 sprint in advance
4. **Migrate code** — Update scripts and dependencies
5. **Remove old dependency** — After migration complete
6. **Update certification** — New technology must be certified

### Timeline

| Event | Timing |
|-------|--------|
| Deprecation announced | Start of sprint |
| Migration complete | End of sprint |
| Old dependency removed | Next sprint |

## Documentation Deprecation

### Process

1. Add `DEPRECATED` header to the document
2. Add cross-reference to replacement document
3. Keep document for 2 sprints for reference
4. Remove after transition period

### Header

```markdown
> **DEPRECATED**: This document is superseded by `docs/path/to/new-document.md`.
> It will be removed after [date]. Please update your references.
```

## Consumer Notification

For any deprecation that affects consumer projects:

1. **Add to changelog** — `docs/architecture/07_RELEASE_POLICY.md`
2. **Update consumer contract** — `contracts/consumer-contract.md`
3. **Notify registered projects** — Via GitHub issue or direct communication
4. **Provide migration guide** — Clear steps for updating

## Exceptions

Emergency deprecations (security, data integrity) may bypass the standard timeline with project owner approval. Emergency deprecations must still be documented in changelog and consumer contract.

## Changelog

All deprecations must be logged:

```
### v1.0 → v1.1 — YYYY-MM-DD

**Deprecations:**
- Field `old_field` in document.schema.json. Use `new_field` instead.
- Output format `dist/old-format.json`. Use `dist/new-format.json` instead.

**Removals:**
- Removed deprecated field `very_old_field` (deprecated since v0.9).
```
