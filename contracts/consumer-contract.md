# Consumer Contract

## Version

**v1.0 (Draft)** — Current during MVP. Will be published when first consumer project integrates.

## Parties

- **Provider**: MJU-DRP (this repository)
- **Consumers**: RAE Landing, Green Office 2026, Learning Center, Research Portal, Future Projects

## Consumer Obligations

1. **Fetch only** — Retrieve JSON outputs from MJU-DRP distribution channels
2. **Do not duplicate** — Do not store copies of registry metadata in consumer project repositories
3. **Do not modify** — Do not alter registry data; submit corrections via PR to MJU-DRP
4. **Handle errors gracefully** — If JSON outputs are unavailable, show degraded UI
5. **Refresh on deploy** — Fetch latest registry data during build/deploy
6. **Respect rate limits** — Use caching for GitHub raw URLs; use GitHub Pages for production

## Provider Obligations

1. **Maintain valid outputs** — Generated JSON outputs must pass validation
2. **Maintain backward compatibility** — Output format changes require version bump
3. **Provide clear URLs** — Distribution URLs are documented and stable
4. **Version outputs** — Released outputs are tagged and immutable
5. **Document breaking changes** — Schema changes are documented in advance

## Output Guarantees

| Guarantee | Description |
|-----------|-------------|
| Format stability | JSON array format will not change without major version bump |
| Field presence | Documented fields will not be removed without deprecation notice |
| ID stability | Document IDs will not be reused |
| URL stability | Distribution URLs will remain accessible |

## Versioning

Consumers should pin to a specific version tag for production:

```
https://raw.githubusercontent.com/numtip/mjudrp/v1.0/dist/document-registry.json
```

The `main` branch is for development and may change without notice.

## Breaking Changes

Breaking changes require:

1. Major version bump (v1.0 → v2.0)
2. Deprecation notice in changelog
3. Migration guide for consumer projects
4. Minimum 1 sprint (2 weeks) transition period

## Conflict Resolution

- Schema disagreements are escalated to the MJU-DRP project owner
- Consumer-specific fields are added to the main schema, not forked
- Custom consumer needs are addressed via registry extension, not data duplication
