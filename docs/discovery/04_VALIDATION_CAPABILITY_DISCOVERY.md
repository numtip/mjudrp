# Validation Capability Discovery

## Evaluation Criteria

- **Schema compatibility**: Works with JSON Schema (draft-07)
- **Runtime validation**: Can validate registry data programmatically
- **Developer experience**: Error messages, type inference, setup
- **CI integration**: Works in GitHub Actions (no native modules)
- **Static registry validation**: Validates JSON files at build time
- **Recommendation**: Best fit for MJU-DRP

---

### AJV (Another JSON Validator)

| Field | Value |
|-------|-------|
| Schema compat | ✅ JSON Schema draft-07, 2019-09, 2020-12 |
| Runtime validation | ✅ Yes — Node.js and browser |
| Developer experience | Good — detailed error messages, fast |
| CI integration | ✅ Yes — pure JS, no native modules |
| Static registry validation | ✅ Yes — validate JSON files against schemas |
| Speed | Fastest JSON Schema validator |
| Size | ~500KB (tree-shakeable) |
| Recommendation | ✅ **Certify** — Best JSON Schema validator for Node.js. Use as primary. |

### Zod

| Field | Value |
|-------|-------|
| Schema compat | ❌ Not JSON Schema — own schema definition language |
| Runtime validation | ✅ Yes — built for runtime |
| Developer experience | Excellent — TypeScript-first, type inference |
| CI integration | ✅ Yes — pure JS |
| Static registry validation | ⚠️ Requires defining schemas in Zod, not JSON Schema |
| Speed | Fast |
| Size | ~30KB gzipped |
| Recommendation | ⚠️ **Candidate** for TypeScript-heavy projects. Not suitable for JSON Schema-first approach. |

### TypeBox

| Field | Value |
|-------|-------|
| Schema compat | ✅ Generates JSON Schema from TypeScript types |
| Runtime validation | ✅ Yes — via TypeCompiler or optional validator |
| Developer experience | Excellent — TypeScript-first, schema generation |
| CI integration | ✅ Yes — pure JS |
| Static registry validation | ⚠️ Would need TypeScript compilation step |
| Speed | Very fast (JIT compiled) |
| Size | ~20KB gzipped |
| Recommendation | ⚠️ **Candidate** for TypeScript projects. Adds compilation dependency. |

### JSON Schema Native Validation

| Field | Value |
|-------|-------|
| Schema compat | ✅ Native JSON Schema |
| Runtime validation | ⚠️ No native Node.js implementation (must use library) |
| Developer experience | N/A — no standalone native validator |
| Recommendation | ❌ **Not viable** — no built-in Node.js JSON Schema validator. Use AJV. |

### Custom Node.js Validation (Current)

| Field | Value |
|-------|-------|
| Schema compat | ⚠️ Manual field checks, not schema-driven |
| Runtime validation | ✅ Yes — already implemented in validate-registry.mjs |
| Developer experience | Good for current needs — simple script |
| CI integration | ✅ Yes — already in CI |
| Static registry validation | ✅ Yes — already validated |
| Maintenance | Low — 150 lines of JS |
| Recommendation | ✅ **Keep for MVP** — Sufficient for current scope. Add AJV in Sprint 2-3. |

---

## Comparison Summary

| Tool | Schema Compat | CI Ready | TypeScript | Recommendation |
|------|:------------:|:--------:|:----------:|:--------------:|
| Custom JS (current) | Manual checks | ✅ | ❌ | ✅ Keep for MVP |
| AJV | ✅ JSON Schema | ✅ | Good | ✅ Certify for upgrade |
| Zod | ❌ Own schema | ✅ | Excellent | ⚠️ Candidate |
| TypeBox | ✅ Generates JSON | ✅ | Excellent | ⚠️ Candidate |
| Native JSON Schema | ❌ Not available | ❌ | ❌ | Rejected |

## Roadmap

| Phase | Validator | When |
|-------|-----------|------|
| MVP | Custom Node.js script | Now |
| Sprint 2 | Add AJV schema validation alongside custom checks | Next |
| Sprint 3+ | Consider TypeBox if TypeScript migration happens | Future |
