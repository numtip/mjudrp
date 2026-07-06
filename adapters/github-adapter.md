# GitHub Adapter

## Status

**Architecture documented.** Partial implementation exists (CI workflow via GitHub Actions). Full adapter covers registry publishing and output distribution.

## Role

GitHub adapter for publishing MJU-DRP registry outputs, managing CI/CD workflows, and distributing generated JSON files to consumer projects.

## Responsibilities

- Publish generated outputs to the repository
- Trigger validation workflows on registry changes
- Generate registry release artifacts
- Provide raw file URLs for consumer project consumption
- Support versioned releases of registry data

## Operations

| Operation | Description | Status |
|-----------|-------------|--------|
| `publish_outputs` | Commit and push generated outputs | ✅ Manual via git |
| `trigger_validation` | Run validation CI workflow | ✅ GitHub Actions |
| `get_raw_url` | Generate raw content URL for a file | ✅ Documented |
| `create_release` | Create tagged release of registry outputs | ❌ Planned |
| `list_versions` | List available registry versions by tag | ❌ Planned |

## URL Pattern for Outputs

```
Current:   https://raw.githubusercontent.com/numtip/mjudrp/main/dist/{filename}
Tagged:    https://raw.githubusercontent.com/numtip/mjudrp/v1.0/dist/{filename}
Pages:     https://numtip.github.io/mjudrp/{filename} (future)
```

## CI/CD Integration

GitHub adapter describes how MJU-DRP uses GitHub Actions:

| Workflow | Trigger | Action |
|----------|---------|--------|
| Validate | push, PR | Run validation script |
| Generate | post-validate | Generate search index |
| Publish | manual or tag | Deploy outputs to Pages |

## Constraints

- GitHub raw URLs have rate limits (60 requests/hour unauthenticated)
- For production consumer projects, use GitHub Pages or a CDN
- Registry releases should follow semver tagging conventions
- CI workflows must pass validation before generating outputs
