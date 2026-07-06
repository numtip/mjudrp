# Search Capability Discovery

## Evaluation Criteria

- **Static-first compatibility**: Must work with pre-generated static JSON
- **Thai language support**: Must handle Thai text correctly
- **Client-side size**: Bundle size impact on consumer projects
- **Build-time indexing**: Index generation during build, not at runtime
- **Consumer project integration**: Ease of use in Astro, Next.js, Vue, etc.
- **Maintenance**: Community activity, release cadence

---

### Pagefind

| Field | Value |
|-------|-------|
| Static-first | ✅ Yes — designed for static sites |
| Thai language support | ✅ Yes — uses ICU/language segmentation |
| Client-side size | ~30KB gzipped |
| Build-time indexing | ✅ Yes — CLI tool indexes after build |
| Consumer integration | High — Astro, Hugo, Jekyll, 11ty plugins |
| Maintenance | Very high — actively maintained |
| Recommendation | ✅ **Certify** — Best static search for production. Add post-build step. |

### MiniSearch

| Field | Value |
|-------|-------|
| Static-first | ✅ Yes — client-side JS library, loads prebuilt index |
| Thai language support | ⚠️ Partial — no native Thai tokenizer; works with substring matching |
| Client-side size | ~6KB gzipped |
| Build-time indexing | ✅ Yes — generate index JSON at build time |
| Consumer integration | High — works with any JS framework |
| Maintenance | High — actively maintained (lucaong/minisearch) |
| Recommendation | ✅ **Certify** — Lightweight, good for MVP. |

### FlexSearch

| Field | Value |
|-------|-------|
| Static-first | ✅ Yes — works with prebuilt index |
| Thai language support | ⚠️ Basic — no Thai-specific tokenizer |
| Client-side size | ~8KB gzipped |
| Build-time indexing | ✅ Yes — prebuild index on server/CI |
| Consumer integration | Medium — JS library, good documentation |
| Maintenance | Medium — maintained but slower releases |
| Recommendation | ✅ **Candidate** — Good alternative to MiniSearch. |

### Lunr

| Field | Value |
|-------|-------|
| Static-first | ✅ Yes — prebuilt index JSON |
| Thai language support | ❌ No Thai tokenizer; poor Thai search results |
| Client-side size | ~50KB gzipped (larger for language plugins) |
| Build-time indexing | ✅ Yes |
| Consumer integration | High — widely used |
| Maintenance | Medium |
| Recommendation | ❌ **Rejected** — Poor Thai support. |

### Fuse.js

| Field | Value |
|-------|-------|
| Static-first | ✅ Yes — works with JSON array, no prebuilt index needed |
| Thai language support | ⚠️ Basic — fuzzy matching works but no tokenization |
| Client-side size | ~15KB gzipped |
| Build-time indexing | ❌ No — searches at runtime (slower on large datasets) |
| Consumer integration | High — simple API |
| Maintenance | Medium |
| Recommendation | ⚠️ **Backup** — Simple but no build-time indexing; O(n) search. |

### Microsoft Search

| Field | Value |
|-------|-------|
| Static-first | ❌ No — requires Microsoft 365 tenant, not static |
| Thai language support | ✅ Yes — enterprise-grade |
| Client-side size | N/A — hosted service |
| Consumer integration | Low — cannot embed in consumer project search bars |
| Recommendation | ❌ **Not suitable** for consumer project search. Use as enterprise document search only. |

### Static JSON Search (Current MVP)

| Field | Value |
|-------|-------|
| Static-first | ✅ Yes |
| Thai language support | ✅ Yes — client-side JS can filter with `includes()` |
| Client-side size | Depends on data size (current ~4KB for search index) |
| Build-time indexing | ✅ Yes — already implemented |
| Consumer integration | ✅ Already documented |
| Maintenance | ✅ Zero dependencies, built-in |
| Recommendation | ✅ **Keep for MVP** — Sufficient for current scale (7 documents). Transition to MiniSearch or Pagefind when registry grows. |

---

## Comparison Summary

| Library | Static-first | Thai Support | Size | Build Index | Recommendation |
|---------|:-----------:|:------------:|:----:|:-----------:|:--------------:|
| Static JSON (current) | ✅ | ✅ | ~4KB | ✅ | Keep for MVP |
| MiniSearch | ✅ | ⚠️ Partial | ~6KB | ✅ | ✅ Certify |
| Pagefind | ✅ | ✅ | ~30KB | ✅ | ✅ Certify (prod) |
| FlexSearch | ✅ | ⚠️ Basic | ~8KB | ✅ | Candidate |
| Fuse.js | ✅ | ⚠️ Basic | ~15KB | ❌ | Backup |
| Lunr | ✅ | ❌ | ~50KB | ✅ | Rejected |
| Microsoft Search | ❌ | ✅ | N/A | ❌ | Not suitable |

## Roadmap

| Phase | Search | When |
|-------|--------|------|
| MVP | Static JSON `filter()` | Now |
| Sprint 2-3 | MiniSearch | Next |
| Production | Pagefind | After consumer integration |
