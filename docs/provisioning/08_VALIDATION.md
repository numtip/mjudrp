# Validation

## Overview

MJU-DRP provides validation at three levels:
1. **Provisioning validation** — verify templates are complete and consistent
2. **Registry validation** — verify document metadata against schemas
3. **Package validation** — verify distribution package integrity

## Provisioning Validation

```bash
node scripts/validate-provisioning.mjs
```

Checks:
- All directories and files exist
- JSON templates are valid
- Required fields present in templates
- No duplicate filenames
- Manifest integrity
- AI prompts have correct headers

## Registry Validation

```bash
node scripts/validate-registry.mjs
```

Checks:
- All 6 schemas compile with AJV
- All documents validate against schema
- Cross-references are valid
- No duplicate IDs

## Package Validation

```bash
node scripts/validate-package.mjs
```

Checks:
- 55 validation checks
- All package files exist
- SHA-256 checksums valid
- Registry counts consistent
- Search indexes exist

## Validation Templates

See `provisioning/validation/` for:
- `metadata-checklist.json` — Check each metadata field
- `library-validation.json` — Verify library configuration
- `site-validation.json` — Verify site configuration
- `permission-validation.json` — Verify permission groups
