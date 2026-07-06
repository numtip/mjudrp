# MJU-DRP Operator Guide

**Version:** 1.0.0
**Status:** READY — 2026-07-06
**Audience:** Registry operators maintaining the MJU-DRP repository

---

## 1. Overview

As an MJU-DRP operator, your primary responsibilities are:
- Maintaining registry data (documents, categories, projects, owners, evidence)
- Running validation scripts before committing changes
- Generating search indexes and registry packages
- Releasing new registry packages for consumer projects
- Keeping memory files updated for AI agent continuity

## 2. Daily Operations

### 2.1 Validate Registry

Always validate before committing any registry changes:

```bash
node scripts/validate-registry.mjs
```

Expected output: `PASS (0 errors, 0 warnings)`

If validation fails, review errors and fix them in the relevant registry file.

### 2.2 Generate Search Index

After validating, regenerate the search index:

```bash
node scripts/generate-search-index.mjs
```

Outputs are written to `dist/`.

### 2.3 Run Tests

```bash
npm test
```

Expected: 211 assertions, 0 failures across 4 test suites.

### 2.4 Release Package

```bash
node scripts/release.mjs
```

This runs all validations, generates artifacts, and writes to `release/latest/` and `release/v1/`.

## 3. Adding a New Document

1. Open `registry/documents.sample.json`
2. Add a new document entry following the existing format
3. Ensure all required fields: `id`, `title`, `category`, `status`, `owner`, `visibility`
4. Run `node scripts/validate-registry.mjs`
5. Run `node scripts/generate-search-index.mjs`
6. Commit and push

## 4. Adding a New Category / Project / Owner

Categories: `registry/categories.sample.json`
Projects: `registry/projects.sample.json`
Owners: `registry/owners.sample.json`
Evidence: `registry/evidence-map.sample.json`

Follow the same validate → generate → commit workflow.

## 5. Operator Scripts Reference

| Script | Purpose | When to Run |
|--------|---------|-------------|
| `validate-registry.mjs` | Validates all registry data | Before every commit |
| `generate-search-index.mjs` | Regenerates dist/ outputs | After registry changes |
| `validate-provisioning.mjs` | Validates provisioning templates | After provisioning changes |
| `validate-deployment.mjs` | Validates deployment assets | After deployment changes |
| `validate-package.mjs` | Validates release package | Before release |
| `release.mjs` | Full release pipeline | For published releases |
| `update-memory.mjs` | Updates memory timestamps | End of every session |
| `import-pilot-metadata.mjs` | Imports pilot SharePoint metadata | After pilot export |
| `validate-pilot.mjs` | Validates pilot metadata | After pilot import |

## 6. Registry Data Locations

| Entity | File |
|--------|------|
| Documents | `registry/documents.sample.json` (74 docs) |
| Categories | `registry/categories.sample.json` (22 cats) |
| Projects | `registry/projects.sample.json` (12 projects) |
| Owners | `registry/owners.sample.json` (12 owners) |
| Evidence | `registry/evidence-map.sample.json` (124 evidence) |
| Relationships | Generated from document refs |

## 7. Output Locations

| Output | Location |
|--------|----------|
| Validation reports | `dist/validation-report.json` |
| Search index | `dist/search-index.json` |
| Document registry | `dist/document-registry.json` |
| Release package | `release/latest/registry-package/` |
| Versioned release | `release/v1/registry-package/` |

## 8. Git Workflow

```bash
# Make changes to registry JSON files
# Validate
node scripts/validate-registry.mjs
# If PASS, generate
node scripts/generate-search-index.mjs
# If PASS, commit
git add registry/ dist/
git commit -m "feat: add <description>"
git push origin main
```

## 9. When to Use --Execute Flag

All pilot deployment scripts default to **dry-run mode**. Pass `-Execute` only when:
- You have reviewed the dry-run output
- You have confirmed the target site URL
- You have rollback plan ready
- You are authorized to modify the SharePoint environment

## 10. Further Reading

| Topic | Document |
|-------|----------|
| Architecture | `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` |
| Registry Spec | `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` |
| Deployment | `docs/deployment/00_DEPLOYMENT_OVERVIEW.md` |
| Pilot | `docs/pilot/00_PILOT_DEPLOYMENT_RUNBOOK.md` |
