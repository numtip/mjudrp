# Consumer Integration Patterns

## Principle

Consumer projects fetch MJU-DRP JSON outputs. They do not duplicate metadata.

## How Registry JSON Is Consumed

All consumer projects fetch from the same distribution point:

```
https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json
https://raw.githubusercontent.com/numtip/mjudrp/main/dist/search-index.json
```

Consumer projects then filter by `project_refs` for their specific project.

---

### Astro

| Concern | Approach |
|---------|----------|
| Load registry JSON | `fetch()` in `.astro` frontmatter or `src/pages/api/registry.ts` endpoint |
| Filter by project_refs | `const myDocs = registry.filter(d => d.project_refs.includes('rae-landing'))` |
| Show document cards | Astro component iterating over filtered docs |
| Handle search index | Load `search-index.json`, implement client-side search with MiniSearch |
| Avoid duplicating data | Reference registry URLs in code; never copy JSON into src/ |

```astro
---
// Example: astro/src/pages/documents.astro
const res = await fetch("https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json");
const allDocs = await res.json();
const myDocs = allDocs.filter(d => d.project_refs.includes("rae-landing"));
---
<ul>
  {myDocs.map(doc => <li><a href={doc.share_url}>{doc.title}</a></li>)}
</ul>
```

### Next.js

| Concern | Approach |
|---------|----------|
| Load registry JSON | `getStaticProps` or `generateStaticParams` at build time |
| Filter by project_refs | Filter in `getStaticProps` |
| Show document cards | React component with props from static generation |
| Handle search index | Client component with MiniSearch imported from `search-index.json` |
| Avoid duplicating data | Use `unstable_revalidate` or webhook to refresh on MJU-DRP updates |

```jsx
// Example: pages/documents.js (Next.js Pages Router)
export async function getStaticProps() {
  const res = await fetch("https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json");
  const allDocs = await res.json();
  const myDocs = allDocs.filter(d => d.project_refs.includes("green-office-2026"));
  return { props: { documents: myDocs }, revalidate: 3600 };
}
```

### Vue (Vite / Nuxt)

| Concern | Approach |
|---------|----------|
| Load registry JSON | `fetch()` in `onMounted` or `asyncData` (Nuxt) |
| Filter by project_refs | `computed` property on fetched data |
| Show document cards | Vue component with `v-for` |
| Handle search index | Vue component + MiniSearch for client-side search |
| Avoid duplicating data | Fetch at build or on mount; never check JSON into repo |

### Laravel

| Concern | Approach |
|---------|----------|
| Load registry JSON | `Http::get()` in controller or scheduled artisan command |
| Filter by project_refs | `collect($data)->where('project_refs', 'rae-landing')` |
| Show document cards | Blade template rendering filtered collection |
| Handle search index | Cache search index in Laravel cache; serve via API endpoint |
| Avoid duplicating data | Store in cache, not database. Cache has TTL matching update cadence. |

```php
// Example: App\Http\Controllers\DocumentController
public function index() {
    $json = Cache::remember('mjudrp-registry', 3600, function () {
        $response = Http::get('https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json');
        return $response->json();
    });
    $myDocs = collect($json)->filter(fn($doc) => 
        in_array('rae-landing', $doc['project_refs'] ?? [])
    );
    return view('documents.index', ['documents' => $myDocs]);
}
```

### Static HTML

| Concern | Approach |
|---------|----------|
| Load registry JSON | `fetch()` in plain JavaScript |
| Filter by project_refs | `Array.filter()` |
| Show document cards | DOM manipulation |
| Handle search index | Load `search-index.json` and build simple search UI |
| Avoid duplicating data | Always fetch from GitHub; use `localStorage` for caching |

```html
<script>
async function loadDocuments() {
  const res = await fetch("https://raw.githubusercontent.com/numtip/mjudrp/main/dist/document-registry.json");
  const all = await res.json();
  const filtered = all.filter(d => d.project_refs.includes("learning-center"));
  const list = document.getElementById("doc-list");
  filtered.forEach(doc => {
    const item = document.createElement("li");
    item.innerHTML = `<a href="${doc.share_url}">${doc.title}</a>`;
    list.appendChild(item);
  });
}
loadDocuments();
</script>
```

---

## Common Pattern Summary

| Step | All Frameworks |
|------|----------------|
| Fetch | `fetch(GITHUB_RAW_URL)` at build or serve time |
| Filter | `array.filter(d => d.project_refs.includes(PROJECT_ID))` |
| Render | Loop over filtered array, render cards/links |
| Search | Load `search-index.json`, use MiniSearch |
| Cache | Cache per build or per hour (not per request) |
| Update | Redeploy or revalidate on MJU-DRP push |

## Anti-Patterns

- ❌ Do not copy registry JSON into consumer project repository
- ❌ Do not transform registry data into a different schema in consumer code
- ❌ Do not create a separate metadata store in consumer project database
- ❌ Do not modify registry data in consumer project
- ❌ Do not add registry fields to consumer project's own data model
