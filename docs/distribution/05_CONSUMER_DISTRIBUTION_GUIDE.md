# Consumer Distribution Guide

## How to Consume MJU-DRP Registry Packages

MJU-DRP registry packages are designed to be consumed by any web application, static site, or backend service. Packages are distributed via the GitHub repository and (in future) via GitHub Pages.

## Recommended Consumption Pattern

### 1. Use Always the Latest Stable Package

```html
<!-- Fetch from GitHub raw content -->
<script>
const BASE = "https://raw.githubusercontent.com/numtip/mjudrp/main/release/latest/registry-package";
const registry = await fetch(`${BASE}/document-registry.json`).then(r => r.json());
const categories = await fetch(`${BASE}/category-registry.json`).then(r => r.json());
const manifest = await fetch(`${BASE}/manifest.json`).then(r => r.json());
</script>
```

### 2. Use Explicit Version for Production

```html
<script>
const VERSION = "v1";
const BASE = `https://raw.githubusercontent.com/numtip/mjudrp/main/release/${VERSION}/registry-package`;
</script>
```

### 3. Check Manifest Before Processing

```js
const manifest = await fetch(`${BASE}/manifest.json`).then(r => r.json());
if (manifest.consumer_compatibility === "v1.0" && manifest.minimum_registry_version === "1.0") {
  // Safe to consume
}
```

## Package Endpoints (Future GitHub Pages)

When GitHub Pages is configured:

| Endpoint | Description |
|----------|-------------|
| `https://numtip.github.io/mjudrp/latest/` | Latest stable package |
| `https://numtip.github.io/mjudrp/v1/` | v1.x frozen package |
| `https://numtip.github.io/mjudrp/archive/` | Historical packages |

## Consumer Rules

1. **Always fetch from `release/*/registry-package/`** — Never reference `dist/`, `registry/`, or `schemas/`
2. **Always validate manifest** — Check `consumer_compatibility` before processing
3. **Always pin versions in production** — Use `v1/` not `latest/` for production deployments
4. **Never modify package files** — Treat packages as immutable snapshots
5. **Never duplicate metadata** — Fetch from MJU-DRP; don't maintain your own copy
