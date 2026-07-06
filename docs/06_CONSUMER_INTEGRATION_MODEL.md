# Consumer Integration Model

## How Consumer Projects Use MJU-DRP

Consumer projects fetch generated JSON outputs from the MJU-DRP registry. They do not duplicate or independently maintain document metadata.

## Integration Pattern

```javascript
// 1. Fetch the document registry
const registryUrl = "https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json";
const response = await fetch(registryUrl);
const documents = await response.json();

// 2. Filter documents for this project
const projectDocs = documents.filter(doc =>
  doc.project_refs.includes("rae-landing")
);

// 3. Use the metadata to link to documents
projectDocs.forEach(doc => {
  console.log(`${doc.title}: ${doc.share_url}`);
});
```

## Integration Methods

### Method 1: Direct GitHub Raw (MVP)
```
https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json
```
- Simplest approach
- No hosting setup required
- GitHub has rate limits for raw content

### Method 2: GitHub Pages (Recommended)
Publish `dist/` directory to GitHub Pages for better performance and reliability.

### Method 3: CDN / Static Hosting (Future)
Use Cloudflare Pages, Netlify, or similar for production workloads.

## Consumer Responsibilities

1. **Fetch** — Retrieve JSON outputs from MJU-DRP
2. **Filter** — Select documents relevant to the project
3. **Render** — Display document links and metadata
4. **Refresh** — Re-fetch on schedule or on deploy

## Consumer Non-Responsibilities

- Do **not** store copies of registry data
- Do **not** maintain duplicate metadata
- Do **not** modify registry data
- Do **not** create alternative taxonomies

## Registered Consumer Projects

| Project | ID | Status | Repository |
|---------|----|--------|------------|
| RAE Landing | rae-landing | Active | github.com/numtip/rae-landing |
| Green Office 2026 | green-office-2026 | Active | github.com/numtip/green-office-2026 |
| Learning Center | learning-center | Active | github.com/numtip/learning-center |
| Research Portal | research-portal | Planned | TBD |

## Adding a New Consumer Project

1. Add the project to `registry/projects.sample.json`
2. Link documents via `project_refs` in `registry/documents.sample.json`
3. Regenerate outputs with `node scripts/generate-search-index.mjs`
4. Update project documentation to reference MJU-DRP outputs
