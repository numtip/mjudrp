# Version Lifecycle

## Package Versions

MJU-DRP packages follow **semantic versioning** (MAJOR.MINOR.PATCH).

| Component | Current Version | Status |
|-----------|----------------|--------|
| Registry Specification | v1.0 | FROZEN |
| Package Format | v1.0 | FROZEN |
| Package Release | 1.0.0 | ACTIVE |

## Version Lifecycle

```
Development → Release Candidate → Stable (latest/) → Versioned (vN/) → Archive
```

### Development (main branch)
- Registry data being updated, tested, validated
- NOT suitable for production consumption
- Consumers should use CI artifacts for testing

### Release Candidate
- All validation passes
- Package validation passes
- Ready for pre-production testing

### Stable (release/latest/)
- Fully validated and tested
- Safe for all consumers
- Overwritten on each new release

### Versioned (release/v{N}/)
- Frozen snapshot when a release is promoted
- Never modified after promotion
- Consumers pin to this for production

### Archive (release/archive/)
- Historical versions moved when superseded
- Preserved for legacy consumers
- No further updates

## Lifecycle Rules

1. **Latest always points to newest stable** — Overwritten each release
2. **Versioned packages are immutable** — Never modified after creation
3. **Archived packages are read-only** — Preserved for compatibility
4. **Patch releases** (1.0.x): Overwrite latest/, add to archive/
5. **Minor releases** (1.x.0): Create new v1.x/ directory
6. **Major releases** (x.0.0): Create new v{x}/ directory, archive v{x-1}/

## Version Promotions

| From | To | When |
|------|----|------|
| Development | latest/ | Release pipeline completes successfully |
| latest/ | v{N}/ | Manual promotion after verification |
| v{N}/ | archive/ | Next major version released |
