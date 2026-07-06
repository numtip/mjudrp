# Package Structure

## Directory Layout

```
release/
├── latest/
│   └── registry-package/          ← Always the newest stable package
│       ├── document-registry.json     Document metadata
│       ├── category-registry.json     Category taxonomy
│       ├── project-registry.json      Consumer project definitions
│       ├── owner-registry.json        Document owners
│       ├── evidence-registry.json     Evidence mappings
│       ├── relationship-registry.json Cross-document relationships
│       ├── search-index.json          Lightweight search index
│       ├── minisearch-index.json      MiniSearch full-text index
│       ├── statistics.json            Registry metrics
│       ├── validation-report.json     AJV validation results
│       ├── performance-report.json    Generation timing metrics
│       ├── manifest.json              Package manifest
│       ├── release-notes.md           Auto-generated release notes
│       ├── checksum.json              SHA-256 checksums for all files
│       └── README.md                  Package overview
│
├── v1/                              ← Frozen v1.x packages
│   └── registry-package/           (same structure as latest/)
│
└── archive/                         ← Historical packages
    └── v1.0.0/
        └── registry-package/        (same structure)
```

## File Descriptions

### Registry Data Files (JSON)

| File | Description | Schema |
|------|-------------|--------|
| `document-registry.json` | All document metadata entries | `document.schema.json` |
| `category-registry.json` | Category taxonomy definitions | `category.schema.json` |
| `project-registry.json` | Registered consumer projects | `project.schema.json` |
| `owner-registry.json` | Document owners and contacts | `owner.schema.json` |
| `evidence-registry.json` | Evidence-to-document mappings | `evidence.schema.json` |
| `relationship-registry.json` | Cross-document relationship links | `relationship.schema.json` |

### Search Index Files (JSON)

| File | Description | Consumer |
|------|-------------|----------|
| `search-index.json` | Lightweight search index (id, title, keywords) | Fast filtering |
| `minisearch-index.json` | MiniSearch serialized index | Full-text fuzzy search |

### Package Metadata Files

| File | Description |
|------|-------------|
| `manifest.json` | Package manifest with version, counts, compatibility |
| `statistics.json` | Comprehensive registry statistics |
| `validation-report.json` | AJV validation results |
| `performance-report.json` | Generation timing metrics |
| `release-notes.md` | Auto-generated release notes |
| `checksum.json` | SHA-256 checksums for all package files |
| `README.md` | Package overview and usage instructions |

## File Size Budget

| Tier | Max Size | Notes |
|------|----------|-------|
| Registry data | 5 MB | Current: ~180 KB |
| Search indexes | 2 MB | Current: ~25 KB combined |
| Package metadata | 500 KB | Current: ~50 KB combined |
| Total package | 10 MB | GitHub Pages friendly |
