# Pagefind Evaluation Report

## Technology

| Field | Value |
|-------|-------|
| Name | Pagefind |
| Source | `npm: pagefind` |
| License | AGPL-3.0 / Commercial |
| Type | Static search indexer (post-build) |
| Size | ~3MB (CLI binary) |
| Maintainer | CloudCannon |

## Why Evaluated

- Best-in-class static search for production websites
- Post-build indexing — no runtime search server needed
- Multilingual support including Thai (segmented indexing)
- Astro and Next.js integrations available
- Recommended in ECD v1.3 for Sprint 3+

## Evaluation Criteria

Pagefind operates fundamentally differently from MiniSearch:

| Aspect | MiniSearch | Pagefind |
|--------|-----------|----------|
| When index is built | Build-time (script) | Post-build (after site generation) |
| Where search runs | Browser (client-side JS) | Browser (client-side JS) |
| Index type | JSON file | Static asset directory |
| Requires HTML output | No | Yes (crawls HTML pages) |
| Thai support | Good (UTF-8) | Excellent (ICU-based segmentation) |
| Bundle size | 6KB gzipped | ~30KB gzipped |

## Architecture Assessment

### What Pagefind Does

```
1. Build website (any static site generator)
2. Run pagefind on output directory
3. Pagefind crawls all HTML files
4. Extracts text content and metadata
5. Generates search index (pagefind/* directory)
6. Consumer includes pagefind JS library
7. pagefind.search("query") returns results
```

### What This Means for MJU-DRP

| Requirement | Status | Notes |
|-------------|--------|-------|
| HTML output needed | ❌ Not currently | MJU-DRP produces JSON, not HTML |
| Static build pipeline | ✅ Feasible | Add to GitHub Actions |
| Multilingual | ✅ Excellent | ICU-based, handles Thai well |
| Astro compatibility | ✅ Official plugin | `@pagefind/astro` |
| Next.js compatibility | ✅ Official plugin | `pagefind-next` |

### Integration Path

```
MJU-DRP currently: registry → validate → JSON output → consumer fetches
                                                         ↓
Pagefind needs:    registry → validate → JSON output → HTML page → pagefind index → consumer

Additional step: Create a minimal HTML page that renders registry data
```

## Limitations

1. **Requires HTML output** — MJU-DRP generates JSON, not HTML. Pagefind needs HTML content to index. An intermediate step (a simple HTML page rendering registry data) would be needed.
2. **Build-time addition** — Adds ~5-15 seconds to CI build.
3. **Binary dependency** — Pagefind ships as a platform-specific binary (~3MB).
4. **Overhead for small sites** — For <50 documents, MiniSearch is more appropriate.
5. **Astro/Next.js integration** — only valuable once consumer projects actually use those frameworks.

## Certification Decision

**Status: FUTURE**

| Dimension | Verdict |
|-----------|---------|
| Static build | ✅ Works with any SSG |
| Index generation | ✅ Automatic HTML crawling |
| Multilingual (Thai) | ✅ Excellent ICU segmentation |
| Astro compatibility | ✅ Official plugin |
| Next.js compatibility | ✅ Official plugin |
| MJU-DRP readiness | ❌ MJU-DRP needs HTML output first |

**Deferred to Sprint 3+** after consumer projects exist and have HTML pages for Pagefind to index.

## Risk

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Binary platform mismatch | Low | Medium | Use npx for platform detection |
| License (AGPL) | Low | Low | Commercial license available; not a concern for internal projects |
| Search relevance tuning | Medium | Low | Pagefind relevance is already good |

## Recommendation

**Defer to Sprint 3 or later.** Pagefind is the right production search solution for MJU-DRP consumer projects, but it requires:
1. Consumer projects with HTML pages
2. GitHub Pages or static hosting
3. Post-build step in CI

Until then, MiniSearch meets MVP search requirements.

## Next Review

When one or more consumer projects have deployed static sites with HTML pages that need search functionality.
