# GitHub Pages Strategy

## Overview

GitHub Pages will serve as a **static Registry CDN** for MJU-DRP registry packages. This document describes the planned structure and strategy.

## NOT YET DEPLOYED

GitHub Pages is NOT yet configured for this repository. This document is a planning artifact.

## Recommended Structure

When GitHub Pages is enabled for this repository (or a dedicated `gh-pages` branch), the recommended URL structure is:

```
https://numtip.github.io/mjudrp/
├── latest/
│   ├── document-registry.json
│   ├── category-registry.json
│   ├── project-registry.json
│   ├── owner-registry.json
│   ├── evidence-registry.json
│   ├── relationship-registry.json
│   ├── search-index.json
│   ├── minisearch-index.json
│   ├── statistics.json
│   ├── validation-report.json
│   ├── performance-report.json
│   ├── manifest.json
│   ├── release-notes.md
│   ├── checksum.json
│   └── README.md
│
├── v1/                  ← Same structure as latest/ (frozen)
│
└── archive/
    └── v1.0.0/          ← Historical packages
```

## Deployment Approaches

### Option A: GitHub Actions → gh-pages branch (Recommended)

```yaml
# Future CI step
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./release
```

### Option B: Main branch GitHub Pages

Configure repository Settings > Pages > Source: "main" > `/docs` folder. Then serve from main branch paths.

### Option C: External CDN

For higher reliability, outputs can be copied to any static file host (Netlify, Vercel, Cloudflare Pages, S3, etc.).

## Consumer URL Strategy

| Use Case | URL Pattern |
|----------|-------------|
| Development | `https://raw.githubusercontent.com/numtip/mjudrp/main/release/latest/registry-package/` |
| Production (future) | `https://numtip.github.io/mjudrp/latest/` |
| Production pinned (future) | `https://numtip.github.io/mjudrp/v1/` |
| Historical (future) | `https://numtip.github.io/mjudrp/archive/v1.0.0/` |

## CORS Configuration

GitHub Pages supports CORS headers natively. No additional configuration needed for cross-origin JSON fetching from JavaScript.

## Security Considerations

1. All packages include SHA-256 checksums for integrity verification
2. Consumers should validate checksums before processing package data
3. GitHub Pages serves over HTTPS by default
4. Historical packages in archive/ are immutable
