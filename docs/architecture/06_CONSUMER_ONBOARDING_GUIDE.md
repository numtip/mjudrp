# Consumer Onboarding Guide

## Status

**ACTIVE** — 2026-07-06

## Purpose

This guide explains how a consumer project (website, app, or service) can integrate MJU-DRP registry outputs.

## Prerequisites

- Access to the MJU-DRP GitHub repository
- Understanding of the consumer contract (`contracts/consumer-contract.md`)
- Registered project ID in the MJU-DRP project registry (optional — for filtering)

## Integration Steps

### Step 1: Register Your Project

Ensure your project is registered in `registry/projects.sample.json`. If not, submit a PR adding:

```json
{
  "id": "your-project-id",
  "name": "Your Project Name",
  "status": "active",
  "category_filters": ["report", "guideline"],
  "contact": "Project Owner"
}
```

### Step 2: Understand the Output Contract

MJU-DRP produces these outputs in the `dist/` directory:

| Output | URL | Description |
|--------|-----|-------------|
| document-registry.json | `https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json` | Full document metadata array |
| search-index.json | `https://raw.githubusercontent.com/numtip/mjudrp/main/dist/search-index.json` | Lightweight search index |
| search-index.minisearch.json | `dist/search-index.minisearch.json` (Sprint 2+) | MiniSearch-compatible index |

**Rules:**
- Only consume `dist/` outputs — never depend on internal registry files
- Always use versioned URLs for production (`v1.0` tag)
- Cache outputs in your build process — do not fetch on every page load
- Handle fetch failures gracefully (showing degraded UI)

### Step 3: Fetch Registry Data

```javascript
// Example: Fetch full document registry
const response = await fetch(
  "https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json"
);
const documents = await response.json();

// Filter by your project
const myDocs = documents.filter(doc =>
  doc.project_refs.includes("your-project-id")
);
```

### Step 4: Display Documents

Each document entry contains:

| Field | Display Usage |
|-------|---------------|
| `title` | Document title (link text) |
| `description` | Document summary or excerpt |
| `category` | Category badge or filter |
| `file_type` | File format icon (pdf, docx, etc.) |
| `share_url` | Link to the document in Microsoft 365 |
| `owner` | Responsible person/department |
| `status` | Document lifecycle status badge |
| `visibility` | Access level indicator |
| `created_at` | Publication date |
| `updated_at` | Last update date |

### Step 5: Add Search (Optional)

For client-side search, use MiniSearch:

```javascript
import MiniSearch from 'minisearch';

// Load the MiniSearch index
const response = await fetch('dist/search-index.minisearch.json');
const miniSearch = MiniSearch.loadJSON(await response.text());

// Search
const results = miniSearch.search('query', { fuzzy: 0.2 });
```

### Step 6: Add Dublin Core Meta Tags (Optional)

For SEO and interoperability, add Dublin Core meta tags to document pages:

```html
<meta name="DC.title" content="Document Title">
<meta name="DC.creator" content="Owner Name">
<meta name="DC.date" content="2026">
<meta name="DC.type" content="Text">
<meta name="DC.language" content="th">
<meta name="DC.identifier" content="GO2026-001">
```

### Step 7: Set Up Build Integration

For production, fetch registry data during build:

```yaml
# GitHub Actions example
- name: Fetch MJU-DRP Registry
  run: |
    curl -o public/data/document-registry.json \
      https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json
```

## Best Practices

1. **Pin to a version tag** for production — use `v1.0` tag, not `main`
2. **Cache aggressively** — registry data changes infrequently
3. **Handle errors** — show "documents unavailable" if fetch fails
4. **Filter by project** — use `project_refs` to show only relevant documents
5. **Graceful degradation** — site should work without registry data

## Common Integration Patterns

### Static HTML + MiniSearch

```html
<script type="module">
import MiniSearch from 'https://cdn.jsdelivr.net/npm/minisearch@7/+esm';

const response = await fetch('dist/search-index.minisearch.json');
const miniSearch = MiniSearch.loadJSON(await response.text());

document.getElementById('search').addEventListener('input', (e) => {
  const results = miniSearch.search(e.target.value);
  renderResults(results);
});
</script>
```

### Astro Component

```astro
---
const response = await fetch(
  "https://raw.githubusercontent.com/numtip/mjudrp/v1.0/dist/document-registry.json"
);
const documents = await response.json();
const myDocs = documents.filter(d => d.project_refs.includes("your-project-id"));
---
<ul>
{myDocs.map(doc => <li><a href={doc.share_url}>{doc.title}</a></li>)}
</ul>
```

## Getting Help

- Open an issue in the MJU-DRP repository
- Submit a PR for registry data corrections
- Contact the project owner for integration questions

## See Also

- `contracts/consumer-contract.md` — Consumer obligations and guarantees
- `docs/certification/07_DUBLIN_CORE_MAPPING.md` — Dublin Core mapping details
- `docs/certification/02_MINISEARCH_CERTIFICATION.md` — MiniSearch certification
