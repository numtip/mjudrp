# Build Pipeline

## Overview

The CI pipeline is defined in `.github/workflows/validate.yml` and runs on every push to `main` and pull request.

## Pipeline Stages

```
Checkout → Setup Node → Install deps → Validate → Generate → Test → Upload artifacts
```

### 1. Checkout

Uses `actions/checkout@v4` to clone the repository.

### 2. Setup Node.js

Uses `actions/setup-node@v4` with Node 20 and npm cache:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'
```

### 3. Install Dependencies

```bash
npm ci
```

Installs from `package-lock.json` for reproducible builds:
- `ajv` — JSON Schema validation
- `ajv-formats` — format validation
- `minisearch` — full-text search

### 4. Validate Registry Data

```bash
node scripts/validate-registry.mjs
```

Performs AJV schema validation and cross-reference checks. Exits with code 1 on errors.

### 5. Generate Outputs

```bash
node scripts/generate-search-index.mjs
```

Generates all 11 registry output files in `dist/`.

### 6. Run Tests

```bash
npm test
```

Runs all 4 test suites (77 assertions). Pipeline fails if any test fails.

### 7. Upload Artifacts

Uses `actions/upload-artifact@v4` to upload the entire `dist/` directory as a build artifact named `registry-outputs`.

## Quality Gates

The pipeline enforces:
- AJV validation must PASS (exit code 0)
- All tests must PASS (exit code 0)
- Registry generation must complete without errors
- Failing validation triggers explicit failure message

## Local Development

```bash
# Install dependencies
npm ci

# Validate registry
npm run validate

# Generate outputs
npm run generate

# Run tests
npm test

# All in one
npm run validate && npm run generate && npm test
```
