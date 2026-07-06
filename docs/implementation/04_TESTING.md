# Testing

## Test Suite

The test suite consists of 4 test files in `tests/`, all using Node.js ESM (no test framework dependency):

| File | Tests | Assertions |
|------|-------|-----------|
| `validation.test.mjs` | Schema compilation, document validation, invalid document detection, ID format | 28 |
| `generator.test.mjs` | Output file existence, manifest content, registry content, search index | 29 |
| `registry.test.mjs` | Duplicate IDs, cross-references, evidence map, required fields, fixture datasets | 11 |
| `search.test.mjs` | MiniSearch loading, English search, fuzzy search, edge cases, large fixture performance | 9 |

**Total: 77 assertions**

## Running Tests

```bash
# Run all tests
npm test

# Run individual tests
node tests/validation.test.mjs
node tests/generator.test.mjs
node tests/registry.test.mjs
node tests/search.test.mjs
```

## Test Coverage

### validation.test.mjs
- All 6 schemas are found and compile with AJV
- Every sample document validates against its schema
- Invalid documents (missing required fields) are correctly rejected
- Documents match the project's ID format pattern (`^[A-Z0-9]+-[0-9]{3,}$`)

### generator.test.mjs
- All 11 expected output files exist in `dist/`
- `manifest.json` contains all required fields with correct values
- Registry outputs are valid JSON arrays with non-empty content
- `search-index.json` matches document count
- `minisearch-index.json` is a valid object for MiniSearch loading

### registry.test.mjs
- No duplicate IDs across any registry
- All cross-references (owner, category, project_refs, evidence_refs) are valid
- Evidence map references are consistent
- No missing required fields
- Fixture datasets contain expected document counts (10, 100, 1000)

### search.test.mjs
- MiniSearch index file loads without errors
- English text search returns relevant results
- Fuzzy search handles typos
- Empty/no-match queries return 0 results
- 1000-document benchmark completes in <1000ms with index <5MB

## CI Integration

Tests run automatically on push/PR via GitHub Actions. The pipeline fails if any test fails.
