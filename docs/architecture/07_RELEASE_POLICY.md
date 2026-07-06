# Release Policy

## Status

**LOCKED** — 2026-07-06

## Release Versioning

MJU-DRP uses **semantic versioning** for releases: `MAJOR.MINOR`

| Component | Current Version | Version Source |
|-----------|----------------|----------------|
| Registry Specification | v1.0 | `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` |
| Consumer Contract | v1.0 | `contracts/consumer-contract.md` |
| Architecture Lock | v1.0 | `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` |

## Release Types

### Major Release (v1.0 → v2.0)

Breaking changes to schema, outputs, or consumer contract.

**Requirements:**
- New ADR documenting the change
- Migration guide for consumer projects
- 1 sprint (2 weeks) deprecation notice
- All consumer projects notified
- Registry data migrated to new schema
- Validation passes on both old and new schemas during transition

### Minor Release (v1.0 → v1.1)

Additive changes to schema, new outputs, or documentation updates.

**Requirements:**
- Validation passes
- Memory files updated
- Runtime files updated
- Changelog updated

### Patch / Hotfix

Not used during MVP. All changes are either minor or major.

## Release Process

### Step 1: Prepare

- [ ] All sprint objectives are complete
- [ ] Validation scripts pass (0 errors, 0 warnings)
- [ ] All registry data is valid
- [ ] Outputs are generated and correct
- [ ] Memory files are updated (CURRENT_STATE, NEXT_TASK, LAST_HANDOFF, SESSION_LOG)
- [ ] Runtime files are updated (CURRENT_RUNTIME, CURRENT_PHASE, CURRENT_OUTPUTS)
- [ ] ADRs are up to date
- [ ] Changelog is updated
- [ ] Documentation is consistent

### Step 2: Verify Quality Gates

| Gate | Requirement |
|------|-------------|
| Registry Validation | PASS |
| Schema Validation (AJV) | PASS (Sprint 2+) |
| Output Generation | Succeeds |
| Cross-reference Check | All references valid |
| CI Pipeline | Green |
| Documentation Links | Valid |
| Consumer Contract | Up to date |

### Step 3: Release

1. Update version numbers in affected files
2. Tag the release: `git tag v{version}`
3. Push tag: `git push origin v{version}`
4. Create GitHub Release with changelog

### Step 4: Post-Release

- [ ] Notify consumer projects (for major releases)
- [ ] Update project status in README.md
- [ ] Verify GitHub Release is accessible

## Quality Gates

The following quality gates are **locked** and must pass for every sprint:

| Gate | Tool | Required |
|------|------|----------|
| Registry data validation | `node scripts/validate-registry.mjs` | ✅ Must PASS |
| Output generation | `node scripts/generate-search-index.mjs` | ✅ Must succeed |
| Memory files updated | Manual review | ✅ Must be updated |
| Runtime files updated | Manual review | ✅ Must be updated |
| ADRs updated | Manual review | ✅ If decisions made |
| CI pipeline | GitHub Actions | ✅ Must be green |

## Changelog

Each release must include a changelog entry in `docs/architecture/07_RELEASE_POLICY.md`:

```
### v1.0 — 2026-07-06
- Initial architecture lock
- Registry specification frozen at v1.0
- 6 schemas defined
- Consumer contract established
- Quality gates locked
```

## Release Cadence

| Phase | Cadence |
|-------|---------|
| MVP (Sprints 1-4) | Per sprint (variable) |
| Production | Monthly or per major change |

## Distribution

- **Source**: GitHub repository (https://github.com/numtip/mjudrp)
- **Outputs**: GitHub raw URLs + GitHub Pages (Sprint 2+)
- **Tags**: Git tags follow semver (v1.0, v1.1, v2.0)
- **Consumer projects**: Pin to versioned tags for production
