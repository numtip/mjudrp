# AJV Certification Report

## Technology

| Field | Value |
|-------|-------|
| Name | AJV (Another JSON Validator) |
| Version | 8.x (latest) |
| Source | `npm: ajv` |
| Companion | `npm: ajv-formats` |
| License | MIT |
| Size | ~200KB (ajv + ajv-formats combined) |

## Why Selected

- Fastest JSON Schema validator for Node.js
- Pure JavaScript — no native compilation required
- Supports JSON Schema draft-07 (matching MJU-DRP schemas)
- GitHub Actions compatible (npm ci install)
- Widely adopted (10M+ weekly downloads)
- Chosen over Zod (schema-first not desired), TypeBox (too complex), and custom validation (duplication)

## Verification Procedure

```bash
# Install
npm install ajv ajv-formats

# Run certification script
node scripts/certify-ajv.mjs
```

### What It Tests

1. Schema compilation with `ajv-formats`
2. Validation of all 7 sample documents
3. Detailed error reporting for invalid documents
4. Format validation (`uri`, `date-time`)
5. CI compatibility (pure JS, no network at runtime)

## Measured Results

### Schema Compilation

| Metric | Result |
|--------|--------|
| Schema ID | `https://github.com/numtip/mjudrp/schemas/document.schema.json` |
| Draft | draft-07 |
| Required fields | 8 (id, title, category, owner, storage_provider, storage_path, share_url, project_refs) |
| Format validators needed | `uri`, `date-time` |
| Compilation | ✅ Pass |

### Document Validation

| Test | Result |
|------|--------|
| 7 sample documents | ✅ Pass (7/7) |
| Total validation time | 5ms |
| Average per document | 0.71ms |
| Error quality | Detailed (instancePath + message + missingProperty) |
| Invalid URL detection | ✅ Caught non-URI in `share_url` |

### CI Compatibility

| Requirement | Result |
|-------------|--------|
| Pure JavaScript | ✅ Yes |
| Native modules required | ❌ No |
| npm dependencies | 2 (ajv, ajv-formats) |
| Runtime network required | ❌ No |
| Deterministic output | ✅ Yes |

## Schema Findings

During certification, a schema adjustment was required:

**Issue:** Optional URL fields (`preview_url`, `thumbnail_url`) had `"format": "uri"` constraint but sample data used empty strings `""` which fail URI format validation.

**Fix:** Changed schema to use `anyOf` allowing either a valid URI or an empty string:

```json
"preview_url": {
  "anyOf": [
    { "type": "string", "format": "uri" },
    { "type": "string", "maxLength": 0 }
  ]
}
```

## Limitations

1. **ajv-formats required** — format validation is not included in base AJV. Must install `ajv-formats` separately for `uri` and `date-time` validation.
2. **Schema adjustments** — existing schemas may need minor adjustments (optional URL fields with empty values).
3. **No async validation** — not an issue for MJU-DRP (all data is static JSON).
4. **Performance ceiling** — AJV handles MJU-DRP scale (7-5000 docs) with negligible latency (<1ms per doc).

## Certification Decision

**Status: CONDITIONAL**

| Dimension | Verdict |
|-----------|---------|
| Schema compatibility | ✅ Full draft-07 support |
| Node.js compatibility | ✅ Pure ESM/CJS |
| GitHub Actions compatibility | ✅ npm ci |
| Validation speed | ✅ <1ms per document |
| Developer experience | ✅ Clear error messages |
| Dependency | ✅ 2 packages, no native modules |

**Condition:** Must install `ajv-formats` alongside AJV for format validation (`uri`, `date-time`). The `package.json` dependency must include both.

## Risk

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Schema/format mismatch | Low | Medium | Certify schema with AJV before deployment |
| AJV version upgrade breaks | Low | Low | Pin version in package.json |
| ajv-formats compatibility | Low | Low | Both maintained by same team |

## Recommendation

**Integrate AJV into `validate-registry.mjs` in Sprint 2.** The validation script should use AJV as an additional validation layer alongside existing custom checks. Include `ajv-formats` in the dependency.

## Next Review

Before Sprint 3, or when new JSON Schema features are needed (e.g., `if/then/else` for conditional validation).
