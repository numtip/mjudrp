# Package Validation

## Overview

Every MJU-DRP registry package is self-validating. The `scripts/validate-package.mjs` script verifies package integrity, completeness, and consistency.

## Validation Checks

The package validator performs the following checks:

### 1. File Existence
All required package files must exist in the package directory:
- Registry data files (6 JSON files)
- Search indexes (2 JSON files)
- Package metadata (4 JSON files + release-notes.md + checksum.json)

### 2. Checksum Validation
Every artifact's SHA-256 hash must match its entry in `checksum.json`.

### 3. Manifest Validation
- All required fields present
- Registry version is valid
- Schema version is valid
- Package version is present
- Build timestamp is present
- Consumer compatibility declared
- Build hash present

### 4. Statistics Validation
- All summary fields present and numeric
- Growth, distribution, and density metrics present

### 5. Registry Count Consistency
- Document count in `statistics.json` must match `document-registry.json`
- Same for categories, projects, owners, evidence, relationships

### 6. Search Index Validation
- `search-index.json` must be a valid JSON array
- `minisearch-index.json` must be a valid JSON object

### 7. Validation Report Check
- `validation-report.json` must exist
- Status must be "PASS"
- Errors must be 0

### 8. Release Notes Validation
- `release-notes.md` must exist
- Must contain correct title
- Must include Package Version and Registry Statistics sections

## Running Validation

```bash
# Validate the latest package
node scripts/validate-package.mjs

# The script exits with code 0 on PASS, 1 on FAIL
```

## CI Integration

Package validation runs as the final step in the release pipeline. The CI workflow (`validate.yml`) includes all validation steps:
1. Registry validation (AJV)
2. Output generation
3. Test suite
4. Release notes generation
5. Checksum generation
6. Package validation

## Failure Recovery

If package validation fails:
1. Check the specific assertion that failed
2. Fix the underlying issue (registry data, generator, etc.)
3. Re-run the full release pipeline
4. Never publish a package that fails validation
